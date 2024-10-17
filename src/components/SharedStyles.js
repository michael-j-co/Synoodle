// src/components/SharedStyles.js
import styled from 'styled-components';

// Reusable container for layouts
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  background-color: #f0f8ff;
`;

// Reusable Title component (can be used in both StartScreen and Game)
export const Title = styled.h1`
  font-family: 'Madimi One';
  color: #000;
  font-size: 3.5rem;
  font-weight: 400;
`;

// Reusable Button component
export const Button = styled.button`
  display: inline-flex;
  padding: 1rem 2rem;
  background-color: #000;
  color: #fff;
  border-radius: 50px;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1c1a1a;
  }
`;

// Reusable Progress and Score section
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

// Reusable feedback message styling
export const FeedbackMessageWrapper = styled.div`
  background-color: ${({ incorrect }) => (incorrect ? '#f44336' : '#4caf50')};
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  font-size: 1.2rem;
`;
