import { motion, AnimatePresence } from 'framer-motion';

/*
  Achievement Toast — shows unlocked achievements with game-like styling.
*/

function AchievementToast({ message, icon = '🏆' }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.9 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="pointer-events-auto glass-card px-5 py-3.5 flex items-center gap-3.5 min-w-[280px] max-w-[360px]"
        style={{ boxShadow: '0 8px 40px rgba(124,77,255,0.2), 0 4px 20px rgba(0,0,0,0.4)' }}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6 }}
          className="text-2xl"
        >
          {icon}
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-accent-bright uppercase tracking-wider mb-0.5">Achievement Unlocked</p>
          <p className="text-pure font-medium text-sm truncate">{message}</p>
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-accent"
        >
          ⚡
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AchievementToast;