import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
// Make sure to place your downloaded Lottie JSON file in this path
import loginAnimation from '../animations/Animation - 1750354378942.json'; 

// A simple animation for the form elements to fade in
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://your-website.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    setLoading(true);

    try {
      const res = await axios.post(
        'https://lauchbackend-896056687002.europe-west1.run.app/api/admin/signin',
        { email, password },
        { withCredentials: true } 
      );

      
      if (res.data.token) {
        const expires = new Date(Date.now() + 86400 * 1000).toUTCString();
        document.cookie = `token=${res.data.token}; expires=${expires}; path=/; SameSite=Strict`;
      }
    console.log(res.data.token,'res.data.token')
      toast.success('Login successful!');
      navigate('/admin-panel');
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box component="main" sx={{ display: 'flex', height: '100vh' }}>
      {/* Lottie Animation Panel */}
      <Box
        sx={{
          flex: '1 1 58.333333%',
          display: { xs: 'none', sm: 'flex' },  
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          borderRight: `1px solid ${theme.palette.divider}`,
          p: 4,  
        }}
      >
        <Lottie animationData={loginAnimation} loop={true} style={{ maxWidth: '600px' }} />
      </Box>

      
      <Box
        component={Paper}
        elevation={6}
        square
        sx={{
          flex: { sm: '1 1 66.666667%', md: '1 1 41.666667%' },
          width: { xs: '100%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <LockOutlinedIcon />
            </Avatar>
          </motion.div>
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
              Admin Panel
            </Typography>
          </motion.div>
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Welcome back! Please sign in to continue.
            </Typography>
          </motion.div>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </motion.div>
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </motion.div>
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2, boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)' }}
              >
                Sign In
              </Button>
            </motion.div>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}