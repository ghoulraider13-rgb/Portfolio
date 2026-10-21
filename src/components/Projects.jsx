import { motion } from 'framer-motion';
import { ExternalLink, Layers, Cpu, Globe, Brain, Zap, Shield, Code } from 'lucide-react';
import GithubIcon from './GithubIcon';
import RevealOnScroll from './RevealOnScroll';

const PROJECTS = [
  {
    title: 'FloTask',
    subtitle: 'AI-Powered Productivity Dashboard',
    description:
      'Full-featured task manager with natural language parsing (Gemini/NVIDIA Nemotron), Pomodoro timer, enforcer-mode alarms, rich scratchpad with draw tool, sleep & hydration trackers. Built with React 18, Vite, Tailwind, Framer Motion. PWA + native desktop (Tauri) + mobile (Capacitor).',
    tech: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'Gemini API', 'Nemotron', 'Tauri', 'Capacitor', 'PWA'],
    icon: Layers,
    gradient: 'from-[#6c5ce7]/20 to-[#a29bfe]/5',
    link: 'https://flotask-xi.vercel.app/',
    github: 'https://github.com/ghoulraider13-rgb/FloTask',
  },
  {
    title: 'Actis',
    subtitle: 'Local-First Filesystem Activity Ledger',
    description:
      'CLI-first tool with local SQLite ledger, debounced filesystem watcher (chokidar), natural-language query parser, and plain-Node dashboard (port 7420). Zero external dependencies, ESM, sql.js. Published to npm as `actis`.',
    tech: ['Node.js', 'TypeScript', 'ESM', 'sql.js', 'chokidar', 'SQLite'],
    icon: Code,
    gradient: 'from-[#00d4aa]/20 to-[#34d399]/5',
    link: 'http://localhost:7420',
    github: 'https://github.com/ghoulraider13-rgb/Actis',
  },
  {
    title: 'Disaster Detection Drone',
    subtitle: 'Edge CV for UAV Disaster Assessment',
    description:
      'YOLOv11n models for flood, landslide, and earthquake damage detection. ONNX, TensorRT, and OpenVINO optimization for Jetson-class UAV edge deployment. IEEE-style evaluation with mAP/latency benchmarks. Research paper in progress.',
    tech: ['YOLOv11', 'ONNX', 'TensorRT', 'OpenVINO', 'Python', 'Roboflow', 'Jetson'],
    icon: Globe,
    gradient: 'from-[#ef4444]/20 to-[#f87171]/5',
    link: null,
    github: 'https://github.com/ghoulraider13-rgb/Disaster_DetectionDrone',
  },
  {
    title: 'Sahayak',
    subtitle: 'Privacy-Preserving Browser Agent (SIH 2026)',
    description:
      'Chrome MV3 extension + FastAPI backend for privacy-preserving web task automation. PII redaction engine achieving 1.00 recall / 1.00 precision on adversarial tests. ISRO Problem Statement 26171 — internal round build.',
    tech: ['Chrome MV3', 'FastAPI', 'Python', 'PII Redaction', 'Privacy'],
    icon: Shield,
    gradient: 'from-[#34d399]/20 to-[#10b981]/5',
    link: null,
    github: null,
  },
  {
    title: 'Evolutionary Feature Selector',
    subtitle: 'Genetic Algorithm for ML Optimization',
    description:
      'Genetic algorithm reduces feature set by 50% while raising RandomForest accuracy from 97.1% to 99.4% on breast-cancer dataset. Demonstrates evolutionary computation for automated feature engineering.',
    tech: ['Python', 'Genetic Algorithms', 'scikit-learn', 'RandomForest', 'Optimization'],
    icon: Brain,
    gradient: 'from-[#f59e0b]/20 to-[#fbbf24]/5',
    link: null,
    github: null,
  },
  {
    title: 'Hermes Agent Skills',
    subtitle: 'AI Agent Tooling & Workflow Automation',
    description:
      'Authored and maintain 20+ skills for Hermes Agent (Nous Research): autonomous coding agents (Claude Code, Codex, OpenCode), desktop automation, web scraping, research tools, media processing, and dev tooling. Used in production agent workflows.',
    tech: ['TypeScript', 'Node.js', 'MCP', 'CDP', 'AI Agents', 'Automation'],
    icon: Zap,
    gradient: 'from-[#8b5cf6]/20 to-[#a78bfa]/5',
    link: 'https://hermes-agent.nousresearch.com/docs',
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
            Selected projects showcasing expertise in full-stack development, AI/ML, edge computing, and developer tooling.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}