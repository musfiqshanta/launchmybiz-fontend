 import React from 'react';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext.jsx';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
   const isMobile = useMediaQuery('(max-width:900px)');
   const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log(user);
  

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
}

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

   const menuItems = [
    { label: "Services", url: "/#services" },
    { label: "Pricing", url: "/#pricing" },
    { label: "About", url: "/#about" },
    { label: "FAQ’s", url: "/#faqs" },
    
  ];


  const handleMenuItemClick = (url) => {
    if (url === '/#services') {
      // If already on homepage, scroll to footer
    
        const services = document.getElementById('services');
        if (services) {
          services.scrollIntoView({ behavior: 'smooth' });
        }
      
      handleMenuClose();
      return;
    } 
    if (url === '/#faqs') {
      // If already on homepage, scroll to footer
    
        const faq = document.getElementById('faq');
        if (faq) {
          faq.scrollIntoView({ behavior: 'smooth' });
        }
      
      handleMenuClose();
      return;
    }
    if (url === '/#pricing') {
      // If already on homepage, scroll to footer
    
        const pricing = document.getElementById('pricing');
        if (pricing) {
          pricing.scrollIntoView({ behavior: 'smooth' });
        }
      
      handleMenuClose();
      return;
    }
    if (url === '/#about') {
      // If already on homepage, scroll to footer
    
        const about = document.getElementById('about');
        if (about) {
          about.scrollIntoView({ behavior: 'smooth' });
        }
      
      handleMenuClose();
      return;
    }
   
    window.location.href = url;
    handleMenuClose();
  };

  return (

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3,
        py: { xs: .8, md: 1.5 },
        borderRadius: '50px',
        backgroundColor: '#fff',
        boxShadow: '0 0 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        maxWidth: "lg",
        
      }}
      mx='auto'
    >
      {/* Left: Logo + LAUNCH */}
      <Box display="flex" alignItems="center" gap={1}>
        <img
          onClick={() => (window.location.href = '/')}
          src="/mainlogo-3-2.png"
          alt="Logo"
          style={{ height: 32, width: 'auto', cursor: 'pointer' }}
        />
        
      </Box>

      {/* Right: Menu Items or Hamburger */}
      {isMobile ? (
        <>
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
              <MenuItem key={index} onClick={() => handleMenuItemClick(item.url)}>
                {item.label}
              </MenuItem>
            ))}
            {!user ? (
              <MenuItem onClick={() => handleMenuItemClick("/signin")}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#e70000',
                    borderRadius: '25px',
                    textTransform: 'none',
                    color: '#fff',
                    px: 3,
                    '&:hover': { bgcolor: '#c80000' }
                  }}
                >
                  Sign in
                </Button>
              </MenuItem>
            ) : (
              <MenuItem onClick={() => { logout(); handleMenuClose(); navigate('/'); }}>
                Logout
              </MenuItem>
            )}
          </Menu>
        </>
      ) : ""}
      
        <Box display={{xs: "none", md: "flex"}} alignItems="center"  gap={4}>
          
          {menuItems.map((item, index) => (
            <Typography
              key={index}
              onClick={() => handleMenuItemClick(item.url)}
              sx={{ cursor: 'pointer', fontWeight: 500 }}
            >
              {item.label}
            </Typography>
          ))} 
           </Box>
          {!user ? (
            <Button
              variant="contained"
              onClick={() => navigate("/signin")}
              sx={{
                bgcolor: '#e70000',
                borderRadius: '25px',
                textTransform: 'none',
                color: '#fff',
                px: 3,
                py: 1,
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#c80000' },
                display: {xs: "none", md: "flex"}
              }}
            >
              Sign in
            </Button>
          ) : (
            <Box display={{ xs: 'none', md: 'flex' }} alignItems="center" gap={2}>
              <Avatar
                src={user?.image || user?.avatarUrl || user?.photoURL || '/image.png'}
                alt={user?.name || user?.email || 'User'}
                sx={{ width: 32, height: 32, cursor: 'pointer' }}
                onClick={() => navigate('/user/dashboard')}
              />
              <Button
                variant="outlined"
                onClick={() => { logout(); navigate('/'); }}
                sx={{
                  bgcolor: '#e70000',
                  borderRadius: '25px',
                  textTransform: 'none',
                  color: '#fff',
                  px: 3,
                  py: 1,
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#c80000' },
                  display: {xs: "none", md: "flex"}
                }}
              >
                Logout
              </Button>
            </Box>
          )}
       
      
    </Box>


    
  );
};

export default Navbar; 