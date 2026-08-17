import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A', '#D9694F'];

const LESSONS = [
  {
    title: 'Correlation, not volatility, drives risk',
    minutes: 6,
    kind: 'interactive',
    body1: 'Diversification reduces unsystematic (company/asset-specific) risk — not systematic (market-wide) risk. But how much it helps depends less on how volatile each asset is alone, and more on how they move together.',
    body2: 'Two assets, each 20% volatile on their own, split 50/50. Drag the correlation slider and watch the combined portfolio volatility.',
    takeaway: 'Low or negatively correlated assets reduce overall portfolio variance even when each one is individually risky — that interaction, not any single asset\'s volatility, is the real diversification benefit.',
  },
  {
    title: 'The risk/return tradeoff',
    minutes: 6,
    kind: 'interactive',
    body1: 'Modern Portfolio Theory formalizes an intuition every investor already has: higher expected return generally requires accepting higher volatility. The "efficient frontier" is just the best return available at each risk level.',
    body2: 'Slide between an all-bond and all-stock mix and watch expected return and risk move together.',
    takeaway: 'You cannot ask for stock-like returns with bond-like risk — the frontier is the honest menu of what\'s actually available, not a wish list.',
  },
  {
    title: 'Strategic vs. tactical allocation',
    minutes: 5,
    kind: 'interactive',
    body1: 'Strategic allocation is the long-term target mix set by goals and risk tolerance. Tactical allocation is a short-term, deliberate deviation from that target based on a market view.',
    body2: 'Toggle between the two to see how the same client\'s portfolio can look different depending on which lens is active.',
    takeaway: "Tactical tilts should be temporary and sized modestly — the strategic mix is the plan; tactical moves are a bet layered carefully on top of it, not a replacement for it.",
  },
  {
    title: 'Why rebalancing matters',
    minutes: 5,
    kind: 'interactive',
    body1: 'Left alone, a portfolio drifts — winners grow to be a bigger share, losers shrink. That drift quietly changes the portfolio\'s actual risk profile away from what was intended.',
    body2: "Watch a 60/40 portfolio drift as stocks outperform, then hit rebalance to see it snap back to target.",
    takeaway: 'Rebalancing forces a mechanical sell-high, buy-low discipline and keeps the portfolio\'s real risk level anchored to the client\'s original tolerance, not wherever the market happened to drift it.',
  },
  {
    title: 'Build a 3-asset-class portfolio',
    minutes: 7,
    kind: 'activity',
    body1: 'Now put it together yourself. Set a stock/bond/cash mix and see the blended expected return and risk it implies, using simple illustrative assumptions for each asset class.',
    body2: 'Adjust the sliders — the third allocation always fills in the remainder so the mix stays at 100%.',
    takeaway: 'The exact numbers here are illustrative, but the mechanic is real: every allocation decision is a trade between the return you want and the volatility you\'re willing to sit through to get it.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: 'A structured answer to "how would you construct a portfolio for this client" beats a list of asset classes every time.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'Goals → risk tolerance → time horizon → asset allocation → specific vehicles. That order is the whole answer to almost any portfolio construction question you\'ll be asked.',
  },
];

const QUIZ = [
  { q: 'A client asks how you\'d build their portfolio. What should you establish first?', choices: ['Which stocks are currently cheap', 'Their goals, risk tolerance, and time horizon', 'The current market outlook'], correct: 1, explain: 'Correct — asset allocation follows from the client\'s own constraints and goals, not from a market view. Get this backwards and the whole recommendation is built on the wrong foundation.' },
  { q: 'Diversification primarily reduces which type of risk?', choices: ['Systematic (market-wide) risk', 'Unsystematic (asset-specific) risk', 'Interest rate risk only'], correct: 1, explain: 'Correct — market-wide risk affects nearly everything at once and can\'t be diversified away; diversification targets the risk specific to any one holding.' },
  { q: 'Why rebalance a portfolio that has drifted from its target mix?', choices: ['To chase whatever just performed best', 'To restore the intended risk profile and mechanically sell high / buy low', 'Rebalancing is mostly a tax strategy'], correct: 1, explain: 'Correct — drift quietly changes the portfolio\'s actual risk level; rebalancing is the discipline that keeps it aligned with what the client actually signed up for.' },
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

function Lesson1({ correlation, setCorrelation }) {
  const vol = 20;
  const w = 0.5;
  const portfolioVol = Math.sqrt(2 * w * w * vol * vol + 2 * w * w * vol * vol * (correlation / 100));
  return (
    <>
      <div className="valufin-pfc-eyebrow">DRAG THE CORRELATION →</div>
      <div className="valufin-pfc-panel">
        <div className="valufin-pfc-row"><span className="valufin-pfc-row-label">ASSET A VOLATILITY</span><span className="valufin-pfc-row-value">20%</span></div>
        <div className="valufin-pfc-row"><span className="valufin-pfc-row-label">ASSET B VOLATILITY</span><span className="valufin-pfc-row-value">20%</span></div>
        <div className="valufin-pfc-row" style={{ marginTop: 14 }}><span className="valufin-pfc-row-label">CORRELATION (ρ)</span><span className="valufin-pfc-row-value" style={{ color: '#4FC3C7' }}>{(correlation / 100).toFixed(2)}</span></div>
        <input className="valufin-pfc-range" type="range" min={-100} max={100} step={5} value={correlation} onChange={(e) => setCorrelation(Number(e.target.value))} />
        <div className="valufin-pfc-result">
          <div className="valufin-pfc-result-label">50/50 PORTFOLIO VOLATILITY</div>
          <div className="valufin-pfc-result-value">{portfolioVol.toFixed(1)}%</div>
          <div className="valufin-pfc-result-verdict">{correlation <= -50 ? 'Strong hedge — volatility nearly cancels out.' : correlation >= 80 ? 'Little diversification benefit — the assets move almost in lockstep.' : 'Meaningful reduction below either asset\'s own 20% volatility.'}</div>
        </div>
      </div>
      <div className="valufin-pfc-takeaway-terminal">
        <div className="valufin-pfc-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-pfc-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ stockWeight, setStockWeight }) {
  const w = stockWeight / 100;
  const stockReturn = 9, stockVol = 16, bondReturn = 4, bondVol = 6, rho = 0.2;
  const blendedReturn = w * stockReturn + (1 - w) * bondReturn;
  const blendedRisk = Math.sqrt(
    w * w * stockVol * stockVol + (1 - w) * (1 - w) * bondVol * bondVol + 2 * w * (1 - w) * stockVol * bondVol * rho
  );
  return (
    <>
      <div className="valufin-pfc-eyebrow">DRAG STOCK / BOND MIX →</div>
      <div className="valufin-pfc-panel">
        <div className="valufin-pfc-row"><span className="valufin-pfc-row-label">STOCK ALLOCATION</span><span className="valufin-pfc-row-value" style={{ color: '#4FC3C7' }}>{stockWeight}%</span></div>
        <input className="valufin-pfc-range" type="range" min={0} max={100} step={5} value={stockWeight} onChange={(e) => setStockWeight(Number(e.target.value))} />
        <div className="valufin-pfc-return-grid">
          <div className="valufin-pfc-return-box">
            <div className="valufin-pfc-return-label">EXPECTED RETURN</div>
            <div className="valufin-pfc-return-value" style={{ color: '#3FBF6F' }}>{blendedReturn.toFixed(1)}%</div>
          </div>
          <div className="valufin-pfc-return-box">
            <div className="valufin-pfc-return-label">EXPECTED VOLATILITY</div>
            <div className="valufin-pfc-return-value" style={{ color: '#D9694F' }}>{blendedRisk.toFixed(1)}%</div>
          </div>
        </div>
      </div>
      <div className="valufin-pfc-takeaway-clay">
        <span className="valufin-pfc-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
        </span>
        <div className="valufin-pfc-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ isTactical, setIsTactical }) {
  return (
    <>
      <div className="valufin-pfc-eyebrow">TOGGLE THE LENS →</div>
      <div className="valufin-pfc-tabs">
        <button className={`valufin-pfc-tab${!isTactical ? ' active' : ''}`} onClick={() => setIsTactical(false)}>STRATEGIC</button>
        <button className={`valufin-pfc-tab clay${isTactical ? ' active' : ''}`} onClick={() => setIsTactical(true)}>TACTICAL</button>
      </div>
      <div className="valufin-pfc-panel">
        <div className="valufin-pfc-panel-label">{isTactical ? 'CURRENT MIX — TEMPORARY TILT' : 'TARGET MIX — LONG-TERM PLAN'}</div>
        <div className="valufin-pfc-panel-value" style={{ color: isTactical ? '#D9694F' : '#4FC3C7' }}>{isTactical ? '70 / 30' : '60 / 40'}</div>
        <p className="valufin-pfc-panel-body">
          {isTactical
            ? "A deliberate, temporary overweight to equities based on a near-term market view. Sized modestly and meant to unwind back toward the strategic target."
            : "The long-term target mix set by this client's goals, time horizon, and risk tolerance — not by any current opinion on where markets are headed."}
        </p>
      </div>
      <div className="valufin-pfc-takeaway-dashed">
        <span className="valufin-pfc-takeaway-dashed-check">✓</span>
        <div className="valufin-pfc-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ monthsDrifted, setMonthsDrifted, rebalanced, setRebalanced }) {
  const driftedEquity = rebalanced ? 60 : Math.min(75, 60 + monthsDrifted * 0.6);
  return (
    <>
      <div className="valufin-pfc-eyebrow">WATCH THE DRIFT →</div>
      <div className="valufin-pfc-panel">
        <div className="valufin-pfc-row"><span className="valufin-pfc-row-label">MONTHS SINCE LAST REBALANCE</span><span className="valufin-pfc-row-value">{rebalanced ? 0 : monthsDrifted}</span></div>
        <input className="valufin-pfc-range" type="range" min={0} max={24} value={monthsDrifted} onChange={(e) => { setMonthsDrifted(Number(e.target.value)); setRebalanced(false); }} />
        <div className="valufin-pfc-result">
          <div className="valufin-pfc-result-label">CURRENT EQUITY WEIGHT (TARGET: 60%)</div>
          <div className="valufin-pfc-result-value" style={{ color: driftedEquity > 65 ? '#D9694F' : '#EDEBE4' }}>{driftedEquity.toFixed(0)}%</div>
          <div className="valufin-pfc-result-verdict">{rebalanced ? 'Back on target.' : driftedEquity > 65 ? 'Meaningfully riskier than the client agreed to.' : 'Still close to target.'}</div>
        </div>
        <button className="valufin-pfc-rebalance-btn" onClick={() => setRebalanced(true)}>↻ Rebalance to target</button>
      </div>
      <div className="valufin-pfc-takeaway-rule gold">
        <div className="valufin-pfc-takeaway-rule-label" style={{ color: '#C4B79A' }}>KEY TAKEAWAY</div>
        <div className="valufin-pfc-takeaway-rule-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ stockPct, setStockPct, bondPct, setBondPct }) {
  const cashPct = Math.max(0, 100 - stockPct - bondPct);
  const assumptions = { stock: { r: 9, label: 'STOCKS' }, bond: { r: 4, label: 'BONDS' }, cash: { r: 2, label: 'CASH' } };
  const blendedReturn = (stockPct * assumptions.stock.r + bondPct * assumptions.bond.r + cashPct * assumptions.cash.r) / 100;
  return (
    <>
      <div className="valufin-pfc-eyebrow">SET YOUR MIX →</div>
      <div className="valufin-pfc-panel">
        <div className="valufin-pfc-row"><span className="valufin-pfc-row-label">STOCKS</span><span className="valufin-pfc-row-value" style={{ color: '#4FC3C7' }}>{stockPct}%</span></div>
        <input className="valufin-pfc-range" type="range" min={0} max={100} value={stockPct} onChange={(e) => setStockPct(Math.min(Number(e.target.value), 100 - bondPct))} />
        <div className="valufin-pfc-row" style={{ marginTop: 14 }}><span className="valufin-pfc-row-label">BONDS</span><span className="valufin-pfc-row-value" style={{ color: '#C4B79A' }}>{bondPct}%</span></div>
        <input className="valufin-pfc-range" type="range" min={0} max={100} value={bondPct} onChange={(e) => setBondPct(Math.min(Number(e.target.value), 100 - stockPct))} />
        <div className="valufin-pfc-row" style={{ marginTop: 14 }}><span className="valufin-pfc-row-label">CASH (REMAINDER)</span><span className="valufin-pfc-row-value" style={{ color: '#8F887A' }}>{cashPct}%</span></div>
        <div className="valufin-pfc-result" style={{ marginTop: 18 }}>
          <div className="valufin-pfc-result-label">BLENDED EXPECTED RETURN</div>
          <div className="valufin-pfc-result-value">{blendedReturn.toFixed(1)}%</div>
        </div>
      </div>
      <div className="valufin-pfc-takeaway-quote">
        <span className="valufin-pfc-takeaway-quote-mark">"</span>
        <div className="valufin-pfc-takeaway-quote-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

function Lesson6({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-pfc-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-pfc-panel">
        <div className="valufin-pfc-quiz-q">{q.q}</div>
        <div className="valufin-pfc-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-pfc-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>
                {c}
              </button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-pfc-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-pfc-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-pfc-takeaway-rule red">
        <div className="valufin-pfc-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-pfc-takeaway-rule-body">{LESSONS[5].takeaway}</div>
      </div>
    </>
  );
}

export default function PortfolioConstruction() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);

  const [correlation, setCorrelation] = useState(20);
  const [stockWeight, setStockWeight] = useState(60);
  const [isTactical, setIsTactical] = useState(false);
  const [monthsDrifted, setMonthsDrifted] = useState(12);
  const [rebalanced, setRebalanced] = useState(false);
  const [stockPct, setStockPct] = useState(50);
  const [bondPct, setBondPct] = useState(35);
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
          ? [{ label: 'Wealth & Asset Management', path: '/wam' }, { label: 'Portfolio Construction' }]
          : [{ label: 'Wealth & Asset Management', path: '/wam' }, { label: 'Portfolio Construction', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know-clay">Must-know</span>
            <span className="valufin-ticker-caption">PFC · PORTFOLIO CONSTRUCTION</span>
          </div>
          <h1 className="valufin-archivo-h1">Portfolio<br />Construction</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Asset allocation, diversification, and the risk-return tradeoffs behind every
            portfolio decision — before a single stock ever gets picked.
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
          <div className="valufin-lesson-detail-eyebrow">PORTFOLIO CONSTRUCTION · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 correlation={correlation} setCorrelation={setCorrelation} />}
          {activeIndex === 1 && <Lesson2 stockWeight={stockWeight} setStockWeight={setStockWeight} />}
          {activeIndex === 2 && <Lesson3 isTactical={isTactical} setIsTactical={setIsTactical} />}
          {activeIndex === 3 && <Lesson4 monthsDrifted={monthsDrifted} setMonthsDrifted={setMonthsDrifted} rebalanced={rebalanced} setRebalanced={setRebalanced} />}
          {activeIndex === 4 && <Lesson5 stockPct={stockPct} setStockPct={setStockPct} bondPct={bondPct} setBondPct={setBondPct} />}
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
