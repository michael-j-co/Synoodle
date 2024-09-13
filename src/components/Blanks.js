// src/components/Blanks.js
import React from 'react';

const Blanks = ({ synonyms }) => {
  return (
    <div>
      <h2>Synonym Blanks</h2>
      {Object.keys(synonyms).map((synonym, index) => {
        const display = synonyms[synonym];
        const length = synonym.length;

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
