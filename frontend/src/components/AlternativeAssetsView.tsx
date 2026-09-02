import React from 'react';
import type { ClientDetail } from '../types';

interface AlternativeAssetsViewProps {
  client: ClientDetail;
}

export const AlternativeAssetsView: React.FC<AlternativeAssetsViewProps> = ({ client }) => {
  const fmt = (v: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  const peInvestments = [
    { name: 'Nexgile India Venture Fund III', type: 'Venture Capital', vintage: 2023, invested: 15000000, fairValue: 21000000, moic: '1.40x', irr: '22.4%' },
    { name: 'Blume Ventures Fund IV', type: 'Early Stage Tech', vintage: 2022, invested: 7500000, fairValue: 9200000, moic: '1.23x', irr: '14.8%' },
    { name: 'Godrej Real Estate Opportunity Trust', type: 'Private Debt & RE', vintage: 2024, invested: 10000000, fairValue: 10500000, moic: '1.05x', irr: '12.0%' },
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
            Alternative Assets &amp; Private Markets
          </h1>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Module C &bull; Private equity, venture capital, private debt &amp; real estate for {client.name}
          </p>
        </div>
        <span className="tag tag-on-track">Module C Active</span>
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
          <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Total Private Assets</div>
          <div className="num text-2xl" style={{ color: 'var(--accent-text)' }}>
            ₹4.07 Cr
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Fair market valuation</div>
        </div>

        <div className="stat-cell py-5 px-6" style={{ borderLeft: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Portfolio IRR</div>
          <div className="num text-2xl" style={{ color: 'var(--gain-text)' }}>
            18.4% Net
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Blended net IRR across vintages</div>
        </div>

        <div className="stat-cell py-5 px-6" style={{ borderLeft: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Uncalled Commitment</div>
          <div className="num text-2xl" style={{ color: 'var(--text-primary)' }}>
            ₹60.00 Lakhs
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Capital call buffer reserved</div>
        </div>
      </div>

      {/* ══ PRIVATE EQUITY HOLDINGS TABLE ══ */}
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
              Private Investment Portfolio
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Venture capital funds, private credit funds, and direct private equity investments
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase" style={{ color: 'var(--text-muted)' }}>Fund / Asset Name</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase" style={{ color: 'var(--text-muted)' }}>Asset Class</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase" style={{ color: 'var(--text-muted)' }}>Vintage</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase text-right" style={{ color: 'var(--text-muted)' }}>Capital Invested</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase text-right" style={{ color: 'var(--text-muted)' }}>Fair Value</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase text-right" style={{ color: 'var(--text-muted)' }}>MOIC</th>
                <th className="py-2.5 px-3 font-medium text-[10px] uppercase text-right" style={{ color: 'var(--text-muted)' }}>Net IRR</th>
              </tr>
            </thead>
            <tbody>
              {peInvestments.map((inv, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td className="py-3.5 px-3 font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>
                    {inv.name}
                  </td>
                  <td className="py-3.5 px-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {inv.type}
                  </td>
                  <td className="py-3.5 px-3 num text-xs" style={{ color: 'var(--text-muted)' }}>
                    {inv.vintage}
                  </td>
                  <td className="py-3.5 px-3 num text-right text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {fmt(inv.invested)}
                  </td>
                  <td className="py-3.5 px-3 num text-right text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>
                    {fmt(inv.fairValue)}
                  </td>
                  <td className="py-3.5 px-3 num text-right text-xs font-semibold" style={{ color: 'var(--gain-text)' }}>
                    {inv.moic}
                  </td>
                  <td className="py-3.5 px-3 num text-right text-xs font-semibold" style={{ color: 'var(--gain-text)' }}>
                    {inv.irr}
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
