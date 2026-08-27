# ─── Base Image: Node.js 20 Alpine (ringan) ──────────────────────────────────
FROM node:20-alpine

# ─── Set Working Directory ───────────────────────────────────────────────────
WORKDIR /app

# ─── Salin package.json Terlebih Dahulu (untuk cache layer npm install) ──────
COPY package.json package-lock.json* ./

# ─── Install Dependensi Node.js ──────────────────────────────────────────────
RUN npm install

# ─── Salin Seluruh File Frontend ─────────────────────────────────────────────
COPY . .

# ─── Expose Port Vite Dev Server ─────────────────────────────────────────────
EXPOSE 5173

# ─── Jalankan Vite Dev Server (host 0.0.0.0 agar bisa diakses dari luar container)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
