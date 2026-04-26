import { GraduationCap, BookOpen, Award } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">
              About Me
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure mb-12 tracking-tight">
            Background &amp; Education
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio */}
          <RevealOnScroll delay={0.1} direction="left">
            <div className="space-y-6">
              <p className="text-mist leading-relaxed text-[15px]">
                I'm a <span className="text-pure font-medium">Full-Stack & AI Developer</span> based
                in Bengaluru, currently pursuing my B.Tech at Jain University. I specialize in
                building intelligent, production-grade applications that merge modern web
                technologies with AI capabilities.
              </p>
              <p className="text-mist leading-relaxed text-[15px]">
                My approach to development follows <span className="text-pure font-medium">"Nothing" design principles</span> — 
                stripping away the unnecessary to create interfaces that are clean, functional,
                and deeply intentional. Every pixel has a purpose.
              </p>
              <p className="text-mist leading-relaxed text-[15px]">
                When I'm not coding, you'll find me exploring new AI research papers,
                contributing to hackathons, or optimizing development workflows through
                intelligent automation and DevOps pipelines.
              </p>
            </div>
          </RevealOnScroll>

          {/* Education & Certs */}
          <RevealOnScroll delay={0.2} direction="right">
            <div className="space-y-6">
              {/* Education Card */}
              <div className="glass-card rounded-xl p-6 hover:border-accent/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent mt-0.5">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="text-pure font-semibold text-[15px] mb-1">
                      Jain University
                    </h3>
                    <p className="text-accent text-sm font-medium mb-2">
                      B.Tech in CSE — AI Driven DevOps
                    </p>
                    <p className="text-ash text-xs font-mono">4th Semester • Bengaluru</p>
                  </div>
                </div>
              </div>

              {/* Coursework Card */}
              <div className="glass-card rounded-xl p-6 hover:border-accent/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent mt-0.5">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="text-pure font-semibold text-[15px] mb-3">
                      Key Coursework
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['DSA', 'OOP', 'DBMS', 'Machine Learning'].map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 text-xs font-mono text-mist bg-white/[0.04] border border-white/[0.06] rounded-md"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications Card */}
              <div className="glass-card rounded-xl p-6 hover:border-accent/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent mt-0.5">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="text-pure font-semibold text-[15px] mb-3">
                      Certifications & Activities
                    </h3>
                    <ul className="space-y-2 text-sm text-mist">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1.5 text-[6px]">●</span>
                        Google Cloud Study Jam
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1.5 text-[6px]">●</span>
                        Coursera — Operating Systems, DSA in C, Python
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1.5 text-[6px]">●</span>
                        Multiple College Hackathon Participant
                      </li>
                    </ul>
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
