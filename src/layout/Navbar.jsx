import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(30,41,59,0.8)",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar>
        <Typography variant="h6">
           Business Monitoring
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;