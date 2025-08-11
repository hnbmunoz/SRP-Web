import React, { useState, useRef } from 'react';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { FaBars, FaUser, FaCog, FaSignOutAlt, FaStethoscope, FaMoon, FaSun } from 'react-icons/fa';
import { useSidePanelContext } from '../contexts/SidePanelContext';
import { useTheme } from '../store/themeStore';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toggleSidePanel } = useSidePanelContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleLogout = () => {
    logout();
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
          <span className={styles.welcomeText}>
            Welcome, {user?.name || 'User'}
          </span>
          <div className={styles.userAvatar}>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className={styles.avatarImage}
              />
            ) : (
              <FaUser />
            )}
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
            <button
              onClick={toggleTheme}
              className={styles.dropdownItem}
            >
              {isDarkMode ? (
                <FaSun className={styles.dropdownIcon} />
              ) : (
                <FaMoon className={styles.dropdownIcon} />
              )}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <button
              onClick={() => navigate('/system-settings')}
              className={styles.dropdownItem}
            >
              <FaCog className={styles.dropdownIcon} />
              System Settings
            </button>
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