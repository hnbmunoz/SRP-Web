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
    <div className={styles['navigation-accordion']}>
      <div
        className={styles['navigation-accordion-header']}
        onClick={toggleAccordion}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion();
          }
        }}
        aria-expanded={isAccordionOpen}
        aria-controls={`accordion-content-${data.title}`}
      >
        <FaHome />
        {isOpen && <span className={styles['accordion-title']}>{data.title}</span>}
        <span className={`${styles.arrow} ${isAccordionOpen ? styles.open : ''}`}>
          &#9660;
        </span>
      </div>
      <div
        id={`accordion-content-${data.title}`}
        className={`${styles['navigation-accordion-content']} ${isAccordionOpen ? styles.open : ''}`}
        role="region"
        aria-labelledby={`accordion-header-${data.title}`}
      >
        <ul>
          {data.items.map((item, index) => (
            <li key={index}>
              <button className={styles['nav-item']} type="button">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationAccordion;