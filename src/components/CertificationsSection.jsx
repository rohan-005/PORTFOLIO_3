import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Calendar, Hash } from 'lucide-react';
import './CertificationsSection.css';

const certifications = [
  {
    id: 1,
    icon: "🌐",
    title: "Introduction to Node.js",
    issuer: "The Linux Foundation",
    issued: "Dec 2025",
    expires: "Mar 2035",
    credentialId: "LF-luufpc7i95",
    credentialUrl: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/a1a3062a-fb20-43fd-b7c4-7542871328b7-rohan-dhanerwal-9ed52141-6f56-4372-976d-660b9b6332b8-certificate.pdf",
    skills: ["Node.js", "Back-End Web Development"],
  },
  {
    id: 2,
    icon: "🧪",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    issued: "Dec 2025",
    credentialId: "6936becc1c1699b161c007aa",
    credentialUrl: "https://badges.parchment.com/public/assertions/nbJO-R2OQ5-Q15glq8ucGg",
    skills: ["REST APIs", "Postman API"],
  },
  {
    id: 3,
    icon: "🎨",
    title: "CSS Certificate",
    issuer: "HackerRank",
    issued: "Nov 2025",
    expires: "May 2035",
    credentialUrl: "https://www.hackerrank.com/certificates/iframe/f2947a5a888d",
    skills: ["HTML5", "CSS"],
  },
  {
    id: 4,
    icon: "⚛️",
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    issued: "Nov 2025",
    expires: "Nov 2035",
    credentialUrl: "https://www.hackerrank.com/certificates/iframe/d4db4eb18ab5",
    skills: ["React.js"],
  },
  {
    id: 5,
    icon: "☁️",
    title: "Cloud Computing",
    issuer: "NPTEL",
    issued: "Oct 2025",
    expires: "Jul 2035",
    credentialUrl: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs107/Course/NPTEL25CS107S135870005910783059.pdf",
    skills: ["Cloud Computing"],
  },
  {
    id: 6,
    icon: "🍃",
    title: "CRUD Operations in MongoDB",
    issuer: "MongoDB",
    issued: "Aug 2025",
    expires: "Mar 2035",
    credentialUrl: "https://www.credly.com/badges/c023194e-7f84-4cb7-aaae-bfee07ed9c2a/public_url",
    skills: ["MongoDB", "CRUD"],
  },
  {
    id: 7,
    icon: "🕹️",
    title: "Unity Junior Programmer",
    issuer: "Unity",
    issued: "Jun 2025",
    credentialUrl: "https://www.credly.com/badges/64aca40e-037e-4915-9752-fd4de55d39f1/linked_in_profile",
    skills: ["User Interface Programming", "Gameplay Programming", "Unity"],
  },
  {
    id: 8,
    icon: "🎮",
    title: "Unity Essentials Pathway",
    issuer: "Unity",
    issued: "Jan 2024",
    credentialUrl: "https://www.credly.com/badges/eda5a5d5-6abd-4b63-83ef-aa77df400659/linked_in_profile",
    skills: ["C#", "Game Engines"],
  },
];

const CertificationsSection = () => {
  return (
    <section className="certs-section chapter">
      <h3 className="mono chapter-title">[ CREDENTIALS_VAULT: CERTIFICATIONS ]</h3>

      <div className="certs-grid">
        {certifications.map((cert, idx) => (
          <motion.a
            key={cert.id}
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="cert-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: (idx % 4) * 0.12 }}
          >
            {/* Corner accent brackets */}
            <span className="cert-corner cert-corner--tl" />
            <span className="cert-corner cert-corner--br" />

            {/* Top bar */}
            <div className="cert-header">
              <span className="cert-icon">{cert.icon}</span>
              <div className="cert-meta">
                <span className="cert-issuer mono">{cert.issuer}</span>
                <span className="cert-issued mono">
                  <Calendar size={11} />
                  {cert.issued}
                  {cert.expires && <span className="cert-expiry"> → {cert.expires}</span>}
                </span>
              </div>
              <ExternalLink size={14} className="cert-link-icon" />
            </div>

            {/* Title */}
            <div className="cert-body">
              <h4 className="cert-title">{cert.title}</h4>

              {cert.credentialId && (
                <p className="cert-id mono">
                  <Hash size={11} />
                  {cert.credentialId}
                </p>
              )}

              {/* Skill tags */}
              <div className="cert-skills">
                {cert.skills.map(skill => (
                  <span key={skill} className="cert-skill-tag mono">{skill}</span>
                ))}
              </div>
            </div>

            {/* Animated bottom bar  */}
            <div className="cert-active-bar" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
