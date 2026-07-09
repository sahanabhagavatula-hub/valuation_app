import CategoryPage from './CategoryPage';
import { getCategoryByPath } from '../data/categories';

const cat = getCategoryByPath('/consulting');

const TOPICS = [
  { tag: 'must know', title: 'Case interviews', description: 'Structured problem solving — profitability, market entry, M&A cases.' },
  { tag: 'must know', title: 'Frameworks', description: "MECE thinking, issue trees, profitability framework, Porter's 5 Forces.", path: '/frameworks' },
  { tag: 'must know', title: 'Market sizing', description: 'Fermi estimation — "how many ping pong balls fit in a school bus?"', path: '/market-sizing' },
  { tag: 'high value', title: 'Slide storytelling', description: 'Pyramid principle — leading with the answer, supporting with data.' },
  { tag: 'high value', title: 'Mental math', description: 'Fast arithmetic, percentages, and estimation under pressure.', path: '/mental-math' },
  { tag: 'good to have', title: 'Industry knowledge', description: 'Healthcare, tech, retail, financial services sector basics.' },
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
    />
  );
}
