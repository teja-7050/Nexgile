import React, { useState, useEffect } from 'react';
import type { ClientDetail, PerformancePoint } from '../types';
import { fetchClientPerformance } from '../services/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { Search, Filter, Calendar, FileText, SlidersHorizontal } from 'lucide-react';

interface IndividualDashboardProps {
  client: ClientDetail;
  allClients: ClientDetail[];
  onSelectClient: (clientId: string) => void;
  isLoading: boolean;
}

// Muted allocation palette — 3 shades of forest green / slate family
const ALLOC_COLORS = [
  '#2F5D4C', // forest green (accent)
  '#3B6E5E', // mid green
  '#4A7A6E', // lighter green-teal
  '#35495C', // slate-teal
  '#455A6A', // steel-slate
  '#2E3F50', // deep navy-slate
];

// Custom tooltip for line chart with INR formatting
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const fmt = (v: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
  return (
    <div
      style={{
        background: 'var(--bg-raised)',
        border: '1px solid var(--border)',
        borderRadius: '3px',
        padding: '10px 14px',
        fontSize: '12px',
        lineHeight: '1.7',
      }}
    >
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, fontWeight: 500 }}>
          {p.name}: {fmt(p.value)}
        </div>
      ))}
    </div>
  );
};

export const IndividualDashboard: React.FC<IndividualDashboardProps> = ({
  client,
  allClients,
  onSelectClient,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assetClassFilter, setAssetClassFilter] = useState('all');
  const [period, setPeriod] = useState<'1M' | '3M' | 'YTD' | '1Y'>('1Y');
  const [performanceData, setPerformanceData] = useState<PerformancePoint[]>(client.performance);

  useEffect(() => {
    setPerformanceData(client.performance);
    setPeriod('1Y');
  }, [client]);

  const handlePeriodChange = async (newPeriod: '1M' | '3M' | 'YTD' | '1Y') => {
    setPeriod(newPeriod);
    try {
      const data = await fetchClientPerformance(client.id, newPeriod);
      setPerformanceData(data);
    } catch (e) {
      console.warn('Failed to load performance period:', e);
    }
  };

  const fmt = (v: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  // Extract first name for personalized greeting
  const firstName = client.name ? client.name.split(' ')[0] : 'Client';

  // ── Skeleton loading state (lightweight muted placeholder) ──
  if (isLoading) {
    return (
      <div className="p-8 space-y-6" style={{ color: 'var(--text-muted)' }}>
        <div style={{ height: 40, background: 'var(--bg-surface)', border: '1px solid var(--border)', opacity: 0.6 }} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div style={{ height: 160, background: 'var(--bg-surface)', border: '1px solid var(--border)', opacity: 0.5 }} />
            <div style={{ height: 260, background: 'var(--bg-surface)', border: '1px solid var(--border)', opacity: 0.5 }} />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div style={{ height: 180, background: 'var(--bg-surface)', border: '1px solid var(--border)', opacity: 0.5 }} />
            <div style={{ height: 240, background: 'var(--bg-surface)', border: '1px solid var(--border)', opacity: 0.5 }} />
          </div>
        </div>
      </div>
    );
  }

  const { netWorthSummary: nw, holdings, goals, riskAssessment } = client;
  const assetClasses = Array.from(new Set(holdings.map((h) => h.assetClass)));

  const filteredHoldings = holdings.filter((h) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      h.ticker.toLowerCase().includes(q) ||
      h.name.toLowerCase().includes(q) ||
      h.sector.toLowerCase().includes(q);
    const matchFilter = assetClassFilter === 'all' || h.assetClass === assetClassFilter;
    return matchSearch && matchFilter;
  });

  // Allocation bar segments (sorted largest → smallest)
  const totalValue = holdings.reduce((s, h) => s + h.currentValue, 0);
  const allocSegments = [...holdings]
    .sort((a, b) => b.currentValue - a.currentValue)
    .map((h, i) => ({
      ticker: h.ticker,
      assetClass: h.assetClass,
      pct: totalValue > 0 ? (h.currentValue / totalValue) * 100 : 0,
      color: ALLOC_COLORS[i % ALLOC_COLORS.length],
    }));

  // Equity weight for Allocation vs Target card
  const equityHoldings = holdings.filter((h) => h.assetClass.toLowerCase().includes('equity') || h.assetClass.toLowerCase().includes('equities'));
  const equityWeight = totalValue > 0
    ? (equityHoldings.reduce((s, h) => s + h.currentValue, 0) / totalValue * 100).toFixed(1)
    : '57.5';

  // Mock Recent Transactions Data (sourced in-voice)
  const recentTransactions = [
    { id: 't-1', name: 'Dividend Credit: Reliance Industries', type: 'Direct Credit', status: 'Success', amount: 34500, date: '12 February 2026', isGain: true },
    { id: 't-2', name: 'SIP Auto-Debit: Nifty 50 Index Fund', type: 'SIP Auto', status: 'Success', amount: 40000, date: '10 February 2026', isGain: true },
    { id: 't-3', name: 'Portfolio Rebalance: Gold ETF Purchase', type: 'Trade Execution', status: 'Pending', amount: 125000, date: '09 February 2026', isGain: false },
    { id: 't-4', name: 'Quarterly Wealth Advisory Fee', type: 'Account Fee', status: 'Executed', amount: 8500, date: '04 February 2026', isGain: false },
  ];

  // ── Risk tag style helper ──
  const riskStyle = (tag: string) => {
    if (tag === 'Low')        return 'risk-low';
    if (tag === 'Moderate')   return 'risk-moderate';
    if (tag === 'High')       return 'risk-high';
    return 'risk-spec';
  };

  // ── Goal status tag style ──
  const goalTagClass = (status: string) => {
    if (status === 'Ahead')    return 'tag tag-ahead';
    if (status === 'On Track') return 'tag tag-on-track';
    return 'tag tag-behind';
  };

  // Section card heading style
  const cardTitleHead: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-primary)',
  };

  return (
    <div
      className="flex-1 overflow-y-auto px-6 md:px-10 py-8 max-w-7xl mx-auto space-y-8"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* ══ HEADER GREETING ══ */}
      <div>
        <h1
          className="num"
          style={{
            fontSize: 32,
            lineHeight: 1.2,
            fontWeight: 400,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          Good Afternoon, {firstName}!
        </h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          Private wealth portal overview &amp; portfolio oversight
        </p>
      </div>

      {/* ══ TWO-COLUMN GRID LAYOUT (Main left, Rail right) ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ────────────────────────────────────────────────────────
           LEFT COLUMN (lg:col-span-7) — Insight, Net Worth, Performance, Recent Activity
           ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Row of Two Cards: Insight Card + Net Worth Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Insight Card (replaces Referral Card) */}
            <div
              className="p-5 flex flex-col justify-between"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 2,
              }}
            >
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
                  Market Observation
                </div>
                <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  Portfolio up <span style={{ color: 'var(--gain-text)', fontWeight: 600 }}>+{nw.ytdReturnPercent}% YTD</span> — ahead of Nifty 50 benchmark index.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] mt-4">
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  Rebalancing suggested for tax optimization.
                </span>
              </div>
            </div>

            {/* 2. Net Worth Card (replaces Main Wallet) */}
            <div
              className="p-5 flex flex-col justify-between"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 2,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Net Worth
                  </span>
                  
                  {/* Portfolio Selector */}
                  <select
                    value={client.id}
                    onChange={(e) => onSelectClient(e.target.value)}
                    className="text-[11px] py-0.5 px-1.5 outline-none"
                    style={{
                      background: 'var(--bg-raised)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      borderRadius: 2,
                      cursor: 'pointer',
                    }}
                  >
                    {allClients.map((c) => (
                      <option key={c.id} value={c.id} style={{ background: 'var(--bg-surface)' }}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className="num my-1"
                  style={{
                    fontSize: 28,
                    lineHeight: 1.1,
                    fontWeight: 400,
                    color: 'var(--accent-text)',
                  }}
                >
                  {fmt(nw.netWorth)}
                </div>

                <div className="text-xs font-medium" style={{ color: 'var(--gain-text)' }}>
                  +{nw.ytdReturnPercent}% from previous period
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] mt-3 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                Assets: {fmt(nw.totalAssets)} &bull; Cash: {nw.cashPercentage}%
              </div>
            </div>

          </div>

          {/* 3. Portfolio Performance Card (replaces Activity Summary) */}
          <div
            className="p-6 space-y-4"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 2,
            }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <span style={cardTitleHead}>Portfolio Performance</span>

              {/* 1M / 3M / YTD / 1Y Period Selector Buttons */}
              <div className="flex items-center gap-1">
                {(['1M', '3M', 'YTD', '1Y'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePeriodChange(p)}
                    className="px-2 py-0.5 text-xs rounded-sm transition-colors font-medium"
                    style={{
                      background: period === p ? 'var(--bg-raised)' : 'transparent',
                      border: period === p ? '1px solid var(--accent-text)' : '1px solid var(--border)',
                      color: period === p ? 'var(--text-primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1.5">
                <span style={{ display: 'inline-block', width: 14, height: 1.5, background: 'var(--accent-text)' }} />
                Portfolio (INR)
              </span>
              <span className="flex items-center gap-1.5">
                <span style={{ display: 'inline-block', width: 14, height: 1, borderTop: '1px dashed var(--text-muted)' }} />
                Nifty 50 Benchmark
              </span>
            </div>

            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickFormatter={(v) => `₹${(v / 10000000).toFixed(2)}Cr`} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="portfolioValue" name="Portfolio" stroke="var(--accent-text)" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: 'var(--accent-text)', strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="benchmarkValue" name="Nifty 50 Index" stroke="var(--text-muted)" strokeWidth={1} strokeDasharray="4 4" dot={false} activeDot={{ r: 3, fill: 'var(--text-muted)', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. Recent Activity / Transactions Card (replaces Recent Withdrawals) */}
          <div
            className="p-6 space-y-4"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 2,
            }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <span style={cardTitleHead}>Recent Transactions</span>
              <button
                className="text-xs font-medium hover:underline"
                style={{ color: 'var(--accent-text)' }}
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between py-2 px-3 rounded-sm transition-colors"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                      {tx.name}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {tx.type} &bull; {tx.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`tag ${tx.status === 'Success' ? 'tag-ahead' : tx.status === 'Executed' ? 'tag-on-track' : 'tag-behind'}`}>
                      {tx.status}
                    </span>
                    <span
                      className="num text-xs font-medium"
                      style={{ color: tx.isGain ? 'var(--gain-text)' : 'var(--text-secondary)' }}
                    >
                      {tx.isGain ? '+' : '-'}{fmt(tx.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>


        {/* ────────────────────────────────────────────────────────
           RIGHT COLUMN / RAIL (lg:col-span-5) — Risk Profile, Quick Actions, Allocation, Goals
           ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 space-y-6">

          {/* 1. Risk Profile Card (replaces Visa Card) */}
          <div
            className="p-6 space-y-4"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 2,
            }}
          >
            <div className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
              Risk Profile &amp; Mandate
            </div>

            <div>
              <div
                className="num"
                style={{
                  fontSize: 24,
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                }}
              >
                {riskAssessment.riskCategory}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Targeted asset allocation framework
              </div>
            </div>

            <div
              className="p-3 space-y-2 text-xs border-t border-[var(--border)] pt-3"
              style={{ background: 'var(--bg-raised)' }}
            >
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Investment Horizon:</span>
                <span style={{ color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                  {riskAssessment.investmentHorizon}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Max Drawdown Tolerance:</span>
                <span style={{ color: 'var(--loss-text)', fontVariantNumeric: 'tabular-nums' }}>
                  {riskAssessment.lossTolerance}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Quick Actions Row (replaces Top Up/Transfers/Request) */}
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
              Quick Actions
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-medium rounded-sm transition-colors"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-text)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                <SlidersHorizontal size={12} />
                <span>Rebalance</span>
              </button>

              <button
                className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-medium rounded-sm transition-colors"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-text)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                <Calendar size={12} />
                <span>Meeting</span>
              </button>

              <button
                className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-medium rounded-sm transition-colors"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-text)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                <FileText size={12} />
                <span>Report</span>
              </button>
            </div>
          </div>

          {/* 3. Allocation vs Target Card (replaces Daily Limit bar) */}
          <div
            className="p-6 space-y-4"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 2,
            }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <span style={cardTitleHead}>Allocation vs Target</span>
            </div>

            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Equity allocation: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{equityWeight}%</span> of 60.0% target.
            </div>

            {/* Horizontal Stacked Bar Component */}
            <div
              style={{
                height: 7,
                display: 'flex',
                gap: 2,
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {allocSegments.map((seg, i) => (
                <div
                  key={i}
                  title={`${seg.ticker} — ${seg.pct.toFixed(1)}%`}
                  style={{
                    width: `${seg.pct}%`,
                    background: seg.color,
                    height: '100%',
                  }}
                />
              ))}
            </div>

            {/* Legend Grid */}
            <div className="space-y-1.5 pt-2">
              {allocSegments.map((seg, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-2">
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 1, background: seg.color }} />
                    <span style={{ color: 'var(--text-muted)' }}>{seg.ticker}</span>
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                    {seg.pct.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Wealth Goals Card (replaces My Goals) */}
          <div
            className="p-6 space-y-4"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 2,
            }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <span style={cardTitleHead}>Wealth Goals</span>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                {goals.length} Goals Active
              </span>
            </div>

            {goals.length === 0 ? (
              <div className="py-6 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                No active wealth goals set for this client portfolio.
              </div>
            ) : (
              <div className="space-y-4">
                {goals.map((g) => {
                  const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
                  return (
                    <div key={g.id} className="space-y-1.5 border-b border-[var(--border-subtle)] pb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                          {g.title}
                        </span>
                        <span className={goalTagClass(g.status)}>{g.status}</span>
                      </div>

                      {/* 2px progress bar style */}
                      <div style={{ height: 2, background: 'var(--border)', borderRadius: 1 }}>
                        <div
                          className="goal-bar-fill"
                          style={{
                            width: `${pct}%`,
                            height: '100%',
                            background: 'var(--accent-text)',
                            borderRadius: 1,
                          }}
                        />
                      </div>

                      <div className="flex justify-between text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        <span>{fmt(g.currentAmount)}</span>
                        <span>{pct}% of {fmt(g.targetAmount)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ══ HOLDINGS TABLE SECTION (FULL-WIDTH BELOW CARDS) ══ */}
      <section
        className="p-6 space-y-4"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 2,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-3">
          <div>
            <span style={cardTitleHead}>Portfolio Holdings</span>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Complete position weightings, cost basis &amp; unrealized gain/loss
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div
              className="flex items-center gap-2 px-3 py-1.5"
              style={{
                background: 'var(--bg-base)',
                border: '1px solid var(--border)',
                borderRadius: 2,
              }}
            >
              <Search size={12} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Filter holdings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs outline-none w-36"
                style={{
                  background: 'transparent',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {/* Asset Class Filter */}
            <div
              className="flex items-center gap-2 px-3 py-1.5"
              style={{
                background: 'var(--bg-base)',
                border: '1px solid var(--border)',
                borderRadius: 2,
              }}
            >
              <Filter size={12} style={{ color: 'var(--text-muted)' }} />
              <select
                value={assetClassFilter}
                onChange={(e) => setAssetClassFilter(e.target.value)}
                className="text-xs outline-none cursor-pointer"
                style={{ background: 'transparent', color: 'var(--text-primary)' }}
              >
                <option value="all">All asset classes</option>
                {assetClasses.map((ac) => (
                  <option key={ac} value={ac} style={{ background: 'var(--bg-surface)' }}>
                    {ac}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table
            className="w-full"
            style={{
              borderCollapse: 'collapse',
              fontSize: 12,
              color: 'var(--text-secondary)',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {[
                  { label: 'Ticker / name',        align: 'left'  },
                  { label: 'Asset class',           align: 'left'  },
                  { label: 'Shares',                align: 'right' },
                  { label: 'Cost basis',            align: 'right' },
                  { label: 'Current value',         align: 'right' },
                  { label: 'Unrealized gain / loss',align: 'right' },
                  { label: 'Weight',                align: 'right' },
                  { label: 'Risk',                  align: 'center'},
                ].map((col, i) => (
                  <th
                    key={i}
                    className={`py-2.5 px-3 text-${col.align} font-medium`}
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 10,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredHoldings.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 text-center text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    No holdings match the current filter or search criteria.
                  </td>
                </tr>
              ) : (
                filteredHoldings.map((h) => {
                  const isGain = h.gainLoss >= 0;
                  return (
                    <tr
                      key={h.id}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLElement).style.background = 'transparent')
                      }
                    >
                      <td className="py-3 px-3">
                        <div
                          className="font-semibold text-xs"
                          style={{ color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}
                        >
                          {h.ticker}
                        </div>
                        <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          {h.name}
                        </div>
                      </td>

                      <td className="py-3 px-3" style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                        {h.assetClass}
                      </td>

                      <td className="py-3 px-3 text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {h.shares.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3 px-3 text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        ₹{h.costBasis.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>

                      <td className="py-3 px-3 text-right font-medium" style={{ color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                        {fmt(h.currentValue)}
                      </td>

                      <td
                        className="py-3 px-3 text-right"
                        style={{
                          color: isGain ? 'var(--gain-text)' : 'var(--loss-text)',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {isGain ? '+' : ''}
                        {fmt(h.gainLoss)}&ensp;
                        <span className="text-[10px]">
                          ({isGain ? '+' : ''}{h.gainLossPercent}%)
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {h.allocationPercent}%
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className={`tag ${riskStyle(h.riskTag)}`}>
                          {h.riskTag}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
