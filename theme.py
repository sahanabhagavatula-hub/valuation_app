"""Shared warm-dark / muted-teal theme CSS, reused across every page of the app."""

CUSTOM_CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/tabler-icons/2.44.0/iconfont/tabler-icons.min.css');

html, body, [class*="css"] {
    font-family: 'Urbanist', -apple-system, sans-serif !important;
}

.stApp {
    background-color: #16140f;
    color: #ffffff;
}

/* Wide layout still gets a max-width content column so lines of text and
   cards don't stretch edge-to-edge on large monitors */
.main .block-container {
    max-width: 900px;
    margin: 0 auto;
    padding-top: 2rem;
}

.valufin-topbar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 0 20px;
    border-bottom: 1px solid #2a2620;
    margin-bottom: 24px;
}
.valufin-logo-mark {
    width: 28px; height: 28px;
    background: #3d6b66;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; color: #e8e3d8; font-weight: 700;
}
.valufin-logo-text { font-weight: 600; font-size: 18px; color: #ffffff; }

.valufin-eyebrow {
    display: inline-block;
    border: 1px solid #4a4438;
    color: #b8a888;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 20px;
    margin-bottom: 12px;
}

.valufin-section-label {
    color: #6b9b94;
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
.stCaption, [data-testid="stCaptionContainer"] { color: #8e8675 !important; }

[data-testid="stExpander"] {
    background-color: #1f1b15 !important;
    border: 1px solid #322c23 !important;
    border-radius: 10px !important;
    margin-bottom: 10px;
}
[data-testid="stExpander"] summary {
    color: #8e8675 !important;
    font-size: 13px !important;
}
[data-testid="stExpander"] summary:hover { color: #6b9b94 !important; }

.stTextInput input, .stNumberInput input {
    background-color: #16140f !important;
    border: 1px solid #3a322c !important;
    color: #ffffff !important;
    border-radius: 7px !important;
}

.stSlider [data-baseweb="slider"] > div > div { background: #3d6b66 !important; }
.stSlider [role="slider"] { background-color: #6b9b94 !important; border-color: #16140f !important; }

[data-testid="stMetric"] {
    background-color: #1f1b15;
    border: 1px solid #322c23;
    border-radius: 10px;
    padding: 14px;
}
[data-testid="stMetricLabel"] { color: #8e8675 !important; }
[data-testid="stMetricValue"] { color: #ffffff !important; }

.stButton button {
    background-color: #3d6b66 !important;
    color: #e8e3d8 !important;
    border: none !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
}
.stButton button:hover { background-color: #4d8079 !important; }

[data-testid="stSidebar"] {
    background-color: #1f1b15;
    border-right: 1px solid #322c23;
}
[data-testid="stSidebar"] * { color: #ffffff !important; }

.valufin-verdict-card {
    background: #1f1b15;
    border: 1px solid #4a4438;
    border-radius: 12px;
    padding: 20px 20px 20px 24px;
    margin: 16px 0;
    position: relative;
    overflow: hidden;
}
.valufin-verdict-card::before {
    content: "";
    position: absolute; top: 0; left: 0; bottom: 0; width: 4px;
    background: #3d6b66;
}
.valufin-verdict-label {
    font-size: 11px; color: #6b9b94; text-transform: uppercase;
    letter-spacing: 0.1em; margin: 0 0 6px; font-weight: 500;
}
.valufin-verdict-value { font-size: 26px; font-weight: 400; color: #ffffff; margin: 0; }
.valufin-verdict-sub { font-size: 13px; color: #8e8675; margin: 8px 0 0; font-weight: 300; }

.valufin-links-box {
    background: #1f1b15;
    border-left: 3px solid #3d6b66;
    border-radius: 0 10px 10px 0;
    padding: 14px 18px;
    margin: 16px 0;
}
.valufin-links-title {
    font-size: 12px; font-weight: 600; color: #ffffff; margin: 0 0 8px;
    text-transform: uppercase; letter-spacing: 0.06em;
}
.valufin-links-box a {
    display: block; color: #8e8675; font-size: 14px; text-decoration: none;
    margin: 6px 0; font-weight: 400;
}
.valufin-links-box a:hover { color: #6b9b94; }

.valufin-concept-card {
    background: #1f1b15;
    border: 1px solid #322c23;
    border-radius: 12px;
    padding: 24px 26px;
    margin: 0 0 18px;
}
.valufin-concept-heading {
    font-size: 19px;
    font-weight: 500;
    color: #6b9b94;
    margin: 0 0 12px;
}
.valufin-concept-body {
    font-size: 15px;
    color: #c7c0b0;
    line-height: 1.75;
    font-weight: 300;
}
.valufin-concept-body strong { color: #ffffff; font-weight: 500; }

[data-testid="stDataFrame"] { background-color: #1f1b15; border-radius: 10px; }

hr { border-color: #322c23 !important; }

[data-testid="stSidebarNav"] a span {
    color: #ffffff !important;
}

/* Landing page hero (skyscraper photo) */
.valufin-hero {
    position: relative;
    padding: 56px 24px 32px;
    text-align: center;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 8px;
}
.valufin-hero-bg {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: url('data:image/png;base64,__HERO_IMAGE_B64__');
    background-size: cover;
    background-position: center 65%;
    filter: grayscale(100%) contrast(1.1);
    opacity: 0.3;
    z-index: 0;
}
.valufin-hero-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(180deg, rgba(22,20,15,0.5) 0%, rgba(22,20,15,0.88) 75%, #16140f 100%);
    z-index: 1;
}
.valufin-hero-content {
    position: relative;
    z-index: 2;
    max-width: 540px;
    margin: 0 auto;
}
.valufin-hero h1 {
    font-size: 42px !important;
    font-weight: 700 !important;
    line-height: 1.15;
    letter-spacing: -0.01em;
    margin: 0 0 16px;
    color: transparent !important;
    -webkit-text-stroke: 1.5px #ffffff;
}
.valufin-hero h1 .accent {
    color: transparent;
    -webkit-text-stroke: 1.5px #6b9b94;
}
.valufin-hero-sub {
    font-size: 16px;
    color: #c7c0b0;
    font-weight: 300;
    max-width: 460px;
    margin: 0 auto 8px;
    line-height: 1.6;
}

.valufin-feature-card {
    background: #1f1b15;
    border: 1px solid #322c23;
    border-radius: 12px;
    padding: 20px 18px;
    text-align: center;
    height: 100%;
}
.valufin-feature-number {
    width: 28px; height: 28px;
    background: #3d6b66;
    color: #e8e3d8;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700;
    margin: 0 auto 12px;
}
.valufin-feature-title {
    font-size: 15px;
    font-weight: 500;
    color: #ffffff;
    margin: 0 0 8px;
}
.valufin-feature-body {
    font-size: 13px;
    color: #8e8675;
    font-weight: 300;
    line-height: 1.6;
    margin: 0;
}

.valufin-audience-card {
    background: #1f1b15;
    border-left: 3px solid #3d6b66;
    border-radius: 0 10px 10px 0;
    padding: 16px 18px;
    margin: 6px 0;
}
.valufin-audience-card p {
    font-size: 14px;
    color: #c7c0b0;
    font-weight: 300;
    margin: 0;
    line-height: 1.6;
}

/* Secondary-page hero (ticker board photo) — used on tool + basics pages */
.valufin-subhero {
    position: relative;
    overflow: hidden;
    margin: -1rem -1rem 8px -1rem;
    padding: 24px 1rem 8px;
    text-align: center;
    border-radius: 0 0 16px 16px;
}
.valufin-subhero-bg {
    position: absolute;
    top: 0; right: 0; width: 60%; height: 100%;
    background-image: url('data:image/png;base64,__TICKER_IMAGE_B64__');
    background-size: cover;
    background-position: center top;
    filter: grayscale(20%) contrast(1.05);
    opacity: 0.22;
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 100%);
    mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 100%);
    z-index: 0;
}
.valufin-subhero-bg-trading {
    position: absolute;
    top: 0; right: 0; width: 55%; height: 100%;
    background-image: url('data:image/png;base64,__TRADING_IMAGE_B64__');
    background-size: cover;
    background-position: center;
    filter: grayscale(40%) contrast(1.05);
    opacity: 0.22;
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%);
    mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%);
    z-index: 0;
}
.valufin-subhero-fade {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(180deg, rgba(22,20,15,0.25) 0%, #16140f 95%);
    z-index: 1;
}
.valufin-subhero-content {
    position: relative;
    z-index: 2;
}
.valufin-subhero h1 {
    font-size: 34px !important;
    font-weight: 700 !important;
    color: transparent !important;
    -webkit-text-stroke: 1.3px #ffffff;
    margin: 0 0 10px;
}
.valufin-subhero-sub {
    color: #a39c8c;
    font-size: 15px;
    font-weight: 300;
    max-width: 460px;
    margin: 0 auto;
    line-height: 1.6;
}

/* Step pills */
.valufin-step-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #1f1b15;
    border: 1px solid #322c23;
    border-radius: 20px;
    padding: 8px 18px;
    margin: 28px 0 6px;
}
.valufin-step-num {
    width: 20px; height: 20px;
    background: #3d6b66;
    color: #e8e3d8;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
}
.valufin-step-label {
    font-size: 13px; font-weight: 600; color: #6b9b94;
    letter-spacing: 0.04em; text-transform: uppercase;
}

/* Field cards with icon + bar */
.valufin-icon-card {
    background: #1f1b15;
    border: 1px solid #322c23;
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 10px;
}
.valufin-icon-card-top { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.valufin-field-icon {
    width: 26px; height: 26px;
    background: rgba(61,107,102,0.2);
    color: #6b9b94;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
}
.valufin-field-label { font-size: 12px; color: #8e8675; font-weight: 500; }
.valufin-field-value { font-size: 18px; font-weight: 600; color: #ffffff; margin: 0; }
.valufin-bar-track { height: 4px; background: #322c23; border-radius: 2px; margin-top: 8px; overflow: hidden; }
.valufin-bar-fill { height: 100%; border-radius: 2px; }
.valufin-bar-caption { font-size: 10.5px; margin-top: 4px; }
</style>
"""


def inject_theme(st):
    import base64
    import os

    base_dir = os.path.dirname(os.path.abspath(__file__))
    css = CUSTOM_CSS

    for placeholder, filename in [
        ("__HERO_IMAGE_B64__", "hero_skyscrapers.png"),
        ("__TICKER_IMAGE_B64__", "ticker_board.png"),
        ("__TRADING_IMAGE_B64__", "trading_screen.png"),
    ]:
        img_path = os.path.join(base_dir, "assets", filename)
        try:
            with open(img_path, "rb") as f:
                b64 = base64.b64encode(f.read()).decode("utf-8")
            css = css.replace(placeholder, b64)
        except FileNotFoundError:
            css = css.replace(placeholder, "")

    st.markdown(css, unsafe_allow_html=True)


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


def subhero(st, title, subtitle, background="ticker"):
    """The photo-backed mini hero used on the tool and basics pages.
    background: 'ticker' (ticker board photo) or 'trading' (trading screen photo)."""
    bg_class = "valufin-subhero-bg-trading" if background == "trading" else "valufin-subhero-bg"
    st.markdown(
        f"""
        <div class="valufin-subhero">
            <div class="{bg_class}"></div>
            <div class="valufin-subhero-fade"></div>
            <div class="valufin-subhero-content">
                <h1>{title}</h1>
                <p class="valufin-subhero-sub">{subtitle}</p>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def step_pill(st, number, label):
    st.markdown(
        f"""
        <div class="valufin-step-pill">
            <span class="valufin-step-num">{number}</span>
            <span class="valufin-step-label">{label}</span>
        </div>
        """,
        unsafe_allow_html=True,
    )


def icon_field_card(st, icon, label, value, bar_pct=None, bar_color="#3d6b66", bar_caption=None, bar_caption_color="#6b9b94"):
    """A field card with an icon, value, and an optional comparison bar underneath."""
    bar_html = ""
    if bar_pct is not None:
        bar_html = f"""
        <div class="valufin-bar-track">
            <div class="valufin-bar-fill" style="width:{bar_pct}%; background:{bar_color};"></div>
        </div>
        <p class="valufin-bar-caption" style="color:{bar_caption_color};">{bar_caption or ''}</p>
        """
    st.markdown(
        f"""
        <div class="valufin-icon-card">
            <div class="valufin-icon-card-top">
                <div class="valufin-field-icon"><i class="ti ti-{icon}"></i></div>
                <span class="valufin-field-label">{label}</span>
            </div>
            <p class="valufin-field-value">{value}</p>
            {bar_html}
        </div>
        """,
        unsafe_allow_html=True,
    )


def flashcard_grid(cards, height=480):
    """
    Renders an interactive grid of flip cards as an embedded HTML component.
    Needs a real component (not st.markdown) because the click-to-flip
    animation requires JS that Streamlit's markdown sandbox won't run.

    cards: list of dicts, each with keys: icon, term, definition, example
    """
    import streamlit.components.v1 as components

    card_html = ""
    for c in cards:
        card_html += f"""
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-face flip-front">
                    <div class="icon"><i class="ti ti-{c['icon']}"></i></div>
                    <p class="term">{c['term']}</p>
                    <p class="tap-hint">Tap to flip</p>
                </div>
                <div class="flip-face flip-back">
                    <p class="def-label">Definition</p>
                    <p class="def-text">{c['definition']}</p>
                    <p class="ex-label">Example</p>
                    <p class="ex-text">{c['example']}</p>
                </div>
            </div>
        </div>
        """

    full_html = f"""
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tabler-icons/2.44.0/iconfont/tabler-icons.min.css">
    <style>
        * {{ box-sizing: border-box; }}
        body {{
            font-family: 'Urbanist', -apple-system, sans-serif;
            margin: 0;
            background: transparent;
        }}
        .card-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
            padding: 4px;
        }}
        .flip-card {{ perspective: 1000px; height: 280px; cursor: pointer; }}
        .flip-card-inner {{
            position: relative; width: 100%; height: 100%;
            transition: transform 0.5s; transform-style: preserve-3d;
        }}
        .flip-card.flipped .flip-card-inner {{ transform: rotateY(180deg); }}
        .flip-face {{
            position: absolute; width: 100%; height: 100%;
            backface-visibility: hidden;
            border-radius: 14px;
            display: flex; flex-direction: column;
            padding: 18px; text-align: left;
        }}
        .flip-front {{
            background: #1f1b15; border: 1px solid #322c23;
            align-items: center; justify-content: center; text-align: center;
        }}
        .flip-front .icon {{
            width: 46px; height: 46px; background: rgba(61,107,102,0.2); color: #6b9b94;
            border-radius: 10px; display: flex; align-items: center; justify-content: center;
            font-size: 22px; margin-bottom: 12px;
        }}
        .flip-front .term {{ font-size: 16px; font-weight: 600; color: #ffffff; margin: 0; }}
        .flip-front .tap-hint {{ font-size: 11px; color: #6b9b94; margin-top: 10px; }}
        .flip-back {{
            background: #243a36; border: 1px solid #3d6b66;
            transform: rotateY(180deg);
            overflow-y: auto; justify-content: flex-start;
        }}
        .flip-back .def-label {{ font-size: 10px; color: #8fc4bf; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; margin: 0 0 6px; }}
        .flip-back .def-text {{ font-size: 12.5px; color: #d6e6e3; line-height: 1.55; font-weight: 300; margin: 0 0 12px; }}
        .flip-back .ex-label {{ font-size: 10px; color: #c9a875; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; margin: 0 0 5px; }}
        .flip-back .ex-text {{ font-size: 12px; color: #b8a888; line-height: 1.55; font-weight: 300; font-style: italic; margin: 0; }}
    </style>
    <div class="card-grid">
        {card_html}
    </div>
    <script>
        document.querySelectorAll('.flip-card').forEach(function(card) {{
            card.addEventListener('click', function() {{
                card.classList.toggle('flipped');
            }});
        }});
    </script>
    """
    components.html(full_html, height=height, scrolling=False)