import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import Projects from '../components/Projects';

function WorkSection() {
  return (
    <section id="work" className="section">
      <div className="section-inner">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-3 serif flex items-center gap-3">
            Project Hub <Sparkles size={20} className="text-accent" />
          </h2>
          <p className="text-mist text-[15px] mt-2 max-w-md mb-16">A curated selection of modern digital experiences.</p>
        </RevealOnScroll>
        <div className="w-full h-4 block" aria-hidden="true"></div>
        <Projects />
      </div>
    </section>
  );
}

export default memo(WorkSection);