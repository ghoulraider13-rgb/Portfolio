import { useState, useEffect, useRef, useCallback, memo } from 'react';

/*
  BinaryRain — continuous Matrix-style 0/1 rain that falls inside a card.
  Activates on hover, deactivates on leave. Uses a spawn interval + CSS animation
  for performance (no per-frame JS). Each character is absolutely positioned
  within the card's overflow:hidden boundary.
*/

const COLUMN_COUNT = 14;
const SPAWN_INTERVAL_MS = 120;
const CHAR_LIFETIME_MS = 2800;

function BinaryRain({ active = false }) {
  const [chars, setChars] = useState([]);
  const intervalRef = useRef(null);
  const idCounter = useRef(0);

  const spawnWave = useCallback(() => {
    const columnsToFill = Math.floor(Math.random() * 4) + 2;
    const newChars = [];
    for (let i = 0; i < columnsToFill; i++) {
      const col = Math.floor(Math.random() * COLUMN_COUNT);
      const leftPct = (col / COLUMN_COUNT) * 100 + Math.random() * 4;
      newChars.push({
        id: idCounter.current++,
        char: Math.random() > 0.5 ? '1' : '0',
        left: leftPct,
        duration: 1.8 + Math.random() * 1.4,
        delay: Math.random() * 0.15,
      });
    }
    setChars((prev) => [...prev, ...newChars]);

    // Clean up old chars after their animation completes
    setTimeout(() => {
      setChars((prev) => prev.filter((c) => !newChars.some((n) => n.id === c.id)));
    }, CHAR_LIFETIME_MS);
  }, []);

  useEffect(() => {
    if (active) {
      // Immediate first wave
      spawnWave();
      intervalRef.current = setInterval(spawnWave, SPAWN_INTERVAL_MS);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [active, spawnWave]);

  if (chars.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {chars.map((c) => (
        <span
          key={c.id}
          className="binary-rain-char"
          style={{
            left: `${c.left}%`,
            top: 0,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            opacity: 0.15,
          }}
        >
          {c.char}
        </span>
      ))}
    </div>
  );
}

export default memo(BinaryRain);
