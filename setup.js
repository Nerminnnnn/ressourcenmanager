const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Ressourcenmanager Setup wird gestartet...\n');

// Prüfe ob MySQL verfügbar ist
function checkMySQL() {
  try {
    console.log('📊 Prüfe MySQL-Verbindung...');
    execSync('mysql --version', { stdio: 'pipe' });
    console.log('✅ MySQL ist verfügbar\n');
    return true;
  } catch (error) {
    console.log('❌ MySQL ist nicht verfügbar oder nicht im PATH');
    console.log('Bitte stellen Sie sicher, dass MySQL installiert und gestartet ist.\n');
    return false;
  }
}

// Erstelle die Datenbank
function setupDatabase() {
  try {
    console.log('🗄️  Richte Datenbank ein...');
    const sqlFile = path.join(__dirname, 'database', 'setup.sql');
    
    if (!fs.existsSync(sqlFile)) {
      console.log('❌ SQL-Setup-Datei nicht gefunden');
      return false;
    }

    // Führe das SQL-Script aus
    execSync(`mysql -u root -p"didpwvCSR123" < "${sqlFile}"`, { 
      stdio: 'pipe',
      cwd: __dirname 
    });
    
    console.log('✅ Datenbank erfolgreich eingerichtet\n');
    return true;
  } catch (error) {
    console.log('❌ Fehler beim Einrichten der Datenbank:');
    console.log('Bitte führen Sie das SQL-Script manuell in MySQL Workbench aus:');
    console.log('📁 database/setup.sql\n');
    return false;
  }
}

// Installiere Dependencies
function installDependencies() {
  try {
    console.log('📦 Installiere Frontend-Dependencies...');
    execSync('cd frontend && npm install', { stdio: 'inherit' });
    console.log('✅ Frontend-Dependencies installiert\n');
    
    console.log('☕ Installiere Backend-Dependencies...');
    execSync('mvn clean install -DskipTests', { stdio: 'inherit' });
    console.log('✅ Backend-Dependencies installiert\n');
    
    return true;
  } catch (error) {
    console.log('❌ Fehler beim Installieren der Dependencies');
    console.log('Bitte stellen Sie sicher, dass Node.js und Maven installiert sind.\n');
    return false;
  }
}

// Hauptfunktion
async function main() {
  console.log('🎯 Ressourcenmanager Setup\n');
  console.log('Dieses Script wird:');
  console.log('1. MySQL-Verbindung prüfen');
  console.log('2. Datenbank einrichten');
  console.log('3. Dependencies installieren\n');
  
  const mysqlOk = checkMySQL();
  const dbOk = mysqlOk ? setupDatabase() : false;
  const depsOk = installDependencies();
  
  console.log('📋 Setup-Zusammenfassung:');
  console.log(`MySQL: ${mysqlOk ? '✅' : '❌'}`);
  console.log(`Datenbank: ${dbOk ? '✅' : '❌'}`);
  console.log(`Dependencies: ${depsOk ? '✅' : '❌'}\n`);
  
  if (depsOk) {
    console.log('🎉 Setup abgeschlossen!');
    console.log('Starten Sie die Anwendung mit: npm run dev\n');
    console.log('📱 Frontend: http://localhost:3000');
    console.log('🔧 Backend:  http://localhost:8080\n');
  } else {
    console.log('⚠️  Setup nicht vollständig abgeschlossen.');
    console.log('Bitte beheben Sie die oben genannten Fehler und versuchen Sie es erneut.\n');
  }
}

main().catch(console.error);
