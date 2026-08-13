import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7'];

const LESSONS = [
  {
    title: 'A framework for researching any industry',
    minutes: 5,
    kind: 'interactive',
    body1: "A repeatable research framework matters more than memorizing facts about any one industry — interviewers can ask about any sector, so the process has to transfer.",
    body2: 'Click each part of the framework below.',
    takeaway: 'Market size, growth drivers, key players, trends, and regulatory environment — running any industry through these five lenses gets you interview-ready in under an hour.',
  },
  {
    title: 'Sample industry breakdowns',
    minutes: 6,
    kind: 'interactive',
    body1: 'Click through a few sample industries to see the framework applied — trends and players, condensed to what actually gets tested.',
    body2: null,
    takeaway: 'Candidates should be able to name 2-3 current trends and 2-3 major players in any industry they claim interest in — that\'s the actual bar interviewers test to.',
  },
  {
    title: 'Weaving it into your answers',
    minutes: 5,
    kind: 'interactive',
    body1: 'Industry knowledge should show up naturally woven into case math and recommendations — not recited as a separate fact dump at the start of an answer.',
    body2: 'Toggle between a fact-dump answer and a woven-in answer to the same question.',
    takeaway: '"What industry are you most interested in and why?" needs specific trends and companies, not a generic interest statement — vague passion claims are an instant red flag.',
  },
  {
    title: 'Self-check quiz',
    minutes: 5,
    kind: 'quiz',
    body1: 'Being caught not knowing basic facts about an industry you claimed to be passionate about is a fast way to lose credibility.',
    body2: 'For each industry, pick the trend that\'s actually current and plausible.',
    takeaway: "If you can't name a real, current trend for an industry you say you're passionate about, that's the gap to close before the interview, not during it.",
  },
];

const FRAMEWORK_PARTS = [
  { label: 'MARKET SIZE', detail: 'How big is the addressable market, roughly? Even an order-of-magnitude estimate beats having no number at all.' },
  { label: 'GROWTH DRIVERS', detail: "What's actually pushing the industry forward — new technology, demographic shifts, regulatory change?" },
  { label: 'KEY PLAYERS', detail: 'Who are the 2-3 companies that define this space, and roughly how do they differ from each other?' },
  { label: 'TRENDS', detail: 'What\'s changing right now — consolidation, a new business model, a shift in customer behavior?' },
  { label: 'REGULATORY ENVIRONMENT', detail: 'Is this industry lightly or heavily regulated, and is that regulatory backdrop shifting in a way that matters?' },
];

const INDUSTRIES = [
  { id: 'tech', label: 'TECH', trends: ['AI infrastructure buildout', 'Shift toward subscription/SaaS pricing'], players: ['Microsoft', 'Google', 'Amazon'] },
  { id: 'healthcare', label: 'HEALTHCARE', trends: ['GLP-1 drug category growth', 'Value-based care replacing fee-for-service'], players: ['UnitedHealth', 'Johnson & Johnson', 'CVS Health'] },
  { id: 'finserv', label: 'FINANCIAL SERVICES', trends: ['Embedded finance in non-bank apps', 'Consolidation among regional banks'], players: ['JPMorgan', 'Visa', 'Goldman Sachs'] },
];

const QUIZ = [
  { industry: 'Tech', options: ['AI infrastructure spending is accelerating', 'Dial-up internet is making a comeback', 'Desktop computers are replacing mobile devices'], correct: 0 },
  { industry: 'Healthcare', options: ['Hospitals are shifting fully back to paper records', 'GLP-1 drugs are reshaping a major consumer health category', 'Regulation has been fully eliminated'], correct: 1 },
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
      <div className="valufin-ind-eyebrow">CLICK EACH PART →</div>
      <div className="valufin-ind-criteria-row">
        {FRAMEWORK_PARTS.map((p, i) => (
          <button key={p.label} className={`valufin-ind-criteria-card${activePart === i ? ' active' : ''}`} onClick={() => setActivePart(i)}>
            <div className="valufin-ind-criteria-label">{p.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-ind-detail">
        <div className="valufin-ind-detail-head">{FRAMEWORK_PARTS[activePart].label}</div>
        <p className="valufin-ind-detail-body">{FRAMEWORK_PARTS[activePart].detail}</p>
      </div>
      <div className="valufin-ind-takeaway-terminal">
        <div className="valufin-ind-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-ind-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ activeInd, setActiveInd }) {
  const active = INDUSTRIES.find((i) => i.id === activeInd) || INDUSTRIES[0];
  return (
    <>
      <div className="valufin-ind-eyebrow">CLICK EACH INDUSTRY →</div>
      <div className="valufin-ind-tabs">
        {INDUSTRIES.map((i) => (
          <button key={i.id} className={`valufin-ind-tab${activeInd === i.id ? ' active' : ''}`} onClick={() => setActiveInd(i.id)}>{i.label}</button>
        ))}
      </div>
      <div className="valufin-ind-panel">
        <div className="valufin-ind-list-label">TRENDS</div>
        <ul className="valufin-ind-list">{active.trends.map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="valufin-ind-list-label" style={{ marginTop: 16 }}>MAJOR PLAYERS</div>
        <ul className="valufin-ind-list">{active.players.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
      <div className="valufin-ind-takeaway-clay">
        <span className="valufin-ind-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
        </span>
        <div className="valufin-ind-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ isWoven, setIsWoven }) {
  return (
    <>
      <div className="valufin-ind-eyebrow">TOGGLE THE ANSWER STYLE →</div>
      <div className="valufin-ind-tabs">
        <button className={`valufin-ind-tab clay${!isWoven ? ' active' : ''}`} onClick={() => setIsWoven(false)}>FACT DUMP</button>
        <button className={`valufin-ind-tab${isWoven ? ' active' : ''}`} onClick={() => setIsWoven(true)}>WOVEN IN</button>
      </div>
      <div className="valufin-ind-panel">
        <p className="valufin-ind-panel-body">
          {isWoven
            ? '"Given how much AI infrastructure spending is accelerating right now, I\'d actually flag the compute layer as the constraint in this case — which changes the recommendation toward securing capacity first."'
            : '"I\'m really passionate about tech. There\'s a lot happening — AI, cloud, mobile, cybersecurity, all growing really fast..."'}
        </p>
      </div>
      <div className="valufin-ind-takeaway-dashed">
        <span className="valufin-ind-takeaway-dashed-check">✓</span>
        <div className="valufin-ind-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-ind-eyebrow">{q.industry.toUpperCase()} — WHICH TREND IS REAL?</div>
      <div className="valufin-ind-panel">
        <div className="valufin-ind-quiz-choices">
          {q.options.map((o, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={o} className={`valufin-ind-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{o}</button>
            );
          })}
        </div>
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-ind-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next industry →</button>
        )}
      </div>
      <div className="valufin-ind-takeaway-rule red">
        <div className="valufin-ind-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-ind-takeaway-rule-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

export default function IndustryKnowledge() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false]);

  const [activePart, setActivePart] = useState(0);
  const [activeInd, setActiveInd] = useState('tech');
  const [isWoven, setIsWoven] = useState(true);
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
        <button className="valufin-lesson-topbar-back" onClick={() => (view === 'list' ? navigate('/consulting') : backToTopics())}>
          ← {view === 'list' ? 'Consulting' : 'Industry Knowledge'}
        </button>
        <span className="valufin-lesson-topbar-tag">IND · INDUSTRY KNOWLEDGE</span>
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill good-to-have">Good to have</span>
            <span className="valufin-ticker-caption">IND · INDUSTRY KNOWLEDGE</span>
          </div>
          <h1 className="valufin-archivo-h1">Industry<br />Knowledge</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            A repeatable research framework, plus the specific bar interviewers actually
            test against when you claim to be passionate about a sector.
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
          <div className="valufin-lesson-detail-eyebrow">INDUSTRY KNOWLEDGE · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          {activeLesson.body2 && <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>}

          {activeIndex === 0 && <Lesson1 activePart={activePart} setActivePart={setActivePart} />}
          {activeIndex === 1 && <Lesson2 activeInd={activeInd} setActiveInd={setActiveInd} />}
          {activeIndex === 2 && <Lesson3 isWoven={isWoven} setIsWoven={setIsWoven} />}
          {activeIndex === 3 && <Lesson4 quizIndex={quizIndex} setQuizIndex={setQuizIndex} picked={picked} setPicked={setPicked} />}

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
