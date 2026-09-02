import React from 'react';
import { Layers, Heart, Shield, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Layers size={18} style={{ color: 'var(--accent-primary)' }} />
        <span style={{ fontWeight: 700 }}>Nexgile</span> &bull; <span>Built with React + Vite</span>
      </div>

      <div className="footer-links">
        <a href="https://react.dev" target="_blank" rel="noreferrer" className="footer-link">
          React Docs
        </a>
        <a href="https://vite.dev" target="_blank" rel="noreferrer" className="footer-link">
          Vite Guides
        </a>
        <a href="https://lucide.dev" target="_blank" rel="noreferrer" className="footer-link">
          Lucide Icons
        </a>
      </div>
    </footer>
  );
}
