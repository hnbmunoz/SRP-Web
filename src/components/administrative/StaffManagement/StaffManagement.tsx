
import React, { useState, useMemo } from 'react';
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaDownload,
  FaFilter,
  FaSearch,
  FaTimes
} from 'react-icons/fa';
import type { Staff, StaffFilters, StaffStats, StaffFormData } from './types';
import { StaffPosition, Department, StaffStatus } from './types';
import { sampleStaff, departments, positions, statuses, states, relationships } from './sampleData';
import styles from './StaffManagement.module.scss';

const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(sampleStaff);
  const [filters, setFilters] = useState<StaffFilters>({});
  const [isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState<StaffFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: StaffPosition.NURSE,
    department: Department.ADMINISTRATION,
    status: StaffStatus.ACTIVE,
    hireDate: '',
    salary: 0,
    street: '',
    city: '',
    state: 'CA',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactRelationship: 'Spouse',
    emergencyContactPhone: '',
    qualifications: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculate staff statistics
  const stats: StaffStats = useMemo(() => {
    const totalStaff = staff.length;
    const activeStaff = staff.filter(s => s.status === StaffStatus.ACTIVE).length;
    const onLeaveStaff = staff.filter(s => s.status === StaffStatus.ON_LEAVE).length;
    const inactiveStaff = staff.filter(s => s.status === StaffStatus.INACTIVE).length;

    const departmentCounts = departments.reduce((acc, dept) => {
      acc[dept] = staff.filter(s => s.department === dept).length;
      return acc;
    }, {} as Record<Department, number>);

    const positionCounts = positions.reduce((acc, pos) => {
      acc[pos] = staff.filter(s => s.position === pos).length;
      return acc;
    }, {} as Record<StaffPosition, number>);

    return {
      totalStaff,
      activeStaff,
      onLeaveStaff,
      inactiveStaff,
      departmentCounts,
      positionCounts
    };
  }, [staff]);

  // Filter staff based on current filters
  const filteredStaff = useMemo(() => {
    return staff.filter(staffMember => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (!staffMember.firstName.toLowerCase().includes(searchLower) &&
            !staffMember.lastName.toLowerCase().includes(searchLower) &&
            !staffMember.email.toLowerCase().includes(searchLower) &&
            !staffMember.employeeId.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Position filter
      if (filters.position && staffMember.position !== filters.position) {
        return false;
      }

      // Department filter
      if (filters.department && staffMember.department !== filters.department) {
        return false;
      }

      // Status filter
      if (filters.status && staffMember.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [staff, filters]);

  const handleFilterChange = (key: keyof StaffFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const openModal = (mode: 'create' | 'edit' | 'view', staffMember?: Staff) => {
    setModalMode(mode);
    setSelectedStaff(staffMember || null);
    
    if (mode === 'create') {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: StaffPosition.NURSE,
        department: Department.ADMINISTRATION,
        status: StaffStatus.ACTIVE,
        hireDate: '',
        salary: 0,
        street: '',
        city: '',
        state: 'CA',
        zipCode: '',
        emergencyContactName: '',
        emergencyContactRelationship: 'Spouse',
        emergencyContactPhone: '',
        qualifications: '',
        notes: ''
      });
    } else if (staffMember) {
      setFormData({
        firstName: staffMember.firstName,
        lastName: staffMember.lastName,
        email: staffMember.email,
        phone: staffMember.phone,
        position: staffMember.position,
        department: staffMember.department,
        status: staffMember.status,
        hireDate: staffMember.hireDate,
        salary: staffMember.salary || 0,
        street: staffMember.address.street,
        city: staffMember.address.city,
        state: staffMember.address.state,
        zipCode: staffMember.address.zipCode,
        emergencyContactName: staffMember.emergencyContact.name,
        emergencyContactRelationship: staffMember.emergencyContact.relationship,
        emergencyContactPhone: staffMember.emergencyContact.phone,
        qualifications: staffMember.qualifications.join(', '),
        notes: staffMember.notes || ''
      });
    }
    
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStaff(null);
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.hireDate) errors.hireDate = 'Hire date is required';
    if (!formData.street.trim()) errors.street = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    if (!formData.emergencyContactName.trim()) errors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactPhone.trim()) errors.emergencyContactPhone = 'Emergency contact phone is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const now = new Date().toISOString();
    
    if (modalMode === 'create') {
      const newStaff: Staff = {
        id: `STF${String(staff.length + 1).padStart(3, '0')}`,
        employeeId: `EMP${String(staff.length + 1).padStart(3, '0')}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        department: formData.department,
        status: formData.status,
        hireDate: formData.hireDate,
        salary: formData.salary || undefined,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        emergencyContact: {
          name: formData.emergencyContactName,
          relationship: formData.emergencyContactRelationship,
          phone: formData.emergencyContactPhone
        },
        qualifications: formData.qualifications.split(',').map(q => q.trim()).filter(q => q),
        notes: formData.notes || undefined,
        createdAt: now,
        updatedAt: now
      };
      
      setStaff(prev => [...prev, newStaff]);
    } else if (modalMode === 'edit' && selectedStaff) {
      const updatedStaff: Staff = {
        ...selectedStaff,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        department: formData.department,
        status: formData.status,
        hireDate: formData.hireDate,
        salary: formData.salary || undefined,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        emergencyContact: {
          name: formData.emergencyContactName,
          relationship: formData.emergencyContactRelationship,
          phone: formData.emergencyContactPhone
        },
        qualifications: formData.qualifications.split(',').map(q => q.trim()).filter(q => q),
        notes: formData.notes || undefined,
        updatedAt: now
      };
      
      setStaff(prev => prev.map(s => s.id === selectedStaff.id ? updatedStaff : s));
    }
    
    closeModal();
  };

  const handleDelete = (staffMember: Staff) => {
    if (window.confirm(`Are you sure you want to delete ${staffMember.firstName} ${staffMember.lastName}?`)) {
      setStaff(prev => prev.filter(s => s.id !== staffMember.id));
    }
  };

  const getStatusBadgeClass = (status: StaffStatus) => {
    switch (status) {
      case StaffStatus.ACTIVE:
        return styles.active;
      case StaffStatus.INACTIVE:
        return styles.inactive;
      case StaffStatus.ON_LEAVE:
        return styles.onLeave;
      case StaffStatus.TERMINATED:
        return styles.terminated;
      case StaffStatus.SUSPENDED:
        return styles.suspended;
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
      <div className={styles.staffContainer}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          Loading staff data...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.staffContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Staff Management</h1>
        <div className={styles.headerActions}>
          <button 
            className={`${styles.actionButtons} ${styles.primary}`}
            onClick={() => openModal('create')}
          >
            <FaPlus /> Add New Staff
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
            <FaUsers className={`${styles.statIcon} ${styles.total}`} />
            <span className={styles.statTitle}>Total Staff</span>
          </div>
          <div className={styles.statValue}>{stats.totalStaff}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaUserCheck className={`${styles.statIcon} ${styles.active}`} />
            <span className={styles.statTitle}>Active</span>
          </div>
          <div className={styles.statValue}>{stats.activeStaff}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaUserClock className={`${styles.statIcon} ${styles.leave}`} />
            <span className={styles.statTitle}>On Leave</span>
          </div>
          <div className={styles.statValue}>{stats.onLeaveStaff}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaUserTimes className={`${styles.statIcon} ${styles.inactive}`} />
            <span className={styles.statTitle}>Inactive</span>
          </div>
          <div className={styles.statValue}>{stats.inactiveStaff}</div>
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
              placeholder="Search by name, email, or employee ID..."
              value={filters.searchTerm || ''}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="position">Position</label>
            <select
              id="position"
              value={filters.position || ''}
              onChange={(e) => handleFilterChange('position', e.target.value || undefined)}
            >
              <option value="">All Positions</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
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
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className={styles.staffTable}>
        <div className={styles.tableHeader}>
          <h3>Staff Members ({filteredStaff.length})</h3>
          <div className={styles.tableActions}>
            <button className={styles.actionButtons}>
              <FaSearch /> Advanced Search
            </button>
          </div>
        </div>

        {filteredStaff.length === 0 ? (
          <div className={styles.emptyState}>
            <FaUsers className={styles.emptyIcon} />
            <h3>No staff members found</h3>
            <p>Try adjusting your filters or add new staff members</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Position</th>
                <th>Department</th>
                <th>Status</th>
                <th>Hire Date</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(staffMember => (
                <tr key={staffMember.id}>
                  <td>
                    <div>
                      <strong>{staffMember.firstName} {staffMember.lastName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        ID: {staffMember.employeeId}
                      </div>
                    </div>
                  </td>
                  <td>{staffMember.position}</td>
                  <td>
                    <span className={styles.departmentBadge}>
                      {staffMember.department}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(staffMember.status)}`}>
                      {staffMember.status}
                    </span>
                  </td>
                  <td>{formatDate(staffMember.hireDate)}</td>
                  <td>
                    <div>
                      {staffMember.email}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {staffMember.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button 
                        title="View Details"
                        onClick={() => openModal('view', staffMember)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        title="Edit Staff"
                        onClick={() => openModal('edit', staffMember)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        title="Delete Staff" 
                        className={styles.danger}
                        onClick={() => handleDelete(staffMember)}
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
                {modalMode === 'create' && 'Add New Staff Member'}
                {modalMode === 'edit' && 'Edit Staff Member'}
                {modalMode === 'view' && 'Staff Member Details'}
              </h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            {modalMode === 'view' && selectedStaff ? (
              <div>
                <div className={styles.formGrid}>
                  <div><strong>Name:</strong> {selectedStaff.firstName} {selectedStaff.lastName}</div>
                  <div><strong>Employee ID:</strong> {selectedStaff.employeeId}</div>
                  <div><strong>Email:</strong> {selectedStaff.email}</div>
                  <div><strong>Phone:</strong> {selectedStaff.phone}</div>
                  <div><strong>Position:</strong> {selectedStaff.position}</div>
                  <div><strong>Department:</strong> {selectedStaff.department}</div>
                  <div><strong>Status:</strong> {selectedStaff.status}</div>
                  <div><strong>Hire Date:</strong> {formatDate(selectedStaff.hireDate)}</div>
                  {selectedStaff.salary && <div><strong>Salary:</strong> {formatCurrency(selectedStaff.salary)}</div>}
                </div>
                <div className={styles.formGrid}>
                  <div><strong>Address:</strong> {selectedStaff.address.street}, {selectedStaff.address.city}, {selectedStaff.address.state} {selectedStaff.address.zipCode}</div>
                  <div><strong>Emergency Contact:</strong> {selectedStaff.emergencyContact.name} ({selectedStaff.emergencyContact.relationship}) - {selectedStaff.emergencyContact.phone}</div>
                </div>
                {selectedStaff.qualifications.length > 0 && (
                  <div><strong>Qualifications:</strong> {selectedStaff.qualifications.join(', ')}</div>
                )}
                {selectedStaff.notes && (
                  <div><strong>Notes:</strong> {selectedStaff.notes}</div>
                )}
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name <span className={styles.required}>*</span></label>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className={formErrors.firstName ? styles.error : ''}
                    />
                    {formErrors.firstName && <div className={styles.errorMessage}>{formErrors.firstName}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name <span className={styles.required}>*</span></label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className={formErrors.lastName ? styles.error : ''}
                    />
                    {formErrors.lastName && <div className={styles.errorMessage}>{formErrors.lastName}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={formErrors.email ? styles.error : ''}
                    />
                    {formErrors.email && <div className={styles.errorMessage}>{formErrors.email}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone <span className={styles.required}>*</span></label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className={formErrors.phone ? styles.error : ''}
                    />
                    {formErrors.phone && <div className={styles.errorMessage}>{formErrors.phone}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="position">Position</label>
                    <select
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value as StaffPosition }))}
                    >
                      {positions.map(position => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="department">Department</label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value as Department }))}
                    >
                      {departments.map(department => (
                        <option key={department} value={department}>{department}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as StaffStatus }))}
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="hireDate">Hire Date <span className={styles.required}>*</span></label>
                    <input
                      id="hireDate"
                      type="date"
                      value={formData.hireDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, hireDate: e.target.value }))}
                      className={formErrors.hireDate ? styles.error : ''}
                    />
                    {formErrors.hireDate && <div className={styles.errorMessage}>{formErrors.hireDate}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="salary">Salary</label>
                    <input
                      id="salary"
                      type="number"
                      value={formData.salary}
                      onChange={(e) => setFormData(prev => ({ ...prev, salary: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <h3>Address</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="street">Street Address <span className={styles.required}>*</span></label>
                    <input
                      id="street"
                      type="text"
                      value={formData.street}
                      onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                      className={formErrors.street ? styles.error : ''}
                    />
                    {formErrors.street && <div className={styles.errorMessage}>{formErrors.street}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="city">City <span className={styles.required}>*</span></label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      className={formErrors.city ? styles.error : ''}
                    />
                    {formErrors.city && <div className={styles.errorMessage}>{formErrors.city}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="state">State</label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    >
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="zipCode">ZIP Code <span className={styles.required}>*</span></label>
                    <input
                      id="zipCode"
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                      className={formErrors.zipCode ? styles.error : ''}
                    />
                    {formErrors.zipCode && <div className={styles.errorMessage}>{formErrors.zipCode}</div>}
                  </div>
                </div>

                <h3>Emergency Contact</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContactName">Name <span className={styles.required}>*</span></label>
                    <input
                      id="emergencyContactName"
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                      className={formErrors.emergencyContactName ? styles.error : ''}
                    />
                    {formErrors.emergencyContactName && <div className={styles.errorMessage}>{formErrors.emergencyContactName}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContactRelationship">Relationship</label>
                    <select
                      id="emergencyContactRelationship"
                      value={formData.emergencyContactRelationship}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactRelationship: e.target.value }))}
                    >
                      {relationships.map(relationship => (
                        <option key={relationship} value={relationship}>{relationship}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContactPhone">Phone <span className={styles.required}>*</span></label>
                    <input
                      id="emergencyContactPhone"
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactPhone: e.target.value }))}
                      className={formErrors.emergencyContactPhone ? styles.error : ''}
                    />
                    {formErrors.emergencyContactPhone && <div className={styles.errorMessage}>{formErrors.emergencyContactPhone}</div>}
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="qualifications">Qualifications</label>
                    <textarea
                      id="qualifications"
                      value={formData.qualifications}
                      onChange={(e) => setFormData(prev => ({ ...prev, qualifications: e.target.value }))}
                      placeholder="Enter qualifications separated by commas"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes about the staff member"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancel} onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submit}>
                    {modalMode === 'create' ? 'Add Staff Member' : 'Update Staff Member'}
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

export default StaffManagement;