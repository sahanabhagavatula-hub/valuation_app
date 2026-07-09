import CategoryPage from './CategoryPage';
import { getCategoryByPath } from '../data/categories';

const cat = getCategoryByPath('/pe-hf');

const TOPICS = [
  { tag: 'must know', title: 'Stock pitch', description: 'A buy/sell recommendation with thesis, valuation, catalysts, and risks.', path: '/stock-pitch' },
  { tag: 'must know', title: 'LBO modeling', description: 'Leveraged buyout mechanics — how PE firms buy companies using debt.' },
  { tag: 'must know', title: 'DCF valuation', description: 'Discount future cash flows to find intrinsic value. Fully built — try it now.', path: '/tool' },
  { tag: 'high value', title: 'Comps analysis', description: 'Compare EV/EBITDA and P/E multiples across peer companies.' },
  { tag: 'high value', title: '3-statement model', description: 'Income statement, balance sheet, and cash flow linked together.' },
  { tag: 'good to have', title: 'Market sizing', description: 'Estimate TAM bottom-up or top-down for a given market.' },
];

export default function PeHf() {
  return (
    <CategoryPage
      title="Private Equity / Hedge Fund"
      pillLabel="PE / HF"
      caption="Buy-side recruiting tests how you think about investments, not just how you model them. Tap any topic to start learning."
      topics={TOPICS}
      backLabel="←  Back to home"
      backPath="/"
      comingSoonMentionsTool
      heroImage={cat.image}
      heroTint={cat.tint}
      heroAccent={cat.accent}
    />
  );
}
