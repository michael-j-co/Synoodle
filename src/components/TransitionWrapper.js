// src/components/TransitionWrapper.js
import React from 'react';
import { CSSTransition } from 'react-transition-group';

const TransitionWrapper = ({ inProp, timeout, children }) => {
  return (
    <CSSTransition in={inProp} timeout={timeout} classNames="fade" unmountOnExit>
      {children}
    </CSSTransition>
  );
};

export default TransitionWrapper;
