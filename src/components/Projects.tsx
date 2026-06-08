import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, AlertCircle, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Custom icons based on title keywords to give a personalized feel
const getProjectIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('f1') || t.includes('formula')) return '🏎️';
  if (t.includes('cloud') || t.includes('job')) return '☁️';
  if (t.includes('library') || t.includes('user')) return '📚';
  if (t.includes('infrastructure') || t.includes('secure')) return '🛡️';
  if (t.includes('sakura') || t.includes('restaurant')) return '🌸';
  return '💻';
};

// Custom Github Icon SVG Component
const GithubIcon = ({ className = "h-4 w-4" }) => (
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

export const Projects = () => {
  const projects = portfolioData.projects;

  return (
    <section id="projects" className="py-24 relative bg-transparent">
      {/* Visual backdrop */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

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
            Featured <span className="text-primary">Projects</span>
          </motion.h2>
          <p className="text-muted mt-2 max-w-lg mx-auto text-sm">
            A selection of practical applications spanning full-stack, cloud computing, multi-threaded networking systems, and security.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card p-6 rounded-xl flex flex-col justify-between h-full group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-1 bg-slate-900/60 rounded-lg border border-slate-800/80">
                      {getProjectIcon(project.title)}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-medium tracking-wide bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Features Checklist */}
                <div className="mb-6 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Key Accomplishments:</h4>
                  {project.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-muted">
                      <span className="mt-0.5 text-accent flex-shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/60 mt-auto">
                {/* GitHub Link */}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/70 transition-all rounded"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-650 bg-slate-950/20 border border-slate-950 rounded cursor-not-allowed"
                    title="Codebase private or coming soon"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    Private
                  </button>
                )}

                {/* Live Demo Link */}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-primary/20 hover:bg-primary/30 border border-primary/30 hover:border-primary/50 transition-all rounded"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Demo Soon
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 bg-slate-950/20 border border-slate-900 rounded cursor-not-allowed"
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    Demo Soon
                  </button>
                )}

                {/* Case Study Link */}
                {project.caseStudyUrl ? (
                  <a
                    href={project.caseStudyUrl}
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-all rounded"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    Case Study
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 bg-slate-950/20 border border-slate-900 rounded cursor-not-allowed"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    Study Soon
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
