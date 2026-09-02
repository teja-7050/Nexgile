# Nexgile-WealthAgent Wealth Management Portal

A high-performance, institutional-grade **Wealth Management Portal** built for private banking and high-net-worth (HNW) wealth advisors.

---

## 🚀 Quick Start (2 Commands)

### 1. Start Python FastAPI Backend
```bash
cd backend
uvicorn app.main:app --reload
```
*Backend runs on `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.*

### 2. Start React Frontend
```bash
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 📋 Assessment Specification Mapping & Scope

| Spec Section | Implemented Feature | Status |
| :--- | :--- | :--- |
| **Section 2 & 7** | System Architecture, Repository Pattern, Role Switcher (Individual / Advisor / Institutional) | ✅ Complete |
| **Section 3A** | **Module A (Individual Wealth Dashboard)** — Total Assets, Liabilities, Net Worth, YTD Return %, 12-Month Performance Chart vs Nifty 50, Period Selector (1M / 3M / YTD / 1Y), Holdings Table with Cost Basis & Unrealized Gain/Loss, Asset Class Allocation, Wealth Goals Progress Tracker | ✅ Complete |
| **Section 3E & 6** | **Module E (Advisor Workstation)** — Total AUM KPI, Client 360 Directory, Portfolio Drilldown, Risk Tolerance Matrix Bar Chart, Pydantic v2 schemas, REST endpoints | ✅ Complete |
| **UX & Resiliency** | Skeleton Loading Placeholders, On-Brand Error States ("Unable to load client data — check that the server is running"), Empty States for zero goals/holdings | ✅ Complete |
| **Section 3B, 3C, 3D** | Tax & Estate Planning, Alternative Assets, Institutional Treasury | 🔒 Stubbed ("Coming Soon") |

---

## ⚠️ Known Limitations & Assessment Scope

This demonstration is a deliberate, high-polish implementation of key platform workflows within the assessment timeframe:

1. **Modules B, C, & D**: Modules B (Tax & Estate), C (Alternative Assets), and D (Institutional Treasury) are stubbed as disabled navigation items marked "Coming Soon".
2. **Authentication & Persistence**: User Authentication (OAuth2 / JWT) and permanent DB persistence are omitted per assessment guidelines. The backend uses an in-memory repository layer (`app/repositories.py`) designed to swap in SQLAlchemy / PostgreSQL cleanly.
3. **Document Vault & Integrations**: Document Vault file upload, PDF report export, and live custodian broker integrations (Section 5) are deferred to future production milestones.
