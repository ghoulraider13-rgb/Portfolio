# Ashwin Lahkar — Portfolio

<div align="center">

**Live site → https://portfolio-zeta-hazel-yytj5qnx79.vercel.app/**

React 19 · Tailwind CSS 4 · Vite · framer-motion

</div>

A personal portfolio with a **"tech-noir" dark glassmorphism** design: interactive neural-network
canvas background, custom glow cursor, binary-rain skill cards, and a dual-pane resume viewer.

## ✨ Features

- **Interactive neural-network canvas** — nodes drift and connect into synapses around the cursor
- **Custom trailing glow cursor** (auto-disabled on touch devices)
- **Binary-rain skill cards** — hover a skill and it emits 0s and 1s
- **Dual-pane resume modal** — drag-and-drop a resume, live PDF/image preview, metadata pane
- **Responsive multi-section layout** — Home, About, Skills, Projects, Contact
- Built with React 19, Vite, Tailwind CSS 4, framer-motion, lucide-react icons, react-router-dom

## 🚀 Run locally

```bash
git clone https://github.com/ghoulraider13-rgb/Portfolio.git
cd Portfolio
npm install
npm run dev      # dev server with HMR
npm run build    # production build to dist/
```

## 🧱 Structure

```
├── index.html
├── src/
│   ├── App.jsx              # root, modal state
│   ├── components/          # BinaryRain, TopNav, ResumeModal, ...
│   ├── sections/            # Home, About, Skills, Projects, Contact
│   └── ...
└── vite.config.js
```

## 📄 Notes

- `implementation_plan.md` and `project-context.md` document the design system and UI roadmap.
- Deployed on Vercel.

---

© 2026 Ashwin Lahkar. Built with passion and code.
