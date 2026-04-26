import { motion } from 'framer-motion';
import { Award, Cloud, BookOpen, Code } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

const TIMELINE = [
  {
    date: 'April 2026',
    title: 'AI-Powered Web Application',
    description: 'Engineered a full-stack NLM engine utilizing Google\'s Gemini AI with React frontend and "Nothing" design principles.',
    icon: Code,
    type: 'project',
  },
  {
    date: 'March 2026',
    title: 'Google Cloud Study Jam',
    description: 'Completed hands-on labs covering Google Cloud Platform core services, infrastructure, and deployment workflows.',
    icon: Cloud,
    type: 'certification',
  },
  {
    date: 'February 2026',
    title: 'Coursera — Operating Systems',
    description: 'Completed comprehensive coursework on OS fundamentals including process management, memory allocation, and file systems.',
    icon: BookOpen,
    type: 'certification',
  },
  {
    date: 'January 2026',
    title: 'Coursera — Data Structures in C',
    description: 'Mastered core data structures including linked lists, trees, graphs, and sorting algorithms implemented in C.',
    icon: BookOpen,
    type: 'certification',
  },
  {
    date: 'December 2025',
    title: 'Coursera — Crash Course on Python',
    description: 'Completed Google\'s Python crash course covering scripting, automation, and foundational programming concepts.',
    icon: BookOpen,
    type: 'certification',
  },
  {
    date: '2025 — Present',
    title: 'College Hackathon Participation',
    description: 'Active participant in multiple inter-college hackathons, building rapid prototypes and collaborating in cross-functional teams.',
    icon: Award,
    type: 'achievement',
  },
];

export default function JourneyPage() {
  return (
    <div className="page-content min-h-screen px-6 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Timeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-4">My Journey</h1>
          <p className="text-mist text-[15px] max-w-md mb-16">
            Certifications, achievements, and milestones that have shaped my development path.
          </p>
        </RevealOnScroll>

        {/* Timeline */}
        <div className="relative pl-10">
          {/* Vertical line */}
          <div className="timeline-line" />

          {TIMELINE.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="relative pb-12 last:pb-0">
                  {/* Dot */}
                  <div className="timeline-dot" />

                  {/* Card */}
                  <motion.div
                    className="glass-card p-6 ml-6"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Date & Type */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-accent">{item.date}</span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        item.type === 'project'
                          ? 'bg-accent/10 text-accent'
                          : item.type === 'certification'
                          ? 'bg-electric-dim text-electric'
                          : 'bg-success/10 text-success'
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-accent/10 text-accent mt-0.5 shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        <h3 className="text-pure font-semibold text-[15px] mb-2">{item.title}</h3>
                        <p className="text-mist text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </div>
  );
}
