import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Synoodle</Title>
      <Subtitle>Developed by Michael Co</Subtitle>
    </HeaderContainer>
  );
};

// Custom Container component for layout, aligned left and with a white background
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;   // Align to the left
  justify-content: center;
  width: 100%;
  padding: 1rem;             // Smaller padding
  background-color: #fff;    // White background
`;

// Custom Title component with reduced size
const Title = styled.h1`
  font-family: 'Madimi One', sans-serif;
  color: #000;
  margin-left: 8.5rem;
  font-size: 2.5rem;         // Smaller font size
  font-weight: 400;
  margin-bottom: 0;     // Reduced margin
`;

// Custom Subtitle with even smaller size and italicized text
const Subtitle = styled.p`
  font-size: 1rem; 
  margin-left: 8.5rem;          // Smaller font size
  font-style: italic;
  color: #000;
  margin-top: 0;       // Smaller margin between title and subtitle
  margin-bottom: 0;
`;

export default Header;
