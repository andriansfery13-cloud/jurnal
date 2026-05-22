<?php

use App\Http\Controllers\LandingController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\StaticPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Author\DashboardController as AuthorDashboardController;
use App\Http\Controllers\Author\SubmissionController as AuthorSubmissionController;
use App\Http\Controllers\Reviewer\DashboardController as ReviewerDashboardController;
use App\Http\Controllers\Reviewer\ReviewController;
use App\Http\Controllers\Editor\DashboardController as EditorDashboardController;
use App\Http\Controllers\Editor\SubmissionController as EditorSubmissionController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\IssueController as AdminIssueController;
use App\Http\Controllers\Admin\SubjectController as AdminSubjectController;
use App\Http\Controllers\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\LoaController;
use App\Http\Controllers\PublicAuthorController;
use App\Http\Controllers\PublicSubjectController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

// ============================================
// PUBLIC ROUTES
// ============================================
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/{submission}', [ArticleController::class, 'show'])->name('articles.show');
Route::get('/archives', [ArchiveController::class, 'index'])->name('archives.index');
Route::get('/archives/{issue}', [ArchiveController::class, 'show'])->name('archives.show');
Route::get('/subjects', [PublicSubjectController::class, 'index'])->name('subjects.index');
Route::get('/subjects/{subject:slug}', [PublicSubjectController::class, 'show'])->name('subjects.show');
Route::get('/authors', [PublicAuthorController::class, 'index'])->name('authors.index');
Route::get('/authors/{author}', [PublicAuthorController::class, 'show'])->name('authors.show');
Route::get('/page/{slug}', [StaticPageController::class, 'show'])->name('page.show');

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Premium: LOA Verification
Route::get('/verify-loa/{certificate}', [LoaController::class, 'verify'])
    ->where('certificate', '.*')
    ->name('loa.verify');

// ============================================
// AUTHENTICATED ROUTES
// ============================================
Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Dashboard redirect based on role
    Route::get('/dashboard', function () {
        $user = auth()->user();
        return match($user->role) {
            'admin' => redirect()->route('admin.dashboard'),
            'editor' => redirect()->route('editor.dashboard'),
            'reviewer' => redirect()->route('reviewer.dashboard'),
            default => redirect()->route('author.dashboard'),
        };
    })->name('dashboard');

    // ============================================
    // AUTHOR ROUTES
    // ============================================
    Route::prefix('author')->name('author.')->middleware('role:author,editor,admin')->group(function () {
        Route::get('/dashboard', [AuthorDashboardController::class, 'index'])->name('dashboard');
        Route::resource('submissions', AuthorSubmissionController::class)->only(['index', 'create', 'store', 'show']);
        Route::post('/submissions/save-draft', [AuthorSubmissionController::class, 'saveDraft'])->name('submissions.save-draft');
        Route::post('/submissions/{submission}/revise', [AuthorSubmissionController::class, 'revise'])->name('submissions.revise');
    });

    // ============================================
    // REVIEWER ROUTES
    // ============================================
    Route::prefix('reviewer')->name('reviewer.')->middleware('role:reviewer,editor,admin')->group(function () {
        Route::get('/dashboard', [ReviewerDashboardController::class, 'index'])->name('dashboard');
        Route::get('/reviews/{review}', [ReviewController::class, 'show'])->name('reviews.show');
        Route::post('/reviews/{review}/respond', [ReviewController::class, 'respond'])->name('reviews.respond');
        Route::post('/reviews/{review}/submit', [ReviewController::class, 'submit'])->name('reviews.submit');
    });

    // ============================================
    // EDITOR ROUTES
    // ============================================
    Route::prefix('editor')->name('editor.')->middleware('role:editor,admin')->group(function () {
        Route::get('/dashboard', [EditorDashboardController::class, 'index'])->name('dashboard');
        Route::get('/submissions', [EditorSubmissionController::class, 'index'])->name('submissions.index');
        Route::get('/submissions/{submission}', [EditorSubmissionController::class, 'show'])->name('submissions.show');
        Route::post('/submissions/{submission}/assign-reviewer', [EditorSubmissionController::class, 'assignReviewer'])->name('submissions.assign-reviewer');
        Route::post('/submissions/{submission}/update-status', [EditorSubmissionController::class, 'updateStatus'])->name('submissions.update-status');
        Route::post('/submissions/{submission}/publish', [EditorSubmissionController::class, 'publish'])->name('submissions.publish');
    });

    // ============================================
    // ADMIN ROUTES
    // ============================================
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', function () { return \Inertia\Inertia::render('Admin/Dashboard'); })->name('dashboard');
        
        // Users
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
        Route::put('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');

        // Issues
        Route::get('/issues', [AdminIssueController::class, 'index'])->name('issues.index');
        Route::post('/volumes', [AdminIssueController::class, 'storeVolume'])->name('volumes.store');
        Route::post('/issues', [AdminIssueController::class, 'storeIssue'])->name('issues.store');
        Route::put('/issues/{issue}', [AdminIssueController::class, 'updateIssue'])->name('issues.update');

        // Subjects
        Route::resource('subjects', AdminSubjectController::class)->only(['index', 'store', 'update', 'destroy']);

        // Settings
        Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings');
        Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
    });
});

require __DIR__.'/auth.php';
