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

# ---------------------------------------------------------------------------
# Full real-company example: Apple (AAPL)
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">A full example, with a real company</p>', unsafe_allow_html=True)

st.markdown(
    """
    <div class="valufin-intro-card">
        <p>The fictional example above is useful for learning each step in isolation. Here's
        the same 5-step framework filled in start to finish with a real, recognizable company
        — Apple (AAPL) — using real, recent financial data. This is roughly what a complete
        pitch sounds like when you put all five pieces together.</p>
        <p style="color:#9ed8f0; font-size:13px;">
        Numbers below reflect Apple's trailing twelve-month financials and market data as of
        mid-2026. Like any real pitch, the conclusion here is just one reasonable take —
        a different analyst could build an equally defensible case on the other side.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

# ---------------------------------------------------------------------------
# Full real-company example: Apple (AAPL), framed as an interview Q&A
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">A full example, with a real company</p>', unsafe_allow_html=True)

st.markdown(
    """
    <div class="valufin-intro-card">
        <p>The fictional example above is useful for learning each step in isolation. Here's
        the same 5-step framework, but framed exactly how it would actually come up in an
        interview — as a real question, answered the way you'd actually say it out loud,
        using a real, recognizable company: Apple (AAPL).</p>
        <p style="color:#9ed8f0; font-size:13px;">
        Numbers below reflect Apple's trailing twelve-month financials and market data as of
        mid-2026. Like any real pitch, the conclusion here is just one reasonable take —
        a different analyst could build an equally defensible case on the other side.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    """
    <div class="valufin-interview-card">
        <div class="valufin-interview-q">
            <div class="valufin-interview-q-icon">Q</div>
            <div>
                <p class="valufin-interview-q-label">Interviewer asks</p>
                <p class="valufin-interview-q-text">"Walk me through a stock you'd pitch right now."</p>
            </div>
        </div>
        <div class="valufin-interview-a-header">
            <div class="valufin-interview-a-icon">A</div>
            <span class="valufin-interview-a-label">Your answer, step by step</span>
        </div>

        <div class="valufin-interview-step">
            <span class="valufin-interview-step-num">1</span><span class="valufin-interview-step-title">Recommendation</span>
            <p class="valufin-interview-step-body">"I'd go <strong>long Apple</strong>, ticker AAPL. It's trading around <strong>$293</strong> right now, and I think there's modest upside from here."</p>
        </div>

        <div class="valufin-interview-step">
            <span class="valufin-interview-step-num">2</span><span class="valufin-interview-step-title">Thesis</span>
            <p class="valufin-interview-step-body">"Everyone still thinks of Apple as an iPhone company, but the part that's actually growing fast is <strong>services</strong> — App Store, iCloud, Apple Music, that kind of thing. That's high-margin, recurring revenue, and I don't think the market's fully given Apple credit for it yet. On top of that, Apple just announced a chip partnership with Intel, which takes a real risk off the table — they've been way too dependent on overseas chip manufacturing."</p>
        </div>

        <div class="valufin-interview-step">
            <span class="valufin-interview-step-num">3</span><span class="valufin-interview-step-title">Valuation</span>
            <p class="valufin-interview-step-body">"Right now Apple trades at about <strong>35.6 times trailing earnings</strong> and roughly <strong>27 times EBITDA</strong> — that's rich, but it's actually pretty normal for Apple given the brand and how loyal its customers are. Revenue's around <strong>$451 billion</strong> trailing twelve months, with an EBITDA margin near <strong>35%</strong>, so the cash flow is huge and really stable. Street's average price target is about <strong>$314</strong>, which is roughly 7% above where it's trading — so I'm not calling this a huge mispricing, just a real, modest gap."</p>
        </div>
    </div>
    """,
    unsafe_allow_html=True,
)
if st.button("See how I'd build this in the valuation tool →", key="aapl_tool_link"):
    st.switch_page("pages/2_Valuation_tool.py")

st.markdown(
    """
    <div class="valufin-interview-card" style="margin-top:-8px;">
        <div class="valufin-interview-step" style="margin-top:16px;">
            <span class="valufin-interview-step-num">4</span><span class="valufin-interview-step-title">Catalyst</span>
            <p class="valufin-interview-step-body">"Two things, really. First, that Intel chip partnership — as more details come out about timelines, I think that starts shifting sentiment. Second, Apple's planning to raise prices because of memory chip costs going up. If they pull that off without losing customers, that's a real margin story over the next couple of earnings reports."</p>
        </div>
        <div class="valufin-interview-step">
            <span class="valufin-interview-step-num">5</span><span class="valufin-interview-step-title">Risk</span>
            <p class="valufin-interview-step-body">"Honestly, the biggest risk is that those price increases backfire and people just buy fewer iPhones. I'm not super worried about it, though — Apple's raised prices before and their customers are pretty locked in. But I'd want to watch the next two earnings reports closely before getting more confident."</p>
        </div>
    </div>
    """,
    unsafe_allow_html=True,
)

st.caption(
    "Apple financial data referenced above (trailing P/E, EV/EBITDA, revenue, margins, "
    "analyst price target) reflects publicly reported figures as of mid-2026 and will "
    "change over time — always check current numbers before using them in a real pitch."
)

# ---------------------------------------------------------------------------
# Follow-up questions, with simple-terms jargon explainers
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Follow-up questions you should expect</p>', unsafe_allow_html=True)

FOLLOWUPS = [
    {
        "question": "Your price target is only 7% above today's price. Why is this pitch worth my time?",
        "answer": (
            "\"Fair pushback. I'd say two things — first, that 7% is the <strong>average</strong> "
            "analyst target, and I think the services growth story is underappreciated enough "
            "that my own number could reasonably be higher than the Street's. Second, even a "
            "modest, high-conviction pick is a legitimate pitch — not every good idea has to be "
            "a 50% mispricing. If you want, I can walk through a more bullish case where "
            "services growth alone gets you to a meaningfully higher number.\""
        ),
        "why_asked": (
            "Why they ask this: testing whether you understand that pitches don't need to be "
            "extreme to be valid — and whether you can defend a modest thesis under pressure."
        ),
        "simple_terms": [
            ("\"The Street\"", "Wall Street analysts as a group — the people whose job is to study companies and give price predictions. \"The Street's number\" just means \"what most analysts predict.\""),
            ("\"High-conviction\"", "Means you feel really confident about something, even if it's a small or quiet change rather than a big dramatic one."),
            ("\"Mispricing\"", "When the stock market's price for something doesn't match what it's actually worth — like a $20 item accidentally priced at $15."),
        ],
    },
    {
        "question": "What's your biggest assumption in this pitch, and what happens if you're wrong?",
        "answer": (
            "\"Probably that the market keeps undervaluing services growth relative to "
            "hardware. If I'm wrong — if the market already fully prices that in — then most "
            "of my edge disappears and this becomes closer to a hold than a buy. I'd also say "
            "my WACC and growth assumptions in the DCF are estimates, not certainties, so I'd "
            "want to stress-test the valuation across a range, not just one scenario.\""
        ),
        "why_asked": (
            "Why they ask this: every interviewer wants to know if you understand your own "
            "thesis is a bet, not a fact — and whether you've actually stress-tested it."
        ),
        "simple_terms": [
            ("\"My edge\"", "The advantage or special insight that makes your pick better than just guessing — if that insight turns out to be wrong, you lose that advantage."),
            ("\"Hold\" vs \"Buy\"", "A \"buy\" means you think the stock will go up, so you should purchase it. A \"hold\" means you don't think it'll move much either way, so there's no strong reason to buy or sell."),
            ("WACC (say \"wack\")", "Stands for Weighted Average Cost of Capital. It's just a number representing how much return investors expect, used to figure out what future cash is worth in today's dollars."),
            ("DCF", "Stands for Discounted Cash Flow. It's a method for estimating what a company is worth, based on how much cash it's expected to make in the future."),
            ("\"Stress-test\"", "Trying out your numbers under different, less favorable conditions to see if your conclusion still holds up — like checking if a bridge stays standing under extra weight."),
        ],
    },
    {
        "question": "Why Apple and not just a basket of big tech? What's company-specific here?",
        "answer": (
            "\"Good question — a lot of my thesis could apply loosely to other tech names too. "
            "But the Intel chip partnership is genuinely Apple-specific, and so is the scale of "
            "their services ecosystem — nobody else has that combination of hardware lock-in "
            "plus a high-margin services business riding on top of it. That's the part of the "
            "pitch that's about Apple specifically, not just 'big tech is good.'\""
        ),
        "why_asked": (
            "Why they ask this: checking that your pitch isn't just a generic sector view "
            "dressed up as stock-specific research."
        ),
        "simple_terms": [
            ("\"A basket of\"", "A group of several similar things treated as one unit — \"a basket of tech stocks\" just means several tech stocks bundled together."),
            ("\"Hardware lock-in\"", "When owning one product makes you likely to keep buying related products — like owning an iPhone makes you more likely to buy AirPods that work well with it."),
            ("\"High-margin\"", "A business where the company keeps a large chunk of each sale as profit, instead of most of it going toward costs."),
        ],
    },
]

for fu in FOLLOWUPS:
    st.markdown(
        f"""
        <div class="valufin-followup-q">
            <div class="valufin-followup-q-icon">Q</div>
            <p class="valufin-followup-q-text">"{fu['question']}"</p>
        </div>
        <div class="valufin-followup-a">
            <div class="valufin-followup-a-icon">A</div>
            <p class="valufin-followup-a-text">{fu['answer']}</p>
        </div>
        <div class="valufin-why-asked">{fu['why_asked']}</div>
        """,
        unsafe_allow_html=True,
    )
    with st.expander("💬 In simple terms — what do these words mean?"):
        for term, definition in fu["simple_terms"]:
            st.markdown(
                f'<div class="valufin-simple-terms-row"><strong>{term}:</strong> {definition}</div>',
                unsafe_allow_html=True,
            )
    st.markdown("<div style='height: 8px'></div>", unsafe_allow_html=True)       