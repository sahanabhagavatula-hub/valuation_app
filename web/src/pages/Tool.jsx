import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import SubHero from '../components/SubHero';
import StepPill from '../components/StepPill';
import IconFieldCard from '../components/IconFieldCard';
import PriceHistoryChart from '../components/PriceHistoryChart';
import FootballFieldChart from '../components/FootballFieldChart';
import SensitivityTable from '../components/SensitivityTable';
import { Button, Metric, Expander, TextField, PasswordField, NumberField, Slider } from '../components/Widgets';
import { fetchCompanyData } from '../lib/fmp';
import { runDcf, runComps, pickTypicalMargin } from '../lib/valuation';
import { getAiWriteup } from '../lib/anthropic';

const SENS_WACCS = [8, 9, 10, 11, 12];
const SENS_TERMS = [1.5, 2, 2.5, 3, 3.5];

export default function Tool() {
  const navigate = useNavigate();

  const [fmpKey, setFmpKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');

  const [tickerInput, setTickerInput] = useState('');
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [fetchSuccess, setFetchSuccess] = useState(null);
  const [data, setData] = useState(null);

  const [companyName, setCompanyName] = useState('');
  const [revenue, setRevenue] = useState(0);
  const [ebitdaMargin, setEbitdaMargin] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [shares, setShares] = useState(0);
  const [debt, setDebt] = useState(0);
  const [cash, setCash] = useState(0);
  const [price, setPrice] = useState(0);
  const [growth, setGrowth] = useState(5.0);
  const [industry, setIndustry] = useState('');

  const [wacc, setWacc] = useState(10.0);
  const [termGrowth, setTermGrowth] = useState(2.5);

  const [results, setResults] = useState(null);
  const [aiWriteup, setAiWriteup] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // Reset editable fields to the freshly-fetched values (mirrors Streamlit's
  // per-ticker widget keys resetting on a new lookup).
  useEffect(() => {
    if (data) {
      setCompanyName(data.companyName);
      setRevenue(data.revenue);
      setEbitdaMargin(data.ebitdaMargin);
      setNetIncome(data.netIncome);
      setShares(data.shares);
      setDebt(data.debt);
      setCash(data.cash);
      setPrice(data.price);
      setGrowth(data.growthEstimate);
      setIndustry(data.industry);
    }
  }, [data]);

  async function handleFetch() {
    setFetchError(null);
    setFetchSuccess(null);
    if (!fmpKey) {
      setFetchError("Add your FMP API key in the sidebar first. It's free at financialmodelingprep.com.");
      return;
    }
    if (!tickerInput.trim()) {
      setFetchError('Enter a ticker symbol.');
      return;
    }
    setFetching(true);
    try {
      const result = await fetchCompanyData(tickerInput.trim(), fmpKey);
      setData(result);
      setResults(null);
      setAiWriteup(null);
      setFetchSuccess(`Loaded ${result.companyName}`);
    } catch (e) {
      setFetchError(`Couldn't fetch data: ${e.message}`);
      setData(null);
    } finally {
      setFetching(false);
    }
  }

  async function handleRunValuation() {
    if (!shares || !revenue || !price) {
      setResults({ error: 'Revenue, shares outstanding, and current price are required.' });
      return;
    }
    const sector = data?.sector || '';
    const dcfResult = runDcf(revenue, growth, ebitdaMargin, debt, cash, shares, wacc, termGrowth);
    const compsResult = runComps(revenue, ebitdaMargin, netIncome, debt, cash, shares, industry, sector);

    const rows = SENS_WACCS.map((w) => {
      const row = { WACC: `${w}%` };
      SENS_TERMS.forEach((t) => {
        const r = runDcf(revenue, growth, ebitdaMargin, debt, cash, shares, w, t);
        row[`${t}%`] = `$${r.impliedPrice.toFixed(2)}`;
      });
      return row;
    });

    setResults({ dcfResult, compsResult, rows, price, revenue, ebitdaMargin, growth, wacc, termGrowth });
    setAiWriteup(null);
    setAiError(null);

    if (anthropicKey) {
      setAiLoading(true);
      try {
        const writeup = await getAiWriteup(
          {
            companyName, ticker: data?.ticker || '', industry, revenue, ebitdaMargin,
            netIncome, shares, debt, cash, price, growth,
          },
          dcfResult, compsResult, wacc, anthropicKey,
        );
        setAiWriteup(writeup);
      } catch (e) {
        setAiError(`Couldn't generate the AI writeup: ${e.message}`);
      } finally {
        setAiLoading(false);
      }
    }
  }

  const typicalMargin = pickTypicalMargin(data?.industry || '', data?.sector || '');
  const ebitdaMarginVal = data?.ebitdaMargin ?? 0;
  const marginPctOfTypical = typicalMargin ? Math.min(Math.round((ebitdaMarginVal / typicalMargin) * 50), 100) : 0;
  const marginColor = ebitdaMarginVal >= typicalMargin * 0.85 ? '#3d6b66' : '#a3733d';
  const marginCaptionColor = ebitdaMarginVal >= typicalMargin * 0.85 ? '#6b9b94' : '#c79b5f';
  const marginCaption = ebitdaMarginVal >= typicalMargin * 0.85
    ? `In line with typical sector margin (~${typicalMargin}%)`
    : `Below typical sector margin (~${typicalMargin}%)`;

  const netIncomeVal = data?.netIncome ?? 0;
  const niColor = netIncomeVal >= 0 ? '#3d6b66' : '#a34d3d';
  const niCaptionColor = netIncomeVal >= 0 ? '#6b9b94' : '#c77b6f';
  const niCaption = netIncomeVal >= 0 ? 'Profitable' : 'Negative — worth discussing in an interview';
  const niBarPct = netIncomeVal >= 0 ? 60 : 15;

  let verdict = null;
  let blendedFair = 0;
  let diffPct = 0;
  if (results && !results.error) {
    blendedFair = (results.dcfResult.impliedPrice + results.compsResult.impliedPrice) / 2;
    diffPct = ((blendedFair - results.price) / results.price) * 100;
    verdict = 'Fairly valued';
    if (diffPct > 10) verdict = 'Undervalued';
    else if (diffPct < -10) verdict = 'Overvalued';
  }

  return (
    <div className="valufin-layout">
      <div className="valufin-sidebar-fixed">
        <h2>API keys</h2>
        <PasswordField
          label="FMP API key"
          value={fmpKey}
          onChange={setFmpKey}
          help="Free at financialmodelingprep.com — pulls real company financials."
        />
        <PasswordField
          label="Anthropic API key (optional)"
          value={anthropicKey}
          onChange={setAnthropicKey}
          help="Only needed for the AI-written analyst summary. Leave blank to skip it."
        />
        <hr className="valufin-hr" />
        <p className="valufin-caption">
          Your keys are only used to call FMP and Anthropic directly from your own machine.
          Nothing is stored or sent anywhere else.
        </p>
      </div>

      <div className="valufin-main">
        <div className="valufin-container">
          <Topbar />
          <SubHero
            title="AI valuation tool."
            subtitle="Type a ticker, pull real financials, and learn how analysts value a company — step by step, with no finance background assumed."
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <Button variant="secondary" onClick={() => navigate('/basics')}>📖  Valuation basics</Button>
            <Button variant="secondary" onClick={() => navigate('/')}>←  Back to home</Button>
          </div>

          <StepPill number={1} label="Look up a company" />
          <p className="valufin-caption">Type any public company's stock ticker and we'll pull its real financials automatically.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 12, alignItems: 'start' }}>
            <input
              className="valufin-input"
              type="text"
              placeholder="e.g. AAPL, GOOGL, INTC"
              value={tickerInput}
              onChange={(e) => setTickerInput(e.target.value)}
            />
            <Button onClick={handleFetch}>{fetching ? 'Fetching...' : 'Fetch data'}</Button>
          </div>
          {fetchError && <p style={{ color: '#c77b6f', fontSize: 13, marginTop: 8 }}>{fetchError}</p>}
          {fetchSuccess && <p style={{ color: '#6b9b94', fontSize: 13, marginTop: 8 }}>{fetchSuccess}</p>}

          {data?.priceHistory?.length > 0 && (
            <>
              <p className="valufin-caption" style={{ marginTop: 16 }}>{data.ticker} — recent price history</p>
              <PriceHistoryChart history={data.priceHistory} />
            </>
          )}

          <StepPill number={2} label="Review the numbers" />
          <p className="valufin-caption">Click any field below to see what it means. Adjust anything you want to test a different scenario.</p>

          <TextField label="Company name" value={companyName} onChange={setCompanyName} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 }}>
            <div>
              <IconFieldCard icon="currency-dollar" label="Revenue, latest FY ($M)" value={`$${(data?.revenue ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
              <Expander title="Why this matters for the valuation">
                <p className="valufin-caption">
                  Revenue is the starting point for the whole DCF (Discounted Cash Flow)
                  calculation. The model takes this number and grows it a little bigger each year
                  for 5 years, using your growth assumption — then uses that to estimate how much
                  cash the company will make. Revenue is also used in one of the comps (comparable
                  companies) calculations, especially useful when a company doesn't have positive
                  earnings yet.
                </p>
              </Expander>

              <IconFieldCard
                icon="percentage"
                label="EBITDA margin (%)"
                value={`${ebitdaMarginVal.toFixed(1)}%`}
                barPct={marginPctOfTypical}
                barColor={marginColor}
                barCaption={marginCaption}
                barCaptionColor={marginCaptionColor}
              />
              <Expander title="Why this matters for the valuation">
                <p className="valufin-caption">
                  EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) margin
                  tells the model how much of each revenue dollar turns into profit. A higher
                  margin means the company is better at turning sales into cash, which makes both
                  the DCF value and the comps value go up. This single number has a big effect on
                  the final price estimate.
                </p>
              </Expander>

              <IconFieldCard
                icon={netIncomeVal >= 0 ? 'trending-up' : 'trending-down'}
                label="Net income ($M)"
                value={`$${netIncomeVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                barPct={niBarPct}
                barColor={niColor}
                barCaption={niCaption}
                barCaptionColor={niCaptionColor}
              />
              <Expander title="Why this matters for the valuation">
                <p className="valufin-caption">
                  Net income is the company's actual profit after every expense is paid. This tool
                  only uses net income for the comps (comparable companies) calculation —
                  multiplying it by a typical P/E (Price-to-Earnings) ratio. It is not used in the
                  DCF at all. That's why a company can have negative net income (a loss) but still
                  get a positive DCF value, if its cash flow is healthy.
                </p>
              </Expander>
            </div>
            <div>
              <IconFieldCard icon="chart-pie" label="Diluted shares outstanding (M)" value={(data?.shares ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })} />
              <Expander title="Why this matters for the valuation">
                <p className="valufin-caption">
                  Both the DCF and comps methods first calculate one big total dollar value for
                  the whole company. To turn that into a price for one share, the model divides
                  that total by this number. More shares means the same total value gets split
                  into more, smaller pieces — so the price per share comes out lower.
                </p>
              </Expander>

              <IconFieldCard icon="credit-card" label="Total debt ($M)" value={`$${(data?.debt ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
              <Expander title="Why this matters for the valuation">
                <p className="valufin-caption">
                  Both methods start by estimating the value of the entire company. Debt (money
                  the company has borrowed) gets subtracted from that, because lenders have first
                  claim on the company's value before shareholders do. A company with a lot of
                  debt needs to be worth a lot more overall just to leave the same amount for
                  shareholders.
                </p>
              </Expander>

              <IconFieldCard icon="wallet" label="Cash & equivalents ($M)" value={`$${(data?.cash ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
              <Expander title="Why this matters for the valuation">
                <p className="valufin-caption">
                  Cash on hand gets added back in, right after debt is subtracted, because that
                  cash effectively belongs to shareholders already. A company sitting on a lot of
                  cash gets a direct boost to its estimated share price under both the DCF and
                  comps methods.
                </p>
              </Expander>
            </div>
          </div>

          <Expander title="Edit the raw numbers manually">
            <NumberField label="Revenue ($M)" value={revenue} onChange={setRevenue} step={100} />
            <NumberField label="EBITDA margin (%)" value={ebitdaMargin} onChange={setEbitdaMargin} step={0.5} />
            <NumberField label="Net income ($M)" value={netIncome} onChange={setNetIncome} step={100} />
            <NumberField label="Diluted shares outstanding (M)" value={shares} onChange={setShares} step={10} />
            <NumberField label="Total debt ($M)" value={debt} onChange={setDebt} step={100} />
            <NumberField label="Cash & equivalents ($M)" value={cash} onChange={setCash} step={100} />
            <NumberField label="Current share price ($)" value={price} onChange={setPrice} step={0.5} />
            <p className="valufin-caption">
              Revenue is the top line of the income statement. EBITDA margin shows how much
              operating profit comes from each dollar of sales. Net income is the true bottom-line
              profit. Shares outstanding converts total company value into a per-share price. Debt
              is subtracted and cash is added when bridging enterprise value to equity value.
            </p>
          </Expander>

          <Slider
            label="Expected revenue growth, yr 1-5 (%)"
            value={growth}
            onChange={setGrowth}
            min={-10.0}
            max={40.0}
            step={0.5}
            help="How fast you expect sales to grow each year on average, over the next 5 years. Pre-filled using Wall Street analyst estimates where available."
            format={(v) => `${v.toFixed(1)}%`}
          />
          <TextField label="Industry / sector" value={industry} onChange={setIndustry} help="Used to pick realistic comparable-company multiples." />

          <StepPill number={3} label="Assumptions" />
          <p className="valufin-caption">These two drive the DCF and are usually what an interviewer will ask you to defend.</p>

          <Expander title="How do you know what WACC and terminal growth rate to use?">
            <p>
              Even professionals don't have one single "correct" answer for these — here's how
              each one actually gets chosen.
            </p>
            <p><strong>How to pick WACC (discount rate)</strong></p>
            <p>
              WACC stands for Weighted Average Cost of Capital — it blends the cost of a
              company's debt and equity. The formula looks intimidating, but the intuition is
              simple:
            </p>
            <p style={{ fontStyle: 'italic' }}>
              WACC = how much return investors demand for the risk of investing in this company
            </p>
            <p>The formula:</p>
            <p style={{ fontFamily: 'monospace', fontSize: 13 }}>
              WACC = (E/V × Cost of Equity) + (D/V × Cost of Debt × (1 - Tax Rate))
            </p>
            <p>
              Where: E = the market value of the company's equity (its stock), D = the market
              value of its debt (what it has borrowed), V = E + D added together. Cost of equity
              = how much return shareholders expect, usually estimated with a formula called CAPM
              (Capital Asset Pricing Model): the risk-free rate (what you'd earn from a safe
              government bond) plus Beta (a measure of how much a stock swings compared to the
              overall market) multiplied by the extra return investors expect for taking on stock
              market risk. Cost of debt = the interest rate the company pays on its loans.
            </p>
            <p>In practice, here's the intuition without doing the full formula:</p>
            <div className="valufin-table-wrap" style={{ marginBottom: 12 }}>
              <table className="valufin-table">
                <thead>
                  <tr><th>Company type</th><th>Typical WACC range</th><th>Why</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Stable, large-cap (Apple, Coca-Cola)</td>
                    <td>7-9%</td>
                    <td>Low risk, predictable cash flow, strong balance sheet</td>
                  </tr>
                  <tr>
                    <td>Mid-cap, moderate risk</td>
                    <td>9-12%</td>
                    <td>More uncertainty in cash flows</td>
                  </tr>
                  <tr>
                    <td>Early-stage, high-growth, or high-debt (SpaceX, biotech)</td>
                    <td>12-15%+</td>
                    <td>High risk, unproven cash flow, more debt/equity risk</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p><strong>How to pick terminal growth rate</strong></p>
            <p>
              This represents how fast you think the company grows forever, after your
              projection period ends (year 5, 6, etc).
            </p>
            <p>
              <strong>The golden rule:</strong> terminal growth should never exceed the long-term
              growth rate of the overall economy (GDP growth), because no company can outgrow the
              entire economy forever.
            </p>
            <div className="valufin-table-wrap">
              <table className="valufin-table">
                <thead>
                  <tr><th>Benchmark</th><th>Typical range</th></tr>
                </thead>
                <tbody>
                  <tr><td>US long-term GDP growth</td><td>~2-2.5%</td></tr>
                  <tr><td>Most terminal growth assumptions</td><td>2-3%</td></tr>
                  <tr><td>Red flag if terminal growth is</td><td>4%+ (basically saying this company outgrows the world forever)</td></tr>
                </tbody>
              </table>
            </div>
          </Expander>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Slider
              label="WACC (%)"
              value={wacc}
              onChange={setWacc}
              min={5.0}
              max={15.0}
              step={0.5}
              help="The discount rate. Riskier or more leveraged companies typically use a higher WACC (8-10% is fairly typical for a large, stable company; 12%+ for something riskier)."
              format={(v) => `${v.toFixed(1)}%`}
            />
            <Slider
              label="Terminal growth rate (%)"
              value={termGrowth}
              onChange={setTermGrowth}
              min={1.0}
              max={4.0}
              step={0.25}
              help="The growth rate assumed forever after year 5 — usually close to long-run GDP growth, around 2-3%."
              format={(v) => `${v.toFixed(2)}%`}
            />
          </div>

          <Button onClick={handleRunValuation}>Run valuation</Button>

          {results?.error && <p style={{ color: '#c77b6f', marginTop: 12 }}>{results.error}</p>}

          {results && !results.error && (
            <>
              <p className="valufin-section-label">Results</p>
              <p className="valufin-caption">
                Two independent methods estimate fair value. When they agree, that's a stronger
                signal. When they disagree, that's worth understanding why.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <Metric label="Current price" value={`$${results.price.toFixed(2)}`} />
                <Metric label="DCF implied" value={`$${results.dcfResult.impliedPrice.toFixed(2)}`} />
                <Metric label="Comps implied" value={`$${results.compsResult.impliedPrice.toFixed(2)}`} />
              </div>

              <div className="valufin-verdict-card">
                <p className="valufin-verdict-label">Verdict</p>
                <p className="valufin-verdict-value">{verdict}</p>
                <p className="valufin-verdict-sub">
                  Blended estimate is {Math.abs(diffPct).toFixed(1)}%{' '}
                  {diffPct > 0 ? 'above' : 'below'} the current price. This is a model estimate,
                  not a guarantee.
                </p>
              </div>

              <p><strong>Football field — valuation range</strong></p>
              <Expander title="What is this chart?">
                <p>
                  A "football field" chart is the standard way analysts present a valuation range
                  — the bars look like yard lines on a football field. Each bar shows a range of
                  estimated fair value from one method. The dashed line is where the stock
                  actually trades today.
                </p>
              </Expander>
              <FootballFieldChart
                comps={{ low: results.compsResult.impliedPrice * 0.9, high: results.compsResult.impliedPrice * 1.1 }}
                dcf={{ low: results.dcfResult.impliedPrice * 0.85, high: results.dcfResult.impliedPrice * 1.15 }}
                price={results.price}
              />

              <p><strong>DCF sensitivity (implied price, $)</strong></p>
              <p className="valufin-caption">WACC (rows) vs terminal growth rate (columns)</p>
              <Expander title="Why does this table matter?">
                <p>
                  WACC and terminal growth move the DCF answer the most — small changes to either
                  can swing the implied price a lot, since terminal value usually makes up most of
                  a DCF's total. This grid shows the implied price across a realistic range of
                  both, instead of relying on one single guess.
                </p>
              </Expander>
              <SensitivityTable rows={results.rows} terms={SENS_TERMS} />

              <p style={{ marginTop: 16 }}><strong>Key assumptions used</strong></p>
              <p className="valufin-caption">WACC: {results.wacc}% · Terminal growth: {results.termGrowth}%</p>
              <p className="valufin-caption">
                FCF margin assumption: EBITDA margin minus ~6 percentage points, as a rough
                stand-in for capex and working capital needs that EBITDA doesn't capture.
              </p>
              <p className="valufin-caption">
                Comps: {results.compsResult.evEbitdaMult}x EV/EBITDA, {results.compsResult.peMult}x P/E
                (typical multiples for {results.compsResult.label} companies — ballpark figures,
                not a live peer set).
              </p>

              <Expander title="How exactly was the comps price calculated?">
                <p>
                  <strong>EV/EBITDA approach:</strong> EBITDA × {results.compsResult.evEbitdaMult}x typical
                  multiple for {results.compsResult.label} companies → enterprise value → subtract
                  debt, add cash → equity value → divide by shares. Implies{' '}
                  <strong>${results.compsResult.priceFromEvEbitda.toFixed(2)}</strong> per share.
                </p>
                <p>
                  <strong>P/E approach:</strong> Net income × {results.compsResult.peMult}x typical
                  multiple → divide by shares. Implies{' '}
                  <strong>${results.compsResult.priceFromPe.toFixed(2)}</strong> per share.
                </p>
                <p>
                  Averaged together: <strong>${results.compsResult.impliedPrice.toFixed(2)}</strong>. A
                  real analyst would use an actual selected peer group's current multiples rather
                  than a sector-average assumption.
                </p>
              </Expander>

              <p style={{ marginTop: 16 }}><strong>AI analyst writeup</strong></p>
              <p className="valufin-caption">A plain-English narrative explaining the verdict, written by Claude.</p>
              {anthropicKey ? (
                <>
                  {aiLoading && <p className="valufin-caption">Writing analyst summary...</p>}
                  {aiError && <p style={{ color: '#c9a875' }}>{aiError}</p>}
                  {aiWriteup && aiWriteup.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </>
              ) : (
                <p className="valufin-caption">Add an Anthropic API key in the sidebar to get an AI-written analyst summary.</p>
              )}

              <div className="valufin-links-box">
                <p className="valufin-links-title">Helpful links</p>
                <a href="https://www.investopedia.com/terms/d/dcf.asp" target="_blank" rel="noreferrer">↗ Investopedia — DCF deep dive</a>
                <a href="https://corporatefinanceinstitute.com/resources/valuation/comparable-company-analysis/" target="_blank" rel="noreferrer">↗ CFI — Comparable company analysis</a>
                <a href="https://www.wsj.com/market-data" target="_blank" rel="noreferrer">↗ WSJ Markets — live market data</a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
