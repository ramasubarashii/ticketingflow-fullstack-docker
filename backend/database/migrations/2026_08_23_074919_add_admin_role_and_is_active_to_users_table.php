<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Modify the role column and drop old check constraint on PostgreSQL
        if (DB::getDriverName() === 'pgsql') {
            DB::statement("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check");
            DB::statement("ALTER TABLE users ALTER COLUMN role TYPE VARCHAR(255)");
        } else {
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('service_desk','project_manager','programmer','owner','client','admin') NOT NULL DEFAULT 'client'");
        }

        // Add is_active field if it doesn't already exist
        if (!Schema::hasColumn('users', 'is_active')) {
            Schema::table('users', function (Blueprint $table) {
                $table->boolean('is_active')->default(true);
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'is_active')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('is_active');
            });
        }

        if (DB::getDriverName() === 'pgsql') {
            DB::statement("ALTER TABLE users ALTER COLUMN role TYPE VARCHAR(255)");
        } else {
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('service_desk','project_manager','programmer','owner','client') NOT NULL DEFAULT 'client'");
        }
    }
};
