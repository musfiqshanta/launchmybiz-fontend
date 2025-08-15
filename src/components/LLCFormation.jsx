import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Container,
  Link,
  CircularProgress
} from '@mui/material';
import { FaRocket, FaRegBuilding, FaFingerprint, FaShieldAlt, FaBullhorn } from 'react-icons/fa';
import Navbar from './Navbar';
import bannerbackground from '../assets/Untitled-1 1.png';
import bannerimage from '../assets/Object 1.png';
import trustpilot from '../assets/image 14.png';
import api from '../lib/apiClient';

const usStatesWithPrices = [
  { name: "Alabama", label: "Alabama-Standard $587.40" },
  { name: "Alaska", label: "Alaska-Standard $624.80" },
  { name: "Arizona", label: "Arizona-Standard $421.30" },
  { name: "Arkansas", label: "Arkansas-Standard $382.80" },
  { name: "California", label: "California-Standard $410.30" },
  { name: "Colorado", label: "Colorado-Standard $382.80" },
  { name: "Connecticut", label: "Connecticut-Standard $459.80" },
  { name: "Delaware", label: "Delaware-Standard $564.30" },
  { name: "Florida", label: "Florida-Standard $498.30" },
  { name: "Georgia", label: "Georgia-Standard $437.80" },
  { name: "Hawaii", label: "Hawaii-Standard $405.90" },
  { name: "Idaho", label: "Idaho-Standard $443.30" },
  { name: "Illinois", label: "Illinois-Standard $503.80" },
  { name: "Indiana", label: "Indiana-Standard $437.80" },
  { name: "Iowa", label: "Iowa-Standard $382.80" },
  { name: "Kansas", label: "Kansas-Standard $510.40" },
  { name: "Kentucky", label: "Kentucky-Standard $388.30" },
  { name: "Louisiana", label: "Louisiana-Standard $464.20" },
  { name: "Maine", label: "Maine-Standard $520.30" },
  { name: "Maryland", label: "Maryland-Standard $544.50" },
  { name: "Massachusetts", label: "Massachusetts-Standard $899.80" },
  { name: "Michigan", label: "Michigan-Standard $382.80" },
  { name: "Minnesota", label: "Minnesota-Standard $503.80" },
  { name: "Mississippi", label: "Mississippi-Standard $388.30" },
  { name: "Missouri", label: "Missouri-Standard $385.00" },
  { name: "Montana", label: "Montana-Standard $371.80" },
  { name: "Nebraska", label: "Nebraska-Standard $664.40" },
  { name: "Nevada", label: "Nevada-Standard $807.40" },
  { name: "New Hampshire", label: "New Hampshire-Standard $440.00" },
  { name: "New Jersey", label: "New Jersey-Standard $469.15" },
  { name: "New Mexico", label: "New Mexico-Standard $385.00" },
  { name: "New York", label: "New York-Standard $1026.30" },
  { name: "North Carolina", label: "North Carolina-Standard $468.60" },
  { name: "North Dakota", label: "North Dakota-Standard $476.30" },
  { name: "Ohio", label: "Ohio-Standard $436.70" },
  { name: "Oklahoma", label: "Oklahoma-Standard $448.80" },
  { name: "Oregon", label: "Oregon-Standard $437.80" },
  { name: "Pennsylvania", label: "Pennsylvania-Standard $465.30" },
  { name: "Rhode Island", label: "Rhode Island-Standard $499.40" },
  { name: "South Carolina", label: "South Carolina-Standard $488.40" },
  { name: "South Dakota", label: "South Dakota-Standard $492.80" },
  { name: "Tennessee", label: "Tennessee-Standard $685.30" },
  { name: "Texas", label: "Texas-Standard $668.80" },
  { name: "Utah", label: "Utah-Standard $392.70" },
  { name: "Vermont", label: "Vermont-Standard $465.30" },
  { name: "Virginia", label: "Virginia-Standard $442.20" },
  { name: "Washington", label: "Washington-Standard $547.80" },
  { name: "West Virginia", label: "West Virginia-Standard $471.90" },
  { name: "Wisconsin", label: "Wisconsin-Standard $470.80" },
  { name: "Wyoming", label: "Wyoming-Standard $442.20" },
];


const LLCForm = () => {
  const [selectedState, setSelectedState] = useState("");
  const [packageText, setPackageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (event) => {
    const stateName = event.target.value;
    setSelectedState(stateName);
    setIsLoading(true);
    setPackageText(""); // Clear previous package text while loading

    try {
      const params = {
        entityType: "LLC",
        state: stateName,
        filing: "Standard",
      };

      const response = await api.get("/api/business-formation-package", { params });

      const completePackage = response.data.data.packages.find(pkg => pkg.name === "Complete");

      if (completePackage) {
        // remove $ and convert to number
        const priceNumber = Number(completePackage.totalPrice.replace(/[^0-9.-]+/g,""));
        const calculatedFee = (priceNumber + priceNumber  * 0.03).toFixed(2);

        setPackageText(`${stateName} - $${calculatedFee}`);
      }

    } catch (error) {
      console.error("API Error:", error);
      setPackageText(""); // Clear package text on error
    } finally {
      setIsLoading(false);
    }
  };
 
  
  
   const features = [
  { icon:  (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 9C11.0145 9 9 11.0145 9 13.5C9 15.9855 11.0145 18 13.5 18C15.9855 18 18 15.9855 18 13.5C18 11.0145 15.9855 9 13.5 9ZM15.894 13.6515L14.2343 15.2445C13.8953 15.579 13.4453 15.7477 12.9945 15.7477C12.5437 15.7477 12.0922 15.579 11.7472 15.2423L10.8983 14.4105C10.602 14.1203 10.5983 13.6455 10.8878 13.35C11.1772 13.053 11.652 13.0492 11.9482 13.3395L12.7965 14.1705C12.9045 14.277 13.0807 14.2747 13.188 14.169L14.8552 12.5685C15.153 12.282 15.6285 12.2903 15.9158 12.5903C16.2023 12.8888 16.1925 13.3643 15.894 13.6515ZM7.5 13.5C7.5 11.7075 8.286 10.0995 9.53175 9H3.75C3.33525 9 3 8.66475 3 8.25C3 7.83525 3.33525 7.5 3.75 7.5H9.75C10.1648 7.5 10.5 7.83525 10.5 8.25C10.5 8.268 10.4992 8.286 10.4977 8.304C11.3805 7.7925 12.4058 7.5 13.5 7.5V3.75C13.5 1.68225 11.8177 0 9.75 0H3.75C1.68225 0 0 1.68225 0 3.75V14.25C0 16.3177 1.68225 18 3.75 18H9.53175C8.286 16.9005 7.5 15.2925 7.5 13.5ZM3.75 3.75H9.75C10.1648 3.75 10.5 4.08525 10.5 4.5C10.5 4.91475 10.1648 5.25 9.75 5.25H3.75C3.33525 5.25 3 4.91475 3 4.5C3 4.08525 3.33525 3.75 3.75 3.75ZM5.25 12.75H3.75C3.33525 12.75 3 12.4148 3 12C3 11.5852 3.33525 11.25 3.75 11.25H5.25C5.66475 11.25 6 11.5852 6 12C6 12.4148 5.66475 12.75 5.25 12.75Z"
          fill="#FF0000"
        />
      </svg>
    ), text: "Register your LLC" },
  { icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.32475 9.408C6.34275 9.3975 7.125 12 7.125 12H5.817L5.163 9.75H4.95V12H3.75V6H5.25C6.28575 6 7.125 6.83925 7.125 7.875C7.125 8.5095 6.80775 9.069 6.32475 9.408ZM5.925 7.875C5.925 7.503 5.622 7.2 5.25 7.2H4.95V8.55H5.25C5.622 8.55 5.925 8.247 5.925 7.875ZM18 7.725V10.275C18 11.2267 17.2268 12 16.275 12H15V6H16.275C17.2268 6 18 6.77325 18 7.725ZM16.8 7.76325C16.8 7.47375 16.5645 7.23825 16.275 7.23825C16.194 7.23825 16.2255 7.23825 16.1993 7.23825V10.839H16.275C16.5645 10.839 16.8 10.6035 16.8 10.314V7.764V7.76325ZM14.25 12H13.29L12.375 9.75V12H11.25V6H12.21V6.00675L13.125 8.625V6H14.25V12ZM9.513 11.25H8.48775L8.37375 12H7.12575L8.0205 6.8115C8.11575 6.261 8.55825 5.98575 9.00075 5.98575C9.44325 5.98575 9.8865 6.261 9.981 6.8115L10.8758 12H9.62775L9.51375 11.25H9.513ZM9.33075 10.05L9 7.875L8.66925 10.05H9.33H9.33075ZM3.375 10.125C3.375 11.1608 2.53575 12 1.5 12H0V6H1.275C2.2275 6 3 6.7725 3 7.725C3 8.085 2.88975 8.418 2.7015 8.69475C3.12675 9.03525 3.375 9.5325 3.375 10.125ZM1.2 7.2V8.25H1.275C1.5645 8.25 1.8 8.0145 1.8 7.725C1.8 7.4355 1.5645 7.2 1.275 7.2H1.2ZM2.175 10.125C2.175 9.753 1.872 9.45 1.5 9.45H1.2V10.8H1.5C1.872 10.8 2.175 10.497 2.175 10.125ZM16.4333 4.5C16.2502 3.8055 15.888 3.1605 15.3638 2.63625C14.5058 1.77825 13.3222 1.34925 12.1312 1.44C11.3512 0.531 10.212 0 8.99925 0C7.7865 0 6.64725 0.531 5.868 1.44C4.6725 1.34925 3.4935 1.779 2.6355 2.63625C2.11125 3.1605 1.74975 3.8055 1.566 4.5H16.4333ZM1.56675 13.5C1.74975 14.1945 2.112 14.8403 2.63625 15.3638C3.49425 16.221 4.671 16.6515 5.86875 16.56C6.648 17.469 7.78725 18 9 18C10.2128 18 11.352 17.469 12.132 16.56C13.3238 16.6507 14.5065 16.2218 15.3645 15.3638C15.8888 14.8395 16.2502 14.1938 16.434 13.5H1.56675Z" fill="#FF0000"/>
</svg>
), text: "Build your brand with identity" },
  { icon: (<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.25 0.5H3.75C1.67925 0.5 0 2.17925 0 4.25V11.75C0 13.8208 1.67925 15.5 3.75 15.5H14.25C16.3207 15.5 18 13.8208 18 11.75V4.25C18 2.17925 16.3207 0.5 14.25 0.5ZM4.875 4.25C5.91075 4.25 6.75 5.08925 6.75 6.125C6.75 7.16075 5.91075 8 4.875 8C3.83925 8 3 7.16075 3 6.125C3 5.08925 3.83925 4.25 4.875 4.25ZM6.90225 11.7343C6.85125 11.7448 6.80025 11.75 6.74925 11.75C6.40125 11.75 6.08925 11.5062 6.01575 11.1522C5.907 10.6295 5.42775 10.25 4.875 10.25C4.32225 10.25 3.843 10.6295 3.73425 11.1522C3.65025 11.5572 3.25275 11.8153 2.84775 11.7343C2.442 11.6503 2.181 11.2527 2.26575 10.847C2.517 9.632 3.615 8.74925 4.875 8.74925C6.135 8.74925 7.233 9.632 7.48425 10.847C7.56825 11.2527 7.308 11.6495 6.90225 11.7343ZM13.5 11.75H10.5C10.086 11.75 9.75 11.414 9.75 11C9.75 10.586 10.086 10.25 10.5 10.25H13.5C13.914 10.25 14.25 10.586 14.25 11C14.25 11.414 13.914 11.75 13.5 11.75ZM15 8.75H10.5C10.086 8.75 9.75 8.414 9.75 8C9.75 7.586 10.086 7.25 10.5 7.25H15C15.414 7.25 15.75 7.586 15.75 8C15.75 8.414 15.414 8.75 15 8.75ZM15 5.75H10.5C10.086 5.75 9.75 5.414 9.75 5C9.75 4.586 10.086 4.25 10.5 4.25H15C15.414 4.25 15.75 4.586 15.75 5C15.75 5.414 15.414 5.75 15 5.75Z" fill="#FF0000"/>
</svg>
), text: "Secure your EIN" },
  { icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 15H9C9.39782 15 9.77936 15.158 10.0607 15.4393C10.342 15.7206 10.5 16.1022 10.5 16.5C10.5 16.8978 10.342 17.2794 10.0607 17.5607C9.77936 17.842 9.39782 18 9 18H1.5C1.10218 18 0.720644 17.842 0.43934 17.5607C0.158035 17.2794 0 16.8978 0 16.5C0 16.1022 0.158035 15.7206 0.43934 15.4393C0.720644 15.158 1.10218 15 1.5 15ZM8.814 4.28025C8.79975 4.311 8.04225 5.48025 8.04225 5.48025C8.14426 5.58638 8.21279 5.72018 8.23929 5.86498C8.2658 6.00978 8.2491 6.15918 8.19129 6.29456C8.13347 6.42993 8.0371 6.54531 7.91417 6.62629C7.79125 6.70728 7.64721 6.7503 7.5 6.75H3C2.85301 6.75002 2.70925 6.70684 2.5866 6.62583C2.46394 6.54482 2.36779 6.42955 2.3101 6.29436C2.25241 6.15916 2.23572 6.00999 2.2621 5.86538C2.28849 5.72078 2.35678 5.58711 2.4585 5.481C2.4585 5.481 1.7025 4.311 1.6875 4.28025C1.54772 3.9832 1.4852 3.65567 1.50574 3.32802C1.52628 3.00037 1.6292 2.68321 1.80497 2.40594C1.98075 2.12867 2.22368 1.90026 2.51124 1.74189C2.79881 1.58353 3.12171 1.50032 3.45 1.5H4.5075V0.75C4.5075 0.551088 4.58652 0.360322 4.72717 0.21967C4.86782 0.0790176 5.05859 0 5.2575 0C5.45641 0 5.64718 0.0790176 5.78783 0.21967C5.92848 0.360322 6.0075 0.551088 6.0075 0.75V1.5H7.05C7.37842 1.50007 7.7015 1.58309 7.98927 1.74135C8.27704 1.89961 8.52018 2.128 8.69613 2.40531C8.87207 2.68262 8.97513 2.99988 8.99574 3.32765C9.01634 3.65542 8.95383 3.98309 8.814 4.28025ZM16.5 15H11.5972C11.8611 15.4559 12 15.9733 12 16.5C12 17.0267 11.8611 17.5441 11.5972 18H16.5C16.8978 18 17.2794 17.842 17.5607 17.5607C17.842 17.2794 18 16.8978 18 16.5C18.0049 16.3017 17.9695 16.1044 17.8959 15.9202C17.8223 15.736 17.7119 15.5686 17.5717 15.4283C17.4314 15.2881 17.264 15.1777 17.0798 15.1041C16.8956 15.0305 16.6983 14.9951 16.5 15ZM8.80275 13.5C8.28738 11.7819 7.90475 10.0267 7.65825 8.25H2.84325C2.59784 10.027 2.21494 11.7822 1.698 13.5H8.80275ZM10.5 8.04825V13.5H16.5V8.04825C16.7279 7.91666 16.9172 7.72743 17.0488 7.49955C17.1805 7.27167 17.2499 7.01317 17.25 6.75V6C17.25 5.80109 17.171 5.61032 17.0303 5.46967C16.8897 5.32902 16.6989 5.25 16.5 5.25C16.3011 5.25 16.1103 5.32902 15.9697 5.46967C15.829 5.61032 15.75 5.80109 15.75 6V6.75H14.25V6C14.25 5.80109 14.171 5.61032 14.0303 5.46967C13.8897 5.32902 13.6989 5.25 13.5 5.25C13.3011 5.25 13.1103 5.32902 12.9697 5.46967C12.829 5.61032 12.75 5.80109 12.75 6V6.75H11.25V6C11.25 5.80109 11.171 5.61032 11.0303 5.46967C10.8897 5.32902 10.6989 5.25 10.5 5.25C10.3011 5.25 10.1103 5.32902 9.96967 5.46967C9.82902 5.61032 9.75 5.80109 9.75 6V6.75C9.75014 7.01317 9.81951 7.27167 9.95116 7.49955C10.0828 7.72743 10.2721 7.91666 10.5 8.04825Z" fill="#FF0000"/>
</svg>
), text: "Create a buzz with strategies" },
];


  return (

    <Box
  sx={{
    backgroundImage: `url(${bannerbackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100%',
    py: 4,
    px: { xs: 2, md: 4 }
  }}
>
  <Navbar />

  <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8, md: 12 } }}>
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }} // Stack on mobile, side-by-side on desktop
      alignItems="center"
      justifyContent="space-between"
    >
      {/* LEFT SECTION */}
      <Box
        flex={{ xs: '1 1 100%', md: '1 1 50%' }}
        pr={{ md: 4 }}
      >
       

        <Box mb={1}>
  <Box
    component="img"
    src={trustpilot}
    alt="Trustpilot"
    sx={{
      height: { xs: 14, md: 24 },
      width: { xs: 120, md: 220 },
    }}
  />
</Box>

        <Typography variant="h4" sx={{
            
            fontSize: { xs: '14px', sm: '20px', md: '32px' },
          }} fontWeight={500} mb={1}>
          Every Business Starts at <strong>Zero</strong>.
        </Typography>
        <Typography variant="h4" sx={{
            
            fontSize: { xs: '14px', sm: '20px', md: '32px' },
          }} fontWeight={500} mb={3}>
          Let’s Get You to <strong>LAUNCH</strong>.
        </Typography>

        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            mb: 4,
            color: 'black',
            fontSize: { xs: '32px', sm: '40px', md: '70px' },
          }}
        >
          #ZeroTo<span style={{
  background: "linear-gradient(to right, black, #a14d00)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block"
}}>
  Launch
</span>
        </Typography>

        {/* FEATURES */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mb={4}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              gap={1}
              px={2}
              py={1}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "999px",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* <Box
                   component="img"
                   src={feature.icon}
                   alt="icons"
                   sx={{
                     height: '18px',
                     width:  '18px',
                   }}
                 /> */}

               <Box sx={{ display: "flex", alignItems: "center" }}>  {feature.icon} </Box>
              <Typography fontSize={{ xs: 12, md: 16 }} fontWeight={500}>
                {feature.text}
              </Typography>
            </Box>
          ))}
        </Box>
      <Box
          display="flex" flexDirection={'column'}>
        <FormControl sx={{ mb: 2, width: "300px", backgroundColor: "#fff", boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)" }}>
      <InputLabel>Choose your LLC State</InputLabel>
      <Select 
        value={selectedState} 
        label="Choose your LLC State" 
        onChange={handleChange}
        disabled={isLoading}
      >
        {usStatesWithPrices.map((stateObj) => (
          <MenuItem key={stateObj.name} value={stateObj.name}>
            {stateObj.name === selectedState && packageText ? packageText : stateObj.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
         
         <Link href={packageText ? "/business-form" : '/'} style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: isLoading ? '#cccccc' : '#e70000',
            borderRadius: '50px',
            textTransform: 'none',
            fontWeight: 'bold',
            px: { xs: 2,md: 4 },
            py: { xs: 1, md: 1.5 },
            fontSize: { xs: 12, md: 18 },
            '&:hover': {
              backgroundColor: isLoading ? '#cccccc' : '#c50000',
            },
            '&:disabled': {
              backgroundColor: '#cccccc',
              color: '#666666'
            }
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={16} sx={{ color: '#666666', mr: 1 }} />
              Loading...
            </>
          ) : (
            <>
              Get Started <FaRocket style={{ marginLeft: 8 }} />
            </>
          )}
        </Button> 
        </Link>
        </Box>
      </Box>

      {/* RIGHT SECTION */}
      <Box
        flex={{ xs: '1 1 100%', md: '1 1 50%' }}
        mt={{ xs: 6, md: 0 }}
        display="flex"
        justifyContent={{ xs: 'center', md: 'flex-end' }}
      >
        <img
          src={bannerimage}
          alt="Rocket Zero"
          style={{
            maxWidth: '70%',
            height: 'auto',
          }}
        />
      </Box>
    </Box>
  </Container>
</Box>

  );
};

export default LLCForm;
