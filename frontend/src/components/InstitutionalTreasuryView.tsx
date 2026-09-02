import React from 'react';
import type { ClientDetail } from '../types';

interface InstitutionalTreasuryViewProps {
  client: ClientDetail;
}

export const InstitutionalTreasuryView: React.FC<InstitutionalTreasuryViewProps> = ({ client }) => {
  const fmt = (v: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  const treasuryHoldings = [
    { fund: 'SBI Overnight Mutual Fund (Regular)', yield: '6.85%', allocation: 85000000, liquidityWindow: 'T+0 Same Day', risk: 'Ultra-Low' },
    { fund: 'HDFC Liquid Fund (Direct Plan)', yield: '7.15%', allocation: 98000000, liquidityWindow: 'T+1 Business Day', risk: 'Low' },
    { fund: 'ICICI Prudential Corporate Bond Fund', yield: '7.80%', allocation: 65000000, liquidityWindow: 'T+2 Business Days', risk: 'Low-Moderate' },
  ];

  return (
    <div
      className="flex-1 overflow-y-auto px-6 md:px-10 py-8 max-w-7xl mx-auto space-y-8"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* ══ HEADER ══ */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1
            className="num"
            style={{
              fontSize: 28,
              lineHeight: 1.2,
              fontWeight: 400,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            Institutional Treasury &amp; Liquidity Management
          </h1>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Module D &bull; Corporate liquidity, overnight yield optimization &amp; cash flow laddering for {client.name}
          </p>
        </div>
        <span className="tag tag-on-track">Module D Active</span>
      </div>

      {/* ══ STAT ROW ══ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="stat-cell py-5 px-6">
          <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Treasury Liquidity AUM</div>
          <div className="num text-2xl" style={{ color: 'var(--accent-text)' }}>
            ₹24.80 Cr
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Across liquid &amp; overnight pools</div>
        </div>

        <div className="stat-cell py-5 px-6" style={{ borderLeft: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Weighted Average Yield</div>
          <div className="num text-2xl" style={{ color: 'var(--gain-text)' }}>
            7.22% p.a.
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Tax-adjusted effective annual yield</div>
        </div>

        <div className="stat-cell py-5 px-6" style={{ borderLeft: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>30-Day Liquidity Buffer</div>
          <div className="num text-2xl" style={{ color: 'var(--text-primary)' }}>
            ₹8.50 Cr
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Instant T+0 settlement available</div>
        </div>
      </div>

      {/* ══ MONEY MARKET ALLOCATION TABLE ══ */}
      <div
        className="p-6 space-y-4"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 2,
        }}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div>
            <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              Liquidity &amp; Money Market Allocation
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              High-quality liquid assets (HQLA) for immediate cash management
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase" style={{ color: 'var(--text-muted)' }}>Treasury Pool / Fund</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase" style={{ color: 'var(--text-muted)' }}>Effective Yield</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase text-right" style={{ color: 'var(--text-muted)' }}>Allocation Amount</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase text-center" style={{ color: 'var(--text-muted)' }}>Liquidity Window</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase text-center" style={{ color: 'var(--text-muted)' }}>Risk Rating</th>
              </tr>
            </thead>
            <tbody>
              {treasuryHoldings.map((tr, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td className="py-3.5 px-3 font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>
                    {tr.fund}
                  </td>
                  <td className="py-3.5 px-3 num text-xs font-semibold" style={{ color: 'var(--gain-text)' }}>
                    {tr.yield}
                  </td>
                  <td className="py-3.5 px-3 num text-right text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>
                    {fmt(tr.allocation)}
                  </td>
                  <td className="py-3.5 px-3 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                    {tr.liquidityWindow}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="tag risk-low">{tr.risk}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
