import React, { useState } from 'react';
import styles from './NavigationAccordion.module.scss';
import { FaHome } from 'react-icons/fa';

interface NavigationAccordionProps {
  data: {
    title: string;
    items: string[];
  };
  isOpen: boolean;
}

const NavigationAccordion: React.FC<NavigationAccordionProps> = ({ data, isOpen }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className={`${styles['navigation-accordion']} ${!isOpen ? styles.collapsed : ''}`}>
      <div className={styles['navigation-accordion-header']} onClick={toggleAccordion}>
        <FaHome />
        <span className={styles['accordion-title']}>{data.title}</span>
        <span className={`${styles.arrow} ${isAccordionOpen ? styles.open : ''}`}>&#9660;</span>
      </div>
      <div className={`${styles['navigation-accordion-content']} ${isAccordionOpen ? styles.open : ''}`}>
        <ul>
          {data.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationAccordion;