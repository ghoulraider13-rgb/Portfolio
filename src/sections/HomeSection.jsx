import { memo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, FileText, Terminal } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';

const BTN_STYLE = { padding: '16px 36px', minWidth: '180px' };

const TAGLINES = [
  'Building intelligent, production-grade applications',
  'Deploying AI models to the edge',
  'Crafting delightful developer experiences',
  'Turning coffee into code since 2022',
  'Full-stack engineer with an AI obsession',
  'Open source contributor & hackathon finalist',
];

function HomeSection({ onOpenResume }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const taglineRef = useRef(TAGLINES[0]);

  // Typewriter effect
  useEffect(() => {
    const text = TAGLINES[taglineIndex];
    taglineRef.current = text;
    setTypedText('');
    setIsTyping(true);
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        // Wait then switch to next tagline
        setTimeout(() => {
          setTaglineIndex(prev => (prev + 1) % TAGLINES.length);
        }, 3000);
      }
    }, 50);
    
    return () => clearInterval(typeInterval);
  }, [taglineIndex]);

  // Mouse parallax for floating elements
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section id="home" className="section min-h-screen flex items-center relative overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}>
        <motion.div
          className="absolute top-1/4 left-10 w-24 h-24 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br from-accent/10 to-accent-bright/5 border border-accent/20"
          animate={{ 
            rotate: [0, 3, -2, 0],
            borderRadius: ['50%_50%_50%_50%/60%_60%_40%_40%', '50%_50%_50%_50%/40%_40%_60%_60%', '50%_50%_50%_50%/60%_60%_40%_40%'],
            x: [0, 10, -5, 0],
            y: [0, -8, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent/5 border border-accent/15 rotate-45"
          animate={{ 
            rotate: [45, 48, 42, 45],
            scale: [1, 1.1, 0.95, 1],
            x: [0, -10, 5, 0],
            y: [0, 10, -5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-electric/5 border border-electric/10"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 15, -10, 0],
            y: [0, -10, 8, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        <motion.div
          className="absolute top-20 right-20 w-8 h-8 bg-accent-bright/10 rounded-lg rotate-12"
          animate={{ 
            rotate: [12, 18, 6, 12],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(124,77,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,77,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />

      <div className="section-inner w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[2px] bg-gradient-to-r from-accent to-accent-bright"
            />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.3em]">Hello World</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-pure leading-[1.05] serif"
        >
          Hi! I{'{'}m
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6 serif"
        >
          <span className="gradient-text">ASHWIN LAHKAR</span>
        </motion.h1>

        {/* Dynamic tagline with typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12 min-h-[48px] flex items-center gap-3"
        >
          <p className="text-snow text-base sm:text-lg font-light max-w-xl leading-relaxed">
            B.TECH in CSE <span className="text-accent-bright font-medium glow-text">(AI Driven DevOps)</span> student at{' '}
            <span className="text-pure font-medium">Jain University</span>,{' '}
          </p>
          <motion.span
            key={taglineIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-accent-bright font-medium glow-text whitespace-nowrap"
          >
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="ml-1 font-mono"
            >
              {isTyping ? '_' : ''}
            </motion.span>
          </motion.span>
        </motion.div>

        <div className="w-full h-6 block" aria-hidden="true"></div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.5, staggerChildren: 0.1 }}
          className="flex flex-row flex-wrap items-center gap-4"
        >
          {/* View Resume */}
          <motion.button
            onClick={onOpenResume}
            style={BTN_STYLE}
            className="resume-btn-cyber inline-flex items-center justify-center gap-3 text-accent-bright text-base font-bold uppercase tracking-widest rounded-xl transition-all whitespace-nowrap group"
            data-hover
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText size={18} />
            View Resume
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
            >
              →
            </motion.span>
          </motion.button>

          {/* View my work */}
          <motion.button
            onClick={() => scrollTo('work')}
            style={BTN_STYLE}
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-bright text-pure text-base font-semibold rounded-xl transition-colors whitespace-nowrap group"
            data-hover
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            View my work <ArrowRight size={16} />
          </motion.button>

          {/* Get in touch */}
          <motion.button
            onClick={() => scrollTo('contact')}
            style={BTN_STYLE}
            className="inline-flex items-center justify-center gap-2 border border-white/[0.1] hover:border-accent/30 text-snow text-base font-semibold rounded-xl transition-colors bg-white/[0.03] whitespace-nowrap group"
            data-hover
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in touch
          </motion.button>

          {/* GitHub */}
          <a href="https://github.com/ghoulraider13-rgb" target="_blank" rel="noopener noreferrer">
            <motion.span
              style={BTN_STYLE}
              className="inline-flex items-center justify-center gap-2.5 border border-white/[0.1] hover:border-accent/30 text-mist hover:text-pure text-base font-medium rounded-xl transition-colors bg-white/[0.03] whitespace-nowrap group"
              data-hover
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <GithubIcon size={16} /> GitHub <ExternalLink size={12} className="text-ash" />
            </motion.span>
          </a>

          {/* Terminal Button */}
          <motion.button
            onClick={() => window.openTerminal?.()}
            style={BTN_STYLE}
            className="btn-electric inline-flex items-center justify-center gap-2 text-base font-bold uppercase tracking-widest rounded-xl whitespace-nowrap group"
            data-hover
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Terminal size={16} /> Terminal
          </motion.button>
        </motion.div>

        {/* Quick stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-16 flex flex-wrap gap-8 text-sm"
        >
          <div className="flex items-center gap-2 text-mist">
            <span className="text-accent-bright font-mono font-bold text-lg">12+</span>
            <span className="text-ash">Projects Shipped</span>
          </div>
          <div className="flex items-center gap-2 text-mist">
            <span className="text-success font-mono font-bold text-lg">47k+</span>
            <span className="text-ash">XP Earned</span>
          </div>
          <div className="flex items-center gap-2 text-mist">
            <span className="text-electric font-mono font-bold text-lg">27</span>
            <span className="text-ash">Level</span>
          </div>
          <div className="flex items-center gap-2 text-mist">
            <span className="text-warning font-mono font-bold text-lg">2.8k+</span>
            <span className="text-ash">Commits</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(HomeSection);