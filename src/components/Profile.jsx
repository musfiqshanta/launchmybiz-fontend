import React from "react";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { useAuth } from '../lib/AuthContext.jsx';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <Typography textAlign={'center'} fontSize={20} display={'flex'} justifyContent={'center'} alignItems={'center'}  minHeight={'70vh'}>Loading...</Typography>;
  // if (isError) return <Typography textAlign={'center'}  fontSize={20} my={20} color="#e70000">Failed to load profile.</Typography>;

 
  const name = user.name;
  const email = user.email;

  return (
    <Box maxWidth={"md"} mx={'auto'} my={{xs: 5, md:  10}}>
      <Typography variant="h5" fontWeight={700} textAlign={"center"} mb={2}>
        Profile
      </Typography>
      <Card sx={{ borderRadius: 2, border: 1, borderColor: 'text.secondary' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 64, height: 64 }}>
                {name?.charAt(0)?.toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" fontWeight={700}>{name}</Typography>
              <Typography variant="body2" color="text.secondary">{email}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="overline" color="text.secondary">Name</Typography>
              <Typography variant="body1">{name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="overline" color="text.secondary">Email</Typography>
              <Typography variant="body1">{email}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
