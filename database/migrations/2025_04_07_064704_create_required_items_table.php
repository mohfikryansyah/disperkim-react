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
        Schema::create('required_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('street_id')->unique()->constrained('streets')->onDelete('cascade');
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->unsignedInteger('street_length');
            $table->unsignedInteger('installed_panels_prabayar')->default(0);
            $table->unsignedInteger('installed_panels_pascabayar')->default(0);
            $table->unsignedInteger('required_panels');
            $table->unsignedInteger('installed_cable_length')->default(0);
            $table->unsignedInteger('required_cable_length');
            $table->unsignedInteger('required_lamps');
            $table->unsignedInteger('installed_lamps_via_app')->default(0);
            $table->unsignedInteger('installed_lamps_non_app')->default(0);
            $table->unsignedInteger('installed_lamps_mandiri')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('required_items');
    }
};
