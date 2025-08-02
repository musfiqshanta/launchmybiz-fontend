import React, { useState } from 'react';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography, createTheme, ThemeProvider,
  Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, Divider, Accordion, AccordionSummary, AccordionDetails
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

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#e0e0e0', secondary: '#b3b3b3' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 },
    subtitle1: { color: '#90caf9' },
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
                    backgroundColor: 'rgba(255, 255, 255, 0.05) !important',
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

function OrderList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  const { data, isLoading, isError, error,refetch } = useQuery({
    queryKey: ['orders', page, rowsPerPage],
    queryFn: async () => {
      const res = await axios.get(`https://lauchbackend-896056687002.europe-west1.run.app/api/admin/business-orders`, {
        params: { page: page + 1, limit: rowsPerPage },
        withCredentials:true
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleViewDetails = (order) => setSelectedOrder(order);
  const handleCloseDetails = () => setSelectedOrder(null);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const getStatusChip = (status) => {
    const color = status === 'paid' ? 'success' : status === 'pending' ? 'warning' : 'error';
    return <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} color={color} size="small" variant="outlined"/>;
  };

 
  const handleDownloadExcel = async () => {
    try {
      const res = await axios.get('https://lauchbackend-896056687002.europe-west1.run.app/api/admin/business-orders/export', {
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
      await axios.put(`https://lauchbackend-896056687002.europe-west1.run.app/api/admin/business-orders/${order._id}/status`, { status: newStatus }, { withCredentials: true });
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
      const res = await axios.get(`https://lauchbackend-896056687002.europe-west1.run.app/api/admin/business-orders/${orderId}/export`, {
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

  const { orders = [], total = 0, limit = rowsPerPage, page: currentPage = page + 1 } = data || {};

  return (
    <>
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6" gutterBottom component="div" sx={{ mb: 0 }}>
            Business Orders
          </Typography>
          <Button variant="outlined" onClick={handleDownloadExcel}>Download Excel</Button>
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
              {(orders.length > 0 ? orders : []).map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={total} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>

       {selectedOrder && (
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
                sx={{ ml: 2 }}
                onClick={() => handleDownloadSingleExcel(selectedOrder._id)}
              >
                Download Details
              </Button>
            </Box>
            <Button onClick={handleCloseDetails} variant="contained">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
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
          <Lock sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
          <Typography variant="h5" fontWeight={700} color="primary.main">Change Password</Typography>
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
            color="primary"
            disabled={loading}
            fullWidth
            size="large"
            sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}
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
  
  const menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />},
      { text: 'Orders', icon: <ShoppingCartIcon />},
      { text: 'Customers', icon: <PeopleIcon />},
      { text: 'Settings', icon: <SettingsIcon />}
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Admin Panel</Typography>
      </Toolbar>
      <List>{menuItems.map((item) => (
          <ListItem key={item.text} disablePadding><ListItemButton selected={selectedMenu === item.text} onClick={() => setSelectedMenu(item.text)} sx={{ '&.Mui-selected': { background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)', color: '#fff', borderRight: '4px solid #90caf9', '&:hover': { background: 'linear-gradient(90deg, #1565c0 0%, #64b5f6 100%)' } }, m: '4px 8px', borderRadius: '4px' }}>
              <ListItemIcon sx={{ color: selectedMenu === item.text ? '#fff' : 'text.primary', minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
          </ListItemButton></ListItem>
      ))}</List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const renderContent = () => {
      switch(selectedMenu) {
          case 'Orders': return <OrderList />;
          case 'Dashboard': return <Typography variant="h4" sx={{p: 2}}>Dashboard Content</Typography>;
          case 'Customers': return <Typography variant="h4" sx={{p: 2}}>Customers Content</Typography>;
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
       <AppBar position="fixed" elevation={0} sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, backgroundColor: 'background.paper', borderBottom: '1px solidrgb(4, 0, 253)' }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}><MenuIcon /></IconButton>
            <Typography variant="h6" noWrap component="div">{selectedMenu}</Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: 'linear-gradient(180deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%)', boxShadow: '2px 0 16px 0 rgba(255, 255, 255, 0.15)', borderRight: 'none' } }}>{drawer}</Drawer>
          <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: 'linear-gradient(180deg,rgb(255, 255, 255) 0% ', boxShadow: '2px 0 16px 0 rgba(255, 255, 255, 0.15)', borderRight: 'none' } }} open>{drawer}</Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}><Toolbar />{renderContent()}</Box>
      </Box>
    </>
  );
}
