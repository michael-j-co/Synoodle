// src/components/GuessesDisplay.js
import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';

const GuessesDisplay = ({ synonyms }) => {
  // Extract correctly guessed words in order using useMemo to avoid recomputation
  const correctGuesses = useMemo(
    () =>
      Object.entries(synonyms)
        .filter(([_, displayValue]) => !displayValue.includes('_'))
        .map(([synonym]) => synonym),
    [synonyms]
  );

  // Define the total number of blanks to display
  const totalBlanks = Object.keys(synonyms).length;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
        width: '100%',
        maxWidth: '400px', // Set max width for the component to control line length
        border: '2px solid #ddd', // Light gray border around the whole box
        padding: '1rem', // Padding inside the box
        borderRadius: '8px', // Rounded corners for the box
        backgroundColor: '#f9f9f9', // Light background color for contrast
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        height: `${totalBlanks * 3}rem`, // Fixed height based on total blanks to prevent resizing
        overflow: 'hidden', // Hide overflow to maintain box height
      }}
    >
      {/* Message displaying the number of correct guesses */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: '1rem', // Spacing below the message
          color: '#333', // Dark color for visibility
          fontWeight: 'bold', // Bold text for emphasis
          textAlign: 'left', // Align text to the left
          width: '100%', // Full width for alignment
        }}
      >
        You have found {correctGuesses.length} word{correctGuesses.length !== 1 ? 's' : ''}.
      </Typography>

      {/* Display each word above its blank line */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: '0.5rem', // Space between each blank line
        }}
      >
        {Array.from({ length: totalBlanks }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center', // Center content vertically within fixed height
              width: '100%', // Ensure full width for alignment
              height: '1.5rem', // Fixed height for each word/line container
              position: 'relative', // Relative positioning for absolute elements inside
            }}
          >
            {/* Display guessed word if it is guessed correctly, in order from the top */}
            {index < correctGuesses.length && (
              <Typography
                variant="body1"
                sx={{
                  color: '#000', // Dark color for guessed words
                  fontSize: '1rem', // Set font size for guessed words
                  position: 'absolute', // Position the word absolutely within the container
                  top: '0', // Align to the top of the container
                  left: '0', // Align to the left of the container
                  margin: '0', // Remove default margins
                }}
              >
                {correctGuesses[index]}
              </Typography>
            )}

            {/* Show a single blank line for each word */}
            <Box
              sx={{
                width: '100%', // Fixed width for the line, regardless of word length
                borderBottom: '1px solid #ddd', // Style the line
                position: 'absolute', // Position line absolutely to overlap with text
                bottom: '0', // Align to the bottom of the container
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GuessesDisplay;
