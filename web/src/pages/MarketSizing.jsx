import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { Button, PasswordField } from '../components/Widgets';
import { FeedbackBox } from '../components/Curriculum';
import { callClaude } from '../lib/anthropic';

const REFERENCE_NUMBERS = [
  { value: '~340 million', label: 'People in the United States' },
  { value: '~8.2 billion', label: 'People in the world' },
  { value: '~130 million', label: 'Households in the United States' },
  { value: '~8.3 million', label: 'People in New York City' },
  { value: '~3.9 million', label: 'People in Los Angeles' },
  { value: '~2.7 million', label: 'People in Chicago' },
  { value: '~2.5', label: 'Average people per US household' },
  { value: '~78 years', label: 'Average US life expectancy' },
  { value: '~330 days/year', label: "Typical 'working/active' days, excluding holidays" },
  { value: '~75%', label: "Share of the US population that's adults (18+)" },
];

const PROBLEMS = [
  'Estimate how many cups of coffee are sold in New York City on a typical weekday.',
  'Estimate how many piano tuners there are in Chicago.',
  'Estimate how many gallons of gasoline are sold in the United States per day.',
  'Estimate how many smartphones are sold in the United States per year.',
  'How many ping pong balls would fit inside a school bus?',
];

function randomProblem() {
  return PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
}

export default function MarketSizing() {
  const navigate = useNavigate();
  const [anthropicKey, setAnthropicKey] = useState('');
  const [problem, setProblem] = useState(randomProblem);
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleNewProblem() {
    setProblem(randomProblem());
    setFeedback(null);
    setResponse('');
  }

  async function handleSubmit() {
    setError(null);
    if (!anthropicKey) {
      setError('Add your Anthropic API key in the sidebar first.');
      return;
    }
    if (!response.trim()) {
      setError('Write your reasoning first.');
      return;
    }
    setLoading(true);
    try {
      const prompt = `You are a consulting interviewer evaluating a candidate's market
sizing answer. Be direct and specific — this is a learning tool, not a real interview, so
give genuinely useful feedback.

Problem: "${problem}"
Candidate's answer: "${response}"

Evaluate: (1) Is their approach logically structured (breaking the problem into clear,
reasonable steps)? (2) Are their assumptions reasonable, even if approximate? (3) Is their
final number in a believable range given their own assumptions (check their math)? (4) What
specifically would make this stronger? Keep it to 4-5 sentences, direct and specific, not
generic encouragement.`;
      const result = await callClaude(prompt, anthropicKey, 400);
      setFeedback(result);
    } catch (e) {
      setError(`Couldn't reach the AI: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="valufin-layout">
      <div className="valufin-sidebar-fixed">
        <h2>API key</h2>
        <PasswordField
          label="Anthropic API key"
          value={anthropicKey}
          onChange={setAnthropicKey}
          help="Required for AI feedback on your market-sizing practice answers."
        />
        <hr className="valufin-hr" />
        <p className="valufin-caption">Your key is only used to call Anthropic directly from your own machine.</p>
      </div>

      <div className="valufin-main">
        <div className="valufin-container">
          <Topbar />
          <Button variant="secondary" onClick={() => navigate('/consulting')}>←  Back to Consulting</Button>

          <span className="valufin-eyebrow">Consulting · Must know</span>
          <h1>Market sizing.</h1>

          <div className="valufin-intro-card">
            <p>
              <strong>What is market sizing?</strong> Market sizing (also called a Fermi
              estimation, after physicist Enrico Fermi) is the skill of estimating a large,
              hard-to-know number by breaking it into smaller, easier-to-estimate pieces and
              multiplying them together.
            </p>
            <p>
              Consulting interviews use this to test structured thinking under uncertainty —
              there's rarely one "right" answer. What matters is that your approach is logical,
              your assumptions are reasonable, and your final number is in a believable range.
            </p>
          </div>

          <p className="valufin-section-label">Common reference numbers</p>
          <p className="valufin-caption">
            Memorize these — almost every market sizing problem needs at least one of them as a
            starting point.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
            {REFERENCE_NUMBERS.map((ref) => (
              <div className="valufin-refnum-card" key={ref.label}>
                <p className="valufin-refnum-value">{ref.value}</p>
                <p className="valufin-refnum-label">{ref.label}</p>
              </div>
            ))}
          </div>
          <p className="valufin-caption" style={{ marginTop: 8 }}>
            These are approximate and will drift over time (population grows, etc.) — close
            enough is the whole point for this kind of estimation.
          </p>

          <p className="valufin-section-label">Practice: market sizing problems</p>
          <p className="valufin-caption">
            Pick a problem, walk through your logic and assumptions, then give a final number.
            Submit for feedback on your approach, not just whether the number is 'right.'
          </p>

          <div className="valufin-intro-card">
            <p style={{ fontSize: 15, color: '#e0d4c2', margin: 0 }}>"{problem}"</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 12 }}>
            <div />
            <Button variant="secondary" onClick={handleNewProblem}>🔁 New problem</Button>
          </div>

          <textarea
            className="valufin-input"
            style={{ height: 140, marginTop: 12, resize: 'vertical' }}
            placeholder="Walk through your assumptions step by step, then give a final number..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />

          <Button onClick={handleSubmit}>{loading ? 'Reviewing your approach...' : 'Submit for feedback'}</Button>

          {error && <p style={{ color: '#c77b6f', marginTop: 8 }}>{error}</p>}
          {feedback && <FeedbackBox>{feedback}</FeedbackBox>}
        </div>
      </div>
    </div>
  );
}
