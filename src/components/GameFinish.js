// src/components/GameFinish.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material'; // Import necessary components
import { useTheme } from '@mui/material/styles'; // Import useTheme for accessing theme properties

const GameFinish = ({ totalGuesses, score, onPlayAgain }) => {
  const theme = useTheme(); // Access the theme to use its colors and styles

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
          backgroundColor: theme.palette.primary.main, // Use primary color from theme
          color: theme.palette.primary.contrastText, // Use text color from theme
          '&:hover': {
            backgroundColor: theme.palette.primary.dark, // Automatically generated darker shade for hover
          },
          marginTop: '1rem', // Add some spacing above the button
          borderRadius: theme.shape.borderRadius, // Use consistent border radius from theme
        }}
      >
        Play Again
      </Button>
    </Box>
  );
};

export default GameFinish;
