import { motion } from 'framer-motion';
import { Code, Server, Cloud, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const specializations = [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: "Full-Stack Development",
    description: "Developing modern web apps with React.js, TypeScript, Node.js, Express, and databases like MySQL."
  },
  {
    icon: <Server className="h-6 w-6 text-accent" />,
    title: "Computer Networking",
    description: "Specializing in TCP/IP socket programming, routing protocols, subnets, and robust communication designs."
  },
  {
    icon: <Cloud className="h-6 w-6 text-sky-400" />,
    title: "Cloud Systems",
    description: "Building scalable serverless logic using Azure Functions and managing media stores with AWS S3."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Secure Infrastructure",
    description: "Hardening Ubuntu server environments, implementing firewalls (UFW), SSH keys, Fail2Ban, NGINX, and TLS."
  }
];

export const About = () => {
  const { bio } = portfolioData.personalInfo;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

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
            About <span className="text-primary">Me</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white tracking-wide">
              Undergraduate specialising in Computer Networking
            </h3>
            
            <p className="text-muted leading-relaxed">
              {bio}
            </p>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted font-medium">Education Partner</span>
                <span className="text-white font-semibold">University of Staffordshire (BSc)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted font-medium">Core Focus Areas</span>
                <span className="text-white font-semibold">Full-Stack, Networks & Systems Security</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted font-medium">Availability</span>
                <span className="text-accent font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  Open for Internship / Projects
                </span>
              </div>
            </div>
          </motion.div>

          {/* Specialization pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl relative group overflow-hidden"
              >
                {/* Accent glow line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="mb-4 inline-flex p-3 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-primary/20 transition-colors">
                  {spec.icon}
                </div>
                
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {spec.title}
                </h4>
                
                <p className="text-sm text-muted leading-relaxed">
                  {spec.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
