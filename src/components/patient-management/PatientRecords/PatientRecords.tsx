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
import type { Patient, PatientFilters, PatientStats } from './types';
import { Gender, BloodType, PatientStatus } from './types';
import { samplePatients, genders, bloodTypes, patientStatuses, doctors } from './sampleData';
import styles from './PatientRecords.module.scss';

const PatientRecords: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(samplePatients);
  const [filters, setFilters] = useState<PatientFilters>({});
  const [isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'view'>('view');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

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

  const openModal = (mode: 'view', patient: Patient) => {
    setModalMode(mode);
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
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
          <button className={`${styles.actionButtons} ${styles.primary}`}>
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
                      <button title="Edit Patient">
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
      {showModal && selectedPatient && (
        <div className={styles.modal} onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Patient Details</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

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
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRecords;