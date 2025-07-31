import React, { useState } from 'react';
import styles from './NavigationAccordion.module.scss';
import { FaChevronDown } from 'react-icons/fa';
import { useSidePanelContext } from '../../../contexts/SidePanelContext';
import { getMedicalIcon } from '../../custom-templates/MedicalIconMapper';

interface NavigationAccordionProps {
  title: string;
  items?: string[];
  icon?: string;
  isOpen?: boolean;
  onToggle?: (title: string) => void;
  onNavigate?: (item: string, module: string) => void;
}


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
        {getMedicalIcon(title, undefined, styles.medicalIcon)}
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
                {getMedicalIcon(title, item, styles.medicalIcon)}
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