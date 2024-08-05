import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/AuthService';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logout successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
