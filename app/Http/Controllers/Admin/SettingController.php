<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Journal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $journal = Journal::first() ?? new Journal();
        return Inertia::render('Admin/Settings', [
            'journal' => $journal
        ]);
    }

    public function update(Request $request)
    {
        $journal = Journal::first() ?? new Journal();

        $request->validate([
            'name' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'editor_in_chief_name' => 'required|string|max:255',
            'editor_signature' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'sinta_rank' => 'nullable|integer|min:0|max:6',
        ]);

        $settings = $journal->settings ?? [];
        $settings['editor_in_chief_name'] = $request->editor_in_chief_name;
        $settings['sinta_rank'] = $request->sinta_rank;

        if ($request->hasFile('editor_signature')) {
            // Delete old signature if exists
            if (isset($settings['editor_signature_path']) && Storage::disk('public')->exists($settings['editor_signature_path'])) {
                Storage::disk('public')->delete($settings['editor_signature_path']);
            }
            $path = $request->file('editor_signature')->store('signatures', 'public');
            $settings['editor_signature_path'] = $path;
        }

        $journal->name = $request->name;
        $journal->publisher = $request->publisher;
        $journal->settings = $settings;
        $journal->save();

        return redirect()->back()->with('success', 'Journal settings updated successfully.');
    }
}
