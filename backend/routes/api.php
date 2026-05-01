<?php

use App\Http\Controllers\Api\v1\HomeBannersController;
use App\Http\Controllers\Api\v1\AwardsController;
use App\Http\Controllers\Api\v1\AboutUsController;
use App\Http\Controllers\Api\v1\PartnersController;
use App\Http\Controllers\Api\v1\ProjectCategoriesController;
use App\Http\Controllers\Api\v1\ProjectsController;
use App\Http\Controllers\Api\v1\TestimonialsController;
use App\Http\Controllers\Api\v1\UsersController;
use App\Http\Controllers\Api\v1\ServicesController;
use App\Http\Controllers\Api\v1\GeneralInformationController;
use App\Http\Controllers\Api\v1\SocialMediaController;
use App\Http\Controllers\Api\v1\InquiriesController;
use App\Http\Controllers\Api\v1\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('login', [UsersController::class, 'login']);

    // Public Inquiries
    Route::post('add-inquiries', [InquiriesController::class, 'store']);
    Route::get('latest-banner', [HomeBannersController::class, 'latestBanner']);
    Route::get('get-awards', [AwardsController::class, 'getAwards']);
    Route::get('get-partners', [PartnersController::class, 'getPartners']);
    Route::get('get-testimonials', [TestimonialsController::class, 'testimonials']);
    Route::get('get-latest-service', [ServicesController::class,'latestService']);
    Route::get('get-letest-services', [ServicesController::class, 'latestService']);
    Route::get('get-services', [ServicesController::class, 'getServices']);
    Route::get('get-service-data-by-id/{id}', [ServicesController::class, 'getServiceDataById']);
    Route::get('all-project-categories', [ProjectCategoriesController::class,'getAllProjectCategories']);
    Route::get('categories-with-latest-project', [ProjectCategoriesController::class, 'getCategoriesWithLatestProject']);
    Route::get('get-projects', [ProjectsController::class, 'getPublicProjects']);
    Route::get('get-project-details/{hash}', [ProjectsController::class,'getProjectDetails']);
    Route::get('all-about-us-year', [AboutUsController::class, 'getAllAboutUsYear']);
    Route::get('get-about-us-data-by-id/{id}', [AboutUsController::class, 'getAboutUsDataById']);
    Route::get('get-site-info', [GeneralInformationController::class, 'getGeneralInfo']);
    Route::get('get-social-links', [SocialMediaController::class, 'getSocialMediaLinks']);
    Route::get('get-about-us', [AboutUsController::class, 'getAboutUsData']);

    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('logout', [UsersController::class, 'logout']);

        // Dashboard
        Route::get('dashboard-stats', [DashboardController::class, 'index']);

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

        // Project Categories
        Route::get('project-categories', [ProjectCategoriesController::class, 'index']);
        Route::post('add-project-categories', [ProjectCategoriesController::class, 'store']);
        Route::get('fetch-project-categories/{edit}', [ProjectCategoriesController::class, 'fetch']);
        Route::get('delete-project-categories/{delete}', [ProjectCategoriesController::class, 'destroy']);

        // Projects
        Route::get('projects', [ProjectsController::class, 'index']);
        Route::post('add-projects', [ProjectsController::class, 'store']);
        Route::get('fetch-projects/{edit}', [ProjectsController::class, 'fetch']);
        Route::get('delete-projects/{delete}', [ProjectsController::class, 'destroy']);

        // General Information
        Route::get('general-information', [GeneralInformationController::class, 'index']);
        Route::post('add-general-information', [GeneralInformationController::class, 'store']);

        // Social Media
        Route::get('social-media', [SocialMediaController::class, 'index']);
        Route::post('add-social-media', [SocialMediaController::class, 'store']);

        // Inquiries (Contact Us)
        Route::get('inquiries', [InquiriesController::class, 'index']);
        Route::get('fetch-inquiries/{fetch}', [InquiriesController::class, 'fetch']);
        Route::get('delete-inquiries/{delete}', [InquiriesController::class, 'destroy']);
    });
});
