import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A', '#D9694F'];

const LESSONS = [
  {
    title: 'What it is vs. trading comps',
    minutes: 6,
    kind: 'interactive',
    body1: "Precedent transactions value a company by looking at multiples actually paid in past M&A deals for comparable companies — not where similar companies trade today, but what buyers were willing to pay to own them outright.",
    body2: 'That "own them outright" distinction is the whole ballgame. Toggle between the two methods below to see how the same target company gets a different implied value.',
    takeaway: 'Trading comps price a minority stake bought on the open market. Precedent transactions price a controlling stake, acquired in full — that difference alone explains why the two methods rarely agree.',
  },
  {
    title: 'Selecting the deal set',
    minutes: 6,
    kind: 'interactive',
    body1: "Picking comparable deals uses the same logic as picking public comps — same industry, similar size — but adds two more filters: deal type and timing.",
    body2: 'Click each criterion below to see what it screens for and why it matters.',
    takeaway: "A defensible deal set is never just 'M&A deals in the same industry' — size, structure, and timing all have to line up, or the multiples you're comparing aren't really comparable.",
  },
  {
    title: 'The control premium',
    minutes: 6,
    kind: 'interactive',
    body1: 'Every precedent transaction multiple has a control premium baked into it — typically 20–40% above where the target was trading before the deal was announced.',
    body2: 'Drag the premium slider below and watch a trading multiple turn into a precedent multiple in real time.',
    takeaway: "This is the single most-asked question on this topic: precedent multiples run higher than trading comps almost entirely because of the control premium, not because acquirers are irrational.",
  },
  {
    title: 'Reading a deal comp set',
    minutes: 7,
    kind: 'interactive',
    body1: 'Real deal sets are small — often just 5–8 transactions — and not every deal deserves equal weight. Older deals reflect a different rate and market environment.',
    body2: 'Below is an illustrative deal set. Toggle the oldest, stalest deal in or out and watch the range shift.',
    takeaway: 'Small sample sizes are normal here, not a flaw to hide — the skill is explicitly flagging which deals you weighted less, and why, rather than pretending every deal in the set is equally relevant.',
  },
  {
    title: 'Worked example',
    minutes: 6,
    kind: 'interactive',
    body1: "Once you have a defensible median multiple, applying it is simple: multiply it by the target's own EBITDA.",
    body2: "Adjust the target's EBITDA below and watch the implied enterprise value move with the median multiple from your deal set.",
    takeaway: 'The multiple does the heavy lifting, but the output is only as good as the deal set behind it — a clean median from a garbage deal set is still a garbage valuation.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: 'Three questions that come up in almost every precedent transactions discussion. Pick the strongest answer for each.',
    body2: "These aren't trick questions — they're testing whether you actually understand why this method exists, not just how to build the table.",
    takeaway: 'If you can explain control premium, staleness, and small-sample noise fluently and fast, you\'ve covered the questions that actually get asked.',
  },
];

const CRITERIA = [
  { id: 'industry', label: 'INDUSTRY', color: '#4FC3C7', detail: 'Same sector, ideally the same sub-vertical. A software roll-up deal tells you little about industrial multiples, even if both are "tech-adjacent."' },
  { id: 'size', label: 'DEAL SIZE', color: '#C4B79A', detail: 'Multiples often scale with deal size — larger targets can command different (usually higher) multiples than small bolt-on acquisitions in the same industry.' },
  { id: 'type', label: 'DEAL TYPE', color: '#D9694F', detail: 'A strategic acquirer paying for synergies pays differently than a financial sponsor. Mixing the two without noting which is which muddies the multiple.' },
  { id: 'timing', label: 'TIME WINDOW', color: '#86AE9E', detail: 'Rate environment and market sentiment shift over time. A tight window (2–3 years) keeps the comparison set relevant to current conditions.' },
];

const DEALS = [
  { name: 'TitanCo / Meridian Labs', year: 2024, multiple: 11.2, stale: false },
  { name: 'Vale Group / Harbor Systems', year: 2023, multiple: 10.5, stale: false },
  { name: 'Crestline / Union Robotics', year: 2022, multiple: 9.8, stale: false },
  { name: 'Ashford Partners / NorthGate', year: 2021, multiple: 9.1, stale: false },
  { name: 'Redwood Capital / OldRiver Corp', year: 2019, multiple: 14.6, stale: true },
];

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

const QUIZ = [
  { q: 'Why would precedent transaction multiples typically be higher than trading comps for the same company?', choices: ['Precedent deals are always overpaid', 'Control premium', 'Trading comps exclude debt'], correct: 1, explain: 'Correct — acquiring 100% control commands a premium (typically 20–40%) over the price a minority shareholder pays on the open market.' },
  { q: 'What is the biggest practical drawback of precedent transactions analysis?', choices: ['Small, stale deal samples with deal-specific noise', 'It never uses EBITDA', 'It only works for public companies'], correct: 0, explain: 'Correct — good comparable deals are scarce, older ones may not reflect current conditions, and any single deal can be distorted by a bidding war or unique synergies.' },
  { q: "A 2015 deal at 15x EBITDA shows up in your deal set alongside four 2023–2024 deals at 9–11x. What should you do?", choices: ['Average all five equally', 'Flag it as stale and weight it down or exclude it', 'Delete the whole deal set'], correct: 1, explain: "Correct — don't hide it, but don't treat a rate/market environment from a decade ago as equally relevant to today's deal." },
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

function Lesson1({ isPrecedent, setIsPrecedent }) {
  const tradingValue = 850;
  const precedentValue = Math.round(tradingValue * 1.28);
  return (
    <>
      <div className="valufin-pta-eyebrow">TOGGLE THE METHOD →</div>
      <div className="valufin-pta-tabs">
        <button className={`valufin-pta-tab${!isPrecedent ? ' active' : ''}`} onClick={() => setIsPrecedent(false)}>TRADING COMPS</button>
        <button className={`valufin-pta-tab clay${isPrecedent ? ' active' : ''}`} onClick={() => setIsPrecedent(true)}>PRECEDENT TRANSACTIONS</button>
      </div>
      <div className="valufin-pta-panel">
        <div className="valufin-pta-panel-label">{isPrecedent ? 'IMPLIED VALUE — CONTROLLING STAKE' : 'IMPLIED VALUE — MINORITY STAKE'}</div>
        <div className="valufin-pta-panel-value" style={{ color: isPrecedent ? '#D9694F' : '#4FC3C7' }}>${isPrecedent ? precedentValue : tradingValue}M</div>
        <p className="valufin-pta-panel-body">
          {isPrecedent
            ? 'This reflects what a buyer actually paid to acquire 100% of a comparable company — including the premium needed to convince the board and shareholders to sell control.'
            : "This reflects where comparable public companies currently trade on the open market — the price for a small, minority slice, with no control premium attached."}
        </p>
      </div>
      <div className="valufin-pta-takeaway-terminal">
        <div className="valufin-pta-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-pta-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ activeCriterion, setActiveCriterion }) {
  const active = CRITERIA.find((c) => c.id === activeCriterion) || CRITERIA[0];
  return (
    <>
      <div className="valufin-pta-eyebrow">CLICK EACH CRITERION →</div>
      <div className="valufin-pta-criteria-row">
        {CRITERIA.map((c) => (
          <button
            key={c.id}
            className={`valufin-pta-criteria-card${c.id === activeCriterion ? ' active' : ''}`}
            style={c.id === activeCriterion ? { borderColor: c.color, background: `${c.color}18` } : undefined}
            onClick={() => setActiveCriterion(c.id)}
          >
            <div className="valufin-pta-criteria-label" style={{ color: c.color }}>{c.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-pta-detail">
        <div className="valufin-pta-detail-head" style={{ color: active.color }}>{active.label}</div>
        <p className="valufin-pta-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-pta-takeaway-clay">
        <span className="valufin-pta-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21a8 8 0 0 1 16 0M12 3.5v8.5h8.5" /></svg>
        </span>
        <div className="valufin-pta-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ premium, setPremium }) {
  const baseline = 8.0;
  const precedentMultiple = (baseline * (1 + premium / 100)).toFixed(1);
  return (
    <>
      <div className="valufin-pta-eyebrow">DRAG THE CONTROL PREMIUM →</div>
      <div className="valufin-pta-panel">
        <div className="valufin-pta-row">
          <span className="valufin-pta-row-label">TRADING MULTIPLE (BASELINE)</span>
          <span className="valufin-pta-row-value">{baseline.toFixed(1)}x</span>
        </div>
        <div className="valufin-pta-row" style={{ marginTop: 14 }}>
          <span className="valufin-pta-row-label">CONTROL PREMIUM</span>
          <span className="valufin-pta-row-value" style={{ color: '#D9694F' }}>{premium}%</span>
        </div>
        <input className="valufin-pta-range" type="range" min={20} max={40} value={premium} onChange={(e) => setPremium(Number(e.target.value))} />
        <div className="valufin-pta-result">
          <div className="valufin-pta-result-label">TRADING × (1 + PREMIUM) =</div>
          <div className="valufin-pta-result-value">{precedentMultiple}x</div>
          <div className="valufin-pta-result-verdict">The precedent transaction multiple — what an acquirer actually paid for full control.</div>
        </div>
      </div>
      <div className="valufin-pta-takeaway-dashed">
        <span className="valufin-pta-takeaway-dashed-check">✓</span>
        <div className="valufin-pta-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ includeStale, setIncludeStale }) {
  const activeDeals = includeStale ? DEALS : DEALS.filter((d) => !d.stale);
  const multiples = activeDeals.map((d) => d.multiple);
  const low = Math.min(...multiples);
  const high = Math.max(...multiples);
  const med = median(multiples);
  return (
    <>
      <div className="valufin-pta-eyebrow">INCLUDE THE 2019 DEAL?</div>
      <div className="valufin-pta-panel">
        <div className="valufin-pta-deal-table">
          <div className="valufin-pta-deal-head"><span>Deal</span><span>Year</span><span>EV/EBITDA</span></div>
          {DEALS.map((d) => (
            <div key={d.name} className={`valufin-pta-deal-row${d.stale && !includeStale ? ' excluded' : ''}`}>
              <span>{d.name}{d.stale && <em> (stale)</em>}</span>
              <span>{d.year}</span>
              <span className="accent">{d.multiple.toFixed(1)}x</span>
            </div>
          ))}
        </div>
        <button className="valufin-pta-toggle-btn" onClick={() => setIncludeStale(!includeStale)}>
          <span className={`valufin-pta-toggle-track${includeStale ? ' on' : ''}`}><span className="valufin-pta-toggle-knob" /></span>
          <span>{includeStale ? 'INCLUDING 2019 DEAL' : 'EXCLUDING 2019 DEAL'}</span>
        </button>
        <div className="valufin-pta-deal-stats">
          <span>Range: {low.toFixed(1)}x – {high.toFixed(1)}x</span>
          <span>Median: {med.toFixed(1)}x</span>
        </div>
      </div>
      <div className="valufin-pta-takeaway-rule gold">
        <div className="valufin-pta-takeaway-rule-label" style={{ color: '#C4B79A' }}>KEY TAKEAWAY</div>
        <div className="valufin-pta-takeaway-rule-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ ebitda, setEbitda }) {
  const medianMultiple = median(DEALS.filter((d) => !d.stale).map((d) => d.multiple));
  const impliedEV = Math.round(ebitda * medianMultiple);
  return (
    <>
      <div className="valufin-pta-eyebrow">ADJUST TARGET EBITDA →</div>
      <div className="valufin-pta-panel">
        <div className="valufin-pta-row">
          <span className="valufin-pta-row-label">TARGET EBITDA</span>
          <span className="valufin-pta-row-value">${ebitda}M</span>
        </div>
        <input className="valufin-pta-range" type="range" min={60} max={180} step={5} value={ebitda} onChange={(e) => setEbitda(Number(e.target.value))} />
        <div className="valufin-pta-result">
          <div className="valufin-pta-result-label">${ebitda}M × {medianMultiple.toFixed(1)}x MEDIAN =</div>
          <div className="valufin-pta-result-value">${impliedEV}M</div>
          <div className="valufin-pta-result-verdict">Implied enterprise value from the precedent deal set.</div>
        </div>
      </div>
      <div className="valufin-pta-takeaway-quote">
        <span className="valufin-pta-takeaway-quote-mark">"</span>
        <div className="valufin-pta-takeaway-quote-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

function Lesson6({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-pta-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-pta-panel">
        <div className="valufin-pta-quiz-q">{q.q}</div>
        <div className="valufin-pta-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button
                key={c}
                className={`valufin-pta-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`}
                onClick={() => picked === null && setPicked(i)}
              >
                {c}
              </button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-pta-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-pta-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-pta-takeaway-rule red">
        <div className="valufin-pta-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-pta-takeaway-rule-body">{LESSONS[5].takeaway}</div>
      </div>
    </>
  );
}

export default function PrecedentTransactions() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);

  const [isPrecedent, setIsPrecedent] = useState(false);
  const [activeCriterion, setActiveCriterion] = useState('industry');
  const [premium, setPremium] = useState(28);
  const [includeStale, setIncludeStale] = useState(false);
  const [ebitda, setEbitda] = useState(110);
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState(null);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => { const idx = completed.findIndex((c) => !c); return idx === -1 ? completed.length - 1 : idx; })();

  function resetLessonState() {
    setQuizIndex(0);
    setPicked(null);
  }
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
          ? [{ label: 'Investment Banking', path: '/ib' }, { label: 'Precedent Transactions' }]
          : [{ label: 'Investment Banking', path: '/ib' }, { label: 'Precedent Transactions', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill good-to-have">Good to have</span>
            <span className="valufin-ticker-caption">PTA · PRECEDENT TRANSACTIONS</span>
          </div>
          <h1 className="valufin-archivo-h1">Precedent<br />Transactions</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Valuing a company by what buyers actually paid for comparable companies in past M&amp;A
            deals — the control premium, the deal-set noise, and how it differs from trading comps.
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
          <div className="valufin-lesson-detail-eyebrow">PRECEDENT TRANSACTIONS · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 isPrecedent={isPrecedent} setIsPrecedent={setIsPrecedent} />}
          {activeIndex === 1 && <Lesson2 activeCriterion={activeCriterion} setActiveCriterion={setActiveCriterion} />}
          {activeIndex === 2 && <Lesson3 premium={premium} setPremium={setPremium} />}
          {activeIndex === 3 && <Lesson4 includeStale={includeStale} setIncludeStale={setIncludeStale} />}
          {activeIndex === 4 && <Lesson5 ebitda={ebitda} setEbitda={setEbitda} />}
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
