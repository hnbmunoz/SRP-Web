import React, { useState } from 'react';
import styles from './NavigationAccordion.module.scss';

interface NavigationAccordionProps {
  data: {
    title: string;
    items: string[];
  };
}

const NavigationAccordion: React.FC<NavigationAccordionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles['navigation-accordion']}>
      <div className={styles['navigation-accordion-header']} onClick={toggleAccordion}>
        {data.title}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>&#9660;</span>
      </div>
      <div className={`${styles['navigation-accordion-content']} ${isOpen ? styles.open : ''}`}>
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