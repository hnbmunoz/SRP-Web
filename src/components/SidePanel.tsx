import React from 'react';
import { usePageStore } from '../store/pageStore';
import Module1Navigation from './custom-component/Module1Navigation';
import Module2Navigation from './custom-component/Module2Navigation';

interface SidePanelProps {
  isOpen: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen }) => {
  const { setCurrentPage } = usePageStore();

  return (
    <div
      style={{
        width: isOpen ? '200px' : '10px',
        backgroundColor: '#f0f0f0',
        height: '100vh',
        overflowX: 'hidden',
        transition: '0.3s',
        paddingTop: '60px',
      }}
    >
      <Module1Navigation />
      <Module2Navigation />
    </div>
  );
};

export default SidePanel;