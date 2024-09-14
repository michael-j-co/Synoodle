// src/components/Blanks.js
import React from 'react';

const Blanks = ({ synonyms }) => {
  // Calculate the number of guessed words
  const guessedWordsCount = Object.values(synonyms).filter(display => !display.includes('_')).length;

  return (
    <div>
      {/* Display the number of words guessed dynamically */}
      <h2>You have found {guessedWordsCount} words</h2>

      {Object.keys(synonyms).map((synonym, index) => {
        const display = synonyms[synonym];

        return (
          <div key={index}>
            <p>
              {display.split('').map((char, i) => (
                <span key={i} style={{ marginRight: '5px' }}>
                  {char === '_' ? '_' : char}
                </span>
              ))}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Blanks;
