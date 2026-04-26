import { motion } from 'framer-motion';
import { ExternalLink, Layers, Cpu } from 'lucide-react';
import GithubIcon from './GithubIcon';
import RevealOnScroll from './RevealOnScroll';

const PROJECTS = [
  {
    title: 'AI-Powered Web Application',
    subtitle: 'Full-Stack NLM Engine',
    description:
      'Engineered a full-stack Natural Language Model engine utilizing "Nothing" design principles. Features optimized state management via component resets, delivering a seamless, intelligent user experience.',
    tech: ['React', 'Python', 'Gemini API', 'NLP'],
    icon: Cpu,
    gradient: 'from-[#6c5ce7]/20 to-[#a29bfe]/5',
    link: null,
    github: null,
  },
  {
    title: 'Flo-Task',
    subtitle: 'Productivity Dashboard',
    description:
      'A comprehensive productivity dashboard built with industrial "Nothing OS" aesthetics. Features Pomodoro timer, AI-driven task parsing, voice-to-text transcription, and reactive visual design.',
    tech: ['React', 'Vite', 'Framer Motion', 'AI Integration'],
    icon: Layers,
    gradient: 'from-[#a29bfe]/20 to-[#6c5ce7]/5',
    link: 'https://flo-task.vercel.app/',
    github: null,
  },
];

function ProjectCard({ project, index }) {
  const Icon = project.icon;
  return (
    <RevealOnScroll delay={index * 0.15}>
      <motion.div
        className={`project-card glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer`}
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        data-hover
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors duration-300">
              <Icon size={24} />
            </div>
            <div className="flex items-center gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-ash hover:text-pure transition-colors" data-hover aria-label="GitHub repository">
                  <GithubIcon size={18} />
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent hover:text-accent-bright transition-colors text-sm font-medium" data-hover>
                  Visit Live <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-pure mb-1 tracking-tight">{project.title}</h3>
          <p className="text-accent text-sm font-medium mb-4">{project.subtitle}</p>

          {/* Description */}
          <p className="text-mist text-sm leading-relaxed mb-6">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 text-[11px] font-mono text-ash bg-white/[0.04] border border-white/[0.06] rounded-md group-hover:border-accent/20 transition-colors duration-300">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </RevealOnScroll>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure mb-4 tracking-tight">Featured Projects</h2>
          <p className="text-mist text-[15px] max-w-lg mb-16">
            Selected projects that showcase my expertise in full-stack development and AI integration.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
