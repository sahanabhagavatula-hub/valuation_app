import CategoryPage from './CategoryPage';
import FlashcardDeck from '../components/FlashcardDeck';
import ConceptFlipCard from '../components/ConceptFlipCard';
import { getCategoryByPath } from '../data/categories';

const cat = getCategoryByPath('/universal');

const TOPICS = [
  { tag: 'must know', title: 'Behaviorals (STAR)', description: 'Situation, Task, Action, Result — tell compelling stories about your experience.', icon: 'message-2', lessons: 4, minutes: 30 },
  { tag: 'must know', title: '"Why this firm"', description: 'Research the firm, know their deals/clients, give a specific answer.', icon: 'building-bank', lessons: 3, minutes: 20 },
  { tag: 'high value', title: 'Current events', description: 'Read WSJ or FT daily — know 2-3 macro themes and recent deals.', icon: 'news', lessons: 3, minutes: 20 },
  { tag: 'high value', title: 'Networking', description: 'Cold outreach, informational interviews, following up correctly.', icon: 'users-group', lessons: 4, minutes: 25 },
];

const CARDS = [
  {
    icon: 'message-2',
    term: 'STAR method',
    definition: 'A structure for answering behavioral questions: Situation, Task, Action, Result — it keeps your story focused and shows a clear outcome.',
    example: 'Asked about a time you led a team, you\'d briefly set the scene (Situation), explain your goal (Task), what you did (Action), and what happened (Result).',
  },
  {
    icon: 'target',
    term: '"Why this firm"',
    definition: "A near-guaranteed interview question asking why you want to work at this specific company, not just in this industry — vague answers stand out for the wrong reason.",
    example: 'A strong answer references a specific recent deal, a person you spoke with, or something distinct about the firm\'s culture — not just "it\'s prestigious."',
  },
  {
    icon: 'news',
    term: 'Current events',
    definition: "Being able to discuss a couple of recent, relevant business or market stories — shows you're genuinely engaged with the industry, not just interviewing blind.",
    example: "Being able to explain a recent major M&A deal or interest rate decision, and why it matters, in under a minute.",
  },
  {
    icon: 'mail-forward',
    term: 'Cold outreach',
    definition: "Reaching out to someone you don't know — often an alum or someone in a role you want — to ask for advice or a short conversation, not a job directly.",
    example: 'Emailing a second-year analyst at a firm you\'re targeting to ask for 15 minutes to hear about their experience.',
  },
  {
    icon: 'phone-call',
    term: 'Informational interview',
    definition: "A casual, low-pressure conversation with someone in a role or firm you're interested in — meant to learn, build a relationship, and sometimes get referred later.",
    example: 'A 20-minute call where you ask a banker about their day-to-day and what they wish they\'d known before starting.',
  },
  {
    icon: 'send',
    term: 'Follow-up',
    definition: "A short thank-you note sent after a conversation or interview — expected as basic etiquette, and a chance to reinforce your interest.",
    example: 'Sending a two-sentence thank-you email the same day, referencing something specific you discussed.',
  },
];

export default function Universal() {
  return (
    <CategoryPage
      title="Universal — every interview"
      pillLabel="All roles"
      caption="These show up no matter which path you're recruiting for. Tap any topic to start learning."
      topics={TOPICS}
      backLabel="←  Back to home"
      backPath="/"
      heroImage={cat.image}
      heroTint={cat.tint}
      heroAccent={cat.accent}
      topicsLayout="syllabus"
      syllabusHeadline="Four topics, every interview tests these."
      beforeTopics={
        <>
          <div className="valufin-frame-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <ConceptFlipCard heading="What is the 'universal' round?" image={cat.image}>
              No matter which finance or consulting path you're recruiting for, every interview
              also tests the same non-technical basics: can you tell a good story about
              yourself, and do you actually seem to want this specific job.
            </ConceptFlipCard>

            <ConceptFlipCard heading="What actually gets tested here?" image={cat.image}>
              Behavioral questions about your past experience, why you want this specific firm
              (not just the industry), whether you follow markets at all, and whether you've
              put in the effort to network before applying.
            </ConceptFlipCard>

            <ConceptFlipCard heading="Why this matters for recruiting" image={cat.image}>
              Technical skill gets you in the room, but weak behavioral answers or a generic
              "why this firm" story is one of the most common reasons otherwise strong
              candidates don't get the offer. This round is easy to under-prepare for.
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
