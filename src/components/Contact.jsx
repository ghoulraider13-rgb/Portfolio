import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import GithubIcon from './GithubIcon';
import RevealOnScroll from './RevealOnScroll';

const CONTACT_LINKS = [
  { icon: Mail, label: 'ghoul.raider13@gmail.com', href: 'mailto:ghoul.raider13@gmail.com' },
  { icon: Phone, label: '+91 7750 60894', href: 'tel:+917750608944' },
  { icon: GithubIcon, label: 'ghoulraider13-rgb', href: 'https://github.com/ghoulraider13-rgb' },
  { icon: MapPin, label: 'Bengaluru, Karnataka', href: null },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure mb-4 tracking-tight">Get in Touch</h2>
          <p className="text-mist text-[15px] max-w-lg mb-16">
            Have a project in mind or want to collaborate? I'd love to hear from you. Reach out via any of the channels below.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Links */}
          <RevealOnScroll delay={0.1} direction="left">
            <div className="space-y-4">
              {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
                <motion.div
                  key={label}
                  className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-accent/20 transition-all duration-300"
                  whileHover={{ x: 4 }}
                  data-hover
                >
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                    <Icon size={18} />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-chalk text-sm hover:text-accent transition-colors"
                      data-hover
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-chalk text-sm">{label}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Contact Form */}
          <RevealOnScroll delay={0.2} direction="right">
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Message sent! (Simulated)'); }}>
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-ash uppercase tracking-wider mb-2">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg text-chalk text-sm placeholder:text-smoke focus:border-accent/40 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-ash uppercase tracking-wider mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg text-chalk text-sm placeholder:text-smoke focus:border-accent/40 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-ash uppercase tracking-wider mb-2">Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg text-chalk text-sm placeholder:text-smoke focus:border-accent/40 focus:outline-none transition-colors resize-none"
                />
              </div>
              <motion.button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-bright text-pure text-sm font-semibold rounded-lg transition-colors w-full justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-hover
              >
                <Send size={14} /> Send Message
              </motion.button>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
