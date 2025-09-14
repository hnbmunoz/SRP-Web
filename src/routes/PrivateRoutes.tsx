import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import SidePanel from '../components/custom-component/SidePanel/SidePanel';
import NotFound from '../pages/error-pages/NotFound';
import Profile from '../components/Profile';
import Dashboard from '../components/Dashboard';
import { SidePanelProvider, useSidePanelContext } from '../contexts/SidePanelContext';
import Forbidden from '../pages/error-pages/Forbidden';
import MedicalSuppliesInventory from '../components/clinical-operations/MedicalSuppliesInventory';
import StaffManagement from '../components/administrative/StaffManagement';
import Payroll from '../components/administrative/Payroll';
import PatientRecords from '../components/patient-management/PatientRecords';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useSidePanelContext();
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Side panel - always present on tablet/desktop */}
      {!isMobile && <SidePanel />}
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0 // Prevent flex item from overflowing
      }}>
        <Header />
        <div style={{ flex: 1, padding: '5.5rem', overflow: 'auto', paddingTop: '10rem' }}>
          {children}
        </div>
      </div>

      {/* Side panel overlay for mobile */}
      {isMobile && <SidePanel />}
    </div>
  );
};

const PrivateRoutesContent = () => {
  return (
    <Routes>
      {/* Regular pages with layout */}
      <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
      <Route path="/access-landing" element={<MainLayout><Forbidden /></MainLayout>} />
      
      {/* Full-screen error pages - no layout */}
      <Route path="/system-settings" element={<Forbidden />} />
      <Route path="/system-settings/*" element={<Forbidden />} />
      
      {/* Patient Management Routes */}
      <Route path="/patient-management" element={<MainLayout><div style={{padding: '2rem'}}><h1>Patient Management</h1><p>Patient management module coming soon...</p></div></MainLayout>} />
      <Route path="/patient-management/patient-records" element={<MainLayout><PatientRecords /></MainLayout>} />
      <Route path="/patient-management/admission-forms" element={<MainLayout><div style={{padding: '2rem'}}><h1>Admission Forms</h1><p>Admission forms interface coming soon...</p></div></MainLayout>} />
      <Route path="/patient-management/discharge-summary" element={<MainLayout><div style={{padding: '2rem'}}><h1>Discharge Summary</h1><p>Discharge summary interface coming soon...</p></div></MainLayout>} />
      <Route path="/patient-management/medical-history" element={<MainLayout><div style={{padding: '2rem'}}><h1>Medical History</h1><p>Medical history interface coming soon...</p></div></MainLayout>} />
      <Route path="/patient-management/insurance-details" element={<MainLayout><div style={{padding: '2rem'}}><h1>Insurance Details</h1><p>Insurance details interface coming soon...</p></div></MainLayout>} />
      
      {/* Clinical Operations Routes */}
      <Route path="/clinical-operations" element={<MainLayout><div style={{padding: '2rem'}}><h1>Clinical Operations</h1><p>Clinical operations module coming soon...</p></div></MainLayout>} />
      <Route path="/clinical-operations/appointment-scheduling" element={<MainLayout><div style={{padding: '2rem'}}><h1>Appointment Scheduling</h1><p>Appointment scheduling interface coming soon...</p></div></MainLayout>} />
      <Route path="/clinical-operations/treatment-plans" element={<MainLayout><div style={{padding: '2rem'}}><h1>Treatment Plans</h1><p>Treatment plans interface coming soon...</p></div></MainLayout>} />
      <Route path="/clinical-operations/prescription-management" element={<MainLayout><div style={{padding: '2rem'}}><h1>Prescription Management</h1><p>Prescription management interface coming soon...</p></div></MainLayout>} />
      <Route path="/clinical-operations/lab-results" element={<MainLayout><div style={{padding: '2rem'}}><h1>Lab Results</h1><p>Lab results interface coming soon...</p></div></MainLayout>} />
      <Route path="/clinical-operations/vital-signs-monitor" element={<MainLayout><div style={{padding: '2rem'}}><h1>Vital Signs Monitor</h1><p>Vital signs monitor interface coming soon...</p></div></MainLayout>} />
      <Route path="/clinical-operations/medical-supplies-inventory" element={<MainLayout><MedicalSuppliesInventory /></MainLayout>} />
      
      {/* Administrative Functions Routes */}
      <Route path="/administrative-functions" element={<MainLayout><div style={{padding: '2rem'}}><h1>Administrative Functions</h1><p>Administrative functions module coming soon...</p></div></MainLayout>} />
      <Route path="/administrative-functions/staff-management" element={<MainLayout><StaffManagement /></MainLayout>} />
      <Route path="/administrative-functions/payroll" element={<MainLayout><Payroll /></MainLayout>} />
      <Route path="/administrative-functions/financial-reports" element={<MainLayout><div style={{padding: '2rem'}}><h1>Financial Reports</h1><p>Financial reports interface coming soon...</p></div></MainLayout>} />
      <Route path="/administrative-functions/audit-logs" element={<MainLayout><div style={{padding: '2rem'}}><h1>Audit Logs</h1><p>Audit logs interface coming soon...</p></div></MainLayout>} />
      
      {/* Emergency Services Routes */}
      {/* <Route path="/emergency-services" element={<MainLayout><div style={{padding: '2rem'}}><h1>Emergency Services</h1><p>Emergency services module coming soon...</p></div></MainLayout>} />
      <Route path="/emergency-services/emergency-admissions" element={<MainLayout><div style={{padding: '2rem'}}><h1>Emergency Admissions</h1><p>Emergency admissions interface coming soon...</p></div></MainLayout>} />
      <Route path="/emergency-services/trauma-cases" element={<MainLayout><div style={{padding: '2rem'}}><h1>Trauma Cases</h1><p>Trauma cases interface coming soon...</p></div></MainLayout>} />
      <Route path="/emergency-services/icu-management" element={<MainLayout><div style={{padding: '2rem'}}><h1>ICU Management</h1><p>ICU management interface coming soon...</p></div></MainLayout>} />
      <Route path="/emergency-services/ambulance-dispatch" element={<MainLayout><div style={{padding: '2rem'}}><h1>Ambulance Dispatch</h1><p>Ambulance dispatch interface coming soon...</p></div></MainLayout>} />
      <Route path="/emergency-services/critical-care" element={<MainLayout><div style={{padding: '2rem'}}><h1>Critical Care</h1><p>Critical care interface coming soon...</p></div></MainLayout>} /> */}
      
      {/* Laboratory & Diagnostics Routes */}
      {/* <Route path="/laboratory-diagnostics" element={<MainLayout><div style={{padding: '2rem'}}><h1>Laboratory & Diagnostics</h1><p>Laboratory & diagnostics module coming soon...</p></div></MainLayout>} />
      <Route path="/laboratory-diagnostics/lab-test-orders" element={<MainLayout><div style={{padding: '2rem'}}><h1>Lab Test Orders</h1><p>Lab test orders interface coming soon...</p></div></MainLayout>} />
      <Route path="/laboratory-diagnostics/imaging-requests" element={<MainLayout><div style={{padding: '2rem'}}><h1>Imaging Requests</h1><p>Imaging requests interface coming soon...</p></div></MainLayout>} />
      <Route path="/laboratory-diagnostics/pathology-reports" element={<MainLayout><div style={{padding: '2rem'}}><h1>Pathology Reports</h1><p>Pathology reports interface coming soon...</p></div></MainLayout>} />
      <Route path="/laboratory-diagnostics/blood-bank" element={<MainLayout><div style={{padding: '2rem'}}><h1>Blood Bank</h1><p>Blood bank interface coming soon...</p></div></MainLayout>} />
      <Route path="/laboratory-diagnostics/radiology-results" element={<MainLayout><div style={{padding: '2rem'}}><h1>Radiology Results</h1><p>Radiology results interface coming soon...</p></div></MainLayout>} /> */}
      
      {/* Full-screen 404 error page - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const PrivateRoutes = () => {
  return (
    <SidePanelProvider>
      <PrivateRoutesContent />
    </SidePanelProvider>
  );
};

export default PrivateRoutes;
