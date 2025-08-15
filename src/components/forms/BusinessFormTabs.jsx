import React from 'react';
import { Tabs, Tab } from '@mui/material';
import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";

const BusinessFormTabs = ({ activeTab, setActiveTab, completedTabs, setSubmitError }) => {
    console.log('BusinessFormTabs - activeTab:', activeTab, 'completedTabs:', completedTabs);
    
    const handleTabChange = (e, newValue) => {
        // Only allow moving to tabs that are accessible
        if (newValue === 0 || completedTabs.includes(newValue - 1)) {
            console.log('Tab clicked - moving to tab', newValue);
            setActiveTab(newValue);
        } else {
            console.log('Tab not accessible yet');
        }
    };

    return (
        <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
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
                disabled={!completedTabs.includes(0)}
            />
            <Tab
                icon={<LocationOnIcon />}
                iconPosition="start"
                label="Business Address"
                disabled={!completedTabs.includes(1)}
            />
            <Tab
                icon={<PersonIcon />}
                iconPosition="start"
                label="Participants"
                disabled={!completedTabs.includes(2)}
            />
            <Tab
                icon={<InfoIcon />}
                iconPosition="start"
                label="Other Information"
                disabled={!completedTabs.includes(3)}
            />
        </Tabs>
    );
};

export default BusinessFormTabs; 