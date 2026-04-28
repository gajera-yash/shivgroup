<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $role = Role::where('role_name', 'admin')->firstOrFail();

        User::updateOrCreate([
            'email' => 'admin@shivgroup.com',
        ], [
            'name' => 'Admin',
            'password' => Hash::make('Test@123'),
            'role_id' => $role->id, // ensure column exists
        ]);
    }
}
