<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'status' => 'required|string',
            'academic_id' => 'nullable|string|max:255',
            'citizenship' => 'required|string|max:255',
            'academic_grade' => 'required|string|max:255',
            'id_card_number' => 'required|string|max:255|unique:'.User::class,
            'google_scholar_url' => 'required|url|regex:/scholar\.google/',
            'scopus_id' => 'nullable|string|max:255',
            'affiliation' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'author',
            'status' => $request->status,
            'academic_id' => $request->academic_id,
            'citizenship' => $request->citizenship,
            'academic_grade' => $request->academic_grade,
            'id_card_number' => $request->id_card_number,
            'google_scholar_url' => $request->google_scholar_url,
            'scopus_id' => $request->scopus_id,
            'affiliation' => $request->affiliation,
            'is_active' => true,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
