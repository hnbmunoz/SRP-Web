import React, { useState, useRef } from 'react';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FaBars, FaUser, FaCog, FaSignOutAlt, FaStethoscope } from 'react-icons/fa';
import { useSidePanelContext } from '../contexts/SidePanelContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { clearToken } = useAuthStore();
  const { toggleSidePanel } = useSidePanelContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button
          className={styles.burgerButton}
          onClick={toggleSidePanel}
          aria-label="Toggle navigation menu"
        >
          <FaBars />
        </button>
        <div className={styles.branding}>
          <div className={styles.logo}>
            <FaStethoscope className={styles.logoIcon} />
          </div>
          <div className={styles.brandText}>
            <h1 className={styles.brandTitle}>MedPortal</h1>
            <span className={styles.brandSubtitle}>Healthcare Management</span>
          </div>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.userInfo}>
          <span className={styles.welcomeText}>Welcome, Dr. Smith</span>
          <div className={styles.userAvatar}>
            <FaUser />
          </div>
        </div>
        
        <div
          className={styles.dropdown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className={styles.dropdownButton} aria-label="User menu">
            <FaCog className={styles.settingsIcon} />
          </button>
          <div className={`${styles.dropdownContent} ${isDropdownOpen ? styles.dropdownOpen : ''}`}>
            <button
              onClick={() => navigate('/profile')}
              className={styles.dropdownItem}
            >
              <FaUser className={styles.dropdownIcon} />
              Profile Settings
            </button>
            <button
              onClick={() => navigate('/landing-page')}
              className={styles.dropdownItem}
            >
              <FaCog className={styles.dropdownIcon} />
              Access Landing
            </button>
            <a href="#" className={styles.dropdownItem}>
              <FaCog className={styles.dropdownIcon} />
              System Settings
            </a>
            <div className={styles.dropdownDivider}></div>
            <button onClick={handleLogout} className={styles.dropdownItem}>
              <FaSignOutAlt className={styles.dropdownIcon} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;