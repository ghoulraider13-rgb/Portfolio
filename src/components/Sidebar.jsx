import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  Route,
  Briefcase,
  Cpu,
  FileText,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: User },
  { to: '/journey', label: 'Journey', icon: Route },
  { to: '/work', label: 'Work', icon: Briefcase },
  { to: '/skills', label: 'Skills', icon: Cpu },
  { to: '/documents', label: 'Documents', icon: FileText },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[220px] z-40 flex-col border-r border-white/[0.04] bg-deep/80 backdrop-blur-xl">
        {/* Avatar + Name */}
        <div className="px-6 pt-8 pb-6 border-b border-white/[0.04]">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-bright flex items-center justify-center text-pure text-sm font-bold">
              AL
            </div>
            <div>
              <p className="text-pure text-sm font-semibold leading-tight">Ashwin Lahkar</p>
              <p className="text-ash text-[10px] font-mono uppercase tracking-wider">Fullstack Engineer</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className="relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
                data-hover
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/15"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon
                  size={16}
                  className={`relative z-10 transition-colors ${
                    isActive ? 'text-accent' : 'text-ash group-hover:text-mist'
                  }`}
                />
                <span
                  className={`relative z-10 transition-colors ${
                    isActive ? 'text-pure' : 'text-mist group-hover:text-chalk'
                  }`}
                >
                  {label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Status Badge */}
        <div className="px-5 pb-6">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <div>
              <p className="text-[10px] font-mono text-ash uppercase tracking-wider">Status</p>
              <p className="text-[11px] text-mist leading-tight">Open for collaboration</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-deep/90 backdrop-blur-xl border-t border-white/[0.06]">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.slice(0, 5).map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className="flex flex-col items-center gap-1 px-2 py-1"
                data-hover
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-accent' : 'text-ash'}
                />
                <span
                  className={`text-[9px] font-medium ${
                    isActive ? 'text-accent' : 'text-ash'
                  }`}
                >
                  {label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
