import CategoryPage from './CategoryPage';

const TOPICS = [
  { tag: 'must know', title: 'Portfolio construction', description: 'Asset allocation, diversification, and risk-return tradeoffs.' },
  { tag: 'must know', title: 'Client communication', description: 'Explaining markets and performance to non-expert clients.' },
  { tag: 'high value', title: 'Investment philosophy', description: 'Active vs. passive, value vs. growth, and how to articulate your view.' },
  { tag: 'high value', title: 'Risk management', description: 'Volatility, drawdowns, and how advisors manage downside risk.' },
  { tag: 'good to have', title: 'Financial planning basics', description: 'Retirement planning, tax considerations, and estate basics.' },
  { tag: 'good to have', title: 'Alternative investments', description: 'Private equity, real estate, and hedge fund strategies as portfolio pieces.' },
];

export default function WealthAssetManagement() {
  return (
    <CategoryPage
      icon="briefcase"
      title="Wealth & Asset Management"
      pillLabel="WAM"
      caption="Client-facing investing and portfolio management — a different skill set than pure deal-making. Tap any topic to start learning."
      topics={TOPICS}
      backLabel="←  Back to home"
      backPath="/"
    />
  );
}
