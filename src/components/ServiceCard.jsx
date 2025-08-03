// components/ServiceCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, points, icon, direction = 'left', delay = 0, rotation = 0 }) => {
  const variants = {
    hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: rotation,
      transition: {
        delay,
        duration: 0.6,
        type: 'spring',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      style={{ margin: '16px' }}
    >
      <Card sx={{ minWidth: 320, maxWidth: 450, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Box
            sx={{
              backgroundColor: 'error.main',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              mb: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ my: 1 }}>
            {description}
          </Typography>
          <ul style={{ paddingLeft: 16 }}>
            {points.map((point, idx) => (
              <li key={idx} style={{ fontSize: 14 }}>
                {point}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
