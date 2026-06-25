"""
Wealth & Asset Management — category page
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, category_header, topic_card

st.set_page_config(page_title="Wealth & Asset Management — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

if st.button("←  Back to home", use_container_width=False):
    st.switch_page("app.py")

category_header(st, "briefcase", "Wealth & Asset Management", "WAM")

st.caption(
    "Client-facing investing and portfolio management — a different skill set than "
    "pure deal-making. Tap any topic to start learning."
)

if "coming_soon_topic_wam" not in st.session_state:
    st.session_state.coming_soon_topic_wam = None

TOPICS = [
    {
        "tag": "must know",
        "title": "Portfolio construction",
        "description": "Asset allocation, diversification, and risk-return tradeoffs.",
    },
    {
        "tag": "must know",
        "title": "Client communication",
        "description": "Explaining markets and performance to non-expert clients.",
    },
    {
        "tag": "high value",
        "title": "Investment philosophy",
        "description": "Active vs. passive, value vs. growth, and how to articulate your view.",
    },
    {
        "tag": "high value",
        "title": "Risk management",
        "description": "Volatility, drawdowns, and how advisors manage downside risk.",
    },
    {
        "tag": "good to have",
        "title": "Financial planning basics",
        "description": "Retirement planning, tax considerations, and estate basics.",
    },
    {
        "tag": "good to have",
        "title": "Alternative investments",
        "description": "Private equity, real estate, and hedge fund strategies as portfolio pieces.",
    },
]

cols = st.columns(3)
for i, topic in enumerate(TOPICS):
    with cols[i % 3]:
        clicked = topic_card(st, topic["tag"], topic["title"], topic["description"], button_key=f"wam_topic_{i}")
        if clicked:
            st.session_state.coming_soon_topic_wam = topic["title"]
        st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

if st.session_state.coming_soon_topic_wam:
    st.info(f"**{st.session_state.coming_soon_topic_wam}** is coming soon — this topic's AI tool hasn't been built yet.")