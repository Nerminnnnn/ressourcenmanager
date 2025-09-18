# Ressourcenmanager

Eine moderne Web-Anwendung zur Verwaltung von Items/Ressourcen, entwickelt mit Node.js/Express Backend und React Frontend.

## Features

- ✅ Items hinzufügen, bearbeiten und löschen
- ✅ Suchfunktion für Items
- ✅ Bestandsverwaltung mit Warnung bei niedrigen Beständen
- ✅ Responsive Design für Desktop und Mobile
- ✅ Moderne UI mit Material Design
- ✅ REST API Backend
- ✅ SQLite Datenbank

## Technologie-Stack

### Backend
- Node.js 16+
- Express.js
- SQLite3
- CORS Support
- UUID für IDs

### Frontend
- React 18
- JavaScript ES6+
- CSS3 mit modernen Features
- Lucide React Icons
- Fetch API für HTTP-Requests

## Installation und Setup

### Voraussetzungen
- **Node.js 16 oder höher** (erforderlich)
- **npm 8 oder höher** (erforderlich)

### 🚀 Schnellstart (Empfohlen)

#### Vollständige Anwendung starten:
```bash
# 1. Dependencies installieren
npm install

# 2. Anwendung starten (Backend + Frontend)
npm run dev
```

Die Anwendung startet automatisch:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Datenbank**: SQLite (automatisch erstellt)

### 🔧 Manuelles Setup

#### 1. Dependencies installieren
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

#### 2. Anwendung starten
```bash
# Beide gleichzeitig (aus dem Hauptverzeichnis)
npm run dev

# Oder einzeln:
# Backend: cd backend && npm run dev
# Frontend: cd frontend && npm start
```

## API Endpoints

### Items
- `GET /api/items` - Alle Items abrufen
- `GET /api/items/{id}` - Item nach ID abrufen
- `POST /api/items` - Neues Item erstellen
- `PUT /api/items/{id}` - Item aktualisieren
- `DELETE /api/items/{id}` - Item löschen
- `GET /api/items/search?q={term}` - Items durchsuchen
- `GET /api/items/low-stock?threshold={number}` - Items mit niedrigem Bestand

## Datenbank-Konfiguration

Die Anwendung verwendet SQLite als Datenbank:

- **Typ:** SQLite
- **Datei:** `backend/database.sqlite` (automatisch erstellt)
- **Setup:** Automatisch beim ersten Start
- **Sample Data:** Wird automatisch eingefügt

## Projektstruktur

```
Ressourcenmanager/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── database.sqlite (automatisch erstellt)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   └── mockApi.js
│   └── package.json
├── database/
│   └── setup.sql (nicht mehr benötigt)
├── package.json
└── README.md
```

## Verwendung

1. Öffnen Sie http://localhost:3000 in Ihrem Browser
2. Sie sehen eine Liste aller Items mit Suchfunktion
3. Klicken Sie auf "Neues Item" um ein Item hinzuzufügen
4. Verwenden Sie die Bearbeiten/Löschen-Buttons für bestehende Items
5. Items mit niedrigem Bestand (< 5) werden rot markiert

## Entwicklung

### Backend entwickeln
```bash
cd backend
npm run dev
```

### Frontend entwickeln
```bash
cd frontend
npm start
```

### Tests ausführen
```bash
# Frontend Tests
cd frontend
npm test
```

## Lizenz

Dieses Projekt ist für Bildungszwecke erstellt.
