export interface Patient {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email?: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  bloodType: BloodType;
  status: PatientStatus;
  admissionDate?: string;
  dischargeDate?: string;
  assignedDoctor?: string;
  roomNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say'
}

export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
  UNKNOWN = 'Unknown'
}

export enum PatientStatus {
  ACTIVE = 'Active',
  ADMITTED = 'Admitted',
  DISCHARGED = 'Discharged',
  INACTIVE = 'Inactive',
  DECEASED = 'Deceased'
}

export interface PatientFilters {
  searchTerm?: string;
  gender?: Gender;
  bloodType?: BloodType;
  status?: PatientStatus;
  assignedDoctor?: string;
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email?: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber?: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
  bloodType: BloodType;
  status: PatientStatus;
  admissionDate?: string;
  dischargeDate?: string;
  assignedDoctor?: string;
  roomNumber?: string;
  notes?: string;
}

export interface PatientStats {
  totalPatients: number;
  activePatients: number;
  admittedPatients: number;
  dischargedPatients: number;
  inactivePatients: number;
  genderCounts: Record<Gender, number>;
  bloodTypeCounts: Record<BloodType, number>;
}