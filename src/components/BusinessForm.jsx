"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Typography,
    Paper,
    Divider,
    FormLabel,
    InputAdornment,
    FormControl,
    Select,
    Tabs,
    Tab,
    Grid,
    Checkbox,
    FormControlLabel,
    IconButton
} from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PercentIcon from '@mui/icons-material/Percent';
import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";


const categories = ['Automobile', 'Technology', 'Retail', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Other'];
const states = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT',
    'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN',
    'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD', 'Massachusetts': 'MA',
    'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
    'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND',
    'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA',
    'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
};

const stateOptions = Object.keys(states);
const participantTitles = ['Member', 'Manager', 'President', 'Secretary', 'Treasurer'];

const validationSchema = Yup.object().shape({
    companyName: Yup.string().trim().required('Company name is required'),
    companyAltName: Yup.string().trim().required('Alternative name is required'),
    category: Yup.string().required('Business category is required'),
    description: Yup.string().required('Business description is required'),
    firstName: Yup.string().trim().required('First name is required'),
    lastName: Yup.string().trim().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits').required('Phone is required'),
    address: Yup.string().trim().required('Address is required'),
    city: Yup.string().trim().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid zip code').required('Zip code is required'),
    participants: Yup.array().of(
        Yup.object().shape({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            titles: Yup.array().min(1, 'At least one title is required'),
            address: Yup.string().required('Address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid zip code').required('Zip code is required'),
            ownership: Yup.number().required('Ownership % is required').min(0, 'Cannot be negative').max(100, 'Cannot exceed 100'),
            isSigner: Yup.boolean()
        })
    ).min(1, 'At least one participant is required'),
    filingSpeed: Yup.string().required('Filing speed is required'),
    registeredAgentChoice: Yup.string().required('Registered agent choice is required')
});

const BusinessForm = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [completedTabs, setCompletedTabs] = useState([]);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [savedFormValues, setSavedFormValues] = useState(null);
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);

    // Check authentication status on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedFormData = localStorage.getItem('businessFormData');
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        
        console.log('Component mount - Token:', !!token, 'Saved data:', !!savedFormData, 'Redirect path:', redirectPath); // Debug log
        
        setIsAuthenticated(!!token);
        
        // Load saved form data if returning from sign-in
        if (savedFormData) {
            try {
                const parsedData = JSON.parse(savedFormData);
                console.log('Restoring form data on mount:', parsedData); // Debug log
                setSavedFormValues(parsedData);
                // Set the form data back to the form
                if (parsedData.activeTab !== undefined) {
                    setActiveTab(parsedData.activeTab);
                }
                if (parsedData.completedTabs !== undefined) {
                    setCompletedTabs(parsedData.completedTabs);
                }
                
                // Check if we're returning from login by looking for a recent timestamp
                const wasRecentlySaved = parsedData.timestamp && (Date.now() - parsedData.timestamp) < 60000; // Within 1 minute
                if (wasRecentlySaved && token) {
                    // We just returned from login, show success message
                    setShowLoginSuccess(true);
                    setTimeout(() => setShowLoginSuccess(false), 1000);
                }
            } catch (error) {
                console.error('Error parsing saved form data:', error);
            }
        }
    }, []);

    // Add another useEffect to restore form data when authentication changes
    useEffect(() => {
        if (isAuthenticated) {
            const savedFormData = localStorage.getItem('businessFormData');
            if (savedFormData) {
                try {
                    const parsedData = JSON.parse(savedFormData);
                    console.log('Restoring form data on auth change:', parsedData); // Debug log
                    setSavedFormValues(parsedData);
                    // Restore form data when user is authenticated
                    if (parsedData.activeTab !== undefined) {
                        setActiveTab(parsedData.activeTab);
                    }
                    if (parsedData.completedTabs !== undefined) {
                        setCompletedTabs(parsedData.completedTabs);
                    }
                    
                    // Check if we're returning from login by looking for a recent timestamp
                    const wasRecentlySaved = parsedData.timestamp && (Date.now() - parsedData.timestamp) < 60000; // Within 1 minute
                    if (wasRecentlySaved) {
                        // This means we just returned from login, show success message
                        setShowLoginSuccess(true);
                        setTimeout(() => setShowLoginSuccess(false), 5000);
                    }
                } catch (error) {
                    console.error('Error parsing saved form data:', error);
                }
            }
        }
    }, [isAuthenticated]);

    // Save form data to localStorage when form values change
    const saveFormData = (values) => {
        const formDataToSave = {
            ...values,
            activeTab,
            completedTabs,
            timestamp: Date.now() // Add timestamp to track when data was saved
        };
        localStorage.setItem('businessFormData', JSON.stringify(formDataToSave));
        console.log('Form data saved:', formDataToSave); // Debug log
    };

    // Handle sign-in redirect
    const handleSignIn = (values) => {
        console.log('Sign In clicked with values:', values); // Debug log
        // Save current form data and page info before redirecting
        saveFormData(values);
        // Store the intended destination for after login
        localStorage.setItem('redirectAfterLogin', '/business-form');
        console.log('Redirecting to login, data saved and redirect path set'); // Debug log
        navigate('/signin');
    };

    // Clear saved form data after successful submission
    const clearSavedFormData = () => {
        localStorage.removeItem('businessFormData');
        localStorage.removeItem('redirectAfterLogin'); // Also clear redirect path
        setSavedFormValues(null);
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

    const initialValues = savedFormValues || {
        companyName: '',
        companyAltName: '',
        category: '',
        description: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        participants: [{
            firstName: '',
            lastName: '',
            titles: [],
            address: '',
            city: '',
            state: '',
            zipCode: '',
            ownership: '',
            isSigner: false
        }],
        filingSpeed: 'standard',
        registeredAgentChoice: 'corpnet'
    };

    // Merge saved values with defaults to ensure all fields are present
    const mergedInitialValues = useMemo(() => {
        return {
            ...initialValues,
            ...savedFormValues
        };
    }, [initialValues, savedFormValues]);

    const handleFormSubmit = (values) => {
        if (!isAuthenticated) {
            return; // Should not reach here due to button being disabled
        }
        console.log(values);
        clearSavedFormData(); // Clear saved data after successful submission
    };

    const isCurrentTabComplete = (activeTab, values) => {
        switch(activeTab) {
            case 0:
                return (
                    values.companyName.trim() !== '' &&
                    values.companyAltName.trim() !== '' &&
                    values.category !== '' &&
                    values.description.trim() !== ''
                );
            case 1:
                return (
                    values.firstName.trim() !== '' &&
                    values.lastName.trim() !== '' &&
                    values.email.trim() !== '' &&
                    values.phone.trim() !== ''
                );
            case 2:
                return (
                    values.address.trim() !== '' &&
                    values.city.trim() !== '' &&
                    values.state !== '' &&
                    values.zipCode.trim() !== ''
                );
            case 3:
                return values.participants.length > 0 && 
                    values.participants.every(participant => (
                        participant.firstName.trim() !== '' &&
                        participant.lastName.trim() !== '' &&
                        participant.titles.length > 0 &&
                        participant.address.trim() !== '' &&
                        participant.city.trim() !== '' &&
                        participant.state !== '' &&
                        participant.zipCode.trim() !== '' &&
                        participant.ownership !== ''
                    ));
            case 4:
                return (
                    values.filingSpeed !== '' &&
                    values.registeredAgentChoice !== ''
                );
            default:
                return false;
        }
    };

    const handleNext = (errors, values, touched, setTouched) => {
        const tabFields = {
            0: ['companyName', 'companyAltName', 'category', 'description'],
            1: ['firstName', 'lastName', 'email', 'phone'],
            2: ['address', 'city', 'state', 'zipCode'],
            3: ['participants'],
            4: ['filingSpeed', 'registeredAgentChoice']
        };

        const newTouched = { ...touched };
        tabFields[activeTab].forEach(field => {
            if (field === 'participants') {
                newTouched.participants = values.participants.map(() => ({
                    firstName: true,
                    lastName: true,
                    titles: true,
                    address: true,
                    city: true,
                    state: true,
                    zipCode: true,
                    ownership: true,
                    isSigner: true
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
            saveFormData(values);
            if (!completedTabs.includes(activeTab)) {
                setCompletedTabs([...completedTabs, activeTab]);
            }
            setActiveTab(activeTab + 1);
        }
    };

    const handleBack = (values) => {
        // persist values on back as well
        saveFormData(values);
        setActiveTab(activeTab - 1);
    };

    const textFieldStyles = { 
        backgroundColor: '#fcfdfd', 
        borderRadius: '10px', 
        '& .MuiOutlinedInput-root': { 
            borderRadius: '10px', 
            backgroundColor: '#fcfdfd', 
            '& fieldset': { borderColor: '#d1d5db' }, 
            '&:hover fieldset': { borderColor: '#9ca3af' }, 
            '&.Mui-focused fieldset': { 
                borderColor: '#d8361dff', 
                boxShadow: '0 0 0 3.5px rgba(216, 76, 29, 0.15)' 
            }, 
            '& .MuiInputAdornment-root .MuiSvgIcon-root': { 
                color: '#6b7280', 
                fontSize: '1.25rem' 
            } 
        }, 
        '& .MuiInputBase-input::placeholder': { 
            color: '#9ca3af', 
            opacity: 1 
        }, 
        '& .MuiFormHelperText-root': { 
            fontSize: '0.8rem', 
            ml: '4px', 
            fontWeight: 500 
        } 
    };

    const formLabelStyles = { 
        display: 'block', 
        mb: 1, 
        fontWeight: 500, 
        fontSize: '0.925rem', 
        color: '#374151', 
        textAlign: 'left' 
    };

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
                            ✅ Welcome back! Your form data has been restored from where you left off .
                        </Typography>
                    
                    </Box>
                )}
                
                <Tabs 
                    value={activeTab} 
                    onChange={(e, newValue) => {
                        if (newValue < activeTab || (newValue > activeTab && completedTabs.includes(newValue - 1))) {
                            setActiveTab(newValue);
                        }
                    }} 
                    sx={{
                           mb: 4,
                           display: "flex",
                           justifyContent: "center",
                           overflowX: { xs: "auto", sm: "visible" },
                           "& .MuiTabs-flexContainer": {
                             justifyContent: { xs: "flex-start", md: "center" },
                           },
                           "& .MuiTab-root": {
                             minHeight: 50,
                             textTransform: "none",
                             fontWeight: 500,
                             fontSize: "14px",
                             color: "#333",
                             gap: "6px",
                           },
                           "& .Mui-selected": {
                             color: "#E50000 !important", // active red color
                           },
                           "& .MuiTabs-indicator": {
                             backgroundColor: "#E50000",
                             height: "2px",
                           },
                         }}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    
                >

                      <Tab
                         icon={<BusinessIcon />}
                         iconPosition="start"
                         label="Company Information"
                       />
                       <Tab
                         icon={<CallIcon />}
                         iconPosition="start"
                         label="Contact Information"
                         disabled={activeTab < 1 && !completedTabs.includes(0)}
                       />
                       <Tab
                         icon={<LocationOnIcon />}
                         iconPosition="start"
                         label="Business Address"
                         disabled={activeTab < 2 && !completedTabs.includes(1)}
                       />
                       <Tab
                         icon={<PersonIcon />}
                         iconPosition="start"
                         label="Participants"
                         disabled={activeTab < 3 && !completedTabs.includes(2)}
                       />
                       <Tab
                         icon={<InfoIcon />}
                         iconPosition="start"
                         label="Other Information"
                         disabled={activeTab < 4 && !completedTabs.includes(3)}
                       />
  
                </Tabs>
                
                <Formik 
                    key={savedFormValues ? 'restored' : 'new'} // Force reinitialization when data is restored
                    initialValues={mergedInitialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={handleFormSubmit}
                    enableReinitialize={true}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched }) => (
                        <Form>



                            {activeTab === 0 && (
                                <Box>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600, 
                                        color: '#1f2937', 
                                        borderBottom: '1px solid #e5e7eb', 
                                        pb: 1, 
                                        mb: 3 
                                    }}>
                                        Company Information
                                    </Typography>
                                    
                                    <Grid spacing={0}>
                                        <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Company Desired Name
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="companyName" 
                                                placeholder="Enter Company Desired Name" 
                                                value={values.companyName} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.companyName && !!errors.companyName} 
                                                helperText={touched.companyName && errors.companyName ? errors.companyName : " "} 
                                                variant="outlined" 
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }} 
                                            />
                                        </Grid>
                                        
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Company Alternative Name
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="companyAltName" 
                                                placeholder="Enter Company Alternative Name" 
                                                value={values.companyAltName} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.companyAltName && !!errors.companyAltName} 
                                                helperText={touched.companyAltName && errors.companyAltName ? errors.companyAltName : " "} 
                                                variant="outlined" 
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }} 
                                            />
                                        </Grid>
                                        </Box>

                                         <Box sx={{ display: "flex", gap: {xs: 3, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Business Category
                                            </FormLabel>
                                            <FormControl fullWidth>
                                                <Select
                                                    name="category"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.category && !!errors.category}
                                                    displayEmpty
                                                    sx={{
                                                        ...textFieldStyles,
                                                        '& .MuiSelect-select': {
                                                            paddingLeft: '40px',
                                                            textAlign: 'left'
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select Business Category
                                                    </MenuItem>
                                                    {categories.map((cat) => (
                                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                                    ))}
                                                </Select>
                                                {touched.category && errors.category && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.category}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Company Business Description
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="description" 
                                                placeholder="Enter Business Description" 
                                                value={values.description} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.description && !!errors.description} 
                                                helperText={touched.description && errors.description ? errors.description : " "} 
                                                variant="outlined" 
                                                multiline
                                                rows={1}
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CategoryOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }}
                                            />
                                        </Grid>
                                        </Box>
                                    </Grid>
                                    
                                </Box>
                            )}
                            
                            {activeTab === 1 && (
                                <Box>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600, 
                                        color: '#1f2937', 
                                        borderBottom: '1px solid #e5e7eb', 
                                        pb: 1, 
                                        mb: 3 
                                    }}>
                                        Contact Information
                                    </Typography>
                                    
                                    <Grid >
                                         <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                First Name
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="firstName" 
                                                placeholder="Enter First Name" 
                                                value={values.firstName} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.firstName && !!errors.firstName} 
                                                helperText={touched.firstName && errors.firstName ? errors.firstName : " "} 
                                                variant="outlined" 
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonOutlineOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }} 
                                            />
                                        </Grid>
                                        
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Last Name
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="lastName" 
                                                placeholder="Enter Last Name" 
                                                value={values.lastName} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.lastName && !!errors.lastName} 
                                                helperText={touched.lastName && errors.lastName ? errors.lastName : " "} 
                                                variant="outlined" 
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonOutlineOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }} 
                                            />
                                        </Grid>
                                        </Box>

                                         <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Email Address
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="email" 
                                                placeholder="Enter Email Address" 
                                                value={values.email} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.email && !!errors.email} 
                                                helperText={touched.email && errors.email ? errors.email : " "} 
                                                variant="outlined" 
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <MailOutlineOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }} 
                                            />
                                        </Grid>
                                        
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Phone Number
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="phone" 
                                                placeholder="Enter Phone Number" 
                                                value={values.phone} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.phone && !!errors.phone} 
                                                helperText={touched.phone && errors.phone ? errors.phone : " "} 
                                                variant="outlined" 
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PhoneOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }} 
                                            />
                                        </Grid>
                                        </Box>
                                    </Grid>
                                </Box>
                            )}
                            
                            {activeTab === 2 && (
                                <Box>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600, 
                                        color: '#1f2937', 
                                        borderBottom: '1px solid #e5e7eb', 
                                        pb: 1, 
                                        mb: 3 
                                    }}>
                                        Business Address
                                    </Typography>
                                    
                                    <Grid >
                                         <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Street Address
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="address" 
                                                placeholder="Enter Street Address" 
                                                value={values.address} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.address && !!errors.address} 
                                                helperText={touched.address && errors.address ? errors.address : " "} 
                                                variant="outlined" 
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocationOnOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }} 
                                            />
                                        </Grid>
                                        
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                City
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="city" 
                                                placeholder="Enter City" 
                                                value={values.city} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.city && !!errors.city} 
                                                helperText={touched.city && errors.city ? errors.city : " "} 
                                                variant="outlined" 
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocationCityOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }} 
                                            />
                                        </Grid>
                                        </Box>
                                        
                                         <Box sx={{ display: "flex", gap: {xs: 2, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                State
                                            </FormLabel>
                                            <FormControl fullWidth>
                                                <Select
                                                    name="state"
                                                    value={values.state}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.state && !!errors.state}
                                                    displayEmpty
                                                    sx={{
                                                        ...textFieldStyles,
                                                        '& .MuiSelect-select': {
                                                            paddingLeft: '14px',
                                                            textAlign: 'left'
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select state...
                                                    </MenuItem>
                                                    {stateOptions.map((stateName) => (
                                                        <MenuItem key={stateName} value={states[stateName]}>{stateName}</MenuItem>
                                                    ))}
                                                </Select>
                                                {touched.state && errors.state && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.state}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Zip Code
                                            </FormLabel>
                                            <TextField 
                                                fullWidth 
                                                name="zipCode" 
                                                placeholder="Enter Zip Code" 
                                                value={values.zipCode} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                error={touched.zipCode && !!errors.zipCode} 
                                                helperText={touched.zipCode && errors.zipCode ? errors.zipCode : " "} 
                                                variant="outlined" 
                                                sx={textFieldStyles} 
                                                InputProps={{ 
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocalPostOfficeOutlinedIcon />
                                                        </InputAdornment>
                                                    ) 
                                                }} 
                                            />
                                        </Grid>
                                        </Box>
                                    </Grid>
                                </Box>
                            )}
                            
                            {activeTab === 3 && (
                                <Box>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600, 
                                        color: '#1f2937', 
                                        borderBottom: '1px solid #e5e7eb', 
                                        pb: 1, 
                                        mb: 3 
                                    }}>
                                        Participants
                                    </Typography>
                                    
                                    <FieldArray name="participants">
                                        {({ push, remove }) => (
                                            <Box>
                                                {values.participants.map((participant, index) => {
                                                    const participantErrors = errors.participants?.[index] || {};
                                                    const participantTouched = touched.participants?.[index] || {};
                                                    
                                                    return (
                                                        <Paper key={index} sx={{ p: 3, mb: 3, borderRadius: '12px', border: '1px solid #e5e7eb', position: 'relative' }}>
                                                            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                                                                Participant #{index + 1}
                                                            </Typography>
                                                            
                                                            {values.participants.length > 1 && (
                                                                <IconButton 
                                                                    onClick={() => remove(index)} 
                                                                    sx={{ position: 'absolute', top: 8, right: 8 }}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            )}
                                                            
                                                            <Grid >
                                                                 <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                                                <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                                    <FormLabel sx={formLabelStyles}>
                                                                        First Name
                                                                    </FormLabel>
                                                                    <TextField 
                                                                        fullWidth 
                                                                        name={`participants.${index}.firstName`}
                                                                        placeholder="First Name" 
                                                                        value={participant.firstName} 
                                                                        onChange={handleChange} 
                                                                        onBlur={handleBlur} 
                                                                        error={participantTouched.firstName && !!participantErrors.firstName} 
                                                                        helperText={participantTouched.firstName && participantErrors.firstName ? participantErrors.firstName : " "} 
                                                                        sx={textFieldStyles} 
                                                                    />
                                                                </Grid>
                                                                
                                                                <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                                    <FormLabel sx={formLabelStyles}>
                                                                        Last Name
                                                                    </FormLabel>
                                                                    <TextField 
                                                                        fullWidth 
                                                                        name={`participants.${index}.lastName`}
                                                                        placeholder="Last Name" 
                                                                        value={participant.lastName} 
                                                                        onChange={handleChange} 
                                                                        onBlur={handleBlur} 
                                                                        error={participantTouched.lastName && !!participantErrors.lastName} 
                                                                        helperText={participantTouched.lastName && participantErrors.lastName ? participantErrors.lastName : " "} 
                                                                        sx={textFieldStyles} 
                                                                    />
                                                                </Grid>
                                                                </Box>
                                                                 <Box sx={{ display: "flex", gap: {xs: 2, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                                                <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                                    <FormLabel sx={formLabelStyles}>
                                                                        Title(s)
                                                                    </FormLabel>
                                                                    <FormControl fullWidth error={participantTouched.titles && !!participantErrors.titles}>
                                                                        <Select
                                                                            multiple
                                                                            name={`participants.${index}.titles`}
                                                                            value={participant.titles || []}
                                                                            onChange={handleChange}
                                                                            renderValue={(selected) => (
                                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                                    {selected.map((value) => (
                                                                                        <Box key={value} sx={{ 
                                                                                            backgroundColor: '#e5e7eb', 
                                                                                            borderRadius: '4px', 
                                                                                            px: 1, 
                                                                                            py: 0.5 
                                                                                        }}>
                                                                                            {value}
                                                                                        </Box>
                                                                                    ))}
                                                                                </Box>
                                                                            )}
                                                                            sx={textFieldStyles}
                                                                        >
                                                                            {participantTitles.map((title) => (
                                                                                <MenuItem key={title} value={title}>
                                                                                    <Checkbox checked={participant.titles?.includes(title) || false} />
                                                                                    {title}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                        {participantTouched.titles && participantErrors.titles && (
                                                                            <Typography color="error" variant="caption">
                                                                                {participantErrors.titles}
                                                                            </Typography>
                                                                        )}
                                                                    </FormControl>
                                                                </Grid>
                                                                
                                                                <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                                    <FormLabel sx={formLabelStyles}>
                                                                        Address
                                                                    </FormLabel>
                                                                    <TextField 
                                                                        fullWidth 
                                                                        name={`participants.${index}.address`}
                                                                        placeholder="Street Address" 
                                                                        value={participant.address} 
                                                                        onChange={handleChange} 
                                                                        onBlur={handleBlur} 
                                                                        error={participantTouched.address && !!participantErrors.address} 
                                                                        helperText={participantTouched.address && participantErrors.address ? participantErrors.address : " "} 
                                                                        sx={textFieldStyles} 
                                                                    />
                                                                </Grid>
                                                                </Box>

                                                                 <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                                                <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                                    <FormLabel sx={formLabelStyles}>
                                                                        City
                                                                    </FormLabel>
                                                                    <TextField 
                                                                        fullWidth 
                                                                        name={`participants.${index}.city`}
                                                                        placeholder="City" 
                                                                        value={participant.city} 
                                                                        onChange={handleChange} 
                                                                        onBlur={handleBlur} 
                                                                        error={participantTouched.city && !!participantErrors.city} 
                                                                        helperText={participantTouched.city && participantErrors.city ? participantErrors.city : " "} 
                                                                        sx={textFieldStyles} 
                                                                    />
                                                                </Grid>
                                                                
                                                                <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                                    <FormLabel sx={formLabelStyles}>
                                                                        State
                                                                    </FormLabel>
                                                                    <FormControl fullWidth>
                                                                        <Select
                                                                            name={`participants.${index}.state`}
                                                                            value={participant.state}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            error={participantTouched.state && !!participantErrors.state}
                                                                            displayEmpty
                                                                            sx={{
                                                                                ...textFieldStyles,
                                                                                '& .MuiSelect-select': {
                                                                                    paddingLeft: '14px',
                                                                                    textAlign: 'left'
                                                                                }
                                                                            }}
                                                                        >
                                                                            <MenuItem value="" disabled>
                                                                                Select state...
                                                                            </MenuItem>
                                                                            {stateOptions.map((stateName) => (
                                                                                <MenuItem key={stateName} value={states[stateName]}>{stateName}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                        {participantTouched.state && participantErrors.state && (
                                                                            <Typography color="error" variant="caption">
                                                                                {participantErrors.state}
                                                                            </Typography>
                                                                        )}
                                                                    </FormControl>
                                                                </Grid>
                                                                </Box>

                                                                 <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, mt:{xs: 2, md: 0}, flexDirection: {xs: "column", md: "row"} }}>
                                                                <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                                    <FormLabel sx={formLabelStyles}>
                                                                        Zip Code
                                                                    </FormLabel>
                                                                    <TextField 
                                                                        fullWidth 
                                                                        name={`participants.${index}.zipCode`}
                                                                        placeholder="Zip Code" 
                                                                        value={participant.zipCode} 
                                                                        onChange={handleChange} 
                                                                        onBlur={handleBlur} 
                                                                        error={participantTouched.zipCode && !!participantErrors.zipCode} 
                                                                        helperText={participantTouched.zipCode && participantErrors.zipCode ? participantErrors.zipCode : " "} 
                                                                        sx={textFieldStyles} 
                                                                    />
                                                                </Grid>
                                                                
                                                                <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                                    <FormLabel sx={formLabelStyles}>
                                                                        Percentage of Ownership
                                                                    </FormLabel>
                                                                    <TextField 
                                                                        fullWidth 
                                                                        name={`participants.${index}.ownership`}
                                                                        type="number" 
                                                                        placeholder="%" 
                                                                        value={participant.ownership} 
                                                                        onChange={handleChange} 
                                                                        onBlur={handleBlur} 
                                                                        error={participantTouched.ownership && !!participantErrors.ownership} 
                                                                        helperText={participantTouched.ownership && participantErrors.ownership ? participantErrors.ownership : " "} 
                                                                        sx={textFieldStyles} 
                                                                        InputProps={{ 
                                                                            startAdornment: (
                                                                                <InputAdornment position="start">
                                                                                    <PercentIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">%</InputAdornment>
                                                                            )
                                                                        }} 
                                                                    />
                                                                </Grid>
                                                                </Box>
                                                                <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name={`participants.${index}.isSigner`}
                                                                                checked={participant.isSigner || false}
                                                                                onChange={handleChange}
                                                                            />
                                                                        }
                                                                        label="Authorized Signer"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>
                                                    );
                                                })}
                                                
                                                <Button 
                                                    startIcon={<AddCircleOutlineIcon />} 
                                                    onClick={() => push({
                                                        firstName: '',
                                                        lastName: '',
                                                        titles: [],
                                                        address: '',
                                                        city: '',
                                                        state: '',
                                                        zipCode: '',
                                                        ownership: '',
                                                        isSigner: false
                                                    })}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Add Participant
                                                </Button>
                                                
                                                {typeof errors.participants === 'string' && (
                                                    <Typography color="error" sx={{ mt: 2 }}>
                                                        {errors.participants}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                                    </FieldArray>
                                </Box>
                            )}
                            
                            {activeTab === 4 && (
                                <Box>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600, 
                                        color: '#1f2937', 
                                        borderBottom: '1px solid #e5e7eb', 
                                        pb: 1, 
                                        mb: 3 
                                    }}>
                                        Other Information
                                    </Typography>
                                    
                                    <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Filing Speed
                                            </FormLabel>
                                            <FormControl fullWidth>
                                                <Select
                                                    name="filingSpeed"
                                                    value={values.filingSpeed}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.filingSpeed && !!errors.filingSpeed}
                                                    displayEmpty
                                                    sx={{
                                                        ...textFieldStyles,
                                                        '& .MuiSelect-select': {
                                                            paddingLeft: '40px',
                                                            textAlign: 'left'
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="standard">Standard (30-60 days)</MenuItem>
                                                    <MenuItem value="express">Express +$150 (15-20 days)</MenuItem>
                                                </Select>
                                                {touched.filingSpeed && errors.filingSpeed && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.filingSpeed}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        
                                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                            <FormLabel sx={formLabelStyles}>
                                                Registered Agent
                                            </FormLabel>
                                            <FormControl fullWidth>
                                                <Select
                                                    name="registeredAgentChoice"
                                                    value={values.registeredAgentChoice}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.registeredAgentChoice && !!errors.registeredAgentChoice}
                                                    displayEmpty
                                                    sx={{
                                                        ...textFieldStyles,
                                                        '& .MuiSelect-select': {
                                                            paddingLeft: '40px',
                                                            textAlign: 'left'
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="corpnet">Use LAUNCH as my Registered Agent</MenuItem>
                                                    <MenuItem value="own">I will provide my own Registered Agent</MenuItem>
                                                </Select>
                                                {touched.registeredAgentChoice && errors.registeredAgentChoice && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.registeredAgentChoice}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Box>
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
                                                sx={{ 
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    borderRadius: '8px',
                                                    px: 4,
                                                    py: 1.5,
                                                    bgcolor: '#e02810ff',
                                                    '&:hover': { bgcolor: '#fc0202ff' }
                                                }}
                                            >
                                                Submit
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

export default BusinessForm;