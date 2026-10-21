import { memo, useState } from 'react';
import { Mail, MapPin, MessageSquare, Copy, Check } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import LinkedinIcon from '../components/LinkedinIcon';
import RevealOnScroll from '../components/RevealOnScroll';
import { motion } from 'framer-motion';

const CONTACT = [
  { icon: Mail, label: 'ashwinlahkar@gmail.com', href: 'mailto:ashwinlahkar@gmail.com', desc: 'Primary email' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashwin-lahkar-08a9ab405/', desc: 'Professional network' },
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/ghoulraider13-rgb', desc: 'Code & projects' },
  { icon: MapPin, label: 'Bengaluru, India', href: null, desc: 'Currently based here' },
];

const SOCIALS = [
  { icon: Mail, label: 'Email', action: () => window.location.href = 'mailto:ashwinlahkar@gmail.com', color: '#ea4335' },
  { icon: LinkedinIcon, label: 'LinkedIn', action: () => window.open('https://linkedin.com/in/ashwin-lahkar-08a9ab405', '_blank'), color: '#0077b5' },
  { icon: GithubIcon, label: 'GitHub', action: () => window.open('https://github.com/ghoulraider13-rgb', '_blank'), color: '#ffffff' },
  { icon: MessageSquare, label: 'Discord', action: () => {}, color: '#5865f2', disabled: true, desc: 'Coming soon' },
];

function ContactSection() {
  const [copied, setCopied] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    await new Promise(r => setTimeout(r, 1500));
    
    // In production, you'd send to a backend
    // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    
    setFormStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-4 serif">Get in Touch</h2>
          <p className="text-mist text-[15px] max-w-md mb-14">Feel free to reach out for collaborations, freelance work, or just a friendly hello.</p>
        </RevealOnScroll>

        <div className="w-full h-12 block" aria-hidden="true"></div>

        {/* Quick Contact Cards */}
        <RevealOnScroll delay={0.1}>
          <div className="relative mb-16 max-w-4xl mx-auto">
            <div className="contact-divider" />
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 relative z-10">
              {CONTACT.map(({ icon: Icon, label, href, desc }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * CONTACT.indexOf({ icon: Icon, label, href, desc }) }}
                  className="flex flex-col items-center gap-3 group w-full sm:w-auto"
                >
                  <button
                    type="button"
                    onClick={() => href ? (href.startsWith('mailto:') ? window.location.href = href : window.open(href, '_blank', 'noopener,noreferrer')) : handleCopy(label, label)}
                    disabled={!href && copied === label}
                    data-hover={href || !copied ? true : undefined}
                    className={[
                      'relative p-5 rounded-2xl bg-panel/50 backdrop-blur-xl border text-accent shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col items-center gap-3 min-w-[140px] transition-all duration-300 group',
                      href
                        ? 'border-white/[0.06] cursor-pointer hover:border-accent/60 hover:bg-accent/10 hover:shadow-[0_0_18px_4px_rgba(124,77,255,0.45)] hover:scale-105'
                        : 'border-white/[0.06] cursor-pointer hover:border-accent/60 hover:bg-accent/10 hover:shadow-[0_0_18px_4px_rgba(124,77,255,0.45)] hover:scale-105',
                    ].join(' ')}
                  >
                    <Icon size={28} />
                    <span className="text-snow text-[13px] font-medium tracking-wide">{label}</span>
                    <span className="text-ash text-[10px] font-mono">{desc}</span>
                    
                    {copied === label && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute -top-2 right-2 bg-success text-pure text-xs px-2 py-1 rounded-full flex items-center gap-1"
                      >
                        <Check size={10} /> Copied!
                      </motion.div>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="w-full h-16 block" aria-hidden="true"></div>

        {/* Contact Form */}
        <RevealOnScroll delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto glass-card p-8 md:p-10"
          >
            <div className="mb-8 text-center">
              <h3 className="text-xl font-bold text-pure mb-2 serif">Send a Message</h3>
              <p className="text-mist text-sm">Direct line to my inbox. I read everything.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    className="w-full px-4 py-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-snow placeholder-transparent focus:border-accent/50 focus:bg-white/[0.06] focus:outline-none transition-all duration-300"
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-mist pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-accent peer-focus:-translate-y-1/2">
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    className="w-full px-4 py-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-snow placeholder-transparent focus:border-accent/50 focus:bg-white/[0.06] focus:outline-none transition-all duration-300"
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-mist pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-accent peer-focus:-translate-y-1/2">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder=" "
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-snow placeholder-transparent focus:border-accent/50 focus:bg-white/[0.06] focus:outline-none transition-all duration-300 resize-none font-sans"
                />
                <label className="absolute left-4 top-4 text-mist pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-accent">
                  Message
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={formStatus !== 'idle'}
                className="btn-cyber w-full py-4 rounded-xl font-bold text-accent-bright uppercase tracking-widest inline-flex items-center justify-center gap-3"
                data-hover
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formStatus === 'sending' && (
                  <>
                    <motion.div className="w-5 h-5 border-2 border-t-accent-bright border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                )}
                {formStatus === 'success' && (
                  <>
                    <Check size={18} /> Sent!
                  </>
                )}
                {formStatus === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>→</motion.span>
                  </>
                )}
              </motion.button>

              {formStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-success text-sm text-center mt-4 font-mono"
                >
                  Thanks! I'll get back to you within 24 hours.
                </motion.p>
              )}
            </form>
          </motion.div>
        </RevealOnScroll>

        <div className="w-full h-16 block" aria-hidden="true"></div>

        {/* Social Quick Actions */}
        <RevealOnScroll delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            {SOCIALS.map((social, i) => (
              <motion.button
                key={social.label}
                onClick={social.action}
                disabled={social.disabled}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${social.disabled ? 'opacity-50 cursor-not-allowed' : 'group'}`}
                style={{ 
                  background: social.disabled ? 'rgba(255,255,255,0.03)' : `rgba(255,255,255,0.03)`,
                  border: social.disabled ? '1px solid rgba(255,255,255,0.06)' : `1px solid ${social.color}30`,
                  color: social.disabled ? 'rgba(255,255,255,0.3)' : social.color,
                }}
                data-hover={!social.disabled}
              >
                <social.icon size={18} />
                <span>{social.label}</span>
                {social.disabled && <span className="text-ash text-xs ml-1">Soon™</span>}
              </motion.button>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default memo(ContactSection);