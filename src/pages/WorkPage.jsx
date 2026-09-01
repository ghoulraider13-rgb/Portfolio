import { motion } from 'framer-motion';
import { ExternalLink, Cpu, Layers, Sparkles } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

const FEATURED = [
  {
    title: 'Flowtask',
    subtitle: 'Productivity Dashboard',
    description: 'A comprehensive productivity dashboard built with industrial "Nothing OS" aesthetics. Features Pomodoro timer, AI-driven task parsing, voice-to-text transcription, and reactive visual design.',
    tech: ['React', 'Vite', 'Framer Motion', 'AI Integration'],
    icon: Layers,
    link: 'https://flotask-xi.vercel.app/',
    badge: 'Live Link',
    badgeColor: 'bg-success/15 text-success',
  },
  {
    title: 'AI-Powered Web Application',
    subtitle: 'NLM Engine Integration',
    description: 'Engineered a full-stack Natural Language Model engine utilizing Google\'s Gemini AI. Designed frontend UI with "Nothing" design principles. Managed React component resets for optimized state management.',
    tech: ['React', 'Python', 'Gemini API', 'NLP'],
    icon: Cpu,
    link: null,
    badge: 'Interactive Hover State',
    badgeColor: 'bg-accent/15 text-accent-bright',
  },
];

function ProjectCard({ project, index }) {
  const Icon = project.icon;
  return (
    <RevealOnScroll delay={index * 0.15}>
      <motion.div
        className="glass-card p-7 group relative overflow-hidden"
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        data-hover
      >
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Top row: icon + badge + link */}
          <div className="flex items-start justify-between mb-5">
            <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/15 transition-colors">
              <Icon size={22} />
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full ${project.badgeColor}`}>
                {project.badge}
              </span>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-accent hover:text-accent-bright transition-colors text-sm font-medium"
                  data-hover
                >
                  Visit <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-pure tracking-tight mb-1">{project.title}</h3>
          <p className="text-accent text-sm font-medium mb-4">{project.subtitle}</p>

          {/* Description */}
          <p className="text-mist text-sm leading-relaxed mb-6">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1.5 text-[11px] font-mono text-ash bg-white/[0.03] border border-white/[0.06] rounded-lg group-hover:border-accent/15 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/[0.04] to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </RevealOnScroll>
  );
}

export default function WorkPage() {
  return (
    <div className="page-content min-h-screen px-6 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Work</span>
          </div>
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight flex items-center gap-3">
                Project Hub
                <Sparkles size={20} className="text-accent" />
              </h1>
              <p className="text-mist text-[15px] mt-2 max-w-md">
                A curated selection of modern digital experiences.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {FEATURED.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
