import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'The major philosophies',
    minutes: 6,
    kind: 'interactive',
    body1: "There isn't one right investment philosophy — there are several coherent, defensible ones. Interviewers care less about which you pick than whether you can defend it.",
    body2: 'Click each philosophy below to see its core belief and when it tends to work best.',
    takeaway: "Candidates need their own coherent, defensible philosophy — not a list of every style recited back, but a clear point of view they can actually support.",
  },
  {
    title: 'Active vs. passive: the fee-drag math',
    minutes: 7,
    kind: 'interactive',
    body1: 'Passive wins on fees and consistency in efficient markets; active can add value in less efficient or niche corners of the market. Both sides of this debate are legitimate — know both.',
    body2: 'Adjust the fee gap and time horizon below to see how much a fee difference actually costs over time.',
    takeaway: "A 1% annual fee gap sounds small — compounded over decades on real money, it isn't. Active management has to clear that bar just to break even with passive, before it can add any value at all.",
  },
  {
    title: 'Process over labels',
    minutes: 5,
    kind: 'interactive',
    body1: 'Two investors can both call themselves "value investors" and mean completely different things. What actually matters is the process behind the label.',
    body2: 'Click each investor profile to see how the same label hides a very different process.',
    takeaway: "Philosophy should connect to process — how you actually pick investments — not just a label. 'I believe in value investing' with nothing behind it is not an answer.",
  },
  {
    title: 'Articulate your own philosophy',
    minutes: 6,
    kind: 'activity',
    body1: '"What\'s your investment philosophy?" is asked constantly in WAM and hedge fund interviews. It needs a rehearsed, specific, example-backed answer — not "I believe in diversification."',
    body2: 'Build your answer by picking one component from each row below.',
    takeaway: 'A real answer names a philosophy, a process, and a concrete example in under 30 seconds — vague answers are the single most common reason this question goes badly.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: 'A few questions this topic gets asked in almost every form.',
    body2: 'Pick the strongest answer for each.',
    takeaway: 'Know both sides of active-vs-passive, have a specific example ready, and never answer with a label alone — process is what interviewers are actually listening for.',
  },
];

const PHILOSOPHIES = [
  { id: 'value', label: 'VALUE', color: '#4FC3C7', detail: 'Buy businesses trading below their intrinsic worth, usually measured against earnings or book value. Works best when the market is mispricing something out of fear or neglect, not because the business is actually broken.' },
  { id: 'growth', label: 'GROWTH', color: '#C4B79A', detail: "Pay a premium multiple for above-average, durable growth. Works best when a business can compound revenue and earnings for far longer than the market currently prices in." },
  { id: 'income', label: 'INCOME', color: '#D9694F', detail: 'Prioritize steady, reliable cash distributions — dividends, coupons — over capital appreciation. Works best for investors who need current income, not just long-term growth.' },
  { id: 'passive', label: 'INDEX / PASSIVE', color: '#86AE9E', detail: 'Own the market broadly at minimal cost rather than trying to beat it. Works best in efficient, well-covered markets where consistent stock-picking edge is hard to sustain after fees.' },
  { id: 'quant', label: 'QUANT / SYSTEMATIC', color: '#a389c9', detail: 'Use rules-based, data-driven models to find and exploit statistical edges at scale. Works best when an edge can be defined precisely enough to code, test, and repeat without emotion.' },
];

const PROCESS_EXAMPLES = [
  { id: 'a', label: 'INVESTOR A — "VALUE"', detail: 'Screens for low P/E and P/B ratios, buys statistically cheap stocks in bulk, holds a large diversified basket, relies on mean reversion across the group.' },
  { id: 'b', label: 'INVESTOR B — "VALUE"', detail: 'Deeply researches 5-10 businesses a year, builds a specific thesis for why the market is wrong about each one, holds concentrated positions for years.' },
];

const PHIL_PICKS = {
  philosophy: ['Value', 'Growth', 'A blend, depending on the setup'],
  process: ['Deep single-company research', 'Systematic/quantitative screening', 'Macro-driven top-down calls'],
};

const QUIZ = [
  { q: 'In an efficient, heavily-covered market, which approach tends to win after fees?', choices: ['Active management, because more research always wins', 'Passive, because consistent stock-picking edge is hard to sustain after fees', 'Neither — cash is always best'], correct: 1, explain: 'Correct — in efficient markets, the odds tilt toward low-cost passive exposure once fees are netted out, even though skilled active managers can still add value in less efficient corners.' },
  { q: 'What actually makes an investment philosophy interview-ready?', choices: ['Naming every style you know', 'A clear point of view connected to a real process and example', 'Agreeing with whatever the interviewer seems to believe'], correct: 1, explain: "Correct — interviewers are listening for a coherent, defensible process, not a survey of every philosophy that exists." },
  { q: 'Two candidates both say "I\'m a value investor." What actually distinguishes a strong answer from a weak one?', choices: ['Using more finance vocabulary', 'Having a specific, describable process behind the label', 'Picking a less common philosophy'], correct: 1, explain: 'Correct — the label alone tells an interviewer almost nothing; the process behind it is where the real signal is.' },
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

function Lesson1({ activePhil, setActivePhil }) {
  const active = PHILOSOPHIES.find((p) => p.id === activePhil) || PHILOSOPHIES[0];
  return (
    <>
      <div className="valufin-ivp-eyebrow">CLICK EACH PHILOSOPHY →</div>
      <div className="valufin-ivp-criteria-row">
        {PHILOSOPHIES.map((p) => (
          <button key={p.id} className={`valufin-ivp-criteria-card${p.id === activePhil ? ' active' : ''}`} style={p.id === activePhil ? { borderColor: p.color, background: `${p.color}18` } : undefined} onClick={() => setActivePhil(p.id)}>
            <div className="valufin-ivp-criteria-label" style={{ color: p.color }}>{p.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-ivp-detail">
        <div className="valufin-ivp-detail-head" style={{ color: active.color }}>{active.label}</div>
        <p className="valufin-ivp-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-ivp-takeaway-terminal">
        <div className="valufin-ivp-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-ivp-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ feeGap, setFeeGap, years, setYears }) {
  const aum = 100000;
  const grossReturn = 0.07;
  const passiveFee = 0.001;
  const activeFee = passiveFee + feeGap / 100;
  const passiveEnd = aum * Math.pow(1 + grossReturn - passiveFee, years);
  const activeEnd = aum * Math.pow(1 + grossReturn - activeFee, years);
  const gap = Math.round(passiveEnd - activeEnd);
  return (
    <>
      <div className="valufin-ivp-eyebrow">DRAG THE FEE GAP & YEARS →</div>
      <div className="valufin-ivp-panel">
        <div className="valufin-ivp-row"><span className="valufin-ivp-row-label">ACTIVE FEE PREMIUM OVER PASSIVE</span><span className="valufin-ivp-row-value" style={{ color: '#D9694F' }}>{feeGap.toFixed(1)}%</span></div>
        <input className="valufin-ivp-range" type="range" min={0.2} max={2} step={0.1} value={feeGap} onChange={(e) => setFeeGap(Number(e.target.value))} />
        <div className="valufin-ivp-row" style={{ marginTop: 14 }}><span className="valufin-ivp-row-label">TIME HORIZON</span><span className="valufin-ivp-row-value">{years} yrs</span></div>
        <input className="valufin-ivp-range" type="range" min={5} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} />
        <div className="valufin-ivp-result">
          <div className="valufin-ivp-result-label">COST OF THE FEE GAP ON $100K, SAME GROSS RETURN</div>
          <div className="valufin-ivp-result-value">${gap.toLocaleString()}</div>
          <div className="valufin-ivp-result-verdict">Active would need to beat the market by this fee gap, every year, just to tie passive.</div>
        </div>
      </div>
      <div className="valufin-ivp-takeaway-clay">
        <span className="valufin-ivp-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
        </span>
        <div className="valufin-ivp-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activeInvestor, setActiveInvestor }) {
  const active = PROCESS_EXAMPLES.find((p) => p.id === activeInvestor) || PROCESS_EXAMPLES[0];
  return (
    <>
      <div className="valufin-ivp-eyebrow">CLICK EACH INVESTOR →</div>
      <div className="valufin-ivp-tabs">
        {PROCESS_EXAMPLES.map((p) => (
          <button key={p.id} className={`valufin-ivp-tab${activeInvestor === p.id ? ' active' : ''}`} onClick={() => setActiveInvestor(p.id)}>{p.label}</button>
        ))}
      </div>
      <div className="valufin-ivp-panel">
        <p className="valufin-ivp-panel-body">{active.detail}</p>
      </div>
      <div className="valufin-ivp-takeaway-dashed">
        <span className="valufin-ivp-takeaway-dashed-check">✓</span>
        <div className="valufin-ivp-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ picks, setPicks }) {
  function pick(row, value) { setPicks({ ...picks, [row]: value }); }
  const built = picks.philosophy && picks.process;
  return (
    <>
      <div className="valufin-ivp-eyebrow">BUILD YOUR ANSWER →</div>
      <div className="valufin-ivp-panel">
        {Object.entries(PHIL_PICKS).map(([row, options]) => (
          <div key={row} style={{ marginBottom: 18 }}>
            <div className="valufin-ivp-row-label" style={{ marginBottom: 8, textTransform: 'uppercase' }}>{row}</div>
            <div className="valufin-ivp-pick-row">
              {options.map((o) => (
                <button key={o} className={`valufin-ivp-pick-choice${picks[row] === o ? ' active' : ''}`} onClick={() => pick(row, o)}>{o}</button>
              ))}
            </div>
          </div>
        ))}
        {built && (
          <div className="valufin-ivp-result">
            <div className="valufin-ivp-result-label">YOUR STARTING ANSWER</div>
            <div className="valufin-ivp-panel-body" style={{ marginTop: 8 }}>"My philosophy leans {picks.philosophy.toLowerCase()}, built on {picks.process.toLowerCase()} — I look for situations where that edge is most likely to hold up."</div>
          </div>
        )}
      </div>
      <div className="valufin-ivp-takeaway-quote">
        <span className="valufin-ivp-takeaway-quote-mark">"</span>
        <div className="valufin-ivp-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-ivp-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-ivp-panel">
        <div className="valufin-ivp-quiz-q">{q.q}</div>
        <div className="valufin-ivp-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-ivp-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-ivp-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-ivp-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-ivp-takeaway-rule red">
        <div className="valufin-ivp-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-ivp-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function InvestmentPhilosophy() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [activePhil, setActivePhil] = useState('value');
  const [feeGap, setFeeGap] = useState(1);
  const [years, setYears] = useState(20);
  const [activeInvestor, setActiveInvestor] = useState('a');
  const [picks, setPicks] = useState({});
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
          ? [{ label: 'Wealth & Asset Management', path: '/wam' }, { label: 'Investment Philosophy' }]
          : [{ label: 'Wealth & Asset Management', path: '/wam' }, { label: 'Investment Philosophy', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill high-value">High-value</span>
            <span className="valufin-ticker-caption">IVP · INVESTMENT PHILOSOPHY</span>
          </div>
          <h1 className="valufin-archivo-h1">Investment<br />Philosophy</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Active vs. passive, value vs. growth, and how to articulate a coherent point of
            view when someone asks "what's your philosophy?"
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
          <div className="valufin-lesson-detail-eyebrow">INVESTMENT PHILOSOPHY · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 activePhil={activePhil} setActivePhil={setActivePhil} />}
          {activeIndex === 1 && <Lesson2 feeGap={feeGap} setFeeGap={setFeeGap} years={years} setYears={setYears} />}
          {activeIndex === 2 && <Lesson3 activeInvestor={activeInvestor} setActiveInvestor={setActiveInvestor} />}
          {activeIndex === 3 && <Lesson4 picks={picks} setPicks={setPicks} />}
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
