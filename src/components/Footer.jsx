import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import {
  LinkedIn,
  Facebook,
  Instagram,
  Close,
  YouTube,
  Phone,
  Mail,
  LocationOn,
  
} from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
import footerImage from "../assets/Group 1000006360 copy 1.png"
import footerImage2 from "../assets/footerlogo.png"

const SquareIcon = ({ href, children, aria }) => (
  <IconButton
    aria-label={aria}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      
      width: {xs: 28, md: 32},
      height: {xs: 28, md: 32},
      p: 0,
      color: '#6E6E6E',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    }}
  >
    {children}
  </IconButton>
);

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    underline="none"
    sx={{
      color: '#FFFFFF',
      display: 'block',
      mb: 1.25,
      fontSize: {xs: '15px', md: '16px'},
      '&:hover': { color: 'common.white' }
    }}
  >
    {children}
  </Link>
);

const ContactRow = ({ IconComp, children, href }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, fontSize: {xs: '14px', md: '16px'} }}>
    <IconComp sx={{ color: 'grey.400', mr: 1.25, fontSize: 20 }} />
    {href ? (
      <Link href={href} underline="hover" sx={{ color: '#FFFFFF', '&:hover': { color: 'common.white' } }}>
        {children}
      </Link>
    ) : (
      <Typography sx={{ color: '#FFFFFF', fontSize: {xs: '14px', md: '16px'} }}>{children}</Typography>
    )}
  </Box>
);   

export default function Footer() {
  return (
    <Box id='footer'  conent="footer" sx={{ bgcolor: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      <Container maxWidth="100%" sx={{ pt: { xs: 5, md: 6 }, position: 'relative', }} >
        <Box display={"flex"} flexDirection={{xs: "column", md: "row"}} px={{xs: 1, md: 10}} mb={{xs: 0, md: 1}} alignItems="flex-start" justifyContent={"center"} sx={{ height: {xs: "auto", md: '42vh'}}}>
          {/* LEFT: logo + socials */}
          <Box sx={{ width: {xs: '100%', md: "50%"}}} >
            <Box>
              <img
                src={footerImage2}
                alt="Launch logo"
                style={{ height: 44, }}
              />
            </Box>

            <Box sx={{ mt: 3, display: 'flex', gap: 2.25, flexWrap: 'wrap' }}>
              <SquareIcon href="https://linkedin.com" aria="linkedin"><LinkedIn  sx={{fontSize: {xs: '30px', md: '36px'}}} /></SquareIcon>
              <SquareIcon href="https://facebook.com" aria="facebook"><Facebook sx={{fontSize: {xs: '30px', md: '36px'}}} /></SquareIcon>
              <SquareIcon href="https://instagram.com" aria="instagram"><Instagram sx={{fontSize: {xs: '30px', md: '36px'}}} /></SquareIcon>
              <SquareIcon href="#" aria="x"><XIcon sx={{fontSize: {xs: '30px', md: '36px'}}} /></SquareIcon>
              <SquareIcon href="https://youtube.com" aria="youtube"><YouTube sx={{fontSize: {xs: '30px', md: '36px'}}} /></SquareIcon>
            </Box>
          </Box>

          <Box display={"flex"} flexDirection={{xs: "column", md: "row"}} gap={{xs: 3, md: 0}} mt={{xs: 5, md: 0}} sx={{ width: {xs: '100%', md: "50%"}}} alignItems="center" justifyContent={"center"}>
          <Box sx={{ width: {xs: '100%', md: "40%"}}}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, color: 'common.white', fontSize: {xs: '20px', md: '20px'} }}>
              Quick Link
            </Typography>

            <Box component="nav" aria-label="footer links" >
              <FooterLink sx={{ mb: 2, fontWeight: 400, color: 'common.white', fontSize: {xs: '16px', md: '20px'} }} href="#">Services</FooterLink>
              <FooterLink sx={{ mb: 2, fontWeight: 400, color: 'common.white', fontSize: {xs: '16px', md: '20px'} }} href="#">About</FooterLink>
              <FooterLink sx={{ mb: 2, fontWeight: 400, color: 'common.white', fontSize: {xs: '16px', md: '20px'} }} href="#">Packages</FooterLink>
              <FooterLink sx={{ mb: 2, fontWeight: 400, color: 'common.white', fontSize: {xs: '16px', md: '20px'} }} href="#">Blogs</FooterLink>
            </Box>
          </Box>

          {/* RIGHT: contact */}
          <Box sx={{ width: {xs: '100%', md: "60%"}}}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, color: 'common.white', fontSize: {xs: '20px', md: '20px'} }}>
              Contact Us
            </Typography>

            <ContactRow sx={{ fontWeight: 400, color: 'common.white', fontSize: {xs: '10px', md: '16px'} }} st IconComp={Phone} href="tel:+15306258265">+1 (530) 625-8265</ContactRow>
            <ContactRow sx={{ fontWeight: 400, color: 'common.white', fontSize: {xs: '10px', md: '16px'} }} IconComp={Mail} href="mailto:support@launchmybiz.net">support@launchmybiz.net</ContactRow>
            <ContactRow sx={{ fontWeight: 400, color: 'common.white', fontSize: {xs: '10px', md: '16px'} }} IconComp={LocationOn}>
              10880 Wilshire Blvd, Suite 101-0048, Los Angeles, CA 90024
            </ContactRow>
          </Box>
           </Box>
        </Box>

        {/* image */}
<Box
  display={{ xs: 'none', md: 'block' }}
  sx={{
    position: 'absolute',
    bottom: 60, // adjust so it sits above the bottom section
    left: 0,
    width: '100%',
    zIndex: 0,
    top: 180,
    pointerEvents: 'none', // so clicks pass through
    overflow: 'hidden'
  }}
>
  <img
    src={footerImage}
    alt="Footer image"
    style={{
       width: '100%',
        objectFit: 'cover',
      objectPosition: 'center bottom' }}
  />
</Box>
        {/* Divider + bottom bar */}
        <Box sx={{ borderTop: '2px solid rgba(255, 255, 255, 0.14)', backgroundColor: '#000',  mt: 4, py: 2, px:{xs: 2, md:10} }} zIndex={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              
              
            }}
          >
            <Typography variant="body2" sx={{ color: 'grey.500', fontSize: {xs: '12px', md: '14px'}, textAlign: {xs: 'center', md: 'left'} }}>
              Copyright © 2004–2025 LaunchmyBiz - All Rights Reserved.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="/privacy-policy" underline="none" sx={{ color: 'grey.400', fontSize: {xs: '10px', md: '14px'}, '&:hover': { color: 'common.white' } }}>
                PRIVACY POLICY
              </Link>
              <Link href="/disclaimer" underline="none" sx={{ color: 'grey.400', fontSize: {xs: '10px', md: '14px'}, '&:hover': { color: 'common.white' } }}>
                DISCLAIMER
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
