import { memo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import RevealOnScroll from '../components/RevealOnScroll';
import BinaryRain from '../components/BinaryRain';

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: "💻",
    color: "#7c4dff",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "C", "Rust", "Go"],
  },
  {
    title: "Web & Full-Stack",
    icon: "🌐",
    color: "#00e5ff",
    skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "Framer Motion", "Tauri", "Capacitor", "PWA", "REST APIs", "GraphQL"],
  },
  {
    title: "AI & Data",
    icon: "🧠",
    color: "#00ff88",
    skills: ["PyTorch", "TensorFlow", "YOLOv11", "ONNX", "TensorRT", "OpenVINO", "Genetic Algorithms", "scikit-learn", "Pandas", "NumPy"],
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    color: "#ffa502",
    skills: ["Docker", "GitHub Actions", "Linux/CLI", "Cloudflare", "Tailscale", "AWS", "GCP", "Nginx", "SQLite", "PostgreSQL"],
  },
  {
    title: "Tools & Ecosystem",
    icon: "🛠️",
    color: "#a78bfa",
    skills: ["VS Code", "Git/GitHub", "Jupyter", "Roboflow", "Hermes Agent", "MCP", "CDP", "Scoop", "Bun", "pnpm"],
  },
  {
    title: "Research & Docs",
    icon: "📚",
    color: "#f59e0b",
    skills: ["LaTeX", "BibTeX", "Overleaf", "Zotero", "Technical Writing", "IEEE Format", "Notion", "Obsidian"],
  },
];

function SkillPill({ skill, color, index, isVisible }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.03, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="group relative cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative px-4 py-3 border rounded-xl bg-white/[0.02] text-snow text-xs sm:text-sm font-medium glow-pill flex items-center justify-center text-center w-full min-h-[48px] transition-all duration-300"
        style={{ 
          borderColor: hovered ? color : 'rgba(255,255,255,0.06)',
          boxShadow: hovered ? `0 0 20px ${color}80` : 'none',
          background: hovered ? `${color}15` : 'rgba(255,255,255,0.02)',
        }}
      >
        <span className="relative z-10">{skill}</span>
        
        {/* Glow effect on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at center, ${color}30 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
      </div>
      
      {/* XP gain indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono whitespace-nowrap"
        style={{ color: `${color}cc` }}
      >
        +{Math.floor(Math.random() * 50) + 10} XP
      </motion.div>
    </motion.div>
  );
}

function SkillCategory({ category, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mastery, setMastery] = useState(Math.floor(Math.random() * 30) + 70);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Header */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-full mb-6 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-accent/20 transition-all duration-300 group flex items-center gap-4"
        style={{ borderColor: isHovered ? `${category.color}40` : 'rgba(255,255,255,0.04)' }}
      >
        <motion.div
          animate={{ rotate: isHovered ? 180 : 0, scale: isHovered ? 1.2 : 1 }}
          transition={{ duration: 0.4 }}
          className="p-3 rounded-xl flex items-center justify-center"
          style={{ background: `${category.color}20`, color: category.color }}
        >
          <span className="text-2xl">{category.icon}</span>
        </motion.div>
        <div className="flex-1">
          <h4 className="text-pure font-semibold text-lg mb-1">{category.title}</h4>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ width: `${mastery}%` }}
              transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full rounded-full relative"
                style={{ 
                  background: `linear-gradient(90deg, ${category.color}, ${category.color}aa)`,
                  boxShadow: `0 0 10px ${category.color}`,
                }}
              />
            </motion.div>
            <span className="text-[11px] font-mono font-bold text-right min-w-[40px]" style={{ color: category.color }}>
              {mastery}%
            </span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-ash text-xs font-mono"
        >
          {category.skills.length} skills
        </motion.div>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
        {category.skills.map((skill, i) => (
          <SkillPill key={skill} skill={skill} color={category.color} index={i} isVisible={isVisible} />
        ))}
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(new Set());

  // Intersection observer for category visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCategories(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('[data-skill-category]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section">
      <div className="section-inner flex flex-col items-center justify-center text-center">
        <RevealOnScroll>
          <div className="mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-pure mb-4 tracking-tight serif">Technical Arsenal</h2>
            <div className="h-1 w-20 bg-accent rounded-full opacity-80"></div>
          </div>
        </RevealOnScroll>
        <div className="w-full h-4 block" aria-hidden="true"></div>

        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-6xl">
            <RevealOnScroll delay={0.1}>
              <div
                className="glass-card relative overflow-hidden p-10 md:p-12 w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                data-skill-category="true"
              >
                <BinaryRain active={isHovered} />

                {/* Mastery Level Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-10 flex flex-wrap justify-center gap-4 items-center text-center"
                >
                  <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl text-accent-bright text-sm font-mono">
                    Overall Mastery
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '78%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-48 h-2 bg-white/[0.06] rounded-full overflow-hidden relative"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.5, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full rounded-full relative"
                      style={{ 
                        background: 'linear-gradient(90deg, #7c4dff, #00e5ff, #00ff88)',
                        boxShadow: '0 0 20px rgba(124,77,255,0.6)',
                      }}
                    />
                  </motion.div>
                  <span className="text-accent-bright font-mono font-bold text-lg">78%</span>
                </motion.div>

                {/* Skill Categories */}
                <div className="grid lg:grid-cols-2 gap-10">
                  {SKILL_CATEGORIES.map((cat, i) => (
                    <SkillCategory
                      key={cat.title}
                      category={cat}
                      index={i}
                      isVisible={visibleCategories.has(i)}
                    />
                  ))}
                </div>

                {/* Legendary Skills Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-12 pt-8 border-t border-white/[0.06]"
                >
                  <h4 className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-6 text-center flex items-center justify-center gap-3">
                    <span className="w-1.5 h-1.5 bg-warning rounded-full" /> Legendary Skills
                  </h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { skill: 'YOLOv11 → ONNX/TensorRT', xp: 9500, color: '#ef4444' },
                      { skill: 'Chrome MV3 Extension Dev', xp: 8200, color: '#00e5ff' },
                      { skill: 'Genetic Algorithm Design', xp: 7800, color: '#f59e0b' },
                      { skill: 'React + Tauri Desktop Apps', xp: 8800, color: '#7c4dff' },
                      { skill: 'AI Agent Orchestration', xp: 7200, color: '#a78bfa' },
                      { skill: 'Edge Deployment (Jetson)', xp: 6500, color: '#00ff88' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="group px-4 py-3 bg-white/[0.02] border rounded-xl text-snow text-sm font-medium transition-all duration-300 cursor-default"
                        style={{ borderColor: `${item.color}30` }}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span>{item.skill}</span>
                          <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.95 + i * 0.05 }}
                            style={{ color: item.color }}
                            className="font-mono font-bold text-xs"
                          >
                            {item.xp.toLocaleString()} XP
                          </motion.span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 1 + i * 0.05, duration: 0.8 }}
                          className="mt-2 h-1 bg-white/[0.06] rounded-full overflow-hidden"
                        >
                          <div className="h-full rounded-full" style={{ 
                            background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                            boxShadow: `0 0 8px ${item.color}`,
                          }} />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(SkillsSection);