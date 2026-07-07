import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { Button, PasswordField } from '../components/Widgets';
import { ChatBubble, FeedbackBox, ProgressRow, SummaryCard } from '../components/Curriculum';
import { callClaude } from '../lib/anthropic';

const DEAL_TYPES = [
  ['Type 1', 'Horizontal', 'Two companies in the <strong>same industry</strong> doing the <strong>same thing</strong> combine. Goal: eliminate a competitor, gain market share, and cut overlapping costs.', 'Two airlines merging — same routes, massive staff and fleet overlap to eliminate.'],
  ['Type 2', 'Vertical', 'A company acquires another at a <strong>different point in its supply chain</strong> — either a supplier (backward integration) or a distributor (forward integration).', 'A car company buying a tire manufacturer — capturing that supplier margin themselves.'],
  ['Type 3', 'Conglomerate', 'Two companies in <strong>completely unrelated industries</strong> combine. Goal: diversify revenue so if one business struggles, the other compensates.', 'A media company buying a food brand — no operational overlap, purely diversifying the business portfolio.'],
];

const STRUCTURES = [
  ['Structure 1', 'Cash deal', "The acquirer pays the target's shareholders entirely in cash. Simple and clean — shareholders get a definite amount with no exposure to what happens to the acquirer afterward.", '✓ Simple. Target shareholders get certainty — they know exactly what they\'re getting.', '✗ Acquirer needs a lot of cash on hand or has to borrow. Interest on that debt hurts earnings.'],
  ['Structure 2', 'Stock deal', "The acquirer pays by issuing new shares of its own stock to the target's shareholders. Those shareholders now own a piece of the combined company instead of receiving cash.", '✓ No cash required. Target shareholders share in the combined company\'s future upside.', '✗ Existing shareholders get diluted. If the acquirer\'s stock falls after the deal, target shareholders lose value.'],
  ['Structure 3', 'Leveraged buyout (LBO)', 'The acquirer — often a private equity firm — uses mostly <strong>borrowed money</strong> to fund the purchase, using the target\'s own assets and future cash flow as collateral for the debt.', '✓ Buyer doesn\'t need to put up much of their own cash — amplifies returns if the deal works.', "✗ High debt burden. If the target's business underperforms, it can't service the debt and may go bankrupt."],
];

const STEPS = [
  ['Pitch / mandate', 'The bank pitches the client on why they should buy or sell, and what value they can deliver. If the client hires the bank, they get a "mandate" — the contract to run the deal.'],
  ['Valuation & target screening', "The bank values the target using DCF, comps, and precedent transactions. On the buy-side, they screen potential targets against the acquirer's strategic goals."],
  ['Indication of interest / first-round bids', 'Potential buyers submit non-binding initial offers. The seller (via the bank) selects which parties can proceed to due diligence.'],
  ['Due diligence', 'The buyer digs into the target\'s financials, legal status, contracts, liabilities, and operations. Banks and lawyers run this in parallel. A "data room" holds all the documents.'],
  ['Final bids & negotiation', 'Buyers submit binding final bids. The seller picks one and negotiates key terms — price, structure, representations & warranties, conditions to close.'],
  ['Signing & closing', 'The deal is signed (SPA — Sale and Purchase Agreement), regulatory approvals are obtained, and the deal closes. The bank collects its success fee.'],
];

const MA_QUESTIONS = [
  'Walk me through what happens to EPS when an acquirer buys a target using stock.',
  'What\'s the difference between a horizontal and a vertical acquisition? Give me an example of each.',
  "Why might an acquirer be willing to pay a premium above the target's current stock price?",
  'What are synergies, and why are they often harder to achieve than expected?',
  "Walk me through the key steps in a typical M&A deal process from the bank's perspective.",
  "What's an LBO, and why do private equity firms use so much debt?",
  "If an acquirer has a P/E of 20x and the target has a P/E of 15x, would a stock deal likely be accretive or dilutive? Why?",
];

const TOTAL_QUESTIONS = 5;

export default function MAProcess() {
  const navigate = useNavigate();
  const [anthropicKey, setAnthropicKey] = useState('');

  const [step, setStep] = useState(0);
  const [qa, setQa] = useState([]);
  const [currentQ, setCurrentQ] = useState(() => MA_QUESTIONS[Math.floor(Math.random() * MA_QUESTIONS.length)]);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function pickNextQuestion(used) {
    const remaining = MA_QUESTIONS.filter((q) => !used.includes(q));
    return remaining.length ? remaining[Math.floor(Math.random() * remaining.length)] : MA_QUESTIONS[step % MA_QUESTIONS.length];
  }

  async function handleSubmit() {
    setError(null);
    if (!anthropicKey) {
      setError('Add your Anthropic API key in the sidebar first.');
      return;
    }
    if (!answer.trim()) {
      setError('Type an answer first.');
      return;
    }
    setLoading(true);
    try {
      const prompt = `You are an investment banking interviewer giving direct, specific
feedback on a candidate's answer to an M&A question. 2-4 sentences. Be honest — point out exactly
what's strong and what's missing or weak. If they used a term incorrectly, flag it. If their answer
is strong, say specifically why.

Question: "${currentQ}"
Candidate's answer: "${answer}"

Give concise, specific feedback. No generic encouragement.`;
      const result = await callClaude(prompt, anthropicKey, 250);
      setFeedback(result);
      setQa((prev) => [...prev, [currentQ, answer]]);
    } catch (e) {
      setError(`Couldn't reach the AI: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    const nextStep = step + 1;
    const usedQuestions = [...qa.map(([q]) => q), currentQ];
    setStep(nextStep);
    setFeedback(null);
    setAnswer('');
    if (nextStep >= TOTAL_QUESTIONS) {
      setDone(true);
    } else {
      setCurrentQ(pickNextQuestion(usedQuestions));
    }
  }

  async function loadSummary(finalQa) {
    setLoading(true);
    try {
      const transcript = finalQa.map(([q, a]) => `Q: ${q}\nA: ${a}`).join('\n\n');
      const prompt = `You are an IB interviewer wrapping up a mock M&A interview session.

Full transcript:
${transcript}

Write a short overall assessment: one-line verdict (e.g. "Strong on process, needs sharper technical mechanics"), then 2-3 sentences on what was strong and what was weak. Be specific, referencing the actual answers.`;
      const result = await callClaude(prompt, anthropicKey, 350);
      setSummary(result);
    } catch (e) {
      setSummary("Couldn't generate a summary — try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (done && summary === null) loadSummary(qa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function handlePracticeAgain() {
    setStep(0);
    setQa([]);
    setCurrentQ(MA_QUESTIONS[Math.floor(Math.random() * MA_QUESTIONS.length)]);
    setAnswer('');
    setFeedback(null);
    setDone(false);
    setSummary(null);
  }

  return (
    <div className="valufin-layout">
      <div className="valufin-sidebar-fixed">
        <h2>API key</h2>
        <PasswordField
          label="Anthropic API key"
          value={anthropicKey}
          onChange={setAnthropicKey}
          help="Required for the M&A practice tool at the bottom of this page."
        />
        <hr className="valufin-hr" />
        <p className="valufin-caption">Your key is only used to call Anthropic directly from your own machine.</p>
      </div>

      <div className="valufin-main">
        <div className="valufin-container">
          <Topbar />
          <Button variant="secondary" onClick={() => navigate('/ib')}>←  Back to Investment Banking</Button>

          <span className="valufin-eyebrow">Investment Banking · Must know</span>
          <h1>M&amp;A process.</h1>
          <p className="valufin-caption">👇 Scroll to the bottom for a live practice tool with AI feedback.</p>

          <div className="valufin-intro-card">
            <p>
              <strong>What is M&amp;A?</strong> Mergers and Acquisitions — M&amp;A — is when one
              company buys or combines with another. A <strong>merger</strong> is when two
              companies combine into one new entity. An <strong>acquisition</strong> is when one
              company (the acquirer) buys another (the target) outright. In practice, most deals
              are acquisitions even when they're called mergers.
            </p>
            <p>
              For investment bankers, M&amp;A is one of the core services they sell. Companies
              pay banks to advise them on buying other companies, selling themselves, or merging
              — helping with valuing the target, running the process, and negotiating the deal.
              M&amp;A fees are some of the largest single fees in banking.
            </p>
          </div>

          <p className="valufin-section-label">Why do companies do M&amp;A?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              ['Revenue synergies', 'The combined company can sell more than the two could separately — e.g. cross-selling products to each other\'s customer bases.'],
              ['Cost synergies', 'Eliminating overlap — duplicate headquarters, redundant staff, shared suppliers getting better pricing at scale.'],
              ['Buying growth', 'Instead of building a new product or entering a new market organically, you buy a company that already has it.'],
              ['Eliminating competition', 'Acquiring a competitor removes them from the market (subject to antitrust scrutiny for large deals).'],
            ].map(([term, defn]) => (
              <div className="valufin-concept-card" style={{ height: '100%' }} key={term}>
                <p className="valufin-concept-heading" style={{ fontSize: 14 }}>{term}</p>
                <div className="valufin-concept-body" style={{ fontSize: 13 }}>{defn}</div>
              </div>
            ))}
          </div>

          <p className="valufin-section-label">The three main types of M&amp;A deal</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {DEAL_TYPES.map(([tag, title, defn, example]) => (
              <div className="valufin-deal-type-card" key={title}>
                <span className="valufin-deal-type-tag">{tag}</span>
                <p className="valufin-deal-type-title">{title}</p>
                <p className="valufin-deal-type-def" dangerouslySetInnerHTML={{ __html: defn }} />
                <div className="valufin-example-box" style={{ margin: 0 }}>
                  <p className="valufin-example-title">Example</p>
                  <p className="valufin-example-text">{example}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="valufin-section-label">The three main deal structures — how it's paid for</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {STRUCTURES.map(([tag, title, defn, pro, con]) => (
              <div className="valufin-structure-card" key={title}>
                <span className="valufin-structure-tag">{tag}</span>
                <p className="valufin-structure-title">{title}</p>
                <p className="valufin-structure-def" dangerouslySetInnerHTML={{ __html: defn }} />
                <p className="valufin-structure-pros">{pro}</p>
                <p className="valufin-structure-cons">{con}</p>
              </div>
            ))}
          </div>

          <p className="valufin-section-label">The M&amp;A deal process, step by step</p>
          {STEPS.map(([title, body], i) => (
            <div className="valufin-process-step" key={title}>
              <div className="valufin-process-num">{i + 1}</div>
              <div className="valufin-process-content">
                <p className="valufin-process-title">{title}</p>
                <p className="valufin-process-body">{body}</p>
              </div>
            </div>
          ))}

          <p className="valufin-section-label">Technical modeling — accretion / dilution</p>
          <div className="valufin-tech-card">
            <p className="valufin-tech-title">What is accretion/dilution analysis?</p>
            <p className="valufin-tech-body">
              This is the core M&amp;A model in IB. It asks one simple question: after the
              acquirer buys the target, does the combined company's <strong>EPS (earnings per
              share)</strong> go up or down compared to what the acquirer would have had on its
              own?
            </p>
            <p className="valufin-tech-body" style={{ marginTop: 8 }}>
              If EPS goes up — the deal is <strong>accretive</strong> (good). If EPS goes down —
              the deal is <strong>dilutive</strong> (bad, or at least needs justification via
              future synergies).
            </p>
            <div className="valufin-formula">New EPS = (Acquirer Net Income + Target Net Income + Synergies − Deal Costs) ÷ New Share Count</div>
          </div>

          <div className="valufin-example-box" style={{ marginBottom: 12 }}>
            <p className="valufin-example-title">Example</p>
            <p className="valufin-example-text">
              Acquirer has $10 EPS. After buying the target using stock (so share count
              increases), combined EPS is $9.50. The deal is <strong>dilutive by $0.50</strong> —
              each shareholder now owns a smaller slice of the combined earnings. Acceptable only
              if synergies are expected to overcome this over time.
            </p>
          </div>

          <div className="valufin-tech-card">
            <p className="valufin-tech-title">How deal structure (cash vs. stock) affects EPS</p>
            <p className="valufin-tech-body">
              <strong>Cash deal:</strong> share count stays the same, so the EPS impact comes only
              from whether the target's earnings cover the interest cost on any debt used to fund
              the purchase.
            </p>
            <p className="valufin-tech-body" style={{ marginTop: 8 }}>
              <strong>Stock deal:</strong> share count rises, which dilutes EPS automatically.
              Whether the deal ends up accretive depends on the relative P/E ratios — if the
              acquirer's P/E is higher than the target's, a stock deal tends to be accretive. If
              the target's P/E is higher, it tends to be dilutive.
            </p>
          </div>

          <div className="valufin-tech-card">
            <p className="valufin-tech-title">Synergies — and why they're usually optimistic</p>
            <p className="valufin-tech-body">
              Synergies are the extra value that supposedly comes from combining the two
              companies, used to justify paying a premium above the target's market value (the
              "control premium"). In practice, synergies are notoriously hard to fully realize —
              integration takes longer than expected, key employees leave, cultures clash. A good
              analyst always stress-tests synergy assumptions.
            </p>
            <div className="valufin-formula">Maximum price to pay = Standalone value of target + PV of synergies</div>
          </div>

          <hr className="valufin-hr" />
          <p className="valufin-section-label">🎤 Practice M&amp;A interview questions</p>
          <h1>M&amp;A practice.</h1>
          <p className="valufin-caption">
            I'll ask you real M&amp;A questions an IB interviewer would ask — accretion/dilution,
            deal structures, synergies — and give specific feedback on your answers.
          </p>

          {!done ? (
            <>
              <ProgressRow total={TOTAL_QUESTIONS} step={step} />
              <p className="valufin-caption">Question {step + 1} of {TOTAL_QUESTIONS}</p>

              {qa.map(([q, a], i) => (
                <div key={i}>
                  <ChatBubble role="ai" label="Interviewer">{q}</ChatBubble>
                  <ChatBubble role="user" label="You">{a}</ChatBubble>
                </div>
              ))}

              <ChatBubble role="ai" label="Interviewer">{currentQ}</ChatBubble>

              <textarea
                className="valufin-input"
                style={{ height: 100, resize: 'vertical' }}
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              {feedback === null ? (
                <Button onClick={handleSubmit}>{loading ? 'Reviewing your answer...' : 'Submit answer'}</Button>
              ) : (
                <>
                  <FeedbackBox>{feedback}</FeedbackBox>
                  <Button onClick={handleNext}>{step < TOTAL_QUESTIONS - 1 ? 'Next question →' : 'Finish and see summary →'}</Button>
                </>
              )}
              {error && <p style={{ color: '#c77b6f', marginTop: 8 }}>{error}</p>}
            </>
          ) : (
            <>
              <p className="valufin-section-label">Final summary</p>
              {summary === null ? (
                <p className="valufin-caption">Putting together your summary...</p>
              ) : (
                <SummaryCard label="Your M&A practice session">{summary}</SummaryCard>
              )}
              <div style={{ height: 12 }} />
              <Button onClick={handlePracticeAgain}>Practice again →</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
