import React, { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  
  // The original implementation used a 30ms React state loop which locked the main thread
  // during expensive 3D / CSS transitions. We now run the scramble once in a fast 
  // requestAnimationFrame sequence.
  useEffect(() => {
    let frame = 0;
    let animationFrameId;
    
    const animate = () => {
      if (frame >= text.length * 2) {
        setDisplayText(text);
        return;
      }
      
      const scrambled = text.split('').map((char, index) => {
        if (index < frame / 2) return char;
        // Random char or preserve spaces
        if (char === ' ') return ' ';
        return characters[Math.floor(Math.random() * characters.length)];
      }).join('');
      
      setDisplayText(scrambled);
      frame++;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [text]);

  return <span style={{ display: 'inline-block' }}>{displayText}</span>;
}

export default ScrambleText;
