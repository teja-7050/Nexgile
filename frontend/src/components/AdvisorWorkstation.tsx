import React, { useState } from 'react';
import type { ClientDetail, ClientSummary } from '../types';
import { IndividualDashboard } from './IndividualDashboard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { ChevronLeft, ArrowRight } from 'lucide-react';

interface AdvisorWorkstationProps {
  clients: ClientSummary[];
  selectedClient: ClientDetail;
  onSelectClient: (id: string) => void;
  isLoading: boolean;
}

// Custom tooltip for Risk Bar Chart
const RiskTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'var(--bg-raised)',
        border: '1px solid var(--border)',
        borderRadius: '3px',
        padding: '8px 12px',
        fontSize: '12px',
      }}
    >
      <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>{label} Score</div>
      <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
        {payload[0].value} / 100
      </div>
    </div>
  );
};

export const AdvisorWorkstation: React.FC<AdvisorWorkstationProps> = ({
  clients,
  selectedClient,
  onSelectClient,
  isLoading
}) => {
  const [viewingDetail, setViewingDetail] = useState(false);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  // Total Advisor AUM
  const totalAum = clients.reduce((acc, c) => acc + c.aum, 0);

  // Risk Score Bar Chart Data using desaturated green/slate palette
  const { riskAssessment } = selectedClient;
  const riskScoresData = [
    { name: 'Conservative', score: riskAssessment.conservativeScore, fill: '#35495C' },
    { name: 'Moderate', score: riskAssessment.moderateScore, fill: '#2F5D4C' },
    { name: 'Aggressive', score: riskAssessment.aggressiveScore, fill: '#5B9E88' },
  ];

  if (viewingDetail) {
    return (
      <div className="space-y-4" style={{ background: 'var(--bg-base)', minHeight: '100%' }}>
        <div className="px-8 pt-6">
          <button
            onClick={() => setViewingDetail(false)}
            className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-sm transition-colors"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-raised)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)')}
          >
            <ChevronLeft size={14} />
            <span>Return to Advisor Client Directory</span>
          </button>
        </div>
        <IndividualDashboard
          client={selectedClient}
          allClients={clients as any}
          onSelectClient={(id) => onSelectClient(id)}
          isLoading={isLoading}
        />
      </div>
    );
  }

  const sectionHead: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: '1px solid var(--border)',
  };

  return (
    <div
      className="flex-1 overflow-y-auto px-8 py-8 max-w-6xl mx-auto space-y-10"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Advisor Header & KPI Bar */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h1 className="text-xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Advisor Workstation
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Client 360 Directory & Risk Assessment Matrix &bull; Module E
            </p>
          </div>
          <span className="tag tag-on-track">Active Session</span>
        </div>

        {/* 3-Column Hairline Stat Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div className="stat-cell py-5 px-6">
            <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Total Managed AUM</div>
            <div className="num text-2xl" style={{ color: 'var(--accent-text)', lineHeight: 1.1 }}>
              {formatCurrency(totalAum)}
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              across {clients.length} active client accounts
            </div>
          </div>

          <div className="stat-cell py-5 px-6" style={{ borderLeft: '1px solid var(--border)' }}>
            <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Active Risk Flags</div>
            <div className="num text-2xl" style={{ color: 'var(--text-primary)', lineHeight: 1.1 }}>
              2 Accounts
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Annual rebalancing advisory recommended
            </div>
          </div>

          <div className="stat-cell py-5 px-6" style={{ borderLeft: '1px solid var(--border)' }}>
            <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Upcoming Reviews</div>
            <div className="num text-2xl" style={{ color: 'var(--text-primary)', lineHeight: 1.1 }}>
              3 Scheduled
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Next: Priya Sharma (Sep 12)
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Client 360 Table + Risk Assessment Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client 360 Directory Table (2 Columns) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between" style={sectionHead}>
            <span>Client Directory</span>
            <span style={{ textTransform: 'none', fontWeight: 400, fontSize: 11 }}>
              {clients.length} Clients
            </span>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full text-left"
              style={{ borderCollapse: 'collapse', fontSize: 12, color: 'var(--text-secondary)' }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="py-2.5 px-3 font-medium" style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase' }}>
                    Client Name
                  </th>
                  <th className="py-2.5 px-3 text-right font-medium" style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase' }}>
                    AUM (INR)
                  </th>
                  <th className="py-2.5 px-3 font-medium" style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase' }}>
                    Risk Profile
                  </th>
                  <th className="py-2.5 px-3 font-medium" style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase' }}>
                    Next Meeting
                  </th>
                  <th className="py-2.5 px-3 text-right font-medium" style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => {
                  const isSelected = c.id === selectedClient.id;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => onSelectClient(c.id)}
                      className="cursor-pointer transition-colors"
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--bg-raised)' : 'transparent',
                        borderLeft: isSelected ? '2px solid var(--accent-text)' : '2px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="w-7 h-7 rounded-sm object-cover"
                            style={{ border: '1px solid var(--border)' }}
                          />
                          <div>
                            <div className="font-medium text-xs" style={{ color: 'var(--text-primary)' }}>
                              {c.name}
                            </div>
                            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                              {c.role}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-right num text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                        {formatCurrency(c.aum)}
                      </td>

                      <td className="py-3 px-3">
                        <span className="tag risk-moderate">{c.riskProfile}</span>
                      </td>

                      <td className="py-3 px-3 text-xs" style={{ color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                        {c.nextMeeting}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectClient(c.id);
                            setViewingDetail(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-sm transition-colors"
                          style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
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
                          <span>View 360</span>
                          <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Tolerance Assessment Widget */}
        <div>
          <div className="flex items-center justify-between" style={sectionHead}>
            <span>Risk Tolerance</span>
            <span style={{ textTransform: 'none', fontWeight: 400, fontSize: 11 }}>
              {selectedClient.name}
            </span>
          </div>

          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
            Assessed distribution across risk tolerance dimensions
          </p>

          <div style={{ height: 210, marginBottom: 20 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskScoresData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="0" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                <YAxis stroke="var(--text-muted)" tick={{ fontSize: 10 }} domain={[0, 100]} axisLine={false} tickLine={false} />
                <Tooltip content={<RiskTooltip />} />
                <Bar dataKey="score" radius={[2, 2, 0, 0]}>
                  {riskScoresData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            className="p-4 space-y-2 text-xs"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 2,
            }}
          >
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-muted)' }}>Investment Horizon</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                {riskAssessment.investmentHorizon}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-muted)' }}>Max Drawdown</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                {riskAssessment.lossTolerance}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
