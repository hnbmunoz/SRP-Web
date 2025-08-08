import React, { useState } from 'react';
import { useAuth, useRole, type LoginCredentials, type RegisterCredentials } from '../store/authStore';
import styles from './AuthDemo.module.scss';

const AuthDemo: React.FC = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    register, 
    logout, 
    clearError,
    updateUser,
    refreshToken 
  } = useAuth();
  
  const { isAdmin, isModerator, isUser, hasRole } = useRole();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState<RegisterCredentials>({
    email: '',
    password: '',
    name: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm);
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(registerForm);
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleUpdateProfile = () => {
    if (user) {
      updateUser({
        name: `${user.name} (Updated)`,
        lastLogin: new Date().toISOString()
      });
    }
  };

  const demoCredentials = [
    { email: 'admin@example.com', password: 'password123', role: 'Admin' },
    { email: 'user@example.com', password: 'password123', role: 'User' },
    { email: 'moderator@example.com', password: 'password123', role: 'Moderator' }
  ];

  const fillDemoCredentials = (email: string) => {
    setLoginForm({ email, password: 'password123' });
  };

  if (isAuthenticated && user) {
    return (
      <div className={styles['auth-demo']}>
        <div className={styles['auth-demo__container']}>
          <div className={styles['auth-demo__header']}>
            <h2>Welcome, {user.name}!</h2>
            <div className={styles['auth-demo__user-info']}>
              <div className={styles['auth-demo__avatar']}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className={styles['auth-demo__avatar-placeholder']}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className={styles['auth-demo__details']}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                {user.lastLogin && (
                  <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
                )}
              </div>
            </div>
          </div>

          <div className={styles['auth-demo__role-info']}>
            <h3>Role-Based Access Control</h3>
            <div className={styles['auth-demo__permissions']}>
              <div className={`${styles['auth-demo__permission']} ${isAdmin ? styles.active : ''}`}>
                Admin Access: {isAdmin ? '✅' : '❌'}
              </div>
              <div className={`${styles['auth-demo__permission']} ${isModerator ? styles.active : ''}`}>
                Moderator Access: {isModerator ? '✅' : '❌'}
              </div>
              <div className={`${styles['auth-demo__permission']} ${isUser ? styles.active : ''}`}>
                User Access: {isUser ? '✅' : '❌'}
              </div>
            </div>
          </div>

          <div className={styles['auth-demo__actions']}>
            <button
              onClick={handleUpdateProfile}
              className={`${styles['auth-demo__button']} ${styles['auth-demo__button--secondary']}`}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
            <button
              onClick={refreshToken}
              className={`${styles['auth-demo__button']} ${styles['auth-demo__button--secondary']}`}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Token'}
            </button>
            <button
              onClick={logout}
              className={`${styles['auth-demo__button']} ${styles['auth-demo__button--danger']}`}
            >
              Logout
            </button>
          </div>

          {error && (
            <div className={styles['auth-demo__error']}>
              <p>{error}</p>
              <button onClick={clearError} className={styles['auth-demo__error-close']}>×</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles['auth-demo']}>
      <div className={styles['auth-demo__container']}>
        <div className={styles['auth-demo__header']}>
          <h2>Authentication Demo</h2>
          <p>Test the Zustand authentication store with simulated login/register</p>
        </div>

        <div className={styles['auth-demo__demo-credentials']}>
          <h3>Demo Credentials</h3>
          <div className={styles['auth-demo__credentials-list']}>
            {demoCredentials.map((cred, index) => (
              <div key={index} className={styles['auth-demo__credential-item']}>
                <div className={styles['auth-demo__credential-info']}>
                  <strong>{cred.role}:</strong> {cred.email}
                </div>
                <button
                  onClick={() => fillDemoCredentials(cred.email)}
                  className={`${styles['auth-demo__button']} ${styles['auth-demo__button--small']}`}
                >
                  Use
                </button>
              </div>
            ))}
          </div>
          <p className={styles['auth-demo__password-hint']}>Password for all accounts: <code>password123</code></p>
        </div>

        <div className={styles['auth-demo__tabs']}>
          <button
            className={`${styles['auth-demo__tab']} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`${styles['auth-demo__tab']} ${activeTab === 'register' ? styles.active : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className={styles['auth-demo__form']}>
            <div className={styles['auth-demo__field']}>
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className={styles['auth-demo__field']}>
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className={`${styles['auth-demo__button']} ${styles['auth-demo__button--primary']}`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className={styles['auth-demo__form']}>
            <div className={styles['auth-demo__field']}>
              <label htmlFor="register-name">Name</label>
              <input
                id="register-name"
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className={styles['auth-demo__field']}>
              <label htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className={styles['auth-demo__field']}>
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className={`${styles['auth-demo__button']} ${styles['auth-demo__button--primary']}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}

        {error && (
          <div className={styles['auth-demo__error']}>
            <p>{error}</p>
            <button onClick={clearError} className={styles['auth-demo__error-close']}>×</button>
          </div>
        )}

        <div className={styles['auth-demo__loading-overlay']} style={{ display: isLoading ? 'flex' : 'none' }}>
          <div className={styles['auth-demo__spinner']}></div>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;