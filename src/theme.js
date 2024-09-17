// src/theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

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
    error: {
      main: '#D32F2F', // Red for errors
      contrastText: '#ffffff',
    },
    success: {
      main: '#388E3C', // Green for success
      contrastText: '#ffffff',
    },
    info: {
      main: '#1976D2', // Blue for informational elements
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#333',
      fontFamily: "'Righteous', cursive", // Unique title font
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#333',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#333',
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#8B4513',
    },
    button: {
      textTransform: 'none', // Ensure button text is not all caps
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded buttons
          padding: '0.5rem 1.5rem', // Consistent padding
          textTransform: 'none', // Prevent all caps styling
          transition: 'all 0.3s ease', // Smooth hover transition
        },
        containedPrimary: {
          backgroundColor: '#FF6347', // Consistent with primary color
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#E5533D', // Slightly darker on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#FFD700', // Consistent with secondary color
          color: '#333333',
          '&:hover': {
            backgroundColor: '#FFC300', // Slightly darker gold on hover
          },
        },
        outlinedPrimary: {
          color: '#FF6347', // Border and text color
          borderColor: '#FF6347',
          '&:hover': {
            backgroundColor: '#FFEBE6', // Light tint for hover
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
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FFD700', // Border color for TextField
            },
            '&:hover fieldset': {
              borderColor: '#FFC300', // Hover state
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6347', // Focus state
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // Paper background
          padding: '1rem', // Default padding
          borderRadius: 8,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#FF6347', // Consistent with primary color
        },
      },
    },
  },
});

// Enable responsive font sizes
const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
