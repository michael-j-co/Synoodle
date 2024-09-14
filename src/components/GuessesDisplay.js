// src/components/Game.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import WordDisplay from './WordDisplay';
import InputSynonym from './InputSynonym';
import ScoreBoard from './ScoreBoard';
import { Box, Grid } from '@mui/material';
import FeedbackMessage from './FeedbackMessage';
import ProgressDots from './ProgressDots';
import GameTitle from './GameTitle';
import GuessesDisplay from './GuessesDisplay';
import GameFinish from './GameFinish';
import { CSSTransition } from 'react-transition-group';

const Game = () => {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);  // Initialize as an empty array
  const [score, setScore] = useState(0);
  const [guessedSynonyms, setGuessedSynonyms] = useState({});
  const [guessedLetters, setGuessedLetters] = useState(new Set());  // New state for guessed letters
  const [showFeedback, setShowFeedback] = useState({ show: false, message: '', points: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalGuesses = synonyms.length; // This is now safe as synonyms is initialized as an empty array

  // Fetch a random word and its synonyms from Supabase
  const fetchWordAndSynonyms = async () => {
    try {
      const { data, error } = await supabase.from('words').select('word, synonyms');

      if (error) {
        console.error('Error fetching word and synonyms:', error.message);
        return;
      }

      if (data && data.length > 0) {
        const randomWord = data[Math.floor(Math.random() * data.length)];
        setWord(randomWord.word);

        const synonymsArray = Array.isArray(randomWord.synonyms) ? randomWord.synonyms : [];

        // Validate and log to make sure we have the correct format
        console.log("Fetched synonyms:", synonymsArray);
        if (synonymsArray.every(syn => syn && typeof syn === 'object' && syn.synonym)) {
          setSynonyms(synonymsArray);
        } else {
          console.error('Fetched synonyms are not in the expected format:', synonymsArray);
          setSynonyms([]);
        }

        const initialGuesses = {};
        synonymsArray.forEach((synObj) => {
          if (synObj && typeof synObj.synonym === 'string') {
            initialGuesses[synObj.synonym] = '_'.repeat(synObj.synonym.length);
          }
        });
        setGuessedSynonyms(initialGuesses);
        setGuessedLetters(new Set());  // Reset guessed letters when fetching a new word
      } else {
        console.error('No data found in Supabase.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchWordAndSynonyms(); // Fetch a word when the component mounts
  }, []);

  const handleSynonymGuess = (guessedSynonym) => {
    const lowerGuessedSynonym = guessedSynonym.toLowerCase();
    const matchedSynonymObj = synonyms.find(
      (synObj) => typeof synObj.synonym === 'string' && synObj.synonym.toLowerCase() === lowerGuessedSynonym
    );

    if (matchedSynonymObj) {
      setGuessedSynonyms((prevGuesses) => ({
        ...prevGuesses,
        [matchedSynonymObj.synonym]: matchedSynonymObj.synonym,
      }));

      // Add all unique letters from the guessed synonym to the guessedLetters set
      const uniqueLetters = new Set(matchedSynonymObj.synonym.toLowerCase().split(''));
      setGuessedLetters((prevGuessedLetters) => new Set([...prevGuessedLetters, ...uniqueLetters]));

      // Use the length (score) for points
      const points = matchedSynonymObj.score; // Updated to use score instead of lengthScore
      setScore((prevScore) => prevScore + points);
      setShowFeedback({ show: true, message: 'Good!', points });

      setTimeout(() => {
        setShowFeedback({ show: false, message: '', points: 0 });
      }, 2000);

      // Check if the game is over
      if (Object.values(guessedSynonyms).filter((val) => !val.includes('_')).length + 1 === totalGuesses) {
        setIsTransitioning(true);
      }
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setGameOver(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handlePlayAgain = () => {
    setScore(0);
    setGuessedSynonyms({});
    setGameOver(false);
    setIsTransitioning(false);
    fetchWordAndSynonyms();
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
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'fixed', top: '20px' }}>
        <GameTitle />
      </Box>

      {showFeedback.show && (
        <FeedbackMessage message={showFeedback.message} points={showFeedback.points} />
      )}

      <CSSTransition
        in={!isTransitioning}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        <Grid container spacing={4} sx={{ maxWidth: '1000px', marginTop: '80px' }}>
          <Grid item xs={12} md={6}>
            <WordDisplay word={word} />

            <Box sx={{ marginTop: '2rem' }}>
              <InputSynonym onSynonymGuess={handleSynonymGuess} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ProgressDots
              guessedCount={Object.values(guessedSynonyms).filter((val) => !val.includes('_')).length}
              total={totalGuesses}
            />
            <GuessesDisplay synonyms={synonyms} guessedLetters={guessedLetters} /> {/* Ensure synonyms is an array */}
            <ScoreBoard score={score} />
          </Grid>
        </Grid>
      </CSSTransition>

      <CSSTransition
        in={isTransitioning && gameOver}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        <Box>
          <GameFinish totalGuesses={totalGuesses} score={score} onPlayAgain={handlePlayAgain} />
        </Box>
      </CSSTransition>
    </Box>
  );
};

export default Game;
