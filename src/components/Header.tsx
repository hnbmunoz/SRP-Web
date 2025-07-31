import React from 'react';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FaBars } from 'react-icons/fa';
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
      </div>
      <div className={styles.dropdown}>
        <button className={styles.dropdownButton}>Menu</button>
        <div className={styles.dropdownContent}>
          <a href="#">Profile Settings</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;