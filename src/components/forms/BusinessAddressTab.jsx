import React from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Typography,
    Grid,
    FormLabel,
    InputAdornment,
    FormControl,
    Select
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import { states, stateOptions, countries, countryOptions, textFieldStyles, formLabelStyles } from '../../utils/formConstants';

const BusinessAddressTab = ({ values, errors, touched, handleChange, handleBlur }) => {
    return (
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
            
            <Grid>
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
                            Address Line 2 (Optional)
                        </FormLabel>
                        <TextField 
                            fullWidth 
                            name="address2" 
                            placeholder="Apartment, suite, etc." 
                            value={values.address2} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            error={touched.address2 && !!errors.address2} 
                            helperText={touched.address2 && errors.address2 ? errors.address2 : " "} 
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
                </Box>
                
                <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"}, mt: 2 }}>
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
                </Box>
                
                <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"}, mt: 2 }}>
                    <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                        <FormLabel sx={formLabelStyles}>
                            Country
                        </FormLabel>
                        <FormControl fullWidth>
                            <Select
                                name="country"
                                value={values.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.country && !!errors.country}
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
                                    Select country...
                                </MenuItem>
                                {countryOptions.map((countryName) => (
                                    <MenuItem key={countryName} value={countries[countryName]}>{countryName}</MenuItem>
                                ))}
                            </Select>
                            {touched.country && errors.country && (
                                <Typography color="error" variant="caption">
                                    {errors.country}
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
    );
};

export default BusinessAddressTab; 