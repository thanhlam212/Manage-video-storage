import React, { useState } from 'react';
import './AuthForm.css';
import { register } from '../services/AuthService';

const Register = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const data = await register({ username, password, email, fullName, phoneNumber });
      console.log('Register success:', data);
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  return (
    <div className="form-container">
      <img src=".\src\assets\logo.jpg" alt="Logo" className="logo" />
      <h2 className="title">REGISTER</h2>
      <form onSubmit={handleRegister}>
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
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <label>Full Name</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label>Phone Number</label>
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      <p className="toggle-message">Already have an account? <span onClick={toggleForm}>Login</span></p>
    </div>
  );
};

export default Register;
