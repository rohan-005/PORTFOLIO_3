import React from 'react';
import './Sidebar.css';
import { RefreshCw } from 'lucide-react';

const Sidebar = ({ activeProfile, data, onToggle }) => {
  const isGame = activeProfile === 'game';
  const otherId = isGame ? 'fullstack' : 'game';
  const otherLabel = isGame 
    ? data.profiles.fullStackDeveloper.label 
    : data.profiles.gameDeveloper.label;

  return (
    <div className="sidebar" onClick={() => onToggle(otherId)} title={`Switch to ${otherLabel}`}>
      <div className="sidebar-content">
        <RefreshCw className="return-icon" size={24} />
        <span className="mono reset-hint">SWITCH</span>
        <div className="vertical-label-container">
          <h3 className="vertical-text">{otherLabel}</h3>
        </div>
      </div>
      
      {/* Visual cue of the torn edge persisting */}
      <div className={`sidebar-edge ${activeProfile === 'game' ? 'edge-right' : 'edge-left'}`}></div>
    </div>
  );
};

export default Sidebar;
