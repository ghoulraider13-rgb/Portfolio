import { motion } from 'framer-motion';
import RevealOnScroll from '../components/RevealOnScroll';

const CATEGORIES = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'C', level: 70 },
    ],
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Gemini LLM Integration', level: 85 },
      { name: 'NLP', level: 78 },
      { name: 'EDA', level: 75 },
      { name: 'Machine Learning', level: 76 },
    ],
  },
  {
    title: 'Web & Full-Stack',
    skills: [
      { name: 'React', level: 88 },
      { name: 'REST APIs', level: 82 },
      { name: 'HTML / CSS', level: 90 },
      { name: 'State Management', level: 80 },
    ],
  },
  {
    title: 'Tools & Environments',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'VS Code', level: 92 },
      { name: 'Jupyter', level: 85 },
      { name: 'Linux / CLI', level: 78 },
    ],
  },
];

function SkillBar({ name, level, delay }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-chalk font-medium">{name}</span>
        <span className="text-xs font-mono text-ash">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #4834d4, #6c5ce7, #a29bfe)' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="page-content min-h-screen px-6 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Expertise</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-4">Skills Matrix</h1>
          <p className="text-mist text-[15px] max-w-md mb-12">
            Technical proficiency organized across languages, AI/ML, web development, and tooling.
          </p>
        </RevealOnScroll>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, ci) => (
            <RevealOnScroll key={cat.title} delay={ci * 0.1}>
              <div className="glass-card p-6">
                <h3 className="text-xs font-mono text-accent uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {cat.title}
                </h3>
                <div className="space-y-5">
                  {cat.skills.map((skill, si) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={ci * 4 + si} />
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Quick Tags */}
        <RevealOnScroll delay={0.5}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {['Python','Java','C','JavaScript','React','NLP','EDA','Gemini LLM','REST APIs','Git','Jupyter','Machine Learning','DevOps','Full-Stack'].map((tag) => (
              <motion.span
                key={tag}
                className="px-4 py-2 text-[11px] font-mono text-mist border border-white/[0.06] rounded-full bg-white/[0.02] hover:border-accent/25 hover:text-accent transition-all duration-300"
                whileHover={{ scale: 1.06, y: -2 }}
                data-hover
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
