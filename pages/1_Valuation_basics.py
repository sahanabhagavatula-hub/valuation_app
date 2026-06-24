"""
Valuation basics — start here
An interactive flashcard page explaining every concept used in the valuation
tool. Tap any card to flip it and see the definition and a real example.
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, subhero, flashcard_grid, enable_arrow_background

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

# Faint arrow-chart watermark, fixed in place, visible behind everything
# from this point down to the bottom of the page.
enable_arrow_background(st)

# ---------------------------------------------------------------------------
# Flashcard grid — 8 core concepts
# ---------------------------------------------------------------------------
CARDS = [
    {
        "icon": "chart-bar",
        "term": "Revenue",
        "definition": "The total amount of money a company brought in from selling its products or services, before subtracting any costs at all. It's the very first line of the income statement, which is why it's often called the \"top line.\" Every other profit metric &mdash; EBITDA, net income, and so on &mdash; is just revenue with progressively more costs subtracted from it.",
        "example": "A lemonade stand selling 100 cups at $2 each has $200 in revenue, even before paying for lemons, sugar, or cups.",
    },
    {
        "icon": "percentage",
        "term": "EBITDA margin",
        "definition": "EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) divided by revenue. It tells you what percentage of every dollar of sales the company keeps as core operating profit, before financing decisions (debt) or accounting treatments get involved. A higher margin generally means a more efficient, more profitable core business.",
        "example": "A company with $1B in revenue and $300M in EBITDA has a 30% EBITDA margin &mdash; meaning 30 cents of every revenue dollar becomes operating profit.",
    },
    {
        "icon": "trending-up",
        "term": "Net income",
        "definition": "The company's true bottom-line profit, after every expense has been subtracted: cost of goods, operating costs, interest paid on debt, and taxes owed. This is what's actually left over for shareholders, and it's the \"earnings\" referenced in metrics like the P/E ratio.",
        "example": "A company can have strong revenue and EBITDA but still post negative net income if it carries heavy debt or paid a one-time tax charge that year.",
    },
    {
        "icon": "cash",
        "term": "Free cash flow",
        "definition": "The real, spendable cash a business generates after running its operations and paying for the equipment or infrastructure it needs to keep growing. Unlike net income, FCF strips out non-cash accounting items, which makes it a more literal measure of cash that could actually be paid out to investors.",
        "example": "A company can report strong net income on paper but have weak free cash flow if it's spending heavily on new factories or equipment that year.",
    },
    {
        "icon": "chart-line",
        "term": "DCF",
        "definition": "Short for Discounted Cash Flow. A DCF values a company by forecasting its free cash flow for the next several years (usually 5), estimating everything beyond that as a \"terminal value,\" and then discounting all of it back to today's dollars using a discount rate. Add it all up, and that's the company's estimated value today.",
        "example": "$100 of cash flow expected next year is worth less than $100 in your hand today, because money has time value and the future is uncertain &mdash; discounting accounts for both.",
    },
    {
        "icon": "percentage-50",
        "term": "WACC",
        "definition": "Weighted Average Cost of Capital &mdash; the discount rate used in a DCF. It represents the blended return that a company's debt holders and shareholders require for the risk of investing in that specific business. Riskier or more volatile companies need a higher WACC, which shrinks future cash flow more heavily and lowers the resulting valuation.",
        "example": "A large, stable company like a utility might use a WACC around 7-8%, while an early-stage tech startup might warrant 12-15% or more.",
    },
    {
        "icon": "scale",
        "term": "Comps",
        "definition": "Short for comparable company analysis. Instead of forecasting anything, comps value a company by looking at what similar, publicly traded companies currently trade for, expressed as a multiple (like price-to-earnings or EV/EBITDA), and applying that same multiple to the company being valued.",
        "example": "If comparable companies trade at 20 times earnings, and your company earns $5 per share, comps would suggest a price around $100 per share.",
    },
    {
        "icon": "arrows-exchange",
        "term": "Enterprise vs equity value",
        "definition": "Enterprise value is the value of the entire business and its operations, regardless of how it's financed. Equity value is specifically what's left for shareholders after debt is accounted for. The bridge: equity value equals enterprise value, minus total debt, plus cash on hand.",
        "example": "If you bought a whole company, you'd have to pay off its debt (subtract it) but you'd immediately get to keep its cash (add it back) &mdash; that's exactly how the math works.",
    },
]

flashcard_grid(CARDS, height=620)

st.markdown("<div style='height: 16px'></div>", unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# DCF flow diagram (SVG) — rendered via components.html, since st.markdown
# unreliably renders raw <svg> tags (it can print them as literal text
# instead of drawing the graphic)
# ---------------------------------------------------------------------------
import streamlit.components.v1 as components

st.markdown('<p class="valufin-section-label">How a DCF works, visually</p>', unsafe_allow_html=True)

dcf_diagram_html = """
<div style="background: transparent; padding: 0;">
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
</div>
"""
components.html(dcf_diagram_html, height=200, scrolling=False)

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
