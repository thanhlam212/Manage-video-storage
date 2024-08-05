import React, { useState } from 'react';
import './style/AuthForm.css';
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
      toast.success('Register success!');
    } catch (error) {
      console.error('Register failed:', error);
      toast.error('Register failed!');
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
            placeholder='Username'
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder='Full Name'
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder='Phone Number'
          />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      <p className="toggle-message">Already have an account? <span onClick={toggleForm}>Login</span></p>
    </div>
  );
};

export default Register;
