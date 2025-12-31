<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        $data = $request->validated();

        unset($data['avatar'], $data['profile_banner']);

        $user->fill($data);

        if ($request->hasFile('avatar')) {
            if ($request->user()->avatar && Storage::disk('public')->exists($request->user()->avatar)) {
                Storage::disk('public')->delete($request->user()->avatar);
            }
            $request->user()->avatar = $request->file('avatar')->store('avatars', 'public');
        }
        if ($request->hasFile('profile_banner')) {
            if ($request->user()->profile_banner && Storage::disk('public')->exists($request->user()->profile_banner)) {
                Storage::disk('public')->delete($request->user()->profile_banner);
            }
            $request->user()->profile_banner = $request->file('profile_banner')->store('profile_banner', 'public');
        }

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
