const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ressourcenmanager',
  port: process.env.DB_PORT || 3306
};

let db;

// Initialize database connection
async function initDatabase() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    
    // Create table if not exists
    await db.execute(`
      CREATE TABLE IF NOT EXISTS items (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Check if table is empty and insert sample data
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM items');
    if (rows[0].count === 0) {
      const sampleItems = [
        {
          id: uuidv4(),
          name: "Laptop",
          description: "Dell Latitude 5520 - Business Laptop",
          quantity: 15
        },
        {
          id: uuidv4(),
          name: "Maus",
          description: "Logitech MX Master 3 - Wireless Maus",
          quantity: 25
        },
        {
          id: uuidv4(),
          name: "Tastatur",
          description: "Mechanische Tastatur - Cherry MX Blue",
          quantity: 12
        },
        {
          id: uuidv4(),
          name: "Monitor",
          description: "Dell UltraSharp 27\" 4K Monitor",
          quantity: 3
        },
        {
          id: uuidv4(),
          name: "Drucker",
          description: "HP LaserJet Pro - Schwarz-Weiß Drucker",
          quantity: 2
        }
      ];

      for (const item of sampleItems) {
        await db.execute(
          'INSERT INTO items (id, name, description, quantity) VALUES (?, ?, ?, ?)',
          [item.id, item.name, item.description, item.quantity]
        );
      }
      console.log('Sample data inserted');
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

// Routes

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM items ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM items WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new item
app.post('/api/items', async (req, res) => {
  try {
    const { name, description, quantity } = req.body;
    
    // Validation
    if (!name || !quantity) {
      return res.status(400).json({ error: 'Name and quantity are required' });
    }
    
    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity must be positive' });
    }

    const id = uuidv4();
    
    await db.execute(
      'INSERT INTO items (id, name, description, quantity) VALUES (?, ?, ?, ?)',
      [id, name, description || '', quantity]
    );
    
    // Return the created item
    const [rows] = await db.execute('SELECT * FROM items WHERE id = ?', [id]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update item
app.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, quantity } = req.body;
    
    // Validation
    if (!name || !quantity) {
      return res.status(400).json({ error: 'Name and quantity are required' });
    }
    
    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity must be positive' });
    }

    const [result] = await db.execute(
      'UPDATE items SET name = ?, description = ?, quantity = ? WHERE id = ?',
      [name, description || '', quantity, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Return the updated item
    const [rows] = await db.execute('SELECT * FROM items WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.execute('DELETE FROM items WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search items
app.get('/api/items/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const searchTerm = `%${q}%`;
    const [rows] = await db.execute(
      'SELECT * FROM items WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC',
      [searchTerm, searchTerm]
    );
    
    res.json(rows);
  } catch (error) {
    console.error('Error searching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get low stock items
app.get('/api/items/low-stock', async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 5;
    
    const [rows] = await db.execute(
      'SELECT * FROM items WHERE quantity < ? ORDER BY quantity ASC',
      [threshold]
    );
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
async function startServer() {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
}

startServer().catch(console.error);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  if (db) {
    await db.end();
    console.log('Database connection closed.');
  }
  process.exit(0);
});