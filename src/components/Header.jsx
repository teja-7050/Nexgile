import React from 'react';
import { Layers, Sun, Moon, LayoutDashboard, Cpu, CheckSquare, BookOpen, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, theme, toggleTheme }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'lab', label: 'Component Lab', icon: Cpu },
    { id: 'tasks', label: 'Task Tracker', icon: CheckSquare },
    { id: 'docs', label: 'Quick Docs', icon: BookOpen },
  ];

  return (
    <header className="header">
      <a href="#" className="brand">
        <div className="brand-icon">
          <Layers size={22} />
        </div>
        <span className="brand-title">Nexgile</span>
      </a>

      <nav className="nav-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-tab ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="header-actions">
        <div className="status-badge">
          <span className="status-dot"></span>
          <span>Vite + React Active</span>
        </div>

        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
