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
    Button,
    Paper,
    IconButton
} from '@mui/material';
import { FieldArray } from 'formik';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { states, stateOptions, countries, countryOptions, textFieldStyles, formLabelStyles } from '../../utils/formConstants';

const ParticipantsTab = ({ values, errors, touched, handleChange, handleBlur }) => {
    return (
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
                                    
                                    <Grid>
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
                                        
                                        <Box sx={{ display: "flex", gap: {xs: 2, md: 3}, flexDirection: {xs: "column", md: "row"}, mt: 2 }}>
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
                                            
                                            <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                <FormLabel sx={formLabelStyles}>
                                                    Address Line 2 (Optional)
                                                </FormLabel>
                                                <TextField 
                                                    fullWidth 
                                                    name={`participants.${index}.address2`}
                                                    placeholder="Apartment, suite, etc." 
                                                    value={participant.address2 || ''} 
                                                    onChange={handleChange} 
                                                    onBlur={handleBlur} 
                                                    error={participantTouched.address2 && !!participantErrors.address2} 
                                                    helperText={participantTouched.address2 && participantErrors.address2 ? participantErrors.address2 : " "} 
                                                    sx={textFieldStyles} 
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
                                            
                                            <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                <FormLabel sx={formLabelStyles}>
                                                    Country
                                                </FormLabel>
                                                <FormControl fullWidth>
                                                    <Select
                                                        name={`participants.${index}.country`}
                                                        value={participant.country}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={participantTouched.country && !!participantErrors.country}
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
                                                    {participantTouched.country && participantErrors.country && (
                                                        <Typography color="error" variant="caption">
                                                            {participantErrors.country}
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Box>

                                        <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"}, mt: 2 }}>
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
                                        
                                        <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"}, mt: 2 }}>
                                            <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                <FormLabel sx={formLabelStyles}>
                                                    Contributed
                                                </FormLabel>
                                                <TextField 
                                                    fullWidth 
                                                    name={`participants.${index}.Contributed`}
                                                    placeholder="Contributed"
                                                    value={participant.Contributed || ''} 
                                                    onChange={handleChange} 
                                                    onBlur={handleBlur} 
                                                    error={participantTouched.Contributed && !!participantErrors.Contributed} 
                                                    helperText={participantTouched.Contributed && participantErrors.Contributed ? participantErrors.Contributed : " "} 
                                                    sx={textFieldStyles} 
                                                />
                                            </Grid>
                                            
                                            <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                                                <FormLabel sx={formLabelStyles}>
                                                    Contributer Market Value
                                                </FormLabel>
                                                <TextField 
                                                    fullWidth 
                                                    name={`participants.${index}.ContributerMarketValue`}
                                                    type="number"
                                                    placeholder="0"
                                                    value={participant.ContributerMarketValue || ''} 
                                                    onChange={handleChange} 
                                                    onBlur={handleBlur} 
                                                    error={participantTouched.ContributerMarketValue && !!participantErrors.ContributerMarketValue} 
                                                    helperText={participantTouched.ContributerMarketValue && participantErrors.ContributerMarketValue ? participantErrors.ContributerMarketValue : " "} 
                                                    sx={textFieldStyles} 
                                                />
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Paper>
                            );
                        })}
                        
                        <Button 
                            startIcon={<AddCircleOutlineIcon />} 
                            onClick={() => push({
                                firstName: '',
                                lastName: '',
                                address: '',
                                address2: '',
                                city: '',
                                state: '',
                                country: 'US',
                                zipCode: '',
                                ownership: '',
                                Contributed: '',
                                ContributerMarketValue: ''
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
    );
};

export default ParticipantsTab; 