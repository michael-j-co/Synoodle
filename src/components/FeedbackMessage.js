// src/components/FeedbackMessage.js
import React from 'react';
import { FeedbackMessageWrapper } from './SharedStyles';

const FeedbackMessage = ({ message, incorrect }) => {
  return (
    <FeedbackMessageWrapper incorrect={incorrect}>
      {message}
    </FeedbackMessageWrapper>
  );
};

export default FeedbackMessage;
