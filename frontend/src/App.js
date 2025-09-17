import React, { useState, useEffect } from 'react';
import { Plus, Package, Search, Edit, Trash2, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import './App.css';
import { mockApi } from './mockApi';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [useMockApi, setUseMockApi] = useState(false);
  const [filters, setFilters] = useState({
    quantityFilter: 'all', // all, low, medium, high
    dateFilter: 'all', // all, today, week, month
    sortBy: 'name', // name, quantity, date
    sortOrder: 'asc' // asc, desc
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 1
  });

  // Items laden
  const fetchItems = async () => {
    try {
      setLoading(true);
      
      if (useMockApi) {
        const data = await mockApi.getItems();
        setItems(data);
      } else {
        const response = await fetch(`${API_BASE_URL}/items`);
        if (!response.ok) {
          throw new Error('Backend nicht verfügbar - wechsle zu Mock-API');
        }
        const data = await response.json();
        setItems(data);
      }
    } catch (err) {
      if (!useMockApi) {
        console.log('Backend nicht verfügbar, verwende Mock-API');
        setUseMockApi(true);
        const data = await mockApi.getItems();
        setItems(data);
        setError('Backend nicht verfügbar - verwende Demo-Daten');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Item hinzufügen/bearbeiten
  const saveItem = async (e) => {
    e.preventDefault();
    try {
      if (useMockApi) {
        if (editingItem) {
          await mockApi.updateItem(editingItem.id, formData);
        } else {
          await mockApi.createItem(formData);
        }
      } else {
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
        await response.json();
      }

      setSuccess(editingItem ? 'Asset erfolgreich aktualisiert!' : 'Asset erfolgreich hinzugefügt!');
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
    if (!window.confirm('Sind Sie sicher, dass Sie dieses Asset löschen möchten?')) {
      return;
    }

    try {
      if (useMockApi) {
        await mockApi.deleteItem(id);
      } else {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Fehler beim Löschen des Items');
        }
      }

      setSuccess('Asset erfolgreich gelöscht!');
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
  // Filter-Funktionen
  const applyFilters = (items) => {
    let filtered = items;

    // Suchfilter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Mengenfilter
    if (filters.quantityFilter !== 'all') {
      filtered = filtered.filter(item => {
        switch (filters.quantityFilter) {
          case 'low':
            return item.quantity < 5;
          case 'medium':
            return item.quantity >= 5 && item.quantity < 20;
          case 'high':
            return item.quantity >= 20;
          default:
            return true;
        }
      });
    }

    // Datumsfilter
    if (filters.dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.createdAt);
        switch (filters.dateFilter) {
          case 'today':
            return itemDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return itemDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return itemDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Sortierung
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'quantity':
          aValue = a.quantity;
          bValue = b.quantity;
          break;
        case 'date':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  // Gefilterte Items
  const filteredItems = applyFilters(items);

  // Filter-Funktionen
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      quantityFilter: 'all',
      dateFilter: 'all',
      sortBy: 'name',
      sortOrder: 'asc'
    });
    setSearchTerm('');
  };

  // Low stock items
  const lowStockItems = items.filter(item => item.quantity < 5);

  useEffect(() => {
    fetchItems();
  }, [useMockApi]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="header-content">
          <h1>Asset Manager</h1>
          <div className="header-actions">
            {useMockApi ? (
              <div className="status-indicator offline">
                <WifiOff size={16} />
                Demo-Modus
              </div>
            ) : (
              <div className="status-indicator online">
                <Wifi size={16} />
                Verbunden
              </div>
            )}
          </div>
        </div>
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


      <div className="controls">
        <div className="search-container">
          <Search className="search-icon" />
            <input
              type="text"
              placeholder="Assets durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Gesamt Assets</h3>
          <p className="stat-number">{items.length}</p>
        </div>
        <div className="stat-card">
          <h3>Gesamt Stückzahl</h3>
          <p className="stat-number">{items.reduce((sum, item) => sum + item.quantity, 0)}</p>
        </div>
      </div>

      {/* Filter-Bereich direkt über der Tabelle */}
      <div className="filters-section">
        <div className="filters-header">
          <h3>Filter & Sortierung</h3>
          <button onClick={resetFilters} className="btn btn-secondary">
            Filter zurücksetzen
          </button>
        </div>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Menge</label>
            <select 
              value={filters.quantityFilter} 
              onChange={(e) => handleFilterChange('quantityFilter', e.target.value)}
              className="filter-select"
            >
              <option value="all">Alle Mengen</option>
              <option value="low">Niedrig (&lt; 5)</option>
              <option value="medium">Mittel (5-19)</option>
              <option value="high">Hoch (≥ 20)</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Erstellt</label>
            <select 
              value={filters.dateFilter} 
              onChange={(e) => handleFilterChange('dateFilter', e.target.value)}
              className="filter-select"
            >
              <option value="all">Alle Daten</option>
              <option value="today">Heute</option>
              <option value="week">Letzte Woche</option>
              <option value="month">Letzter Monat</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sortieren nach</label>
            <select 
              value={filters.sortBy} 
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="filter-select"
            >
              <option value="name">Name</option>
              <option value="quantity">Menge</option>
              <option value="date">Erstellungsdatum</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Reihenfolge</label>
            <select 
              value={filters.sortOrder} 
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
              className="filter-select"
            >
              <option value="asc">Aufsteigend</option>
              <option value="desc">Absteigend</option>
            </select>
          </div>
        </div>

        {/* Aktive Filter anzeigen */}
        {(filters.quantityFilter !== 'all' || filters.dateFilter !== 'all' || searchTerm) && (
          <div className="active-filters">
            <span className="active-filters-label">Aktive Filter:</span>
            <div className="active-filters-list">
              {searchTerm && (
                <span className="filter-tag">
                  Suche: "{searchTerm}"
                </span>
              )}
              {filters.quantityFilter !== 'all' && (
                <span className="filter-tag">
                  Menge: {filters.quantityFilter === 'low' ? 'Niedrig' : 
                          filters.quantityFilter === 'medium' ? 'Mittel' : 'Hoch'}
                </span>
              )}
              {filters.dateFilter !== 'all' && (
                <span className="filter-tag">
                  Datum: {filters.dateFilter === 'today' ? 'Heute' : 
                          filters.dateFilter === 'week' ? 'Letzte Woche' : 'Letzter Monat'}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Assets ({filteredItems.length})</h2>
          <div className="table-actions">
            <button onClick={() => openModal()} className="btn btn-primary">
              <Plus size={16} />
              Asset hinzufügen
            </button>
          </div>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <Package size={64} />
            <h3>Keine Assets gefunden</h3>
            <p>Fügen Sie Ihr erstes Asset hinzu oder ändern Sie Ihre Suchkriterien.</p>
          </div>
        ) : (
          <table className="items-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Beschreibung</th>
                <th>Anzahl</th>
                <th>Erstellt</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id}>
                  <td className="col-name">{item.name}</td>
                  <td className="col-description">
                    {item.description || '-'}
                  </td>
                  <td className="col-quantity">
                    <span className={`quantity-badge ${item.quantity < 5 ? 'low' : ''}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="col-date">
                    {new Date(item.createdAt).toLocaleDateString('de-DE')}
                  </td>
                  <td className="col-actions">
                    <div className="table-actions-cell">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingItem ? 'Asset bearbeiten' : 'Neues Asset hinzufügen'}
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
