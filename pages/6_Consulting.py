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
    },
    {
        "tag": "must know",
        "title": "Frameworks",
        "description": "MECE thinking, issue trees, profitability framework, Porter's 5 Forces.",
    },
    {
        "tag": "must know",
        "title": "Market sizing",
        "description": "Fermi estimation — \"how many ping pong balls fit in a school bus?\"",
    },
    {
        "tag": "high value",
        "title": "Slide storytelling",
        "description": "Pyramid principle — leading with the answer, supporting with data.",
    },
    {
        "tag": "high value",
        "title": "Mental math",
        "description": "Fast arithmetic, percentages, and estimation under pressure.",
    },
    {
        "tag": "good to have",
        "title": "Industry knowledge",
        "description": "Healthcare, tech, retail, financial services sector basics.",
    },
]

cols = st.columns(3)
for i, topic in enumerate(TOPICS):
    with cols[i % 3]:
        clicked = topic_card(st, topic["tag"], topic["title"], topic["description"], button_key=f"consulting_topic_{i}")
        if clicked:
            st.session_state.coming_soon_topic_consulting = topic["title"]
        st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

if st.session_state.coming_soon_topic_consulting:
    st.info(f"**{st.session_state.coming_soon_topic_consulting}** is coming soon — this topic's AI tool hasn't been built yet.")
    