from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

from app.schemas import ClientSummary, ClientDetail, Holding, Goal, PerformancePoint, RiskAssessment
from app.repositories import wealth_repo

app = FastAPI(
    title="Nexgile-WealthAgent API",
    description="Backend REST endpoints for HNW Wealth Management Portal",
    version="1.0.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for easy development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "portal": "Nexgile-WealthAgent Wealth Management Portal",
        "status": "Online",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/clients", response_model=List[ClientSummary])
def get_clients():
    """Retrieve list of high-net-worth clients for Advisor Workstation (Module E)."""
    return wealth_repo.list_clients()

@app.get("/api/clients/{client_id}", response_model=ClientDetail)
def get_client_detail(client_id: str):
    """Retrieve complete client details & net worth summary for Module A / Advisor Client 360."""
    client = wealth_repo.get_client(client_id)
    if not client:
        raise HTTPException(status_code=404, detail=f"Client '{client_id}' not found.")
    return client

@app.get("/api/clients/{client_id}/holdings", response_model=List[Holding])
def get_client_holdings(client_id: str):
    """Retrieve holdings table data with cost basis, current value, gain/loss, sector & risk tags."""
    holdings = wealth_repo.get_holdings(client_id)
    if holdings is None:
        raise HTTPException(status_code=404, detail=f"Client '{client_id}' not found.")
    return holdings

@app.get("/api/clients/{client_id}/goals", response_model=List[Goal])
def get_client_goals(client_id: str):
    """Retrieve wealth goal tracking metrics vs target allocations."""
    goals = wealth_repo.get_goals(client_id)
    if goals is None:
        raise HTTPException(status_code=404, detail=f"Client '{client_id}' not found.")
    return goals

@app.get("/api/clients/{client_id}/performance", response_model=List[PerformancePoint])
def get_client_performance(client_id: str, period: Optional[str] = Query(None, description="Time period filter: 1M, 3M, YTD, 1Y")):
    """Retrieve time series performance comparison vs benchmark for specified period."""
    performance = wealth_repo.get_performance(client_id, period=period)
    if performance is None:
        raise HTTPException(status_code=404, detail=f"Client '{client_id}' not found.")
    return performance

@app.get("/api/clients/{client_id}/risk", response_model=RiskAssessment)
def get_client_risk(client_id: str):
    """Retrieve risk tolerance assessment breakdown scores."""
    risk = wealth_repo.get_risk(client_id)
    if risk is None:
        raise HTTPException(status_code=404, detail=f"Client '{client_id}' not found.")
    return risk
