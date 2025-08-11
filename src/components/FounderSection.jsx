
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { red } from '@mui/material/colors';
import founder from '../assets/Rectangle 746.png'; 
import click from '../assets/Frame 144.png'; // Replace with actual path to red tick icon

const founders = [
  {
    name: 'Everett Pickens',
    title: 'Co-Founder | Chief Executive Officer',
    image: founder,
    description: `Everett leads LAUNCH with a vision to make starting a business simple and accessible. Known for his ability to build strong teams and lasting partnerships, he combines emotional intelligence with strategic thinking.\n\nHis leadership inspires action, trust, and results, along with turning ideas into businesses every day.`
  },
  {
    name: 'Everett Pickens',
    title: 'Co-Founder | Chief Executive Officer',
    image: founder,
    description: `Everett leads LAUNCH with a vision to make starting a business simple and accessible. Known for his ability to build strong teams and lasting partnerships, he combines emotional intelligence with strategic thinking.\n\nHis leadership inspires action, trust, and results, along with turning ideas into businesses every day.`
  },
  {
    name: 'Everett Pickens',
    title: 'Co-Founder | Chief Executive Officer',
    image: founder,
    description: `Everett leads LAUNCH with a vision to make starting a business simple and accessible. Known for his ability to build strong teams and lasting partnerships, he combines emotional intelligence with strategic thinking.\n\nHis leadership inspires action, trust, and results, along with turning ideas into businesses every day.`
  }
];

const packages = [
  {
    title: 'Basic',
    cost: 'State-specific LLC cost',
    features: ['Core LLC Services'],
    cta: 'Get Started'
  },
  {
    title: 'Premium',
    cost: 'LLC cost + $1,335',
    features: ['Core LLC Services (optional)', 'Branding: Logo design + full brand kit', 'Basic Website: Landing Page + 3 Pages (non-ecom)'],
    recommended: true,
    cta: 'Get Started'
  },
  {
    title: 'Platinum',
    cost: 'LLC cost + $1,677',
    features: ['Core LLC Services (optional)', 'Branding: Logo design + full brand kit', 'Basic Website: Landing Page + 3 Pages (non-ecom)', 'Brand Strategy to get started'],
    cta: 'Get Started'
  },
  {
    title: 'Custom',
    cost: `Let's build your bundle`,
    features: ['Tailored Services Based on Your Needs'],
    cta: 'Get in touch'
  }
];

export default function FoundersAndPackages() {
  return (
    <div style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: "#EFEDEB", marginBottom: 40, marginTop: 40 }}>
    <Container maxWidth="lg"  >
      <Typography variant="h4" align="center" fontWeight="500"  fontSize={{xs: "36px", md:"64px"}} gutterBottom>
        Our Founders
      </Typography>
      <Typography variant="subtitle1" align="center" fontSize={{xs: "14px", md:"20px"}} gutterBottom>
        Meet the People Fueling Your Launch
      </Typography>

      <Box sx={{ my: 4, }}>
  <Box sx={{ position: 'relative', pb: 4,

   '.swiper-pagination': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0, // Keep it at the bottom
      width: '100%',
      
    },
   '.swiper-pagination-bullet': {
      width: 15,
      height: 5,
      borderRadius: '999px',
      backgroundColor: 'rgba(255, 0, 0, 0.4)',
      border: '1px solid red',
      opacity: 1,
      transition: 'all 0.3s ease',
      
    },
    '.swiper-pagination-bullet-active': {
      width: 8,
      height: 8,
      backgroundColor: 'red',
      borderRadius: '50%',
      
    }, }}> {/* Added padding bottom to make space for pagination */}
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      spaceBetween={24}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 }
      }}
      style={{ paddingBottom: '30px' }} // Extra space for pagination
    >
      {founders.map((founder, index) => (
        <SwiperSlide key={index} >
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" gap={4} sx={{ backgroundColor: '#fff', borderRadius: 3,p: 2, boxShadow: 3 }}>
            <Box
              component="img"
              src={founder.image}
              alt={founder.name}
              sx={{ width: { xs: '70%', md: 400 }, height: { xs: '70%', md: 380 }, borderRadius: 2, boxShadow: 2 }}
            />
            <Box>
              <Typography variant="h6" fontSize={{xs: "18px", md:"30px"}} fontWeight="600">{founder.name}</Typography>
              <Typography variant="subtitle2" fontSize={{xs: "14px", md:"20px"}} fontWeight="500" mb={2}>{founder.title}</Typography>
              {/* <Divider   style={{ width: 80, marginBottom: 15, color: "#FF0000" }} /> */}
              {/* <Typography variant="h6" style={{ width: 80, height: 20}}> </Typography> */}
               <Box
                      sx={{
                       
                        width: '150px',
                        height: '1px',
                        backgroundColor: '#FF0000',
                        marginBottom: 2
                       
                      }}
                    />
              <Typography variant="body2" fontSize={{xs: "12px", md:"20px"}} fontWeight="400" whiteSpace="pre-line">{founder.description}</Typography>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Swiper Pagination Styling */}
    <style>
      {`
        .swiper-pagination {
          bottom: 0px !important;
          text-align: center;
        }
      `}
    </style>
  </Box>
</Box>

      <Box mt={10}>
        <Typography variant="h4" align="center" fontSize={{xs: "36px", md:"64px"}} fontWeight="500" gutterBottom>
          Packages
        </Typography>
        <Typography variant="subtitle1" align="center"  fontSize={{xs: "14px", md:"20px"}} width={{xs: "90%", md:"60%"}} mx={"auto"} gutterBottom>
          LAUNCH is more than paperwork. We’re your end-to-end business launch partner, from legal setup to branding and beyond.
        </Typography>

        <Grid
   container
  spacing={{xs: 4, md: 2}}
  mt={4}
  justifyContent="center"
  // p={0}
  // border={2}
  // alignItems="stretch"
>
  {packages.map((pkg, index) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      key={index}
      sx={{ display: 'flex' }} // Ensures card inside stretches fully
    >
      <Card
        variant="outlined"
        sx={{
          borderColor: pkg.recommended ? red[500] : 'grey.300',
          borderWidth: pkg.recommended ? 2 : 1,
          display: 'flex',
          flexDirection: 'column',
          height: '400px',
          width: { xs: "272px", md:'272px'},
          borderRadius: 4,
          backgroundColor: '#fff',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 12,
          },
          position: 'relative',
          overflow: 'visible',
          
        }}
        
      >
        {pkg.recommended && (
          <Chip
            label="Recommended"
            color="primary"
            sx={{
              backgroundColor: red[500],
              color: '#fff',
              fontSize: 12,
              borderRadius: '9999px',
              position: 'absolute',
              top: -14,
              left: '50%',
              transform: 'translateX(-50%)',
              fontWeight: 'bold',
            }}
          />
        )}

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              backgroundColor: '#f7f7f7',
              borderRadius: 2,
              py: 1.5,
              textAlign: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6" fontSize={{xs: "20px", md:"24px"}} color="text.primary" fontWeight="500">
              {pkg.title}
            </Typography>
            <Typography variant="subtitle1" fontSize={{xs: "16px", md:"20px"}} fontWeight="600">
              {pkg.cost}
            </Typography>
          </Box>

          <Box textAlign="center" mb={2}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{
                fontWeight: '400',
                borderRadius: 2,
                textTransform: 'none',
                py: 1,
                fontSize: {xs: "18px", md:"20px"}
              }}
              
            >
              {pkg.cta}
            </Button>
          </Box>

          <Typography variant="body1" fontSize={{xs: "16px", md:"16px"}} fontWeight="600" mb={1}>
            Includes
          </Typography>
          <ul style={{ paddingLeft: 0, listStyle: 'none',  }}>
            {pkg.features.map((feature, idx) => (
              <li
                key={idx}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}
              >
                <Box
                  component="img"
                  src={click}
                  alt="check"
                  sx={{ width: 14, height: 14 }}
                />
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  {feature}
                </Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>



      </Box>
    </Container>
    </div>
  );
}