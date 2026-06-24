"""Shared navy/baby-blue theme CSS, reused across every page of the app."""

CUSTOM_CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');

html, body, [class*="css"] {
    font-family: 'Urbanist', -apple-system, sans-serif !important;
}

.stApp {
    background-color: #0d1b2e;
    color: #ffffff;
}

.valufin-topbar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 0 20px;
    border-bottom: 1px solid #1c3350;
    margin-bottom: 24px;
}
.valufin-logo-mark {
    width: 28px; height: 28px;
    background: #7ec8e3;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; color: #0d1b2e; font-weight: 700;
}
.valufin-logo-text { font-weight: 600; font-size: 18px; color: #ffffff; }

.valufin-eyebrow {
    display: inline-block;
    border: 1px solid #3d6e8a;
    color: #9ed8f0;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 20px;
    margin-bottom: 12px;
}

.valufin-section-label {
    color: #9ed8f0;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 28px 0 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}

h1, h2, h3 { color: #ffffff !important; font-weight: 400 !important; }
p, span, label, .stMarkdown { color: #ffffff; }
.stCaption, [data-testid="stCaptionContainer"] { color: #8093ab !important; }

[data-testid="stExpander"] {
    background-color: #122440 !important;
    border: 1px solid #1c3350 !important;
    border-radius: 10px !important;
    margin-bottom: 10px;
}
[data-testid="stExpander"] summary {
    color: #6b7f99 !important;
    font-size: 13px !important;
}
[data-testid="stExpander"] summary:hover { color: #9ed8f0 !important; }

.stTextInput input, .stNumberInput input {
    background-color: #0d1b2e !important;
    border: 1px solid #2a4566 !important;
    color: #ffffff !important;
    border-radius: 7px !important;
}
.stSlider [data-baseweb="slider"] { color: #7ec8e3; }

[data-testid="stMetric"] {
    background-color: #122440;
    border: 1px solid #1c3350;
    border-radius: 10px;
    padding: 14px;
}
[data-testid="stMetricLabel"] { color: #6b7f99 !important; }
[data-testid="stMetricValue"] { color: #ffffff !important; }

.stButton button {
    background-color: #7ec8e3 !important;
    color: #0d1b2e !important;
    border: none !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
}
.stButton button:hover { background-color: #9ed8f0 !important; }

[data-testid="stSidebar"] {
    background-color: #122440;
    border-right: 1px solid #1c3350;
}
[data-testid="stSidebar"] * { color: #ffffff !important; }

.valufin-verdict-card {
    background: #122440;
    border: 1px solid #3d6e8a;
    border-radius: 12px;
    padding: 20px 20px 20px 24px;
    margin: 16px 0;
    position: relative;
    overflow: hidden;
}
.valufin-verdict-card::before {
    content: "";
    position: absolute; top: 0; left: 0; bottom: 0; width: 4px;
    background: #7ec8e3;
}
.valufin-verdict-label {
    font-size: 11px; color: #9ed8f0; text-transform: uppercase;
    letter-spacing: 0.1em; margin: 0 0 6px; font-weight: 500;
}
.valufin-verdict-value { font-size: 26px; font-weight: 400; color: #ffffff; margin: 0; }
.valufin-verdict-sub { font-size: 13px; color: #8093ab; margin: 8px 0 0; font-weight: 300; }

.valufin-links-box {
    background: #122440;
    border-left: 3px solid #7ec8e3;
    border-radius: 0 10px 10px 0;
    padding: 14px 18px;
    margin: 16px 0;
}
.valufin-links-title {
    font-size: 12px; font-weight: 600; color: #ffffff; margin: 0 0 8px;
    text-transform: uppercase; letter-spacing: 0.06em;
}
.valufin-links-box a {
    display: block; color: #8093ab; font-size: 14px; text-decoration: none;
    margin: 6px 0; font-weight: 400;
}
.valufin-links-box a:hover { color: #9ed8f0; }

.valufin-concept-card {
    background: #122440;
    border: 1px solid #1c3350;
    border-radius: 12px;
    padding: 24px 26px;
    margin: 0 0 18px;
}
.valufin-concept-heading {
    font-size: 19px;
    font-weight: 500;
    color: #9ed8f0;
    margin: 0 0 12px;
}
.valufin-concept-body {
    font-size: 15px;
    color: #d6e0ec;
    line-height: 1.75;
    font-weight: 300;
}
.valufin-concept-body strong { color: #ffffff; font-weight: 500; }

[data-testid="stDataFrame"] { background-color: #122440; border-radius: 10px; }

hr { border-color: #1c3350 !important; }

[data-testid="stSidebarNav"] a span {
    color: #ffffff !important;
}
</style>
"""


def inject_theme(st):
    st.markdown(CUSTOM_CSS, unsafe_allow_html=True)


def topbar(st):
    st.markdown(
        """
        <div class="valufin-topbar">
            <div class="valufin-logo-mark">$</div>
            <div class="valufin-logo-text">VALUFIN</div>
        </div>
        """,
        unsafe_allow_html=True,
    )
