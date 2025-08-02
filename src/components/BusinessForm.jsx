import React, { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect
import {
    Box,
    TextField,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Typography,
    Paper,
    Divider,
    FormLabel,
    InputAdornment,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Card,
    CardContent,
    FormControl,
    Checkbox,
    IconButton,
    InputLabel,
    Select,
    OutlinedInput,
    Chip,
} from '@mui/material';
import { Formik, Form, FieldArray, Field, getIn } from 'formik'; // Import getIn from formik
import * as Yup from 'yup';
import { loadStripe } from 'https://esm.sh/@stripe/stripe-js';


import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PercentIcon from '@mui/icons-material/Percent';
import Navbar from './Navbar';

import axios from 'axios'
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

// --- Validation Schema ---
const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required('First name is required'),
    lastName: Yup.string().trim().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits').required('Phone is required'),
    companyName: Yup.string().trim().required('Company desired name is required'),
    companyAltName: Yup.string().trim().required('Company Alt name is required'),
    category: Yup.string().required('Business category is required'),
    description: Yup.string().trim().min(10, 'Description too short (min 10 chars)').required('Company description is required'),
    address: Yup.string().trim().required('Business address is required'),
    city: Yup.string().trim().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid zip code').required('Zip code is required'),
    filingSpeed: Yup.string().required('Please select a filing speed'),
    registeredAgentChoice: Yup.string().required(),
    raFirstName: Yup.string().when('registeredAgentChoice', { is: 'own', then: schema => schema.trim().required('First name is required') }),
    raLastName: Yup.string().when('registeredAgentChoice', { is: 'own', then: schema => schema.trim().required('Last name is required') }),
    raAddress: Yup.string().when('registeredAgentChoice', { is: 'own', then: schema => schema.trim().required('Address is required') }),
    raCity: Yup.string().when('registeredAgentChoice', { is: 'own', then: schema => schema.trim().required('City is required') }),
    raState: Yup.string().when('registeredAgentChoice', { is: 'own', then: schema => schema.required('State is required') }),
    raZipCode: Yup.string().when('registeredAgentChoice', { is: 'own', then: schema => schema.matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid zip code').required('Zip code is required') }),
    participants: Yup.array().of(
        Yup.object().shape({
            firstName: Yup.string().trim().required('First name is required'),
            middleInitial: Yup.string().trim().max(1, 'Initial can be only one character'),
            lastName: Yup.string().trim().required('Last name is required'),
            titles: Yup.array().min(1, 'At least one title is required').required('Titles are required'),
            address: Yup.string().trim().required('Address is required'),
            city: Yup.string().trim().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid zip code').required('Zip code is required'),
            ownership: Yup.number().typeError('Must be a number').min(0, 'Cannot be negative').max(100, 'Cannot exceed 100').required('Ownership % is required'),
            isSigner: Yup.boolean(),
        })
    ).min(1, 'At least one company participant is required.').required(),
});

const PackageModal = ({ open, onClose, packages, onContinue, apiError, filingSpeed }) => {
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modifiedCompletePackage, setModifiedCompletePackage] = useState(null);
    
    console.log(packages?.find(p=>p.name=='Complete'),'{packages.find(p=>p.name==).map((pkg) => (',packages)
    
    React.useEffect(() => {
        if (packages) {
            const completePackage = packages.find(p => p.name === 'Complete');
            if (completePackage) {
         
                let additionalCost = 0;
                
  
                const basePrice = parseFloat(completePackage.numericTotalPrice || completePackage.totalPrice.replace('$', '').replace(',', ''));
                const tenPercentIncrease = basePrice * 0.1;
                additionalCost += tenPercentIncrease;
                
                
                if (filingSpeed == 'express') {
                    additionalCost += 150;
                }
                
                 
                const modifiedPackage = {
                    ...completePackage,
                    originalTotalPrice: completePackage.totalPrice,
                    originalNumericTotalPrice: completePackage.numericTotalPrice,
                    totalPrice: `$${Math.floor((basePrice + additionalCost).toFixed(2))}`,
                    numericTotalPrice: basePrice + additionalCost,
                    additionalFees: additionalCost,
                    tenPercentFee: tenPercentIncrease,
                    expressFee: filingSpeed === 'express' ? 150 : 0
                };
                
                setModifiedCompletePackage(modifiedPackage);
                setSelectedPackageId(modifiedPackage.id);
                console.log('Modified package:', modifiedPackage);
            }
        }
    }, [packages, filingSpeed]);

    const handleContinue = async () => {
        try{
            console.log(selectedPackageId,'selectedPackageId')
            setIsSubmitting(true);
            await onContinue(modifiedCompletePackage);
        }catch(e){
            console.log(e,'error')
        }
    };

    const renderDescription = (htmlString) => ({ __html: htmlString });

    return (
        <Dialog open={open} onClose={!isSubmitting ? onClose : () => {}} fullWidth maxWidth="md">
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.75rem', pb: 1 }}>Select Your Package</DialogTitle>
            <DialogContent>
                {apiError && (<Typography color="error" align="center" sx={{ my: 3 }}>{`An error occurred: ${apiError}. Please try again.`}</Typography>)}
                {!apiError && modifiedCompletePackage && (
                    <RadioGroup value={selectedPackageId} onChange={(e) => setSelectedPackageId(e.target.value)} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mt: 2 }}>
                        <Card key={modifiedCompletePackage.id} variant="outlined" onClick={() => setSelectedPackageId(modifiedCompletePackage.id)} sx={{ flex: 1, cursor: 'pointer', borderRadius: '12px', border: selectedPackageId === modifiedCompletePackage.id ? '2px solid' : '1px solid', borderColor: selectedPackageId === modifiedCompletePackage.id ? 'primary.main' : 'grey.300', boxShadow: selectedPackageId === modifiedCompletePackage.id ? '0 4px 12px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s ease-in-out', '&:hover': { borderColor: 'primary.light', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' } }}>
                            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                <Typography variant="h5" component="div" fontWeight="bold">{modifiedCompletePackage.name}</Typography>
                                <Typography variant="h4" color="primary.main" sx={{ my: 1, fontWeight: '700' }}>{modifiedCompletePackage.totalPrice+'.00'}</Typography>
                                
                                {/* Show price breakdown */}
                                {/* <Box sx={{ my: 2, textAlign: 'left', px: 1 }}>
                                    
                                    <Typography variant="body2" color="primary.main" fontWeight="bold">
                                        Total: {modifiedCompletePackage.totalPrice}
                                    </Typography>
                                </Box> */}
                                
                                <Box sx={{ my: 2, textAlign: 'left', px: 1 }}>
                                    {modifiedCompletePackage.featureGroups.find(fg => fg.groupName === 'What You Get!')?.groupFeatures
                                        .filter(feature => !['S-Corp Election', 'FinCEN BOI Report', 'Business License Research Package'].includes(feature.name))
                                        .map(feature => (
                                            <Box key={feature.featureId} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <CheckCircleIcon color="success" sx={{ fontSize: '1.1rem', mr: 1 }} />
                                                <Typography variant="body2" dangerouslySetInnerHTML={renderDescription(feature.name)} />
                                            </Box>
                                        ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </RadioGroup>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
                <Button onClick={onClose} color="secondary"   sx={{ textTransform: 'none', fontSize: '1rem' }}>Cancel</Button>
                <Button onClick={handleContinue} variant="contained" color="primary"  sx={{ textTransform: 'none', fontSize: '1rem', px: 4 }}>
                 Continue to Payment
                </Button>
            </DialogActions>
        </Dialog>
    );
};


// --- Main Business Form Component ---
const BusinessForm = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [packagesData, setPackagesData] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [packageApiError, setPackageApiError] = useState(null);
    const [isFetchingPackages, setIsFetchingPackages] = useState(false);
    
    // --- NEW: Create a ref for the form element ---
    const formRef = useRef(null);

    const initialValues = {
        firstName: '', lastName: '', email: '', phone: '',
        companyName: '', companyAltName: '', category: '', description: '',
        address: '', city: '', state: '', zipCode: '',
        socialNumber:'',
        filingSpeed: 'standard',
        registeredAgentChoice: 'corpnet',
        raFirstName: '', raLastName: '', raAddress: '', raCity: '', raState: '', raZipCode: '',
        participants: [
            { firstName: '', middleInitial: '', lastName: '', titles: [], address: '', city: '', state: '', zipCode: '', ownership: '', isSigner: false,socialNumber:'' }
        ],
    };

    const stripePromise = loadStripe('pk_live_51Mm095LJEsvKrI06Iwzg7W8meWpywwViUZnfHJx5Fo6GRt6ttf23SsjBwpwcUl3XyLrZYaQG6woAHHcOsXLBAnmV00KmXaxXjH');

    const handleFormSubmit = async (values) => {
        setIsFetchingPackages(true);
        setPackageApiError(null);
        setFormValues(values);

        const stateAbbr = states[values.state];
        const filingSpeed = values.filingSpeed;

        try {
            // const response = await axios.get(`http://localhost:5001/api/business-formation-package?entityType=LLC&state=${stateAbbr}&filing=${filingSpeed}`);

            const response = await axios.get(`https://lauchbackend-896056687002.europe-west1.run.app/api/business-formation-package?entityType=LLC&state=${stateAbbr}&filing=${filingSpeed}`);
            const data =response?.data 
            console.log(data.data?.packages,'data', data?.packages, data.packages)
            if (data) {
                // const rawPackages = data.value.packageCollection;

                // const transformedPackages = rawPackages.flatMap(pkgCol => {
                //   return pkgCol.productPackages.map(pkg => {
                //     const serviceFee = Math.abs(pkg.price || 0);
                //     const productOptions = pkg.productOptions || [];
                //     const requiredFees = productOptions
                //       .filter(opt =>
                //         opt.packageDisplaySelection === 'Required' &&
                //         (opt.productFamily === 'State Fee' || opt.productFamily === '3rd Party Fees')
                //       )
                //       .reduce((acc, curr) => acc + (curr.price || 0), 0);
                //     const total = serviceFee + requiredFees;
                //     const features = productOptions
                //       .filter(opt =>
                //         ['Bundled', 'Selected'].includes(opt.packageDisplaySelection)
                //       )
                //       .map(feature => ({
                //         featureId: feature.productId,
                //         name: feature.productName,
                //         includeCategory: 1
                //       }));

                //     return {
                //       id: pkg.id,
                //       name: pkg.name.replace(`Business Formation - LLC - ${pkg.state} - `, ''),
                //       isDefaultPackage: pkg.collectionDisplaySequence === 1,
                //       price: `$${serviceFee.toFixed(2)}`,
                //       stateFees: `$${requiredFees.toFixed(2)}`,
                //       totalPrice: `$${total.toFixed(2)}`,
                //       numericTotalPrice: total,
                //       featureGroups: [
                //         {
                //           groupName: 'What You Get!',
                //           groupFeatures: features
                //         }
                //       ],
                //       displayOrder: pkg.collectionDisplaySequence || 0
                //     };
                //   });
                // }).sort((a, b) => a.displayOrder - b.displayOrder);

                setPackagesData(data.data?.packages);
              } else {
                throw new Error(data.message || "Invalid data structure received.");
              }


        } catch (error) {
            console.error('Error fetching packages:', error);
            setPackageApiError(error.response?.data?.error || error.message || 'An unknown error occurred.');
            setPackagesData(null);
        } finally {
            setIsFetchingPackages(false);
            setModalOpen(true);
        }
    };

    const handleContinueToPayment = async (selectedPackage) => {
        if (!formValues || !selectedPackage) {
            setPackageApiError("Missing form values or selected package.");
            return;
        }

        const isCorpnetAgent = formValues.registeredAgentChoice === 'corpnet';
        const payload = {
            Contact: {
                ContactEmail: formValues.email, ContactFirstName: formValues.firstName, ContactLastName: formValues.lastName,
                ContactPhone: formValues.phone, ContactEveningPhone: "",
            },
            CompanyInfo: {
                CompanyDesiredName: formValues.companyName, CompanyAlternativeName: formValues.companyAltName,
                CompanyBusinessCategory: formValues.category, CompanyBusinessDescription: formValues.description,
           
            },
            BusinessAddress: {
                BusinessAddressCountry: "US", BusinessAddressAddress1: formValues.address, BusinessAddressAddress2: "",
                BusinessAddressCity: formValues.city, BusinessAddressState: states[formValues.state], BusinessAddressZip: formValues.zipCode,
            },
            RegisterAgent: {
                RegisteredAgentIsCorpnetAgent: isCorpnetAgent,
                RegisteredAgentFirstName: isCorpnetAgent ? "string" : formValues.raFirstName,
                RegisteredAgentLastName: isCorpnetAgent ? "string" : formValues.raLastName,
                RegisteredAgentAddress1: isCorpnetAgent ? "string" : formValues.raAddress,
                RegisteredAgentAddress2: "string", RegisteredAgentCity: isCorpnetAgent ? "string" : formValues.raCity,
                RegisteredAgentState: isCorpnetAgent ? "string" : states[formValues.raState],
                RegisteredAgentZip: isCorpnetAgent ? "string" : formValues.raZipCode,
                RegisteredAgentCountry: "US",
            },
            CompanyParticipants: formValues.participants.map(p => ({
                Type: "Individual",
                FirstName: p.firstName, MiddleInitial: p.middleInitial, LastName: p.lastName,
                Titles: p.titles,
                MailingAddress: {
                    Address: p.address, City: p.city, State: states[p.state], Zip: p.zipCode, Country: "US"
                },
                OwnershipPercentage: p.ownership,
                IsAuthorizedSigner: p.isSigner,
                socialNumber:p.socialNumber
            })),
              
            selectedPackage: { 
                id: selectedPackage.id, 
                name: selectedPackage.name, 
                price: selectedPackage.price, 
                totalPrice: selectedPackage.numericTotalPrice // Send the numeric total price
            },
            filingSpeed: formValues.filingSpeed,
        };

        console.log('Final Payload:', JSON.stringify(payload, null, 2));
        // https://lauchbackend-31561078355.europe-west1.run.app
        try {
            const response = await axios.post(
              'https://lauchbackend-896056687002.europe-west1.run.app/api/create-checkout-session',
              {payload},
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
          
            const session = response.data;
            console.log(response,'response')
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
          
            if (error) {
              setPackageApiError(`Payment Error: ${error.message}`);
            }
          } catch (error) {
            const message =
              error.response?.data?.message || error.message || 'Server error.';
             setModalOpen(false)
            setIsFetchingPackages(false)
            console.log(error,'error')
          }
          
    };

    const formLabelStyles = { display: 'block', mb: 1, fontWeight: 500, fontSize: '0.925rem', color: '#374151', textAlign: 'left' };
    const textFieldStyles = { backgroundColor: '#fcfdfd', borderRadius: '10px', '& .MuiOutlinedInput-root': { borderRadius: '10px', backgroundColor: '#fcfdfd', '& fieldset': { borderColor: '#d1d5db' }, '&:hover fieldset': { borderColor: '#9ca3af' }, '&.Mui-focused fieldset': { borderColor: '#1d4ed8', boxShadow: '0 0 0 3.5px rgba(29, 78, 216, 0.15)' }, '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: '#6b7280', fontSize: '1.25rem' } }, '& .MuiInputBase-input::placeholder': { color: '#9ca3af', opacity: 1 }, '& .MuiFormHelperText-root': { fontSize: '0.8rem', ml: '4px', fontWeight: 500 } };
    const radioCardStyles = (checked) => ({ border: '1.5px solid', borderColor: checked ? '#1d4ed8' : '#d1d5db', borderRadius: '12px', p: '12px 20px', width: '100%', transition: 'all 0.25s', backgroundColor: checked ? 'rgba(29,78,216,0.07)' : '#fcfdfd', boxShadow: checked ? '0 0 0 2.5px rgba(29,78,216,0.25)' : 'none', '&:hover': { borderColor: checked ? '#1d4ed8' : '#9ca3af' }, '& .MuiFormControlLabel-label': { fontWeight: 500 }, ml: 0 });

    return (
        <>
            <PackageModal filingSpeed={formValues?.filingSpeed} open={isModalOpen}  onClose={() => setModalOpen(false)} packages={packagesData} onContinue={handleContinueToPayment} apiError={packageApiError} />
                 <Box sx={{background: 'linear-gradient(#fce8d3, #fff)',p: 4}}>
                 <Navbar/>
                 <Box sx={{ bgcolor: '#f3f4f6', py: { xs: 3, sm: 5 }, minHeight: '100vh', display: 'flex',background: 'linear-gradient(#fce8d3, #fff)', justifyContent: 'center', alignItems: 'flex-start', fontFamily: 'Inter, sans-serif' }}>
                 <Paper elevation={3} sx={{ maxWidth: 800, width: '100%', mx: 'auto', p: { xs: 3, sm: 4.5 }, bgcolor: '#ffffff', borderRadius: '16px', boxShadow: '0 12px 30px -8px rgba(0,0,0,0.1)' }}>
                     <Typography variant="subtitle2" sx={{ color: '#888', fontWeight: 600, textAlign: 'center', mb: 0.5, letterSpacing: 1 }}>Step 2</Typography>
                     <Typography variant="h4" align="center" gutterBottom fontWeight="700" sx={{ mb: 4.5, color: '#111827' }}>Submit Your Business Details</Typography>
                     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
                         {({ values, errors, touched, handleChange, handleBlur, setFieldValue, submitCount }) => {
                          
                            useEffect(() => {
                                
                                if (submitCount > 0 && Object.keys(errors).length > 0) {
                                    const formNode = formRef.current;
                                    if (!formNode) return;

                                    
                                    const elements = formNode.querySelectorAll('input, textarea, .MuiSelect-select');
                                    
                                    for (const element of elements) {
                                        const fieldName = element.getAttribute('name');
                                        
                                         if (fieldName && getIn(errors, fieldName)) {
                                            
                                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            break;  
                                        }
                                    }
                                }
                            }, [submitCount, errors]);  

                             return (
                              <Form ref={formRef}>
                           
                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                     <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', borderBottom: '1px solid #e5e7eb', pb: 1, mb: 1 }}>Contact Information</Typography>
                                     <Box><FormLabel sx={formLabelStyles}>First Name *</FormLabel><TextField fullWidth name="firstName" placeholder="Enter your first name" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={touched.firstName && !!errors.firstName} helperText={touched.firstName && errors.firstName ? errors.firstName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonOutlineOutlinedIcon /></InputAdornment>) }} /></Box>
                                     <Box><FormLabel sx={formLabelStyles}>Last Name *</FormLabel><TextField fullWidth name="lastName" placeholder="Enter your last name" value={values.lastName} onChange={handleChange} onBlur={handleBlur} error={touched.lastName && !!errors.lastName} helperText={touched.lastName && errors.lastName ? errors.lastName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonOutlineOutlinedIcon /></InputAdornment>) }} /></Box>
                                     <Box><FormLabel sx={formLabelStyles}>Email Address *</FormLabel><TextField fullWidth name="email" type="email" placeholder="you@example.com" value={values.email} onChange={handleChange} onBlur={handleBlur} error={touched.email && !!errors.email} helperText={touched.email && errors.email ? errors.email : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><MailOutlineOutlinedIcon /></InputAdornment>) }} /></Box>
                                     <Box><FormLabel sx={formLabelStyles}>Phone Number *</FormLabel><TextField fullWidth name="phone" type="tel" placeholder="(555) 123-4567" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={touched.phone && !!errors.phone} helperText={touched.phone && errors.phone ? errors.phone : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment>) }} /></Box>
                                     
                                     <Divider sx={{ my: 2 }} />
                                     <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', borderBottom: '1px solid #e5e7eb', pb: 1, mb: 1 }}>Company Information</Typography>
                                     <Box><FormLabel sx={formLabelStyles}>Company Desired Name *</FormLabel><TextField fullWidth name="companyName" placeholder="Your Company LLC" value={values.companyName} onChange={handleChange} onBlur={handleBlur} error={touched.companyName && !!errors.companyName} helperText={touched.companyName && errors.companyName ? errors.companyName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><BusinessOutlinedIcon /></InputAdornment>) }} /></Box>
 
                                     <Box><FormLabel sx={formLabelStyles}>Company Alternative Name *</FormLabel><TextField fullWidth name="companyAltName" placeholder="Your Company Inc." value={values.companyAltName} onChange={handleChange} onBlur={handleBlur} error={touched.companyAltName && !!errors.companyAltName} helperText={touched.companyAltName && errors.companyAltName ? errors.companyAltName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><BusinessOutlinedIcon sx={{ opacity: 0.7 }} /></InputAdornment>) }} /></Box>
                                     <Box><FormLabel sx={formLabelStyles}>Business Category *</FormLabel><TextField fullWidth select name="category" value={values.category} onChange={handleChange} onBlur={handleBlur} error={touched.category && !!errors.category} helperText={touched.category && errors.category ? errors.category : " "} variant="outlined" sx={{ ...textFieldStyles, '& .MuiSelect-select': { paddingLeft: '40px' } }} InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ ml: 1.5, mr: -1 }}><CategoryOutlinedIcon /></InputAdornment>) }} SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260 } } }, displayEmpty: true }}><MenuItem value="" disabled>Select a category...</MenuItem>{categories.map((cat) => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}</TextField></Box>
                                     <Box><FormLabel sx={formLabelStyles}>Company Business Description *</FormLabel><TextField fullWidth name="description" placeholder="Describe your business activities..." value={values.description} onChange={handleChange} onBlur={handleBlur} error={touched.description && !!errors.description} helperText={touched.description && errors.description ? errors.description : " "} variant="outlined" multiline rows={4} sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ mt: -9, mr: 0.5 }}><DescriptionOutlinedIcon /></InputAdornment>) }} /></Box>
                                     
                                     <Divider sx={{ my: 2 }} />
                                     <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', borderBottom: '1px solid #e5e7eb', pb: 1, mb: 1 }}>Business Address</Typography>
                                     <Box><FormLabel sx={formLabelStyles}>Street Address *</FormLabel><TextField fullWidth name="address" placeholder="123 Main St, Suite 100" value={values.address} onChange={handleChange} onBlur={handleBlur} error={touched.address && !!errors.address} helperText={touched.address && errors.address ? errors.address : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><LocationOnOutlinedIcon /></InputAdornment>) }} /></Box>
                                     <Box><FormLabel sx={formLabelStyles}>City *</FormLabel><TextField fullWidth name="city" placeholder="Anytown" value={values.city} onChange={handleChange} onBlur={handleBlur} error={touched.city && !!errors.city} helperText={touched.city && errors.city ? errors.city : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><LocationCityOutlinedIcon /></InputAdornment>) }} /></Box>
                                     <Box><FormLabel sx={formLabelStyles}>State *</FormLabel><TextField fullWidth select name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} error={touched.state && !!errors.state} helperText={touched.state && errors.state ? errors.state : " "} variant="outlined" sx={{ ...textFieldStyles, '& .MuiSelect-select': { paddingLeft: '40px' } }} InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ ml: 1.5, mr: -1 }}><MapOutlinedIcon /></InputAdornment>) }} SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260 } } }, displayEmpty: true }}><MenuItem value="" disabled>Select state...</MenuItem>{stateOptions.map((state) => (<MenuItem key={state} value={state}>{state}</MenuItem>))}</TextField></Box>
                                     <Box><FormLabel sx={formLabelStyles}>Zip Code *</FormLabel><TextField fullWidth name="zipCode" placeholder="e.g., 90210" value={values.zipCode} onChange={handleChange} onBlur={handleBlur} error={touched.zipCode && !!errors.zipCode} helperText={touched.zipCode && errors.zipCode ? errors.zipCode : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><LocalPostOfficeOutlinedIcon /></InputAdornment>) }} /></Box>

                                     <Divider sx={{ my: 2 }} />
                                     <FieldArray name="participants">
                                     {({ remove, push }) => (
                                         <Box>
                                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                 <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>Company Participants</Typography>
                                                 <Button startIcon={<AddCircleOutlineIcon />} onClick={() => push({ firstName: '', middleInitial: '', lastName: '', titles: [], address: '', city: '', state: '', zipCode: '', ownership: '', isSigner: false })}>Add Participant</Button>
                                             </Box>
                                              {typeof errors.participants === 'string' && <Typography color="error" variant="caption" sx={{mb: 2}}>{errors.participants}</Typography>}
                                             {values.participants.map((participant, index) => {
                                                 const participantErrors = (errors.participants?.length && errors.participants[index]) || {};
                                                 const participantTouched = (touched.participants?.length && touched.participants[index]) || {};
                                                 return (
                                                 <Paper key={index} sx={{ p: 3, mb: 3, borderRadius: '12px', border: '1px solid #e5e7eb', position: 'relative' }}>
                                                     <Typography variant="subtitle1" fontWeight="600" sx={{mb: 2}}>Participant #{index + 1}</Typography>
                                                     <IconButton onClick={() => values.participants.length > 1 && remove(index)} sx={{ position: 'absolute', top: 8, right: 8 }} disabled={values.participants.length <= 1}><DeleteIcon /></IconButton>
                                                     <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                                                         <Box sx={{gridColumn: '1 / -1'}}><FormLabel sx={formLabelStyles}>Full Name *</FormLabel><Box sx={{display: 'flex', gap: 2}}><TextField fullWidth name={`participants.${index}.firstName`} placeholder="First Name" value={participant.firstName} onChange={handleChange} onBlur={handleBlur} error={participantTouched.firstName && !!participantErrors.firstName} helperText={participantTouched.firstName && participantErrors.firstName ? participantErrors.firstName : " "} sx={textFieldStyles} /> 
                                                         <TextField fullWidth name={`participants.${index}.lastName`} placeholder="Last Name" value={participant.lastName} onChange={handleChange} onBlur={handleBlur} error={participantTouched.lastName && !!participantErrors.lastName} helperText={participantTouched.lastName && participantErrors.lastName ? participantErrors.lastName : " "} sx={textFieldStyles} /></Box></Box>
                                                         <Box sx={{gridColumn: '1 / -1'}}><FormLabel sx={formLabelStyles}>Title(s) *</FormLabel><FormControl fullWidth error={participantTouched.titles && !!participantErrors.titles}><Select multiple name={`participants.${index}.titles`} value={participant.titles} onChange={handleChange} input={<OutlinedInput sx={{...textFieldStyles, p:0, '& .MuiOutlinedInput-input': { p: '16.5px 14px'}}} />} renderValue={(selected) => (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map((value) => (<Chip key={value} label={value} />))}</Box>)} MenuProps={{ PaperProps: { sx: { maxHeight: 224 } } }}>{participantTitles.map((title) => (<MenuItem key={title} value={title}>{title}</MenuItem>))}</Select>{participantTouched.titles && participantErrors.titles && <Typography color="error" variant="caption">{participantErrors.titles}</Typography>}</FormControl></Box>
                                                         <Box sx={{gridColumn: '1 / -1'}}><FormLabel sx={formLabelStyles}>Mailing Address *</FormLabel><TextField fullWidth name={`participants.${index}.address`} placeholder="Street Address" value={participant.address} onChange={handleChange} onBlur={handleBlur} error={participantTouched.address && !!participantErrors.address} helperText={participantTouched.address && participantErrors.address ? participantErrors.address : " "} sx={textFieldStyles} /></Box>
                                                         <Box><FormLabel sx={formLabelStyles}>City *</FormLabel><TextField fullWidth name={`participants.${index}.city`} placeholder="City" value={participant.city} onChange={handleChange} onBlur={handleBlur} error={participantTouched.city && !!participantErrors.city} helperText={participantTouched.city && participantErrors.city ? participantErrors.city : " "} sx={textFieldStyles} /></Box>
                                                         <Box><FormLabel sx={formLabelStyles}>State *</FormLabel><TextField fullWidth select name={`participants.${index}.state`} value={participant.state} onChange={handleChange} onBlur={handleBlur} error={participantTouched.state && !!participantErrors.state} helperText={participantTouched.state && participantErrors.state ? participantErrors.state : " "} sx={{ ...textFieldStyles, '& .MuiSelect-select': { paddingLeft: '14px' } }} SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260 } } }, displayEmpty: true }}><MenuItem value="" disabled>Select state...</MenuItem>{stateOptions.map((state) => (<MenuItem key={state} value={state}>{state}</MenuItem>))}</TextField></Box>
                                                         <Box><FormLabel sx={formLabelStyles}>Zip Code *</FormLabel><TextField fullWidth name={`participants.${index}.zipCode`} placeholder="Zip Code" value={participant.zipCode} onChange={handleChange} onBlur={handleBlur} error={participantTouched.zipCode && !!participantErrors.zipCode} helperText={participantTouched.zipCode && participantErrors.zipCode ? participantErrors.zipCode : " "} sx={textFieldStyles} /></Box>
                                                         <Box><FormLabel sx={formLabelStyles}>Percentage of Ownership *</FormLabel><TextField fullWidth name={`participants.${index}.ownership`} type="number" placeholder="%" value={participant.ownership} onChange={handleChange} onBlur={handleBlur} error={participantTouched.ownership && !!participantErrors.ownership} helperText={participantTouched.ownership && participantErrors.ownership ? participantErrors.ownership : " "} sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><PercentIcon /></InputAdornment>) }} /></Box>
                                                         <Box><FormLabel sx={formLabelStyles}>Social Security Number</FormLabel><TextField fullWidth name={`participants.${index}.socialNumber`} placeholder="Owner Social Security Number" value={participant.socialNumber} onChange={handleChange} onBlur={handleBlur} error={participantTouched.socialNumber && !!participantErrors.socialNumber} helperText={participantTouched.socialNumber && participantErrors.socialNumber ? participantErrors.socialNumber : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><BusinessOutlinedIcon /></InputAdornment>) }} /></Box>

                                                         <FormControlLabel control={<Field as={Checkbox} type="checkbox" name={`participants.${index}.isSigner`} checked={participant.isSigner} />} label="Authorized Signer" sx={{gridColumn: '1 / -1', mt: 1}}/>
                                                     </Box>
                                                 </Paper>
                                             )})}
                                         </Box>
                                     )}
                                     </FieldArray>

                                     <Divider sx={{ my: 2 }} />
                                     <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', borderBottom: '1px solid #e5e7eb', pb: 1, mb: 1 }}>Registered Agent</Typography>
                                     <Box>
                                         <RadioGroup name="registeredAgentChoice" value={values.registeredAgentChoice} onChange={handleChange} sx={{ gap: 2 }}> 
                                             <FormControlLabel value="corpnet" control={<Radio size="medium" sx={{ '&.Mui-checked': { color: '#1d4ed8' } }} />} label="Use LAUNCH as my Registered Agent" sx={radioCardStyles(values.registeredAgentChoice === 'corpnet')} />
                                             <FormControlLabel value="own" control={<Radio size="medium" sx={{ '&.Mui-checked': { color: '#1d4ed8' } }} />} label="I will provide my own Registered Agent" sx={radioCardStyles(values.registeredAgentChoice === 'own')} />
                                         </RadioGroup>
                                     </Box>

                                     {values.registeredAgentChoice === 'own' && (
                                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1, p: 3, border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                                         <Box><FormLabel sx={formLabelStyles}>Agent First Name *</FormLabel><TextField fullWidth name="raFirstName" placeholder="Agent's first name" value={values.raFirstName} onChange={handleChange} onBlur={handleBlur} error={touched.raFirstName && !!errors.raFirstName} helperText={touched.raFirstName && errors.raFirstName ? errors.raFirstName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><AssignmentIndOutlinedIcon /></InputAdornment>) }} /></Box>
                                         <Box><FormLabel sx={formLabelStyles}>Agent Last Name *</FormLabel><TextField fullWidth name="raLastName" placeholder="Agent's last name" value={values.raLastName} onChange={handleChange} onBlur={handleBlur} error={touched.raLastName && !!errors.raLastName} helperText={touched.raLastName && errors.raLastName ? errors.raLastName : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><AssignmentIndOutlinedIcon /></InputAdornment>) }} /></Box>
                                         <Box><FormLabel sx={formLabelStyles}>Agent Street Address *</FormLabel><TextField fullWidth name="raAddress" placeholder="123 Agent St" value={values.raAddress} onChange={handleChange} onBlur={handleBlur} error={touched.raAddress && !!errors.raAddress} helperText={touched.raAddress && errors.raAddress ? errors.raAddress : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><LocationOnOutlinedIcon /></InputAdornment>) }} /></Box>
                                         <Box><FormLabel sx={formLabelStyles}>Agent City *</FormLabel><TextField fullWidth name="raCity" placeholder="Agentville" value={values.raCity} onChange={handleChange} onBlur={handleBlur} error={touched.raCity && !!errors.raCity} helperText={touched.raCity && errors.raCity ? errors.raCity : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><LocationCityOutlinedIcon /></InputAdornment>) }} /></Box>
                                         <Box><FormLabel sx={formLabelStyles}>Agent State *</FormLabel><TextField fullWidth select name="raState" value={values.raState} onChange={handleChange} onBlur={handleBlur} error={touched.raState && !!errors.raState} helperText={touched.raState && errors.raState ? errors.raState : " "} variant="outlined" sx={{ ...textFieldStyles, '& .MuiSelect-select': { paddingLeft: '40px' } }} InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ ml: 1.5, mr: -1 }}><MapOutlinedIcon /></InputAdornment>) }} SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260 } } }, displayEmpty: true }}><MenuItem value="" disabled>Select state...</MenuItem>{stateOptions.map((state) => (<MenuItem key={state} value={state}>{state}</MenuItem>))}</TextField></Box>
                                         <Box><FormLabel sx={formLabelStyles}>Agent Zip Code *</FormLabel><TextField fullWidth name="raZipCode" placeholder="e.g., 12345" value={values.raZipCode} onChange={handleChange} onBlur={handleBlur} error={touched.raZipCode && !!errors.raZipCode} helperText={touched.raZipCode && errors.raZipCode ? errors.raZipCode : " "} variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><LocalPostOfficeOutlinedIcon /></InputAdornment>) }} /></Box>
                                     </Box>
                                     )}

                                     <Divider sx={{ my: 2 }} />
                                     <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', borderBottom: '1px solid #e5e7eb', pb: 1, mb: 1 }}>Filing Speed</Typography>
                                     <Box>
                                         <RadioGroup name="filingSpeed" value={values.filingSpeed} onChange={handleChange} sx={{ gap: 2 }}>
                                             <FormControlLabel value="express" control={<Radio size="medium" sx={{ '&.Mui-checked': { color: '#1d4ed8' } }} />} label="Express +$150 (15-20 days)" sx={radioCardStyles(values.filingSpeed === 'express')} />
                                             <FormControlLabel value="standard" control={<Radio size="medium" sx={{ '&.Mui-checked': { color: '#1d4ed8' } }} />} label="Standard (30-60 days)" sx={radioCardStyles(values.filingSpeed === 'standard')} />
                                         </RadioGroup>
                                         {touched.filingSpeed && errors.filingSpeed && (<Typography color="error" variant="caption" sx={{ display: 'block', mt: 1, ml: '2px', fontWeight: 500 }}>{errors.filingSpeed}</Typography>)}
                                     </Box>
                                     
                                     <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                         <Typography variant="subtitle2" sx={{ color: '#888', fontWeight: 600, textAlign: 'center', mb: 1, letterSpacing: 1 }}>Step 3</Typography>
                                         <Button type="submit" variant="contained" disabled={isFetchingPackages} size="large" sx={{ bgcolor: '#1d4ed8', color: 'white', textTransform: 'none', fontWeight: '600', p: '12px 36px', borderRadius: '10px', fontSize: '1rem', minWidth: '240px', boxShadow: '0 4px 10px -2px rgba(29,78,216,0.3)', '&:hover': { bgcolor: '#1e40af', boxShadow: '0 6px 14px -3px rgba(29,78,216,0.35)', transform: 'translateY(-1px)' } }}>
                                             {isFetchingPackages ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                         </Button>
                                     </Box>
                                 </Box>
                         
                             </Form>
                             )
                         }}
                     </Formik>
                 </Paper>
                 </Box></Box>
        </>
    );
};

export default BusinessForm;