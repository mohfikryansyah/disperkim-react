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
        Schema::create('subdistrict_lighting_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('district_lighting_stat_id')->constrained('district_lighting_stats')->onDelete('cascade');
            $table->string('subdistrict_name');
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
        Schema::dropIfExists('subdistrict_lighting_details');
    }
};
