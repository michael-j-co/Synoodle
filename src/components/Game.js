// src/components/Game.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import WordDisplay from './WordDisplay';
import InputSynonym from './InputSynonym';
import Blanks from './Blanks';
import ScoreBoard from './ScoreBoard';

const Game = () => {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [score, setScore] = useState(0);
  const [guessedSynonyms, setGuessedSynonyms] = useState({});

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

        console.log('Fetched data:', data); // Add log to see the fetched data
        setWord(data.word);
        setSynonyms(data.synonyms);
        
        // Initialize guessed synonyms state with underscores
        const initialGuesses = {};
        data.synonyms.forEach(syn => {
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
      // Update guessed synonyms state with actual synonym
      setGuessedSynonyms(prevGuesses => ({
        ...prevGuesses,
        [matchedSynonym.synonym]: matchedSynonym.synonym
      }));
      setScore(prevScore => prevScore + matchedSynonym.obscurityScore);
    }
  };

  return (
    <div className="game-container">
      <WordDisplay word={word} />
      <InputSynonym onSynonymGuess={handleSynonymGuess} />
      <Blanks synonyms={guessedSynonyms} /> {/* Pass guessed synonyms */}
      <ScoreBoard score={score} />
    </div>
  );
};

export default Game;
