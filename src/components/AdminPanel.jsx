import React, { useState } from 'react';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography, createTheme, ThemeProvider,
  Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, Divider, Accordion, AccordionSummary, AccordionDetails,
  CircularProgress
} from '@mui/material';
import {
    Dashboard as DashboardIcon, ShoppingCart as ShoppingCartIcon, People as PeopleIcon,
    Settings as SettingsIcon, Menu as MenuIcon, Info as InfoIcon,
    ExpandMore as ExpandMoreIcon, AccountCircle, CorporateFare, LocationOn,
    BusinessCenter, Visibility, VisibilityOff, Lock
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import FileDownload from 'js-file-download';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import api from '../lib/apiClient';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff3902' },
    secondary: { main: '#e02810' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#e0e0e0', secondary: '#b3b3b3' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 },
    subtitle1: { color: '#ff3902' },
  },
  components: {
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
            }
        }
    },
    MuiTableRow: {
        styleOverrides: {
            root: {
                '&:hover': {
                    backgroundColor: 'rgba(255, 57, 2, 0.05) !important',
                }
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                backgroundColor: '#272727',
                fontWeight: 'bold',
            }
        }
    }
  }
});

const drawerWidth = 240;

const DetailItem = ({ label, value }) => (
    value ? <Typography variant="body2" color="text.secondary"><strong>{label}:</strong> {value}</Typography> : null
);

function StatusChip({ status }) {
  const getChipColor = (status) => {
    switch(status) {
      case 'paid':
        return { bgcolor: '#4caf50', color: '#fff', borderColor: '#4caf50' };
      case 'pending':
        return { bgcolor: '#ff9800', color: '#fff', borderColor: '#ff9800' };
      case 'approved':
        return { bgcolor: '#ff3902', color: '#fff', borderColor: '#ff3902' };
      case 'rejected':
        return { bgcolor: '#f44336', color: '#fff', borderColor: '#f44336' };
      default:
        return { bgcolor: 'transparent', color: '#b3b3b3', borderColor: '#b3b3b3' };
    }
  };

  const chipStyle = getChipColor(status);
  
  return (
    <Chip 
      label={status.charAt(0).toUpperCase() + status.slice(1)} 
      size="small" 
      variant="outlined"
      sx={{
        backgroundColor: chipStyle.bgcolor,
        color: chipStyle.color,
        borderColor: chipStyle.borderColor,
        '& .MuiChip-label': {
          color: chipStyle.color,
        }
      }}
    />
  );
}

function OrderList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  
  // const { data, isLoading, isError, error,refetch } = useQuery({
  //   queryKey: ['orders', page, rowsPerPage],
  //   queryFn: async () => {
  //     const res = await axios.get(`https://lauchbackend-896056687002.europe-west1.run.app/api/admin/business-orders`, {
  //       params: { page: page + 1, limit: rowsPerPage },
  //       withCredentials:true
  //     });
  //     return res.data;
  //   },
  //   keepPreviousData: true,
  // });
  const role = 'admin';
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['user-orders', page, rowsPerPage,],
    queryFn: async () => {
      const res = await api.get('/api/orders', {
        params: { role, page: page + 1, limit: rowsPerPage }
      });
      return res.data;
    },
    keepPreviousData: true
  });

  const orders = data?.orders || [];
  const total = data?.total || 0;

  const handleViewDetails = (order) => setSelectedOrder(order);
  const handleCloseDetails = () => setSelectedOrder(null);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const getStatusChip = (status) => {
    const getChipColor = (status) => {
      switch(status) {
        case 'paid':
          return { bgcolor: '#4caf50', color: '#fff', borderColor: '#4caf50' };
        case 'pending':
          return { bgcolor: '#ff9800', color: '#fff', borderColor: '#ff9800' };
        case 'approved':
          return { bgcolor: '#ff3902', color: '#fff', borderColor: '#ff3902' };
        case 'rejected':
          return { bgcolor: '#f44336', color: '#fff', borderColor: '#f44336' };
        default:
          return { bgcolor: 'transparent', color: '#b3b3b3', borderColor: '#b3b3b3' };
      }
    };

    const chipStyle = getChipColor(status);
    
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1)} 
        size="small" 
        variant="outlined"
        sx={{
          backgroundColor: chipStyle.bgcolor,
          color: chipStyle.color,
          borderColor: chipStyle.borderColor,
          '& .MuiChip-label': {
            color: chipStyle.color,
          }
        }}
      />
    );
  };

 
  const handleDownloadExcel = async () => {
    try {
      const res = await api.get('/api/admin/business-orders/export', {
        responseType: 'blob',
        withCredentials: true
      });
      FileDownload(res.data, 'business-orders.xlsx');
    } catch (err) {
      toast.error('Failed to download Excel file.');
    }
  };
 
  const handleStatusChange = async (order, newStatus) => {
    setUpdating(true);
    try {
      await api.put(`/api/admin/business-orders/${order._id}/status`, { status: newStatus }, { withCredentials: true });
      handleCloseDetails();
      refetch();
      toast.success('Order status updated and user notified by email.');
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  // Download single order as Excel
  const handleDownloadSingleExcel = async (orderId) => {
    try {
      const res = await api.get(`/api/admin/business-orders/${orderId}/export`, {
        responseType: 'blob',
        withCredentials: true
      });
      FileDownload(res.data, `order-${orderId}.xlsx`);
    } catch (err) {
      toast.error('Failed to download order details.');
    }
  };

  if (isLoading) return <Paper sx={{p:4, textAlign:'center'}}>Loading...</Paper>;
  if (isError) return <Paper sx={{p:4, textAlign:'center', color:'error.main'}}>Error: {error.message}</Paper>;

  // const { orders = [], total = 0, limit = rowsPerPage, page: currentPage = page + 1 } = data || {};

  return (
    <>
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6" gutterBottom component="div" sx={{ mb: 0 }}>
            Business Orders
          </Typography>
          <Button variant="outlined" sx={{borderColor: '#f44336', color: '#f44336'}}  onClick={handleDownloadExcel}>Download Excel</Button>
        </Box>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead><TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow></TableHead>
            <TableBody>
            {(orders.length > 0 ? orders : []).map((order) => (
                <TableRow hover key={order._id}>
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
              {/* {(orders.length > 0 ? orders : []).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id || row.id}>
                  <TableCell component="th" scope="row">{row.CompanyInfo?.CompanyDesiredName}</TableCell>
                  <TableCell>
                      <Box>
                          <Typography variant="body2">{`${row.Contact?.ContactFirstName || ''} ${row.Contact?.ContactLastName || ''}`}</Typography>
                          <Typography variant="caption" color="text.secondary">{row.Contact?.ContactEmail}</Typography>
                      </Box>
                  </TableCell>
                  <TableCell>{getStatusChip(row.paymentStatus)}</TableCell>
                  <TableCell align="right">${row.selectedPackage?.totalPrice?.toFixed(2) ?? '0.00'}</TableCell>
                  <TableCell>{row.createdAt ? format(new Date(row.createdAt), 'MMM dd, yyyy') : ''}</TableCell>
                   <TableCell align="center">
                    <IconButton size="small" onClick={() => handleViewDetails(row)}><InfoIcon fontSize="inherit" /></IconButton>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={total} rowsPerPage={rowsPerPage} page={page} onPageChange={(_, newPage) => setPage(newPage)} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} />
      </Paper>

       {/* {selectedOrder && (
        <Dialog open={!!selectedOrder} onClose={handleCloseDetails} maxWidth="md" fullWidth>
          <DialogTitle sx={{ borderBottom: '1px solid #303030' }}>Order Details: {selectedOrder.CompanyInfo?.CompanyDesiredName}</DialogTitle>
          <DialogContent dividers sx={{ p:0 }}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Company Information</Typography></AccordionSummary>
                <AccordionDetails><Grid container spacing={1}>
                    <Grid item xs={12} sm={6}><DetailItem label="Alternative Name" value={selectedOrder.CompanyInfo?.CompanyAlternativeName} /></Grid>
                    <Grid item xs={12} sm={6}><DetailItem label="Business Category" value={selectedOrder.CompanyInfo?.CompanyBusinessCategory} /></Grid>
                    <Grid item xs={12}><DetailItem label="Description" value={selectedOrder.CompanyInfo?.CompanyBusinessDescription} /></Grid>
                </Grid></AccordionDetails>
            </Accordion>
            <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Contact & Address</Typography></AccordionSummary>
                <AccordionDetails><Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontSize="1rem" gutterBottom>Primary Contact</Typography>
                        <DetailItem label="Name" value={`${selectedOrder.Contact?.ContactFirstName || ''} ${selectedOrder.Contact?.ContactLastName || ''}`} />
                        <DetailItem label="Email" value={selectedOrder.Contact?.ContactEmail} />
                        <DetailItem label="Phone" value={selectedOrder.Contact?.ContactPhone} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontSize="1rem" gutterBottom>Business Address</Typography>
                        <DetailItem label="Address" value={`${selectedOrder.BusinessAddress?.BusinessAddressAddress1 || ''}, ${selectedOrder.BusinessAddress?.BusinessAddressAddress2 || ''}`} />
                        <DetailItem label="City" value={selectedOrder.BusinessAddress?.BusinessAddressCity} />
                        <DetailItem label="State/Zip" value={`${selectedOrder.BusinessAddress?.BusinessAddressState || ''} ${selectedOrder.BusinessAddress?.BusinessAddressZip || ''}`} />
                    </Grid>
                </Grid></AccordionDetails>
            </Accordion>
            <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Participants</Typography></AccordionSummary>
                <AccordionDetails>{selectedOrder.CompanyParticipants?.map((p, i) => (
                    <Box key={i} sx={{ mb: i < selectedOrder.CompanyParticipants.length - 1 ? 2 : 0 }}><Grid container spacing={1}>
                        <Grid item xs={12} sm={4}><DetailItem label="Name" value={`${p.FirstName} ${p.LastName}`} /></Grid>
                        <Grid item xs={12} sm={4}><DetailItem label="Titles" value={p.Titles?.join(', ')} /></Grid>
                        <Grid item xs={12} sm={4}><DetailItem label="Ownership" value={`${p.OwnershipPercentage}%`} /></Grid>
                    </Grid>{ i < selectedOrder.CompanyParticipants.length - 1 && <Divider sx={{my: 1}} />}</Box>
                ))}</AccordionDetails>
            </Accordion>
            <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Package & Payment</Typography></AccordionSummary>
                <AccordionDetails><Grid container spacing={1}>
                    <Grid item xs={12} sm={4}><DetailItem label="Package" value={selectedOrder.selectedPackage?.name} /></Grid>
                    <Grid item xs={12} sm={4}><DetailItem label="Filing Speed" value={selectedOrder.filingSpeed} /></Grid>
                    <Grid item xs={12} sm={4}><Typography variant="body2" sx={{display: 'flex', alignItems: 'center', gap: 1}}><strong>Status:</strong> {getStatusChip(selectedOrder.paymentStatus)}</Typography></Grid>
                </Grid></AccordionDetails>
            </Accordion> */}

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
                    <DetailItem label="Address" value={`${selectedOrder.BusinessAddress?.BusinessAddressAddress1}, ${selectedOrder.BusinessAddress?.BusinessAddressAddress2}`} />
                    <DetailItem label="City" value={selectedOrder.BusinessAddress?.BusinessAddressCity} />
                    <DetailItem label="State/Zip" value={`${selectedOrder.BusinessAddress?.BusinessAddressState} ${selectedOrder.BusinessAddress?.BusinessAddressZip}`} />
                    <DetailItem label="Country" value={selectedOrder.BusinessAddress?.BusinessAddressCountry} />
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
          <DialogActions sx={{ p: '16px 24px' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 2, display: 'inline-block' }}>Update Status:</Typography>
              <select
                value={selectedOrder.paymentStatus}
                onChange={e => handleStatusChange(selectedOrder, e.target.value)}
                disabled={updating}
                style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', marginRight: 16 }}
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button
                variant="outlined"
                size="small"
                sx={{ ml: 2, borderColor: '#f44336', color: '#f44336' } }
                onClick={() => handleDownloadSingleExcel(selectedOrder._id)}
              >
                Download Details
              </Button>
            </Box>
            <Button onClick={handleCloseDetails} sx={{backgroundColor:'#f44336'}}  variant="contained">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

function CustomerList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['customers', page, rowsPerPage],
    queryFn: async () => {
      const res = await api.get('/api/admin/customer', {
        params: { page: page + 1, limit: rowsPerPage }
      });
      return res.data;
    },
    keepPreviousData: true
  });

  const customers = data?.users || [];
  const total = data?.total || 0;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!customerToDelete) return;

    setDeleting(true);
    try {
      await api.delete(`/api/admin/customer/${customerToDelete._id}`);
      toast.success('Customer deleted successfully.');
      refetch();
      handleCloseDeleteModal();
    } catch (err) {
      toast.error('Failed to delete customer.');
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setCustomerToDelete(null);
  };

  if (isLoading) return <Paper sx={{p:4, textAlign:'center'}}>Loading...</Paper>;
  if (isError) return <Paper sx={{p:4, textAlign:'center', color:'error.main'}}>Error: {error.message}</Paper>;

  return (
    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ mb: 0 }}>
          Customers
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total: {total} customers
        </Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)' }}>
        <Table stickyHeader aria-label="customers table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joined Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow hover key={customer._id}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {customer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {customer.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {customer.createdAt ? format(new Date(customer.createdAt), 'MMM dd, yyyy') : 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    disabled={deleting}
                    onClick={() => handleDeleteClick(customer)}
                    sx={{ 
                      minWidth: 'auto',
                      px: 1,
                      py: 0.5,
                      fontSize: '0.75rem'
                    }}
                  >
                    Delete
                  </Button>
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
        onPageChange={handleChangePage} 
        onRowsPerPageChange={handleChangeRowsPerPage} 
      />
      
      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: 'background.paper'
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid #ff3902',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Typography variant="h6" color="#ff3902">
            ⚠️ Delete Customer
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this customer?
          </Typography>
          
          {customerToDelete && (
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              bgcolor: 'rgba(255, 57, 2, 0.05)', 
              borderRadius: 1,
              border: '1px solid #ff3902'
            }}>
              <Typography variant="subtitle2" color="text.primary" gutterBottom>
                Customer Details:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Name:</strong> {customerToDelete.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Email:</strong> {customerToDelete.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Joined:</strong> {customerToDelete.createdAt ? format(new Date(customerToDelete.createdAt), 'MMM dd, yyyy') : 'N/A'}
              </Typography>
            </Box>
          )}
          
          <Typography variant="body2" color="#ff3902" sx={{ mt: 2, fontWeight: 500 }}>
            ⚠️ This action cannot be undone. All customer data will be permanently deleted.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCloseDeleteModal}
            variant="outlined"
            disabled={deleting}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1.5
            }}
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            disabled={deleting}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1.5,
              bgcolor: '#ff3902',
              '&:hover': { bgcolor: '#e02810' },
              '&:disabled': {
                backgroundColor: '#e5e7eb',
                color: '#9ca3af'
              }
            }}
          >
            {deleting ? (
              <>
                <CircularProgress size={16} sx={{ color: 'inherit', mr: 1 }} />
                Deleting...
              </>
            ) : (
              'Delete Customer'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      setLoading(false);
      return;
    }
    try {
      await axios.post('https://lauchbackend-896056687002.europe-west1.run.app/api/admin/change-password', {
        currentPassword,
        newPassword
      }, { withCredentials: true });
      setCurrentPassword('');
      setNewPassword('');
      toast.success('Password changed successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper elevation={4} sx={{ maxWidth: 420, width: '100%', p: 4, borderRadius: 3, boxShadow: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Lock sx={{ fontSize: 32, color: '#ff3902', mr: 1 }} />
          <Typography variant="h5" fontWeight={700} color="#ff3902">Change Password</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={3}>
          For your security, please use a strong password (at least 8 characters).
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Current Password"
            type={showCurrent ? 'text' : 'password'}
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#ff3902',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff3902',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff3902',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowCurrent(v => !v)} edge="end" size="small">
                    {showCurrent ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="New Password"
            type={showNew ? 'text' : 'password'}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            helperText={newPassword && newPassword.length < 8 ? 'At least 8 characters.' : ' '}
            error={!!error && newPassword.length < 8}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#ff3902',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff3902',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff3902',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNew(v => !v)} edge="end" size="small">
                    {showNew ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && <Typography color="error" sx={{ mt: 1, mb: 1 }}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            size="large"
            sx={{ 
              mt: 2, 
              fontWeight: 600, 
              borderRadius: 2,
              bgcolor: '#ff3902',
              '&:hover': { bgcolor: '#e02810' },
              '&:disabled': {
                backgroundColor: '#e5e7eb',
                color: '#9ca3af'
              }
            }}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default function AdminPanle(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Orders');

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  
  const handleMenuClick = (menuText) => {
    setSelectedMenu(menuText);
    // Close drawer on mobile after menu selection
    if (window.innerWidth < 900) { // md breakpoint (900px)
      setMobileOpen(false);
    }
  };
  
  const menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />},
      { text: 'Orders', icon: <ShoppingCartIcon />},
      { text: 'Customers', icon: <PeopleIcon />},
      { text: 'Settings', icon: <SettingsIcon />}
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" noWrap component="div" sx={{ color: '#ff3902', fontWeight: 'bold' }}>Admin Panel</Typography>
      </Toolbar>
      <List>{menuItems.map((item) => (
          <ListItem key={item.text} disablePadding><ListItemButton selected={selectedMenu === item.text} onClick={() => handleMenuClick(item.text)} sx={{ '&.Mui-selected': { background: 'linear-gradient(90deg, #ff3902 0%, #e02810 100%)', color: '#fff', borderRight: '4px solid #ff3902', '&:hover': { background: 'linear-gradient(90deg, #e02810 0%, #c62828 100%)' } }, '&:hover': { backgroundColor: 'rgba(255, 57, 2, 0.1)' }, m: '4px 8px', borderRadius: '4px' }}>
              <ListItemIcon sx={{ color: selectedMenu === item.text ? '#fff' : '#ff3902', minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: selectedMenu === item.text ? '#fff' : '#333' }} />
          </ListItemButton></ListItem>
      ))}</List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const renderContent = () => {
      switch(selectedMenu) {
          case 'Orders': return <OrderList />;
          case 'Dashboard': return <Typography variant="h4" sx={{p: 2}}>Dashboard Content</Typography>;
          case 'Customers': return <CustomerList />;
          case 'Settings': return <PasswordChangeForm />;
          default: return <OrderList />;
      }
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel | LaunchMyBiz</title>
        <meta name="description" content="Admin dashboard for LaunchMyBiz. Manage business orders, users, and settings." />
        <meta property="og:title" content="Admin Panel | LaunchMyBiz" />
        <meta property="og:description" content="Admin dashboard for LaunchMyBiz. Manage business orders, users, and settings." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.launchmybiz.net/admin-panel" />
        <meta property="og:image" content="https://www.launchmybiz.net/mainlogo-3-2.png" />
      </Helmet>
      <Box sx={{ display: 'flex' }}>
       <AppBar position="fixed" elevation={0} sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` }, backgroundColor: 'background.paper', borderBottom: '1px solid #ff3902' }}>
          <Toolbar>
            <IconButton 
              color="inherit" 
              aria-label="open drawer" 
              edge="start" 
              onClick={handleDrawerToggle} 
              sx={{ 
                mr: 2, 
                display: { md: 'none' }, // Changed from sm to md to show on more devices
                color: '#ff3902',
                '&:hover': {
                  backgroundColor: 'rgba(255, 57, 2, 0.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ color: '#333' }}>{selectedMenu}</Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          {/* Mobile Drawer */}
          <Drawer 
            container={container} 
            variant="temporary" 
            open={mobileOpen} 
            onClose={handleDrawerToggle} 
            ModalProps={{ 
              keepMounted: true,
              BackdropProps: {
                sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
              }
            }} 
            sx={{ 
              display: { xs: 'block', md: 'none' }, // Changed from sm to md
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth, 
                background: '#ffffff', 
                boxShadow: '2px 0 16px 0 rgba(0, 0, 0, 0.1)', 
                borderRight: 'none',
                zIndex: 1200
              } 
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Desktop Sidebar */}
          <Drawer 
            variant="permanent" 
            sx={{ 
              display: { xs: 'none', md: 'block' }, // Changed from sm to md
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth, 
                background: '#ffffff', 
                boxShadow: '2px 0 16px 0 rgba(0, 0, 0, 0.1)', 
                borderRight: 'none' 
              } 
            }} 
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}><Toolbar />{renderContent()}</Box>
      </Box>
    </>
  );
}
