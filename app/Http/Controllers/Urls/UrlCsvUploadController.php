<?php

namespace App\Http\Controllers\Urls;

use App\Http\Controllers\Controller;
use App\Services\CsvService;
use App\Services\UrlService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\SimpleExcel\SimpleExcelReader;

class UrlCsvUploadController extends Controller
{
    /**
     * @param Request $request
     */
    public function __invoke(Request $request): JsonResponse
    {
        $csvService = resolve(CsvService::class);
        $file = $request->file('file');
        $path = $csvService->storeCsvUploadFile($file);
        $shortUrls = $csvService->createShortUrlsFromUploadedCsvFile($path);

        return response()->json($shortUrls->toArray());
    }
}
