<?php

namespace App\Http\Controllers;

use App\Models\IconPin;
use App\Models\Lamp;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LampController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('sidebar/data_apj/APJ/pages', [
            'lamps' => Lamp::with(['street.village.subdistrict', 'user', 'icon'])->latest()->get(),
            'iconPin' => IconPin::get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'street_id' => 'required',
            'icon_id' => 'required',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'type' => 'required|string|in:LED,Konvensional,Tenaga Surya',
        ]);

        $validatedData['user_id'] = Auth::user()->id;

        // dd($validatedData);

        Lamp::create($validatedData);

        return back();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lamp $lamp)
    {
        //
    }
}
