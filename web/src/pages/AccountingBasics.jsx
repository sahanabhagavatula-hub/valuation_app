import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A', '#D9694F'];

const LESSONS = [
  {
    title: 'The accounting equation',
    minutes: 5,
    kind: 'interactive',
    body1: 'Assets = Liabilities + Equity. Every transaction a company records has to keep this equation true — it\'s the mathematical backbone of every financial statement.',
    body2: 'Adjust assets and liabilities below — equity always fills in the remainder.',
    takeaway: "If the accounting equation doesn't balance, something in the books is wrong — this is why it's the first check anyone runs on a set of financial statements.",
  },
  {
    title: 'Debits and credits, conceptually',
    minutes: 5,
    kind: 'interactive',
    body1: "Keep this conceptual, not mechanical — the goal is understanding financial statements, not passing a bookkeeping exam.",
    body2: 'Click each account type below to see what increases it.',
    takeaway: "You don't need to journal-entry your way through this topic — you need to know that assets and expenses increase with debits, while liabilities, equity, and revenue increase with credits.",
  },
  {
    title: 'Accrual vs. cash accounting',
    minutes: 6,
    kind: 'interactive',
    body1: 'Accrual accounting records revenue and expenses when earned or incurred — not when cash actually changes hands. This is the reason Net Income ≠ Cash Flow.',
    body2: 'Toggle between the accrual view and the cash view of the same sale.',
    takeaway: "A sale made on credit shows up as revenue immediately under accrual accounting — but the cash doesn't move until the customer actually pays. That timing gap is the whole reason a separate cash flow statement exists.",
  },
  {
    title: 'Revenue recognition, briefly',
    minutes: 4,
    kind: 'interactive',
    body1: 'Revenue is recognized when it\'s actually earned — typically when a good is delivered or a service is performed — not necessarily when the invoice is sent or paid.',
    body2: 'Click through the example below.',
    takeaway: 'A software company selling a 12-month contract doesn\'t recognize all the revenue on day one — it recognizes 1/12th each month as the service is actually delivered.',
  },
  {
    title: 'Depreciation methods',
    minutes: 6,
    kind: 'interactive',
    body1: 'Straight-line depreciation (equal expense every year) is the default assumption to know cold. Accelerated methods front-load more expense into earlier years.',
    body2: "Adjust the asset's cost and useful life below.",
    takeaway: 'Straight-line is the assumption to reach for by default — know that accelerated methods exist and front-load expense, but you rarely need the deep mechanics unless the role is accounting-heavy.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: '"What\'s the difference between cash and accrual accounting?" is a frequently asked foundational question.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'Always connect accrual accounting back to why Net Income and Cash Flow differ — that\'s the answer interviewers are actually listening for.',
  },
];

const ACCOUNT_TYPES = [
  { id: 'assets', label: 'ASSETS', increases: 'Debit', detail: 'Cash, receivables, PP&E — assets increase with a debit and decrease with a credit.' },
  { id: 'liabilities', label: 'LIABILITIES', increases: 'Credit', detail: 'Debt, payables — liabilities increase with a credit and decrease with a debit.' },
  { id: 'equity', label: 'EQUITY', increases: 'Credit', detail: 'Retained earnings, common stock — equity increases with a credit, same direction as liabilities.' },
  { id: 'revenue', label: 'REVENUE', increases: 'Credit', detail: 'Revenue increases equity indirectly through retained earnings, so it also increases with a credit.' },
  { id: 'expenses', label: 'EXPENSES', increases: 'Debit', detail: 'Expenses reduce equity, so — like assets — they increase with a debit.' },
];

const QUIZ = [
  { q: 'Why does accrual accounting cause Net Income to differ from actual cash flow?', choices: ['It doesn\'t — they\'re always identical', 'Revenue and expenses are recorded when earned/incurred, not when cash moves', 'Accrual accounting ignores expenses entirely'], correct: 1, explain: 'Correct — the timing gap between recognizing a transaction and the cash actually moving is exactly why a separate cash flow statement exists.' },
  { q: 'What does the accounting equation (Assets = Liabilities + Equity) actually check?', choices: ['Whether the company is profitable', 'Whether the books are internally consistent', 'The company\'s stock price'], correct: 1, explain: 'Correct — it\'s a structural check, not a profitability measure. If it doesn\'t balance, something in the recording is wrong.' },
  { q: 'What\'s the default depreciation method to know cold?', choices: ['Straight-line — equal expense every year', 'Accelerated — always front-loaded', 'No depreciation is recorded until the asset is sold'], correct: 0, explain: 'Correct — straight-line is the standard default assumption; accelerated methods exist but are a secondary detail for most interviews.' },
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

function Lesson1({ assets, setAssets, liabilities, setLiabilities }) {
  const equity = assets - liabilities;
  return (
    <>
      <div className="valufin-acb-eyebrow">ADJUST ASSETS & LIABILITIES →</div>
      <div className="valufin-acb-panel">
        <div className="valufin-acb-row"><span className="valufin-acb-row-label">ASSETS</span><span className="valufin-acb-row-value">${assets}M</span></div>
        <input className="valufin-acb-range" type="range" min={100} max={500} value={assets} onChange={(e) => setAssets(Number(e.target.value))} />
        <div className="valufin-acb-row" style={{ marginTop: 14 }}><span className="valufin-acb-row-label">LIABILITIES</span><span className="valufin-acb-row-value">${liabilities}M</span></div>
        <input className="valufin-acb-range" type="range" min={0} max={400} value={liabilities} onChange={(e) => setLiabilities(Math.min(Number(e.target.value), assets))} />
        <div className="valufin-acb-result">
          <div className="valufin-acb-result-label">EQUITY (ALWAYS THE REMAINDER)</div>
          <div className="valufin-acb-result-value">${equity}M</div>
          <div className="valufin-acb-result-verdict">${assets}M = ${liabilities}M + ${equity}M</div>
        </div>
      </div>
      <div className="valufin-acb-takeaway-terminal">
        <div className="valufin-acb-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-acb-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ activeType, setActiveType }) {
  const active = ACCOUNT_TYPES.find((t) => t.id === activeType) || ACCOUNT_TYPES[0];
  return (
    <>
      <div className="valufin-acb-eyebrow">CLICK EACH ACCOUNT TYPE →</div>
      <div className="valufin-acb-criteria-row">
        {ACCOUNT_TYPES.map((t) => (
          <button key={t.id} className={`valufin-acb-criteria-card${t.id === activeType ? ' active' : ''}`} onClick={() => setActiveType(t.id)}>
            <div className="valufin-acb-criteria-label">{t.label}</div>
            <div className="valufin-acb-criteria-sub">↑ {t.increases}</div>
          </button>
        ))}
      </div>
      <div className="valufin-acb-detail">
        <div className="valufin-acb-detail-head">{active.label} — INCREASES WITH {active.increases.toUpperCase()}</div>
        <p className="valufin-acb-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-acb-takeaway-clay">
        <span className="valufin-acb-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </span>
        <div className="valufin-acb-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ isAccrual, setIsAccrual }) {
  return (
    <>
      <div className="valufin-acb-eyebrow">TOGGLE THE VIEW →</div>
      <div className="valufin-acb-tabs">
        <button className={`valufin-acb-tab${isAccrual ? ' active' : ''}`} onClick={() => setIsAccrual(true)}>ACCRUAL</button>
        <button className={`valufin-acb-tab clay${!isAccrual ? ' active' : ''}`} onClick={() => setIsAccrual(false)}>CASH</button>
      </div>
      <div className="valufin-acb-panel">
        <div className="valufin-acb-scenario">A $50,000 sale is made on credit in January. The customer pays in February.</div>
        <div className="valufin-acb-return-grid">
          <div className="valufin-acb-return-box">
            <div className="valufin-acb-return-label">JANUARY</div>
            <div className="valufin-acb-return-value" style={{ color: isAccrual ? '#3FBF6F' : '#8F887A' }}>{isAccrual ? '$50,000 revenue' : '$0 cash'}</div>
          </div>
          <div className="valufin-acb-return-box">
            <div className="valufin-acb-return-label">FEBRUARY</div>
            <div className="valufin-acb-return-value" style={{ color: isAccrual ? '#8F887A' : '#3FBF6F' }}>{isAccrual ? '$0 revenue (already booked)' : '$50,000 cash'}</div>
          </div>
        </div>
      </div>
      <div className="valufin-acb-takeaway-dashed">
        <span className="valufin-acb-takeaway-dashed-check">✓</span>
        <div className="valufin-acb-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ monthsRecognized, setMonthsRecognized }) {
  const contractValue = 12000;
  const monthlyRecognized = contractValue / 12;
  const recognizedSoFar = monthlyRecognized * monthsRecognized;
  const deferred = contractValue - recognizedSoFar;
  return (
    <>
      <div className="valufin-acb-eyebrow">ADVANCE THE CONTRACT →</div>
      <div className="valufin-acb-panel">
        <div className="valufin-acb-scenario">A $12,000, 12-month software contract is signed on day one, fully prepaid.</div>
        <div className="valufin-acb-row" style={{ marginTop: 14 }}><span className="valufin-acb-row-label">MONTHS INTO THE CONTRACT</span><span className="valufin-acb-row-value">{monthsRecognized}</span></div>
        <input className="valufin-acb-range" type="range" min={0} max={12} value={monthsRecognized} onChange={(e) => setMonthsRecognized(Number(e.target.value))} />
        <div className="valufin-acb-return-grid">
          <div className="valufin-acb-return-box">
            <div className="valufin-acb-return-label">REVENUE RECOGNIZED</div>
            <div className="valufin-acb-return-value" style={{ color: '#3FBF6F' }}>${recognizedSoFar.toLocaleString()}</div>
          </div>
          <div className="valufin-acb-return-box">
            <div className="valufin-acb-return-label">STILL DEFERRED</div>
            <div className="valufin-acb-return-value" style={{ color: '#C4B79A' }}>${deferred.toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="valufin-acb-takeaway-quote">
        <span className="valufin-acb-takeaway-quote-mark">"</span>
        <div className="valufin-acb-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ cost, setCost, life, setLife }) {
  const annualDep = cost / life;
  return (
    <>
      <div className="valufin-acb-eyebrow">ADJUST COST & USEFUL LIFE →</div>
      <div className="valufin-acb-panel">
        <div className="valufin-acb-row"><span className="valufin-acb-row-label">ASSET COST</span><span className="valufin-acb-row-value">${cost}K</span></div>
        <input className="valufin-acb-range" type="range" min={50} max={500} step={10} value={cost} onChange={(e) => setCost(Number(e.target.value))} />
        <div className="valufin-acb-row" style={{ marginTop: 14 }}><span className="valufin-acb-row-label">USEFUL LIFE</span><span className="valufin-acb-row-value">{life} years</span></div>
        <input className="valufin-acb-range" type="range" min={2} max={20} value={life} onChange={(e) => setLife(Number(e.target.value))} />
        <div className="valufin-acb-result">
          <div className="valufin-acb-result-label">STRAIGHT-LINE ANNUAL DEPRECIATION</div>
          <div className="valufin-acb-result-value">${annualDep.toFixed(1)}K/yr</div>
          <div className="valufin-acb-result-verdict">Accelerated methods would front-load more expense into the earliest years instead of spreading it evenly.</div>
        </div>
      </div>
      <div className="valufin-acb-takeaway-rule gold">
        <div className="valufin-acb-takeaway-rule-label" style={{ color: '#C4B79A' }}>KEY TAKEAWAY</div>
        <div className="valufin-acb-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

function Lesson6({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-acb-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-acb-panel">
        <div className="valufin-acb-quiz-q">{q.q}</div>
        <div className="valufin-acb-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-acb-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-acb-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-acb-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-acb-takeaway-rule red">
        <div className="valufin-acb-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-acb-takeaway-rule-body">{LESSONS[5].takeaway}</div>
      </div>
    </>
  );
}

export default function AccountingBasics() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);

  const [assets, setAssets] = useState(300);
  const [liabilities, setLiabilities] = useState(180);
  const [activeType, setActiveType] = useState('assets');
  const [isAccrual, setIsAccrual] = useState(true);
  const [monthsRecognized, setMonthsRecognized] = useState(3);
  const [cost, setCost] = useState(200);
  const [life, setLife] = useState(10);
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
          ? [{ label: 'Corporate Finance', path: '/corp-finance' }, { label: 'Accounting Basics' }]
          : [{ label: 'Corporate Finance', path: '/corp-finance' }, { label: 'Accounting Basics', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill high-value">High-value</span>
            <span className="valufin-ticker-caption">ACB · ACCOUNTING BASICS</span>
          </div>
          <h1 className="valufin-archivo-h1">Accounting<br />Basics</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Debits/credits, accruals, depreciation, working capital — the accounting
            foundation underneath every financial statement.
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
          <div className="valufin-lesson-detail-eyebrow">ACCOUNTING BASICS · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 assets={assets} setAssets={setAssets} liabilities={liabilities} setLiabilities={setLiabilities} />}
          {activeIndex === 1 && <Lesson2 activeType={activeType} setActiveType={setActiveType} />}
          {activeIndex === 2 && <Lesson3 isAccrual={isAccrual} setIsAccrual={setIsAccrual} />}
          {activeIndex === 3 && <Lesson4 monthsRecognized={monthsRecognized} setMonthsRecognized={setMonthsRecognized} />}
          {activeIndex === 4 && <Lesson5 cost={cost} setCost={setCost} life={life} setLife={setLife} />}
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
