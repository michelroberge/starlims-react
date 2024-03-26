// WaitIndicatorContext.js
import React, { createContext, useState, useContext } from 'react';

const WaitIndicatorContext = createContext();

export const WaitIndicatorProvider = ({ children }) => {
  const [waitStatus, setWaitStatus] = useState({ waiting: false, caption: 'Please Wait...'});

  return (
    <WaitIndicatorContext.Provider value={{ waitStatus, setWaitStatus }}>
      {children}
    </WaitIndicatorContext.Provider>
  );
};

export const useWaitIndicator = () => useContext(WaitIndicatorContext);
