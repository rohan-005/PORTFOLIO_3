import React, { useState } from 'react';
import './Terminal.css';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');

  return (
    <section className="terminal-section chapter">
      <h3 className="mono chapter-title">[ SYSTEM_ACCESS: TERMINAL ]</h3>
      
      <div className="terminal-window">
        {/* Header */}
        <div className="terminal-header">
          <div className="mac-buttons">
            <span className="mac-btn close"></span>
            <span className="mac-btn min"></span>
            <span className="mac-btn max"></span>
          </div>
          <div className="terminal-title mono">developer@portfolio:~/terminal</div>
          <div className="terminal-badges mono">
            <span className="badge zsh">zsh</span>
            <span className="badge active"><span className="pulse-dot-small"></span> active</span>
          </div>
        </div>

        {/* Body */}
        <div className="terminal-body mono">
          <div className="welcome-box">
            ┌──( <span className="text-green">Welcome to Portfolio v4.0</span> )──[~]
          </div>

          <div className="command-lines">
            <p><span>$</span> ./role --frontend-developer</p>
            <p><span>$</span> ./role --system-architect</p>
            <p><span>$</span> ./role --interactive-designer</p>
            <p><span>$</span> ./role --3d-generalist</p>
          </div>

          <div className="prompt-line">
            <span className="text-green">➜</span> <span className="text-yellow">~/development</span> Level 99 <span className="cursor-block"></span>
          </div>

          <div className="available-commands-section">
            <p className="text-muted">• AVAILABLE COMMANDS:</p>
            <div className="cmd-grid">
               <span className="cmd-btn"><span>$</span> whoami</span>
               <span className="cmd-btn"><span>$</span> pwd</span>
               <span className="cmd-btn"><span>$</span> ls -la</span>
               <span className="cmd-btn"><span>$</span> git status</span>
            </div>
          </div>

          <div className="system-stats">
            <div className="stat-col">
              <p><span className="dot green"></span> System: Online</p>
              <p><span className="dot purple"></span> Load: Optimal</p>
            </div>
            <div className="stat-col">
              <p><span className="dot yellow"></span> Uptime: 99.9%</p>
              <p><span className="dot red"></span> Status: Ready</p>
            </div>
          </div>

          <div className="terminal-input-line">
            <span className="text-muted">❯</span> 
            <input 
              type="text" 
              className="term-input mono" 
              placeholder="Type 'help' for available commands..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
