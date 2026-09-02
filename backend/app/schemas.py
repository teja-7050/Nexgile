from pydantic import BaseModel, Field
from typing import List, Optional

class Holding(BaseModel):
    id: str
    ticker: str
    name: str
    assetClass: str
    shares: float
    costBasis: float
    currentValue: float
    gainLoss: float
    gainLossPercent: float
    allocationPercent: float
    sector: str
    riskTag: str  # Low, Moderate, High, Speculative

class Goal(BaseModel):
    id: str
    title: str
    category: str  # Retirement, Education, Real Estate, Wealth Preservation
    targetAmount: float
    currentAmount: float
    targetYear: int
    monthlyContribution: float
    status: str  # On Track, Ahead, Behind

class NetWorthSummary(BaseModel):
    totalAssets: float
    totalLiabilities: float
    netWorth: float
    ytdReturnPercent: float
    ytdReturnAmount: float
    cashPercentage: float

class RiskAssessment(BaseModel):
    conservativeScore: int
    moderateScore: int
    aggressiveScore: int
    riskCategory: str  # Conservative, Moderate Growth, Aggressive Growth
    investmentHorizon: str
    lossTolerance: str

class PerformancePoint(BaseModel):
    date: str
    portfolioValue: float
    benchmarkValue: float

class ClientSummary(BaseModel):
    id: str
    name: str
    email: str
    avatar: str
    role: str
    aum: float
    riskProfile: str
    statusFlags: List[str]
    nextMeeting: str

class ClientDetail(ClientSummary):
    netWorthSummary: NetWorthSummary
    holdings: List[Holding]
    goals: List[Goal]
    performance: List[PerformancePoint]
    riskAssessment: RiskAssessment
