import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'C', level: 70 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React', level: 88 },
      { name: 'REST APIs', level: 82 },
      { name: 'NLP', level: 75 },
      { name: 'EDA', level: 72 },
    ],
  },
  {
    title: 'AI & ML',
    skills: [
      { name: 'Gemini LLM Integration', level: 85 },
      { name: 'Machine Learning', level: 78 },
      { name: 'NLP Processing', level: 76 },
      { name: 'Data Analysis', level: 80 },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Jupyter', level: 85 },
      { name: 'VS Code', level: 92 },
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
          style={{
            background: 'linear-gradient(90deg, #4834d4, #6c5ce7, #a29bfe)',
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure mb-4 tracking-tight">Skills Matrix</h2>
          <p className="text-mist text-[15px] max-w-lg mb-16">
            A comprehensive overview of my technical proficiency across languages, frameworks, AI/ML tools, and development platforms.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <RevealOnScroll key={category.title} delay={catIndex * 0.1}>
              <div className="glass-card rounded-xl p-6 hover:border-accent/20 transition-all duration-300">
                <h3 className="text-pure font-semibold text-sm mb-6 tracking-wide uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, i) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={catIndex * 4 + i} />
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.5}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {['Python','Java','C','JavaScript','React','NLP','EDA','Gemini LLM','REST APIs','Git','Jupyter','Machine Learning','DevOps','Full-Stack'].map((tag) => (
              <motion.span
                key={tag}
                className="px-4 py-2 text-xs font-mono text-mist border border-white/[0.06] rounded-full bg-white/[0.02] hover:border-accent/30 hover:text-accent transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                data-hover
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
