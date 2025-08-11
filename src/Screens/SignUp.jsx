"use client";
import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/Mobile login-pana.png"; // Replace with your signup illustration

// Validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

export default function SignupPage() {

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
        {/* Left - Image */}
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
            alt="Signup Illustration"
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
            Create an Account
          </Typography>

          <Formik
            initialValues={{ name: "", email: "", password: "", remember: false }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const res = await fetch("http://localhost:5000/api/signup", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                });

                if (!res.ok) {
                  throw new Error("Signup failed");
                }

                const data = await res.json();
                console.log("Signup success:", data);
                navigate("/signin");
                localStorage.setItem("token", data.token);
              } catch (error) {
                alert(error.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form>
                {/* Name Field */}
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                {/* Email Field */}
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

                {/* Password Field */}
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

                {/* Remember Me */}
                <FormControlLabel
                  control={<Checkbox name="remember" onChange={handleChange} />}
                  label="Remember me"
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, py: 1.5, fontSize: "1rem",backgroundColor: "#e70000", borderRadius: 2 }}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>

          <Typography mt={2} textAlign="center">
            Already have an account? <Link href="/signin" sx={{ color: "#e70000"}}>Sign in</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
