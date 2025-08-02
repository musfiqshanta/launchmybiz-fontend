import { useState } from 'react'
import { Helmet } from 'react-helmet'

import LLCForm from "../components/LLCFormation.jsx";
import LLCIncluded from '../components/LLCIncluded.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import LLCFeaturesSection from '../components/LLCFeatures.jsx'
import Footer from '../components/Footer.jsx'
import ThreeStepSection from '../components/ThreeStepSection.jsx'
import {Box} from '@mui/material'
import BusinessForm from '../components/BusinessForm.jsx';

function BusinessFormScreen() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Helmet>
        <title>Start Your LLC - Business Information Form</title>
        <meta name="description" content="Fill out your business information to start forming your LLC. Fast, secure, and easy online process." />
        <meta property="og:title" content="Start Your LLC - Business Information Form" />
        <meta property="og:description" content="Fill out your business information to start forming your LLC. Fast, secure, and easy online process." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.launchmybiz.net/business-form" />
        <meta property="og:image" content="https://www.launchmybiz.net/mainlogo-3-2.png" />
      </Helmet>
      <Box sx={{p:0,minWidth:'100%'}}>
         <BusinessForm/>
         <Footer/>
      </Box>
    </>
  )
}

export default BusinessFormScreen
