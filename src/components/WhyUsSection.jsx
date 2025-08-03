/* eslint-disable no-unused-vars */
import React, { useRef, } from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import RocketIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GppGoodIcon from '@mui/icons-material/GppGood';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { motion,  useScroll, useTransform } from 'framer-motion';
import us1 from '../assets/us1.png'
import us2 from '../assets/us2.png'
import us3 from '../assets/us3.png'
import us4 from '../assets/us4.png'
import rocket from '../assets/Frame 137.png'



export default function WhyUsSection() {
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 880]);
   const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box ref={containerRef} maxWidth={"lg"} mx={'auto'}  sx={{ px: {xs: 2, md: 3}, py: 15, background: '#fff' }}>
      <Typography variant="h6" fontSize={{xs: '20px', md: "32px"}} fontWeight={400} align="center" gutterBottom>
        Why Choose Us
      </Typography>
      <Typography variant="h4" fontSize={{xs: '32px', md: "64px"}} fontWeight={500} align="center" gutterBottom>
        Built To Be Your <Box component="span" sx={{ color: 'error.main', fontWeight: '500' }}>Launch Pad</Box>
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 6 }} width={{ xs: '90%', md: '65%'}} mx={"auto"} fontSize={{xs: '14px', md: "20px"}} fontWeight={400}>
        LAUNCH is more than paperwork. We’re your end-to-end business launch partner, from legal setup to branding and beyond.
      </Typography>

      <Grid container maxWidth={'md'} mx={'auto'}   spacing={4}  position="relative">
        {/* Vertical line */}
      
      { !isSmall ? 
            <>
          <Box
        sx={{
          position: 'absolute',
          top: 120,
          bottom: 105,
          left: 'calc(50% - 1px)',
          width: '2px',
          backgroundColor: '#d7d7d7ff',
          zIndex: 1,
        }}
      />

       {Array.from({ length: 4 }).map((_, index) => (
  <Box
    key={index}
    sx={{
      position: 'absolute',
      top: `${120 + index * 300}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: '#e60000ff',
      zIndex: 2,
    }}
  />
))}
      
      <motion.div
        style={{
          position: 'absolute',
          left: 'calc(50% - 15px)',
          top: 118,
          zIndex: 2,
          y,
          rotate,
        }}
      >   
      <Box
          component="img"
          src={rocket}
          alt="Trustpilot"
          style={{ rotate: "180deg"}}
        />
        {/* <RocketIcon fontSize="large" style={{ padding: 5, backgroundColor: '#d7d7d7ff', borderRadius: 50 }} color="error" /> */}
      </motion.div> </>

      : ""
    
    }
      

         <Box display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={4}
        alignItems="center" justifyContent={{ xs: 'center', md:"space-between"}}  width={'100%'}>
 
            <Box width={{xs: '100%', md: "50%"}}
              component="img"
              src={us1}
              alt='us1'
              sx={{ width: { xs: '90%', md: 400 }, height: { xs: '60%', md: 260 }, borderRadius: 2, boxShadow: 2 }}
            />

            <Box width={{xs: '90%', md: "410px"}}>
                
                <Typography variant="h6" fontSize={{xs: '20px', md: "26px"}} fontWeight={600} gutterBottom>
                Fast
              </Typography>
              <Typography fontSize={{xs: '18px', md: "24px"}} fontWeight={400} variant="body2">We streamline everything to get your business up and running quickly, from LLC filings to website launches.</Typography>

            </Box>

         </Box>

          <Box display="flex"
        flexDirection={{ xs: 'column', md: 'row-reverse' }}
        gap={4}
        alignItems="center" justifyContent={{ xs: 'center', md:"space-between"}}  width={'100%'}>
 
            <Box width={{xs: '100%', md: "50%"}}
              component="img"
              src={us2}
              alt='us1'
              sx={{ width: { xs: '90%', md: 400 }, height: { xs: '60%', md: 260 }, borderRadius: 2, boxShadow: 2 }}
            />

            <Box width={{xs: '90%', md: "410px"}}>
                
                <Typography variant="h6" fontSize={{xs: '20px', md: "26px"}} fontWeight={600} gutterBottom>
                Easy
              </Typography>
              <Typography fontSize={{xs: '18px', md: "24px"}} fontWeight={400} variant="body2">No confusing jargon or endless processes. Just clear, guided steps for every part of your launch.</Typography>

            </Box>

         </Box>

          <Box display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={4}
        alignItems="center" justifyContent={{ xs: 'center', md:"space-between"}}  width={'100%'}>
 
            <Box width={{xs: '100%', md: "50%"}}
              component="img"
              src={us3}
              alt='us1'
              sx={{ width: { xs: '90%', md: 400 }, height: { xs: '60%', md: 260 }, borderRadius: 2, boxShadow: 2 }}
            />

            <Box width={{xs: '90%', md: "410px"}}>
                
                <Typography variant="h6" fontSize={{xs: '20px', md: "26px"}} fontWeight={600} gutterBottom>
               Transparent
              </Typography>
              <Typography fontSize={{xs: '18px', md: "24px"}} fontWeight={400} variant="body2">No hidden fees. Complete clarity on pricing, timelines, and deliverables.</Typography>

            </Box>

         </Box>

          <Box display="flex"
        flexDirection={{ xs: 'column', md: 'row-reverse' }}
        gap={4}
        alignItems="center" justifyContent={{ xs: 'center', md:"space-between"}}  width={'100%'}>
 
            <Box width={{xs: '100%', md: "50%"}}
              component="img"
              src={us4}
              alt='us1'
              sx={{ width: { xs: '90%', md: 400 }, height: { xs: '60%', md: 260 }, borderRadius: 2, boxShadow: 2 }}
            />

            <Box width={{xs: '90%', md: "410px"}}>
                
                <Typography variant="h6" fontSize={{xs: '20px', md: "26px"}} fontWeight={600} gutterBottom>
                Trusted Across States
              </Typography>
              <Typography fontSize={{xs: '18px', md: "24px"}} fontWeight={400} variant="body2">We cover all 50 states in the USA, with expertise and compliance clarity.</Typography>

            </Box>

         </Box>

       
      </Grid>
    </Box>
  );
}

