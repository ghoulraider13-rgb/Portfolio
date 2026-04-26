import { useRef, useEffect, useCallback, memo } from 'react';

/*
  Neural-Network Canvas — optimised.
  • Uses refs exclusively (no state in render loop).
  • Spatial grid avoids O(n²) connection checks.
  • Brain convergence retained via phase prop.
*/

const NODE_COUNT = 75;
const CONNECT_DIST = 125;
const MOUSE_RADIUS = 170;
const GRID_SIZE = 150; // spatial hash cell size

// Brain silhouette points (normalised 0-1)
const BRAIN_PTS = (() => {
  const pts = [];
  for (let i = 0; i < 18; i++) {
    const a = Math.PI * 0.15 + (Math.PI * 0.85) * (i / 17);
    pts.push({ x: 0.5 - Math.cos(a) * 0.18 - 0.02, y: 0.5 - Math.sin(a) * 0.22 + 0.02 });
  }
  for (let i = 0; i < 18; i++) {
    const a = Math.PI * 0.15 + (Math.PI * 0.85) * (i / 17);
    pts.push({ x: 0.5 + Math.cos(a) * 0.18 + 0.02, y: 0.5 - Math.sin(a) * 0.22 + 0.02 });
  }
  for (let i = 0; i < 6; i++) pts.push({ x: 0.5 + (Math.random() - 0.5) * 0.06, y: 0.62 + i * 0.025 });
  for (let i = 0; i < 18; i++) {
    const a = Math.random() * Math.PI * 2, r = Math.random() * 0.14;
    pts.push({ x: 0.5 + Math.cos(a) * r, y: 0.48 + Math.sin(a) * r * 0.85 });
  }
  return pts;
})();

function makeNodes(w, h) {
  return Array.from({ length: NODE_COUNT }, (_, i) => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
    r: Math.random() * 1.6 + 0.8,
    tx: BRAIN_PTS[i % BRAIN_PTS.length].x * w,
    ty: BRAIN_PTS[i % BRAIN_PTS.length].y * h,
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

function NeuralCanvas({ phase = 'idle' }) {
  const ref = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const onMove = useCallback((e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; }, []);

  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    let w = (c.width = document.documentElement.clientWidth), h = (c.height = document.documentElement.clientHeight);
    nodesRef.current = makeNodes(w, h);

    const onResize = () => {
      w = c.width = document.documentElement.clientWidth; h = c.height = document.documentElement.clientHeight;
      nodesRef.current.forEach((n, i) => {
        n.tx = BRAIN_PTS[i % BRAIN_PTS.length].x * w;
        n.ty = BRAIN_PTS[i % BRAIN_PTS.length].y * h;
      });
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const p = phaseRef.current;

      // Update positions
      for (const n of nodes) {
        if (p === 'converge') {
          n.x += (n.tx - n.x) * 0.06;
          n.y += (n.ty - n.y) * 0.06;
        } else if (p === 'disperse') {
          n.vx = (Math.random() - 0.5) * 1.8;
          n.vy = (Math.random() - 0.5) * 1.8;
          n.x += n.vx; n.y += n.vy;
          n.vx *= 0.96; n.vy *= 0.96;
        } else {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      // Connections — spatial grid O(n·k) instead of O(n²)
      const cDist = p === 'converge' ? 200 : CONNECT_DIST;
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
                const ratioSq = distSq / cDistSq; // quadratic falloff without sqrt
                ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(108,92,231,${(1 - ratioSq) * (p === 'converge' ? 0.5 : 0.2)})`;
                ctx.lineWidth = 0.8; ctx.stroke();
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
            ctx.strokeStyle = `rgba(162,155,254,${intSq * 0.35})`;
            ctx.lineWidth = 0.8; ctx.stroke();

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
                    ctx.strokeStyle = `rgba(162,155,254,${intSq * (1 - lRatioSq) * 0.4})`;
                    ctx.lineWidth = 0.8; ctx.stroke();
                  }
                }
              }
            }
            const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 12 * intSq);
            g.addColorStop(0, `rgba(108,92,231,${intSq * 0.35})`); g.addColorStop(1, 'rgba(108,92,231,0)');
            ctx.beginPath(); ctx.arc(n.x, n.y, 12 * intSq, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
          }
        }
      }

      // Brain glow
      if (p === 'converge') {
        const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.25);
        g.addColorStop(0, 'rgba(108,92,231,0.12)'); g.addColorStop(1, 'rgba(108,92,231,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      }

      // Draw nodes
      for (const n of nodes) {
        const dx = n.x - mx, dy = n.y - my, distSq = dx * dx + dy * dy;
        const near = distSq < MOUSE_RADIUS * MOUSE_RADIUS && p === 'idle';
        ctx.beginPath(); ctx.arc(n.x, n.y, near ? n.r * 1.5 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${near ? '162,155,254' : '108,92,231'},${p === 'converge' ? 0.6 : near ? 0.65 : 0.30})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); window.removeEventListener('mousemove', onMove); };
  }, [onMove]);

  return <canvas ref={ref} id="neural-canvas" />;
}

export default memo(NeuralCanvas);
