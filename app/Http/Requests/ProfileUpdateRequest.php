<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'status' => ['required', 'string', 'in:Peneliti,Dosen,Profesor,Mahasiswa'],
            'academic_id' => ['nullable', 'string', 'max:255'],
            'citizenship' => ['required', 'string', 'max:255'],
            'academic_grade' => ['required', 'string', 'max:255'],
            'id_card_number' => [
                'required',
                'string',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'google_scholar_url' => ['required', 'url', 'regex:/scholar\.google/'],
            'scopus_id' => ['nullable', 'string', 'max:255'],
            'affiliation' => ['required', 'string', 'max:255'],
        ];
    }
}
