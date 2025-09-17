import React, { useState, useMemo } from 'react';
import {
  FaUsers,
  FaUserCheck,
  FaHospital,
  FaUserTimes,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaDownload,
  FaFilter,
  FaSearch,
  FaTimes,
  FaHeartbeat
} from 'react-icons/fa';
import type { Patient, PatientFilters, PatientStats, PatientFormData } from './types';
import { Gender, BloodType, PatientStatus } from './types';
import { samplePatients, genders, bloodTypes, patientStatuses, doctors, states, relationships } from './sampleData';
import styles from './PatientRecords.module.scss';

const PatientRecords: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(samplePatients);
  const [filters, setFilters] = useState<PatientFilters>({});
  const [isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('view');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: Gender.MALE,
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'CA',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactRelationship: 'Spouse',
    emergencyContactPhone: '',
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    bloodType: BloodType.UNKNOWN,
    status: PatientStatus.ACTIVE,
    admissionDate: '',
    dischargeDate: '',
    assignedDoctor: '',
    roomNumber: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculate patient statistics
  const stats: PatientStats = useMemo(() => {
    const totalPatients = patients.length;
    const activePatients = patients.filter(p => p.status === PatientStatus.ACTIVE).length;
    const admittedPatients = patients.filter(p => p.status === PatientStatus.ADMITTED).length;
    const dischargedPatients = patients.filter(p => p.status === PatientStatus.DISCHARGED).length;
    const inactivePatients = patients.filter(p => p.status === PatientStatus.INACTIVE).length;

    const genderCounts = genders.reduce((acc, gender) => {
      acc[gender] = patients.filter(p => p.gender === gender).length;
      return acc;
    }, {} as Record<Gender, number>);

    const bloodTypeCounts = bloodTypes.reduce((acc, bloodType) => {
      acc[bloodType] = patients.filter(p => p.bloodType === bloodType).length;
      return acc;
    }, {} as Record<BloodType, number>);

    return {
      totalPatients,
      activePatients,
      admittedPatients,
      dischargedPatients,
      inactivePatients,
      genderCounts,
      bloodTypeCounts
    };
  }, [patients]);

  // Filter patients based on current filters
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (!patient.firstName.toLowerCase().includes(searchLower) &&
            !patient.lastName.toLowerCase().includes(searchLower) &&
            !patient.patientId.toLowerCase().includes(searchLower) &&
            !(patient.email && patient.email.toLowerCase().includes(searchLower))) {
          return false;
        }
      }

      if (filters.gender && patient.gender !== filters.gender) {
        return false;
      }

      if (filters.bloodType && patient.bloodType !== filters.bloodType) {
        return false;
      }

      if (filters.status && patient.status !== filters.status) {
        return false;
      }

      if (filters.assignedDoctor && patient.assignedDoctor !== filters.assignedDoctor) {
        return false;
      }

      return true;
    });
  }, [patients, filters]);

  const handleFilterChange = (key: keyof PatientFilters, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const openModal = (mode: 'create' | 'edit' | 'view', patient?: Patient) => {
    setModalMode(mode);
    setSelectedPatient(patient || null);
    
    if (mode === 'create') {
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: Gender.MALE,
        email: '',
        phone: '',
        street: '',
        city: '',
        state: 'CA',
        zipCode: '',
        emergencyContactName: '',
        emergencyContactRelationship: 'Spouse',
        emergencyContactPhone: '',
        insuranceProvider: '',
        policyNumber: '',
        groupNumber: '',
        medicalHistory: '',
        allergies: '',
        currentMedications: '',
        bloodType: BloodType.UNKNOWN,
        status: PatientStatus.ACTIVE,
        admissionDate: '',
        dischargeDate: '',
        assignedDoctor: '',
        roomNumber: '',
        notes: ''
      });
    } else if (patient) {
      setFormData({
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        email: patient.email || '',
        phone: patient.phone,
        street: patient.address.street,
        city: patient.address.city,
        state: patient.address.state,
        zipCode: patient.address.zipCode,
        emergencyContactName: patient.emergencyContact.name,
        emergencyContactRelationship: patient.emergencyContact.relationship,
        emergencyContactPhone: patient.emergencyContact.phone,
        insuranceProvider: patient.insurance.provider,
        policyNumber: patient.insurance.policyNumber,
        groupNumber: patient.insurance.groupNumber || '',
        medicalHistory: patient.medicalHistory.join(', '),
        allergies: patient.allergies.join(', '),
        currentMedications: patient.currentMedications.join(', '),
        bloodType: patient.bloodType,
        status: patient.status,
        admissionDate: patient.admissionDate || '',
        dischargeDate: patient.dischargeDate || '',
        assignedDoctor: patient.assignedDoctor || '',
        roomNumber: patient.roomNumber || '',
        notes: patient.notes || ''
      });
    }
    
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.street.trim()) errors.street = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    if (!formData.emergencyContactName.trim()) errors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactPhone.trim()) errors.emergencyContactPhone = 'Emergency contact phone is required';
    if (!formData.insuranceProvider.trim()) errors.insuranceProvider = 'Insurance provider is required';
    if (!formData.policyNumber.trim()) errors.policyNumber = 'Policy number is required';

    // Email validation if provided
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const now = new Date().toISOString();
    
    if (modalMode === 'create') {
      const newPatient: Patient = {
        id: `PAT${String(patients.length + 1).padStart(3, '0')}`,
        patientId: `P${String(patients.length + 1).padStart(3, '0')}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        email: formData.email || undefined,
        phone: formData.phone,
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
        insurance: {
          provider: formData.insuranceProvider,
          policyNumber: formData.policyNumber,
          groupNumber: formData.groupNumber || undefined
        },
        medicalHistory: formData.medicalHistory.split(',').map(h => h.trim()).filter(h => h),
        allergies: formData.allergies.split(',').map(a => a.trim()).filter(a => a),
        currentMedications: formData.currentMedications.split(',').map(m => m.trim()).filter(m => m),
        bloodType: formData.bloodType,
        status: formData.status,
        admissionDate: formData.admissionDate || undefined,
        dischargeDate: formData.dischargeDate || undefined,
        assignedDoctor: formData.assignedDoctor || undefined,
        roomNumber: formData.roomNumber || undefined,
        notes: formData.notes || undefined,
        createdAt: now,
        updatedAt: now
      };
      
      setPatients(prev => [...prev, newPatient]);
    } else if (modalMode === 'edit' && selectedPatient) {
      const updatedPatient: Patient = {
        ...selectedPatient,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        email: formData.email || undefined,
        phone: formData.phone,
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
        insurance: {
          provider: formData.insuranceProvider,
          policyNumber: formData.policyNumber,
          groupNumber: formData.groupNumber || undefined
        },
        medicalHistory: formData.medicalHistory.split(',').map(h => h.trim()).filter(h => h),
        allergies: formData.allergies.split(',').map(a => a.trim()).filter(a => a),
        currentMedications: formData.currentMedications.split(',').map(m => m.trim()).filter(m => m),
        bloodType: formData.bloodType,
        status: formData.status,
        admissionDate: formData.admissionDate || undefined,
        dischargeDate: formData.dischargeDate || undefined,
        assignedDoctor: formData.assignedDoctor || undefined,
        roomNumber: formData.roomNumber || undefined,
        notes: formData.notes || undefined,
        updatedAt: now
      };
      
      setPatients(prev => prev.map(p => p.id === selectedPatient.id ? updatedPatient : p));
    }
    
    closeModal();
  };

  const handleDelete = (patient: Patient) => {
    if (window.confirm(`Are you sure you want to delete patient ${patient.firstName} ${patient.lastName}?`)) {
      setPatients(prev => prev.filter(p => p.id !== patient.id));
    }
  };

  const getStatusBadgeClass = (status: PatientStatus) => {
    switch (status) {
      case PatientStatus.ACTIVE:
        return styles.active;
      case PatientStatus.ADMITTED:
        return styles.admitted;
      case PatientStatus.DISCHARGED:
        return styles.discharged;
      case PatientStatus.INACTIVE:
        return styles.inactive;
      case PatientStatus.DECEASED:
        return styles.deceased;
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  if (isLoading) {
    return (
      <div className={styles.patientContainer}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          Loading patient data...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.patientContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Patient Records</h1>
        <div className={styles.headerActions}>
          <button
            className={`${styles.actionButtons} ${styles.primary}`}
            onClick={() => openModal('create')}
          >
            <FaPlus /> Add New Patient
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
            <span className={styles.statTitle}>Total Patients</span>
          </div>
          <div className={styles.statValue}>{stats.totalPatients}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaUserCheck className={`${styles.statIcon} ${styles.active}`} />
            <span className={styles.statTitle}>Active</span>
          </div>
          <div className={styles.statValue}>{stats.activePatients}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaHospital className={`${styles.statIcon} ${styles.admitted}`} />
            <span className={styles.statTitle}>Admitted</span>
          </div>
          <div className={styles.statValue}>{stats.admittedPatients}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FaUserTimes className={`${styles.statIcon} ${styles.discharged}`} />
            <span className={styles.statTitle}>Discharged</span>
          </div>
          <div className={styles.statValue}>{stats.dischargedPatients}</div>
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
              placeholder="Search by name, patient ID, or email..."
              value={filters.searchTerm || ''}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={filters.gender || ''}
              onChange={(e) => handleFilterChange('gender', e.target.value || undefined)}
            >
              <option value="">All Genders</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="bloodType">Blood Type</label>
            <select
              id="bloodType"
              value={filters.bloodType || ''}
              onChange={(e) => handleFilterChange('bloodType', e.target.value || undefined)}
            >
              <option value="">All Blood Types</option>
              {bloodTypes.map(bloodType => (
                <option key={bloodType} value={bloodType}>{bloodType}</option>
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
              {patientStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="assignedDoctor">Assigned Doctor</label>
            <select
              id="assignedDoctor"
              value={filters.assignedDoctor || ''}
              onChange={(e) => handleFilterChange('assignedDoctor', e.target.value || undefined)}
            >
              <option value="">All Doctors</option>
              {doctors.map(doctor => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className={styles.patientTable}>
        <div className={styles.tableHeader}>
          <h3>Patients ({filteredPatients.length})</h3>
          <div className={styles.tableActions}>
            <button className={styles.actionButtons}>
              <FaSearch /> Advanced Search
            </button>
          </div>
        </div>

        {filteredPatients.length === 0 ? (
          <div className={styles.emptyState}>
            <FaUsers className={styles.emptyIcon} />
            <h3>No patients found</h3>
            <p>Try adjusting your filters or add new patients</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Age/Gender</th>
                <th>Blood Type</th>
                <th>Status</th>
                <th>Assigned Doctor</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td>
                    <div>
                      <strong>{patient.firstName} {patient.lastName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        ID: {patient.patientId}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      {calculateAge(patient.dateOfBirth)} years
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {patient.gender}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.bloodTypeBadge}>
                      <FaHeartbeat /> {patient.bloodType}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(patient.status)}`}>
                      {patient.status}
                    </span>
                    {patient.roomNumber && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Room: {patient.roomNumber}
                      </div>
                    )}
                  </td>
                  <td>{patient.assignedDoctor || 'Not assigned'}</td>
                  <td>
                    <div>
                      {patient.email || 'No email'}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {patient.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        title="View Details"
                        onClick={() => openModal('view', patient)}
                      >
                        <FaEye />
                      </button>
                      <button
                        title="Edit Patient"
                        onClick={() => openModal('edit', patient)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        title="Delete Patient" 
                        className={styles.danger}
                        onClick={() => handleDelete(patient)}
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
                {modalMode === 'create' && 'Add New Patient'}
                {modalMode === 'edit' && 'Edit Patient'}
                {modalMode === 'view' && 'Patient Details'}
              </h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            {modalMode === 'view' && selectedPatient ? (
              <div className={styles.viewContent}>
                <div className={styles.patientHeader}>
                  <h3>{selectedPatient.firstName} {selectedPatient.lastName}</h3>
                  <span className={`${styles.statusBadge} ${getStatusBadgeClass(selectedPatient.status)}`}>
                    {selectedPatient.status}
                  </span>
                </div>
                
                <div className={styles.formGrid}>
                  <div><strong>Patient ID:</strong> {selectedPatient.patientId}</div>
                  <div><strong>Age:</strong> {calculateAge(selectedPatient.dateOfBirth)} years</div>
                  <div><strong>Gender:</strong> {selectedPatient.gender}</div>
                  <div><strong>Blood Type:</strong> {selectedPatient.bloodType}</div>
                  <div><strong>Phone:</strong> {selectedPatient.phone}</div>
                  <div><strong>Email:</strong> {selectedPatient.email || 'Not provided'}</div>
                </div>

                <div className={styles.sectionDivider}>
                  <h4>Address</h4>
                  <p>{selectedPatient.address.street}, {selectedPatient.address.city}, {selectedPatient.address.state} {selectedPatient.address.zipCode}</p>
                </div>

                <div className={styles.sectionDivider}>
                  <h4>Emergency Contact</h4>
                  <p>{selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relationship}) - {selectedPatient.emergencyContact.phone}</p>
                </div>

                <div className={styles.sectionDivider}>
                  <h4>Insurance</h4>
                  <p><strong>Provider:</strong> {selectedPatient.insurance.provider}</p>
                  <p><strong>Policy:</strong> {selectedPatient.insurance.policyNumber}</p>
                  {selectedPatient.insurance.groupNumber && <p><strong>Group:</strong> {selectedPatient.insurance.groupNumber}</p>}
                </div>

                {selectedPatient.medicalHistory.length > 0 && (
                  <div className={styles.sectionDivider}>
                    <h4>Medical History</h4>
                    <p>{selectedPatient.medicalHistory.join(', ')}</p>
                  </div>
                )}

                {selectedPatient.allergies.length > 0 && (
                  <div className={styles.sectionDivider}>
                    <h4>Allergies</h4>
                    <p>{selectedPatient.allergies.join(', ')}</p>
                  </div>
                )}

                {selectedPatient.currentMedications.length > 0 && (
                  <div className={styles.sectionDivider}>
                    <h4>Current Medications</h4>
                    <p>{selectedPatient.currentMedications.join(', ')}</p>
                  </div>
                )}

                {selectedPatient.assignedDoctor && (
                  <div className={styles.sectionDivider}>
                    <h4>Care Team</h4>
                    <p><strong>Assigned Doctor:</strong> {selectedPatient.assignedDoctor}</p>
                    {selectedPatient.roomNumber && <p><strong>Room:</strong> {selectedPatient.roomNumber}</p>}
                  </div>
                )}

                {(selectedPatient.admissionDate || selectedPatient.dischargeDate) && (
                  <div className={styles.sectionDivider}>
                    <h4>Admission Details</h4>
                    {selectedPatient.admissionDate && <p><strong>Admission Date:</strong> {formatDate(selectedPatient.admissionDate)}</p>}
                    {selectedPatient.dischargeDate && <p><strong>Discharge Date:</strong> {formatDate(selectedPatient.dischargeDate)}</p>}
                  </div>
                )}

                {selectedPatient.notes && (
                  <div className={styles.sectionDivider}>
                    <h4>Notes</h4>
                    <p>{selectedPatient.notes}</p>
                  </div>
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
                    <label htmlFor="dateOfBirth">Date of Birth <span className={styles.required}>*</span></label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      className={formErrors.dateOfBirth ? styles.error : ''}
                    />
                    {formErrors.dateOfBirth && <div className={styles.errorMessage}>{formErrors.dateOfBirth}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as Gender }))}
                    >
                      {genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="bloodType">Blood Type</label>
                    <select
                      id="bloodType"
                      value={formData.bloodType}
                      onChange={(e) => setFormData(prev => ({ ...prev, bloodType: e.target.value as BloodType }))}
                    >
                      {bloodTypes.map(bloodType => (
                        <option key={bloodType} value={bloodType}>{bloodType}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as PatientStatus }))}
                    >
                      {patientStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
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

                <h3>Insurance</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="insuranceProvider">Provider <span className={styles.required}>*</span></label>
                    <input
                      id="insuranceProvider"
                      type="text"
                      value={formData.insuranceProvider}
                      onChange={(e) => setFormData(prev => ({ ...prev, insuranceProvider: e.target.value }))}
                      className={formErrors.insuranceProvider ? styles.error : ''}
                    />
                    {formErrors.insuranceProvider && <div className={styles.errorMessage}>{formErrors.insuranceProvider}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="policyNumber">Policy Number <span className={styles.required}>*</span></label>
                    <input
                      id="policyNumber"
                      type="text"
                      value={formData.policyNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, policyNumber: e.target.value }))}
                      className={formErrors.policyNumber ? styles.error : ''}
                    />
                    {formErrors.policyNumber && <div className={styles.errorMessage}>{formErrors.policyNumber}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="groupNumber">Group Number</label>
                    <input
                      id="groupNumber"
                      type="text"
                      value={formData.groupNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, groupNumber: e.target.value }))}
                    />
                  </div>
                </div>

                <h3>Medical Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="medicalHistory">Medical History</label>
                    <textarea
                      id="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                      placeholder="Enter medical history separated by commas"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="allergies">Allergies</label>
                    <textarea
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                      placeholder="Enter allergies separated by commas"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="currentMedications">Current Medications</label>
                    <textarea
                      id="currentMedications"
                      value={formData.currentMedications}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentMedications: e.target.value }))}
                      placeholder="Enter medications separated by commas"
                    />
                  </div>
                </div>

                <h3>Care Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="assignedDoctor">Assigned Doctor</label>
                    <select
                      id="assignedDoctor"
                      value={formData.assignedDoctor}
                      onChange={(e) => setFormData(prev => ({ ...prev, assignedDoctor: e.target.value }))}
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor} value={doctor}>{doctor}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                      id="roomNumber"
                      type="text"
                      value={formData.roomNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, roomNumber: e.target.value }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="admissionDate">Admission Date</label>
                    <input
                      id="admissionDate"
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, admissionDate: e.target.value }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="dischargeDate">Discharge Date</label>
                    <input
                      id="dischargeDate"
                      type="date"
                      value={formData.dischargeDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dischargeDate: e.target.value }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes about the patient"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancel} onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submit}>
                    {modalMode === 'create' ? 'Add Patient' : 'Update Patient'}
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

export default PatientRecords;