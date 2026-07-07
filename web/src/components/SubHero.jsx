import tickerBoard from '../assets/ticker_board.png';
import tradingScreen from '../assets/trading_screen.png';

export default function SubHero({ title, subtitle, background = 'ticker' }) {
  const isTrading = background === 'trading';
  const bgClass = isTrading ? 'valufin-subhero-bg-trading' : 'valufin-subhero-bg';
  const bgImage = isTrading ? tradingScreen : tickerBoard;

  return (
    <div className="valufin-subhero">
      <div
        className={bgClass}
        style={isTrading ? { '--trading-bg-image': `url(${bgImage})` } : { '--ticker-bg-image': `url(${bgImage})` }}
      />
      <div className="valufin-subhero-fade" />
      <div className="valufin-subhero-content">
        <h1>{title}</h1>
        <p className="valufin-subhero-sub">{subtitle}</p>
      </div>
    </div>
  );
}
