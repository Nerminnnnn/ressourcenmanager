const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert sample data if table is empty
  db.get("SELECT COUNT(*) as count FROM items", (err, row) => {
    if (err) {
      console.error('Error checking items count:', err);
    } else if (row.count === 0) {
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

      const stmt = db.prepare("INSERT INTO items (id, name, description, quantity) VALUES (?, ?, ?, ?)");
      sampleItems.forEach(item => {
        stmt.run(item.id, item.name, item.description, item.quantity);
      });
      stmt.finalize();
      console.log('Sample data inserted');
    }
  });
});

// Routes

// Get all items
app.get('/api/items', (req, res) => {
  db.all("SELECT * FROM items ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Get item by ID
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error('Error fetching item:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });
});

// Create new item
app.post('/api/items', (req, res) => {
  const { name, description, quantity } = req.body;
  
  // Validation
  if (!name || !quantity) {
    return res.status(400).json({ error: 'Name and quantity are required' });
  }
  
  if (quantity < 0) {
    return res.status(400).json({ error: 'Quantity must be positive' });
  }

  const id = uuidv4();
  const now = new Date().toISOString();
  
  db.run(
    "INSERT INTO items (id, name, description, quantity, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
    [id, name, description || '', quantity, now, now],
    function(err) {
      if (err) {
        console.error('Error creating item:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Return the created item
        db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => {
          if (err) {
            console.error('Error fetching created item:', err);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.status(201).json(row);
          }
        });
      }
    }
  );
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;
  
  // Validation
  if (!name || !quantity) {
    return res.status(400).json({ error: 'Name and quantity are required' });
  }
  
  if (quantity < 0) {
    return res.status(400).json({ error: 'Quantity must be positive' });
  }

  const now = new Date().toISOString();
  
  db.run(
    "UPDATE items SET name = ?, description = ?, quantity = ?, updated_at = ? WHERE id = ?",
    [name, description || '', quantity, now, id],
    function(err) {
      if (err) {
        console.error('Error updating item:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        // Return the updated item
        db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => {
          if (err) {
            console.error('Error fetching updated item:', err);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.json(row);
          }
        });
      }
    }
  );
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  
  db.run("DELETE FROM items WHERE id = ?", [id], function(err) {
    if (err) {
      console.error('Error deleting item:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.status(204).send();
    }
  });
});

// Search items
app.get('/api/items/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const searchTerm = `%${q}%`;
  db.all(
    "SELECT * FROM items WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC",
    [searchTerm, searchTerm],
    (err, rows) => {
      if (err) {
        console.error('Error searching items:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(rows);
      }
    }
  );
});

// Get low stock items
app.get('/api/items/low-stock', (req, res) => {
  const threshold = parseInt(req.query.threshold) || 5;
  
  db.all(
    "SELECT * FROM items WHERE quantity < ? ORDER BY quantity ASC",
    [threshold],
    (err, rows) => {
      if (err) {
        console.error('Error fetching low stock items:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(rows);
      }
    }
  );
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});
