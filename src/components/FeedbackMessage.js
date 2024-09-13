// src/components/FeedbackMessage.js
import React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

const FeedbackMessage = ({ message, points }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    style={{ position: 'absolute', top: '10%', textAlign: 'center', color: '#8a2be2' }}
  >
    <Typography variant="h4">{message}</Typography>
    <Typography variant="h6">+{points} points!</Typography>
  </motion.div>
);

export default FeedbackMessage;
