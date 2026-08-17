import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7'];

const LESSONS = [
  {
    title: 'Outreach message structure',
    minutes: 6,
    kind: 'interactive',
    body1: 'A cold outreach message needs a reason it\'s landing in this specific person\'s inbox — not a generic template blasted to fifty people.',
    body2: 'Click through the parts of a strong outreach message.',
    takeaway: 'The strongest outreach messages are short, specific, and clearly not copy-pasted — a shared connection, school, or a specific note about the person\'s work goes a long way.',
  },
  {
    title: 'Information, not a job',
    minutes: 5,
    kind: 'interactive',
    body1: 'Networking calls should be framed as information-gathering, not job-asking — the ask should feel earned later, not upfront.',
    body2: 'Toggle between a job-seeking pitch and an insight-seeking one.',
    takeaway: 'Leading with "can you help me get a job" burns the conversation immediately — leading with genuine curiosity about their work builds the relationship that makes an eventual ask land naturally.',
  },
  {
    title: 'What to actually ask',
    minutes: 6,
    kind: 'matching',
    body1: 'Specific, researched questions land far better than generic ones — match each weak question below to a stronger version.',
    body2: null,
    takeaway: '"What\'s the group\'s current deal flow like in healthcare?" beats "what\'s it like working there?" every time — specificity signals you did the homework.',
  },
  {
    title: 'Follow-up etiquette',
    minutes: 5,
    kind: 'interactive',
    body1: 'Always follow up with a thank-you and a specific detail from the conversation — it shows the conversation was actually valued, not just checked off a list.',
    body2: 'Click through the follow-up timeline below.',
    takeaway: "A referral or name-drop from a genuine conversation carries real weight in resume screens — the habit pays off well beyond just the conversation itself.",
  },
  {
    title: 'Practice drill',
    minutes: 5,
    kind: 'quiz',
    body1: "This module links directly forward to \"Why This Firm\" — strong networking becomes your strongest evidence there.",
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'Every good networking conversation is a future "why this firm" talking point in disguise — that\'s the actual point of doing it well.',
  },
];

const OUTREACH_PARTS = [
  { label: 'THE SPECIFIC HOOK', detail: 'A shared connection, school, or a specific detail about their work — the reason this message is landing in their inbox and not a stranger\'s.' },
  { label: 'THE ASK', detail: 'Keep it small and specific — a 15-minute call, not an open-ended "can we chat sometime."' },
  { label: 'THE CLOSE', detail: 'Make it easy to say yes — suggest a couple of specific times, don\'t make them do the scheduling work.' },
];

const QUESTION_PAIRS = [
  { weak: '"What\'s it like working there?"', strong: '"What\'s the group\'s current deal flow like in the healthcare sector?"' },
  { weak: '"Can you get me a job?"', strong: '"What would you say separates candidates who do well in this process?"' },
  { weak: '"Do you like your job?"', strong: '"What\'s a project you\'ve worked on recently that you found genuinely interesting?"' },
];

const FOLLOWUP_STEPS = [
  { label: 'SAME DAY', detail: 'Send a thank-you within 24 hours — reference one specific thing they said, not a generic "thanks for your time."' },
  { label: 'WEEKS LATER', detail: "If you have a real update (applied, got an interview), a brief note keeps the relationship warm without being pushy." },
  { label: 'WHEN IT MATTERS', detail: "If this contact could speak to your candidacy later, a polite check-in near the application deadline is reasonable." },
];

const QUIZ = [
  { q: 'How should a networking call be framed?', choices: ['As a direct ask for a job', 'As information-gathering, with any ask earned later', 'As a chance to talk about yourself the whole time'], correct: 1, explain: 'Correct — leading with genuine curiosity about their work, not a job ask, is what builds a relationship worth having.' },
  { q: 'What makes a follow-up message land well?', choices: ['Sending it exactly one year later', 'Referencing a specific detail from the actual conversation', 'Keeping it as generic as possible'], correct: 1, explain: 'Correct — a specific reference shows the conversation was actually valued, not just checked off a list.' },
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

function Lesson1({ activePart, setActivePart }) {
  return (
    <>
      <div className="valufin-net-eyebrow">CLICK EACH PART →</div>
      <div className="valufin-net-tabs">
        {OUTREACH_PARTS.map((p, i) => (
          <button key={p.label} className={`valufin-net-tab${activePart === i ? ' active' : ''}`} onClick={() => setActivePart(i)}>{p.label}</button>
        ))}
      </div>
      <div className="valufin-net-panel">
        <p className="valufin-net-panel-body">{OUTREACH_PARTS[activePart].detail}</p>
      </div>
      <div className="valufin-net-takeaway-terminal">
        <div className="valufin-net-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-net-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ isInfo, setIsInfo }) {
  return (
    <>
      <div className="valufin-net-eyebrow">TOGGLE THE FRAMING →</div>
      <div className="valufin-net-tabs">
        <button className={`valufin-net-tab clay${!isInfo ? ' active' : ''}`} onClick={() => setIsInfo(false)}>JOB-SEEKING</button>
        <button className={`valufin-net-tab${isInfo ? ' active' : ''}`} onClick={() => setIsInfo(true)}>INSIGHT-SEEKING</button>
      </div>
      <div className="valufin-net-panel">
        <p className="valufin-net-panel-body">
          {isInfo
            ? '"I\'d love to hear more about your path into the group and what the day-to-day actually looks like — I\'m trying to learn as much as I can before I decide where to focus my search."'
            : '"I\'m applying to your firm and was hoping you could help me get an interview or pass along my resume."'}
        </p>
      </div>
      <div className="valufin-net-takeaway-clay">
        <span className="valufin-net-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
        </span>
        <div className="valufin-net-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ revealedIdx, setRevealedIdx }) {
  return (
    <>
      <div className="valufin-net-eyebrow">CLICK EACH WEAK QUESTION →</div>
      <div className="valufin-net-panel">
        {QUESTION_PAIRS.map((pair, i) => (
          <button key={pair.weak} className="valufin-net-weak-row" onClick={() => setRevealedIdx(i)}>
            <div className="valufin-net-weak-label">{pair.weak}</div>
            {revealedIdx === i && <div className="valufin-net-weak-why">→ {pair.strong}</div>}
          </button>
        ))}
      </div>
      <div className="valufin-net-takeaway-dashed">
        <span className="valufin-net-takeaway-dashed-check">✓</span>
        <div className="valufin-net-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ activeStep, setActiveStep }) {
  return (
    <>
      <div className="valufin-net-eyebrow">CLICK EACH STEP →</div>
      <div className="valufin-net-tabs">
        {FOLLOWUP_STEPS.map((s, i) => (
          <button key={s.label} className={`valufin-net-tab${activeStep === i ? ' active' : ''}`} onClick={() => setActiveStep(i)}>{s.label}</button>
        ))}
      </div>
      <div className="valufin-net-panel">
        <p className="valufin-net-panel-body">{FOLLOWUP_STEPS[activeStep].detail}</p>
      </div>
      <div className="valufin-net-takeaway-quote">
        <span className="valufin-net-takeaway-quote-mark">"</span>
        <div className="valufin-net-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-net-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-net-panel">
        <div className="valufin-net-quiz-q">{q.q}</div>
        <div className="valufin-net-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-net-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-net-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-net-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-net-takeaway-rule red">
        <div className="valufin-net-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-net-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function Networking() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [activePart, setActivePart] = useState(0);
  const [isInfo, setIsInfo] = useState(true);
  const [revealedIdx, setRevealedIdx] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState(null);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => { const idx = completed.findIndex((c) => !c); return idx === -1 ? completed.length - 1 : idx; })();

  function resetLessonState() { setQuizIndex(0); setPicked(null); setRevealedIdx(null); }
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
          ? [{ label: 'Universal', path: '/universal' }, { label: 'Networking' }]
          : [{ label: 'Universal', path: '/universal' }, { label: 'Networking', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill high-value">High-value</span>
            <span className="valufin-ticker-caption">NET · NETWORKING</span>
          </div>
          <h1 className="valufin-archivo-h1">Networking</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Cold outreach, informational interviews, and following up correctly — the habit
            that quietly feeds your "why this firm" answer later.
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
          <div className="valufin-lesson-detail-eyebrow">NETWORKING · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          {activeLesson.body2 && <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>}

          {activeIndex === 0 && <Lesson1 activePart={activePart} setActivePart={setActivePart} />}
          {activeIndex === 1 && <Lesson2 isInfo={isInfo} setIsInfo={setIsInfo} />}
          {activeIndex === 2 && <Lesson3 revealedIdx={revealedIdx} setRevealedIdx={setRevealedIdx} />}
          {activeIndex === 3 && <Lesson4 activeStep={activeStep} setActiveStep={setActiveStep} />}
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
