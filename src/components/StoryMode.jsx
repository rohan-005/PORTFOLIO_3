import React, { useEffect, useState, useRef } from 'react';
import './StoryMode.css';
import ScrambleText from './ScrambleText';
import ContactSection from './ContactSection';
import Footer from './Footer';
import StatsSection from './StatsSection';
import { Github, Linkedin, Twitter, Globe, Boxes, MessageSquare, Database, Cpu, Code2, Gamepad2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero3DModel } from './Hero3DModels';

const StoryMode = ({ profile, globalData }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className={`story-mode story-mode-${profile.id}`}
      onMouseMove={handleMouseMove}
    >
      {/* V11 Interactive Spotlight */}
      <div 
        className="interactive-spotlight"
        style={{
          background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(132, 177, 121, 0.08), transparent 40%)`
        }}
      ></div>

      {/* 4. Parallax Background with geometric particles (V2 addition) */}
      <div className="parallax-bg">
        <div 
           className="parallax-layer fast-particle" 
           style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        ></div>
        <div 
           className="parallax-layer slow-particle" 
           style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        ></div>
        <div className="grid-lines" style={{ transform: `perspective(500px) rotateX(60deg) translateY(${-100 + scrollY * 0.1}px) scale(2)` }}></div>
      </div>

      <div className="content-wrapper">
        {/* Dynamic Zoom based on Scroll Y */}
        <motion.header 
          className="hero-section"
          style={{
            scale: 1 - scrollY * 0.0005,
            opacity: 1 - scrollY * 0.001
          }}
        >
          {/* V13 Tech Doodles */}
          <div className="tech-doodles-container">
            <motion.div className="tech-doodle doodle-1" animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <Code2 size={48} />
            </motion.div>
            <motion.div className="tech-doodle doodle-2" animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              <Database size={56} />
            </motion.div>
            <motion.div className="tech-doodle doodle-3" animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
              <Cpu size={64} />
            </motion.div>
            <motion.div className="tech-doodle doodle-4" animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
              <Gamepad2 size={40} />
            </motion.div>
          </div>

          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-name glitch" data-text={globalData.person.name}>
                {globalData.person.name}
              </h1>
              <h2 className="hero-title">{profile.hero.title}</h2>
              <div className="hero-desc">
                 <span className="mono scramble-text">
                   <ScrambleText text={profile.hero.subtitle} />
                 </span>
              </div>

              <div className="hero-actions" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '2rem' }}>
                <a href={profile.cvFile} className="download-btn mono" download style={{ marginTop: 0 }}>
                  [ DOWNLOAD_CV ]
                </a>
                
                <div className="hero-social-links">
                   <a href={globalData.person.social.github} target="_blank" rel="noreferrer" className="social-icon-btn"><Github size={24} /></a>
                   <a href={globalData.person.social.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn"><Linkedin size={24} /></a>
                   <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn"><Twitter size={24} /></a>
                   <a href="#" className="social-icon-btn"><Globe size={24} /></a>
                   <a href="#" className="social-icon-btn" title="Unity / Gamedev"><Boxes size={24} /></a>
                   <a href="#" className="social-icon-btn" title="Discord"><MessageSquare size={24} /></a>
                </div>
              </div>
            </div>
            
            <div className="hero-right">
              <Hero3DModel type={profile.id} />
            </div>
          </div>
        </motion.header>

        {/* The Experience Path: vertical timeline pulsing red */}
        <div className="experience-path">
          <div className="speed-line" style={{ height: `${Math.min(100, scrollY * 0.1)}%` }}></div>
        </div>

        <section className="about-section chapter">
          <h3 className="mono chapter-title">[ INIT_SEQUENCE: ABOUT ]</h3>
          <p className="about-text">{profile.about}</p>
        </section>

        {/* V2: Experience Section */}
        {profile.experience && profile.experience.length > 0 && (
          <section className="experience-section chapter">
            <h3 className="mono chapter-title">[ SYSTEM_LOGS: EXPERIENCE ]</h3>
            <div className="experience-list">
              {profile.experience.map((exp, idx) => (
                <div key={idx} className="experience-item">
                  <div className="exp-timeline-dot"></div>
                  <div className="exp-content">
                    <h4 className="exp-role">{exp.role} <span className="exp-company">@ {exp.company}</span></h4>
                    <span className="mono exp-period">{exp.period}</span>
                    <ul className="exp-desc">
                      {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* V7: Project Collage Grid (Valorant Style) */}
        <section className="projects-section chapter">
          <h3 className="mono chapter-title sticky-title">[ ENGAGE_PROTOCOLS: WORKS ]</h3>
          <div className="project-collage-grid">
            {profile.projects.map((proj) => (
              <div 
                key={proj.id} 
                className={`project-collage-card ${hoveredProject === proj.id ? 'active' : ''} ${hoveredProject && hoveredProject !== proj.id ? 'dimmed' : ''}`}
                onMouseEnter={() => setHoveredProject(proj.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <img src={proj.media.cover} alt={proj.title} className="collage-bg-img" />
                <div className="collage-content">
                  <h4>{proj.title}</h4>
                  <p>{proj.shortDescription}</p>
                  <div className="tech-stack">
                    {proj.tech.map(t => <span key={t} className="mono tech-tag">{t}</span>)}
                  </div>
                  <div className="project-links">
                    {proj.links?.github && (
                       <a href={proj.links.github} target="_blank" rel="noreferrer" className="hud-btn" onClick={e => e.stopPropagation()}>
                         <Github size={18} />
                       </a>
                    )}
                    {proj.links?.live && (
                       <a href={proj.links.live} target="_blank" rel="noreferrer" className="hud-btn" onClick={e => e.stopPropagation()}>
                         <Globe size={18} />
                       </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* V14 Live Developer Stats */}
        <StatsSection />

        <section className="skills-section chapter">
          <h3 className="mono chapter-title">[ SYSTEM_HUD: TECHNICAL ROSTER ]</h3>
          <div className="skills-hud">
             {/* Flattening skills for HUD display */}
             {Object.entries(profile.skills).flatMap(([category, skills]) => 
                skills.map(skill => (
                  <div key={skill} className="hud-cell">
                    <span className="mono hud-label">{skill}</span>
                    <div className="progress-bar">
                       <div className="progress-fill" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                    </div>
                  </div>
                ))
             )}
          </div>
        </section>
      </div>
      
      <ContactSection email={globalData.person.email} />
      <Footer profile={profile} globalData={globalData} />
    </div>
  );
};

export default StoryMode;
