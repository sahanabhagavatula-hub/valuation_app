"""
ValuED — homepage
A recruiting-prep and financial-literacy hub. Pick a category to see its
topics; each topic links to a real learning tool (built one at a time) or
shows a "coming soon" placeholder.

Run with: streamlit run app.py
"""

import streamlit as st
from theme import inject_theme, topbar, category_card

st.set_page_config(page_title="ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

# ---------------------------------------------------------------------------
# Hero
# ---------------------------------------------------------------------------
st.markdown(
    """
    <div class="valufin-hero">
        <div class="valufin-hero-bg"></div>
        <div class="valufin-hero-overlay"></div>
        <div class="valufin-hero-content">
            <span class="valufin-eyebrow">Recruiting prep, explained from scratch</span>
            <h1>Learn finance.<br><span class="accent">Get the offer.</span></h1>
            <p class="valufin-hero-sub">
                ValuED teaches the skills real finance and consulting recruiting actually
                tests &mdash; valuation, modeling, case interviews, and more &mdash; with
                hands-on AI tools built in as you go.
            </p>
        </div>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# Category grid
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Pick a path</p>', unsafe_allow_html=True)

CATEGORIES = [
    {
        "icon": "building-bank",
        "title": "Investment Banking",
        "description": "M&A process, pitch books, live deal modeling, DCF, and comps.",
        "page": "pages/3_Investment_Banking.py",
    },
    {
        "icon": "chart-candle",
        "title": "Private Equity / Hedge Funds",
        "description": "Stock pitches, LBO modeling, comps analysis, and buy-side thinking.",
        "page": "pages/4_PE_HF.py",
    },
    {
        "icon": "briefcase",
        "title": "Wealth & Asset Management",
        "description": "Portfolio construction, client communication, and investment philosophy.",
        "page": "pages/5_Wealth_Asset_Management.py",
    },
    {
        "icon": "bulb",
        "title": "Consulting",
        "description": "Case interviews, frameworks, market sizing, and slide storytelling.",
        "page": "pages/6_Consulting.py",
    },
    {
        "icon": "building-skyscraper",
        "title": "General Business / Corporate Finance",
        "description": "Financial statements, key metrics, Excel modeling, and capital structure.",
        "page": "pages/7_Corporate_Finance.py",
    },
    {
        "icon": "users",
        "title": "Universal — every interview",
        "description": "Behavioral stories, \"why this firm,\" current events, and networking.",
        "page": "pages/8_Universal.py",
    },
]

cols = st.columns(3)
for i, cat in enumerate(CATEGORIES):
    with cols[i % 3]:
        category_card(st, cat["icon"], cat["title"], cat["description"])
        if st.button("Explore →", key=f"cat_{i}", use_container_width=True):
            st.switch_page(cat["page"])
        st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

st.markdown("<div style='height: 16px'></div>", unsafe_allow_html=True)
st.caption(
    "Each topic will eventually have its own hands-on AI tool — DCF valuation is built "
    "and ready now. Everything else is being built one topic at a time."
)