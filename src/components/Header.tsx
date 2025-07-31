import React from 'react';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FaBars, FaUser, FaCog, FaSignOutAlt, FaStethoscope } from 'react-icons/fa';
import type { Dispatch, SetStateAction } from 'react';
 
interface HeaderProps {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { clearToken } = useAuthStore();

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  const toggleSidePanel = () => {
    if (setIsOpen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {setIsOpen && (
          <button
            className={styles.burgerButton}
            onClick={toggleSidePanel}
            aria-label="Toggle navigation menu"
          >
            <FaBars />
          </button>
        )}
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
        
        <div className={styles.dropdown}>
          <button className={styles.dropdownButton} aria-label="User menu">
            <FaCog className={styles.settingsIcon} />
          </button>
          <div className={styles.dropdownContent}>
            <a href="#" className={styles.dropdownItem}>
              <FaUser className={styles.dropdownIcon} />
              Profile Settings
            </a>
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