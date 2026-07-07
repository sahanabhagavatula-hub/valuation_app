"""
Frameworks — topic page (Consulting)
MECE thinking, a deep-dive on the Profitability framework (the most common
one), the other 9 case frameworks as clickable dialogs with full
breakdowns, and Porter's 5 Forces.
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar

st.set_page_config(page_title="Frameworks — ValuED", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

if st.button("←  Back to Consulting", use_container_width=False):
    st.switch_page("pages/6_Consulting.py")

st.markdown(
    '<span class="valufin-eyebrow">Consulting · Must know</span>',
    unsafe_allow_html=True,
)
st.title("Frameworks.")

# ---------------------------------------------------------------------------
# Intro
# ---------------------------------------------------------------------------
st.markdown(
    """
    <div class="valufin-intro-card">
        <p>Case interview frameworks are pre-built mental checklists for breaking down a business
        problem. You don't need to memorize all of them perfectly — you need to understand the
        <strong>logic</strong> well enough to build the right structure live, on the spot, for
        whatever specific case you're given.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

# ---------------------------------------------------------------------------
# MECE explainer
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">MECE thinking — the rule behind every framework</p>', unsafe_allow_html=True)

st.markdown(
    """
    <div class="valufin-intro-card">
        <p style="margin-bottom:10px;">
        Every framework on this page is really just a <strong>MECE</strong> breakdown of a
        question — <strong>M</strong>utually <strong>E</strong>xclusive, <strong>C</strong>ollectively
        <strong>E</strong>xhaustive. A good tree has branches that don't overlap and, together,
        cover the whole question — nothing double-counted, nothing missing.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

mece1, mece2 = st.columns(2)
with mece1:
    st.markdown(
        """
        <div class="valufin-mece-box">
            <p class="valufin-mece-box-title">Mutually Exclusive</p>
            <p class="valufin-mece-box-body">Your branches don't overlap. If "price" and
            "discounts" are both branches, that's a problem — discounts ARE a price issue, so
            they'd double-count the same cause.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
with mece2:
    st.markdown(
        """
        <div class="valufin-mece-box">
            <p class="valufin-mece-box-title">Collectively Exhaustive</p>
            <p class="valufin-mece-box-body">Your branches cover everything. If you only check
            "fewer customers" but profit could also drop from lower prices, you've left a real
            possibility unchecked.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

# ---------------------------------------------------------------------------
# FEATURED: Profitability Framework
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">The framework you\'ll use most</p>', unsafe_allow_html=True)

st.markdown(
    """
    <div class="valufin-featured-framework">
        <span class="valufin-featured-badge">Most prevalent — start here</span>
        <p class="valufin-featured-title">1. Profitability Framework</p>
        <p class="valufin-featured-when">When: "Profits/margins declined" or "should we improve profitability"</p>
        <div class="valufin-formula-box">Profit = Revenue − Costs</div>
    </div>
    """,
    unsafe_allow_html=True,
)

b1, b2 = st.columns(2)
with b1:
    st.markdown(
        """
        <div class="valufin-branch-box">
            <p class="valufin-branch-title">Revenue = Price × Volume</p>
            <ul class="valufin-branch-list">
                <li>Did price change? (discounts, increases, mix shift to cheaper products)</li>
                <li>Did volume change? (fewer customers, fewer units per customer, lost market share, shrinking market)</li>
            </ul>
        </div>
        """,
        unsafe_allow_html=True,
    )
with b2:
    st.markdown(
        """
        <div class="valufin-branch-box">
            <p class="valufin-branch-title">Costs = Fixed + Variable</p>
            <ul class="valufin-branch-list">
                <li>Fixed: rent, salaries, equipment — don't scale with sales volume</li>
                <li>Variable: materials, hourly labor, shipping — scale directly with volume</li>
            </ul>
        </div>
        """,
        unsafe_allow_html=True,
    )

st.markdown(
    """
    <div class="valufin-deep-dive">
        <p class="valufin-deep-dive-title">Why this split, specifically?</p>
        <p class="valufin-deep-dive-body">Profit only has two mathematical inputs — revenue and
        cost — so this top-level split is automatically MECE; there's no third lever. The
        second-level splits (price/volume, fixed/variable) are chosen because they're the
        natural, non-overlapping ways each side actually moves. You could go further (e.g.
        splitting volume into new vs. returning customers), but only once the data tells you
        that's where the real answer lives — going deep everywhere wastes interview time and
        makes you sound like you're reciting a memorized list instead of actually thinking.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown('<p class="valufin-section-label" style="font-size:11px; margin-top:20px;">How the issue tree applies, live</p>', unsafe_allow_html=True)

st.markdown(
    """
    <div class="valufin-tree-container">
        <div class="valufin-tree-level-1"><div class="valufin-tree-node">Why did profit decline?</div></div>
        <div class="valufin-tree-level-2">
            <div class="valufin-tree-node-sub">Revenue declined</div>
            <div class="valufin-tree-node-sub">Costs increased</div>
        </div>
        <div class="valufin-tree-level-3">
            <div class="valufin-tree-node-sub">Price ↓</div>
            <div class="valufin-tree-node-sub">Volume ↓</div>
            <div class="valufin-tree-node-sub">Fixed ↑</div>
            <div class="valufin-tree-node-sub highlight">Variable ↑ (real answer)</div>
        </div>
    </div>
    """,
    unsafe_allow_html=True,
)
st.caption(
    "Notice the tree isn't built all at once — you state the top split out loud, ask for "
    "data, and only expand the branch the data points you toward. The other branches stay "
    "unexplored because they turned out to be dead ends, not because you forgot about them."
)

st.markdown(
    """
    <div class="valufin-example-walkthrough">
        <p style="font-size:12px; color:#d6ab7b; text-transform:uppercase; letter-spacing:0.06em; font-weight:700; margin:0 0 12px;">Worked example: movie theater chain, profit down 15%</p>
        <div class="valufin-example-step"><span class="valufin-example-step-label">Structure: </span><span class="valufin-example-quote">"I'd like to look at this through a profitability lens... I'll break it into revenue and costs to see which side is driving the drop."</span></div>
        <div class="valufin-example-step"><span class="valufin-example-step-label">Ask: </span><span class="valufin-example-step-text">You ask if revenue or costs changed. Told: revenue flat, costs up 20%.</span></div>
        <div class="valufin-example-step"><span class="valufin-example-step-label">Narrow: </span><span class="valufin-example-step-text">You ask which cost line. Told: film licensing fees rose sharply.</span></div>
        <div class="valufin-example-step"><span class="valufin-example-step-label">Synthesize: </span><span class="valufin-example-quote">"So it's not fewer customers or lower prices — it's licensing costs squeezing margins even with steady revenue."</span></div>
        <div class="valufin-example-step"><span class="valufin-example-step-label">Recommend: </span><span class="valufin-example-quote">"Renegotiate licensing or shift toward cheaper films off-peak; grow high-margin concessions to offset the squeeze."</span></div>
    </div>
    """,
    unsafe_allow_html=True,
)

# ---------------------------------------------------------------------------
# Other 9 frameworks — clickable dialogs
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Other case frameworks — tap any one for a full breakdown</p>', unsafe_allow_html=True)

FRAMEWORKS = [
    {
        "title": "2. Market Entry",
        "when": "Should we enter market X?",
        "buckets": [
            ("Market attractiveness", "Size, growth rate, competitive intensity."),
            ("Company capability/fit", "Do we have the resources, brand, distribution to compete here?"),
            ("Financial viability", "Does entry cost justify the expected return?"),
            ("Risks & how to enter", "Organic build, acquisition, or joint venture?"),
        ],
        "framing": (
            "Notice this is MECE at a different angle than profitability: instead of splitting "
            "a single number into its mathematical parts, you're splitting a decision into the "
            "independent questions that all need a 'yes' for the decision to make sense — is "
            "the market good, can we win in it, does the math work, and how do we actually get "
            "in. If any one bucket is a clear 'no,' that's often enough to end the case right "
            "there, so it's worth asking about the most likely dealbreaker first rather than "
            "working top-to-bottom by default."
        ),
        "tree": ["Market attractive?", "We can win?", "Math works?", "How to enter?"],
        "example": (
            "\"Should a US fitness chain enter the Brazilian market?\" — you'd structure: market "
            "attractiveness (is the Brazilian fitness market growing, how fragmented is it), "
            "company fit (does our brand and operating model translate, do we have local "
            "partners), financial viability (real estate and staffing costs vs. expected "
            "membership revenue), and entry mode (build our own gyms vs. acquire a local chain "
            "vs. franchise). You'd ask the interviewer which bucket has the most interesting "
            "data, then go deep there."
        ),
    },
    {
        "title": "3. M&A / Acquisition",
        "when": "Should we acquire Company X?",
        "buckets": [
            ("Standalone attractiveness", "Same buckets as market entry — is the target's market and position good on its own?"),
            ("Synergies", "Cost synergies (eliminating duplicate functions) and revenue synergies (cross-selling, new channels)."),
            ("Integration risk & feasibility", "Can the two companies actually combine operations, culture, and systems smoothly?"),
            ("Valuation", "Is the price being asked actually worth it, given the synergies and risk?"),
        ],
        "framing": (
            "M&A is really 'market entry, plus two new questions': can we successfully combine "
            "with this specific company, and is the price right. The valuation bucket is where "
            "this framework connects directly to the DCF/comps skills elsewhere on this site — "
            "a 'yes' on strategic fit can still be a 'no' if the price is too high."
        ),
        "tree": ["Target attractive?", "Synergies real?", "Can integrate?", "Price worth it?"],
        "example": (
            "\"Should a national coffee chain acquire a smaller regional chain?\" — standalone "
            "attractiveness (is the regional chain profitable and growing on its own), synergies "
            "(can we cut duplicate corporate overhead, cross-sell loyalty programs), integration "
            "risk (do the store formats and supply chains combine easily), and valuation (does "
            "the asking price make sense once synergies are factored in)."
        ),
    },
    {
        "title": "4. New Product Launch",
        "when": "Should we launch product X?",
        "buckets": [
            ("Market demand", "Is there real customer need? How big is it, and is it growing?"),
            ("Competitive landscape", "Who else offers something similar, and how would we differentiate?"),
            ("Company capability", "Can we actually produce and distribute this product well?"),
            ("Financials & risk", "Cost to launch vs. projected revenue, plus cannibalization and brand-fit risk."),
        ],
        "framing": (
            "This is close to Market Entry's structure, but the unit of analysis is a product "
            "instead of a geography — the same four-bucket shape (is it attractive, can we win, "
            "does the math work, what's the risk) shows up again, which is the kind of pattern "
            "recognition that makes frameworks feel less like memorization over time."
        ),
        "tree": ["Demand real?", "Can differentiate?", "Can we build it?", "Math + risk ok?"],
        "example": (
            "\"Should a soft drink company launch a zero-sugar energy drink?\" — demand (is the "
            "energy drink category growing, especially zero-sugar), competition (how crowded is "
            "this space already), capability (do we have the formulation and distribution "
            "relationships), and financials (launch and marketing cost vs. projected sales, plus "
            "whether it cannibalizes our existing soda sales)."
        ),
    },
    {
        "title": "5. Pricing",
        "when": "How should we price X?",
        "buckets": [
            ("Cost-based", "The floor — price must at least cover costs plus a target margin."),
            ("Value-based", "What is this actually worth to the customer? What's their willingness to pay?"),
            ("Competition-based", "What do rivals charge for something comparable?"),
        ],
        "framing": (
            "These three lenses aren't really alternatives you pick one of — a strong pricing "
            "answer triangulates all three: cost sets your floor, competition sets a reference "
            "point, and customer value sets your ceiling. The skill is reasoning about where in "
            "that range you should actually land, and why."
        ),
        "tree": ["Cost floor?", "Customer value?", "Competitor prices?"],
        "example": (
            "\"How should we price a new premium dog food line?\" — cost-based (ingredients and "
            "production cost a target margin), value-based (how much more would a dog owner pay "
            "for 'premium' positioning), competition-based (what do similar premium brands "
            "charge). You'd land on a price that's profitable, justified by perceived value, and "
            "roughly in line with — or deliberately above or below — competitors."
        ),
    },
    {
        "title": "6. Growth Strategy",
        "when": "How should the company grow?",
        "buckets": [
            ("Organic growth", "New products, new markets, new customers — often mapped via the Ansoff Matrix (penetration, product development, market development, diversification)."),
            ("Inorganic growth", "M&A, partnerships, joint ventures."),
        ],
        "framing": (
            "The organic/inorganic split is clean MECE — any growth either comes from the "
            "business itself or from combining with another business. Within 'organic,' the "
            "Ansoff Matrix is itself a 2x2 MECE split: are you changing the product, the market, "
            "both, or neither (just selling more of the same thing to the same people)."
        ),
        "tree": ["Organic?", "Inorganic?"],
        "example": (
            "\"How should a regional grocery chain grow?\" — organic options include opening new "
            "stores in adjacent regions (market development) or adding a private-label product "
            "line (product development); inorganic options include acquiring a smaller "
            "competitor. You'd weigh speed, cost, and risk across these before recommending one."
        ),
    },
    {
        "title": "7. Market Sizing / Guesstimate",
        "when": "How many X are sold in Y per year?",
        "buckets": [
            ("Top-down", "Start from a total population or market size, then narrow down with percentages."),
            ("Bottom-up", "Build up from a small unit (e.g. stores × customers/day × spend) and multiply out."),
        ],
        "framing": (
            "This one is less a 'business' framework and more a math/estimation skill — see the "
            "dedicated Market Sizing page for reference numbers (population, households, etc.) "
            "and practice problems with feedback."
        ),
        "tree": ["Top-down?", "Bottom-up?"],
        "example": "See the full Market Sizing page for worked examples and practice problems.",
    },
    {
        "title": "8. Operations / Process Improvement",
        "when": "Why is production slow / costs too high in operations?",
        "buckets": [
            ("Input", "Are raw materials, labor, or equipment causing the problem?"),
            ("Process", "Is the workflow itself inefficient — bottlenecks, unnecessary steps?"),
            ("Output", "Is the issue with quality, throughput, or final product consistency?"),
        ],
        "framing": (
            "The Input → Process → Output lens is MECE in the sense that any operational "
            "problem has to originate somewhere along that chain — what comes in, what happens "
            "to it, or what comes out. Capacity, quality, throughput, bottlenecks, and supply "
            "chain are all specific things you'd check within whichever stage looks broken."
        ),
        "tree": ["Input issue?", "Process issue?", "Output issue?"],
        "example": (
            "\"Why has our factory's defect rate doubled?\" — input (did a supplier change raw "
            "material quality), process (did a step in the assembly line change or break down), "
            "output (is the defect concentrated in one product line or spread evenly). You'd ask "
            "which stage the data points to before recommending a fix."
        ),
    },
    {
        "title": "9. Competitive Response",
        "when": "A competitor just did X — how should we respond?",
        "buckets": [
            ("Assess the threat", "How serious is this, and who exactly is affected — us, the whole market, a specific segment?"),
            ("Our position", "What are our relative strengths and weaknesses versus this competitor?"),
            ("Response options", "Ignore, match, differentiate, or attack them somewhere else entirely."),
        ],
        "framing": (
            "This framework is sequential rather than purely MECE-parallel — you genuinely need "
            "to assess the threat before you can meaningfully evaluate response options, since "
            "the right response depends entirely on how serious the threat actually is."
        ),
        "tree": ["How serious?", "Our position?", "Best response?"],
        "example": (
            "\"A rival airline just slashed prices on our most profitable route — how do we "
            "respond?\" — assess the threat (is this sustainable for them or a short-term move), "
            "our position (do we have a cost or loyalty advantage they don't), response options "
            "(match the price, differentiate on service, or focus marketing on a different "
            "route where we're stronger)."
        ),
    },
    {
        "title": "10. 3 C's / 4 P's",
        "when": "Marketing-flavored add-on lenses",
        "buckets": [
            ("3 C's: Company, Customers, Competitors", "A quick lens for sanity-checking any strategic question from three angles."),
            ("4 P's: Product, Price, Place, Promotion", "A classic marketing-mix checklist for go-to-market questions."),
        ],
        "framing": (
            "These are used more as supplementary checklists than standalone case structures "
            "these days — you'll rarely build a whole case purely around the 3 C's or 4 P's, but "
            "they're useful quick mental checks layered onto one of the frameworks above."
        ),
        "tree": ["Company", "Customers", "Competitors"],
        "example": (
            "\"Should we run a new ad campaign?\" — quickly sanity-checking via 4 P's: does the "
            "product support the campaign's claims, does the price fit the target message, are "
            "we promoting through the right channels, and is the campaign available where "
            "customers actually shop (place)."
        ),
    },
]


@st.dialog("Framework breakdown", width="large")
def show_framework_dialog(fw):
    st.markdown(f"### {fw['title']}")
    st.caption(f"When: \"{fw['when']}\"")

    st.markdown("**The buckets**")
    for name, desc in fw["buckets"]:
        st.markdown(f"- **{name}** — {desc}")

    st.markdown("**How to frame your thoughts**")
    st.markdown(fw["framing"])

    st.markdown("**Issue tree**")
    tree_html = '<div class="valufin-tree-container" style="margin:8px 0;"><div class="valufin-tree-level-1"><div class="valufin-tree-node">' + fw["when"] + '</div></div><div class="valufin-tree-level-3">'
    for node in fw["tree"]:
        tree_html += f'<div class="valufin-tree-node-sub">{node}</div>'
    tree_html += "</div></div>"
    st.markdown(tree_html, unsafe_allow_html=True)

    st.markdown("**Worked example**")
    st.markdown(fw["example"])


fw_cols = st.columns(3)
for i, fw in enumerate(FRAMEWORKS):
    with fw_cols[i % 3]:
        st.markdown(
            f"""
            <div class="valufin-fw-tap-card">
                <p class="valufin-fw-tap-title">{fw['title']}</p>
                <p class="valufin-fw-tap-when">"{fw['when']}"</p>
            </div>
            """,
            unsafe_allow_html=True,
        )
        if st.button("Tap for full breakdown →", key=f"fw_btn_{i}", use_container_width=True):
            show_framework_dialog(fw)
        st.markdown("<div style='height: 10px'></div>", unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# Porter's 5 Forces
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Porter\'s 5 Forces</p>', unsafe_allow_html=True)

st.markdown(
    """
    <div class="valufin-intro-card">
        <p style="margin:0;">A framework for assessing how attractive an <strong>industry</strong>
        is — not one specific company, but the whole competitive environment it operates in.
        Often used inside a Market Entry case to judge "is this industry even worth entering?"</p>
    </div>
    """,
    unsafe_allow_html=True,
)

p1, p2 = st.columns(2)
with p1:
    st.markdown(
        """
        <div class="valufin-porter-force">
            <p class="valufin-porter-force-title">Competitive Rivalry</p>
            <p class="valufin-porter-force-body">How intense is competition among existing players?
            Many similar competitors usually means lower profits for everyone.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    st.markdown("<div style='height: 10px'></div>", unsafe_allow_html=True)
    st.markdown(
        """
        <div class="valufin-porter-force">
            <p class="valufin-porter-force-title">Bargaining Power of Suppliers</p>
            <p class="valufin-porter-force-body">Can suppliers raise prices on you? Few suppliers,
            hard to switch between them, means they have leverage over you.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
with p2:
    st.markdown(
        """
        <div class="valufin-porter-force">
            <p class="valufin-porter-force-title">Threat of New Entrants</p>
            <p class="valufin-porter-force-body">How easy is it for a new competitor to enter?
            Low barriers to entry usually means more competition shows up over time.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    st.markdown("<div style='height: 10px'></div>", unsafe_allow_html=True)
    st.markdown(
        """
        <div class="valufin-porter-force">
            <p class="valufin-porter-force-title">Bargaining Power of Buyers</p>
            <p class="valufin-porter-force-body">Can customers demand lower prices? Few big
            customers who can easily switch elsewhere means they have leverage over you.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

st.markdown("<div style='height: 10px'></div>", unsafe_allow_html=True)
st.markdown(
    """
    <div class="valufin-porter-force">
        <p class="valufin-porter-force-title">Threat of Substitutes</p>
        <p class="valufin-porter-force-body">Is there a different kind of product that solves
        the same underlying need? (For example, video calls substituting for business travel.)
        Easy substitution caps how much you can realistically charge, regardless of how few
        direct competitors you have.</p>
    </div>
    """,
    unsafe_allow_html=True,
)
