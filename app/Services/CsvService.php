<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\LazyCollection;
use Spatie\SimpleExcel\SimpleExcelReader;

class CsvService
{
    /**
     * For handling local Filesystem disk/driver
     * Ensures file name for uploaded CSV will function
     * correctly with CSV parser
     * @param UploadedFile $file
     * @return string
     */
    public function getCsvUploadFileName(UploadedFile $file): string
    {
        /**
         * Prevent Filesystem from saving file as txt
         */
        $extension = $file->getClientOriginalExtension();
        $hash = uniqid();
        return "$hash.$extension";
    }

    public function storeCsvUploadFile(UploadedFile $file): string
    {
        $fileName = $this->getCsvUploadFileName($file);
        /**
         * Would probably be an S3 driver in an actual production implementation
         * so I'd abstract this if I had more time.
         * Also it wasn't mentioned whether we want to store the file uploads
         * but typically we probably would in case there is a job failure etc.
         */
        return Storage::disk('local')->putFileAs(env('UPLOADS_LOCAL_PATH'), $file, $fileName);
    }

    public function createShortUrlsFromUploadedCsvFile(string $path): LazyCollection
    {
        $urlService = resolve(UrlService::class);
        $rows = SimpleExcelReader::create(Storage::path($path))->getRows();
        /**
         * Might want to limit the amount of rows that can be uploaded
         * at one time. Either way it would probably be good to jobify
         * this process and send a sock/pusher message when it's completed.
         */
        return $rows->map(function ($row) use($urlService) {
            $result = [
                'csvRow' => $row,
            ];
            try{
                $destination = $urlService->getUrlFromCsvRow($row);
                return [
                    ...$result,
                    'success' => true,
                    'shortUrl' => $urlService->createNewShortUrl($destination),
                ];
            } catch (\Exception $exception) {
                // TODO: Add Logging
                return [
                    ...$result,
                    'success' => false,
                    'error' => $exception->getMessage(),
                ];
            }
        });
    }
}