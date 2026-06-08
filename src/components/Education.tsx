import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Education = () => {
  const educationList = portfolioData.education;

  return (
    <section id="education" className="py-24 relative bg-transparent">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

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
            Academic <span className="text-primary">Journey</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Timeline Wrapper */}
        <div className="relative border-l border-slate-800 ml-4 md:ml-32">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.degree + edu.institution}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="mb-10 pl-6 md:pl-10 relative group"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[11px] top-1.5 p-1 rounded-full bg-bg border-2 border-slate-800 group-hover:border-primary transition-colors duration-300 z-10">
                <GraduationCap className="h-3 w-3 text-muted group-hover:text-primary transition-colors" />
              </div>

              {/* Box container */}
              <div className="glass-card p-6 rounded-xl relative">
                {/* Year Label for Desktop */}
                <div className="hidden md:block absolute -left-36 top-1/2 -translate-y-1/2 text-right w-28">
                  <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-primary">
                    <Calendar className="h-3.5 w-3.5" />
                    {edu.duration}
                  </div>
                </div>

                {/* Mobile Year Badge */}
                <div className="md:hidden flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {edu.duration}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                  {edu.degree}
                </h3>
                
                {/* School */}
                <span className="inline-block text-sm font-semibold text-accent mt-1">
                  {edu.institution}
                </span>

                {/* Details */}
                {edu.details && (
                  <p className="text-sm text-slate-350 mt-3 leading-relaxed">
                    {edu.details}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
