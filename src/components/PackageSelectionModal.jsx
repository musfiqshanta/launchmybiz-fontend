import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea
} from '@mui/material';
import { Business, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PackageSelectionModal = ({ open, onClose, packageType }) => {
  const navigate = useNavigate();

  const handleWithLLC = () => {
    // Navigate to business form with all tabs
    navigate('/business-form');
    onClose();
  };

  const handleWithoutLLC = () => {
    // Navigate to without-LLC form with package type
    navigate('/business-form/without-LLC', { 
      state: { packageType: packageType }
    });
    onClose();
  };

  const getPackageInfo = () => {
    switch (packageType) {
      case 'Premium':
        return {
          title: 'Premium Package',
          cost: 'LLC cost + $1,335',
          description: 'Choose how you want to proceed with your Premium package'
        };
      case 'Platinum':
        return {
          title: 'Platinum Package',
          cost: 'LLC cost + $1,677',
          description: 'Choose how you want to proceed with your Platinum package'
        };
      default:
        return {
          title: 'Package Selection',
          cost: '',
          description: 'Choose how you want to proceed'
        };
    }
  };

  const packageInfo = getPackageInfo();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1, 
        textAlign: 'center',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant="h5" fontWeight="600" color="#1f2937">
          {packageInfo.title}
        </Typography>
        <Typography variant="h6" color="#ff3902" fontWeight="600" sx={{ mt: 1 }}>
          {packageInfo.cost}
        </Typography>
        <Typography variant="body1" color="#6b7280" sx={{ mt: 1 }}>
          {packageInfo.description}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: {xs: "column", md: "row"}, gap: 3, justifyContent: 'center', alignItems: 'center', pt: 2 }}>
          {/* With LLC Option */}
          <Card
            sx={{
              width: '100%',
              maxWidth: 280,
              border: '2px solid #ff3902',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(255, 57, 2, 0.2)'
              }
            }}
          >
            <CardActionArea onClick={handleWithLLC} sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: {xs: 1, md: 3} }}>
                <Business sx={{ fontSize: 48, color: '#ff3902', mb: 2 }} />
                <Typography variant="h6" fontWeight="600" gutterBottom sx={{fontSize: {xs: '16px', md: '20px'}}}>
                  With LLC Formation
                </Typography>
                {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Complete business formation including LLC setup, branding, and website
                </Typography>
                <Typography variant="body2" color="#ff3902" fontWeight="500">
                  Full Business Form
                </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Without LLC Option */}
          <Card
            sx={{
              width: '100%',
              maxWidth: 280,
              border: '2px solid #e5e7eb',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                borderColor: '#ff3902'
              }
            }}
          >
            <CardActionArea onClick={handleWithoutLLC} sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: {xs: 1, md: 3} }}>
                <Person sx={{ fontSize: 48, color: '#6b7280', mb: 2 }} />
                <Typography variant="h6" fontWeight="600" gutterBottom sx={{fontSize: {xs: '16px', md: '20px'}}}>
                  Without LLC Formation
                </Typography>
                {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Branding and website services only (no business formation)
                </Typography>
                <Typography variant="body2" color="#6b7280" fontWeight="500">
                  Contact Form Only
                </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            py: 1.5,
            borderColor: '#d1d5db',
            color: '#374151',
            '&:hover': {
              borderColor: '#9ca3af',
              backgroundColor: '#f9fafb'
            }
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackageSelectionModal; 