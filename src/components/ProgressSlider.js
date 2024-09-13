// src/components/ProgressSlider.js
import React from 'react';
import { Slider } from '@mui/material';

const ProgressSlider = ({ guessedCount, total }) => (
  <Slider
    value={guessedCount}
    max={total}
    aria-labelledby="progress-slider"
    sx={{ color: '#8a2be2', mb: 4 }}
  />
);

export default ProgressSlider;
