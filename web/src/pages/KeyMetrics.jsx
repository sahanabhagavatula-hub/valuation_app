import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A', '#D9694F'];

const LESSONS = [
  {
    title: 'Profitability margins, live',
    minutes: 6,
    kind: 'interactive',
    body1: 'Gross margin, operating margin, and net margin all answer the same question at different levels of the income statement: how much of every revenue dollar actually turns into profit?',
    body2: 'Adjust COGS and opex below and watch each margin recompute.',
    takeaway: 'A margin means nothing in isolation — a 15% net margin is excellent in a low-margin industry like grocery and mediocre in high-margin software. Always read metrics relative to industry peers.',
  },
  {
    title: 'The ROE vs. ROIC trap',
    minutes: 7,
    kind: 'activity',
    body1: "ROE can be inflated by leverage; ROIC is capital-structure-neutral and a better read on true business quality. This is a favorite \"which is better\" interview trap.",
    body2: 'Drag the leverage slider below — watch ROIC stay flat while ROE climbs.',
    takeaway: 'A business with a flat, mediocre ROIC can show a rising, impressive-looking ROE just by adding debt — ROIC is what tells you if the underlying business actually got better.',
  },
  {
    title: 'Liquidity: can they pay their bills?',
    minutes: 5,
    kind: 'interactive',
    body1: 'Current ratio and quick ratio both ask whether a company can cover near-term obligations — quick ratio is the stricter version, excluding inventory.',
    body2: 'Adjust current assets, inventory, and current liabilities below.',
    takeaway: 'A current ratio above 1 looks fine until you check the quick ratio — if inventory is doing all the work, that "liquidity" may not convert to cash fast enough to matter.',
  },
  {
    title: 'Leverage: interest coverage',
    minutes: 5,
    kind: 'interactive',
    body1: 'Interest coverage (EBIT ÷ Interest Expense) tells you how easily a company can service its debt — critical in corporate finance and credit/LBO contexts alike.',
    body2: 'Adjust EBIT and interest expense below.',
    takeaway: 'A coverage ratio near 1x means nearly all operating profit is going straight to lenders — any dip in EBIT could mean a missed payment.',
  },
  {
    title: 'Efficiency & the cheat sheet',
    minutes: 5,
    kind: 'interactive',
    body1: 'Efficiency metrics measure how well a company uses its assets — inventory turnover and receivables turnover are the two most commonly asked about.',
    body2: 'Click each row below for the full picture: formula, what it tells you, and a rough benchmark range.',
    takeaway: 'Structure any "assess this company\'s health" answer around these four buckets — profitability, liquidity, leverage, efficiency — and you\'ll rarely miss something an interviewer expects.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: 'A few conceptual checks pulling the whole topic together.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: "The ROE-vs-ROIC distinction and the four-bucket structure (profitability, liquidity, leverage, efficiency) are the two things this topic gets tested on most.",
  },
];

const CHEAT_SHEET = [
  { metric: 'Gross Margin', formula: '(Revenue − COGS) / Revenue', tells: 'Pricing power and production efficiency', benchmark: 'Varies hugely by industry' },
  { metric: 'ROIC', formula: 'NOPAT / Invested Capital', tells: 'True business quality, leverage-neutral', benchmark: '>10-15% generally strong' },
  { metric: 'Current Ratio', formula: 'Current Assets / Current Liabilities', tells: 'Near-term bill-paying ability', benchmark: '1.5–3x typically healthy' },
  { metric: 'Interest Coverage', formula: 'EBIT / Interest Expense', tells: 'Ease of servicing debt', benchmark: '>3x generally comfortable' },
  { metric: 'Inventory Turnover', formula: 'COGS / Avg. Inventory', tells: 'How fast inventory sells through', benchmark: 'Higher is generally better' },
];

const QUIZ = [
  { q: 'Two companies have identical ROE, but Company A uses far more debt than Company B. What should you check next?', choices: ['Nothing — identical ROE means identical quality', 'ROIC, since it strips out the effect of leverage', 'Their stock price'], correct: 1, explain: 'Correct — ROE alone can\'t distinguish "genuinely more profitable" from "just more leveraged." ROIC is capital-structure-neutral.' },
  { q: 'What does an interest coverage ratio of 1.2x suggest?', choices: ['The company has no debt', 'Operating profit barely covers interest payments — a thin cushion', 'The company is extremely low-risk'], correct: 1, explain: 'Correct — a coverage ratio close to 1x means almost all operating profit is going to debt service, leaving little room for a downturn.' },
  { q: 'How should you structure an answer to "assess whether this company is financially healthy"?', choices: ['Just quote the stock price', 'Profitability, liquidity, leverage, efficiency', 'Only look at revenue growth'], correct: 1, explain: "Correct — these four buckets cover the health check comprehensively and are what interviewers expect to hear referenced." },
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

function Lesson1({ cogsPct, setCogsPct, opexPct, setOpexPct }) {
  const revenue = 500;
  const cogs = revenue * (cogsPct / 100);
  const opex = revenue * (opexPct / 100);
  const grossProfit = revenue - cogs;
  const operatingProfit = grossProfit - opex;
  const grossMargin = (grossProfit / revenue) * 100;
  const opMargin = (operatingProfit / revenue) * 100;
  return (
    <>
      <div className="valufin-kmt-eyebrow">ADJUST COGS & OPEX →</div>
      <div className="valufin-kmt-panel">
        <div className="valufin-kmt-row"><span className="valufin-kmt-row-label">REVENUE (FIXED)</span><span className="valufin-kmt-row-value">${revenue}M</span></div>
        <div className="valufin-kmt-row" style={{ marginTop: 14 }}><span className="valufin-kmt-row-label">COGS</span><span className="valufin-kmt-row-value">{cogsPct}% (${cogs.toFixed(0)}M)</span></div>
        <input className="valufin-kmt-range" type="range" min={20} max={70} value={cogsPct} onChange={(e) => setCogsPct(Number(e.target.value))} />
        <div className="valufin-kmt-row" style={{ marginTop: 14 }}><span className="valufin-kmt-row-label">OPEX</span><span className="valufin-kmt-row-value">{opexPct}% (${opex.toFixed(0)}M)</span></div>
        <input className="valufin-kmt-range" type="range" min={5} max={40} value={opexPct} onChange={(e) => setOpexPct(Number(e.target.value))} />
        <div className="valufin-kmt-return-grid">
          <div className="valufin-kmt-return-box">
            <div className="valufin-kmt-return-label">GROSS MARGIN</div>
            <div className="valufin-kmt-return-value">{grossMargin.toFixed(0)}%</div>
          </div>
          <div className="valufin-kmt-return-box">
            <div className="valufin-kmt-return-label">OPERATING MARGIN</div>
            <div className="valufin-kmt-return-value" style={{ color: opMargin >= 0 ? '#3FBF6F' : '#D9694F' }}>{opMargin.toFixed(0)}%</div>
          </div>
        </div>
      </div>
      <div className="valufin-kmt-takeaway-terminal">
        <div className="valufin-kmt-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-kmt-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ leveragePct, setLeveragePct }) {
  const investedCapital = 400;
  const nopat = 50;
  const roic = (nopat / investedCapital) * 100;
  const debt = investedCapital * (leveragePct / 100);
  const equity = investedCapital - debt;
  const costOfDebt = 0.05;
  const interest = debt * costOfDebt;
  const netIncome = nopat - interest;
  const roe = (netIncome / equity) * 100;
  return (
    <>
      <div className="valufin-kmt-eyebrow">DRAG THE LEVERAGE →</div>
      <div className="valufin-kmt-panel">
        <div className="valufin-kmt-row"><span className="valufin-kmt-row-label">% OF CAPITAL FUNDED WITH DEBT</span><span className="valufin-kmt-row-value" style={{ color: '#D9694F' }}>{leveragePct}%</span></div>
        <input className="valufin-kmt-range" type="range" min={0} max={70} step={5} value={leveragePct} onChange={(e) => setLeveragePct(Number(e.target.value))} />
        <div className="valufin-kmt-return-grid">
          <div className="valufin-kmt-return-box">
            <div className="valufin-kmt-return-label">ROIC (UNCHANGED)</div>
            <div className="valufin-kmt-return-value" style={{ color: '#4FC3C7' }}>{roic.toFixed(1)}%</div>
          </div>
          <div className="valufin-kmt-return-box">
            <div className="valufin-kmt-return-label">ROE</div>
            <div className="valufin-kmt-return-value" style={{ color: '#D9694F' }}>{roe.toFixed(1)}%</div>
          </div>
        </div>
      </div>
      <div className="valufin-kmt-takeaway-clay">
        <span className="valufin-kmt-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17c3-8 6 6 9-4s6 6 9-4" /></svg>
        </span>
        <div className="valufin-kmt-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ currentAssets, setCurrentAssets, inventory, setInventory, currentLiabilities, setCurrentLiabilities }) {
  const currentRatio = currentAssets / currentLiabilities;
  const quickRatio = (currentAssets - inventory) / currentLiabilities;
  return (
    <>
      <div className="valufin-kmt-eyebrow">ADJUST THE BALANCE SHEET →</div>
      <div className="valufin-kmt-panel">
        <div className="valufin-kmt-row"><span className="valufin-kmt-row-label">CURRENT ASSETS</span><span className="valufin-kmt-row-value">${currentAssets}M</span></div>
        <input className="valufin-kmt-range" type="range" min={50} max={300} value={currentAssets} onChange={(e) => setCurrentAssets(Number(e.target.value))} />
        <div className="valufin-kmt-row" style={{ marginTop: 14 }}><span className="valufin-kmt-row-label">OF WHICH INVENTORY</span><span className="valufin-kmt-row-value">${inventory}M</span></div>
        <input className="valufin-kmt-range" type="range" min={0} max={150} value={inventory} onChange={(e) => setInventory(Math.min(Number(e.target.value), currentAssets))} />
        <div className="valufin-kmt-row" style={{ marginTop: 14 }}><span className="valufin-kmt-row-label">CURRENT LIABILITIES</span><span className="valufin-kmt-row-value">${currentLiabilities}M</span></div>
        <input className="valufin-kmt-range" type="range" min={30} max={200} value={currentLiabilities} onChange={(e) => setCurrentLiabilities(Number(e.target.value))} />
        <div className="valufin-kmt-return-grid">
          <div className="valufin-kmt-return-box">
            <div className="valufin-kmt-return-label">CURRENT RATIO</div>
            <div className="valufin-kmt-return-value">{currentRatio.toFixed(2)}x</div>
          </div>
          <div className="valufin-kmt-return-box">
            <div className="valufin-kmt-return-label">QUICK RATIO</div>
            <div className="valufin-kmt-return-value" style={{ color: quickRatio < 1 ? '#D9694F' : '#3FBF6F' }}>{quickRatio.toFixed(2)}x</div>
          </div>
        </div>
      </div>
      <div className="valufin-kmt-takeaway-dashed">
        <span className="valufin-kmt-takeaway-dashed-check">✓</span>
        <div className="valufin-kmt-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ ebit, setEbit, interest, setInterest }) {
  const coverage = ebit / interest;
  const verdictColor = coverage < 1.5 ? '#D9694F' : coverage < 3 ? '#C4B79A' : '#3FBF6F';
  return (
    <>
      <div className="valufin-kmt-eyebrow">ADJUST EBIT & INTEREST →</div>
      <div className="valufin-kmt-panel">
        <div className="valufin-kmt-row"><span className="valufin-kmt-row-label">EBIT</span><span className="valufin-kmt-row-value">${ebit}M</span></div>
        <input className="valufin-kmt-range" type="range" min={10} max={150} value={ebit} onChange={(e) => setEbit(Number(e.target.value))} />
        <div className="valufin-kmt-row" style={{ marginTop: 14 }}><span className="valufin-kmt-row-label">INTEREST EXPENSE</span><span className="valufin-kmt-row-value">${interest}M</span></div>
        <input className="valufin-kmt-range" type="range" min={5} max={60} value={interest} onChange={(e) => setInterest(Number(e.target.value))} />
        <div className="valufin-kmt-result">
          <div className="valufin-kmt-result-label">${ebit}M ÷ ${interest}M =</div>
          <div className="valufin-kmt-result-value" style={{ color: verdictColor }}>{coverage.toFixed(1)}x</div>
          <div className="valufin-kmt-result-verdict" style={{ color: verdictColor }}>{coverage < 1.5 ? 'Thin cushion — a downturn could threaten debt service.' : coverage < 3 ? 'Adequate but worth watching.' : 'Comfortable coverage.'}</div>
        </div>
      </div>
      <div className="valufin-kmt-takeaway-quote">
        <span className="valufin-kmt-takeaway-quote-mark">"</span>
        <div className="valufin-kmt-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ activeMetric, setActiveMetric }) {
  return (
    <>
      <div className="valufin-kmt-eyebrow">CLICK EACH ROW →</div>
      <div className="valufin-kmt-cheat-table">
        <div className="valufin-kmt-cheat-head"><span>Metric</span><span>Formula</span><span>Benchmark</span></div>
        {CHEAT_SHEET.map((row, i) => (
          <button key={row.metric} className={`valufin-kmt-cheat-row${activeMetric === i ? ' active' : ''}`} onClick={() => setActiveMetric(i)}>
            <span>{row.metric}</span><span>{row.formula}</span><span>{row.benchmark}</span>
          </button>
        ))}
      </div>
      {activeMetric !== null && (
        <div className="valufin-kmt-detail">
          <div className="valufin-kmt-detail-head">{CHEAT_SHEET[activeMetric].metric}</div>
          <p className="valufin-kmt-detail-body">{CHEAT_SHEET[activeMetric].tells}</p>
        </div>
      )}
      <div className="valufin-kmt-takeaway-rule gold">
        <div className="valufin-kmt-takeaway-rule-label" style={{ color: '#C4B79A' }}>KEY TAKEAWAY</div>
        <div className="valufin-kmt-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

function Lesson6({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-kmt-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-kmt-panel">
        <div className="valufin-kmt-quiz-q">{q.q}</div>
        <div className="valufin-kmt-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-kmt-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-kmt-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-kmt-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-kmt-takeaway-rule red">
        <div className="valufin-kmt-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-kmt-takeaway-rule-body">{LESSONS[5].takeaway}</div>
      </div>
    </>
  );
}

export default function KeyMetrics() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);

  const [cogsPct, setCogsPct] = useState(45);
  const [opexPct, setOpexPct] = useState(25);
  const [leveragePct, setLeveragePct] = useState(30);
  const [currentAssets, setCurrentAssets] = useState(180);
  const [inventory, setInventory] = useState(70);
  const [currentLiabilities, setCurrentLiabilities] = useState(120);
  const [ebit, setEbit] = useState(80);
  const [interest, setInterest] = useState(25);
  const [activeMetric, setActiveMetric] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState(null);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => { const idx = completed.findIndex((c) => !c); return idx === -1 ? completed.length - 1 : idx; })();

  function resetLessonState() { setQuizIndex(0); setPicked(null); setActiveMetric(null); }
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
          ? [{ label: 'Corporate Finance', path: '/corp-finance' }, { label: 'Key Metrics' }]
          : [{ label: 'Corporate Finance', path: '/corp-finance' }, { label: 'Key Metrics', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know-clay">Must-know</span>
            <span className="valufin-ticker-caption">KMT · KEY METRICS</span>
          </div>
          <h1 className="valufin-archivo-h1">Key<br />Metrics</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Revenue, EBITDA, margins, ROE, EPS — what they mean, why they matter, and the
            traps interviewers love to set with them.
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
          <div className="valufin-lesson-detail-eyebrow">KEY METRICS · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 cogsPct={cogsPct} setCogsPct={setCogsPct} opexPct={opexPct} setOpexPct={setOpexPct} />}
          {activeIndex === 1 && <Lesson2 leveragePct={leveragePct} setLeveragePct={setLeveragePct} />}
          {activeIndex === 2 && <Lesson3 currentAssets={currentAssets} setCurrentAssets={setCurrentAssets} inventory={inventory} setInventory={setInventory} currentLiabilities={currentLiabilities} setCurrentLiabilities={setCurrentLiabilities} />}
          {activeIndex === 3 && <Lesson4 ebit={ebit} setEbit={setEbit} interest={interest} setInterest={setInterest} />}
          {activeIndex === 4 && <Lesson5 activeMetric={activeMetric} setActiveMetric={setActiveMetric} />}
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
