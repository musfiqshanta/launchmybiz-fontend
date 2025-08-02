import React from 'react';
import { Box, Typography, Grid, Link as MuiLink } from '@mui/material';

// Inline SVG Components (Copied from your provided code)
const FaSearchDollarSVG = ({ size = 36, color = "#ff6b6b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5S5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14Z" fill={color}/>
    <path d="M10.5 10H11.5V11.5C11.5 12.33 10.83 13 10 13H9C8.17 13 7.5 12.33 7.5 11.5V10.5C7.5 9.67 8.17 9 9 9H10V8H9C7.9 8 7 8.9 7 10V12C7 13.1 7.9 14 9 14H10C11.1 14 12 13.1 12 12V10.5C12 9.95 11.79 9.45 11.41 9.1L10.5 10Z" fill={color} />
  </svg>
);

const FaShieldAltSVG = ({ size = 36, color = "#ff6b6b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 21C7.95 20.06 5 15.77 5 11.2V6.3L12 3.18L19 6.3V11.2C19 15.77 16.05 20.06 12 21Z" fill={color}/>
  </svg>
);

const FaClockSVG = ({ size = 36, color = "#ff6b6b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill={color}/>
    <path d="M12.5 7H11V12.5L16.25 15.3125L17 14.0625L12.5 11.6875V7Z" fill={color}/>
  </svg>
);

const FaHandshakeSVG = ({ size = 36, color = "#ff6b6b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 14V10H2C2.55 10 3 9.55 3 9V8C3 7.45 2.55 7 2 7H0.5C0.22 7 0 7.22 0 7.5V14.5C0 14.78 0.22 15 0.5 15H2C2.55 15 3 14.55 3 14V13C3 12.45 2.55 12 2 12H1V14ZM22.5 7H21C20.45 7 20 7.45 20 8V9C20 9.55 20.45 10 21 10H23V14H22C21.45 14 21 14.45 21 15V16C21 16.55 21.45 17 22 17H23.5C23.78 17 24 16.78 24 16.5V9.5C24 9.22 23.78 9 23.5 9H22C21.45 9 21 8.55 21 8V7.5C21 7.22 21.22 7 21.5 7H22.5ZM11.67 7.02C11.42 6.77 11.03 6.73 10.73 6.93L5.5 10.26L7.62 13.74L4.26 15.5L3.5 14.23L1.74 15L2.5 16.27L6.12 14.38L8.24 17.86L11.5 16.26L12.23 17.5L14 16.73L13.27 15.5L16.5 13.74L14.38 10.26L17.74 8.5L18.5 9.77L20.26 9L19.5 7.73L15.88 9.62L13.76 6.14L11.67 7.02Z" fill={color}/>
  </svg>
);

const FaUserFriendsSVG = ({ size = 36, color = "#ff6b6b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.09 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill={color}/>
  </svg>
);

const FaMagicSVG = ({ size = 36, color = "#ff6b6b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 2.5L15.09 5.59L18.5 6.5L16.25 8.81L16.88 12.25L13.5 10.75L10.12 12.25L10.75 8.81L8.5 6.5L11.91 5.59L13.5 2.5ZM6.5 6.5L8.09 9.59L11.5 10.5L9.25 12.81L9.88 16.25L6.5 14.75L3.12 16.25L3.75 12.81L1.5 10.5L4.91 9.59L6.5 6.5ZM13.5 13.5L15.09 16.59L18.5 17.5L16.25 19.81L16.88 23.25L13.5 21.75L10.12 23.25L10.75 19.81L8.5 17.5L11.91 16.59L13.5 13.5Z" fill={color}/>
  </svg>
);


const featuresData = [
  {
    icon: <FaSearchDollarSVG />,
    title: 'Transparency & All-Inclusive Services',
    subtitle: 'Affordable LLC Formation with No Hidden Fees',
    description:
      'Get everything you need to start your business with confidence. Our all-inclusive LLC formation package ensures transparency—no hidden fees, no surprises.',
    cta: 'Start Your LLC with Confidence',
    ctaLink: '#transparency',
  },
  {
    icon: <FaShieldAltSVG />,
    title: 'Specialized Expertise in LLC Formation',
    subtitle: 'Trusted LLC Specialists for Entrepreneurs',
    description:
      'Our services are designed for entrepreneurs seeking expert guidance. Let LAUNCH simplify your LLC setup with precision and care.',
    cta: 'Trust the LLC Experts Today',
    ctaLink: '#expertise',
  },
  {
    icon: <FaClockSVG />,
    title: 'Speed and Simplicity',
    subtitle: 'Start Your LLC in Minutes',
    description:
      'With our quick and seamless process, launching your LLC has never been easier. Say goodbye to complexity and stress—get started today.',
    cta: 'Launch Your LLC Now',
    ctaLink: '#speed',
  },
  {
    icon: <FaHandshakeSVG />,
    title: 'Trust and Confidence',
    subtitle: 'Your Trusted Partner for LLC Success',
    description:
      'Join a growing community of entrepreneurs who trust LAUNCH to turn their dreams into reality. From filing your LLC to staying legally compliant, we’re here to guide you.',
    cta: 'Start Building Your Business Today',
    ctaLink: '#trust',
  },
  {
    icon: <FaUserFriendsSVG />,
    title: 'Audience-Specific Focus',
    subtitle: 'Simple Solution for Every Entrepreneur',
    description:
      'Whether you’re a solo hustler, founder, or full-time entrepreneur, our LLC setup is tailored to your journey. Affordable, reliable, and built for you.',
    cta: 'Build Your Future Today',
    ctaLink: '#focus',
  },
  {
    icon: <FaMagicSVG />,
    title: 'What Sets Us Apart',
    subtitle: 'Exclusive LLC Formation Services—No Distractions',
    description:
      'We specialize in LLCs—no S-Corps, no C-Corps, no Non-Profits, no gimmicks. Experience the power of exclusivity and transparency. Your journey starts here.',
    cta: 'Launch Your Business with Confidence',
    ctaLink: '#unique',
  },
];

const LLCFeaturesSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #1e2a38, #121a26)',
        color: '#fff',
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        fontWeight="bold"
        sx={{ color: '#ffffff', mb: { xs: 4, md: 6 } }}
      >
        Why Choose LaunchMyBiz for LLC Formation?
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: { xs: 3, md: 4 },  
        }}
      >
        {featuresData.map((feature, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#243344',
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
               
            }}
          >
            <Box mb={2.5}>{feature.icon}</Box>

            <Typography variant="h6" fontWeight="bold" color="#ffffff" gutterBottom>
              {feature.title}
            </Typography>

            <Typography
              variant="subtitle2"
              fontWeight="medium"
              color="#ffb400"
              gutterBottom
              sx={{ mt: 0.5, minHeight: { xs: 'auto', md: '40px' } }}
            >
              {feature.subtitle}
            </Typography>

            <Typography variant="body2" color="#cfd8dc" mb={3} sx={{ flexGrow: 1, px: 1 }}>
              {feature.description}
            </Typography>

            <MuiLink
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              underline="none"
              sx={{
                color: '#ff6b6b',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color 0.2s ease-in-out',
                '&:hover': {
                  color: '#ff8b8b',
                  textDecoration: 'underline',
                },
               }}
            >
              {feature.cta}
              <span style={{ marginLeft: '8px', fontSize: '0.8rem', lineHeight: 1 }}>&rarr;</span>
            </MuiLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LLCFeaturesSection;
