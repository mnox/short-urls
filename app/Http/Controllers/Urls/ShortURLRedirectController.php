<?php

namespace App\Http\Controllers\Urls;

use App\Facades\ShortUrlModel;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Http\RedirectResponse;

/**
 * Simple example handler controller
 * Does not handle query params or
 */
class ShortURLRedirectController extends Controller
{
    public function __invoke(Request $request, string $urlKey): RedirectResponse
    {
        $shortUrl = ShortUrlModel::where('destination_url', $urlKey)->firstOrFail();
        $shortUrl->visited();
        return redirect($shortUrl->destination_url);
    }
}
