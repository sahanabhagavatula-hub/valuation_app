"""
Investment Banking — category page
Topics relevant to IB recruiting. DCF valuation links to the real,
working tool; everything else is a placeholder for now.
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, category_header, topic_card

st.set_page_config(page_title="Investment Banking — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

if st.button("←  Back to home", use_container_width=False):
    st.switch_page("app.py")

category_header(st, "building-bank", "Investment Banking", "IB")

st.caption(
    "These are the skills IB interviews actually test — from technical modeling to "
    "understanding the deal process. Tap any topic to start learning."
)

if "coming_soon_topic" not in st.session_state:
    st.session_state.coming_soon_topic = None

TOPICS = [
    {
        "tag": "must know",
        "title": "DCF valuation",
        "description": "Discount future cash flows to find a company's intrinsic value. Fully built — try it now.",
        "action": "tool",
    },
    {
        "tag": "must know",
        "title": "M&A process",
        "description": "How mergers and acquisitions actually get done, from pitch to close.",
        "action": "soon",
    },
    {
        "tag": "must know",
        "title": "Comps analysis",
        "description": "Compare EV/EBITDA and P/E multiples across peer companies.",
        "action": "soon",
    },
    {
        "tag": "high value",
        "title": "Pitch books",
        "description": "How bankers package analysis into client-ready presentations.",
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
        "title": "Precedent transactions",
        "description": "Valuing a company based on what similar companies sold for in past M&A deals.",
        "action": "soon",
    },
]

cols = st.columns(3)
for i, topic in enumerate(TOPICS):
    with cols[i % 3]:
        clicked = topic_card(st, topic["tag"], topic["title"], topic["description"], button_key=f"ib_topic_{i}")
        if clicked:
            if topic["action"] == "tool":
                st.switch_page("pages/2_Valuation_tool.py")
            else:
                st.session_state.coming_soon_topic = topic["title"]
        st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

if st.session_state.coming_soon_topic:
    st.info(
        f"**{st.session_state.coming_soon_topic}** is coming soon — this topic's "
        f"AI tool hasn't been built yet. DCF valuation is ready to try now."
    )