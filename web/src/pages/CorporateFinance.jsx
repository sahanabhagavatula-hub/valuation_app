import CategoryPage from './CategoryPage';
import FlashcardDeck from '../components/FlashcardDeck';
import ConceptFlipCard from '../components/ConceptFlipCard';
import { getCategoryByPath } from '../data/categories';

const cat = getCategoryByPath('/corp-finance');

const TOPICS = [
  { tag: 'must know', title: 'Financial statements', description: 'Read and interpret the income statement, balance sheet, and cash flow statement.', icon: 'file-text', lessons: 5, minutes: 40 },
  { tag: 'must know', title: 'Key metrics', description: 'Revenue, EBITDA, margins, ROE, EPS — what they mean and why they matter.', icon: 'chart-bar', lessons: 4, minutes: 30 },
  { tag: 'high value', title: 'DCF valuation', description: 'Discount future cash flows to find intrinsic value. Fully built — try it now.', path: '/tool', icon: 'trending-up', lessons: 5, minutes: 40 },
  { tag: 'high value', title: 'Excel modeling', description: 'Shortcuts, VLOOKUP, pivot tables, and basic financial models.', icon: 'table', lessons: 5, minutes: 35 },
  { tag: 'high value', title: 'Accounting basics', description: 'Debits/credits, accruals, depreciation, working capital.', icon: 'calculator', lessons: 5, minutes: 35 },
  { tag: 'good to have', title: 'Capital structure', description: 'Debt vs. equity, WACC, and cost of capital decisions.', icon: 'scale', lessons: 3, minutes: 25 },
];

const CARDS = [
  {
    icon: 'file-text',
    term: 'Income statement',
    definition: "A financial statement showing a company's revenue and expenses over a period of time, ending in net income — the classic 'did we make money' report.",
    example: "A company's income statement shows $500M in revenue and $450M in expenses, for $50M in net income that quarter.",
  },
  {
    icon: 'building-bank',
    term: 'Balance sheet',
    definition: "A snapshot of everything a company owns (assets) and owes (liabilities) at a single point in time, plus what's left over for shareholders (equity).",
    example: "A balance sheet lists cash, equipment, and inventory as assets, and loans as liabilities.",
  },
  {
    icon: 'cash',
    term: 'Cash flow statement',
    definition: 'Tracks the actual cash moving in and out of a business — separate from the income statement, since profit on paper isn\'t always cash in the bank.',
    example: 'A company can report a profit but still run low on cash if customers are slow to pay their bills.',
  },
  {
    icon: 'chart-bar',
    term: 'EBITDA',
    definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization — a proxy for a company\'s core operating profit, stripped of financing and accounting noise.',
    example: "Two companies with identical operations can report very different net income because of debt, but similar EBITDA.",
  },
  {
    icon: 'percentage',
    term: 'Margin',
    definition: 'A profitability metric expressed as a percentage of revenue — how much of every sales dollar a company actually keeps at a given stage.',
    example: 'A company with $100 in revenue and $20 in net income has a 20% net margin.',
  },
  {
    icon: 'receipt',
    term: 'Depreciation',
    definition: "Spreading the cost of a big purchase (like equipment) over its useful life instead of expensing it all at once, since it keeps generating value for years.",
    example: 'A $1M machine expected to last 10 years might be depreciated at $100K per year on the income statement.',
  },
  {
    icon: 'coin',
    term: 'Working capital',
    definition: "The short-term cash tied up in day-to-day operations — money owed to you (receivables) plus inventory, minus money you owe others (payables).",
    example: "A retailer with lots of unsold inventory has more cash tied up in working capital than a services company.",
  },
  {
    icon: 'scale',
    term: 'WACC',
    definition: "Weighted Average Cost of Capital — the blended return a company's lenders and shareholders require, used as the discount rate in a DCF.",
    example: 'A stable, low-risk company might have a WACC around 7-8%, while a risky startup might use 15%+.',
  },
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
      topicsLayout="syllabus"
      syllabusHeadline="Six topics, ranked by what interviews test."
      beforeTopics={
        <>
          <div className="valufin-frame-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <ConceptFlipCard heading="What is corporate finance?" image={cat.image}>
              It's the financial function inside every company — deciding how to raise money,
              spend it wisely, and report the results. Unlike banking (advising other
              companies), corporate finance teams work for one company, managing its own money.
            </ConceptFlipCard>

            <ConceptFlipCard heading="What do corporate finance teams actually do?" image={cat.image}>
              You're reading and building financial statements, tracking key metrics, deciding
              whether a new project is worth funding, and figuring out the right mix of debt
              and equity to finance the business.
            </ConceptFlipCard>

            <ConceptFlipCard heading="Why this matters for recruiting" image={cat.image}>
              These fundamentals show up in every finance interview, not just corporate finance
              roles — knowing how the three statements connect and what drives key metrics is
              the baseline everyone is expected to have cold.
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
