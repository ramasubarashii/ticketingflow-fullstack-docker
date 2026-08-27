# ─── Base Image: PHP 8.3 dengan Apache ───────────────────────────────────────
FROM php:8.3-cli

# ─── Install Dependensi Sistem & Ekstensi PHP ────────────────────────────────
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ─── Install Composer ────────────────────────────────────────────────────────
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# ─── Set Working Directory ───────────────────────────────────────────────────
WORKDIR /var/www/html

# ─── Salin File Project ──────────────────────────────────────────────────────
COPY . .

# ─── Install Dependensi PHP (Composer) — include dev packages ────────────────
RUN composer install --optimize-autoloader --no-interaction

# ─── Set Permission Folder Storage & Cache ───────────────────────────────────
RUN chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# ─── Expose Port & Jalankan Laravel Dev Server ───────────────────────────────
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
