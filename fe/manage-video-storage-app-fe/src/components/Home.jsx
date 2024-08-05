import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style/Home.css'

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        navigate('/login'); // Redirect to login page if fetching profile fails
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    toast.success('Logout successful');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        {user && (
          <>
            <div className="user-info">
              <img src="/path/to/avatar.jpg" alt="Avatar" className="avatar" />
              <span>{user.fullName || user.username}</span>
            </div>
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
              <button onClick={() => navigate('/profile')}>View Profile</button>
            </div>
          </>
        )}
      </div>
      <div className="content">
        <h1>Welcome to the Home Page</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default Home;
