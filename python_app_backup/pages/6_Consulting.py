"""
Consulting — category page
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, category_header, topic_card

st.set_page_config(page_title="Consulting — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

if st.button("←  Back to home", use_container_width=False):
    st.switch_page("app.py")

category_header(st, "bulb", "Consulting", "Consulting")

st.caption(
    "Structured problem solving is the whole game in consulting recruiting. "
    "Tap any topic to start learning."
)

if "coming_soon_topic_consulting" not in st.session_state:
    st.session_state.coming_soon_topic_consulting = None

TOPICS = [
    {
        "tag": "must know",
        "title": "Case interviews",
        "description": "Structured problem solving — profitability, market entry, M&A cases.",
        "action": "soon",
    },
    {
        "tag": "must know",
        "title": "Frameworks",
        "description": "MECE thinking, issue trees, profitability framework, Porter's 5 Forces.",
        "action": "frameworks",
    },
    {
        "tag": "must know",
        "title": "Market sizing",
        "description": "Fermi estimation — \"how many ping pong balls fit in a school bus?\"",
        "action": "market_sizing",
    },
    {
        "tag": "high value",
        "title": "Slide storytelling",
        "description": "Pyramid principle — leading with the answer, supporting with data.",
        "action": "soon",
    },
    {
        "tag": "high value",
        "title": "Mental math",
        "description": "Fast arithmetic, percentages, and estimation under pressure.",
        "action": "mental_math",
    },
    {
        "tag": "good to have",
        "title": "Industry knowledge",
        "description": "Healthcare, tech, retail, financial services sector basics.",
        "action": "soon",
    },
]

cols = st.columns(3)
for i, topic in enumerate(TOPICS):
    with cols[i % 3]:
        clicked = topic_card(st, topic["tag"], topic["title"], topic["description"], button_key=f"consulting_topic_{i}")
        if clicked:
            if topic["action"] == "market_sizing":
                st.switch_page("pages/12_Market_Sizing.py")
            elif topic["action"] == "mental_math":
                st.switch_page("pages/11_Mental_Math.py")
            elif topic["action"] == "frameworks":
                st.switch_page("pages/13_Frameworks.py")
            else:
                st.session_state.coming_soon_topic_consulting = topic["title"]
        st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

if st.session_state.coming_soon_topic_consulting:
    st.info(f"**{st.session_state.coming_soon_topic_consulting}** is coming soon — this topic's AI tool hasn't been built yet.")