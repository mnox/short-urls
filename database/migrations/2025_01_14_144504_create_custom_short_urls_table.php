<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Be different
     */
    const tableName = 'shortened_urls';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if(!Schema::hasTable(self::tableName)) {
            Schema::create(self::tableName, function (Blueprint $table) {
                $table->id();
                $table->string('short_url');
                $table->string('destination_url')->unique();
                $table->string('key')->unique();
                /**
                 * Lighter weight example if we don't need as much granularity for analytics
                 */
                $table->unsignedInteger('visits')
                    ->default(0);

                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(self::tableName);
    }
};
