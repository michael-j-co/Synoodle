// src/components/Toolbar.js
import React from 'react';
import { Box, Button } from '@mui/material';
import HintButton from './HintButton';

const Toolbar = ({ onRevealHint }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        padding: '1rem',
        backgroundColor: '#f0f0f0', // Add a subtle background color
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a shadow effect
        marginBottom: '2rem',
      }}
    >
      {/* Hint Button on the right side */}
      <HintButton onRevealHint={onRevealHint} />
    </Box>
  );
};

export default Toolbar;
