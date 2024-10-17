import React from 'react';
import styled from 'styled-components';
import NoodleBowl from '../assets/NoodleBowl.png';

const Logo = styled.img`
  width: 4.68rem; 
  height: auto;
  max-width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #FB634E;
  background-size: cover;
  padding: 5vh 5vw; /* Reduced vertical padding */
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-family: "Madimi One";
  font-size: 3.75rem; /* Already responsive */
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 0; /* Reduce vertical margin */
`;

const Description = styled.p`
  color: #000;
  text-align: center;
  font-family: Afacad;
  font-size: 1.875rem;
  line-height: 1.2;
  margin-bottom: 1.5rem; /* Reduce vertical margin */
`;

const PlayButton = styled.button`
  display: flex;
  width: 10.545rem;
  height: 3.42rem;
  padding: 1.125rem 4.9375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border: none;
  cursor: pointer;
  border-radius: 100px;
  background: #000;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #FFF;
  text-align: center;
  font-family: Actor;
  font-size: 1.3rem;
  font-weight: 400;

  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;

  &:hover {
    width: 12rem;
    height: 4.5rem;
    background: #1C1A1A;
    box-shadow: 0px 7px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const Credits = styled.p`
  color: #000;
  text-align: center;
  font-family: Actor;
  font-size: 1.125rem;
  margin-top: 1.5rem; /* Reduce margin above credits */
`;

const StartScreen = ({ onStart }) => {
  return (
    <Container>
      <Logo src={NoodleBowl} alt="Noodle Bowl" />
      <Title>Synoodle</Title>
      <Description>How many synonyms can you think of?</Description>
      <PlayButton onClick={onStart}>Play</PlayButton>
      <Credits>Developed by Michael Co</Credits>
    </Container>
  );
};

export default StartScreen;
