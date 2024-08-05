import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/AuthForm.css'
import { login } from '../services/AuthService';
import { toast } from 'react-toastify';

const Login = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      toast.success('Login successful');
      navigate('/home'); // Redirect to home page after successful login
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="form-container">
      <img src=".\src\assets\logo.jpg" alt="Logo" className="logo" />
      <h2 className="title">LOGIN</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p className="toggle-message">Don't have an account? <span onClick={toggleForm}>Register</span></p>
    </div>
  );
};

export default Login;
