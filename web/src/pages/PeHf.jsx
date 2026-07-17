import CategoryPage from './CategoryPage';
import FlashcardDeck from '../components/FlashcardDeck';
import ConceptFlipCard from '../components/ConceptFlipCard';
import { getCategoryByPath } from '../data/categories';

const cat = getCategoryByPath('/pe-hf');

const TOPICS = [
  { tag: 'must know', title: 'Stock pitch', description: 'A buy/sell recommendation with thesis, valuation, catalysts, and risks.', path: '/stock-pitch', icon: 'presentation', lessons: 5, minutes: 45 },
  { tag: 'must know', title: 'LBO modeling', description: 'Leveraged buyout mechanics — how PE firms buy companies using debt.', icon: 'stack-3', lessons: 5, minutes: 40 },
  { tag: 'must know', title: 'DCF valuation', description: 'Discount future cash flows to find intrinsic value. Fully built — try it now.', path: '/tool', icon: 'trending-up', lessons: 5, minutes: 40 },
  { tag: 'high value', title: 'Comps analysis', description: 'Compare EV/EBITDA and P/E multiples across peer companies.', icon: 'chart-bar', lessons: 4, minutes: 30 },
  { tag: 'high value', title: '3-statement model', description: 'Income statement, balance sheet, and cash flow linked together.', icon: 'list', lessons: 6, minutes: 55 },
  { tag: 'good to have', title: 'Market sizing', description: 'Estimate TAM bottom-up or top-down for a given market.', icon: 'ruler-2', lessons: 3, minutes: 20 },
];

const CARDS = [
  {
    icon: 'stack-3',
    term: 'LBO',
    definition: 'Short for Leveraged Buyout — buying a company mostly with borrowed money, then using that company\'s own cash flow to pay the debt down over time.',
    example: 'A PE firm buys a car wash chain using 70% debt, then uses the chain\'s profits over five years to pay that debt off before selling it.',
  },
  {
    icon: 'building',
    term: 'Portfolio company',
    definition: 'A company that a PE firm currently owns (or partly owns) as an investment. PE firms typically hold a handful of these at once, each managed by a different deal team.',
    example: "A PE firm's fund might own a portfolio company in healthcare, one in software, and one in industrials at the same time.",
  },
  {
    icon: 'bulb',
    term: 'Thesis',
    definition: "The core argument for why an investment will make money — what's mispriced today, and what will change to unlock that value.",
    example: 'Your thesis might be: "This retailer is undervalued because the market is ignoring its fast-growing online business."',
  },
  {
    icon: 'arrows-vertical',
    term: 'Long / short',
    definition: 'Going "long" means buying a stock because you think it will rise. Going "short" means betting a stock will fall, letting hedge funds make money even in a down market.',
    example: 'A hedge fund might go long on an airline it likes while shorting a competitor it thinks will lose market share to it.',
  },
  {
    icon: 'door-exit',
    term: 'Exit',
    definition: 'How a PE firm eventually cashes out of an investment — usually by selling the company to another buyer or taking it public via an IPO.',
    example: 'After improving the business for five years, the PE firm exits by selling the portfolio company to a larger competitor.',
  },
  {
    icon: 'chart-pie',
    term: 'AUM',
    definition: "Assets Under Management — the total value of all the money a fund manages on behalf of its investors. It's the standard way funds are sized and compared.",
    example: 'A hedge fund with $2B in AUM is managing $2 billion of investor money across its various positions.',
  },
  {
    icon: 'percentage',
    term: 'Carry',
    definition: 'Short for "carried interest" — the share of investment profits (typically ~20%) that fund managers keep as compensation, on top of a management fee.',
    example: "If a PE fund's deal returns $100M in profit, the firm might keep $20M of that as carry, with the rest going to investors.",
  },
  {
    icon: 'search',
    term: 'Due diligence',
    definition: "The deep research process before finalizing an investment — checking the target's financials, contracts, customers, and risks to confirm the thesis actually holds up.",
    example: "During due diligence, the deal team discovers the target's biggest customer is about to leave, changing the whole deal's math.",
  },
  {
    icon: 'flag',
    term: 'Catalyst',
    definition: "A specific, expected event that should cause the market to finally recognize a stock's true value — the reason the pitch works now, not just eventually.",
    example: 'An upcoming earnings report or new product launch that you expect will make the market re-rate the stock.',
  },
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
      topicsLayout="syllabus"
      syllabusHeadline="Six topics, ranked by what interviews test."
      beforeTopics={
        <>
          <div className="valufin-frame-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <ConceptFlipCard heading="What is private equity / hedge funds?" image={cat.image}>
              PE firms buy whole companies — often using borrowed money — to fix them up and
              sell them later for a profit. Hedge funds instead buy and sell pieces of public
              companies (stocks), often betting both that some will rise and others will fall.
            </ConceptFlipCard>

            <ConceptFlipCard heading="What do PE/HF analysts actually do?" image={cat.image}>
              You're building models to test whether a potential investment is actually a good
              bet, writing "pitches" that argue for or against buying something, and tracking
              how existing investments are performing. It's research-heavy and opinion-driven.
            </ConceptFlipCard>

            <ConceptFlipCard heading="Why this matters for recruiting" image={cat.image}>
              Buy-side interviews test your own judgment more than banking does — you need a
              real opinion on a stock, not just clean modeling. Expect to pitch an idea and
              defend it when someone pushes back and asks what would prove you wrong.
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
