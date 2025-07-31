import React, { useState } from 'react';
import styles from './NavigationAccordion.module.scss';
import {
  FaChevronDown,
  FaUserMd,
  FaCalendarAlt,
  FaClipboardList,
  FaPrescriptionBottleAlt,
  FaHeartbeat,
  FaStethoscope,
  FaHospital,
  FaAmbulance,
  FaUserInjured,
  FaFileMedical,
  FaVials,
  FaSyringe,
  FaXRay,
  FaPills
} from 'react-icons/fa';
import { useSidePanelContext } from '../../../contexts/SidePanelContext';

interface NavigationAccordionProps {
  title: string;
  items?: string[];
  icon?: string;
  isOpen?: boolean;
  onToggle?: (title: string) => void;
  onNavigate?: (item: string, module: string) => void;
}

// Medical icon mapping
const getMedicalIcon = (title: string, itemName?: string) => {
  const titleLower = title.toLowerCase();
  const itemLower = itemName?.toLowerCase() || '';

  // Main module icons
  if (titleLower.includes('patient') || titleLower.includes('module 1')) {
    return <FaUserInjured className={styles.medicalIcon} />;
  }
  if (titleLower.includes('appointment') || titleLower.includes('module 2')) {
    return <FaCalendarAlt className={styles.medicalIcon} />;
  }
  if (titleLower.includes('doctor') || titleLower.includes('physician')) {
    return <FaUserMd className={styles.medicalIcon} />;
  }
  if (titleLower.includes('prescription') || titleLower.includes('medication')) {
    return <FaPrescriptionBottleAlt className={styles.medicalIcon} />;
  }
  if (titleLower.includes('emergency') || titleLower.includes('urgent')) {
    return <FaAmbulance className={styles.medicalIcon} />;
  }
  if (titleLower.includes('lab') || titleLower.includes('test')) {
    return <FaVials className={styles.medicalIcon} />;
  }

  // Sub-item icons
  if (itemLower.includes('record') || itemLower.includes('file')) {
    return <FaFileMedical className={styles.medicalIcon} />;
  }
  if (itemLower.includes('vital') || itemLower.includes('monitor')) {
    return <FaHeartbeat className={styles.medicalIcon} />;
  }
  if (itemLower.includes('exam') || itemLower.includes('checkup')) {
    return <FaStethoscope className={styles.medicalIcon} />;
  }
  if (itemLower.includes('ward') || itemLower.includes('room')) {
    return <FaHospital className={styles.medicalIcon} />;
  }
  if (itemLower.includes('injection') || itemLower.includes('vaccine')) {
    return <FaSyringe className={styles.medicalIcon} />;
  }
  if (itemLower.includes('scan') || itemLower.includes('imaging')) {
    return <FaXRay className={styles.medicalIcon} />;
  }
  if (itemLower.includes('medicine') || itemLower.includes('drug')) {
    return <FaPills className={styles.medicalIcon} />;
  }

  // Default icons
  return <FaClipboardList className={styles.medicalIcon} />;
};

const NavigationAccordion: React.FC<NavigationAccordionProps> = ({
  title,
  items = [],
  isOpen: controlledIsOpen,
  onToggle,
  onNavigate
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const { isOpen: sidePanelIsOpen } = useSidePanelContext();

  const toggleAccordion = () => {
    if (onToggle) {
      // If onToggle is provided, use it (controlled mode)
      onToggle(title);
    } else if (controlledIsOpen === undefined) {
      // If no onToggle and not controlled, use internal state
      setInternalIsOpen(!internalIsOpen);
    }
  };

  // Generate medical sub-items if none provided
  const medicalItems = items.length > 0 ? items : [
    'Patient Records',
    'Vital Signs Monitor',
    'Medical History',
    'Treatment Plans',
    'Lab Results'
  ];

  return (
    <div className={styles.navigationAccordion}>
      <button
        className={styles.navigationAccordionHeader}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {getMedicalIcon(title)}
        {sidePanelIsOpen && <span className={styles.accordionTitle}>{title}</span>}
        <FaChevronDown
          className={`${styles.arrow} ${isOpen ? styles.open : ''}`}
          aria-hidden="true"
        />
      </button>
      
      <div 
        id={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`${styles.navigationAccordionContent} ${isOpen ? styles.open : ''}`}
        role="region"
        aria-labelledby={`accordion-header-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <ul role="list">
          {medicalItems.map((item, index) => (
            <li key={index} role="listitem">
              <button
                className={styles.navItem}
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(item, title);
                  } else {
                    console.log(`Navigate to: ${item} in ${title}`);
                  }
                }}
                aria-label={`Navigate to ${item} in ${title}`}
              >
                {getMedicalIcon(title, item)}
                {sidePanelIsOpen &&  <span className={styles.itemText}>{item}</span> }
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationAccordion;