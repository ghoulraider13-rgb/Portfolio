import { memo, useState } from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import BinaryRain from '../components/BinaryRain';

const COURSEWORK = ['DSA', 'OOP', 'DBMS', 'Machine Learning'];

function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">About</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-16 serif">Know more about me</h2>
        </RevealOnScroll>
        <div className="w-full h-4 block" aria-hidden="true"></div>
        <div className="grid lg:grid-cols-2 gap-7">
          {/* Biography */}
          <RevealOnScroll delay={0.1}>
            <div 
              className="glass-card h-full relative"
              onMouseEnter={() => setHoveredCard('bio')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <BinaryRain active={hoveredCard === 'bio'} />
              <div className="relative z-10">
                <h3 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Biography
                </h3>
                <p className="text-snow text-[15px] leading-[1.85]">
                  Hey, I'm Ashwin Lahkar a 2nd year CSE Undergrad specializing in the fields of artificial intelligence, machine learning and fullstack web development. I'm currently learning about NLM and it's integration into software I'm passionate about learning new things and expanding my repertoire
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Education */}
          <RevealOnScroll delay={0.2}>
            <div 
              className="glass-card h-full relative"
              onMouseEnter={() => setHoveredCard('edu')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <BinaryRain active={hoveredCard === 'edu'} />
              <div className="relative z-10">
                <h3 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-12 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Education
                </h3>

                <div className="flex items-start gap-4 mb-12"> {/* INCREASED: Changed mb-7 to mb-12 for a much larger gap */}
                  <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h4 className="text-pure font-semibold text-[16px]">Jain University</h4>
                    {/* INCREASED: Slightly bumped mt-1 to mt-1.5 and mt-2 to mt-2.5 to let the text breathe */}
                    <p className="text-accent-bright text-sm font-medium mt-1.5">B.Tech in CSE — AI Driven DevOps</p>
                    <p className="text-snow text-xs mt-2.5">
                      <span className="glow-text font-medium">2024 – 2028</span>
                      <span className="text-ash mx-2">•</span>
                      <span className="glow-text font-medium">4th Semester (Year 2)</span>
                    </p>
                    <p className="text-ash text-xs font-mono mt-2">Bengaluru, Karnataka</p>
                  </div>
                </div>
                <div className="w-full h-10 block" aria-hidden="true"></div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h4 className="text-pure font-semibold text-sm mb-3">Key Coursework</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {COURSEWORK.map((c) => (
                        <span key={c} className="px-4 py-2 text-[12px] font-mono text-snow glow-text border border-white/[0.06] rounded-xl bg-white/[0.02] glow-pill">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section >
  );
}

export default memo(AboutSection);
