import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Code, Award, Zap, Heart } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import BinaryRain from '../components/BinaryRain';

const COURSEWORK = ['DSA', 'OOP', 'DBMS', 'Machine Learning', 'Computer Networks', 'OS', 'Compiler Design'];

const ACHIEVEMENTS = [
  { icon: Award, label: 'SIH 2026 Finalist', desc: 'ISRO PS 26171 - Team Sahayak', color: 'text-accent-bright' },
  { icon: Zap, label: 'npm Publisher', desc: 'Published `actis` package', color: 'text-success' },
  { icon: Code, label: 'Hermes Contributor', desc: '20+ skills for AI agents', color: 'text-electric' },
  { icon: Heart, label: 'Open Source', desc: '12+ projects on GitHub', color: 'text-danger' },
];

function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedAchievement, setExpandedAchievement] = useState(null);

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
              className="glass-card h-full relative group"
              onMouseEnter={() => setHoveredCard('bio')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <BinaryRain active={hoveredCard === 'bio'} />
              <div className="relative z-10">
                <h3 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Biography
                </h3>
                <p className="text-snow text-[15px] leading-[1.85] mb-8">
                  Hey, I'm Ashwin Lahkar a 2nd year CSE Undergrad specializing in the fields of artificial intelligence, machine learning and fullstack web development. I'm currently learning about NLM and it's integration into software I'm passionate about learning new things and expanding my repertoire
                </p>
                
                {/* Quick facts */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-accent/20 transition-colors">
                    <Code className="text-accent-bright text-xl" />
                    <div>
                      <p className="text-ash text-xs font-mono uppercase tracking-wider">Focus</p>
                      <p className="text-pure font-medium">AI/ML & Full-Stack</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-accent/20 transition-colors">
                    <Zap className="text-electric text-xl" />
                    <div>
                      <p className="text-ash text-xs font-mono uppercase tracking-wider">Style</p>
                      <p className="text-pure font-medium">Clean, Performant, Delightful</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-accent/20 transition-colors">
                    <Heart className="text-danger text-xl" />
                    <div>
                      <p className="text-ash text-xs font-mono uppercase tracking-wider">Motto</p>
                      <p className="text-pure font-medium">constantly learning & innovating</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-accent/20 transition-colors">
                    <Award className="text-warning text-xl" />
                    <div>
                      <p className="text-ash text-xs font-mono uppercase tracking-wider">Achievement</p>
                      <p className="text-pure font-medium">SIH 2026 Finalist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Education & Achievements */}
          <RevealOnScroll delay={0.2}>
            <div 
              className="glass-card h-full relative"
              onMouseEnter={() => setHoveredCard('edu')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <BinaryRain active={hoveredCard === 'edu'} />
              <div className="relative z-10">
                <h3 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-8 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Education
                </h3>

                <div className="flex items-start gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h4 className="text-pure font-semibold text-[16px]">Jain University</h4>
                    <p className="text-accent-bright text-sm font-medium mt-2">B.Tech in CSE — AI Driven DevOps</p>
                    <p className="text-snow text-xs mt-2">
                      <span className="glow-text font-medium">2024 – 2028</span>
                      <span className="text-ash mx-2">•</span>
                      <span className="glow-text font-medium">Year 2 (4th Semester)</span>
                    </p>
                    <p className="text-ash text-xs font-mono mt-2">Bengaluru, Karnataka</p>
                  </div>
                </div>

                <div className="w-full h-8 block" aria-hidden="true"></div>
                <div className="flex items-start gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h4 className="text-pure font-semibold text-sm mb-3">Key Coursework</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {COURSEWORK.map((c) => (
                        <span key={c} className="px-4 py-2 text-[12px] font-mono text-snow glow-text border border-white/[0.06] rounded-xl bg-white/[0.02] glow-pill group">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="pt-6 border-t border-white/[0.06]">
                  <h4 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning" /> Unlocked Achievements
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {ACHIEVEMENTS.map((ach, i) => (
                      <motion.button
                        key={ach.label}
                        onClick={() => setExpandedAchievement(expandedAchievement === i ? null : i)}
                        className={`relative p-4 rounded-xl text-left transition-all duration-300 group ${
                          expandedAchievement === i
                            ? 'bg-accent/10 border-accent/20'
                            : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.05] hover:border-accent/20'
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        data-hover
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <ach.icon className={`text-xl ${ach.color}`} />
                          <span className="text-pure font-medium text-sm">{ach.label}</span>
                        </div>
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: expandedAchievement === i ? 'auto' : 0, opacity: expandedAchievement === i ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-ash text-xs mt-2 overflow-hidden"
                        >
                          {ach.desc}
                        </motion.p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutSection);