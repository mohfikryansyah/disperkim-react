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
        Schema::create('villages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('subdistrict_id')->constrained('subdistricts')->onDelete('cascade');
            $table->string('name');
            $table->timestamps();

            $table->unique(['subdistrict_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('villages');
    }
};
