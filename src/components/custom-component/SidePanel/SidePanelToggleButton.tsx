import React from 'react';
import styles from './SidePanelToggleButton.module.scss';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface SidePanelToggleButtonProps {
  isOpen: boolean;
  toggleSidePanel: () => void;
}

const SidePanelToggleButton: React.FC<SidePanelToggleButtonProps> = ({ isOpen, toggleSidePanel }) => {
  return (
    <button
      className={`${styles['toggle-button']} ${isOpen ? styles.open : styles.collapsed}`}
      onClick={toggleSidePanel}
      aria-label={isOpen ? 'Collapse navigation panel' : 'Expand navigation panel'}
      title={isOpen ? 'Collapse navigation panel' : 'Expand navigation panel'}
    >
      
      {isOpen ? <FaArrowLeft color="red"/> : <FaArrowRight color="red" />}
    </button>
  );
};

export default SidePanelToggleButton;