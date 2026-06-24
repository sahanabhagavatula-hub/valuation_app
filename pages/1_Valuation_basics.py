"""
Valuation basics — start here
An interactive flashcard page explaining every concept used in the valuation
tool. Tap any card to flip it and see the definition and a real example.
"""

import streamlit as st
import sys
import os
import base64

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, subhero, flashcard_grid

st.set_page_config(page_title="Valuation basics — ValuFin", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)
subhero(
    st,
    "Valuation basics.",
    "Tap any card to flip it and see the definition and a real example. "
    "No prior finance knowledge assumed.",
    background="trading",
)

if st.button("←  Back to the valuation tool", use_container_width=True):
    st.switch_page("pages/2_Valuation_tool.py")

st.markdown("---")

# ---------------------------------------------------------------------------
# Flashcard grid — 8 core concepts
# ---------------------------------------------------------------------------
CARDS = [
    {
        "icon": "chart-bar",
        "term": "Revenue",
        "definition": "Total sales before anything is subtracted &mdash; the top line of the income statement.",
        "example": "100 cups at $2 each = $200 in revenue.",
    },
    {
        "icon": "percentage",
        "term": "EBITDA margin",
        "definition": "EBITDA divided by revenue &mdash; operating profit per dollar of sales.",
        "example": "$1B revenue, $300M EBITDA &rarr; 30% margin.",
    },
    {
        "icon": "trending-up",
        "term": "Net income",
        "definition": "True bottom-line profit after interest, taxes, and all expenses.",
        "example": "What's left for shareholders &mdash; the \"earnings\" in P/E.",
    },
    {
        "icon": "cash",
        "term": "Free cash flow",
        "definition": "Real spendable cash left after running and growing the business.",
        "example": "High profit plus heavy equipment spending can still mean low FCF.",
    },
    {
        "icon": "chart-line",
        "term": "DCF",
        "definition": "Values a company as its future cash flow, discounted back to today's dollars.",
        "example": "$100 received next year is worth less than $100 today.",
    },
    {
        "icon": "percentage-50",
        "term": "WACC",
        "definition": "The discount rate &mdash; the return investors require given the company's risk.",
        "example": "A stable company might use ~8%; a risky one might use ~15%.",
    },
    {
        "icon": "scale",
        "term": "Comps",
        "definition": "Valuing a company using the pricing multiples of similar public companies.",
        "example": "Peers trade at 20x earnings &rarr; apply 20x to your company's earnings.",
    },
    {
        "icon": "arrows-exchange",
        "term": "Enterprise vs equity value",
        "definition": "Equity value = enterprise value minus debt, plus cash.",
        "example": "Buying a company means paying off its debt but keeping its cash.",
    },
]

flashcard_grid(CARDS, height=420)

# ---------------------------------------------------------------------------
# Arrow chart divider image
# ---------------------------------------------------------------------------
_assets_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets")
_arrow_path = os.path.join(_assets_dir, "arrow_chart.png")
try:
    with open(_arrow_path, "rb") as f:
        _arrow_b64 = base64.b64encode(f.read()).decode("utf-8")
    st.markdown(
        f"""
        <div style="display:flex; justify-content:center; margin: 24px 0;">
            <img src="data:image/png;base64,{_arrow_b64}" style="width:60px; height:60px; opacity:0.7;" />
        </div>
        """,
        unsafe_allow_html=True,
    )
except FileNotFoundError:
    st.markdown("<div style='height: 24px'></div>", unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# DCF flow diagram (SVG)
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">How a DCF works, visually</p>', unsafe_allow_html=True)

dcf_diagram_svg = """
<svg viewBox="0 0 800 180" style="width:100%; max-width:800px; display:block; margin: 0 auto;">
    <text x="0" y="20" fill="#8e8675" font-size="11" font-family="Urbanist, sans-serif">Year 1</text>
    <text x="120" y="20" fill="#8e8675" font-size="11" font-family="Urbanist, sans-serif">Year 2</text>
    <text x="240" y="20" fill="#8e8675" font-size="11" font-family="Urbanist, sans-serif">Year 3</text>
    <text x="360" y="20" fill="#8e8675" font-size="11" font-family="Urbanist, sans-serif">Year 4</text>
    <text x="480" y="20" fill="#8e8675" font-size="11" font-family="Urbanist, sans-serif">Year 5</text>
    <text x="610" y="20" fill="#c9a875" font-size="11" font-family="Urbanist, sans-serif">Terminal value</text>

    <rect x="0" y="35" width="90" height="40" rx="6" fill="#1f1b15" stroke="#322c23"/>
    <rect x="120" y="35" width="90" height="40" rx="6" fill="#1f1b15" stroke="#322c23"/>
    <rect x="240" y="35" width="90" height="40" rx="6" fill="#1f1b15" stroke="#322c23"/>
    <rect x="360" y="35" width="90" height="40" rx="6" fill="#1f1b15" stroke="#322c23"/>
    <rect x="480" y="35" width="90" height="40" rx="6" fill="#1f1b15" stroke="#322c23"/>
    <rect x="600" y="35" width="190" height="40" rx="6" fill="#243a36" stroke="#3d6b66"/>

    <text x="45" y="59" fill="#ffffff" font-size="13" text-anchor="middle" font-family="Urbanist, sans-serif">FCF</text>
    <text x="165" y="59" fill="#ffffff" font-size="13" text-anchor="middle" font-family="Urbanist, sans-serif">FCF</text>
    <text x="285" y="59" fill="#ffffff" font-size="13" text-anchor="middle" font-family="Urbanist, sans-serif">FCF</text>
    <text x="405" y="59" fill="#ffffff" font-size="13" text-anchor="middle" font-family="Urbanist, sans-serif">FCF</text>
    <text x="525" y="59" fill="#ffffff" font-size="13" text-anchor="middle" font-family="Urbanist, sans-serif">FCF</text>
    <text x="695" y="59" fill="#9ed8f0" font-size="13" text-anchor="middle" font-family="Urbanist, sans-serif">"Forever" growth</text>

    <line x1="45" y1="85" x2="400" y2="130" stroke="#6b9b94" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="165" y1="85" x2="400" y2="130" stroke="#6b9b94" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="285" y1="85" x2="400" y2="130" stroke="#6b9b94" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="405" y1="85" x2="400" y2="130" stroke="#6b9b94" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="525" y1="85" x2="400" y2="130" stroke="#6b9b94" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="695" y1="85" x2="400" y2="130" stroke="#9ed8f0" stroke-width="1.5" stroke-dasharray="3,3"/>

    <circle cx="400" cy="130" r="6" fill="#3d6b66"/>
    <text x="400" y="155" fill="#ffffff" font-size="13" text-anchor="middle" font-family="Urbanist, sans-serif" font-weight="600">Company value today</text>
    <text x="400" y="172" fill="#8e8675" font-size="10.5" text-anchor="middle" font-family="Urbanist, sans-serif">Discounted and added together</text>
</svg>
"""
st.markdown(dcf_diagram_svg, unsafe_allow_html=True)

st.caption(
    "Each year's free cash flow (FCF), plus the terminal value representing everything "
    "beyond year 5, gets discounted back to today's dollars and added together — that "
    "total is the company's estimated value today."
)

# ---------------------------------------------------------------------------
# Helpful links
# ---------------------------------------------------------------------------
st.markdown(
    """
    <div class="valufin-links-box">
        <p class="valufin-links-title">Helpful links to go deeper</p>
        <a href="https://www.investopedia.com/terms/d/dcf.asp" target="_blank">↗ Investopedia — Discounted cash flow</a>
        <a href="https://www.investopedia.com/terms/w/wacc.asp" target="_blank">↗ Investopedia — WACC explained</a>
        <a href="https://www.investopedia.com/terms/e/ebitda.asp" target="_blank">↗ Investopedia — EBITDA</a>
        <a href="https://corporatefinanceinstitute.com/resources/valuation/comparable-company-analysis/" target="_blank">↗ Corporate Finance Institute — Comparable company analysis</a>
        <a href="https://corporatefinanceinstitute.com/resources/valuation/enterprise-value-vs-equity-value/" target="_blank">↗ Corporate Finance Institute — Enterprise value vs equity value</a>
        <a href="https://www.wsj.com/market-data" target="_blank">↗ WSJ Markets — live market data</a>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown("---")
if st.button("←  Back to the valuation tool", use_container_width=True, key="back_button_bottom"):
    st.switch_page("pages/2_Valuation_tool.py")
