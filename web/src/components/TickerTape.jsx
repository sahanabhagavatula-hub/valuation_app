const TICKER_SYMBOLS = [
  { sym: 'AAPL', chg: '+2.41%', up: true },
  { sym: 'TSLA', chg: '-1.12%', up: false },
  { sym: 'MSFT', chg: '+0.83%', up: true },
  { sym: 'GOOG', chg: '-0.44%', up: false },
  { sym: 'AMZN', chg: '+1.97%', up: true },
  { sym: 'NVDA', chg: '+3.05%', up: true },
  { sym: 'META', chg: '-0.62%', up: false },
  { sym: 'JPM', chg: '+0.29%', up: true },
];

export default function TickerTape({ className = '' }) {
  return (
    <div className={`valufin-ticker-tape ${className}`}>
      <div className="valufin-ticker-tape-track">
        {Array.from({ length: 2 }).map((_, i) => (
          <span className="valufin-ticker-tape-content" key={i}>
            {TICKER_SYMBOLS.map((t) => (
              <span key={t.sym} className={t.up ? 'up' : 'down'}>
                {t.sym} {t.chg} {t.up ? '▲' : '▼'}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
