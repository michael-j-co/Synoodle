// src/components/GameFinish.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material'; // Import necessary components

const GameFinish = ({ totalGuesses, score, onPlayAgain }) => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Congratulations!
      </Typography>
      <Typography variant="h6" gutterBottom>
        You found {totalGuesses} synonyms and scored {score} points!
      </Typography>
      <Button
        variant="contained"
        onClick={onPlayAgain}
        sx={{
          backgroundColor: '#4B0082', // Dark purple color
          color: '#fff', // Text color
          '&:hover': {
            backgroundColor: '#3a0065', // Darker shade of purple for hover effect
          },
          marginTop: '1rem', // Add some spacing above the button
        }}
      >
        Play Again
      </Button>
    </Box>
  );
};

export default GameFinish;
