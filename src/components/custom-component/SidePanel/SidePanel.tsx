import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageStore } from '../../../store/pageStore';
import NavigationAccordion from '../NavigationAccordion/NavigationAccordion';
import styles from './SidePanel.module.scss';
import { FaTimes, FaStethoscope, FaHome } from 'react-icons/fa';
import SidePanelToggleButton from './SidePanelToggleButton';
import { useSidePanelContext } from '../../../contexts/SidePanelContext';

const SidePanel: React.FC = () => {
  const { isOpen, setIsOpen, toggleSidePanel } = useSidePanelContext();
  const {  } = usePageStore();
  
  // State for managing individual accordion open/close states
  const [accordionStates, setAccordionStates] = React.useState<Record<string, boolean>>({
    'Patient Management': false,
    'Clinical Operations': false,
    'Emergency Services': false,
    'Laboratory & Diagnostics': false,
  });

  // Function to toggle individual accordion states - only one can be open at a time
  const toggleAccordion = (title: string) => {
    setAccordionStates(prev => {
      const isCurrentlyOpen = prev[title];
      
      // If clicking on an already open accordion, close it
      if (isCurrentlyOpen) {
        return {
          ...prev,
          [title]: false
        };
      }
      
      // Otherwise, close all accordions and open the clicked one
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newState[key] = key === title;
      });
      
      return newState;
    });
  };

  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (item: string, module: string) => {
    // Create a URL-friendly path
    const modulePath = module.toLowerCase().replace(/\s+/g, '-');
    const itemPath = item.toLowerCase().replace(/\s+/g, '-');
    const fullPath = `/${modulePath}/${itemPath}`;
    
    console.log(`Navigating to: ${fullPath}`);
    navigate(fullPath);
    
    // Close side panel on mobile after navigation
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const closeSidePanel = () => {
    setIsOpen(false);
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

  // Medical navigation data
  const medicalModules = [
    {
      title: 'Patient Management',
      items: [
        'Patient Records',
        'Admission Forms',
        'Discharge Summary',
        'Medical History',
        'Insurance Details'
      ]
    },
    {
      title: 'Clinical Operations',
      items: [
        'Appointment Scheduling',
        'Treatment Plans',
        'Prescription Management',
        'Lab Results',
        'Vital Signs Monitor'
      ]
    },
    {
      title: 'Emergency Services',
      items: [
        'Emergency Admissions',
        'Trauma Cases',
        'ICU Management',
        'Ambulance Dispatch',
        'Critical Care'
      ]
    },
    {
      title: 'Laboratory & Diagnostics',
      items: [
        'Lab Test Orders',
        'Imaging Requests',
        'Pathology Reports',
        'Blood Bank',
        'Radiology Results'
      ]
    }
  ];

  // Handle dashboard navigation
  const handleDashboardNavigation = () => {
    navigate('/');
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

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
        aria-label="Medical navigation menu"
      >
        {/* Toggle Button - Always visible on tablet/desktop */}
        <div className={styles.Header}>
          <SidePanelToggleButton isOpen={isOpen} toggleSidePanel={toggleSidePanel} />
        </div>

        
        <div className={styles.content}>
          {/* Dashboard Link */}
          <div className={styles.navigationSection}>
            <button
              className={styles.dashboardButton}
              onClick={handleDashboardNavigation}
              aria-label="Go to Dashboard"
            >
              <FaHome className={`${styles.dashboardIcon} icon-hover`} />
              {isOpen && <span className={styles.dashboardText}>Dashboard</span>}
            </button>
          </div>

          <div className={styles.navigationSection}>
            <h3 className={styles.sectionTitle}>Core Modules</h3>
            <NavigationAccordion
              title={medicalModules[0].title}
              items={medicalModules[0].items}
              isOpen={accordionStates[medicalModules[0].title]}
              onToggle={toggleAccordion}
              onNavigate={handleNavigation}
            />
            <NavigationAccordion
              title={medicalModules[1].title}
              items={medicalModules[1].items}
              isOpen={accordionStates[medicalModules[1].title]}
              onToggle={toggleAccordion}
              onNavigate={handleNavigation}
            />
          </div>

          <div className={styles.navigationSection}>
            <h3 className={styles.sectionTitle}>Specialized Care</h3>
            <NavigationAccordion
              title={medicalModules[2].title}
              items={medicalModules[2].items}
              isOpen={accordionStates[medicalModules[2].title]}
              onToggle={toggleAccordion}
              onNavigate={handleNavigation}
            />
            <NavigationAccordion
              title={medicalModules[3].title}
              items={medicalModules[3].items}
              isOpen={accordionStates[medicalModules[3].title]}
              onToggle={toggleAccordion}
              onNavigate={handleNavigation}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;