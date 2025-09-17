@echo off
echo 🗄️  MySQL Setup für Ressourcenmanager
echo.

echo 📊 Prüfe MySQL-Verbindung...
mysql -u root -p"didpwvCSR123" -e "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MySQL ist nicht verfügbar oder Passwort falsch
    echo.
    echo 📋 MANUELLE EINRICHTUNG:
    echo.
    echo 1. MySQL installieren:
    echo    - XAMPP: https://www.apachefriends.org/download.html
    echo    - Oder MySQL Installer: https://dev.mysql.com/downloads/installer/
    echo.
    echo 2. MySQL starten (XAMPP Control Panel oder Windows Services)
    echo.
    echo 3. MySQL Workbench öffnen und Verbindung erstellen:
    echo    - Hostname: localhost
    echo    - Port: 3306
    echo    - Username: root
    echo    - Password: didpwvCSR123
    echo.
    echo 4. In MySQL Workbench ausführen:
    echo    CREATE DATABASE ressourcenmanager;
    echo    USE ressourcenmanager;
    echo.
    echo 5. SQL-Script ausführen: database\setup.sql
    echo.
    echo 📁 SQL-Script öffnen...
    start database\setup.sql
    echo.
    pause
    exit /b 1
)

echo ✅ MySQL-Verbindung erfolgreich
echo.

echo 🗄️  Erstelle Datenbank...
mysql -u root -p"didpwvCSR123" -e "CREATE DATABASE IF NOT EXISTS ressourcenmanager;"
if %errorlevel% neq 0 (
    echo ❌ Fehler beim Erstellen der Datenbank
    pause
    exit /b 1
)

echo ✅ Datenbank 'ressourcenmanager' erstellt
echo.

echo 📋 Erstelle Tabellen und Beispieldaten...
mysql -u root -p"didpwvCSR123" ressourcenmanager < database\setup.sql
if %errorlevel% neq 0 (
    echo ❌ Fehler beim Ausführen des SQL-Scripts
    echo.
    echo 📁 SQL-Script öffnen für manuelle Ausführung...
    start database\setup.sql
    echo.
    echo Bitte führen Sie das SQL-Script in MySQL Workbench aus:
    echo 1. MySQL Workbench öffnen
    echo 2. Verbindung zu localhost:3306 mit root/didpwvCSR123
    echo 3. SQL-Script database\setup.sql öffnen
    echo 4. Script ausführen
    echo.
    pause
    exit /b 1
)

echo ✅ Tabellen und Beispieldaten erstellt
echo.

echo 🎉 MySQL-Setup abgeschlossen!
echo.
echo 📊 Datenbank-Informationen:
echo    Host: localhost
echo    Port: 3306
echo    Database: ressourcenmanager
echo    Username: root
echo    Password: didpwvCSR123
echo.
echo 🚀 Sie können jetzt starten:
echo    npm run dev:backend    (nur Backend)
echo    npm run dev:full       (Backend + Frontend)
echo.
pause
