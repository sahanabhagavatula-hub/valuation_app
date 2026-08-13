import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'What to actually follow',
    minutes: 5,
    kind: 'interactive',
    body1: 'Fed policy and rates, major M&A deals, IPOs, and sector-specific news relevant to your target firms — a focused list beats trying to read everything.',
    body2: 'Click each category below.',
    takeaway: "You don't need to follow everything — you need 2-3 themes you can speak to fluently, tailored to the track you're actually interviewing for.",
  },
  {
    title: 'Form a view, don\'t just recite',
    minutes: 6,
    kind: 'interactive',
    body1: "Don't just recite a headline — form a point of view on it. That's what separates a strong answer from a weak one.",
    body2: 'Toggle between a headline recitation and an opinionated take on the same news item.',
    takeaway: '"Rates were cut 25bps" is a headline. "Rates were cut 25bps — here\'s what I think that means for M&A activity" is an answer that shows you actually think about markets.',
  },
  {
    title: 'Tailor it to the track',
    minutes: 5,
    kind: 'interactive',
    body1: "The right things to follow depend on the track: IB cares about deal activity and rates, HF cares about market-moving events, consulting cares about industry disruption.",
    body2: 'Click each track below to see its focus.',
    takeaway: "Following the wrong things for your target track wastes prep time — an HF interviewer doesn't need your Fed rate opinion nearly as much as an IB interviewer does.",
  },
  {
    title: '"What have you been following?" drill',
    minutes: 5,
    kind: 'interactive',
    body1: 'This near-universal icebreaker question rewards having 1-2 ready answers with an opinion attached, not just a summary.',
    body2: 'Click to see a strong sample answer.',
    takeaway: 'Have 1-2 specific stories ready before you walk in — trying to think of one on the spot is a common way to freeze up early in an interview.',
  },
  {
    title: 'Practice drill',
    minutes: 5,
    kind: 'quiz',
    body1: 'A quick check on what makes a current-events answer land.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'Current events should be a living, recurring habit — not a one-time cram session the night before an interview.',
  },
];

const CATEGORIES = [
  { id: 'fed', label: 'FED POLICY / RATES', detail: 'Rate decisions ripple through valuations, M&A financing costs, and IPO windows — nearly every finance interview touches this.' },
  { id: 'deals', label: 'MAJOR M&A DEALS', detail: 'Know 1-2 recent large deals and roughly why they happened — a common icebreaker and a way to show real engagement.' },
  { id: 'ipos', label: 'IPOS', detail: 'Recent notable IPOs and how they priced/performed — a good signal of market appetite for risk right now.' },
  { id: 'sector', label: 'SECTOR-SPECIFIC NEWS', detail: 'Whatever\'s relevant to your target firms specifically — tailor this list, don\'t try to cover everything.' },
];

const TRACKS = [
  { id: 'ib', label: 'INVESTMENT BANKING', focus: 'Deal activity, M&A volume, and interest rates — since financing costs directly affect what deals get done.' },
  { id: 'hf', label: 'HEDGE FUNDS', focus: 'Market-moving events and catalysts — earnings surprises, macro data releases, anything that moves prices.' },
  { id: 'consulting', label: 'CONSULTING', focus: 'Industry disruption and strategic shifts — new business models, regulatory changes reshaping a sector.' },
];

const QUIZ = [
  { q: 'What separates a strong current-events answer from a weak one?', choices: ['Knowing more headlines than anyone else', 'Forming an actual point of view on the news, not just reciting it', 'Speaking as fast as possible'], correct: 1, explain: 'Correct — an opinion attached to the headline is what shows genuine engagement, not just information intake.' },
  { q: 'Why should current events prep be an ongoing habit rather than a one-time cram?', choices: ['It isn\'t actually important', 'A recurring habit builds real fluency that a last-minute cram can\'t fake', 'Interviewers never ask about it'], correct: 1, explain: "Correct — genuine, ongoing engagement is much harder to fake under follow-up questions than a memorized headline from the night before." },
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

function Lesson1({ activeCat, setActiveCat }) {
  const active = CATEGORIES.find((c) => c.id === activeCat) || CATEGORIES[0];
  return (
    <>
      <div className="valufin-cur-eyebrow">CLICK EACH CATEGORY →</div>
      <div className="valufin-cur-criteria-row">
        {CATEGORIES.map((c) => (
          <button key={c.id} className={`valufin-cur-criteria-card${c.id === activeCat ? ' active' : ''}`} onClick={() => setActiveCat(c.id)}>
            <div className="valufin-cur-criteria-label">{c.label}</div>
          </button>
        ))}
      </div>
      <div className="valufin-cur-detail">
        <div className="valufin-cur-detail-head">{active.label}</div>
        <p className="valufin-cur-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-cur-takeaway-terminal">
        <div className="valufin-cur-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-cur-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ hasView, setHasView }) {
  return (
    <>
      <div className="valufin-cur-eyebrow">TOGGLE THE ANSWER →</div>
      <div className="valufin-cur-tabs">
        <button className={`valufin-cur-tab clay${!hasView ? ' active' : ''}`} onClick={() => setHasView(false)}>JUST A HEADLINE</button>
        <button className={`valufin-cur-tab${hasView ? ' active' : ''}`} onClick={() => setHasView(true)}>WITH A VIEW</button>
      </div>
      <div className="valufin-cur-panel">
        <p className="valufin-cur-panel-body">
          {hasView
            ? '"The Fed cut rates 25bps last week — I think that eases financing costs enough that we could see a pickup in sponsor-backed M&A over the next couple quarters."'
            : '"The Fed cut rates by 25 basis points last week."'}
        </p>
      </div>
      <div className="valufin-cur-takeaway-clay">
        <span className="valufin-cur-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
        </span>
        <div className="valufin-cur-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activeTrack, setActiveTrack }) {
  const active = TRACKS.find((t) => t.id === activeTrack) || TRACKS[0];
  return (
    <>
      <div className="valufin-cur-eyebrow">CLICK EACH TRACK →</div>
      <div className="valufin-cur-tabs">
        {TRACKS.map((t) => (
          <button key={t.id} className={`valufin-cur-tab${activeTrack === t.id ? ' active' : ''}`} onClick={() => setActiveTrack(t.id)}>{t.label}</button>
        ))}
      </div>
      <div className="valufin-cur-panel">
        <p className="valufin-cur-panel-body">{active.focus}</p>
      </div>
      <div className="valufin-cur-takeaway-dashed">
        <span className="valufin-cur-takeaway-dashed-check">✓</span>
        <div className="valufin-cur-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ revealed, setRevealed }) {
  return (
    <>
      <div className="valufin-cur-eyebrow">SEE A SAMPLE ANSWER →</div>
      <div className="valufin-cur-panel">
        {!revealed ? (
          <button className="valufin-cur-reveal-btn" onClick={() => setRevealed(true)}>Reveal a strong sample answer →</button>
        ) : (
          <p className="valufin-cur-panel-body" style={{ fontStyle: 'italic' }}>"I've been following the recent wave of AI infrastructure spending — I think it's a real structural shift, not just a hype cycle, and I've been watching how it's affecting capital allocation in the semiconductor space specifically."</p>
        )}
      </div>
      <div className="valufin-cur-takeaway-quote">
        <span className="valufin-cur-takeaway-quote-mark">"</span>
        <div className="valufin-cur-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-cur-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-cur-panel">
        <div className="valufin-cur-quiz-q">{q.q}</div>
        <div className="valufin-cur-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-cur-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-cur-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-cur-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-cur-takeaway-rule red">
        <div className="valufin-cur-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-cur-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function CurrentEvents() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [activeCat, setActiveCat] = useState('fed');
  const [hasView, setHasView] = useState(true);
  const [activeTrack, setActiveTrack] = useState('ib');
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
    <div style={{ minHeight: '100vh', backgroundImage: 'radial-gradient(rgba(237,235,228,0.06) 1px, transparent 1px)', backgroundSize: '22px 22px' }}>
      <div className="valufin-lesson-topbar">
        <button className="valufin-lesson-topbar-back" onClick={() => (view === 'list' ? navigate('/universal') : backToTopics())}>
          ← {view === 'list' ? 'Universal' : 'Current Events'}
        </button>
        <span className="valufin-lesson-topbar-tag">CUR · CURRENT EVENTS</span>
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill high-value">High-value</span>
            <span className="valufin-ticker-caption">CUR · CURRENT EVENTS</span>
          </div>
          <h1 className="valufin-archivo-h1">Current<br />Events</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Know 2-3 macro themes and recent deals cold — and have an actual opinion on each,
            not just a headline.
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
          <div className="valufin-lesson-detail-eyebrow">CURRENT EVENTS · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          {activeLesson.body2 && <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>}

          {activeIndex === 0 && <Lesson1 activeCat={activeCat} setActiveCat={setActiveCat} />}
          {activeIndex === 1 && <Lesson2 hasView={hasView} setHasView={setHasView} />}
          {activeIndex === 2 && <Lesson3 activeTrack={activeTrack} setActiveTrack={setActiveTrack} />}
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
