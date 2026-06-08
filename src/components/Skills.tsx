import { motion } from 'framer-motion';
import { Cpu, Terminal, Database, Server, Lightbulb } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Helper to resolve an icon based on category name
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'programming and web':
      return <Terminal className="h-5 w-5 text-primary" />;
    case 'databases and APIs':
    case 'databases and apis':
      return <Database className="h-5 w-5 text-accent" />;
    case 'cloud and infrastructure':
      return <Server className="h-5 w-5 text-sky-400" />;
    case 'development concepts':
      return <Cpu className="h-5 w-5 text-purple-400" />;
    case 'professional skills':
      return <Lightbulb className="h-5 w-5 text-amber-400" />;
    default:
      return <Lightbulb className="h-5 w-5 text-primary" />;
  }
};

export const Skills = () => {
  const groups = portfolioData.skillGroups;

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      {/* Glow shapes */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

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
            Technical & Professional <span className="text-primary">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="glass p-6 rounded-xl border border-white/5 hover:border-primary/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/60">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-850">
                  {getCategoryIcon(group.category)}
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-350 font-medium">{skill.name}</span>
                      <span className="text-primary font-semibold text-xs">{skill.level}%</span>
                    </div>
                    {/* Progress track */}
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-850">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
