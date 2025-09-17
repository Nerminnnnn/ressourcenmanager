package com.ressourcenmanager.config;

import com.ressourcenmanager.model.Item;
import com.ressourcenmanager.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ItemRepository itemRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Prüfe ob bereits Daten vorhanden sind
        if (itemRepository.count() == 0) {
            // Erstelle Beispieldaten
            Item[] sampleItems = {
                new Item("Laptop", "Dell Latitude 5520 - Business Laptop", 15),
                new Item("Maus", "Logitech MX Master 3 - Wireless Maus", 25),
                new Item("Tastatur", "Mechanische Tastatur - Cherry MX Blue", 12),
                new Item("Monitor", "Dell UltraSharp 27\" 4K Monitor", 8),
                new Item("Drucker", "HP LaserJet Pro - Schwarz-Weiß Drucker", 5),
                new Item("Webcam", "Logitech C920 HD Pro Webcam", 18),
                new Item("Headset", "Jabra Evolve 75 - Business Headset", 22),
                new Item("USB-Kabel", "USB-C zu USB-A Kabel 2m", 50),
                new Item("Netzteil", "Universal Laptop Netzteil 65W", 30),
                new Item("Mauspad", "XXL Gaming Mauspad 90x40cm", 40)
            };
            
            // Speichere alle Items
            for (Item item : sampleItems) {
                itemRepository.save(item);
            }
            
            System.out.println("✅ Beispieldaten erfolgreich geladen: " + sampleItems.length + " Items");
        } else {
            System.out.println("ℹ️  Datenbank enthält bereits " + itemRepository.count() + " Items");
        }
    }
}
