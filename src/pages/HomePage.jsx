import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import GithubIcon from '../components/GithubIcon';

export default function HomePage() {
  return (
    <div className="page-content min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl w-full">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/[0.06] bg-white/[0.02]"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-mono text-mist tracking-wider uppercase">
            Available for work
          </span>
        </motion.div>

        {/* Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-pure mb-2"
        >
          Hi! I'm
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          <span className="gradient-text">ASHWIN LAHKAR</span>
        </motion.h1>

        {/* Sub-header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-mist text-base sm:text-lg font-light max-w-xl mb-10 leading-relaxed"
        >
          B.TECH in CSE{' '}
          <span className="text-accent font-medium">(AI Driven DevOps)</span>{' '}
          student at{' '}
          <span className="text-chalk font-medium">Jain University</span>,
          building intelligent, production-grade applications.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link to="/work">
            <motion.button
              className="group flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-pure text-sm font-semibold rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              data-hover
            >
              View my work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <Link to="/about">
            <motion.button
              className="flex items-center gap-2 px-7 py-3.5 border border-white/[0.08] hover:border-accent/30 text-chalk text-sm font-semibold rounded-xl transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.04]"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              data-hover
            >
              Get in touch
            </motion.button>
          </Link>

          <a
            href="https://github.com/ghoulraider13-rgb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="flex items-center gap-2 px-5 py-3.5 border border-white/[0.08] hover:border-accent/30 text-mist hover:text-pure text-sm font-medium rounded-xl transition-all duration-300 bg-white/[0.02]"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              data-hover
            >
              <GithubIcon size={16} />
              GitHub
              <ExternalLink size={12} className="text-ash" />
            </motion.button>
          </a>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-20 flex items-center gap-4 text-ash text-xs font-mono"
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-accent/40 to-transparent" />
          <span>Bengaluru, Karnataka — {new Date().getFullYear()}</span>
        </motion.div>
      </div>
    </div>
  );
}
