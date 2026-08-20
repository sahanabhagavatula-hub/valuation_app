function rngFrom(seed) {
  let h = 2166136261;
  const s = String(seed);
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h >>> 0) % 1000) / 1000;
  };
}

function LineMark({ seed }) {
  const rand = rngFrom(seed);
  const n = 22;
  const pts = Array.from({ length: n }, (_, i) => {
    const x = (i / (n - 1)) * 400;
    const y = 10 + (1 - (0.35 + rand() * 0.5 + 0.18 * Math.sin(i * 0.55))) * 38;
    return { x, y };
  });
  const ticks = [3, 8, 14, 19].map((i) => ({
    ...pts[i],
    up: pts[i].y < (pts[i - 1]?.y ?? pts[i].y),
  }));
  return (
    <svg viewBox="0 0 400 56" preserveAspectRatio="none">
      <polyline
        points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="#EDEBE4"
        strokeWidth="1.5"
        opacity="0.9"
      />
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x}
          y1={t.y - 7}
          x2={t.x}
          y2={t.y + 7}
          stroke={t.up ? '#3FBF6F' : '#D9694F'}
          strokeWidth="3.5"
        />
      ))}
    </svg>
  );
}

function CandleMark({ seed }) {
  const rand = rngFrom(`${seed}-c`);
  const count = 16;
  const gap = 400 / count;
  const candles = Array.from({ length: count }, (_, i) => {
    const mid = 18 + rand() * 22;
    const body = 8 + rand() * 16;
    const wick = body + 6 + rand() * 8;
    return {
      x: gap * i + gap * 0.5,
      mid,
      body,
      wick,
      up: rand() > 0.42,
    };
  });
  return (
    <svg viewBox="0 0 400 56" preserveAspectRatio="none">
      {candles.map((c, i) => (
        <g key={i}>
          <line
            x1={c.x}
            y1={c.mid - c.wick / 2}
            x2={c.x}
            y2={c.mid + c.wick / 2}
            stroke={c.up ? '#3FBF6F' : '#D9694F'}
            strokeWidth="1.2"
          />
          <rect
            x={c.x - 5}
            y={c.mid - c.body / 2}
            width="10"
            height={c.body}
            fill={c.up ? '#3FBF6F' : '#D9694F'}
          />
        </g>
      ))}
    </svg>
  );
}

const ALLOC = [
  { label: 'EQ', w: 148, fill: '#EDEBE4' },
  { label: 'FI', w: 108, fill: '#C4B79A' },
  { label: 'ALT', w: 72, fill: '#3FBF6F' },
  { label: 'CASH', w: 44, fill: '#6F6A5F' },
];

function AllocMark() {
  let x = 0;
  return (
    <svg viewBox="0 0 400 56" preserveAspectRatio="xMidYMid meet">
      {ALLOC.map((a) => {
        const node = (
          <g key={a.label} transform={`translate(${x} 16)`}>
            <rect width={a.w} height="24" fill={a.fill} opacity="0.92" />
            <text x="8" y="16.5" fill="#111111" fontSize="10" fontFamily="'Roboto Mono', monospace" fontWeight="600">
              {a.label}
            </text>
          </g>
        );
        x += a.w + 6;
        return node;
      })}
    </svg>
  );
}

const WATERFALL = [
  { x: 12, y: 28, h: 24, fill: '#EDEBE4' },
  { x: 92, y: 18, h: 34, fill: '#EDEBE4' },
  { x: 172, y: 30, h: 22, fill: '#D9694F' },
  { x: 252, y: 14, h: 38, fill: '#EDEBE4' },
  { x: 332, y: 8, h: 44, fill: '#C4B79A' },
];

function WaterfallMark() {
  return (
    <svg viewBox="0 0 400 56" preserveAspectRatio="none">
      <line x1="0" y1="54" x2="400" y2="54" stroke="#EDEBE4" strokeOpacity="0.18" />
      {WATERFALL.map((s, i) => (
        <g key={i}>
          {i > 0 && (
            <line
              x1={WATERFALL[i - 1].x + 44}
              y1={WATERFALL[i - 1].y}
              x2={s.x}
              y2={s.y}
              stroke="#EDEBE4"
              strokeOpacity="0.28"
              strokeDasharray="3 3"
            />
          )}
          <rect x={s.x} y={s.y} width="44" height={s.h} fill={s.fill} />
        </g>
      ))}
    </svg>
  );
}

function BalanceMark() {
  const rows = [
    { l: 150, r: 88 },
    { l: 118, r: 72 },
    { l: 86, r: 130 },
  ];
  return (
    <svg viewBox="0 0 400 56" preserveAspectRatio="none">
      <line x1="200" y1="4" x2="200" y2="52" stroke="#EDEBE4" strokeOpacity="0.2" />
      {rows.map((r, i) => {
        const y = 8 + i * 16;
        return (
          <g key={i}>
            <rect x={200 - r.l} y={y} width={r.l} height="11" fill="#EDEBE4" opacity="0.88" />
            <rect x="206" y={y} width={r.r} height="11" fill="#C4B79A" opacity="0.88" />
          </g>
        );
      })}
    </svg>
  );
}

const TAPE = [
  { sym: 'AAPL', chg: '+1.4', up: true },
  { sym: 'MSFT', chg: '+0.8', up: true },
  { sym: 'NVDA', chg: '-2.1', up: false },
  { sym: 'JPM', chg: '+0.3', up: true },
];

function TapeMark() {
  return (
    <svg viewBox="0 0 400 56" preserveAspectRatio="xMidYMid meet">
      {TAPE.map((t, i) => {
        const x = 8 + i * 100;
        return (
          <g key={t.sym} transform={`translate(${x} 18)`}>
            <text fill="#EDEBE4" fontSize="12" fontFamily="'Roboto Mono', monospace" fontWeight="600">
              {t.sym}
            </text>
            <text
              x="48"
              fill={t.up ? '#3FBF6F' : '#D9694F'}
              fontSize="12"
              fontFamily="'Roboto Mono', monospace"
            >
              {t.chg}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const MARKS = {
  candles: CandleMark,
  line: LineMark,
  alloc: AllocMark,
  waterfall: WaterfallMark,
  balance: BalanceMark,
  tape: TapeMark,
};

export default function ScenePanelMark({ type, seed }) {
  const Mark = MARKS[type] || LineMark;
  return (
    <div className="valufin-panel-mark" aria-hidden="true">
      <Mark seed={seed} />
    </div>
  );
}
