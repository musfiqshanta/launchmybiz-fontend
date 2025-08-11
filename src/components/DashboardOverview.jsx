import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

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
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>Overview</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}><StatCard label="Total Orders" value="0" /></Grid>
        <Grid item xs={12} sm={6} md={4}><StatCard label="In Progress" value="0" /></Grid>
        <Grid item xs={12} sm={6} md={4}><StatCard label="Completed" value="0" /></Grid>
      </Grid>
      <Card elevation={1} sx={{ mt: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Welcome to your dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use the sidebar to view your profile and orders. We’ll surface helpful summaries here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}


