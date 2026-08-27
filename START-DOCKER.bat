@echo off
echo Menjalankan TicketingFlow Docker...
cd /d "%~dp0"
docker compose up -d
echo.
echo Aplikasi siap diakses:
echo  Frontend : http://localhost:5173
echo  Backend  : http://localhost:8000
echo.
pause
