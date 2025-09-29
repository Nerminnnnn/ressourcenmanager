# 🏢 Ressourcenmanager

Ein modernes Asset Management System mit React Frontend und Node.js Backend.

## 🚀 Live Demo

- **Frontend:** [Vercel](https://ressourcenmanager.vercel.app)
- **Backend API:** [Railway](https://ressourcenmanager-backend.railway.app/api)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Moderne UI-Bibliothek
- **Lucide React** - Icons
- **Vercel** - Hosting & Deployment

### Backend
- **Node.js** - Server Runtime
- **Express.js** - Web Framework
- **MySQL** - Datenbank
- **Railway** - Hosting & Deployment

## 📁 Projektstruktur

```
├── frontend/              # React Frontend (Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── backend/               # Node.js Backend (Railway)
│   ├── server.js
│   ├── package.json
│   ├── railway.json
│   └── env.example
├── database/
│   └── setup.sql          # MySQL Setup
└── DEPLOYMENT.md          # Deployment Guide
```

## 🚀 Features

- ✅ **Asset Management** - Hinzufügen, Bearbeiten, Löschen
- ✅ **Suchfunktion** - Durchsuchen von Assets
- ✅ **Filter & Sortierung** - Nach Menge, Datum, etc.
- ✅ **Low Stock Alerts** - Warnung bei niedrigen Beständen
- ✅ **Responsive Design** - Mobile & Desktop optimiert
- ✅ **Real-time Updates** - Live Daten ohne Reload

## 🔧 Lokale Entwicklung

### Backend starten:
```bash
cd backend
npm install
cp env.example .env
# Bearbeite .env mit deinen MySQL-Daten
npm run dev
```

### Frontend starten:
```bash
cd frontend
npm install
npm start
```

## 📦 Deployment

Siehe [DEPLOYMENT.md](DEPLOYMENT.md) für detaillierte Anweisungen.

## 👨‍💻 Autor

**Nermin Nokic** - Asset Management System

## 📄 Lizenz

MIT License