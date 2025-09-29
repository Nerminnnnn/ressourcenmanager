# Ressourcenmanager - Deployment Guide

Dieses Projekt ist für das Deployment auf Vercel (Frontend) und Railway (Backend + MySQL) vorbereitet.

## 🚀 Schnellstart

### 1. Repository Setup
1. Pushe deinen Code zu GitHub
2. Stelle sicher, dass beide Ordner (`frontend/` und `backend/`) im Root-Verzeichnis sind

### 2. Backend auf Railway deployen

#### Railway Setup:
1. Gehe zu [railway.app](https://railway.app) und logge dich ein
2. Klicke auf "New Project" → "Deploy from GitHub repo"
3. Wähle dein Repository aus
4. Wähle den `backend/` Ordner als Root Directory

#### MySQL Datenbank hinzufügen:
1. In deinem Railway Projekt: "New" → "Database" → "Add MySQL"
2. Warte bis die Datenbank erstellt ist
3. Kopiere die Verbindungsdaten (Host, User, Password, Database, Port)

#### Umgebungsvariablen setzen:
In Railway → Variables:
```
DB_HOST=<deine-mysql-host>
DB_USER=<deine-mysql-user>
DB_PASSWORD=<deine-mysql-password>
DB_NAME=<deine-mysql-database>
DB_PORT=3306
NODE_ENV=production
FRONTEND_URL=https://deine-frontend-url.vercel.app
```

#### Deploy:
- Railway deployt automatisch bei jedem Push zum `main` Branch
- Die URL findest du unter "Settings" → "Domains"

### 3. Frontend auf Vercel deployen

#### Vercel Setup:
1. Gehe zu [vercel.com](https://vercel.com) und logge dich ein
2. Klicke auf "New Project" → "Import Git Repository"
3. Wähle dein Repository aus
4. Setze "Root Directory" auf `frontend`

#### Build Settings:
- Framework Preset: `Create React App`
- Build Command: `npm run build`
- Output Directory: `build`

#### Umgebungsvariablen setzen:
In Vercel → Settings → Environment Variables:
```
REACT_APP_API_URL=https://deine-backend-url.railway.app/api
```

#### Deploy:
- Vercel deployt automatisch bei jedem Push zum `main` Branch
- Die URL findest du im Dashboard

## 🔧 Lokale Entwicklung

### Backend starten:
```bash
cd backend
npm install
cp env.example .env
# Bearbeite .env mit deinen lokalen MySQL-Daten
npm run dev
```

### Frontend starten:
```bash
cd frontend
npm install
npm start
```

## 📁 Projektstruktur

```
├── backend/                 # Node.js Backend
│   ├── server.js           # Express Server
│   ├── package.json        # Dependencies
│   ├── railway.json        # Railway Konfiguration
│   └── env.example         # Umgebungsvariablen Template
├── frontend/               # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json        # Dependencies
│   └── vercel.json         # Vercel Konfiguration
├── database/
│   └── setup.sql           # MySQL Setup Script
└── DEPLOYMENT.md           # Diese Datei
```

## 🌐 URLs nach Deployment

- **Frontend**: `https://ressourcenmanager-frontend.vercel.app`
- **Backend**: `https://ressourcenmanager-backend.railway.app`
- **API**: `https://ressourcenmanager-backend.railway.app/api`

## 🔍 Troubleshooting

### Backend startet nicht:
- Prüfe die Umgebungsvariablen in Railway
- Stelle sicher, dass MySQL läuft
- Schaue in die Railway Logs

### Frontend kann Backend nicht erreichen:
- Prüfe `REACT_APP_API_URL` in Vercel
- Stelle sicher, dass CORS richtig konfiguriert ist
- Prüfe die Backend-URL

### Datenbank-Verbindung:
- Prüfe alle DB_* Umgebungsvariablen
- Stelle sicher, dass die MySQL-Datenbank läuft
- Schaue in die Backend-Logs für Verbindungsfehler

## 📝 Wichtige Hinweise

1. **Keine Dockerfiles**: Das Projekt nutzt die nativen Build-Systeme von Railway und Vercel
2. **Automatisches Deployment**: Bei jedem Push zum `main` Branch wird automatisch deployed
3. **Umgebungsvariablen**: Alle sensiblen Daten werden über Umgebungsvariablen verwaltet
4. **MySQL**: Die Datenbank wird automatisch mit der Tabelle und Beispieldaten erstellt

## 🆘 Support

Bei Problemen:
1. Prüfe die Logs in Railway/Vercel
2. Teste die API direkt: `https://deine-backend-url.railway.app/api/health`
3. Prüfe die Umgebungsvariablen
4. Schaue in die Browser-Konsole für Frontend-Fehler
