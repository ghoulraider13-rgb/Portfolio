import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
  Interactive Terminal — simulates a hacker/dev terminal with typewriter effect.
  Can be toggled with a keyboard shortcut (Ctrl/Cmd + Shift + T).
*/

const TERMINAL_LINES = [
  { text: 'ashwin@portfolio:~$ whoami', delay: 300, type: 'command' },
  { text: 'ashwin lahkar — full-stack & ai/ml developer', delay: 200, type: 'output' },
  { text: 'ashwin@portfolio:~$ cat projects.json', delay: 300, type: 'command' },
  { text: '[{ "name": "FloTask", "type": "AI Productivity", "stack": "React/Tauri/Gemini" },', delay: 150, type: 'output' },
  { text: ' { "name": "Actis", "type": "Filesystem Ledger", "stack": "Node/TypeScript/SQLite" },', delay: 150, type: 'output' },
  { text: ' { "name": "Disaster Detection Drone", "type": "Edge CV", "stack": "YOLOv11/ONNX/TensorRT" },', delay: 150, type: 'output' },
  { text: ' { "name": "Sahayak", "type": "Privacy Browser Agent", "stack": "Chrome MV3/FastAPI" }]', delay: 150, type: 'output' },
  { text: 'ashwin@portfolio:~$ grep -r "passion" .', delay: 300, type: 'command' },
  { text: './brain:building intelligent production-grade apps', delay: 200, type: 'output' },
  { text: './heart:constantly learning and innovating', delay: 200, type: 'output' },
  { text: './terminal:>_ ready for input', delay: 200, type: 'output' },
];

const AVAILABLE_COMMANDS = [
  'help', 'about', 'projects', 'skills', 'contact', 'github', 'linkedin', 
  'clear', 'neofetch', 'sudo make me a sandwich', 'whoami', 'uptime'
];

function Terminal({ isOpen, onClose, onCommand }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(c => !c), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      // Initialize with startup sequence
      if (lines.length === 0) {
        runStartupSequence();
      }
    }
  }, [isOpen]);

  // Unmount entirely when closed (must come AFTER all hooks — conditional return)
  if (!isOpen) return null;

  const runStartupSequence = async () => {
    isAnimatingRef.current = true;
    for (let i = 0; i < TERMINAL_LINES.length; i++) {
      const line = TERMINAL_LINES[i];
      await new Promise(r => setTimeout(r, line.delay));
      setLines(prev => [...prev, { ...line, id: Date.now() + i }]);
    }
    isAnimatingRef.current = false;
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        executeCommand(input.trim());
        setHistory(prev => [...prev, input.trim()]);
        setHistoryIndex(-1);
        setInput('');
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (history.length > 0 && historyIndex < history.length - 1) {
          setHistoryIndex(prev => prev + 1);
          setInput(history[history.length - 1 - historyIndex - 1] || '');
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex > 0) {
          setHistoryIndex(prev => prev - 1);
          setInput(history[history.length - historyIndex] || '');
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
        }
        break;
      case 'Tab':
        e.preventDefault();
        autocomplete(input);
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const autocomplete = (currentInput) => {
    const matches = AVAILABLE_COMMANDS.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
    if (matches.length === 1) {
      setInput(matches[0]);
    } else if (matches.length > 1) {
      // Show matches
      setLines(prev => [...prev, {
        id: Date.now(),
        text: matches.join('  '),
        type: 'output'
      }]);
    }
  };

  const executeCommand = (cmd) => {
    if (!cmd) return;
    
    setLines(prev => [...prev, { id: Date.now(), text: `ashwin@portfolio:~$ ${cmd}`, type: 'command' }]);
    
    const lowerCmd = cmd.toLowerCase();
    
    const responses = {
      'help': [
        'Available commands:',
        '  about        - Show bio',
        '  projects     - List projects',
        '  skills       - Show tech stack',
        '  contact      - Contact info',
        '  github       - Open GitHub',
        '  linkedin     - Open LinkedIn',
        '  neofetch     - System info',
        '  clear        - Clear terminal',
        '  sudo make me a sandwich - ;)',
        '  exit         - Close terminal'
      ],
      'about': [
        'ashwin lahkar',
        'B.Tech CSE (AI-Driven DevOps) @ Jain University',
        'Full-Stack & AI/ML Developer',
        'Building intelligent, production-grade applications',
        'Specializing in: React, Python, Edge AI, Browser Extensions'
      ],
      'projects': [
        '🚀 FloTask — AI Productivity Dashboard (React, Tauri, Gemini)',
        '📊 Actis — Filesystem Activity Ledger (Node, TypeScript, SQLite)',
        '🚁 Disaster Detection Drone — Edge CV for UAV SAR (YOLOv11, TensorRT)',
        '🔒 Sahayak — Privacy-Preserving Browser Agent (Chrome MV3, FastAPI)',
        '🧬 Evolutionary Feature Selector — GA for ML Optimization',
        '🎮 This Portfolio — Interactive Terminal + Neural Canvas'
      ],
      'skills': [
        'Languages: Python, TypeScript, JavaScript, Java, C, Rust',
        'AI/ML: PyTorch, TensorFlow, YOLO, ONNX, TensorRT, Genetic Algorithms',
        'Web: React, Next.js, Tailwind, Framer Motion, Tauri, Capacitor',
        'DevOps: Docker, GitHub Actions, Linux, Cloudflare, Tailscale',
        'Tools: VS Code, Git, Jupyter, Roboflow, Hermes Agent'
      ],
      'contact': [
        '📧 ashwinlahkar@gmail.com',
        '💼 linkedin.com/in/ashwin-lahkar-08a9ab405',
        '🐙 github.com/ghoulraider13-rgb',
        '📍 Bengaluru, Karnataka, India'
      ],
      'github': ['Opening GitHub...', { action: 'github' }],
      'linkedin': ['Opening LinkedIn...', { action: 'linkedin' }],
      'neofetch': [
        '            .-/+oossssoo+/-.            ashwin@portfolio',
        '        `:+ssssssssssssssssss+:`,        OS: Linux x86_64',
        '      -+ssssssssssssssssssyyssss+-      Host: Portfolio v2.0',
        '     .ossssssssssssssssssdMMMNysssso.   Kernel: Creativity 5.15+',
        '    /ssssssssssshdmmNNmmyNMMMMhssssss/  Uptime: 2+ years coding',
        '   +ssssssssshmydMMMMMMMNddddyssssssss+ Packages: 50+',
        '  /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/ Shell: zsh + starship',
        '  .sssssssdMMMNhsssssssssshNMMMdssssssss. Resolution: 1920x1080',
        '   +sssshhhyNMMNyssssssssssssyNMMMysssss+ DE: Custom React + Canvas',
        '   .ossssssdMMMNhsssssssssssssdMMMhssssso. WM: Framer Motion',
        '    /sssssssdMMMNhsssssssssssssdMMMhsssss/ Theme: Tech-Noir Violet',
        '     .osssssssdMMMNhsssssssssssssdMMMhssssso. Icons: Lucide React',
        '      -+ssssssssshdmNNNNNNNNNNmdssssss+-  Terminal: Custom WebGL',
        '        `:+ssssssssssssssssss+:`,        CPU: Passion (OC)',
        '            `.-/+oossssoo+/-.`           GPU: Creativity RTX',
        '                                           RAM: Infinite Curiosity'
      ],
      'clear': [{ type: 'clear' }],
      'sudo make me a sandwich': ['Okay. Here\'s your sandwich 🥪', 'Permission granted. You are now a sandwich administrator.'],
      'whoami': ['ashwin lahkar — full-stack & ai/ml developer', 'B.Tech CSE (AI-Driven DevOps) @ Jain University'],
      'uptime': ['up 2 years, 47 projects, countless commits', 'load average: 0.15 (learning) 0.42 (building) 0.89 (shipping)'],
      'exit': ['Closing terminal...', { action: 'close' }]
    };

    const response = responses[lowerCmd] || [
      `Command not found: ${cmd}`,
      'Type "help" for available commands.'
    ];

    let delay = 100;
    for (const line of response) {
      if (typeof line === 'object' && line.action) {
        setTimeout(() => {
          if (line.action === 'github') window.open('https://github.com/ghoulraider13-rgb', '_blank');
          else if (line.action === 'linkedin') window.open('https://linkedin.com/in/ashwin-lahkar-08a9ab405', '_blank');
          else if (line.action === 'close') onClose();
        }, delay);
      } else if (line.type === 'clear') {
        setTimeout(() => setLines([]), delay);
      } else {
        setTimeout(() => {
          setLines(prev => [...prev, { id: Date.now() + Math.random(), text: line, type: 'output' }]);
        }, delay);
      }
      delay += 80;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="terminal-glass fixed bottom-6 right-6 z-[99] w-full max-w-2xl max-h-[65vh] flex flex-col"
      style={{ width: '700px', minWidth: '320px' }}
      role="dialog"
      aria-label="Interactive Terminal"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger" />
            <div className="w-3 h-3 rounded-full bg-warning" />
            <div className="w-3 h-3 rounded-full bg-success" />
          </div>
          <span className="text-ash text-xs font-terminal ml-2">terminal.ashwin.dev</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-ash text-xs font-terminal">Ctrl+Shift+T to toggle</span>
          <button
            onClick={onClose}
            className="p-1.5 text-ash hover:text-danger transition-colors rounded"
            aria-label="Close terminal"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Output */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto font-terminal text-sm leading-relaxed text-snow"
        style={{ fontSize: '13px', lineHeight: '1.7' }}
      >
        {lines.map((line, i) => (
          <div key={line.id} className={`terminal-line ${line.type}`} style={{ 
            color: line.type === 'command' ? '#00e5ff' : line.type === 'error' ? '#ff4757' : 'inherit',
            opacity: isAnimatingRef.current && i >= lines.length - 3 ? 0.7 : 1
          }}>
            <span className="text-accent-bright mr-2">›</span>
            {line.text.split('\n').map((t, ti) => (
              <span key={ti}>{ti > 0 && <br />}{t}</span>
            ))}
          </div>
        ))}
        <div className="h-4" />
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
        <span className="text-accent font-terminal shrink-0">ashwin@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-snow font-terminal text-sm"
          placeholder="Type 'help' for commands..."
          spellCheck={false}
          autoComplete="off"
        />
        <span className={`text-accent font-terminal ${cursorVisible ? 'blink' : 'invisible'}`}>_</span>
      </div>

      <style jsx>{`
        .terminal-line { padding: 1px 0; word-break: break-word; }
        .terminal-line.command { color: #00e5ff; }
        .blink { animation: blink 1.06s infinite; }
        .invisible { opacity: 0; }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        input::placeholder { color: var(--color-ash); opacity: 0.5; }
      `}</style>
    </motion.div>
  );
}

export default memo(Terminal);