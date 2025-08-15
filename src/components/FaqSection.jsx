

import React, { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Container,  Grid, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';


const faqs = [
  {
    title: '1. Getting Started',
    content: ''
  },
  {
    title: '2. Proper Setup Essentials',
    content: ''
  },
  {
    title: '3. Branding & Identity',
    content: (
      <>
        <Typography fontWeight="bold">1. What’s included in the branding services?</Typography>
        <ul style={{ paddingLeft: 30}}>
          <li>A logo with 2–4 variations</li>
          <li>A complete brand guideline</li>
          <li>Basic stationery like business cards and letterheads</li>
          <li>Communication tone guidelines tailored for your industry</li>
        </ul>
        <Typography fontWeight="bold">2. Can I use the branding assets anywhere?</Typography>
        <Typography>
          Absolutely. You’ll receive high-res files ready for digital and print use, including social media packaging, signage, and more.
        </Typography>
        <Typography fontWeight="bold">3. How long does branding take?</Typography>
        <Typography>
          Initial concepts are shared within 5–7 working days. Revisions and final files depend on feedback rounds but are typically completed within 2–3 weeks.
        </Typography>
      </>
    )
  },
  {
    title: '4. Website & Digital Presence',
    content: ''
  },
  {
    title: '5. Strategy & Support',
    content: ''
  }
];

const testimonials = [
  {
    name: 'Brooke L., Psy.D.',
    text: `My experience with Launch was incredibly professional. From the initial contact, to the ease of the website, to the prompt completion of my LLC. The entire process was smooth and competent, which was reassuring after a bad experience I had with another company. I would recommend Launch to anyone looking for help with their new business. The leather binder with the gold nameplate and name stamp they delivered was the icing on the cake.`,
  },
  {
    name: 'Safer Kids, LLC',
    text: `My experience with Launch was incredibly professional. From the initial contact, to the ease of the website, to the prompt completion of my LLC. The entire process was smooth and competent, which was reassuring after a bad experience I had with another company. I would recommend Launch to anyone looking for help with their new business. The leather binder with the gold nameplate and name stamp they delivered was the icing on the cake.`,
  },
  {
    name: 'Sarah M., Entrepreneur',
    text: `Launch made starting my business so much easier than I expected. Their team was responsive, knowledgeable, and made the entire process feel seamless. The branding package exceeded my expectations - my logo is perfect and the brand guidelines are comprehensive. Highly recommend!`,
  },
  {
    name: 'Michael R., Tech Startup',
    text: `As a first-time business owner, I was overwhelmed with all the legal requirements. Launch guided me through every step with patience and expertise. The website they built for me looks professional and modern. Couldn't be happier with the results!`,
  },
  {
    name: 'Jennifer K., Consultant',
    text: `The attention to detail from Launch is outstanding. They didn't just help me set up my LLC - they helped me build a complete business foundation. The strategy session was invaluable and their ongoing support has been incredible.`,
  },
  {
    name: 'David L., Restaurant Owner',
    text: `Launch transformed my business idea into reality. Their comprehensive approach covered everything from legal setup to branding to digital presence. The process was smooth, professional, and the results speak for themselves.`,
  }
];

  const FaqSection = () => {
  const testimonialsRef = useRef(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    const testimonialsContainer = testimonialsRef.current;
    if (!testimonialsContainer) return;

    let scrollInterval;
    let currentScrollTop = 0;
    const scrollStep = 5; // Pixels per scroll step
    const scrollDelay = 100; // Milliseconds between scroll steps

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!testimonialsContainer || isPaused) return;

        const maxScrollTop = testimonialsContainer.scrollHeight - testimonialsContainer.clientHeight;
        
        if (isScrollingUp) {
          // Scrolling up
          currentScrollTop -= scrollStep;
          if (currentScrollTop <= 0) {
            currentScrollTop = 0;
            setIsScrollingUp(false); // Switch to scrolling down
          }
        } else {
          // Scrolling down
          currentScrollTop += scrollStep;
          if (currentScrollTop >= maxScrollTop) {
            currentScrollTop = maxScrollTop;
            setIsScrollingUp(true); // Switch to scrolling up
          }
        }

        testimonialsContainer.scrollTop = currentScrollTop;
      }, scrollDelay);
    };

    // Start auto-scroll after a short delay
    const startDelay = setTimeout(() => {
      startAutoScroll();
    }, 1000);

    // Cleanup function
    return () => {
      clearTimeout(startDelay);
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [isScrollingUp, isPaused]);

  return (
    <Container id='faq' sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>FAQs</Typography>

      <Box sx={{ width: { xs: "100%", sm: "80%", md: "60%"}}} marginX={"auto"}>
        {faqs.map((faq, idx) => (
         <Box key={idx} mb={1}>   
          <Accordion key={idx}  defaultExpanded={idx === 2} style={{ backgroundColor: "#EFEDEB", boxShadow: "none", borderRadius: 5}}>
            <AccordionSummary  expandIcon={<ExpandMoreIcon />}  >
              <Typography fontWeight="bold">{faq.title}</Typography>
            </AccordionSummary>
            {faq.content && (
              <AccordionDetails style={{ paddingLeft: 15}}>
                {faq.content}
              </AccordionDetails>
            )}
          </Accordion>
          </Box>
        ))}
      </Box>

       <Box id='about' mt={10} p={{xs: 2, md: 3}} bgcolor="#EFEDEB" borderRadius={3}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={4}
        alignItems="center"
        p={{xs: 0, md: 3}}
      >
        {/* Left Content */}
        <Box width={{xs: '100%', md: "50%"}} display="flex" flexDirection="column" justifyContent="center">
             <Typography variant="h4" fontWeight="bold"  gutterBottom>
            🎉 
          </Typography>
          <Typography variant="h4" fontWeight="500" fontSize={{xs: "32px", md:"60px"}} gutterBottom>
            What Our Valuable Clients Say About Us
          </Typography>
          <Typography fontSize={{xs: "14px", md:"20px"}} fontWeight="400" color="textSecondary">
            LAUNCH is more than paperwork. We’re your end-to-end business launch partner, from legal setup to branding and beyond.
          </Typography>
        </Box>

        {/* Right Testimonials */}
<Box
  ref={testimonialsRef}
  width={{ xs: '100%', md: '50%' }}
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
  sx={{
    height: { xs: 350, md: 500},
    overflowY: 'auto',
    pr: 1,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none', // IE and Edge
    'scrollbar-width': 'none',    // Firefox
    scrollBehavior: 'smooth', // Smooth scrolling
    cursor: 'pointer', // Indicate interactivity
  }}
>
  {testimonials.map((item, index) => (
    <Box
      key={index}
      p={{xs: 2, md: 3}}
      bgcolor="#fff"
      borderRadius={2}
      boxShadow={2}
      mb={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Typography variant="body1" fontSize={{xs: "14px", md:"18px"}} fontWeight="400" color="textPrimary">
        {item.text}
      </Typography>
      <Box mt={3} display="flex" alignItems="center">
        <Avatar
          src={item.avatar || '/default-avatar.png'}
          alt={item.name}
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Typography fontSize={{xs: "14px", md:"22px"}} fontWeight="600">{item.name}</Typography>
      </Box>
    </Box>
  ))}
</Box>
      </Box>
    </Box>
    </Container>
  );
};

export default FaqSection;
