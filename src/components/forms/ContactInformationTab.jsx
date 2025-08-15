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
    FormControlLabel,
    Checkbox
} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { participantTitles, textFieldStyles, formLabelStyles } from '../../utils/formConstants';

const ContactInformationTab = ({ 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    isAuthenticated, 
    user 
}) => {
    return (
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
            
            <Grid>
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
                            Middle Name (Optional)
                        </FormLabel>
                        <TextField 
                            fullWidth 
                            name="middleName" 
                            placeholder="Enter Middle Name" 
                            value={values.middleName} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            error={touched.middleName && !!errors.middleName} 
                            helperText={touched.middleName && errors.middleName ? errors.middleName : " "} 
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
                    
                    <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                        <FormLabel sx={formLabelStyles}>
                            Title
                        </FormLabel>
                        <FormControl fullWidth>
                            <Select
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.title && !!errors.title}
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
                                    Select Title
                                </MenuItem>
                                {participantTitles.map((title) => (
                                    <MenuItem key={title} value={title}>{title}</MenuItem>
                                ))}
                            </Select>
                            {touched.title && errors.title && (
                                <Typography color="error" variant="caption">
                                    {errors.title}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                </Box>

                <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                    <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                        <FormLabel sx={formLabelStyles}>
                        Email Address
                            {/*  {isAuthenticated && user?.email && (
                                <Typography component="span" sx={{ color: '#10b981', fontSize: '0.875rem', ml: 1 }}>
                                    (Logged in user)
                                </Typography>
                            )} */}
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
                            // disabled={isAuthenticated && user?.email}
                            sx={{
                                ...textFieldStyles,
                                '& .Mui-disabled': {
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151'
                                }
                            }} 
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

                <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                    <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="hasSSN"
                                    checked={values.hasSSN}
                                    onChange={handleChange}
                                />
                            }
                            label="Has SSN"
                        />
                    </Grid>
                </Box>
                
                {values.hasSSN && (
                    <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                            <FormLabel sx={formLabelStyles}>
                                SSN (9 digits)
                            </FormLabel>
                            <TextField 
                                fullWidth 
                                name="ssn" 
                                placeholder="Enter 9-digit SSN" 
                                value={values.ssn} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                error={touched.ssn && !!errors.ssn} 
                                helperText={touched.ssn && errors.ssn ? errors.ssn : " "} 
                                variant="outlined" 
                                sx={textFieldStyles} 
                                inputProps={{ maxLength: 9 }}
                                InputProps={{ 
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AssignmentIndOutlinedIcon />
                                        </InputAdornment>
                                    ) 
                                }} 
                            />
                        </Grid>
                    </Box>
                )}
            </Grid>
        </Box>
    );
};

export default ContactInformationTab; 