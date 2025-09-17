# Ressourcenmanager

Eine moderne Web-Anwendung zur Verwaltung von Items/Ressourcen, entwickelt mit Java Spring Boot Backend und React Frontend.

## Features

- ✅ Items hinzufügen, bearbeiten und löschen
- ✅ Suchfunktion für Items
- ✅ Bestandsverwaltung mit Warnung bei niedrigen Beständen
- ✅ Responsive Design für Desktop und Mobile
- ✅ Moderne UI mit Material Design
- ✅ REST API Backend
- ✅ MySQL Datenbank

## Technologie-Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL 8.0
- Maven

### Frontend
- React 18
- JavaScript ES6+
- CSS3 mit modernen Features
- Lucide React Icons
- Axios für API-Calls

## Installation und Setup

### Voraussetzungen
- Java 17 oder höher
- Node.js 16 oder höher
- MySQL 8.0 oder höher
- Maven 3.6 oder höher

### 🚀 Schnellstart (Empfohlen)

#### Frontend starten (funktioniert immer):
```bash
# 1. Dependencies installieren
npm install

# 2. Frontend starten
npm run dev
```

Die Anwendung startet mit Demo-Daten:
- **Frontend**: http://localhost:3000
- **Status**: Demo-Modus (Backend nicht verfügbar)

#### Vollständige Anwendung (mit Backend):
```bash
# 1. Maven installieren (siehe MAVEN_SETUP.md)
# 2. Dependencies installieren
npm install

# 3. Vollständige Anwendung starten
npm run dev:full
```

Die Anwendung startet mit echtem Backend:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **Status**: Verbunden mit Backend

### 🔧 Manuelles Setup (Falls automatisch nicht funktioniert)

#### 1. Datenbank Setup
```bash
# Automatisch (empfohlen)
node setup.js

# Oder manuell in MySQL Workbench:
# Führen Sie das SQL-Script aus: database/setup.sql
```

#### 2. Dependencies installieren
```bash
# Frontend
cd frontend
npm install

# Backend (im Hauptverzeichnis)
mvn clean install
```

#### 3. Anwendung starten
```bash
# Beide gleichzeitig
npm run dev

# Oder einzeln:
# Backend: mvn spring-boot:run
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

Die Anwendung ist für MySQL konfiguriert mit folgenden Einstellungen:

- **Host:** localhost:3306
- **Datenbank:** ressourcenmanager
- **Benutzername:** root
- **Passwort:** didpwvCSR123

Diese Einstellungen können in `src/main/resources/application.properties` angepasst werden.

## Projektstruktur

```
Ressourcenmanager/
├── src/main/java/com/ressourcenmanager/
│   ├── RessourcenmanagerApplication.java
│   ├── controller/
│   │   └── ItemController.java
│   ├── model/
│   │   └── Item.java
│   ├── repository/
│   │   └── ItemRepository.java
│   └── service/
│       └── ItemService.java
├── src/main/resources/
│   └── application.properties
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── database/
│   └── setup.sql
├── pom.xml
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
mvn spring-boot:run
```

### Frontend entwickeln
```bash
cd frontend
npm start
```

### Tests ausführen
```bash
# Backend Tests
mvn test

# Frontend Tests
cd frontend
npm test
```

## Lizenz

Dieses Projekt ist für Bildungszwecke erstellt.
