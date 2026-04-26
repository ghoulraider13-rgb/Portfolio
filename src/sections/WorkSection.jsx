import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Cpu, Layers, Sparkles } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import BinaryRain from '../components/BinaryRain';

const PROJECTS = [
  {
    title: 'Flowtask',
    subtitle: 'Productivity Dashboard',
    description: 'A comprehensive productivity dashboard with industrial "Nothing OS" aesthetics. Features Pomodoro timer, AI-driven task parsing, voice-to-text transcription, and reactive visual design.',
    tech: ['React', 'Vite', 'Framer Motion', 'AI Integration'],
    icon: Layers,
    link: 'https://flo-task.vercel.app/',
    badge: 'Live',
    badgeColor: 'bg-success/15 text-success',
  },
  {
    title: 'Portfolio Website',
    subtitle: 'Digital Workspace',
    description: 'A highly interactive, high-performance portfolio engineered with React, Tailwind, and custom Canvas animations.',
    snarky: 'You are currently using this.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS'],
    icon: Cpu,
    link: null,
    badge: 'Current',
    badgeColor: 'bg-accent/15 text-accent-bright',
  },
];

function ProjectCard({ project, index }) {
  const Icon = project.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <RevealOnScroll delay={index * 0.12}>
      <motion.div
        className="frosted-glass group relative overflow-hidden h-full"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        data-hover
      >
        {/* Binary Digital Rain — Matrix-style dripping 0s and 1s */}
        <BinaryRain active={hovered} />

        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[2]" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top row */}
          <div className="flex items-start justify-between mb-6 gap-3">
            <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0"><Icon size={22} /></div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full ${project.badgeColor}`}>{project.badge}</span>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent hover:text-accent-bright transition-colors text-sm font-medium" data-hover>
                  Visit <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-pure tracking-tight mb-1 serif">{project.title}</h3>
          <p className="text-accent-bright text-sm font-medium mb-5">{project.subtitle}</p>

          {/* Description */}
          <div className="flex-1 flex flex-col mb-7">
            <p className="text-snow text-sm leading-relaxed">{project.description}</p>
            {project.snarky && (
              <p className="text-accent/80 text-[13px] italic mt-2">*{project.snarky}*</p>
            )}
          </div>

          {/* Tech sub-boxes */}
          <div className="flex flex-wrap gap-2.5">
            {project.tech.map((t) => (
              <span key={t} className="px-4 py-2 text-[11px] font-mono text-chalk bg-white/[0.04] border border-white/[0.07] rounded-xl group-hover:border-accent/15 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}

function WorkSection() {
  return (
    <section id="work" className="section">
      <div className="section-inner">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-3 serif flex items-center gap-3">
            Project Hub <Sparkles size={20} className="text-accent" />
          </h2>
          <p className="text-mist text-[15px] mt-2 max-w-md mb-16">A curated selection of modern digital experiences.</p>
        </RevealOnScroll>
        <div className="w-full h-4 block" aria-hidden="true"></div>
        <div className="grid md:grid-cols-2 gap-7">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(WorkSection);
