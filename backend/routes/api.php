<?php

use App\Http\Controllers\Api\v1\HomeBannersController;
use App\Http\Controllers\Api\v1\TestimonialsController;
use App\Http\Controllers\Api\v1\UsersController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('login', [UsersController::class, 'login']);

    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('logout', [UsersController::class, 'logout']);

        // Home Banners
        Route::get('home-banners', [HomeBannersController::class, 'index']);
        Route::post('add-home-banners', [HomeBannersController::class, 'store']);
        Route::get('fetch-home-banners/{edit}', [HomeBannersController::class, 'fetch']);
        Route::get('delete-home-banners/{delete}', [HomeBannersController::class, 'destroy']);

        // Testimonials
        Route::get('testimonials', [TestimonialsController::class, 'index']);
        Route::post('add-testimonials', [TestimonialsController::class, 'store']);
        Route::get('fetch-testimonials/{edit}', [TestimonialsController::class, 'fetch']);
        Route::get('delete-testimonials/{delete}', [TestimonialsController::class, 'destroy']);

        // About Us
        // Route::get('about-us', [AboutUsController::class, 'index']);
        // Route::post('add-about-us', [AboutUsController::class, 'store']);
    });
});
