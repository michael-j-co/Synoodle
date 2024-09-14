// src/components/InputSynonym.js
import React, { useRef, useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import './InputSynonym.css'; // Import the CSS for animations

const InputSynonym = ({ onSynonymGuess, incorrect, shouldClear }) => {
  const inputRef = useRef(null); // Create a reference for the input field
  const [inputValue, setInputValue] = useState(''); // State to manage input value
  const [shake, setShake] = useState(false); // State to trigger shake animation

  // Effect to focus input when the component mounts or updates
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Effect to handle incorrect guesses and trigger shake animation
  useEffect(() => {
    if (incorrect) {
      setShake(true); // Trigger shake animation
      setTimeout(() => {
        setShake(false); // Remove shake effect after 0.5 seconds
      }, 500);
    }
  }, [incorrect]);

  // Effect to clear input when feedback disappears
  useEffect(() => {
    if (shouldClear) {
      setInputValue(''); // Clear the input field
    }
  }, [shouldClear]);

  // Keep the input always focused by refocusing on blur
  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Refocus the input field
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSynonymGuess(inputValue); // Call the guess handler with the input value
      if (inputRef.current) {
        inputRef.current.focus(); // Refocus the input field after submission
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} sx={{ width: '100%', maxWidth: '600px' }}>
      <TextField
        inputRef={inputRef} // Attach the ref to the input
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur} // Ensure the input refocuses on blur
        variant="outlined"
        autoComplete="off"
        fullWidth
        className={shake ? 'shake' : ''} // Add shake class if shake state is true
        InputProps={{
          sx: {
            border: 'none', // Remove the border of the input box
            '& fieldset': { border: 'none' }, // Ensure no border appears on focus
            '& input': {
              color: '#8a2be2', // Set input text color to light purple
              caretColor: '#8a2be2', // Set the cursor color to light purple
              textAlign: 'center', // Center text inside the input
              fontSize: '1.5rem', // Increase font size to make input appear larger
              padding: '16px 20px', // Add padding to increase input height
            },
          },
        }}
        inputProps={{
          style: {
            color: '#8a2be2', // Ensure input text is purple
            caretColor: '#8a2be2', // Ensure cursor color is purple
            fontSize: '1.5rem', // Adjust font size for larger input
            textAlign: 'center', // Center text inside the input
          },
        }}
      />
    </Box>
  );
};

export default InputSynonym;
