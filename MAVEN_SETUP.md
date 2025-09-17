# Maven Installation für Windows

## Warum Maven?
Maven wird benötigt, um das Java Spring Boot Backend zu kompilieren und zu starten.

## Installation

### Option 1: Mit Chocolatey (Empfohlen)
```powershell
# Chocolatey installieren (falls nicht vorhanden)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Maven installieren
choco install maven
```

### Option 2: Manuelle Installation
1. **Maven herunterladen**: https://maven.apache.org/download.cgi
2. **Entpacken** nach `C:\Program Files\Apache\maven`
3. **Umgebungsvariablen setzen**:
   - `MAVEN_HOME` = `C:\Program Files\Apache\maven`
   - `PATH` = `%PATH%;%MAVEN_HOME%\bin`

### Option 3: Mit IntelliJ IDEA
- IntelliJ IDEA installieren
- Maven wird automatisch mit installiert

## Verifikation
```bash
mvn --version
```

## Nach der Installation
```bash
# Backend installieren
npm run install:backend

# Vollständige Anwendung starten
npm run dev:full
```

## Alternative: Nur Frontend verwenden
Falls Maven nicht installiert werden soll, funktioniert die Anwendung auch nur mit dem Frontend:

```bash
npm run dev
```

Die Anwendung verwendet dann Demo-Daten und zeigt "Demo-Modus" an.
