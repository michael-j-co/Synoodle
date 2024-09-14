// src/components/FeedbackMessage.js
import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Typography, useTheme } from '@mui/material';
import './FeedbackMessage.css'; // Import the CSS file for animations

const FeedbackMessage = ({ message, points, show }) => {
  const theme = useTheme(); // Access the theme
  const [internalShow, setInternalShow] = useState(false); // Internal state to control visibility
  const [displayMessage, setDisplayMessage] = useState({ message: '', points: 0 }); // State to store message and points

  useEffect(() => {
    if (show) {
      // If 'show' prop is true, update the message and show it
      setDisplayMessage({ message, points });
      setInternalShow(true);
    } else {
      // Hide the message after a short delay to match the animation duration
      const timer = setTimeout(() => setInternalShow(false), 150); // 150ms duration for shorter animation
      return () => clearTimeout(timer);
    }
  }, [show, message, points]);

  return (
    <CSSTransition
      in={internalShow} // Use internalShow for transition control
      timeout={150} // Shorter duration for the fade-in and fade-out
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
          textAlign: 'center', // Center align the text
          color: theme.palette.secondary.main, // Apply light purple color from theme
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Light background to stand out
          padding: '0.2rem 0.5rem', // Small padding around the text
          borderRadius: '4px', // Rounded corners
        }}
      >
        {displayMessage.message} +{displayMessage.points} points!
      </Typography>
    </CSSTransition>
  );
};

export default FeedbackMessage;
