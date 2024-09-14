// src/components/ProgressDots.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const getProgressMessage = (progress, total) => {
  const percentage = (progress / total) * 100;
  if (percentage === 0) return "Just Started";
  if (percentage < 30) return "Moving Up";
  if (percentage < 60) return "Halfway There";
  if (percentage < 90) return "Almost There";
  if (percentage === 100) return "Completed!";
  return "";
};

const ProgressDots = ({ guessedCount, total }) => {
  const theme = useTheme(); // Get theme object to access palette
  const dotSpacing = 40; // Adjust spacing between dots
  const dotSize = 8; // Base size for the inactive dots
  const activeDotSize = 16; // Size for the active dot
  const lastDotOffset = 4; // Offset for the last dot to align the square

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 4 }}>
      {/* Progress Message on the Top */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        {getProgressMessage(guessedCount, total)}
      </Typography>

      {/* Progress Dots Container */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Connecting Line */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%', // Center vertically relative to the dots
            left: `${dotSize / 2}px`, // Start at the center of the first dot
            width: `${(total - 1) * dotSpacing + lastDotOffset}px`, // Adjust the line width to connect all dots including the last square
            height: '4px',
            backgroundColor: theme.palette.grey[300],
            zIndex: 0, // Behind the dots
            transform: 'translateY(-50%)',
          }}
        />

        {/* Progress Dots */}
        {Array.from({ length: total }, (_, index) => {
          const isLast = index === total - 1;
          const isCurrent = guessedCount === index + 1;

          return (
            <Box
              key={index}
              sx={{
                position: 'relative',
                zIndex: 1, // Above the connecting line
                width: isCurrent ? `${activeDotSize}px` : `${dotSize}px`,
                height: isCurrent ? `${activeDotSize}px` : `${dotSize}px`,
                borderRadius: isLast ? '2px' : '50%', // Square for the last dot
                backgroundColor: isCurrent ? theme.palette.primary.main : theme.palette.grey[400],
                marginLeft: index > 0 ? `${dotSpacing}px` : '0', // Space between dots, except the first one
                transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ProgressDots;
