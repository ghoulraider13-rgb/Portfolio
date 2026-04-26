import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Mail, Phone, MapPin, Award, Cloud, Code } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import RevealOnScroll from '../components/RevealOnScroll';

const COURSEWORK = ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management Systems', 'Machine Learning'];
const CONNECT = [
  { icon: Mail, label: 'ghoul.raider13@gmail.com', href: 'mailto:ghoul.raider13@gmail.com' },
  { icon: Phone, label: '+91 7750 60894', href: 'tel:+917750608944' },
  { icon: GithubIcon, label: 'ghoulraider13-rgb', href: 'https://github.com/ghoulraider13-rgb' },
  { icon: MapPin, label: 'Bengaluru, Karnataka', href: null },
];

const TIMELINE = [
  { date: 'April 2026', title: 'AI-Powered Web Application', desc: 'Full-stack NLM engine with Gemini AI and "Nothing" design principles.', icon: Code, type: 'project' },
  { date: 'March 2026', title: 'Google Cloud Study Jam', desc: 'Hands-on GCP labs covering core infrastructure and deployment.', icon: Cloud, type: 'certification' },
  { date: 'Feb 2026', title: 'Coursera — Operating Systems', desc: 'Process management, memory allocation, file systems.', icon: BookOpen, type: 'certification' },
  { date: 'Jan 2026', title: 'Coursera — DSA in C', desc: 'Core data structures and sorting algorithms in C.', icon: BookOpen, type: 'certification' },
  { date: 'Dec 2025', title: 'Coursera — Python', desc: 'Google\'s crash course on scripting and automation.', icon: BookOpen, type: 'certification' },
  { date: '2025–Present', title: 'Hackathon Participation', desc: 'Multiple inter-college hackathons with rapid prototyping.', icon: Award, type: 'achievement' },
];

export default function AboutJourneySection() {
  return (
    <>
      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="section-inner">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">About</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-10 serif">Know more about me</h2>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Biography */}
            <RevealOnScroll delay={0.1}>
              <div className="glass-card p-7 h-full">
                <h3 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Biography
                </h3>
                <div className="space-y-4 text-mist text-[14px] leading-relaxed">
                  <p>I'm a <span className="text-pure font-medium">Full-Stack & AI Developer</span> passionate about building intelligent, production-grade systems at the intersection of modern web development and artificial intelligence.</p>
                  <p>I specialize in crafting clean, performant interfaces and integrating LLM-powered backends. My design philosophy follows the <span className="text-pure font-medium">"Nothing"</span> school: minimal, intentional, and distraction-free.</p>
                  <p>Currently exploring advanced DevOps workflows, Gemini LLM integration, and developer tools enhanced through AI.</p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Education */}
            <RevealOnScroll delay={0.2}>
              <div className="glass-card p-7 h-full">
                <h3 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Education
                </h3>
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent shrink-0"><GraduationCap size={20} /></div>
                  <div>
                    <h4 className="text-pure font-semibold text-[15px]">Jain University</h4>
                    <p className="text-accent text-sm font-medium mt-0.5">B.Tech in CSE — AI Driven DevOps</p>
                    <p className="text-ash text-xs font-mono mt-1">4th Semester (Year 2) • Bengaluru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent shrink-0"><BookOpen size={20} /></div>
                  <div>
                    <h4 className="text-pure font-semibold text-sm mb-3">Key Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {COURSEWORK.map((c) => (
                        <span key={c} className="px-3 py-1.5 text-[11px] font-mono text-mist bg-white/[0.03] border border-white/[0.06] rounded-lg">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Connect */}
            <RevealOnScroll delay={0.3} className="lg:col-span-2">
              <div className="glass-card p-7">
                <h3 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Connect
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CONNECT.map(({ icon: Icon, label, href }) => (
                    <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-accent/15 transition-colors">
                      <Icon size={16} className="text-accent shrink-0" />
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-chalk text-sm hover:text-accent transition-colors truncate" data-hover>{label}</a>
                      ) : (
                        <span className="text-chalk text-sm truncate">{label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section id="journey" className="section">
        <div className="section-inner">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Timeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-4 serif">My Journey</h2>
            <p className="text-mist text-[15px] max-w-md mb-14">Certifications, achievements, and milestones along the way.</p>
          </RevealOnScroll>

          <div className="relative pl-10">
            <div className="tl-line" />
            {TIMELINE.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealOnScroll key={i} delay={i * 0.08}>
                  <div className="relative pb-10 last:pb-0">
                    <div className="tl-dot" />
                    <motion.div className="glass-card p-6 ml-6" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <span className="text-xs font-mono text-accent">{item.date}</span>
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          item.type === 'project' ? 'bg-accent/10 text-accent-bright' : item.type === 'certification' ? 'bg-electric/10 text-electric' : 'bg-success/10 text-success'
                        }`}>{item.type}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0"><Icon size={16} /></div>
                        <div>
                          <h4 className="text-pure font-semibold text-[15px] mb-1">{item.title}</h4>
                          <p className="text-mist text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
