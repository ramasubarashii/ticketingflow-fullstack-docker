<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Add walk-in/non-user reporter fields to tickets table.
     */
    public function up(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->string('reporter_name')->nullable();
            $table->string('reporter_contact')->nullable();
            $table->string('contact_method')->nullable();
            $table->string('contact_method_notes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn([
                'reporter_name',
                'reporter_contact',
                'contact_method',
                'contact_method_notes',
            ]);
        });
    }
};
