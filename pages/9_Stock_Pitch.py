"""
Stock pitch — topic page (PE / Hedge Fund)
The 5-step stock pitch framework, with vocabulary, a catalyst-type table,
a link out to the real DCF/comps valuation tool, and a worked example
threaded through every step.
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar

st.set_page_config(page_title="Stock pitch — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

if st.button("←  Back to PE / HF", use_container_width=False):
    st.switch_page("pages/4_PE_HF.py")

st.markdown(
    '<span class="valufin-eyebrow">PE / Hedge Fund · Must know</span>',
    unsafe_allow_html=True,
)
st.title("Stock pitch.")

# ---------------------------------------------------------------------------
# Intro card — what is a stock pitch, what it's used for
# ---------------------------------------------------------------------------
st.markdown(
    """
    <div class="valufin-intro-card">
        <p><strong>What is a stock pitch?</strong> A stock pitch is a structured argument for why
        an investor should buy or sell a specific stock, backed by real numbers and research —
        not just a gut feeling.</p>
        <p>It's used to tell someone &mdash; a portfolio manager, an interviewer, a client &mdash;
        that a stock is mispriced by the market, and to prove that claim with evidence: a valuation
        estimate, a clear thesis, and an honest accounting of what could go wrong. In PE and hedge
        fund interviews, you're almost always asked to walk through one, since it tests both your
        technical skills and your judgment at the same time.</p>
        <p style="margin-top:14px; color:#9ed8f0; font-size:13px;">
        Following along below: a simple worked example using a fictional coffee chain,
        "Daily Grind Coffee Co.," to show how each step actually gets filled in.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown('<p class="valufin-section-label">The 5-step framework</p>', unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# Step 1 — Recommendation
# ---------------------------------------------------------------------------
with st.container():
    st.markdown(
        """
        <div class="valufin-step-card-header">
            <div class="valufin-step-num">1</div>
            <p class="valufin-step-title">Recommendation (buy/sell)</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    with st.expander("Expand step 1"):
        st.markdown(
            """
            State your call clearly and immediately — don't bury it. A pitch opens with the
            conclusion, then spends the rest of the time proving it.
            """
        )
        st.markdown(
            """
            <div class="valufin-vocab-box">
                <p class="valufin-vocab-title">Vocabulary to know</p>
                <div class="valufin-vocab-row"><span class="valufin-vocab-term">Long</span><span class="valufin-vocab-def">Betting the stock goes up — you buy it expecting the price to rise.</span></div>
                <div class="valufin-vocab-row"><span class="valufin-vocab-term">Short</span><span class="valufin-vocab-def">Betting the stock goes down — you borrow and sell it, aiming to buy back lower.</span></div>
                <div class="valufin-vocab-row"><span class="valufin-vocab-term">Bull case</span><span class="valufin-vocab-def">The optimistic scenario — why the stock could outperform.</span></div>
                <div class="valufin-vocab-row"><span class="valufin-vocab-term">Bear case</span><span class="valufin-vocab-def">The pessimistic scenario — why the stock could underperform.</span></div>
            </div>
            <div class="valufin-example-box">
                <p class="valufin-example-title">Worked example</p>
                <p class="valufin-example-text">"I recommend going <strong>long</strong> Daily Grind
                Coffee Co. (ticker: GRND) — I believe the market is undervaluing the stock by roughly 20%."</p>
            </div>
            """,
            unsafe_allow_html=True,
        )

# ---------------------------------------------------------------------------
# Step 2 — Thesis
# ---------------------------------------------------------------------------
with st.container():
    st.markdown(
        """
        <div class="valufin-step-card-header">
            <div class="valufin-step-num">2</div>
            <p class="valufin-step-title">Thesis (your core argument)</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    with st.expander("Expand step 2"):
        st.markdown(
            """
            Your thesis is the one or two sentence "why" behind your call — the core insight that,
            if true, means the stock is mispriced. Good theses are specific and falsifiable, not vague
            ("this is a good company").
            """
        )
        st.markdown(
            """
            <div class="valufin-example-box">
                <p class="valufin-example-title">Worked example</p>
                <p class="valufin-example-text">"GRND is rapidly expanding into a new region where it has no
                stores yet, and the market isn't pricing in that growth because it's still tiny relative
                to GRND's existing store base."</p>
            </div>
            """,
            unsafe_allow_html=True,
        )

# ---------------------------------------------------------------------------
# Step 3 — Valuation
# ---------------------------------------------------------------------------
with st.container():
    st.markdown(
        """
        <div class="valufin-step-card-header">
            <div class="valufin-step-num">3</div>
            <p class="valufin-step-title">Valuation (DCF + comps → price target)</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    with st.expander("Expand step 3"):
        st.markdown(
            """
            This is where you prove the thesis with numbers — using a DCF and comps analysis to
            arrive at a price target, then comparing that target to where the stock trades today.
            """
        )
        st.markdown(
            '<div class="valufin-tool-link-box">Use the full DCF + comps valuation tool below to build this part of your pitch with real data.</div>',
            unsafe_allow_html=True,
        )
        if st.button("Open the DCF + comps valuation tool →"):
            st.switch_page("pages/2_Valuation_tool.py")
        st.markdown(
            """
            Worth understanding alongside the tool: **EV/EBITDA** and **P/E**
            multiples, why comps can differ from a DCF, and how to defend your WACC and growth
            assumptions if challenged.
            """
        )
        st.markdown(
            """
            <div class="valufin-example-box">
                <p class="valufin-example-title">Worked example</p>
                <p class="valufin-example-text">GRND trades at $40 today. A DCF assuming 12% revenue growth for
                5 years implies a fair value of $46. Comps (peer coffee chains at 14x EV/EBITDA) imply
                $50. Blended price target: <strong>~$48</strong>, about 20% above
                today's price.</p>
            </div>
            """,
            unsafe_allow_html=True,
        )

# ---------------------------------------------------------------------------
# Step 4 — Catalyst
# ---------------------------------------------------------------------------
with st.container():
    st.markdown(
        """
        <div class="valufin-step-card-header">
            <div class="valufin-step-num">4</div>
            <p class="valufin-step-title">Catalyst (what makes it happen)</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    with st.expander("Expand step 4"):
        st.markdown(
            """
            A catalyst is the specific event that closes the gap between today's price and your
            target — without one, your thesis could be correct but the market might never realize it.
            """
        )
        st.markdown(
            """
            <table class="valufin-catalyst-table">
                <tr><th>Catalyst type</th><th>Example</th></tr>
                <tr><td>Earnings report</td><td>Company beats expectations and raises guidance</td></tr>
                <tr><td>Product launch</td><td>A new product starts generating real revenue</td></tr>
                <tr><td>Regulatory approval</td><td>FDA approves a drug, or a license gets granted</td></tr>
                <tr><td>M&amp;A</td><td>Company gets acquired, or acquires someone else</td></tr>
                <tr><td>Macro event</td><td>Interest rates change, a new law passes</td></tr>
            </table>
            """,
            unsafe_allow_html=True,
        )
        st.markdown(
            """
            <div class="valufin-example-box">
                <p class="valufin-example-title">Worked example</p>
                <p class="valufin-example-text">GRND's next two quarterly earnings reports should start showing
                revenue from the new region's stores — once investors see those numbers, the growth
                becomes visible instead of theoretical.</p>
            </div>
            """,
            unsafe_allow_html=True,
        )

# ---------------------------------------------------------------------------
# Step 5 — Risk
# ---------------------------------------------------------------------------
with st.container():
    st.markdown(
        """
        <div class="valufin-step-card-header">
            <div class="valufin-step-num">5</div>
            <p class="valufin-step-title">Risk (what could go wrong, and why you're not worried)</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    with st.expander("Expand step 5"):
        st.markdown(
            """
            Naming risks honestly, then explaining why you're still confident despite them, is what
            separates a credible pitch from a one-sided sales job. Interviewers specifically probe this.
            """
        )
        st.markdown(
            """
            <div class="valufin-example-box">
                <p class="valufin-example-title">Worked example</p>
                <p class="valufin-example-text">"The new region could underperform if local tastes differ from
                GRND's home market. I'm not too worried because GRND ran a successful pilot of 10 stores
                there last year with strong repeat customer rates before committing to a full rollout."</p>
            </div>
            """,
            unsafe_allow_html=True,
        )
        