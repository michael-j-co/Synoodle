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
import './FeedbackMessage.css'; // Import FeedbackMessage styles
import './InputSynonym.css'; // Import the CSS for InputSynonym shake effect

const Game = () => {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]); // Initialize as an empty array
  const [score, setScore] = useState(0);
  const [guessedSynonyms, setGuessedSynonyms] = useState({});
  const [guessedLetters, setGuessedLetters] = useState(new Set()); // New state for guessed letters
  const [showFeedback, setShowFeedback] = useState({ show: false, message: '', points: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [incorrectGuess, setIncorrectGuess] = useState(false); // State to track incorrect guesses
  const [shouldClear, setShouldClear] = useState(false); // State to control input clearing
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

        setSynonyms(synonymsArray);

        const initialGuesses = {};
        synonymsArray.forEach((synObj) => {
          if (synObj && typeof synObj.synonym === 'string') {
            initialGuesses[synObj.synonym] = '_'.repeat(synObj.synonym.length);
          }
        });
        setGuessedSynonyms(initialGuesses);
        setGuessedLetters(new Set()); // Reset guessed letters when fetching a new word
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
      (synObj) =>
        typeof synObj.synonym === 'string' &&
        synObj.synonym.toLowerCase() === lowerGuessedSynonym
    );

    if (matchedSynonymObj) {
      const alreadyGuessed = guessedSynonyms[matchedSynonymObj.synonym] === matchedSynonymObj.synonym;

      if (!alreadyGuessed) {
        setGuessedSynonyms((prevGuesses) => ({
          ...prevGuesses,
          [matchedSynonymObj.synonym]: matchedSynonymObj.synonym, // Fully reveal the guessed word
        }));

        // Increase score for correct guesses
        const points = matchedSynonymObj.score;
        setScore((prevScore) => prevScore + points);

        // Show feedback for a new correct guess
        setShowFeedback({ show: true, message: 'Good!', points });
        setShouldClear(true); // Prepare to clear the input

        // Hide feedback and clear input after 1.5 seconds for correct guesses
        setTimeout(() => {
          setShowFeedback({ show: false, message: '', points: 0 }); // Hide and clear message
          setShouldClear(false); // Reset clear state
        }, 1500); // Correct guess feedback lasts for 1.5 seconds
      } else {
        // Feedback for repeated correct guesses
        setShowFeedback({ show: true, message: 'Already guessed!', points: 0 });

        setTimeout(() => {
          setShowFeedback({ show: false, message: '', points: 0 });
        }, 1500); // Standard duration for repeated guesses
      }
    } else {
      // Handle incorrect guesses
      setIncorrectGuess(true); // Set incorrect guess to trigger shake effect
      setShowFeedback({ show: true, message: 'Incorrect guess!', points: 0 });

      setTimeout(() => {
        setIncorrectGuess(false); // Reset incorrect guess after shake
        setShouldClear(true); // Clear input after shake completes
      }, 1000); // Shake effect duration within 1.5 seconds

      setTimeout(() => {
        setShowFeedback({ show: false, message: '', points: 0 });
        setShouldClear(false); // Reset clear state
      }, 1500); // Feedback and input clearing at 1.5 seconds
    }

    // Check if the game is over
    if (
      Object.values(guessedSynonyms).filter((val) => !val.includes('_')).length + 1 ===
      totalGuesses
    ) {
      setIsTransitioning(true);
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

      <CSSTransition
        in={!isTransitioning}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        <Grid container spacing={4} sx={{ maxWidth: '1000px', marginTop: '80px' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <WordDisplay word={word} />

            <Box
              sx={{
                marginTop: '2rem',
                display: 'flex',
                flexDirection: 'column', // Ensure column layout
                alignItems: 'center', // Center horizontally
                width: '100%',
                position: 'relative', // Make the parent container relative
              }}
            >
              {/* InputSynonym with incorrect prop */}
              <InputSynonym onSynonymGuess={handleSynonymGuess} incorrect={incorrectGuess} shouldClear={shouldClear} />

              {/* FeedbackMessage positioned absolutely below InputSynonym */}
              {showFeedback.show && (
                <FeedbackMessage
                  show={showFeedback.show}
                  message={showFeedback.message}
                  points={showFeedback.points}
                  sx={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', mt: 2 }} // Center below input field
                />
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <ProgressDots
              guessedCount={Object.values(guessedSynonyms).filter((val) => !val.includes('_'))
                .length}
              total={totalGuesses}
            />
            <GuessesDisplay
              synonyms={guessedSynonyms}
              guessedLetters={guessedLetters}
            />
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
          <GameFinish
            totalGuesses={totalGuesses}
            score={score}
            onPlayAgain={handlePlayAgain}
          />
        </Box>
      </CSSTransition>
    </Box>
  );
};

export default Game;
