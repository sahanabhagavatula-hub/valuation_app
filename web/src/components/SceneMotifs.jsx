const CANDLES = Array.from({ length: 36 }, (_, i) => {
  const x = 420 + i * 21;
  const base = 280 + Math.sin(i * 0.38) * 90 + Math.sin(i * 1.15) * 28;
  const bodyH = 18 + Math.abs(Math.sin(i * 1.4)) * 52;
  const wickH = bodyH + 16 + Math.abs(Math.cos(i * 0.7)) * 28;
  const up = Math.sin(i * 0.9) > -0.15;
  const vol = 18 + Math.abs(Math.sin(i * 0.55 + 0.4)) * 42;
  return { x, base, bodyH, wickH, up, vol };
});

const MA = CANDLES.map((c, i) => `${c.x},${c.base + Math.sin(i * 0.2) * 8}`).join(' ');

function CandlestickMotif() {
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      {[180, 260, 340, 420, 500].map((y) => (
        <line key={y} x1="400" y1={y} x2="1180" y2={y} stroke="#EDEBE4" strokeOpacity="0.06" />
      ))}
      {CANDLES.map((c, i) => (
        <g key={i}>
          <line
            x1={c.x} y1={c.base - c.wickH / 2} x2={c.x} y2={c.base + c.wickH / 2}
            stroke={c.up ? '#3FBF6F' : '#D9694F'} strokeWidth="1.4"
          />
          <rect
            x={c.x - 6} y={c.base - c.bodyH / 2} width="12" height={c.bodyH}
            fill={c.up ? '#3FBF6F' : '#D9694F'} opacity="0.9"
          />
          <rect
            x={c.x - 6} y={620 - c.vol} width="12" height={c.vol}
            fill={c.up ? '#3FBF6F' : '#D9694F'} opacity="0.28"
          />
        </g>
      ))}
      <polyline points={MA} fill="none" stroke="#C4B79A" strokeWidth="1.6" opacity="0.7" />
      <text x="1180" y="172" textAnchor="end" fontFamily="'Roboto Mono', monospace" fontSize="11" fill="#6f6a5f">142.80</text>
      <text x="1180" y="508" textAnchor="end" fontFamily="'Roboto Mono', monospace" fontSize="11" fill="#6f6a5f">118.40</text>
    </svg>
  );
}

const BOOK = [
  { y: 90, bid: 220, ask: 80, px: '41.86' },
  { y: 138, bid: 310, ask: 110, px: '41.84' },
  { y: 186, bid: 180, ask: 160, px: '41.82' },
  { y: 234, bid: 420, ask: 70, px: '41.80' },
  { y: 282, bid: 140, ask: 250, px: '41.78' },
  { y: 330, bid: 90, ask: 340, px: '41.76' },
  { y: 378, bid: 60, ask: 410, px: '41.74' },
  { y: 426, bid: 40, ask: 280, px: '41.72' },
  { y: 474, bid: 30, ask: 190, px: '41.70' },
];

function DepthChartMotif() {
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <text x="620" y="58" fontFamily="'Roboto Mono', monospace" fontSize="12" letterSpacing="3" fill="#6f6a5f">BID</text>
      <text x="1160" y="58" textAnchor="end" fontFamily="'Roboto Mono', monospace" fontSize="12" letterSpacing="3" fill="#6f6a5f">ASK</text>
      {BOOK.map((r) => (
        <g key={r.px}>
          <rect x={880 - r.bid} y={r.y} width={r.bid} height="36" fill="#3FBF6F" opacity="0.22" />
          <rect x="900" y={r.y} width={r.ask} height="36" fill="#D9694F" opacity="0.22" />
          <text x="888" y={r.y + 24} textAnchor="middle" fontFamily="'Roboto Mono', monospace" fontSize="12" fill="#EDEBE4" opacity="0.55">{r.px}</text>
        </g>
      ))}
      <line x1="888" y1="80" x2="888" y2="520" stroke="#EDEBE4" strokeOpacity="0.12" />
    </svg>
  );
}

const ALLOC = [
  { label: 'EQ', w: 280, color: '#3FBF6F' },
  { label: 'FI', w: 190, color: '#C4B79A' },
  { label: 'ALT', w: 120, color: '#7ec8e3' },
  { label: 'CASH', w: 70, color: '#8F887A' },
];

function PortfolioMotif() {
  const areaA = '520,420 560,360 620,380 700,250 780,280 860,160 940,190 1020,110 1100,140 1180,80 1180,480 520,480';
  const areaB = '520,460 580,430 660,440 740,370 820,390 900,320 980,340 1080,280 1180,300 1180,480 520,480';
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <polygon points={areaA} fill="#3FBF6F" opacity="0.14" />
      <polygon points={areaB} fill="#C4B79A" opacity="0.14" />
      <polyline points="520,420 560,360 620,380 700,250 780,280 860,160 940,190 1020,110 1100,140 1180,80" fill="none" stroke="#3FBF6F" strokeWidth="2" />
      <polyline points="520,460 580,430 660,440 740,370 820,390 900,320 980,340 1080,280 1180,300" fill="none" stroke="#C4B79A" strokeWidth="2" />
      <g transform="translate(560 540)">
        {ALLOC.map((a, i) => {
          const x = ALLOC.slice(0, i).reduce((s, v) => s + v.w + 8, 0);
          return (
            <g key={a.label} transform={`translate(${x} 0)`}>
              <rect width={a.w} height="28" rx="2" fill={a.color} opacity="0.55" />
              <text x={10} y="19" fontFamily="'Roboto Mono', monospace" fontSize="11" fill="#111111">{a.label}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function WaterfallMotif() {
  const steps = [
    { x: 560, y: 420, h: 160, color: '#3FBF6F', label: 'REV' },
    { x: 660, y: 380, h: 200, color: '#3FBF6F', label: 'VOL' },
    { x: 760, y: 430, h: 150, color: '#D9694F', label: 'COST' },
    { x: 860, y: 390, h: 190, color: '#3FBF6F', label: 'PRICE' },
    { x: 960, y: 340, h: 240, color: '#3FBF6F', label: 'MIX' },
    { x: 1080, y: 280, h: 300, color: '#C4B79A', label: 'EBIT' },
  ];
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <line x1="520" y1="580" x2="1180" y2="580" stroke="#EDEBE4" strokeOpacity="0.14" />
      {steps.map((s, i) => (
        <g key={s.label}>
          {i > 0 && (
            <line x1={steps[i - 1].x + 48} y1={steps[i - 1].y} x2={s.x} y2={s.y} stroke="#EDEBE4" strokeOpacity="0.2" strokeDasharray="4 4" />
          )}
          <rect x={s.x} y={s.y} width="48" height={s.h} fill={s.color} opacity="0.55" />
          <text x={s.x + 24} y="608" textAnchor="middle" fontFamily="'Roboto Mono', monospace" fontSize="11" fill="#6f6a5f">{s.label}</text>
        </g>
      ))}
    </svg>
  );
}

function StatementsMotif() {
  const rows = [
    { y: 120, l: 420, r: 280, lLabel: 'Cash', rLabel: 'AP' },
    { y: 188, l: 360, r: 210, lLabel: 'AR', rLabel: 'Debt' },
    { y: 256, l: 300, r: 190, lLabel: 'Inv', rLabel: 'LT debt' },
    { y: 324, l: 240, r: 340, lLabel: 'PP&E', rLabel: 'Equity' },
    { y: 392, l: 180, r: 160, lLabel: 'Other', rLabel: 'RE' },
  ];
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <text x="700" y="84" textAnchor="end" fontFamily="'Roboto Mono', monospace" fontSize="12" letterSpacing="3" fill="#6f6a5f">ASSETS</text>
      <text x="740" y="84" fontFamily="'Roboto Mono', monospace" fontSize="12" letterSpacing="3" fill="#6f6a5f">LIAB + EQ</text>
      <line x1="720" y1="100" x2="720" y2="470" stroke="#EDEBE4" strokeOpacity="0.16" />
      {rows.map((r) => (
        <g key={r.lLabel}>
          <rect x={720 - r.l} y={r.y} width={r.l} height="48" fill="#3FBF6F" opacity="0.28" />
          <rect x="740" y={r.y} width={r.r} height="48" fill="#C4B79A" opacity="0.28" />
          <text x={708} y={r.y + 30} textAnchor="end" fontFamily="'Roboto Mono', monospace" fontSize="12" fill="#EDEBE4" opacity="0.5">{r.lLabel}</text>
          <text x="752" y={r.y + 30} fontFamily="'Roboto Mono', monospace" fontSize="12" fill="#EDEBE4" opacity="0.5">{r.rLabel}</text>
        </g>
      ))}
    </svg>
  );
}

const TICKERS = [
  { sym: 'AAPL', px: '191.24', chg: '+1.42', up: true },
  { sym: 'MSFT', px: '428.10', chg: '+0.86', up: true },
  { sym: 'NVDA', px: '876.55', chg: '-2.14', up: false },
  { sym: 'JPM', px: '198.40', chg: '+0.31', up: true },
  { sym: 'XOM', px: '118.72', chg: '-0.64', up: false },
  { sym: 'GS', px: '452.18', chg: '+1.05', up: true },
  { sym: 'SPX', px: '5,241', chg: '+0.22', up: true },
  { sym: 'DXY', px: '104.32', chg: '-0.18', up: false },
];

function WatchlistMotif() {
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      {TICKERS.map((t, i) => {
        const y = 88 + i * 68;
        return (
          <g key={t.sym}>
            <line x1="560" y1={y + 52} x2="1160" y2={y + 52} stroke="#EDEBE4" strokeOpacity="0.08" />
            <text x="580" y={y + 32} fontFamily="'Roboto Mono', monospace" fontSize="20" fill="#EDEBE4" opacity="0.7">{t.sym}</text>
            <text x="860" y={y + 32} fontFamily="'Roboto Mono', monospace" fontSize="20" fill="#EDEBE4" opacity="0.45">{t.px}</text>
            <text x="1100" y={y + 32} textAnchor="end" fontFamily="'Roboto Mono', monospace" fontSize="18" fill={t.up ? '#3FBF6F' : '#D9694F'}>{t.chg}</text>
          </g>
        );
      })}
    </svg>
  );
}

const MOTIFS = {
  candlesticks: CandlestickMotif,
  'depth-chart': DepthChartMotif,
  constellation: PortfolioMotif,
  'hypothesis-tree': WaterfallMotif,
  'balance-grid': StatementsMotif,
  'signal-grid': WatchlistMotif,
};

export default function SceneMotif({ type }) {
  const Motif = MOTIFS[type] || WatchlistMotif;
  return <Motif />;
}
