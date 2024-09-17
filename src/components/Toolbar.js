// src/components/Toolbar.js
import React from 'react';
import { Box, Button, Tooltip, Divider } from '@mui/material';
import HintButton from './HintButton';
import ReplayIcon from '@mui/icons-material/Replay'; // Import icons from Material-UI
import SettingsIcon from '@mui/icons-material/Settings';

const Toolbar = ({ onRevealHint, onRestart, onSettings }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between', // Space between for better distribution
        alignItems: 'center',
        width: '100%',
        padding: '0.5rem 1rem', // Adjust padding for a compact look
        backgroundColor: '#f7f7f7', // Slightly lighter background color
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a shadow effect
        marginBottom: '2rem',
        gap: '1rem', // Add spacing between buttons
        flexWrap: 'wrap', // Wrap elements on smaller screens
      }}
    >
      {/* Left Section: Restart Button */}
      <Tooltip title="Restart Game" arrow>
        <Button
          onClick={onRestart} // Call the onRestart function
          variant="outlined"
          startIcon={<ReplayIcon />} // Add icon to button
          sx={{
            color: '#007bff',
            borderColor: '#007bff',
            '&:hover': {
              backgroundColor: '#e3f2fd', // Light blue hover effect
              borderColor: '#007bff',
            },
            transition: 'all 0.2s ease', // Smooth transition for hover effects
          }}
          aria-label="Restart Game"
        >
          Restart
        </Button>
      </Tooltip>

      {/* Divider for visual separation */}
      <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: '#e0e0e0' }} />

      {/* Center Section: Hint Button */}
      <HintButton onRevealHint={onRevealHint} />

      {/* Divider for visual separation */}
      <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: '#e0e0e0' }} />

      {/* Right Section: Settings Button */}
      <Tooltip title="Settings" arrow>
        <Button
          onClick={onSettings}
          variant="outlined"
          startIcon={<SettingsIcon />} // Add icon to button
          sx={{
            color: '#6c757d',
            borderColor: '#6c757d',
            '&:hover': {
              backgroundColor: '#f8f9fa', // Light grey hover effect
              borderColor: '#6c757d',
            },
            transition: 'all 0.2s ease', // Smooth transition for hover effects
          }}
          aria-label="Settings"
        >
          Settings
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Toolbar;
