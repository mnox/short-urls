<?php

namespace Tests\Unit\Services\UrlService;

use App\Services\UrlService;
use Tests\TestCase;

class IsValidUrlTest extends TestCase
{
    public function test_it_correctly_identifies_valid_url()
    {
        $service = resolve(UrlService::class);
        $this->assertEquals(true, $service->isValidUrl('http://google.com'));
        $this->assertEquals(true, $service->isValidUrl('https://google.com'));
        $this->assertEquals(true, $service->isValidUrl('https://www.wemod.com'));
        $this->assertEquals(true, $service->isValidUrl('http://localhost'));
        $this->assertEquals(true, $service->isValidUrl('http://localhost:3000'));
    }

    public function test_it_correctly_identifies_invalid_url()
    {
        $service = resolve(UrlService::class);
        $this->assertEquals(false, $service->isValidUrl('google.com'));
        $this->assertEquals(false, $service->isValidUrl('localhost'));
        $this->assertEquals(false, $service->isValidUrl('localhost:3001'));
        $this->assertEquals(false, $service->isValidUrl('ftp:google.com'));
        $this->assertEquals(false, $service->isValidUrl('your@mom.com'));
    }
}
