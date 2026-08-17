const TICKER_SYMBOLS = [
  { sym: 'AAPL', chg: '+2.41%', up: true },
  { sym: 'TSLA', chg: '-1.12%', up: false },
  { sym: 'MSFT', chg: '+0.83%', up: true },
  { sym: 'GOOG', chg: '-0.44%', up: false },
  { sym: 'AMZN', chg: '+1.97%', up: true },
  { sym: 'NVDA', chg: '+3.05%', up: true },
  { sym: 'META', chg: '-0.62%', up: false },
  { sym: 'JPM', chg: '+0.29%', up: true },
  { sym: 'GS', chg: '+1.14%', up: true },
  { sym: 'MS', chg: '-0.38%', up: false },
  { sym: 'BAC', chg: '+0.71%', up: true },
  { sym: 'V', chg: '+0.55%', up: true },
];

function TickerSet({ copyKey }) {
  return (
    <span className="valufin-ticker-tape-content" aria-hidden={copyKey > 0}>
      {TICKER_SYMBOLS.map((t) => (
        <span key={`${copyKey}-${t.sym}`} className={t.up ? 'up' : 'down'}>
          {t.sym} {t.chg} {t.up ? '▲' : '▼'}
        </span>
      ))}
    </span>
  );
}

export default function TickerTape({ className = '' }) {
  return (
    <div className={`valufin-ticker-tape ${className}`}>
      <div className="valufin-ticker-tape-track">
        {/* Two identical halves so translateX(-50%) loops with no gap */}
        <span className="valufin-ticker-tape-half">
          <TickerSet copyKey={0} />
          <TickerSet copyKey={1} />
          <TickerSet copyKey={2} />
        </span>
        <span className="valufin-ticker-tape-half" aria-hidden="true">
          <TickerSet copyKey={3} />
          <TickerSet copyKey={4} />
          <TickerSet copyKey={5} />
        </span>
      </div>
    </div>
  );
}
