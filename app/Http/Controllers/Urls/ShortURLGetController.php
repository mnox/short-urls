<?php

namespace App\Http\Controllers\Urls;

use App\Facades\ShortUrlModel;
use App\Http\Controllers\Controller;
use AshAllenDesign\ShortURL\Models\ShortURL;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;

class ShortURLGetController extends Controller
{
    /**
     * Retrieves ShortUrl by ID
     * @return JsonResponse
     */
    public function __invoke(Request $request, int $shortUrlId): JsonResponse
    {
        $shortUrl = ShortUrlModel::findOrFail($shortUrlId);
        if( is_a($shortUrl, ShortURL::class) ) {
            $shortUrl->visit_count = $shortUrl->visits->count();
        } else {
            $shortUrl->visit_count = $shortUrl->visits;
            $shortUrl->visits = [];
        }
        return response()->json($shortUrl);
    }
}
