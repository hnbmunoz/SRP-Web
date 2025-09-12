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
  FaDownload,
  FaFilter,
  FaSearch
} from 'react-icons/fa';
import type { MedicalSupply, InventoryFilters, InventoryStats } from './types';
import { SupplyCategory, SupplyStatus } from './types';
import { sampleMedicalSupplies } from './sampleData';
import styles from './MedicalSuppliesInventory.module.scss';

const MedicalSuppliesInventory: React.FC = () => {
  const [supplies] = useState<MedicalSupply[]>(sampleMedicalSupplies);
  const [filters, setFilters] = useState<InventoryFilters>({});
  const [isLoading] = useState(false);

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

  const handleFilterChange = (key: keyof InventoryFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
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

  const getStockLevelClass = (current: number, minimum: number, maximum: number) => {
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
          <button className={`${styles.actionButtons} ${styles.primary}`}>
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
                      <button title="Edit Supply">
                        <FaEdit />
                      </button>
                      <button title="Delete Supply" className={styles.danger}>
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
    </div>
  );
};

export default MedicalSuppliesInventory;