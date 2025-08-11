import React from "react";
import { List, ListItemButton, ListItemText, ListItemIcon, Divider } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Overview", path: "/user/dashboard", icon: <DashboardIcon /> },
  { text: "Profile", path: "/user/dashboard/profile", icon: <PersonIcon /> },
  { text: "Orders", path: "/user/dashboard/orders", icon: <ReceiptLongIcon /> },
];

const Sidebar = ({ onItemClick }) => {
  const location = useLocation();

  return (
    <List sx={{ pt: 10}}>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.text}
          component={Link}
          to={item.path}
          selected={location.pathname === item.path}
          onClick={onItemClick}
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 1.5,
            '&.Mui-selected': {
              bgcolor: 'action.selected',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      <ListItemButton
        onClick={() => {
          try { localStorage.removeItem('token'); } catch {}
          window.location.href = '/';
        }}
        sx={{
          mx: 1,
          my: 0.5,
          borderRadius: 1.5,
          bgcolor: '#e70000',
          color: '#fff',
          '&:hover': { bgcolor: '#c80000' },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: '#fff' }}><LogoutIcon /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;
