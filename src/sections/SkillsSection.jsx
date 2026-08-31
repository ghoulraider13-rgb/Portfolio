import { memo, useState } from 'react';
import RevealOnScroll from '../components/RevealOnScroll';
import BinaryRain from '../components/BinaryRain';

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C", "JavaScript", "SQL", "Bash / Shell"]
  },
  {
    title: "AI & ML",
    skills: ["Machine Learning", "YOLOv11 (CV)", "PyTorch", "scikit-learn", "Genetic Algorithms", "Gemini LLM", "NLP", "EDA"]
  },
  {
    title: "Web & Full-Stack",
    skills: ["React", "Next.js", "Vite", "Tailwind CSS", "FastAPI", "Chrome MV3", "REST APIs", "HTML / CSS"]
  },
  {
    title: "Edge AI Deployment",
    skills: ["Ultralytics", "ONNX", "TensorRT", "OpenVINO"]
  },
  {
    title: "Tools & Ecosystem",
    skills: ["Git / GitHub", "Docker", "GitHub Actions", "Roboflow", "Google Cloud", "Jupyter", "VS Code", "Linux / CLI"]
  }
];

function SkillsSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="skills" className="section">
      <div className="section-inner flex flex-col items-center justify-center text-center">
        <RevealOnScroll>
          <div className="mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-pure mb-4 tracking-tight serif">Technical Arsenal</h2>
            <div className="h-1 w-20 bg-accent rounded-full opacity-80"></div>
          </div>
        </RevealOnScroll>
        <div className="w-full h-4 block" aria-hidden="true"></div>

        <div className="relative w-full flex justify-center">
          <div className="w-full">
            <RevealOnScroll delay={0.1}>
              <div
                className="glass-card relative overflow-hidden p-16 md:p-10 w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <BinaryRain active={isHovered} />

                {/* The inner Flexbox layout to cleanly arrange the 4 categories */}
                <div className="relative z-10 flex flex-wrap justify-center gap-x-12 md:gap-x-20 gap-y-12">
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="flex flex-col items-center w-full md:w-[40%] space-y-5">
                      <h4 className="text-accent font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 bg-accent opacity-80 rotate-45" /> {cat.title}
                      </h4>
                      <div className="grid grid-cols-2 gap-3 w-full">
                        {cat.skills.map(skill => (
                          <div key={skill} className="px-4 py-3 border border-white/[0.06] rounded-xl bg-white/[0.02] text-snow text-xs sm:text-sm font-medium glow-pill flex items-center justify-center text-center w-full">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(SkillsSection);