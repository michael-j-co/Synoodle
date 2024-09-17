// src/components/FeedbackMessage.js
import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Typography, useTheme } from '@mui/material';
import './FeedbackMessage.css'; // Import the CSS file for animations

const FeedbackMessage = ({ message, points, show, type = 'success' }) => {
  const theme = useTheme(); // Access the theme
  const [internalShow, setInternalShow] = useState(false); // Internal state to control visibility

  useEffect(() => {
    if (show) {
      setInternalShow(true); // Show feedback when the 'show' prop is true
    } else {
      const timer = setTimeout(() => setInternalShow(false), 200); // Slight delay to match the animation duration
      return () => clearTimeout(timer);
    }
  }, [show]);

  // Determine the color based on the type of message
  const getMessageStyle = () => {
    if (type === 'success') {
      return {
        color: theme.palette.success.main, // Green color for success
      };
    } else if (type === 'error') {
      return {
        color: theme.palette.error.main, // Red color for errors
      };
    } else {
      return {
        color: theme.palette.text.primary, // Default text color
      };
    }
  };

  const { color } = getMessageStyle(); // Destructure color from getMessageStyle()

  return (
    <CSSTransition
      in={internalShow} // Use internalShow for transition control
      timeout={200} // Slightly longer duration for a smoother animation
      classNames="fade-pop" // Corresponding class names for the transition
      unmountOnExit
    >
      <Typography
        variant="h6"
        sx={{
          position: 'absolute', // Absolute positioning
          top: '100%', // Positioned below the input component
          left: '50%', // Center horizontally
          transform: 'translateX(-50%)', // Adjust position for perfect centering
          display: 'flex', // Flexbox for text alignment
          alignItems: 'center', // Center items vertically
          justifyContent: 'center', // Center items horizontally
          color: color, // Dynamic color based on message type
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly opaque background
          padding: '0.4rem 0.8rem', // More padding for better touch target
          borderRadius: '6px', // Rounded corners
          boxShadow: theme.shadows[2], // Subtle shadow for depth
          transition: 'all 0.3s ease', // Smooth transition for hover effects
          zIndex: 10, // Higher z-index to stay above other elements
        }}
      >
        {message} {points ? `+${points} points!` : ''}
      </Typography>
    </CSSTransition>
  );
};

export default FeedbackMessage;
