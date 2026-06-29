"""
Mental math — topic page (Consulting)
Why mental math matters in case interviews, quick technique tips, and a
working arithmetic drill with untimed/timed modes.
"""

import streamlit as st
import sys
import os
import random
import time

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar

st.set_page_config(page_title="Mental math — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

if st.button("←  Back to Consulting", use_container_width=False):
    st.switch_page("pages/6_Consulting.py")

st.markdown(
    '<span class="valufin-eyebrow">Consulting · High value</span>',
    unsafe_allow_html=True,
)
st.title("Mental math.")

# ---------------------------------------------------------------------------
# Intro — why mental math matters
# ---------------------------------------------------------------------------
st.markdown(
    """
    <div class="valufin-intro-card">
        <p><strong>Why mental math matters here:</strong> In a case interview, you'll constantly
        need to do quick arithmetic out loud — sizing a market, calculating a break-even point,
        checking if a proposed strategy actually makes financial sense. There's usually no
        calculator allowed. Doing this fast and accurately (even with rounded numbers) signals
        that you can think on your feet under pressure — which is exactly what the interview is
        testing.</p>
        <p>For example: if you're asked <strong>"how many ping pong balls fit in a school
        bus?"</strong> you'll need to multiply estimated dimensions, divide by ball volume, and
        sanity-check the result — all in your head, while talking through your logic out loud.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

# ---------------------------------------------------------------------------
# Quick tips
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Quick tips</p>', unsafe_allow_html=True)

TIPS = [
    {
        "title": "Round aggressively",
        "body": "Precision rarely matters in a case interview — being directionally right, "
        "fast, beats being exactly right, slow. Round to the nearest convenient number.",
        "example": "387 × 21 → round to 400 × 20 = 8,000 (real answer: 8,127 — close enough)",
    },
    {
        "title": "Break multiplication into easier pieces",
        "body": "Split a hard multiplication into two easy ones and add them together.",
        "example": "23 × 14 → (23 × 10) + (23 × 4) = 230 + 92 = 322",
    },
    {
        "title": "Turn division into multiplication",
        "body": "Dividing by an awkward number is often easier if you flip it into a fraction "
        "you already know.",
        "example": "450 ÷ 25 → 450 × 4 ÷ 100 = 1800 ÷ 100 = 18 (since 1/25 = 4/100)",
    },
    {
        "title": "Percentages are just fractions",
        "body": "Memorize a few key percent-to-fraction conversions so you can do them instantly.",
        "example": "10% = ÷10  ·  25% = ÷4  ·  33% ≈ ÷3  ·  50% = ÷2",
    },
]

for tip in TIPS:
    st.markdown(
        f"""
        <div class="valufin-tip-card">
            <p class="valufin-tip-title">{tip['title']}</p>
            <p class="valufin-tip-body">{tip['body']}</p>
            <div class="valufin-tip-example">{tip['example']}</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

# ---------------------------------------------------------------------------
# Practice: arithmetic drill
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Practice: arithmetic drill</p>', unsafe_allow_html=True)
st.caption(
    "Mix of multiplication, division, and percentages. Pick a mode, then answer as many "
    "as you want — your stats track as you go."
)

if "mm_correct" not in st.session_state:
    st.session_state.mm_correct = 0
if "mm_missed" not in st.session_state:
    st.session_state.mm_missed = 0
if "mm_current" not in st.session_state:
    st.session_state.mm_current = None
if "mm_start_time" not in st.session_state:
    st.session_state.mm_start_time = None
if "mm_mode" not in st.session_state:
    st.session_state.mm_mode = "Untimed"
if "mm_feedback" not in st.session_state:
    st.session_state.mm_feedback = None


def generate_question():
    qtype = random.choice(["multiply", "divide", "percent"])
    if qtype == "multiply":
        a, b = random.randint(12, 89), random.randint(11, 29)
        return f"{a} × {b}", a * b
    elif qtype == "divide":
        b = random.choice([4, 5, 8, 10, 20, 25, 50])
        result = random.randint(4, 60)
        a = b * result
        return f"{a} ÷ {b}", result
    else:
        pct = random.choice([10, 20, 25, 50, 75])
        base = random.randint(40, 400)
        return f"{pct}% of {base}", round(pct / 100 * base)


mode_col1, mode_col2 = st.columns(2)
with mode_col1:
    if st.button("Untimed", use_container_width=True, type="primary" if st.session_state.mm_mode == "Untimed" else "secondary"):
        st.session_state.mm_mode = "Untimed"
with mode_col2:
    if st.button("Timed (30s/question)", use_container_width=True, type="primary" if st.session_state.mm_mode == "Timed" else "secondary"):
        st.session_state.mm_mode = "Timed"

if st.session_state.mm_current is None:
    st.session_state.mm_current = generate_question()
    st.session_state.mm_start_time = time.time()

question_text, correct_answer = st.session_state.mm_current

if st.session_state.mm_mode == "Timed":
    elapsed = time.time() - st.session_state.mm_start_time
    remaining = max(0, 30 - int(elapsed))
    if remaining == 0 and st.session_state.mm_feedback is None:
        st.session_state.mm_missed += 1
        st.session_state.mm_feedback = f"⏱️ Time's up — the answer was **{correct_answer}**."

st.markdown(
    f"""
    <div class="valufin-quiz-card">
        <p class="valufin-quiz-question">{question_text} ≈</p>
    </div>
    """,
    unsafe_allow_html=True,
)

if st.session_state.mm_mode == "Timed" and st.session_state.mm_feedback is None:
    st.caption(f"⏱️ {remaining} seconds left")

c1, c2 = st.columns([2, 1])
with c1:
    user_answer = st.number_input("Your answer", key=f"mm_answer_{id(st.session_state.mm_current)}", label_visibility="collapsed", step=1)
with c2:
    check_clicked = st.button("Check answer", use_container_width=True, disabled=st.session_state.mm_feedback is not None)

if check_clicked:
    if int(user_answer) == correct_answer:
        st.session_state.mm_correct += 1
        st.session_state.mm_feedback = f"✅ Correct! **{correct_answer}**"
    else:
        st.session_state.mm_missed += 1
        st.session_state.mm_feedback = f"❌ Not quite — the answer was **{correct_answer}**, you said {int(user_answer)}."

if st.session_state.mm_feedback:
    st.markdown(st.session_state.mm_feedback)
    if st.button("Next question →", type="primary"):
        st.session_state.mm_current = None
        st.session_state.mm_feedback = None
        st.rerun()

total = st.session_state.mm_correct + st.session_state.mm_missed
st.markdown(
    f"""
    <div class="valufin-quiz-stats">
        <div><span class="valufin-quiz-stat-value">{st.session_state.mm_correct}</span><span class="valufin-quiz-stat-label">Correct</span></div>
        <div><span class="valufin-quiz-stat-value">{st.session_state.mm_missed}</span><span class="valufin-quiz-stat-label">Missed</span></div>
        <div><span class="valufin-quiz-stat-value">{total}</span><span class="valufin-quiz-stat-label">Total</span></div>
    </div>
    """,
    unsafe_allow_html=True,
)

if st.button("Reset stats"):
    st.session_state.mm_correct = 0
    st.session_state.mm_missed = 0
    st.session_state.mm_current = None
    st.session_state.mm_feedback = None
    st.rerun()
    