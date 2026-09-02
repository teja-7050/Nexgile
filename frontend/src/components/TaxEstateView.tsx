import React from 'react';
import type { ClientDetail } from '../types';

interface TaxEstateViewProps {
  client: ClientDetail;
}

export const TaxEstateView: React.FC<TaxEstateViewProps> = ({ client }) => {
  const fmt = (v: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  const taxHarvestPositions = [
    { ticker: 'INFY.NS', name: 'Infosys Limited', loss: 450000, harvestableTaxSaving: 112500, type: 'Short Term Loss', status: 'Eligible' },
    { ticker: 'GSEC-10Y', name: 'Government of India 10Y Bond', loss: 120000, harvestableTaxSaving: 30000, type: 'Long Term Loss', status: 'Eligible' },
  ];

  const trusts = [
    { name: 'Sharma Dynasty Family Trust', type: 'Revocable Living Trust', value: 184000000, trustee: 'Nexgile Fiduciary Services', beneficiaries: 'Children & Descendants', status: 'Active' },
    { name: 'Iyer Education & Philanthropy Trust', type: 'Irrevocable Charitable Trust', value: 42000000, trustee: 'Standard Chartered Fiduciary', beneficiaries: 'IIT Endowment & Philanthropy', status: 'Active' },
    { name: 'Mehta Tech Venture HoldCo Trust', type: 'Private Family Trust', value: 17000000, trustee: 'Nexgile Fiduciary Services', beneficiaries: 'Family Members', status: 'In Review' },
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
            Tax &amp; Estate Planning
          </h1>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Module B &bull; Trust structures, tax-loss harvesting &amp; generation wealth transfer strategies for {client.name}
          </p>
        </div>
        <span className="tag tag-on-track">Module B Active</span>
      </div>

      {/* ══ STAT ROW (HAIRLINE DIVIDED) ══ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="stat-cell py-5 px-6">
          <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Total Trust Assets</div>
          <div className="num text-2xl" style={{ color: 'var(--accent-text)' }}>
            ₹24.30 Cr
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Across 3 registered trusts</div>
        </div>

        <div className="stat-cell py-5 px-6" style={{ borderLeft: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Tax Harvest Saved (YTD)</div>
          <div className="num text-2xl" style={{ color: 'var(--gain-text)' }}>
            ₹42.50 Lakhs
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Capital gain tax minimized</div>
        </div>

        <div className="stat-cell py-5 px-6" style={{ borderLeft: '1px solid var(--border)' }}>
          <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Estate Allocation</div>
          <div className="num text-2xl" style={{ color: 'var(--text-primary)' }}>
            88% Allocated
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Gen II beneficiary protection</div>
        </div>
      </div>

      {/* ══ MAIN GRID: TAX LOSS HARVESTING + TRUST STRUCTURES ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Tax Loss Harvesting Opportunities */}
        <div
          className="lg:col-span-7 p-6 space-y-4"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 2,
          }}
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div>
              <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                Tax-Loss Harvesting Engine
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Identified position losses to offset realized capital gains for FY 2025-26
              </div>
            </div>
            <button
              className="px-3 py-1 text-xs font-medium rounded-sm transition-colors"
              style={{
                background: 'var(--accent)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              Harvest Losses
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="py-2.5 px-3 font-medium text-[10px] uppercase" style={{ color: 'var(--text-muted)' }}>Asset Position</th>
                  <th className="py-2.5 px-3 font-medium text-[10px] uppercase" style={{ color: 'var(--text-muted)' }}>Unrealized Loss</th>
                  <th className="py-2.5 px-3 font-medium text-[10px] uppercase text-right" style={{ color: 'var(--text-muted)' }}>Est. Tax Saving</th>
                  <th className="py-2.5 px-3 font-medium text-[10px] uppercase text-center" style={{ color: 'var(--text-muted)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {taxHarvestPositions.map((pos, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>{pos.ticker}</div>
                      <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{pos.name}</div>
                    </td>
                    <td className="py-3 px-3 num" style={{ color: 'var(--loss-text)' }}>
                      -{fmt(pos.loss)}
                    </td>
                    <td className="py-3 px-3 num text-right" style={{ color: 'var(--gain-text)' }}>
                      +{fmt(pos.harvestableTaxSaving)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="tag tag-on-track">{pos.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Estate & Trust Breakdown */}
        <div
          className="lg:col-span-5 p-6 space-y-4"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 2,
          }}
        >
          <div className="border-b border-[var(--border)] pb-3">
            <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              Registered Trust Vehicles
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Active estate structures &amp; fiduciary governance
            </div>
          </div>

          <div className="space-y-4">
            {trusts.map((t, i) => (
              <div key={i} className="p-3.5 space-y-1.5" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                  <span className="tag tag-ahead">{t.status}</span>
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {t.type} &bull; Trustee: {t.trustee}
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span style={{ color: 'var(--text-muted)' }}>AUM Value:</span>
                  <span className="num font-semibold" style={{ color: 'var(--accent-text)' }}>{fmt(t.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
