import React, { useRef, useEffect } from 'react';

interface LandingProps {
  onEnterPortal: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnterPortal }) => {
  const motionVideoRef = useRef<HTMLVideoElement>(null);

  // Set slow, cinematic video playback speed (0.35x) for background motion
  useEffect(() => {
    if (motionVideoRef.current) {
      motionVideoRef.current.playbackRate = 0.35;
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col w-full overflow-x-hidden"
      style={{
        background: 'var(--bg-base)',
        color: 'var(--text-primary)',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── Full-Width Sticky Header ── */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Nexgile
            </span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span className="text-base font-normal" style={{ color: 'var(--text-secondary)' }}>
              WealthAgent
            </span>
          </div>

          <button
            onClick={onEnterPortal}
            className="px-5 py-2 text-xs font-semibold rounded-sm transition-opacity"
            style={{
              background: 'var(--accent)',
              color: '#ffffff',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.9')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Enter Portal
          </button>
        </div>
      </header>

      {/* ── Main Landing Body ── */}
      <main className="flex-1 w-full">
        
        {/* ══ HERO SECTION — FULL SCREEN LAPTOP MOTION GRAPHIC BACKGROUND WITH TEXT OVERLAY ══ */}
        <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[var(--border)]">
          
          {/* Background Motion Video (Slowed down to 0.35x) */}
          <video
            ref={motionVideoRef}
            src="/MotionGraphics.webm"
            muted
            autoPlay
            loop
            playsInline
            onLoadedData={() => {
              if (motionVideoRef.current) motionVideoRef.current.playbackRate = 0.35;
            }}
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Unified wealth management background video"
          />

          {/* Dark Overlay Layer for Text Contrast */}
          <div className="absolute inset-0 bg-[#12161C]/70 backdrop-blur-[1px]" />

          {/* Foreground Hero Content Container */}
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-8 py-20 text-left">
            <div className="max-w-3xl space-y-6">
              <h1
                className="num text-left"
                style={{
                  fontSize: 'clamp(32px, 5.5vw, 64px)',
                  lineHeight: 1.1,
                  fontWeight: 400,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                Unified oversight for complex private wealth &amp; multi-asset portfolios.
              </h1>

              <p
                className="leading-relaxed"
                style={{
                  fontSize: 'clamp(15px, 2vw, 19px)',
                  color: 'var(--text-primary)',
                  maxWidth: 680,
                }}
              >
                Institutional-grade wealth management workstation engineered for high-net-worth individuals, family offices, and private wealth advisors.
              </p>

              <div className="pt-4">
                <button
                  onClick={onEnterPortal}
                  className="px-8 py-3.5 text-sm font-semibold rounded-sm transition-opacity shadow-xl"
                  style={{
                    background: 'var(--accent)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.9')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  Enter Portal
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══ EXPLAINER VIDEO SECTION ══ */}
        <section className="w-full py-16 md:py-24" style={{ background: 'var(--bg-base)' }}>
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-6">
            <div
              className="text-xs font-semibold uppercase tracking-wider pb-2"
              style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
            >
              Platform overview &amp; architecture
            </div>

            <div
              className="w-full overflow-hidden"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 2,
              }}
            >
              <video
                src="/ExplainVideo.webm"
                controls
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-auto block"
                aria-label="Nexgile WealthAgent platform overview video"
              />
            </div>
          </div>
        </section>

        {/* ══ CLOSING 4-CELL FEATURE ROW ══ */}
        <section className="w-full py-16 md:py-24" style={{ background: 'var(--bg-base)' }}>
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div
              className="grid grid-cols-1 md:grid-cols-4"
              style={{
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {[
                {
                  title: 'Individual Wealth',
                  desc: 'Aggregated portfolio oversight, holdings analytics, and verified net worth tracking.',
                },
                {
                  title: 'Tax & Estate',
                  desc: 'Multi-jurisdiction trust structures and tax-aware asset allocation strategies.',
                },
                {
                  title: 'Institutional Treasury',
                  desc: 'Cash liquidity buffers, sovereign yield management, and FX exposure controls.',
                },
                {
                  title: 'Advisor Tools',
                  desc: 'Client 360 master console, risk tolerance matrix, and advisory workstation.',
                },
              ].map((col, i) => (
                <div
                  key={i}
                  className="stat-cell p-6"
                  style={{
                    borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                    borderTop: 'none',
                  }}
                >
                  <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {col.title}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {col.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer
        className="w-full py-6 text-xs text-center"
        style={{
          borderTop: '1px solid var(--border)',
          color: 'var(--text-muted)',
          background: 'var(--bg-surface)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          Nexgile WealthAgent &bull; Institutional Private Wealth Management System
        </div>
      </footer>
    </div>
  );
};
