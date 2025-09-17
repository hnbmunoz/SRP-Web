export interface MedicalSupply {
  id: string;
  name: string;
  category: SupplyCategory;
  description: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unit: string;
  unitCost: number;
  supplier: string;
  expirationDate?: string;
  batchNumber?: string;
  location: string;
  status: SupplyStatus;
  lastUpdated: string;
  createdAt: string;
}

export enum SupplyCategory {
  MEDICATIONS = 'Medications',
  SURGICAL_INSTRUMENTS = 'Surgical Instruments',
  DISPOSABLES = 'Disposables',
  EQUIPMENT = 'Equipment',
  LABORATORY = 'Laboratory',
  EMERGENCY = 'Emergency',
  PERSONAL_PROTECTIVE = 'Personal Protective Equipment',
  CLEANING_SUPPLIES = 'Cleaning Supplies'
}

export enum SupplyStatus {
  IN_STOCK = 'In Stock',
  LOW_STOCK = 'Low Stock',
  OUT_OF_STOCK = 'Out of Stock',
  EXPIRED = 'Expired',
  DISCONTINUED = 'Discontinued'
}

export interface InventoryTransaction {
  id: string;
  supplyId: string;
  type: TransactionType;
  quantity: number;
  reason: string;
  performedBy: string;
  timestamp: string;
  notes?: string;
}

export enum TransactionType {
  STOCK_IN = 'Stock In',
  STOCK_OUT = 'Stock Out',
  ADJUSTMENT = 'Adjustment',
  EXPIRED = 'Expired',
  DAMAGED = 'Damaged'
}

export interface InventoryAlert {
  id: string;
  supplyId: string;
  type: AlertType;
  message: string;
  severity: AlertSeverity;
  isRead: boolean;
  createdAt: string;
}

export enum AlertType {
  LOW_STOCK = 'Low Stock',
  OUT_OF_STOCK = 'Out of Stock',
  EXPIRING_SOON = 'Expiring Soon',
  EXPIRED = 'Expired'
}

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface InventoryFilters {
  category?: SupplyCategory;
  status?: SupplyStatus;
  location?: string;
  searchTerm?: string;
  showLowStock?: boolean;
  showExpiringSoon?: boolean;
}

export interface InventoryFormData {
  name: string;
  category: SupplyCategory;
  description: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unit: string;
  unitCost: number;
  supplier: string;
  expirationDate?: string;
  batchNumber?: string;
  location: string;
  status: SupplyStatus;
}

export interface InventoryStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  expiringSoonItems: number;
  expiredItems: number;
}