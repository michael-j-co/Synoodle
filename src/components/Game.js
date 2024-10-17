// src/components/Game.js
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import WordDisplay from './WordDisplay';
import InputSynonym from './InputSynonym';
import FeedbackMessage from './FeedbackMessage';
import ProgressSection from './ProgressSection';
import GameFinish from './GameFinish';
import Toolbar from './Toolbar';
import useSound from 'use-sound';
import confetti from 'canvas-confetti';
import styled from 'styled-components'; // Import styled-components for custom styling
import {Section} from './SharedStyles';
import TransitionWrapper from './TransitionWrapper';

const TRANSITION_TIMEOUT = 1000;
const FEEDBACK_HIDE_TIMEOUT = 1500;
const INCORRECT_FEEDBACK_TIMEOUT = 2000;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  background-color: #FFF;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Custom container for the two-column layout
const GameContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #FFF;
  width: 100%;
  height: 100%; /* Take full height of parent container */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Column = styled.div`
  flex: 1;
  padding: 1rem;

  &:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Vertically center if needed */
    align-items: center; /* Horizontally center */
    margin-right: 1rem;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;


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
          if (isSoundInitialized) playCorrectSound();

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
        if (isSoundInitialized) playIncorrectSound();

        setTimeout(() => {
          setIncorrectGuess(false);
          setFeedback({ show: false, message: '', points: 0 });
          setShouldClear(false);
        }, INCORRECT_FEEDBACK_TIMEOUT);
      }

      if (Object.values(guessedSynonyms).filter((val) => !val.includes('_')).length + 1 === totalGuesses) {
        setIsTransitioning(true);
        if (isSoundInitialized) playWinSound();
        confetti();
      }
    },
    [synonyms, guessedSynonyms, totalGuesses, isSoundInitialized]
  );

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setGameOver(true), TRANSITION_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleRestart = () => {
    setScore(0);
    setGuessedSynonyms({});
    setGuessedLetters(new Set());
    setFeedback({ show: false, message: '', points: 0 });
    setGameOver(false);
    setIsTransitioning(false);
    fetchWordAndSynonyms();
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
    <GameContainer>
      {/* Toolbar at the top of the page */}
      <Toolbar onRevealHint={handleRevealHint} onRestart={handleRestart} onSettings={() => console.log('Settings clicked!')} />

      <GameContent>
        {/* Left Column: Word Display and Input */}
        <Column>
          <WordDisplay word={word} />
          <InputSynonym onSynonymGuess={handleSynonymGuess} incorrect={incorrectGuess} shouldClear={shouldClear} />
          {feedback.show && (
            <FeedbackMessage message={feedback.message} incorrect={incorrectGuess} />
          )}
        </Column>

        {/* Right Column: Progress and Guesses */}
        <Column>
          <ProgressSection
            guessedCount={Object.values(guessedSynonyms).filter((val) => !val.includes('_')).length}
            totalGuesses={totalGuesses}
            guessedSynonyms={guessedSynonyms}
            guessedLetters={guessedLetters}
            score={score}
          />
        </Column>
      </GameContent>

      <TransitionWrapper inProp={isTransitioning && gameOver} timeout={TRANSITION_TIMEOUT}>
        <Section>
          <GameFinish totalGuesses={totalGuesses} score={score} onPlayAgain={handleRestart} />
        </Section>
      </TransitionWrapper>
    </GameContainer>
  );
};

export default Game;
