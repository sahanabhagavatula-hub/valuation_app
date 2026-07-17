import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MacWindow from '../components/MacWindow';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7'];

const LESSONS = [
  {
    title: 'The anatomy of a pitch book',
    minutes: 6,
    kind: 'reading',
    body1: "A pitch book is the deck a banking team brings into a client meeting — it's the physical output of weeks of valuation and market work, compressed into slides a CEO can flip through in twenty minutes.",
    body2: 'Every pitch book follows a loose structure: firm credentials, situation overview, valuation summary, strategic alternatives, and an appendix with the detailed models. Recruiters test whether you understand why that order exists, not just that it does.',
    takeaway: "A pitch book's structure is an argument, not a template — each section exists to build the client's confidence toward a recommendation.",
  },
  {
    title: 'Building the valuation summary slide',
    minutes: 7,
    kind: 'walkthrough',
    body1: "The valuation summary — often a 'football field' chart — takes every method you've built (DCF, comps, precedents) and lines them up as ranges on one slide.",
    body2: "The skill isn't running the models — it's presenting a range that's defensible from multiple angles at once, so no single assumption can sink the whole recommendation.",
    takeaway: "A football field slide's real job is making disagreement about any one method survivable.",
  },
  {
    title: 'Storytelling for a skeptical room',
    minutes: 7,
    kind: 'case exercise',
    body1: "Bankers don't just present numbers — they anticipate the client's counter-arguments and address them before they're raised.",
    body2: "This lesson walks through a mock client Q&A after a pitch, and how the banker's slide order does most of the persuasive work before anyone speaks.",
    takeaway: 'The best pitch books pre-empt objections in the slide order, not just in the Q&A.',
  },
  {
    title: 'Build the deck yourself',
    minutes: 8,
    kind: 'challenge',
    body1: "Now put the structure to work. You'll get six section cards in random order — drag or click them into the sequence that builds the strongest argument for a skeptical board.",
    body2: "There's no single 'correct' pitch book, but there is a wrong one: leading with the appendix, or asking for a decision before establishing why your firm should be trusted at all.",
    takeaway: 'Order is persuasion — the same six sections in the wrong sequence is a weaker pitch, not just a different one.',
  },
];

const PITCH_SECTIONS = [
  { id: 'cover', navLabel: 'Cover', slideTitle: 'Project Titan — Discussion Materials', chartLabel: 'FIRM LOGO + DATE', purpose: 'Sets the tone: confidential, formal, and addressed to a specific deal codename — never the real company name at this stage.' },
  { id: 'credentials', navLabel: 'Firm Credentials', slideTitle: 'Why [Bank] Is the Right Advisor', chartLabel: 'LEAGUE TABLE / DEAL LOGOS', purpose: 'Establishes trust before any numbers are shown — relevant past deals and sector expertise, so the client believes the analysis that follows.' },
  { id: 'situation', navLabel: 'Situation Overview', slideTitle: 'Company Snapshot & Market Context', chartLabel: 'SHARE PRICE CHART', purpose: 'Frames the problem the client actually has right now — recent performance, market pressure, or a triggering event.' },
  { id: 'valuation', navLabel: 'Valuation Summary', slideTitle: 'Football Field — Valuation Ranges', chartLabel: 'FOOTBALL FIELD CHART', purpose: 'The analytical core: DCF, comps, and precedents lined up as ranges so no single method carries the whole argument.' },
  { id: 'alternatives', navLabel: 'Strategic Alternatives', slideTitle: 'Paths Forward for the Board', chartLabel: 'OPTIONS COMPARISON TABLE', purpose: "Lays out the realistic choices (sell, raise capital, stay the course) and the bank's recommended path among them." },
  { id: 'appendix', navLabel: 'Appendix', slideTitle: 'Detailed Model Backup', chartLabel: 'DCF / COMPS DETAIL TABLES', purpose: 'Where the full models live — rarely presented live, but proves every summary number is defensible if questioned.' },
];

const VALUATION_METHODS = [
  {
    id: 'dcf', label: 'DCF', initial: 'D', color: '#4FC3C7', bar: [30, 40], low: 42, high: 58,
    howToApply: "Lead with DCF when the client's story is about intrinsic, standalone value — what the business is worth on its own cash flows, independent of what the market or other buyers think today.",
    inPitch: "In the room: use it to justify a price above the current trading level. If your DCF says $42–58 and the stock trades at $40, that gap is your growth argument — point to the specific assumptions (growth rate, margins, discount rate) driving it, because that's exactly what a sharp board will interrogate first.",
  },
  {
    id: 'comps', label: 'Comps', initial: 'C', color: '#C4B79A', bar: [20, 30], low: 38, high: 50,
    howToApply: "Bring in Comps to ground your DCF in reality — it answers 'does the market actually pay for businesses like this?' It's your sanity check, not your hero number.",
    inPitch: "In the room: use it to defend your DCF range against skepticism. If DCF says $58 but peers trade at 8x and yours implies 11x, you need a specific reason (higher growth, better margins) — otherwise the board will assume your model is just optimistic.",
  },
  {
    id: 'precedent', label: 'Precedent', initial: 'P', color: '#D9694F', bar: [40, 45], low: 46, high: 64,
    howToApply: "Reach for Precedent Transactions specifically when the ask is 'what would someone actually pay to acquire this whole company' — it includes the control premium the other two methods don't.",
    inPitch: "In the room: this is your answer to 'why would a buyer pay more than today's price.' Point to comparable deals and their premiums-paid, and be ready to explain why this situation deserves a similar (or different) premium.",
  },
];

const QA_PAIRS = [
  { q: '"Why trust this over the last banker\'s number?"', a: 'Points to the football field — three methods converge on one range.', dotBg: '#1C5A5E' },
  { q: '"What stops a competitor from countering this?"', a: 'Points to Strategic Alternatives — we already ruled the others out.', dotBg: '#7a4a2e' },
  { q: '"Why do this now?"', a: 'Points to the Situation Overview — the market window argument.', dotBg: '#5a5646' },
];

const CORRECT_DECK_ORDER = ['cover', 'credentials', 'situation', 'valuation', 'alternatives', 'appendix'];
const DECK_CARDS_INITIAL_ORDER = [
  { id: 'situation', navLabel: 'Situation Overview' },
  { id: 'appendix', navLabel: 'Appendix' },
  { id: 'cover', navLabel: 'Cover' },
  { id: 'alternatives', navLabel: 'Strategic Alternatives' },
  { id: 'valuation', navLabel: 'Valuation Summary' },
  { id: 'credentials', navLabel: 'Firm Credentials' },
];

function ArrowIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <polyline points="10,18 18,18 18,10" />
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

function MacBookScene({ caption, children }) {
  return (
    <div className="valufin-deck-scene">
      <div className="valufin-deck-caption-wrap">
        <div className="valufin-deck-caption">{caption}</div>
      </div>
      <div className="valufin-macbook">
        <div className="valufin-macbook-lid">
          <div className="valufin-macbook-camera" />
          <div className="valufin-macbook-screen">
            <MacWindow title="Pitch Book — Draft v4.pptx" width={1000} height={600}>
              {children}
            </MacWindow>
          </div>
        </div>
        <div className="valufin-macbook-hinge" />
        <div className="valufin-macbook-base">
          <div className="valufin-macbook-keyboard" />
          <div className="valufin-macbook-trackpad" />
        </div>
        <div className="valufin-macbook-lip" />
      </div>
    </div>
  );
}

// Lesson 1 — anatomy: sidebar nav of 6 real sections + wireframed slide + purpose
function Lesson1Anatomy({ selectedSection, setSelectedSection }) {
  const active = PITCH_SECTIONS[selectedSection];
  return (
    <>
      <div className="valufin-pb-eyebrow">CLICK A SECTION TO SEE THAT SLIDE →</div>
      <MacBookScene caption="">
        <div className="valufin-pb-anatomy-layout">
          <div className="valufin-pb-anatomy-nav">
            {PITCH_SECTIONS.map((sec, i) => (
              <button
                key={sec.id}
                className={`valufin-pb-anatomy-navitem${i === selectedSection ? ' active' : ''}`}
                onClick={() => setSelectedSection(i)}
              >
                <span className="valufin-pb-anatomy-navdot" />
                <span>{sec.navLabel}</span>
              </button>
            ))}
          </div>
          <div className="valufin-pb-anatomy-content">
            <div className="valufin-pb-anatomy-slidenum">SLIDE {selectedSection + 1} OF 6</div>
            <div className="valufin-pb-anatomy-slidetitle">{active.slideTitle}</div>
            <div className="valufin-pb-anatomy-wireframe">
              <div className="valufin-pb-wf-line w60" />
              <div className="valufin-pb-wf-line w85" />
              <div className="valufin-pb-wf-line w40" />
              <div className="valufin-pb-wf-chart"><span>{active.chartLabel}</span></div>
            </div>
            <div className="valufin-pb-anatomy-purpose">{active.purpose}</div>
          </div>
        </div>
      </MacBookScene>
      <div className="valufin-pb-takeaway-terminal">
        <div className="valufin-pb-takeaway-terminal-label">// TAKEAWAY</div>
        <div className="valufin-pb-takeaway-terminal-body">{LESSONS[0].takeaway}</div>
      </div>
    </>
  );
}

// Lesson 2 — football field chart + accordion, then the same chart as an actual clickable slide
function Lesson2Valuation({ noteOpen, setNoteOpen, selectedMethod, setSelectedMethod, modalOpen, setModalOpen }) {
  const activeMethod = VALUATION_METHODS[selectedMethod];
  return (
    <>
      <div className="valufin-pb-eyebrow">FOOTBALL FIELD — VALUATION RANGES</div>
      <div className="valufin-pb-field-panel">
        <div className="valufin-pb-field-inner">
          <div className="valufin-pb-field-marker" />
          <div className="valufin-pb-field-marker-label">CURRENT $40</div>
          {VALUATION_METHODS.map((m) => (
            <div key={m.id} className="valufin-pb-field-row">
              <span className="valufin-pb-field-rowlabel" style={{ color: m.color }}>{m.label}</span>
              <div className="valufin-pb-field-track">
                <div
                  className="valufin-pb-field-bar"
                  style={{ left: `${m.bar[0]}%`, width: `${m.bar[1]}%`, borderColor: m.color, background: `${m.color}33` }}
                >
                  <span style={{ color: m.color }}>${m.low}</span>
                  <span style={{ color: m.color }}>${m.high}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="valufin-pb-field-notebtn" onClick={() => setNoteOpen(!noteOpen)}>
          <span className="valufin-pb-field-noteicon"><i className="ti ti-layout-grid" /></span>
          <span className="valufin-pb-field-notelabel">So what's the actual recommendation?</span>
          <span className="valufin-pb-field-notechevron"><i className={`ti ti-chevron-${noteOpen ? 'up' : 'down'}`} /></span>
        </button>
        {noteOpen && (
          <div className="valufin-pb-field-notebody">
            The three ranges overlap around <b>$46–50</b> — that overlap zone, not any single method's midpoint, is
            what you actually put in front of the client. DCF alone would let you argue for $58; Comps alone would
            cap you near $50. The overlap is the number all three methods agree is defensible.
          </div>
        )}
      </div>

      <div className="valufin-pb-eyebrow" style={{ marginTop: 30 }}>HOW IT LANDS ON THE ACTUAL SLIDE →</div>
      <MacBookScene caption="">
        <div className="valufin-pb-valslide">
          <div className="valufin-pb-valslide-num">SLIDE 4 OF 6</div>
          <div className="valufin-pb-valslide-title">Valuation Summary</div>
          <div className="valufin-pb-valslide-chart">
            <div className="valufin-pb-valslide-marker" />
            <div className="valufin-pb-valslide-markerlabel">CURRENT $40</div>
            {VALUATION_METHODS.map((m, i) => (
              <div key={m.id} className="valufin-pb-valslide-row">
                <span className="valufin-pb-valslide-rowlabel">{m.label.toUpperCase()}</span>
                <button
                  className={`valufin-pb-valslide-track${i === selectedMethod ? ' active' : ''}`}
                  onClick={() => { setSelectedMethod(i); setModalOpen(true); }}
                >
                  <div className="valufin-pb-valslide-fill" style={{ left: `${m.bar[0]}%`, width: `${m.bar[1]}%`, background: m.color }} />
                </button>
              </div>
            ))}
          </div>
          <div className="valufin-pb-valslide-footnote">Recommended range: <b>$46–$50 / share</b>, supported by convergence across all three methodologies.</div>
        </div>

        {modalOpen && (
          <div className="valufin-quicklook-overlay" onClick={() => setModalOpen(false)}>
            <div className="valufin-quicklook-panel" onClick={(e) => e.stopPropagation()}>
              <div className="valufin-quicklook-titlebar">
                <span className="valufin-quicklook-filename">{activeMethod.label} — Valuation Method.pages</span>
                <button className="valufin-quicklook-close" onClick={() => setModalOpen(false)} aria-label="Close">
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="valufin-pb-methodmodal-body">
                <div className="valufin-pb-methodmodal-header">
                  <span className="valufin-pb-methodmodal-badge" style={{ background: activeMethod.color }}>{activeMethod.initial}</span>
                  <div>
                    <div className="valufin-pb-methodmodal-name">{activeMethod.label}</div>
                    <div className="valufin-pb-methodmodal-tag">VALUATION METHOD</div>
                  </div>
                </div>
                <div className="valufin-pb-methodmodal-label">WHEN TO LEAD WITH {activeMethod.label.toUpperCase()}</div>
                <p className="valufin-pb-methodmodal-text">{activeMethod.howToApply}</p>
                <hr className="valufin-pb-methodmodal-hr" />
                <div className="valufin-pb-methodmodal-label">USING IT IN YOUR PITCH</div>
                <p className="valufin-pb-methodmodal-text">{activeMethod.inPitch}</p>
              </div>
            </div>
          </div>
        )}
      </MacBookScene>
      <div className="valufin-pb-takeaway-bracket">
        <div className="valufin-pb-takeaway-bracket-corner tl" />
        <div className="valufin-pb-takeaway-bracket-corner br" />
        <div className="valufin-pb-takeaway-bracket-body">{LESSONS[1].takeaway}</div>
      </div>
    </>
  );
}

// Lesson 3 — mock client Q&A picker
function Lesson3Storytelling({ qaIndex, setQaIndex }) {
  const active = QA_PAIRS[qaIndex];
  return (
    <>
      <div className="valufin-pb-eyebrow">PICK AN OBJECTION →</div>
      <div className="valufin-pb-qa">
        <div className="valufin-pb-qa-tabs">
          {QA_PAIRS.map((b, i) => (
            <button
              key={i}
              className={`valufin-pb-qa-tab${i === qaIndex ? ' active' : ''}`}
              style={{ background: b.dotBg }}
              onClick={() => setQaIndex(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="valufin-pb-qa-card">
          <div className="valufin-pb-qa-meta">OBJECTION {qaIndex + 1} OF 3</div>
          <div className="valufin-pb-qa-line"><span className="valufin-pb-qa-who client">CLIENT:</span> <span className="valufin-pb-qa-text">{active.q}</span></div>
          <div className="valufin-pb-qa-line"><span className="valufin-pb-qa-who banker">BANKER:</span> <span className="valufin-pb-qa-text">{active.a}</span></div>
        </div>
      </div>
      <div className="valufin-pb-takeaway-quote">
        <span className="valufin-pb-takeaway-quote-mark">"</span>
        <div className="valufin-pb-takeaway-quote-body">{LESSONS[2].takeaway}</div>
      </div>
    </>
  );
}

// Lesson 4 — order the 6 cards, score against the canonical sequence
function Lesson4Challenge({ shuffledCards, deckOrder, setDeckOrder, deckScored, setDeckScored }) {
  function pick(id) {
    if (deckScored) return;
    if (deckOrder.includes(id)) setDeckOrder(deckOrder.filter((x) => x !== id));
    else if (deckOrder.length < 6) setDeckOrder([...deckOrder, id]);
  }
  function score() {
    if (deckOrder.length < 6) return;
    setDeckScored(true);
  }
  function reset() {
    setDeckOrder([]);
    setDeckScored(false);
  }

  const correctCount = deckScored ? deckOrder.filter((id, i) => CORRECT_DECK_ORDER[i] === id).length : 0;
  const gradeColor = correctCount >= 5 ? '#3FBF6F' : correctCount >= 3 ? '#C4B79A' : '#D9694F';
  const verdict = correctCount === 6
    ? 'Exact order — cover builds trust, credentials earn the room, situation frames the problem, valuation makes the case, alternatives give the choice, appendix backs it all up.'
    : correctCount >= 4
      ? 'Close. Check whether Valuation Summary landed before Strategic Alternatives — the numbers need to exist before you present the choice they support.'
      : 'Off from the persuasive sequence — remember, the appendix backs up the argument, it never opens it, and firm credentials come before you show any real analysis.';

  return (
    <>
      <div className="valufin-pb-eyebrow">CLICK CARDS IN ORDER, FIRST TO LAST →</div>
      <div className="valufin-pb-deck">
        <div className="valufin-pb-deck-grid">
          {shuffledCards.map((c) => {
            const pos = deckOrder.indexOf(c.id);
            const picked = pos !== -1;
            let cls = 'valufin-pb-deck-card';
            if (picked && !deckScored) cls += ' picked';
            if (deckScored && picked) cls += CORRECT_DECK_ORDER[pos] === c.id ? ' correct' : ' wrong';
            return (
              <button key={c.id} className={cls} onClick={() => pick(c.id)}>
                <div className="valufin-pb-deck-num">{picked ? pos + 1 : '—'}</div>
                <div className="valufin-pb-deck-label">{c.navLabel}</div>
              </button>
            );
          })}
        </div>
        <div className="valufin-pb-deck-actions">
          <button className="valufin-pb-deck-btn-primary" onClick={score}>Check my order →</button>
          <button className="valufin-pb-deck-btn-secondary" onClick={reset}>↻ Reset order</button>
        </div>
        {deckScored && (
          <div className="valufin-pb-deck-result">
            <div className="valufin-pb-deck-result-head">
              <span>Your sequence</span>
              <span style={{ color: gradeColor }}>{correctCount}/6 in place</span>
            </div>
            <div className="valufin-pb-deck-result-body">{verdict}</div>
          </div>
        )}
      </div>
      <div className="valufin-pb-takeaway-rule">
        <div className="valufin-pb-takeaway-rule-label">KEY TAKEAWAY</div>
        <div className="valufin-pb-takeaway-rule-body">{LESSONS[3].takeaway}</div>
      </div>
    </>
  );
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PitchBooks() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([true, false, false, false]);

  const [selectedSection, setSelectedSection] = useState(0);
  const [noteOpen, setNoteOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [qaIndex, setQaIndex] = useState(0);
  const [shuffledCards] = useState(() => shuffle(DECK_CARDS_INITIAL_ORDER));
  const [deckOrder, setDeckOrder] = useState([]);
  const [deckScored, setDeckScored] = useState(false);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const firstIncomplete = (() => {
    const idx = completed.findIndex((c) => !c);
    return idx === -1 ? completed.length - 1 : idx;
  })();

  function openLesson(i) {
    setActiveIndex(i);
    setView('lesson');
  }

  function backToTopics() {
    setView('list');
  }

  function markCompleteAndAdvance() {
    const next = [...completed];
    next[activeIndex] = true;
    setCompleted(next);
    const nextIndex = activeIndex + 1;
    if (nextIndex < LESSONS.length) {
      setActiveIndex(nextIndex);
    } else {
      setView('list');
    }
  }

  const activeLesson = LESSONS[activeIndex];
  const isLast = activeIndex === LESSONS.length - 1;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'radial-gradient(rgba(237,235,228,0.06) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="valufin-lesson-topbar">
        <button className="valufin-lesson-topbar-back" onClick={() => (view === 'list' ? navigate('/ib') : backToTopics())}>
          ← {view === 'list' ? 'Investment Banking' : 'Pitch Books'}
        </button>
        <span className="valufin-lesson-topbar-tag">PTB · PITCH BOOKS</span>
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill high-value">High-value</span>
            <span className="valufin-ticker-caption">PTB · TICKER SYMBOL</span>
          </div>
          <h1 className="valufin-archivo-h1">Pitch<br />Books</h1>
          <p className="valufin-caption" style={{ maxWidth: 560, marginTop: 22 }}>
            How bankers package valuation and market analysis into a client-ready presentation —
            structure, storytelling, and the slides that actually get used.
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
              const badgeBg = isDone ? '#3FBF6F' : BADGE_COLORS[i % BADGE_COLORS.length];
              return (
                <button key={lesson.title} className="valufin-lesson-row" onClick={() => openLesson(i)}>
                  <span className="valufin-lesson-badge" style={{ background: badgeBg }}>
                    {isDone ? <CheckIcon /> : <span className="valufin-lesson-badge-num">{String(i + 1).padStart(2, '0')}</span>}
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
          <div className="valufin-lesson-detail-eyebrow">PITCH BOOKS · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />

          <p className="valufin-lesson-detail-body">{activeLesson.body1}</p>
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body2}</p>

          {activeIndex === 0 && <Lesson1Anatomy selectedSection={selectedSection} setSelectedSection={setSelectedSection} />}
          {activeIndex === 1 && (
            <Lesson2Valuation
              noteOpen={noteOpen}
              setNoteOpen={setNoteOpen}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          )}
          {activeIndex === 2 && <Lesson3Storytelling qaIndex={qaIndex} setQaIndex={setQaIndex} />}
          {activeIndex === 3 && (
            <Lesson4Challenge
              shuffledCards={shuffledCards}
              deckOrder={deckOrder}
              setDeckOrder={setDeckOrder}
              deckScored={deckScored}
              setDeckScored={setDeckScored}
            />
          )}

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
