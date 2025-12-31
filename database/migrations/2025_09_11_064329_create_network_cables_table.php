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
        Schema::create('network_cables', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('street_id')->constrained('streets')->cascadeOnDelete();
            $table->string('name');
            $table->integer('length');
            $table->json('polyline');
            $table->enum('type_cable', ['Kabel Jaringan TC-2x10mm', 'Kabel Jaringan TC-4x10mm', 'Kabel Jaringan TC-4x25mm', 'Kabel Jaringan NYY-3x4mm']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('network_cables');
    }
};
