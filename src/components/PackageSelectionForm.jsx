
// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Typography,
//     Paper,
//     FormControl,
//     Select,
//     MenuItem,
//     Button,
//     Grid,
//     Card,
//     CardContent,
//     Chip
// } from '@mui/material';
// import { red } from "@mui/material/colors";
// import api from '../lib/apiClient';


// const PackageSelectionForm = ({ packageData, onPackageSelect, onCancel, handlePayment }) => {
//     const [selectedPackage, setSelectedPackage] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [plans, setPlans] = useState([]); // from /api/packages
//     const [selectedPlan, setSelectedPlan] = useState(null);

//     useEffect(() => {
//         // Load static plans (Basic, Premium, Platinum)
//         api.get("/api/packages").then((res) => {
//             setPlans(res.data);
//         }).catch(console.error);
//     }, []);

//     const handlePackageSelect = (packageId) => {
//         setSelectedPackage(packageId);
//         setSelectedPlan(null); // reset plan when package changes
//     };

//     const handlePlanSelect = (plan) => {
//         setSelectedPlan(plan);
//     };

//     const handlePay = async () => {
//         if (!selectedPackage) {
//             alert('Please select a Complete package first');
//             return;
//         }
//         if (!selectedPlan) {
//             alert('Please select a plan first');
//             return;
//         }

//         setIsProcessing(true);
//         try {
//             const packageInfo = packageData.packages.find(pkg => pkg.id === selectedPackage);
//             await onPackageSelect({
//                 ...packageInfo,
//                 selectedPlan,
//             });
//             // handlePayment is already called in onPackageSelect, so we don't need to call it again
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             alert('Error processing payment. Please try again.');
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const getTotalPrice = () => {
//         if (!selectedPackage || !selectedPlan) return null;
//         const completePkg = packageData.packages.find(pkg => pkg.id === selectedPackage);
//         const completePrice = Number(completePkg.totalPrice.replace(/[^0-9.-]+/g, ""));
//         return `$${(completePrice + completePrice*0.33 + (selectedPlan.extraCharge || 0)).toFixed(2)}`;
//     };

//     return (
//         <Box sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '80vh',
//             p: 4
//         }}>
//             <Paper elevation={3} sx={{
//                 maxWidth: 1200,
//                 width: '100%',
//                 mx: 'auto',
//                 p: 4,
//                 bgcolor: '#ffffff',
//                 borderRadius: '16px',
//                 boxShadow: '0 12px 30px -8px rgba(0,0,0,0.1)'
//             }}>
//                 <Typography variant="h4" align="center" gutterBottom fontWeight="700" sx={{ mb: 4, color: '#111827' }}>
//                     Select Your Business Formation Package
//                 </Typography>

//                 <Box sx={{ mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
//                     <Typography variant="h6" sx={{ mb: 2, color: '#1e293b', fontWeight: 600 }}>
//                         Package Details
//                     </Typography>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={6}>
//                             <Typography variant="body2" sx={{ color: '#64748b' }}>
//                                 <strong>Entity Type:</strong> {packageData.entityType}
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <Typography variant="body2" sx={{ color: '#64748b' }}>
//                                 <strong>Filing Speed:</strong> {packageData.filing}
//                             </Typography>
//                         </Grid>
//                     </Grid>
//                 </Box>

//                 {/* Select Complete Package */}
//                 <FormControl fullWidth sx={{ mb: 4 }}>
//                     <Typography variant="h6" sx={{ mb: 2, color: '#1e293b', fontWeight: 600 }}>
//                         Choose Your Complete Package
//                     </Typography>
//                     <Select
//                         value={selectedPackage}
//                         onChange={(e) => handlePackageSelect(e.target.value)}
//                         displayEmpty
//                         sx={{
//                             '& .MuiSelect-select': {
//                                 padding: '16px',
//                                 fontSize: '16px',
//                                 fontWeight: 500
//                             }
//                         }}
//                     >
//                         <MenuItem value="" disabled>
//                             Select a package...
//                         </MenuItem>
//                         {packageData.packages
//                             .filter(pkg => pkg.name === "Complete")
//                             .map((pkg) => (
//                                 <MenuItem key={pkg.id} value={pkg.id}>
//                                     {pkg.name} - {pkg.totalPrice}
//                                 </MenuItem>
//                             ))}
//                     </Select>
//                 </FormControl>

//                 {/* Plans Grid */}
//                 {selectedPackage && (
//                     <Grid container spacing={2} sx={{ mb: 4 }} justifyContent="center">
//                         {plans.map((plan, idx) => (
//                             <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: 'flex' }}>
//                                 <Card
//                                     variant="outlined"
//                                     sx={{
//                                         borderColor: plan.recommended ? red[500] : 'grey.300',
//                                         borderWidth: plan.recommended ? 2 : 1,
//                                         borderRadius: 4,
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         p: 2,
//                                         height: '400px',
//                                         width: { xs: "272px", md:'272px'},
//                                         backgroundColor: '#fff'
//                                     }}
//                                 >
//                                     {plan.recommended && (
//                                         <Chip
//                                             label="Recommended"
//                                             sx={{
//                                                 backgroundColor: red[500],
//                                                 color: '#fff',
//                                                 mb: 1
//                                             }}
//                                         />
//                                     )}
//                                     <CardContent sx={{ flexGrow: 1 }}>
//                                         <Typography variant="h6">{plan.title}</Typography>
//                                         <Typography variant="body1" fontWeight={600}>{plan.cost}</Typography>
//                                         <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
//                                             Includes:
//                                         </Typography>
//                                         <ul style={{ paddingLeft: 16 }}>
//                                             {plan.features.map((f, i) => (
//                                                 <li key={i}>
//                                                     <Typography variant="body2">{f}</Typography>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </CardContent>
//                                     <Button
//                                         variant={selectedPlan?.title === plan.title ? "contained" : "outlined"}
//                                         color="error"
//                                         onClick={() => handlePlanSelect(plan)}
//                                     >
//                                         {selectedPlan?.title === plan.title ? "Selected" : "Select Plan"}
//                                     </Button>
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 )}

//                 {/* Total Price */}
//                 {getTotalPrice() && (
//                     <Box sx={{ mb: 4 }}>
//                         <Typography variant="h6">
//                             Total Price: {getTotalPrice()}
//                         </Typography>
//                     </Box>
//                 )}

//                 {/* Actions */}
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Button
//                         variant="outlined"
//                         onClick={onCancel}
//                         disabled={isProcessing}
//                         sx={{
//                             textTransform: 'none',
//                             fontWeight: 600,
//                             height: '50px',
//                             borderRadius: '8px',
//                             fontSize: '18px',
//                             px: 4
//                         }}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="contained"
//                         onClick={handlePay}
//                         disabled={!selectedPackage || !selectedPlan || isProcessing}
//                         sx={{
//                             textTransform: 'none',
//                             fontWeight: 600,
//                             borderRadius: '8px',
//                             px: 4,
//                             bgcolor: '#dc2626',
//                             '&:hover': { bgcolor: '#b91c1c' }
//                         }}
//                     >
//                         {isProcessing ? 'Processing...' : 'Pay Now'}
//                     </Button>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// };

// export default PackageSelectionForm;

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Grid,
    Card,
    CardContent,
    Chip
} from '@mui/material';
import { red } from "@mui/material/colors";
import api from '../lib/apiClient';

const PackageSelectionForm = ({ packageData, onPackageSelect, onCancel }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState('');

    useEffect(() => {
        // Auto-select Complete package
        const completePkg = packageData.packages.find(pkg => pkg.name === "Complete");
        if (completePkg) {
            setSelectedPackage(completePkg.id);
        }

        // Load plans & auto-select Basic
        api.get("/api/packages")
            .then((res) => {
                setPlans(res.data);
                const basicPlan = res.data.find(plan => plan.title.toLowerCase() === "basic");
                if (basicPlan) {
                    setSelectedPlan(basicPlan);
                }
            })
            .catch(console.error);
    }, [packageData]);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handlePay = async () => {
        if (!selectedPlan) {
            alert('Please select a plan first');
            return;
        }

        setIsProcessing(true);
        try {
            const packageInfo = packageData.packages.find(pkg => pkg.id === selectedPackage);
            await onPackageSelect({
                ...packageInfo,
                selectedPlan,
            });
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Error processing payment. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const getCompletePriceWith33 = () => {
        const completePkg = packageData.packages.find(pkg => pkg.id === selectedPackage);
        if (!completePkg) return 0;
        const completePrice = Number(completePkg.totalPrice.replace(/[^0-9.-]+/g, ""));
        return completePrice + completePrice * 0.33; // including 33%
    };

    const getTotalPrice = () => {
        if (!selectedPackage || !selectedPlan) return null;
        return (getCompletePriceWith33() + (selectedPlan.extraCharge || 0)).toFixed(2);
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
                    Select Your Business Formation Package
                </Typography>

                {/* Package Details */}
                <Box sx={{ mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1e293b', fontWeight: 600 }}>
                        Package Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                <strong>Entity Type:</strong> {packageData.entityType}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                <strong>Filing Speed:</strong> {packageData.filing}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                {/* Plans Grid */}
                {selectedPackage && (
                    <Grid container spacing={2} sx={{ mb: 4 }} justifyContent="center">
                        {plans.map((plan, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: 'flex' }}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        borderColor: plan.recommended ? red[500] : 'grey.300',
                                        borderWidth: plan.recommended ? 2 : 1,
                                        borderRadius: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        p: 2,
                                        height: '400px',
                                        width: { xs: "272px", md: '272px' },
                                        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                                         '&:hover': {
                                           transform: 'translateY(-8px)',
                                           boxShadow: 12,
                                         },
                                        backgroundColor: '#fff',
                                        position: 'relative',
                                        overflow: 'visible',
                                    }}
                                >
                                    {plan.recommended && (
                                        <Chip
                                            label="Recommended"
                                            sx={{
                                                backgroundColor: red[500],
                                                color: '#fff',
                                                fontSize: 12,
                                                borderRadius: '9999px',
                                                position: 'absolute',
                                                top: -14,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    )}
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        
                                        <Box
                                                sx={{
                                                  backgroundColor: '#f7f7f7',
                                                  borderRadius: 2,
                                                  py: 1.5,
                                                  textAlign: 'center',
                                                  mb: 2,
                                                }}
                                              >
                                                <Typography variant="h6" fontSize={{xs: "20px", md:"24px"}} color="text.primary" fontWeight="500">
                                                      {plan.title}
                                                </Typography>
                                                <Typography variant="subtitle1" fontSize={{xs: "16px", md:"20px"}} fontWeight="600">
                                                {plan.cost}
                                                </Typography>
                                              </Box>
                                        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                                            Includes:
                                        </Typography>
                                        <ul style={{ paddingLeft: 16 }}>
                                            {plan.features.map((f, i) => (
                                                <li key={i}>
                                                    <Typography variant="body2">{f}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <Button
                                        variant={selectedPlan?.title === plan.title ? "contained" : "outlined"}
                                        color="error"
                                        onClick={() => handlePlanSelect(plan)}
                                    >
                                        {selectedPlan?.title === plan.title ? "Selected" : "Select Plan"}
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Pricing Breakdown */}
                {getTotalPrice() && (
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="body1">
                            LLC Cost: ${getCompletePriceWith33().toFixed(2)}
                        </Typography>
                        <Typography variant="body1">
                           Package Extra Charge: ${selectedPlan?.extraCharge || 0}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                            Total Price: ${getTotalPrice()}
                        </Typography>
                    </Box>
                )}

                {/* Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="outlined"
                        onClick={onCancel}
                        disabled={isProcessing}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            height: '50px',
                            borderRadius: '8px',
                            fontSize: '18px',
                            px: 4
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handlePay}
                        disabled={!selectedPackage && !selectedPlan && isProcessing}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: '8px',
                            px: 4,
                            bgcolor: '#dc2626',
                            '&:hover': { bgcolor: '#b91c1c' }
                        }}
                    >
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default PackageSelectionForm;
