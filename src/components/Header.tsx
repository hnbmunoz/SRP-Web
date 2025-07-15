import React from 'react';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const navigate = useNavigate();
  const { clearToken } = useAuthStore();

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div>My App</div>
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