<?php

use App\Http\Controllers\Api\v1\HomeBannersController;
use App\Http\Controllers\Api\v1\AwardsController;
use App\Http\Controllers\Api\v1\AboutUsController;
use App\Http\Controllers\Api\v1\PartnersController;
use App\Http\Controllers\Api\v1\TestimonialsController;
use App\Http\Controllers\Api\v1\UsersController;
use App\Http\Controllers\Api\v1\ServicesController;
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

        // Partners
        Route::get('partners', [PartnersController::class, 'index']);
        Route::post('add-partners', [PartnersController::class, 'store']);
        Route::get('fetch-partners/{edit}', [PartnersController::class, 'fetch']);
        Route::get('delete-partners/{delete}', [PartnersController::class, 'destroy']);

        // Awards
        Route::get('awards', [AwardsController::class, 'index']);
        Route::post('add-awards', [AwardsController::class, 'store']);
        Route::get('fetch-awards/{edit}', [AwardsController::class, 'fetch']);
        Route::get('delete-awards/{delete}', [AwardsController::class, 'destroy']);

        // About Us
        Route::get('about-us', [AboutUsController::class, 'index']);
        Route::post('add-about-us', [AboutUsController::class, 'store']);
        Route::get('fetch-about-us/{edit}', [AboutUsController::class, 'fetch']);
        Route::get('delete-about-us/{delete}', [AboutUsController::class, 'destroy']);

        // Services
        Route::get('services', [ServicesController::class, 'index']);
        Route::post('add-services', [ServicesController::class, 'store']);
        Route::get('fetch-services/{edit}', [ServicesController::class, 'fetch']);
        Route::get('delete-services/{delete}', [ServicesController::class, 'destroy']);
    });
});
