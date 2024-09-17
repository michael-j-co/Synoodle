// src/components/Game.js
import React, { useEffect, useState, useCallback } from 'react';
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
import Toolbar from './Toolbar'; // Import Toolbar
import useSound from 'use-sound'; // Import use-sound for sound effects
import confetti from 'canvas-confetti'; // Import confetti for celebration
import './FeedbackMessage.css';
import './InputSynonym.css';

const TRANSITION_TIMEOUT = 1000;
const FEEDBACK_HIDE_TIMEOUT = 1500;
const INCORRECT_FEEDBACK_TIMEOUT = 2000;

const Game = () => {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [score, setScore] = useState(0);
  const [guessedSynonyms, setGuessedSynonyms] = useState({});
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [feedback, setFeedback] = useState({ show: false, message: '', points: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [incorrectGuess, setIncorrectGuess] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);
  const [isSoundInitialized, setIsSoundInitialized] = useState(false);
  const totalGuesses = synonyms.length;

  // Load sound effects only when enabled
  const [playCorrectSound] = useSound('/sounds/correct.wav', { volume: 0.5, soundEnabled: isSoundInitialized });
  const [playIncorrectSound] = useSound('/sounds/incorrect.wav', { volume: 0.5, soundEnabled: isSoundInitialized });
  const [playWinSound] = useSound('/sounds/win.wav', { volume: 0.5, soundEnabled: isSoundInitialized });

  const fetchWordAndSynonyms = async () => {
    try {
      const { data, error } = await supabase.from('words').select('word, synonyms');
      if (error) throw error;

      if (data && data.length > 0) {
        const randomWord = data[Math.floor(Math.random() * data.length)];
        setWord(randomWord.word);

        const synonymsArray = Array.isArray(randomWord.synonyms) ? randomWord.synonyms : [];
        setSynonyms(synonymsArray);

        const initialGuesses = {};
        synonymsArray.forEach((synObj) => {
          if (synObj && typeof synObj.synonym === 'string') {
            initialGuesses[synObj.synonym] = '_'.repeat(synObj.synonym.length);
          }
        });
        setGuessedSynonyms(initialGuesses);
        setGuessedLetters(new Set());
      } else {
        console.error('No data found in Supabase.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setFeedback({ show: true, message: 'Error fetching data. Please try again.', points: 0 });
    }
  };

  useEffect(() => {
    fetchWordAndSynonyms();
  }, []);

  const handleSynonymGuess = useCallback(
    (guessedSynonym) => {
      const lowerGuessedSynonym = guessedSynonym.toLowerCase();
      const matchedSynonymObj = synonyms.find(
        (synObj) =>
          typeof synObj.synonym === 'string' &&
          synObj.synonym.toLowerCase() === lowerGuessedSynonym
      );

      if (matchedSynonymObj) {
        const alreadyGuessed = guessedSynonyms[matchedSynonymObj.synonym] === matchedSynonymObj.synonym;
        if (!alreadyGuessed) {
          setGuessedSynonyms((prevGuesses) => ({
            ...prevGuesses,
            [matchedSynonymObj.synonym]: matchedSynonymObj.synonym,
          }));

          const points = matchedSynonymObj.score;
          setScore((prevScore) => prevScore + points);

          setFeedback({ show: true, message: '🎉 Good!', points });
          setShouldClear(true);
          if (isSoundInitialized) playCorrectSound(); // Play correct guess sound

          setTimeout(() => {
            setFeedback({ show: false, message: '', points: 0 });
            setShouldClear(false);
          }, FEEDBACK_HIDE_TIMEOUT);
        } else {
          setFeedback({ show: true, message: '⚠️ Already guessed!', points: 0 });
          setTimeout(() => setFeedback({ show: false, message: '', points: 0 }), FEEDBACK_HIDE_TIMEOUT);
        }
      } else {
        setIncorrectGuess(true);
        setFeedback({ show: true, message: '❌ Incorrect guess!', points: 0 });
        setShouldClear(true);
        if (isSoundInitialized) playIncorrectSound(); // Play incorrect guess sound

        setTimeout(() => {
          setIncorrectGuess(false);
          setFeedback({ show: false, message: '', points: 0 });
          setShouldClear(false);
        }, INCORRECT_FEEDBACK_TIMEOUT);
      }

      if (Object.values(guessedSynonyms).filter((val) => !val.includes('_')).length + 1 === totalGuesses) {
        setIsTransitioning(true);
        if (isSoundInitialized) playWinSound(); // Play win sound
        confetti(); // Trigger confetti animation
      }
    },
    [synonyms, guessedSynonyms, totalGuesses, isSoundInitialized] // Include isSoundInitialized as dependency
  );

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setGameOver(true), TRANSITION_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Function to restart the game
  const handleRestart = () => {
    setScore(0); // Reset score
    setGuessedSynonyms({}); // Reset guessed synonyms
    setGuessedLetters(new Set()); // Reset guessed letters
    setFeedback({ show: false, message: '', points: 0 }); // Reset feedback message
    setGameOver(false); // Reset game over state
    setIsTransitioning(false); // Reset transition state
    fetchWordAndSynonyms(); // Fetch a new word and synonyms
  };

  const handleRevealHint = useCallback(() => {
    const unguessedSynonyms = synonyms.filter(
      (synObj) => guessedSynonyms[synObj.synonym] !== synObj.synonym
    );

    if (unguessedSynonyms.length > 0) {
      const randomSynonymObj = unguessedSynonyms[Math.floor(Math.random() * unguessedSynonyms.length)];
      setGuessedSynonyms((prevGuesses) => ({
        ...prevGuesses,
        [randomSynonymObj.synonym]: randomSynonymObj.synonym,
      }));

      setFeedback({
        show: true,
        message: `💡 Hint used! Revealed: ${randomSynonymObj.synonym}`,
        points: 0,
      });

      setTimeout(() => setFeedback({ show: false, message: '', points: 0 }), INCORRECT_FEEDBACK_TIMEOUT);
    }
  }, [synonyms, guessedSynonyms]);

  return (
    <Box sx={{ backgroundColor: '#f0f8ff', minHeight: '100vh', width: '100%', padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      {/* Toolbar with Restart, Hint, and Settings Buttons */}
      <Toolbar onRevealHint={handleRevealHint} onRestart={handleRestart} onSettings={() => console.log('Settings clicked!')} />

      {/* Game Title */}
      <Box sx={{ width: '100%', padding: '1rem 0', textAlign: 'center', borderBottom: '1px solid #e0e0e0', marginBottom: '1rem' }}>
        <GameTitle />
      </Box>

      {/* Main Game Content */}
      <CSSTransition in={!isTransitioning} timeout={TRANSITION_TIMEOUT} classNames="fade" unmountOnExit>
        <Grid container spacing={4} sx={{ maxWidth: '1000px', width: '100%' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <WordDisplay word={word} />
            <Box sx={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
              <InputSynonym onSynonymGuess={handleSynonymGuess} incorrect={incorrectGuess} shouldClear={shouldClear} />
              {feedback.show && (
                <FeedbackMessage
                  show={feedback.show}
                  message={feedback.message}
                  points={feedback.points}
                  sx={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', mt: 2 }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ProgressDots guessedCount={Object.values(guessedSynonyms).filter((val) => !val.includes('_')).length} total={totalGuesses} />
            <GuessesDisplay synonyms={guessedSynonyms} guessedLetters={guessedLetters} />
            <ScoreBoard score={score} />
          </Grid>
        </Grid>
      </CSSTransition>

      {/* Game Finish Logic */}
      <CSSTransition in={isTransitioning && gameOver} timeout={TRANSITION_TIMEOUT} classNames="fade" unmountOnExit>
        <Box>
          <GameFinish totalGuesses={totalGuesses} score={score} onPlayAgain={handleRestart} />
        </Box>
      </CSSTransition>
    </Box>
  );
};

export default Game;
