import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import useCustomCursor from './hooks/useCustomCursor';
import NeuralCanvas from './components/NeuralCanvas';
import SplashScreen from './components/SplashScreen';
import TopNav from './components/TopNav';
import ResumeModal from './components/ResumeModal';

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
  
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const cursorGlowRef = useRef(null);

  // Track cursor position for the ambient glow directly manipulating DOM (bypassing React state for extreme performance)
  useEffect(() => {
    let raf;
    const onMove = (e) => {
      if (cursorGlowRef.current) {
        // Direct DOM manipulation avoids triggering React tree re-renders on every mouse move
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Passive event delegation to toggle over-glass class without document.elementFromPoint
    const onMouseOver = (e) => {
      if (e.target.closest && e.target.closest('.glass-card, .frosted-glass')) {
        cursorGlowRef.current?.classList.add('over-glass');
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest && e.target.closest('.glass-card, .frosted-glass')) {
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

      {/* Neural Network Background */}
      <NeuralCanvas phase={canvasPhase} />

      {/* Splash Screen */}
      <SplashScreen visible={showSplash} exiting={splashExiting} onEnter={handleEnter} />

      {/* Main Content */}
      {!showSplash && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <TopNav onOpenResume={() => setIsResumeOpen(true)} />
          <HomeSection onOpenResume={() => setIsResumeOpen(true)} />
          <AboutSection />
          <WorkSection />
          <SkillsSection />
          <ContactSection />
          
          <footer className="w-full flex flex-col items-center justify-center text-center py-10 pb-16 border-t border-white/[0.04] bg-deep/30">
            <p className="text-snow text-sm font-medium tracking-wide mb-2">Built with React, Tailwind CSS & Framer Motion — Ashwin Lahkar © 2026</p>
            <p className="text-ash text-xs font-mono tracking-widest">//constantly learning and innovating</p>
          </footer>

          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </motion.div>
      )}
    </>
  );
}
