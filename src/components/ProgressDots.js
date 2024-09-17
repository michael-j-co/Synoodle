// src/components/ProgressSlider.js
import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ProgressSlider = ({ guessedCount, total }) => {
  const theme = useTheme();
  const inactiveColor = theme.palette.grey[400];
  const activeColor = theme.palette.primary.main;

  const dotSize = 12; // Base size for the inactive dots
  const activeDotSize = 18; // Size for the active dot
  const shapeSpacing = 100 / (total - 1); // Equidistant spacing in percentages

  // Adjusted fill percentage calculation to prevent overfill
  const fillPercentage = ((guessedCount - 1) / (total - 1)) * 100;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        height: '50px', // Increased height for better UI
        padding: theme.spacing(2, 0),
      }}
      aria-label="Progress indicator"
    >
      {/* Background Line */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: inactiveColor,
          zIndex: 0,
          transform: 'translateY(-50%)',
        }}
      />

      {/* Filled Line */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          height: '2px',
          backgroundColor: activeColor,
          width: `${fillPercentage}%`, // Corrected dynamic width based on guessed count
          zIndex: 1, // Above the background line
          transform: 'translateY(-50%)',
          transition: 'width 0.3s ease', // Smooth width transition
        }}
      />

      {/* Progress Dots */}
      {Array.from({ length: total }, (_, index) => {
        const isActive = index < guessedCount;
        const isLast = index === total - 1;

        return (
          <Box
            key={index}
            aria-hidden="true"
            sx={{
              position: 'absolute',
              left: `${index * shapeSpacing}%`,
              transform: 'translateX(-50%)',
              zIndex: 2, // Above the lines
              width: isActive ? `${activeDotSize}px` : `${dotSize}px`,
              height: isActive ? `${activeDotSize}px` : `${dotSize}px`,
              borderRadius: isLast ? '2px' : '50%',
              backgroundColor: isActive ? activeColor : inactiveColor,
              transition: 'background-color 0.3s ease, width 0.3s ease, height 0.3s ease, transform 0.3s ease',
              // Removed boxShadow property to eliminate glowing effect
              '&:hover': {
                transform: 'translateX(-50%) scale(1.1)', // Hover effect for interaction
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default ProgressSlider;
