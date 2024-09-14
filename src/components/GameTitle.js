// src/components/GameTitle.js
import React from 'react';
import { Box, Typography } from '@mui/material';

// Define a more detailed noodle bowl SVG icon
const NoodleBowlIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: '12px' }} // Space between icon and title
  >
    {/* Bowl */}
    <path
      d="M2 17c1.657 3.333 5.333 5 10 5s8.343-1.667 10-5H2z"
      fill="#FF6347" // Bowl color
    />
    {/* Noodles */}
    <path
      d="M4 11c0 1.104.896 2 2 2s2-.896 2-2H4zm8 0c0 1.104.896 2 2 2s2-.896 2-2h-4zm-4 0c0 1.104.896 2 2 2s2-.896 2-2H8zm6 0c0 1.104.896 2 2 2s2-.896 2-2h-2zm4 0c0 1.104.896 2 2 2s2-.896 2-2h-2z"
      fill="#FFD700" // Noodles color
    />
    {/* Chopsticks */}
    <path
      d="M16 6l4 8m-3-9l3 6"
      stroke="#8B4513"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GameTitle = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Noodle Bowl Icon on the Left */}
      <NoodleBowlIcon />
      {/* Game Title with Strong, Bold Font */}
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontFamily: "'Righteous', cursive", // Bold and unique font from Google Fonts
          fontSize: '2.8rem',
          color: '#333', // Text color
        }}
      >
        Synoodle
      </Typography>
    </Box>
  );
};

export default GameTitle;
