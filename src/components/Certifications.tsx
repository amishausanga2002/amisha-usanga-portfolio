import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Certifications = () => {
  const certifications = portfolioData.certifications;

  return (
    <section id="certifications" className="py-24 relative bg-transparent">
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Certifications & <span className="text-primary">Credentials</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-xl flex items-start gap-4 border border-border group hover:border-primary/30"
            >
              {/* Icon */}
              <div className="p-3 bg-card border border-border rounded-lg text-primary group-hover:bg-primary/5 group-hover:border-primary/30 transition-colors">
                <Award className="h-6 w-6 glow-primary" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white leading-snug group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm font-semibold text-secondary mt-1">
                  {cert.issuer}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted mt-2.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Issued {cert.date}</span>
                </div>
                
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-primary hover:glow-primary mt-4 transition-colors"
                  >
                    Verify Credential
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
