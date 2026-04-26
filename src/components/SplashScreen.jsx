import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ visible, exiting, onEnter }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at center, rgba(15,23,42,0.95), rgba(8,12,24,0.98))' }}
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: exiting ? 1.0 : 0.3, delay: exiting ? 1.4 : 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: exiting ? 0 : 1, y: exiting ? -20 : 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center relative z-10"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="h-[2px] bg-gradient-to-r from-accent to-accent-bright mx-auto mb-8"
            />

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-pure leading-none mb-3 serif">
              Ashwin
              <br />
              <span className="gradient-text">Lahkar</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-mist text-sm sm:text-base font-light tracking-[0.18em] uppercase mt-5 mb-12"
            >
              AI-Driven DevOps &amp; Full-Stack Developer
            </motion.p>

            {!exiting && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                onClick={onEnter}
                className="group relative h-14 w-[220px] rounded-xl text-sm font-semibold text-pure overflow-hidden"
                data-hover
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-dim via-accent to-accent-bright opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="absolute inset-0 flex items-center justify-center gap-3 z-10">
                  Explore my page
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 0 : 0.25 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-8 text-xs font-mono text-ash tracking-wider"
          >
            PORTFOLIO • 2026
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
