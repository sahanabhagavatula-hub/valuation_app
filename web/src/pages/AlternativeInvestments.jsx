import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'The six categories',
    minutes: 6,
    kind: 'interactive',
    body1: '"Alternatives" is a catch-all for anything outside public stocks and bonds — each category trades liquidity and transparency for a different kind of return profile.',
    body2: 'Click each category below to see its typical liquidity horizon and return driver.',
    takeaway: "Every alternative asset class asks the same question in a different form: how much liquidity are you willing to give up, and for what kind of return in exchange?",
  },
  {
    title: 'The illiquidity premium',
    minutes: 6,
    kind: 'interactive',
    body1: "Investors accept lower liquidity — meaning they can't easily sell — in exchange for potentially higher returns. That tradeoff is the core justification for the entire asset class.",
    body2: "Drag the lockup period below and watch the illustrative premium demanded for accepting it grow.",
    takeaway: "The illiquidity premium isn't free money — it's compensation for genuinely giving something up (the ability to exit on your own schedule), and it only shows up for investors who can actually afford to lock up capital that long.",
  },
  {
    title: 'Why allocate to alternatives at all',
    minutes: 5,
    kind: 'interactive',
    body1: 'Institutions and high-net-worth investors allocate to alternatives for reasons beyond just "higher returns."',
    body2: 'Click each reason below.',
    takeaway: 'Alternatives are attractive mainly for their low correlation to public markets — that diversification benefit often matters as much as the return potential itself.',
  },
  {
    title: 'Fee structures: "2 and 20"',
    minutes: 6,
    kind: 'activity',
    body1: 'The standard alternative-fund fee structure is a 2% annual management fee plus 20% of profits above a hurdle — "2 and 20."',
    body2: 'Adjust fund size and gross return below to see the fee math in dollars.',
    takeaway: 'The structure is designed to align incentives — the manager earns a base fee to operate, but the bigger payoff only comes if investors actually make money above the hurdle.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: '"Why would an investor allocate to alternatives over public markets?" is the question this whole topic is building toward.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'Illiquidity premium, diversification, and return potential — in that structure — is the answer that actually demonstrates understanding, not just vocabulary.',
  },
];

const CATEGORIES = [
  { id: 'pe', label: 'PRIVATE EQUITY', color: '#4FC3C7', detail: 'Multi-year lockups (often 7-10 years). Return driven by operational improvement and leverage on acquired companies.' },
  { id: 'hf', label: 'HEDGE FUNDS', color: '#C4B79A', detail: 'Ranges from monthly to multi-year lockups depending on strategy. Return driven by manager skill across long/short, macro, or event-driven strategies.' },
  { id: 're', label: 'REAL ESTATE', color: '#D9694F', detail: 'Illiquid, often years to exit a direct holding. Return driven by rental income plus property appreciation.' },
  { id: 'credit', label: 'PRIVATE CREDIT', color: '#86AE9E', detail: 'Multi-year loan terms. Return driven by interest income at a premium to public debt, compensating for illiquidity and credit risk.' },
  { id: 'commodities', label: 'COMMODITIES', color: '#a389c9', detail: 'Can be liquid (futures) or illiquid (direct holdings). Return driven by supply/demand and often used as an inflation hedge.' },
  { id: 'vc', label: 'VENTURE CAPITAL', color: '#e0b15c', detail: 'Very long lockups (often 10+ years). Return driven by a small number of large winners offsetting many failures.' },
];

const REASONS = [
  { id: 'diversification', label: 'DIVERSIFICATION', detail: 'Low correlation to public markets means alternatives often hold up (or move differently) when stocks and bonds fall together.' },
  { id: 'uncorrelated', label: 'UNCORRELATED RETURNS', detail: "Return drivers (operational improvement, lending spreads, property income) are structurally different from public market direction." },
  { id: 'potential', label: 'HIGHER RETURN POTENTIAL', detail: 'Compensation for illiquidity and complexity can translate into higher expected returns than comparable public exposures.' },
];

const QUIZ = [
  { q: 'What is the core justification for accepting an illiquid alternative investment?', choices: ['Alternatives are always safer than public markets', 'Investors accept lower liquidity in exchange for potentially higher returns', 'Alternatives have no fees'], correct: 1, explain: 'Correct — the illiquidity premium is the central trade being made: give up the ability to exit on demand, get compensated with return potential.' },
  { q: 'In a standard "2 and 20" fee structure, what does the "20" represent?', choices: ['20% annual management fee', "20% of profits above a hurdle, paid to the manager", '20-year lockup period'], correct: 1, explain: 'Correct — the 2% is the management fee; the 20% is the performance fee (carry) on profits, aligning manager incentives with investor gains.' },
  { q: 'Why do alternatives improve diversification even when they carry real risk on their own?', choices: ['They have no risk at all', 'Their returns are driven by different factors than public markets, so they don\'t all fall together', 'Diversification doesn\'t apply to alternatives'], correct: 1, explain: 'Correct — low correlation to public markets is what makes them useful diversifiers, independent of whether each one is individually risky.' },
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

function Lesson1({ activeCat, setActiveCat }) {
  const active = CATEGORIES.find((c) => c.id === activeCat) || CATEGORIES[0];
  return (
    <>
      <div className="valufin-alt-eyebrow">CLICK EACH CATEGORY →</div>
      <div className="valufin-alt-criteria-row">
        {CATEGORIES.map((c) => (
          <button key={c.id} className={`valufin-alt-criteria-card${c.id === activeCat ? ' active' : ''}`} style={c.id === activeCat ? { borderColor: c.color, background: `${c.color}18` } : undefined} onClick={() => setActiveCat(c.id)}>
            <div className="valufin-alt-criteria-label" style={{ color: c.color }}>{c.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-alt-detail">
        <div className="valufin-alt-detail-head" style={{ color: active.color }}>{active.label}</div>
        <p className="valufin-alt-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-alt-takeaway-terminal">
        <div className="valufin-alt-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-alt-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ lockup, setLockup }) {
  const premium = (lockup * 0.8).toFixed(1);
  return (
    <>
      <div className="valufin-alt-eyebrow">DRAG THE LOCKUP PERIOD →</div>
      <div className="valufin-alt-panel">
        <div className="valufin-alt-row"><span className="valufin-alt-row-label">LOCKUP PERIOD</span><span className="valufin-alt-row-value">{lockup} years</span></div>
        <input className="valufin-alt-range" type="range" min={1} max={10} value={lockup} onChange={(e) => setLockup(Number(e.target.value))} />
        <div className="valufin-alt-result">
          <div className="valufin-alt-result-label">ILLUSTRATIVE ILLIQUIDITY PREMIUM DEMANDED</div>
          <div className="valufin-alt-result-value">+{premium}%/yr</div>
          <div className="valufin-alt-result-verdict">Over a comparable liquid public-market alternative.</div>
        </div>
      </div>
      <div className="valufin-alt-takeaway-clay">
        <span className="valufin-alt-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="1.5" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
        </span>
        <div className="valufin-alt-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activeReason, setActiveReason }) {
  const active = REASONS.find((r) => r.id === activeReason) || REASONS[0];
  return (
    <>
      <div className="valufin-alt-eyebrow">CLICK EACH REASON →</div>
      <div className="valufin-alt-tabs">
        {REASONS.map((r) => (
          <button key={r.id} className={`valufin-alt-tab${activeReason === r.id ? ' active' : ''}`} onClick={() => setActiveReason(r.id)}>{r.label}</button>
        ))}
      </div>
      <div className="valufin-alt-panel">
        <p className="valufin-alt-panel-body">{active.detail}</p>
      </div>
      <div className="valufin-alt-takeaway-dashed">
        <span className="valufin-alt-takeaway-dashed-check">✓</span>
        <div className="valufin-alt-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ fundSize, setFundSize, grossReturnPct, setGrossReturnPct }) {
  const grossProfit = fundSize * (grossReturnPct / 100);
  const managementFee = fundSize * 0.02;
  const performanceFee = Math.max(0, grossProfit) * 0.2;
  const netToInvestors = grossProfit - managementFee - performanceFee;
  return (
    <>
      <div className="valufin-alt-eyebrow">ADJUST FUND SIZE & RETURN →</div>
      <div className="valufin-alt-panel">
        <div className="valufin-alt-row"><span className="valufin-alt-row-label">FUND SIZE</span><span className="valufin-alt-row-value">${fundSize}M</span></div>
        <input className="valufin-alt-range" type="range" min={50} max={500} step={10} value={fundSize} onChange={(e) => setFundSize(Number(e.target.value))} />
        <div className="valufin-alt-row" style={{ marginTop: 14 }}><span className="valufin-alt-row-label">GROSS RETURN</span><span className="valufin-alt-row-value">{grossReturnPct}%</span></div>
        <input className="valufin-alt-range" type="range" min={0} max={30} value={grossReturnPct} onChange={(e) => setGrossReturnPct(Number(e.target.value))} />
        <div className="valufin-alt-fee-bridge">
          <span>Gross profit ${grossProfit.toFixed(1)}M</span>
          <span>− Mgmt fee (2%) ${managementFee.toFixed(1)}M</span>
          <span>− Perf fee (20%) ${performanceFee.toFixed(1)}M</span>
        </div>
        <div className="valufin-alt-result">
          <div className="valufin-alt-result-label">NET TO INVESTORS</div>
          <div className="valufin-alt-result-value">${netToInvestors.toFixed(1)}M</div>
        </div>
      </div>
      <div className="valufin-alt-takeaway-quote">
        <span className="valufin-alt-takeaway-quote-mark">"</span>
        <div className="valufin-alt-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-alt-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-alt-panel">
        <div className="valufin-alt-quiz-q">{q.q}</div>
        <div className="valufin-alt-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-alt-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-alt-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-alt-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-alt-takeaway-rule red">
        <div className="valufin-alt-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-alt-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function AlternativeInvestments() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [activeCat, setActiveCat] = useState('pe');
  const [lockup, setLockup] = useState(5);
  const [activeReason, setActiveReason] = useState('diversification');
  const [fundSize, setFundSize] = useState(200);
  const [grossReturnPct, setGrossReturnPct] = useState(15);
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
        <button className="valufin-lesson-topbar-back" onClick={() => (view === 'list' ? navigate('/wam') : backToTopics())}>
          ← {view === 'list' ? 'Wealth & Asset Management' : 'Alternative Investments'}
        </button>
        <span className="valufin-lesson-topbar-tag">ALT · ALTERNATIVE INVESTMENTS</span>
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill good-to-have">Good to have</span>
            <span className="valufin-ticker-caption">ALT · ALTERNATIVE INVESTMENTS</span>
          </div>
          <h1 className="valufin-archivo-h1">Alternative<br />Investments</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Private equity, real estate, and hedge fund strategies as portfolio pieces — the
            illiquidity premium, and why institutions allocate to them at all.
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
          <div className="valufin-lesson-detail-eyebrow">ALTERNATIVE INVESTMENTS · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 activeCat={activeCat} setActiveCat={setActiveCat} />}
          {activeIndex === 1 && <Lesson2 lockup={lockup} setLockup={setLockup} />}
          {activeIndex === 2 && <Lesson3 activeReason={activeReason} setActiveReason={setActiveReason} />}
          {activeIndex === 3 && <Lesson4 fundSize={fundSize} setFundSize={setFundSize} grossReturnPct={grossReturnPct} setGrossReturnPct={setGrossReturnPct} />}
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
