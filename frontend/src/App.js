import React, { useState, useEffect } from 'react';
import { Plus, Package, Search, Edit, Trash2, AlertTriangle } from 'lucide-react';
import './App.css';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 1
  });

  // Items laden
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Items');
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Item hinzufügen/bearbeiten
  const saveItem = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem 
        ? `${API_BASE_URL}/items/${editingItem.id}`
        : `${API_BASE_URL}/items`;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern des Items');
      }

      setSuccess(editingItem ? 'Item erfolgreich aktualisiert!' : 'Item erfolgreich hinzugefügt!');
      setShowModal(false);
      setEditingItem(null);
      setFormData({ name: '', description: '', quantity: 1 });
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  // Item löschen
  const deleteItem = async (id) => {
    if (!window.confirm('Sind Sie sicher, dass Sie dieses Item löschen möchten?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Items');
      }

      setSuccess('Item erfolgreich gelöscht!');
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  // Modal öffnen
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description || '',
        quantity: item.quantity
      });
    } else {
      setEditingItem(null);
      setFormData({ name: '', description: '', quantity: 1 });
    }
    setShowModal(true);
  };

  // Modal schließen
  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ name: '', description: '', quantity: 1 });
  };

  // Items filtern
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Low stock items
  const lowStockItems = items.filter(item => item.quantity < 5);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>
          <Package className="header-icon" />
          Ressourcenmanager
        </h1>
        <p>Verwalten Sie Ihre Items effizient</p>
      </header>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      {lowStockItems.length > 0 && (
        <div className="alert alert-error">
          <AlertTriangle className="alert-icon" />
          <strong>Niedrige Bestände:</strong> {lowStockItems.length} Item(s) haben weniger als 5 Stück
        </div>
      )}

      <div className="controls">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Items durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={() => openModal()} className="btn btn-primary">
          <Plus size={20} />
          Neues Item
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Gesamt Items</h3>
          <p className="stat-number">{items.length}</p>
        </div>
        <div className="stat-card">
          <h3>Niedrige Bestände</h3>
          <p className="stat-number warning">{lowStockItems.length}</p>
        </div>
        <div className="stat-card">
          <h3>Gesamt Stückzahl</h3>
          <p className="stat-number">{items.reduce((sum, item) => sum + item.quantity, 0)}</p>
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <Package size={64} />
            <h3>Keine Items gefunden</h3>
            <p>Fügen Sie Ihr erstes Item hinzu oder ändern Sie Ihre Suchkriterien.</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <h3>{item.name}</h3>
                <div className="item-actions">
                  <button
                    onClick={() => openModal(item)}
                    className="btn-icon"
                    title="Bearbeiten"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="btn-icon danger"
                    title="Löschen"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {item.description && (
                <p className="item-description">{item.description}</p>
              )}
              <div className="item-quantity">
                <span className={`quantity-badge ${item.quantity < 5 ? 'low' : ''}`}>
                  {item.quantity} Stück
                </span>
              </div>
              <div className="item-meta">
                <small>Erstellt: {new Date(item.createdAt).toLocaleDateString('de-DE')}</small>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingItem ? 'Item bearbeiten' : 'Neues Item hinzufügen'}
              </h2>
              <button onClick={closeModal} className="close-btn">×</button>
            </div>
            <form onSubmit={saveItem}>
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Beschreibung</label>
                <textarea
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Anzahl *</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn">
                  Abbrechen
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingItem ? 'Aktualisieren' : 'Hinzufügen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
