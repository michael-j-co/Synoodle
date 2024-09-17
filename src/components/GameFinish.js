// src/components/GameFinish.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CelebrationIcon from '@mui/icons-material/EmojiEvents'; // Material-UI icon for celebration
import confetti from 'canvas-confetti'; // Confetti for celebration

const GameFinish = ({ totalGuesses, score, onPlayAgain }) => {
  const theme = useTheme();

  // Trigger confetti animation when the component mounts
  React.useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  // Function to handle score sharing
  const handleShareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Synodle Game Score',
        text: `I found ${totalGuesses} synonyms and scored ${score} points in Synodle! 🎉`,
        url: window.location.href, // Share the current URL
      })
        .then(() => console.log('Score shared successfully!'))
        .catch((error) => console.error('Error sharing score:', error));
    } else {
      alert('Your browser does not support the Web Share API.');
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: theme.palette.background.paper, // Use theme background color
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3], // Add a subtle shadow for depth
        maxWidth: '500px', // Limit max width for better readability
        margin: '2rem auto', // Center the component with auto margins
      }}
    >
      <CelebrationIcon
        sx={{ fontSize: '3rem', color: theme.palette.success.main, mb: 2 }} // Icon styling
      />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Congratulations!
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>
        You found {totalGuesses} synonyms and scored {score} points!
      </Typography>
      <Typography variant="body2" sx={{ color: theme.palette.text.disabled, mb: 3 }}>
        Amazing job! Keep improving your vocabulary.
      </Typography>
      <Button
        variant="contained"
        onClick={onPlayAgain}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'scale(1.05)', // Add slight scaling effect on hover
            boxShadow: theme.shadows[6], // Increase shadow on hover
          },
          padding: '0.75rem 1.5rem', // More padding for better touch target
          fontSize: '1.1rem', // Slightly increase button text size
          transition: 'all 0.3s ease', // Smooth transition for hover effects
          marginTop: '1.5rem', // More spacing above the button
          borderRadius: theme.shape.borderRadius,
        }}
      >
        Play Again
      </Button>

      {/* "Share Score" Button */}
      <Button
        variant="outlined"
        onClick={handleShareScore}
        sx={{
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.primary.dark,
          },
          marginTop: '1rem',
          marginLeft: '1rem',
        }}
      >
        Share Score
      </Button>
    </Box>
  );
};

export default GameFinish;
