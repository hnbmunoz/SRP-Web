import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import SidePanel from '../components/custom-component/SidePanel/SidePanel';

const PrivateRoutes = () => {
  const [isOpen, setIsOpen] = useState(true);
 
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <SidePanel isOpen={isOpen} setIsOpen={setIsOpen} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<h1>Dashboard</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default PrivateRoutes;