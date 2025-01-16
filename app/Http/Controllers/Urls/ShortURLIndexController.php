<?php

namespace App\Http\Controllers\Urls;

use App\Facades\ShortUrlModel;
use App\Http\Controllers\Controller;
use AshAllenDesign\ShortURL\Models\ShortURL;
use Illuminate\Http\JsonResponse;
use function PHPUnit\Framework\isInstanceOf;

class ShortURLIndexController extends Controller
{
    /**
     * Retrieves index of ShortUrls
     * @return JsonResponse
     */
    public function __invoke(): JsonResponse
    {
        $shortUrls = ShortUrlModel::all()
            ->map(function ($shortUrl) {
                $count = is_a($shortUrl, ShortURL::class)
                    ? $shortUrl->visits->count()
                    : $shortUrl->visits;
                $shortUrl->visit_count = $count;
                /**
                 * Reduce payload size but include visit count
                 */
                $shortUrl->makeHidden('visits');
                return $shortUrl;
            });
        /**
         * TODO: Add Pagination =]
         */
        return response()->json($shortUrls);
    }
}
