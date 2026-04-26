import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, FileText } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';

function HomeSection({ onOpenResume }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="section min-h-screen flex items-center">
      <div className="section-inner w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-pure leading-[1.08] serif"
        >
          Hi! I'm
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6 serif"
        >
          <span className="gradient-text">ASHWIN LAHKAR</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-snow text-base sm:text-lg font-light max-w-xl mb-12 leading-relaxed"
        >
          B.TECH in CSE <span className="text-accent-bright font-medium glow-text">(AI Driven DevOps)</span> student at{' '}
          <span className="text-pure font-medium">Jain University</span>, building intelligent, production-grade applications.
        </motion.p>
        <div className="w-full h-6 block" aria-hidden="true"></div>
        {/* Buttons — row aligned, balanced padding, strict centering */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex flex-row flex-wrap items-center gap-4"
        >
          <motion.button
            onClick={onOpenResume}
            className="resume-btn-cyber flex items-center justify-center gap-3 px-8 py-3 text-accent-bright text-sm font-bold uppercase tracking-widest rounded-xl transition-all"
            data-hover
          >
            <FileText size={18} /> View Resume
          </motion.button>

          <motion.button
            onClick={() => scrollTo('work')}
            className="flex items-center justify-center gap-3 !pl-8 !pr-6 py-3 bg-accent hover:bg-accent-bright text-pure text-sm font-semibold rounded-xl transition-colors"
            data-hover
          >
            View my work <ArrowRight size={16} />
          </motion.button>

          <motion.button
            onClick={() => scrollTo('contact')}
            className="flex items-center justify-center gap-2 px-8 py-3 border border-white/[0.1] hover:border-accent/30 text-snow text-sm font-semibold rounded-xl transition-colors bg-white/[0.03]"
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            data-hover
          >
            Get in touch
          </motion.button>

          <a href="https://github.com/ghoulraider13-rgb" target="_blank" rel="noopener noreferrer">
            <motion.span
              className="flex items-center justify-center gap-2.5 px-8 py-3 border border-white/[0.1] hover:border-accent/30 text-mist hover:text-pure text-sm font-medium rounded-xl transition-colors bg-white/[0.03]"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              data-hover
            >
              <GithubIcon size={16} /> GitHub <ExternalLink size={12} className="text-ash" />
            </motion.span>
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.7 }} className="mt-16 flex items-center gap-4 text-ash text-xs font-mono">
          <div className="w-12 h-[1px] bg-gradient-to-r from-accent/40 to-transparent" />
          Bengaluru, Karnataka — {new Date().getFullYear()}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(HomeSection);
