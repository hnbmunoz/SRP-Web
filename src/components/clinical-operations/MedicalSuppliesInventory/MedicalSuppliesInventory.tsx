import React, { useState, useMemo } from 'react';
import {
  FaBoxes,
  FaDollarSign,
  FaExclamationTriangle,
  FaTimes,
  FaClock,
  FaSkull,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaDownload,
  FaFilter,
  FaSearch
} from 'react-icons/fa';
import type { MedicalSupply, InventoryFilters, InventoryStats, InventoryFormData } from './types';
import { SupplyCategory, SupplyStatus } from './types';
import { sampleMedicalSupplies, locations, suppliers } from './sampleData';
import styles from './MedicalSuppliesInventory.module.scss';

const MedicalSuppliesInventory: React.FC = () => {
  const [supplies, setSupplies] = useState<MedicalSupply[]>(sampleMedicalSupplies);
  const [filters, setFilters] = useState<InventoryFilters>({});
  const [isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedSupply, setSelectedSupply] = useState<MedicalSupply | null>(null);
  const [formData, setFormData] = useState<InventoryFormData>({
    name: '',
    category: SupplyCategory.MEDICATIONS,
    description: '',
    currentStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    unit: '',
    unitCost: 0,
    supplier: '',
    expirationDate: '',
    batchNumber: '',
    location: '',
    status: SupplyStatus.IN_STOCK
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculate inventory statistics
  const stats: InventoryStats = useMemo(() => {
    const totalItems = supplies.length;
    const totalValue = supplies.reduce((sum, supply) => sum + (supply.currentStock * supply.unitCost), 0);
    const lowStockItems = supplies.filter(supply => 
      supply.currentStock <= supply.minimumStock && supply.currentStock > 0
    ).length;
    const outOfStockItems = supplies.filter(supply => supply.currentStock === 0).length;
    
    // Calculate expiring soon (within 3 months)
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    const expiringSoonItems = supplies.filter(supply => {
      if (!supply.expirationDate) return false;
      const expirationDate = new Date(supply.expirationDate);
      return expirationDate <= threeMonthsFromNow && expirationDate > new Date();
    }).length;

    // Calculate expired items
    const expiredItems = supplies.filter(supply => {
      if (!supply.expirationDate) return false;
      return new Date(supply.expirationDate) <= new Date();
    }).length;

    return {
      totalItems,
      totalValue,
      lowStockItems,
      outOfStockItems,
      expiringSoonItems,
      expiredItems
    };
  }, [supplies]);

  // Filter supplies based on current filters
  const filteredSupplies = useMemo(() => {
    return supplies.filter(supply => {
      // Category filter
      if (filters.category && supply.category !== filters.category) {
        return false;
      }

      // Status filter
      if (filters.status && supply.status !== filters.status) {
        return false;
      }

      // Location filter
      if (filters.location && !supply.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (!supply.name.toLowerCase().includes(searchLower) && 
            !supply.description.toLowerCase().includes(searchLower) &&
            !supply.supplier.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Low stock filter
      if (filters.showLowStock && supply.currentStock > supply.minimumStock) {
        return false;
      }

      // Expiring soon filter
      if (filters.showExpiringSoon) {
        if (!supply.expirationDate) return false;
        const threeMonthsFromNow = new Date();
        threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
        const expirationDate = new Date(supply.expirationDate);
        if (expirationDate > threeMonthsFromNow || expirationDate <= new Date()) {
          return false;
        }
      }

      return true;
    });
  }, [supplies, filters]);

  const handleFilterChange = (key: keyof InventoryFilters, value: string | boolean | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const openModal = (mode: 'create' | 'edit' | 'view', supply?: MedicalSupply) => {
    setModalMode(mode);
    setSelectedSupply(supply || null);
    
    if (mode === 'create') {
      setFormData({
        name: '',
        category: SupplyCategory.MEDICATIONS,
        description: '',
        currentStock: 0,
        minimumStock: 0,
        maximumStock: 0,
        unit: '',
        unitCost: 0,
        supplier: '',
        expirationDate: '',
        batchNumber: '',
        location: '',
        status: SupplyStatus.IN_STOCK
      });
    } else if (supply) {
      setFormData({
        name: supply.name,
        category: supply.category,
        description: supply.description,
        currentStock: supply.currentStock,
        minimumStock: supply.minimumStock,
        maximumStock: supply.maximumStock,
        unit: supply.unit,
        unitCost: supply.unitCost,
        supplier: supply.supplier,
        expirationDate: supply.expirationDate || '',
        batchNumber: supply.batchNumber || '',
        location: supply.location,
        status: supply.status
      });
    }
    
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSupply(null);
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Supply name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.unit.trim()) errors.unit = 'Unit is required';
    if (!formData.supplier.trim()) errors.supplier = 'Supplier is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (formData.currentStock < 0) errors.currentStock = 'Current stock cannot be negative';
    if (formData.minimumStock < 0) errors.minimumStock = 'Minimum stock cannot be negative';
    if (formData.maximumStock <= 0) errors.maximumStock = 'Maximum stock must be greater than 0';
    if (formData.minimumStock >= formData.maximumStock) errors.minimumStock = 'Minimum stock must be less than maximum stock';
    if (formData.unitCost < 0) errors.unitCost = 'Unit cost cannot be negative';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const now = new Date().toISOString();
    
    if (modalMode === 'create') {
      const newSupply: MedicalSupply = {
        id: `MS${String(supplies.length + 1).padStart(3, '0')}`,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        currentStock: formData.currentStock,
        minimumStock: formData.minimumStock,
        maximumStock: formData.maximumStock,
        unit: formData.unit,
        unitCost: formData.unitCost,
        supplier: formData.supplier,
        expirationDate: formData.expirationDate || undefined,
        batchNumber: formData.batchNumber || undefined,
        location: formData.location,
        status: formData.status,
        lastUpdated: now,
        createdAt: now
      };
      
      setSupplies(prev => [...prev, newSupply]);
    } else if (modalMode === 'edit' && selectedSupply) {
      const updatedSupply: MedicalSupply = {
        ...selectedSupply,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        currentStock: formData.currentStock,
        minimumStock: formData.minimumStock,
        maximumStock: formData.maximumStock,
        unit: formData.unit,
        unitCost: formData.unitCost,
        supplier: formData.supplier,
        expirationDate: formData.expirationDate || undefined,
        batchNumber: formData.batchNumber || undefined,
        location: formData.location,
        status: formData.status,
        lastUpdated: now
      };
      
      setSupplies(prev => prev.map(s => s.id === selectedSupply.id ? updatedSupply : s));
    }
    
    closeModal();
  };

  const handleDelete = (supply: MedicalSupply) => {
    if (window.confirm(`Are you sure you want to delete ${supply.name}?`)) {
      setSupplies(prev => prev.filter(s => s.id !== supply.id));
    }
  };

  const getStatusBadgeClass = (status: SupplyStatus) => {
    switch (status) {
      case SupplyStatus.IN_STOCK:
        return styles.inStock;
      case SupplyStatus.LOW_STOCK:
        return styles.lowStock;
      case SupplyStatus.OUT_OF_STOCK:
        return styles.outOfStock;
      case SupplyStatus.EXPIRED:
        return styles.expired;
      case SupplyStatus.DISCONTINUED:
        return styles.discontinued;
      default:
        return '';
    }
  };

  const getStockLevelClass = (current: number, _minimum: number, maximum: number) => {
    const percentage = (current / maximum) * 100;
    if (percentage <= 20) return styles.low;
    if (percentage <= 50) return styles.medium;
    return styles.high;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className={styles.inventoryContainer}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          Loading inventory data...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inventoryContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Medical Supplies Inventory</h1>
        <div className={styles.headerActions}>
          <button
            className={`${styles.actionButtons} ${styles.primary}`}
            onClick={() => openModal('create')}
          >
            <FaPlus /> Add New Supply
          </button>
          <button className={styles.actionButtons}>
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaBoxes className={`${styles.statIcon} ${styles.total}`} />
            <span className={styles.statTitle}>Total Items</span>
          </div>
          <div className={styles.statValue}>{stats.totalItems}</div>
          <div className={styles.statSubtext}>Active inventory items</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaDollarSign className={`${styles.statIcon} ${styles.value}`} />
            <span className={styles.statTitle}>Total Value</span>
          </div>
          <div className={styles.statValue}>{formatCurrency(stats.totalValue)}</div>
          <div className={styles.statSubtext}>Current inventory value</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaExclamationTriangle className={`${styles.statIcon} ${styles.low}`} />
            <span className={styles.statTitle}>Low Stock</span>
          </div>
          <div className={styles.statValue}>{stats.lowStockItems}</div>
          <div className={styles.statSubtext}>Items below minimum</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaTimes className={`${styles.statIcon} ${styles.out}`} />
            <span className={styles.statTitle}>Out of Stock</span>
          </div>
          <div className={styles.statValue}>{stats.outOfStockItems}</div>
          <div className={styles.statSubtext}>Items need restocking</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaClock className={`${styles.statIcon} ${styles.expiring}`} />
            <span className={styles.statTitle}>Expiring Soon</span>
          </div>
          <div className={styles.statValue}>{stats.expiringSoonItems}</div>
          <div className={styles.statSubtext}>Within 3 months</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaSkull className={`${styles.statIcon} ${styles.expired}`} />
            <span className={styles.statTitle}>Expired</span>
          </div>
          <div className={styles.statValue}>{stats.expiredItems}</div>
          <div className={styles.statSubtext}>Require disposal</div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersHeader}>
          <h3><FaFilter /> Filters</h3>
          <button className={styles.clearFilters} onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
        
        <div className={styles.filtersGrid}>
          <div className={styles.filterGroup}>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, description, or supplier..."
              value={filters.searchTerm || ''}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
            >
              <option value="">All Categories</option>
              {Object.values(SupplyCategory).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
            >
              <option value="">All Statuses</option>
              {Object.values(SupplyStatus).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Filter by location..."
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterCheckboxes}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="lowStock"
              checked={filters.showLowStock || false}
              onChange={(e) => handleFilterChange('showLowStock', e.target.checked)}
            />
            <label htmlFor="lowStock">Show Low Stock Only</label>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="expiringSoon"
              checked={filters.showExpiringSoon || false}
              onChange={(e) => handleFilterChange('showExpiringSoon', e.target.checked)}
            />
            <label htmlFor="expiringSoon">Show Expiring Soon Only</label>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className={styles.inventoryTable}>
        <div className={styles.tableHeader}>
          <h3>Inventory Items ({filteredSupplies.length})</h3>
          <div className={styles.tableActions}>
            <button className={styles.actionButtons}>
              <FaSearch /> Advanced Search
            </button>
          </div>
        </div>

        {filteredSupplies.length === 0 ? (
          <div className={styles.emptyState}>
            <FaBoxes className={styles.emptyIcon} />
            <h3>No items found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Status</th>
                <th>Location</th>
                <th>Unit Cost</th>
                <th>Supplier</th>
                <th>Expiration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSupplies.map(supply => (
                <tr key={supply.id}>
                  <td>
                    <div>
                      <strong>{supply.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {supply.description}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>
                      {supply.category}
                    </span>
                  </td>
                  <td>
                    <div className={styles.stockLevel}>
                      <div className={styles.stockBar}>
                        <div 
                          className={`${styles.stockFill} ${getStockLevelClass(supply.currentStock, supply.minimumStock, supply.maximumStock)}`}
                          style={{ width: `${Math.min((supply.currentStock / supply.maximumStock) * 100, 100)}%` }}
                        />
                      </div>
                      <span className={styles.stockText}>
                        {supply.currentStock} {supply.unit}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Min: {supply.minimumStock} | Max: {supply.maximumStock}
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(supply.status)}`}>
                      {supply.status}
                    </span>
                  </td>
                  <td>{supply.location}</td>
                  <td>{formatCurrency(supply.unitCost)}</td>
                  <td>{supply.supplier}</td>
                  <td>
                    {supply.expirationDate ? (
                      <div>
                        {formatDate(supply.expirationDate)}
                        {supply.batchNumber && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            Batch: {supply.batchNumber}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-secondary)' }}>N/A</span>
                    )}
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        title="View Details"
                        onClick={() => openModal('view', supply)}
                      >
                        <FaEye />
                      </button>
                      <button
                        title="Edit Supply"
                        onClick={() => openModal('edit', supply)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="Delete Supply"
                        className={styles.danger}
                        onClick={() => handleDelete(supply)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modal} onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>
                {modalMode === 'create' && 'Add New Supply'}
                {modalMode === 'edit' && 'Edit Supply'}
                {modalMode === 'view' && 'Supply Details'}
              </h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            {modalMode === 'view' && selectedSupply ? (
              <div className={styles.form}>
                <div className={styles.formGrid}>
                  <div><strong>Name:</strong> {selectedSupply.name}</div>
                  <div><strong>Category:</strong> {selectedSupply.category}</div>
                  <div><strong>Description:</strong> {selectedSupply.description}</div>
                  <div><strong>Current Stock:</strong> {selectedSupply.currentStock} {selectedSupply.unit}</div>
                  <div><strong>Minimum Stock:</strong> {selectedSupply.minimumStock} {selectedSupply.unit}</div>
                  <div><strong>Maximum Stock:</strong> {selectedSupply.maximumStock} {selectedSupply.unit}</div>
                  <div><strong>Unit Cost:</strong> {formatCurrency(selectedSupply.unitCost)}</div>
                  <div><strong>Supplier:</strong> {selectedSupply.supplier}</div>
                  <div><strong>Location:</strong> {selectedSupply.location}</div>
                  <div><strong>Status:</strong> {selectedSupply.status}</div>
                  {selectedSupply.expirationDate && <div><strong>Expiration Date:</strong> {formatDate(selectedSupply.expirationDate)}</div>}
                  {selectedSupply.batchNumber && <div><strong>Batch Number:</strong> {selectedSupply.batchNumber}</div>}
                  <div><strong>Last Updated:</strong> {formatDate(selectedSupply.lastUpdated)}</div>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Supply Name <span className={styles.required}>*</span></label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={formErrors.name ? styles.error : ''}
                    />
                    {formErrors.name && <div className={styles.errorMessage}>{formErrors.name}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="category">Category <span className={styles.required}>*</span></label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as SupplyCategory }))}
                    >
                      {Object.values(SupplyCategory).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="description">Description <span className={styles.required}>*</span></label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className={formErrors.description ? styles.error : ''}
                    />
                    {formErrors.description && <div className={styles.errorMessage}>{formErrors.description}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="unit">Unit <span className={styles.required}>*</span></label>
                    <input
                      id="unit"
                      type="text"
                      placeholder="e.g., tablets, pieces, bottles"
                      value={formData.unit}
                      onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                      className={formErrors.unit ? styles.error : ''}
                    />
                    {formErrors.unit && <div className={styles.errorMessage}>{formErrors.unit}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="currentStock">Current Stock <span className={styles.required}>*</span></label>
                    <input
                      id="currentStock"
                      type="number"
                      min="0"
                      value={formData.currentStock}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentStock: Number(e.target.value) }))}
                      className={formErrors.currentStock ? styles.error : ''}
                    />
                    {formErrors.currentStock && <div className={styles.errorMessage}>{formErrors.currentStock}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="minimumStock">Minimum Stock <span className={styles.required}>*</span></label>
                    <input
                      id="minimumStock"
                      type="number"
                      min="0"
                      value={formData.minimumStock}
                      onChange={(e) => setFormData(prev => ({ ...prev, minimumStock: Number(e.target.value) }))}
                      className={formErrors.minimumStock ? styles.error : ''}
                    />
                    {formErrors.minimumStock && <div className={styles.errorMessage}>{formErrors.minimumStock}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="maximumStock">Maximum Stock <span className={styles.required}>*</span></label>
                    <input
                      id="maximumStock"
                      type="number"
                      min="1"
                      value={formData.maximumStock}
                      onChange={(e) => setFormData(prev => ({ ...prev, maximumStock: Number(e.target.value) }))}
                      className={formErrors.maximumStock ? styles.error : ''}
                    />
                    {formErrors.maximumStock && <div className={styles.errorMessage}>{formErrors.maximumStock}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="unitCost">Unit Cost <span className={styles.required}>*</span></label>
                    <input
                      id="unitCost"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.unitCost}
                      onChange={(e) => setFormData(prev => ({ ...prev, unitCost: Number(e.target.value) }))}
                      className={formErrors.unitCost ? styles.error : ''}
                    />
                    {formErrors.unitCost && <div className={styles.errorMessage}>{formErrors.unitCost}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="supplier">Supplier <span className={styles.required}>*</span></label>
                    <select
                      id="supplier"
                      value={formData.supplier}
                      onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
                      className={formErrors.supplier ? styles.error : ''}
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map(supplier => (
                        <option key={supplier} value={supplier}>{supplier}</option>
                      ))}
                    </select>
                    {formErrors.supplier && <div className={styles.errorMessage}>{formErrors.supplier}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="location">Location <span className={styles.required}>*</span></label>
                    <select
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className={formErrors.location ? styles.error : ''}
                    >
                      <option value="">Select Location</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                    {formErrors.location && <div className={styles.errorMessage}>{formErrors.location}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as SupplyStatus }))}
                    >
                      {Object.values(SupplyStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="expirationDate">Expiration Date</label>
                    <input
                      id="expirationDate"
                      type="date"
                      value={formData.expirationDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, expirationDate: e.target.value }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="batchNumber">Batch Number</label>
                    <input
                      id="batchNumber"
                      type="text"
                      value={formData.batchNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, batchNumber: e.target.value }))}
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancel} onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submit}>
                    {modalMode === 'create' ? 'Add Supply' : 'Update Supply'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalSuppliesInventory;