import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BADGE_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F', '#4FC3C7', '#C4B79A'];
const MONO_COLORS = ['#4FC3C7', '#C4B79A', '#D9694F'];

const LESSONS = [
  {
    title: 'Build your own multiple',
    minutes: 5,
    kind: 'interactive',
    body: "A multiple is nothing mystical — it's Enterprise Value divided by a profit metric like EBITDA. Drag both sliders below and watch how the ratio moves. Notice: the same EV can look cheap or expensive depending purely on how much EBITDA it's buying.",
  },
  {
    title: 'Match the multiple to the business',
    minutes: 6,
    kind: 'matching game',
    body: "Not every company gets valued the same way. A money-losing SaaS company, a capital-heavy industrial, and a steady mature retailer each call for a different multiple — because each one lacks a clean version of the others' metric. Pick the right multiple for each.",
  },
  {
    title: 'Build the range, not a number',
    minutes: 6,
    kind: 'interactive',
    body: "Five peer companies almost never trade at the exact same multiple. Your job isn't to average them blindly — it's to pick a defensible low, median, and high, then see what valuation range that implies for the target.",
  },
  {
    title: 'Stress-test with an outlier',
    minutes: 5,
    kind: 'interactive',
    body: "One peer trading wildly above the rest can drag your whole range out of shape. Toggle the outlier on and off below and watch what it does to your spread — then decide whether it belongs in your set at all.",
  },
  {
    title: 'The final challenge',
    minutes: 8,
    kind: 'ai scenario',
    body: "Now do the whole workflow yourself. The generator below hands you a fresh batch of candidate companies against a target — screen them, pick your comps, and get scored on how close you land to an analyst-grade peer set.",
  },
];

const MATCH_DATA = [
  { name: 'NimbusCloud', profile: 'Fast-growing SaaS company, not yet profitable — burns cash to fund growth.', correct: 'EV/Revenue' },
  { name: 'Ferrocast Industrial', profile: 'Capital-intensive manufacturer with steady, predictable EBITDA.', correct: 'EV/EBITDA' },
  { name: 'Roadway Retail', profile: 'Mature, profitable retail chain with stable net income.', correct: 'P/E' },
];
const OPTION_LABELS = ['EV/Revenue', 'EV/EBITDA', 'P/E'];

const PEER_MULTIPLES = [7.2, 8.5, 9.1, 9.8, 11.4];
const RANGE_MIN = 6;
const RANGE_MAX = 13;
const TARGET_EBITDA_L3 = 95;

const CHALLENGE_TARGET_EBITDA = 95;
const CHALLENGE_BATCHES = [
  [
    { name: 'TrailForge Apparel', sector: 'Outdoor apparel & gear', revenue: '$820M', isComp: true, ev: 950, ebitda: 108 },
    { name: 'CascadeGear Co.', sector: 'Outdoor apparel & gear', revenue: '$705M', isComp: true, ev: 780, ebitda: 92 },
    { name: 'SummitLine Outdoors', sector: 'Outdoor equipment', revenue: '$690M', isComp: true, ev: 690, ebitda: 78 },
    { name: 'MegaMart Retail', sector: 'General big-box retail', revenue: '$48,000M', isComp: false, ev: 22800, ebitda: 3800 },
    { name: 'NimbusCloud', sector: 'Enterprise SaaS', revenue: '$390M', isComp: false, ev: 3200, ebitda: -40 },
    { name: 'Micro Ridge Gear', sector: 'Outdoor gear (early-stage)', revenue: '$28M', isComp: false, ev: 40, ebitda: 2 },
  ],
  [
    { name: 'PeakWear Co.', sector: 'Outdoor apparel & gear', revenue: '$910M', isComp: true, ev: 1050, ebitda: 115 },
    { name: 'AlpineTrek Holdings', sector: 'Outdoor apparel & gear', revenue: '$730M', isComp: true, ev: 840, ebitda: 95 },
    { name: 'Glacier Supply Co.', sector: 'Outdoor equipment', revenue: '$675M', isComp: true, ev: 640, ebitda: 71 },
    { name: 'UrbanThreads Fashion', sector: 'Fast fashion apparel', revenue: '$890M', isComp: false, ev: 780, ebitda: 98 },
    { name: 'Ferrocast Industrial', sector: 'Heavy manufacturing', revenue: '$740M', isComp: false, ev: 890, ebitda: 145 },
    { name: 'StartV Biotech', sector: 'Pre-revenue biotech', revenue: '$0M', isComp: false, ev: 500, ebitda: -60 },
  ],
  [
    { name: 'SummitGear Inc.', sector: 'Outdoor equipment', revenue: '$650M', isComp: true, ev: 760, ebitda: 84 },
    { name: 'Ridgeline Apparel Co.', sector: 'Outdoor apparel & gear', revenue: '$860M', isComp: true, ev: 990, ebitda: 112 },
    { name: 'Basecamp Outdoor Group', sector: 'Outdoor apparel & gear', revenue: '$715M', isComp: true, ev: 820, ebitda: 90 },
    { name: 'CloudStack Software', sector: 'Enterprise SaaS', revenue: '$410M', isComp: false, ev: 3600, ebitda: 262 },
    { name: 'Harbor National Bank', sector: 'Regional banking', revenue: '$1,200M', isComp: false, ev: null, ebitda: null },
    { name: 'Roadway Retail', sector: 'Mature general retail', revenue: '$920M', isComp: false, ev: 1450, ebitda: 165 },
  ],
];

function ArrowIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <polyline points="10,18 18,18 18,10" />
    </svg>
  );
}

function CheckIcon({ color = '#0A0E14' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

function StarIcon({ filled }) {
  const color = filled ? '#4FC3C7' : 'rgba(237,235,228,0.22)';
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 18.27l-6.18 3.23L7 14.63l-5-4.87 6.91-1z" />
    </svg>
  );
}

function StarRating({ accuracy }) {
  const filled = accuracy >= 90 ? 5 : accuracy >= 75 ? 4 : accuracy >= 55 ? 3 : accuracy >= 30 ? 2 : 1;
  return (
    <div className="valufin-mlab-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= filled} />
      ))}
    </div>
  );
}

function initialsOf(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

function SectorIcon({ sector, className }) {
  const s = sector.toLowerCase();
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (s.includes('outdoor')) {
    return <svg {...common}><path d="M3 20 L9 8 L13 14 L16 9 L21 20 Z" /></svg>;
  }
  if (s.includes('saas') || s.includes('software')) {
    return <svg {...common}><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" /></svg>;
  }
  if (s.includes('fashion')) {
    return <svg {...common}><circle cx="12" cy="5" r="1.5" /><path d="M12 6.5v2M12 8.5l9 5.5H3z" /></svg>;
  }
  if (s.includes('manufactur')) {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 110-4h.2a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 114 0v.2a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.6 1H21a2 2 0 110 4h-.2a1.7 1.7 0 00-1.6 1z" />
      </svg>
    );
  }
  if (s.includes('biotech')) {
    return <svg {...common}><path d="M9 3h6M10 3v6l-5.5 9.5A1 1 0 005.4 20h13.2a1 1 0 00.9-1.5L14 9V3" /></svg>;
  }
  if (s.includes('bank')) {
    return <svg {...common}><path d="M3 21h18M4 21V10l8-5 8 5v11M9 21v-6h6v6" /></svg>;
  }
  return <svg {...common}><path d="M6 8h12l-1 12H7L6 8zM9 8V6a3 3 0 016 0v2" /></svg>;
}

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function Collapsible({ id, label, openInfo, toggleInfo, children }) {
  const isOpen = !!openInfo[id];
  return (
    <div className="valufin-mlab-collapsible">
      <button className="valufin-mlab-collapsible-head" onClick={() => toggleInfo(id)}>
        <span className="valufin-mlab-collapsible-q">{isOpen ? '−' : '?'}</span>
        <span>{label}</span>
        <i className={`ti ti-chevron-${isOpen ? 'up' : 'down'} valufin-mlab-collapsible-chev`} />
      </button>
      {isOpen && <div className="valufin-mlab-collapsible-body">{children}</div>}
    </div>
  );
}

function Lesson1({ ev, setEv, ebitda, setEbitda, openInfo, toggleInfo }) {
  const multiple = ev / ebitda;
  const inBand = multiple >= 8 && multiple <= 12;
  const color = inBand ? '#3FBF6F' : '#D9694F';
  const bandBg = inBand ? 'rgba(63,191,111,0.08)' : 'rgba(217,105,79,0.08)';
  const bandBorder = inBand ? 'rgba(63,191,111,0.3)' : 'rgba(217,105,79,0.3)';
  const verdict = inBand
    ? 'Right in the typical 8x–12x band for this sector.'
    : multiple < 8
      ? 'Below typical range — looks cheap, or something is wrong.'
      : "Above typical range — the market is pricing in serious growth, or it's overpriced.";

  return (
    <>
      <Collapsible id="l1Def" label="WHAT ARE EV AND EBITDA?" openInfo={openInfo} toggleInfo={toggleInfo}>
        <div className="valufin-mlab-legend-row">
          <div className="valufin-mlab-legend-card teal">
            <div className="valufin-mlab-legend-label">EV — ENTERPRISE VALUE</div>
            <div className="valufin-mlab-legend-body">What it would cost to buy the whole business outright — equity plus debt, minus cash. The "sticker price" for the company itself.</div>
          </div>
          <div className="valufin-mlab-legend-card gold">
            <div className="valufin-mlab-legend-label">EBITDA</div>
            <div className="valufin-mlab-legend-body">Earnings before interest, tax, depreciation &amp; amortization — a rough proxy for the cash the core business throws off, before financing and accounting choices distort it.</div>
          </div>
        </div>
      </Collapsible>
      <div className="valufin-mlab-panel">
        <div className="valufin-mlab-row">
          <span className="valufin-mlab-row-label">ENTERPRISE VALUE (EV)</span>
          <span className="valufin-mlab-row-value">${ev}M</span>
        </div>
        <input className="valufin-mlab-range" type="range" min={400} max={1600} step={10} value={ev} onChange={(e) => setEv(Number(e.target.value))} />
        <div className="valufin-mlab-row" style={{ marginTop: 22 }}>
          <span className="valufin-mlab-row-label">EBITDA</span>
          <span className="valufin-mlab-row-value">${ebitda}M</span>
        </div>
        <input className="valufin-mlab-range" style={{ marginBottom: 26 }} type="range" min={40} max={160} step={2} value={ebitda} onChange={(e) => setEbitda(Number(e.target.value))} />
        <div className="valufin-mlab-result" style={{ background: bandBg, borderColor: bandBorder }}>
          <div className="valufin-mlab-result-label">EV ÷ EBITDA =</div>
          <div className="valufin-mlab-result-value" style={{ color }}>{multiple.toFixed(1)}x</div>
          <div className="valufin-mlab-result-verdict" style={{ color }}>{verdict}</div>
        </div>
      </div>
      <Collapsible id="l1Note" label="WHAT JUST HAPPENED?" openInfo={openInfo} toggleInfo={toggleInfo}>
        <p className="valufin-lesson-footnote" style={{ marginBottom: 0 }}>
          Notice what just happened: you didn't change anything about how good the business is — you only moved
          the price (EV) or the profit (EBITDA), and the multiple moved with it. That's all a "multiple" ever is:
          a relationship between what something costs and what it earns.
        </p>
      </Collapsible>
    </>
  );
}

function Lesson2({ picks, setPick, openInfo, toggleInfo }) {
  return (
    <>
      <Collapsible id="l2Legend" label="WHICH MULTIPLE, WHEN?" openInfo={openInfo} toggleInfo={toggleInfo}>
        <div className="valufin-mlab-match-legend">
          <div className="valufin-mlab-match-legend-card">
            <div className="valufin-mlab-match-legend-label">EV/Revenue</div>
            <div className="valufin-mlab-match-legend-body">Use when there's no clean profit yet — growth-stage companies still burning cash.</div>
          </div>
          <div className="valufin-mlab-match-legend-card">
            <div className="valufin-mlab-match-legend-label">EV/EBITDA</div>
            <div className="valufin-mlab-match-legend-body">The default for stable, profitable operating companies — ignores capital structure and depreciation policy.</div>
          </div>
          <div className="valufin-mlab-match-legend-card">
            <div className="valufin-mlab-match-legend-label">P/E</div>
            <div className="valufin-mlab-match-legend-body">Values the equity directly against net income — works best for mature, simply-financed businesses.</div>
          </div>
        </div>
      </Collapsible>
      <div className="valufin-mlab-match-list">
        {MATCH_DATA.map((mc, i) => {
          const pick = picks[i];
          return (
            <div key={mc.name} className="valufin-mlab-match-card">
              <div className="valufin-mlab-match-name">{mc.name}</div>
              <div className="valufin-mlab-match-profile">{mc.profile}</div>
              <div className="valufin-mlab-match-options">
                {OPTION_LABELS.map((label) => {
                  const isPicked = pick === label;
                  const isCorrect = label === mc.correct;
                  let cls = 'valufin-mlab-match-opt';
                  if (pick) {
                    if (isCorrect) cls += ' correct';
                    else if (isPicked) cls += ' wrong';
                  }
                  return (
                    <button key={label} className={cls} onClick={() => setPick(i, label)}>
                      {label}
                    </button>
                  );
                })}
              </div>
              {pick && (
                <div className={`valufin-mlab-match-result${pick === mc.correct ? ' correct' : ' wrong'}`}>
                  {pick === mc.correct
                    ? `Correct — ${mc.correct} fits because the other metrics aren't meaningful here.`
                    : `Not quite — the right answer is ${mc.correct}.`}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Collapsible id="l2Note" label="THE PATTERN" openInfo={openInfo} toggleInfo={toggleInfo}>
        <p className="valufin-lesson-footnote" style={{ marginBottom: 0 }}>
          The pattern: pick the metric that's actually clean and comparable across companies. If a company has no
          profit, EV/EBITDA and P/E are meaningless — so you fall back to revenue, the one number every company
          reliably reports.
        </p>
      </Collapsible>
    </>
  );
}

function Lesson3({ preset, setPreset, openInfo, toggleInfo }) {
  const resolvedPreset = preset || 'median';
  const selectedMultiple = resolvedPreset === 'low' ? 7.2 : resolvedPreset === 'high' ? 11.4 : 9.1;
  const impliedEV = Math.round(selectedMultiple * TARGET_EBITDA_L3);

  return (
    <>
      <div className="valufin-mlab-panel">
        <div className="valufin-mlab-eyebrow">5 PEER EV/EBITDA MULTIPLES</div>
        <div className="valufin-mlab-numberline">
          <div className="valufin-mlab-numberline-track" />
          {PEER_MULTIPLES.map((m) => (
            <div key={m} className="valufin-mlab-numberline-dot" style={{ left: `${((m - RANGE_MIN) / (RANGE_MAX - RANGE_MIN)) * 100}%` }} title={`${m}x`} />
          ))}
        </div>
        <div className="valufin-mlab-presets">
          <button className={`valufin-mlab-preset${resolvedPreset === 'low' ? ' active' : ''}`} onClick={() => setPreset('low')}>LOW · 7.2x</button>
          <button className={`valufin-mlab-preset${resolvedPreset === 'median' ? ' active' : ''}`} onClick={() => setPreset('median')}>MEDIAN · 9.1x</button>
          <button className={`valufin-mlab-preset${resolvedPreset === 'high' ? ' active' : ''}`} onClick={() => setPreset('high')}>HIGH · 11.4x</button>
        </div>
        <div className="valufin-mlab-result" style={{ background: 'rgba(79,195,199,0.08)', borderColor: 'rgba(79,195,199,0.28)' }}>
          <div className="valufin-mlab-result-label">TARGET EBITDA ${TARGET_EBITDA_L3}M × {selectedMultiple}x</div>
          <div className="valufin-mlab-result-value" style={{ color: '#4FC3C7' }}>${impliedEV}M</div>
        </div>
      </div>
      <Collapsible id="l3Note" label="WHY THIS MATTERS" openInfo={openInfo} toggleInfo={toggleInfo}>
        <p className="valufin-lesson-footnote" style={{ marginBottom: 0 }}>
          Try all three presets. The implied value swings by hundreds of millions depending which multiple you lean
          on — which is exactly why a real valuation is presented as a range (like the football field slide from
          Pitch Books), never a single confident number.
        </p>
      </Collapsible>
    </>
  );
}

function Lesson4({ outlierIncluded, setOutlierIncluded, openInfo, toggleInfo }) {
  const withOutlier = outlierIncluded ? [...PEER_MULTIPLES, 18.6] : PEER_MULTIPLES;
  const rangeLow = Math.min(...withOutlier);
  const rangeHigh = Math.max(...withOutlier);
  const spread = rangeHigh - rangeLow;
  const spreadBarPct = Math.min(100, (spread / 12) * 100);
  const verdictColor = outlierIncluded ? '#D9694F' : '#3FBF6F';

  return (
    <>
      <div className="valufin-mlab-panel">
        <div className="valufin-mlab-outlier-toggle-row">
          <span className="valufin-mlab-eyebrow" style={{ marginBottom: 0 }}>INCLUDE THE OUTLIER (18.6x)?</span>
          <button className="valufin-mlab-toggle" onClick={() => setOutlierIncluded(!outlierIncluded)}>
            <span className={`valufin-mlab-toggle-track${outlierIncluded ? ' on' : ''}`}>
              <span className="valufin-mlab-toggle-knob" />
            </span>
            <span className="valufin-mlab-toggle-label" style={{ color: outlierIncluded ? '#D9694F' : '#9C978C' }}>
              {outlierIncluded ? 'INCLUDED' : 'EXCLUDED'}
            </span>
          </button>
        </div>
        <div className="valufin-mlab-outlier-stats">
          <span>Range: {rangeLow.toFixed(1)}x – {rangeHigh.toFixed(1)}x</span>
          <span>Spread: {spread.toFixed(1)}x</span>
        </div>
        <div className="valufin-mlab-spreadbar-track">
          <div className="valufin-mlab-spreadbar-fill" style={{ width: `${spreadBarPct}%` }} />
        </div>
        <div className="valufin-mlab-outlier-verdict" style={{ color: verdictColor }}>
          {outlierIncluded
            ? "The spread nearly doubled. One outlier is now dragging your 'high' end far past anything defensible — this is exactly the peer an interviewer expects you to flag and exclude."
            : 'Tight, defensible spread. This is what a clean peer set looks like before anyone stress-tests it with an outlier.'}
        </div>
      </div>
      <Collapsible id="l4Note" label="WHAT COUNTS AS AN OUTLIER?" openInfo={openInfo} toggleInfo={toggleInfo}>
        <p className="valufin-lesson-footnote" style={{ marginBottom: 0 }}>
          An "outlier" isn't just a big number — it's a peer whose multiple reflects something not true of your
          target: a takeover rumor, a one-off earnings beat, a much smaller and faster-growing business. Once you
          can name <em>why</em> it doesn't belong, excluding it stops being cherry-picking and becomes analysis.
        </p>
      </Collapsible>
    </>
  );
}

function Lesson5({ batchIndex, setBatchIndex, selected, setSelected, scored, setScored, openInfo, toggleInfo }) {
  const batch = CHALLENGE_BATCHES[batchIndex];

  function multipleOf(c) {
    return c.ev != null && c.ebitda != null && c.ebitda > 0 ? c.ev / c.ebitda : null;
  }

  function toggle(i) {
    if (scored) return;
    const next = [...selected];
    next[i] = !next[i];
    setSelected(next);
  }

  function generateNewBatch() {
    setBatchIndex((batchIndex + 1) % CHALLENGE_BATCHES.length);
    setSelected([false, false, false, false, false, false]);
    setScored(false);
  }

  const correctSel = batch.filter((c, i) => c.isComp && selected[i]).length;
  const wrongSel = batch.filter((c, i) => !c.isComp && selected[i]).length;
  const totalComps = batch.filter((c) => c.isComp).length;
  const missed = totalComps - correctSel;
  const accuracy = Math.max(0, Math.round(((correctSel - wrongSel) / totalComps) * 100));
  const grade = accuracy >= 90 ? 'ANALYST-READY' : accuracy >= 60 ? 'SOLID — MINOR GAPS' : 'NEEDS SHARPER SCREENING';
  const gradeColor = accuracy >= 90 ? '#3FBF6F' : accuracy >= 60 ? '#C4B79A' : '#D9694F';

  const selectedForValuation = batch
    .map((c, i) => ({ ...c, m: multipleOf(c), selected: selected[i] }))
    .filter((c) => c.selected && c.m != null);
  const multiplesArr = selectedForValuation.map((c) => c.m);
  const medianMultiple = multiplesArr.length ? median(multiplesArr) : null;
  const impliedTargetEV = medianMultiple != null ? Math.round(medianMultiple * CHALLENGE_TARGET_EBITDA) : null;

  return (
    <>
      <div className="valufin-mlab-capstone">
        <div className="valufin-mlab-capstone-header">
          <span className="valufin-mlab-capstone-dot" />
          <span>AI COMPANY GENERATOR — SCENARIO {batchIndex + 1} OF {CHALLENGE_BATCHES.length}</span>
        </div>
        <div className="valufin-mlab-capstone-target">
          TARGET: MERIDIAN OUTDOOR CO. — OUTDOOR APPAREL &amp; GEAR, $780M REVENUE
        </div>

        <div className="valufin-mlab-capstone-grid">
          {batch.map((c, i) => {
            const isSelected = selected[i];
            const m = multipleOf(c);
            const mono = MONO_COLORS[i % MONO_COLORS.length];
            const isFlipped = isSelected || (scored && c.isComp);
            let wrapCls = 'valufin-mlab-flipcard-wrap';
            let feedback = null;
            if (isFlipped) wrapCls += ' flipped';
            if (isSelected && !scored) wrapCls += ' selected';
            if (scored) {
              if (isSelected && c.isComp) { wrapCls += ' correct'; feedback = { text: '✓ GOOD COMP', color: '#3FBF6F' }; }
              else if (isSelected && !c.isComp) { wrapCls += ' wrong'; feedback = { text: '✗ NOT COMPARABLE', color: '#D9694F' }; }
              else if (!isSelected && c.isComp) { wrapCls += ' missed'; feedback = { text: '○ MISSED', color: '#C4B79A' }; }
            }
            return (
              <div key={c.name} className={wrapCls} onClick={() => toggle(i)}>
                <div className="valufin-mlab-flipcard">
                  <div className="valufin-mlab-flipcard-face front">
                    <div className="valufin-mlab-flip-watermark"><SectorIcon sector={c.sector} className="valufin-mlab-flip-watermark-icon" /></div>
                    <div className="valufin-mlab-flip-mono" style={{ background: mono }}>{initialsOf(c.name)}</div>
                    <div className="valufin-mlab-flip-name">{c.name}</div>
                    <div className="valufin-mlab-flip-hint">TAP TO INSPECT</div>
                  </div>
                  <div className="valufin-mlab-flipcard-face back">
                    <div className="valufin-mlab-capstone-card-name">{c.name}</div>
                    <div className="valufin-mlab-capstone-card-sector">{c.sector}</div>
                    <div className="valufin-mlab-capstone-card-revenue">{c.revenue} revenue</div>
                    <div className="valufin-mlab-capstone-card-stats">
                      <span>EV {c.ev != null ? `$${c.ev}M` : 'N/A'}</span>
                      <span>EBITDA {c.ebitda != null ? `$${c.ebitda}M` : 'N/A'}</span>
                      <span className="accent">{m != null ? `${m.toFixed(1)}x` : 'N/A'}</span>
                    </div>
                    {feedback && <div className="valufin-mlab-capstone-feedback" style={{ color: feedback.color }}>{feedback.text}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {scored && (
          <div className="valufin-mlab-scorecard">
            <div className="valufin-mlab-scorecard-header">
              <span className="valufin-mlab-scorecard-title">YOUR SCORE</span>
              <StarRating accuracy={accuracy} />
            </div>
            <div className="valufin-mlab-scorecard-progress-row">
              <span className="valufin-mlab-scorecard-check"><CheckIcon color="#4FC3C7" /></span>
              <div className="valufin-mlab-scorecard-track">
                <div className="valufin-mlab-scorecard-fill" style={{ width: `${accuracy}%`, borderColor: gradeColor }} />
              </div>
              <span className="valufin-mlab-scorecard-pct" style={{ color: gradeColor }}>{accuracy}%</span>
            </div>
            <div className="valufin-mlab-scorecard-grid">
              <div className="valufin-mlab-scorecard-box">
                <div className="valufin-mlab-scorecard-box-value" style={{ color: '#3FBF6F' }}>{correctSel}</div>
                <div className="valufin-mlab-scorecard-box-label">CORRECT COMPS</div>
              </div>
              <div className="valufin-mlab-scorecard-box">
                <div className="valufin-mlab-scorecard-box-value" style={{ color: '#D9694F' }}>{wrongSel}</div>
                <div className="valufin-mlab-scorecard-box-label">WRONGLY INCLUDED</div>
              </div>
              <div className="valufin-mlab-scorecard-box">
                <div className="valufin-mlab-scorecard-box-value" style={{ color: '#C4B79A' }}>{missed}</div>
                <div className="valufin-mlab-scorecard-box-label">MISSED</div>
              </div>
              <div className="valufin-mlab-scorecard-box highlight">
                <div className="valufin-mlab-scorecard-box-value" style={{ color: gradeColor }}>{accuracy}%</div>
                <div className="valufin-mlab-scorecard-box-label">{grade}</div>
              </div>
            </div>
          </div>
        )}

        {scored && selectedForValuation.length > 0 && (
          <>
            <div className="valufin-mlab-capstone-table">
              <div className="valufin-mlab-capstone-table-head">
                <span>Your selected comp</span><span>EV</span><span>EBITDA</span><span>Multiple</span>
              </div>
              {selectedForValuation.map((row) => (
                <div key={row.name} className="valufin-mlab-capstone-table-row">
                  <span style={{ color: row.isComp ? '#EDEBE4' : '#D9694F' }}>{row.name}</span>
                  <span>${row.ev}M</span>
                  <span>${row.ebitda}M</span>
                  <span className="accent">{row.m.toFixed(1)}x</span>
                </div>
              ))}
            </div>
            <div className="valufin-mlab-capstone-median-row">
              <div>
                <div className="valufin-mlab-capstone-median-label">MEDIAN MULTIPLE</div>
                <div className="valufin-mlab-capstone-median-value">{medianMultiple.toFixed(1)}x</div>
              </div>
              <div className="valufin-mlab-capstone-divider" />
              <div>
                <div className="valufin-mlab-capstone-median-label">× TARGET EBITDA ${CHALLENGE_TARGET_EBITDA}M =</div>
                <div className="valufin-mlab-capstone-median-value accent">${impliedTargetEV}M implied EV</div>
              </div>
            </div>
          </>
        )}

        <div className="valufin-mlab-capstone-actions">
          <button className="valufin-mlab-capstone-btn-primary" onClick={() => setScored(true)}>Analyze &amp; score →</button>
          <button className="valufin-mlab-capstone-btn-secondary" onClick={generateNewBatch}>↻ Generate new batch</button>
        </div>
      </div>
      <Collapsible id="l5Note" label="THE TRANSFERABLE SKILL" openInfo={openInfo} toggleInfo={toggleInfo}>
        <p className="valufin-lesson-footnote" style={{ marginBottom: 0 }}>
          Every scenario swaps in a fresh set of candidates around the same target — the screening logic is the
          transferable skill, not memorizing this specific company list.
        </p>
      </Collapsible>
    </>
  );
}

export default function CompsAnalysis() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false]);

  const [ev, setEv] = useState(950);
  const [ebitda, setEbitda] = useState(100);
  const [matchPicks, setMatchPicks] = useState([null, null, null]);
  const [rangePreset, setRangePreset] = useState(null);
  const [outlierIncluded, setOutlierIncluded] = useState(false);
  const [batchIndex, setBatchIndex] = useState(0);
  const [challengeSelected, setChallengeSelected] = useState([false, false, false, false, false, false]);
  const [challengeScored, setChallengeScored] = useState(false);
  const [openInfo, setOpenInfo] = useState({});

  function toggleInfo(id) {
    setOpenInfo((prev) => ({ ...prev, [id]: !prev[id] }));
  }

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

  function setMatchPick(i, label) {
    const next = [...matchPicks];
    next[i] = label;
    setMatchPicks(next);
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
          ← {view === 'list' ? 'Investment Banking' : 'The Multiples Lab'}
        </button>
        <span className="valufin-lesson-topbar-tag">CMP · MULTIPLES LAB</span>
      </div>

      {view === 'list' ? (
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '48px 60px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span className="valufin-tier-pill must-know">Must-know</span>
            <span className="valufin-ticker-caption">CMP · MULTIPLES LAB</span>
          </div>
          <h1 className="valufin-archivo-h1">The Multiples Lab</h1>
          <p className="valufin-caption" style={{ maxWidth: 620, marginTop: 22 }}>
            Forget memorizing "comps." A multiple is just a ratio you build with your own hands — drag it, break
            it, and watch what happens to a valuation in real time.
          </p>

          <div className="valufin-lesson-progress-row">
            <span>{LESSONS.length} lessons · {LESSONS.reduce((s, l) => s + l.minutes, 0)} min</span>
            <span>·</span>
            <span style={{ color: '#EDEBE4' }}>{completedCount} / {LESSONS.length} complete</span>
          </div>
          <div className="valufin-lesson-progress-track">
            <div className="valufin-lesson-progress-fill" style={{ width: `${progressPct}%` }} />
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
          <div className="valufin-lesson-detail-eyebrow">MULTIPLES LAB · LESSON {activeIndex + 1} OF {LESSONS.length}</div>
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', margin: '0 0 22px' }}>{activeLesson.title}</h1>
          <hr className="valufin-hr" style={{ marginBottom: 28 }} />
          <p className="valufin-lesson-detail-body" style={{ marginBottom: 30 }}>{activeLesson.body}</p>

          {activeIndex === 0 && <Lesson1 ev={ev} setEv={setEv} ebitda={ebitda} setEbitda={setEbitda} openInfo={openInfo} toggleInfo={toggleInfo} />}
          {activeIndex === 1 && <Lesson2 picks={matchPicks} setPick={setMatchPick} openInfo={openInfo} toggleInfo={toggleInfo} />}
          {activeIndex === 2 && <Lesson3 preset={rangePreset} setPreset={setRangePreset} openInfo={openInfo} toggleInfo={toggleInfo} />}
          {activeIndex === 3 && <Lesson4 outlierIncluded={outlierIncluded} setOutlierIncluded={setOutlierIncluded} openInfo={openInfo} toggleInfo={toggleInfo} />}
          {activeIndex === 4 && (
            <Lesson5
              batchIndex={batchIndex}
              setBatchIndex={setBatchIndex}
              selected={challengeSelected}
              setSelected={setChallengeSelected}
              scored={challengeScored}
              setScored={setChallengeScored}
              openInfo={openInfo}
              toggleInfo={toggleInfo}
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
