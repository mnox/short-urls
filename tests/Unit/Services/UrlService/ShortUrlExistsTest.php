<?php

namespace Tests\Unit\Services\UrlService;

use App\Facades\ShortUrlModel;
use App\Services\UrlService;
use Tests\TestCase;

class ShortUrlExistsTest extends TestCase
{
    private const testDestinationUrl = 'http://test.testing.com';

    public function test_it_correctly_identifies_existing_short_url()
    {
        $service = resolve(UrlService::class);
        $service->createNewShortUrl(self::testDestinationUrl);
        $this->assertTrue($service->shortUrlExists(self::testDestinationUrl));
    }

    public function test_it_correctly_identifies_not_existing_short_url()
    {
        $service = resolve(UrlService::class);
        $this->assertFalse($service->shortUrlExists(self::testDestinationUrl));
    }

    public function tearDown(): void
    {
        resolve(ShortUrlModel::class)::where('destination_url', self::testDestinationUrl)->delete();
    }
}
