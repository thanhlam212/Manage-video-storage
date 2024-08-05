import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getProfile } from '../services/AuthService';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home">
      {user && <Sidebar user={user} />}
      <main className="main-content">
        {/* Add your main content here */}
        <h1>Welcome to the Home Page!</h1>
      </main>
    </div>
  );
};

export default Home;
