import React from 'react';
import { usePageStore } from '../../../store/pageStore';
import NavigationAccordion from '../NavigationAccordion/NavigationAccordion';
import { sampleData } from '../NavigationAccordion/SAMPLE_STATIC/data';
import styles from './SidePanel.module.scss';
import type { Dispatch, SetStateAction } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import SidePanelToggleButton from './SidePanelToggleButton';

interface SidePanelProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, setIsOpen }) => {
  const {  } = usePageStore();

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles['side-panel']} ${isOpen ? styles[''] : styles.collapsed}`}
    >
      <SidePanelToggleButton isOpen={isOpen} toggleSidePanel={toggleSidePanel} />
      <NavigationAccordion data={sampleData[0]} />
      <NavigationAccordion data={sampleData[1]} />
    </div>
  );
};

export default SidePanel;