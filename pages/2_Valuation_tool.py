"""
ValuFin — the valuation tool itself
Type a ticker, pull real financials from FMP, run a DCF + comps valuation,
and (optionally) get an AI-written analyst summary from Claude.
"""

import streamlit as st
import requests
import plotly.graph_objects as go
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, subhero, step_pill, icon_field_card

# ---------------------------------------------------------------------------
# Page setup + theme
# ---------------------------------------------------------------------------
st.set_page_config(page_title="ValuFin — AI Valuation Tool", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)
subhero(
    st,
    "AI valuation tool.",
    "Type a ticker, pull real financials, and learn how analysts value a company "
    "— step by step, with no finance background assumed.",
)

nav1, nav2 = st.columns(2)
with nav1:
    if st.button("📖  Valuation basics", use_container_width=True):
        st.switch_page("pages/1_Valuation_basics.py")
with nav2:
    if st.button("←  Back to home", use_container_width=True):
        st.switch_page("app.py")

# ---------------------------------------------------------------------------
# API keys (sidebar)
# ---------------------------------------------------------------------------
with st.sidebar:
    st.header("API keys")
    fmp_key = st.text_input(
        "FMP API key", type="password",
        help="Free at financialmodelingprep.com — pulls real company financials.",
    )
    anthropic_key = st.text_input(
        "Anthropic API key (optional)", type="password",
        help="Only needed for the AI-written analyst summary. Leave blank to skip it.",
    )
    st.markdown("---")
    st.caption(
        "Your keys are only used to call FMP and Anthropic directly from your "
        "own machine. Nothing is stored or sent anywhere else."
    )

FMP_BASE = "https://financialmodelingprep.com/stable"


# ---------------------------------------------------------------------------
# FMP data fetch
# ---------------------------------------------------------------------------
def fmp_get(endpoint: str, params: dict, api_key: str):
    params = dict(params)
    params["apikey"] = api_key
    resp = requests.get(f"{FMP_BASE}/{endpoint}", params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    if isinstance(data, dict) and data.get("Error Message"):
        raise ValueError(data["Error Message"])
    return data


def fetch_company_data(ticker: str, api_key: str):
    profile = fmp_get("profile", {"symbol": ticker}, api_key)
    if not profile:
        raise ValueError(f"No company found for ticker '{ticker}'.")
    profile = profile[0]

    income = fmp_get("income-statement", {"symbol": ticker, "period": "annual", "limit": 2}, api_key)
    if not income:
        raise ValueError(f"No income statement data for '{ticker}'.")
    latest_income = income[0]
    prior_income = income[1] if len(income) > 1 else None

    balance = fmp_get("balance-sheet-statement", {"symbol": ticker, "period": "annual", "limit": 1}, api_key)
    if not balance:
        raise ValueError(f"No balance sheet data for '{ticker}'.")
    latest_balance = balance[0]

    growth_estimate = None
    try:
        estimates = fmp_get("analyst-estimates", {"symbol": ticker, "period": "annual", "limit": 5}, api_key)
        if estimates and len(estimates) >= 2:
            estimates_sorted = sorted(estimates, key=lambda x: x["date"])
            rev_start = latest_income["revenue"]
            rev_end = estimates_sorted[-1]["revenueAvg"]
            years = len(estimates_sorted)
            if rev_start > 0 and years > 0:
                growth_estimate = ((rev_end / rev_start) ** (1 / years) - 1) * 100
    except Exception:
        growth_estimate = None

    revenue = latest_income["revenue"]
    ebitda = latest_income.get("ebitda", 0)
    ebitda_margin = (ebitda / revenue * 100) if revenue else 0

    if growth_estimate is None and prior_income and prior_income.get("revenue"):
        growth_estimate = (revenue / prior_income["revenue"] - 1) * 100

    # Recent price history for the post-lookup chart
    price_history = []
    try:
        hist = fmp_get(
            "historical-price-eod/light", {"symbol": ticker, "limit": 130}, api_key
        )
        if hist:
            price_history = sorted(hist, key=lambda x: x["date"])
    except Exception:
        price_history = []

    return {
        "company_name": profile.get("companyName", ticker),
        "ticker": ticker.upper(),
        "sector": profile.get("sector", ""),
        "industry": profile.get("industry", ""),
        "price": profile.get("price", 0),
        "revenue": revenue / 1e6,
        "ebitda_margin": round(ebitda_margin, 1),
        "net_income": latest_income.get("netIncome", 0) / 1e6,
        "shares": latest_income.get("weightedAverageShsOutDil", 0) / 1e6,
        "debt": latest_balance.get("totalDebt", 0) / 1e6,
        "cash": latest_balance.get("cashAndCashEquivalents", 0) / 1e6,
        "growth_estimate": round(growth_estimate, 1) if growth_estimate else 5.0,
        "price_history": price_history,
    }


# ---------------------------------------------------------------------------
# Valuation engine (DCF + comps)
# ---------------------------------------------------------------------------
def run_dcf(rev0, growth, ebitda_margin, debt, cash, shares, wacc, term_growth):
    fcf_margin = max(ebitda_margin / 100 - 0.06, 0.02)
    rev = rev0
    pv_sum = 0.0
    for yr in range(1, 6):
        rev *= 1 + growth / 100
        fcf = rev * fcf_margin
        pv_sum += fcf / (1 + wacc / 100) ** yr
    final_fcf = rev * fcf_margin
    tv = (final_fcf * (1 + term_growth / 100)) / ((wacc / 100) - (term_growth / 100))
    pv_tv = tv / (1 + wacc / 100) ** 5
    enterprise_value = pv_sum + pv_tv
    equity_value = enterprise_value - debt + cash
    implied_price = equity_value / shares if shares else 0
    return {"enterprise_value": enterprise_value, "equity_value": equity_value, "implied_price": implied_price}


SECTOR_MULTIPLES = {
    "semiconductor": (9, 16, "semiconductors"),
    "software": (18, 28, "software"),
    "internet": (16, 24, "internet / digital advertising"),
    "technology": (14, 24, "technology"),
    "retail": (8, 15, "retail"),
    "bank": (7, 10, "financials"),
    "financial": (7, 10, "financials"),
    "energy": (6, 11, "energy"),
    "health": (12, 20, "healthcare"),
    "industrial": (9, 17, "industrials"),
    "consumer": (10, 18, "consumer"),
    "auto": (7, 12, "automotive"),
    "communication": (14, 22, "communication services"),
}

# Rough typical EBITDA margin per sector, used only to color the comparison bar
SECTOR_TYPICAL_MARGIN = {
    "semiconductor": 35, "software": 32, "internet": 35, "technology": 28,
    "retail": 12, "bank": 40, "financial": 35, "energy": 25, "health": 22,
    "industrial": 18, "consumer": 16, "auto": 12, "communication": 30,
}


def pick_comp_multiples(industry: str, sector: str):
    text = f"{industry} {sector}".lower()
    for key, (ev_ebitda, pe, label) in SECTOR_MULTIPLES.items():
        if key in text:
            return ev_ebitda, pe, label
    return 10, 18, "general market"


def pick_typical_margin(industry: str, sector: str):
    text = f"{industry} {sector}".lower()
    for key, margin in SECTOR_TYPICAL_MARGIN.items():
        if key in text:
            return margin
    return 20


def run_comps(revenue, ebitda_margin, net_income, debt, cash, shares, industry, sector):
    ev_ebitda_mult, pe_mult, label = pick_comp_multiples(industry, sector)
    ebitda = revenue * (ebitda_margin / 100)
    ev_from_ebitda = ebitda * ev_ebitda_mult
    equity_from_ev = ev_from_ebitda - debt + cash
    price_from_ev_ebitda = equity_from_ev / shares if shares else 0
    price_from_pe = (net_income * pe_mult) / shares if shares else 0
    implied_price = (price_from_ev_ebitda + price_from_pe) / 2
    return {
        "implied_price": implied_price, "ev_ebitda_mult": ev_ebitda_mult, "pe_mult": pe_mult,
        "label": label, "price_from_ev_ebitda": price_from_ev_ebitda, "price_from_pe": price_from_pe,
    }


def get_ai_writeup(inputs, dcf_result, comps_result, wacc, anthropic_key):
    prompt = f"""You are a buyside equity analyst writing a concise valuation summary for a finance student's learning tool. The reader is a beginner — write clearly, explain reasoning in plain English, no excessive hedging or disclaimers.

Company: {inputs['company_name']} ({inputs['ticker']})
Industry: {inputs['industry']}
Revenue: ${inputs['revenue']:.0f}M
EBITDA margin: {inputs['ebitda_margin']:.1f}%
Net income: ${inputs['net_income']:.0f}M
Diluted shares: {inputs['shares']:.0f}M
Total debt: ${inputs['debt']:.0f}M
Cash: ${inputs['cash']:.0f}M
Current share price: ${inputs['price']:.2f}
Assumed 5yr revenue growth: {inputs['growth']:.1f}%
WACC used: {wacc}%

DCF implied share price: ${dcf_result['implied_price']:.2f}
DCF implied enterprise value: ${dcf_result['enterprise_value']:.0f}M
Comps implied share price: ${comps_result['implied_price']:.2f} (using {comps_result['ev_ebitda_mult']}x EV/EBITDA and {comps_result['pe_mult']}x P/E typical for {comps_result['label']})

Write a 4-paragraph analyst writeup: (1) one-line valuation verdict and rough magnitude vs current price, (2) what's driving the DCF and the key sensitivity (briefly explain WACC and terminal growth), (3) how comps compares and why DCF vs comps might differ, (4) 2-3 risks or assumptions worth questioning. Plain text only, no markdown, flowing paragraphs separated by blank lines."""

    resp = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={"x-api-key": anthropic_key, "anthropic-version": "2023-06-01", "content-type": "application/json"},
        json={"model": "claude-sonnet-4-6", "max_tokens": 1000, "messages": [{"role": "user", "content": prompt}]},
        timeout=30,
    )
    resp.raise_for_status()
    data = resp.json()
    return "\n\n".join(block["text"] for block in data["content"] if block["type"] == "text")


# ---------------------------------------------------------------------------
# UI — ticker lookup
# ---------------------------------------------------------------------------
step_pill(st, 1, "Look up a company")
st.caption("Type any public company's stock ticker and we'll pull its real financials automatically.")

col1, col2 = st.columns([3, 1])
with col1:
    ticker_input = st.text_input("Ticker symbol", placeholder="e.g. AAPL, GOOGL, INTC", label_visibility="collapsed")
with col2:
    fetch_clicked = st.button("Fetch data", use_container_width=True)

if "company_data" not in st.session_state:
    st.session_state.company_data = None

if fetch_clicked:
    if not fmp_key:
        st.error("Add your FMP API key in the sidebar first. It's free at financialmodelingprep.com.")
    elif not ticker_input.strip():
        st.error("Enter a ticker symbol.")
    else:
        try:
            with st.spinner(f"Fetching {ticker_input.upper()}..."):
                st.session_state.company_data = fetch_company_data(ticker_input.strip(), fmp_key)
            st.success(f"Loaded {st.session_state.company_data['company_name']}")
        except Exception as e:
            st.error(f"Couldn't fetch data: {e}")
            st.session_state.company_data = None

data = st.session_state.company_data or {}

# Recent stock price chart, shown right after a successful lookup
if data.get("price_history"):
    dates = [p["date"] for p in data["price_history"]]
    prices = [p["price"] for p in data["price_history"]]
    price_fig = go.Figure()
    price_fig.add_trace(go.Scatter(
        x=dates, y=prices, mode="lines", line=dict(color="#6b9b94", width=2),
        fill="tozeroy", fillcolor="rgba(61,107,102,0.12)",
    ))
    price_fig.update_layout(
        height=160, margin=dict(l=10, r=10, t=10, b=10),
        paper_bgcolor="#1f1b15", plot_bgcolor="#1f1b15",
        font_color="#8e8675",
        xaxis=dict(showgrid=False, tickfont=dict(size=10)),
        yaxis=dict(showgrid=True, gridcolor="#322c23", tickfont=dict(size=10), tickprefix="$"),
    )
    st.caption(f"{data.get('ticker', '')} — recent price history")
    st.plotly_chart(price_fig, use_container_width=True)

# ---------------------------------------------------------------------------
# UI — review / edit inputs
# ---------------------------------------------------------------------------
step_pill(st, 2, "Review the numbers")
st.caption("Click any field below to see what it means. Adjust anything you want to test a different scenario.")

key_suffix = data.get("ticker", "manual")

company_name = st.text_input("Company name", value=data.get("company_name", ""), key=f"name_{key_suffix}")

typical_margin = pick_typical_margin(data.get("industry", ""), data.get("sector", ""))
ebitda_margin_val = data.get("ebitda_margin", 0)
margin_pct_of_typical = min(int((ebitda_margin_val / typical_margin) * 50), 100) if typical_margin else 0
margin_color = "#3d6b66" if ebitda_margin_val >= typical_margin * 0.85 else "#a3733d"
margin_caption_color = "#6b9b94" if ebitda_margin_val >= typical_margin * 0.85 else "#c79b5f"
margin_caption = (
    f"In line with typical sector margin (~{typical_margin}%)"
    if ebitda_margin_val >= typical_margin * 0.85
    else f"Below typical sector margin (~{typical_margin}%)"
)

net_income_val = data.get("net_income", 0)
ni_color = "#3d6b66" if net_income_val >= 0 else "#a34d3d"
ni_caption_color = "#6b9b94" if net_income_val >= 0 else "#c77b6f"
ni_caption = "Profitable" if net_income_val >= 0 else "Negative — worth discussing in an interview"
ni_bar_pct = 60 if net_income_val >= 0 else 15

c1, c2 = st.columns(2)
with c1:
    icon_field_card(st, "currency-dollar", "Revenue, latest FY ($M)", f"${data.get('revenue', 0):,.0f}")
    icon_field_card(
        st, "percentage", "EBITDA margin (%)", f"{ebitda_margin_val:.1f}%",
        bar_pct=margin_pct_of_typical, bar_color=margin_color,
        bar_caption=margin_caption, bar_caption_color=margin_caption_color,
    )
    icon_field_card(
        st, "trending-up" if net_income_val >= 0 else "trending-down",
        "Net income ($M)", f"${net_income_val:,.0f}",
        bar_pct=ni_bar_pct, bar_color=ni_color,
        bar_caption=ni_caption, bar_caption_color=ni_caption_color,
    )
with c2:
    icon_field_card(st, "chart-pie", "Diluted shares outstanding (M)", f"{data.get('shares', 0):,.0f}")
    icon_field_card(st, "credit-card", "Total debt ($M)", f"${data.get('debt', 0):,.0f}")
    icon_field_card(st, "wallet", "Cash & equivalents ($M)", f"${data.get('cash', 0):,.0f}")

with st.expander("Edit the raw numbers manually"):
    revenue = st.number_input("Revenue ($M)", value=float(data.get("revenue", 0)), step=100.0, key=f"revenue_{key_suffix}")
    ebitda_margin = st.number_input("EBITDA margin (%)", value=float(data.get("ebitda_margin", 0)), step=0.5, key=f"ebitda_{key_suffix}")
    net_income = st.number_input("Net income ($M)", value=float(data.get("net_income", 0)), step=100.0, key=f"ni_{key_suffix}")
    shares = st.number_input("Diluted shares outstanding (M)", value=float(data.get("shares", 0)), step=10.0, key=f"shares_{key_suffix}")
    debt = st.number_input("Total debt ($M)", value=float(data.get("debt", 0)), step=100.0, key=f"debt_{key_suffix}")
    cash = st.number_input("Cash & equivalents ($M)", value=float(data.get("cash", 0)), step=100.0, key=f"cash_{key_suffix}")
    price = st.number_input("Current share price ($)", value=float(data.get("price", 0)), step=0.5, key=f"price_{key_suffix}")
    st.caption(
        "Revenue is the top line of the income statement. EBITDA margin shows how much "
        "operating profit comes from each dollar of sales. Net income is the true bottom-line "
        "profit. Shares outstanding converts total company value into a per-share price. Debt "
        "is subtracted and cash is added when bridging enterprise value to equity value."
    )

growth = st.slider(
    "Expected revenue growth, yr 1-5 (%)", -10.0, 40.0, float(data.get("growth_estimate", 5.0)), 0.5,
    key=f"growth_{key_suffix}",
    help="How fast you expect sales to grow each year on average, over the next 5 years. "
    "Pre-filled using Wall Street analyst estimates where available.",
)
industry = st.text_input("Industry / sector", value=data.get("industry", ""), key=f"industry_{key_suffix}", help="Used to pick realistic comparable-company multiples.")
sector = data.get("sector", "")

# ---------------------------------------------------------------------------
# Assumptions — sliders
# ---------------------------------------------------------------------------
step_pill(st, 3, "Assumptions")
st.caption("These two drive the DCF and are usually what an interviewer will ask you to defend.")

a1, a2 = st.columns(2)
with a1:
    wacc = st.slider(
        "WACC (%)", 5.0, 15.0, 10.0, 0.5,
        help="The discount rate. Riskier or more leveraged companies typically use a higher WACC "
        "(8-10% is fairly typical for a large, stable company; 12%+ for something riskier).",
    )
with a2:
    term_growth = st.slider(
        "Terminal growth rate (%)", 1.0, 4.0, 2.5, 0.25,
        help="The growth rate assumed forever after year 5 — usually close to long-run GDP "
        "growth, around 2-3%.",
    )

run_clicked = st.button("Run valuation", type="primary", use_container_width=True)

# ---------------------------------------------------------------------------
# Run valuation + render results
# ---------------------------------------------------------------------------
if run_clicked:
    if not shares or not revenue or not price:
        st.error("Revenue, shares outstanding, and current price are required.")
    else:
        dcf_result = run_dcf(revenue, growth, ebitda_margin, debt, cash, shares, wacc, term_growth)
        comps_result = run_comps(revenue, ebitda_margin, net_income, debt, cash, shares, industry, sector)

        st.markdown('<p class="valufin-section-label">Results</p>', unsafe_allow_html=True)
        st.caption(
            "Two independent methods estimate fair value. When they agree, that's a stronger "
            "signal. When they disagree, that's worth understanding why."
        )

        m1, m2, m3 = st.columns(3)
        m1.metric("Current price", f"${price:.2f}")
        m2.metric("DCF implied", f"${dcf_result['implied_price']:.2f}")
        m3.metric("Comps implied", f"${comps_result['implied_price']:.2f}")

        blended_fair = (dcf_result["implied_price"] + comps_result["implied_price"]) / 2
        diff_pct = (blended_fair - price) / price * 100
        verdict = "Fairly valued"
        if diff_pct > 10:
            verdict = "Undervalued"
        elif diff_pct < -10:
            verdict = "Overvalued"

        st.markdown(
            f"""
            <div class="valufin-verdict-card">
                <p class="valufin-verdict-label">Verdict</p>
                <p class="valufin-verdict-value">{verdict}</p>
                <p class="valufin-verdict-sub">Blended estimate is {abs(diff_pct):.1f}%
                {'above' if diff_pct > 0 else 'below'} the current price. This is a model
                estimate, not a guarantee.</p>
            </div>
            """,
            unsafe_allow_html=True,
        )

        # Football field chart
        st.markdown("**Football field — valuation range**")
        with st.expander("What is this chart?"):
            st.markdown(
                "A 'football field' chart is the standard way analysts present a valuation "
                "range — the bars look like yard lines on a football field. Each bar shows a "
                "range of estimated fair value from one method. The dashed line is where the "
                "stock actually trades today."
            )

        dcf_low, dcf_high = dcf_result["implied_price"] * 0.85, dcf_result["implied_price"] * 1.15
        comps_low, comps_high = comps_result["implied_price"] * 0.9, comps_result["implied_price"] * 1.1

        fig = go.Figure()
        fig.add_trace(go.Bar(
            y=["Comps", "DCF"],
            x=[comps_high - comps_low, dcf_high - dcf_low],
            base=[comps_low, dcf_low],
            orientation="h",
            marker_color=["#6b9b94", "#3d6b66"],
            hovertemplate="%{base:$.2f} - %{x:$.2f}<extra></extra>",
        ))
        fig.add_vline(x=price, line_dash="dash", line_color="#c79b5f",
                      annotation_text="Current price", annotation_position="top",
                      annotation_font_color="#ffffff")
        fig.update_layout(
            height=220, showlegend=False, margin=dict(l=10, r=10, t=30, b=10),
            xaxis_title="Implied share price ($)",
            paper_bgcolor="#16140f", plot_bgcolor="#16140f",
            font_color="#ffffff",
            xaxis=dict(gridcolor="#322c23"), yaxis=dict(gridcolor="#322c23"),
        )
        st.plotly_chart(fig, use_container_width=True)

        # Sensitivity table
        st.markdown("**DCF sensitivity (implied price, $)**")
        st.caption("WACC (rows) vs terminal growth rate (columns)")
        with st.expander("Why does this table matter?"):
            st.markdown(
                "WACC and terminal growth move the DCF answer the most — small changes to "
                "either can swing the implied price a lot, since terminal value usually makes "
                "up most of a DCF's total. This grid shows the implied price across a realistic "
                "range of both, instead of relying on one single guess."
            )
        waccs = [8, 9, 10, 11, 12]
        terms = [1.5, 2, 2.5, 3, 3.5]
        rows = []
        for w in waccs:
            row = {"WACC": f"{w}%"}
            for t in terms:
                r = run_dcf(revenue, growth, ebitda_margin, debt, cash, shares, w, t)
                row[f"{t}%"] = f"${r['implied_price']:.2f}"
            rows.append(row)
        st.dataframe(rows, hide_index=True, use_container_width=True)

        # Assumptions
        st.markdown("**Key assumptions used**")
        st.caption(f"WACC: {wacc}% · Terminal growth: {term_growth}%")
        st.caption(
            "FCF margin assumption: EBITDA margin minus ~6 percentage points, as a rough "
            "stand-in for capex and working capital needs that EBITDA doesn't capture."
        )
        st.caption(
            f"Comps: {comps_result['ev_ebitda_mult']}x EV/EBITDA, {comps_result['pe_mult']}x P/E "
            f"(typical multiples for {comps_result['label']} companies — ballpark figures, not "
            f"a live peer set)."
        )

        with st.expander("How exactly was the comps price calculated?"):
            st.markdown(
                f"""
**EV/EBITDA approach:** EBITDA × {comps_result['ev_ebitda_mult']}x typical multiple for
{comps_result['label']} companies → enterprise value → subtract debt, add cash → equity value
→ divide by shares. Implies **${comps_result['price_from_ev_ebitda']:.2f}** per share.

**P/E approach:** Net income × {comps_result['pe_mult']}x typical multiple → divide by shares.
Implies **${comps_result['price_from_pe']:.2f}** per share.

Averaged together: **${comps_result['implied_price']:.2f}**. A real analyst would use an actual
selected peer group's current multiples rather than a sector-average assumption.
                """
            )

        # AI writeup
        st.markdown("**AI analyst writeup**")
        st.caption("A plain-English narrative explaining the verdict, written by Claude.")
        if anthropic_key:
            try:
                with st.spinner("Writing analyst summary..."):
                    inputs = {
                        "company_name": company_name, "ticker": data.get("ticker", ""),
                        "industry": industry, "revenue": revenue, "ebitda_margin": ebitda_margin,
                        "net_income": net_income, "shares": shares, "debt": debt, "cash": cash,
                        "price": price, "growth": growth,
                    }
                    writeup = get_ai_writeup(inputs, dcf_result, comps_result, wacc, anthropic_key)
                st.write(writeup)
            except Exception as e:
                st.warning(f"Couldn't generate the AI writeup: {e}")
        else:
            st.info("Add an Anthropic API key in the sidebar to get an AI-written analyst summary.")

        st.markdown(
            """
            <div class="valufin-links-box">
                <p class="valufin-links-title">Helpful links</p>
                <a href="https://www.investopedia.com/terms/d/dcf.asp" target="_blank">↗ Investopedia — DCF deep dive</a>
                <a href="https://corporatefinanceinstitute.com/resources/valuation/comparable-company-analysis/" target="_blank">↗ CFI — Comparable company analysis</a>
                <a href="https://www.wsj.com/market-data" target="_blank">↗ WSJ Markets — live market data</a>
            </div>
            """,
            unsafe_allow_html=True,
        )
