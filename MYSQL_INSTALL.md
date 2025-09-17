# MySQL Installation für Ressourcenmanager

## 🚀 Schnellste Installation: XAMPP

### 1. XAMPP herunterladen und installieren
- **Download**: https://www.apachefriends.org/download.html
- **Version**: XAMPP für Windows (PHP 8.2+)
- **Installation**: Standard-Installation durchführen

### 2. MySQL starten
1. **XAMPP Control Panel** öffnen
2. **MySQL** starten (Button "Start" klicken)
3. **Status**: "Running" sollte angezeigt werden

### 3. Root-Passwort setzen
1. **MySQL Workbench** öffnen (ist bei XAMPP enthalten)
2. **Neue Verbindung** erstellen:
   - **Connection Name**: `Ressourcenmanager`
   - **Hostname**: `localhost`
   - **Port**: `3306`
   - **Username**: `root`
   - **Password**: `didpwvCSR123` (klicken Sie "Store in Vault")

### 4. Datenbank erstellen
```sql
-- In MySQL Workbench ausführen:
CREATE DATABASE ressourcenmanager;
USE ressourcenmanager;
```

### 5. SQL-Script ausführen
Kopieren Sie den Inhalt von `database/setup.sql` und führen Sie ihn in MySQL Workbench aus.

## 🔧 Alternative: MySQL Server

### 1. MySQL Installer
- **Download**: https://dev.mysql.com/downloads/installer/
- **Version**: mysql-installer-community-8.0.xx.x.msi
- **Installation**: "Developer Default" auswählen

### 2. Konfiguration
- **Root-Passwort**: `didpwvCSR123`
- **Port**: `3306`
- **Service**: Als Windows-Service installieren

## ✅ Verifikation

### MySQL-Verbindung testen:
```bash
# In PowerShell/CMD:
mysql -u root -p"didpwvCSR123" -e "SHOW DATABASES;"
```

### Oder in MySQL Workbench:
- Verbindung zu `localhost:3306` mit `root` / `didpwvCSR123`
- Datenbank `ressourcenmanager` sollte existieren

## 🎯 Nach der Installation

### 1. Datenbank einrichten:
```bash
# Automatisch:
setup-mysql.bat

# Oder manuell in MySQL Workbench:
# Führen Sie database/setup.sql aus
```

### 2. Backend starten:
```bash
npm run dev:backend
```

### 3. Vollständige Anwendung:
```bash
npm run dev:full
```

## 🗄️ Datenbank-Informationen

- **Host**: localhost
- **Port**: 3306
- **Datenbank**: ressourcenmanager
- **Benutzername**: root
- **Passwort**: didpwvCSR123

## 🔍 MySQL Workbench verwenden

### Verbindung erstellen:
1. **MySQL Workbench** öffnen
2. **"+"** klicken für neue Verbindung
3. **Einstellungen**:
   - Connection Name: `Ressourcenmanager`
   - Hostname: `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: `didpwvCSR123`
4. **"Test Connection"** klicken
5. **"OK"** klicken

### Datenbank verwalten:
- **Schemas** → `ressourcenmanager` → **Tables** → `items`
- **SQL-Editor** für Abfragen
- **Table Data** für Daten anzeigen/bearbeiten

## 🚨 Troubleshooting

### MySQL startet nicht:
- **XAMPP**: MySQL im Control Panel starten
- **Windows Services**: MySQL-Dienst starten
- **Port 3306**: Prüfen ob Port frei ist

### Verbindungsfehler:
- **Firewall**: Port 3306 freigeben
- **Passwort**: `didpwvCSR123` verwenden
- **Host**: `localhost` oder `127.0.0.1`

### Datenbank nicht gefunden:
```sql
CREATE DATABASE ressourcenmanager;
USE ressourcenmanager;
```
