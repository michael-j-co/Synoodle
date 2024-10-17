// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import the global styles
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import { ThemeProvider, CssBaseline } from '@mui/material'; // Import ThemeProvider and CssBaseline
import theme from './theme'; // Import the custom theme
import Header from './components/Header.js';
const App = () => {
  const [showGame, setShowGame] = useState(false); // Track whether to show the game

  const handleStart = () => {
    setShowGame(true); // Switch to the game screen
  };

  return (
    <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider */}
      <CssBaseline /> {/* Normalize CSS across browsers */}
      <Header/>
      <div className="App">
        {showGame ? (
          <Game />
        ) : (
          <StartScreen onStart={handleStart} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
