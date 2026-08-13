import { useState, Fragment } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A', '#D9694F'];

const LESSONS = [
  {
    title: 'How the three statements connect',
    minutes: 7,
    kind: 'interactive',
    body1: "The income statement, balance sheet, and cash flow statement are really one accounting system told from three angles — accrual profit, point-in-time position, and actual cash movement.",
    body2: 'Click each connection below to see exactly which line feeds which — this is the wiring diagram everything else in this lesson builds on.',
    takeaway: "Net income flows into both the cash flow statement and retained earnings on the balance sheet — that's the single link that ties all three together.",
  },
  {
    title: 'Reading it like a banker (not an accountant)',
    minutes: 8,
    kind: 'interactive',
    body1: "Textbook statements mix positive and negative signs inconveniently — some expenses are shown as positive numbers you're expected to subtract, others as parentheses. It works on paper, but it's a nightmare in a live model.",
    body2: "The IB convention: every expense, cost, and cash outflow is entered as a literal negative number. Then every subtotal is just a SUM formula — no memorizing which lines to add versus subtract, and no sign errors when you insert a new row.",
    takeaway: "In a real IB model, if a line reduces profit or cash, it's negative — full stop. That one rule replaces a dozen accounting conventions you'd otherwise have to memorize.",
  },
  {
    title: 'Why the model "circles" back on itself',
    minutes: 7,
    kind: 'interactive',
    body1: "Interest expense depends on how much debt (or revolver) the company is carrying. But how much revolver it needs depends on its cash balance — which depends on net income — which depends on interest expense.",
    body2: 'That loop is called circularity, and it\'s the single most common reason a 3-statement model breaks in Excel. Drag the revolver slider below and watch every downstream number move.',
    takeaway: 'Circularity isn\'t a modeling mistake — it\'s a real economic relationship. The fix is technique (iterative calc, or a circularity breaker), not avoiding the loop.',
  },
  {
    title: 'Why IB actually cares about this',
    minutes: 6,
    kind: 'matching',
    body1: "You will not spend your analyst years admiring the elegance of double-entry bookkeeping. You'll use the 3-statement model as the engine underneath almost everything else you build.",
    body2: 'Match each real banking task below to the statement it leans on hardest — click to reveal why.',
    takeaway: 'A DCF, an LBO, and a merger model are all just a 3-statement model with extra logic layered on top. Master this first and the rest gets dramatically easier.',
  },
  {
    title: 'Final check: which statement moves?',
    minutes: 6,
    kind: 'quiz',
    body1: 'One more pass before you move on. Each scenario below changes a real company event — your job is to identify every statement it touches, not just the obvious one.',
    body2: "Most beginners get the first-order effect right and miss the second — e.g. depreciation hits the income statement AND the cash flow statement AND the balance sheet, all at once.",
    takeaway: 'Almost nothing touches just one statement. Training yourself to trace an event across all three is the actual skill this whole topic is testing.',
  },
  {
    title: 'Build a mini model yourself',
    minutes: 8,
    kind: 'activity',
    body1: 'Time to drive all three statements at once. Set revenue growth and margin assumptions below and watch every downstream line update live — this is the exact chain reaction that happens inside a real model.',
    body2: 'Push margin down while growth stays high, or vice versa — notice how cash generation and the ending cash balance respond differently to each lever.',
    takeaway: "Every assumption you type into a model ripples through all three statements simultaneously. Building intuition for that ripple is what separates 'knows the formulas' from 'can actually model.'",
  },
];

const LINKS = [
  {
    id: 'bs',
    stmtLabel: 'BALANCE SHEET',
    stmtLine: 'Retained Earnings',
    note: "Net income adds to retained earnings each period — the balance sheet's equity section literally accumulates every year of profit the company has ever kept.",
  },
  {
    id: 'cf',
    stmtLabel: 'CASH FLOW STMT',
    stmtLine: 'Starts w/ Net Income',
    note: "The cash flow statement's operating section starts from net income, then backs out non-cash items (like depreciation) and working capital changes to get to actual cash generated.",
  },
];

const STATEMENT_ROWS_MESSY = [
  { label: 'Product sales', value: '6,428', indent: 0, weight: 400 },
  { label: 'Service sales', value: '7,870', indent: 0, weight: 400 },
  { label: 'Net sales', value: '14,298', indent: 0, weight: 700, border: true },
  { label: 'Cost of products sold', value: '5,293', indent: 12, weight: 400 },
  { label: 'Cost of services sold', value: '4,812', indent: 12, weight: 400 },
  { label: 'R&D', value: '159', indent: 12, weight: 400 },
  { label: 'SG&A', value: '1,948', indent: 12, weight: 400 },
  { label: 'Operating profit', value: '2,108', indent: 0, weight: 700, border: true },
  { label: 'Interest expense, net', value: '136', indent: 12, weight: 400 },
  { label: 'Pretax income', value: '1,961', indent: 0, weight: 700, border: true },
  { label: 'Income tax expense', value: '541', indent: 12, weight: 400 },
  { label: 'Net income', value: '1,420', indent: 0, weight: 700, border: true },
];

const STATEMENT_ROWS_CLEAN = [
  { label: 'Product sales', value: '6,428', indent: 0, weight: 400 },
  { label: 'Service sales', value: '7,870', indent: 0, weight: 400 },
  { label: 'Net sales', value: '14,298', indent: 0, weight: 700, border: true },
  { label: 'Cost of products sold', value: '(5,293)', indent: 12, weight: 400, neg: true },
  { label: 'Cost of services sold', value: '(4,812)', indent: 12, weight: 400, neg: true },
  { label: 'R&D', value: '(159)', indent: 12, weight: 400, neg: true },
  { label: 'SG&A', value: '(1,948)', indent: 12, weight: 400, neg: true },
  { label: 'Operating profit', value: '2,108', indent: 0, weight: 700, border: true },
  { label: 'Interest expense, net', value: '(136)', indent: 12, weight: 400, neg: true },
  { label: 'Pretax income', value: '1,961', indent: 0, weight: 700, border: true },
  { label: 'Income tax expense', value: '(541)', indent: 12, weight: 400, neg: true },
  { label: 'Net income', value: '1,420', indent: 0, weight: 700, border: true },
];

const IB_USES = [
  { task: 'Building a DCF', statement: 'CASH FLOW STMT', tagColor: '#4FC3C7', iconColor: '#4FC3C7', iconBg: 'rgba(79,195,199,0.14)', svg: 'M3 17c3-8 6 6 9-4s6 6 9-4', explain: "Unlevered free cash flow — the number you discount — is built directly from the cash flow statement's operating and investing sections." },
  { task: "Running an LBO", statement: 'ALL THREE', tagColor: '#D9694F', iconColor: '#D9694F', iconBg: 'rgba(217,105,79,0.14)', svg: 'M12 3l9 4.5-9 4.5-9-4.5zM3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5', explain: "You need the balance sheet for the existing debt/equity to buy out, the income statement for how the new debt load affects interest and taxes, and the cash flow statement for how fast the deal pays down debt." },
  { task: "Checking a company's liquidity", statement: 'BALANCE SHEET', tagColor: '#C4B79A', iconColor: '#C4B79A', iconBg: 'rgba(196,183,154,0.14)', svg: 'M4 21a8 8 0 0 1 16 0M12 3.5v8.5h8.5', explain: "Current assets versus current liabilities lives on the balance sheet — it's the first place you look to see if a company can cover its near-term obligations." },
  { task: 'Explaining why profit ≠ cash', statement: 'CASH FLOW STMT', tagColor: '#4FC3C7', iconColor: '#4FC3C7', iconBg: 'rgba(79,195,199,0.14)', svg: 'M2.5 4.5h19v11h-19zM7.5 15.5v3M16.5 15.5v3M6 18.5h12', explain: 'A profitable company can still run out of cash if receivables pile up or inventory builds — the cash flow statement is where that gap becomes visible.' },
];

const QUIZ_DATA = [
  {
    scenario: 'A company buys a $10M machine, fully financed with cash on hand.',
    choices: [
      { label: 'Balance sheet only', correct: false },
      { label: 'Balance sheet + Cash flow statement', correct: true },
      { label: 'All three statements', correct: false },
    ],
    feedback: "Cash flow statement (investing outflow) and balance sheet (cash down, PP&E up) both move immediately. The income statement isn't touched yet — depreciation on the new machine will hit it in future periods.",
  },
  {
    scenario: 'The company records $2M of depreciation this quarter on existing equipment.',
    choices: [
      { label: 'Income statement only', correct: false },
      { label: 'Income statement + Cash flow statement', correct: false },
      { label: 'All three statements', correct: true },
    ],
    feedback: "Depreciation reduces net income (income statement), gets added back on the cash flow statement (it's non-cash), and reduces the equipment's book value on the balance sheet — all three, every time.",
  },
  {
    scenario: 'A customer pays an invoice that was already recorded as revenue last quarter.',
    choices: [
      { label: 'Balance sheet + Cash flow statement', correct: true },
      { label: 'Income statement only', correct: false },
      { label: 'No impact anywhere', correct: false },
    ],
    feedback: 'Revenue was already booked last quarter, so the income statement doesn\'t move again. This quarter, cash goes up and accounts receivable goes down — balance sheet and cash flow statement only.',
  },
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

function BarsIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="19" x2="4" y2="10" /><line x1="10" y1="19" x2="10" y2="5" /><line x1="16" y1="19" x2="16" y2="13" /><line x1="20" y1="19" x2="4" y2="19" />
    </svg>
  );
}

function LedgerIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="1.5" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function WaveIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17c3-8 6 6 9-4s6 6 9-4" />
    </svg>
  );
}

function UseIcon({ d, color }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function Lesson1Connect({ activeLink, setActiveLink }) {
  const activeLinkData = activeLink ? LINKS.find((l) => l.id === activeLink) : null;
  return (
    <>
      <div className="valufin-3st-eyebrow">CLICK EACH LINK TO SEE THE CONNECTION →</div>
      <div className="valufin-3st-link-row">
        <div className="valufin-3st-link-card">
          <BarsIcon color="#4FC3C7" />
          <div className="valufin-3st-link-label" style={{ color: '#4FC3C7' }}>INCOME STMT</div>
          <div className="valufin-3st-link-line">Net Income</div>
        </div>
        {LINKS.map((link) => {
          const isActive = activeLink === link.id;
          return (
            <Fragment key={link.id}>
              <button className="valufin-3st-link-connector" style={{ background: isActive ? 'rgba(79,195,199,0.15)' : 'transparent' }} onClick={() => setActiveLink(link.id)}>
                <svg width="20" height="14" viewBox="0 0 20 14" style={{ transform: isActive ? 'scale(1.15)' : 'none' }}>
                  <path d="M0 7h16M11 2l5 5-5 5" fill="none" stroke={isActive ? '#4FC3C7' : '#6f6a5f'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="valufin-3st-link-card">
                {link.id === 'bs' ? <LedgerIcon color={isActive ? '#4FC3C7' : '#6f6a5f'} /> : <WaveIcon color={isActive ? '#4FC3C7' : '#6f6a5f'} />}
                <div className="valufin-3st-link-label" style={{ color: isActive ? '#4FC3C7' : '#6f6a5f' }}>{link.stmtLabel}</div>
                <div className="valufin-3st-link-line">{link.stmtLine}</div>
              </div>
            </Fragment>
          );
        })}
      </div>
      {activeLinkData && (
        <div className="valufin-3st-link-note">{activeLinkData.note}</div>
      )}
      <div className="valufin-3st-takeaway-terminal">
        <div className="valufin-3st-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-3st-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2Ledger({ convention, setConvention }) {
  const isClean = convention === 'clean';
  const rows = isClean ? STATEMENT_ROWS_CLEAN : STATEMENT_ROWS_MESSY;
  const note = isClean
    ? 'Every cost is a negative number — Net Sales + everything below it (all negatives) just SUMs down to Net Income. No mental math about which lines to subtract.'
    : 'This is how the SEC filing actually prints it — expenses shown positive, subtraction implied. Fine for reading a 10-K, painful for building a live model with formulas.';

  return (
    <>
      <div className="valufin-3st-eyebrow" style={{ marginBottom: 8 }}>TOGGLE THE CONVENTION →</div>
      <div className="valufin-3st-tabs">
        <button className={`valufin-3st-tab${!isClean ? ' active' : ''}`} onClick={() => setConvention('messy')}>MIXED SIGNS (CONFUSING)</button>
        <button className={`valufin-3st-tab teal${isClean ? ' active' : ''}`} onClick={() => setConvention('clean')}>ALL EXPENSES NEGATIVE (IB STANDARD)</button>
      </div>
      <div className="valufin-3st-statement">
        <div className="valufin-3st-statement-head">($ IN MILLIONS) — FY2021</div>
        {rows.map((r) => (
          <div key={r.label} className={`valufin-3st-row${r.border ? ' border' : ''}`}>
            <span style={{ fontWeight: r.weight, paddingLeft: r.indent, color: r.border ? '#EDEBE4' : '#D8D3C8' }}>{r.label}</span>
            <span style={{ fontWeight: r.weight, color: r.neg ? '#D9694F' : (r.border ? '#EDEBE4' : '#D8D3C8') }}>{r.value}</span>
          </div>
        ))}
      </div>
      <p className="valufin-lesson-footnote" style={{ marginTop: 14 }}>{note}</p>
      <div className="valufin-3st-takeaway-clay">
        <span className="valufin-3st-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </span>
        <div className="valufin-3st-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3Circular({ revolverValue, setRevolverValue }) {
  const revolverInterest = Math.round(revolverValue * 0.08 * 10) / 10;
  return (
    <>
      <div className="valufin-3st-eyebrow">DRAG THE REVOLVER BALANCE →</div>
      <div className="valufin-3st-revolver-panel">
        <input className="valufin-3st-range" type="range" min={0} max={120} value={revolverValue} onChange={(e) => setRevolverValue(Number(e.target.value))} />
        <div className="valufin-3st-revolver-stats">
          <span>Revolver draw: <b style={{ color: '#EDEBE4' }}>${revolverValue}M</b></span>
          <span>Interest expense: <b style={{ color: '#D9694F' }}>${revolverInterest}M</b></span>
        </div>
        <div className="valufin-3st-circle-wrap">
          <svg width="280" height="280" viewBox="0 0 280 280" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="140" cy="140" r="108" fill="none" stroke="rgba(237,235,228,0.12)" strokeWidth="2" strokeDasharray="6,6" />
            <path d="M140 32 A108 108 0 0 1 248 140" fill="none" stroke="#4FC3C7" strokeWidth="2.5" markerEnd="url(#valufin3stArrow)" />
            <defs><marker id="valufin3stArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#4FC3C7" /></marker></defs>
          </svg>
          <div className="valufin-3st-circle-node top" style={{ borderColor: '#D9694F' }}>
            <div className="valufin-3st-circle-node-label" style={{ color: '#D9694F' }}>INTEREST EXP.</div>
            <div className="valufin-3st-circle-node-value">${revolverInterest}M</div>
          </div>
          <div className="valufin-3st-circle-node right" style={{ borderColor: '#4FC3C7' }}>
            <div className="valufin-3st-circle-node-label" style={{ color: '#4FC3C7' }}>NET INCOME</div>
            <div className="valufin-3st-circle-node-value">← moves</div>
          </div>
          <div className="valufin-3st-circle-node bottom" style={{ borderColor: '#C4B79A' }}>
            <div className="valufin-3st-circle-node-label" style={{ color: '#C4B79A' }}>CASH BALANCE</div>
            <div className="valufin-3st-circle-node-value">← moves</div>
          </div>
          <div className="valufin-3st-circle-node left" style={{ borderColor: '#4FC3C7' }}>
            <div className="valufin-3st-circle-node-label" style={{ color: '#4FC3C7' }}>REVOLVER DRAW</div>
            <div className="valufin-3st-circle-node-value">${revolverValue}M</div>
          </div>
        </div>
      </div>
      <p className="valufin-lesson-footnote" style={{ marginTop: 16 }}>
        This is why 3-statement models "circle" — interest depends on the revolver balance, which depends on cash, which depends on net income, which depends on interest. Excel needs iterative calculation turned on, or a circularity breaker switch, to resolve it.
      </p>
      <div className="valufin-3st-takeaway-quote">
        <svg width="42" height="32" viewBox="0 0 42 32" className="valufin-3st-takeaway-quote-mark"><path d="M0 32V19.5C0 8.5 6.5 1.5 16 0l2 5C11 6.5 8 11 8 17h8v15H0zm22 0V19.5C22 8.5 28.5 1.5 38 0l2 5c-7 1.5-10 6-10 12h8v15H22z" fill="rgba(196,183,154,0.22)" /></svg>
        <div className="valufin-3st-takeaway-quote-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4WhyItMatters({ ibOpen, setIbOpen }) {
  function toggle(i) {
    const next = [...ibOpen];
    next[i] = !next[i];
    setIbOpen(next);
  }
  return (
    <>
      <div className="valufin-3st-eyebrow">MATCH THE TASK TO THE STATEMENT →</div>
      {IB_USES.map((u, i) => {
        const open = ibOpen[i];
        return (
          <button key={u.task} className={`valufin-3st-use-row${open ? ' open' : ''}`} onClick={() => toggle(i)}>
            <div className="valufin-3st-use-head">
              <div className="valufin-3st-use-headleft">
                <span className="valufin-3st-use-icon" style={{ background: u.iconBg }}><UseIcon d={u.svg} color={u.iconColor} /></span>
                <span className="valufin-3st-use-task">{u.task}</span>
              </div>
              <span className="valufin-3st-use-tag" style={{ color: u.tagColor }}>{u.statement}</span>
            </div>
            {open && <div className="valufin-3st-use-explain">{u.explain}</div>}
          </button>
        );
      })}
      <div className="valufin-3st-takeaway-rule gold">
        <div className="valufin-3st-takeaway-rule-label" style={{ color: '#C4B79A' }}>KEY TAKEAWAY</div>
        <div className="valufin-3st-takeaway-rule-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5Quiz({ quizIndex, setQuizIndex, quizScore, setQuizScore, quizAttempted, setQuizAttempted, quizAnswered, setQuizAnswered, quizFeedback, setQuizFeedback }) {
  const q = QUIZ_DATA[quizIndex];

  function select(correct, feedback) {
    if (quizAnswered) return;
    setQuizAnswered(true);
    setQuizAttempted(quizAttempted + 1);
    setQuizScore(quizScore + (correct ? 1 : 0));
    setQuizFeedback(feedback);
  }

  function next() {
    setQuizIndex((quizIndex + 1) % QUIZ_DATA.length);
    setQuizAnswered(false);
    setQuizFeedback('');
  }

  return (
    <>
      <div className="valufin-3st-eyebrow">SCENARIO {quizIndex + 1} OF {QUIZ_DATA.length} — WHICH STATEMENTS MOVE?</div>
      <div className="valufin-3st-quiz-panel">
        <div className="valufin-3st-quiz-scenario">{q.scenario}</div>
        <div className="valufin-3st-quiz-choices">
          {q.choices.map((c) => {
            const isCorrectShown = quizAnswered && c.correct;
            return (
              <button
                key={c.label}
                className={`valufin-3st-quiz-choice${isCorrectShown ? ' correct' : ''}`}
                onClick={() => select(c.correct, q.feedback)}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        {quizFeedback && <div className="valufin-3st-quiz-feedback">{quizFeedback}</div>}
      </div>
      <div className="valufin-3st-quiz-footer">
        <button className="valufin-3st-quiz-next" onClick={next}>Next scenario →</button>
        <span className="valufin-3st-quiz-score">Score: {quizScore}/{quizAttempted}</span>
      </div>
      <div className="valufin-3st-takeaway-rule red">
        <div className="valufin-3st-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-3st-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

function buildActivityVals(growth, margin) {
  const priorRevenue = 500;
  const priorCash = 120;
  const priorRetainedEarnings = 340;
  const revenue = Math.round(priorRevenue * (1 + growth / 100));
  const netIncome = Math.round(revenue * (margin / 100));
  const capex = Math.round(revenue * 0.04);
  const depreciation = Math.round(revenue * 0.03);
  const nwcChange = Math.round((revenue - priorRevenue) * 0.15);
  const cfo = netIncome + depreciation - nwcChange;
  const cff = -Math.round(netIncome * 0.2);
  const netCashChange = cfo - capex + cff;
  const endingCash = priorCash + netCashChange;
  const retainedEarnings = priorRetainedEarnings + netIncome + cff;
  return { revenue, netIncome, cfo, capex, netCashChange, endingCash, retainedEarnings };
}

function Lesson6Activity({ growth, setGrowth, margin, setMargin }) {
  const v = buildActivityVals(growth, margin);
  return (
    <>
      <div className="valufin-3st-eyebrow">DRIVE ALL THREE STATEMENTS →</div>
      <div className="valufin-3st-activity-panel">
        <div style={{ marginBottom: 18 }}>
          <div className="valufin-3st-activity-slider-label"><span>Revenue growth</span><span style={{ color: '#4FC3C7', fontWeight: 700 }}>{growth}%</span></div>
          <input className="valufin-3st-range teal" type="range" min={-10} max={40} value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
        </div>
        <div>
          <div className="valufin-3st-activity-slider-label"><span>Net margin</span><span style={{ color: '#C4B79A', fontWeight: 700 }}>{margin}%</span></div>
          <input className="valufin-3st-range gold" type="range" min={2} max={35} value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
        </div>
      </div>
      <div className="valufin-3st-activity-grid">
        <div className="valufin-3st-activity-card teal">
          <div className="valufin-3st-activity-card-label" style={{ color: '#4FC3C7' }}>INCOME STATEMENT</div>
          <div className="valufin-3st-activity-line-label">Revenue</div>
          <div className="valufin-3st-activity-line-value">${v.revenue}M</div>
          <div className="valufin-3st-activity-line-label">Net Income</div>
          <div className="valufin-3st-activity-line-value" style={{ color: '#4FC3C7' }}>${v.netIncome}M</div>
        </div>
        <div className="valufin-3st-activity-card gold">
          <div className="valufin-3st-activity-card-label" style={{ color: '#C4B79A' }}>CASH FLOW STMT</div>
          <div className="valufin-3st-activity-line-label">Cash from Ops</div>
          <div className="valufin-3st-activity-line-value">${v.cfo}M</div>
          <div className="valufin-3st-activity-line-label">Capex</div>
          <div className="valufin-3st-activity-line-value" style={{ color: '#D9694F' }}>(${v.capex}M)</div>
        </div>
        <div className="valufin-3st-activity-card clay">
          <div className="valufin-3st-activity-card-label" style={{ color: '#D9694F' }}>BALANCE SHEET</div>
          <div className="valufin-3st-activity-line-label">Ending Cash</div>
          <div className="valufin-3st-activity-line-value">${v.endingCash}M</div>
          <div className="valufin-3st-activity-line-label">Retained Earnings</div>
          <div className="valufin-3st-activity-line-value">${v.retainedEarnings}M</div>
        </div>
      </div>
      <p className="valufin-lesson-footnote" style={{ marginTop: 16, marginBottom: 0 }}>
        Ending cash starts from last year's $120M and moves by{' '}
        <b style={{ color: v.netCashChange >= 0 ? '#3FBF6F' : '#D9694F' }}>${v.netCashChange}M</b> this year — driven entirely by the two sliders above.
      </p>
      <div className="valufin-3st-takeaway-dashed">
        <span className="valufin-3st-takeaway-dashed-check">✓</span>
        <div className="valufin-3st-takeaway-dashed-body">{LESSONS[5].takeaway}</div>
      </div>
    </>
  );
}

export default function ThreeStatementModel() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);

  const [activeLink, setActiveLink] = useState(null);
  const [convention, setConvention] = useState('clean');
  const [revolverValue, setRevolverValue] = useState(40);
  const [ibOpen, setIbOpen] = useState([false, false, false, false]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAttempted, setQuizAttempted] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState('');
  const [growth, setGrowth] = useState(12);
  const [margin, setMargin] = useState(18);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => {
    const idx = completed.findIndex((c) => !c);
    return idx === -1 ? completed.length - 1 : idx;
  })();

  function openLesson(i) {
    setActiveIndex(i);
    setActiveLink(null);
    setIbOpen([false, false, false, false]);
    setView('lesson');
  }

  function backToTopics() {
    setView('list');
  }

  function markCompleteAndAdvance() {
    const next = [...completed];
    next[activeIndex] = true;
    setCompleted(next);
    const nextIndex = activeIndex + 1;
    if (nextIndex < LESSONS.length) {
      setActiveIndex(nextIndex);
      setActiveLink(null);
      setIbOpen([false, false, false, false]);
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
        <Breadcrumb items={view === 'list'
          ? [{ label: 'Investment Banking', path: '/ib' }, { label: 'Three-Statement Model' }]
          : [{ label: 'Investment Banking', path: '/ib' }, { label: 'Three-Statement Model', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know-clay">Must-know</span>
            <span className="valufin-ticker-caption">3ST · THREE-STATEMENT MODEL</span>
          </div>
          <h1 className="valufin-archivo-h1">Three-Statement<br />Model</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            The income statement, balance sheet, and cash flow statement aren't three separate
            reports — they're one accounting system viewed from three angles. This is the model
            everything else in IB gets built on top of.
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
          <div className="valufin-lesson-detail-eyebrow">THREE-STATEMENT MODEL · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1Connect activeLink={activeLink} setActiveLink={setActiveLink} />}
          {activeIndex === 1 && <Lesson2Ledger convention={convention} setConvention={setConvention} />}
          {activeIndex === 2 && <Lesson3Circular revolverValue={revolverValue} setRevolverValue={setRevolverValue} />}
          {activeIndex === 3 && <Lesson4WhyItMatters ibOpen={ibOpen} setIbOpen={setIbOpen} />}
          {activeIndex === 4 && (
            <Lesson5Quiz
              quizIndex={quizIndex} setQuizIndex={setQuizIndex}
              quizScore={quizScore} setQuizScore={setQuizScore}
              quizAttempted={quizAttempted} setQuizAttempted={setQuizAttempted}
              quizAnswered={quizAnswered} setQuizAnswered={setQuizAnswered}
              quizFeedback={quizFeedback} setQuizFeedback={setQuizFeedback}
            />
          )}
          {activeIndex === 5 && <Lesson6Activity growth={growth} setGrowth={setGrowth} margin={margin} setMargin={setMargin} />}

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
