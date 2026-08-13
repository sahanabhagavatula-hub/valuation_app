import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'Time value of money, refreshed',
    minutes: 5,
    kind: 'interactive',
    body1: 'Every planning conversation rests on one idea: a dollar today is worth more than a dollar later, because today\'s dollar can be invested and grow.',
    body2: 'Drag the rate and years below to see how a single dollar compounds forward.',
    takeaway: 'Discounting and compounding are the same idea run in opposite directions — future value grows a dollar forward, present value shrinks a future dollar back to today\'s terms.',
  },
  {
    title: 'The cost of waiting',
    minutes: 7,
    kind: 'activity',
    body1: 'Compounding over long horizons is the core intuition behind retirement planning. The starkest way to see it: compare starting at 25 versus starting at 35.',
    body2: 'Adjust the monthly contribution and return assumption below and watch both ending balances at 65.',
    takeaway: 'Ten years of a head start can be worth more than a decade of higher contributions later — compounding rewards time in the market more than almost anything else in planning.',
  },
  {
    title: 'Tax-efficient investing, conceptually',
    minutes: 5,
    kind: 'interactive',
    body1: "Tax efficiency isn't deep tax law — it's a small set of concepts: which accounts are tax-advantaged, and when it makes sense to realize a loss deliberately.",
    body2: 'Click each concept below for the plain-language version.',
    takeaway: 'You don\'t need to be a tax expert for this — you need to know these concepts exist and roughly what they\'re for, so you can flag them at the right moment in a client conversation.',
  },
  {
    title: 'Goals-based planning',
    minutes: 6,
    kind: 'matching',
    body1: "Match investment risk and liquidity to the timeline of each specific goal — not one blanket portfolio for every goal a client has.",
    body2: 'Match each goal below to the risk bucket that fits its timeline.',
    takeaway: 'A house down payment in 3 years and a retirement in 30 years should never sit in the same allocation — the near-term goal needs to be protected, not grown aggressively.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: 'This topic is less commonly grilled technically than IB/PE material, but shows up constantly in client-facing case scenarios.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'When a scenario mixes multiple goals with different timelines, the strong answer always separates them by time horizon before recommending anything.',
  },
];

const TAX_CONCEPTS = [
  { id: 'harvesting', label: 'TAX-LOSS HARVESTING', detail: 'Deliberately selling a losing position to realize the loss, offsetting taxable gains elsewhere — the position can often be replaced with something similar to keep market exposure.' },
  { id: 'accounts', label: 'ACCOUNT TYPES', detail: 'Tax-advantaged accounts (like a 401(k) or IRA) grow tax-deferred or tax-free — placing the right assets in the right account type reduces the drag taxes put on long-term growth.' },
];

const GOALS = [
  { id: 'house', label: 'House down payment in 3 years', correct: 'conservative' },
  { id: 'college', label: "Kid's college in 12 years", correct: 'moderate' },
  { id: 'retirement', label: 'Retirement in 30 years', correct: 'aggressive' },
];
const BUCKETS = ['conservative', 'moderate', 'aggressive'];

const QUIZ = [
  { q: 'A client wants to retire in 20 years and buy a home in 5. What should you do first?', choices: ['Recommend one blended portfolio for both goals', 'Separate the goals by time horizon and risk each one appropriately', 'Recommend maximum growth for both since more money is always better'], correct: 1, explain: "Correct — the near-term home goal needs capital protection; the long-horizon retirement goal can absorb more volatility. Blending them serves neither well." },
  { q: 'Why does starting retirement savings 10 years earlier matter so much?', choices: ['Earlier contributions are taxed less', 'Compounding has more time to work, even on smaller amounts', 'It doesn\'t matter much either way'], correct: 1, explain: 'Correct — time in the market, not contribution size alone, is the dominant driver of long-run compounding outcomes.' },
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

function Lesson1({ rate, setRate, years, setYears }) {
  const fv = Math.pow(1 + rate / 100, years);
  return (
    <>
      <div className="valufin-fpl-eyebrow">DRAG RATE AND YEARS →</div>
      <div className="valufin-fpl-panel">
        <div className="valufin-fpl-row"><span className="valufin-fpl-row-label">ANNUAL RATE</span><span className="valufin-fpl-row-value">{rate}%</span></div>
        <input className="valufin-fpl-range" type="range" min={1} max={12} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        <div className="valufin-fpl-row" style={{ marginTop: 14 }}><span className="valufin-fpl-row-label">YEARS</span><span className="valufin-fpl-row-value">{years}</span></div>
        <input className="valufin-fpl-range" type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} />
        <div className="valufin-fpl-result">
          <div className="valufin-fpl-result-label">$1 TODAY BECOMES</div>
          <div className="valufin-fpl-result-value">${fv.toFixed(2)}</div>
        </div>
      </div>
      <div className="valufin-fpl-takeaway-terminal">
        <div className="valufin-fpl-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-fpl-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ monthly, setMonthly, returnRate, setReturnRate }) {
  function fvAnnuity(years) {
    const monthlyRate = returnRate / 100 / 12;
    const months = years * 12;
    return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }
  const fv25 = fvAnnuity(40);
  const fv35 = fvAnnuity(30);
  return (
    <>
      <div className="valufin-fpl-eyebrow">ADJUST CONTRIBUTION & RETURN →</div>
      <div className="valufin-fpl-panel">
        <div className="valufin-fpl-row"><span className="valufin-fpl-row-label">MONTHLY CONTRIBUTION</span><span className="valufin-fpl-row-value">${monthly}</span></div>
        <input className="valufin-fpl-range" type="range" min={100} max={1500} step={50} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} />
        <div className="valufin-fpl-row" style={{ marginTop: 14 }}><span className="valufin-fpl-row-label">ASSUMED ANNUAL RETURN</span><span className="valufin-fpl-row-value">{returnRate}%</span></div>
        <input className="valufin-fpl-range" type="range" min={3} max={10} value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} />
        <div className="valufin-fpl-return-grid">
          <div className="valufin-fpl-return-box">
            <div className="valufin-fpl-return-label">START AT 25 (40 YRS)</div>
            <div className="valufin-fpl-return-value" style={{ color: '#4FC3C7' }}>${Math.round(fv25).toLocaleString()}</div>
          </div>
          <div className="valufin-fpl-return-box">
            <div className="valufin-fpl-return-label">START AT 35 (30 YRS)</div>
            <div className="valufin-fpl-return-value" style={{ color: '#D9694F' }}>${Math.round(fv35).toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="valufin-fpl-takeaway-clay">
        <span className="valufin-fpl-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
        </span>
        <div className="valufin-fpl-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activeConcept, setActiveConcept }) {
  const active = TAX_CONCEPTS.find((c) => c.id === activeConcept) || TAX_CONCEPTS[0];
  return (
    <>
      <div className="valufin-fpl-eyebrow">CLICK EACH CONCEPT →</div>
      <div className="valufin-fpl-tabs">
        {TAX_CONCEPTS.map((c) => (
          <button key={c.id} className={`valufin-fpl-tab${activeConcept === c.id ? ' active' : ''}`} onClick={() => setActiveConcept(c.id)}>{c.label}</button>
        ))}
      </div>
      <div className="valufin-fpl-panel">
        <p className="valufin-fpl-panel-body">{active.detail}</p>
      </div>
      <div className="valufin-fpl-takeaway-dashed">
        <span className="valufin-fpl-takeaway-dashed-check">✓</span>
        <div className="valufin-fpl-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ picks, setPicks }) {
  function pick(goalId, bucket) { setPicks({ ...picks, [goalId]: bucket }); }
  return (
    <>
      <div className="valufin-fpl-eyebrow">MATCH GOAL TO RISK BUCKET →</div>
      <div className="valufin-fpl-panel">
        {GOALS.map((g) => {
          const pickedBucket = picks[g.id];
          return (
            <div key={g.id} style={{ marginBottom: 18 }}>
              <div className="valufin-fpl-goal-label">{g.label}</div>
              <div className="valufin-fpl-pick-row">
                {BUCKETS.map((b) => {
                  const isPicked = pickedBucket === b;
                  const isCorrect = pickedBucket && b === g.correct;
                  let cls = 'valufin-fpl-pick-choice';
                  if (pickedBucket) { if (isCorrect) cls += ' correct'; else if (isPicked) cls += ' wrong'; }
                  return <button key={b} className={cls} onClick={() => pick(g.id, b)}>{b.toUpperCase()}</button>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="valufin-fpl-takeaway-quote">
        <span className="valufin-fpl-takeaway-quote-mark">"</span>
        <div className="valufin-fpl-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-fpl-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-fpl-panel">
        <div className="valufin-fpl-quiz-q">{q.q}</div>
        <div className="valufin-fpl-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-fpl-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-fpl-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-fpl-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-fpl-takeaway-rule red">
        <div className="valufin-fpl-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-fpl-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function FinancialPlanning() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [monthly, setMonthly] = useState(500);
  const [returnRate, setReturnRate] = useState(7);
  const [activeConcept, setActiveConcept] = useState('harvesting');
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
          ? [{ label: 'Wealth & Asset Management', path: '/wam' }, { label: 'Financial Planning Basics' }]
          : [{ label: 'Wealth & Asset Management', path: '/wam' }, { label: 'Financial Planning Basics', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill good-to-have">Good to have</span>
            <span className="valufin-ticker-caption">FPL · FINANCIAL PLANNING</span>
          </div>
          <h1 className="valufin-archivo-h1">Financial Planning<br />Basics</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Retirement planning, tax considerations, and estate basics — the client-facing
            side of wealth management interviews.
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
          <div className="valufin-lesson-detail-eyebrow">FINANCIAL PLANNING · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 rate={rate} setRate={setRate} years={years} setYears={setYears} />}
          {activeIndex === 1 && <Lesson2 monthly={monthly} setMonthly={setMonthly} returnRate={returnRate} setReturnRate={setReturnRate} />}
          {activeIndex === 2 && <Lesson3 activeConcept={activeConcept} setActiveConcept={setActiveConcept} />}
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
