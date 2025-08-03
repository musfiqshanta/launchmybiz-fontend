//import { useState } from 'react'
import { Helmet } from 'react-helmet'
import LLCForm from "../components/LLCFormation.jsx";
import LLCIncluded from '../components/LLCIncluded.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import LLCFeaturesSection from '../components/LLCFeatures.jsx'
import Footer from '../components/Footer.jsx'
import ThreeStepSection from '../components/ThreeStepSection.jsx'
import {Box} from '@mui/material'
import ServicesSection from '../components/ServiceSection.jsx';
import FoundersAndPackages from '../components/FounderSection.jsx';
import FAQSection from '../components/FaqSection.jsx';
import WhyUsSection from '../components/WhyUsSection.jsx';

function HomePage() {
 // const [count, setCount] = useState(0)

  return (
    <>
      <Helmet>
        <title>LLC Formation Service | Fast & Easy Online LLC Setup</title>
        <meta name="description" content="Form your LLC quickly and easily online. Get expert help, affordable packages, and everything you need to start your business." />
        <meta property="og:title" content="LLC Formation Service | Fast & Easy Online LLC Setup" />
        <meta property="og:description" content="Form your LLC quickly and easily online. Get expert help, affordable packages, and everything you need to start your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.launchmybiz.net/" />
        <meta property="og:image" content="https://www.launchmybiz.net/mainlogo-3-2.png" />
      </Helmet>
      <Box sx={{p:0,minWidth:'100%'}}>
        <LLCForm/>
        <ServicesSection></ServicesSection>
        <WhyUsSection></WhyUsSection>
        <FoundersAndPackages></FoundersAndPackages>
        <FAQSection></FAQSection>
        {/* <LLCIncluded/>
        <TestimonialCarousel/>
         <LLCFeaturesSection/>
        <ThreeStepSection/> */}
        <Footer/>
      </Box>
    </>
  )
}

export default HomePage
