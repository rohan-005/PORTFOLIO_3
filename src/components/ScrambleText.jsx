import React, { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let iteration = 0;
    let maxIterations = 15;
    
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if(index < iteration) return letter;
        return characters[Math.floor(Math.random() * characters.length)];
      }).join(''));
      
      if(iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 2; // Speed control
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
}

export default ScrambleText;
