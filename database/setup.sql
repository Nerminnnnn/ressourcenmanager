-- Erstelle die Datenbank
CREATE DATABASE IF NOT EXISTS ressourcenmanager;
USE ressourcenmanager;

-- Erstelle die Items-Tabelle
CREATE TABLE IF NOT EXISTS items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Füge einige Beispieldaten hinzu
INSERT INTO items (name, description, quantity) VALUES
('Laptop', 'Dell Latitude 5520 - Business Laptop', 15),
('Maus', 'Logitech MX Master 3 - Wireless Maus', 25),
('Tastatur', 'Mechanische Tastatur - Cherry MX Blue', 12),
('Monitor', 'Dell UltraSharp 27" 4K Monitor', 8),
('Drucker', 'HP LaserJet Pro - Schwarz-Weiß Drucker', 5),
('Webcam', 'Logitech C920 HD Pro Webcam', 18),
('Headset', 'Jabra Evolve 75 - Business Headset', 22),
('USB-Kabel', 'USB-C zu USB-A Kabel 2m', 50),
('Netzteil', 'Universal Laptop Netzteil 65W', 30),
('Mauspad', 'XXL Gaming Mauspad 90x40cm', 40);

-- Erstelle einen Index für bessere Performance bei Suchvorgängen
CREATE INDEX idx_items_name ON items(name);
CREATE INDEX idx_items_quantity ON items(quantity);
CREATE INDEX idx_items_created_at ON items(created_at);
