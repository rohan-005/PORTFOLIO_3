import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import './EducationSection.css';

const education = [
  {
    id: 1,
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    period: '2023 – Present',
    grade: 'CGPA: 8.01',
    gradeType: 'cgpa',
    status: 'current',
  },
  {
    id: 2,
    degree: '12th — Science Stream',
    institution: 'Kendriya Vidyalaya BHEL Haridwar',
    location: 'Haridwar, Uttarakhand',
    period: '2022 – 2023',
    grade: '74.60%',
    gradeType: 'percent',
    status: 'completed',
  },
  {
    id: 3,
    degree: '10th — Science Stream',
    institution: 'Kendriya Vidyalaya BHEL Haridwar',
    location: 'Haridwar, Uttarakhand',
    period: '2020 – 2021',
    grade: '88%',
    gradeType: 'percent',
    status: 'completed',
  },
];

const EducationSection = () => {
  return (
    <section className="edu-section chapter">
      <h3 className="mono chapter-title">[ ACADEMIC_LOG: EDUCATION ]</h3>

      <div className="edu-timeline">
        {education.map((entry, idx) => (
          <motion.div
            key={entry.id}
            className={`edu-card ${entry.status === 'current' ? 'edu-card--current' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            {/* Left accent bar + icon */}
            <div className="edu-icon-col">
              <div className="edu-icon-wrap">
                <GraduationCap size={22} />
              </div>
              {idx < education.length - 1 && <div className="edu-connector" />}
            </div>

            {/* Card body */}
            <div className="edu-body">
              {entry.status === 'current' && (
                <span className="edu-active-badge mono">● ONGOING</span>
              )}

              <h4 className="edu-degree">{entry.degree}</h4>
              <p className="edu-institution">{entry.institution}</p>

              <div className="edu-meta">
                <span className="edu-meta-item mono">
                  <MapPin size={12} />
                  {entry.location}
                </span>
                <span className="edu-meta-item mono">
                  <Calendar size={12} />
                  {entry.period}
                </span>
              </div>

              <div className="edu-grade">
                <Award size={14} />
                <span className="mono">{entry.grade}</span>
              </div>

              {/* Animated bottom bar */}
              <div className="edu-progress-bar" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
