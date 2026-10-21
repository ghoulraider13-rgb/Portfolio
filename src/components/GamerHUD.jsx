import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

/*
  Gamer HUD — displays "player stats" like a game overlay.
  Shows XP, level, achievements, and real-time stats.
*/

const STATS = [
  { key: 'xp', label: 'XP', value: 47250, max: 50000, color: '#7c4dff', icon: '⚡' },
  { key: 'level', label: 'LEVEL', value: 27, max: 50, color: '#00e5ff', icon: '🎮' },
  { key: 'projects', label: 'PROJECTS SHIPPED', value: 12, max: 50, color: '#00ff88', icon: '🚀' },
  { key: 'commits', label: 'COMMITS', value: 2847, max: 10000, color: '#ffa502', icon: '💾' },
  { key: 'hours', label: 'HOURS CODED', value: 4200, max: 10000, color: '#ff4757', icon: '⏱️' },
];

const ACHIEVEMENTS = [
  { id: 'first_commit', name: 'First Blood', desc: 'Made your first commit', icon: '🩸', unlocked: true, date: '2022-03-15' },
  { id: 'first_deploy', name: 'Launch Pad', desc: 'Deployed first live project', icon: '🚀', unlocked: true, date: '2022-06-20' },
  { id: 'hacker', name: 'Midnight Coder', desc: 'Committed after 2 AM 50 times', icon: '🦉', unlocked: true, date: '2023-01-10' },
  { id: 'open_source', name: 'Open Source Hero', desc: 'Published npm package', icon: '📦', unlocked: true, date: '2024-10-03' },
  { id: 'ai_master', name: 'Neural Architect', desc: 'Deployed 3+ AI models to edge', icon: '🧠', unlocked: true, date: '2024-08-15' },
  { id: 'fullstack', name: 'Full Stack Master', desc: 'Built frontend, backend, and infra', icon: '🏗️', unlocked: true, date: '2023-11-01' },
  { id: 'speaker', name: 'Conference Speaker', desc: 'Presented at a tech conference', icon: '🎤', unlocked: false, date: null },
  { id: 'mentor', name: 'Code Mentor', desc: 'Mentored 5+ junior developers', icon: '👨‍🏫', unlocked: false, date: null },
  { id: 'legend', name: 'Legendary', desc: 'Reached Level 50', icon: '👑', unlocked: false, date: null },
];

function GamerHUD({ isVisible, onToggle }) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredAchievement, setHoveredAchievement] = useState(null);
  const [timeAlive, setTimeAlive] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeAlive(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className={`fixed bottom-6 left-6 z-[99] p-3 rounded-xl glass-card flex items-center gap-3 transition-all duration-300 ${expanded ? 'bg-accent/10 border-accent/30' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-hover
        aria-label={expanded ? 'Hide HUD' : 'Show HUD'}
        style={{ zIndex: 99 }}
      >
        <span className="text-2xl">🎮</span>
        <span className="text-xs font-mono text-accent-bright hidden sm:block">HUD</span>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-ash"
        >
          ▼
        </motion.div>
      </motion.button>

      {/* HUD Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-[98] w-80 glass-card flex flex-col gap-4"
            style={{ maxHeight: '70vh', overflow: 'hidden' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="text-pure font-bold text-sm">Player: Ashwin</p>
                  <p className="text-ash text-xs font-mono">Session: {formatTime(timeAlive)}</p>
                </div>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="p-1 text-ash hover:text-danger transition-colors rounded"
                aria-label="Close HUD"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Stats */}
            <div className="space-y-3">
              {STATS.map((stat) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * STATS.indexOf(stat), duration: 0.3 }}
                  className="flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-mono text-mist">
                      <span>{stat.icon}</span>
                      {stat.label}
                    </span>
                    <span className="text-pure font-bold text-sm">{stat.value.toLocaleString()}</span>
                  </div>
                  <div className="relative h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (stat.value / stat.max) * 100)}%` }}
                      transition={{ delay: 0.2 + 0.05 * STATS.indexOf(stat), duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full rounded-full relative"
                      style={{ 
                        background: `linear-gradient(90deg, ${stat.color}, ${stat.color}aa)`,
                        boxShadow: `0 0 10px ${stat.color}`
                      }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-white/30" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="pt-2 border-t border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-pure font-bold text-sm flex items-center gap-2">
                  <span>🏆</span> Achievements
                </h4>
                <span className="text-ash text-xs font-mono">
                  {ACHIEVEMENTS.filter(a => a.unlocked).length} / {ACHIEVEMENTS.length}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                {ACHIEVEMENTS.map((ach) => (
                  <motion.button
                    key={ach.id}
                    onMouseEnter={() => setHoveredAchievement(ach.id)}
                    onMouseLeave={() => setHoveredAchievement(null)}
                    className={`relative p-3 rounded-xl text-center transition-all duration-300 group ${
                      ach.unlocked 
                        ? 'bg-accent/5 border-accent/10' 
                        : 'bg-white/[0.02] border-white/[0.04] opacity-50'
                    }`}
                    whileHover={{ scale: 1.08, y: -2 }}
                    data-hover
                    disabled={!ach.unlocked}
                  >
                    <span className="text-2xl block mb-1 filter {ach.unlocked ? '' : 'grayscale'}">{ach.icon}</span>
                    <span className="text-[10px] font-mono font-bold {ach.unlocked ? 'text-pure' : 'text-ash'}">{ach.name}</span>
                    
                    {hoveredAchievement === ach.id && ach.unlocked && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 glass-card p-2 text-left z-10"
                      >
                        <p className="text-pure text-xs font-medium mb-1">{ach.name}</p>
                        <p className="text-ash text-[10px] mb-1">{ach.desc}</p>
                        <p className="text-accent text-[10px] font-mono">Unlocked: {ach.date}</p>
                      </motion.div>
                    )}
                    
                    {!ach.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ash/30">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-white/[0.06] flex gap-2">
              <motion.button
                onClick={() => window.open('https://github.com/ghoulraider13-rgb', '_blank')}
                className="flex-1 px-3 py-2 bg-accent/10 border border-accent/20 text-accent-bright text-xs font-mono rounded-lg hover:bg-accent/20 transition-colors"
                data-hover
              >
                GitHub
              </motion.button>
              <motion.button
                onClick={() => window.open('https://linkedin.com/in/ashwin-lahkar-08a9ab405', '_blank')}
                className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.06] text-mist text-xs font-mono rounded-lg hover:border-accent/30 hover:text-pure transition-colors"
                data-hover
              >
                LinkedIn
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(GamerHUD);