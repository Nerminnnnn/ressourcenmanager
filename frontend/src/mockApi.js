// Mock API für Frontend-Entwicklung ohne Backend
const MOCK_ITEMS = [
  {
    id: 1,
    name: "Laptop",
    description: "Dell Latitude 5520 - Business Laptop",
    quantity: 15,
    createdAt: "2024-01-15T10:30:00",
    updatedAt: "2024-01-15T10:30:00"
  },
  {
    id: 2,
    name: "Maus",
    description: "Logitech MX Master 3 - Wireless Maus",
    quantity: 25,
    createdAt: "2024-01-15T10:35:00",
    updatedAt: "2024-01-15T10:35:00"
  },
  {
    id: 3,
    name: "Tastatur",
    description: "Mechanische Tastatur - Cherry MX Blue",
    quantity: 12,
    createdAt: "2024-01-15T10:40:00",
    updatedAt: "2024-01-15T10:40:00"
  },
  {
    id: 4,
    name: "Monitor",
    description: "Dell UltraSharp 27\" 4K Monitor",
    quantity: 3,
    createdAt: "2024-01-15T10:45:00",
    updatedAt: "2024-01-15T10:45:00"
  },
  {
    id: 5,
    name: "Drucker",
    description: "HP LaserJet Pro - Schwarz-Weiß Drucker",
    quantity: 2,
    createdAt: "2024-01-15T10:50:00",
    updatedAt: "2024-01-15T10:50:00"
  }
];

let nextId = 6;

// Simuliere Netzwerk-Delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Alle Assets abrufen
  async getItems() {
    await delay(500);
    return [...MOCK_ITEMS];
  },

  // Asset nach ID abrufen
  async getItem(id) {
    await delay(300);
    return MOCK_ITEMS.find(item => item.id === parseInt(id));
  },

  // Neues Asset erstellen
  async createItem(itemData) {
    await delay(400);
    const newItem = {
      id: nextId++,
      ...itemData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    MOCK_ITEMS.push(newItem);
    return newItem;
  },

  // Asset aktualisieren
  async updateItem(id, itemData) {
    await delay(400);
    const index = MOCK_ITEMS.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw new Error('Asset nicht gefunden');
    }
    
    MOCK_ITEMS[index] = {
      ...MOCK_ITEMS[index],
      ...itemData,
      updatedAt: new Date().toISOString()
    };
    return MOCK_ITEMS[index];
  },

  // Asset löschen
  async deleteItem(id) {
    await delay(300);
    const index = MOCK_ITEMS.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw new Error('Asset nicht gefunden');
    }
    
    MOCK_ITEMS.splice(index, 1);
    return true;
  },

  // Assets durchsuchen
  async searchItems(searchTerm) {
    await delay(300);
    const term = searchTerm.toLowerCase();
    return MOCK_ITEMS.filter(item =>
      item.name.toLowerCase().includes(term) ||
      (item.description && item.description.toLowerCase().includes(term))
    );
  },

  // Assets mit niedrigem Bestand
  async getLowStockItems(threshold = 5) {
    await delay(300);
    return MOCK_ITEMS.filter(item => item.quantity < threshold);
  }
};
