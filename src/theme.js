// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6347', // Tomato red (bowl color)
      contrastText: '#ffffff', // White text for better contrast
    },
    secondary: {
      main: '#FFD700', // Gold (noodles color)
      contrastText: '#333333', // Dark text for better contrast on secondary elements
    },
    background: {
      default: '#f7f7f7', // Light gray background color
      paper: '#ffffff', // White background for paper components
    },
    text: {
      primary: '#333333', // Main text color (dark gray)
      secondary: '#8B4513', // Secondary text color (saddle brown for chopsticks)
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded buttons
          textTransform: 'none', // Prevent all caps styling
        },
        containedPrimary: {
          backgroundColor: '#FF6347', // Consistent with primary color
          '&:hover': {
            backgroundColor: '#E5533D', // Slightly darker on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#FFD700', // Consistent with secondary color
          '&:hover': {
            backgroundColor: '#FFC300', // Slightly darker gold on hover
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h3: {
          fontFamily: "'Righteous', cursive", // Font matching the title font
          fontWeight: 700, // Bold weight
          color: '#333', // Main text color
        },
      },
    },
  },
});

export default theme;
