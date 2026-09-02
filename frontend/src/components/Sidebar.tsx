import React from 'react';
import type { UserRole } from '../types';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Boxes,
  Building,
  Lock,
} from 'lucide-react';

interface SidebarProps {
  activeModule: 'A' | 'E';
  setActiveModule: (mod: 'A' | 'E') => void;
  role: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const modules = [
    { id: 'A', label: 'Individual Wealth',       sub: 'Dashboard & Holdings',    icon: LayoutDashboard, enabled: true  },
    { id: 'B', label: 'Tax & Estate Planning',   sub: 'Trust & Tax Strategies',  icon: FileText,        enabled: false },
    { id: 'C', label: 'Alternative Assets',      sub: 'Private Equity & Crypto', icon: Boxes,           enabled: false },
    { id: 'D', label: 'Institutional Treasury',  sub: 'Liquidity Management',    icon: Building,        enabled: false },
    { id: 'E', label: 'Advisor Workstation',     sub: 'Client 360 & Tools',      icon: Briefcase,       enabled: true  },
  ];

  return (
    <>
      {/* ── Desktop Sidebar (md and up) ── */}
      <aside
        className="w-56 shrink-0 hidden md:flex flex-col"
        style={{
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border)',
          minHeight: 0,
        }}
      >
        {/* Section label */}
        <div
          className="px-5 pt-6 pb-3 text-xs font-medium uppercase tracking-widest"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}
        >
          Modules
        </div>

        <nav className="flex-1">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;

            return (
              <button
                key={mod.id}
                disabled={!mod.enabled}
                onClick={() => mod.enabled && setActiveModule(mod.id as 'A' | 'E')}
                className="w-full text-left flex items-start gap-3 px-5 py-3 transition-colors"
                style={{
                  cursor: mod.enabled ? 'pointer' : 'not-allowed',
                  borderLeft: isActive ? '2px solid var(--accent-text)' : '2px solid transparent',
                  background: isActive ? 'var(--bg-raised)' : 'transparent',
                  paddingLeft: isActive ? 'calc(1.25rem - 2px)' : '1.25rem',
                  opacity: mod.enabled ? 1 : 0.4,
                }}
                onMouseEnter={e => {
                  if (mod.enabled && !isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                <Icon
                  size={14}
                  className="mt-px shrink-0"
                  style={{ color: isActive ? 'var(--accent-text)' : 'var(--text-muted)' }}
                />
                <div className="min-w-0">
                  <div
                    className="text-xs font-medium leading-snug"
                    style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    {mod.label}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {mod.sub}
                    </span>
                    {!mod.enabled && (
                      <span className="flex items-center gap-0.5 text-[9px]" style={{ color: 'var(--text-muted)' }}>
                        <Lock size={8} /> Soon
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer note */}
        <div
          className="px-5 py-4 text-[10px] leading-relaxed"
          style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}
        >
          Modules A &amp; E active.<br />
          B, C, D in development.
        </div>
      </aside>

      {/* ── Mobile Horizontal Navigation Strip (below md breakpoint) ── */}
      <div
        className="md:hidden w-full flex items-center gap-1 px-4 py-2 overflow-x-auto shrink-0"
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <button
          onClick={() => setActiveModule('A')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium shrink-0"
          style={{
            background: activeModule === 'A' ? 'var(--bg-raised)' : 'transparent',
            border: activeModule === 'A' ? '1px solid var(--accent-text)' : '1px solid var(--border)',
            color: activeModule === 'A' ? 'var(--text-primary)' : 'var(--text-muted)',
          }}
        >
          <LayoutDashboard size={13} />
          <span>Individual Wealth</span>
        </button>

        <button
          onClick={() => setActiveModule('E')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium shrink-0"
          style={{
            background: activeModule === 'E' ? 'var(--bg-raised)' : 'transparent',
            border: activeModule === 'E' ? '1px solid var(--accent-text)' : '1px solid var(--border)',
            color: activeModule === 'E' ? 'var(--text-primary)' : 'var(--text-muted)',
          }}
        >
          <Briefcase size={13} />
          <span>Advisor Workstation</span>
        </button>
      </div>
    </>
  );
};
