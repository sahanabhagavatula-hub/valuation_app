"""
Valuation basics — start here
A dedicated, in-depth page explaining every concept used in the valuation
tool, written for someone who has never encountered the term before.
"""

import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from theme import inject_theme, topbar, subhero

st.set_page_config(page_title="Valuation basics — ValuFin", page_icon="📊", layout="wide")
inject_theme(st)
topbar(st)
subhero(
    st,
    "Valuation basics.",
    "Everything used in the valuation tool, explained from scratch. No prior finance "
    "knowledge assumed — read top to bottom, or jump to whatever you need.",
)

if st.button("←  Back to the valuation tool", use_container_width=True):
    st.switch_page("pages/2_Valuation_tool.py")

st.markdown("---")


def concept(heading, body_html):
    st.markdown(
        f"""
        <div class="valufin-concept-card">
            <p class="valufin-concept-heading">{heading}</p>
            <div class="valufin-concept-body">{body_html}</div>
        </div>
        """,
        unsafe_allow_html=True,
    )


concept(
    "Valuation",
    """
    Every company has a stock price — what the market is currently charging for one
    share. But that price isn't automatically "correct." It's just whatever buyers
    and sellers agreed on most recently, and markets can be too optimistic or too
    pessimistic for all kinds of reasons (hype, fear, a single bad headline, broader
    economic mood).
    <br><br>
    Valuation is the process of ignoring the current price for a moment and asking,
    from scratch: based on how much money this business actually makes, how much
    <strong>should</strong> a share of it be worth? You build your own independent
    estimate, then compare it to the real price. If your estimate is much higher than
    the price, the stock might be a bargain. If it's much lower, the stock might be
    expensive. This is the core judgment call every investor, analyst, and banker is
    really making — everything else in this tool is just the machinery for getting
    to that estimate.
    """,
)

concept(
    "Revenue, EBITDA, and net income — the layers of profit",
    """
    Picture a company's income statement as a waterfall, where money gets
    subtracted at each step:
    <br><br>
    <strong>Revenue</strong> is everything the company sold — the total, before
    anything is subtracted. If a lemonade stand sells 100 cups at $2 each, revenue
    is $200.
    <br><br>
    From there, you subtract the cost of actually making the product (lemons,
    sugar, cups), then subtract operating costs (rent, wages, marketing). What's
    left is roughly <strong>EBITDA</strong> — Earnings Before Interest, Taxes,
    Depreciation, and Amortization. It's a rough measure of how profitable the
    core business is, before you get into how it's financed (debt vs. no debt) or
    accounting details. People often look at "EBITDA margin" — EBITDA divided by
    revenue — to see what percentage of every dollar of sales turns into core
    profit.
    <br><br>
    Keep subtracting — interest paid on any debt, taxes owed, depreciation of
    equipment — and you get to <strong>net income</strong>, the true bottom-line
    profit. This is what's actually left for shareholders, and it's what people
    usually mean when they say a company's "earnings."
    """,
)

concept(
    "Free cash flow (FCF)",
    """
    Net income is an accounting number, and accounting has quirks — it includes
    non-cash charges (like depreciation, which spreads out the cost of equipment
    over years even though the cash was spent upfront) and doesn't directly show
    how much new equipment or infrastructure the company had to buy this year.
    <br><br>
    <strong>Free cash flow</strong> tries to answer a more literal question: how
    much real, spendable cash did this business generate, after paying for
    everything it needed to keep running and growing? This is the number that
    actually matters for valuation, because it's the cash that could, in theory,
    be paid out to the people who own and lend to the company. A DCF valuation
    (explained below) is really just a forecast of this number, year by year.
    """,
)

concept(
    "DCF — discounted cash flow",
    """
    Here's the core idea, in plain terms: a business is worth the cash it's going
    to generate for its owners over time. So if you could perfectly predict every
    dollar of cash flow a company will ever produce, you could add it all up and
    that sum would be the company's true value.
    <br><br>
    Obviously nobody can predict forever with precision, so a DCF makes a
    practical compromise: forecast cash flow explicitly for the next 5 years (a
    horizon you can reason about), then make one simplifying assumption — that
    after year 5, the company keeps growing slowly and steadily forever. That
    "forever" chunk is called the <strong>terminal value</strong>, and for most
    companies it actually makes up the majority of the total DCF value, since
    "forever" is a very long time.
    <br><br>
    There's one more wrinkle: a dollar of cash flow five years from now isn't
    worth as much as a dollar today, because money has a time value (you could
    invest today's dollar and have more than a dollar in five years) and because
    future cash flow is uncertain (the company might not actually deliver it). So
    each year's projected cash flow gets shrunk down, or <strong>discounted</strong>,
    using a discount rate. Add up all the discounted yearly cash flows, plus the
    discounted terminal value, and you get the company's estimated total value.
    Divide that by the number of shares outstanding, and you get an estimated
    fair price per share — which is exactly what this tool's DCF section is
    doing.
    """,
)

concept(
    "WACC — the discount rate",
    """
    WACC stands for Weighted Average Cost of Capital, but the name is more
    intimidating than the idea. Every company is funded by a mix of debt
    (borrowed money) and equity (shareholder money), and both groups expect to
    be compensated for the risk of investing in this particular company.
    WACC is essentially a blended "required rate of return" across both groups —
    it answers, "given how risky this business is, what return do its investors
    need to be willing to fund it?"
    <br><br>
    In a DCF, WACC is the discount rate used to shrink future cash flows down to
    today's value (see above). A higher WACC means investors see the company as
    riskier, so future cash gets discounted more heavily, which lowers the
    estimated value. A lower WACC means a safer, more predictable business, so
    future cash isn't discounted as much, and the estimated value comes out
    higher. As a rough feel: a large, stable, profitable company might use a WACC
    around 7-10%; a smaller or more volatile company might warrant 12% or higher.
    """,
)

concept(
    "Terminal growth rate",
    """
    This is the growth rate assumed for the company's cash flow forever, after
    the explicit 5-year forecast ends. It has to be a conservative number — no
    company can outgrow the entire economy forever, or eventually it would become
    larger than the whole world's economic output, which is obviously impossible.
    <br><br>
    Because of this, terminal growth is usually set close to the long-run growth
    rate of the overall economy — typically somewhere around 1-3%. Even a small
    change here has an outsized effect on the final valuation, since it applies
    to the "forever" portion of the cash flow, which is usually the biggest chunk
    of a DCF's total value. This is exactly why the sensitivity table in the
    tool exists — to show how much the answer moves as this assumption shifts.
    """,
)

concept(
    "Comps — comparable company analysis",
    """
    A DCF builds a valuation entirely from scratch, using forecasts and
    assumptions. Comps take a completely different, more market-based approach:
    instead of forecasting anything, you look at how the stock market is
    currently pricing other, similar companies, and apply that same pricing
    logic to the company you're valuing.
    <br><br>
    The most common way to express "pricing" is as a multiple — a ratio of a
    company's value to some financial metric. The most well-known is the
    <strong>P/E ratio</strong> (price divided by earnings per share) — if
    similar companies trade at 20 times their earnings, and your company earns
    $5 per share, comps would suggest a price around $100. Another common one is
    <strong>EV/EBITDA</strong> (enterprise value divided by EBITDA), which is
    useful because it isn't distorted by how much debt a company carries.
    <br><br>
    The strength of comps is that it reflects real, current market sentiment
    rather than a forecast that could be wrong. The weakness is that if the
    whole sector is overpriced or underpriced, comps will just repeat that
    mispricing rather than catching it — which is exactly the kind of thing a
    DCF, built independently from market prices, can sometimes catch instead.
    That's why serious analysis usually looks at both methods side by side,
    which is what the football field chart in this tool is for.
    """,
)

concept(
    "Enterprise value vs. equity value",
    """
    These two terms get mixed up constantly, so it's worth being precise.
    <strong>Enterprise value</strong> is the value of the entire business and
    its operations — it doesn't care how that business happens to be financed
    (debt vs. equity). <strong>Equity value</strong> is specifically what's left
    over for shareholders, after the company's debts are accounted for.
    <br><br>
    The bridge between them: equity value = enterprise value − debt + cash.
    The logic is that if you bought the entire enterprise, you'd have to pay off
    its debt (so subtract that), but you'd also immediately get to keep its cash
    on hand (so add that back). This is exactly the calculation the tool runs
    after estimating enterprise value from a DCF or comps, in order to get to a
    per-share price.
    """,
)

st.markdown(
    """
    <div class="valufin-links-box">
        <p class="valufin-links-title">Helpful links to go deeper</p>
        <a href="https://www.investopedia.com/terms/d/dcf.asp" target="_blank">↗ Investopedia — Discounted cash flow</a>
        <a href="https://www.investopedia.com/terms/w/wacc.asp" target="_blank">↗ Investopedia — WACC explained</a>
        <a href="https://www.investopedia.com/terms/e/ebitda.asp" target="_blank">↗ Investopedia — EBITDA</a>
        <a href="https://corporatefinanceinstitute.com/resources/valuation/comparable-company-analysis/" target="_blank">↗ Corporate Finance Institute — Comparable company analysis</a>
        <a href="https://corporatefinanceinstitute.com/resources/valuation/enterprise-value-vs-equity-value/" target="_blank">↗ Corporate Finance Institute — Enterprise value vs equity value</a>
        <a href="https://www.wsj.com/market-data" target="_blank">↗ WSJ Markets — live market data</a>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown("---")
if st.button("←  Back to the valuation tool", use_container_width=True, key="back_button_bottom"):
    st.switch_page("pages/2_Valuation_tool.py")
