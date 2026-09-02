from app.schemas import ClientDetail, NetWorthSummary, Holding, Goal, PerformancePoint, RiskAssessment

CLIENTS_DATABASE = {
    "c-101": ClientDetail(
        id="c-101",
        name="Priya Sharma",
        email="priya.sharma@nexgile-wealth.in",
        avatar="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        role="Private HNW Client",
        aum=48500000.0,  # ₹4.85 Crore
        riskProfile="Aggressive Growth",
        statusFlags=["Annual Review Pending", "Tax Harvesting Qualified"],
        nextMeeting="2026-09-12 14:00 IST",
        netWorthSummary=NetWorthSummary(
            totalAssets=54500000.0,
            totalLiabilities=6000000.0,
            netWorth=48500000.0,
            ytdReturnPercent=14.8,
            ytdReturnAmount=6248000.0,
            cashPercentage=4.5
        ),
        holdings=[
            Holding(
                id="h-1",
                ticker="RELIANCE.NS",
                name="Reliance Industries Ltd",
                assetClass="Indian Equities",
                shares=3200.0,
                costBasis=2420.0,
                currentValue=11200000.0,
                gainLoss=3456000.0,
                gainLossPercent=44.6,
                allocationPercent=23.1,
                sector="Energy / Conglomerate",
                riskTag="High"
            ),
            Holding(
                id="h-2",
                ticker="TCS.NS",
                name="Tata Consultancy Services",
                assetClass="Indian Equities",
                shares=2200.0,
                costBasis=3400.0,
                currentValue=9200000.0,
                gainLoss=1720000.0,
                gainLossPercent=23.0,
                allocationPercent=19.0,
                sector="Technology",
                riskTag="Moderate"
            ),
            Holding(
                id="h-3",
                ticker="INFY.NS",
                name="Infosys Limited",
                assetClass="Indian Equities",
                shares=4500.0,
                costBasis=1450.0,
                currentValue=7475000.0,
                gainLoss=950000.0,
                gainLossPercent=14.5,
                allocationPercent=15.4,
                sector="Technology",
                riskTag="Moderate"
            ),
            Holding(
                id="h-4",
                ticker="GSEC-10Y",
                name="Government of India 10Y Bond",
                assetClass="Fixed Income",
                shares=6200.0,
                costBasis=1000.0,
                currentValue=6205000.0,
                gainLoss=5000.0,
                gainLossPercent=0.8,
                allocationPercent=12.8,
                sector="Sovereign Bonds",
                riskTag="Low"
            ),
            Holding(
                id="h-5",
                ticker="HDFCBANK.NS",
                name="HDFC Bank Limited",
                assetClass="Banking & Financials",
                shares=3100.0,
                costBasis=1520.0,
                currentValue=5160000.0,
                gainLoss=448000.0,
                gainLossPercent=9.5,
                allocationPercent=10.6,
                sector="Financial Services",
                riskTag="Moderate"
            ),
            Holding(
                id="h-6",
                ticker="GOLD-ETF",
                name="Nippon India ETF Gold BeES",
                assetClass="Alternative / Gold",
                shares=112000.0,
                costBasis=52.0,
                currentValue=9260000.0,
                gainLoss=3436000.0,
                gainLossPercent=58.9,
                allocationPercent=19.1,
                sector="Precious Metals",
                riskTag="Moderate"
            ),
        ],
        goals=[
            Goal(
                id="g-1",
                title="Early Retirement Trust",
                category="Retirement",
                targetAmount=65000000.0,
                currentAmount=48500000.0,
                targetYear=2032,
                monthlyContribution=125000.0,
                status="On Track"
            ),
            Goal(
                id="g-2",
                title="Children IIT & Higher Education Fund",
                category="Education",
                targetAmount=8000000.0,
                currentAmount=6200000.0,
                targetYear=2029,
                monthlyContribution=40000.0,
                status="Ahead"
            ),
            Goal(
                id="g-3",
                title="Goa Beach Villa Estate",
                category="Real Estate",
                targetAmount=25000000.0,
                currentAmount=11000000.0,
                targetYear=2028,
                monthlyContribution=80000.0,
                status="Behind"
            )
        ],
        performance=[
            PerformancePoint(date="2025-09", portfolioValue=41000000.0, benchmarkValue=40000000.0),
            PerformancePoint(date="2025-10", portfolioValue=41800000.0, benchmarkValue=40500000.0),
            PerformancePoint(date="2025-11", portfolioValue=43200000.0, benchmarkValue=41200000.0),
            PerformancePoint(date="2025-12", portfolioValue=44500000.0, benchmarkValue=42000000.0),
            PerformancePoint(date="2026-01", portfolioValue=43900000.0, benchmarkValue=41800000.0),
            PerformancePoint(date="2026-02", portfolioValue=45200000.0, benchmarkValue=42500000.0),
            PerformancePoint(date="2026-03", portfolioValue=46100000.0, benchmarkValue=43100000.0),
            PerformancePoint(date="2026-04", portfolioValue=45800000.0, benchmarkValue=42900000.0),
            PerformancePoint(date="2026-05", portfolioValue=47100000.0, benchmarkValue=43800000.0),
            PerformancePoint(date="2026-06", portfolioValue=47900000.0, benchmarkValue=44200000.0),
            PerformancePoint(date="2026-07", portfolioValue=48200000.0, benchmarkValue=44600000.0),
            PerformancePoint(date="2026-08", portfolioValue=48500000.0, benchmarkValue=45000000.0),
        ],
        riskAssessment=RiskAssessment(
            conservativeScore=22,
            moderateScore=48,
            aggressiveScore=85,
            riskCategory="Aggressive Growth",
            investmentHorizon="10+ Years",
            lossTolerance="High (-25% Drawdown Acceptable)"
        )
    ),
    "c-102": ClientDetail(
        id="c-102",
        name="Aarav Mehta",
        email="aarav.mehta@nexgile-wealth.in",
        avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        role="Tech Founder & Executive",
        aum=82000000.0,  # ₹8.20 Crore
        riskProfile="Moderate Growth",
        statusFlags=["Estate Plan Rebalancing", "Rebalancing Suggested"],
        nextMeeting="2026-09-08 10:30 IST",
        netWorthSummary=NetWorthSummary(
            totalAssets=91000000.0,
            totalLiabilities=9000000.0,
            netWorth=82000000.0,
            ytdReturnPercent=11.4,
            ytdReturnAmount=8380000.0,
            cashPercentage=6.2
        ),
        holdings=[
            Holding(
                id="h-201",
                ticker="TCS.NS",
                name="Tata Consultancy Services",
                assetClass="Indian Equities",
                shares=6500.0,
                costBasis=3200.0,
                currentValue=28600000.0,
                gainLoss=7800000.0,
                gainLossPercent=37.5,
                allocationPercent=34.8,
                sector="Technology",
                riskTag="Moderate"
            ),
            Holding(
                id="h-202",
                ticker="BHARTIARTL.NS",
                name="Bharti Airtel Limited",
                assetClass="Indian Equities",
                shares=11000.0,
                costBasis=950.0,
                currentValue=14400000.0,
                gainLoss=3950000.0,
                gainLossPercent=37.8,
                allocationPercent=17.5,
                sector="Telecom",
                riskTag="Moderate"
            ),
            Holding(
                id="h-203",
                ticker="PE-INDIA3",
                name="Nexgile India Venture Fund III",
                assetClass="Private Equity",
                shares=1.0,
                costBasis=15000000.0,
                currentValue=21000000.0,
                gainLoss=6000000.0,
                gainLossPercent=40.0,
                allocationPercent=25.6,
                sector="Venture Capital",
                riskTag="High"
            ),
            Holding(
                id="h-204",
                ticker="NIFTY-GS",
                name="Nifty 10 yr Benchmark G-Sec Index",
                assetClass="Fixed Income",
                shares=180000.0,
                costBasis=98.0,
                currentValue=18000000.0,
                gainLoss=360000.0,
                gainLossPercent=2.0,
                allocationPercent=22.1,
                sector="Fixed Income",
                riskTag="Low"
            ),
        ],
        goals=[
            Goal(
                id="g-201",
                title="Venture Endowment Fund",
                category="Wealth Preservation",
                targetAmount=100000000.0,
                currentAmount=82000000.0,
                targetYear=2030,
                monthlyContribution=250000.0,
                status="Ahead"
            ),
            Goal(
                id="g-202",
                title="Family Foundation Grant",
                category="Legacy",
                targetAmount=20000000.0,
                currentAmount=12000000.0,
                targetYear=2028,
                monthlyContribution=100000.0,
                status="On Track"
            )
        ],
        performance=[
            PerformancePoint(date="2025-09", portfolioValue=73500000.0, benchmarkValue=72000000.0),
            PerformancePoint(date="2025-12", portfolioValue=76000000.0, benchmarkValue=74500000.0),
            PerformancePoint(date="2026-03", portfolioValue=79000000.0, benchmarkValue=77000000.0),
            PerformancePoint(date="2026-06", portfolioValue=81000000.0, benchmarkValue=79000000.0),
            PerformancePoint(date="2026-08", portfolioValue=82000000.0, benchmarkValue=80000000.0),
        ],
        riskAssessment=RiskAssessment(
            conservativeScore=35,
            moderateScore=78,
            aggressiveScore=52,
            riskCategory="Moderate Growth",
            investmentHorizon="7-10 Years",
            lossTolerance="Moderate (-15% Drawdown Acceptable)"
        )
    ),
    "c-103": ClientDetail(
        id="c-103",
        name="Ananya Iyer",
        email="ananya.iyer@nexgile-wealth.in",
        avatar="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        role="Real Estate Investor",
        aum=125000000.0,  # ₹12.50 Crore
        riskProfile="Wealth Preservation",
        statusFlags=["Liquidity Buffer Adequate", "Quarterly Audit Complete"],
        nextMeeting="2026-09-20 11:00 IST",
        netWorthSummary=NetWorthSummary(
            totalAssets=140000000.0,
            totalLiabilities=15000000.0,
            netWorth=125000000.0,
            ytdReturnPercent=8.2,
            ytdReturnAmount=9460000.0,
            cashPercentage=12.0
        ),
        holdings=[
            Holding(
                id="h-301",
                ticker="DLF.NS",
                name="DLF Limited Real Estate",
                assetClass="Real Estate",
                shares=35000.0,
                costBasis=720.0,
                currentValue=27500000.0,
                gainLoss=2300000.0,
                gainLossPercent=9.1,
                allocationPercent=22.0,
                sector="Commercial & Residential",
                riskTag="Low"
            ),
            Holding(
                id="h-302",
                ticker="MUNI-IN",
                name="SBI Magnum Gilt Fund",
                assetClass="Fixed Income",
                shares=420000.0,
                costBasis=106.0,
                currentValue=44520000.0,
                gainLoss=1200000.0,
                gainLossPercent=2.7,
                allocationPercent=35.6,
                sector="Sovereign Debt",
                riskTag="Low"
            ),
            Holding(
                id="h-303",
                ticker="NIFTYBEES",
                name="Nippon India Nifty 50 BeES ETF",
                assetClass="Indian Equities",
                shares=210000.0,
                costBasis=230.0,
                currentValue=52980000.0,
                gainLoss=4680000.0,
                gainLossPercent=9.7,
                allocationPercent=42.4,
                sector="Broad Market Index",
                riskTag="Moderate"
            ),
        ],
        goals=[
            Goal(
                id="g-301",
                title="Dynasty Family Trust Generation II",
                category="Legacy",
                targetAmount=150000000.0,
                currentAmount=125000000.0,
                targetYear=2035,
                monthlyContribution=300000.0,
                status="On Track"
            )
        ],
        performance=[
            PerformancePoint(date="2025-09", portfolioValue=115000000.0, benchmarkValue=112000000.0),
            PerformancePoint(date="2025-12", portfolioValue=118000000.0, benchmarkValue=115000000.0),
            PerformancePoint(date="2026-03", portfolioValue=121000000.0, benchmarkValue=118000000.0),
            PerformancePoint(date="2026-08", portfolioValue=125000000.0, benchmarkValue=121000000.0),
        ],
        riskAssessment=RiskAssessment(
            conservativeScore=88,
            moderateScore=42,
            aggressiveScore=15,
            riskCategory="Conservative Income",
            investmentHorizon="15+ Years",
            lossTolerance="Low (-8% Max Drawdown)"
        )
    )
}
