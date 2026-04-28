<?php

use App\Http\Middleware\AdminMiddleware;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin' => AdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Throwable $e, $request) {

            if ($request->is('api/*')) {

                // ── 1. Validation Error (422) ─────────────────
                if ($e instanceof ValidationException) {
                    return response()->json([
                        'status'  => false,
                        'message' => 'Validation error.',
                        'errors'  => $e->errors(),
                        'code'    => 422,
                    ], 422);
                }

                // ── 2. Unauthenticated (401) ──────────────────
                if ($e instanceof AuthenticationException) {
                    return response()->json([
                        'status'  => false,
                        'message' => 'Unauthenticated. Please login.',
                        'code'    => 401,
                    ], 401);
                }

                // ── 3. Method Not Allowed (405) ───────────────
                if ($e instanceof MethodNotAllowedHttpException) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Method Not Allowed. Please use the correct HTTP method.',
                        'code' => 405,
                    ], 405);
                }

                // ── 4. Route Not Found (404) ──────────────────
                if ($e instanceof NotFoundHttpException) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Route not found.',
                        'code' => 404,
                    ], 404);
                }

                // ── 5. Forbidden (403) ────────────────────────
                if ($e instanceof AuthorizationException) {
                    return response()->json([
                        'status'  => false,
                        'message' => 'Forbidden. You do not have permission.',
                        'code'    => 403,
                    ], 403);
                }

                // ── 6. Too Many Requests (429) ────────────────
                if ($e instanceof ThrottleRequestsException) {
                    return response()->json([
                        'status'  => false,
                        'message' => 'Too many requests. Please slow down.',
                        'code'    => 429,
                    ], 429);
                }

                // ── 7. Generic HTTP Exception ─────────────────
                if ($e instanceof HttpException) {
                    return response()->json([
                        'status'  => false,
                        'message' => $e->getMessage() ?: 'HTTP error occurred.',
                        'code'    => $e->getStatusCode(),
                    ], $e->getStatusCode());
                }

                // ── 8. Database Error ─────────────────────────
                if ($e instanceof QueryException) {
                    return response()->json([
                        'status'  => false,
                        'message' => 'Database error occurred.',
                        'error'   => config('app.debug') ? $e->getMessage() : null,
                        'code'    => 500,
                    ], 500);
                }

                // ── 9. Unexpected Server Error (500) ──────────
                return response()->json([
                    'status'  => false,
                    'message' => 'Something went wrong.',
                    'error'   => config('app.debug') ? $e->getMessage() : null,
                    'code'    => 500,
                ], 500);
            }
        });
    })->create();
