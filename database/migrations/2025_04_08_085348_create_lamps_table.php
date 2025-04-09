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
        Schema::create('lamps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subdistrict_lighting_detail_id')->constrained('subdistrict_lighting_details')->onDelete('cascade');
            $table->decimal('latitude', 10, 7); 
            $table->decimal('longitude', 10, 7);
            $table->enum('type', ['LED', 'PJUTS', 'Konvensional']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lamps');
    }
};
