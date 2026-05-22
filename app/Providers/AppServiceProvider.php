<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;
use App\Models\Journal;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Dynamically override App config and Mail config
        try {
            $journal = Journal::first();
            if ($journal) {
                // Set application name globally
                Config::set('app.name', $journal->name);
                
                if (isset($journal->settings['smtp_host'])) {
                $settings = $journal->settings;
                
                // Force Laravel to use SMTP instead of whatever is in .env (e.g., log)
                Config::set('mail.default', 'smtp');
                
                Config::set('mail.mailers.smtp.host', $settings['smtp_host']);
                Config::set('mail.mailers.smtp.port', $settings['smtp_port']);
                Config::set('mail.mailers.smtp.encryption', $settings['smtp_encryption']);
                Config::set('mail.mailers.smtp.username', $settings['smtp_username']);
                Config::set('mail.mailers.smtp.password', $settings['smtp_password']);
                
                if (isset($settings['smtp_from_address'])) {
                    Config::set('mail.from.address', $settings['smtp_from_address']);
                    Config::set('mail.from.name', $settings['smtp_from_name'] ?? config('app.name'));
                }
                }
            }
        } catch (\Exception $e) {
            // Ignore if DB is not migrated or unavailable
        }
    }
}
