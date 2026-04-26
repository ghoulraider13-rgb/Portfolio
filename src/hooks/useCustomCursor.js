import { useRef, useEffect, useCallback, useState } from 'react';

/*
  Custom cursor — central dot + lagging geometric ring.
  Uses RAF for smooth interpolation. Ring lags behind dot via lerp.
  MutationObserver watches for new interactive elements.
*/

export default function useCustomCursor() {
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [dotXY, setDotXY] = useState({ x: -100, y: -100 });
  const [ringXY, setRingXY] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const raf = useRef(null);

  const onMove = useCallback((e) => {
    pos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      // Dot snaps to cursor
      setDotXY({ x: pos.current.x, y: pos.current.y });
      // Ring lerps
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.14;
      setRingXY({ x: ringPos.current.x, y: ringPos.current.y });
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    // Hover detection
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    const bind = () => {
      document.querySelectorAll('a, button, [data-hover], input, textarea').forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    };
    bind();

    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      obs.disconnect();
    };
  }, [onMove]);

  return { dotXY, ringXY, hovering };
}
