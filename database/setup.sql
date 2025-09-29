-- MySQL Setup für Ressourcenmanager
-- Diese Datei wird automatisch beim ersten Start des Backends ausgeführt

CREATE DATABASE IF NOT EXISTS ressourcenmanager;
USE ressourcenmanager;

-- Tabelle für Assets erstellen
CREATE TABLE IF NOT EXISTS items (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);
CREATE INDEX IF NOT EXISTS idx_items_quantity ON items(quantity);
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);

-- Beispiel-Daten einfügen (nur wenn Tabelle leer ist)
INSERT IGNORE INTO items (id, name, description, quantity) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Laptop', 'Dell Latitude 5520 - Business Laptop', 15),
('550e8400-e29b-41d4-a716-446655440002', 'Maus', 'Logitech MX Master 3 - Wireless Maus', 25),
('550e8400-e29b-41d4-a716-446655440003', 'Tastatur', 'Mechanische Tastatur - Cherry MX Blue', 12),
('550e8400-e29b-41d4-a716-446655440004', 'Monitor', 'Dell UltraSharp 27" 4K Monitor', 3),
('550e8400-e29b-41d4-a716-446655440005', 'Drucker', 'HP LaserJet Pro - Schwarz-Weiß Drucker', 2);