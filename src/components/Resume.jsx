import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, Trash2, Download, CheckCircle, AlertCircle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const INITIAL_RESUME = {
  name: 'Ashwin_Lahkar_Resume.pdf',
  size: '245 KB',
  updated: 'April 2026',
};

export default function Resume() {
  const [currentResume, setCurrentResume] = useState(INITIAL_RESUME);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); // idle | uploading | success | error
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const simulateUpload = useCallback((file) => {
    setUploadState('uploading');
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setCurrentResume({
            name: file.name,
            size: `${(file.size / 1024).toFixed(0)} KB`,
            updated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          });
          setUploadState('success');
          setTimeout(() => setUploadState('idle'), 2500);
        }, 400);
      }
      setUploadProgress(progress);
    }, 200);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) simulateUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) simulateUpload(file);
  };

  const handleRemove = () => {
    setCurrentResume(null);
    setUploadState('idle');
  };

  return (
    <section id="resume" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Documents</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure mb-4 tracking-tight">Resume</h2>
          <p className="text-mist text-[15px] max-w-lg mb-12">
            View or download my current resume. Upload a new version to replace it instantly.
          </p>
        </RevealOnScroll>

        {/* Current Resume Display */}
        <RevealOnScroll delay={0.1}>
          <AnimatePresence mode="wait">
            {currentResume ? (
              <motion.div
                key="resume-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card rounded-xl p-6 mb-8"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-pure font-semibold text-[15px]">{currentResume.name}</h3>
                      <p className="text-ash text-xs font-mono mt-1">
                        {currentResume.size} • Updated {currentResume.updated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-bright text-pure text-xs font-semibold rounded-lg transition-colors"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      data-hover
                      onClick={() => alert('Download simulated — connect to real storage in production.')}
                    >
                      <Download size={14} /> Download
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2.5 border border-danger/30 text-danger hover:bg-danger/10 text-xs font-semibold rounded-lg transition-colors"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      data-hover
                      onClick={handleRemove}
                    >
                      <Trash2 size={14} /> Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="no-resume"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card rounded-xl p-6 mb-8 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-ash">
                  <AlertCircle size={16} />
                  <span className="text-sm">No resume uploaded. Drag & drop or browse to upload one.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </RevealOnScroll>

        {/* Upload Zone */}
        <RevealOnScroll delay={0.2}>
          <div
            className={`drag-zone rounded-xl p-10 text-center transition-all duration-300 ${isDragging ? 'active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf,.doc,.docx" id="resume-upload" />

            <AnimatePresence mode="wait">
              {uploadState === 'uploading' ? (
                <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-accent/30 flex items-center justify-center">
                    <motion.div
                      className="w-10 h-10 rounded-full border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    />
                  </div>
                  <p className="text-mist text-sm mb-3">Uploading...</p>
                  <div className="max-w-xs mx-auto h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div className="h-full bg-accent rounded-full" animate={{ width: `${uploadProgress}%` }} />
                  </div>
                  <p className="text-ash text-xs font-mono mt-2">{Math.round(uploadProgress)}%</p>
                </motion.div>
              ) : uploadState === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle size={28} className="text-success" />
                  </div>
                  <p className="text-success text-sm font-medium">Resume uploaded successfully!</p>
                </motion.div>
              ) : (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.03] flex items-center justify-center">
                    <Upload size={24} className="text-ash" />
                  </div>
                  <p className="text-mist text-sm mb-1">
                    Drag & drop your resume here, or{' '}
                    <button className="text-accent hover:text-accent-bright underline underline-offset-2 font-medium" onClick={() => fileInputRef.current?.click()} data-hover>
                      browse files
                    </button>
                  </p>
                  <p className="text-ash text-xs font-mono">PDF, DOC, DOCX • Max 5MB</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
