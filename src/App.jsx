import { Suspense} from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

import './App.css';
import HomePage from './Screens/HomePage.jsx';
import {PaymentCancel,PaymentSuccess} from './components/StripePaymentInfro.jsx'
// const LazyBusinessForm = lazy(() => import('./Screens/BusinessForm.jsx'));
import Footer from './components/Footer.jsx'
import { CircularProgress, Box ,Typography,Button} from '@mui/material';
import AdminRoute from './lib/AdminRoute.jsx';
import AdminLogin from '../src/components/AdminLoginPage.jsx'
import AdminPanle from './components/AdminPanel.jsx';
import BusinessForm from './Screens/BusinessForm.jsx'
import WithoutLLCForm from './components/WithoutLLCForm.jsx'
import SignInPage from './Screens/Signin.jsx';
import SignupPage from './Screens/SignUp.jsx';
import ResponsiveDashboardLayout from './Screens/DashboardLayout.jsx';
import Profile from './components/Profile.jsx';
import Orders from './components/Orders.jsx';
import UserRoute from './lib/UserRoute.jsx';
import DashboardOverview from './components/DashboardOverview.jsx';
import { AuthProvider } from './lib/AuthContext.jsx';
 
function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h2" color="error" fontWeight="bold" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = '/')}
        sx={{ borderRadius: 3, px: 4 }}
      >
        Go to Home
      </Button>
    </Box>
  );
}

const Loader = () => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<UserRoute />}>
        <Route path="/user/dashboard" element={<ResponsiveDashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Route>
      <Route
        path="/business-form"
        element={
          <Suspense fallback={<Loader />}>
            <BusinessForm />
          </Suspense>
        }
      />

      <Route
        path="/business-form/without-LLC"
        element={
          <Suspense fallback={<Loader />}>
            <WithoutLLCForm />
          </Suspense>
        }
      />

      <Route
        path="/success"
        element={
          <Suspense fallback={<Loader />}>
            <>
              <PaymentSuccess />
              <Footer />
            </>
          </Suspense>
        }
      />

      <Route
        path="/cancel"
        element={
          <Suspense fallback={<Loader />}>
            <>
              <PaymentCancel />
              <Footer />
            </>
          </Suspense>
        }
      />

      <Route path="/admin-login" element={<AdminLogin />} />

      <Route element={<AdminRoute />}>
        <Route path="/admin-panel" element={<AdminPanle />} />
      </Route>

       
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Helmet>
        <title>LaunchMyBiz | Fast & Easy LLC Formation Online</title>
        <meta name="description" content="Form your LLC quickly and easily online with LaunchMyBiz. Get expert help, affordable packages, and everything you need to start your business." />
        <meta property="og:title" content="LaunchMyBiz | Fast & Easy LLC Formation Online" />
        <meta property="og:description" content="Form your LLC quickly and easily online with LaunchMyBiz. Get expert help, affordable packages, and everything you need to start your business." />
        <meta property="og:type" content="website" />
    
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
