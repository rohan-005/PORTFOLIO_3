import React, { useState, useEffect } from 'react';
import SplitScreen from './components/SplitScreen';
import StoryMode from './components/StoryMode';
import Sidebar from './components/Sidebar';
import { Sun, Moon } from 'lucide-react';
import portfolioData from './data.json';
import './App.css';

function App() {
  const [activeProfile, setActiveProfile] = useState(null); // 'game' | 'fullstack' | null
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Apply theme to document element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleProfileSelect = (profileId) => {
    setIsTransitioning(true);
    // Swap exactly at the midpoint of the wipe animation (600ms)
    setTimeout(() => {
      setActiveProfile(profileId);
      window.scrollTo(0, 0); 
    }, 600); 
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  const handleToggleProfile = (newProfileId) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProfile(newProfileId);
      window.scrollTo(0, 0);
    }, 600);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  const handleReset = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProfile(null);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className={`app-container ${isTransitioning ? 'transitioning' : ''}`}>
      {/* Global Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      {!activeProfile && !isTransitioning ? (
        <SplitScreen onSelect={handleProfileSelect} data={portfolioData} />
      ) : activeProfile ? (
        <>
          <Sidebar 
            activeProfile={activeProfile} 
            data={portfolioData} 
            onToggle={handleToggleProfile} 
          />
          <StoryMode 
            profile={activeProfile === 'game' ? portfolioData.profiles.gameDeveloper : portfolioData.profiles.fullStackDeveloper}
            globalData={portfolioData}
          />
        </>
      ) : (
        // During transition
        <SplitScreen onSelect={() => {}} data={portfolioData} isRipping={true} selectedId={activeProfile} />
      )}
    </div>
  );
}

export default App;
