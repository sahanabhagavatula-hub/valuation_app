"""
M&A process — topic page (Investment Banking)
What M&A is, why companies do it, the three deal types, the three deal
structures, the 6-step deal process, technical modeling (accretion/dilution,
synergies), and an AI-powered practice tool.
"""

import streamlit as st
import requests
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar

st.set_page_config(page_title="M&A process — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

with st.sidebar:
    st.header("API key")
    anthropic_key = st.text_input(
        "Anthropic API key", type="password",
        help="Required for the M&A practice tool at the bottom of this page.",
    )
    st.markdown("---")
    st.caption("Your key is only used to call Anthropic directly from your own machine.")

if st.button("←  Back to Investment Banking", use_container_width=False):
    st.switch_page("pages/3_Investment_Banking.py")

st.markdown(
    '<span class="valufin-eyebrow">Investment Banking · Must know</span>',
    unsafe_allow_html=True,
)
st.title("M&A process.")
st.caption("👇 Scroll to the bottom for a live practice tool with AI feedback.")

# ---------------------------------------------------------------------------
# What is M&A
# ---------------------------------------------------------------------------
st.markdown(
    """
    <div class="valufin-intro-card">
        <p><strong>What is M&A?</strong> Mergers and Acquisitions — M&A — is when one company
        buys or combines with another. A <strong>merger</strong> is when two companies combine
        into one new entity. An <strong>acquisition</strong> is when one company (the acquirer)
        buys another (the target) outright. In practice, most deals are acquisitions even when
        they're called mergers.</p>
        <p>For investment bankers, M&A is one of the core services they sell. Companies pay
        banks to advise them on buying other companies, selling themselves, or merging —
        helping with valuing the target, running the process, and negotiating the deal. M&A
        fees are some of the largest single fees in banking.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

# ---------------------------------------------------------------------------
# Why companies do M&A
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Why do companies do M&A?</p>', unsafe_allow_html=True)

w1, w2, w3, w4 = st.columns(4)
for col, term, defn in [
    (w1, "Revenue synergies", "The combined company can sell more than the two could separately — e.g. cross-selling products to each other's customer bases."),
    (w2, "Cost synergies", "Eliminating overlap — duplicate headquarters, redundant staff, shared suppliers getting better pricing at scale."),
    (w3, "Buying growth", "Instead of building a new product or entering a new market organically, you buy a company that already has it."),
    (w4, "Eliminating competition", "Acquiring a competitor removes them from the market (subject to antitrust scrutiny for large deals)."),
]:
    with col:
        st.markdown(
            f"""
            <div class="valufin-concept-card" style="height:100%;">
                <p class="valufin-concept-heading" style="font-size:14px;">{term}</p>
                <div class="valufin-concept-body" style="font-size:13px;">{defn}</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

# ---------------------------------------------------------------------------
# Three main types of M&A deal
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">The three main types of M&A deal</p>', unsafe_allow_html=True)

t1, t2, t3 = st.columns(3)
DEAL_TYPES = [
    ("Type 1", "Horizontal", "Two companies in the <strong>same industry</strong> doing the <strong>same thing</strong> combine. Goal: eliminate a competitor, gain market share, and cut overlapping costs.", "Two airlines merging — same routes, massive staff and fleet overlap to eliminate."),
    ("Type 2", "Vertical", "A company acquires another at a <strong>different point in its supply chain</strong> — either a supplier (backward integration) or a distributor (forward integration).", "A car company buying a tire manufacturer — capturing that supplier margin themselves."),
    ("Type 3", "Conglomerate", "Two companies in <strong>completely unrelated industries</strong> combine. Goal: diversify revenue so if one business struggles, the other compensates.", "A media company buying a food brand — no operational overlap, purely diversifying the business portfolio."),
]
for col, (tag, title, defn, example) in zip([t1, t2, t3], DEAL_TYPES):
    with col:
        st.markdown(
            f"""
            <div class="valufin-deal-type-card">
                <span class="valufin-deal-type-tag">{tag}</span>
                <p class="valufin-deal-type-title">{title}</p>
                <p class="valufin-deal-type-def">{defn}</p>
                <div class="valufin-example-box" style="margin:0;">
                    <p class="valufin-example-title">Example</p>
                    <p class="valufin-example-text">{example}</p>
                </div>
            </div>
            """,
            unsafe_allow_html=True,
        )

# ---------------------------------------------------------------------------
# Three main deal structures
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">The three main deal structures — how it\'s paid for</p>', unsafe_allow_html=True)

s1, s2, s3 = st.columns(3)
STRUCTURES = [
    ("Structure 1", "Cash deal", "The acquirer pays the target's shareholders entirely in cash. Simple and clean — shareholders get a definite amount with no exposure to what happens to the acquirer afterward.", "✓ Simple. Target shareholders get certainty — they know exactly what they're getting.", "✗ Acquirer needs a lot of cash on hand or has to borrow. Interest on that debt hurts earnings."),
    ("Structure 2", "Stock deal", "The acquirer pays by issuing new shares of its own stock to the target's shareholders. Those shareholders now own a piece of the combined company instead of receiving cash.", "✓ No cash required. Target shareholders share in the combined company's future upside.", "✗ Existing shareholders get diluted. If the acquirer's stock falls after the deal, target shareholders lose value."),
    ("Structure 3", "Leveraged buyout (LBO)", "The acquirer — often a private equity firm — uses mostly <strong>borrowed money</strong> to fund the purchase, using the target's own assets and future cash flow as collateral for the debt.", "✓ Buyer doesn't need to put up much of their own cash — amplifies returns if the deal works.", "✗ High debt burden. If the target's business underperforms, it can't service the debt and may go bankrupt."),
]
for col, (tag, title, defn, pro, con) in zip([s1, s2, s3], STRUCTURES):
    with col:
        st.markdown(
            f"""
            <div class="valufin-structure-card">
                <span class="valufin-structure-tag">{tag}</span>
                <p class="valufin-structure-title">{title}</p>
                <p class="valufin-structure-def">{defn}</p>
                <p class="valufin-structure-pros">{pro}</p>
                <p class="valufin-structure-cons">{con}</p>
            </div>
            """,
            unsafe_allow_html=True,
        )

# ---------------------------------------------------------------------------
# The deal process
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">The M&A deal process, step by step</p>', unsafe_allow_html=True)

STEPS = [
    ("Pitch / mandate", "The bank pitches the client on why they should buy or sell, and what value they can deliver. If the client hires the bank, they get a \"mandate\" — the contract to run the deal."),
    ("Valuation & target screening", "The bank values the target using DCF, comps, and precedent transactions. On the buy-side, they screen potential targets against the acquirer's strategic goals."),
    ("Indication of interest / first-round bids", "Potential buyers submit non-binding initial offers. The seller (via the bank) selects which parties can proceed to due diligence."),
    ("Due diligence", "The buyer digs into the target's financials, legal status, contracts, liabilities, and operations. Banks and lawyers run this in parallel. A \"data room\" holds all the documents."),
    ("Final bids & negotiation", "Buyers submit binding final bids. The seller picks one and negotiates key terms — price, structure, representations & warranties, conditions to close."),
    ("Signing & closing", "The deal is signed (SPA — Sale and Purchase Agreement), regulatory approvals are obtained, and the deal closes. The bank collects its success fee."),
]
for i, (title, body) in enumerate(STEPS, 1):
    st.markdown(
        f"""
        <div class="valufin-process-step">
            <div class="valufin-process-num">{i}</div>
            <div class="valufin-process-content">
                <p class="valufin-process-title">{title}</p>
                <p class="valufin-process-body">{body}</p>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

# ---------------------------------------------------------------------------
# Technical modeling
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Technical modeling — accretion / dilution</p>', unsafe_allow_html=True)

st.markdown(
    """
    <div class="valufin-tech-card">
        <p class="valufin-tech-title">What is accretion/dilution analysis?</p>
        <p class="valufin-tech-body">This is the core M&A model in IB. It asks one simple question:
        after the acquirer buys the target, does the combined company's <strong>EPS (earnings per
        share)</strong> go up or down compared to what the acquirer would have had on its own?</p>
        <p class="valufin-tech-body" style="margin-top:8px;">If EPS goes up — the deal is
        <strong>accretive</strong> (good). If EPS goes down — the deal is <strong>dilutive</strong>
        (bad, or at least needs justification via future synergies).</p>
        <div class="valufin-formula">New EPS = (Acquirer Net Income + Target Net Income + Synergies − Deal Costs) ÷ New Share Count</div>
    </div>
    """,
    unsafe_allow_html=True,
)
st.markdown(
    """
    <div class="valufin-example-box" style="margin-bottom:12px;">
        <p class="valufin-example-title">Example</p>
        <p class="valufin-example-text">Acquirer has $10 EPS. After buying the target using stock
        (so share count increases), combined EPS is $9.50. The deal is <strong>dilutive by $0.50</strong>
        — each shareholder now owns a smaller slice of the combined earnings. Acceptable only if
        synergies are expected to overcome this over time.</p>
    </div>
    """,
    unsafe_allow_html=True,
)
st.markdown(
    """
    <div class="valufin-tech-card">
        <p class="valufin-tech-title">How deal structure (cash vs. stock) affects EPS</p>
        <p class="valufin-tech-body"><strong>Cash deal:</strong> share count stays the same, so the
        EPS impact comes only from whether the target's earnings cover the interest cost on any debt
        used to fund the purchase.</p>
        <p class="valufin-tech-body" style="margin-top:8px;"><strong>Stock deal:</strong> share count
        rises, which dilutes EPS automatically. Whether the deal ends up accretive depends on the
        relative P/E ratios — if the acquirer's P/E is higher than the target's, a stock deal tends
        to be accretive. If the target's P/E is higher, it tends to be dilutive.</p>
    </div>
    """,
    unsafe_allow_html=True,
)
st.markdown(
    """
    <div class="valufin-tech-card">
        <p class="valufin-tech-title">Synergies — and why they're usually optimistic</p>
        <p class="valufin-tech-body">Synergies are the extra value that supposedly comes from combining
        the two companies, used to justify paying a premium above the target's market value (the
        "control premium"). In practice, synergies are notoriously hard to fully realize — integration
        takes longer than expected, key employees leave, cultures clash. A good analyst always
        stress-tests synergy assumptions.</p>
        <div class="valufin-formula">Maximum price to pay = Standalone value of target + PV of synergies</div>
    </div>
    """,
    unsafe_allow_html=True,
)

# ---------------------------------------------------------------------------
# Practice tool
# ---------------------------------------------------------------------------
st.markdown("---")
st.markdown('<p class="valufin-section-label">🎤 Practice M&A interview questions</p>', unsafe_allow_html=True)
st.title("M&A practice.")
st.caption(
    "I'll ask you real M&A questions an IB interviewer would ask — accretion/dilution, "
    "deal structures, synergies — and give specific feedback on your answers."
)

MA_QUESTIONS = [
    "Walk me through what happens to EPS when an acquirer buys a target using stock.",
    "What's the difference between a horizontal and a vertical acquisition? Give me an example of each.",
    "Why might an acquirer be willing to pay a premium above the target's current stock price?",
    "What are synergies, and why are they often harder to achieve than expected?",
    "Walk me through the key steps in a typical M&A deal process from the bank's perspective.",
    "What's an LBO, and why do private equity firms use so much debt?",
    "If an acquirer has a P/E of 20x and the target has a P/E of 15x, would a stock deal likely be accretive or dilutive? Why?",
]


def call_claude(prompt, key, max_tokens=400):
    resp = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={"x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json"},
        json={"model": "claude-sonnet-4-6", "max_tokens": max_tokens,
              "messages": [{"role": "user", "content": prompt}]},
        timeout=30,
    )
    resp.raise_for_status()
    data = resp.json()
    return "\n\n".join(b["text"] for b in data["content"] if b["type"] == "text")


if "ma_step" not in st.session_state:
    st.session_state.ma_step = 0
if "ma_qa" not in st.session_state:
    st.session_state.ma_qa = []
if "ma_current_q" not in st.session_state:
    st.session_state.ma_current_q = None
if "ma_feedback" not in st.session_state:
    st.session_state.ma_feedback = None
if "ma_done" not in st.session_state:
    st.session_state.ma_done = False
if "ma_summary" not in st.session_state:
    st.session_state.ma_summary = None

TOTAL_QUESTIONS = 5

if not st.session_state.ma_done:
    step = st.session_state.ma_step

    progress_html = '<div class="valufin-progress-row">'
    for i in range(TOTAL_QUESTIONS):
        cls = "done" if i < step else ("active" if i == step else "")
        progress_html += f'<div class="valufin-progress-step {cls}"></div>'
    progress_html += "</div>"
    st.markdown(progress_html, unsafe_allow_html=True)
    st.caption(f"Question {step + 1} of {TOTAL_QUESTIONS}")

    for q, a in st.session_state.ma_qa:
        st.markdown(
            f"""
            <div class="valufin-chat-ai"><p class="valufin-chat-label">Interviewer</p><p class="valufin-chat-text">{q}</p></div>
            <div class="valufin-chat-user"><p class="valufin-chat-label">You</p><p class="valufin-chat-text">{a}</p></div>
            """,
            unsafe_allow_html=True,
        )

    if st.session_state.ma_current_q is None:
        import random
        used = [q for q, _ in st.session_state.ma_qa]
        remaining = [q for q in MA_QUESTIONS if q not in used]
        st.session_state.ma_current_q = random.choice(remaining) if remaining else MA_QUESTIONS[step % len(MA_QUESTIONS)]

    st.markdown(
        f"""
        <div class="valufin-chat-ai">
            <p class="valufin-chat-label">Interviewer</p>
            <p class="valufin-chat-text">{st.session_state.ma_current_q}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    user_answer = st.text_area(
        "Your answer", key=f"ma_answer_{step}",
        label_visibility="collapsed", height=100,
        placeholder="Type your answer here...",
    )

    if st.session_state.ma_feedback is None:
        if st.button("Submit answer", type="primary"):
            if not anthropic_key:
                st.error("Add your Anthropic API key in the sidebar first.")
            elif not user_answer.strip():
                st.warning("Type an answer first.")
            else:
                try:
                    with st.spinner("Reviewing your answer..."):
                        prompt = f"""You are an investment banking interviewer giving direct, specific
feedback on a candidate's answer to an M&A question. 2-4 sentences. Be honest — point out exactly
what's strong and what's missing or weak. If they used a term incorrectly, flag it. If their answer
is strong, say specifically why.

Question: "{st.session_state.ma_current_q}"
Candidate's answer: "{user_answer}"

Give concise, specific feedback. No generic encouragement."""
                        feedback = call_claude(prompt, anthropic_key)
                    st.session_state.ma_feedback = feedback
                    st.session_state.ma_qa.append((st.session_state.ma_current_q, user_answer))
                    st.rerun()
                except Exception as e:
                    st.error(f"Couldn't reach the AI: {e}")
    else:
        st.markdown(
            f"""
            <div class="valufin-feedback-box">
                <p class="valufin-feedback-label">Feedback</p>
                <p class="valufin-feedback-text">{st.session_state.ma_feedback}</p>
            </div>
            """,
            unsafe_allow_html=True,
        )
        next_label = "Next question →" if step < TOTAL_QUESTIONS - 1 else "Finish and see summary →"
        if st.button(next_label, type="primary"):
            st.session_state.ma_step += 1
            st.session_state.ma_current_q = None
            st.session_state.ma_feedback = None
            if st.session_state.ma_step >= TOTAL_QUESTIONS:
                st.session_state.ma_done = True
            st.rerun()

else:
    st.markdown('<p class="valufin-section-label">Final summary</p>', unsafe_allow_html=True)

    if st.session_state.ma_summary is None:
        try:
            with st.spinner("Putting together your summary..."):
                transcript = "\n\n".join(
                    f"Q: {q}\nA: {a}" for q, a in st.session_state.ma_qa
                )
                prompt = f"""You are an IB interviewer wrapping up a mock M&A interview session.

Full transcript:
{transcript}

Write a short overall assessment: one-line verdict (e.g. "Strong on process, needs sharper technical mechanics"), then 2-3 sentences on what was strong and what was weak. Be specific, referencing the actual answers."""
                st.session_state.ma_summary = call_claude(prompt, anthropic_key, max_tokens=350)
        except Exception as e:
            st.error(f"Couldn't reach the AI: {e}")
            st.session_state.ma_summary = "Couldn't generate a summary — try again."

    st.markdown(
        f"""
        <div class="valufin-summary-card">
            <p class="valufin-summary-label">Your M&A practice session</p>
            <p class="valufin-feedback-text" style="font-size:14px; line-height:1.7;">{st.session_state.ma_summary}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    if st.button("Practice again →", type="primary", use_container_width=True):
        for key in ["ma_step", "ma_qa", "ma_current_q", "ma_feedback", "ma_done", "ma_summary"]:
            del st.session_state[key]
        st.rerun()
        