// src/components/ProgressSlider.js
import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ProgressSlider = ({ guessedCount, total }) => {
  const theme = useTheme(); // Access theme for colors
  const inactiveColor = theme.palette.grey[400]; // Inactive shape color
  const activeColor = theme.palette.primary.main; // Active shape color

  const dotSize = 10; // Base size for the inactive dots
  const activeDotSize = 16; // Size for the active dot
  const shapeSpacing = 100 / (total - 1); // Equidistant spacing in percentages

  return (
    <Box
      sx={{
        display: 'flex', // Flexbox for horizontal layout
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally
        width: '100%', // Full width
        maxWidth: '600px', // Max width for the slider
        margin: '0 auto', // Center horizontally
        position: 'relative', // Relative for any absolute children
        height: '40px', // Fixed height to prevent shifting
      }}
    >
      {/* Connecting Line */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%', // Center line vertically
          left: 0, // Align line to start at the beginning
          right: 0, // Align line to end at the end
          height: '2px', // Line thickness
          backgroundColor: inactiveColor, // Line color
          zIndex: 0, // Behind shapes
          transform: 'translateY(-50%)', // Center line vertically
        }}
      />

      {/* Progress Shapes */}
      {Array.from({ length: total }, (_, index) => {
        const isActive = index < guessedCount; // Determine if this shape should be active
        const isLast = index === total - 1; // Determine if this is the last shape

        return (
          <Box
            key={index}
            sx={{
              position: 'absolute', // Absolute positioning for independent growth
              left: `${index * shapeSpacing}%`, // Position based on percentage spacing
              transform: 'translateX(-50%)', // Center each shape on its position
              zIndex: 1, // Above the connecting line
              width: isActive ? `${activeDotSize}px` : `${dotSize}px`, // Active size vs inactive size
              height: isActive ? `${activeDotSize}px` : `${dotSize}px`,
              borderRadius: isLast ? '2px' : '50%', // Square for the last shape, round for others
              backgroundColor: isActive ? activeColor : inactiveColor, // Active or inactive color
              transition: 'background-color 0.3s ease, width 0.3s ease, height 0.3s ease', // Smooth transitions
            }}
          />
        );
      })}
    </Box>
  );
};

export default ProgressSlider;
