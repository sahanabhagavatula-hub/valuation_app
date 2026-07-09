import CategoryPage from './CategoryPage';
import FlashcardDeck from '../components/FlashcardDeck';
import ConceptFlipCard from '../components/ConceptFlipCard';
import { getCategoryByPath } from '../data/categories';

const cat = getCategoryByPath('/ib');

const TOPICS = [
  { tag: 'must know', title: 'DCF valuation', description: "Discount future cash flows to find a company's intrinsic value. Fully built — try it now.", path: '/tool', icon: 'trending-up', lessons: 5, minutes: 40 },
  { tag: 'must know', title: 'M&A process', description: 'How mergers and acquisitions actually get done, from pitch to close.', path: '/ma-process', icon: 'arrows-join', lessons: 4, minutes: 25 },
  { tag: 'must know', title: 'Comps analysis', description: 'Compare EV/EBITDA and P/E multiples across peer companies.', icon: 'chart-bar', lessons: 4, minutes: 30 },
  { tag: 'high value', title: 'Pitch books', description: "How bankers package analysis into client-ready presentations.", icon: 'presentation', lessons: 3, minutes: 20 },
  { tag: 'high value', title: '3-statement model', description: 'Income statement, balance sheet, and cash flow linked together.', icon: 'list', lessons: 6, minutes: 55 },
  { tag: 'good to have', title: 'Precedent transactions', description: 'Valuing a company based on what similar companies sold for in past M&A deals.', icon: 'clock', lessons: 3, minutes: 20 },
];

const CARDS = [
  {
    icon: 'chart-bar',
    term: 'EBITDA',
    definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization &mdash; a proxy for a company\'s core operating profit, before financing decisions and accounting treatments get involved.',
    example: 'Two companies with the same revenue can have very different net income because of debt or taxes, but comparing their EBITDA strips that noise out.',
  },
  {
    icon: 'chart-line',
    term: 'DCF',
    definition: 'Short for Discounted Cash Flow &mdash; a valuation method that forecasts a company\'s future free cash flow, estimates everything beyond that as a terminal value, and discounts it all back to today\'s dollars.',
    example: 'A banker builds a DCF to argue a target company is worth $50/share even though it currently trades at $42.',
  },
  {
    icon: 'scale',
    term: 'Valuation',
    definition: 'The process of estimating what a company is actually worth, based on its fundamentals, rather than just accepting whatever price the market happens to be charging today.',
    example: 'Before advising on a sale, a bank runs a full valuation combining a DCF, comps, and precedent transactions to triangulate a fair price range.',
  },
  {
    icon: 'building-bank',
    term: 'Bulge bracket',
    definition: 'The handful of largest, most prestigious global investment banks (Goldman Sachs, Morgan Stanley, JPMorgan, and similar) that advise on the biggest deals across every industry and region.',
    example: 'A bulge bracket bank might simultaneously advise the buyer on a $20B acquisition while a rival bulge bracket bank advises the seller.',
  },
  {
    icon: 'file-text',
    term: 'Pitch book',
    definition: 'A polished slide presentation bankers build to win a client\'s business or advise on a specific deal &mdash; typically covering market analysis, valuation, and strategic recommendations.',
    example: 'Before a company decides which bank to hire for its IPO, several banks will each pitch with their own book making the case for why they should get the mandate.',
  },
  {
    icon: 'signature',
    term: 'Mandate',
    definition: 'The formal engagement where a client officially hires a bank to advise on and execute a specific transaction, like a sale process or a capital raise.',
    example: 'After weeks of pitching, the company awarded the sell-side mandate to the bank with the strongest track record in its industry.',
  },
  {
    icon: 'arrows-join',
    term: 'M&A',
    definition: 'Short for Mergers & Acquisitions &mdash; the practice of advising companies on buying, selling, or combining with other companies. One of the two core pillars of investment banking, alongside capital raising.',
    example: 'A private equity firm hires an M&A banker to run a competitive sale process for one of its portfolio companies.',
  },
  {
    icon: 'writing',
    term: 'Underwriting',
    definition: "When a bank commits to buy newly issued stock or bonds directly from a company and then resell them to investors, taking on the risk that it can't sell them all at the expected price.",
    example: 'In an IPO, the underwriting banks guarantee the company a set amount of money, then bear the risk of actually placing the shares with investors.',
  },
  {
    icon: 'stack-3',
    term: 'LBO',
    definition: "Short for Leveraged Buyout &mdash; acquiring a company primarily using borrowed money (debt), with the target company's own future cash flows used to pay that debt down over time.",
    example: 'A PE firm buys a stable manufacturing company using 70% debt and 30% of its own cash, then uses the company\'s cash flow to pay off that debt over five years.',
  },
  {
    icon: 'arrows-exchange',
    term: 'Accretion / dilution',
    definition: "Whether a merger increases (accretive) or decreases (dilutive) the acquirer's earnings per share after the deal closes. One of the first things bankers check when structuring a merger.",
    example: 'If the acquirer pays mostly in cash for a target with a lower P/E than its own, the deal is usually accretive to EPS.',
  },
  {
    icon: 'certificate',
    term: 'Fairness opinion',
    definition: "An independent bank's formal, legally-documented opinion on whether the price being paid or received in a deal is financially fair to shareholders &mdash; often required to protect a company's board from liability.",
    example: "A company's board hires a separate bank, uninvolved in negotiating the deal, to issue a fairness opinion before the board votes to approve the merger.",
  },
];

export default function InvestmentBanking() {
  return (
    <CategoryPage
      title="Investment Banking"
      pillLabel="IB"
      caption="These are the skills IB interviews actually test — from technical modeling to understanding the deal process. Tap any topic to start learning."
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
          <div className="scroll-element" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <ConceptFlipCard icon="building-bank" heading="What is investment banking?">
              Investment banking is the division of a bank that advises companies — not
              individual consumers — on major financial transactions, primarily raising capital
              (issuing stock or debt) and mergers &amp; acquisitions. Bankers act purely as
              advisors and intermediaries: they don't invest their own money in the deal's
              outcome, they get paid a fee for their advice and for executing the transaction.
            </ConceptFlipCard>

            <ConceptFlipCard icon="briefcase" heading="What do investment bankers actually do?">
              Junior bankers (analysts and associates) spend most of their time building
              financial models — DCFs, merger models, LBO models — putting together pitch
              books, and running valuation analysis, all in service of a senior banker's client
              relationships. The job is less about picking winning investments and more about
              flawless execution: accurate numbers, polished slides, and meeting extremely
              tight deadlines.
            </ConceptFlipCard>

            <ConceptFlipCard icon="target" heading="Why this matters for recruiting">
              IB recruiting tests two things above all: technical skill — can you build a DCF,
              walk through a 3-statement model, or explain accretion/dilution — and the stamina
              and attention to detail the job itself demands. Interviewers will ask you to walk
              through valuation methodologies live, so understanding <em>why</em> each
              framework works, not just memorizing the steps, is what separates a strong
              candidate.
            </ConceptFlipCard>
          </div>

          <div style={{ height: 8 }} />
          <div className="scroll-element">
            <FlashcardDeck cards={CARDS} />
          </div>

          <div style={{ height: 8 }} />
        </>
      }
    />
  );
}
