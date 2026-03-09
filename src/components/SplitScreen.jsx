import React, { useState } from 'react';
import './SplitScreen.css';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Globe, Boxes, MessageSquare } from 'lucide-react';

const SplitScreen = ({ data, onSelect }) => {
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <div className="split-screen-container">
      
      {/* V7: Aggressive Diagonal Split Panes */}

      {/* Left Side: Game Developer */}
      <motion.div 
        className={`split-pane left-pane ${hoveredSide === 'left' ? 'expanded' : ''} ${hoveredSide === 'right' ? 'shrunk' : ''}`}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => onSelect('game')}
      >
        <div className="valorant-bg-decor p-left">
           <span className="huge-watermark">FROST</span>
           <div className="stripes"></div>
        </div>
        <div className="pane-content left-content">
          <div className="number-indicator mono">
             // 01
          </div>
          <h1 className="role-title">GAME<br/>DEVELOPER</h1>
          <p className="role-subtitle mono">Interactive Systems & Immersive Experiences</p>
          <div className="enter-btn mono">
             [ CLICK TO COMMENCE ]
          </div>
          <div className="split-socials">
             <a href={data.person.social.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="social-icon-btn"><Github size={18} /></a>
             <a href={data.person.social.linkedin} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="social-icon-btn"><Linkedin size={18} /></a>
             <a href="#" onClick={e => e.stopPropagation()} className="social-icon-btn"><Twitter size={18} /></a>
             <a href="#" onClick={e => e.stopPropagation()} className="social-icon-btn"><Globe size={18} /></a>
             <a href="#" onClick={e => e.stopPropagation()} className="social-icon-btn"><MessageSquare size={18} /></a>
             <a href="#" onClick={e => e.stopPropagation()} className="social-icon-btn"><Boxes size={18} /></a>
          </div>
        </div>
      </motion.div>

      {/* Right Side: Full Stack Developer */}
      <motion.div 
        className={`split-pane right-pane ${hoveredSide === 'right' ? 'expanded' : ''} ${hoveredSide === 'left' ? 'shrunk' : ''}`}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => onSelect('fullstack')}
      >
        <div className="valorant-bg-decor p-right">
           <span className="huge-watermark">HOWL</span>
           <div className="stripes"></div>
        </div>
        <div className="pane-content right-content">
          <div className="number-indicator mono">
             // 02
          </div>
          <h1 className="role-title">FULL STACK<br/>DEVELOPER</h1>
          <p className="role-subtitle mono">Scalable Architecture & Production Systems</p>
          <div className="enter-btn mono">
             [ CLICK TO COMMENCE ]
          </div>
        </div>
      </motion.div>
      
      {/* V7: Sharp UI Accents overlay */}
      <div className="val-ui-overlay">
        <div className="ui-corner tl"></div>
        <div className="ui-corner tr"></div>
        <div className="ui-corner bl"></div>
        <div className="ui-corner br"></div>
        <div className="center-target">
           <div className="target-box"></div>
        </div>
      </div>
    </div>
  );
};

export default SplitScreen;
