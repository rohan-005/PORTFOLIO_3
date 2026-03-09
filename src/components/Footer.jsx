import React from 'react';
import { Github, Linkedin, Twitter, Globe, Boxes, MessageSquare } from 'lucide-react';
import './Footer.css';

const Footer = ({ profile, globalData }) => {
  return (
    <footer className="portfolio-footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="mono copyright">
            &copy; {new Date().getFullYear()} {globalData.person.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          {/* <p className="mono version">SYSTEM_VERSION: v13.0.0_STABLE</p> */}
        </div>
        
        {/* <div className="footer-right">
          <div className="footer-social-links">
            <a href={globalData.person.social.github} target="_blank" rel="noreferrer" className="footer-icon"><Github size={20} /></a>
            <a href={globalData.person.social.linkedin} target="_blank" rel="noreferrer" className="footer-icon"><Linkedin size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-icon"><Twitter size={20} /></a>
            <a href="#" className="footer-icon"><Globe size={20} /></a>
            <a href="#" className="footer-icon" title="Unity / Gamedev"><Boxes size={20} /></a>
            <a href="#" className="footer-icon" title="Discord"><MessageSquare size={20} /></a>
          </div>
          <div className="footer-profile-indicator mono">
            [ ACTIVE_PROFILE: {profile.id.toUpperCase()} ]
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
