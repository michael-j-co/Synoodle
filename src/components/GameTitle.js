// src/components/GameTitle.js
import React from 'react';
import { Typography } from '@mui/material';

const GameTitle = () => (
  <Typography
    variant="h3"
    sx={{ textAlign: 'center', marginBottom: '2rem', color: '#000000', fontWeight: 'bold' }}
  >
    Synodle - Synonym Game
  </Typography>
);

export default GameTitle;
