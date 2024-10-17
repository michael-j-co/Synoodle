// src/components/Toolbar.js
import React from 'react';
import styled from 'styled-components';
import { FaRedoAlt, FaLightbulb, FaCog } from 'react-icons/fa'; // Font Awesome icons

// Container for the toolbar with a light grey bottom border
const ToolbarContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align everything to the right */
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #fff; /* White background */
  margin-bottom: 2rem;
  gap: 1rem; /* Spacing between icons */
  border-top: 1px solid #d3d3d3; /* Light grey bottom border */
  
  border-bottom: 1px solid #d3d3d3; /* Light grey bottom border */
`;

// Icon wrapper with hover effect
const IconWrapper = styled.div`
  font-size: 1.5rem; /* Adjust icon size */
  color: coral; /* Default coral color */
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ff6347; /* Darker coral on hover (Tomato color) */
  }
`;

// Divider styling
const Divider = styled.div`
  height: 24px;
  width: 1px;
  background-color: #e0e0e0;
`;

// Toolbar component
const Toolbar = ({ onRevealHint, onRestart, onSettings }) => {
  return (
    <ToolbarContainer>
      {/* Restart Icon */}
      <IconWrapper onClick={onRestart}>
        <FaRedoAlt title="Restart Game" />
      </IconWrapper>

      {/* Divider */}
      <Divider />

      {/* Hint Icon */}
      <IconWrapper onClick={onRevealHint}>
        <FaLightbulb title="Reveal Hint" />
      </IconWrapper>

      {/* Divider */}
      <Divider />

      {/* Settings Icon */}
      <IconWrapper onClick={onSettings}>
        <FaCog title="Settings" />
      </IconWrapper>
    </ToolbarContainer>
  );
};

export default Toolbar;
