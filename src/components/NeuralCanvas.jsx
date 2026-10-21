import { useRef, useEffect, useCallback, memo } from 'react';

/*
  Neural-Network Canvas — enhanced with multiple layers, particle trails, 
  and deeper mouse interaction.
*/

const NODE_COUNT = 90;
const CONNECT_DIST = 140;
const MOUSE_RADIUS = 200;
const GRID_SIZE = 160;
const TRAIL_LENGTH = 8;

// Brain silhouette points (normalised 0-1)
const BRAIN_PTS = (() => {
  const pts = [];
  for (let i = 0; i < 22; i++) {
    const a = Math.PI * 0.12 + (Math.PI * 0.88) * (i / 21);
    pts.push({ x: 0.5 - Math.cos(a) * 0.2 - 0.01, y: 0.5 - Math.sin(a) * 0.24 + 0.01 });
  }
  for (let i = 0; i < 22; i++) {
    const a = Math.PI * 0.12 + (Math.PI * 0.88) * (i / 21);
    pts.push({ x: 0.5 + Math.cos(a) * 0.2 + 0.01, y: 0.5 - Math.sin(a) * 0.24 + 0.01 });
  }
  for (let i = 0; i < 8; i++) pts.push({ x: 0.5 + (Math.random() - 0.5) * 0.08, y: 0.65 + i * 0.02 });
  for (let i = 0; i < 24; i++) {
    const a = Math.random() * Math.PI * 2, r = Math.random() * 0.16;
    pts.push({ x: 0.5 + Math.cos(a) * r, y: 0.5 + Math.sin(a) * r * 0.8 });
  }
  return pts;
})();

function makeNodes(w, h) {
  return Array.from({ length: NODE_COUNT }, (_, i) => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 2 + 1,
    tx: BRAIN_PTS[i % BRAIN_PTS.length].x * w,
    ty: BRAIN_PTS[i % BRAIN_PTS.length].y * h,
    trail: [],
    hue: Math.random() * 60 + 260, // Purple to blue range
    type: Math.random() < 0.15 ? 'core' : 'normal', // 15% core nodes
  }));
}

function buildGrid(nodes, cellSize) {
  const grid = {};
  for (let i = 0; i < nodes.length; i++) {
    const cx = Math.floor(nodes[i].x / cellSize);
    const cy = Math.floor(nodes[i].y / cellSize);
    const key = `${cx},${cy}`;
    (grid[key] ||= []).push(i);
  }
  return grid;
}

function lerp(a, b, t) { return a + (b - a) * t; }

function NeuralCanvas({ phase = 'idle', gamerMode = false }) {
  const ref = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const phaseRef = useRef(phase);
  const gamerRef = useRef(gamerMode);
  const clickPulseRef = useRef({ x: -9999, y: -9999, radius: 0, active: false });
  const timeRef = useRef(0);

  phaseRef.current = phase;
  gamerRef.current = gamerMode;

  const onMove = useCallback((e) => { 
    mouseRef.current = { x: e.clientX, y: e.clientY }; 
  }, []);

  const onClick = useCallback((e) => {
    clickPulseRef.current = { 
      x: e.clientX, 
      y: e.clientY, 
      radius: 0, 
      active: true,
      maxRadius: 300
    };
  }, []);

  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    let w = (c.width = document.documentElement.clientWidth), 
        h = (c.height = document.documentElement.clientHeight);
    
    const dpr = Math.min(window.devicePixelRatio, 2);
    c.width = w * dpr;
    c.height = h * dpr;
    c.style.width = w + 'px';
    c.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    nodesRef.current = makeNodes(w, h);

    const onResize = () => {
      w = document.documentElement.clientWidth; 
      h = document.documentElement.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      ctx.scale(dpr, dpr);
      
      nodesRef.current.forEach((n, i) => {
        n.tx = BRAIN_PTS[i % BRAIN_PTS.length].x * w;
        n.ty = BRAIN_PTS[i % BRAIN_PTS.length].y * h;
      });
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const p = phaseRef.current;
      const gamer = gamerRef.current;
      timeRef.current += 1/60;

      // Update positions
      for (const n of nodes) {
        // Add current position to trail
        n.trail.unshift({ x: n.x, y: n.y });
        if (n.trail.length > TRAIL_LENGTH) n.trail.pop();

        if (p === 'converge') {
          n.x += (n.tx - n.x) * 0.07;
          n.y += (n.ty - n.y) * 0.07;
        } else if (p === 'disperse') {
          n.vx = lerp(n.vx, (Math.random() - 0.5) * 2.2, 0.1);
          n.vy = lerp(n.vy, (Math.random() - 0.5) * 2.2, 0.1);
          n.x += n.vx; n.y += n.vy;
          n.vx *= 0.94; n.vy *= 0.94;
        } else {
          // Idle: gentle drift with mouse attraction
          n.x += n.vx; n.y += n.vy;
          
          const dx = mx - n.x, dy = my - n.y;
          const distSq = dx * dx + dy * dy;
          const mouseRadSq = MOUSE_RADIUS * MOUSE_RADIUS;
          
          if (distSq < mouseRadSq && distSq > 100) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / MOUSE_RADIUS) * 0.02;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
          
          // Boundary bounce with damping
          if (n.x < 50 || n.x > w - 50) { n.vx *= -0.7; n.x = Math.max(50, Math.min(w - 50, n.x)); }
          if (n.y < 50 || n.y > h - 50) { n.vy *= -0.7; n.y = Math.max(50, Math.min(h - 50, n.y)); }
          
          // Gentle drift
          n.vx += (Math.random() - 0.5) * 0.02;
          n.vy += (Math.random() - 0.5) * 0.02;
          n.vx *= 0.995; n.vy *= 0.995;
        }
      }

      // Click pulse expansion
      if (clickPulseRef.current.active) {
        clickPulseRef.current.radius += 25;
        if (clickPulseRef.current.radius > clickPulseRef.current.maxRadius) {
          clickPulseRef.current.active = false;
        }
      }

      // Connections — spatial grid O(n·k)
      const cDist = p === 'converge' ? 240 : CONNECT_DIST;
      const cDistSq = cDist * cDist;
      const grid = buildGrid(nodes, GRID_SIZE);
      const drawn = new Set();

      for (let i = 0; i < nodes.length; i++) {
        const cx = Math.floor(nodes[i].x / GRID_SIZE);
        const cy = Math.floor(nodes[i].y / GRID_SIZE);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const cell = grid[`${cx + dx},${cy + dy}`];
            if (!cell) continue;
            for (const j of cell) {
              if (j <= i) continue;
              const k = `${i},${j}`;
              if (drawn.has(k)) continue;
              const ddx = nodes[i].x - nodes[j].x, ddy = nodes[i].y - nodes[j].y;
              const distSq = ddx * ddx + ddy * ddy;
              if (distSq < cDistSq) {
                drawn.add(k);
                const ratioSq = distSq / cDistSq;
                const isCore = nodes[i].type === 'core' || nodes[j].type === 'core';
                const baseAlpha = p === 'converge' ? 0.5 : 0.18;
                const alpha = (1 - ratioSq) * baseAlpha * (isCore ? 2 : 1);
                
                ctx.beginPath(); 
                ctx.moveTo(nodes[i].x, nodes[i].y); 
                ctx.lineTo(nodes[j].x, nodes[j].y);
                
                const hue = gamer ? 190 : nodes[i].hue;
                ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
                ctx.lineWidth = isCore ? 1.2 : 0.6;
                ctx.stroke();
              }
            }
          }
        }
      }

      // Mouse proximity glow (idle)
      if (p === 'idle') {
        const mouseRadSq = MOUSE_RADIUS * MOUSE_RADIUS;
        const subRadSq = (MOUSE_RADIUS * 0.7) * (MOUSE_RADIUS * 0.7);
        
        for (const n of nodes) {
          const dx = n.x - mx, dy = n.y - my, distSq = dx * dx + dy * dy;
          if (distSq < mouseRadSq) {
            const intSq = 1 - (distSq / mouseRadSq);
            
            // Draw line to cursor
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mx, my);
            ctx.strokeStyle = `hsla(${gamer ? 190 : 270}, 80%, 70%, ${intSq * 0.4})`;
            ctx.lineWidth = 0.6; ctx.stroke();

            const cx2 = Math.floor(n.x / GRID_SIZE), cy2 = Math.floor(n.y / GRID_SIZE);
            for (let ddx = -1; ddx <= 1; ddx++) {
              for (let ddy = -1; ddy <= 1; ddy++) {
                const cell = grid[`${cx2 + ddx},${cy2 + ddy}`];
                if (!cell) continue;
                for (const j of cell) {
                  const m = nodes[j];
                  if (m === n) continue;
                  const lx = n.x - m.x, ly = n.y - m.y, ldSq = lx * lx + ly * ly;
                  if (ldSq < subRadSq) {
                    const lRatioSq = ldSq / subRadSq;
                    ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y);
                    ctx.strokeStyle = `hsla(${gamer ? 190 : 270}, 80%, 70%, ${intSq * (1 - lRatioSq) * 0.5})`;
                    ctx.lineWidth = 0.6; ctx.stroke();
                  }
                }
              }
            }
            
            // Node glow
            const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18 * intSq);
            g.addColorStop(0, `hsla(${gamer ? 190 : 270}, 80%, 60%, ${intSq * 0.4})`);
            g.addColorStop(1, 'hsla(270, 80%, 60%, 0)');
            ctx.beginPath(); ctx.arc(n.x, n.y, 18 * intSq, 0, Math.PI * 2); 
            ctx.fillStyle = g; ctx.fill();
          }
        }
      }

      // Click pulse ring
      if (clickPulseRef.current.active) {
        const cp = clickPulseRef.current;
        const progress = cp.radius / cp.maxRadius;
        const alpha = (1 - progress) * 0.4;
        
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, cp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${gamer ? 190 : 270}, 80%, 70%, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner ring
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, cp.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${gamer ? 190 : 270}, 80%, 70%, ${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Brain glow during converge
      if (p === 'converge') {
        const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.3);
        g.addColorStop(0, `hsla(${gamer ? 190 : 270}, 60%, 50%, 0.15)`);
        g.addColorStop(1, 'hsla(270, 60%, 50%, 0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      }

      // Draw node trails
      for (const n of nodes) {
        if (n.trail.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(n.trail[0].x, n.trail[0].y);
        for (let t = 1; t < n.trail.length; t++) {
          ctx.lineTo(n.trail[t].x, n.trail[t].y);
        }
        const trailGrad = ctx.createLinearGradient(
          n.trail[0].x, n.trail[0].y,
          n.trail[n.trail.length - 1].x, n.trail[n.trail.length - 1].y
        );
        trailGrad.addColorStop(0, `hsla(${gamer ? 190 : n.hue}, 80%, 60%, 0.25)`);
        trailGrad.addColorStop(1, `hsla(${gamer ? 190 : n.hue}, 80%, 60%, 0)`);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = n.type === 'core' ? 2 : 1;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Draw nodes
      for (const n of nodes) {
        const dx = n.x - mx, dy = n.y - my, distSq = dx * dx + dy * dy;
        const near = distSq < MOUSE_RADIUS * MOUSE_RADIUS && p === 'idle';
        const isCore = n.type === 'core';
        const r = near ? n.r * 1.8 : n.r;
        const alpha = p === 'converge' ? 0.8 : near ? 0.9 : isCore ? 0.5 : 0.35;
        
        // Outer glow
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
        g.addColorStop(0, `hsla(${gamer ? 190 : n.hue}, 80%, 60%, ${alpha * 0.3})`);
        g.addColorStop(1, 'hsla(270, 80%, 60%, 0)');
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2); 
        ctx.fillStyle = g; ctx.fill();
        
        // Node body
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${gamer ? 190 : n.hue}, 80%, 60%, ${alpha})`;
        ctx.fill();
        
        // Core nodes get a pulsing ring
        if (isCore && p !== 'disperse') {
          const pulse = Math.sin(timeRef.current * 3) * 0.5 + 0.5;
          ctx.beginPath(); ctx.arc(n.x, n.y, r + 4 + pulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${gamer ? 190 : n.hue}, 80%, 70%, ${0.3 + pulse * 0.2})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Ambient floating particles
      if (p === 'idle' && Math.random() < 0.02) {
        nodes.push({
          x: Math.random() * w,
          y: h + 10,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.5 - Math.random() * 0.5,
          r: Math.random() * 1.5 + 0.5,
          tx: 0, ty: -100,
          trail: [],
          hue: gamer ? 190 : Math.random() * 60 + 260,
          type: 'particle',
          life: 1,
        });
        if (nodes.length > NODE_COUNT + 20) nodes.shift();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener('resize', onResize); 
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [onMove, onClick]);

  return <canvas ref={ref} id="neural-canvas" />;
}

export default memo(NeuralCanvas);