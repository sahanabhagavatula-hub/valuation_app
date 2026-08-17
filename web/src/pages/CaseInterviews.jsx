import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A', '#D9694F'];

const LESSONS = [
  {
    title: 'The overall case flow',
    minutes: 6,
    kind: 'interactive',
    body1: 'Every case interview, regardless of topic, moves through the same five stages. Losing track of which stage you\'re in is one of the fastest ways to sound unstructured.',
    body2: 'Click through each stage below in order.',
    takeaway: 'Clarify → structure → hypothesis → analyze → synthesize. Naming the stage you\'re in out loud ("let me structure this before I dive in") signals control of the case, not just the content.',
  },
  {
    title: 'Building a MECE issue tree',
    minutes: 7,
    kind: 'activity',
    body1: 'MECE means Mutually Exclusive, Collectively Exhaustive — every branch of your structure should be distinct, and together they should cover the whole problem.',
    body2: 'Build a tree for "the client\'s profits declined" by picking branches step by step.',
    takeaway: "A clean issue tree is the skeleton the rest of the case hangs on — get the branches wrong (overlapping or incomplete) and every analysis built on top of it inherits the flaw.",
  },
  {
    title: 'The profitability framework, live',
    minutes: 7,
    kind: 'interactive',
    body1: 'Profit = Revenue − Costs, and Revenue = Price × Volume. Almost every "profits declined" case reduces to isolating which of these three moved.',
    body2: "Adjust this year's price and volume below against last year's baseline and watch profit respond.",
    takeaway: 'Before you can recommend anything, you have to correctly diagnose whether the problem is price, volume, or cost — recommending a fix for the wrong driver is worse than no recommendation at all.',
  },
  {
    title: 'Structuring the recommendation',
    minutes: 6,
    kind: 'interactive',
    body1: 'A case answer has the same shape as a good slide: situation, so-what, recommendation — lead with the answer, then support it.',
    body2: 'Click each part of the structure to see what it needs to cover, using a market-entry example.',
    takeaway: "Recommendation-first isn't just a communication style — it forces you to know your own answer before you start justifying it, which is exactly the discipline interviewers are testing.",
  },
  {
    title: 'Common candidate mistakes',
    minutes: 5,
    kind: 'interactive',
    body1: 'The same handful of mistakes show up in almost every weak case performance. Click each one to see why it hurts.',
    body2: 'These are all fixable with practice — the goal is to recognize them in yourself before an interviewer has to point them out.',
    takeaway: "Jumping to solutions before structuring, doing math without labeling units, and forgetting to synthesize at the end are the three most common ways a strong candidate still loses points.",
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: 'A few conceptual checks on case structure and flow.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'Structure, a labeled framework, and a synthesized recommendation at the end — nail those three and the specific case topic almost stops mattering.',
  },
];

const STAGES = [
  { label: 'CLARIFY', detail: 'Restate the question in your own words and ask 1-2 sharpening questions before doing anything else. Never start structuring on a question you haven\'t confirmed.' },
  { label: 'STRUCTURE', detail: 'Lay out a MECE framework for how you\'ll approach the problem — out loud, before diving into any numbers.' },
  { label: 'HYPOTHESIS', detail: 'State an initial, testable guess at the answer based on the structure. This gives the analysis a direction instead of wandering.' },
  { label: 'ANALYZE', detail: 'Work the numbers and the framework branches, labeling units as you go and checking each result against the hypothesis.' },
  { label: 'SYNTHESIZE', detail: 'Deliver a clear recommendation first, then the 2-3 reasons behind it — never end on a number with no conclusion attached.' },
];

const TREE_STEPS = [
  { id: 'first', prompt: 'The client\'s profits declined. First split:', options: ['Revenue', 'Cost'] },
  { id: 'second', prompt: null, optionsFor: { Revenue: ['Price', 'Volume'], Cost: ['Fixed costs', 'Variable costs'] } },
];

const MISTAKES = [
  { label: 'Jumping to solutions', detail: 'Proposing a fix before structuring the problem skips the analysis entirely — it reads as guessing, not solving.' },
  { label: 'Unlabeled math', detail: 'Doing arithmetic without saying what the numbers represent ("that\'s $12... per unit, per year?") loses the interviewer and loses credibility.' },
  { label: 'No synthesis at the end', detail: "Trailing off after the last calculation without a clear recommendation leaves the interviewer to do your job for you." },
];

const QUIZ = [
  { q: 'What should you do immediately after being given a case prompt?', choices: ['Start calculating right away', 'Clarify the question and confirm the objective before structuring', 'Ask what framework the interviewer wants you to use'], correct: 1, explain: 'Correct — confirming the actual question first prevents solving the wrong problem later.' },
  { q: 'What does MECE stand for?', choices: ['Mutually Exclusive, Collectively Exhaustive', 'Market Entry, Cost Evaluation', 'Multiple Estimates, Consistent Explanation'], correct: 0, explain: 'Correct — no overlap between branches, and together the branches cover the whole problem.' },
  { q: 'What\'s the most common way a candidate with strong math skills still loses points?', choices: ['Making an arithmetic error', 'Forgetting to synthesize a clear recommendation at the end', 'Using a calculator instead of mental math'], correct: 1, explain: "Correct — great analysis with no clear recommendation at the end reads as unfinished, regardless of how clean the math was." },
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

function Lesson1({ activeStage, setActiveStage }) {
  return (
    <>
      <div className="valufin-cse-eyebrow">CLICK THROUGH IN ORDER →</div>
      <div className="valufin-cse-criteria-row">
        {STAGES.map((s, i) => (
          <button key={s.label} className={`valufin-cse-criteria-card${activeStage === i ? ' active' : ''}`} onClick={() => setActiveStage(i)}>
            <div className="valufin-cse-criteria-num">{i + 1}</div>
            <div className="valufin-cse-criteria-label">{s.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-cse-detail">
        <div className="valufin-cse-detail-head">{STAGES[activeStage].label}</div>
        <p className="valufin-cse-detail-body">{STAGES[activeStage].detail}</p>
      </div>
      <div className="valufin-cse-takeaway-terminal">
        <div className="valufin-cse-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-cse-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ firstPick, setFirstPick, secondPick, setSecondPick }) {
  const secondOptions = firstPick ? TREE_STEPS[1].optionsFor[firstPick] : [];
  return (
    <>
      <div className="valufin-cse-eyebrow">BUILD THE TREE →</div>
      <div className="valufin-cse-panel">
        <div className="valufin-cse-tree-prompt">{TREE_STEPS[0].prompt}</div>
        <div className="valufin-cse-pick-row">
          {TREE_STEPS[0].options.map((o) => (
            <button key={o} className={`valufin-cse-pick-choice${firstPick === o ? ' active' : ''}`} onClick={() => { setFirstPick(o); setSecondPick(null); }}>{o}</button>
          ))}
        </div>
        {firstPick && (
          <>
            <div className="valufin-cse-tree-prompt" style={{ marginTop: 18 }}>Under "{firstPick}", next split:</div>
            <div className="valufin-cse-pick-row">
              {secondOptions.map((o) => (
                <button key={o} className={`valufin-cse-pick-choice${secondPick === o ? ' active' : ''}`} onClick={() => setSecondPick(o)}>{o}</button>
              ))}
            </div>
          </>
        )}
        {firstPick && secondPick && (
          <div className="valufin-cse-tree-result">
            Profits declined → <b>{firstPick}</b> → <b>{secondPick}</b>
          </div>
        )}
      </div>
      <div className="valufin-cse-takeaway-clay">
        <span className="valufin-cse-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v6M12 9l-6 6M12 9l6 6" /></svg>
        </span>
        <div className="valufin-cse-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ price, setPrice, volume, setVolume }) {
  const priorRevenue = 110, priorCost = 80, priorProfit = priorRevenue - priorCost;
  const revenue = price * volume;
  const cost = 80;
  const profit = revenue - cost;
  const delta = profit - priorProfit;
  return (
    <>
      <div className="valufin-cse-eyebrow">ADJUST PRICE & VOLUME →</div>
      <div className="valufin-cse-panel">
        <div className="valufin-cse-row"><span className="valufin-cse-row-label">PRIOR YEAR: REVENUE $110M − COST $80M</span><span className="valufin-cse-row-value">PROFIT ${priorProfit}M</span></div>
        <div className="valufin-cse-row" style={{ marginTop: 14 }}><span className="valufin-cse-row-label">THIS YEAR PRICE INDEX</span><span className="valufin-cse-row-value">{price.toFixed(2)}</span></div>
        <input className="valufin-cse-range" type="range" min={0.8} max={1.2} step={0.01} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <div className="valufin-cse-row" style={{ marginTop: 14 }}><span className="valufin-cse-row-label">THIS YEAR VOLUME ($M UNITS)</span><span className="valufin-cse-row-value">{volume.toFixed(0)}</span></div>
        <input className="valufin-cse-range" type="range" min={80} max={140} value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
        <div className="valufin-cse-result">
          <div className="valufin-cse-result-label">REVENUE ${revenue.toFixed(0)}M − COST ${cost}M =</div>
          <div className="valufin-cse-result-value" style={{ color: delta >= 0 ? '#3FBF6F' : '#D9694F' }}>${profit.toFixed(0)}M</div>
          <div className="valufin-cse-result-verdict">{delta >= 0 ? `Profit up $${delta.toFixed(0)}M vs. last year.` : `Profit down $${Math.abs(delta).toFixed(0)}M vs. last year.`}</div>
        </div>
      </div>
      <div className="valufin-cse-takeaway-dashed">
        <span className="valufin-cse-takeaway-dashed-check">✓</span>
        <div className="valufin-cse-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

const REC_PARTS = [
  { label: 'SITUATION', detail: 'The client is a mid-size retailer considering entering the online grocery market in a new region.' },
  { label: 'SO WHAT', detail: 'Market size is large and growing, but margins are thin and two entrenched competitors already have delivery infrastructure built out.' },
  { label: 'RECOMMENDATION', detail: 'Do not enter directly — instead, explore a partnership with an existing delivery player to test demand before committing capital.' },
];

function Lesson4({ activePart, setActivePart }) {
  return (
    <>
      <div className="valufin-cse-eyebrow">CLICK EACH PART →</div>
      <div className="valufin-cse-tabs">
        {REC_PARTS.map((p, i) => (
          <button key={p.label} className={`valufin-cse-tab${activePart === i ? ' active' : ''}`} onClick={() => setActivePart(i)}>{p.label}</button>
        ))}
      </div>
      <div className="valufin-cse-panel">
        <p className="valufin-cse-panel-body">{REC_PARTS[activePart].detail}</p>
      </div>
      <div className="valufin-cse-takeaway-quote">
        <span className="valufin-cse-takeaway-quote-mark">"</span>
        <div className="valufin-cse-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ activeMistake, setActiveMistake }) {
  return (
    <>
      <div className="valufin-cse-eyebrow">CLICK EACH MISTAKE →</div>
      <div className="valufin-cse-criteria-row">
        {MISTAKES.map((m, i) => (
          <button key={m.label} className={`valufin-cse-criteria-card${activeMistake === i ? ' active' : ''}`} onClick={() => setActiveMistake(i)}>
            <div className="valufin-cse-criteria-label">{m.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-cse-detail">
        <div className="valufin-cse-detail-head">{MISTAKES[activeMistake].label}</div>
        <p className="valufin-cse-detail-body">{MISTAKES[activeMistake].detail}</p>
      </div>
      <div className="valufin-cse-takeaway-rule gold">
        <div className="valufin-cse-takeaway-rule-label" style={{ color: '#C4B79A' }}>KEY TAKEAWAY</div>
        <div className="valufin-cse-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

function Lesson6({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-cse-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-cse-panel">
        <div className="valufin-cse-quiz-q">{q.q}</div>
        <div className="valufin-cse-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-cse-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-cse-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-cse-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-cse-takeaway-rule red">
        <div className="valufin-cse-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-cse-takeaway-rule-body">{LESSONS[5].takeaway}</div>
      </div>
    </>
  );
}

export default function CaseInterviews() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);

  const [activeStage, setActiveStage] = useState(0);
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [price, setPrice] = useState(1);
  const [volume, setVolume] = useState(110);
  const [activePart, setActivePart] = useState(0);
  const [activeMistake, setActiveMistake] = useState(0);
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
          ? [{ label: 'Consulting', path: '/consulting' }, { label: 'Case Interviews' }]
          : [{ label: 'Consulting', path: '/consulting' }, { label: 'Case Interviews', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know-clay">Must-know</span>
            <span className="valufin-ticker-caption">CSE · CASE INTERVIEWS</span>
          </div>
          <h1 className="valufin-archivo-h1">Case<br />Interviews</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            The core loop of every consulting interview — clarify, structure, hypothesize,
            analyze, synthesize — and the mistakes that quietly sink strong candidates.
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
          <div className="valufin-lesson-detail-eyebrow">CASE INTERVIEWS · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 activeStage={activeStage} setActiveStage={setActiveStage} />}
          {activeIndex === 1 && <Lesson2 firstPick={firstPick} setFirstPick={setFirstPick} secondPick={secondPick} setSecondPick={setSecondPick} />}
          {activeIndex === 2 && <Lesson3 price={price} setPrice={setPrice} volume={volume} setVolume={setVolume} />}
          {activeIndex === 3 && <Lesson4 activePart={activePart} setActivePart={setActivePart} />}
          {activeIndex === 4 && <Lesson5 activeMistake={activeMistake} setActiveMistake={setActiveMistake} />}
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
