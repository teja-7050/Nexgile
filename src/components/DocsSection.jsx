import React, { useState } from 'react';
import { BookOpen, Terminal, FolderTree, Copy, Check, ExternalLink } from 'lucide-react';

export default function DocsSection() {
  const [copiedCmd, setCopiedCmd] = useState(null);

  const copyToClipboard = (cmd, key) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const commands = [
    { label: 'Start Development Server', cmd: 'npm run dev', key: 'dev' },
    { label: 'Build Production Bundle', cmd: 'npm run build', key: 'build' },
    { label: 'Preview Production Build', cmd: 'npm run preview', key: 'preview' },
    { label: 'Install New Package', cmd: 'npm install <package-name>', key: 'install' },
  ];

  return (
    <div className="main-content">
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <BookOpen size={24} style={{ color: 'var(--accent-primary)' }} />
          <div>
            <h2>Developer Quick Start & Project Documentation</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Essential CLI commands, project file hierarchy, and developer workflows.
            </p>
          </div>
        </div>

        <div className="features-grid" style={{ marginBottom: '2rem' }}>
          {commands.map((item) => (
            <div key={item.key} className="glass-card" style={{ padding: '1.25rem', background: 'var(--bg-secondary)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {item.label}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  background: 'var(--bg-tertiary)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}
              >
                <code>{item.cmd}</code>
                <button
                  className="icon-btn"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => copyToClipboard(item.cmd, item.key)}
                  title="Copy command"
                >
                  {copiedCmd === item.key ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ background: 'var(--bg-secondary)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <FolderTree size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.1rem' }}>Project Architecture</h3>
          </div>

          <div className="code-block" style={{ background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
            <pre>
<code>
Nexgile/{'\n'}
├── public/{'\n'}
│   └── favicon.svg{'\n'}
├── src/{'\n'}
│   ├── assets/{'\n'}
│   ├── components/{'\n'}
│   │   ├── Header.jsx       # Sticky Glassmorphism Navigation{'\n'}
│   │   ├── Hero.jsx         # Interactive Banner & Counter{'\n'}
│   │   ├── StatsSection.jsx # Framework Metrics Cards{'\n'}
│   │   ├── ComponentsLab.jsx# Interactive State Playground{'\n'}
│   │   ├── TaskBoard.jsx    # Deliverables & Task Manager{'\n'}
│   │   ├── DocsSection.jsx  # CLI Reference & Project Spec{'\n'}
│   │   └── Footer.jsx       # App Footer & Stack Badge{'\n'}
│   ├── App.jsx              # Main Application Orchestrator{'\n'}
│   ├── index.css            # Design System & Theme Engine{'\n'}
│   └── main.jsx             # React DOM Root Entrypoint{'\n'}
├── index.html               # Page Entry & Typography Imports{'\n'}
├── package.json             # Dependencies & Build Scripts{'\n'}
└── vite.config.js           # Vite Server & Build Configurations{'\n'}
</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
