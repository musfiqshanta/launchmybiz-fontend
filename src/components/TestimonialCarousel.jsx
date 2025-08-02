import React from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AiFillStar } from 'react-icons/ai';

const testimonials = [
  {
    name: 'Sarah T.',
    text: `Launch My Biz made forming my LLC so easy and affordable. No stress, no hassle—highly recommend!`
  },
  {
    name: 'David M.',
    text: `Amazing service! I didn't know where to start, but Launch My Biz walked me through everything. Smooth, fast, and affordable.`
  },
  {
    name: 'Lisa K.',
    text: `I loved how easy it was. I just selected my state and entered my business details. They handled the rest. Super grateful!`
  }
];

const TestimonialCarousel = () => {
  return (
    <Box sx={{ backgroundColor: '#feecd9', py: 8, px: 2 }}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Box textAlign="center" maxWidth="700px" mx="auto">
              <Box display="flex" justifyContent="center" mb={1}>
                {[...Array(5)].map((_, i) => (
                  <AiFillStar key={i} color="#ffb400" size={22} />
                ))}
              </Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {testimonial.name}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '0.8rem', color: '#333' }}>
                {testimonial.text}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TestimonialCarousel;
