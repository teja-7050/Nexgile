from typing import List, Optional
from app.schemas import ClientSummary, ClientDetail, Holding, Goal, PerformancePoint, RiskAssessment
from app.mock_data import CLIENTS_DATABASE

class WealthRepository:
    """Repository interface layer separating mock storage from FastAPI route logic."""

    def list_clients(self) -> List[ClientSummary]:
        clients = []
        for c in CLIENTS_DATABASE.values():
            clients.append(
                ClientSummary(
                    id=c.id,
                    name=c.name,
                    email=c.email,
                    avatar=c.avatar,
                    role=c.role,
                    aum=c.aum,
                    riskProfile=c.riskProfile,
                    statusFlags=c.statusFlags,
                    nextMeeting=c.nextMeeting
                )
            )
        return clients

    def get_client(self, client_id: str) -> Optional[ClientDetail]:
        return CLIENTS_DATABASE.get(client_id)

    def get_holdings(self, client_id: str) -> Optional[List[Holding]]:
        client = CLIENTS_DATABASE.get(client_id)
        return client.holdings if client else None

    def get_goals(self, client_id: str) -> Optional[List[Goal]]:
        client = CLIENTS_DATABASE.get(client_id)
        return client.goals if client else None

    def get_performance(self, client_id: str, period: Optional[str] = None) -> Optional[List[PerformancePoint]]:
        client = CLIENTS_DATABASE.get(client_id)
        if not client:
            return None
        
        perf = client.performance
        if not period or period == "1Y":
            return perf
        elif period == "1M":
            return perf[-2:] if len(perf) >= 2 else perf
        elif period == "3M":
            return perf[-4:] if len(perf) >= 4 else perf
        elif period == "YTD":
            ytd_points = [p for p in perf if p.date >= "2026-01"]
            return ytd_points if ytd_points else perf[-5:]
        return perf

    def get_risk(self, client_id: str) -> Optional[RiskAssessment]:
        client = CLIENTS_DATABASE.get(client_id)
        return client.riskAssessment if client else None

# Singleton repository instance
wealth_repo = WealthRepository()
