import CategoryPage from './CategoryPage';
import FlashcardDeck from '../components/FlashcardDeck';
import ConceptFlipCard from '../components/ConceptFlipCard';
import { getCategoryByPath } from '../data/categories';

const cat = getCategoryByPath('/wam');

const TOPICS = [
  { tag: 'must know', title: 'Portfolio construction', description: 'Asset allocation, diversification, and risk-return tradeoffs.', icon: 'chart-pie', lessons: 4, minutes: 30 },
  { tag: 'must know', title: 'Client communication', description: 'Explaining markets and performance to non-expert clients.', icon: 'message-circle', lessons: 3, minutes: 20 },
  { tag: 'high value', title: 'Investment philosophy', description: 'Active vs. passive, value vs. growth, and how to articulate your view.', icon: 'bulb', lessons: 4, minutes: 30 },
  { tag: 'high value', title: 'Risk management', description: 'Volatility, drawdowns, and how advisors manage downside risk.', icon: 'shield', lessons: 4, minutes: 30 },
  { tag: 'good to have', title: 'Financial planning basics', description: 'Retirement planning, tax considerations, and estate basics.', icon: 'calendar-time', lessons: 3, minutes: 25 },
  { tag: 'good to have', title: 'Alternative investments', description: 'Private equity, real estate, and hedge fund strategies as portfolio pieces.', icon: 'building-skyscraper', lessons: 3, minutes: 25 },
];

const CARDS = [
  {
    icon: 'chart-pie',
    term: 'Asset allocation',
    definition: 'How a portfolio is divided across different investment types — stocks, bonds, cash, real estate — since that mix drives most of a portfolio\'s risk and return.',
    example: 'A conservative retiree might hold 40% stocks and 60% bonds, while a young investor might hold 90% stocks.',
  },
  {
    icon: 'arrows-shuffle',
    term: 'Diversification',
    definition: "Spreading investments across many different assets so that no single one can badly hurt the whole portfolio if it performs poorly.",
    example: 'Instead of buying one stock, an advisor builds a portfolio of 50 stocks across different industries and countries.',
  },
  {
    icon: 'chart-candle',
    term: 'Active vs. passive',
    definition: 'Active management means picking specific investments to try to beat the market. Passive management means simply buying a broad index fund that matches the market.',
    example: 'A passive investor buys an S&P 500 index fund; an active manager instead hand-picks 30 stocks they believe will outperform it.',
  },
  {
    icon: 'chart-arrows-vertical',
    term: 'Volatility',
    definition: "How much an investment's price swings up and down over time. Higher volatility means bigger potential gains, but also bigger potential losses.",
    example: 'A tech startup stock is far more volatile day-to-day than a large, stable utility company stock.',
  },
  {
    icon: 'trending-down',
    term: 'Drawdown',
    definition: 'The drop in value from a portfolio\'s peak to its lowest point afterward — a key way advisors measure how painful a bad period actually was.',
    example: "If a portfolio falls from $100,000 to $80,000 before recovering, that's a 20% drawdown.",
  },
  {
    icon: 'scale',
    term: 'Risk tolerance',
    definition: "How much loss a client can handle emotionally and financially before panicking or needing the money — it shapes every recommendation an advisor makes.",
    example: 'A client nearing retirement has lower risk tolerance than a 25-year-old just starting to invest.',
  },
  {
    icon: 'receipt-tax',
    term: 'Tax-loss harvesting',
    definition: 'Deliberately selling an investment that has lost value to realize the loss for tax purposes, often while buying something similar to stay invested.',
    example: 'An advisor sells a losing stock in December to offset gains elsewhere, then buys a similar stock the next day.',
  },
  {
    icon: 'building-skyscraper',
    term: 'Alternative investments',
    definition: 'Investments outside of traditional stocks and bonds — private equity, real estate, hedge funds, commodities — often used to diversify a portfolio further.',
    example: "A wealthy client's portfolio includes a real estate fund and a small stake in a private equity fund alongside their stocks.",
  },
];

export default function WealthAssetManagement() {
  return (
    <CategoryPage
      title="Wealth & Asset Management"
      pillLabel="WAM"
      caption="Client-facing investing and portfolio management — a different skill set than pure deal-making. Tap any topic to start learning."
      topics={TOPICS}
      backLabel="←  Back to home"
      backPath="/"
      heroImage={cat.image}
      heroTint={cat.tint}
      heroAccent={cat.accent}
      topicsLayout="syllabus"
      syllabusHeadline="Six topics, ranked by what interviews test."
      beforeTopics={
        <>
          <div className="valufin-frame-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <ConceptFlipCard heading="What is wealth & asset management?" image={cat.image}>
              It's managing investment portfolios on behalf of clients — from individuals
              saving for retirement to large institutions. Unlike banking or PE, the goal isn't
              closing deals, it's growing and protecting client money over time.
            </ConceptFlipCard>

            <ConceptFlipCard heading="What do WAM professionals actually do?" image={cat.image}>
              You're building and adjusting portfolios, researching investments, and — often
              the biggest part of the job — explaining markets and performance to clients in
              plain language, especially when things go down.
            </ConceptFlipCard>

            <ConceptFlipCard heading="Why this matters for recruiting" image={cat.image}>
              WAM interviews test whether you can explain investing simply and build trust, not
              just whether you can build a model. You'll need a genuine point of view on
              markets and the people skills to communicate it calmly.
            </ConceptFlipCard>
          </div>

          <div style={{ height: 8 }} />
          <div className="valufin-frame-fade valufin-frame-fade-delay">
            <FlashcardDeck cards={CARDS} coverTitle="Essential vocab to know before we begin" />
          </div>

          <div style={{ height: 8 }} />
        </>
      }
    />
  );
}
