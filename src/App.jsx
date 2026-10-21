import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import useCustomCursor from './hooks/useCustomCursor';
import NeuralCanvas from './components/NeuralCanvas';
import SplashScreen from './components/SplashScreen';
import TopNav from './components/TopNav';
import ResumeModal from './components/ResumeModal';
import Terminal from './components/Terminal';
import GamerHUD from './components/GamerHUD';
import EasterEggs from './components/EasterEggs';
import ParticleBurst from './components/ParticleBurst';
import AchievementToast from './components/AchievementToast';

import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import WorkSection from './sections/WorkSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  const { dotXY, ringXY, hovering } = useCustomCursor();
  const [showSplash, setShowSplash] = useState(true);
  const [splashExiting, setSplashExiting] = useState(false);
  const [canvasPhase, setCanvasPhase] = useState('idle');
  const [gamerMode, setGamerMode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [clickPosition, setClickPosition] = useState(null);
  const [showClickBurst, setShowClickBurst] = useState(false);

  const cursorGlowRef = useRef(null);
  const achievementTimeoutRef = useRef(null);

  // Track cursor position for the ambient glow
  useEffect(() => {
    let raf;
    const onMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseOver = (e) => {
      if (e.target.closest && e.target.closest('.glass-card, .frosted-glass, .terminal-glass')) {
        cursorGlowRef.current?.classList.add('over-glass');
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest && e.target.closest('.glass-card, .frosted-glass, .terminal-glass')) {
        cursorGlowRef.current?.classList.remove('over-glass');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  // Gamer mode effects
  useEffect(() => {
    if (gamerMode) {
      document.body.classList.add('gamer-mode-active');
      cursorGlowRef.current?.classList.add('gamer-mode');
    } else {
      document.body.classList.remove('gamer-mode-active');
      cursorGlowRef.current?.classList.remove('gamer-mode');
    }
  }, [gamerMode]);

  // Ensure scroll top and splash screen resets reliably on hard refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    setShowSplash(true);
    setSplashExiting(false);
  }, []);

  const handleEnter = useCallback(() => {
    setSplashExiting(true);
    setCanvasPhase('converge');
    setTimeout(() => setCanvasPhase('disperse'), 2000);
    setTimeout(() => {
      setShowSplash(false);
      setSplashExiting(false);
      setCanvasPhase('idle');
    }, 3000);
  }, []);

  const handleAchievement = useCallback((id, message) => {
    if (achievements.some(a => a.id === id)) return;
    
    const newAchievement = { id, message, timestamp: Date.now() };
    setAchievements(prev => [...prev, newAchievement]);
    
    if (achievementTimeoutRef.current) clearTimeout(achievementTimeoutRef.current);
    achievementTimeoutRef.current = setTimeout(() => {
      setAchievements(prev => prev.filter(a => a.id !== id));
    }, 5000);
  }, [achievements]);

  const handleClick = useCallback((e) => {
    // Trigger particle burst on click (but not on interactive elements)
    if (!e.target.closest('a, button, input, textarea, [data-hover], .cursor-dot, .cursor-ring')) {
      setClickPosition({ x: e.clientX, y: e.clientY });
      setShowClickBurst(true);
      setTimeout(() => setShowClickBurst(false), 800);
    }
    
    // Cursor ring click animation
    const ring = document.querySelector('.cursor-ring');
    if (ring) {
      ring.classList.add('clicking');
      setTimeout(() => ring.classList.remove('clicking'), 150);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Expose terminal opener globally for keyboard shortcut
  useEffect(() => {
    window.openTerminal = () => setIsTerminalOpen(true);
    return () => { delete window.openTerminal; };
  }, []);

  return (
    <>
      {/* Custom Cursor — dot + ring */}
      <div className="cursor-dot" style={{ left: dotXY.x, top: dotXY.y }} />
      <div className={`cursor-ring ${hovering ? 'expanded' : ''}`} style={{ left: ringXY.x, top: ringXY.y }} />

      {/* Cursor Glow — soft radial ambient light */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow"
        style={{ left: '-300px', top: '-300px' }}
      />

      {/* Scanlines overlay (CRT effect) */}
      <div className="scanlines" />

      {/* Neural Network Background */}
      <NeuralCanvas phase={canvasPhase} gamerMode={gamerMode} />

      {/* Splash Screen */}
      <SplashScreen visible={showSplash} exiting={splashExiting} onEnter={handleEnter} />

      {/* Click Particle Burst */}
      <ParticleBurst 
        isActive={showClickBurst} 
        position={clickPosition} 
        color={gamerMode ? '#00e5ff' : '#7c4dff'}
        count={16}
        onComplete={() => setShowClickBurst(false)}
      />

      {/* Easter Eggs (Konami code, secret keys, etc.) */}
      <EasterEggs 
        onAchievement={handleAchievement}
        gamerMode={gamerMode}
        setGamerMode={setGamerMode}
        neuralCanvasPhase={canvasPhase}
        setNeuralCanvasPhase={setCanvasPhase}
      />

      {/* Main Content */}
      {!showSplash && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <TopNav 
            onOpenResume={() => setIsResumeOpen(true)} 
            gamerMode={gamerMode}
            setGamerMode={setGamerMode}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
          
          <HomeSection onOpenResume={() => setIsResumeOpen(true)} />
          <AboutSection />
          <WorkSection />
          <SkillsSection />
          <ContactSection />
          
          <footer className="w-full flex flex-col items-center justify-center text-center py-10 pb-16 border-t border-white/[0.04] bg-deep/30">
            <p className="text-snow text-sm font-medium tracking-wide mb-2">Built with React, Tailwind CSS & Framer Motion — Ashwin Lahkar © 2026</p>
            <p className="text-ash text-xs font-mono tracking-widest">//constantly learning and innovating</p>
            <p className="text-accent/50 text-xs font-mono tracking-widest mt-2">
              {gamerMode ? '🎮 GAMER MODE ACTIVE' : 'Press Ctrl+Shift+G for Gamer Mode • Ctrl+Shift+T for Terminal'}
            </p>
          </footer>

          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
          <GamerHUD isVisible={true} />
          
          {/* Achievement Toasts */}
          <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-2 pointer-events-none">
            {achievements.map((achievement) => (
              <AchievementToast key={achievement.id} message={achievement.message} />
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}