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
  LocationOn
} from '@mui/icons-material';
import footerImage from "../assets/Group 1000006360 copy 1.png"

const SquareIcon = ({ href, children, aria }) => (
  <IconButton
    aria-label={aria}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 1,
      width: 36,
      height: 36,
      p: 0,
      color: 'common.white',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': { backgroundColor: 'rgba(255,255,255,0.04)' }
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
      color: 'grey.400',
      display: 'block',
      mb: 1.25,
      fontSize: '0.98rem',
      '&:hover': { color: 'common.white' }
    }}
  >
    {children}
  </Link>
);

const ContactRow = ({ IconComp, children, href }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
    <IconComp sx={{ color: 'grey.400', mr: 1.25, fontSize: 20 }} />
    {href ? (
      <Link href={href} underline="hover" sx={{ color: 'grey.300', '&:hover': { color: 'common.white' } }}>
        {children}
      </Link>
    ) : (
      <Typography sx={{ color: 'grey.300', fontSize: '0.98rem' }}>{children}</Typography>
    )}
  </Box>
);

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      <Container maxWidth="100%" sx={{ pt: { xs: 5, md: 6 }, position: 'relative', }} >
        <Box display={"flex"} flexDirection={{xs: "column", md: "row"}} px={{xs: 1, md: 10}} mb={{xs: 0, md: 1}} alignItems="flex-start" justifyContent={"center"} sx={{ height: {xs: "auto", md: '42vh'}}}>
          {/* LEFT: logo + socials */}
          <Box sx={{ width: {xs: '100%', md: "50%"}}} >
            <Box>
              <img
                src="/mainlogo-3-2.png"
                alt="Launch logo"
                style={{ height: 44, filter: 'invert(1) brightness(2) grayscale(1)' }}
              />
            </Box>

            <Box sx={{ mt: 3, display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
              <SquareIcon href="https://linkedin.com" aria="linkedin"><LinkedIn fontSize="small" /></SquareIcon>
              <SquareIcon href="https://facebook.com" aria="facebook"><Facebook fontSize="small" /></SquareIcon>
              <SquareIcon href="https://instagram.com" aria="instagram"><Instagram fontSize="small" /></SquareIcon>
              <SquareIcon href="#" aria="x"><Close fontSize="small" /></SquareIcon>
              <SquareIcon href="https://youtube.com" aria="youtube"><YouTube fontSize="small" /></SquareIcon>
            </Box>
          </Box>

          <Box display={"flex"} flexDirection={{xs: "column", md: "row"}} gap={{xs: 3, md: 0}} mt={{xs: 5, md: 0}} sx={{ width: {xs: '100%', md: "50%"}}} alignItems="center" justifyContent={"center"}>
          <Box sx={{ width: {xs: '100%', md: "40%"}}}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'common.white' }}>
              Quick Link
            </Typography>

            <Box component="nav" aria-label="footer links">
              <FooterLink href="#">Services</FooterLink>
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Packages</FooterLink>
              <FooterLink href="#">Blogs</FooterLink>
            </Box>
          </Box>

          {/* RIGHT: contact */}
          <Box sx={{ width: {xs: '100%', md: "60%"}}}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'common.white' }}>
              Contact Us
            </Typography>

            <ContactRow IconComp={Phone} href="tel:+15306258265">+1 (530) 625-8265</ContactRow>
            <ContactRow IconComp={Mail} href="mailto:support@launchmybiz.net">support@launchmybiz.net</ContactRow>
            <ContactRow IconComp={LocationOn}>
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
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              Copyright © 2004–2025 LaunchmyBiz - All Rights Reserved.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="/privacy-policy" underline="none" sx={{ color: 'grey.400', '&:hover': { color: 'common.white' } }}>
                PRIVACY POLICY
              </Link>
              <Link href="/disclaimer" underline="none" sx={{ color: 'grey.400', '&:hover': { color: 'common.white' } }}>
                DISCLAIMER
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
