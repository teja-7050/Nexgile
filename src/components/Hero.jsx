import React, { useState } from 'react';
import { Rocket, ArrowRight, Zap, Code, Sparkles, Plus, RefreshCw } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const [count, setCount] = useState(0);

  return (
    <section className="glass-card hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Next-Gen React Starter</span>
        </div>
        <h1 className="hero-title">
          Build stunning web apps <span>lightning fast</span> with React.
        </h1>
        <p className="hero-description">
          Powered by Vite HMR, modular architecture, dark/light theme engine, and pre-built interactive UI components.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onExploreClick}>
            <span>Explore Components</span>
            <ArrowRight size={18} />
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setCount((c) => c + 1)}
          >
            <Zap size={18} style={{ color: 'var(--warning)' }} />
            <span>Interactive Counter ({count})</span>
          </button>
        </div>
      </div>

      <div className="code-preview-window">
        <div className="window-header">
          <div className="window-dots">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-yellow"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <span className="window-title">App.jsx</span>
        </div>
        <div className="code-block">
          <pre>
<code>
<span className="code-keyword">import</span> React, &#123; useState &#125; <span className="code-keyword">from</span> <span className="code-string">'react'</span>;{'\n'}
<span className="code-keyword">import</span> &#123; Layers &#125; <span className="code-keyword">from</span> <span className="code-string">'lucide-react'</span>;{'\n\n'}
<span className="code-keyword">export default function</span> <span className="code-component">App</span>() &#123;{'\n'}
{'  '}<span className="code-keyword">const</span> [count, setCount] = <span className="code-function">useState</span>(<span className="code-string">{count}</span>);{'\n\n'}
{'  '}<span className="code-keyword">return</span> ({'\n'}
{'    '}&lt;<span className="code-component">div</span> className=<span className="code-string">"app"</span>&gt;{'\n'}
{'      '}&lt;<span className="code-component">h1</span>&gt;React + Vite Engine&lt;/<span className="code-component">h1</span>&gt;{'\n'}
{'      '}&lt;<span className="code-component">button</span> onClick=&#123;() =&gt; setCount(c + 1)&#125;&gt;{'\n'}
{'        '}Click count: &#123;count&#125;{'\n'}
{'      '}&lt;/<span className="code-component">button</span>&gt;{'\n'}
{'    '}&lt;/<span className="code-component">div</span>&gt;{'\n'}
{'  '});{'\n'}
&#125;
</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
