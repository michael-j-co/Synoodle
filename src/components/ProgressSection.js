// src/components/ProgressSection.js
import React from 'react';
import ProgressDots from './ProgressDots';
import GuessesDisplay from './GuessesDisplay';
import ScoreBoard from './ScoreBoard';
import { Section } from './SharedStyles';

const ProgressSection = ({ guessedCount, totalGuesses, guessedSynonyms, guessedLetters, score }) => {
  return (
    <Section>
      <ProgressDots guessedCount={guessedCount} total={totalGuesses} />
      <GuessesDisplay synonyms={guessedSynonyms} guessedLetters={guessedLetters} />
      <ScoreBoard score={score} />
    </Section>
  );
};

export default ProgressSection;
