<?php

namespace App\Models;

use App\Services\UrlService;
use Illuminate\Database\Eloquent\Model;

/**
 * Lighter weight example if we don't need as much granularity for analytics
 */
class ShortenedUrl extends Model
{
    public static function forDestinationUrl(string $destinationUrl)
    {
        $key = resolve(UrlService::class)->createShortUrlKey();
        $model = self::create([
            'short_url' => "http://localhost/short-url/$key",
            'destination_url' => $destinationUrl,
            'key' => $key,
        ]);
        $model->save();
        return $model;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'short_url',
        'destination_url',
        'key',
        'visits',
    ];

    /**
     * Validation
     * @var array
     */
    public static $rules = [
        'short_url' => 'required|url',
        'destination_url' => 'required|url',
        'key' => 'required|string',
        'visits' => 'integer',
    ];

    /**
     * Increments number of visits to given short_url
     * and saves model
     * @return void
     */
    public function visited()
    {
        $this->visits++;
        $this->save();
    }
}
