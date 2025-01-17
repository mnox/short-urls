<?php

namespace App\Services;

use App\Facades\ShortUrlModel;
use App\Models\ShortenedUrl;
use AshAllenDesign\ShortURL\Facades\ShortURL;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UrlService
{
    /**
     * Given an array-like CSV row object, try to retrieve a URL
     * string from a static set of keys.
     * @param $row
     * @return array|mixed|string|null
     */
    public function getUrlFromCsvRow($row)
    {
        if(is_string($row) && $this->isValidUrl($row)) {
            return $row;
        }

        /**
         * Try each key to retrieve a URL from the row
         */
        $validKey = collect([
            'url',
            'URL',
            'path',
            'route',
            0, // no key header provided
        ])->first(function ($item) use ($row) {
            return self::isValidUrl(data_get($row, $item));
        });

        if(empty($validKey) && $validKey !== 0) {
            throw new \Exception('Unable to retrieve URL from CSV row');
        }

        return data_get($row, $validKey);
    }

    /**
     * Validate if a string is a valid URL.
     *
     * @param string $url
     * @return bool
     */
    public function isValidUrl($url): bool
    {
        if(empty($url)) {
            return false;
        }

        $validator = Validator::make(['url' => $url], [
            'url' => 'required|url',
        ]);

        return !$validator->fails();
    }

    /**
     * Checks if destination URL already has a ShortURL instance
     * @param $destination
     * @return bool
     */
    public function shortUrlExists(string $destination): bool
    {
        $existing = resolve(ShortUrlModel::class)::where('destination_url', $destination)->first();
        return !empty($existing);
    }

    /**
     * Creates new shortened URL model instance
     * Based on registered driver
     * TBH I Think there might be a better Laravel way to handle this
     * but I felt like I was starting to over-engineer this a bit.
     * I considered registering a ShortUrlBuilder Facade then creating a
     * Builder class for each implementation that would follow a patterned
     * "create" method - but hopefully you don't judge me too harshly for this
     * implementation. =]
     * @param string $destination
     * @return void
     */
    public function createNewShortUrl(string $destination): Model
    {
        if($this->shortUrlExists($destination)) {
            throw new \Exception("$destination short url already exists");
        }

        $shortUrlDriver = env('SHORT_URL_DRIVER', 'internal');
        return match ($shortUrlDriver) {
            'ash-package' => ShortURL::destinationUrl($destination)->make(),
            default => ShortenedUrl::forDestinationUrl($destination)->make(),
        };
    }

    /**
     * Creates a random string to use as short URL key
     * Does not protect against theoretically possible duplicates
     * Could prevent duplicates in a number of ways including feeding
     * the ID of the new model into the key gen, etc.
     * @return string
     */
    public function createShortUrlKey(): string
    {
        $randomHex = bin2hex(random_bytes(2));
        $keyLength = env('SHORT_URL_KEY_LENGTH', 10) - strlen($randomHex);
        $randomString = str()->random($keyLength);
        return "$randomHex$randomString";
    }
}
