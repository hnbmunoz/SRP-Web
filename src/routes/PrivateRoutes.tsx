import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import SidePanel from '../components/custom-component/SidePanel/SidePanel';
import NotFound from '../components/NotFound';
import Profile from '../components/Profile';
import Dashboard from '../components/Dashboard';
import { SidePanelProvider, useSidePanelContext } from '../contexts/SidePanelContext';
import Forbidden from '../components/Forbidden';

const PrivateRoutesContent = () => {
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
        <div style={{ flex: 1, padding: '1.25rem', overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Patient Management Routes */}
            <Route path="/patient-management" element={<div style={{padding: '2rem'}}><h1>Patient Management</h1><p>Patient management module coming soon...</p></div>} />
            <Route path="/patient-management/patient-records" element={<div style={{padding: '2rem'}}><h1>Patient Records</h1><p>Patient records interface coming soon...</p></div>} />
            <Route path="/patient-management/admission-forms" element={<div style={{padding: '2rem'}}><h1>Admission Forms</h1><p>Admission forms interface coming soon...</p></div>} />
            <Route path="/patient-management/discharge-summary" element={<div style={{padding: '2rem'}}><h1>Discharge Summary</h1><p>Discharge summary interface coming soon...</p></div>} />
            <Route path="/patient-management/medical-history" element={<div style={{padding: '2rem'}}><h1>Medical History</h1><p>Medical history interface coming soon...</p></div>} />
            <Route path="/patient-management/insurance-details" element={<div style={{padding: '2rem'}}><h1>Insurance Details</h1><p>Insurance details interface coming soon...</p></div>} />
            
            {/* Clinical Operations Routes */}
            <Route path="/clinical-operations" element={<div style={{padding: '2rem'}}><h1>Clinical Operations</h1><p>Clinical operations module coming soon...</p></div>} />
            <Route path="/clinical-operations/appointment-scheduling" element={<div style={{padding: '2rem'}}><h1>Appointment Scheduling</h1><p>Appointment scheduling interface coming soon...</p></div>} />
            <Route path="/clinical-operations/treatment-plans" element={<div style={{padding: '2rem'}}><h1>Treatment Plans</h1><p>Treatment plans interface coming soon...</p></div>} />
            <Route path="/clinical-operations/prescription-management" element={<div style={{padding: '2rem'}}><h1>Prescription Management</h1><p>Prescription management interface coming soon...</p></div>} />
            <Route path="/clinical-operations/lab-results" element={<div style={{padding: '2rem'}}><h1>Lab Results</h1><p>Lab results interface coming soon...</p></div>} />
            <Route path="/clinical-operations/vital-signs-monitor" element={<div style={{padding: '2rem'}}><h1>Vital Signs Monitor</h1><p>Vital signs monitor interface coming soon...</p></div>} />
            
            {/* Emergency Services Routes */}
            <Route path="/emergency-services" element={<div style={{padding: '2rem'}}><h1>Emergency Services</h1><p>Emergency services module coming soon...</p></div>} />
            <Route path="/emergency-services/emergency-admissions" element={<div style={{padding: '2rem'}}><h1>Emergency Admissions</h1><p>Emergency admissions interface coming soon...</p></div>} />
            <Route path="/emergency-services/trauma-cases" element={<div style={{padding: '2rem'}}><h1>Trauma Cases</h1><p>Trauma cases interface coming soon...</p></div>} />
            <Route path="/emergency-services/icu-management" element={<div style={{padding: '2rem'}}><h1>ICU Management</h1><p>ICU management interface coming soon...</p></div>} />
            <Route path="/emergency-services/ambulance-dispatch" element={<div style={{padding: '2rem'}}><h1>Ambulance Dispatch</h1><p>Ambulance dispatch interface coming soon...</p></div>} />
            <Route path="/emergency-services/critical-care" element={<div style={{padding: '2rem'}}><h1>Critical Care</h1><p>Critical care interface coming soon...</p></div>} />
            
            {/* Laboratory & Diagnostics Routes */}
            <Route path="/laboratory-diagnostics" element={<div style={{padding: '2rem'}}><h1>Laboratory & Diagnostics</h1><p>Laboratory & diagnostics module coming soon...</p></div>} />
            <Route path="/laboratory-diagnostics/lab-test-orders" element={<div style={{padding: '2rem'}}><h1>Lab Test Orders</h1><p>Lab test orders interface coming soon...</p></div>} />
            <Route path="/laboratory-diagnostics/imaging-requests" element={<div style={{padding: '2rem'}}><h1>Imaging Requests</h1><p>Imaging requests interface coming soon...</p></div>} />
            <Route path="/laboratory-diagnostics/pathology-reports" element={<div style={{padding: '2rem'}}><h1>Pathology Reports</h1><p>Pathology reports interface coming soon...</p></div>} />
            <Route path="/laboratory-diagnostics/blood-bank" element={<div style={{padding: '2rem'}}><h1>Blood Bank</h1><p>Blood bank interface coming soon...</p></div>} />
            <Route path="/laboratory-diagnostics/radiology-results" element={<div style={{padding: '2rem'}}><h1>Radiology Results</h1><p>Radiology results interface coming soon...</p></div>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      {/* Side panel overlay for mobile */}
      {isMobile && <SidePanel />}
    </div>
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
