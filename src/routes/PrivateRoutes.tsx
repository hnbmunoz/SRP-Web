import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import SidePanel from '../components/SidePanel';

const PrivateRoutes = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Header />
      <SidePanel isOpen={isOpen} />
      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;