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
    Select,
    
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { categories, textFieldStyles, formLabelStyles } from '../../utils/formConstants';

const CompanyInformationTab = ({ values, errors, touched, handleChange, handleBlur }) => {
    return (
        <Box sx={{width: "100%",}}>
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
                                input={
                                    <OutlinedInput
                                      sx={{
                                        borderRadius: "8px",
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "#e70000",
                                        },
                                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "#e70000",
                                        },
                                      }}
                                    /> }
                                
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
    );
};

export default CompanyInformationTab; 