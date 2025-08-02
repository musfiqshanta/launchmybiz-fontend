import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { MdCheck } from "react-icons/md";

const includedItems = [
  "Name Availability Check",
  "Official Filed Articles of Organization",
  "Free Corporate Compliance Tool",
  "Registered Agent Service (1st Year Free)",
  "Custom Operating Agreement & Minutes",
  "Custom LLC kit and Seal",
  "Federal tax ID number (EIN)",
  "Organizer Resolutions",
  "State Filing Fee",
  "Standard Processing (30–40 days processing time)",
  "Shipping & Handling",
];

const LLCIncluded = () => {
  return (
    <Box sx={{ py: 6, textAlign: "center", backgroundColor: "#fff" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        LLC Complete Package
      </Typography>
      <Typography variant="body2" gutterBottom>
        Everything You Need | One Transparent Price | No Upsells
      </Typography>
      <Typography variant="h6" color="error" sx={{ mt: 3, mb: 2 }}>
        WHAT’S INCLUDED
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 700,
          mx: "auto",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Table>
          <TableBody>
            {includedItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item}</TableCell>
                <TableCell align="center" sx={{ color: "green" }}>
                  <MdCheck size={20} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}

        sx={{
          mt: 4,
          backgroundColor: "#f00",
          px: 4,
          py: 1,
          borderRadius: "24px",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default LLCIncluded;
