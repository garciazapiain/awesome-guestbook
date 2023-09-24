import { createTheme } from "@mui/material/styles";

// Define your custom typography settings
const typography = {
  h1: {
    fontSize: '32px',  // 32px
  },
  h2: {
    fontSize: '1.25rem', // 20px
  },
  body1: {
    fontSize: '1rem',  // 16px
  },
  body2: {
    fontSize: '0.875rem', // 14px
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722", // Change this to your primary color
    },
    secondary: {
      main: "#ffffff", // Change this to your secondary color
    },
    error:{
      main:"#D32F2F"
    }
  },
  typography: {
    // Include your custom typography settings here
    ...typography,
  },
});

export default theme;
