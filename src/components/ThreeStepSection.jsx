import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';

const steps = [
  { number: '1', text: 'Select your State' },
  { number: '2', text: 'Submit your business details' },
  { number: '3', text: 'Let our experts handle the rest!' },
];

export default function ThreeStepSection() {
  return (
    <Box sx={{ backgroundColor: '#fce3ca', py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            backgroundColor: '#e53935',
            borderRadius: 10,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#d32f2f' },
          }}
        >
          Get Started Today
        </Button>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {steps.map((step, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                p: 3,
                boxShadow: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: '#1a202c',
                  color: '#fff',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                {step.number}
              </Box>
              <Typography variant="body1" fontWeight="500">
                {step.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
