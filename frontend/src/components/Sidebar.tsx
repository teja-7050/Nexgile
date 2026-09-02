import React from 'react';
import type { UserRole } from '../types';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Boxes,
  Building,
} from 'lucide-react';

export type ModuleType = 'A' | 'B' | 'C' | 'D' | 'E';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (mod: ModuleType) => void;
  role: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const modules = [
    { id: 'A' as ModuleType, label: 'Individual Wealth',       sub: 'Dashboard & Holdings',    icon: LayoutDashboard, enabled: true  },
    { id: 'B' as ModuleType, label: 'Tax & Estate Planning',   sub: 'Trust & Tax Strategies',  icon: FileText,        enabled: true  },
    { id: 'C' as ModuleType, label: 'Alternative Assets',      sub: 'Private Equity & Crypto', icon: Boxes,           enabled: true  },
    { id: 'D' as ModuleType, label: 'Institutional Treasury',  sub: 'Liquidity Management',    icon: Building,        enabled: true  },
    { id: 'E' as ModuleType, label: 'Advisor Workstation',     sub: 'Client 360 & Tools',      icon: Briefcase,       enabled: true  },
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
                onClick={() => setActiveModule(mod.id)}
                className="w-full text-left flex items-start gap-3 px-5 py-3 transition-colors"
                style={{
                  cursor: 'pointer',
                  borderLeft: isActive ? '2px solid var(--accent-text)' : '2px solid transparent',
                  background: isActive ? 'var(--bg-raised)' : 'transparent',
                  paddingLeft: isActive ? 'calc(1.25rem - 2px)' : '1.25rem',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
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
                  <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {mod.sub}
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
          Modules A, B, C, D &amp; E active.<br />
          Institutional Workstation Online.
        </div>
      </aside>

      {/* ── Mobile Horizontal Navigation Strip (below md breakpoint) ── */}
      <div
        className="md:hidden w-full flex items-center gap-1.5 px-4 py-2 overflow-x-auto shrink-0"
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {modules.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium shrink-0"
              style={{
                background: isActive ? 'var(--bg-raised)' : 'transparent',
                border: isActive ? '1px solid var(--accent-text)' : '1px solid var(--border)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
            >
              <Icon size={13} />
              <span>{mod.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
