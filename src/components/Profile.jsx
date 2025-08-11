import React from "react";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/apiClient";

export default function Profile() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/api/me");
      return res.data;
    },
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography color="error">Failed to load profile.</Typography>;

  const user = data?.user || {};
  const name = user.name || user.fullName || "User";
  const email = user.email || "";

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Profile
      </Typography>
      <Card sx={{ borderRadius: 2 }}>
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
