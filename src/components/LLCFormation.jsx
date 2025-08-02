import React from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import peopleImage from '../assets/250936DD-8DE7-40AB-A9AA-D96A2AACFF7C.jpeg.jpg';

const steps = [
  { number: 1, text: 'Select your State' },
  { number: 2, text: 'Submit your business details' },
  { number: 3, text: 'Let our experts handle the rest!' }
];

const LLCForm = () => {
  const [state, setState] = React.useState('');
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    setState(event.target.value);
  };
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
  
  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
  ];
  
  return (
    <Box sx={{ background: 'linear-gradient(#fce8d3, #fff)', minHeight: '100%', p: 4 }}>
      <Navbar />

      {/* Main Content */}
      <Grid container spacing={4} mt={4} alignItems="center" justifyContent="center">
        {/* Left Image */}
        <Grid item xs={12} md={5}>
          <img
            src={peopleImage}
            alt="People"
            style={{ maxWidth: '90%', borderRadius: 10, maxHeight: '60%' }}
            loading="lazy"
          />
        </Grid>

        {/* Right Form */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
          Just 3 Steps to <span style={{color: 'red'}}>LAUNCH</span> 
          </Typography>

          {steps.map((step) => (
            <Paper key={step.number} elevation={2} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  fontWeight: 'bold'
                }}
              >
                {step.number}
              </Box>
              <Typography>{step.text}</Typography>
            </Paper>
          ))}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Step 1: Choose your LLC State</InputLabel>
          <Select
            value={state}
            label="Choose your LLC State"
            onChange={handleChange}
          >
            {usStatesWithPrices.map((stateName) => (
              <MenuItem key={stateName} value={stateName.label}>
                {stateName.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              if (state) {
                navigate('/business-form');
              }
            }}
            sx={{
              backgroundColor: 'red',
              color: '#fff',
              borderRadius: '15px',
              px: 4,
              '&:hover': { backgroundColor: '#cc0000' },
              width: '100%'
            }}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LLCForm;
