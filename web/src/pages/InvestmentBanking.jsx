import CategoryPage from './CategoryPage';

const TOPICS = [
  { tag: 'must know', title: 'DCF valuation', description: "Discount future cash flows to find a company's intrinsic value. Fully built — try it now.", path: '/tool' },
  { tag: 'must know', title: 'M&A process', description: 'How mergers and acquisitions actually get done, from pitch to close.', path: '/ma-process' },
  { tag: 'must know', title: 'Comps analysis', description: 'Compare EV/EBITDA and P/E multiples across peer companies.' },
  { tag: 'high value', title: 'Pitch books', description: "How bankers package analysis into client-ready presentations." },
  { tag: 'high value', title: '3-statement model', description: 'Income statement, balance sheet, and cash flow linked together.' },
  { tag: 'good to have', title: 'Precedent transactions', description: 'Valuing a company based on what similar companies sold for in past M&A deals.' },
];

export default function InvestmentBanking() {
  return (
    <CategoryPage
      icon="building-bank"
      title="Investment Banking"
      pillLabel="IB"
      caption="These are the skills IB interviews actually test — from technical modeling to understanding the deal process. Tap any topic to start learning."
      topics={TOPICS}
      backLabel="←  Back to home"
      backPath="/"
      comingSoonMentionsTool
    />
  );
}
