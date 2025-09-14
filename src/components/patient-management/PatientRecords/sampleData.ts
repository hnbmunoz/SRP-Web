import type { Patient } from './types';
import { Gender, BloodType, PatientStatus } from './types';

export const samplePatients: Patient[] = [
  {
    id: 'PAT001',
    patientId: 'P001',
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '1985-03-15',
    gender: Gender.MALE,
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210'
    },
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '(555) 123-4568'
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BC123456789',
      groupNumber: 'GRP001'
    },
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
    bloodType: BloodType.A_POSITIVE,
    status: PatientStatus.ACTIVE,
    assignedDoctor: 'Dr. Sarah Johnson',
    notes: 'Regular checkups required for diabetes management',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-10T14:20:00Z'
  },
  {
    id: 'PAT002',
    patientId: 'P002',
    firstName: 'Maria',
    lastName: 'Garcia',
    dateOfBirth: '1992-07-22',
    gender: Gender.FEMALE,
    email: 'maria.garcia@email.com',
    phone: '(555) 234-5678',
    address: {
      street: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    },
    emergencyContact: {
      name: 'Carlos Garcia',
      relationship: 'Brother',
      phone: '(555) 234-5679'
    },
    insurance: {
      provider: 'Kaiser Permanente',
      policyNumber: 'KP987654321'
    },
    medicalHistory: ['Asthma'],
    allergies: ['Pollen', 'Dust mites'],
    currentMedications: ['Albuterol inhaler'],
    bloodType: BloodType.O_NEGATIVE,
    status: PatientStatus.ADMITTED,
    admissionDate: '2024-03-12',
    assignedDoctor: 'Dr. Michael Chen',
    roomNumber: '205A',
    notes: 'Admitted for respiratory complications',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-03-12T16:45:00Z'
  },
  {
    id: 'PAT003',
    patientId: 'P003',
    firstName: 'Robert',
    lastName: 'Johnson',
    dateOfBirth: '1978-11-08',
    gender: Gender.MALE,
    phone: '(555) 345-6789',
    address: {
      street: '789 Pine St',
      city: 'San Diego',
      state: 'CA',
      zipCode: '92101'
    },
    emergencyContact: {
      name: 'Linda Johnson',
      relationship: 'Wife',
      phone: '(555) 345-6790'
    },
    insurance: {
      provider: 'Aetna',
      policyNumber: 'AET456789123'
    },
    medicalHistory: ['Heart Disease', 'High Cholesterol'],
    allergies: ['Latex'],
    currentMedications: ['Atorvastatin 20mg', 'Aspirin 81mg'],
    bloodType: BloodType.B_POSITIVE,
    status: PatientStatus.DISCHARGED,
    admissionDate: '2024-03-01',
    dischargeDate: '2024-03-08',
    assignedDoctor: 'Dr. Emily Rodriguez',
    notes: 'Successful cardiac procedure, follow-up in 2 weeks',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-03-08T10:30:00Z'
  },
  {
    id: 'PAT004',
    patientId: 'P004',
    firstName: 'Lisa',
    lastName: 'Anderson',
    dateOfBirth: '1995-05-14',
    gender: Gender.FEMALE,
    email: 'lisa.anderson@email.com',
    phone: '(555) 456-7890',
    address: {
      street: '321 Elm St',
      city: 'Sacramento',
      state: 'CA',
      zipCode: '95814'
    },
    emergencyContact: {
      name: 'Mark Anderson',
      relationship: 'Father',
      phone: '(555) 456-7891'
    },
    insurance: {
      provider: 'Cigna',
      policyNumber: 'CIG789123456'
    },
    medicalHistory: ['Migraine'],
    allergies: ['None known'],
    currentMedications: ['Sumatriptan 50mg PRN'],
    bloodType: BloodType.AB_POSITIVE,
    status: PatientStatus.ACTIVE,
    assignedDoctor: 'Dr. David Kim',
    notes: 'Chronic migraine management',
    createdAt: '2024-02-10T13:45:00Z',
    updatedAt: '2024-03-05T09:20:00Z'
  },
  {
    id: 'PAT005',
    patientId: 'P005',
    firstName: 'James',
    lastName: 'Wilson',
    dateOfBirth: '1960-12-03',
    gender: Gender.MALE,
    email: 'james.wilson@email.com',
    phone: '(555) 567-8901',
    address: {
      street: '654 Maple Dr',
      city: 'Fresno',
      state: 'CA',
      zipCode: '93701'
    },
    emergencyContact: {
      name: 'Patricia Wilson',
      relationship: 'Wife',
      phone: '(555) 567-8902'
    },
    insurance: {
      provider: 'Medicare',
      policyNumber: 'MED123456789A'
    },
    medicalHistory: ['COPD', 'Arthritis', 'Hypertension'],
    allergies: ['Sulfa drugs'],
    currentMedications: ['Tiotropium inhaler', 'Ibuprofen 400mg', 'Amlodipine 5mg'],
    bloodType: BloodType.O_POSITIVE,
    status: PatientStatus.ADMITTED,
    admissionDate: '2024-03-10',
    assignedDoctor: 'Dr. Sarah Johnson',
    roomNumber: '312B',
    notes: 'COPD exacerbation, monitoring oxygen levels',
    createdAt: '2024-01-05T08:30:00Z',
    updatedAt: '2024-03-10T12:15:00Z'
  },
  {
    id: 'PAT006',
    patientId: 'P006',
    firstName: 'Jennifer',
    lastName: 'Brown',
    dateOfBirth: '1988-09-18',
    gender: Gender.FEMALE,
    email: 'jennifer.brown@email.com',
    phone: '(555) 678-9012',
    address: {
      street: '987 Cedar Ln',
      city: 'Oakland',
      state: 'CA',
      zipCode: '94601'
    },
    emergencyContact: {
      name: 'Michael Brown',
      relationship: 'Husband',
      phone: '(555) 678-9013'
    },
    insurance: {
      provider: 'United Healthcare',
      policyNumber: 'UHC345678901'
    },
    medicalHistory: ['Pregnancy (current)', 'Gestational diabetes (previous)'],
    allergies: ['Codeine'],
    currentMedications: ['Prenatal vitamins', 'Folic acid'],
    bloodType: BloodType.A_NEGATIVE,
    status: PatientStatus.ACTIVE,
    assignedDoctor: 'Dr. Amanda Lee',
    notes: 'Second trimester pregnancy, regular prenatal care',
    createdAt: '2024-01-25T14:00:00Z',
    updatedAt: '2024-03-08T11:30:00Z'
  }
];

export const genders = Object.values(Gender);
export const bloodTypes = Object.values(BloodType);
export const patientStatuses = Object.values(PatientStatus);

export const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const relationships = [
  'Spouse', 'Parent', 'Child', 'Sibling', 'Grandparent', 'Grandchild',
  'Uncle', 'Aunt', 'Cousin', 'Friend', 'Guardian', 'Other'
];

export const doctors = [
  'Dr. Sarah Johnson',
  'Dr. Michael Chen',
  'Dr. Emily Rodriguez',
  'Dr. David Kim',
  'Dr. Amanda Lee',
  'Dr. Robert Martinez',
  'Dr. Lisa Thompson',
  'Dr. James Wilson'
];