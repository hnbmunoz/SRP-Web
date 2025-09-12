import type { Staff } from './types';
import { StaffPosition, Department, StaffStatus } from './types';

export const sampleStaff: Staff[] = [
  {
    id: 'STF001',
    employeeId: 'EMP001',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '+1-555-0101',
    position: StaffPosition.DOCTOR,
    department: Department.CARDIOLOGY,
    status: StaffStatus.ACTIVE,
    hireDate: '2020-03-15',
    salary: 180000,
    address: {
      street: '123 Medical Drive',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90210'
    },
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Spouse',
      phone: '+1-555-0102'
    },
    qualifications: ['MD - Cardiology', 'Board Certified Cardiologist', 'Advanced Cardiac Life Support'],
    notes: 'Specializes in interventional cardiology',
    createdAt: '2020-03-15T08:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'STF002',
    employeeId: 'EMP002',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@hospital.com',
    phone: '+1-555-0201',
    position: StaffPosition.NURSE,
    department: Department.EMERGENCY,
    status: StaffStatus.ACTIVE,
    hireDate: '2021-06-01',
    salary: 75000,
    address: {
      street: '456 Nurse Lane',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90211'
    },
    emergencyContact: {
      name: 'Maria Rodriguez',
      relationship: 'Mother',
      phone: '+1-555-0202'
    },
    qualifications: ['RN - Emergency Medicine', 'BLS Certified', 'ACLS Certified', 'Trauma Nursing'],
    notes: 'Excellent performance in high-stress situations',
    createdAt: '2021-06-01T08:00:00Z',
    updatedAt: '2024-01-10T14:20:00Z'
  },
  {
    id: 'STF003',
    employeeId: 'EMP003',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@hospital.com',
    phone: '+1-555-0301',
    position: StaffPosition.PHARMACIST,
    department: Department.PHARMACY,
    status: StaffStatus.ACTIVE,
    hireDate: '2019-09-10',
    salary: 120000,
    address: {
      street: '789 Pharmacy Street',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90212'
    },
    emergencyContact: {
      name: 'Lisa Chen',
      relationship: 'Wife',
      phone: '+1-555-0302'
    },
    qualifications: ['PharmD', 'Clinical Pharmacy Specialist', 'Medication Therapy Management'],
    notes: 'Expert in clinical pharmacy and drug interactions',
    createdAt: '2019-09-10T08:00:00Z',
    updatedAt: '2024-01-08T11:15:00Z'
  },
  {
    id: 'STF004',
    employeeId: 'EMP004',
    firstName: 'Lisa',
    lastName: 'Wong',
    email: 'lisa.wong@hospital.com',
    phone: '+1-555-0401',
    position: StaffPosition.MEDICAL_TECHNICIAN,
    department: Department.LABORATORY,
    status: StaffStatus.ON_LEAVE,
    hireDate: '2022-01-20',
    salary: 55000,
    address: {
      street: '321 Lab Avenue',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90213'
    },
    emergencyContact: {
      name: 'David Wong',
      relationship: 'Brother',
      phone: '+1-555-0402'
    },
    qualifications: ['Medical Laboratory Technology', 'Phlebotomy Certified', 'Clinical Chemistry'],
    notes: 'Currently on maternity leave',
    createdAt: '2022-01-20T08:00:00Z',
    updatedAt: '2024-01-05T09:30:00Z'
  },
  {
    id: 'STF005',
    employeeId: 'EMP005',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@hospital.com',
    phone: '+1-555-0501',
    position: StaffPosition.ADMINISTRATIVE_ASSISTANT,
    department: Department.ADMINISTRATION,
    status: StaffStatus.ACTIVE,
    hireDate: '2023-04-12',
    salary: 45000,
    address: {
      street: '654 Admin Road',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90214'
    },
    emergencyContact: {
      name: 'Mary Wilson',
      relationship: 'Mother',
      phone: '+1-555-0502'
    },
    qualifications: ['Bachelor of Business Administration', 'Medical Office Administration', 'Microsoft Office Specialist'],
    notes: 'Handles patient scheduling and administrative tasks',
    createdAt: '2023-04-12T08:00:00Z',
    updatedAt: '2024-01-03T16:45:00Z'
  },
  {
    id: 'STF006',
    employeeId: 'EMP006',
    firstName: 'Dr. Robert',
    lastName: 'Davis',
    email: 'robert.davis@hospital.com',
    phone: '+1-555-0601',
    position: StaffPosition.RADIOLOGIST,
    department: Department.RADIOLOGY,
    status: StaffStatus.ACTIVE,
    hireDate: '2018-11-05',
    salary: 220000,
    address: {
      street: '987 Radiology Blvd',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90215'
    },
    emergencyContact: {
      name: 'Jennifer Davis',
      relationship: 'Wife',
      phone: '+1-555-0602'
    },
    qualifications: ['MD - Radiology', 'Board Certified Radiologist', 'Interventional Radiology'],
    notes: 'Senior radiologist with 15+ years experience',
    createdAt: '2018-11-05T08:00:00Z',
    updatedAt: '2023-12-28T13:20:00Z'
  },
  {
    id: 'STF007',
    employeeId: 'EMP007',
    firstName: 'Amanda',
    lastName: 'Thompson',
    email: 'amanda.thompson@hospital.com',
    phone: '+1-555-0701',
    position: StaffPosition.NURSE_PRACTITIONER,
    department: Department.PEDIATRICS,
    status: StaffStatus.ACTIVE,
    hireDate: '2021-08-30',
    salary: 95000,
    address: {
      street: '147 Pediatric Way',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90216'
    },
    emergencyContact: {
      name: 'Thomas Thompson',
      relationship: 'Husband',
      phone: '+1-555-0702'
    },
    qualifications: ['MSN - Nurse Practitioner', 'Pediatric Primary Care', 'Family Nurse Practitioner'],
    notes: 'Specializes in pediatric primary care',
    createdAt: '2021-08-30T08:00:00Z',
    updatedAt: '2023-12-20T10:15:00Z'
  },
  {
    id: 'STF008',
    employeeId: 'EMP008',
    firstName: 'Kevin',
    lastName: 'Martinez',
    email: 'kevin.martinez@hospital.com',
    phone: '+1-555-0801',
    position: StaffPosition.SECURITY_GUARD,
    department: Department.SECURITY,
    status: StaffStatus.INACTIVE,
    hireDate: '2020-12-01',
    salary: 40000,
    address: {
      street: '258 Security Street',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90217'
    },
    emergencyContact: {
      name: 'Rosa Martinez',
      relationship: 'Sister',
      phone: '+1-555-0802'
    },
    qualifications: ['Security Guard License', 'CPR Certified', 'First Aid Certified'],
    notes: 'Currently inactive due to injury',
    createdAt: '2020-12-01T08:00:00Z',
    updatedAt: '2023-12-15T14:30:00Z'
  }
];

export const departments = Object.values(Department);
export const positions = Object.values(StaffPosition);
export const statuses = Object.values(StaffStatus);

export const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const relationships = [
  'Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Other'
];