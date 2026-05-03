import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Mail } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(108,92,231,0.4), transparent 70%)',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(162,155,254,0.3), transparent 70%)',
            bottom: '20%',
            right: '10%',
          }}
        />
        {/* Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm"
        >
          <span className="w-8 h-8 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-mono text-mist tracking-wider uppercase">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-pure">Ashwin</span>
          <br />
          <span className="gradient-text">Lahkar</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg sm:text-xl text-mist font-light tracking-wide mb-4 max-w-xl mx-auto"
        >
          AI-Driven DevOps &amp; Full-Stack Developer
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-ash text-sm mb-10"
        >
          <MapPin size={14} className="text-accent" />
          <span>Bengaluru, Karnataka</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            className="group flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-bright text-pure text-sm font-semibold rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            data-hover
          >
            View Projects
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="flex items-center gap-2 px-8 py-3.5 border border-white/10 hover:border-accent/40 text-chalk text-sm font-semibold rounded-lg transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05]"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            data-hover
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center justify-center gap-6 mt-10"
        >
          <a
            href="https://github.com/ghoulraider13-rgb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ash hover:text-accent transition-colors"
            data-hover
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="mailto:ghoul.raider13@gmail.com"
            className="text-ash hover:text-accent transition-colors"
            data-hover
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-ash" />
        </motion.div>
      </motion.div>
    </section>
  );
}
