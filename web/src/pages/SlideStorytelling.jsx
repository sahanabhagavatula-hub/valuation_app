import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];

const LESSONS = [
  {
    title: 'Titles are conclusions, not topics',
    minutes: 6,
    kind: 'interactive',
    body1: '"Revenue" is a bad slide title — it\'s a topic label. "Revenue declined 12% due to pricing pressure in the core segment" is a good title — it\'s a conclusion.',
    body2: 'For each topic-label title below, pick the rewrite that\'s an actual action title.',
    takeaway: "This is the single most important consulting communication skill, and most students get it backwards — a title should let someone skim only the titles of a deck and still get the whole argument.",
  },
  {
    title: 'The pyramid principle',
    minutes: 5,
    kind: 'interactive',
    body1: 'State the recommendation first, then the supporting logic beneath it — never build up to the answer at the end.',
    body2: 'Toggle between a bottom-up narrative and a pyramid-structured one covering the same content.',
    takeaway: 'The pyramid principle mirrors how a case interview answer should be delivered verbally too — lead with the recommendation, then the 2-3 reasons behind it.',
  },
  {
    title: 'Slide anatomy',
    minutes: 5,
    kind: 'interactive',
    body1: 'A well-built slide has three zones, each with a specific job. Click each zone of the mock slide below.',
    body2: null,
    takeaway: 'Title = the so-what. Body = the what, in support of the title. Source line = where the number came from, so no one questions its credibility mid-meeting.',
  },
  {
    title: 'Before / after',
    minutes: 5,
    kind: 'interactive',
    body1: 'Seeing a weak slide and a strong slide side by side makes the difference concrete in a way rules alone don\'t.',
    body2: 'Toggle between the two versions of the same underlying data.',
    takeaway: 'Each slide should support one clear point, not multiple ideas crammed together — if a slide needs two titles to describe it, it should be two slides.',
  },
  {
    title: 'Interview tie-in',
    minutes: 5,
    kind: 'quiz',
    body1: "This skill isn't usually tested directly in interviews — but it directly improves how candidates structure their verbal case answers.",
    body2: 'Pick the strongest answer for each question below.',
    takeaway: 'Practicing "lead with the conclusion" on slides is really practicing the same habit case interviews reward — say the answer first, then defend it.',
  },
];

const TITLE_DRILLS = [
  { topic: 'Revenue', options: ['Revenue', 'Revenue Trends', 'Revenue declined 12% due to pricing pressure in the core segment'], correct: 2 },
  { topic: 'Market Trends', options: ['Market overview', 'The addressable market is growing 8% annually, driven by mobile adoption', 'Market Trends'], correct: 1 },
  { topic: 'Cost Structure', options: ['Cost breakdown', 'Costs', 'Labor costs, not materials, are driving the margin decline'], correct: 2 },
];

const SLIDE_ZONES = [
  { id: 'title', label: 'TITLE', detail: 'The conclusion — what this slide proves, in one sentence. Someone should be able to skim only titles across a deck and follow the whole argument.' },
  { id: 'body', label: 'BODY', detail: 'The evidence supporting the title — a chart, a table, a short list. Everything here exists to prove the title\'s claim, not to introduce a new idea.' },
  { id: 'source', label: 'SOURCE LINE', detail: 'Where the numbers came from — company filings, an interview, a market report. Small text, but it\'s what lets the number survive a skeptical question.' },
];

const QUIZ = [
  { q: 'What makes "Revenue declined 12% due to pricing pressure" a good slide title?', choices: ['It uses a specific number', 'It states a conclusion, not just a topic', 'It\'s written in a complete sentence'], correct: 1, explain: "Correct — the specific number and full sentence help, but the core reason it works is that it's a conclusion someone can act on, not a label." },
  { q: 'Under the pyramid principle, what goes first in a slide or a spoken answer?', choices: ['Background context', 'The recommendation or conclusion', 'A list of every option considered'], correct: 1, explain: 'Correct — lead with the answer, then the supporting logic beneath it.' },
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

function Lesson1({ drillIndex, setDrillIndex, picked, setPicked }) {
  const d = TITLE_DRILLS[drillIndex];
  return (
    <>
      <div className="valufin-sst-eyebrow">PICK THE ACTION TITLE →</div>
      <div className="valufin-sst-panel">
        <div className="valufin-sst-drill-topic">TOPIC LABEL: "{d.topic}"</div>
        <div className="valufin-sst-quiz-choices">
          {d.options.map((o, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === d.correct;
            return (
              <button key={o} className={`valufin-sst-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{o}</button>
            );
          })}
        </div>
        {picked !== null && drillIndex < TITLE_DRILLS.length - 1 && (
          <button className="valufin-sst-quiz-next" onClick={() => { setDrillIndex(drillIndex + 1); setPicked(null); }}>Next drill →</button>
        )}
      </div>
      <div className="valufin-sst-takeaway-terminal">
        <div className="valufin-sst-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-sst-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

function Lesson2({ isPyramid, setIsPyramid }) {
  return (
    <>
      <div className="valufin-sst-eyebrow">TOGGLE THE STRUCTURE →</div>
      <div className="valufin-sst-tabs">
        <button className={`valufin-sst-tab clay${!isPyramid ? ' active' : ''}`} onClick={() => setIsPyramid(false)}>BOTTOM-UP</button>
        <button className={`valufin-sst-tab${isPyramid ? ' active' : ''}`} onClick={() => setIsPyramid(true)}>PYRAMID</button>
      </div>
      <div className="valufin-sst-panel">
        <p className="valufin-sst-panel-body">
          {isPyramid
            ? '"We should exit the Southeast region. Margins there have been negative for three years, the competitive position is weak, and the capital would earn a better return expanding the Northeast instead."'
            : '"So Southeast margins have been negative for three years... and looking at the competitive position, it\'s pretty weak too... and if we look at the Northeast, returns look better there... so, overall, I think we should probably exit the Southeast."'}
        </p>
      </div>
      <div className="valufin-sst-takeaway-clay">
        <span className="valufin-sst-takeaway-clay-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9694F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 18H3z" /></svg>
        </span>
        <div className="valufin-sst-takeaway-clay-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

function Lesson3({ activeZone, setActiveZone }) {
  const active = SLIDE_ZONES.find((z) => z.id === activeZone) || SLIDE_ZONES[0];
  return (
    <>
      <div className="valufin-sst-eyebrow">CLICK EACH ZONE →</div>
      <div className="valufin-sst-mock-slide">
        <button className={`valufin-sst-mock-zone title${activeZone === 'title' ? ' active' : ''}`} onClick={() => setActiveZone('title')}>Revenue declined 12% due to pricing pressure</button>
        <button className={`valufin-sst-mock-zone body${activeZone === 'body' ? ' active' : ''}`} onClick={() => setActiveZone('body')}>
          <div className="valufin-sst-mock-line" style={{ width: '70%' }} /><div className="valufin-sst-mock-line" style={{ width: '55%' }} /><div className="valufin-sst-mock-line" style={{ width: '80%' }} />
        </button>
        <button className={`valufin-sst-mock-zone source${activeZone === 'source' ? ' active' : ''}`} onClick={() => setActiveZone('source')}>Source: Company filings, 2024</button>
      </div>
      <div className="valufin-sst-detail">
        <div className="valufin-sst-detail-head">{active.label}</div>
        <p className="valufin-sst-detail-body">{active.detail}</p>
      </div>
      <div className="valufin-sst-takeaway-dashed">
        <span className="valufin-sst-takeaway-dashed-check">✓</span>
        <div className="valufin-sst-takeaway-dashed-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

function Lesson4({ isGood, setIsGood }) {
  return (
    <>
      <div className="valufin-sst-eyebrow">TOGGLE BEFORE / AFTER →</div>
      <div className="valufin-sst-tabs">
        <button className={`valufin-sst-tab clay${!isGood ? ' active' : ''}`} onClick={() => setIsGood(false)}>BEFORE</button>
        <button className={`valufin-sst-tab${isGood ? ' active' : ''}`} onClick={() => setIsGood(true)}>AFTER</button>
      </div>
      <div className="valufin-sst-panel">
        {!isGood ? (
          <>
            <div className="valufin-sst-drill-topic" style={{ marginBottom: 10 }}>"Q3 Regional Performance"</div>
            <p className="valufin-sst-panel-body">Bullet 1: Southeast margins down. Bullet 2: Competitive intensity up. Bullet 3: Northeast performing well. Bullet 4: Team recommends review. No clear single point — four ideas competing for attention.</p>
          </>
        ) : (
          <>
            <div className="valufin-sst-drill-topic" style={{ marginBottom: 10 }}>"Exit the Southeast: three years of negative margins and no clear path to recovery"</div>
            <p className="valufin-sst-panel-body">One chart showing Southeast margin trend vs. Northeast, one line of supporting context. Everything on the slide supports the single title claim.</p>
          </>
        )}
      </div>
      <div className="valufin-sst-takeaway-quote">
        <span className="valufin-sst-takeaway-quote-mark">"</span>
        <div className="valufin-sst-takeaway-quote-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function Lesson5({ quizIndex, setQuizIndex, picked, setPicked }) {
  const q = QUIZ[quizIndex];
  return (
    <>
      <div className="valufin-sst-eyebrow">QUESTION {quizIndex + 1} OF {QUIZ.length}</div>
      <div className="valufin-sst-panel">
        <div className="valufin-sst-quiz-q">{q.q}</div>
        <div className="valufin-sst-quiz-choices">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const showCorrect = picked !== null && i === q.correct;
            return (
              <button key={c} className={`valufin-sst-quiz-choice${showCorrect ? ' correct' : isPicked ? ' wrong' : ''}`} onClick={() => picked === null && setPicked(i)}>{c}</button>
            );
          })}
        </div>
        {picked !== null && <div className="valufin-sst-quiz-feedback">{q.explain}</div>}
        {picked !== null && quizIndex < QUIZ.length - 1 && (
          <button className="valufin-sst-quiz-next" onClick={() => { setQuizIndex(quizIndex + 1); setPicked(null); }}>Next question →</button>
        )}
      </div>
      <div className="valufin-sst-takeaway-rule red">
        <div className="valufin-sst-takeaway-rule-label" style={{ color: '#D9694F' }}>KEY TAKEAWAY</div>
        <div className="valufin-sst-takeaway-rule-body">{LESSONS[4].takeaway}</div>
      </div>
    </>
  );
}

export default function SlideStorytelling() {
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [drillIndex, setDrillIndex] = useState(0);
  const [drillPicked, setDrillPicked] = useState(null);
  const [isPyramid, setIsPyramid] = useState(true);
  const [activeZone, setActiveZone] = useState('title');
  const [isGood, setIsGood] = useState(true);
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState(null);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => { const idx = completed.findIndex((c) => !c); return idx === -1 ? completed.length - 1 : idx; })();

  function resetLessonState() { setQuizIndex(0); setPicked(null); setDrillIndex(0); setDrillPicked(null); }
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
          ? [{ label: 'Consulting', path: '/consulting' }, { label: 'Slide Storytelling' }]
          : [{ label: 'Consulting', path: '/consulting' }, { label: 'Slide Storytelling', onClick: backToTopics }, { label: activeLesson.title }]} />
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill high-value">High-value</span>
            <span className="valufin-ticker-caption">SST · SLIDE STORYTELLING</span>
          </div>
          <h1 className="valufin-archivo-h1">Slide<br />Storytelling</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Action titles, the pyramid principle, and the habit that separates a slide that
            reads itself from one that needs a narrator.
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
          <div className="valufin-lesson-detail-eyebrow">SLIDE STORYTELLING · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          {activeLesson.body2 && <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>}

          {activeIndex === 0 && <Lesson1 drillIndex={drillIndex} setDrillIndex={setDrillIndex} picked={drillPicked} setPicked={setDrillPicked} />}
          {activeIndex === 1 && <Lesson2 isPyramid={isPyramid} setIsPyramid={setIsPyramid} />}
          {activeIndex === 2 && <Lesson3 activeZone={activeZone} setActiveZone={setActiveZone} />}
          {activeIndex === 3 && <Lesson4 isGood={isGood} setIsGood={setIsGood} />}
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
