import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  handleSubmit: () => void;
}

const Login: React.FC<LoginProps> = ({ handleSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setToken('temporary_token');
    navigate('/');
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;