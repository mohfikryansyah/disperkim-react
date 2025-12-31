<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // /** @var \App\Models\User */
        // $currentUser = Auth::user();
        // dd(!$currentUser->hasRole('admin'));
        $users = User::withoutRole('admin')->latest()->get();

        return Inertia::render('sidebar/user/pages', compact('users'));
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        /** @var \App\Models\User */
        $currentUser = Auth::user();

        if ($currentUser->id === $user->id) {
            return redirect()->back()->with('error', 'Anda tidak dapat menghapus diri sendiri.');
        }

        if (!$currentUser->hasRole('admin')) {
            return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk menghapus pengguna.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'Pengguna berhasil dihapus.');
    }
}
