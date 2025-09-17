# MySQL-Datenbank Setup für Ressourcenmanager
$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
$password = "didpwvCSR123"

Write-Host "Richte MySQL-Datenbank ein..." -ForegroundColor Green

# Datenbank erstellen
Write-Host "Erstelle Datenbank 'ressourcenmanager'..."
& $mysqlPath -u root -p$password -e "CREATE DATABASE IF NOT EXISTS ressourcenmanager;"

# Tabelle erstellen
Write-Host "Erstelle Tabelle 'items'..."
& $mysqlPath -u root -p$password -e "USE ressourcenmanager; CREATE TABLE IF NOT EXISTS items (id BIGINT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, quantity INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);"

# Beispieldaten einfügen
Write-Host "Fuege Beispieldaten hinzu..."
& $mysqlPath -u root -p$password -e "USE ressourcenmanager; INSERT IGNORE INTO items (name, description, quantity) VALUES ('Laptop', 'Dell Latitude 5520 - Business Laptop', 15), ('Maus', 'Logitech MX Master 3 - Wireless Maus', 25), ('Tastatur', 'Mechanische Tastatur - Cherry MX Blue', 12), ('Monitor', 'Dell UltraSharp 27 4K Monitor', 8), ('Drucker', 'HP LaserJet Pro - Schwarz-Weiss Drucker', 5), ('Webcam', 'Logitech C920 HD Pro Webcam', 18), ('Headset', 'Jabra Evolve 75 - Business Headset', 22), ('USB-Kabel', 'USB-C zu USB-A Kabel 2m', 50), ('Netzteil', 'Universal Laptop Netzteil 65W', 30), ('Mauspad', 'XXL Gaming Mauspad 90x40cm', 40);"

# Indizes erstellen
Write-Host "Erstelle Indizes..."
& $mysqlPath -u root -p$password -e "USE ressourcenmanager; CREATE INDEX IF NOT EXISTS idx_items_name ON items(name); CREATE INDEX IF NOT EXISTS idx_items_quantity ON items(quantity); CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);"

Write-Host "Datenbank erfolgreich eingerichtet!" -ForegroundColor Green
Write-Host "Datenbank-Informationen:" -ForegroundColor Yellow
Write-Host "   Host: localhost" -ForegroundColor White
Write-Host "   Port: 3306" -ForegroundColor White
Write-Host "   Database: ressourcenmanager" -ForegroundColor White
Write-Host "   Username: root" -ForegroundColor White
Write-Host "   Password: didpwvCSR123" -ForegroundColor White
