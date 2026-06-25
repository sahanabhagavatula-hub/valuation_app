"""
Universal — every interview — category page
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, category_header, topic_card

st.set_page_config(page_title="Universal Skills — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

if st.button("←  Back to home", use_container_width=False):
    st.switch_page("app.py")

category_header(st, "users", "Universal — every interview", "All roles")

st.caption(
    "These show up no matter which path you're recruiting for. Tap any topic to "
    "start learning."
)

if "coming_soon_topic_universal" not in st.session_state:
    st.session_state.coming_soon_topic_universal = None

TOPICS = [
    {
        "tag": "must know",
        "title": "Behaviorals (STAR)",
        "description": "Situation, Task, Action, Result — tell compelling stories about your experience.",
    },
    {
        "tag": "must know",
        "title": "\"Why this firm\"",
        "description": "Research the firm, know their deals/clients, give a specific answer.",
    },
    {
        "tag": "high value",
        "title": "Current events",
        "description": "Read WSJ or FT daily — know 2-3 macro themes and recent deals.",
    },
    {
        "tag": "high value",
        "title": "Networking",
        "description": "Cold outreach, informational interviews, following up correctly.",
    },
]

cols = st.columns(3)
for i, topic in enumerate(TOPICS):
    with cols[i % 3]:
        clicked = topic_card(st, topic["tag"], topic["title"], topic["description"], button_key=f"universal_topic_{i}")
        if clicked:
            st.session_state.coming_soon_topic_universal = topic["title"]
        st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

if st.session_state.coming_soon_topic_universal:
    st.info(f"**{st.session_state.coming_soon_topic_universal}** is coming soon — this topic's AI tool hasn't been built yet.")
    