import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Cpu, Layers, Sparkles } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import BinaryRain from '../components/BinaryRain';

const PROJECTS = [
  // ★ Star project – disaster detection drone
  {
    title: 'Disaster Detection Drone',
    subtitle: 'Aerial disaster detection for UAV SAR',
    description: 'YOLOv11n models for flood, landslide, earthquake damage detection; ONNX, TensorRT, and OpenVINO edge deployment on Jetson-class UAVs; research paper with IEEE-style evaluation.',
    tech: ['Python', 'YOLOv11n', 'ONNX', 'TensorRT', 'OpenVINO', 'Roboflow'],
    icon: Layers,
    link: 'https://github.com/ghoulraider13-rgb/Disaster_DetectionDrone',
    badge: 'Star',
    badgeColor: 'bg-accent/15 text-accent-bright',
  },
  // FloTask – live productivity dashboard
  {
    title: 'FloTask',
    subtitle: 'Productivity Dashboard',
    description: 'A comprehensive productivity dashboard with industrial "Nothing OS" aesthetics. Natural-language task parsing via Gemini Flash, continuous voice dictation, scratchpad draw tool, and a reactive dot-grid background.',
    tech: ['React', 'Vite', 'PWA', 'Gemini Flash'],
    icon: Layers,
    link: 'https://flotask-xi.vercel.app/',
    badge: 'Live',
    badgeColor: 'bg-success/15 text-success',
  },
  // Sahayak privacy-preserving browser agent
  {
    title: 'Sahayak',
    subtitle: 'Privacy-Preserving Browser Agent',
    description: 'Chrome MV3 extension + FastAPI backend; PII redaction engine achieving 1.00 recall / 1.00 precision on adversarial tests (PS 26171).',
    tech: ['Chrome MV3', 'FastAPI', 'React', 'Python'],
    icon: Cpu,
    link: 'https://github.com/ghoulraider13-rgb/Sahayak',
    badge: 'Internal',
    badgeColor: 'bg-amber-15 text-amber-600',
  },
  // Evolutionary Feature Selector
  {
    title: 'Evolutionary Feature Selector',
    subtitle: 'Genetic feature selection for ML',
    description: 'GA reduces feature set by 50% while raising RandomForest accuracy from 97.1% to 99.4% on the breast‑cancer dataset.',
    tech: ['Python', 'Genetic Algorithms', 'scikit-learn'],
    icon: Cpu,
    link: 'https://github.com/ghoulraider13-rgb/evolutionary_feature_selection',
    badge: 'Repo',
    badgeColor: 'bg-success/15 text-success',
  },
  // Portfolio website (self)
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
