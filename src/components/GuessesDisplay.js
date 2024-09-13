// src/components/GuessesDisplay.js
import React from 'react';
import { Paper } from '@mui/material';
import Blanks from './Blanks';

const GuessesDisplay = ({ synonyms }) => (
  <Paper elevation={3} sx={{ padding: '1rem', backgroundColor: '#fff7ff' }}>
    <Blanks synonyms={synonyms} /> {/* Display guessed synonyms */}
  </Paper>
);

export default GuessesDisplay;
