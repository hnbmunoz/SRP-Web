import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav style={{ backgroundColor: '#e0f2f7', padding: '0.625rem' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'space-around' }}>
        <li><a href="#" style={{ color: '#37474f', textDecoration: 'none' }}>Home</a></li>
        <li><a href="#" style={{ color: '#37474f', textDecoration: 'none' }}>About</a></li>
        <li><a href="#" style={{ color: '#37474f', textDecoration: 'none' }}>Services</a></li>
        <li><a href="#" style={{ color: '#37474f', textDecoration: 'none' }}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;