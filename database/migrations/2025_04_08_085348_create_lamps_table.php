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
            $table->uuid('id')->primary();
            $table->foreignUuid('panel_id')->nullable()->constrained('panels')->cascadeOnDelete();
            $table->foreignUuid('street_id')->nullable()->constrained('streets')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('name');
            $table->decimal('latitude', 10, 7); 
            $table->decimal('longitude', 10, 7);
            $table->enum('type', 
            [
                'Tiang PLN Tanpa PJU', 
                'Tiang PLN / PJU Manual', 
                'Tiang PLN PJU Sodium Jaringan',
                'Tiang PLN PJU LED Jaringan',
                'Tiang PJU Single Sodium Jaringan',
                'Tiang PJU Double Sodium Jaringan',
                'Tiang PJU Single LED Jaringan',
                'Tiang PJU Double LED Jaringan',
                'Tiang Flood Light Jaringan',
                'Tiang PJUTS',
            ]);
            $table->enum('listrik_pln', ['APP', 'Non APP', 'Mandiri', '-'])->nullable();
            $table->enum('status', ['Menyala', 'Mati', 'Rusak', '-'])->default('Menyala');
            $table->string('sumber_dana')->nullable();
            $table->string('tahun_pengadaan')->nullable();
            $table->text('description')->nullable();
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
