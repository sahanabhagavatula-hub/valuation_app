const CANDLES = Array.from({ length: 30 }, (_, i) => {
  const x = 20 + i * 40;
  const base = 350 + Math.sin(i * 0.7) * 120 + Math.sin(i * 1.9) * 40;
  const bodyH = 40 + Math.abs(Math.sin(i * 1.3)) * 70;
  const wickH = bodyH + 30 + Math.abs(Math.cos(i * 0.5)) * 40;
  const up = Math.sin(i * 1.1) > -0.2;
  return { x, base, bodyH, wickH, up };
});

function CandlestickMotif() {
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="candleGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0H0V60" fill="none" stroke="#EDEBE4" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="1200" height="700" fill="url(#candleGrid)" />
      {CANDLES.map((c, i) => (
        <g key={i} stroke={c.up ? '#3FBF6F' : '#D9694F'} strokeWidth="2.5">
          <line x1={c.x} y1={c.base - c.wickH / 2} x2={c.x} y2={c.base + c.wickH / 2} />
          <rect x={c.x - 7} y={c.base - c.bodyH / 2} width="14" height={c.bodyH} fill={c.up ? '#3FBF6F' : '#D9694F'} />
        </g>
      ))}
    </svg>
  );
}

const BID_POINTS = '0,700 60,500 130,560 220,420 320,470 420,320 520,370 600,220';
const ASK_POINTS = '1200,700 1140,500 1070,560 980,420 880,470 780,320 680,370 600,220';

function DepthChartMotif() {
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <polygon points={`${BID_POINTS} 0,700`} fill="#3FBF6F" opacity="0.16" />
      <polygon points={`${ASK_POINTS} 1200,700`} fill="#D9694F" opacity="0.16" />
      <polyline points={BID_POINTS} fill="none" stroke="#3FBF6F" strokeWidth="3" />
      <polyline points={ASK_POINTS} fill="none" stroke="#D9694F" strokeWidth="3" />
      <line x1="600" y1="40" x2="600" y2="700" stroke="#EDEBE4" strokeOpacity="0.15" strokeDasharray="6,6" />
      <text x="40" y="70" fontFamily="'Roboto Mono', monospace" fontSize="20" letterSpacing="4" fill="#6f6a5f">BID</text>
      <text x="1160" y="70" textAnchor="end" fontFamily="'Roboto Mono', monospace" fontSize="20" letterSpacing="4" fill="#6f6a5f">ASK</text>
    </svg>
  );
}

function HypothesisTreeMotif() {
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <g stroke="#3FBF6F" strokeWidth="1.6" opacity="0.5" fill="none">
        <line x1="600" y1="80" x2="330" y2="230" />
        <line x1="600" y1="80" x2="870" y2="230" />
        <line x1="330" y1="230" x2="180" y2="380" />
        <line x1="330" y1="230" x2="460" y2="380" />
        <line x1="870" y1="230" x2="740" y2="380" />
        <line x1="870" y1="230" x2="1020" y2="380" />
        <line x1="180" y1="380" x2="100" y2="520" />
        <line x1="180" y1="380" x2="260" y2="520" />
        <line x1="460" y1="380" x2="400" y2="520" />
        <line x1="460" y1="380" x2="540" y2="520" />
        <line x1="740" y1="380" x2="680" y2="520" />
        <line x1="740" y1="380" x2="820" y2="520" />
        <line x1="1020" y1="380" x2="960" y2="520" />
        <line x1="1020" y1="380" x2="1100" y2="520" />
      </g>
      <g fill="#3FBF6F">
        <circle cx="600" cy="80" r="8" />
        <circle cx="330" cy="230" r="6.5" />
        <circle cx="870" cy="230" r="6.5" />
        <circle cx="180" cy="380" r="5.5" />
        <circle cx="460" cy="380" r="5.5" />
        <circle cx="740" cy="380" r="5.5" />
        <circle cx="1020" cy="380" r="5.5" />
        <circle cx="100" cy="520" r="4.5" />
        <circle cx="260" cy="520" r="4.5" />
        <circle cx="400" cy="520" r="4.5" />
        <circle cx="540" cy="520" r="4.5" />
        <circle cx="680" cy="520" r="4.5" />
        <circle cx="820" cy="520" r="4.5" />
        <circle cx="960" cy="520" r="4.5" />
        <circle cx="1100" cy="520" r="4.5" />
      </g>
    </svg>
  );
}

const NODES = [
  [120, 180], [320, 340], [560, 220], [780, 380], [980, 240],
  [1080, 460], [300, 540], [620, 560], [860, 150], [160, 420],
];
const EDGES = [[0, 1], [1, 2], [1, 6], [2, 3], [3, 4], [3, 7], [4, 5], [4, 8], [6, 7], [7, 5], [0, 9], [9, 6]];

function ConstellationMotif() {
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <g stroke="#C4B79A" strokeWidth="1.2" opacity="0.4">
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
        ))}
      </g>
      <g fill="#C4B79A">
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5 + (i % 3) * 2} />
        ))}
      </g>
    </svg>
  );
}

const LEFT_BARS = [
  { y: 100, w: 420 }, { y: 170, w: 320 }, { y: 240, w: 380 }, { y: 310, w: 260 }, { y: 380, w: 340 },
];
const RIGHT_BARS = [
  { y: 100, w: 360 }, { y: 170, w: 440 }, { y: 240, w: 280 }, { y: 310, w: 400 }, { y: 380, w: 300 },
];

function BalanceGridMotif() {
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <line x1="600" y1="40" x2="600" y2="460" stroke="#EDEBE4" strokeOpacity="0.12" />
      <g stroke="#3FBF6F" strokeOpacity="0.55" strokeWidth="2" fill="none">
        {LEFT_BARS.map((b, i) => (
          <rect key={i} x={580 - b.w} y={b.y} width={b.w} height="46" />
        ))}
      </g>
      <g stroke="#C4B79A" strokeOpacity="0.55" strokeWidth="2" fill="none">
        {RIGHT_BARS.map((b, i) => (
          <rect key={i} x="620" y={b.y} width={b.w} height="46" />
        ))}
      </g>
      <text x="580" y="500" textAnchor="end" fontFamily="'Roboto Mono', monospace" fontSize="18" letterSpacing="3" fill="#6f6a5f">ASSETS</text>
      <text x="620" y="500" fontFamily="'Roboto Mono', monospace" fontSize="18" letterSpacing="3" fill="#6f6a5f">LIAB + EQUITY</text>
    </svg>
  );
}

function SignalGridMotif() {
  return (
    <svg className="valufin-motif-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="signalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0H0V60" fill="none" stroke="#EDEBE4" strokeOpacity="0.05" />
        </pattern>
        <radialGradient id="signalGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#3FBF6F" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3FBF6F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#signalGrid)" />
      <rect width="1200" height="700" fill="url(#signalGlow)" />
      <g fill="#3FBF6F" opacity="0.6">
        <circle cx="260" cy="220" r="4" /><circle cx="520" cy="140" r="3" /><circle cx="760" cy="260" r="4" />
        <circle cx="940" cy="180" r="3" /><circle cx="380" cy="400" r="3" /><circle cx="860" cy="440" r="4" />
      </g>
    </svg>
  );
}

const MOTIFS = {
  candlesticks: CandlestickMotif,
  'depth-chart': DepthChartMotif,
  'hypothesis-tree': HypothesisTreeMotif,
  constellation: ConstellationMotif,
  'balance-grid': BalanceGridMotif,
  'signal-grid': SignalGridMotif,
};

export default function SceneMotif({ type }) {
  const Motif = MOTIFS[type] || SignalGridMotif;
  return <Motif />;
}
