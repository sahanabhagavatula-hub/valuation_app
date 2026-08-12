import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A', '#D9694F'];

const LESSONS = [
  {
    title: 'What "asset management" actually means',
    minutes: 8,
    kind: 'interactive + game',
    body1: 'Asset management is front-office work at firms like Fidelity, Wellington, or T. Rowe Price — analyzing companies and sectors, then building portfolios for institutional or very-high-net-worth clients.',
    body2: "It's easy to confuse with wealth management, hedge funds, and other buy-side roles. Click each to see how the client base and mandate actually differ.",
    body3: 'There are also very few entry-level seats — often only in the low hundreds industry-wide each year — and the process is unstructured, so interviewers lean hard on whether you can clearly explain what makes AM distinct from its neighbors.',
    takeaway: "Asset management ≠ wealth management: AM builds portfolios and does the investing; WM manages the relationship and financial plan for individual clients, often outsourcing the actual investing to AM.",
  },
  {
    title: 'Building the right asset allocation',
    minutes: 7,
    kind: 'interactive',
    body1: "The first question in any portfolio construction interview is never 'what stocks do you like' — it's 'what does this specific client actually need.'",
    body2: 'Pick a client type below, then set the equity/bond mix. The right split depends entirely on liquidity needs, time horizon, and risk tolerance — not on market views.',
    body3: "Start with the constraints, not the assets: how much the client has, how liquid they need to be, any restrictions on what they can hold, and how much income they need to draw every year. Only then do you pick the mix that bridges what they have today to what they'll need tomorrow.",
    takeaway: 'Same market, same asset classes — but a pension fund and a university endowment can land on completely different allocations because their liabilities and time horizons differ.',
  },
  {
    title: "The client whose portfolio just fell 20%",
    minutes: 6,
    kind: 'role-play',
    body1: "Technical skill alone doesn't win AM interviews — you also need to demonstrate you can manage an anxious client without being dismissive or over-promising.",
    body2: "Pick how you'd respond to the message below, then see how a strong answer actually reframes the situation.",
    takeaway: "The best response listens first, then reframes with context (long-term returns, market corrections) — never dismisses the client's concern or promises outcomes you can't control.",
  },
  {
    title: 'Multiples vs. DCF: picking the right tool',
    minutes: 6,
    kind: 'matching',
    body1: 'AM interviews test the same valuation toolkit as IB, just with less depth — you need to know when a quick multiple is enough and when a full DCF actually matters.',
    body2: 'For each situation below, pick the better-fitting tool.',
    takeaway: "Multiples are fast supporting evidence; DCF is the fuller analysis you lean on when multiples alone can't be trusted — like a speculative, pre-revenue, or newly public company.",
  },
  {
    title: 'Reading the market like a portfolio manager',
    minutes: 6,
    kind: 'interactive',
    body1: 'Every AM interview tests whether you actually follow markets day to day — not to quiz you on exact numbers, but to see if you have an informed, data-backed view.',
    body2: 'Click each market indicator below to see what a strong candidate would actually say about it.',
    takeaway: '"Better" market-view answers cite real data — valuation levels, historical averages, policy catalysts. "Vibes without numbers" is the single most common way candidates fail this section.',
  },
  {
    title: 'Build your 60-second stock pitch',
    minutes: 7,
    kind: 'activity',
    body1: "You don't need a complex model for an AM stock pitch — you need a tight, structured 30-60 second case you can deliver cleanly under pressure.",
    body2: 'Tap through the four building blocks below to see what each one needs to cover, then note how a real pitch strings them together.',
    takeaway: 'A great AM pitch is short and structured: thesis, why it\'s mispriced, the catalyst, and the risk — in that order, in under a minute.',
  },
];

const FIELD_TYPES = [
  { id: 'am', label: 'ASSET MGMT', color: '#4FC3C7', svg: 'M4 21a8 8 0 0 1 16 0M12 3.5v8.5h8.5', detail: 'Clients are institutions or VHNW/UHNW individuals. Your job: research companies/sectors and construct portfolios directly. This is the role this topic is about.' },
  { id: 'wm', label: 'WEALTH MGMT', color: '#C4B79A', svg: 'M12 21c-4-2.5-7-6-7-10a7 7 0 0 1 14 0c0 4-3 7.5-7 10z', detail: 'Clients are typically individuals with smaller amounts to invest. The focus is the relationship, financial planning, and goals-based advice — the actual investing is often outsourced to AM funds.' },
  { id: 'hf', label: 'HEDGE FUNDS', color: '#D9694F', svg: 'M3 17l6-6 4 4 8-8M15 6h6v6', detail: 'Clients are accredited/institutional investors seeking absolute returns via less-constrained strategies (shorting, leverage, derivatives) — AM is typically long-only and benchmarked, HF is not.' },
  { id: 'pe', label: 'PRIVATE EQUITY', color: '#86AE9E', svg: 'M12 3l9 4.5-9 4.5-9-4.5zM3 12l9 4.5 9-4.5', detail: 'Buys entire companies (control stakes) using leverage, holds for years, and actively operates/improves them — AM buys public securities and doesn\'t take operational control.' },
];

const CLUES_DATA = [
  { text: 'We take a controlling stake, load the company with debt, and actively run it for 5+ years before selling.', correct: 'pe' },
  { text: 'We help a retired couple plan their retirement income and manage their overall financial life.', correct: 'wm' },
  { text: 'We run a long/short equity strategy targeting absolute returns for accredited investors.', correct: 'hf' },
  { text: "We manage a $2B pension fund's public equity and bond portfolio, benchmarked against an index.", correct: 'am' },
];

const CLIENT_PROFILES = [
  { id: 'pension', label: 'PENSION FUND', brief: 'Needs to pay $50M/year in guaranteed employee benefits. Lower risk tolerance — the liability is fixed and near-term.', idealEquity: 40 },
  { id: 'endowment', label: 'UNIVERSITY ENDOWMENT', brief: 'No fixed annual payout obligation — just needs to grow assets over decades. Longer horizon, higher risk tolerance.', idealEquity: 70 },
];

const RESPONSE_OPTIONS = [
  { label: '"This is only a paper loss — you\'re still up since you started with us, and markets do recover."', good: true, feedback: 'Strong — this listens to the real concern (fear of loss) and reframes with actual context instead of dismissing the feeling.' },
  { label: '"Actually our benchmark fell 40%, so we outperformed significantly — you should be pleased."', good: false, feedback: "Risky — technically true, but an upset client rarely wants to hear 'you should feel better' framed as a competition against an index." },
  { label: '"Markets are efficient long-term, there\'s nothing to worry about."', good: false, feedback: "Too dismissive — skips listening entirely and doesn't address the client's actual emotional state before jumping to reassurance." },
];

const VALUATION_SITUATIONS = [
  { scenario: 'A mature, profitable industrial company with a long earnings history.', choices: [{ label: 'DCF', correct: false }, { label: 'Multiples (quick check)', correct: true }] },
  { scenario: 'A pre-revenue biotech with no comparable earnings history.', choices: [{ label: 'Multiples', correct: false }, { label: 'DCF (or skip both)', correct: true }] },
  { scenario: 'Sanity-checking whether an entire tech sector looks overvalued.', choices: [{ label: 'Quick representative DCFs', correct: true }, { label: 'Single-company deep dive', correct: false }] },
  { scenario: "A client wants a fast answer on whether a stock is 'cheap' right now.", choices: [{ label: 'EV/EBITDA or P/E multiple', correct: true }, { label: 'Full 5-year DCF build', correct: false }] },
];

const MARKET_TICKERS = [
  { symbol: 'S&P 500', value: '↑ steady', sparkline: '0,12 8,10 16,11 24,6 32,7 40,3 46,4', sparkColor: '#3FBF6F', note: 'You should know roughly where the S&P 500 sits and its YTD move — interviewers use this as a baseline check on whether you follow markets at all.' },
  { symbol: '10Y TREASURY', value: '~4.2%', sparkline: '0,6 8,8 16,7 24,10 32,9 40,12 46,11', sparkColor: '#C4B79A', note: "The 10-year yield anchors mortgage rates, equity valuations, and the 'risk-free rate' in every DCF — one of the most-asked numbers in AM interviews." },
  { symbol: 'OIL (WTI)', value: '~$70', sparkline: '0,8 8,5 16,9 24,7 32,13 40,10 46,14', sparkColor: '#D9694F', note: 'Commodity levels matter more for macro/FICC-flavored interviews, but every candidate should have a rough number in mind.' },
  { symbol: 'GOLD', value: '~$2,600', sparkline: '0,14 8,11 16,9 24,8 32,5 40,6 46,3', sparkColor: '#4FC3C7', note: "Gold's a defensive/inflation-hedge holding — expect a question comparing it to silver or asking why it moves the way it does." },
];

const PITCH_SLOTS = [
  { step: 'STEP 1', label: 'The thesis', detail: 'One sentence: what is this, and why do you like it? E.g. "a royalty company that gets paid a % of miners\' revenue without the CapEx risk."' },
  { step: 'STEP 2', label: "Why it's mispriced", detail: 'The gap between price and value — e.g. trading at a discount to historical average multiple, or the market missing a structural tailwind.' },
  { step: 'STEP 3', label: 'The catalyst', detail: 'What actually closes that gap — an earnings beat, a rate cut, sector rotation, new capacity coming online.' },
  { step: 'STEP 4', label: 'The key risk', detail: "One real risk and why it's manageable — shows judgment, not just optimism. Never skip this one." },
];

function ArrowIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4FC3C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="8,7 17,7 17,16" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0E14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

function FieldIcon({ d, color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function Lesson1Define({ activeFieldId, setActiveFieldId, clueIndex, clueFeedback, setClueFeedback, clueScore, setClueScore, clueAttempted, setClueAttempted, onNextClue }) {
  const activeField = FIELD_TYPES.find((f) => f.id === activeFieldId);
  const clue = CLUES_DATA[clueIndex];

  function answerClue(fieldId) {
    const correct = fieldId === clue.correct;
    setClueAttempted(clueAttempted + 1);
    setClueScore(clueScore + (correct ? 1 : 0));
    setClueFeedback(correct ? '✓ Correct!' : `✗ Not quite — that's ${FIELD_TYPES.find((f) => f.id === clue.correct).label}.`);
  }

  return (
    <>
      <div className="valufin-gol-eyebrow">CLICK EACH TO SEE HOW IT DIFFERS →</div>
      <div className="valufin-gol-field-row">
        {FIELD_TYPES.map((f) => {
          const active = f.id === activeFieldId;
          return (
            <button
              key={f.id}
              className={`valufin-gol-field-card${active ? ' active' : ''}`}
              style={active ? { background: `linear-gradient(160deg, ${f.color}22, #12161C)`, borderColor: f.color, boxShadow: `0 10px 26px ${f.color}33` } : undefined}
              onClick={() => setActiveFieldId(f.id)}
            >
              <span className="valufin-gol-field-icon" style={{ background: active ? f.color : 'rgba(255,255,255,0.06)', boxShadow: active ? `0 0 18px ${f.color}66` : 'none' }}>
                <FieldIcon d={f.svg} color={active ? '#0A0E14' : f.color} />
              </span>
              <div className="valufin-gol-field-label" style={{ color: f.color }}>{f.label}</div>
            </button>
          );
        })}
      </div>
      <div className="valufin-gol-field-detail">
        <div className="valufin-gol-field-detail-head">
          <span className="valufin-gol-field-dot" style={{ background: activeField.color, boxShadow: `0 0 8px ${activeField.color}` }} />
          <span style={{ color: activeField.color }}>{activeField.label} — CLIENTS &amp; MANDATE</span>
        </div>
        <p className="valufin-gol-field-detail-body">{activeField.detail}</p>
      </div>

      <div className="valufin-gol-eyebrow">🎯 QUICK GAME — MATCH THE CLUE TO THE FIELD</div>
      <div className="valufin-gol-clue-panel">
        <div className="valufin-gol-clue-text">"{clue.text}"</div>
        <div className="valufin-gol-clue-choices">
          {FIELD_TYPES.map((f) => (
            <button key={f.id} className="valufin-gol-clue-choice" onClick={() => answerClue(f.id)}>{f.label}</button>
          ))}
        </div>
        {clueFeedback && (
          <div className="valufin-gol-clue-feedback" style={{ color: clueFeedback.startsWith('✓') ? '#3FBF6F' : '#D9694F' }}>{clueFeedback}</div>
        )}
        <div className="valufin-gol-clue-footer">
          <span className="valufin-gol-clue-score">Score: {clueScore}/{clueAttempted}</span>
          <button className="valufin-gol-clue-next" onClick={onNextClue}>Next clue →</button>
        </div>
      </div>
      <div className="valufin-gol-takeaway-terminal">
        <div className="valufin-gol-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-gol-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2Allocation({ activeClientId, setActiveClientId, equityPct, setEquityPct }) {
  const activeClient = CLIENT_PROFILES.find((c) => c.id === activeClientId);
  const bondPct = 100 - equityPct;
  const equityBarHeight = Math.round((120 * equityPct) / 100) + 6;
  const bondBarHeight = Math.round((120 * bondPct) / 100) + 6;
  const diff = Math.abs(equityPct - activeClient.idealEquity);
  const fitColor = diff <= 10 ? '#3FBF6F' : diff <= 25 ? '#C4B79A' : '#D9694F';
  const fitVerdict = diff <= 10
    ? `✓ Well-matched to a ${activeClient.label.toLowerCase()}'s risk profile.`
    : diff <= 25
      ? `Reasonable, but drifting from what a ${activeClient.label.toLowerCase()} typically needs.`
      : `Off — this doesn't fit a ${activeClient.label.toLowerCase()}'s liquidity and risk profile.`;

  return (
    <>
      <div className="valufin-gol-eyebrow">PICK A CLIENT, THEN SET THE MIX →</div>
      <div className="valufin-gol-client-tabs">
        {CLIENT_PROFILES.map((c) => (
          <button
            key={c.id}
            className={`valufin-gol-client-tab${c.id === activeClientId ? ' active' : ''}`}
            onClick={() => setActiveClientId(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="valufin-gol-allocation-panel">
        <p className="valufin-lesson-footnote" style={{ marginBottom: 18 }}>{activeClient.brief}</p>
        <input
          className="valufin-gol-range"
          type="range" min={0} max={100} value={equityPct}
          onChange={(e) => setEquityPct(Number(e.target.value))}
        />
        <div className="valufin-gol-bars">
          <div className="valufin-gol-bar-col">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4FC3C7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 8 }}>
              <line x1="6" y1="20" x2="6" y2="13" /><line x1="12" y1="20" x2="12" y2="6" /><line x1="18" y1="20" x2="18" y2="15" />
            </svg>
            <div className="valufin-gol-bar" style={{ height: equityBarHeight, background: 'linear-gradient(180deg, #4FC3C7, #2b8b8f)' }} />
            <div className="valufin-gol-bar-label" style={{ color: '#4FC3C7' }}>EQUITY {equityPct}%</div>
          </div>
          <div className="valufin-gol-bar-col">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C4B79A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 8 }}>
              <rect x="3" y="7" width="18" height="12" rx="1.5" /><line x1="3" y1="11" x2="21" y2="11" />
            </svg>
            <div className="valufin-gol-bar" style={{ height: bondBarHeight, background: 'linear-gradient(180deg, #C4B79A, #8f7f5c)' }} />
            <div className="valufin-gol-bar-label" style={{ color: '#C4B79A' }}>BONDS {bondPct}%</div>
          </div>
        </div>
        <div className="valufin-gol-fit-verdict" style={{ color: fitColor }}>{fitVerdict}</div>
      </div>
      <div className="valufin-gol-takeaway-teal">
        <span className="valufin-gol-takeaway-teal-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4FC3C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
        </span>
        <div className="valufin-gol-takeaway-teal-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3Client({ responseOpen, setResponseOpen }) {
  return (
    <>
      <div className="valufin-gol-eyebrow">PICK YOUR RESPONSE →</div>
      <div className="valufin-gol-client-message">
        <span className="valufin-gol-client-avatar">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
        </span>
        <div>
          <div className="valufin-gol-client-message-label">CLIENT MESSAGE</div>
          <p className="valufin-gol-client-message-body">"My portfolio is down 20% this quarter. I'm furious — what is your firm doing about this?"</p>
        </div>
      </div>
      {RESPONSE_OPTIONS.map((r, i) => {
        const open = responseOpen === i;
        return (
          <button
            key={r.label}
            className={`valufin-gol-response-row${open ? (r.good ? ' good' : ' bad') : ''}`}
            onClick={() => setResponseOpen(i)}
          >
            <span className="valufin-gol-response-badge" style={{ background: open ? (r.good ? '#3FBF6F' : '#D9694F') : 'rgba(255,255,255,0.08)', color: open ? '#0A0E14' : '#8F887A' }}>
              {open ? (r.good ? '✓' : '✗') : String.fromCharCode(65 + i)}
            </span>
            <div style={{ flex: 1 }}>
              <div className="valufin-gol-response-label">{r.label}</div>
              {open && <div className="valufin-gol-response-feedback" style={{ color: r.good ? '#3FBF6F' : '#D9694F' }}>{r.feedback}</div>}
            </div>
          </button>
        );
      })}
      <div className="valufin-gol-takeaway-quote">
        <span className="valufin-gol-takeaway-quote-mark">"</span>
        <div className="valufin-gol-takeaway-quote-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4Valuation({ valuationPicks, setValuationPicks }) {
  function pick(sIdx, cIdx) {
    setValuationPicks({ ...valuationPicks, [sIdx]: cIdx });
  }
  return (
    <>
      <div className="valufin-gol-eyebrow">WHICH TOOL FITS THE SITUATION? →</div>
      {VALUATION_SITUATIONS.map((s, sIdx) => (
        <div key={s.scenario} className="valufin-gol-val-card">
          <div className="valufin-gol-val-scenario">{s.scenario}</div>
          <div className="valufin-gol-val-choices">
            {s.choices.map((c, cIdx) => {
              const picked = valuationPicks[sIdx] === cIdx;
              return (
                <button
                  key={c.label}
                  className={`valufin-gol-val-choice${picked ? (c.correct ? ' correct' : ' wrong') : ''}`}
                  onClick={() => pick(sIdx, cIdx)}
                >
                  {picked && (c.correct ? '✓ ' : '✗ ')}{c.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="valufin-gol-takeaway-rule gold">
        <div className="valufin-gol-takeaway-rule-label" style={{ color: '#C4B79A' }}>KEY TAKEAWAY</div>
        <div className="valufin-gol-takeaway-rule-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5Market({ activeTickerId, setActiveTickerId, guessRevealed, setGuessRevealed }) {
  const activeTickerNote = activeTickerId ? MARKET_TICKERS.find((t) => t.symbol === activeTickerId).note : '';

  function select(symbol) {
    setGuessRevealed({ ...guessRevealed, [symbol]: true });
    setActiveTickerId(symbol);
  }

  return (
    <>
      <div className="valufin-gol-eyebrow">🎯 GUESS FIRST, THEN REVEAL →</div>
      <div className="valufin-gol-ticker-grid">
        {MARKET_TICKERS.map((t) => {
          const revealed = !!guessRevealed[t.symbol];
          const active = activeTickerId === t.symbol;
          return (
            <button
              key={t.symbol}
              className={`valufin-gol-ticker-card${active ? ' active' : ''}`}
              onClick={() => select(t.symbol)}
            >
              <div className="valufin-gol-ticker-head">
                <span className="valufin-gol-ticker-symbol">{t.symbol}</span>
                {revealed && (
                  <svg width="46" height="18" viewBox="0 0 46 18">
                    <polyline points={t.sparkline} fill="none" stroke={t.sparkColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {revealed ? (
                <div className="valufin-gol-ticker-value">{t.value}</div>
              ) : (
                <div className="valufin-gol-ticker-hint">tap to reveal ↴</div>
              )}
            </button>
          );
        })}
      </div>
      {activeTickerNote && <div className="valufin-gol-ticker-note">{activeTickerNote}</div>}
      <div className="valufin-gol-takeaway-rule red">
        <div className="valufin-gol-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-gol-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

function Lesson6Pitch({ pitchOpen, setPitchOpen }) {
  function toggle(i) {
    const next = [...pitchOpen];
    next[i] = !next[i];
    setPitchOpen(next);
  }
  const filledCount = pitchOpen.filter(Boolean).length;
  const dash = Math.round((filledCount / 4) * 94);

  return (
    <>
      <div className="valufin-gol-eyebrow">FILL IN YOUR 60-SECOND PITCH →</div>
      {PITCH_SLOTS.map((s, i) => {
        const open = pitchOpen[i];
        return (
          <button key={s.step} className={`valufin-gol-pitch-row${open ? ' open' : ''}`} onClick={() => toggle(i)}>
            <div className="valufin-gol-pitch-head">
              <span className="valufin-gol-pitch-step">{s.step}</span>
              <span className="valufin-gol-pitch-label">{s.label}</span>
            </div>
            {open && <div className="valufin-gol-pitch-detail">{s.detail}</div>}
          </button>
        );
      })}
      <div className="valufin-gol-pitch-progress">
        <div className="valufin-gol-pitch-ring">
          <svg width="36" height="36" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#22261F" strokeWidth="4" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="#4FC3C7" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${dash} 100`} transform="rotate(-90 18 18)" />
          </svg>
          <span className="valufin-gol-pitch-ring-count">{filledCount}</span>
        </div>
        <div className="valufin-gol-pitch-progress-label">{filledCount} / 4 BUILT</div>
      </div>
      <p className="valufin-gol-pitch-hint">Tap each step above — a real pitch nails all four in under a minute.</p>
      <div className="valufin-gol-takeaway-dashed">
        <span className="valufin-gol-takeaway-dashed-check">✓</span>
        <div className="valufin-gol-takeaway-dashed-body">{LESSONS[5].takeaway}</div>
      </div>
    </>
  );
}

export default function GeneralistOlympics() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);

  const [activeFieldId, setActiveFieldId] = useState('am');
  const [clueIndex, setClueIndex] = useState(0);
  const [clueFeedback, setClueFeedback] = useState('');
  const [clueScore, setClueScore] = useState(0);
  const [clueAttempted, setClueAttempted] = useState(0);

  const [activeClientId, setActiveClientId] = useState('pension');
  const [equityPct, setEquityPct] = useState(50);

  const [responseOpen, setResponseOpen] = useState(null);
  const [valuationPicks, setValuationPicks] = useState({});
  const [activeTickerId, setActiveTickerId] = useState(null);
  const [guessRevealed, setGuessRevealed] = useState({});
  const [pitchOpen, setPitchOpen] = useState([false, false, false, false]);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => {
    const idx = completed.findIndex((c) => !c);
    return idx === -1 ? completed.length - 1 : idx;
  })();

  function resetLessonScopedState() {
    setResponseOpen(null);
    setValuationPicks({});
    setActiveTickerId(null);
    setPitchOpen([false, false, false, false]);
  }

  function openLesson(i) {
    setActiveIndex(i);
    resetLessonScopedState();
    setView('lesson');
  }

  function backToTopics() {
    setView('list');
  }

  function nextClue() {
    setClueIndex((clueIndex + 1) % CLUES_DATA.length);
    setClueFeedback('');
  }

  function markCompleteAndAdvance() {
    const next = [...completed];
    next[activeIndex] = true;
    setCompleted(next);
    const nextIndex = activeIndex + 1;
    if (nextIndex < LESSONS.length) {
      setActiveIndex(nextIndex);
      resetLessonScopedState();
    } else {
      setView('list');
    }
  }

  const activeLesson = LESSONS[activeIndex];
  const isLast = activeIndex === LESSONS.length - 1;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'radial-gradient(rgba(237,235,228,0.06) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="valufin-lesson-topbar">
        <button className="valufin-lesson-topbar-back" onClick={() => (view === 'list' ? navigate('/wam') : backToTopics())}>
          ← {view === 'list' ? 'Wealth & Asset Management' : 'The Generalist Olympics'}
        </button>
        <span className="valufin-lesson-topbar-tag">WAM · WEALTH &amp; ASSET MANAGEMENT</span>
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know-clay">Must-know</span>
            <span className="valufin-ticker-caption">WAM · WEALTH &amp; ASSET MANAGEMENT</span>
          </div>
          <h1 className="valufin-archivo-h1">Wealth &amp; Asset<br />Management</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Interviews here are the "Generalist Olympics" — fit, portfolio construction,
            accounting/valuation, market knowledge, and stock pitches, all in one process.
            Six lessons covering the ground that actually shows up.
          </p>

          <div className="valufin-lesson-progress-row">
            <span>{LESSONS.length} lessons · {LESSONS.reduce((s, l) => s + l.minutes, 0)} min</span>
            <span>·</span>
            <span style={{ color: '#EDEBE4' }}>{completedCount} / {LESSONS.length} complete</span>
          </div>
          <div className="valufin-lesson-progress-track">
            <div className="valufin-lesson-progress-fill" style={{ width: `${progressPct}%`, background: '#4FC3C7' }} />
          </div>

          <p className="valufin-section-label">Lessons</p>
          <div className="valufin-lesson-list">
            {LESSONS.map((lesson, i) => {
              const isDone = completed[i];
              const cta = isDone ? 'REVIEW' : i === firstIncomplete ? 'CONTINUE' : 'START';
              const badgeBg = isDone ? '#3FBF6F' : 'rgba(255,255,255,0.06)';
              const badgeColor = isDone ? '#0A0E14' : BADGE_COLORS[i % BADGE_COLORS.length];
              return (
                <button key={lesson.title} className="valufin-lesson-row" onClick={() => openLesson(i)}>
                  <span className="valufin-lesson-badge" style={{ background: badgeBg }}>
                    {isDone ? <CheckIcon /> : <span className="valufin-lesson-badge-num" style={{ color: badgeColor }}>{String(i + 1).padStart(2, '0')}</span>}
                  </span>
                  <div style={{ textAlign: 'left' }}>
                    <div className="valufin-archivo-lesson-title">{lesson.title}</div>
                    <div className="valufin-lesson-row-meta">{lesson.minutes} MIN · {lesson.kind.toUpperCase()} · {cta}</div>
                  </div>
                  <ArrowIcon className="valufin-lesson-row-arrow" />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 120px' }}>
          <div className="valufin-lesson-detail-eyebrow">WEALTH &amp; ASSET MANAGEMENT · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: activeLesson.body3 ? 22 : 30 }}>{activeLesson.body2}</p>
          {activeLesson.body3 && <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body3}</p>}

          {activeIndex === 0 && (
            <Lesson1Define
              activeFieldId={activeFieldId} setActiveFieldId={setActiveFieldId}
              clueIndex={clueIndex} clueFeedback={clueFeedback} setClueFeedback={setClueFeedback}
              clueScore={clueScore} setClueScore={setClueScore}
              clueAttempted={clueAttempted} setClueAttempted={setClueAttempted}
              onNextClue={nextClue}
            />
          )}
          {activeIndex === 1 && (
            <Lesson2Allocation
              activeClientId={activeClientId} setActiveClientId={setActiveClientId}
              equityPct={equityPct} setEquityPct={setEquityPct}
            />
          )}
          {activeIndex === 2 && <Lesson3Client responseOpen={responseOpen} setResponseOpen={setResponseOpen} />}
          {activeIndex === 3 && <Lesson4Valuation valuationPicks={valuationPicks} setValuationPicks={setValuationPicks} />}
          {activeIndex === 4 && (
            <Lesson5Market
              activeTickerId={activeTickerId} setActiveTickerId={setActiveTickerId}
              guessRevealed={guessRevealed} setGuessRevealed={setGuessRevealed}
            />
          )}
          {activeIndex === 5 && <Lesson6Pitch pitchOpen={pitchOpen} setPitchOpen={setPitchOpen} />}

          <div className="valufin-lesson-footer">
            <button className="valufin-lesson-exit" onClick={backToTopics}>Exit to topic</button>
            <button className="valufin-lesson-next" onClick={markCompleteAndAdvance}>
              {isLast ? 'Mark complete →' : 'Complete & next lesson →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
