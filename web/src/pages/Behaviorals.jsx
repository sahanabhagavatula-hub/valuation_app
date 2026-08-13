import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'The STAR framework',
    minutes: 5,
    kind: 'interactive',
    body1: 'Situation, Task, Action, Result — four parts, in order, for structuring any behavioral answer without rambling.',
    body2: 'Click each part below.',
    takeaway: "STAR isn't a script to recite — it's a checklist to make sure your answer has a beginning, a clear stake, what you actually did, and a real ending.",
  },
  {
    title: 'The result needs a number',
    minutes: 5,
    kind: 'interactive',
    body1: 'Result should include a number or a concrete outcome whenever possible — vague endings ("and it worked out well") are the most common weakness in student answers.',
    body2: 'Toggle between a vague ending and a concrete one for the same story.',
    takeaway: 'A quantified or specific result gives the interviewer something to remember your story by — "it went well" is instantly forgotten, "we cut turnaround time by 30%" is not.',
  },
  {
    title: 'Build your story bank',
    minutes: 7,
    kind: 'activity',
    body1: 'Build a story bank of 5-6 real experiences that can each flex to answer multiple question types — not one memorized script per question.',
    body2: 'Match each experience type below to the question categories it could flex to answer.',
    takeaway: 'Interviewers ask unpredictable variations of the same handful of themes — a flexible story bank beats memorizing a script for every possible phrasing.',
  },
  {
    title: 'Action means what you did',
    minutes: 5,
    kind: 'interactive',
    body1: 'Action should emphasize what you personally did, not what the team did. Over-crediting the group is one of the most common mistakes in this section.',
    body2: 'Toggle between a team-credited answer and a self-credited one.',
    takeaway: "Interviewers are evaluating you specifically — a story where 'we' does everything and 'I' never appears leaves them with nothing to actually assess.",
  },
  {
    title: 'Practice drill',
    minutes: 5,
    kind: 'quiz',
    body1: '"Tell me about a time you failed" and "tell me about a conflict with a team member" are near-universal — every candidate needs a polished answer to both.',
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'Keep answers to 60-90 seconds — a common failure mode is rambling well past the point of impact. Practice trimming, not just building the story.',
  },
];

const STAR_PARTS = [
  {
    id: 'situation', letter: 'S', label: 'SITUATION', top: '4%', left: '50%',
    detail: 'Set the scene in one or two sentences — enough context to understand the stakes, not a full narrative.',
    example: '"Our club\'s biggest fundraiser was two weeks out and the venue backed out."',
  },
  {
    id: 'task', letter: 'T', label: 'TASK', top: '36%', left: '92%',
    detail: 'State your specific responsibility or goal in that situation — what were you actually on the hook for?',
    example: '"As logistics lead, it was on me to find a new venue without losing any sponsors."',
  },
  {
    id: 'action', letter: 'A', label: 'ACTION', top: '86%', left: '74%',
    detail: 'The steps you personally took — this is the longest part of the answer, and the only place "I" should dominate over "we."',
    example: '"I called five backup venues within a day, negotiated a same-week rate, and personally re-briefed each sponsor on the change."',
  },
  {
    id: 'result', letter: 'R', label: 'RESULT', top: '86%', left: '26%',
    detail: "What happened, ideally with a number or concrete outcome — and what you'd do differently next time.",
    example: '"We kept all 12 sponsors, the event still hit its fundraising goal, and next year I built a backup-venue list from day one."',
  },
];

const STAR_SCENARIOS = [
  'Tell me about a time you had to convince a skeptical teammate to see things your way.',
  'Describe a group project where the workload was unevenly split — what did you do?',
  'Walk me through a time you caught a mistake before it became a bigger problem.',
  'Tell me about a time you had to learn something completely new under a tight deadline.',
  "Describe a time you disagreed with a professor's or manager's decision.",
];

const STAR_POLYGON = '200,15 239.97,134.99 366.44,135.92 264.67,211.01 302.86,331.58 200,258 97.14,331.58 135.33,211.01 33.56,135.92 160.03,134.99';

const STORY_MATCH = [
  { id: 'led-project', label: 'Led a project under a tight deadline', fits: ['Leadership', 'Initiative'] },
  { id: 'disagreement', label: 'Disagreed with a teammate\'s approach', fits: ['Conflict', 'Teamwork'] },
  { id: 'missed-goal', label: 'A project fell short of its goal', fits: ['Failure', 'Initiative'] },
];
const CATEGORIES = ['Leadership', 'Conflict', 'Failure', 'Teamwork', 'Initiative'];

const QUIZ = [
  { q: 'What\'s the most common weakness in student behavioral answers?', choices: ['Too much detail in the Situation', 'A vague result with no concrete outcome', 'Using the word "I" too often'], correct: 1, explain: "Correct — a specific number or concrete outcome is what makes a result memorable; \"it went well\" gets forgotten instantly." },
  { q: 'Why build a flexible story bank instead of memorizing one script per question?', choices: ['It\'s faster to prepare', 'Interviewers ask unpredictable variations of the same themes', 'Interviewers prefer improvised answers'], correct: 1, explain: 'Correct — a handful of flexible stories that can answer multiple angles beats a rigid script that breaks the moment the question is phrased differently.' },
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

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4B79A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 4 }}>
      <path d="M12 20l-1.4-3.4L7 15l3.6-1.6L12 10l1.4 3.4L17 15l-3.6 1.6z" />
      <path d="M5 6l.7 1.7L7.5 8.5 5.7 9.2 5 11l-.7-1.8L2.5 8.5l1.8-.8z" />
    </svg>
  );
}

function Lesson1() {
  const [activeId, setActiveId] = useState(null);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [scenarioIdx, setScenarioIdx] = useState(0);

  const activePart = STAR_PARTS.find((p) => p.id === activeId);

  return (
    <>
      <div className="valufin-bhv-eyebrow">CLICK EACH POINT →</div>
      <div className="valufin-bhv-star-wrap">
        <svg className="valufin-bhv-star-svg" viewBox="0 0 400 380">
          <polygon points={STAR_POLYGON} fill="none" stroke="rgba(79,195,199,0.28)" strokeWidth="1.5" />
        </svg>
        {STAR_PARTS.map((p) => {
          const active = activeId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className="valufin-bhv-star-point"
              style={{
                top: p.top, left: p.left,
                background: active ? 'rgba(79,195,199,0.12)' : '#12161C',
                borderColor: active ? '#4FC3C7' : 'rgba(237,235,228,0.14)',
                boxShadow: active ? '0 0 24px rgba(79,195,199,0.25)' : 'none',
              }}
            >
              <div>
                <div className="valufin-bhv-star-point-letter" style={{ color: active ? '#4FC3C7' : '#EDEBE4' }}>{p.letter}</div>
                <div className="valufin-bhv-star-point-label" style={{ color: active ? '#4FC3C7' : '#8F887A' }}>{p.label}</div>
              </div>
            </button>
          );
        })}
        <div className="valufin-bhv-star-hub">
          <span>STAR</span>
        </div>
        <button className="valufin-bhv-star-practice" onClick={() => setPracticeOpen(true)}>
          <div>
            <SparkleIcon />
            <div className="valufin-bhv-star-practice-label">PRACTICE</div>
          </div>
        </button>
      </div>

      {activePart && (
        <div className="valufin-bhv-star-modal-backdrop" onClick={() => setActiveId(null)}>
          <div className="valufin-bhv-star-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="valufin-bhv-star-modal-head">
              <span className="valufin-bhv-star-modal-badge">{activePart.letter}</span>
              <div className="valufin-bhv-star-modal-badge-label">{activePart.label}</div>
            </div>
            <div className="valufin-bhv-star-modal-detail">{activePart.detail}</div>
            <div className="valufin-bhv-star-modal-example">
              <div className="valufin-bhv-star-modal-example-label">EXAMPLE</div>
              <div className="valufin-bhv-star-modal-example-body">{activePart.example}</div>
            </div>
            <button className="valufin-bhv-star-modal-close" onClick={() => setActiveId(null)}>← close</button>
          </div>
        </div>
      )}

      {practiceOpen && (
        <div className="valufin-bhv-star-modal-backdrop" onClick={() => setPracticeOpen(false)}>
          <div className="valufin-bhv-star-modal-box practice" onClick={(e) => e.stopPropagation()}>
            <div className="valufin-bhv-star-modal-example-label" style={{ color: '#C4B79A', marginBottom: 10 }}>PRACTICE SCENARIO {scenarioIdx + 1}</div>
            <div className="valufin-bhv-star-modal-scenario">"{STAR_SCENARIOS[scenarioIdx]}"</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="valufin-bhv-star-modal-cta" onClick={() => setScenarioIdx((scenarioIdx + 1) % STAR_SCENARIOS.length)}>↻ another scenario</button>
              <button className="valufin-bhv-star-modal-close" onClick={() => setPracticeOpen(false)}>← close</button>
            </div>
          </div>
        </div>
      )}

      <div className="valufin-bhv-star-takeaway">
        <div className="valufin-bhv-star-takeaway-label">// TAKEAWAY</div>
        <div className="valufin-bhv-star-takeaway-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ isConcrete, setIsConcrete }) {
  return (
    <>
      <div className="valufin-bhv-eyebrow">TOGGLE THE ENDING →</div>
      <div className="valufin-bhv-tabs">
        <button className={`valufin-bhv-tab clay${!isConcrete ? ' active' : ''}`} onClick={() => setIsConcrete(false)}>VAGUE</button>
        <button className={`valufin-bhv-tab${isConcrete ? ' active' : ''}`} onClick={() => setIsConcrete(true)}>CONCRETE</button>
      </div>
      <div className="valufin-bhv-panel">
        <p className="valufin-bhv-panel-body">
          {isConcrete
            ? '"...after we rolled out the new process, our team\'s turnaround time dropped from 5 days to 3.5 days, and it\'s still the process the team uses today."'
            : '"...so yeah, after we made those changes, things got a lot better and the team was happier with how it worked out."'}
        </p>
      </div>
      <div className="valufin-bhv-takeaway-clay">
        <span className="valufin-bhv-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
        </span>
        <div className="valufin-bhv-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activeStory, setActiveStory, picks, setPicks }) {
  const story = STORY_MATCH.find((s) => s.id === activeStory);
  function toggleCat(cat) {
    const current = picks[activeStory] || [];
    const next = current.includes(cat) ? current.filter((c) => c !== cat) : [...current, cat];
    setPicks({ ...picks, [activeStory]: next });
  }
  return (
    <>
      <div className="valufin-bhv-eyebrow">PICK A STORY, THEN ITS CATEGORIES →</div>
      <div className="valufin-bhv-tabs">
        {STORY_MATCH.map((s) => (
          <button key={s.id} className={`valufin-bhv-tab${activeStory === s.id ? ' active' : ''}`} onClick={() => setActiveStory(s.id)}>{s.label}</button>
        ))}
      </div>
      <div className="valufin-bhv-panel">
        <div className="valufin-bhv-pick-row">
          {CATEGORIES.map((cat) => {
            const picked = (picks[activeStory] || []).includes(cat);
            const correct = story.fits.includes(cat);
            let cls = 'valufin-bhv-pick-choice';
            if (picked) cls += correct ? ' correct' : ' wrong';
            return <button key={cat} className={cls} onClick={() => toggleCat(cat)}>{cat}</button>;
          })}
        </div>
      </div>
      <div className="valufin-bhv-takeaway-dashed">
        <span className="valufin-bhv-takeaway-dashed-check">✓</span>
        <div className="valufin-bhv-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ isSelf, setIsSelf }) {
  return (
    <>
      <div className="valufin-bhv-eyebrow">TOGGLE THE CREDIT →</div>
      <div className="valufin-bhv-tabs">
        <button className={`valufin-bhv-tab clay${!isSelf ? ' active' : ''}`} onClick={() => setIsSelf(false)}>TEAM-CREDITED</button>
        <button className={`valufin-bhv-tab${isSelf ? ' active' : ''}`} onClick={() => setIsSelf(true)}>SELF-CREDITED</button>
      </div>
      <div className="valufin-bhv-panel">
        <p className="valufin-bhv-panel-body">
          {isSelf
            ? '"I noticed we were missing a shared tracker, so I built one and proposed we use it in our next standup — within two weeks the team had adopted it."'
            : '"We realized we needed better tracking, so we built a tool and started using it, and it really helped the team."'}
        </p>
      </div>
      <div className="valufin-bhv-takeaway-quote">
        <span className="valufin-bhv-takeaway-quote-mark">"</span>
        <div className="valufin-bhv-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-bhv-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-bhv-panel">
        <div className="valufin-bhv-quiz-q">{q.q}</div>
        <div className="valufin-bhv-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-bhv-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-bhv-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-bhv-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-bhv-takeaway-rule red">
        <div className="valufin-bhv-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-bhv-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function Behaviorals() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [isConcrete, setIsConcrete] = useState(true);
  const [activeStory, setActiveStory] = useState('led-project');
  const [picks, setPicks] = useState({});
  const [isSelf, setIsSelf] = useState(true);
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
        <Breadcrumb items={view === 'list'
          ? [{ label: 'Universal', path: '/universal' }, { label: 'Behaviorals (STAR)' }]
          : [{ label: 'Universal', path: '/universal' }, { label: 'Behaviorals (STAR)', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know-clay">Must-know</span>
            <span className="valufin-ticker-caption">BHV · BEHAVIORALS</span>
          </div>
          <h1 className="valufin-archivo-h1">Behaviorals<br />(STAR)</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Situation, Task, Action, Result — telling compelling, concrete stories about your
            experience, and building a bank that flexes to any question.
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
          <div className="valufin-lesson-detail-eyebrow">BEHAVIORALS · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1 />}
          {activeIndex === 1 && <Lesson2 isConcrete={isConcrete} setIsConcrete={setIsConcrete} />}
          {activeIndex === 2 && <Lesson3 activeStory={activeStory} setActiveStory={setActiveStory} picks={picks} setPicks={setPicks} />}
          {activeIndex === 3 && <Lesson4 isSelf={isSelf} setIsSelf={setIsSelf} />}
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
