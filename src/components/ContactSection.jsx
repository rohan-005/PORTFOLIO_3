import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactSection = ({ email }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const formRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError('');
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      if (formRef.current) {
        formRef.current.classList.add('shake');
        setTimeout(() => formRef.current?.classList.remove('shake'), 500);
      }
      return;
    }

    setIsSending(true);
    emailjs.send(
      "service_rqqgcjq",
      "template_vcczbnb",
      { name: formData.name, email: formData.email, message: formData.message },
      "TASXWRDBxS5N39b1y"
    ).then(() => {
        setIsSending(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, (error) => {
        console.error(error);
        setIsSending(false);
        setServerError("Oops! Something went wrong. Please try again.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  return (
    <section className="contact-section chapter">
      <h3 className="mono chapter-title">[ COMM_LINK_ESTABLISHED ]</h3>
      
      <div className="contact-grid">
        <motion.div className="contact-info" initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
          <p className="contact-desc">
            I'm always interested in hearing about new opportunities,
            collaborations, or just having a chat about tech and games.
          </p>
          <div className="contact-method">
            <span className="mono method-label">EMAIL //</span>
            <a href={`mailto:${email}`} className="method-link">{email}</a>
          </div>
          <div className="availability-badge mono">
            <span className="pulse-dot"></span> AVAILABLE FOR OPPORTUNITIES
          </div>
        </motion.div>

        <motion.div className="contact-form-wrapper" ref={formRef} initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="mono">NAME</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
              {errors.name && <span className="error-text mono">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="mono">EMAIL</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
              {errors.email && <span className="error-text mono">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="mono">MESSAGE</label>
              <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className={errors.message ? 'error' : ''} />
              {errors.message && <span className="error-text mono">{errors.message}</span>}
            </div>

            {serverError && <div className="server-error mono">{serverError}</div>}

            <button type="submit" disabled={isSending} className="submit-btn mono">
              {isSending ? 'SENDING...' : 'TRANSMIT MESSAGE'}
            </button>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="success-msg mono">
                  MESSAGE SECURELY TRANSMITTED.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
