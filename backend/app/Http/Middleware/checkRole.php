<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class checkRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Assuming the user is authenticated and you have access to the user object
        if ($request->user()) {
            // Attach the user's role to the user object
            $request->user()->role = $request->user()->role; // Adjust this line based on how you store the user's role
        }

        return $next($request);
    }
}
