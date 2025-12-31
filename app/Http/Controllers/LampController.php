<?php

namespace App\Http\Controllers;

use App\Models\Lamp;
use Inertia\Inertia;
use App\Models\Panel;
use App\Models\Street;
use App\Models\IconPin;
use App\Models\Village;
use App\Models\Subdistrict;
use App\Models\NetworkCable;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use App\Services\InfrastructureService;

class LampController extends Controller
{
    protected InfrastructureService $service;

    public function __construct(InfrastructureService $service)
    {
        $this->service = $service;
    }


    private const TYPES_LAMP = [
        'Tiang PJUTS',
        'Tiang PLN Tanpa PJU',
        'Tiang PLN / PJU Manual',
        'Tiang PLN PJU Sodium Jaringan',
        'Tiang PLN PJU LED Jaringan',
        'Tiang PJU Single Sodium Jaringan',
        'Tiang PJU Double Sodium Jaringan',
        'Tiang PJU Single LED Jaringan',
        'Tiang PJU Double LED Jaringan',
        'Tiang Flood Light Jaringan',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('sidebar/data_apj/APJ/pages', [
            'lamps' => Lamp::with(['street.village.subdistrict', 'user:id,name,avatar', 'panel'])->latest()->get(),
            'streets' => Street::with(['village.subdistrict', 'panels.street.village.subdistrict'])->latest()->get(),
            'subdistricts' => Subdistrict::with(['villages.streets'])->get(),
            'panels' => Panel::with(['street.village.subdistrict'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return DB::transaction(function () use ($request) {

            $validatedData = $request->validate([
                'street_id' => [
                    'nullable',
                    'exists:streets,id',
                    Rule::requiredIf(fn() => $request->type !== 'Tiang PJUTS'),
                ],
                'icon_id' => ['nullable'],
                'name' => ['required', 'string', 'max:255'],
                'latitude' => ['required', 'numeric'],
                'longitude' => ['required', 'numeric'],
                'type' => ['required', 'string', Rule::in(self::TYPES_LAMP)],
                'panel_id' => [
                    'nullable',
                    Rule::requiredIf(fn() => !in_array($request->type, [
                        'Tiang PJUTS',
                        'Tiang PLN Tanpa PJU',
                        'Tiang PLN / PJU Manual',
                        'Tiang PJU Single Sodium Jaringan',
                        'Tiang PLN PJU Sodium Jaringan',
                    ])),
                    'exists:panels,id',
                ],
                'listrik_pln' => ['required', 'string', Rule::in(['APP', 'Non APP', 'Mandiri', '-'])],
                'description' => ['nullable', 'string'],
                'status' => ['required', 'string', Rule::in(['Menyala', 'Mati', 'Rusak', '-'])],
                'sumber_dana' => ['nullable', 'string', 'max:10'],
                'tahun_pengadaan' => ['nullable', 'string', 'max:4'],
            ]);

            $validatedData['user_id'] = Auth::id();

            if ($validatedData['type'] === 'Tiang PLN Tanpa PJU') {
                $validatedData['listrik_pln'] = '-';
                $validatedData['status'] = '-';
            }

            $lamp = Lamp::create($validatedData);

            if ($validatedData['type'] !== 'Tiang PLN Tanpa PJU') {
                $lamp->load(['street.village.subdistrict', 'user', 'panel']);

                $requiredItem = $lamp->street->requiredItem;

                match ($lamp->listrik_pln) {
                    'Non APP' => $requiredItem->increment('installed_lamps_non_app'),
                    'Mandiri' => $requiredItem->increment('installed_lamps_mandiri'),
                    'APP'     => $requiredItem->increment('installed_lamps_via_app'),
                    default   => null,
                };
            }

            return back();
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Lamp $lamp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lamp $lamp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lamp $lamp)
    {
        $validatedData = $request->validate([
            'street_id' => ['required', 'exists:streets,id'],
            'icon_id' => ['nullable'],
            'name' => ['required', 'string', 'max:255'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
            'type' => ['required', 'string', Rule::in(self::TYPES_LAMP)],
            'panel_id' => [
                'nullable',
                Rule::requiredIf(fn() => !in_array($request->type, [
                    'Tiang PJUTS',
                    'Tiang PLN Tanpa PJU',
                    'Tiang PLN / PJU Manual',
                    'Tiang PJU Single Sodium Jaringan',
                    'Tiang PLN PJU Sodium Jaringan',
                ])),
                'exists:panels,id',
            ],
            'listrik_pln' => ['required', 'string', Rule::in(['APP', 'Non APP', 'Mandiri', '-'])],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'string', Rule::in(['Menyala', 'Mati', 'Rusak', '-'])],
            'sumber_dana' => ['nullable', 'string', 'max:10'],
            'tahun_pengadaan' => ['nullable', 'string', 'max:4'],
        ]);

        $oldListrikPln = $lamp->listrik_pln;
        $oldStreetId = $lamp->street_id;

        if ($validatedData['type'] === 'Tiang PLN Tanpa PJU') {
            $validatedData['listrik_pln'] = '-';
            $validatedData['status'] = '-';
        }

        $lamp->update($validatedData);
        $lamp->load(['street.village.subdistrict', 'user', 'panel']);

        if ($validatedData['type'] !== 'Tiang PLN Tanpa PJU') {
            if ($oldStreetId !== $lamp->street_id || $oldListrikPln !== $lamp->listrik_pln) {
                $oldStreet = Street::find($oldStreetId);

                if ($oldStreet && $oldStreet->requiredItem) {
                    if ($oldListrikPln === 'Non APP') {
                        $oldStreet->requiredItem->decrement('installed_lamps_non_app');
                    } elseif ($oldListrikPln === 'Mandiri') {
                        $oldStreet->requiredItem->decrement('installed_lamps_mandiri');
                    } elseif ($oldListrikPln === 'APP') {
                        $oldStreet->requiredItem->decrement('installed_lamps_via_app');
                    }
                }

                if ($lamp->street->requiredItem) {
                    if ($lamp->listrik_pln === 'Non APP') {
                        $lamp->street->requiredItem->increment('installed_lamps_non_app');
                    } elseif ($lamp->listrik_pln === 'Mandiri') {
                        $lamp->street->requiredItem->increment('installed_lamps_mandiri');
                    } elseif ($lamp->listrik_pln === 'APP') {
                        $lamp->street->requiredItem->increment('installed_lamps_via_app');
                    }
                }
            }
        } else {
            $oldStreet = Street::find($oldStreetId);
            if ($oldStreet && $oldStreet->requiredItem) {
                if ($oldListrikPln === 'Non APP') {
                    $oldStreet->requiredItem->decrement('installed_lamps_non_app');
                } elseif ($oldListrikPln === 'Mandiri') {
                    $oldStreet->requiredItem->decrement('installed_lamps_mandiri');
                } elseif ($oldListrikPln === 'APP') {
                    $oldStreet->requiredItem->decrement('installed_lamps_via_app');
                }
            }
        }

        return back();
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lamp $lamp)
    {
        DB::beginTransaction();

        try {
            $lamp->load(['street.village.subdistrict', 'user', 'panel']);

            if ($lamp->listrik_pln === 'Non APP') {
                $lamp->street->requiredItem->decrement('installed_lamps_non_app');
            } elseif ($lamp->listrik_pln === 'Mandiri') {
                $lamp->street->requiredItem->decrement('installed_lamps_mandiri');
            } elseif ($lamp->listrik_pln === 'APP') {
                $lamp->street->requiredItem->decrement('installed_lamps_via_app');
            }

            $lamp->delete();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error("Failed decrement lamp counter", [
                'lamp_id' => $lamp->id,
                'error'   => $e->getMessage(),
            ]);
        }

        return back();
    }
}
