import React, { useState } from 'react';
import { Box, Container, Typography, Link, IconButton, Grid, Divider, TextField, Button } from '@mui/material';
// Corrected the icon import from MapPin to LocationOn
import { LocationOn, Phone, Mail, Facebook, Instagram, Star, Send } from '@mui/icons-material';

// Helper component for footer links for cleaner code
const FooterLink = ({ href, children }) => (
  <Link 
    href={href} 
    underline="hover"
    sx={{ 
      color: 'grey.400', 
      transition: 'color 0.3s',
      '&:hover': { color: 'common.white' },
      fontSize: '1rem'
    }}
  >
    {children}
  </Link>
);

// Helper component for contact information items
const ContactInfoItem = ({ icon: Icon, text, href }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
    <Icon sx={{ color: 'error.main', mr: 1.5, fontSize: 22 }} />
    {href ? (
      <Link href={href} underline="hover" sx={{ color: 'grey.300', '&:hover': { color: 'common.white' } }}>
        {text}
      </Link>
    ) : (
      <Typography variant="body1" sx={{ color: 'grey.300' }}>{text}</Typography>
    )}
  </Box>
);

// A more stylized and modern logo component using MUI
const ALaunchLogo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', color: 'error.main' }}>A</Typography>
        <Typography variant="h4" component="span" sx={{ fontWeight: 'semibold', color: 'common.white', letterSpacing: 'wider' }}>LAUNCH</Typography>
    </Box>
);

// Contact form using MUI components
const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, message });
    setStatus('Thank you for your message!');
    setEmail('');
    setMessage('');
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Your Email"
        variant="filled"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        InputLabelProps={{ style: { color: 'grey.400' } }}
        InputProps={{ style: { color: 'white' }, sx: { bgcolor: 'grey.800' } }}
      />
      <TextField
        label="Your Message"
        variant="filled"
        multiline
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        InputLabelProps={{ style: { color: 'grey.400' } }}
        InputProps={{ style: { color: 'white' }, sx: { bgcolor: 'grey.800' } }}
      />
      <Button
        type="submit"
        variant="contained"
        color="error"
        endIcon={<Send />}
        sx={{ fontWeight: 'bold' }}
      >
        Send Message
      </Button>
      {status && <Typography variant="body2" sx={{ color: 'success.light', textAlign: 'center', mt: 1 }}>{status}</Typography>}
    </Box>
  );
};

// The Main Footer Component using MUI
const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'common.white', fontFamily: 'sans-serif' }}>
      <Container maxWidth="xl" sx={{ py: 8, px: 3, mx: 'auto' }}>
        
        <Grid container spacing={5} sx={{ textAlign: { xs: 'left', lg: 'center' } }}>
          
          {/* Column 1: Brand, Address & Social Proof */}
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              onClick={() => window.location.href = '/'}
              src='/mainlogo-3-2.png'
              alt="Company Logo"
              style={{ filter: 'invert(1) brightness(2) grayscale(1)' }}
            />

            </Box>              {/* Using the corrected LocationOn icon */}
              <ContactInfoItem 
                icon={LocationOn}
                text="10880 Wilshire Blvd, Suite 101-0048, Los Angeles, CA 90024"
              />
              <Button
                variant="contained"
                href="https://www.trustpilot.com/review/yourcompany.com"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<Star sx={{ color: '#00b67a' }} />}
                sx={{
                  bgcolor: 'common.white',
                  color: '#00b67a',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: 'grey.200' },
                  alignSelf: 'flex-start'
                }}
              >
                Review us on Trustpilot
              </Button>
            </Box>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: 'error.main' }}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <li><FooterLink href="/">Home</FooterLink></li>
              
              <li><FooterLink href="/business-form">Business</FooterLink></li>
            </Box>
          </Grid>

        
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: 'error.main' }}>
              Contact Us
            </Typography>
            <ContactInfoItem 
              icon={Phone}
              text="+1 (530) 625-8265"
              href="tel:+15306258265"
            />
            <ContactInfoItem 
              icon={Mail}
              text="support@launchmybiz.net"
              href="mailto:customercare@launchmybiz.net"
            />
            <Box sx={{ mt: 3 }}>
              <IconButton href="https://facebook.com" target="_blank" rel="noopener noreferrer" sx={{ color: 'grey.400', '&:hover': { color: 'error.main' } }}>
                <Facebook sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" rel="noopener noreferrer" sx={{ color: 'grey.400', '&:hover': { color: 'error.main' } }}>
                <Instagram sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </Grid>

           
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: 'error.main' }}>
              Quick Contact
            </Typography>
            <ContactForm />
          </Grid>

        </Grid>

        <Divider sx={{ my: 6, borderColor: 'grey.700' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="body2" sx={{ color: 'grey.500', mb: { xs: 2, sm: 0 } }}>
            Copyright © 2004-2025 LaunchmyBiz - All Rights Reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FooterLink href="/privacy-policy">PRIVACY POLICY</FooterLink>
            <FooterLink href="/disclaimer">DISCLAIMER</FooterLink>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer
 
