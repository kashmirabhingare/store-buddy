import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00E5FF" },
    secondary: { main: "#FF4081" },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;