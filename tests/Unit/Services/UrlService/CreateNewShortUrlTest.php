<?php

namespace Tests\Unit\Services\UrlService;

use App\Facades\ShortUrlModel;
use App\Services\UrlService;
use Tests\TestCase;

class CreateNewShortUrlTest extends TestCase
{
    private const testDestinationUrl = 'http://test.testing.com';

    public function test_it_creates_new_short_url()
    {
        $shortUrlModel = resolve(ShortUrlModel::class);
        $service = resolve(UrlService::class);
        $service->createNewShortUrl(self::testDestinationUrl);
        $model = $shortUrlModel::where('destination_url', self::testDestinationUrl)->first();
        $this->assertNotNull($model);
    }

    public function test_it_does_not_create_duplicate_short_urls()
    {
        $shortUrlModel = resolve(ShortUrlModel::class);
        $service = resolve(UrlService::class);
        $service->createNewShortUrl(self::testDestinationUrl);
        // create again
        try {
            $service->createNewShortUrl(self::testDestinationUrl);
        } catch (\Exception $e) {}
        $modelCount = $shortUrlModel::where('destination_url', self::testDestinationUrl)->count();
        $this->assertEquals(1, $modelCount);
    }

    public function tearDown(): void
    {
        resolve(ShortUrlModel::class)::where('destination_url', self::testDestinationUrl)->delete();
    }
}
