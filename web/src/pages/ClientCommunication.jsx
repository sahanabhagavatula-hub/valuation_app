import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'Translate jargon into plain language',
    minutes: 6,
    kind: 'matching',
    body1: "Clients don't need the technical term — they need to understand what it means for them. The skill is translating any concept into plain language with a concrete analogy.",
    body2: 'Match each technical term below to its plain-language translation.',
    takeaway: 'If you can\'t explain a concept without jargon, you don\'t understand it well enough yet to reassure a nervous client with it.',
  },
  {
    title: 'Explaining underperformance',
    minutes: 6,
    kind: 'interactive',
    body1: "When performance is down, the instinct is to get defensive or bury the number. Neither works. Lead with context — market environment, benchmark comparison — before any conclusion.",
    body2: 'Toggle between a defensive answer and a context-first answer to the same client question.',
    takeaway: 'Never bury bad news, but frame it: what happened in the market, how the portfolio did relative to its benchmark, and what that does or doesn\'t change about the plan.',
  },
  {
    title: 'Managing expectations in volatility',
    minutes: 5,
    kind: 'interactive',
    body1: 'A nervous client in a downturn is really asking one underlying question: "should I panic?" Every good answer reiterates the plan and the goals, not just the portfolio\'s current number.',
    body2: 'Click through the three components of a calm, grounding response.',
    takeaway: 'Clients stay calm when reminded why the strategy was chosen in the first place — the plan is the anchor, not the current portfolio value.',
  },
  {
    title: 'Pick your response',
    minutes: 6,
    kind: 'role-play',
    body1: 'A client just messaged you, upset. Pick the response that actually handles it well.',
    body2: 'Only one of these three genuinely listens first and reframes with context — the other two are common mistakes.',
    takeaway: 'The best response listens first, then reframes with context — it never dismisses the concern or promises outcomes you can\'t control.',
  },
  {
    title: 'Interview Q&A',
    minutes: 5,
    kind: 'quiz',
    body1: '"How would you explain a market downturn to a nervous client?" is a near-universal WAM behavioral/case hybrid question.',
    body2: 'Pick the strongest structure for each scenario below.',
    takeaway: 'A strong answer shows empathy, facts, and a reaffirmed long-term plan — never just data, and never just reassurance with nothing behind it.',
  },
];

const JARGON_PAIRS = [
  { term: 'Volatility', analogy: 'How much the ride shakes — not whether you crash.' },
  { term: 'Diversification', analogy: "Not putting all your eggs in one basket, so one bad basket doesn't ruin breakfast." },
  { term: 'Rebalancing', analogy: 'Trimming the garden back to the shape you planned, not letting one plant take over.' },
  { term: 'Correlation', analogy: 'Whether two things tend to zig and zag together, or at different times.' },
];

const RESPONSES = [
  { label: '"This is only a paper loss — you\'re still up since you started with us, and markets do recover."', good: true, feedback: 'Strong — listens to the real concern (fear of loss) and reframes with actual context instead of dismissing the feeling.' },
  { label: '"Actually our benchmark fell 40%, so we outperformed significantly — you should be pleased."', good: false, feedback: "Risky — technically true, but an upset client rarely wants to hear 'you should feel better' framed as beating an index." },
  { label: '"Markets are efficient long-term, there\'s nothing to worry about."', good: false, feedback: "Too dismissive — skips listening entirely and doesn't address the client's actual emotional state before jumping to reassurance." },
];

const EXPECTATION_STEPS = [
  { label: 'ACKNOWLEDGE', detail: 'Name what\'s happening honestly — "markets are down and that\'s uncomfortable to watch" — before anything else.' },
  { label: 'CONTEXTUALIZE', detail: 'Show how this compares to the benchmark and to past drawdowns the plan was already built to withstand.' },
  { label: 'REAFFIRM THE PLAN', detail: 'Reconnect to the original goals and time horizon — the reason this allocation was chosen in the first place.' },
];

const QUIZ = [
  { q: 'A client\'s portfolio just underperformed its benchmark. What should you lead with?', choices: ['An apology and a promise to do better', 'The market environment and context, before any conclusion', 'A detailed list of every trade made this quarter'], correct: 1, explain: 'Correct — context first, then an honest read on what it does or doesn\'t change. Never bury the number, but don\'t lead with a conclusion either.' },
  { q: 'What\'s the real question behind "I\'m worried about my portfolio" during a downturn?', choices: ['A request for a full performance report', 'Should I panic and change the plan?', 'A complaint about fees'], correct: 1, explain: 'Correct — the strongest response reconnects the client to the original plan and goals, which is what actually answers the underlying question.' },
  { q: 'What\'s the most common weakness in a defensive response to bad performance?', choices: ['Too much data', 'It skips listening and jumps straight to reassurance', 'It uses too many charts'], correct: 1, explain: 'Correct — reassurance without first acknowledging the concern reads as dismissive, even when the underlying facts are reassuring.' },
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

function Lesson1({ selectedTerm, matches, setMatches }) {
  const [pendingTerm, setPendingTerm] = useState(null);
  function pickTerm(term) { setPendingTerm(term); }
  function pickAnalogy(analogy) {
    if (!pendingTerm) return;
    const next = { ...matches, [pendingTerm]: analogy };
    setMatches(next);
    setPendingTerm(null);
  }
  const shuffledAnalogies = JARGON_PAIRS.map((p) => p.analogy);
  return (
    <>
      <div className="valufin-ccm-eyebrow">CLICK A TERM, THEN ITS TRANSLATION →</div>
      <div className="valufin-ccm-match-grid">
        <div className="valufin-ccm-match-col">
          {JARGON_PAIRS.map((p) => {
            const done = !!matches[p.term];
            const isCorrect = matches[p.term] === p.analogy;
            return (
              <button
                key={p.term}
                className={`valufin-ccm-match-term${pendingTerm === p.term ? ' active' : ''}${done ? (isCorrect ? ' correct' : ' wrong') : ''}`}
                onClick={() => !done && pickTerm(p.term)}
                disabled={done}
              >
                {p.term}
              </button>
            );
          })}
        </div>
        <div className="valufin-ccm-match-col">
          {shuffledAnalogies.map((a) => {
            const usedBy = Object.entries(matches).find(([, v]) => v === a);
            return (
              <button key={a} className={`valufin-ccm-match-analogy${usedBy ? ' used' : ''}${pendingTerm ? ' selectable' : ''}`} onClick={() => pickAnalogy(a)} disabled={!!usedBy}>
                {a}
              </button>
            );
          })}
        </div>
      </div>
      <div className="valufin-ccm-takeaway-terminal">
        <div className="valufin-ccm-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-ccm-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ contextFirst, setContextFirst }) {
  return (
    <>
      <div className="valufin-ccm-eyebrow">TOGGLE THE RESPONSE →</div>
      <div className="valufin-ccm-tabs">
        <button className={`valufin-ccm-tab clay${!contextFirst ? ' active' : ''}`} onClick={() => setContextFirst(false)}>DEFENSIVE</button>
        <button className={`valufin-ccm-tab${contextFirst ? ' active' : ''}`} onClick={() => setContextFirst(true)}>CONTEXT-FIRST</button>
      </div>
      <div className="valufin-ccm-panel">
        <p className="valufin-ccm-panel-body">
          {contextFirst
            ? '"The whole market was down 15% this quarter — you were down 11%, so the portfolio actually held up better than the benchmark. Here\'s what drove that, and here\'s what it means for your plan going forward."'
            : '"Well, markets are unpredictable, and honestly a lot of managers underperformed this quarter, it\'s really not just us..."'}
        </p>
      </div>
      <div className="valufin-ccm-takeaway-clay">
        <span className="valufin-ccm-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21a8 8 0 0 1 16 0M12 3.5v8.5h8.5" /></svg>
        </span>
        <div className="valufin-ccm-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activeStep, setActiveStep }) {
  return (
    <>
      <div className="valufin-ccm-eyebrow">CLICK EACH STEP →</div>
      <div className="valufin-ccm-criteria-row">
        {EXPECTATION_STEPS.map((s, i) => (
          <button key={s.label} className={`valufin-ccm-criteria-card${activeStep === i ? ' active' : ''}`} onClick={() => setActiveStep(i)}>
            <div className="valufin-ccm-criteria-label">{i + 1}. {s.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-ccm-detail">
        <div className="valufin-ccm-detail-head">{EXPECTATION_STEPS[activeStep].label}</div>
        <p className="valufin-ccm-detail-body">{EXPECTATION_STEPS[activeStep].detail}</p>
      </div>
      <div className="valufin-ccm-takeaway-dashed">
        <span className="valufin-ccm-takeaway-dashed-check">✓</span>
        <div className="valufin-ccm-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ responseOpen, setResponseOpen }) {
  return (
    <>
      <div className="valufin-ccm-eyebrow">PICK YOUR RESPONSE →</div>
      <div className="valufin-ccm-client-message">
        <span className="valufin-ccm-client-avatar">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
        </span>
        <div>
          <div className="valufin-ccm-client-message-label">CLIENT MESSAGE</div>
          <p className="valufin-ccm-client-message-body">"My portfolio is down 20% this quarter. I'm furious — what is your firm doing about this?"</p>
        </div>
      </div>
      {RESPONSES.map((r, i) => {
        const open = responseOpen === i;
        return (
          <button key={r.label} className={`valufin-ccm-response-row${open ? (r.good ? ' good' : ' bad') : ''}`} onClick={() => setResponseOpen(i)}>
            <span className="valufin-ccm-response-badge" style={{ background: open ? (r.good ? '#3FBF6F' : '#D9694F') : 'rgba(255,255,255,0.08)', color: open ? '#0A0E14' : '#8F887A' }}>
              {open ? (r.good ? '✓' : '✗') : String.fromCharCode(65 + i)}
            </span>
            <div style={{ flex: 1 }}>
              <div className="valufin-ccm-response-label">{r.label}</div>
              {open && <div className="valufin-ccm-response-feedback" style={{ color: r.good ? '#3FBF6F' : '#D9694F' }}>{r.feedback}</div>}
            </div>
          </button>
        );
      })}
      <div className="valufin-ccm-takeaway-quote">
        <span className="valufin-ccm-takeaway-quote-mark">"</span>
        <div className="valufin-ccm-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-ccm-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-ccm-panel">
        <div className="valufin-ccm-quiz-q">{q.q}</div>
        <div className="valufin-ccm-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-ccm-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-ccm-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-ccm-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-ccm-takeaway-rule red">
        <div className="valufin-ccm-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-ccm-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function ClientCommunication() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [matches, setMatches] = useState({});
  const [contextFirst, setContextFirst] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [responseOpen, setResponseOpen] = useState(null);
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
          ← {view === 'list' ? 'Wealth & Asset Management' : 'Client Communication'}
        </button>
        <span className="valufin-lesson-topbar-tag">CCM · CLIENT COMMUNICATION</span>
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know-clay">Must-know</span>
            <span className="valufin-ticker-caption">CCM · CLIENT COMMUNICATION</span>
          </div>
          <h1 className="valufin-archivo-h1">Client<br />Communication</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Explaining markets and performance to non-expert clients — especially when the
            news isn't good.
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
          <div className="valufin-lesson-detail-eyebrow">CLIENT COMMUNICATION · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 matches={matches} setMatches={setMatches} />}
          {activeIndex === 1 && <Lesson2 contextFirst={contextFirst} setContextFirst={setContextFirst} />}
          {activeIndex === 2 && <Lesson3 activeStep={activeStep} setActiveStep={setActiveStep} />}
          {activeIndex === 3 && <Lesson4 responseOpen={responseOpen} setResponseOpen={setResponseOpen} />}
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
