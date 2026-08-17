import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'Debt vs. equity, side by side',
    minutes: 6,
    kind: 'interactive',
    body1: "Every company funds itself with some mix of debt and equity — and the two behave completely differently on cost, risk, control, and tax treatment.",
    body2: 'Click each dimension below to compare.',
    takeaway: 'Debt is cheaper and keeps ownership intact, but adds fixed obligations and financial risk. Equity is more expensive and dilutes ownership, but adds no repayment obligation. Neither is free.',
  },
  {
    title: 'Why equity costs more than debt',
    minutes: 5,
    kind: 'interactive',
    body1: 'Debt holders get paid first and get a fixed, contractual return — lower risk means they demand less compensation. Equity holders get paid last and take on the residual risk — they demand more in return.',
    body2: 'Toggle the payout order below to see who\'s protected and who isn\'t.',
    takeaway: "Cost of capital is a direct function of risk borne — the party absorbing the most uncertainty (equity) always demands the highest expected return.",
  },
  {
    title: 'The tax shield, calculated',
    minutes: 6,
    kind: 'activity',
    body1: 'Interest on debt is tax-deductible; dividends to equity holders are not. That deductibility — the "tax shield" — is a real, calculable saving.',
    body2: 'Adjust interest expense and the tax rate below to see the tax shield in dollars.',
    takeaway: 'The tax shield is one concrete, calculable reason debt is cheaper than equity — it directly reduces the government\'s share of a company\'s pre-tax income.',
  },
  {
    title: 'The optimal capital structure',
    minutes: 6,
    kind: 'interactive',
    body1: 'More debt means a bigger tax shield — but also more financial distress risk if the business hits a downturn. The "optimal" structure balances these two forces.',
    body2: 'Drag the leverage slider and watch the illustrative tradeoff.',
    takeaway: "There's no universal optimal debt level — it's a genuine tradeoff between the tax benefits of debt and the growing risk of financial distress as leverage rises.",
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: '"Why is debt cheaper than equity?" and "what\'s the optimal capital structure?" are two of the most common questions in this space.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'Tax shield plus lower risk to the lender explains why debt is cheaper. The tradeoff between tax benefits and distress risk explains why more debt isn\'t always better.',
  },
];

const DIMENSIONS = [
  { id: 'cost', label: 'COST', detail: 'Debt is cheaper — lenders take less risk and demand a lower return. Equity is more expensive since shareholders bear the residual risk.' },
  { id: 'risk', label: 'RISK', detail: 'Debt creates fixed obligations that must be paid regardless of performance. Equity has no repayment obligation — dividends are discretionary.' },
  { id: 'control', label: 'CONTROL', detail: "Debt doesn't dilute ownership or voting control. Issuing equity dilutes existing shareholders' stake and influence." },
  { id: 'tax', label: 'TAX TREATMENT', detail: 'Interest on debt is tax-deductible. Dividends paid to equity holders are not — a direct cost advantage for debt.' },
];

const QUIZ = [
  { q: 'Why is debt generally cheaper than equity?', choices: ['Debt holders take on more risk than equity holders', 'Lower risk to the lender plus the interest tax shield', 'Debt never has to be repaid'], correct: 1, explain: 'Correct — both reasons matter: lenders are paid first and face less risk, and interest expense reduces the company\'s tax bill.' },
  { q: 'What happens to financial distress risk as a company adds more debt?', choices: ['It stays constant regardless of leverage', 'It increases — more fixed obligations to service in a downturn', 'It always decreases'], correct: 1, explain: 'Correct — more debt means more fixed payments that must be made no matter how the business is performing, raising the risk of distress in a downturn.' },
  { q: 'What determines a company\'s "optimal" capital structure?', choices: ['Always using 100% debt since it\'s cheaper', 'The tradeoff between the tax shield benefit of debt and the cost of rising financial distress risk', 'Always using 100% equity to avoid any risk'], correct: 1, explain: "Correct — optimal capital structure balances the tax benefits of debt against the growing risk of distress as leverage increases; neither extreme is right." },
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

function Lesson1({ activeDim, setActiveDim }) {
  const active = DIMENSIONS.find((d) => d.id === activeDim) || DIMENSIONS[0];
  return (
    <>
      <div className="valufin-cap-eyebrow">CLICK EACH DIMENSION →</div>
      <div className="valufin-cap-criteria-row">
        {DIMENSIONS.map((d) => (
          <button key={d.id} className={`valufin-cap-criteria-card${d.id === activeDim ? ' active' : ''}`} onClick={() => setActiveDim(d.id)}>
            <div className="valufin-cap-criteria-label">{d.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-cap-detail">
        <div className="valufin-cap-detail-head">{active.label}</div>
        <p className="valufin-cap-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-cap-takeaway-terminal">
        <div className="valufin-cap-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-cap-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ showOrder, setShowOrder }) {
  return (
    <>
      <div className="valufin-cap-eyebrow">TOGGLE THE PAYOUT ORDER →</div>
      <div className="valufin-cap-tabs">
        <button className={`valufin-cap-tab${showOrder ? ' active' : ''}`} onClick={() => setShowOrder(true)}>LIQUIDATION ORDER</button>
        <button className={`valufin-cap-tab clay${!showOrder ? ' active' : ''}`} onClick={() => setShowOrder(false)}>WHO TAKES THE RISK</button>
      </div>
      <div className="valufin-cap-panel">
        {showOrder ? (
          <div className="valufin-cap-order-list">
            <div className="valufin-cap-order-item"><span>1</span> Debt holders — paid first, fixed amount</div>
            <div className="valufin-cap-order-item"><span>2</span> Equity holders — paid last, whatever remains</div>
          </div>
        ) : (
          <p className="valufin-cap-panel-body">Because equity holders are paid last and get no fixed return, they bear the residual risk of the business — and demand a correspondingly higher expected return for taking it on.</p>
        )}
      </div>
      <div className="valufin-cap-takeaway-clay">
        <span className="valufin-cap-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
        </span>
        <div className="valufin-cap-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ interestExpense, setInterestExpense, taxRate, setTaxRate }) {
  const taxShield = interestExpense * (taxRate / 100);
  return (
    <>
      <div className="valufin-cap-eyebrow">ADJUST INTEREST & TAX RATE →</div>
      <div className="valufin-cap-panel">
        <div className="valufin-cap-row"><span className="valufin-cap-row-label">INTEREST EXPENSE</span><span className="valufin-cap-row-value">${interestExpense}M</span></div>
        <input className="valufin-cap-range" type="range" min={5} max={80} value={interestExpense} onChange={(e) => setInterestExpense(Number(e.target.value))} />
        <div className="valufin-cap-row" style={{ marginTop: 14 }}><span className="valufin-cap-row-label">TAX RATE</span><span className="valufin-cap-row-value">{taxRate}%</span></div>
        <input className="valufin-cap-range" type="range" min={15} max={35} value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
        <div className="valufin-cap-result">
          <div className="valufin-cap-result-label">${interestExpense}M × {taxRate}% =</div>
          <div className="valufin-cap-result-value">${taxShield.toFixed(1)}M</div>
          <div className="valufin-cap-result-verdict">Tax savings from deducting interest — a dividend of the same size would get $0 in tax benefit.</div>
        </div>
      </div>
      <div className="valufin-cap-takeaway-dashed">
        <span className="valufin-cap-takeaway-dashed-check">✓</span>
        <div className="valufin-cap-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ leveragePct, setLeveragePct }) {
  const taxBenefit = leveragePct * 0.6;
  const distressCost = Math.pow(leveragePct / 100, 3) * 4000;
  const firmValueDelta = taxBenefit - distressCost;
  return (
    <>
      <div className="valufin-cap-eyebrow">DRAG THE LEVERAGE →</div>
      <div className="valufin-cap-panel">
        <div className="valufin-cap-row"><span className="valufin-cap-row-label">% DEBT IN CAPITAL STRUCTURE</span><span className="valufin-cap-row-value">{leveragePct}%</span></div>
        <input className="valufin-cap-range" type="range" min={0} max={90} step={5} value={leveragePct} onChange={(e) => setLeveragePct(Number(e.target.value))} />
        <div className="valufin-cap-return-grid">
          <div className="valufin-cap-return-box">
            <div className="valufin-cap-return-label">TAX SHIELD BENEFIT</div>
            <div className="valufin-cap-return-value" style={{ color: '#3FBF6F' }}>+{taxBenefit.toFixed(0)}</div>
          </div>
          <div className="valufin-cap-return-box">
            <div className="valufin-cap-return-label">DISTRESS COST (ILLUSTRATIVE)</div>
            <div className="valufin-cap-return-value" style={{ color: '#D9694F' }}>−{distressCost.toFixed(0)}</div>
          </div>
        </div>
        <div className="valufin-cap-result" style={{ marginTop: 14 }}>
          <div className="valufin-cap-result-label">NET EFFECT ON ILLUSTRATIVE FIRM VALUE</div>
          <div className="valufin-cap-result-value" style={{ color: firmValueDelta >= 0 ? '#3FBF6F' : '#D9694F' }}>{firmValueDelta >= 0 ? '+' : ''}{firmValueDelta.toFixed(0)}</div>
        </div>
      </div>
      <div className="valufin-cap-takeaway-quote">
        <span className="valufin-cap-takeaway-quote-mark">"</span>
        <div className="valufin-cap-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-cap-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-cap-panel">
        <div className="valufin-cap-quiz-q">{q.q}</div>
        <div className="valufin-cap-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-cap-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-cap-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-cap-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-cap-takeaway-rule red">
        <div className="valufin-cap-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-cap-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function CapitalStructure() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [activeDim, setActiveDim] = useState('cost');
  const [showOrder, setShowOrder] = useState(true);
  const [interestExpense, setInterestExpense] = useState(30);
  const [taxRate, setTaxRate] = useState(25);
  const [leveragePct, setLeveragePct] = useState(40);
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
          ? [{ label: 'Corporate Finance', path: '/corp-finance' }, { label: 'Capital Structure' }]
          : [{ label: 'Corporate Finance', path: '/corp-finance' }, { label: 'Capital Structure', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill good-to-have">Good to have</span>
            <span className="valufin-ticker-caption">CAP · CAPITAL STRUCTURE</span>
          </div>
          <h1 className="valufin-archivo-h1">Capital<br />Structure</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Debt vs. equity, WACC, and cost of capital decisions — why debt is cheaper, and
            why "more debt" isn't automatically better.
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
          <div className="valufin-lesson-detail-eyebrow">CAPITAL STRUCTURE · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 activeDim={activeDim} setActiveDim={setActiveDim} />}
          {activeIndex === 1 && <Lesson2 showOrder={showOrder} setShowOrder={setShowOrder} />}
          {activeIndex === 2 && <Lesson3 interestExpense={interestExpense} setInterestExpense={setInterestExpense} taxRate={taxRate} setTaxRate={setTaxRate} />}
          {activeIndex === 3 && <Lesson4 leveragePct={leveragePct} setLeveragePct={setLeveragePct} />}
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
