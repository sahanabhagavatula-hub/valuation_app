"""
Private Equity / Hedge Funds — category page
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, category_header, topic_card

st.set_page_config(page_title="PE / HF — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

if st.button("←  Back to home", use_container_width=False):
    st.switch_page("app.py")

category_header(st, "chart-candle", "Private Equity / Hedge Fund", "PE / HF")

st.caption(
    "Buy-side recruiting tests how you think about investments, not just how you "
    "model them. Tap any topic to start learning."
)

if "coming_soon_topic_pe" not in st.session_state:
    st.session_state.coming_soon_topic_pe = None

TOPICS = [
    {
        "tag": "must know",
        "title": "Stock pitch",
        "description": "A buy/sell recommendation with thesis, valuation, catalysts, and risks.",
        "action": "soon",
    },
    {
        "tag": "must know",
        "title": "LBO modeling",
        "description": "Leveraged buyout mechanics — how PE firms buy companies using debt.",
        "action": "soon",
    },
    {
        "tag": "must know",
        "title": "DCF valuation",
        "description": "Discount future cash flows to find intrinsic value. Fully built — try it now.",
        "action": "tool",
    },
    {
        "tag": "high value",
        "title": "Comps analysis",
        "description": "Compare EV/EBITDA and P/E multiples across peer companies.",
        "action": "soon",
    },
    {
        "tag": "high value",
        "title": "3-statement model",
        "description": "Income statement, balance sheet, and cash flow linked together.",
        "action": "soon",
    },
    {
        "tag": "good to have",
        "title": "Market sizing",
        "description": "Estimate TAM bottom-up or top-down for a given market.",
        "action": "soon",
    },
]

cols = st.columns(3)
for i, topic in enumerate(TOPICS):
    with cols[i % 3]:
        clicked = topic_card(st, topic["tag"], topic["title"], topic["description"], button_key=f"pe_topic_{i}")
        if clicked:
            if topic["action"] == "tool":
                st.switch_page("pages/2_Valuation_tool.py")
            else:
                st.session_state.coming_soon_topic_pe = topic["title"]
        st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

if st.session_state.coming_soon_topic_pe:
    st.info(
        f"**{st.session_state.coming_soon_topic_pe}** is coming soon — this topic's "
        f"AI tool hasn't been built yet. DCF valuation is ready to try now."
    )