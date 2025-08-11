
import { Helmet } from 'react-helmet'

import Footer from '../components/Footer.jsx'
import {Box} from '@mui/material'
import BusinessForm from '../components/BusinessForm.jsx';
import Navbar from '../components/Navbar.jsx';

function BusinessFormScreen() {
 

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
      <Box sx={{p:0,minWidth:'100%', background: 'linear-gradient(#fce8d3, #fff)', }}>
        <Box sx={{p:2}}>
        <Navbar ></Navbar>
         <BusinessForm/>
         </Box>
         <Footer/>
      </Box>
    </>
  )
}

export default BusinessFormScreen
