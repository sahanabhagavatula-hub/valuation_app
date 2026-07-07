import CategoryPage from './CategoryPage';

const TOPICS = [
  { tag: 'must know', title: 'Behaviorals (STAR)', description: 'Situation, Task, Action, Result — tell compelling stories about your experience.' },
  { tag: 'must know', title: '"Why this firm"', description: 'Research the firm, know their deals/clients, give a specific answer.' },
  { tag: 'high value', title: 'Current events', description: 'Read WSJ or FT daily — know 2-3 macro themes and recent deals.' },
  { tag: 'high value', title: 'Networking', description: 'Cold outreach, informational interviews, following up correctly.' },
];

export default function Universal() {
  return (
    <CategoryPage
      icon="users"
      title="Universal — every interview"
      pillLabel="All roles"
      caption="These show up no matter which path you're recruiting for. Tap any topic to start learning."
      topics={TOPICS}
      backLabel="←  Back to home"
      backPath="/"
    />
  );
}
