import React, { useState, useEffect } from 'react';
import { Box, Paper,IconButton , Typography, Button,Menu,MenuItem, Icon, CircularProgress } from '@mui/material';
// --- Import MUI Icons ---
// Success Icon
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// Failure/Cancel Icon
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// Button Icons
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import { FaRocket } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const PaymentSuccess = ({}) => {
    const [sessionId, setSessionId] = useState(null);
    const [state, setState] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
     const handleChange = (event) => {
      setState(event.target.value);
    };
    const navigate=useNavigate()

     

    
    useEffect(() => {
        // Retrieve the session_id from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('session_id');
        if (id) {
            setSessionId(id);
            // Here you could make an API call to your backend to verify
            // the session and get more order details if needed.
        }
    }, []);
    const menuItems = ['Home', 'Services', 'Pricing', 'Contact'];

    return (
        <>
          <Helmet>
            <title>Payment Successful | LaunchMyBiz</title>
            <meta name="description" content="Your payment was successful. Thank you for registering your business with LaunchMyBiz." />
            <meta property="og:title" content="Payment Successful | LaunchMyBiz" />
            <meta property="og:description" content="Your payment was successful. Thank you for registering your business with LaunchMyBiz." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.launchmybiz.net/success" />
            <meta property="og:image" content="https://www.launchmybiz.net/mainlogo-3-2.png" />
          </Helmet>
          <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0fdf4', // A light green background
                p: 3,
            }}
        >
       {/* Top Bar */}
     
            <Paper
                elevation={4}
                sx={{
                    p: { xs: 3, sm: 5 },
                    borderRadius: '16px',
                    textAlign: 'center',
                    maxWidth: '550px',
                    width: '100%',
                    borderTop: '5px solid',
                    borderColor: 'success.main',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                }}
            >
                <Icon sx={{ fontSize: 80, color: 'success.main', mb: 2 }}>
                    <CheckCircleOutlineIcon fontSize="inherit" />
                </Icon>

                <Typography variant="h4" component="h1" fontWeight="700" color="success.dark" gutterBottom>
                    Payment Successful!
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Thank you for your payment. Your business registration is now being processed.
                    You will receive a confirmation email shortly with all the details of your order.
                </Typography>

                {sessionId ? (
                    <Typography variant="caption" display="block" color="text.disabled" sx={{ mb: 4, fontStyle: 'italic' }}>
                        Payment Reference ID: {sessionId}
                    </Typography>
                ) : (
                    <Box sx={{ my: 4 }}>
                         <CircularProgress size={20} />
                    </Box>
                )}


                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')} // Use state to navigate to home
                    sx={{
                        textTransform: 'none',
                        fontWeight: '600',
                        borderRadius: '8px',
                        px: 4,
                        py: 1.5,
                    }}
                >
                    Return to Homepage
                </Button>
            </Paper>
        </Box>
      </>
    );
};


// --- Failure/Cancel Page Component ---
export const PaymentCancel = ({ setPath }) => {
    return (
        <>
          <Helmet>
            <title>Payment Canceled | LaunchMyBiz</title>
            <meta name="description" content="Your payment was canceled. Please try again to complete your business registration." />
            <meta property="og:title" content="Payment Canceled | LaunchMyBiz" />
            <meta property="og:description" content="Your payment was canceled. Please try again to complete your business registration." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.launchmybiz.net/cancel" />
            <meta property="og:image" content="https://www.launchmybiz.net/mainlogo-3-2.png" />
          </Helmet>
          <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#fef2f2', // A light red background
                p: 3,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: { xs: 3, sm: 5 },
                    borderRadius: '16px',
                    textAlign: 'center',
                    maxWidth: '550px',
                    width: '100%',
                    borderTop: '5px solid',
                    borderColor: 'error.main',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                }}
            >
                <Icon sx={{ fontSize: 80, color: 'error.main', mb: 2 }}>
                    <HighlightOffIcon fontSize="inherit" />
                </Icon>

                <Typography variant="h4" component="h1" fontWeight="700" color="error.dark" gutterBottom>
                    Payment Canceled
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Your payment was not processed. You have not been charged.
                    You can go back and try again if something went wrong.
                </Typography>

                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<ReplayIcon />}
                    onClick={() => setPath('/')} // Use state to navigate to home/form
                    sx={{
                        textTransform: 'none',
                        fontWeight: '600',
                        borderRadius: '8px',
                        px: 4,
                        py: 1.5,
                    }}
                >
                    Try Again
                </Button>
            </Paper>
        </Box>
      </>
    );
};

