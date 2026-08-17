import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A', '#D9694F'];

const LESSONS = [
  {
    title: 'Why debt amplifies equity returns',
    minutes: 7,
    kind: 'interactive',
    body1: 'A leveraged buyout is exactly what it sounds like: a private equity firm buys a company using a mix of debt and its own equity, then sells it years later hoping the equity slice grew faster than it would have alone.',
    body2: 'Toggle between an all-equity purchase and a leveraged one below — same company, same growth, wildly different equity return.',
    takeaway: 'Debt does not make the company worth more. It makes the sponsor\'s slice of the company smaller going in — so the same dollar of value creation is a bigger percentage return on a smaller equity check.',
  },
  {
    title: 'Sources & uses of funds',
    minutes: 6,
    kind: 'interactive',
    body1: "Every LBO starts with a sources & uses table: the Uses side is simply the purchase price; the Sources side is how that price actually gets funded — debt plus the sponsor's own equity.",
    body2: 'Drag the leverage slider below and watch the debt/equity split fund the same purchase price.',
    takeaway: 'Sources always equal Uses by construction — the only real question in an LBO is how much of the purchase price debt is willing to fund, and how much the sponsor has to write a check for.',
  },
  {
    title: 'Build the full return',
    minutes: 8,
    kind: 'activity',
    body1: "Now put it all together: entry multiple, leverage, growth, and hold period all feed into the two numbers a PE fund actually cares about — MOIC and IRR.",
    body2: 'Adjust every assumption below and watch the sponsor return recompute live.',
    takeaway: "MOIC tells you how many times your money came back; IRR annualizes that for the time it took. A great deal is a high MOIC delivered fast — a mediocre MOIC over 10 years can be a mediocre IRR.",
  },
  {
    title: 'Debt paydown mechanics',
    minutes: 6,
    kind: 'interactive',
    body1: "Every dollar of free cash flow the company generates during the hold can be swept to pay down debt early — and every dollar of debt paid off is a dollar the sponsor doesn't have to give back to lenders at exit.",
    body2: 'Adjust the cash sweep percentage below and watch the ending debt balance after a 5-year hold.',
    takeaway: 'Debt paydown is a second, quieter return driver alongside EBITDA growth and multiple expansion — sponsors call it "deleveraging," and it works even if the business barely grows at all.',
  },
  {
    title: 'What makes a good LBO candidate',
    minutes: 6,
    kind: 'interactive',
    body1: 'Not every company can carry a debt load. Click each trait below to see why PE firms screen for it specifically.',
    body2: "These traits all point at the same underlying question: can this business reliably service debt payments no matter what the economy does?",
    takeaway: 'The ideal LBO target is boring on purpose — predictable cash flow, low reinvestment needs, and a durable market position matter more than exciting growth when debt payments are due every quarter regardless.',
  },
  {
    title: 'Interview Q&A',
    minutes: 6,
    kind: 'quiz',
    body1: 'Three questions that come up in almost every LBO discussion, technical or conceptual.',
    body2: 'Pick the strongest answer for each — these test whether you understand the mechanics, not just the vocabulary.',
    takeaway: 'If you can explain why debt amplifies returns, what makes a good candidate, and the EBITDA-to-FCF bridge fluently, you\'ve covered the questions that actually get asked in LBO conversations.',
  },
];

const CANDIDATE_TRAITS = [
  { id: 'cash', label: 'STABLE CASH FLOWS', color: '#4FC3C7', detail: 'Debt payments are due on a fixed schedule regardless of how business is going — predictable, recurring cash flow is what actually services that schedule.' },
  { id: 'capex', label: 'LOW CAPEX NEEDS', color: '#C4B79A', detail: "Cash reinvested into the business can't be used to pay down debt. Asset-light businesses free up more cash for the debt schedule and for sponsor distributions." },
  { id: 'market', label: 'STRONG MARKET POSITION', color: '#D9694F', detail: 'A durable competitive position protects the cash flow the whole capital structure depends on — a fragile position is a fragile debt-service plan.' },
  { id: 'cyclicality', label: 'LIMITED CYCLICALITY', color: '#86AE9E', detail: "A business that craters in a downturn is the worst possible candidate for a structure with fixed obligations — lenders price this risk in immediately." },
];

const QUIZ = [
  { q: 'Why do PE firms use debt to fund acquisitions instead of paying all-cash?', choices: ['Debt is required by law for buyouts', 'Debt amplifies the equity return on the same dollar of value creation', 'Debt makes the target company worth more'], correct: 1, explain: 'Correct — leverage reduces the equity check for the same purchase price, so the same exit proceeds represent a larger percentage return on a smaller investment.' },
  { q: 'What makes a company a good LBO candidate?', choices: ['High growth, high capex, cyclical demand', 'Stable, predictable cash flow with low reinvestment needs', 'No existing customers yet'], correct: 1, explain: 'Correct — the business needs to reliably service fixed debt payments through good times and bad, which favors boring, cash-generative businesses over volatile, capital-hungry ones.' },
  { q: 'Roughly how do you get from EBITDA to levered free cash flow available for debt paydown?', choices: ['EBITDA minus capex, minus taxes, minus interest expense, minus working capital changes', 'EBITDA times the exit multiple', 'EBITDA divided by total debt'], correct: 0, explain: 'Correct — EBITDA is a pre-financing, pre-capex proxy for cash generation; you have to back out real cash outflows (capex, cash taxes, interest, working capital swings) to see what\'s actually left to pay down debt.' },
];

function ArrowIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4FC3C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="8,7 17,7 17,16" />
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

function Lesson1({ leveraged, setLeveraged }) {
  const entryEV = 100;
  const exitEV = 120;
  const debt = 60;
  const equityIn = leveraged ? entryEV - debt : entryEV;
  const equityOut = leveraged ? exitEV - debt : exitEV;
  const returnPct = Math.round(((equityOut - equityIn) / equityIn) * 100);
  return (
    <>
      <div className="valufin-lbo-eyebrow">TOGGLE THE STRUCTURE →</div>
      <div className="valufin-lbo-tabs">
        <button className={`valufin-lbo-tab${!leveraged ? ' active' : ''}`} onClick={() => setLeveraged(false)}>ALL-EQUITY</button>
        <button className={`valufin-lbo-tab teal${leveraged ? ' active' : ''}`} onClick={() => setLeveraged(true)}>60% LEVERAGED</button>
      </div>
      <div className="valufin-lbo-panel">
        <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">ENTRY EV (SAME BOTH WAYS)</span><span className="valufin-lbo-row-value">${entryEV}M</span></div>
        <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">DEBT USED</span><span className="valufin-lbo-row-value">${leveraged ? debt : 0}M</span></div>
        <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">SPONSOR EQUITY IN</span><span className="valufin-lbo-row-value">${equityIn}M</span></div>
        <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">EXIT EV (+20% GROWTH)</span><span className="valufin-lbo-row-value">${exitEV}M</span></div>
        <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">SPONSOR EQUITY OUT</span><span className="valufin-lbo-row-value">${equityOut}M</span></div>
        <div className="valufin-lbo-result">
          <div className="valufin-lbo-result-label">EQUITY RETURN</div>
          <div className="valufin-lbo-result-value" style={{ color: leveraged ? '#3FBF6F' : '#8F887A' }}>{returnPct}%</div>
        </div>
      </div>
      <div className="valufin-lbo-takeaway-terminal">
        <div className="valufin-lbo-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-lbo-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ debtPct, setDebtPct }) {
  const purchasePrice = 500;
  const debt = Math.round((purchasePrice * debtPct) / 100);
  const equity = purchasePrice - debt;
  return (
    <>
      <div className="valufin-lbo-eyebrow">DRAG THE LEVERAGE →</div>
      <div className="valufin-lbo-panel">
        <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">PURCHASE PRICE (USES)</span><span className="valufin-lbo-row-value">${purchasePrice}M</span></div>
        <div className="valufin-lbo-row" style={{ marginTop: 14 }}><span className="valufin-lbo-row-label">% FUNDED WITH DEBT</span><span className="valufin-lbo-row-value" style={{ color: '#4FC3C7' }}>{debtPct}%</span></div>
        <input className="valufin-lbo-range" type="range" min={40} max={75} value={debtPct} onChange={(e) => setDebtPct(Number(e.target.value))} />
        <div className="valufin-lbo-sources">
          <div className="valufin-lbo-source-bar">
            <div className="valufin-lbo-source-seg debt" style={{ width: `${debtPct}%` }}>DEBT ${debt}M</div>
            <div className="valufin-lbo-source-seg equity" style={{ width: `${100 - debtPct}%` }}>EQUITY ${equity}M</div>
          </div>
        </div>
      </div>
      <div className="valufin-lbo-takeaway-clay">
        <span className="valufin-lbo-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="12" rx="1.5" /><line x1="3" y1="11" x2="21" y2="11" /></svg>
        </span>
        <div className="valufin-lbo-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ entryMultiple, setEntryMultiple, debtPct, setDebtPct, years, setYears, growth, setGrowth }) {
  const entryEbitda = 50;
  const entryEV = entryMultiple * entryEbitda;
  const debt = (entryEV * debtPct) / 100;
  const sponsorEquity = entryEV - debt;
  const exitEbitda = entryEbitda * Math.pow(1 + growth / 100, years);
  const exitEV = entryMultiple * exitEbitda;
  const annualPaydownRate = 0.08;
  const remainingDebt = Math.max(0, debt - debt * annualPaydownRate * years);
  const exitEquity = exitEV - remainingDebt;
  const moic = exitEquity / sponsorEquity;
  const irr = (Math.pow(moic, 1 / years) - 1) * 100;

  return (
    <>
      <div className="valufin-lbo-eyebrow">ADJUST EVERY ASSUMPTION →</div>
      <div className="valufin-lbo-panel">
        <div className="valufin-lbo-slider-grid">
          <div className="valufin-lbo-slider-col">
            <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">ENTRY/EXIT MULTIPLE</span><span className="valufin-lbo-row-value">{entryMultiple.toFixed(1)}x</span></div>
            <input className="valufin-lbo-range" type="range" min={6} max={10} step={0.5} value={entryMultiple} onChange={(e) => setEntryMultiple(Number(e.target.value))} />
          </div>
          <div className="valufin-lbo-slider-col">
            <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">% DEBT</span><span className="valufin-lbo-row-value">{debtPct}%</span></div>
            <input className="valufin-lbo-range" type="range" min={50} max={75} value={debtPct} onChange={(e) => setDebtPct(Number(e.target.value))} />
          </div>
          <div className="valufin-lbo-slider-col">
            <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">HOLD PERIOD</span><span className="valufin-lbo-row-value">{years} yrs</span></div>
            <input className="valufin-lbo-range" type="range" min={3} max={7} value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
          <div className="valufin-lbo-slider-col">
            <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">ANNUAL EBITDA GROWTH</span><span className="valufin-lbo-row-value">{growth}%</span></div>
            <input className="valufin-lbo-range" type="range" min={0} max={10} value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
          </div>
        </div>
        <div className="valufin-lbo-bridge">
          <span>Entry EV ${Math.round(entryEV)}M</span>
          <span>Sponsor equity in ${Math.round(sponsorEquity)}M</span>
          <span>Exit EV ${Math.round(exitEV)}M</span>
          <span>Remaining debt ${Math.round(remainingDebt)}M</span>
        </div>
        <div className="valufin-lbo-return-grid">
          <div className="valufin-lbo-return-box">
            <div className="valufin-lbo-return-label">MOIC</div>
            <div className="valufin-lbo-return-value">{moic.toFixed(2)}x</div>
          </div>
          <div className="valufin-lbo-return-box">
            <div className="valufin-lbo-return-label">APPROX. IRR</div>
            <div className="valufin-lbo-return-value" style={{ color: '#3FBF6F' }}>{irr.toFixed(1)}%</div>
          </div>
        </div>
      </div>
      <div className="valufin-lbo-takeaway-dashed">
        <span className="valufin-lbo-takeaway-dashed-check">✓</span>
        <div className="valufin-lbo-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ sweepPct, setSweepPct }) {
  const startDebt = 200;
  const annualFcf = 30;
  const years = 5;
  const paydown = Math.min(startDebt, annualFcf * (sweepPct / 100) * years);
  const endingDebt = Math.round(startDebt - paydown);
  return (
    <>
      <div className="valufin-lbo-eyebrow">DRAG THE CASH SWEEP →</div>
      <div className="valufin-lbo-panel">
        <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">STARTING DEBT</span><span className="valufin-lbo-row-value">${startDebt}M</span></div>
        <div className="valufin-lbo-row"><span className="valufin-lbo-row-label">ANNUAL FREE CASH FLOW</span><span className="valufin-lbo-row-value">${annualFcf}M</span></div>
        <div className="valufin-lbo-row" style={{ marginTop: 14 }}><span className="valufin-lbo-row-label">% OF FCF SWEPT TO DEBT</span><span className="valufin-lbo-row-value" style={{ color: '#4FC3C7' }}>{sweepPct}%</span></div>
        <input className="valufin-lbo-range" type="range" min={0} max={100} step={5} value={sweepPct} onChange={(e) => setSweepPct(Number(e.target.value))} />
        <div className="valufin-lbo-result">
          <div className="valufin-lbo-result-label">DEBT REMAINING AFTER {years} YEARS</div>
          <div className="valufin-lbo-result-value">${endingDebt}M</div>
          <div className="valufin-lbo-result-verdict">{endingDebt === 0 ? 'Fully paid off — every future dollar of value creation goes straight to equity.' : `$${Math.round(paydown)}M paid down over the hold.`}</div>
        </div>
      </div>
      <div className="valufin-lbo-takeaway-rule gold">
        <div className="valufin-lbo-takeaway-rule-label" style={{ color: '#C4B79A' }}>KEY TAKEAWAY</div>
        <div className="valufin-lbo-takeaway-rule-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ activeTrait, setActiveTrait }) {
  const active = CANDIDATE_TRAITS.find((t) => t.id === activeTrait) || CANDIDATE_TRAITS[0];
  return (
    <>
      <div className="valufin-lbo-eyebrow">CLICK EACH TRAIT →</div>
      <div className="valufin-lbo-criteria-row">
        {CANDIDATE_TRAITS.map((t) => (
          <button
            key={t.id}
            className={`valufin-lbo-criteria-card${t.id === activeTrait ? ' active' : ''}`}
            style={t.id === activeTrait ? { borderColor: t.color, background: `${t.color}18` } : undefined}
            onClick={() => setActiveTrait(t.id)}
          >
            <div className="valufin-lbo-criteria-label" style={{ color: t.color }}>{t.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-lbo-detail">
        <div className="valufin-lbo-detail-head" style={{ color: active.color }}>{active.label}</div>
        <p className="valufin-lbo-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-lbo-takeaway-quote">
        <span className="valufin-lbo-takeaway-quote-mark">"</span>
        <div className="valufin-lbo-takeaway-quote-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

function Lesson6({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-lbo-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-lbo-panel">
        <div className="valufin-lbo-quiz-q">{q.q}</div>
        <div className="valufin-lbo-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-lbo-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>
                {c}
              </button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-lbo-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-lbo-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-lbo-takeaway-rule red">
        <div className="valufin-lbo-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-lbo-takeaway-rule-body">{LESSONS[5].takeaway}</div>
      </div>
    </>
  );
}

export default function LboModeling() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);

  const [leveraged, setLeveraged] = useState(true);
  const [debtPctL2, setDebtPctL2] = useState(60);
  const [entryMultiple, setEntryMultiple] = useState(8);
  const [debtPctL3, setDebtPctL3] = useState(60);
  const [years, setYears] = useState(5);
  const [growth, setGrowth] = useState(6);
  const [sweepPct, setSweepPct] = useState(60);
  const [activeTrait, setActiveTrait] = useState('cash');
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState(null);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => { const idx = completed.findIndex((c) => !c); return idx === -1 ? completed.length - 1 : idx; })();

  function resetLessonState() { setQuizIndex(0); setPicked(null); }
  function openLesson(i) { setActiveIndex(i); resetLessonState(); setView('lesson'); }
  function backToTopics() { setView('list'); }
  function markCompleteAndAdvance() {
    const next = [...completed]; next[activeIndex] = true; setCompleted(next);
    const nextIndex = activeIndex + 1;
    if (nextIndex < LESSONS.length) { setActiveIndex(nextIndex); resetLessonState(); } else { setView('list'); }
  }

  const activeLesson = LESSONS[activeIndex];
  const isLast = activeIndex === LESSONS.length - 1;

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="valufin-lesson-topbar">
        <Breadcrumb items={view === 'list'
          ? [{ label: 'PE / Hedge Funds', path: '/pe-hf' }, { label: 'LBO Modeling' }]
          : [{ label: 'PE / Hedge Funds', path: '/pe-hf' }, { label: 'LBO Modeling', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know-clay">Must-know</span>
            <span className="valufin-ticker-caption">LBO · LBO MODELING</span>
          </div>
          <h1 className="valufin-archivo-h1">LBO<br />Modeling</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Leveraged buyout mechanics — how PE firms buy companies using debt, and why that
            debt is the whole engine behind private equity returns.
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
          <div className="valufin-lesson-detail-eyebrow">LBO MODELING · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 leveraged={leveraged} setLeveraged={setLeveraged} />}
          {activeIndex === 1 && <Lesson2 debtPct={debtPctL2} setDebtPct={setDebtPctL2} />}
          {activeIndex === 2 && (
            <Lesson3
              entryMultiple={entryMultiple} setEntryMultiple={setEntryMultiple}
              debtPct={debtPctL3} setDebtPct={setDebtPctL3}
              years={years} setYears={setYears}
              growth={growth} setGrowth={setGrowth}
            />
          )}
          {activeIndex === 3 && <Lesson4 sweepPct={sweepPct} setSweepPct={setSweepPct} />}
          {activeIndex === 4 && <Lesson5 activeTrait={activeTrait} setActiveTrait={setActiveTrait} />}
          {activeIndex === 5 && <Lesson6 quizIndex={quizIndex} setQuizIndex={setQuizIndex} picked={picked} setPicked={setPicked} />}

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
