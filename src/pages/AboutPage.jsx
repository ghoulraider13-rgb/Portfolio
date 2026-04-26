import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import RevealOnScroll from '../components/RevealOnScroll';

const COURSEWORK = ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management Systems', 'Machine Learning'];

const CONNECT = [
  { icon: Mail, label: 'ghoul.raider13@gmail.com', href: 'mailto:ghoul.raider13@gmail.com' },
  { icon: Phone, label: '+91 7750 60894', href: 'tel:+917750608944' },
  { icon: GithubIcon, label: 'ghoulraider13-rgb', href: 'https://github.com/ghoulraider13-rgb' },
  { icon: MapPin, label: 'Bengaluru, Karnataka', href: null },
];

export default function AboutPage() {
  return (
    <div className="page-content min-h-screen px-6 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">About</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-12">
            Know more about me
          </h1>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* BIOGRAPHY */}
          <RevealOnScroll delay={0.1}>
            <div className="glass-card p-7 h-full">
              <h2 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Biography
              </h2>
              <div className="space-y-4 text-mist text-[14px] leading-relaxed">
                <p>
                  I'm a <span className="text-pure font-medium">Full-Stack & AI Developer</span>{' '}
                  passionate about building intelligent, production-grade systems. My work sits at
                  the intersection of modern web development and artificial intelligence.
                </p>
                <p>
                  I specialize in crafting clean, performant interfaces and integrating LLM-powered
                  backends — from NLP engines to smart automation pipelines. My design philosophy
                  follows the <span className="text-pure font-medium">"Nothing"</span> school:
                  minimal, intentional, and distraction-free.
                </p>
                <p>
                  Currently exploring advanced DevOps workflows, Gemini LLM integration patterns,
                  and building developer tools that enhance productivity through AI.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* EDUCATION */}
          <RevealOnScroll delay={0.2}>
            <div className="glass-card p-7 h-full">
              <h2 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Education
              </h2>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-2.5 rounded-lg bg-accent/10 text-accent mt-0.5 shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-pure font-semibold text-[15px]">Jain University</h3>
                  <p className="text-accent text-sm font-medium mt-0.5">B.Tech in CSE — AI Driven DevOps</p>
                  <p className="text-ash text-xs font-mono mt-1">4th Semester (Year 2) • Bengaluru, Karnataka</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-accent/10 text-accent mt-0.5 shrink-0">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-pure font-semibold text-sm mb-3">Key Coursework</h3>
                  <div className="flex flex-wrap gap-2">
                    {COURSEWORK.map((c) => (
                      <span key={c} className="px-3 py-1.5 text-[11px] font-mono text-mist bg-white/[0.03] border border-white/[0.06] rounded-lg">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* CONNECT - spans full width */}
          <RevealOnScroll delay={0.3} className="lg:col-span-2">
            <div className="glass-card p-7">
              <h2 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Connect
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CONNECT.map(({ icon: Icon, label, href }) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-accent/20 transition-all duration-300"
                    whileHover={{ y: -2 }}
                    data-hover
                  >
                    <Icon size={16} className="text-accent shrink-0" />
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-chalk text-sm hover:text-accent transition-colors truncate"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-chalk text-sm truncate">{label}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
