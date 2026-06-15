import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import confetti from 'canvas-confetti';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Custom brand icons since they are deprecated in newer Lucide versions
const LinkedinIcon = ({ className = "h-5 w-5" }) => (
  <svg 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className = "h-5 w-5" }) => (
  <svg 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Contact: React.FC = () => {
  const { socialLinks } = portfolioData;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Trigger subtle, professional confetti burst
    confetti({
      particleCount: 40,
      spread: 50,
      colors: ['#00F5D4', '#38BDF8'],
      origin: { y: 0.8 },
      disableForReducedMotion: true
    });

    // Construct mailto link
    const emailBody = `Hi Amisha,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`;
    const mailtoUrl = `mailto:${socialLinks.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open mail client
    window.location.href = mailtoUrl;

    // Set feedback status
    setStatus('Your email client is opening now.');

    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    // Remove feedback text after some time
    setTimeout(() => {
      setStatus(null);
    }, 6000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-card/30 border-t border-b border-border">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Get In <span className="text-primary">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-2xl font-bold text-white tracking-wide">
              Let's Discuss Projects
            </h3>
            
            <p className="text-muted leading-relaxed text-sm">
              Whether you are looking to hire a software/network intern, discuss cloud automation, or collaborate on open source solutions, feel free to drop a message!
            </p>

            <div className="space-y-4 pt-4">
              {/* Direct Email */}
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-4 p-4 rounded-xl glass-card group border border-border"
              >
                <div className="p-3 bg-card border border-border text-primary rounded-lg group-hover:bg-primary/5 group-hover:border-primary/30 transition-colors">
                  <Mail className="h-5 w-5 glow-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">Email Me</h4>
                  <p className="text-sm font-semibold text-white mt-0.5 group-hover:text-primary transition-colors">
                    {socialLinks.email}
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl glass-card group border border-border"
              >
                <div className="p-3 bg-card border border-border text-primary rounded-lg group-hover:bg-primary/5 group-hover:border-primary/30 transition-colors">
                  <LinkedinIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">LinkedIn</h4>
                  <p className="text-sm font-semibold text-white mt-0.5 group-hover:text-primary transition-colors">
                    Amisha Usanga
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl glass-card group border border-border"
              >
                <div className="p-3 bg-card border border-border text-primary rounded-lg group-hover:bg-primary/5 group-hover:border-primary/30 transition-colors">
                  <GithubIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">GitHub</h4>
                  <p className="text-sm font-semibold text-white mt-0.5 group-hover:text-primary transition-colors">
                    {socialLinks.github.replace('https://', '')}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-xl glass-card border border-border">
                <div className="p-3 bg-card border border-border text-primary rounded-lg">
                  <MapPin className="h-5 w-5 glow-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">Location</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {socialLinks.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-border space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-muted tracking-wide uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-soft-card border text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${
                      errors.name ? 'border-red-500/70 bg-red-500/5' : 'border-border'
                    }`}
                    placeholder="Enter name"
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-400 font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-muted tracking-wide uppercase">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-soft-card border text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${
                      errors.email ? 'border-red-500/70 bg-red-500/5' : 'border-border'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-400 font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-semibold text-muted tracking-wide uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-soft-card border text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${
                    errors.subject ? 'border-red-500/70 bg-red-500/5' : 'border-border'
                  }`}
                  placeholder="Subject of message"
                />
                {errors.subject && (
                  <span className="text-[11px] text-red-400 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.subject}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-muted tracking-wide uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-soft-card border text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none ${
                    errors.message ? 'border-red-500/70 bg-red-500/5' : 'border-border'
                  }`}
                  placeholder="Write message details..."
                />
                {errors.message && (
                  <span className="text-[11px] text-red-400 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg font-semibold text-slate-950 bg-primary hover:bg-primary/90 hover:glow-primary transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-primary/20 hover:scale-[1.01] duration-300"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>

              {/* Status Alert */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-secondary/10 border border-secondary/30 rounded-lg text-secondary text-xs font-semibold"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>{status}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
