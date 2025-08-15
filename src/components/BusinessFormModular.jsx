"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Paper
} from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import { loadStripe } from '@stripe/stripe-js';

import api from '../lib/apiClient';
import PackageSelectionForm from './PackageSelectionForm';
import { useAuth } from '../lib/AuthContext';
import useFormPersistence from '../hooks/useFormPersistence';

// Import modular components
import BusinessFormTabs from './forms/BusinessFormTabs';
import CompanyInformationTab from './forms/CompanyInformationTab';
import ContactInformationTab from './forms/ContactInformationTab';

// Import utilities
import { validationSchema } from '../utils/formValidation';
import { isCurrentTabComplete, getTabFields, transformFormData, getInitialValues } from '../utils/formHelpers';
import { textFieldStyles, formLabelStyles, states, countries } from '../utils/formConstants';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BusinessFormModular = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [completedTabs, setCompletedTabs] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    
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
    } = useFormPersistence('businessFormData');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [showPackageSelection, setShowPackageSelection] = useState(false);
    const [packageData, setPackageData] = useState(null);
    const [businessFormValues, setBusinessFormValues] = useState(null);
    const [finalData, setFinalData] = useState(null);

    // Check authentication status on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        
        setIsAuthenticated(!!token);
        
        // Load saved form data if returning from sign-in
        if (hasSavedData && !isFormLoading) {
            // Set the form data back to the form
            if (savedFormValues?.activeTab !== undefined) {
                setActiveTab(savedFormValues.activeTab);
            }
            if (savedFormValues?.completedTabs !== undefined) {
                setCompletedTabs(savedFormValues.completedTabs);
            }
            
            // Check if we're returning from login by looking for a recent timestamp
            const wasRecentlySaved = isDataRecent(1); // Within 1 minute
            if (wasRecentlySaved && token) {
                // We just returned from login, show success message
                setShowLoginSuccess(true);
                setTimeout(() => setShowLoginSuccess(false), 5000);
            }
        }
    }, [hasSavedData, isFormLoading, savedFormValues, isDataRecent]);

    // Add another useEffect to restore form data when authentication changes
    useEffect(() => {
        if (isAuthenticated && hasSavedData && !isFormLoading) {
            // Restore form data when user is authenticated
            if (savedFormValues?.activeTab !== undefined) {
                setActiveTab(savedFormValues.activeTab);
            }
            if (savedFormValues?.completedTabs !== undefined) {
                setCompletedTabs(savedFormValues.completedTabs);
            }
            
            // Check if we're returning from login by looking for a recent timestamp
            const wasRecentlySaved = isDataRecent(1); // Within 1 minute
            if (wasRecentlySaved) {
                // This means we just returned from login, show success message
                setShowLoginSuccess(true);
                setTimeout(() => setShowLoginSuccess(false), 5000);
            }
        }
    }, [isAuthenticated, hasSavedData, isFormLoading, savedFormValues, isDataRecent]);

    // Save form data using the custom hook
    const saveFormDataToStorage = (values) => {
        const formDataToSave = {
            ...values,
            activeTab,
            completedTabs
        };
        saveFormData(formDataToSave);
    };

    // Handle sign-in redirect
    const handleSignIn = (values) => {
        // Save current form data and page info before redirecting
        saveFormDataToStorage(values);
        // Store the intended destination for after login
        localStorage.setItem('redirectAfterLogin', '/business-form');
        navigate('/signin');
    };

    // Clear saved form data after successful submission
    const clearSavedFormData = () => {
        clearFormData();
        localStorage.removeItem('redirectAfterLogin'); // Also clear redirect path
        setShowLoginSuccess(false);
    };

    // Cleanup effect to clear redirect path when component unmounts
    useEffect(() => {
        return () => {
            // Only clear redirect path if we're not in the middle of a redirect
            if (localStorage.getItem('redirectAfterLogin') === '/business-form') {
                // Keep it for the redirect
            } else {
                localStorage.removeItem('redirectAfterLogin');
            }
        };
    }, []);

    const initialValues = getInitialValues(user, cleanFormData);

    // Merge saved values with defaults to ensure all fields are present
    const mergedInitialValues = useMemo(() => {
        const merged = {
            ...initialValues,
            ...cleanFormData
        };
        
        // If user is logged in, always use their email
        if (user?.email) {
            merged.email = user.email;
        }
        
        return merged;
    }, [initialValues, cleanFormData, user?.email]);

    const handleFormSubmit = async (values) => {
        if (!isAuthenticated) {
            return; // Should not reach here due to button being disabled
        }
        
        setIsSubmitting(true);
        
        try {
            // Clear any previous messages
            setSubmitError('');

            // Transform the data to match the required backend format
            const transformedData = transformFormData(values);
            
            // Prepare the parameters for the API call
            const params = {
                entityType: values.entityType,
                state: values.state,
                filing: values.filingSpeed
            };
            
            // Make the API call to your backend using the API client
            const response = await api.get('/api/business-formation-package', { params });
            
            // Store the package data and business form values, then show package selection form
            setPackageData(response.data.data);
            setBusinessFormValues(transformedData);
            setShowPackageSelection(true);
            
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

    const handlePackageSelect = async (packageData) => {
        try {
            console.log('Package selection handler called with:', packageData);
            console.log('Business form data:', businessFormValues);
            
            // Extract packageInfo and selectedPlan from the received data
            const { selectedPlan, ...packageInfo } = packageData;
            
            // Calculate total price similar to getTotalPrice function
            const completePrice = Number(packageInfo.totalPrice.replace(/[^0-9.-]+/g, ""));
            const totalPrice = (completePrice + (selectedPlan.extraCharge || 0)).toFixed(2);
            
            // Create final transformed data that includes both business form data and selected package
            const finalTransformedData = {
                ...businessFormValues,
                orderTotalPrice: `$${totalPrice}`,
                SelectedPackage: {
                    SelectedPlan: {
                        ...packageInfo,
                        selectedPlan
                    }
                }
            };
            
            console.log('Final transformed data with package:', finalTransformedData);
            setFinalData(finalTransformedData);
            console.log(finalData);
            
            // For now, just show a success message
            alert(`Package "${packageInfo.name}" selected successfully! Total: $${totalPrice}`);
            
        } catch (error) {
            console.error('Error saving package selection:', error);
            alert('Error saving package selection. Please try again.');
        }
    };

    const handlePackageCancel = () => {
        // Hide package selection and show business form again
        setShowPackageSelection(false);
        setPackageData(null);
        
        // Restore the business form data so user can continue editing
        if (businessFormValues) {
            setBusinessFormValues(null);
        }
    };

    const handlePayment = async () => {
        try {
            console.log('Final data:', finalData);
            // Send the full data to backend
            const res = await fetch("http://localhost:5001/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload: finalData}),
            });
    
            const { id: sessionId } = await res.json();
    
            // Step 2: Redirect to Stripe Checkout
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId });
        } catch (err) {
            console.error("Payment error:", err);
            alert("Payment failed. Please try again.");
        }
    };

    const handleNext = (errors, values, touched, setTouched) => {
        // Clear any error messages when navigating
        setSubmitError('');
        
        const tabFields = getTabFields();

        const newTouched = { ...touched };
        tabFields[activeTab].forEach(field => {
            if (field === 'participants') {
                newTouched.participants = values.participants.map(() => ({
                    firstName: true,
                    lastName: true,
                    address: true,
                    address2: true,
                    city: true,
                    state: true,
                    country: true,
                    zipCode: true,
                    ownership: true,
                    Contributed: true,
                    ContributerMarketValue: true
                }));
            } else {
                newTouched[field] = true;
            }
        });
        setTouched(newTouched);

        const hasErrors = tabFields[activeTab].some(field => {
            if (field === 'participants') {
                return errors.participants;
            }
            return errors[field];
        });

        if (!hasErrors && isCurrentTabComplete(activeTab, values)) {
            // persist values before moving
            saveFormDataToStorage(values);
            if (!completedTabs.includes(activeTab)) {
                setCompletedTabs([...completedTabs, activeTab]);
            }
            setActiveTab(activeTab + 1);
        }
    };

    const handleBack = (values) => {
        // Clear any error messages when navigating
        setSubmitError('');
        
        // persist values on back as well
        saveFormDataToStorage(values);
        setActiveTab(activeTab - 1);
    };

    // If package selection should be shown, render the package selection form
    if (showPackageSelection && packageData) {
        return (
            <PackageSelectionForm
                packageData={packageData}
                onPackageSelect={handlePackageSelect}
                onCancel={handlePackageCancel}
                handlePayment={handlePayment}
            />
        );
    }

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '80vh',
            p: 4
        }}>
            <Paper elevation={3} sx={{ 
                maxWidth: 1200, 
                width: '100%', 
                mx: 'auto', 
                p: 4, 
                bgcolor: '#ffffff', 
                borderRadius: '16px', 
                boxShadow: '0 12px 30px -8px rgba(0,0,0,0.1)' 
            }}>
                <Typography variant="h4" align="center" gutterBottom fontWeight="700" sx={{ mb: 4, color: '#111827' }}>
                    Submit Your Business Details
                </Typography>
                
                {showLoginSuccess && (
                    <Box sx={{ 
                        mb: 3, 
                        p: 2, 
                        bgcolor: '#d1fae5', 
                        border: '1px solid #10b981', 
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <Typography variant="body1" sx={{ color: '#065f46', fontWeight: 500, mb: 1 }}>
                            ✅ Welcome back! Your form data has been restored from where you left off.
                        </Typography>
                    </Box>
                )}
                
                {submitError && (
                    <Box sx={{ 
                        mb: 3, 
                        p: 2, 
                        bgcolor: '#fee2e2', 
                        border: '1px solid #ef4444', 
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <Typography variant="body1" sx={{ color: '#991b1b', fontWeight: 500, mb: 1 }}>
                            ❌ {submitError}
                        </Typography>
                    </Box>
                )}
                
                <BusinessFormTabs 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    completedTabs={completedTabs}
                    setSubmitError={setSubmitError}
                />
                
                <Formik 
                    key={cleanFormData ? 'restored' : 'new'}
                    initialValues={mergedInitialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={handleFormSubmit}
                    enableReinitialize={true}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldTouched }) => (
                        <Form>
                            {activeTab === 0 && (
                                <CompanyInformationTab 
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                            )}
                            
                            {activeTab === 1 && (
                                <ContactInformationTab 
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    isAuthenticated={isAuthenticated}
                                    user={user}
                                />
                            )}
                            
                            {/* TODO: Add other tab components */}
                            {activeTab === 2 && (
                                <Box>
                                    <Typography variant="h6">Business Address Tab - To be implemented</Typography>
                                </Box>
                            )}
                            
                            {activeTab === 3 && (
                                <Box>
                                    <Typography variant="h6">Participants Tab - To be implemented</Typography>
                                </Box>
                            )}
                            
                            {activeTab === 4 && (
                                <Box>
                                    <Typography variant="h6">Other Information Tab - To be implemented</Typography>
                                </Box>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 4 }}>
                                <Button 
                                    variant="outlined" 
                                    onClick={() => handleBack(values)}
                                    disabled={activeTab === 0}
                                    sx={{ 
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        height: '50px',
                                        borderRadius: '8px',
                                        fontSize: '20px',
                                        px: 4,
                                        py: 1.5
                                    }}
                                >
                                    Back
                                </Button>
                                
                                {activeTab < 4 ? (
                                    <Button 
                                        variant="contained" 
                                        onClick={() => handleNext(errors, values, touched, setFieldTouched)}
                                        disabled={!isCurrentTabComplete(activeTab, values)}
                                        sx={{ 
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            borderRadius: '8px',
                                            px: 4,
                                            py: 1.5,
                                            bgcolor: '#ff3902ff',
                                            '&:hover': { bgcolor: '#ff0000ff' },
                                            '&:disabled': {
                                                backgroundColor: '#e5e7eb',
                                                color: '#9ca3af'
                                            }
                                        }}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                        {!isAuthenticated ? (
                                            <>
                                                <Typography variant="body1" color="error" sx={{ textAlign: 'center', fontWeight: 500 }}>
                                                    You need to login first to submit form
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
                                                disabled={isSubmitting}
                                                sx={{ 
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    borderRadius: '8px',
                                                    px: 4,
                                                    py: 1.5,
                                                    bgcolor: '#e02810ff',
                                                    '&:hover': { bgcolor: '#fc0202ff' },
                                                    '&:disabled': {
                                                        backgroundColor: '#e5e7eb',
                                                        color: '#9ca3af'
                                                    }
                                                }}
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit'}
                                            </Button>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default BusinessFormModular; 