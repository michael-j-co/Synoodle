// src/App.js
import React from 'react';
import Game from './components/Game';
import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material'; // Import ThemeProvider and CssBaseline
import theme from './theme'; // Import the custom theme

const App = () => {
  return (
    <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider */}
      <CssBaseline /> {/* Normalize CSS across browsers */}
      <div className="App">
        <Game />
      </div>
    </ThemeProvider>
  );
};

export default App;
