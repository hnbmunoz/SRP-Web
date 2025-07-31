import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import SidePanel from '../components/custom-component/SidePanel/SidePanel';

const PrivateRoutes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // On tablet/desktop, start with panel open
      if (window.innerWidth > 768) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
 
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Side panel - always present on tablet/desktop */}
      {!isMobile && <SidePanel isOpen={isOpen} setIsOpen={setIsOpen} />}
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0 // Prevent flex item from overflowing
      }}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div style={{ flex: 1, padding: '1.25rem', overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<h1>Dashboard</h1>} />
          </Routes>
        </div>
      </div>

      {/* Side panel overlay for mobile */}
      {isMobile && <SidePanel isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default PrivateRoutes;