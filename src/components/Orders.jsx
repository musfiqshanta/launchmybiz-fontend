


import React, { useState } from 'react';
import {
  Box, Paper, Typography, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, IconButton, Dialog, DialogTitle,
  DialogContent, Accordion, AccordionSummary, AccordionDetails, Grid, Divider
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Info as InfoIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import api from '../lib/apiClient';
import { useAuth } from '../lib/AuthContext';

const DetailItem = ({ label, value }) => value ? <Typography variant="body2" color="text.secondary"><strong>{label}:</strong> {value}</Typography> : null;

function StatusChip({ status }) {
  const color = status === 'paid' ? 'success' : status === 'pending' ? 'warning' : 'default';
  return <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} color={color} size="small" variant="outlined" />;
}

export default function Orders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [businessTypeFilter, setBusinessTypeFilter] = useState('all');
  const { user } = useAuth();
  const userId = user.id;
  const role = 'user';
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-orders', page, rowsPerPage, userId, businessTypeFilter],
    queryFn: async () => {
      const res = await api.get('/api/orders', {
        params: { 
          userId, 
          role, 
          page: page + 1, 
          limit: rowsPerPage,
          businessType: businessTypeFilter !== 'all' ? businessTypeFilter : undefined
        }
      });
      return res.data;
    },
    keepPreviousData: true
  });

  const orders = data?.orders || [];

  
  const total = data?.total || 0;

  const handleViewDetails = (order) => setSelectedOrder(order);
  const handleCloseDetails = () => setSelectedOrder(null);
  
  const handleBusinessTypeFilterChange = (event) => {
    setBusinessTypeFilter(event.target.value);
    setPage(0); // Reset to first page when filter changes
  };

      return (
      <Box>
        <Typography textAlign="center" variant="h5" fontWeight={700} mb={2}>My Orders</Typography>
        
        {/* Filter Section */}
        <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Filter by Business Type:
            </Typography>
            <select
              value={businessTypeFilter}
              onChange={handleBusinessTypeFilterChange}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                color: '#333',
                fontSize: '14px',
                cursor: 'pointer',
                minWidth: '120px'
              }}
            >
              <option value="all">All Types</option>
              <option value="LLC">LLC</option>
              <option value="NO-LLC">NO-LLC</option>
            </select>
          </Box>
        </Box>
        
        <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)' }}>
          <Table stickyHeader aria-label="orders table">
            <TableHead>
              <TableRow>
              <TableCell>Business Type</TableCell>  
                <TableCell>Company Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(orders.length > 0 ? orders : []).map((order) => (
                <TableRow hover key={order._id}>
                  <TableCell>{order.BusinessStructureType}</TableCell>
                  <TableCell>{order.CompanyInfo?.CompanyDesiredName}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{`${order.Contact?.contactFirstName || ''} ${order.Contact?.contactLastName || ''}`}</Typography>
                      <Typography variant="caption" color="text.secondary">{order.Contact?.contactEmail}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell><StatusChip status={order.paymentStatus} /></TableCell>
                  <TableCell align="right">${order.paymentAmount?.toFixed(2) ?? '0.00'}</TableCell>
                  <TableCell>{order.createdAt ? format(new Date(order.createdAt), 'MMM dd, yyyy') : ''}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => handleViewDetails(order)}>
                      <InfoIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        />
      </Paper>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onClose={handleCloseDetails} maxWidth="md" fullWidth>
          <DialogTitle sx={{ borderBottom: '1px solid #303030' }}>Order Details: {selectedOrder.CompanyInfo?.CompanyDesiredName}</DialogTitle>
          <DialogContent dividers sx={{ p: 0 }}>
            
            {/* Company Info */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Company Information</Typography></AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}><DetailItem label="Desired Name" value={selectedOrder.CompanyInfo?.CompanyDesiredName} /></Grid>
                  <Grid item xs={12} sm={6}><DetailItem label="Alternative Name" value={selectedOrder.CompanyInfo?.CompanyAlternativeName} /></Grid>
                  <Grid item xs={12} sm={6}><DetailItem label="Category" value={selectedOrder.CompanyInfo?.CompanyBusinessCategory} /></Grid>
                  <Grid item xs={12}><DetailItem label="Description" value={selectedOrder.CompanyInfo?.CompanyBusinessDescription} /></Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Contact & Address */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Contact & Address</Typography></AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Name" value={`${selectedOrder.Contact?.contactFirstName || ''} ${selectedOrder.Contact?.contactLastName || ''}`} />
                    <DetailItem label="Email" value={selectedOrder.Contact?.contactEmail} />
                    <DetailItem label="Phone" value={selectedOrder.Contact?.contactPhone} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Address" value={`${selectedOrder.BusinessAddress?.BusinessAddressAddress1 || ''}, ${selectedOrder.BusinessAddress?.BusinessAddressAddress2 || ''}`} />
                    <DetailItem label="City" value={selectedOrder.BusinessAddress?.BusinessAddressCity || ''} />
                    <DetailItem label="State/Zip" value={`${selectedOrder.BusinessAddress?.BusinessAddressState || ''} ${selectedOrder.BusinessAddress?.BusinessAddressZip || ''}`} />
                    <DetailItem label="Country" value={selectedOrder.BusinessAddress?.BusinessAddressCountry || ''} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Responsible Party */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Responsible Party</Typography></AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {Object.entries(selectedOrder.ResponsibleParty || {}).map(([key, val]) => (
                    <Grid item xs={12} sm={6} key={key}><DetailItem label={key} value={val} /></Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Registered Agent */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Registered Agent</Typography></AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {Object.entries(selectedOrder.RegisterAgent || {}).map(([key, val]) => (
                    <Grid item xs={12} sm={6} key={key}><DetailItem label={key} value={val} /></Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* LLC Members */}
            {selectedOrder.LlcOnly?.length > 0 && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">LLC Members</Typography></AccordionSummary>
                <AccordionDetails>
                  {selectedOrder.LlcOnly.map((member, idx) => (
                    <Box key={idx} mb={2}>
                      <Typography variant="subtitle2" mb={1}>Member {idx + 1}</Typography>
                      <Grid container spacing={2}>
                        {Object.entries(member).map(([key, val]) => (
                          <Grid item xs={12} sm={6} key={key}><DetailItem label={key} value={val} /></Grid>
                        ))}
                      </Grid>
                      {idx < selectedOrder.LlcOnly.length - 1 && <Divider sx={{my:1}} />}
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}

            {/* Package & Payment */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Package & Payment</Typography></AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><DetailItem label="Package" value={selectedOrder.SelectedPackage?.package?.name} /></Grid>
                  <Grid item xs={12} sm={6}><DetailItem label="Plan" value={selectedOrder.SelectedPackage?.SelectedPlan?.title} /></Grid>
                  <Grid item xs={12} sm={6}><DetailItem label="Filing Speed" value={selectedOrder.filingSpeed} /></Grid>
                  <Grid item xs={12} sm={6}><DetailItem label="Status" value={selectedOrder.paymentStatus} /></Grid>
                  <Grid item xs={12} sm={6}><DetailItem label="Total Price" value={`$${selectedOrder.OrderTotalPrice}`} /></Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}

