import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-ash text-xs font-mono flex items-center gap-1.5">
          Built with <Heart size={12} className="text-accent" /> by Ashwin Lahkar
        </p>
        <p className="text-ash text-xs font-mono">
          © {new Date().getFullYear()} • All rights reserved
        </p>
      </div>
    </footer>
  );
}
