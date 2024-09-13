// src/components/WordDisplay.js
import React from 'react';

const WordDisplay = ({ word }) => {
  return (
    <div>
      <h2>Word of the Day: {word}</h2>
    </div>
  );
};

export default WordDisplay;
