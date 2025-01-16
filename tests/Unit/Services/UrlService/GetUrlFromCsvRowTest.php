<?php

namespace Tests\Unit\Services\UrlService;

use App\Services\UrlService;
use Tests\TestCase;

class GetUrlFromCsvRowTest extends TestCase
{
    public function test_it_gets_url_from_csv_row_with_key()
    {
        $service = resolve(UrlService::class);

        $row1 = [
            'url' => 'http://google.com',
        ];
        $row1Result = $service->getUrlFromCsvRow($row1);
        $this->assertEquals('http://google.com', $row1Result);

        $row2 = [
            'URL' => 'https://google.com',
        ];
        $row2Result = $service->getUrlFromCsvRow($row2);
        $this->assertEquals('https://google.com', $row2Result);
    }

    public function test_it_gets_url_from_csv_row_without_key()
    {
        $service = resolve(UrlService::class);

        $row = [
            'http://google.com',
        ];
        $result = $service->getUrlFromCsvRow($row);
        $this->assertEquals('http://google.com', $result);
    }
}
