<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ShortUrlModel extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'short-url.model';
    }
}
