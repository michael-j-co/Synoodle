// src/components/InputSynonym.js
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const InputSynonym = ({ onSynonymGuess }) => {
  const [currentInput, setCurrentInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentInput.trim() !== '') {
      onSynonymGuess(currentInput);
      setCurrentInput('');
    } else if (e.key.length === 1) {
      setCurrentInput((prev) => prev + e.key);
    } else if (e.key === 'Backspace') {
      setCurrentInput((prev) => prev.slice(0, -1));
    }
  };

  return (
    <Box
      sx={{
        border: 'none',
        borderBottom: 'none',
        paddingBottom: '0.5rem',
        cursor: 'text',
        fontSize: '1.5rem',
        color: '#8a2be2',
        outline: 'none',
        margin: '0 auto',
        display: 'inline-block',
        width: '100%',
      }}
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <Typography variant="h4" component="span">
        {currentInput}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '1rem',
            animation: 'blink 1s step-end infinite',
            color: '#8a2be2',
          }}
        >
          |
        </Box>
      </Typography>
    </Box>
  );
};

export default InputSynonym;
