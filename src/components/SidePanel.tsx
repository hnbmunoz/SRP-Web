import React from 'react';
import { usePageStore } from '../store/pageStore';

interface SidePanelProps {
  isOpen: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen }) => {
  const { setCurrentPage } = usePageStore();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div
      style={{
        width: isOpen ? '200px' : '0',
        backgroundColor: '#f0f0f0',
        height: '100vh',
        overflowX: 'hidden',
        transition: '0.3s',
        paddingTop: '60px',
      }}
    >
      <h2>Navigation</h2>
      <ul>
        <li>
          <button onClick={() => handleNavigation('dashboard')}>Dashboard</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('profile')}>Profile</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('settings')}>Settings</button>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;