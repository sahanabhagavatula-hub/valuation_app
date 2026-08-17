import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'What not to say',
    minutes: 4,
    kind: 'interactive',
    body1: 'Generic answers — prestige, money, "great culture" — are instantly forgettable and often actively penalized. Click through a few common weak answers below.',
    body2: null,
    takeaway: "If your answer could be copy-pasted into an application for any competitor firm and still make sense, it isn't a real answer.",
  },
  {
    title: 'The research framework',
    minutes: 6,
    kind: 'interactive',
    body1: 'A specific answer requires specific research — recent deals or news, culture signals, the actual group or desk you\'re targeting, and people you\'ve spoken with.',
    body2: 'Click each research source below.',
    takeaway: 'The strongest "why this firm" answers reference something firm-specific, ideally from a real conversation, deal, or group — not something pulled from the homepage.',
  },
  {
    title: 'The three-part structure',
    minutes: 6,
    kind: 'interactive',
    body1: "Industry fit → firm fit → personal fit. This narrows-the-funnel structure reads as far more credible than starting broad and staying broad.",
    body2: 'Click each part below.',
    takeaway: 'Narrowing from industry to firm to yourself mirrors how a genuinely considered decision actually gets made — and it reads that way to an interviewer too.',
  },
  {
    title: 'A worked example',
    minutes: 5,
    kind: 'interactive',
    body1: 'Seeing the three-part structure applied end to end makes it concrete. Click through the example below.',
    body2: null,
    takeaway: 'This question is asked in nearly every interview across every track — it deserves a rehearsed, firm-specific answer for each target firm, not one reused generic answer.',
  },
  {
    title: 'Practice drill',
    minutes: 5,
    kind: 'quiz',
    body1: 'A quick check on what separates a forgettable answer from a strong one.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: "Tie the answer back to networking conversations where you can — a referenced conversation is the single strongest piece of specificity available to you.",
  },
];

const WEAK_ANSWERS = [
  { label: '"You have a great culture and strong deal flow."', why: 'Could describe almost any firm in the industry — no specific evidence attached.' },
  { label: '"I\'ve always wanted to work in finance."', why: "Doesn't answer why THIS firm at all — it's an industry answer wearing a firm-specific question." },
  { label: '"I heard the pay and exit opportunities are great here."', why: 'Self-interested framing with nothing about what you\'d actually contribute or why this firm specifically fits you.' },
];

const RESEARCH_SOURCES = [
  { id: 'deals', label: 'RECENT DEALS/NEWS', detail: 'A specific recent transaction or announcement shows you\'re actually paying attention to this firm, not just applying broadly.' },
  { id: 'culture', label: 'CULTURE SIGNALS', detail: 'Specific, verifiable culture traits (team size, how staffing works, deal exposure for juniors) beat vague adjectives like "collaborative."' },
  { id: 'group', label: 'SPECIFIC GROUP/DESK', detail: 'Naming the actual group or desk you\'re targeting, and why, shows you\'ve thought past "I want to work in finance."' },
  { id: 'people', label: 'PEOPLE YOU\'VE SPOKEN WITH', detail: 'A real conversation with someone at the firm is the single strongest, hardest-to-fake piece of evidence you can reference.' },
];

const STRUCTURE_PARTS = [
  { label: 'INDUSTRY FIT', detail: 'Why this industry/track at all — the broadest layer, establishing genuine interest before narrowing.' },
  { label: 'FIRM FIT', detail: 'Why this specific firm within that industry — referencing something concrete and firm-specific.' },
  { label: 'PERSONAL FIT', detail: 'Why you specifically — connecting your own background or skills to what this firm actually needs.' },
];

const WORKED_EXAMPLE = '"I\'m drawn to the client-facing, cross-industry nature of consulting [industry fit]. I\'ve followed your firm\'s recent work in healthcare transformation, and after speaking with two associates on that team, I was struck by how early staff get direct client exposure [firm fit]. That matches how I want to grow — I\'ve sought out client-facing roles in every internship I\'ve had [personal fit]."';

const QUIZ = [
  { q: 'What makes a "why this firm" answer forgettable?', choices: ['It\'s too short', "It's generic enough to apply to any competitor firm", 'It mentions a specific person'], correct: 1, explain: "Correct — if the answer works for any firm in the industry, it isn't really answering the question that was asked." },
  { q: 'What is the strongest type of evidence to include in this answer?', choices: ['A quote from the firm\'s website', 'A referenced conversation with someone at the firm', 'A general compliment about culture'], correct: 1, explain: "Correct — a real conversation is the hardest piece of evidence to fake and the most persuasive signal of genuine interest." },
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

function Lesson1({ activeWeak, setActiveWeak }) {
  return (
    <>
      <div className="valufin-wtf-eyebrow">CLICK EACH WEAK ANSWER →</div>
      <div className="valufin-wtf-panel">
        {WEAK_ANSWERS.map((w, i) => (
          <button key={w.label} className={`valufin-wtf-weak-row${activeWeak === i ? ' active' : ''}`} onClick={() => setActiveWeak(i)}>
            <div className="valufin-wtf-weak-label">{w.label}</div>
            {activeWeak === i && <div className="valufin-wtf-weak-why">{w.why}</div>}
          </button>
        ))}
      </div>
      <div className="valufin-wtf-takeaway-terminal">
        <div className="valufin-wtf-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-wtf-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ activeSource, setActiveSource }) {
  const active = RESEARCH_SOURCES.find((s) => s.id === activeSource) || RESEARCH_SOURCES[0];
  return (
    <>
      <div className="valufin-wtf-eyebrow">CLICK EACH SOURCE →</div>
      <div className="valufin-wtf-criteria-row">
        {RESEARCH_SOURCES.map((s) => (
          <button key={s.id} className={`valufin-wtf-criteria-card${s.id === activeSource ? ' active' : ''}`} onClick={() => setActiveSource(s.id)}>
            <div className="valufin-wtf-criteria-label">{s.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-wtf-detail">
        <div className="valufin-wtf-detail-head">{active.label}</div>
        <p className="valufin-wtf-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-wtf-takeaway-clay">
        <span className="valufin-wtf-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
        </span>
        <div className="valufin-wtf-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activePart, setActivePart }) {
  return (
    <>
      <div className="valufin-wtf-eyebrow">CLICK EACH PART →</div>
      <div className="valufin-wtf-tabs">
        {STRUCTURE_PARTS.map((p, i) => (
          <button key={p.label} className={`valufin-wtf-tab${activePart === i ? ' active' : ''}`} onClick={() => setActivePart(i)}>{p.label}</button>
        ))}
      </div>
      <div className="valufin-wtf-panel">
        <p className="valufin-wtf-panel-body">{STRUCTURE_PARTS[activePart].detail}</p>
      </div>
      <div className="valufin-wtf-takeaway-dashed">
        <span className="valufin-wtf-takeaway-dashed-check">✓</span>
        <div className="valufin-wtf-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ revealed, setRevealed }) {
  return (
    <>
      <div className="valufin-wtf-eyebrow">SEE THE STRUCTURE APPLIED →</div>
      <div className="valufin-wtf-panel">
        {!revealed ? (
          <button className="valufin-wtf-reveal-btn" onClick={() => setRevealed(true)}>Reveal the worked example →</button>
        ) : (
          <p className="valufin-wtf-panel-body" style={{ fontStyle: 'italic' }}>{WORKED_EXAMPLE}</p>
        )}
      </div>
      <div className="valufin-wtf-takeaway-quote">
        <span className="valufin-wtf-takeaway-quote-mark">"</span>
        <div className="valufin-wtf-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-wtf-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-wtf-panel">
        <div className="valufin-wtf-quiz-q">{q.q}</div>
        <div className="valufin-wtf-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-wtf-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-wtf-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-wtf-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-wtf-takeaway-rule red">
        <div className="valufin-wtf-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-wtf-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function WhyThisFirm() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [activeWeak, setActiveWeak] = useState(0);
  const [activeSource, setActiveSource] = useState('deals');
  const [activePart, setActivePart] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState(null);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => { const idx = completed.findIndex((c) => !c); return idx === -1 ? completed.length - 1 : idx; })();

  function resetLessonState() { setQuizIndex(0); setPicked(null); setRevealed(false); }
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
          ? [{ label: 'Universal', path: '/universal' }, { label: '"Why This Firm"' }]
          : [{ label: 'Universal', path: '/universal' }, { label: '"Why This Firm"', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know-clay">Must-know</span>
            <span className="valufin-ticker-caption">WTF · WHY THIS FIRM</span>
          </div>
          <h1 className="valufin-archivo-h1">"Why This<br />Firm"</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Research the firm, know their deals and clients, and give a specific,
            firm-by-firm answer — not one reused generic script.
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
          <div className="valufin-lesson-detail-eyebrow">WHY THIS FIRM · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          {activeLesson.body2 && <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>}

          {activeIndex === 0 && <Lesson1 activeWeak={activeWeak} setActiveWeak={setActiveWeak} />}
          {activeIndex === 1 && <Lesson2 activeSource={activeSource} setActiveSource={setActiveSource} />}
          {activeIndex === 2 && <Lesson3 activePart={activePart} setActivePart={setActivePart} />}
          {activeIndex === 3 && <Lesson4 revealed={revealed} setRevealed={setRevealed} />}
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
