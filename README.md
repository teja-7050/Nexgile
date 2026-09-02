# Nexgile-WealthAgent — Wealth Management Portal

An institutional-grade **Private Wealth Management Portal & Workstation** built for HNW clients, family offices, and wealth advisors.

---

## 🌐 Live Production Deployments

- **Frontend Application (Vercel)**: [https://nexgile-coral.vercel.app](https://nexgile-coral.vercel.app)
- **Backend REST API (Render)**: [https://nexgile.onrender.com](https://nexgile.onrender.com)
- **Interactive Swagger Docs**: [https://nexgile.onrender.com/docs](https://nexgile.onrender.com/docs)
- **GitHub Repositories**:
  - Primary: [https://github.com/teja-7050/Nexgile](https://github.com/teja-7050/Nexgile)
  - Mirror: [https://github.com/teja2772git/Nexgile-](https://github.com/teja2772git/Nexgile-)

---

## 🚀 Local Quick Start (2 Commands)

### 1. Start Python FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
*Backend runs locally at `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.*

### 2. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs locally at `http://localhost:5173`.*

---

## 📋 Assessment Specification Mapping & Active Modules

| Spec Module | Description | Status |
| :--- | :--- | :--- |
| **Pre-Portal** | Full-screen video hero landing page with slow playback rate, motion graphic background & explainer section | ✅ Active |
| **Module A** | **Individual Wealth Dashboard** — Aggregated net worth (*₹4.85 Cr*), Nifty 50 performance line chart with period selector (**1M / 3M / YTD / 1Y**), responsive two-column layout, wealth goals tracker, holdings table with cost basis & gain/loss | ✅ Active |
| **Module B** | **Tax & Estate Planning** — Tax-loss harvesting engine (*₹42.50 Lakhs YTD savings*) & registered family trust structures (*₹24.30 Cr AUM*) | ✅ Active |
| **Module C** | **Alternative Assets** — Private equity, venture capital, and private debt funds with fair market valuations (*₹4.07 Cr*), MOIC (*1.40x*), and Net IRR (*18.4%*) | ✅ Active |
| **Module D** | **Institutional Treasury** — Corporate cash liquidity management, overnight money market allocations (*₹24.80 Cr*) & yield optimization (*7.22% p.a.*) | ✅ Active |
| **Module E** | **Advisor Workstation** — Client 360 directory (*₹25.55 Cr Total AUM*), portfolio drilldown, and Risk Tolerance Matrix bar chart | ✅ Active |

---

## 🎨 Design System & Localization

- **Color Palette**: Charcoal-navy base `#12161C`, surface `#181D25`, 1px hairline borders `#262B34` (no shadows), single accent forest green `#2F5D4C` / `#5B9E88`.
- **Typography**: `DM Serif Display` for display numerals with `tabular-nums lining-nums`, `Inter` for UI labels.
- **Indian Market Localization**: Formatted in Indian Rupee (`₹`), Indian numbering system (`en-IN`), Indian market assets (`RELIANCE.NS`, `TCS.NS`, `INFY.NS`, `HDFCBANK.NS`, `GSEC-10Y`, `GOLD-ETF`), and benchmarked against the **Nifty 50 Index**.

---

## 🛠️ Environment Configuration for Production

When deploying the frontend to Vercel, configure the following environment variable in **Vercel Settings -> Environment Variables**:

```env
VITE_API_BASE_URL=https://nexgile.onrender.com/api
```
