import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Work', to: 'work' },
  { label: 'Skills', to: 'skills' },
];

function LiveClock() {
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      setStatus(h >= 6 && h <= 23 ? 'Available for work' : 'Sleeping (probably) or midnight coding');
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const isAvailable = status.startsWith('Available');

  return (
    <div className="hidden lg:flex items-center gap-2.5 text-[14px] font-mono text-mist">
      <span className="text-snow font-medium tabular-nums">{time}</span>
      <span className="text-ash">|</span>
      <span className={`flex items-center gap-1.5 ${isAvailable ? 'text-success' : 'text-warning'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-success' : 'bg-warning'} animate-pulse`} />
        Status: {status}
      </span>
    </div>
  );
}

function TopNav({ onOpenResume, gamerMode, setGamerMode, onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${scrolled ? 'bg-deep/80 backdrop-blur-xl border-b border-white/[0.04]' : ''}`}
    >
      <div className="w-full px-8 py-4 flex items-center justify-between">
        {/* Left — Logo + Live Clock */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="text-lg font-bold text-pure serif flex items-center gap-2"
            data-hover
            aria-label="Home"
          >
            <span className="text-accent">A</span>L<span className="text-accent">.</span>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
              className="text-accent-bright text-sm"
            >
              ⚡
            </motion.span>
          </button>
          <LiveClock />
        </div>

        {/* Right — Nav links & Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {LINKS.map((l) => (
            <button
              key={l.to}
              onClick={() => scrollTo(l.to)}
              className="px-3 py-2 text-[15px] text-mist hover:text-pure transition-colors font-medium tracking-wide uppercase relative"
              data-hover
            >
              {l.label}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-[1px] bg-accent"
              />
            </button>
          ))}

          {/* Gamer Mode Toggle */}
          <button
            onClick={() => setGamerMode(!gamerMode)}
            className={`px-4 py-2 text-[13px] font-mono font-bold uppercase rounded-xl transition-all duration-300 flex items-center gap-2 ${gamerMode 
              ? 'bg-accent/20 border-accent/40 text-accent-bright shadow-[0_0_15px_rgba(124,77,255,0.3)]' 
              : 'bg-white/[0.03] border-white/[0.06] text-mist hover:border-accent/30 hover:text-pure hover:bg-white/[0.05]'
            }`}
            data-hover
            aria-label={gamerMode ? 'Disable Gamer Mode' : 'Enable Gamer Mode'}
            title={gamerMode ? 'Gamer Mode: ON (Ctrl+Shift+G to toggle)' : 'Gamer Mode: OFF (Ctrl+Shift+G to toggle)'}
          >
            <span className="text-lg">{gamerMode ? '🎮' : '🎯'}</span>
            <span>{gamerMode ? 'GAMER' : 'GAME'}</span>
            <motion.div
                          animate={gamerMode ? { scale: [1, 1.2, 1], boxShadow: ['0 0 5px', '0 0 15px', '0 0 5px'] } : {}}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-2 h-2 rounded-full bg-accent-bright"
                        />
                      </button>

                      {/* Terminal Button */}
                      <button
                        onClick={onOpenTerminal}
                        className="px-4 py-2 text-[13px] font-mono font-bold uppercase rounded-xl bg-white/[0.03] border border-white/[0.06] text-electric hover:border-electric/50 hover:text-electric hover:bg-electric/10 transition-all duration-300 flex items-center gap-2"
                        data-hover
                        aria-label="Open Terminal (Ctrl+Shift+T)"
                        title="Terminal (Ctrl+Shift+T)"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-electric">
                          <path d="M8 9l3 3-3 3" />
                          <path d="M16 15l-3-3 3-3" />
                          <path d="M12 3v18" />
                        </svg>
                        <span>{'>_'}</span>
                      </button>

          <button
            onClick={onOpenResume}
            className="resume-btn-cyber px-6 py-2.5 text-[14px] font-bold text-accent-bright uppercase tracking-widest inline-flex items-center gap-2 whitespace-nowrap"
            data-hover
          >
            <span className="text-[16px]">📄</span>
            Resume
          </button>
        </div>

        <MobileMenu links={LINKS} scrollTo={scrollTo} onOpenResume={onOpenResume} gamerMode={gamerMode} setGamerMode={setGamerMode} onOpenTerminal={onOpenTerminal} />
      </div>
    </motion.nav>
  );
}

function MobileMenu({ links, scrollTo, onOpenResume, gamerMode, setGamerMode, onOpenTerminal }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button onClick={() => setOpen(!open)} className="text-pure p-2" aria-label="Menu" data-hover>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
        </svg>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-4 mt-1 bg-panel/95 backdrop-blur-xl border border-white/[0.06] rounded-xl py-4 px-6 flex flex-col gap-3 w-56"
        >
          {links.map((l) => (
            <button key={l.to} onClick={() => { scrollTo(l.to); setOpen(false); }} className="text-sm text-mist hover:text-pure text-left uppercase tracking-wide py-2">{l.label}</button>
          ))}
          <div className="border-t border-white/[0.06] pt-3 space-y-2">
            <button
              onClick={() => { setGamerMode(!gamerMode); setOpen(false); }}
              className={`w-full px-4 py-2 text-[13px] font-mono font-bold uppercase rounded-xl text-left transition-all ${gamerMode 
                ? 'bg-accent/20 border-accent/40 text-accent-bright' 
                : 'bg-white/[0.03] border-white/[0.06] text-mist hover:border-accent/30 hover:text-pure'
              }`}
            >
              <span className="mr-2">{gamerMode ? '🎮' : '🎯'}</span>
              {gamerMode ? 'Disable Gamer Mode' : 'Enable Gamer Mode'}
            </button>
            <button
                          onClick={() => { onOpenTerminal(); setOpen(false); }}
                          className="w-full px-4 py-2 text-[13px] font-mono font-bold uppercase rounded-xl bg-white/[0.03] border border-white/[0.06] text-electric text-left hover:border-electric/50 hover:text-electric hover:bg-electric/10 transition-colors"
                        >
                          <span className="mr-2">{'>_'}</span>
                          Open Terminal
                        </button>
            <button
              onClick={() => { onOpenResume(); setOpen(false); }}
              className="w-full px-4 py-2 text-[13px] font-mono font-bold uppercase rounded-xl bg-accent/10 border border-accent/30 text-accent-bright text-left hover:bg-accent/20 transition-colors"
            >
              <span className="mr-2">📄</span>
              Resume
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default memo(TopNav);