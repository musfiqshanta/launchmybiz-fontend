import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Divider, Alert, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ContactForm = ({ compact }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  if (compact) {
    return (
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
        {submitted ? (
          <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="success" sx={{ fontSize: 15, py: 1, textAlign: 'center', mb: 1 }}>
            Thank you! We'll be in touch.
          </Alert>
        ) : (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center" justifyContent="center">
            <TextField
              size="small"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ flex: 1, minWidth: 100, bgcolor: 'background.paper', borderRadius: 1 }}
              InputProps={{ sx: { borderRadius: 1, fontSize: 14 } }}
            />
            <TextField
              size="small"
              placeholder="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ flex: 1, minWidth: 120, bgcolor: 'background.paper', borderRadius: 1 }}
              InputProps={{ sx: { borderRadius: 1, fontSize: 14 } }}
            />
            <TextField
              size="small"
              placeholder="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              sx={{ flex: 2, minWidth: 140, bgcolor: 'background.paper', borderRadius: 1 }}
              InputProps={{ sx: { borderRadius: 1, fontSize: 14 } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              sx={{ px: 2.5, py: 1, borderRadius: 1, fontWeight: 600, minWidth: 90, fontSize: 15 }}
            >
              Send
            </Button>
          </Stack>
        )}
      </Box>
    );
  }

  // Default (full) form
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Box sx={{ p: { xs: 3, sm: 5 }, maxWidth: 420, width: '100%', borderRadius: 4, boxShadow: '0 8px 32px rgba(60,60,120,0.10)', bgcolor: 'background.paper' }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>Contact Us</Typography>
          <Typography variant="subtitle1" color="text.secondary">We'd love to hear from you. Please fill out the form below.</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {submitted ? (
          <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="success" sx={{ fontSize: 18, py: 3, textAlign: 'center' }}>
            Thank you for contacting us!<br />We have received your message and will get back to you soon.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.name}
              helperText={errors.name}
              autoComplete="name"
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.email}
              helperText={errors.email}
              autoComplete="email"
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <TextField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={5}
              required
              error={!!errors.message}
              helperText={errors.message}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2, borderRadius: 2, fontWeight: 600, fontSize: 18, py: 1.2, boxShadow: '0 2px 8px rgba(60,60,120,0.08)' }}
            >
              Send Message
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ContactForm; 