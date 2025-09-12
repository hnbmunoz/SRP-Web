import type { MedicalSupply, InventoryTransaction, InventoryAlert } from './types';
import { SupplyCategory, SupplyStatus, TransactionType, AlertType, AlertSeverity } from './types';

export const sampleMedicalSupplies: MedicalSupply[] = [
  {
    id: 'MS001',
    name: 'Paracetamol 500mg',
    category: SupplyCategory.MEDICATIONS,
    description: 'Pain reliever and fever reducer tablets',
    currentStock: 150,
    minimumStock: 50,
    maximumStock: 500,
    unit: 'tablets',
    unitCost: 0.25,
    supplier: 'PharmaCorp Ltd.',
    expirationDate: '2025-12-31',
    batchNumber: 'PC2024001',
    location: 'Pharmacy - Shelf A1',
    status: SupplyStatus.IN_STOCK,
    lastUpdated: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: 'MS002',
    name: 'Surgical Gloves (Size M)',
    category: SupplyCategory.PERSONAL_PROTECTIVE,
    description: 'Latex-free surgical gloves, medium size',
    currentStock: 25,
    minimumStock: 100,
    maximumStock: 1000,
    unit: 'pairs',
    unitCost: 0.75,
    supplier: 'MedSafe Supplies',
    location: 'Storage Room B - Bin 15',
    status: SupplyStatus.LOW_STOCK,
    lastUpdated: '2024-01-14T16:45:00Z',
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: 'MS003',
    name: 'Disposable Syringes 10ml',
    category: SupplyCategory.DISPOSABLES,
    description: 'Single-use sterile syringes with needles',
    currentStock: 0,
    minimumStock: 200,
    maximumStock: 2000,
    unit: 'pieces',
    unitCost: 0.50,
    supplier: 'SterileMax Inc.',
    location: 'Storage Room A - Shelf C3',
    status: SupplyStatus.OUT_OF_STOCK,
    lastUpdated: '2024-01-13T09:15:00Z',
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: 'MS004',
    name: 'Blood Pressure Monitor',
    category: SupplyCategory.EQUIPMENT,
    description: 'Digital automatic blood pressure monitor',
    currentStock: 8,
    minimumStock: 5,
    maximumStock: 20,
    unit: 'units',
    unitCost: 125.00,
    supplier: 'MedTech Solutions',
    location: 'Equipment Room - Cabinet 2',
    status: SupplyStatus.IN_STOCK,
    lastUpdated: '2024-01-12T14:20:00Z',
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: 'MS005',
    name: 'Antibacterial Hand Sanitizer',
    category: SupplyCategory.CLEANING_SUPPLIES,
    description: '70% alcohol-based hand sanitizer, 500ml bottles',
    currentStock: 45,
    minimumStock: 30,
    maximumStock: 200,
    unit: 'bottles',
    unitCost: 3.50,
    supplier: 'CleanCare Products',
    expirationDate: '2025-06-30',
    batchNumber: 'CC2024015',
    location: 'Cleaning Supplies - Shelf D2',
    status: SupplyStatus.IN_STOCK,
    lastUpdated: '2024-01-11T11:30:00Z',
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: 'MS006',
    name: 'Insulin Syringes 1ml',
    category: SupplyCategory.DISPOSABLES,
    description: 'Ultra-fine insulin syringes with 29G needles',
    currentStock: 75,
    minimumStock: 100,
    maximumStock: 500,
    unit: 'pieces',
    unitCost: 0.85,
    supplier: 'DiabetCare Supplies',
    location: 'Pharmacy - Refrigerated Section',
    status: SupplyStatus.LOW_STOCK,
    lastUpdated: '2024-01-10T13:45:00Z',
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: 'MS007',
    name: 'Surgical Scalpel Blades #15',
    category: SupplyCategory.SURGICAL_INSTRUMENTS,
    description: 'Sterile disposable scalpel blades, size 15',
    currentStock: 200,
    minimumStock: 50,
    maximumStock: 1000,
    unit: 'pieces',
    unitCost: 0.35,
    supplier: 'SurgicalPro Ltd.',
    location: 'OR Storage - Drawer 8',
    status: SupplyStatus.IN_STOCK,
    lastUpdated: '2024-01-09T15:20:00Z',
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: 'MS008',
    name: 'COVID-19 Rapid Test Kits',
    category: SupplyCategory.LABORATORY,
    description: 'Antigen rapid test kits for COVID-19 detection',
    currentStock: 12,
    minimumStock: 50,
    maximumStock: 300,
    unit: 'kits',
    unitCost: 8.50,
    supplier: 'TestQuick Diagnostics',
    expirationDate: '2024-03-15',
    batchNumber: 'TQ2023089',
    location: 'Lab Storage - Refrigerator 1',
    status: SupplyStatus.LOW_STOCK,
    lastUpdated: '2024-01-08T12:10:00Z',
    createdAt: '2024-01-01T08:00:00Z'
  }
];

export const sampleTransactions: InventoryTransaction[] = [
  {
    id: 'TXN001',
    supplyId: 'MS001',
    type: TransactionType.STOCK_IN,
    quantity: 100,
    reason: 'Regular restocking',
    performedBy: 'Dr. Sarah Johnson',
    timestamp: '2024-01-15T10:30:00Z',
    notes: 'New batch received from supplier'
  },
  {
    id: 'TXN002',
    supplyId: 'MS002',
    type: TransactionType.STOCK_OUT,
    quantity: 75,
    reason: 'Used in surgery',
    performedBy: 'Nurse Mike Chen',
    timestamp: '2024-01-14T16:45:00Z',
    notes: 'Emergency surgery - cardiac procedure'
  },
  {
    id: 'TXN003',
    supplyId: 'MS003',
    type: TransactionType.STOCK_OUT,
    quantity: 50,
    reason: 'Patient care',
    performedBy: 'Dr. Emily Rodriguez',
    timestamp: '2024-01-13T09:15:00Z',
    notes: 'Last batch used for vaccination drive'
  },
  {
    id: 'TXN004',
    supplyId: 'MS008',
    type: TransactionType.EXPIRED,
    quantity: 25,
    reason: 'Expired items removed',
    performedBy: 'Pharmacy Tech Lisa Wong',
    timestamp: '2024-01-12T08:00:00Z',
    notes: 'Expired test kits disposed according to protocol'
  }
];

export const sampleAlerts: InventoryAlert[] = [
  {
    id: 'ALT001',
    supplyId: 'MS003',
    type: AlertType.OUT_OF_STOCK,
    message: 'Disposable Syringes 10ml are completely out of stock',
    severity: AlertSeverity.CRITICAL,
    isRead: false,
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 'ALT002',
    supplyId: 'MS002',
    type: AlertType.LOW_STOCK,
    message: 'Surgical Gloves (Size M) are running low (25 remaining)',
    severity: AlertSeverity.HIGH,
    isRead: false,
    createdAt: '2024-01-14T16:45:00Z'
  },
  {
    id: 'ALT003',
    supplyId: 'MS008',
    type: AlertType.EXPIRING_SOON,
    message: 'COVID-19 Rapid Test Kits will expire in 2 months',
    severity: AlertSeverity.MEDIUM,
    isRead: true,
    createdAt: '2024-01-08T12:10:00Z'
  },
  {
    id: 'ALT004',
    supplyId: 'MS006',
    type: AlertType.LOW_STOCK,
    message: 'Insulin Syringes 1ml are below minimum stock level',
    severity: AlertSeverity.HIGH,
    isRead: false,
    createdAt: '2024-01-10T13:45:00Z'
  }
];

export const locations = [
  'Pharmacy - Shelf A1',
  'Pharmacy - Shelf A2',
  'Pharmacy - Refrigerated Section',
  'Storage Room A - Shelf C1',
  'Storage Room A - Shelf C2',
  'Storage Room A - Shelf C3',
  'Storage Room B - Bin 15',
  'Storage Room B - Bin 16',
  'Equipment Room - Cabinet 1',
  'Equipment Room - Cabinet 2',
  'OR Storage - Drawer 8',
  'OR Storage - Drawer 9',
  'Lab Storage - Refrigerator 1',
  'Lab Storage - Refrigerator 2',
  'Cleaning Supplies - Shelf D1',
  'Cleaning Supplies - Shelf D2',
  'Emergency Room - Supply Cart',
  'ICU - Supply Station'
];

export const suppliers = [
  'PharmaCorp Ltd.',
  'MedSafe Supplies',
  'SterileMax Inc.',
  'MedTech Solutions',
  'CleanCare Products',
  'DiabetCare Supplies',
  'SurgicalPro Ltd.',
  'TestQuick Diagnostics',
  'HealthSupply Co.',
  'MedEquip International'
];