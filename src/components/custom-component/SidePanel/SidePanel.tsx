import React, { useEffect } from 'react';
import { usePageStore } from '../../../store/pageStore';
import NavigationAccordion from '../NavigationAccordion/NavigationAccordion';
import { sampleData } from '../NavigationAccordion/SAMPLE_STATIC/data';
import styles from './SidePanel.module.scss';
import type { Dispatch, SetStateAction } from 'react';
import { FaTimes } from 'react-icons/fa';
import SidePanelToggleButton from './SidePanelToggleButton';

interface SidePanelProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, setIsOpen }) => {
  const {  } = usePageStore();

  const closeSidePanel = () => {
    setIsOpen(false);
  };

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  // Close panel when clicking outside (mobile only)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeSidePanel();
    }
  };

  // Close panel on escape key (mobile only)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && window.innerWidth <= 768) {
        closeSidePanel();
      }
    };

    if (isOpen && window.innerWidth <= 768) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when panel is open on mobile
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay - Mobile only */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      
      {/* Side Panel */}
      <div
        className={`${styles['side-panel']} ${isOpen ? styles.open : styles.closed}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Toggle Button - Always visible on tablet/desktop */}
        <div className={styles.toggleContainer}>
          <SidePanelToggleButton isOpen={isOpen} toggleSidePanel={toggleSidePanel} />
        </div>

        <div className={styles.header}>
          <h2 className={styles.title}>Navigation</h2>
          <button
            className={styles.closeButton}
            onClick={closeSidePanel}
            aria-label="Close navigation menu"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className={styles.content}>
          <NavigationAccordion data={sampleData[0]} isOpen={isOpen} />
          <NavigationAccordion data={sampleData[1]} isOpen={isOpen} />
        </div>
      </div>
    </>
  );
};

export default SidePanel;