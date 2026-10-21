import { useEffect, useRef, memo } from 'react';

/*
  Particle Burst — creates a burst of particles at click position.
  Used for satisfying click feedback throughout the site.
*/

function ParticleBurst({ isActive, position, color = '#7c4dff', count = 12, onComplete }) {
  const particlesRef = useRef([]);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isActive || !position) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio, 2);
    
    // Size canvas to viewport
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Create particles
    particlesRef.current = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 3 + Math.random() * 5;
      const size = 3 + Math.random() * 4;
      const life = 1;
      
      return {
        x: position.x,
        y: position.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        life,
        decay: 0.015 + Math.random() * 0.01,
        hue: color === '#7c4dff' ? 270 + Math.random() * 60 : 190 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      };
    });

    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      let aliveCount = 0;
      
      for (const p of particlesRef.current) {
        if (p.life <= 0) continue;
        aliveCount++;
        
        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.vx *= 0.985; // air resistance
        p.vy *= 0.985;
        p.life -= p.decay;
        p.rotation += p.rotationSpeed;
        p.size *= 0.99;
        
        // Draw
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.life);
        
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 65%, 1)`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`);
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        // Draw as small squares (pixel style)
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        
        // Add glow
        ctx.shadowColor = `hsla(${p.hue}, 80%, 65%, ${p.life})`;
        ctx.shadowBlur = 8;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        
        ctx.restore();
      }
      
      if (aliveCount > 0) {
        raf = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };
    
    raf = requestAnimationFrame(animate);
    rafRef.current = raf;
    
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, position, count, color, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
}

export default memo(ParticleBurst);