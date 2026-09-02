export type UserRole = 'individual' | 'advisor' | 'institutional';

export interface Holding {
  id: string;
  ticker: string;
  name: string;
  assetClass: string;
  shares: number;
  costBasis: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  allocationPercent: number;
  sector: string;
  riskTag: 'Low' | 'Moderate' | 'High' | 'Speculative';
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  targetYear: number;
  monthlyContribution: number;
  status: 'On Track' | 'Ahead' | 'Behind';
}

export interface NetWorthSummary {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  ytdReturnPercent: number;
  ytdReturnAmount: number;
  cashPercentage: number;
}

export interface RiskAssessment {
  conservativeScore: number;
  moderateScore: number;
  aggressiveScore: number;
  riskCategory: string;
  investmentHorizon: string;
  lossTolerance: string;
}

export interface PerformancePoint {
  date: string;
  portfolioValue: number;
  benchmarkValue: number;
}

export interface ClientSummary {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  aum: number;
  riskProfile: string;
  statusFlags: string[];
  nextMeeting: string;
}

export interface ClientDetail extends ClientSummary {
  netWorthSummary: NetWorthSummary;
  holdings: Holding[];
  goals: Goal[];
  performance: PerformancePoint[];
  riskAssessment: RiskAssessment;
}
