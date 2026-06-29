"""
Market sizing — topic page (Consulting)
Common reference numbers used in Fermi-estimation problems, plus a
practice tool with realistic market-sizing prompts and AI feedback.
"""

import streamlit as st
import requests
import sys
import os
import random

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar

st.set_page_config(page_title="Market sizing — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

with st.sidebar:
    st.header("API key")
    anthropic_key = st.text_input(
        "Anthropic API key", type="password",
        help="Required for AI feedback on your market-sizing practice answers.",
    )
    st.markdown("---")
    st.caption("Your key is only used to call Anthropic directly from your own machine.")

if st.button("←  Back to Consulting", use_container_width=False):
    st.switch_page("pages/6_Consulting.py")

st.markdown(
    '<span class="valufin-eyebrow">Consulting · Must know</span>',
    unsafe_allow_html=True,
)
st.title("Market sizing.")

# ---------------------------------------------------------------------------
# Intro
# ---------------------------------------------------------------------------
st.markdown(
    """
    <div class="valufin-intro-card">
        <p><strong>What is market sizing?</strong> Market sizing (also called a Fermi estimation,
        after physicist Enrico Fermi) is the skill of estimating a large, hard-to-know number by
        breaking it into smaller, easier-to-estimate pieces and multiplying them together.</p>
        <p>Consulting interviews use this to test structured thinking under uncertainty — there's
        rarely one "right" answer. What matters is that your approach is logical, your assumptions
        are reasonable, and your final number is in a believable range.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

# ---------------------------------------------------------------------------
# Reference numbers cheat sheet
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Common reference numbers</p>', unsafe_allow_html=True)
st.caption(
    "Memorize these — almost every market sizing problem needs at least one of them as a "
    "starting point."
)

REFERENCE_NUMBERS = [
    {"value": "~340 million", "label": "People in the United States"},
    {"value": "~8.2 billion", "label": "People in the world"},
    {"value": "~130 million", "label": "Households in the United States"},
    {"value": "~8.3 million", "label": "People in New York City"},
    {"value": "~3.9 million", "label": "People in Los Angeles"},
    {"value": "~2.7 million", "label": "People in Chicago"},
    {"value": "~2.5", "label": "Average people per US household"},
    {"value": "~78 years", "label": "Average US life expectancy"},
    {"value": "~330 days/year", "label": "Typical 'working/active' days, excluding holidays"},
    {"value": "~75%", "label": "Share of the US population that's adults (18+)"},
]

cols = st.columns(5)
for i, ref in enumerate(REFERENCE_NUMBERS):
    with cols[i % 5]:
        st.markdown(
            f"""
            <div class="valufin-refnum-card">
                <p class="valufin-refnum-value">{ref['value']}</p>
                <p class="valufin-refnum-label">{ref['label']}</p>
            </div>
            """,
            unsafe_allow_html=True,
        )
        st.markdown("<div style='height: 10px'></div>", unsafe_allow_html=True)

st.caption(
    "These are approximate and will drift over time (population grows, etc.) — close enough "
    "is the whole point for this kind of estimation."
)

# ---------------------------------------------------------------------------
# Practice: market sizing word problems with AI feedback
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Practice: market sizing problems</p>', unsafe_allow_html=True)
st.caption(
    "Pick a problem, walk through your logic and assumptions, then give a final number. "
    "Submit for feedback on your approach, not just whether the number is 'right.'"
)

PROBLEMS = [
    "Estimate how many cups of coffee are sold in New York City on a typical weekday.",
    "Estimate how many piano tuners there are in Chicago.",
    "Estimate how many gallons of gasoline are sold in the United States per day.",
    "Estimate how many smartphones are sold in the United States per year.",
    "How many ping pong balls would fit inside a school bus?",
]

if "ms_problem" not in st.session_state:
    st.session_state.ms_problem = random.choice(PROBLEMS)
if "ms_feedback" not in st.session_state:
    st.session_state.ms_feedback = None

st.markdown(
    f"""
    <div class="valufin-intro-card">
        <p style="font-size:15px; color:#e0d4c2; margin:0;">"{st.session_state.ms_problem}"</p>
    </div>
    """,
    unsafe_allow_html=True,
)

col_a, col_b = st.columns([3, 1])
with col_b:
    if st.button("🔁 New problem", use_container_width=True):
        st.session_state.ms_problem = random.choice(PROBLEMS)
        st.session_state.ms_feedback = None
        st.rerun()

user_response = st.text_area(
    "Your reasoning and final estimate",
    height=140,
    placeholder="Walk through your assumptions step by step, then give a final number...",
    label_visibility="collapsed",
)

if st.button("Submit for feedback", type="primary"):
    if not anthropic_key:
        st.error("Add your Anthropic API key in the sidebar first.")
    elif not user_response.strip():
        st.warning("Write your reasoning first.")
    else:
        try:
            with st.spinner("Reviewing your approach..."):
                prompt = f"""You are a consulting interviewer evaluating a candidate's market
sizing answer. Be direct and specific — this is a learning tool, not a real interview, so
give genuinely useful feedback.

Problem: "{st.session_state.ms_problem}"
Candidate's answer: "{user_response}"

Evaluate: (1) Is their approach logically structured (breaking the problem into clear,
reasonable steps)? (2) Are their assumptions reasonable, even if approximate? (3) Is their
final number in a believable range given their own assumptions (check their math)? (4) What
specifically would make this stronger? Keep it to 4-5 sentences, direct and specific, not
generic encouragement."""
                resp = requests.post(
                    "https://api.anthropic.com/v1/messages",
                    headers={"x-api-key": anthropic_key, "anthropic-version": "2023-06-01", "content-type": "application/json"},
                    json={"model": "claude-sonnet-4-6", "max_tokens": 400, "messages": [{"role": "user", "content": prompt}]},
                    timeout=30,
                )
                resp.raise_for_status()
                data = resp.json()
                feedback = "\n\n".join(b["text"] for b in data["content"] if b["type"] == "text")
            st.session_state.ms_feedback = feedback
        except Exception as e:
            st.error(f"Couldn't reach the AI: {e}")

if st.session_state.ms_feedback:
    st.markdown(
        f"""
        <div class="valufin-feedback-box">
            <p class="valufin-feedback-label">Feedback</p>
            <p class="valufin-feedback-text">{st.session_state.ms_feedback}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    