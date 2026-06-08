import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Trigger a subtle, premium confetti blast (blue/green tech colors)
  const triggerSubtleConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38BDF8', '#22C55E', '#0EA5E9', '#10B981'],
      disableForReducedMotion: true
    });
  };

  const handleViewProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    triggerSubtleConfetti();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      setTimeout(() => {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleContactMe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Canvas particle background effect
  useEffect(() => {
    // 1. Check prefers-reduced-motion support
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      return; // Do not initialize or run the canvas particle loop
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 110 };
    let isHeroVisible = true;
    const isMobile = window.innerWidth <= 768;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Slow, ambient velocities
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 2 + 1;
        // Alternate between primary blue and accent green
        this.color = Math.random() > 0.5 ? '#38BDF8' : '#22C55E';
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce walls
        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;

        // Mouse interaction (disabled on mobile)
        if (!isMobile && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            // Soft push away from cursor
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.6;
            this.y -= (dy / dist) * force * 0.6;
          }
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
      }
    }

    const init = () => {
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      
      // 2. Reduced particle counts as required
      const particleCount = w > 768 ? 55 : 25;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const animate = () => {
      if (!isHeroVisible) return; // 3. Pause loop when section is hidden

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(w, h);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 90) {
            const alpha = (90 - dist) / 90 * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Connect to mouse (disabled on mobile)
        if (!isMobile && mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const alpha = (mouse.radius - dist) / mouse.radius * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = particles[i].color === '#38BDF8' 
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(34, 197, 150, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    init();
    
    // 3. Set up IntersectionObserver to pause loop when Hero is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting;
          if (isHeroVisible) {
            if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
            animate();
          } else {
            if (animationFrameIdRef.current) {
              cancelAnimationFrame(animationFrameIdRef.current);
              animationFrameIdRef.current = null;
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    const parent = containerRef.current;
    if (parent) {
      observer.observe(parent);
      if (!isMobile) {
        parent.addEventListener('mousemove', handleMouseMove);
        parent.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      init();
    });
    resizeObserver.observe(canvas);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (parent && !isMobile) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const info = portfolioData.personalInfo;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent"
    >
      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
      />

      {/* Grid Overlay for futuristic mesh design */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Decorative ambient radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-primary border border-primary/20 bg-primary/5 uppercase mb-6 glow-primary">
            Available for Opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">{info.name}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-200 mb-6 tracking-wide"
        >
          {info.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {info.tagline}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleViewProjects}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white bg-gradient-to-r from-primary/95 to-primary hover:from-primary hover:to-primary/90 transition-all shadow-md hover:shadow-primary/20 hover:scale-[1.02] cursor-pointer"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href="/Amisha_Usanga_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all hover:scale-[1.02]"
          >
            Download CV
            <Download className="h-4 w-4" />
          </a>

          <button
            onClick={handleContactMe}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-slate-300 hover:text-white bg-transparent border border-slate-800 hover:border-slate-650 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Contact Me
            <Mail className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Arrow Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block cursor-pointer"
          onClick={() => {
            const nextSec = document.getElementById('about');
            if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="h-8 w-8 text-muted/65 hover:text-primary transition-colors" />
        </motion.div>
      </div>
    </section>
  );
};
