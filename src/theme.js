// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B0082', // Dark purple
      contrastText: '#fff', // Text color on primary color
    },
    secondary: {
      main: '#8a2be2', // Light purple or any other secondary color
    },
    // Add more custom colors or palette options if needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Example of overriding button styles globally
        },
      },
    },
  },
});

export default theme;
