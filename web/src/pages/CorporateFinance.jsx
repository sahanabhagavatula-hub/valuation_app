import CategoryPage from './CategoryPage';
import { getCategoryByPath } from '../data/categories';

const cat = getCategoryByPath('/corp-finance');

const TOPICS = [
  { tag: 'must know', title: 'Financial statements', description: 'Read and interpret the income statement, balance sheet, and cash flow statement.' },
  { tag: 'must know', title: 'Key metrics', description: 'Revenue, EBITDA, margins, ROE, EPS — what they mean and why they matter.' },
  { tag: 'high value', title: 'DCF valuation', description: 'Discount future cash flows to find intrinsic value. Fully built — try it now.', path: '/tool' },
  { tag: 'high value', title: 'Excel modeling', description: 'Shortcuts, VLOOKUP, pivot tables, and basic financial models.' },
  { tag: 'high value', title: 'Accounting basics', description: 'Debits/credits, accruals, depreciation, working capital.' },
  { tag: 'good to have', title: 'Capital structure', description: 'Debt vs. equity, WACC, and cost of capital decisions.' },
];

export default function CorporateFinance() {
  return (
    <CategoryPage
      title="General Business / Corporate Finance"
      pillLabel="Corp Finance"
      caption="The foundational skills that show up everywhere in finance, regardless of which specific path you're recruiting for. Tap any topic to start learning."
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
