#!/bin/bash

echo "🚀 Ressourcenmanager wird gestartet..."
echo

echo "📦 Installiere Dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Fehler beim Installieren der Dependencies"
    exit 1
fi

echo
echo "🎯 Starte Anwendung..."
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8080"
echo
echo "Drücken Sie Ctrl+C zum Beenden"
echo

npm run dev
