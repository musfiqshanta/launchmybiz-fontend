import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      bgcolor: '#f3f4f6', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      py: 4
    }}>
      <Paper 
        elevation={3}
        sx={{ 
          maxWidth: 500, 
          width: '100%', 
          mx: 'auto', 
          p: 4, 
          textAlign: 'center',
          borderRadius: '16px',
          boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <CheckCircleOutlineIcon 
          sx={{ 
            fontSize: 80, 
            color: '#10B981',
            mb: 2
          }} 
        />
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: '#111827',
            mb: 2
          }}
        >
          Payment Successful!
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#4B5563',
            mb: 4,
            fontSize: '1.1rem'
          }}
        >
          Thank you for your payment. Your LLC formation process has been initiated. We will contact you shortly with the next steps.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            bgcolor: '#1d4ed8',
            color: 'white',
            textTransform: 'none',
            fontWeight: '600',
            padding: '12px 36px',
            borderRadius: '10px',
            fontSize: '1rem',
            '&:hover': {
              bgcolor: '#1e40af',
              boxShadow: '0 4px 12px rgba(29, 78, 216, 0.2)',
            }
          }}
        >
          Return to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentSuccess; 