"""
ValuFin — landing page
The entry point of the app. Introduces what ValuFin does, who it's for,
and how it works, then links into the actual valuation tool.

Run with: streamlit run app.py
"""

import streamlit as st
from theme import inject_theme, topbar

st.set_page_config(page_title="ValuFin — AI Valuation Tool", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)

# ---------------------------------------------------------------------------
# Hero (with background photo baked into the theme CSS)
# ---------------------------------------------------------------------------
st.markdown(
    """
    <div class="valufin-hero">
        <div class="valufin-hero-bg"></div>
        <div class="valufin-hero-overlay"></div>
        <div class="valufin-hero-content">
            <span class="valufin-eyebrow">Built for finance students</span>
            <h1>Value any company<br><span class="accent">like an analyst.</span></h1>
            <p class="valufin-hero-sub">
                Type a ticker, pull real financials, and learn the exact DCF and comps
                methodology used in real recruiting interviews — explained from scratch,
                no finance background required.
            </p>
        </div>
    </div>
    """,
    unsafe_allow_html=True,
)

col_a, col_b, col_c = st.columns([1, 2, 1])
with col_b:
    if st.button("Get started →", type="primary", use_container_width=True):
        st.switch_page("pages/2_Valuation_tool.py")

st.markdown("<div style='height: 12px'></div>", unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# How it works
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">How it works</p>', unsafe_allow_html=True)

f1, f2, f3 = st.columns(3)
with f1:
    st.markdown(
        """
        <div class="valufin-feature-card">
            <div class="valufin-feature-number">1</div>
            <p class="valufin-feature-title">Look up a company</p>
            <p class="valufin-feature-body">Type any stock ticker. Real revenue,
            margins, debt, and cash get pulled in automatically.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
with f2:
    st.markdown(
        """
        <div class="valufin-feature-card">
            <div class="valufin-feature-number">2</div>
            <p class="valufin-feature-title">Review the numbers</p>
            <p class="valufin-feature-body">Every field is explained in plain English.
            Adjust anything to test your own scenario.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
with f3:
    st.markdown(
        """
        <div class="valufin-feature-card">
            <div class="valufin-feature-number">3</div>
            <p class="valufin-feature-title">Get a valuation</p>
            <p class="valufin-feature-body">A DCF and comps analysis, a sensitivity
            table, and an AI-written analyst writeup.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

st.markdown("<div style='height: 8px'></div>", unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# Who it's for
# ---------------------------------------------------------------------------
st.markdown('<p class="valufin-section-label">Who this is for</p>', unsafe_allow_html=True)

st.markdown(
    """
    <div class="valufin-audience-card">
        <p><strong style="color:#ffffff;">Recruiting for IB, PE, or HF roles</strong> — practice
        building a real DCF and comps model on companies you're pitching, and learn the
        language interviewers expect you to use.</p>
    </div>
    <div class="valufin-audience-card">
        <p><strong style="color:#ffffff;">New to valuation entirely</strong> — every concept,
        from revenue to WACC to terminal growth, is explained from scratch on the
        Valuation Basics page.</p>
    </div>
    <div class="valufin-audience-card">
        <p><strong style="color:#ffffff;">Building a portfolio project</strong> — see exactly
        how the DCF and comps math works under the hood, since nothing here is a black box.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown("<div style='height: 8px'></div>", unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# Bottom CTA
# ---------------------------------------------------------------------------
col_d, col_e, col_f = st.columns([1, 2, 1])
with col_e:
    if st.button("Get started →", type="primary", use_container_width=True, key="bottom_cta"):
        st.switch_page("pages/2_Valuation_tool.py")
    if st.button("📖  Valuation basics — start here", use_container_width=True, key="basics_cta"):
        st.switch_page("pages/1_Valuation_basics.py")

st.markdown("<div style='height: 16px'></div>", unsafe_allow_html=True)
st.caption(
    "Free to use. Requires a free FMP API key for live data; an Anthropic API key "
    "is optional and only used for the AI-written analyst summary."
)
