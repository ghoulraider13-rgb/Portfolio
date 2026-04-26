import { memo } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

function DocumentsSection() {
  return (
    <section id="documents" className="section">
      <div className="section-inner">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Documents</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-16 serif">Resume</h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <a
            href="/ashwin_lahkar_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            data-hover
          >
            <motion.div
              className="frosted-glass flex items-center justify-between gap-4 max-w-lg mx-auto group"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors shrink-0">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="text-pure font-semibold text-[15px] group-hover:text-accent-bright transition-colors">
                    View Resume
                  </h3>
                  <p className="text-ash text-xs font-mono mt-1">
                    ashwin_lahkar_resume.pdf • Updated April 2026
                  </p>
                </div>
              </div>
              <div className="text-ash group-hover:text-accent-bright transition-colors shrink-0">
                <ExternalLink size={18} />
              </div>
            </motion.div>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default memo(DocumentsSection);
