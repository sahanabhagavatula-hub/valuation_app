# AI Valuation Tool — local app

LINK: https://sahanabhagavatula-hub.github.io/valuation_app

Type a ticker, pull real financials, and get a DCF + comps valuation with
an optional AI-written analyst summary. Runs entirely on your own laptop.

## Folder structure

This app now has multiple pages. Your `valuation_app` folder must look
exactly like this:

```
valuation_app/
├── app.py
├── theme.py
├── requirements.txt
├── README.md
└── pages/
    └── 1_Valuation_basics.py
```

The `pages` folder (lowercase, exact spelling) is what tells Streamlit to
turn `1_Valuation_basics.py` into a second page with sidebar navigation
automatically — don't rename or move it.

## 1. Install Python (if you don't have it)

Check first:
```
python3 --version
```
If that fails, install Python 3.10+ from https://www.python.org/downloads/

## 2. Install the dependencies

Open Terminal (Mac) or Command Prompt (Windows), navigate into this folder, then run:

```
pip install -r requirements.txt
```

## 3. Get a free FMP API key

1. Go to https://site.financialmodelingprep.com/
2. Sign up for a free account (no credit card required)
3. Your API key will be shown on your dashboard — copy it

This gives you 250 free requests/day, more than enough for this tool.

## 4. (Optional) Get an Anthropic API key

Only needed if you want the AI-written analyst paragraph at the end of each
valuation. Without it, the app still gives you the full DCF, comps, football
field chart, and sensitivity table — just no written narrative.

1. Go to https://console.anthropic.com/
2. Sign up and add a small amount of credit (a few dollars covers many uses —
   each writeup costs a fraction of a cent)
3. Create an API key under "API Keys"

## 5. Run the app

From this folder, run:

```
streamlit run app.py
```

It'll open automatically in your browser at `http://localhost:8501`.

## 6. Use it

1. Paste your FMP key (and Anthropic key, if you have one) into the sidebar
2. Type a ticker (e.g. `AAPL`, `GOOGL`, `INTC`) and click "Fetch data"
3. Review the pulled numbers — adjust anything you want, especially the
   growth assumption
4. Click "Run valuation"

## How the valuation works

- **DCF**: 5-year free cash flow projection (estimated as EBITDA margin minus
  a 6-point haircut for capex/working capital) discounted at your chosen
  WACC, plus a terminal value using the Gordon growth model.
- **Comps**: applies typical EV/EBITDA and P/E multiples for the company's
  sector to its actual EBITDA and net income.
- **Football field chart**: shows both valuation ranges next to the current
  price.
- **Sensitivity table**: shows how the DCF implied price changes across a
  grid of WACC and terminal growth assumptions — this is usually the first
  thing an interviewer will ask you to walk through.

## Notes on the model's limitations (good to know for an interview)

- The comp multiples are reasonable sector averages, not a live, hand-picked
  peer set — a real analyst would pull actual comparable companies'
  multiples from a terminal like Bloomberg or CapIQ.
- The FCF margin is a simplification. A full model would build out capex,
  depreciation, and working capital changes line by line.
- Keys you enter are only sent directly from your machine to FMP and
  Anthropic's APIs — nothing is stored or sent anywhere else.

## If you want to upgrade to a real hosted website later

This same code can be deployed to a free host like Streamlit Community Cloud
or Vercel so it's live at a public URL anyone can visit. Just ask and I can
walk you through it when you're ready.
