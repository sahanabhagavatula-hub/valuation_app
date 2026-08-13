import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'Five types of risk',
    minutes: 6,
    kind: 'interactive',
    body1: '"Risk" is not one thing — a portfolio can be exposed to several different kinds of risk at once, each requiring a different kind of defense.',
    body2: 'Click each type below to see what it actually means and a quick example.',
    takeaway: 'Even a well-performing single position can be a risk-management failure if it dominates the portfolio — concentration risk hides behind good recent returns.',
  },
  {
    title: 'Measuring sensitivity: beta',
    minutes: 6,
    kind: 'interactive',
    body1: 'Beta measures how sensitive a position is to overall market moves — systematic risk. A beta of 1.2 means the position tends to move about 20% more than the market, in the same direction.',
    body2: 'Set a beta and a market move below to see the implied position move.',
    takeaway: 'Beta only measures market (systematic) risk — a low-beta stock can still carry high company-specific risk that beta says nothing about.',
  },
  {
    title: 'Hedging basics',
    minutes: 5,
    kind: 'interactive',
    body1: 'Hedging tools all do the same underlying job — reduce exposure to an unwanted outcome — but they work through very different mechanisms.',
    body2: 'Click each tool below to see how it actually reduces risk.',
    takeaway: 'Risk management is process discipline, not just avoiding losses — position sizing, stop-losses, and diversification rules matter as much as any single hedge.',
  },
  {
    title: 'The Sharpe ratio, worked',
    minutes: 6,
    kind: 'activity',
    body1: 'Sharpe Ratio = (Portfolio Return − Risk-Free Rate) ÷ Standard Deviation. It measures risk-adjusted return — higher means more return per unit of risk taken.',
    body2: 'Adjust the three inputs below and watch the Sharpe ratio and its verdict recompute live.',
    takeaway: 'A high raw return with a mediocre Sharpe ratio means the return came with a lot of risk attached — the ratio is what separates skill from just taking on more volatility.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: '"How do you measure risk?" comes up constantly — be ready to name multiple tools and know when each applies.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'If you can name beta, standard deviation, VaR, and Sharpe fluently — and explain the Sharpe ratio\'s formula and intuition on the spot — you\'ve covered what actually gets asked.',
  },
];

const RISK_TYPES = [
  { id: 'market', label: 'MARKET', color: '#4FC3C7', detail: 'Risk from broad market moves that affect nearly everything at once — a recession or rate shock drags down most assets together, diversification barely helps.' },
  { id: 'credit', label: 'CREDIT', color: '#C4B79A', detail: 'The risk a bond issuer or counterparty fails to pay what it owes — the reason lower-rated debt trades at a higher yield.' },
  { id: 'liquidity', label: 'LIQUIDITY', color: '#D9694F', detail: 'The risk you can\'t exit a position at a fair price when you need to — thinly-traded assets can force a much worse price on a forced sale.' },
  { id: 'concentration', label: 'CONCENTRATION', color: '#86AE9E', detail: 'The risk of having too much riding on one position, sector, or manager — even a great holding is a risk-management failure if it\'s oversized.' },
  { id: 'operational', label: 'OPERATIONAL', color: '#a389c9', detail: 'Risk from internal failures — a trading error, a compliance breach, a system outage — unrelated to market direction entirely.' },
];

const HEDGES = [
  { id: 'options', label: 'OPTIONS', detail: 'A put option lets you lock in a floor price on a holding — you pay a premium for the right to sell at a set price no matter how far the market falls.' },
  { id: 'diversification', label: 'DIVERSIFICATION', detail: 'Spreading exposure across uncorrelated holdings so no single bad outcome sinks the whole portfolio at once.' },
  { id: 'allocation', label: 'ASSET ALLOCATION', detail: 'Shifting the mix toward more defensive asset classes (bonds, cash) reduces overall portfolio volatility at the cost of expected return.' },
];

const QUIZ = [
  { q: 'What does a beta of 1.2 tell you about a stock?', choices: ['It has 1.2% annual volatility', 'It tends to move about 20% more than the market, in the same direction', 'It pays a 1.2% dividend yield'], correct: 1, explain: 'Correct — beta measures sensitivity to market moves; 1.2 means amplified moves in the same direction as the market, both up and down.' },
  { q: 'Sharpe Ratio = (Return − Risk-Free Rate) ÷ ?', choices: ['Beta', 'Standard deviation', 'Market capitalization'], correct: 1, explain: 'Correct — Sharpe divides excess return by standard deviation, giving a risk-adjusted return figure.' },
  { q: 'A single position has performed extremely well and now makes up 40% of the portfolio. What risk does this create?', choices: ['Credit risk', 'Concentration risk', 'No risk — good performers should be left alone'], correct: 1, explain: 'Correct — an oversized position, even a winning one, exposes the portfolio to outsized risk if that one holding turns.' },
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

function Lesson1({ activeType, setActiveType }) {
  const active = RISK_TYPES.find((t) => t.id === activeType) || RISK_TYPES[0];
  return (
    <>
      <div className="valufin-rsk-eyebrow">CLICK EACH TYPE →</div>
      <div className="valufin-rsk-criteria-row">
        {RISK_TYPES.map((t) => (
          <button key={t.id} className={`valufin-rsk-criteria-card${t.id === activeType ? ' active' : ''}`} style={t.id === activeType ? { borderColor: t.color, background: `${t.color}18` } : undefined} onClick={() => setActiveType(t.id)}>
            <div className="valufin-rsk-criteria-label" style={{ color: t.color }}>{t.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-rsk-detail">
        <div className="valufin-rsk-detail-head" style={{ color: active.color }}>{active.label} RISK</div>
        <p className="valufin-rsk-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-rsk-takeaway-terminal">
        <div className="valufin-rsk-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-rsk-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ beta, setBeta, marketMove, setMarketMove }) {
  const positionMove = (beta * marketMove).toFixed(1);
  return (
    <>
      <div className="valufin-rsk-eyebrow">SET BETA AND MARKET MOVE →</div>
      <div className="valufin-rsk-panel">
        <div className="valufin-rsk-row"><span className="valufin-rsk-row-label">BETA</span><span className="valufin-rsk-row-value">{beta.toFixed(1)}</span></div>
        <input className="valufin-rsk-range" type="range" min={0.5} max={2} step={0.1} value={beta} onChange={(e) => setBeta(Number(e.target.value))} />
        <div className="valufin-rsk-row" style={{ marginTop: 14 }}><span className="valufin-rsk-row-label">MARKET MOVE</span><span className="valufin-rsk-row-value">{marketMove > 0 ? '+' : ''}{marketMove}%</span></div>
        <input className="valufin-rsk-range" type="range" min={-10} max={10} value={marketMove} onChange={(e) => setMarketMove(Number(e.target.value))} />
        <div className="valufin-rsk-result">
          <div className="valufin-rsk-result-label">IMPLIED POSITION MOVE</div>
          <div className="valufin-rsk-result-value" style={{ color: positionMove >= 0 ? '#3FBF6F' : '#D9694F' }}>{positionMove > 0 ? '+' : ''}{positionMove}%</div>
        </div>
      </div>
      <div className="valufin-rsk-takeaway-clay">
        <span className="valufin-rsk-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17c3-8 6 6 9-4s6 6 9-4" /></svg>
        </span>
        <div className="valufin-rsk-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activeHedge, setActiveHedge }) {
  const active = HEDGES.find((h) => h.id === activeHedge) || HEDGES[0];
  return (
    <>
      <div className="valufin-rsk-eyebrow">CLICK EACH TOOL →</div>
      <div className="valufin-rsk-tabs">
        {HEDGES.map((h) => (
          <button key={h.id} className={`valufin-rsk-tab${activeHedge === h.id ? ' active' : ''}`} onClick={() => setActiveHedge(h.id)}>{h.label}</button>
        ))}
      </div>
      <div className="valufin-rsk-panel">
        <p className="valufin-rsk-panel-body">{active.detail}</p>
      </div>
      <div className="valufin-rsk-takeaway-dashed">
        <span className="valufin-rsk-takeaway-dashed-check">✓</span>
        <div className="valufin-rsk-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ ret, setRet, riskFree, setRiskFree, stddev, setStddev }) {
  const sharpe = (ret - riskFree) / stddev;
  const verdict = sharpe < 0.5 ? { label: 'POOR', color: '#D9694F' } : sharpe < 1 ? { label: 'OK', color: '#C4B79A' } : sharpe < 2 ? { label: 'GOOD', color: '#3FBF6F' } : { label: 'EXCELLENT', color: '#4FC3C7' };
  return (
    <>
      <div className="valufin-rsk-eyebrow">ADJUST THE INPUTS →</div>
      <div className="valufin-rsk-panel">
        <div className="valufin-rsk-row"><span className="valufin-rsk-row-label">PORTFOLIO RETURN</span><span className="valufin-rsk-row-value">{ret}%</span></div>
        <input className="valufin-rsk-range" type="range" min={0} max={20} value={ret} onChange={(e) => setRet(Number(e.target.value))} />
        <div className="valufin-rsk-row" style={{ marginTop: 14 }}><span className="valufin-rsk-row-label">RISK-FREE RATE</span><span className="valufin-rsk-row-value">{riskFree}%</span></div>
        <input className="valufin-rsk-range" type="range" min={0} max={6} step={0.5} value={riskFree} onChange={(e) => setRiskFree(Number(e.target.value))} />
        <div className="valufin-rsk-row" style={{ marginTop: 14 }}><span className="valufin-rsk-row-label">STANDARD DEVIATION</span><span className="valufin-rsk-row-value">{stddev}%</span></div>
        <input className="valufin-rsk-range" type="range" min={2} max={30} value={stddev} onChange={(e) => setStddev(Number(e.target.value))} />
        <div className="valufin-rsk-result">
          <div className="valufin-rsk-result-label">({ret}% − {riskFree}%) ÷ {stddev}% =</div>
          <div className="valufin-rsk-result-value" style={{ color: verdict.color }}>{sharpe.toFixed(2)}</div>
          <div className="valufin-rsk-result-verdict" style={{ color: verdict.color }}>{verdict.label} (illustrative rule of thumb)</div>
        </div>
      </div>
      <div className="valufin-rsk-takeaway-quote">
        <span className="valufin-rsk-takeaway-quote-mark">"</span>
        <div className="valufin-rsk-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-rsk-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-rsk-panel">
        <div className="valufin-rsk-quiz-q">{q.q}</div>
        <div className="valufin-rsk-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-rsk-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-rsk-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-rsk-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-rsk-takeaway-rule red">
        <div className="valufin-rsk-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-rsk-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function RiskManagement() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [activeType, setActiveType] = useState('market');
  const [beta, setBeta] = useState(1.2);
  const [marketMove, setMarketMove] = useState(5);
  const [activeHedge, setActiveHedge] = useState('options');
  const [ret, setRet] = useState(10);
  const [riskFree, setRiskFree] = useState(4);
  const [stddev, setStddev] = useState(12);
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
    <div style={{ minHeight: '100vh', backgroundImage: 'radial-gradient(rgba(237,235,228,0.06) 1px, transparent 1px)', backgroundSize: '22px 22px' }}>
      <div className="valufin-lesson-topbar">
        <Breadcrumb items={view === 'list'
          ? [{ label: 'Wealth & Asset Management', path: '/wam' }, { label: 'Risk Management' }]
          : [{ label: 'Wealth & Asset Management', path: '/wam' }, { label: 'Risk Management', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill high-value">High-value</span>
            <span className="valufin-ticker-caption">RSK · RISK MANAGEMENT</span>
          </div>
          <h1 className="valufin-archivo-h1">Risk<br />Management</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Volatility, drawdowns, and how advisors actually measure and manage downside
            risk — beyond just "don't lose money."
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
          <div className="valufin-lesson-detail-eyebrow">RISK MANAGEMENT · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 activeType={activeType} setActiveType={setActiveType} />}
          {activeIndex === 1 && <Lesson2 beta={beta} setBeta={setBeta} marketMove={marketMove} setMarketMove={setMarketMove} />}
          {activeIndex === 2 && <Lesson3 activeHedge={activeHedge} setActiveHedge={setActiveHedge} />}
          {activeIndex === 3 && <Lesson4 ret={ret} setRet={setRet} riskFree={riskFree} setRiskFree={setRiskFree} stddev={stddev} setStddev={setStddev} />}
          {activeIndex === 4 && <Lesson5 quizIndex={quizIndex} setQuizIndex={setQuizIndex} picked={picked} setPicked={setPicked} />}

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
