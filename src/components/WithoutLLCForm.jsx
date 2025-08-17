"use client";
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Paper,
    Backdrop,
    CircularProgress,
    Container
} from '@mui/material';
import { Formik, Form } from 'formik';
import { loadStripe } from '@stripe/stripe-js';

import api from '../lib/apiClient';
import { useAuth } from '../lib/AuthContext';
import useFormPersistence from '../hooks/useFormPersistence';
import ContactInformationTab from './forms/ContactInformationTab';
import { withoutLLCValidationSchema } from '../utils/withoutLLCValidation';
import { getWithoutLLCInitialValues } from '../utils/withoutLLCInitialValues';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Footer from './Footer';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const WithoutLLCForm = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();


    // Get package type from URL state
    const packageType = location.state?.packageType || 'Premium';

    // Use custom hook for form persistence
    const {
        data: savedFormValues,
        cleanData: cleanFormData,
        isLoading: isFormLoading,
        saveData: saveFormData,
        clearData: clearFormData,
        updateData: updateFormData,
        isDataRecent,
        hasData: hasSavedData
    } = useFormPersistence('withoutLLCFormData');

    // Check authentication status on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        setIsAuthenticated(!!token);
        
        // Load saved form data if returning from sign-in
        if (hasSavedData && !isFormLoading) {
            // Check if we're returning from login by looking for a recent timestamp
            const wasRecentlySaved = isDataRecent(1); // Within 1 minute
            if (wasRecentlySaved && token) {
                // We just returned from login, show success message
                setShowLoginSuccess(true);
                setTimeout(() => setShowLoginSuccess(false), 5000);
            }
        }
    }, [hasSavedData, isFormLoading, isDataRecent]);

    // Check if we're returning from login
    useEffect(() => {
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        const token = localStorage.getItem('token');
        
        if (redirectPath === '/business-form/without-LLC' && token && hasSavedData) {
            // We just returned from login, show success message
            setShowLoginSuccess(true);
            setTimeout(() => setShowLoginSuccess(false), 5000);
            
            // Clear the redirect path since we've handled it
            localStorage.removeItem('redirectAfterLogin');
        }
    }, [hasSavedData]);

    // Add another useEffect to restore form data when authentication changes
    useEffect(() => {
        if (isAuthenticated && hasSavedData && !isFormLoading) {
            // Restore form data when user is authenticated
        }
    }, [isAuthenticated, hasSavedData, isFormLoading, savedFormValues]);

    // Cleanup effect to clear redirect path when component unmounts
    useEffect(() => {
        return () => {
            // Only clear redirect path if we're not in the middle of a redirect
            if (localStorage.getItem('redirectAfterLogin') === '/business-form/without-LLC') {
                // Keep it for the redirect
            } else {
                localStorage.removeItem('redirectAfterLogin');
            }
        };
    }, []);

    // Fetch plan data on component mount
    useEffect(() => {
        const fetchPlanData = async () => {
            try {
                // Load plans and filter based on package type
                const response = await api.get("/api/packages");
                setPlans(response.data);
                
                // Filter plan based on package type (Premium or Platinum)
                const filteredPlan = response.data.find(plan => 
                    plan.title.toLowerCase() === packageType.toLowerCase()
                );
                
                if (filteredPlan) {
                    setSelectedPlan(filteredPlan);
                   
                } else {
                    console.error('Plan not found for package type:', packageType);
                 
                }
            } catch (error) {
                console.error('Error fetching plans:', error);
               // toast.error('Error loading package plans');
            }
        };

        fetchPlanData();
    }, [packageType]);

    const handleSignIn = (values) => {
        // Save current form data before redirecting
        saveFormData(values);
        
        // Store the intended destination for after login
        localStorage.setItem('redirectAfterLogin', '/business-form/without-LLC');
        
        // Navigate to sign-in page
        navigate('/signin');
    };

    // Clear saved form data after successful submission
    const clearSavedFormData = () => {
        clearFormData();
        localStorage.removeItem('redirectAfterLogin'); // Also clear redirect path
        setShowLoginSuccess(false);
    };

    const handlePayment = async (values) => {
        if (isPaymentProcessing) {
         
            return;
        }
        
        if (!selectedPlan) {
            toast.error('Please wait for package data to load');
            return;
        }
        
        setIsPaymentProcessing(true);
        
        try {
            // Prepare the data to send
            const ResponsibleParty = {
                firstName: values.firstName,
                middleName: values.middleName,
                lastName: values.lastName,
                title: values.title,
                email: values.email,
                phone: values.phone,
                hasSSN: values.hasSSN,
                ssn: values.ssn
            };

            const contactData = {
                contactEmail: "ray@launchmybiz.net",
                contactFirstName: "Ray",
                contactLastName: "Jones",
                contactPhone: "561-856-8593",
                contactEveningPhone: "561-856-8593"
            };

            const paymentData = {
                contactData,
                ResponsibleParty,
                packageType,
                selectedPlan,
                userId: user?.id,
                isWithoutLLC: true
            };

           

            // Call the payment API
            const response = await api.post('/api/without-llc-payment', paymentData);
            
            if (response.status === 200) {
                // Handle successful payment
                toast.success('Payment processed successfully!');
                clearSavedFormData(); // Clear saved form data
                navigate('/user/dashboard/orders'); // Redirect to home page
            } else {
                toast.error('Payment failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment failed. Please try again.');
        } finally {
            setIsPaymentProcessing(false);
        }
    };

    const handleFormSubmit = async (values) => {
      
        
        if (!isAuthenticated) {
            return; // Should not reach here due to button being disabled
        }
        
        setIsSubmitting(true);
        
        try {
            // Clear any previous messages
            setSubmitError('');
            
            // Call payment function
            await handlePayment(values);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Better error handling
            let errorMessage = 'Error submitting form. Please try again.';
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const initialValues = getWithoutLLCInitialValues();
    
   

    return (
        <>
        <Box sx={{ backgroundColor: '#fdebd8', pt: 2, }}>
            <Navbar />
            <Box sx={{ 
                minHeight: '100vh', 
              
                pt: 2,
                pb: 4
            }}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isFormLoading || !initialValues}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Container maxWidth="lg">
                    <Paper elevation={3} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: { xs: 4, sm: 3, md: 4, lg: 5 }, borderRadius: 3, backgroundColor: '#ffffff' }}>
                    <Typography variant="h4" align="center" gutterBottom fontWeight="700" sx={{ mb: 4, color: '#111827', fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' } }}>
                        {packageType} Package
                    </Typography>
                    
                    <Typography variant="body1" align="center" sx={{ mb: 4, color: '#6b7280', fontSize: { xs: '14px', sm: '18px', md: '20px', lg: '20px' } }}>
                        Please provide your contact information to proceed with your {packageType} package (without LLC formation).
                    </Typography>

                    {/* Plan Information Display */}
                    {selectedPlan && (
                        <Box sx={{ mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#1e293b', fontWeight: 600 }}>
                                Selected Package : <span style={{ fontWeight: 'bold', color: '#ff3902', fontSize: '20px' }}>{selectedPlan.title}</span>
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: '16px' }}>
                                <strong>Package Cost : </strong> <span style={{ fontWeight: 'bold', color: '#ff3902', fontSize: '20px' }}>${selectedPlan.extraCharge || 0}</span>
                            </Typography>
                            {selectedPlan.description && (
                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    <strong>Description:</strong> {selectedPlan.description}
                                </Typography>
                            )}
                        </Box>
                    )}

                    {showLoginSuccess && (
                        <Box sx={{ 
                            backgroundColor: '#d1fae5', 
                            color: '#065f46', 
                            p: 2, 
                            borderRadius: 2, 
                            mb: 3,
                            textAlign: 'center'
                        }}>
                            <Typography variant="body1" fontWeight="500">
                                Welcome back! You can now proceed with your submission.
                            </Typography>
                        </Box>
                    )}

                    {submitError && (
                        <Box sx={{ 
                            backgroundColor: '#fee2e2', 
                            color: '#991b1b', 
                            p: 2, 
                            borderRadius: 2, 
                            mb: 3,
                            textAlign: 'center'
                        }}>
                            <Typography variant="body1" fontWeight="500">
                                {submitError}
                            </Typography>
                        </Box>
                    )}

                    <Formik
                        initialValues={hasSavedData && !isFormLoading && cleanFormData ? cleanFormData : initialValues}
                        validationSchema={withoutLLCValidationSchema}
                        onSubmit={handleFormSubmit}
                        enableReinitialize={true}
                        validateOnMount={false}
                        validateOnChange={true}
                        validateOnBlur={true}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldTouched, isValid, dirty }) => {
                         
                            return (
                                <Form>
                                    <ContactInformationTab 
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        isAuthenticated={isAuthenticated}
                                        user={user}
                                    />

                                    

                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                            {!isAuthenticated ? (
                                                <>
                                                    <Typography variant="body1" color="error" sx={{ textAlign: 'center', fontWeight: 500 }}>
                                                        You need to login first to proceed
                                                    </Typography>
                                                    <Button 
                                                        variant="contained" 
                                                        onClick={() => handleSignIn(values)}
                                                        sx={{ 
                                                            textTransform: 'none',
                                                            fontWeight: 600,
                                                            borderRadius: '8px',
                                                            px: 4,
                                                            py: 1.5,
                                                            bgcolor: '#1d4ed8',
                                                            '&:hover': { bgcolor: '#1e40af' }
                                                        }}
                                                    >
                                                        Sign In
                                                    </Button>
                                                </>
                                            ) : (
                                              <Button 
                                                type="submit" 
                                                variant="contained" 
                                                disabled={isSubmitting || isPaymentProcessing || !selectedPlan || !isValid || !dirty}
                                                sx={{ 
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    borderRadius: '8px',
                                                    px: 4,
                                                    py: 1.5,
                                                    bgcolor: '#ff3902',
                                                    '&:hover': { bgcolor: '#e02810' },
                                                    '&:disabled': {
                                                        backgroundColor: '#e5e7eb',
                                                        color: '#9ca3af'
                                                    }
                                                }}
                                            >
                                                {isSubmitting || isPaymentProcessing ? 'Processing...' : 
                                                 !selectedPlan ? 'Loading Plan...' : 'Pay Now'}
                                            </Button>
                                            )}
                                        </Box>
                                    </Box>
                                </Form>
                            );
                        }}
                    </Formik>
                </Paper>
            </Container>
        </Box>
        <Footer />
        </Box>
        </>
    );
};

export default WithoutLLCForm; 