import { useEffect, useRef, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
  Easter Eggs — Konami code, secret keys, hidden features.
  Adds personality and rewards curious visitors.
*/

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

const SECRET_CODES = {
  'godmode': { name: 'GOD MODE', desc: 'Invincibility enabled', effect: 'godmode' },
  'idkfa': { name: 'ALL KEYS', desc: 'Full arsenal unlocked', effect: 'keys' },
  'iddqd': { name: 'IDDQD', desc: 'Doom god mode activated', effect: 'godmode' },
  'ashwin': { name: 'DEVELOPER MODE', desc: 'Hey, that\'s me!', effect: 'dev' },
  'portfolio': { name: 'SELF AWARE', desc: 'The portfolio knows its name', effect: 'self' },
  'konami': { name: 'KONAMI', desc: 'Classic cheat code entered', effect: 'konami' },
};

function EasterEggs({ onAchievement, gamerMode, setGamerMode, neuralCanvasPhase, setNeuralCanvasPhase }) {
  const keyBufferRef = useRef([]);
  const konamiBufferRef = useRef([]);
  const [activeEasterEgg, setActiveEasterEgg] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }

      const key = e.code;
      
      // Konami code detection
      konamiBufferRef.current.push(key);
      if (konamiBufferRef.current.length > KONAMI_CODE.length) {
        konamiBufferRef.current.shift();
      }
      
      if (JSON.stringify(konamiBufferRef.current) === JSON.stringify(KONAMI_CODE)) {
        triggerEasterEgg('konami');
        konamiBufferRef.current = [];
        return;
      }

      // Secret word detection (type letters)
      if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
        keyBufferRef.current.push(key.toLowerCase());
        if (keyBufferRef.current.length > 10) keyBufferRef.current.shift();
        
        const typed = keyBufferRef.current.join('');
        for (const [code, data] of Object.entries(SECRET_CODES)) {
          if (typed.endsWith(code)) {
            triggerEasterEgg(code);
            keyBufferRef.current = [];
            break;
          }
        }
      }

      // Toggle gamer mode with G
      if (key === 'KeyG' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        setGamerMode(!gamerMode);
        onAchievement?.('gamer_mode', `Gamer Mode ${!gamerMode ? 'Activated' : 'Deactivated'}`);
      }

      // Toggle scanlines with S
      if (key === 'KeyS' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        document.body.classList.toggle('scanlines-active');
      }

      // Open terminal with T
      if (key === 'KeyT' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        if (window.openTerminal) window.openTerminal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gamerMode, setGamerMode, onAchievement]);

  const triggerEasterEgg = (code) => {
    const data = SECRET_CODES[code];
    if (!data) return;

    setActiveEasterEgg(data);
    
    // Trigger effects based on type
    switch (data.effect) {
      case 'konami':
        // Trigger neural canvas convergence
        setNeuralCanvasPhase('converge');
        setTimeout(() => setNeuralCanvasPhase('disperse'), 2000);
        setTimeout(() => setNeuralCanvasPhase('idle'), 4000);
        onAchievement?.('konami', 'Konami Code Entered! 🎮');
        break;
      case 'godmode':
        onAchievement?.('godmode', 'God Mode Activated! ⚡');
        // Visual effect - flash screen
        document.body.style.transition = 'background 0.1s';
        document.body.style.background = '#7c4dff';
        setTimeout(() => { document.body.style.background = ''; }, 100);
        break;
      case 'dev':
        onAchievement?.('dev_mode', 'Developer Mode: Hello Ashwin! 👨‍💻');
        break;
      case 'self':
        onAchievement?.('self_aware', 'Portfolio achieved self-awareness 🤖');
        break;
    }

    // Show modal for special ones
    if (['konami', 'godmode', 'dev'].includes(code)) {
      setActiveModal(data);
    }

    // Auto-dismiss notification
    setTimeout(() => setActiveEasterEgg(null), 4000);
  };

  const dismissModal = () => setActiveModal(null);

  return (
    <>
      {/* Easter Egg Notification Toast */}
      <AnimatePresence>
        {activeEasterEgg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[1001] glass-card px-6 py-4 flex items-center gap-4"
            style={{ maxWidth: '90vw' }}
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-2xl">
              🎮
            </div>
            <div>
              <p className="text-pure font-bold text-sm">{activeEasterEgg.name}</p>
              <p className="text-ash text-xs font-mono">{activeEasterEgg.desc}</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: 3, duration: 0.3 }}
              className="text-accent-bright"
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1002] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={dismissModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-card max-w-md w-full p-8 text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={dismissModal}
                className="absolute top-4 right-4 p-1 text-ash hover:text-danger transition-colors rounded"
                aria-label="Dismiss"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="text-5xl mb-4">{activeModal.name === 'KONAMI' ? '🎮' : activeModal.name === 'GOD MODE' ? '⚡' : '👨‍💻'}</div>
              <h3 className="text-2xl font-bold text-pure mb-2 serif">{activeModal.name}</h3>
              <p className="text-mist mb-6">{activeModal.desc}</p>
              
              {activeModal.effect === 'konami' && (
                <div className="space-y-2 text-xs font-mono text-ash mb-6 p-4 bg-white/[0.03] rounded-xl">
                  <p>↑ ↑ ↓ ↓ ← → ← → B A</p>
                  <p className="text-accent">CHEAT CODE ACCEPTED</p>
                                  <p>+30 XP & Neural Network Converged</p>
                </div>
              )}

              {activeModal.effect === 'dev' && (
                <div className="space-y-2 text-xs font-mono text-ash mb-6 p-4 bg-white/[0.03] rounded-xl">
                  <p>{'>_'} Developer credentials verified</p>
                  <p className="text-accent">Welcome back, Ashwin</p>
                  <p>Access level: FULL</p>
                </div>
              )}

              <motion.button
                onClick={dismissModal}
                className="btn-cyber px-6 py-3 rounded-xl font-bold text-accent-bright uppercase tracking-widest inline-flex items-center gap-2"
                data-hover
              >
                Continue <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>→</motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(EasterEggs);