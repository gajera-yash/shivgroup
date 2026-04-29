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
        Schema::create('about_us_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('aboutus_id');
            $table->string('about_image');
            $table->timestamps();

            $table->foreign('aboutus_id')->references('id')->on('about_us')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_us_images');
    }
};
