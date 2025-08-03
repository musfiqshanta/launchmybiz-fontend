 import React from 'react';
// import {
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   useMediaQuery
// } from '@mui/material';
import { Box, Button, IconButton, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
   const isMobile = useMediaQuery('(max-width:900px)');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
}

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

   const menuItems = [
    { label: "Services", url: "/#services" },
    { label: "Pricing", url: "/#pricing" },
    { label: "FAQ’s", url: "/#faqs" },
    
  ];

  // const menuItems = [
  //   { label: 'Home', url: '/' },

  //   { label: 'Admin Login', url: '/admin-login' },
  //   { label: 'Contact Us', url: '/contact' }
  // ];
  // const companyInfo = {
  //   email: 'customercare@launchmybiz.net',
  //   phone: '+1 (530) 625-8265',
  //   };

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
        {/* <Typography variant="h6" fontWeight="bold" letterSpacing={2}>
          LAUNCH
        </Typography> */}
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
            <MenuItem onClick={() => handleMenuItemClick("/#contact")}>
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
                Contact us
              </Button>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box display="flex" alignItems="center" gap={4}>
          {menuItems.map((item, index) => (
            <Typography
              key={index}
              onClick={() => handleMenuItemClick(item.url)}
              sx={{ cursor: 'pointer', fontWeight: 500 }}
            >
              {item.label}
            </Typography>
          ))}
          <Button
            variant="contained"
            onClick={() => handleMenuItemClick("/#contact")}
            sx={{
              bgcolor: '#e70000',
              borderRadius: '25px',
              textTransform: 'none',
              color: '#fff',
              px: 3,
              py: 1,
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#c80000' }
            }}
          >
            Contact us
          </Button>
        </Box>
      )}
    </Box>


    // <Box display="flex" justifyContent="space-between" alignItems="center">
    //   <Box display="flex" alignItems="center" gap={1}>
    //     <img onClick={()=>window.location.href='/'} src="/mainlogo-3-2.png" alt="Company Logo" style={{ height: 48, width: 'auto', cursor: 'pointer' }} />
    //   </Box>

    //   <IconButton onClick={handleMenuClick}>
    //     <FiMenu size={24} />
    //   </IconButton>

    //   <Menu
    //     anchorEl={anchorEl}
    //     open={Boolean(anchorEl)}
    //     onClose={handleMenuClose}
    //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //   >
    //   {menuItems.map((item, index) => (
    //       <MenuItem
    //         key={index}
    //         onClick={() => handleMenuItemClick(item.url)}
    //       >
    //         {item.label}
    //       </MenuItem>
    //     ))}
    //     {/* <Box sx={{ p: 2, borderTop: '1px solid #eee', mt: 1 }}>
    //       <div style={{ fontSize: 13, color: '#888' }}>
    //         <div><strong>Email:</strong> {companyInfo.email}</div>
    //         <div><strong>Phone:</strong> {companyInfo.phone}</div>
    //         <div><strong>Address:</strong> {companyInfo.address}</div>
    //       </div>
    //     </Box> */}
    //   </Menu>
    // </Box>
  );
};

export default Navbar; 