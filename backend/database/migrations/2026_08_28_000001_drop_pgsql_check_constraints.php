<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Drop PostgreSQL auto-generated check constraints on users and tickets tables.
     * These constraints block inserting new role/status values not in the original ENUM.
     * This migration is a no-op on MySQL.
     */
    public function up(): void
    {
        if (DB::getDriverName() !== 'pgsql') {
            return;
        }

        // Drop check constraint on users.role
        DB::statement('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check');

        // Drop check constraint on tickets.status (if any)
        DB::statement('ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_status_check');

        // Drop check constraint on tickets.category (if any)
        DB::statement('ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_category_check');

        // Drop check constraint on tickets.priority (if any)
        DB::statement('ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_priority_check');

        // Drop check constraint on ticket_assignments.estimated_unit (if any)
        DB::statement('ALTER TABLE ticket_assignments DROP CONSTRAINT IF EXISTS ticket_assignments_estimated_unit_check');

        // Drop check constraint on tickets.contact_method (if any)
        DB::statement('ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_contact_method_check');
    }

    public function down(): void
    {
        // Constraints are not restored on rollback
    }
};
