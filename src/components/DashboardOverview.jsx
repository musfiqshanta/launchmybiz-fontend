import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useAuth } from '../lib/AuthContext';

function StatCard({ label, value }) {

  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">{label}</Typography>
        <Typography variant="h5" fontWeight={700}>{value}</Typography>
      </CardContent>
    </Card>
  );
}

export default function DashboardOverview() {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>Overview</Typography>
      
      <Card elevation={1} sx={{ mt: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Welcome to your dashboard
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {user?.name}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {user?.email}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}


