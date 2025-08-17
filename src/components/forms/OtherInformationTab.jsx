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
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import SpeedIcon from '@mui/icons-material/Speed';
import BusinessIcon from '@mui/icons-material/Business';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import { states, stateOptions, countries, countryOptions, textFieldStyles, formLabelStyles } from '../../utils/formConstants';

const OtherInformationTab = ({ values, errors, touched, handleChange, handleBlur }) => {
    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    color: '#1f2937',
                    borderBottom: '1px solid #e5e7eb',
                    pb: 1,
                    mb: 3
                }}
            >
                Other Information
            </Typography>

            <Box sx={{ display: 'flex', gap: { xs: 0, md: 3 }, flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Filing Speed - Radio Buttons */}
                <Grid sx={{ width: { xs: '100%', md: '50%' } }}>
                    <FormLabel sx={formLabelStyles}>Filing Speed</FormLabel>
                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                            name="filingSpeed"
                            value={values.filingSpeed}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <FormControlLabel
                                value="standard"
                                control={<Radio />}
                                label="Standard (30-60 days)"
                            />
                            <FormControlLabel
                                value="express"
                                control={<Radio />}
                                label="Express +$150 (15-20 days)"
                            />
                        </RadioGroup>
                        {touched.filingSpeed && errors.filingSpeed && (
                            <Typography color="error" variant="caption">
                                {errors.filingSpeed}
                            </Typography>
                        )}
                    </FormControl>
                </Grid>

                {/* Registered Agent */}
                <Grid sx={{ width: { xs: '100%', md: '50%' }, mt: {xs: 2, md: 0}}}>
                    <FormLabel sx={formLabelStyles}>Registered Agent</FormLabel>
                    <FormControl fullWidth>
                        <Select
                            name="registeredAgentChoice"
                            value={values.registeredAgentChoice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.registeredAgentChoice && !!errors.registeredAgentChoice}
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

            {values.registeredAgentChoice === 'own' && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        color: '#1f2937', 
                        borderBottom: '1px solid #e5e7eb', 
                        pb: 1, 
                        mb: 3 
                    }}>
                        Registered Agent Information
                    </Typography>
                    
                    <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                            <FormLabel sx={formLabelStyles}>
                                First Name
                            </FormLabel>
                            <TextField 
                                fullWidth 
                                name="registeredAgentFirstName" 
                                placeholder="Enter First Name" 
                                value={values.registeredAgentFirstName} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                error={touched.registeredAgentFirstName && !!errors.registeredAgentFirstName} 
                                helperText={touched.registeredAgentFirstName && errors.registeredAgentFirstName ? errors.registeredAgentFirstName : " "} 
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
                                name="registeredAgentLastName" 
                                placeholder="Enter Last Name" 
                                value={values.registeredAgentLastName} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                error={touched.registeredAgentLastName && !!errors.registeredAgentLastName} 
                                helperText={touched.registeredAgentLastName && errors.registeredAgentLastName ? errors.registeredAgentLastName : " "} 
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
                    
                    <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"}, mt: 2 }}>
                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                            <FormLabel sx={formLabelStyles}>
                                Address Line 1
                            </FormLabel>
                            <TextField 
                                fullWidth 
                                name="registeredAgentAddress1" 
                                placeholder="Enter Street Address" 
                                value={values.registeredAgentAddress1} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                error={touched.registeredAgentAddress1 && !!errors.registeredAgentAddress1} 
                                helperText={touched.registeredAgentAddress1 && errors.registeredAgentAddress1 ? errors.registeredAgentAddress1 : " "} 
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
                                name="registeredAgentAddress2" 
                                placeholder="Apartment, suite, etc." 
                                value={values.registeredAgentAddress2} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                error={touched.registeredAgentAddress2 && !!errors.registeredAgentAddress2} 
                                helperText={touched.registeredAgentAddress2 && errors.registeredAgentAddress2 ? errors.registeredAgentAddress2 : " "} 
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
                                name="registeredAgentCity" 
                                placeholder="Enter City" 
                                value={values.registeredAgentCity} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                error={touched.registeredAgentCity && !!errors.registeredAgentCity} 
                                helperText={touched.registeredAgentCity && errors.registeredAgentCity ? errors.registeredAgentCity : " "} 
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
                                    name="registeredAgentState"
                                    value={values.registeredAgentState}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.registeredAgentState && !!errors.registeredAgentState}
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
                                {touched.registeredAgentState && errors.registeredAgentState && (
                                    <Typography color="error" variant="caption">
                                        {errors.registeredAgentState}
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
                                name="registeredAgentZip" 
                                placeholder="Enter Zip Code" 
                                value={values.registeredAgentZip} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                error={touched.registeredAgentZip && !!errors.registeredAgentZip} 
                                helperText={touched.registeredAgentZip && errors.registeredAgentZip ? errors.registeredAgentZip : " "} 
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
                        
                        <Grid sx={{width: { xs: '100%', md: "50%"}}}>
                            <FormLabel sx={formLabelStyles}>
                                Country
                            </FormLabel>
                            <FormControl fullWidth>
                                <Select
                                    name="registeredAgentCountry"
                                    value={values.registeredAgentCountry}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.registeredAgentCountry && !!errors.registeredAgentCountry}
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
                                        Select country...
                                    </MenuItem>
                                    {countryOptions.map((countryName) => (
                                        <MenuItem key={countryName} value={countries[countryName]}>{countryName}</MenuItem>
                                    ))}
                                </Select>
                                {touched.registeredAgentCountry && errors.registeredAgentCountry && (
                                    <Typography color="error" variant="caption">
                                        {errors.registeredAgentCountry}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid>
                    </Box>
                </Box>
            )}

         
        </Box>
    );
};

export default OtherInformationTab;


// import React from 'react';
// import {
//     Box,
//     TextField,
//     MenuItem,
//     Typography,
//     Grid,
//     FormLabel,
//     InputAdornment,
//     FormControl,
//     Select
// } from '@mui/material';
// import SpeedIcon from '@mui/icons-material/Speed';
// import BusinessIcon from '@mui/icons-material/Business';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
// import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
// import { states, stateOptions, countries, countryOptions, textFieldStyles, formLabelStyles } from '../../utils/formConstants';

// const OtherInformationTab = ({ values, errors, touched, handleChange, handleBlur }) => {
//     return (
//         <Box>
//             <Typography variant="h6" sx={{ 
//                 fontWeight: 600, 
//                 color: '#1f2937', 
//                 borderBottom: '1px solid #e5e7eb', 
//                 pb: 1, 
//                 mb: 3 
//             }}>
//                 Other Information
//             </Typography>
            
//             <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
//                 <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                     <FormLabel sx={formLabelStyles}>
//                         Filing Speed
//                     </FormLabel>
//                     <FormControl fullWidth>
//                         <Select
//                             name="filingSpeed"
//                             value={values.filingSpeed}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.filingSpeed && !!errors.filingSpeed}
//                             displayEmpty
//                             sx={{
//                                 ...textFieldStyles,
//                                 '& .MuiSelect-select': {
//                                     paddingLeft: '40px',
//                                     textAlign: 'left'
//                                 }
//                             }}
//                         >
//                             <MenuItem value="standard">Standard (30-60 days)</MenuItem>
//                             <MenuItem value="express">Express +$150 (15-20 days)</MenuItem>
//                         </Select>
//                         {touched.filingSpeed && errors.filingSpeed && (
//                             <Typography color="error" variant="caption">
//                                 {errors.filingSpeed}
//                             </Typography>
//                         )}
//                     </FormControl>
//                 </Grid>
                
//                 <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                     <FormLabel sx={formLabelStyles}>
//                         Registered Agent
//                     </FormLabel>
//                     <FormControl fullWidth>
//                         <Select
//                             name="registeredAgentChoice"
//                             value={values.registeredAgentChoice}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.registeredAgentChoice && !!errors.registeredAgentChoice}
//                             displayEmpty
//                             sx={{
//                                 ...textFieldStyles,
//                                 '& .MuiSelect-select': {
//                                     paddingLeft: '40px',
//                                     textAlign: 'left'
//                                 }
//                             }}
//                         >
//                             <MenuItem value="corpnet">Use LAUNCH as my Registered Agent</MenuItem>
//                             <MenuItem value="own">I will provide my own Registered Agent</MenuItem>
//                         </Select>
//                         {touched.registeredAgentChoice && errors.registeredAgentChoice && (
//                             <Typography color="error" variant="caption">
//                                 {errors.registeredAgentChoice}
//                             </Typography>
//                         )}
//                     </FormControl>
//                 </Grid>
//             </Box>
            
//             {/* Registered Agent Fields - Only show when user chooses to provide their own */}
//             {values.registeredAgentChoice === 'own' && (
//                 <Box sx={{ mt: 4 }}>
//                     <Typography variant="h6" sx={{ 
//                         fontWeight: 600, 
//                         color: '#1f2937', 
//                         borderBottom: '1px solid #e5e7eb', 
//                         pb: 1, 
//                         mb: 3 
//                     }}>
//                         Registered Agent Information
//                     </Typography>
                    
//                     <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"} }}>
//                         <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                             <FormLabel sx={formLabelStyles}>
//                                 First Name
//                             </FormLabel>
//                             <TextField 
//                                 fullWidth 
//                                 name="registeredAgentFirstName" 
//                                 placeholder="Enter First Name" 
//                                 value={values.registeredAgentFirstName} 
//                                 onChange={handleChange} 
//                                 onBlur={handleBlur} 
//                                 error={touched.registeredAgentFirstName && !!errors.registeredAgentFirstName} 
//                                 helperText={touched.registeredAgentFirstName && errors.registeredAgentFirstName ? errors.registeredAgentFirstName : " "} 
//                                 variant="outlined" 
//                                 sx={textFieldStyles} 
//                                 InputProps={{ 
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <PersonOutlineOutlinedIcon />
//                                         </InputAdornment>
//                                     ) 
//                                 }} 
//                             />
//                         </Grid>
                        
//                         <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                             <FormLabel sx={formLabelStyles}>
//                                 Last Name
//                             </FormLabel>
//                             <TextField 
//                                 fullWidth 
//                                 name="registeredAgentLastName" 
//                                 placeholder="Enter Last Name" 
//                                 value={values.registeredAgentLastName} 
//                                 onChange={handleChange} 
//                                 onBlur={handleBlur} 
//                                 error={touched.registeredAgentLastName && !!errors.registeredAgentLastName} 
//                                 helperText={touched.registeredAgentLastName && errors.registeredAgentLastName ? errors.registeredAgentLastName : " "} 
//                                 variant="outlined" 
//                                 sx={textFieldStyles} 
//                                 InputProps={{ 
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <PersonOutlineOutlinedIcon />
//                                         </InputAdornment>
//                                     ) 
//                                 }} 
//                             />
//                         </Grid>
//                     </Box>
                    
//                     <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"}, mt: 2 }}>
//                         <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                             <FormLabel sx={formLabelStyles}>
//                                 Address Line 1
//                             </FormLabel>
//                             <TextField 
//                                 fullWidth 
//                                 name="registeredAgentAddress1" 
//                                 placeholder="Enter Street Address" 
//                                 value={values.registeredAgentAddress1} 
//                                 onChange={handleChange} 
//                                 onBlur={handleBlur} 
//                                 error={touched.registeredAgentAddress1 && !!errors.registeredAgentAddress1} 
//                                 helperText={touched.registeredAgentAddress1 && errors.registeredAgentAddress1 ? errors.registeredAgentAddress1 : " "} 
//                                 variant="outlined" 
//                                 sx={textFieldStyles} 
//                                 InputProps={{ 
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <LocationOnOutlinedIcon />
//                                         </InputAdornment>
//                                     ) 
//                                 }} 
//                             />
//                         </Grid>
                        
//                         <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                             <FormLabel sx={formLabelStyles}>
//                                 Address Line 2 (Optional)
//                             </FormLabel>
//                             <TextField 
//                                 fullWidth 
//                                 name="registeredAgentAddress2" 
//                                 placeholder="Apartment, suite, etc." 
//                                 value={values.registeredAgentAddress2} 
//                                 onChange={handleChange} 
//                                 onBlur={handleBlur} 
//                                 error={touched.registeredAgentAddress2 && !!errors.registeredAgentAddress2} 
//                                 helperText={touched.registeredAgentAddress2 && errors.registeredAgentAddress2 ? errors.registeredAgentAddress2 : " "} 
//                                 variant="outlined" 
//                                 sx={textFieldStyles} 
//                                 InputProps={{ 
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <LocationOnOutlinedIcon />
//                                         </InputAdornment>
//                                     ) 
//                                 }} 
//                             />
//                         </Grid>
//                     </Box>
                    
//                     <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"}, mt: 2 }}>
//                         <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                             <FormLabel sx={formLabelStyles}>
//                                 City
//                             </FormLabel>
//                             <TextField 
//                                 fullWidth 
//                                 name="registeredAgentCity" 
//                                 placeholder="Enter City" 
//                                 value={values.registeredAgentCity} 
//                                 onChange={handleChange} 
//                                 onBlur={handleBlur} 
//                                 error={touched.registeredAgentCity && !!errors.registeredAgentCity} 
//                                 helperText={touched.registeredAgentCity && errors.registeredAgentCity ? errors.registeredAgentCity : " "} 
//                                 variant="outlined" 
//                                 sx={textFieldStyles} 
//                                 InputProps={{ 
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <LocationCityOutlinedIcon />
//                                         </InputAdornment>
//                                     ) 
//                                 }} 
//                             />
//                         </Grid>
                        
//                         <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                             <FormLabel sx={formLabelStyles}>
//                                 State
//                             </FormLabel>
//                             <FormControl fullWidth>
//                                 <Select
//                                     name="registeredAgentState"
//                                     value={values.registeredAgentState}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     error={touched.registeredAgentState && !!errors.registeredAgentState}
//                                     displayEmpty
//                                     sx={{
//                                         ...textFieldStyles,
//                                         '& .MuiSelect-select': {
//                                             paddingLeft: '14px',
//                                             textAlign: 'left'
//                                         }
//                                     }}
//                                 >
//                                     <MenuItem value="" disabled>
//                                         Select state...
//                                     </MenuItem>
//                                     {stateOptions.map((stateName) => (
//                                         <MenuItem key={stateName} value={states[stateName]}>{stateName}</MenuItem>
//                                     ))}
//                                 </Select>
//                                 {touched.registeredAgentState && errors.registeredAgentState && (
//                                     <Typography color="error" variant="caption">
//                                         {errors.registeredAgentState}
//                                     </Typography>
//                                 )}
//                             </FormControl>
//                         </Grid>
//                     </Box>
                    
//                     <Box sx={{ display: "flex", gap: {xs: 0, md: 3}, flexDirection: {xs: "column", md: "row"}, mt: 2 }}>
//                         <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                             <FormLabel sx={formLabelStyles}>
//                                 Zip Code
//                             </FormLabel>
//                             <TextField 
//                                 fullWidth 
//                                 name="registeredAgentZip" 
//                                 placeholder="Enter Zip Code" 
//                                 value={values.registeredAgentZip} 
//                                 onChange={handleChange} 
//                                 onBlur={handleBlur} 
//                                 error={touched.registeredAgentZip && !!errors.registeredAgentZip} 
//                                 helperText={touched.registeredAgentZip && errors.registeredAgentZip ? errors.registeredAgentZip : " "} 
//                                 variant="outlined" 
//                                 sx={textFieldStyles} 
//                                 InputProps={{ 
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <LocalPostOfficeOutlinedIcon />
//                                         </InputAdornment>
//                                     ) 
//                                 }} 
//                             />
//                         </Grid>
                        
//                         <Grid sx={{width: { xs: '100%', md: "50%"}}}>
//                             <FormLabel sx={formLabelStyles}>
//                                 Country
//                             </FormLabel>
//                             <FormControl fullWidth>
//                                 <Select
//                                     name="registeredAgentCountry"
//                                     value={values.registeredAgentCountry}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     error={touched.registeredAgentCountry && !!errors.registeredAgentCountry}
//                                     displayEmpty
//                                     sx={{
//                                         ...textFieldStyles,
//                                         '& .MuiSelect-select': {
//                                             paddingLeft: '40px',
//                                             textAlign: 'left'
//                                         }
//                                     }}
//                                 >
//                                     <MenuItem value="" disabled>
//                                         Select country...
//                                     </MenuItem>
//                                     {countryOptions.map((countryName) => (
//                                         <MenuItem key={countryName} value={countries[countryName]}>{countryName}</MenuItem>
//                                     ))}
//                                 </Select>
//                                 {touched.registeredAgentCountry && errors.registeredAgentCountry && (
//                                     <Typography color="error" variant="caption">
//                                         {errors.registeredAgentCountry}
//                                     </Typography>
//                                 )}
//                             </FormControl>
//                         </Grid>
//                     </Box>
//                 </Box>
//             )}
            

//         </Box>
//     );
// };

// export default OtherInformationTab; 