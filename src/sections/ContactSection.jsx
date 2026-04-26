import { memo } from 'react';
import { Mail, MapPin } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import LinkedinIcon from '../components/LinkedinIcon';
import RevealOnScroll from '../components/RevealOnScroll';

const CONTACT = [
  { icon: Mail, label: 'ghoul.raider13@gmail.com', href: 'mailto:ghoul.raider13@gmail.com' },
  { icon: LinkedinIcon, label: 'Connect with me', href: 'https://www.linkedin.com/in/ashwin-lahkar-08a9ab405/' },
  { icon: GithubIcon, label: 'ghoulraider13-rgb', href: 'https://github.com/ghoulraider13-rgb' },
  { icon: MapPin, label: 'Bengaluru, Karnataka', href: null },
];

function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pure tracking-tight mb-4 serif">Get in Touch</h2>
          <p className="text-mist text-[15px] max-w-md mb-14">Feel free to reach out for collaborations or just a friendly hello.</p>
        </RevealOnScroll>

        <div className="w-full h-12 block" aria-hidden="true"></div>

        <RevealOnScroll delay={0.1}>
          <div className="relative mb-24 mt-16 max-w-4xl mx-auto">
            <div className="contact-divider" />
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-10 relative z-10">
              {CONTACT.map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex flex-col items-center gap-4 group">
                  <div className="p-4 rounded-2xl bg-[#0e1426] border border-white/[0.06] text-accent group-hover:border-accent/40 group-hover:bg-accent/10 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <Icon size={22} />
                  </div>
                  <div className="text-center bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/[0.02]">
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-snow text-[13px] hover:text-accent-bright transition-colors font-medium tracking-wide" data-hover>
                        {label}
                      </a>
                    ) : (
                      <span className="text-snow text-[13px] font-medium tracking-wide">{label}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
        <div className="w-full h-16 block" aria-hidden="true"></div>
      </div>
    </section>
  );
}

export default memo(ContactSection);
