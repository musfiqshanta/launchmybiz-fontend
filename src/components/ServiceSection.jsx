// pages/ServicesSection.jsx

import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";


const MotionCard = motion(Card);

const ServicesSection = () => {
  return (
    <Box
    id='services'
      sx={{
        backgroundColor: "#f4f4f4",
        px: 2,
        py: 6,
        borderRadius: "20px",
        maxWidth: "lg",
        mx: "auto",
        position: "relative",
        height: "100%",
        overflow: "visible",
        marginTop: 10
      }}
    >
      <Typography variant="h4" textAlign="center" fontSize={{xs: "32px", md:"64px"}} fontWeight="500" mb={4}>
        Our Services
      </Typography>

<Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: "center",
          mt: 6,
          overflow: "hidden"
        }}
      >
      {/* Card 1 - From Left */}

      <MotionCard
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        sx={{
        //   position: "absolute",
          top: 0,
          left: 0,
          minWidth: 280,
          maxWidth: 600,
          transform: "rotate(-5deg)",
          zIndex: 4,
          boxShadow: 6,
          borderRadius: 3,
          marginRight: {xs: 0, md: 30}
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} mb={1}>
            <Box
              sx={{
                bgcolor: "error.main",
                color: "#fff",
                borderRadius: "50%",
                 width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
                fontSize: '30px'
              }}
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.748 24.0833H28.3314V22.6667C28.3314 21.8847 27.6981 21.25 26.9147 21.25C26.1313 21.25 25.498 21.8847 25.498 22.6667V24.0833H18.4147C16.0715 24.0833 14.1647 25.9902 14.1647 28.3333V29.0417C14.1647 30.2132 13.2113 31.1667 12.0397 31.1667C10.8681 31.1667 9.91471 30.2132 9.91471 29.0417V4.95833C9.91471 4.19475 9.7263 3.47933 9.41746 2.83333H12.748C13.5315 2.83333 14.1647 2.19867 14.1647 1.41667C14.1647 0.634667 13.5315 0 12.748 0H4.95638C2.22221 0 -0.00195312 2.22417 -0.00195312 4.95833V5.66667C-0.00195312 8.00983 1.90488 9.91667 4.24805 9.91667H7.08138V29.0417C7.08138 31.7744 9.30413 33.9986 12.0369 34H29.0397C31.7739 34 33.998 31.7758 33.998 29.0417V28.3333C33.998 25.9902 32.0912 24.0833 29.748 24.0833ZM7.08138 7.08333H4.24805C3.46605 7.08333 2.83138 6.44725 2.83138 5.66667V4.95833C2.83138 3.78675 3.7848 2.83333 4.95638 2.83333C6.12796 2.83333 7.08138 3.78675 7.08138 4.95833V7.08333ZM31.1647 29.0417C31.1647 30.2132 30.2113 31.1667 29.0397 31.1667H16.5192C16.8266 30.5221 16.998 29.8024 16.998 29.0417V28.3333C16.998 27.5527 17.6327 26.9167 18.4147 26.9167H29.748C30.53 26.9167 31.1647 27.5527 31.1647 28.3333V29.0417ZM24.0814 19.8333C29.5483 19.8333 33.998 15.385 33.998 9.91667C33.998 4.44833 29.5483 0 24.0814 0C18.6145 0 14.1647 4.44833 14.1647 9.91667C14.1647 15.385 18.6145 19.8333 24.0814 19.8333ZM24.0814 2.83333C27.9871 2.83333 31.1647 6.01092 31.1647 9.91667C31.1647 13.8224 27.9871 17 24.0814 17C20.1756 17 16.998 13.8224 16.998 9.91667C16.998 6.01092 20.1756 2.83333 24.0814 2.83333ZM19.1485 9.63333C19.6954 9.07375 20.5921 9.06667 21.1517 9.61208L22.754 11.1818C22.958 11.3815 23.2909 11.3787 23.4935 11.1818L26.6427 8.15858C27.2051 7.61742 28.1047 7.63583 28.6459 8.19967C29.187 8.7635 29.1686 9.66025 28.6048 10.2028L25.4697 13.2118C24.828 13.8451 23.9794 14.1624 23.128 14.1624C22.2765 14.1624 21.4223 13.8451 20.7706 13.2076L19.1684 11.6379C18.6088 11.0897 18.6017 10.1915 19.1485 9.63333Z" fill="white"/>
</svg>

            </Box>
            <Typography variant="h6" fontSize={{xs:'16px', md: '26px'}} fontWeight="600">
              LLC & EIN Registration
            </Typography>
          </Box>
          <Typography variant="body2" fontSize={{xs:'12px', md: '18px'}} mb={1}>
            We handle everything from LLC filing in your chosen state to EIN
            registration, making it fast, simple, and compliant.
          </Typography>
          <ul style={{ backgroundColor: "#EAEAEA", paddingTop: 8,  paddingBottom: 8, paddingLeft: 25, borderRadius: 5}}>
            <li style={{fontSize :{xs:'12px', md: '18px'}}}>LLC filing</li>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>EIN registration</li>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>State compliance guidance</li>
          </ul>
        </CardContent>
      </MotionCard>

      {/* Card 2 - From Right */}
      <MotionCard
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        
        sx={{
        //   position: "absolute",
          top: 60,
          right: 0,
          minWidth: 280,
          maxWidth: 600,
          transform: "rotate(-50deg)",
          zIndex: 15,
          boxShadow: 6,
          borderRadius: 3,
          marginLeft: {xs: 0, md: 50},
          marginTop: {xs: 0, md: -18},
          rotate: { xs: "-5deg", md: '-10deg'}
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} mb={1}>
            <Box
              sx={{
                bgcolor: "error.main",
                color: "#fff",
                borderRadius: "50%",
               width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
                fontSize: '30px'
              }}
            >
             <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2011_83)">
<path d="M4.19011 6.46675C1.89181 6.92308 0.39284 9.16476 0.849173 11.4631L3.99825 27.3233L8.99456 30.6642L12.3355 25.6679L9.18642 9.80768C8.73009 7.50938 6.48841 6.01041 4.19011 6.46675ZM9.32798 25.0692L8.21433 26.7346L6.54889 25.621L3.62826 10.9113C3.47596 10.1442 3.97487 9.39812 4.7419 9.24583C5.50893 9.09353 6.25504 9.59245 6.40734 10.3595L9.32798 25.0692ZM26.998 1.93819L15.3064 4.25958C13.0081 4.71591 11.5092 6.95759 11.9655 9.25589L14.1727 20.3722L16.9518 19.8204L14.7446 8.7041C14.5923 7.93707 15.0912 7.19095 15.8582 7.03866L24.1955 5.38328L25.575 12.331L32.5227 10.9515L36.1093 29.0156L38.8884 28.4638L34.6357 7.04536L26.998 1.93819ZM27.0888 5.40676L31.3956 8.28665L27.8023 9.00012L27.0888 5.40676ZM27.2303 20.6682L17.5035 22.5995C15.2052 23.0558 13.7063 25.2975 14.1626 27.5958L16.3698 38.7122L34.4338 35.1255L32.2267 24.0092C31.7703 21.7109 29.5286 20.2119 27.2303 20.6682ZM27.8847 23.4472L24.9825 27.7873C24.3889 28.675 23.187 28.9136 22.2979 28.3204L17.9578 25.4182C17.992 25.4085 27.8494 23.4513 27.8847 23.4472ZM18.5971 35.3813L17.1939 28.3141L20.7246 30.675C21.7838 31.3833 23.0531 31.6368 24.3037 31.3885C25.5543 31.1402 26.6303 30.4196 27.3388 29.3617L29.6997 25.831L31.1029 32.8982L18.5971 35.3813Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_2011_83">
<rect width="34" height="34" fill="white" transform="translate(0.0214844 7.29443) rotate(-11.2301)"/>
</clipPath>
</defs>
</svg>


            </Box>
            <Typography variant="h6" fontSize={{xs:'16px', md: '26px'}} fontWeight="600">
              Website
            </Typography>
          </Box>
          <Typography variant="body2" fontSize={{xs:'12px', md: '18px'}} mb={1}>
            We design and develop websites that reflect your brand, engage your
            audience, and drive results.
          </Typography>
          <ul style={{ backgroundColor: "#EAEAEA",  paddingTop: 8,  paddingBottom: 8, paddingLeft: 25, borderRadius: 5}}>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>Home page design</li>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>Basic website (up to 3-4 pages)</li>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>Responsive development</li>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>SEO-ready setup</li>
          </ul>
        </CardContent>
      </MotionCard>

      {/* Card 3 - From Left */}
      <MotionCard
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        sx={{
        //   position: "absolute",
          top: 120,
          left: 0,
           minWidth: 280,
          maxWidth: 600,
          transform: "rotate(-5deg)",
          zIndex: 20,
          boxShadow: 6,
          borderRadius: 3,
          marginTop: {xs: 0, md: -2},
          marginRight: {xs: 0, md: 40},
          rotate: { xs: "5deg", md: '12deg'}
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} mb={1}>
            <Box
              sx={{
                bgcolor: "error.main",
                color: "#fff",
                borderRadius: "50%",
                width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
                fontSize: '30px'
              }}
            >
              <svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.713 3.44711L11.1276 0.320682C7.26647 -0.29567 3.63258 2.33776 3.01623 6.19888L0.336437 22.9863C-0.279916 26.8474 2.35351 30.4813 6.21463 31.0977L25.8 34.2241C29.6611 34.8405 33.295 32.207 33.9114 28.3459L36.5911 11.5585C37.2075 7.69735 34.5741 4.06346 30.713 3.44711ZM10.681 3.11859L30.2663 6.24502C32.5746 6.61349 34.1617 8.80356 33.7932 11.1118L33.3466 13.9097L5.36751 9.44342L5.81414 6.64551C6.18261 4.33723 8.37268 2.75012 10.681 3.11859ZM26.2466 31.4262L6.66126 28.2998C4.35299 27.9313 2.76587 25.7412 3.13435 23.433L4.92088 12.2413L32.9 16.7077L31.1134 27.8993C30.745 30.2076 28.5549 31.7947 26.2466 31.4262ZM28.3091 9.51909C28.4944 8.35796 29.5813 7.57028 30.7425 7.75563C31.9036 7.94098 32.6913 9.02791 32.5059 10.189C32.3206 11.3502 31.2337 12.1378 30.0725 11.9525C28.9114 11.7671 28.1237 10.6802 28.3091 9.51909ZM22.7133 8.62582C22.8986 7.46469 23.9855 6.67701 25.1467 6.86237C26.3078 7.04772 27.0955 8.13464 26.9101 9.29577C26.7248 10.4569 25.6378 11.2446 24.4767 11.0592C23.3156 10.8739 22.5279 9.78696 22.7133 8.62582ZM17.1174 7.73256C17.3028 6.57143 18.3897 5.78375 19.5508 5.9691C20.712 6.15445 21.4997 7.24138 21.3143 8.40251C21.1289 9.56364 20.042 10.3513 18.8809 10.166C17.7198 9.98061 16.9321 8.89369 17.1174 7.73256Z" fill="white"/>
</svg>

            </Box>
            <Typography variant="h6" fontSize={{xs:'16px', md: '26px'}} fontWeight="600">
              Branding
            </Typography>
          </Box>
          <Typography variant="body2" fontSize={{xs:'12px', md: '18px'}} mb={1}>
            We craft powerful visual and verbal identities that connect with
            your audience and position your brand for success.
          </Typography>
          <ul style={{ backgroundColor: "#EAEAEA", paddingTop: 8,  paddingBottom: 8, paddingLeft: 25, borderRadius: 5}}>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>Logo design (3–4 variations)</li>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>Brand guidelines</li>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>Basic stationery design</li>
            <li style={{ fontSize: {xs:'12px', md: '18px'}}}>Voice & communication guidelines</li>
          </ul>
        </CardContent>
      </MotionCard>

      {/* Card 4 - From Right */}
      <MotionCard
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        sx={{
        //   position: "absolute",
          top: 180,
          right: 0,
          minWidth: 280,
          maxWidth: 600,
          transform: "rotate(5deg)",
          zIndex: 21,
          boxShadow: 6,
          borderRadius: 3,
          marginTop: {xs: 0, md: -10},
          marginLeft: {xs: 0, md: 40},
          marginBottom: 2
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} mb={1}>
            <Box
              sx={{
                bgcolor: "error.main",
                color: "#fff",
                borderRadius: "50%",
                width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
                fontSize: '30px'
              }}
            >
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M34.9382 29.3768C34.9869 30.5029 34.5862 31.6022 33.8242 32.4329C33.0623 33.2635 32.0017 33.7575 30.8755 33.8062L23.7988 34.1117C23.4234 34.1279 23.057 33.9944 22.7801 33.7404C22.5032 33.4864 22.3385 33.1329 22.3223 32.7575C22.3061 32.3821 22.4397 32.0157 22.6937 31.7388C22.9476 31.4619 23.3012 31.2972 23.6766 31.281L30.7533 30.9755C31.1287 30.9593 31.4822 30.7946 31.7362 30.5177C31.9902 30.2408 32.1238 29.8744 32.1075 29.499C32.1077 29.308 32.0675 29.1191 31.9898 28.9447C31.9121 28.7702 31.7985 28.6141 31.6564 28.4864C31.5143 28.3588 31.3469 28.2625 31.1651 28.2039C30.9833 28.1452 30.7913 28.1255 30.6014 28.146L24.9697 28.3892C24.5943 28.4054 24.2279 28.2719 23.951 28.0179C23.6741 27.7639 23.5094 27.4104 23.4932 27.035C23.477 26.6596 23.6106 26.2932 23.8646 26.0163C24.1185 25.7394 24.4721 25.5747 24.8475 25.5585L29.0935 25.3752L28.6657 15.4677L23.0043 15.7122L23.371 24.2043C23.3872 24.5797 23.2536 24.9461 22.9997 25.223C22.7457 25.4999 22.3921 25.6646 22.0168 25.6808C21.6414 25.697 21.275 25.5634 20.9981 25.3094C20.7212 25.0555 20.5565 24.7019 20.5403 24.3265L20.1572 15.4537C19.7163 15.224 19.3437 14.8823 19.0767 14.463C18.8097 14.0437 18.6577 13.5615 18.636 13.0649L18.5749 11.6495C18.5587 11.2741 18.6923 10.9077 18.9463 10.6308C19.2002 10.3539 19.5538 10.1893 19.9292 10.173C20.3045 10.1568 20.671 10.2904 20.9479 10.5444C21.2247 10.7983 21.3894 11.1519 21.4056 11.5273L21.4667 12.9426L24.2974 12.8204L24.2363 11.4051C24.2201 11.0297 24.3537 10.6632 24.6076 10.3863C24.8616 10.1095 25.2152 9.9448 25.5905 9.92859C25.9659 9.91238 26.3324 10.046 26.6092 10.2999C26.8861 10.5539 27.0508 10.9074 27.067 11.2828L27.1281 12.6982L29.9588 12.5759L29.8977 11.1606C29.8815 10.7852 30.0151 10.4188 30.269 10.1419C30.523 9.865 30.8766 9.70034 31.2519 9.68413C31.6273 9.66792 31.9938 9.80149 32.2706 10.0555C32.5475 10.3094 32.7122 10.663 32.7284 11.0384L32.7895 12.4537C32.8107 12.9504 32.7008 13.4438 32.471 13.8846C32.2411 14.3254 31.8993 14.6979 31.48 14.9648L31.9349 25.5006C32.7816 25.7452 33.5287 26.2524 34.0685 26.9491C34.6083 27.6457 34.9129 28.4958 34.9382 29.3768ZM20.7848 29.9879C20.8334 31.114 20.4327 32.2134 19.6708 33.044C18.9089 33.8747 17.8482 34.3687 16.7221 34.4173L5.39928 34.9062C4.36833 34.95 3.35666 34.6172 2.55303 33.97C1.74939 33.3227 1.2087 32.4052 1.03182 31.3886C0.854948 30.3719 1.05397 29.3257 1.59177 28.4451C2.12956 27.5644 2.96938 26.9095 3.95454 26.6025C5.06732 22.3574 5.70674 18.0022 5.8611 13.6165C5.58637 13.6221 5.31593 13.5478 5.08272 13.4024C4.84951 13.2571 4.66361 13.0471 4.54765 12.7979C4.43169 12.5488 4.39069 12.2713 4.42964 11.9993C4.46859 11.7273 4.58581 11.4725 4.76701 11.2659C4.76701 11.2659 3.2506 9.11791 3.21979 9.0611C2.93181 8.51192 2.78714 7.89893 2.79919 7.27894C2.81125 6.65895 2.97963 6.05203 3.28875 5.51446C3.59786 4.97689 4.03769 4.52606 4.56746 4.20377C5.09723 3.88148 5.6998 3.69815 6.31931 3.67079L8.31495 3.58462L8.25383 2.16927C8.23762 1.7939 8.37119 1.42746 8.62516 1.15057C8.87913 0.873676 9.23269 0.709015 9.60807 0.692806C9.98344 0.676598 10.3499 0.810169 10.6268 1.06414C10.9037 1.31811 11.0683 1.67167 11.0845 2.04704L11.1456 3.46239L13.113 3.37744C13.7327 3.35081 14.3492 3.48115 14.9052 3.75636C15.4611 4.03158 15.9386 4.44275 16.2932 4.95173C16.6478 5.46072 16.8682 6.05103 16.9338 6.6679C16.9994 7.28476 16.9081 7.90821 16.6684 8.48039C16.644 8.53958 15.3098 10.8078 15.3098 10.8078C15.5088 10.9975 15.6482 11.241 15.7112 11.5086C15.7742 11.7761 15.758 12.0563 15.6645 12.3148C15.5711 12.5733 15.4044 12.799 15.1849 12.9645C14.9654 13.1299 14.7025 13.2279 14.4282 13.2466C14.9646 17.6019 15.9769 21.8852 17.4471 26.0199C18.3633 26.2203 19.1874 26.7182 19.7911 27.4359C20.3949 28.1537 20.7442 29.0509 20.7848 29.9879ZM8.69463 13.4941C8.58055 17.8242 7.99377 22.1289 6.94472 26.3316L14.4461 26.0077C13.0409 21.9104 12.0849 17.6726 11.5947 13.3689L8.69463 13.4941ZM5.69826 7.6779L7.81176 10.6495L7.8435 10.6949L12.2028 10.5067L12.2291 10.4587L14.0785 7.31603C14.1201 7.18589 14.1297 7.04765 14.1065 6.91302C14.0832 6.77839 14.0279 6.65134 13.9452 6.54263C13.8624 6.43393 13.7547 6.34677 13.6311 6.28854C13.5075 6.23031 13.3717 6.20273 13.2352 6.20813L6.44154 6.50149C6.29834 6.50612 6.15875 6.54762 6.03628 6.62196C5.9138 6.6963 5.81256 6.80098 5.74236 6.92588C5.67709 7.03918 5.63911 7.16614 5.63146 7.29668C5.62381 7.42721 5.64668 7.55774 5.69826 7.6779ZM17.9541 30.1101C17.9379 29.7348 17.7732 29.3812 17.4963 29.1272C17.2194 28.8733 16.853 28.7397 16.4776 28.7559L5.15482 29.2448C4.77944 29.261 4.42588 29.4257 4.17192 29.7026C3.91795 29.9795 3.78438 30.3459 3.80059 30.7213C3.81679 31.0967 3.98146 31.4502 4.25835 31.7042C4.53524 31.9582 4.90167 32.0917 5.27705 32.0755L16.5998 31.5866C16.9752 31.5704 17.3288 31.4057 17.5827 31.1289C17.8367 30.852 17.9703 30.4855 17.9541 30.1101Z" fill="white"/>
</svg>

            </Box>
            <Typography variant="h6" fontSize={{xs:'18px', md: '26px'}} fontWeight="600">
              Brand Strategies
            </Typography>
          </Box>
          <Typography variant="body2" fontSize={{xs:'12px', md: '18px'}} mb={1}>
            Define your positioning, messaging, and launch plan with actionable
            brand strategies that set you apart from day one.
          </Typography>
          <ul style={{ backgroundColor: "#EAEAEA", paddingTop: 8,  paddingBottom: 8, paddingLeft: 25, borderRadius: 5}} >
            <li style={{fontSize :{xs:'12px', md: '18px'}}}>Brand positioning</li>
            <li style={{fontSize :{xs:'12px', md: '18px'}}}>Messaging frameworks</li>
          </ul>
        </CardContent>
      </MotionCard>
      </Box>
    </Box>
  );
};

export default ServicesSection;
