import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { Button } from '../components/Widgets';

const TIPS = [
  {
    title: 'Round aggressively',
    body: 'Precision rarely matters in a case interview — being directionally right, fast, beats being exactly right, slow. Round to the nearest convenient number.',
    example: '387 × 21 → round to 400 × 20 = 8,000 (real answer: 8,127 — close enough)',
  },
  {
    title: 'Break multiplication into easier pieces',
    body: 'Split a hard multiplication into two easy ones and add them together.',
    example: '23 × 14 → (23 × 10) + (23 × 4) = 230 + 92 = 322',
  },
  {
    title: 'Turn division into multiplication',
    body: "Dividing by an awkward number is often easier if you flip it into a fraction you already know.",
    example: '450 ÷ 25 → 450 × 4 ÷ 100 = 1800 ÷ 100 = 18 (since 1/25 = 4/100)',
  },
  {
    title: 'Percentages are just fractions',
    body: 'Memorize a few key percent-to-fraction conversions so you can do them instantly.',
    example: '10% = ÷10  ·  25% = ÷4  ·  33% ≈ ÷3  ·  50% = ÷2',
  },
];

function generateQuestion() {
  const qtype = ['multiply', 'divide', 'percent'][Math.floor(Math.random() * 3)];
  if (qtype === 'multiply') {
    const a = Math.floor(Math.random() * (89 - 12 + 1)) + 12;
    const b = Math.floor(Math.random() * (29 - 11 + 1)) + 11;
    return { text: `${a} × ${b}`, answer: a * b };
  } else if (qtype === 'divide') {
    const b = [4, 5, 8, 10, 20, 25, 50][Math.floor(Math.random() * 7)];
    const result = Math.floor(Math.random() * (60 - 4 + 1)) + 4;
    return { text: `${b * result} ÷ ${b}`, answer: result };
  } else {
    const pct = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
    const base = Math.floor(Math.random() * (400 - 40 + 1)) + 40;
    return { text: `${pct}% of ${base}`, answer: Math.round((pct / 100) * base) };
  }
}

export default function MentalMath() {
  const navigate = useNavigate();
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState(0);
  const [current, setCurrent] = useState(() => generateQuestion());
  const [mode, setMode] = useState('Untimed');
  const [remaining, setRemaining] = useState(30);
  const [feedback, setFeedback] = useState(null);
  const [answer, setAnswer] = useState('');

  const nextQuestion = useCallback(() => {
    setCurrent(generateQuestion());
    setFeedback(null);
    setAnswer('');
    setRemaining(30);
  }, []);

  useEffect(() => {
    if (mode !== 'Timed' || feedback !== null) return;
    if (remaining <= 0) {
      setMissed((m) => m + 1);
      setFeedback(`⏱️ Time's up — the answer was ${current.answer}.`);
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [mode, remaining, feedback, current]);

  function handleModeChange(newMode) {
    setMode(newMode);
    setRemaining(30);
  }

  function handleCheck() {
    const userAnswer = parseInt(answer, 10);
    if (userAnswer === current.answer) {
      setCorrect((c) => c + 1);
      setFeedback(`✅ Correct! ${current.answer}`);
    } else {
      setMissed((m) => m + 1);
      setFeedback(`❌ Not quite — the answer was ${current.answer}, you said ${userAnswer || 0}.`);
    }
  }

  function handleReset() {
    setCorrect(0);
    setMissed(0);
    nextQuestion();
  }

  const total = correct + missed;

  return (
    <div className="valufin-container">
      <Topbar />
      <Button variant="secondary" onClick={() => navigate('/consulting')}>←  Back to Consulting</Button>

      <span className="valufin-eyebrow">Consulting · High value</span>
      <h1>Mental math.</h1>

      <div className="valufin-intro-card">
        <p>
          <strong>Why mental math matters here:</strong> In a case interview, you'll constantly
          need to do quick arithmetic out loud — sizing a market, calculating a break-even point,
          checking if a proposed strategy actually makes financial sense. There's usually no
          calculator allowed. Doing this fast and accurately (even with rounded numbers) signals
          that you can think on your feet under pressure — which is exactly what the interview is
          testing.
        </p>
        <p>
          For example: if you're asked <strong>"how many ping pong balls fit in a school bus?"</strong>{' '}
          you'll need to multiply estimated dimensions, divide by ball volume, and sanity-check
          the result — all in your head, while talking through your logic out loud.
        </p>
      </div>

      <p className="valufin-section-label">Quick tips</p>
      {TIPS.map((tip) => (
        <div className="valufin-tip-card" key={tip.title}>
          <p className="valufin-tip-title">{tip.title}</p>
          <p className="valufin-tip-body">{tip.body}</p>
          <div className="valufin-tip-example">{tip.example}</div>
        </div>
      ))}

      <p className="valufin-section-label">Practice: arithmetic drill</p>
      <p className="valufin-caption">
        Mix of multiplication, division, and percentages. Pick a mode, then answer as many as
        you want — your stats track as you go.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Button variant={mode === 'Untimed' ? 'primary' : 'secondary'} onClick={() => handleModeChange('Untimed')}>Untimed</Button>
        <Button variant={mode === 'Timed' ? 'primary' : 'secondary'} onClick={() => handleModeChange('Timed')}>Timed (30s/question)</Button>
      </div>

      <div className="valufin-quiz-card" style={{ marginTop: 12 }}>
        <p className="valufin-quiz-question">{current.text} ≈</p>
      </div>

      {mode === 'Timed' && feedback === null && (
        <p className="valufin-caption">⏱️ {remaining} seconds left</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginTop: 12 }}>
        <input
          className="valufin-input-number"
          type="number"
          step={1}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button onClick={handleCheck}>Check answer</Button>
      </div>

      {feedback && (
        <>
          <p style={{ marginTop: 12 }}>{feedback}</p>
          <Button onClick={nextQuestion}>Next question →</Button>
        </>
      )}

      <div className="valufin-quiz-stats">
        <div><span className="valufin-quiz-stat-value">{correct}</span><span className="valufin-quiz-stat-label">Correct</span></div>
        <div><span className="valufin-quiz-stat-value">{missed}</span><span className="valufin-quiz-stat-label">Missed</span></div>
        <div><span className="valufin-quiz-stat-value">{total}</span><span className="valufin-quiz-stat-label">Total</span></div>
      </div>

      <div style={{ height: 12 }} />
      <Button variant="secondary" onClick={handleReset}>Reset stats</Button>
    </div>
  );
}
