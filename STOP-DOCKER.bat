@echo off
echo Menghentikan TicketingFlow Docker...
cd /d "%~dp0"
docker compose down
echo.
echo Semua container telah dihentikan.
echo.
pause
