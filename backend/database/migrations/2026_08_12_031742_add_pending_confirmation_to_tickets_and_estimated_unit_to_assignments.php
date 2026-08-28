<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations:
     * 1. Add 'pending_confirmation' to tickets.status enum
     * 2. Add 'estimated_unit' column to ticket_assignments
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement("ALTER TABLE tickets ALTER COLUMN status TYPE VARCHAR(255)");
        } else {
            DB::statement("ALTER TABLE tickets MODIFY COLUMN status ENUM(
                'pending_confirmation',
                'open',
                'escalated_to_pm',
                'assigned',
                'in_progress',
                'pending_review',
                'escalated_to_owner',
                'resolved',
                'closed',
                'rejected'
            ) NOT NULL DEFAULT 'open'");
        }

        Schema::table('ticket_assignments', function (Blueprint $table) {
            $table->string('estimated_unit')->default('hours');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ticket_assignments', function (Blueprint $table) {
            $table->dropColumn('estimated_unit');
        });

        if (DB::getDriverName() === 'pgsql') {
            DB::statement("ALTER TABLE tickets ALTER COLUMN status TYPE VARCHAR(255)");
        } else {
            DB::statement("ALTER TABLE tickets MODIFY COLUMN status ENUM(
                'open',
                'escalated_to_pm',
                'assigned',
                'in_progress',
                'pending_review',
                'escalated_to_owner',
                'resolved',
                'closed',
                'rejected'
            ) NOT NULL DEFAULT 'open'");
        }
    }
};
