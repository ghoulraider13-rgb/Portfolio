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
      setStatus(h >= 6 && h <= 23 ? 'Available for work' : 'Sleeping (probably) or doing midnight work');
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const isAvailable = status.startsWith('Available');

  return (
    <div className="hidden lg:flex items-center gap-2.5 text-[14px] font-mono text-mist">
      <span className="text-snow">{time}</span>
      <span className="text-ash">|</span>
      <span className={`flex items-center gap-1.5 ${isAvailable ? 'text-success' : 'text-amber-400'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-success' : 'bg-amber-400'} animate-pulse`} />
        Status: {status}
      </span>
    </div>
  );
}

function TopNav({ onOpenResume }) {
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
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${scrolled ? 'bg-deep/75 backdrop-blur-xl border-b border-white/[0.04]' : ''
        }`}
    >
      <div className="w-full px-8 py-4 flex items-center justify-between">
        {/* Left — Logo + Live Clock */}
        <div className="flex items-center gap-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-lg font-bold text-pure serif" data-hover>
            <span className="text-accent">A</span>L<span className="text-accent">.</span>
          </button>
          <LiveClock />
        </div>

        {/* Right — Nav links & Resume */}
        <div className="hidden sm:flex items-center gap-6">
          {LINKS.map((l) => (
            <button
              key={l.to}
              onClick={() => scrollTo(l.to)}
              className="px-3 py-2 text-[15px] text-mist hover:text-pure transition-colors font-medium tracking-wide uppercase"
              data-hover
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={onOpenResume}
            style={{ padding: '10px 28px', fontSize: '14px' }}
            className="resume-btn-cyber ml-2 rounded-xl font-bold text-accent-bright uppercase tracking-widest inline-flex items-center gap-2 whitespace-nowrap"
            data-hover
          >
            Resume
          </button>
        </div>

        <MobileMenu links={LINKS} scrollTo={scrollTo} onOpenResume={onOpenResume} />
      </div>
    </motion.nav>
  );
}

function MobileMenu({ links, scrollTo, onOpenResume }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm:hidden">
      <button onClick={() => setOpen(!open)} className="text-pure p-2" aria-label="Menu" data-hover>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-4 mt-1 bg-panel/95 backdrop-blur-xl border border-white/[0.06] rounded-xl py-4 px-6 flex flex-col gap-3">
          {links.map((l) => (
            <button key={l.to} onClick={() => { scrollTo(l.to); setOpen(false); }} className="text-sm text-mist hover:text-pure text-left uppercase tracking-wide">{l.label}</button>
          ))}
          <button
            onClick={() => { onOpenResume(); setOpen(false); }}
            className="text-sm text-accent hover:text-accent-bright text-left uppercase tracking-wide mt-2 pt-2 border-t border-white/5"
          >
            Resume
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(TopNav);
