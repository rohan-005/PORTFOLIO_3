import React, { useEffect, useState, useRef } from 'react';
import './StoryMode.css';
import ScrambleText from './ScrambleText';
import ContactSection from './ContactSection';
import Footer from './Footer';
import StatsSection from './StatsSection';
import { Github, Linkedin, Twitter, Globe, Boxes, MessageSquare, Database, Cpu, Code2, Gamepad2,BotMessageSquare } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero3DModel } from './Hero3DModels';
import CertificationsSection from './CertificationsSection';
import EducationSection from './EducationSection';

const StoryMode = ({ profile, globalData, isTransitioning }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // Guard the massive WebGL payload. Render fallback to maintain layout bounds.
  // This physically prevents 3D shader compilation from executing on the same
  // frames as the intense 1.2s CSS transition rip phase.
  const [render3D, setRender3D] = useState(false);

  useEffect(() => {
    if (!isTransitioning) {
      setRender3D(true);
    }
  }, [isTransitioning]);

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
                  <a href={globalData.person.social.twitter} target="_blank" rel="noreferrer" className="social-icon-btn"><Twitter size={24} /></a>
                  <a href={globalData.person.social.website} target="_blank" rel="noreferrer" className="social-icon-btn"><Globe size={24} /></a>
                  <a href={globalData.person.social.discord} className="social-icon-btn" title="Discord"><BotMessageSquare size={24} /></a>
                  <a href={globalData.person.social.unity} target="_blank" rel="noreferrer" className="social-icon-btn" title="Unity / Gamedev"><Boxes size={24} /></a>
                </div>
              </div>
            </div>
            
            <div className="hero-right">
              {render3D && <Hero3DModel type={profile.id} />}
            </div>
          </div>
        </motion.header>

        {/* The Experience Path: vertical timeline pulsing red */}
        <div className="experience-path">
          <div className="speed-line" style={{ height: `${Math.min(100, scrollY * 0.021)}%` }}></div>
        </div>

        <section className="about-section chapter">
          {/* Small chapter label */}
          <p className="about-label mono">[ INIT_SEQUENCE: ABOUT ]</p>
          {/* Sub-intro line */}
          <p className="about-intro-line mono">
            I am a &nbsp;<span className="about-role-inline">
              {/* {profile.id === 'game' ? 'Game Developer' : 'Full Stack Developer'} */}
            </span>
          </p>

          {/* Two-tone title block — matches the reference */}
          <div className="about-display-title" aria-hidden="true">
            <span className="about-big-word">
              {profile.id === 'game' ? 'Game' : 'Full Stack'}
            </span>
            <span className="about-script-word" style={{ marginLeft: '50%' }}>developer.</span>
          </div>

          <p className="about-text">{profile.about}</p>
        </section>

        {/* V2: Experience Section */}
        {profile.experience && profile.experience.length > 0 && (
          <section className="experience-section chapter">
            <h3 className="mono chapter-title">[ SYSTEM_LOGS: EXPERIENCE ]</h3>
            <div className="experience-list">
              {profile.experience.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  className="experience-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  <div className="exp-timeline-dot"></div>
                  <div className="exp-content">
                    <h4 className="exp-role">{exp.role} <span className="exp-company">@ {exp.company}</span></h4>
                    <span className="mono exp-period">{exp.period}</span>
                    <ul className="exp-desc">
                      {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* V7: Project Collage Grid (Valorant Style) */}
        <section className="projects-section chapter">
          <h3 className="mono chapter-title sticky-title">[ ENGAGE_PROTOCOLS: WORKS ]</h3>
          <div className="project-collage-grid">
            {profile.projects.map((proj, idx) => (
              <motion.div 
                key={proj.id} 
                className={`project-collage-card ${hoveredProject === proj.id ? 'active' : ''} ${hoveredProject && hoveredProject !== proj.id ? 'dimmed' : ''}`}
                onMouseEnter={() => setHoveredProject(proj.id)}
                onMouseLeave={() => setHoveredProject(null)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
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
              </motion.div>
            ))}
          </div>
        </section>

        {/* V20 Education Timeline */}
        <EducationSection />

        {/* V14 Live Developer Stats */}
        <StatsSection />

        {/* V20 Certifications Vault */}
        <CertificationsSection />

        <section className="skills-section chapter">
          <h3 className="mono chapter-title">[ SYSTEM_HUD: TECHNICAL ROSTER ]</h3>
          <div className="skills-hud">
             {/* Flattening skills for HUD display */}
             {Object.entries(profile.skills).flatMap(([category, skills]) => 
                skills.map((skill, idx) => (
                  <motion.div 
                    key={skill} 
                    className="hud-cell"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
                  >
                    <span className="mono hud-label">{skill}</span>
                    <div className="progress-bar">
                       <div className="progress-fill" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                    </div>
                  </motion.div>
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
