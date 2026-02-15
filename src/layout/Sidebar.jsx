import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItem = (path, label) => (
    <Box
      component={Link}
      to={path}
      sx={{
        display: "block",
        p: 1.5,
        borderRadius: 2,
        textDecoration: "none",
        color: location.pathname === path ? "#00E5FF" : "#ccc",
        background:
          location.pathname === path ? "rgba(0,229,255,0.1)" : "transparent",
        "&:hover": { background: "rgba(255,255,255,0.05)" },
        mb: 1,
      }}
    >
      {label}
    </Box>
  );

  return (
    <Box
      sx={{
        width: 240,
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0f172a,#1e293b)",
        p: 3,
      }}
    >
      <Typography variant="h6" mb={4} color="#00E5FF">
        StoreOps
      </Typography>

      {menuItem("/", "Dashboard")}
      {menuItem("/inventory", "Inventory")}
      {menuItem("/payments", "Payments")}
      {menuItem("/alerts", "Alerts")}
    </Box>
  );
};

export default Sidebar;