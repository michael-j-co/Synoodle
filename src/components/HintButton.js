// src/components/HintButton.js
import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Hint icon

const HintButton = ({ onRevealHint }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRevealLetter = () => {
    onRevealHint(); // Call the hint function passed from the parent
    handleClose();  // Close the menu
  };

  return (
    <>
      <IconButton
        aria-label="hint"
        onClick={handleClick}
        size="large"
        color="primary"
        sx={{ marginRight: '1rem' }}
      >
        <LightbulbIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'hint-button' }}
      >
        <MenuItem onClick={handleRevealLetter}>Reveal a Synonym</MenuItem>
        {/* You can add more hint options here */}
      </Menu>
    </>
  );
};

export default HintButton;
