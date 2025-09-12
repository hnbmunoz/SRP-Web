export interface Staff {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: StaffPosition;
  department: Department;
  status: StaffStatus;
  hireDate: string;
  salary?: number;
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
  qualifications: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum StaffPosition {
  DOCTOR = 'Doctor',
  NURSE = 'Nurse',
  NURSE_PRACTITIONER = 'Nurse Practitioner',
  PHYSICIAN_ASSISTANT = 'Physician Assistant',
  MEDICAL_TECHNICIAN = 'Medical Technician',
  PHARMACIST = 'Pharmacist',
  RADIOLOGIST = 'Radiologist',
  LABORATORY_TECHNICIAN = 'Laboratory Technician',
  ADMINISTRATIVE_ASSISTANT = 'Administrative Assistant',
  RECEPTIONIST = 'Receptionist',
  SECURITY_GUARD = 'Security Guard',
  JANITOR = 'Janitor',
  IT_SUPPORT = 'IT Support',
  HUMAN_RESOURCES = 'Human Resources',
  FINANCE = 'Finance',
  MANAGER = 'Manager'
}

export enum Department {
  EMERGENCY = 'Emergency',
  CARDIOLOGY = 'Cardiology',
  NEUROLOGY = 'Neurology',
  PEDIATRICS = 'Pediatrics',
  SURGERY = 'Surgery',
  RADIOLOGY = 'Radiology',
  LABORATORY = 'Laboratory',
  PHARMACY = 'Pharmacy',
  ADMINISTRATION = 'Administration',
  HUMAN_RESOURCES = 'Human Resources',
  FINANCE = 'Finance',
  IT = 'Information Technology',
  MAINTENANCE = 'Maintenance',
  SECURITY = 'Security'
}

export enum StaffStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  ON_LEAVE = 'On Leave',
  TERMINATED = 'Terminated',
  SUSPENDED = 'Suspended'
}

export interface StaffFilters {
  searchTerm?: string;
  position?: StaffPosition;
  department?: Department;
  status?: StaffStatus;
}

export interface StaffFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: StaffPosition;
  department: Department;
  status: StaffStatus;
  hireDate: string;
  salary?: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  qualifications: string;
  notes?: string;
}

export interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  onLeaveStaff: number;
  inactiveStaff: number;
  departmentCounts: Record<Department, number>;
  positionCounts: Record<StaffPosition, number>;
}