import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import SidePanel from '../components/custom-component/SidePanel/SidePanel';
import NotFound from '../components/NotFound';
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
            <Route path="/" element={<h1>Dashboard</h1>} />
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