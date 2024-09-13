// src/components/Game.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import WordDisplay from './WordDisplay';
import InputSynonym from './InputSynonym';
import ScoreBoard from './ScoreBoard';
import { Box, Grid } from '@mui/material';
import FeedbackMessage from './FeedbackMessage';
import ProgressSlider from './ProgressSlider';
import GameTitle from './GameTitle';
import GuessesDisplay from './GuessesDisplay'; // Import the new GuessesDisplay component

const Game = () => {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [score, setScore] = useState(0);
  const [guessedSynonyms, setGuessedSynonyms] = useState({});
  const [showFeedback, setShowFeedback] = useState({ show: false, message: '', points: 0 });
  const totalGuesses = synonyms.length; // Total number of synonyms to guess

  useEffect(() => {
    const fetchWordAndSynonyms = async () => {
      try {
        const { data, error } = await supabase
          .from('words')
          .select('word, synonyms')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching word and synonyms:', error.message);
          return;
        }

        console.log('Fetched data:', data); // Log to see the fetched data
        setWord(data.word);
        setSynonyms(data.synonyms);

        // Initialize guessed synonyms state with underscores
        const initialGuesses = {};
        data.synonyms.forEach((syn) => {
          initialGuesses[syn.synonym] = '_'.repeat(syn.synonym.length);
        });
        setGuessedSynonyms(initialGuesses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchWordAndSynonyms();
  }, []);

  const handleSynonymGuess = (guessedSynonym) => {
    const lowerGuessedSynonym = guessedSynonym.toLowerCase();
    const matchedSynonym = synonyms.find(
      (syn) => syn.synonym.toLowerCase() === lowerGuessedSynonym
    );

    if (matchedSynonym) {
      setGuessedSynonyms((prevGuesses) => ({
        ...prevGuesses,
        [matchedSynonym.synonym]: matchedSynonym.synonym,
      }));

      const points = matchedSynonym.obscurityScore;
      setScore((prevScore) => prevScore + points);
      setShowFeedback({ show: true, message: 'Good!', points });

      setTimeout(() => {
        setShowFeedback({ show: false, message: '', points: 0 });
      }, 2000);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        width: '100%',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Game Title */}
      <GameTitle />

      {/* Feedback Animation */}
      {showFeedback.show && (
        <FeedbackMessage message={showFeedback.message} points={showFeedback.points} />
      )}

      <Grid container spacing={4} sx={{ maxWidth: '1000px' }}>
        {/* Left side: Word Display and Input */}
        <Grid item xs={12} md={6}>
          <WordDisplay word={word} />

          {/* Custom Input Component */}
          <Box sx={{ marginTop: '2rem' }}>
            <InputSynonym onSynonymGuess={handleSynonymGuess} />
          </Box>
        </Grid>

        {/* Right side: Correct Guesses and Progress Slider */}
        <Grid item xs={12} md={6}>
          <ProgressSlider
            guessedCount={Object.values(guessedSynonyms).filter((val) => !val.includes('_')).length}
            total={totalGuesses}
          />
          <GuessesDisplay synonyms={guessedSynonyms} /> {/* Updated to use GuessesDisplay */}
          <ScoreBoard score={score} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Game;
