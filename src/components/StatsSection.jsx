import React from 'react';
import { Flame, Gauge, ShieldCheck, Component } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: Flame,
      value: '< 50ms',
      label: 'Vite HMR Speed',
      color: '#f59e0b',
    },
    {
      icon: Component,
      value: '18+',
      label: 'Built-in UI Tokens',
      color: '#6366f1',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Zero Warning Health',
      color: '#10b981',
    },
    {
      icon: Gauge,
      value: 'v19.0',
      label: 'React Core Engine',
      color: '#ec4899',
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div className="glass-card stat-card" key={idx}>
            <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>
              <Icon size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
