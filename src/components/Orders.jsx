import React, { useState } from "react";
import { Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography, Chip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/apiClient";

function StatusChip({ status }) {
  const color = status === 'paid' ? 'success' : status === 'pending' ? 'warning' : 'default';
  return <Chip label={status} color={color} size="small" variant="outlined"/>;
}

export default function Orders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-orders", page, rowsPerPage],
    queryFn: async () => {
      const res = await api.get("/api/orders", {
        params: { page: page + 1, limit: rowsPerPage },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const orders = data?.orders || [];
  const total = data?.total || 0;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>Orders</Typography>
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : isError ? (
            <Typography color="error">Failed to load orders.</Typography>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id || o._id} hover>
                      <TableCell>{o.title || o.CompanyInfo?.CompanyDesiredName || `Order ${o._id?.slice(-6)}`}</TableCell>
                      <TableCell><StatusChip status={o.paymentStatus || o.status || 'pending'} /></TableCell>
                      <TableCell align="right">${o.total || o.selectedPackage?.totalPrice || 0}</TableCell>
                      <TableCell>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ''}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, p) => setPage(p)}
                onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              />
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
