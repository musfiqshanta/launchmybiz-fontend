"use client";
import React from "react";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Link } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import image1 from "../assets/Mobile login-bro.png"; // Your image
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

export default function SignInPage() {
     const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f8fa",
        px: 3
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
          width: "100%",
          maxWidth: 1200,
        }}
      >
        {/* Left - Static Image */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafc",
            p: 3,
          }}
        >
          <img
            src={image1}
            alt="Login Illustration"
            width={400}
            height={400}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>

        {/* Right - Form */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Welcome!
          </Typography>

          <Formik
            initialValues={{ email: "", password: "", remember: false }}
            validationSchema={LoginSchema}
             onSubmit={async (values, { setSubmitting }) => {
                 try {
                   const { data } = await axios.post(
                     "http://localhost:5000/api/login",
                     values
                   );
                   console.log("Login success:", data);
                   navigate("/user/dashboard");
                   localStorage.setItem("token", data.token);
                 } catch (error) {
                   alert("Login failed:", error.response?.data || error.message);
                 } finally {
                   setSubmitting(false);
                 }
               }}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form>
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox name="remember" onChange={handleChange} />}
                    label="Remember me"
                  />
                  <Link href="#" underline="none" sx={{ color: "#e70000"}}>
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, py: 1.5, fontSize: "1rem", backgroundColor: "#e70000", borderRadius: 2 }}
                >
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>

          <Typography mt={2} textAlign="center">
            Don’t have an account? <Link href="/signup" sx={{ color: "#e70000"}}>Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
