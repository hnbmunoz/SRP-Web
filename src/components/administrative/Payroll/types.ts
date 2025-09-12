export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  payPeriod: string;
  payDate: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: PayrollDeductions;
  grossPay: number;
  netPay: number;
  status: PayrollStatus;
  hoursWorked: number;
  overtimeHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollDeductions {
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  healthInsurance: number;
  retirement401k: number;
  other: number;
}

export enum PayrollStatus {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  PAID = 'Paid',
  CANCELLED = 'Cancelled'
}

export enum PayPeriodType {
  WEEKLY = 'Weekly',
  BIWEEKLY = 'Bi-weekly',
  MONTHLY = 'Monthly',
  SEMI_MONTHLY = 'Semi-monthly'
}

export interface PayrollFilters {
  searchTerm?: string;
  department?: string;
  status?: PayrollStatus;
  payPeriod?: string;
  startDate?: string;
  endDate?: string;
}

export interface PayrollFormData {
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  payPeriod: string;
  payDate: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  hoursWorked: number;
  overtimeHours: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  healthInsurance: number;
  retirement401k: number;
  otherDeductions: number;
  status: PayrollStatus;
}

export interface PayrollStats {
  totalRecords: number;
  totalGrossPay: number;
  totalNetPay: number;
  totalDeductions: number;
  pendingRecords: number;
  approvedRecords: number;
  paidRecords: number;
  departmentTotals: Record<string, number>;
  statusCounts: Record<PayrollStatus, number>;
}

export interface PayrollSummary {
  payPeriod: string;
  totalEmployees: number;
  totalGrossPay: number;
  totalNetPay: number;
  totalDeductions: number;
  averageGrossPay: number;
  averageNetPay: number;
}