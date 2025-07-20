import React from 'react';
import styles from './SidePanelToggleButton.module.scss';
import { FaArrowLeft } from 'react-icons/fa';

interface SidePanelToggleButtonProps {
  isOpen: boolean;
  toggleSidePanel: () => void;
}

const SidePanelToggleButton: React.FC<SidePanelToggleButtonProps> = ({ isOpen, toggleSidePanel }) => {
  return (
    <button className={`${styles['toggle-button']} ${isOpen ? '' : styles['collapsed']}`} onClick={toggleSidePanel} >
      <FaArrowLeft />
    </button>
  );
};

export default SidePanelToggleButton;