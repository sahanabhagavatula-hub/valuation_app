import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'Blue inputs, black formulas',
    minutes: 6,
    kind: 'interactive',
    body1: 'Blue for hardcoded inputs, black for formulas — this color-coding convention is an industry-wide standard, not a stylistic choice.',
    body2: 'Click every cell below that breaks the convention.',
    takeaway: 'A model where anyone can tell inputs from formulas at a glance, just by color, is a model someone else can actually trust and edit safely.',
  },
  {
    title: 'Core functions worth knowing cold',
    minutes: 5,
    kind: 'interactive',
    body1: 'A small set of functions covers most real modeling work. Click each one below.',
    body2: null,
    takeaway: "You don't need to know every Excel function — you need fluency in the handful that show up constantly: lookups, conditional sums, and sensitivity tables.",
  },
  {
    title: 'Model structure',
    minutes: 5,
    kind: 'interactive',
    body1: 'A clean model separates inputs, calculations, and outputs into distinct zones — never mixed together on one messy tab.',
    body2: 'Click each zone below.',
    takeaway: "Separating inputs from calculations means someone can change an assumption in exactly one place and trust that it flows correctly everywhere downstream.",
  },
  {
    title: 'Mistakes to avoid',
    minutes: 5,
    kind: 'interactive',
    body1: "The same handful of mistakes break more models than any complex formula ever does. Click each one.",
    body2: null,
    takeaway: 'No hardcoded numbers buried inside formulas, no broken links, and always build in an error check — like the balance sheet check from the 3-statement model.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: 'Some processes include a live Excel test — practice building from a blank sheet, not just reading pre-built models.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: '"Walk me through how you\'d structure a model" is sometimes asked conceptually, with no spreadsheet in sight — know the answer cold either way.',
  },
];

const CELLS = [
  { label: 'Revenue Growth %', value: '8%', isFormula: false, shownAsBlue: true },
  { label: 'Revenue', value: '=B2*(1+B3)', isFormula: true, shownAsBlue: false },
  { label: 'COGS %', value: '45%', isFormula: false, shownAsBlue: false },
  { label: 'Gross Profit', value: '=B4-B5', isFormula: true, shownAsBlue: false },
  { label: 'Tax Rate', value: '21%', isFormula: false, shownAsBlue: true },
  { label: 'Net Income', value: '=B6*(1-B7)', isFormula: true, shownAsBlue: true },
];

const FUNCTIONS = [
  { id: 'sumif', label: 'SUMIF', detail: 'Sums values that meet a condition — e.g. total revenue for only one region across a long list of transactions.' },
  { id: 'indexmatch', label: 'INDEX/MATCH', detail: 'A flexible lookup that pulls a value based on matching criteria — more robust than VLOOKUP since it isn\'t broken by inserting columns.' },
  { id: 'offset', label: 'OFFSET', detail: 'Returns a reference shifted from a starting cell — useful for building dynamic ranges that expand as data grows.' },
  { id: 'datatable', label: 'DATA TABLES', detail: 'Runs the same formula across a grid of input combinations at once — the standard way to build a sensitivity table.' },
];

const STRUCTURE_ZONES = [
  { id: 'inputs', label: 'INPUTS SHEET', detail: 'Every assumption lives here, and only here — growth rates, margins, multiples — clearly labeled and colored blue.' },
  { id: 'calc', label: 'CALCULATIONS', detail: 'The formulas that turn inputs into results — this is where the actual model logic lives, referencing the inputs sheet, never hardcoding a number directly.' },
  { id: 'outputs', label: 'OUTPUTS / SUMMARY', detail: 'A clean summary tab pulling the key results — what someone would actually look at without digging through the full model.' },
];

const MISTAKES = [
  { label: 'Hardcoding inside formulas', detail: 'Burying a number like 0.21 directly inside a formula means no one can find or change that assumption without hunting through every sheet.' },
  { label: 'Broken links', detail: 'References to closed or renamed external files silently break — always audit links before sharing a model.' },
  { label: 'No error checks', detail: 'A model with no balance-sheet check or sum check can be wrong for weeks before anyone notices.' },
];

const QUIZ = [
  { q: 'Why is the blue-input/black-formula color convention considered non-negotiable?', choices: ["It's required by Excel", 'It lets anyone tell inputs from formulas at a glance, protecting the model from accidental edits', 'It makes the file smaller'], correct: 1, explain: 'Correct — the convention is entirely about making a model safely editable and auditable by someone other than its author.' },
  { q: 'Where should every assumption in a model live?', choices: ['Scattered across whichever sheet needed it first', 'One clearly labeled inputs sheet', 'Hardcoded inside the relevant formula'], correct: 1, explain: 'Correct — centralizing inputs means changing an assumption never requires hunting through formulas.' },
  { q: 'What is a data table typically used for in a financial model?', choices: ['Formatting cells', 'Running a sensitivity analysis across a grid of input combinations', 'Storing text notes'], correct: 1, explain: 'Correct — data tables let you see how an output changes across many input combinations at once, without manually re-running the model each time.' },
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

function Lesson1({ flagged, setFlagged, revealed, setRevealed }) {
  function toggle(i) {
    if (revealed) return;
    const next = new Set(flagged);
    if (next.has(i)) next.delete(i); else next.add(i);
    setFlagged(next);
  }
  const wrongIndices = CELLS.map((c, i) => (c.isFormula === c.shownAsBlue ? i : null)).filter((i) => i !== null);
  return (
    <>
      <div className="valufin-xlm-eyebrow">CLICK THE MISCOLORED CELLS →</div>
      <div className="valufin-xlm-grid">
        {CELLS.map((c, i) => {
          const isFlagged = flagged.has(i);
          const isWrong = wrongIndices.includes(i);
          let cls = 'valufin-xlm-cell';
          if (revealed) cls += isWrong ? ' should-flag' : ' should-not-flag';
          if (isFlagged && !revealed) cls += ' flagged';
          return (
            <button key={c.label} className={cls} onClick={() => toggle(i)}>
              <div className="valufin-xlm-cell-label">{c.label}</div>
              <div className="valufin-xlm-cell-value" style={{ color: c.shownAsBlue ? '#4FC3C7' : '#EDEBE4' }}>{c.value}</div>
            </button>
          );
        })}
      </div>
      {!revealed ? (
        <button className="valufin-xlm-reveal-btn" onClick={() => setRevealed(true)}>Check answers →</button>
      ) : (
        <div className="valufin-xlm-reveal-note">{wrongIndices.length} cells break the convention — miscolored cells are outlined in red above.</div>
      )}
      <div className="valufin-xlm-takeaway-terminal">
        <div className="valufin-xlm-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-xlm-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ activeFn, setActiveFn }) {
  const active = FUNCTIONS.find((f) => f.id === activeFn) || FUNCTIONS[0];
  return (
    <>
      <div className="valufin-xlm-eyebrow">CLICK EACH FUNCTION →</div>
      <div className="valufin-xlm-criteria-row">
        {FUNCTIONS.map((f) => (
          <button key={f.id} className={`valufin-xlm-criteria-card${f.id === activeFn ? ' active' : ''}`} onClick={() => setActiveFn(f.id)}>
            <div className="valufin-xlm-criteria-label">{f.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-xlm-detail">
        <div className="valufin-xlm-detail-head">{active.label}</div>
        <p className="valufin-xlm-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-xlm-takeaway-clay">
        <span className="valufin-xlm-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="1.5" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
        </span>
        <div className="valufin-xlm-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activeZone, setActiveZone }) {
  const active = STRUCTURE_ZONES.find((z) => z.id === activeZone) || STRUCTURE_ZONES[0];
  return (
    <>
      <div className="valufin-xlm-eyebrow">CLICK EACH ZONE →</div>
      <div className="valufin-xlm-tabs">
        {STRUCTURE_ZONES.map((z) => (
          <button key={z.id} className={`valufin-xlm-tab${activeZone === z.id ? ' active' : ''}`} onClick={() => setActiveZone(z.id)}>{z.label}</button>
        ))}
      </div>
      <div className="valufin-xlm-panel">
        <p className="valufin-xlm-panel-body">{active.detail}</p>
      </div>
      <div className="valufin-xlm-takeaway-dashed">
        <span className="valufin-xlm-takeaway-dashed-check">✓</span>
        <div className="valufin-xlm-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ activeMistake, setActiveMistake }) {
  return (
    <>
      <div className="valufin-xlm-eyebrow">CLICK EACH MISTAKE →</div>
      <div className="valufin-xlm-criteria-row">
        {MISTAKES.map((m, i) => (
          <button key={m.label} className={`valufin-xlm-criteria-card${activeMistake === i ? ' active' : ''}`} onClick={() => setActiveMistake(i)}>
            <div className="valufin-xlm-criteria-label">{m.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-xlm-detail">
        <div className="valufin-xlm-detail-head">{MISTAKES[activeMistake].label}</div>
        <p className="valufin-xlm-detail-body">{MISTAKES[activeMistake].detail}</p>
      </div>
      <div className="valufin-xlm-takeaway-quote">
        <span className="valufin-xlm-takeaway-quote-mark">"</span>
        <div className="valufin-xlm-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-xlm-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-xlm-panel">
        <div className="valufin-xlm-quiz-q">{q.q}</div>
        <div className="valufin-xlm-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-xlm-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-xlm-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-xlm-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-xlm-takeaway-rule red">
        <div className="valufin-xlm-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-xlm-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function ExcelModeling() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [flagged, setFlagged] = useState(new Set());
  const [revealed, setRevealed] = useState(false);
  const [activeFn, setActiveFn] = useState('sumif');
  const [activeZone, setActiveZone] = useState('inputs');
  const [activeMistake, setActiveMistake] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState(null);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => { const idx = completed.findIndex((c) => !c); return idx === -1 ? completed.length - 1 : idx; })();

  function resetLessonState() { setQuizIndex(0); setPicked(null); setFlagged(new Set()); setRevealed(false); }
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
          ? [{ label: 'Corporate Finance', path: '/corp-finance' }, { label: 'Excel Modeling' }]
          : [{ label: 'Corporate Finance', path: '/corp-finance' }, { label: 'Excel Modeling', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill high-value">High-value</span>
            <span className="valufin-ticker-caption">XLM · EXCEL MODELING</span>
          </div>
          <h1 className="valufin-archivo-h1">Excel<br />Modeling</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Shortcuts, VLOOKUP, pivot tables, and the professional conventions that make a
            model something someone else can trust.
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
          <div className="valufin-lesson-detail-eyebrow">EXCEL MODELING · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          {activeLesson.body2 && <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>}

          {activeIndex === 0 && <Lesson1 flagged={flagged} setFlagged={setFlagged} revealed={revealed} setRevealed={setRevealed} />}
          {activeIndex === 1 && <Lesson2 activeFn={activeFn} setActiveFn={setActiveFn} />}
          {activeIndex === 2 && <Lesson3 activeZone={activeZone} setActiveZone={setActiveZone} />}
          {activeIndex === 3 && <Lesson4 activeMistake={activeMistake} setActiveMistake={setActiveMistake} />}
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
