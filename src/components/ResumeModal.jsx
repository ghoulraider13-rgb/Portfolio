import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, File } from 'lucide-react';
import { memo } from 'react';

function ResumeModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="glass-card relative z-10 w-full max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(108,92,231,0.15)]"
            style={{ padding: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-snow hover:text-accent-bright transition-colors rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md"
            >
              <X size={20} />
            </button>
            
            {/* Left Pane: PDF Viewer */}
            <div className="flex-1 h-[60vh] md:h-[80vh] bg-black/30 border-b md:border-b-0 md:border-r border-white/[0.06] p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-mist text-sm font-mono tracking-wide px-2">
                <FileText size={16} className="text-accent" />
                <span>/AshwinLahkar_24BTRA0004.pdf</span>
              </div>
              <div className="flex-1 rounded-xl overflow-hidden border border-white/[0.04] bg-white/[0.02]">
                <iframe 
                  src="/AshwinLahkar_24BTRA0004.pdf#toolbar=0&navpanes=0" 
                  className="w-full h-full border-none"
                  title="Resume Preview"
                />
              </div>
            </div>

            {/* Right Pane: Metadata & Actions */}
            <div className="w-full md:w-[320px] p-8 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/20">
              <h2 className="text-2xl font-bold text-pure tracking-tight mb-2 serif">Resume Access</h2>
              <p className="text-mist text-sm mb-10">Secure digital document retrieval system.</p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-ash text-xs font-mono uppercase tracking-wider">Format</span>
                  <span className="text-snow text-sm font-medium flex items-center gap-2"><File size={14} className="text-accent"/> PDF</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-ash text-xs font-mono uppercase tracking-wider">Size</span>
                  <span className="text-snow text-sm font-medium">~1MB</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-ash text-xs font-mono uppercase tracking-wider">Updated</span>
                  <span className="text-success text-sm font-medium glow-text">2026</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 mt-auto">
                <a 
                  href="/AshwinLahkar_24BTRA0004.pdf" 
                  download="AshwinLahkar_24BTRA0004_Resume.pdf"
                  className="resume-btn-cyber w-full py-4 rounded-xl flex items-center justify-center gap-3 text-accent-bright font-medium tracking-wide group"
                >
                  <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default memo(ResumeModal);
