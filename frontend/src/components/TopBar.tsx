import React from 'react';
import type { UserRole } from '../types';
import { UserCheck, Briefcase, Building2, ChevronDown, Bell } from 'lucide-react';

interface TopBarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  selectedClientName: string;
}

export const TopBar: React.FC<TopBarProps> = ({ role, setRole, selectedClientName }) => {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-14"
      style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Brand wordmark — no gradient, no icon badge */}
      <div className="flex items-center gap-6">
        <div>
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            Nexgile
          </span>
          <span className="mx-1" style={{ color: 'var(--text-muted)' }}>·</span>
          <span className="text-sm font-normal" style={{ color: 'var(--text-secondary)' }}>
            WealthAgent
          </span>
        </div>

        {/* Context breadcrumb */}
        <div
          className="hidden md:flex items-center gap-2 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          <span style={{ borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
            Client in view:
          </span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
            {selectedClientName}
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* API status — understated */}
        <div
          className="hidden sm:flex items-center gap-1.5 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          <span
            className="block w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--accent-text)' }}
          />
          API connected
        </div>

        {/* Notification */}
        <button
          aria-label="Notifications"
          className="flex items-center justify-center w-8 h-8 rounded"
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
          }}
        >
          <Bell size={14} />
        </button>

        {/* Role switcher — plain select-style dropdown */}
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-3 h-8 rounded text-xs font-medium"
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            aria-haspopup="listbox"
          >
            {role === 'individual' && <UserCheck size={13} />}
            {role === 'advisor' && <Briefcase size={13} />}
            {role === 'institutional' && <Building2 size={13} />}
            <span className="capitalize">{role}</span>
            <ChevronDown size={11} style={{ color: 'var(--text-muted)' }} />
          </button>

          {/* Dropdown */}
          <div
            className="absolute right-0 mt-1 w-52 hidden group-hover:block z-50"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
            }}
          >
            <div
              className="px-3 py-2 text-xs font-medium"
              style={{
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              Switch portal view
            </div>
            {[
              { value: 'individual' as UserRole, label: 'Individual Wealth', sub: 'Module A', Icon: UserCheck },
              { value: 'advisor' as UserRole, label: 'Advisor Workstation', sub: 'Module E', Icon: Briefcase },
              { value: 'institutional' as UserRole, label: 'Institutional Treasury', sub: 'Preview', Icon: Building2 },
            ].map(({ value, label, sub, Icon }) => (
              <button
                key={value}
                onClick={() => setRole(value)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs transition-colors"
                style={{
                  color: role === value ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: role === value ? 'var(--bg-raised)' : 'transparent',
                  borderLeft: role === value ? '2px solid var(--accent-text)' : '2px solid transparent',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = role === value ? 'var(--bg-raised)' : 'transparent';
                }}
              >
                <Icon size={13} style={{ color: 'var(--text-muted)' }} />
                <div>
                  <div style={{ fontWeight: 500 }}>{label}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
