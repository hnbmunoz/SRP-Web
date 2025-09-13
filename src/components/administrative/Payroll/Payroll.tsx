
import React, { useState, useMemo } from 'react';
import {
  FaDollarSign,
  FaMoneyBillWave,
  FaReceipt,
  FaClock,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaDownload,
  FaFilter,
  FaSearch,
  FaTimes,
  FaCheck,
  FaCalculator
} from 'react-icons/fa';
import type { PayrollRecord, PayrollFilters, PayrollStats, PayrollFormData } from './types';
import { PayrollStatus } from './types';
import { samplePayrollRecords, departments, positions, payrollStatuses, payPeriods } from './sampleData';
import styles from './Payroll.module.scss';

const Payroll: React.FC = () => {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(samplePayrollRecords);
  const [filters, setFilters] = useState<PayrollFilters>({});
  const [isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
  const [formData, setFormData] = useState<PayrollFormData>({
    employeeId: '',
    employeeName: '',
    position: '',
    department: '',
    payPeriod: '',
    payDate: '',
    baseSalary: 0,
    overtime: 0,
    bonuses: 0,
    hoursWorked: 80,
    overtimeHours: 0,
    federalTax: 0,
    stateTax: 0,
    socialSecurity: 0,
    medicare: 0,
    healthInsurance: 0,
    retirement401k: 0,
    otherDeductions: 0,
    status: PayrollStatus.DRAFT
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculate payroll statistics
  const stats: PayrollStats = useMemo(() => {
    const totalRecords = payrollRecords.length;
    const totalGrossPay = payrollRecords.reduce((sum, record) => sum + record.grossPay, 0);
    const totalNetPay = payrollRecords.reduce((sum, record) => sum + record.netPay, 0);
    const totalDeductions = totalGrossPay - totalNetPay;
    
    const pendingRecords = payrollRecords.filter(r => r.status === PayrollStatus.PENDING).length;
    const approvedRecords = payrollRecords.filter(r => r.status === PayrollStatus.APPROVED).length;
    const paidRecords = payrollRecords.filter(r => r.status === PayrollStatus.PAID).length;

    const departmentTotals = departments.reduce((acc, dept) => {
      acc[dept] = payrollRecords
        .filter(r => r.department === dept)
        .reduce((sum, record) => sum + record.netPay, 0);
      return acc;
    }, {} as Record<string, number>);

    const statusCounts = payrollStatuses.reduce((acc, status) => {
      acc[status] = payrollRecords.filter(r => r.status === status).length;
      return acc;
    }, {} as Record<PayrollStatus, number>);

    return {
      totalRecords,
      totalGrossPay,
      totalNetPay,
      totalDeductions,
      pendingRecords,
      approvedRecords,
      paidRecords,
      departmentTotals,
      statusCounts
    };
  }, [payrollRecords]);

  // Filter payroll records based on current filters
  const filteredRecords = useMemo(() => {
    return payrollRecords.filter(record => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (!record.employeeName.toLowerCase().includes(searchLower) &&
            !record.employeeId.toLowerCase().includes(searchLower) &&
            !record.department.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Department filter
      if (filters.department && record.department !== filters.department) {
        return false;
      }

      // Status filter
      if (filters.status && record.status !== filters.status) {
        return false;
      }

      // Pay period filter
      if (filters.payPeriod && record.payPeriod !== filters.payPeriod) {
        return false;
      }

      return true;
    });
  }, [payrollRecords, filters]);

  const handleFilterChange = (key: keyof PayrollFilters, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const calculateGrossPay = (baseSalary: number, overtime: number, bonuses: number) => {
    return baseSalary + overtime + bonuses;
  };

  const calculateNetPay = (grossPay: number, deductions: Record<string, number>) => {
    const totalDeductions = Object.values(deductions).reduce((sum: number, val: number) => sum + (val || 0), 0);
    return grossPay - totalDeductions;
  };

  const openModal = (mode: 'create' | 'edit' | 'view', record?: PayrollRecord) => {
    setModalMode(mode);
    setSelectedRecord(record || null);
    
    if (mode === 'create') {
      setFormData({
        employeeId: '',
        employeeName: '',
        position: '',
        department: '',
        payPeriod: '',
        payDate: '',
        baseSalary: 0,
        overtime: 0,
        bonuses: 0,
        hoursWorked: 80,
        overtimeHours: 0,
        federalTax: 0,
        stateTax: 0,
        socialSecurity: 0,
        medicare: 0,
        healthInsurance: 0,
        retirement401k: 0,
        otherDeductions: 0,
        status: PayrollStatus.DRAFT
      });
    } else if (record) {
      setFormData({
        employeeId: record.employeeId,
        employeeName: record.employeeName,
        position: record.position,
        department: record.department,
        payPeriod: record.payPeriod,
        payDate: record.payDate,
        baseSalary: record.baseSalary,
        overtime: record.overtime,
        bonuses: record.bonuses,
        hoursWorked: record.hoursWorked,
        overtimeHours: record.overtimeHours,
        federalTax: record.deductions.federalTax,
        stateTax: record.deductions.stateTax,
        socialSecurity: record.deductions.socialSecurity,
        medicare: record.deductions.medicare,
        healthInsurance: record.deductions.healthInsurance,
        retirement401k: record.deductions.retirement401k,
        otherDeductions: record.deductions.other,
        status: record.status
      });
    }
    
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.employeeId.trim()) errors.employeeId = 'Employee ID is required';
    if (!formData.employeeName.trim()) errors.employeeName = 'Employee name is required';
    if (!formData.position.trim()) errors.position = 'Position is required';
    if (!formData.department.trim()) errors.department = 'Department is required';
    if (!formData.payPeriod.trim()) errors.payPeriod = 'Pay period is required';
    if (!formData.payDate) errors.payDate = 'Pay date is required';
    if (formData.baseSalary <= 0) errors.baseSalary = 'Base salary must be greater than 0';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const now = new Date().toISOString();
    const grossPay = calculateGrossPay(formData.baseSalary, formData.overtime, formData.bonuses);
    const deductions = {
      federalTax: formData.federalTax,
      stateTax: formData.stateTax,
      socialSecurity: formData.socialSecurity,
      medicare: formData.medicare,
      healthInsurance: formData.healthInsurance,
      retirement401k: formData.retirement401k,
      other: formData.otherDeductions
    };
    const netPay = calculateNetPay(grossPay, deductions);
    
    if (modalMode === 'create') {
      const newRecord: PayrollRecord = {
        id: `PAY${String(payrollRecords.length + 1).padStart(3, '0')}`,
        employeeId: formData.employeeId,
        employeeName: formData.employeeName,
        position: formData.position,
        department: formData.department,
        payPeriod: formData.payPeriod,
        payDate: formData.payDate,
        baseSalary: formData.baseSalary,
        overtime: formData.overtime,
        bonuses: formData.bonuses,
        deductions,
        grossPay,
        netPay,
        status: formData.status,
        hoursWorked: formData.hoursWorked,
        overtimeHours: formData.overtimeHours,
        createdAt: now,
        updatedAt: now
      };
      
      setPayrollRecords(prev => [...prev, newRecord]);
    } else if (modalMode === 'edit' && selectedRecord) {
      const updatedRecord: PayrollRecord = {
        ...selectedRecord,
        employeeId: formData.employeeId,
        employeeName: formData.employeeName,
        position: formData.position,
        department: formData.department,
        payPeriod: formData.payPeriod,
        payDate: formData.payDate,
        baseSalary: formData.baseSalary,
        overtime: formData.overtime,
        bonuses: formData.bonuses,
        deductions,
        grossPay,
        netPay,
        status: formData.status,
        hoursWorked: formData.hoursWorked,
        overtimeHours: formData.overtimeHours,
        updatedAt: now
      };
      
      setPayrollRecords(prev => prev.map(r => r.id === selectedRecord.id ? updatedRecord : r));
    }
    
    closeModal();
  };

  const handleDelete = (record: PayrollRecord) => {
    if (window.confirm(`Are you sure you want to delete payroll record for ${record.employeeName}?`)) {
      setPayrollRecords(prev => prev.filter(r => r.id !== record.id));
    }
  };

  const getStatusBadgeClass = (status: PayrollStatus) => {
    switch (status) {
      case PayrollStatus.DRAFT:
        return styles.draft;
      case PayrollStatus.PENDING:
        return styles.pending;
      case PayrollStatus.APPROVED:
        return styles.approved;
      case PayrollStatus.PAID:
        return styles.paid;
      case PayrollStatus.CANCELLED:
        return styles.cancelled;
      default:
        return '';
    }
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
      <div className={styles.payrollContainer}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          Loading payroll data...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.payrollContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Payroll Management</h1>
        <div className={styles.headerActions}>
          <button 
            className={`${styles.actionButtons} ${styles.primary}`}
            onClick={() => openModal('create')}
          >
            <FaPlus /> Add New Payroll
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
            <FaReceipt className={`${styles.statIcon} ${styles.total}`} />
            <span className={styles.statTitle}>Total Records</span>
          </div>
          <div className={styles.statValue}>{stats.totalRecords}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaMoneyBillWave className={`${styles.statIcon} ${styles.gross}`} />
            <span className={styles.statTitle}>Total Gross Pay</span>
          </div>
          <div className={styles.statValue}>{formatCurrency(stats.totalGrossPay)}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaDollarSign className={`${styles.statIcon} ${styles.net}`} />
            <span className={styles.statTitle}>Total Net Pay</span>
          </div>
          <div className={styles.statValue}>{formatCurrency(stats.totalNetPay)}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaClock className={`${styles.statIcon} ${styles.pending}`} />
            <span className={styles.statTitle}>Pending Records</span>
          </div>
          <div className={styles.statValue}>{stats.pendingRecords}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaCheck className={`${styles.statIcon} ${styles.paid}`} />
            <span className={styles.statTitle}>Paid Records</span>
          </div>
          <div className={styles.statValue}>{stats.paidRecords}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaCalculator className={`${styles.statIcon} ${styles.deductions}`} />
            <span className={styles.statTitle}>Total Deductions</span>
          </div>
          <div className={styles.statValue}>{formatCurrency(stats.totalDeductions)}</div>
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
              placeholder="Search by employee name, ID, or department..."
              value={filters.searchTerm || ''}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={filters.department || ''}
              onChange={(e) => handleFilterChange('department', e.target.value || undefined)}
            >
              <option value="">All Departments</option>
              {departments.map(department => (
                <option key={department} value={department}>{department}</option>
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
              {payrollStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="payPeriod">Pay Period</label>
            <select
              id="payPeriod"
              value={filters.payPeriod || ''}
              onChange={(e) => handleFilterChange('payPeriod', e.target.value || undefined)}
            >
              <option value="">All Pay Periods</option>
              {payPeriods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className={styles.payrollTable}>
        <div className={styles.tableHeader}>
          <h3>Payroll Records ({filteredRecords.length})</h3>
          <div className={styles.tableActions}>
            <button className={styles.actionButtons}>
              <FaSearch /> Advanced Search
            </button>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className={styles.emptyState}>
            <FaReceipt className={styles.emptyIcon} />
            <h3>No payroll records found</h3>
            <p>Try adjusting your filters or add new payroll records</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Pay Period</th>
                <th>Gross Pay</th>
                <th>Net Pay</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr key={record.id}>
                  <td>
                    <div>
                      <strong>{record.employeeName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        ID: {record.employeeId} • {record.position}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.departmentBadge}>
                      {record.department}
                    </span>
                  </td>
                  <td>
                    <div>
                      {record.payPeriod}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Pay Date: {formatDate(record.payDate)}
                      </div>
                    </div>
                  </td>
                  <td>{formatCurrency(record.grossPay)}</td>
                  <td>{formatCurrency(record.netPay)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button 
                        title="View Details"
                        onClick={() => openModal('view', record)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        title="Edit Record"
                        onClick={() => openModal('edit', record)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        title="Delete Record" 
                        className={styles.danger}
                        onClick={() => handleDelete(record)}
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
                {modalMode === 'create' && 'Add New Payroll Record'}
                {modalMode === 'edit' && 'Edit Payroll Record'}
                {modalMode === 'view' && 'Payroll Record Details'}
              </h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            {modalMode === 'view' && selectedRecord ? (
              <div className={styles.form}>
                <div className={styles.formGrid}>
                  <div><strong>Employee:</strong> {selectedRecord.employeeName}</div>
                  <div><strong>Employee ID:</strong> {selectedRecord.employeeId}</div>
                  <div><strong>Position:</strong> {selectedRecord.position}</div>
                  <div><strong>Department:</strong> {selectedRecord.department}</div>
                  <div><strong>Pay Period:</strong> {selectedRecord.payPeriod}</div>
                  <div><strong>Pay Date:</strong> {formatDate(selectedRecord.payDate)}</div>
                  <div><strong>Hours Worked:</strong> {selectedRecord.hoursWorked}</div>
                  <div><strong>Overtime Hours:</strong> {selectedRecord.overtimeHours}</div>
                </div>
                
                <h3>Pay Details</h3>
                <div className={styles.formGrid}>
                  <div><strong>Base Salary:</strong> {formatCurrency(selectedRecord.baseSalary)}</div>
                  <div><strong>Overtime:</strong> {formatCurrency(selectedRecord.overtime)}</div>
                  <div><strong>Bonuses:</strong> {formatCurrency(selectedRecord.bonuses)}</div>
                  <div><strong>Gross Pay:</strong> {formatCurrency(selectedRecord.grossPay)}</div>
                </div>

                <h3>Deductions</h3>
                <div className={styles.formGrid}>
                  <div><strong>Federal Tax:</strong> {formatCurrency(selectedRecord.deductions.federalTax)}</div>
                  <div><strong>State Tax:</strong> {formatCurrency(selectedRecord.deductions.stateTax)}</div>
                  <div><strong>Social Security:</strong> {formatCurrency(selectedRecord.deductions.socialSecurity)}</div>
                  <div><strong>Medicare:</strong> {formatCurrency(selectedRecord.deductions.medicare)}</div>
                  <div><strong>Health Insurance:</strong> {formatCurrency(selectedRecord.deductions.healthInsurance)}</div>
                  <div><strong>401k:</strong> {formatCurrency(selectedRecord.deductions.retirement401k)}</div>
                  <div><strong>Other:</strong> {formatCurrency(selectedRecord.deductions.other)}</div>
                  <div><strong>Net Pay:</strong> {formatCurrency(selectedRecord.netPay)}</div>
                </div>

                <div className={styles.formGrid}>
                  <div><strong>Status:</strong> {selectedRecord.status}</div>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="employeeId">Employee ID <span className={styles.required}>*</span></label>
                    <input
                      id="employeeId"
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                      className={formErrors.employeeId ? styles.error : ''}
                    />
                    {formErrors.employeeId && <div className={styles.errorMessage}>{formErrors.employeeId}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="employeeName">Employee Name <span className={styles.required}>*</span></label>
                    <input
                      id="employeeName"
                      type="text"
                      value={formData.employeeName}
                      onChange={(e) => setFormData(prev => ({ ...prev, employeeName: e.target.value }))}
                      className={formErrors.employeeName ? styles.error : ''}
                    />
                    {formErrors.employeeName && <div className={styles.errorMessage}>{formErrors.employeeName}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="position">Position <span className={styles.required}>*</span></label>
                    <select
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      className={formErrors.position ? styles.error : ''}
                    >
                      <option value="">Select Position</option>
                      {positions.map(position => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                    {formErrors.position && <div className={styles.errorMessage}>{formErrors.position}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="department">Department <span className={styles.required}>*</span></label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className={formErrors.department ? styles.error : ''}
                    >
                      <option value="">Select Department</option>
                      {departments.map(department => (
                        <option key={department} value={department}>{department}</option>
                      ))}
                    </select>
                    {formErrors.department && <div className={styles.errorMessage}>{formErrors.department}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="payPeriod">Pay Period <span className={styles.required}>*</span></label>
                    <select
                      id="payPeriod"
                      value={formData.payPeriod}
                      onChange={(e) => setFormData(prev => ({ ...prev, payPeriod: e.target.value }))}
                      className={formErrors.payPeriod ? styles.error : ''}
                    >
                      <option value="">Select Pay Period</option>
                      {payPeriods.map(period => (
                        <option key={period} value={period}>{period}</option>
                      ))}
                    </select>
                    {formErrors.payPeriod && <div className={styles.errorMessage}>{formErrors.payPeriod}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="payDate">Pay Date <span className={styles.required}>*</span></label>
                    <input
                      id="payDate"
                      type="date"
                      value={formData.payDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, payDate: e.target.value }))}
                      className={formErrors.payDate ? styles.error : ''}
                    />
                    {formErrors.payDate && <div className={styles.errorMessage}>{formErrors.payDate}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="hoursWorked">Hours Worked</label>
                    <input
                      id="hoursWorked"
                      type="number"
                      value={formData.hoursWorked}
                      onChange={(e) => setFormData(prev => ({ ...prev, hoursWorked: Number(e.target.value) }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="overtimeHours">Overtime Hours</label>
                    <input
                      id="overtimeHours"
                      type="number"
                      value={formData.overtimeHours}
                      onChange={(e) => setFormData(prev => ({ ...prev, overtimeHours: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <h3>Pay Details</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="baseSalary">Base Salary <span className={styles.required}>*</span></label>
                    <input
                      id="baseSalary"
                      type="number"
                      step="0.01"
                      value={formData.baseSalary}
                      onChange={(e) => setFormData(prev => ({ ...prev, baseSalary: Number(e.target.value) }))}
                      className={formErrors.baseSalary ? styles.error : ''}
                    />
                    {formErrors.baseSalary && <div className={styles.errorMessage}>{formErrors.baseSalary}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="overtime">Overtime Pay</label>
                    <input
                      id="overtime"
                      type="number"
                      step="0.01"
                      value={formData.overtime}
                      onChange={(e) => setFormData(prev => ({ ...prev, overtime: Number(e.target.value) }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="bonuses">Bonuses</label>
                    <input
                      id="bonuses"
                      type="number"
                      step="0.01"
                      value={formData.bonuses}
                      onChange={(e) => setFormData(prev => ({ ...prev, bonuses: Number(e.target.value) }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as PayrollStatus }))}
                    >
                      {payrollStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <h3>Deductions</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="federalTax">Federal Tax</label>
                    <input
                      id="federalTax"
                      type="number"
                      step="0.01"
                      value={formData.federalTax}
                      onChange={(e) => setFormData(prev => ({ ...prev, federalTax: Number(e.target.value) }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="stateTax">State Tax</label>
                    <input
                      id="stateTax"
                      type="number"
                      step="0.01"
                      value={formData.stateTax}
                      onChange={(e) => setFormData(prev => ({ ...prev, stateTax: Number(e.target.value) }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="socialSecurity">Social Security</label>
                    <input
                      id="socialSecurity"
                      type="number"
                      step="0.01"
                      value={formData.socialSecurity}
                      onChange={(e) => setFormData(prev => ({ ...prev, socialSecurity: Number(e.target.value) }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="medicare">Medicare</label>
                    <input
                      id="medicare"
                      type="number"
                      step="0.01"
                      value={formData.medicare}
                      onChange={(e) => setFormData(prev => ({ ...prev, medicare: Number(e.target.value) }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="healthInsurance">Health Insurance</label>
                    <input
                      id="healthInsurance"
                      type="number"
                      step="0.01"
                      value={formData.healthInsurance}
                      onChange={(e) => setFormData(prev => ({ ...prev, healthInsurance: Number(e.target.value) }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="retirement401k">401k Contribution</label>
                    <input
                      id="retirement401k"
                      type="number"
                      step="0.01"
                      value={formData.retirement401k}
                      onChange={(e) => setFormData(prev => ({ ...prev, retirement401k: Number(e.target.value) }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="otherDeductions">Other Deductions</label>
                    <input
                      id="otherDeductions"
                      type="number"
                      step="0.01"
                      value={formData.otherDeductions}
                      onChange={(e) => setFormData(prev => ({ ...prev, otherDeductions: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancel} onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submit}>
                    {modalMode === 'create' ? 'Add Payroll Record' : 'Update Payroll Record'}
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

export default Payroll;