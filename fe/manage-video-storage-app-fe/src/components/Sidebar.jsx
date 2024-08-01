import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from 'react';
import { logout } from '../services/AuthService';
import { toast } from 'react-toastify';

const Sidebar = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Đăng xuất thành công!');
      // Redirect to login page after logout
      window.location.href = '/login';
    } catch (error) {
      toast.error('Đăng xuất thất bại!');
    }
  };

  return (
    <div className="sidebar">
      <div className="user-info">
        <IconButton onClick={handleMenuOpen}>
          <Avatar alt={user.name} src={user.avatar} />
        </IconButton>
        <span>{user.name}</span>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/profile">Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
