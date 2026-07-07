"""
General Business / Corporate Finance — category page
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, category_header, topic_card

st.set_page_config(page_title="Corporate Finance — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

if st.button("←  Back to home", use_container_width=False):
    st.switch_page("app.py")

category_header(st, "building-skyscraper", "General Business / Corporate Finance", "Corp Finance")

st.caption(
    "The foundational skills that show up everywhere in finance, regardless of "
    "which specific path you're recruiting for. Tap any topic to start learning."
)

if "coming_soon_topic_corpfin" not in st.session_state:
    st.session_state.coming_soon_topic_corpfin = None

TOPICS = [
    {
        "tag": "must know",
        "title": "Financial statements",
        "description": "Read and interpret the income statement, balance sheet, and cash flow statement.",
        "action": "soon",
    },
    {
        "tag": "must know",
        "title": "Key metrics",
        "description": "Revenue, EBITDA, margins, ROE, EPS — what they mean and why they matter.",
        "action": "soon",
    },
    {
        "tag": "high value",
        "title": "DCF valuation",
        "description": "Discount future cash flows to find intrinsic value. Fully built — try it now.",
        "action": "tool",
    },
    {
        "tag": "high value",
        "title": "Excel modeling",
        "description": "Shortcuts, VLOOKUP, pivot tables, and basic financial models.",
        "action": "soon",
    },
    {
        "tag": "high value",
        "title": "Accounting basics",
        "description": "Debits/credits, accruals, depreciation, working capital.",
        "action": "soon",
    },
    {
        "tag": "good to have",
        "title": "Capital structure",
        "description": "Debt vs. equity, WACC, and cost of capital decisions.",
        "action": "soon",
    },
]

cols = st.columns(3)
for i, topic in enumerate(TOPICS):
    with cols[i % 3]:
        clicked = topic_card(st, topic["tag"], topic["title"], topic["description"], button_key=f"corpfin_topic_{i}")
        if clicked:
            if topic["action"] == "tool":
                st.switch_page("pages/2_Valuation_tool.py")
            else:
                st.session_state.coming_soon_topic_corpfin = topic["title"]
        st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

if st.session_state.coming_soon_topic_corpfin:
    st.info(
        f"**{st.session_state.coming_soon_topic_corpfin}** is coming soon — this topic's "
        f"AI tool hasn't been built yet. DCF valuation is ready to try now."
    )
    