import type { ClientSummary, ClientDetail, PerformancePoint } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000/api';

export async function fetchClients(): Promise<ClientSummary[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/clients`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch clients from backend API`);
    return await res.json();
  } catch (error) {
    console.warn('Backend API unavailable, utilizing client fallback data:', error);
    return [
      {
        id: 'c-101',
        name: 'Priya Sharma',
        email: 'priya.sharma@nexgile-wealth.in',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        role: 'Private HNW Client',
        aum: 48500000,
        riskProfile: 'Aggressive Growth',
        statusFlags: ['Annual Review Pending', 'Tax Harvesting Qualified'],
        nextMeeting: '2026-09-12 14:00 IST'
      },
      {
        id: 'c-102',
        name: 'Aarav Mehta',
        email: 'aarav.mehta@nexgile-wealth.in',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        role: 'Tech Founder & Executive',
        aum: 82000000,
        riskProfile: 'Moderate Growth',
        statusFlags: ['Estate Plan Rebalancing', 'Rebalancing Suggested'],
        nextMeeting: '2026-09-08 10:30 IST'
      },
      {
        id: 'c-103',
        name: 'Ananya Iyer',
        email: 'ananya.iyer@nexgile-wealth.in',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        role: 'Real Estate Investor',
        aum: 125000000,
        riskProfile: 'Wealth Preservation',
        statusFlags: ['Liquidity Buffer Adequate', 'Quarterly Audit Complete'],
        nextMeeting: '2026-09-20 11:00 IST'
      }
    ];
  }
}

export async function fetchClientDetail(clientId: string): Promise<ClientDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/clients/${clientId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch client detail for ${clientId}`);
    return await res.json();
  } catch (error) {
    console.warn(`Backend API unavailable, providing fallback detail for ${clientId}:`, error);
    return {
      id: clientId,
      name: clientId === 'c-102' ? 'Aarav Mehta' : clientId === 'c-103' ? 'Ananya Iyer' : 'Priya Sharma',
      email: 'priya.sharma@nexgile-wealth.in',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Private HNW Client',
      aum: 48500000,
      riskProfile: 'Aggressive Growth',
      statusFlags: ['Annual Review Pending', 'Tax Harvesting Qualified'],
      nextMeeting: '2026-09-12 14:00 IST',
      netWorthSummary: {
        totalAssets: 54500000,
        totalLiabilities: 6000000,
        netWorth: 48500000,
        ytdReturnPercent: 14.8,
        ytdReturnAmount: 6248000,
        cashPercentage: 4.5
      },
      holdings: [
        {
          id: 'h-1',
          ticker: 'RELIANCE.NS',
          name: 'Reliance Industries Ltd',
          assetClass: 'Indian Equities',
          shares: 3200,
          costBasis: 2420,
          currentValue: 11200000,
          gainLoss: 3456000,
          gainLossPercent: 44.6,
          allocationPercent: 23.1,
          sector: 'Energy / Conglomerate',
          riskTag: 'High'
        },
        {
          id: 'h-2',
          ticker: 'TCS.NS',
          name: 'Tata Consultancy Services',
          assetClass: 'Indian Equities',
          shares: 2200,
          costBasis: 3400,
          currentValue: 9200000,
          gainLoss: 1720000,
          gainLossPercent: 23.0,
          allocationPercent: 19.0,
          sector: 'Technology',
          riskTag: 'Moderate'
        },
        {
          id: 'h-3',
          ticker: 'INFY.NS',
          name: 'Infosys Limited',
          assetClass: 'Indian Equities',
          shares: 4500,
          costBasis: 1450,
          currentValue: 7475000,
          gainLoss: 950000,
          gainLossPercent: 14.5,
          allocationPercent: 15.4,
          sector: 'Technology',
          riskTag: 'Moderate'
        },
        {
          id: 'h-4',
          ticker: 'GSEC-10Y',
          name: 'Government of India 10Y Bond',
          assetClass: 'Fixed Income',
          shares: 6200,
          costBasis: 1000,
          currentValue: 6205000,
          gainLoss: 5000,
          gainLossPercent: 0.8,
          allocationPercent: 12.8,
          sector: 'Sovereign Bonds',
          riskTag: 'Low'
        },
        {
          id: 'h-5',
          ticker: 'GOLD-ETF',
          name: 'Nippon India ETF Gold BeES',
          assetClass: 'Alternative / Gold',
          shares: 112000,
          costBasis: 52,
          currentValue: 9260000,
          gainLoss: 3436000,
          gainLossPercent: 58.9,
          allocationPercent: 19.1,
          sector: 'Precious Metals',
          riskTag: 'Moderate'
        }
      ],
      goals: [
        {
          id: 'g-1',
          title: 'Early Retirement Trust',
          category: 'Retirement',
          targetAmount: 65000000,
          currentAmount: 48500000,
          targetYear: 2032,
          monthlyContribution: 125000,
          status: 'On Track'
        },
        {
          id: 'g-2',
          title: 'Children IIT & Higher Education Fund',
          category: 'Education',
          targetAmount: 8000000,
          currentAmount: 6200000,
          targetYear: 2029,
          monthlyContribution: 40000,
          status: 'Ahead'
        }
      ],
      performance: [
        { date: '2025-09', portfolioValue: 41000000, benchmarkValue: 40000000 },
        { date: '2025-11', portfolioValue: 43200000, benchmarkValue: 41200000 },
        { date: '2026-01', portfolioValue: 43900000, benchmarkValue: 41800000 },
        { date: '2026-03', portfolioValue: 46100000, benchmarkValue: 43100000 },
        { date: '2026-05', portfolioValue: 47100000, benchmarkValue: 43800000 },
        { date: '2026-08', portfolioValue: 48500000, benchmarkValue: 45000000 }
      ],
      riskAssessment: {
        conservativeScore: 22,
        moderateScore: 48,
        aggressiveScore: 85,
        riskCategory: 'Aggressive Growth',
        investmentHorizon: '10+ Years',
        lossTolerance: 'High (-25% Drawdown)'
      }
    };
  }
}

export async function fetchClientPerformance(clientId: string, period?: string): Promise<PerformancePoint[]> {
  try {
    const url = period ? `${API_BASE_URL}/clients/${clientId}/performance?period=${period}` : `${API_BASE_URL}/clients/${clientId}/performance`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch performance`);
    return await res.json();
  } catch (error) {
    console.warn(`Backend API performance endpoint fallback for ${clientId} (${period}):`, error);
    const defaultPerf = [
      { date: '2025-09', portfolioValue: 41000000, benchmarkValue: 40000000 },
      { date: '2025-11', portfolioValue: 43200000, benchmarkValue: 41200000 },
      { date: '2026-01', portfolioValue: 43900000, benchmarkValue: 41800000 },
      { date: '2026-03', portfolioValue: 46100000, benchmarkValue: 43100000 },
      { date: '2026-05', portfolioValue: 47100000, benchmarkValue: 43800000 },
      { date: '2026-08', portfolioValue: 48500000, benchmarkValue: 45000000 }
    ];
    if (period === '1M') return defaultPerf.slice(-2);
    if (period === '3M') return defaultPerf.slice(-4);
    if (period === 'YTD') return defaultPerf.slice(-3);
    return defaultPerf;
  }
}
