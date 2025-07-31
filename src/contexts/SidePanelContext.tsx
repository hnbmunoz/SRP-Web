import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface SidePanelContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidePanel: () => void;
  isMobile: boolean;
}

const SidePanelContext = createContext<SidePanelContextType | undefined>(undefined);

interface SidePanelProviderProps {
  children: ReactNode;
}

export const SidePanelProvider: React.FC<SidePanelProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile and set initial state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // On tablet/desktop, start with panel open
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  const value: SidePanelContextType = {
    isOpen,
    setIsOpen,
    toggleSidePanel,
    isMobile,
  };

  return (
    <SidePanelContext.Provider value={value}>
      {children}
    </SidePanelContext.Provider>
  );
};

export const useSidePanelContext = (): SidePanelContextType => {
  const context = useContext(SidePanelContext);
  if (context === undefined) {
    throw new Error('useSidePanelContext must be used within a SidePanelProvider');
  }
  return context;
};