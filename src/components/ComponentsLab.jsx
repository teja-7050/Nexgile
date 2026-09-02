import React, { useState } from 'react';
import { Sliders, Eye, CheckCircle2, AlertTriangle, XCircle, Bell, RefreshCw, Send } from 'lucide-react';

export default function ComponentsLab() {
  const [userName, setUserName] = useState('Nexgile Developer');
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [badgeStatus, setBadgeStatus] = useState('success');
  const [progress, setProgress] = useState(75);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = () => {
    setToastMessage(`Action executed for ${userName}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="main-content">
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Sliders size={24} style={{ color: 'var(--accent-primary)' }} />
          <div>
            <h2>Interactive Component Playground</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Test reactive state, input binding, dynamic styles, and notification triggers in real time.
            </p>
          </div>
        </div>

        <div className="interactive-demo">
          {/* Controls Panel */}
          <div className="demo-control-panel">
            <div className="form-group">
              <label className="form-label">Developer Profile Name</label>
              <input
                type="text"
                className="input-field"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter name..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary Color Theme</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: color,
                      border: accentColor === color ? '3px solid var(--text-primary)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Status Type: {badgeStatus.toUpperCase()}</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className={`btn btn-secondary ${badgeStatus === 'success' ? 'btn-primary' : ''}`}
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => setBadgeStatus('success')}
                >
                  Success
                </button>
                <button
                  className={`btn btn-secondary ${badgeStatus === 'warning' ? 'btn-primary' : ''}`}
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => setBadgeStatus('warning')}
                >
                  Warning
                </button>
                <button
                  className={`btn btn-secondary ${badgeStatus === 'danger' ? 'btn-primary' : ''}`}
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => setBadgeStatus('danger')}
                >
                  Danger
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project Progress: {progress}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                style={{ width: '100%', accentColor: accentColor, cursor: 'pointer' }}
              />
            </div>

            <button className="btn btn-primary" onClick={triggerToast} style={{ marginTop: '0.5rem' }}>
              <Bell size={16} />
              <span>Simulate Notification Toast</span>
            </button>
          </div>

          {/* Live Preview Panel */}
          <div
            className="glass-card"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: accentColor,
              boxShadow: `0 0 20px ${accentColor}25`,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={18} style={{ color: accentColor }} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Live Component Output</span>
              </div>

              {badgeStatus === 'success' && (
                <span className="status-badge" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
                  <CheckCircle2 size={14} /> Ready
                </span>
              )}
              {badgeStatus === 'warning' && (
                <span className="status-badge" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
                  <AlertTriangle size={14} /> Pending
                </span>
              )}
              {badgeStatus === 'danger' && (
                <span className="status-badge" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
                  <XCircle size={14} /> Failed
                </span>
              )}
            </div>

            <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: accentColor, marginBottom: '0.25rem' }}>
                {userName || 'Anonymous User'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                React State Sandbox &bull; Theme Accent Active
              </p>

              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span>Completion Rate</span>
                  <span>{progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%`, background: accentColor }}
                  />
                </div>
              </div>
            </div>

            {toastMessage && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: accentColor,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  animation: 'pulse 1s'
                }}
              >
                <Bell size={16} />
                <span>{toastMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
