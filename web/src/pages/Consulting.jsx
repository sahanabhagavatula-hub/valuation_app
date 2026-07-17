import CategoryPage from './CategoryPage';
import FlashcardDeck from '../components/FlashcardDeck';
import ConceptFlipCard from '../components/ConceptFlipCard';
import { getCategoryByPath } from '../data/categories';

const cat = getCategoryByPath('/consulting');

const TOPICS = [
  { tag: 'must know', title: 'Case interviews', description: 'Structured problem solving — profitability, market entry, M&A cases.', icon: 'message-2', lessons: 5, minutes: 45 },
  { tag: 'must know', title: 'Frameworks', description: "MECE thinking, issue trees, profitability framework, Porter's 5 Forces.", path: '/frameworks', icon: 'sitemap', lessons: 10, minutes: 60 },
  { tag: 'must know', title: 'Market sizing', description: 'Fermi estimation — "how many ping pong balls fit in a school bus?"', path: '/market-sizing', icon: 'ruler-2', lessons: 3, minutes: 25 },
  { tag: 'high value', title: 'Slide storytelling', description: 'Pyramid principle — leading with the answer, supporting with data.', icon: 'presentation', lessons: 3, minutes: 20 },
  { tag: 'high value', title: 'Mental math', description: 'Fast arithmetic, percentages, and estimation under pressure.', path: '/mental-math', icon: 'calculator', lessons: 4, minutes: 20 },
  { tag: 'good to have', title: 'Industry knowledge', description: 'Healthcare, tech, retail, financial services sector basics.', icon: 'building-factory-2', lessons: 4, minutes: 30 },
];

const CARDS = [
  {
    icon: 'sitemap',
    term: 'MECE',
    definition: 'Mutually Exclusive, Collectively Exhaustive — the rule that every good framework follows: your branches don\'t overlap, and together they cover the whole problem.',
    example: 'Splitting profit into "revenue" and "costs" is MECE — every dollar of profit comes from exactly one of those two buckets, nothing missing, nothing double-counted.',
  },
  {
    icon: 'binary-tree-2',
    term: 'Issue tree',
    definition: 'A visual breakdown of a big question into smaller, answerable sub-questions, branching down until you reach something you can actually investigate.',
    example: '"Why did profit decline?" branches into "revenue" and "costs," which each branch further into price, volume, fixed costs, and variable costs.',
  },
  {
    icon: 'trending-up',
    term: 'Profitability framework',
    definition: 'The most common case-interview framework: Profit = Revenue − Costs, then breaking each side down further to find what\'s actually driving a change.',
    example: 'A client\'s profit fell — you\'d ask whether revenue dropped or costs rose before going any deeper.',
  },
  {
    icon: 'map-2',
    term: 'Market entry',
    definition: 'A case type asking whether a company should enter a new market — evaluated across market attractiveness, company fit, financial viability, and how to enter.',
    example: '"Should a US coffee chain enter the Japanese market?" is a classic market entry case.',
  },
  {
    icon: 'calculator',
    term: 'Fermi estimation',
    definition: 'Making a rough but logical estimate of a hard-to-know number by breaking it into smaller, more knowable pieces and multiplying them together.',
    example: 'Estimating "how many piano tuners are in Chicago" by reasoning through population, piano ownership rates, and tuning frequency.',
  },
  {
    icon: 'triangle',
    term: 'Pyramid principle',
    definition: 'A communication structure that leads with your main answer or recommendation first, then supports it with the reasoning and data underneath.',
    example: 'Instead of building up to a conclusion, you open a slide with "We recommend X" and then explain why.',
  },
  {
    icon: 'chart-donut',
    term: "Porter's 5 Forces",
    definition: "A framework for judging how attractive an entire industry is, based on rivalry, supplier power, buyer power, new entrants, and substitutes.",
    example: "Used to answer 'is this industry even worth entering?' before getting into company-specific strategy.",
  },
  {
    icon: 'users-group',
    term: 'Client',
    definition: "In consulting, the company or organization that hired the firm to solve a specific business problem — everything in a case is framed around what the client needs.",
    example: 'The client is a retail CEO trying to decide whether to close underperforming stores.',
  },
];

export default function Consulting() {
  return (
    <CategoryPage
      title="Consulting"
      pillLabel="Consulting"
      caption="Structured problem solving is the whole game in consulting recruiting. Tap any topic to start learning."
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
            <ConceptFlipCard heading="What is management consulting?" image={cat.image}>
              Consultants are hired by companies to help solve a specific, often high-stakes
              business problem — should we enter this market, why is profit falling, how should
              we grow. You come in as an outside expert, diagnose the issue, and recommend a fix.
            </ConceptFlipCard>

            <ConceptFlipCard heading="What do consultants actually do?" image={cat.image}>
              You break a messy, open-ended business problem into a clean structure, gather
              data to test each piece, and build a clear recommendation — usually presented as
              slides. Structured thinking matters more than knowing every industry cold.
            </ConceptFlipCard>

            <ConceptFlipCard heading="Why this matters for recruiting" image={cat.image}>
              Case interviews are literally a simulation of the job — you're handed a business
              problem live and expected to structure it, ask good questions, and reach a
              recommendation. Frameworks are the tool, not the answer itself.
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
