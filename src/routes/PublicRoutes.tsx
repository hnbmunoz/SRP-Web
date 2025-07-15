import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';

const PublicRoutes = () => {
  const handleSubmit = () => {
    console.log('Login form submitted');
  };

  return (
    <Routes>
      <Route path="/" element={<Login handleSubmit={handleSubmit} />} />
    </Routes>
  );
};

export default PublicRoutes;