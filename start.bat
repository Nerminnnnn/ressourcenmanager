@echo off
echo 🚀 Ressourcenmanager wird gestartet...
echo.

echo 📦 Installiere Dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Fehler beim Installieren der Dependencies
    pause
    exit /b 1
)

echo.
echo 🎯 Starte Anwendung...
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8080
echo.
echo Drücken Sie Ctrl+C zum Beenden
echo.

call npm run dev
