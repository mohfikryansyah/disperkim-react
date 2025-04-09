<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('district_lighting_stats', function (Blueprint $table) {
            $table->id();
            $table->string('district_name');
            $table->integer('panel_count');
            $table->integer('lamp_count');
            $table->integer('cable_length');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('district_lighting_stats');
    }
};
