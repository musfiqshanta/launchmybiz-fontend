import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
}

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Home', url: '/' },

    { label: 'Admin Login', url: '/admin-login' },
    { label: 'Contact Us', url: '/contact' }
  ];
  const companyInfo = {
    email: 'customercare@launchmybiz.net',
    phone: '+1 (530) 625-8265',
    };

  const handleMenuItemClick = (url) => {
    if (url === '/contact') {
      // If already on homepage, scroll to footer
    
        const footer = document.getElementById('footer-contact');
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth' });
        }
      
      handleMenuClose();
      return;
    }
    window.location.href = url;
    handleMenuClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center" gap={1}>
        <img onClick={()=>window.location.href='/'} src="/mainlogo-3-2.png" alt="Company Logo" style={{ height: 48, width: 'auto', cursor: 'pointer' }} />
      </Box>

      <IconButton onClick={handleMenuClick}>
        <FiMenu size={24} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
      {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(item.url)}
          >
            {item.label}
          </MenuItem>
        ))}
        {/* <Box sx={{ p: 2, borderTop: '1px solid #eee', mt: 1 }}>
          <div style={{ fontSize: 13, color: '#888' }}>
            <div><strong>Email:</strong> {companyInfo.email}</div>
            <div><strong>Phone:</strong> {companyInfo.phone}</div>
            <div><strong>Address:</strong> {companyInfo.address}</div>
          </div>
        </Box> */}
      </Menu>
    </Box>
  );
};

export default Navbar; 