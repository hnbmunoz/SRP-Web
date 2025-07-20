import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import Loading from './custom-component/Loading';

interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setToken('temporary_token');
      navigate('/');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      {isLoading && <Loading />}
      
        <h1>Login</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e0f2f7', padding: '20px', borderRadius: '5px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#37474f' }}>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '200px', padding: '5px', borderRadius: '3px', border: '1px solid #a5d6a7' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#37474f' }}>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '200px', padding: '5px', borderRadius: '3px', border: '1px solid #a5d6a7' }}
              />
            </label>
          </div>
          <button type="submit" style={{ backgroundColor: '#a5d6a7', color: '#37474f', padding: '10px 20px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login</button>
        </form>
      
    </>
  );
};

export default Login;