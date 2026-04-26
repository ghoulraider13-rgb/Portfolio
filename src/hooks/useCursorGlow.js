import { useState, useCallback, useRef, useEffect } from 'react';

/*
  Simplified cursor — just a soft radial glow that follows the pointer.
  No ring, no trailing. Pure position tracking via state.
*/

export default function useCursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });

  const onMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [onMove]);

  return pos;
}
