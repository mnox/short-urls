<?php

namespace App\Providers;

use App\Http\Controllers\Urls\ShortURLRedirectController;
use App\Models\ShortenedUrl;
use AshAllenDesign\ShortURL\Controllers\ShortURLController;
use AshAllenDesign\ShortURL\Models\ShortURL;
use Illuminate\Support\ServiceProvider;

class ShortUrlServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $shortUrlDriver = env('SHORT_URL_DRIVER', 'internal');
        $this->app->bind('short-url.controller', function () use ($shortUrlDriver) {
            return match ($shortUrlDriver) {
                'ash-package' => ShortURLController::class,
                default => ShortURLRedirectController::class,
            };
        });

        $this->app->bind('short-url.model', function () use ($shortUrlDriver) {
            return match ($shortUrlDriver) {
                'ash-package' => new ShortURL(),
                default => new ShortenedUrl(),
            };
        });
    }
}
