import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { Button, PasswordField, Expander } from '../components/Widgets';
import { ChatBubble, FeedbackBox, ProgressRow, SummaryCard, ExampleBox } from '../components/Curriculum';
import { fetchCompanySnapshot } from '../lib/fmp';
import { callClaude } from '../lib/anthropic';

const STEP_NAMES = ['Recommendation', 'Thesis', 'Valuation', 'Catalyst', 'Risk'];
const STEP_QUESTIONS_BASE = [
  "Walk me through a stock you'd pitch right now — what's your call, buy or sell?",
  "What's your thesis? Why is the market wrong about this one?",
  "Talk me through your valuation. What's your price target and how'd you get there?",
  "What's the catalyst? What actually makes this thesis play out?",
  "What's the biggest risk to this pitch, and why aren't you more worried about it?",
];

const FOLLOWUPS = [
  {
    question: "Your price target is only 7% above today's price. Why is this pitch worth my time?",
    answer: "\"Fair pushback. I'd say two things — first, that 7% is the <strong>average</strong> analyst target, and I think the services growth story is underappreciated enough that my own number could reasonably be higher than the Street's. Second, even a modest, high-conviction pick is a legitimate pitch — not every good idea has to be a 50% mispricing. If you want, I can walk through a more bullish case where services growth alone gets you to a meaningfully higher number.\"",
    whyAsked: "Why they ask this: testing whether you understand that pitches don't need to be extreme to be valid — and whether you can defend a modest thesis under pressure.",
    simpleTerms: [
      ['"The Street"', 'Wall Street analysts as a group — the people whose job is to study companies and give price predictions. "The Street\'s number" just means "what most analysts predict."'],
      ['"High-conviction"', 'Means you feel really confident about something, even if it\'s a small or quiet change rather than a big dramatic one.'],
      ['"Mispricing"', "When the stock market's price for something doesn't match what it's actually worth — like a $20 item accidentally priced at $15."],
    ],
  },
  {
    question: "What's your biggest assumption in this pitch, and what happens if you're wrong?",
    answer: "\"Probably that the market keeps undervaluing services growth relative to hardware. If I'm wrong — if the market already fully prices that in — then most of my edge disappears and this becomes closer to a hold than a buy. I'd also say my WACC and growth assumptions in the DCF are estimates, not certainties, so I'd want to stress-test the valuation across a range, not just one scenario.\"",
    whyAsked: "Why they ask this: every interviewer wants to know if you understand your own thesis is a bet, not a fact — and whether you've actually stress-tested it.",
    simpleTerms: [
      ['"My edge"', 'The advantage or special insight that makes your pick better than just guessing — if that insight turns out to be wrong, you lose that advantage.'],
      ['"Hold" vs "Buy"', 'A "buy" means you think the stock will go up, so you should purchase it. A "hold" means you don\'t think it\'ll move much either way, so there\'s no strong reason to buy or sell.'],
      ['WACC (say "wack")', "Stands for Weighted Average Cost of Capital. It's just a number representing how much return investors expect, used to figure out what future cash is worth in today's dollars."],
      ['DCF', "Stands for Discounted Cash Flow. It's a method for estimating what a company is worth, based on how much cash it's expected to make in the future."],
      ['"Stress-test"', 'Trying out your numbers under different, less favorable conditions to see if your conclusion still holds up — like checking if a bridge stays standing under extra weight.'],
    ],
  },
  {
    question: "Why Apple and not just a basket of big tech? What's company-specific here?",
    answer: "\"Good question — a lot of my thesis could apply loosely to other tech names too. But the Intel chip partnership is genuinely Apple-specific, and so is the scale of their services ecosystem — nobody else has that combination of hardware lock-in plus a high-margin services business riding on top of it. That's the part of the pitch that's about Apple specifically, not just 'big tech is good.'\"",
    whyAsked: "Why they ask this: checking that your pitch isn't just a generic sector view dressed up as stock-specific research.",
    simpleTerms: [
      ['"A basket of"', 'A group of several similar things treated as one unit — "a basket of tech stocks" just means several tech stocks bundled together.'],
      ['"Hardware lock-in"', 'When owning one product makes you likely to keep buying related products — like owning an iPhone makes you more likely to buy AirPods that work well with it.'],
      ['"High-margin"', 'A business where the company keeps a large chunk of each sale as profit, instead of most of it going toward costs.'],
    ],
  },
];

function StepCard({ number, title, children }) {
  return (
    <div>
      <div className="valufin-step-card-header">
        <div className="valufin-step-num-lg">{number}</div>
        <p className="valufin-step-title">{title}</p>
      </div>
      <Expander title={`Expand step ${number}`}>{children}</Expander>
    </div>
  );
}

export default function StockPitch() {
  const navigate = useNavigate();
  const [fmpKey, setFmpKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');

  // Practice tool state
  const [ticker, setTicker] = useState('');
  const [company, setCompany] = useState(null);
  const [setupError, setSetupError] = useState(null);
  const [loadingCompany, setLoadingCompany] = useState(false);

  const [step, setStep] = useState(0);
  const [qa, setQa] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);
  const [summary, setSummary] = useState(null);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleStart() {
    setSetupError(null);
    if (!fmpKey || !anthropicKey) {
      setSetupError('Add both your FMP and Anthropic API keys in the sidebar first.');
      return;
    }
    if (!ticker.trim()) {
      setSetupError('Enter a ticker symbol.');
      return;
    }
    setLoadingCompany(true);
    try {
      const snapshot = await fetchCompanySnapshot(ticker.trim(), fmpKey);
      setCompany(snapshot);
    } catch (e) {
      setSetupError(`Couldn't fetch data: ${e.message}`);
    } finally {
      setLoadingCompany(false);
    }
  }

  async function loadInterviewerQuestion(stepIndex, history) {
    const baseQuestion = STEP_QUESTIONS_BASE[stepIndex];
    const prompt = `You are a PE/hedge fund interviewer running a mock stock pitch interview.
Company being pitched: ${company.companyName} (${company.ticker})
Sector: ${company.industry}
Current price: $${company.price.toFixed(2)}
Revenue (TTM, $M): ${company.revenue.toFixed(0)}
EBITDA (TTM, $M): ${company.ebitda.toFixed(0)}
Net income (TTM, $M): ${company.netIncome.toFixed(0)}

This is step ${stepIndex + 1} of 5 in the pitch framework: ${STEP_NAMES[stepIndex]}.
Base question to ask: "${baseQuestion}"

Conversation so far:
${history}

Ask this step's question in a natural, conversational interviewer voice, referencing the
specific company by name. Keep it to 1-2 sentences. Do not answer it yourself, just ask it.`;
    try {
      return await callClaude(prompt, anthropicKey, 150);
    } catch {
      return baseQuestion;
    }
  }

  useEffect(() => {
    if (company && !done && currentQuestion === null) {
      const historyText = qa.map(([q, a]) => `Q: ${q}\nA: ${a}`).join('\n');
      loadInterviewerQuestion(step, historyText).then(setCurrentQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company, step, done, currentQuestion]);

  async function handleSubmitAnswer() {
    setError(null);
    if (!answer.trim()) {
      setError('Type an answer first.');
      return;
    }
    setBusy(true);
    try {
      const prompt = `You are a PE/hedge fund interviewer giving direct, specific feedback on a
candidate's stock pitch answer. Be honest and specific — point out exactly what's strong
and what's weak. Do not be falsely encouraging, but don't be harsh either. 2-4 sentences max.

Company: ${company.companyName} (${company.ticker})
Sector: ${company.industry}
Real financials — Revenue (TTM, $M): ${company.revenue.toFixed(0)}, EBITDA (TTM, $M): ${company.ebitda.toFixed(0)}, Net income (TTM, $M): ${company.netIncome.toFixed(0)}

This step: ${STEP_NAMES[step]}
Question asked: ${STEP_QUESTIONS_BASE[step]}
Candidate's answer: "${answer}"

If the candidate stated a fact that conflicts with the real financials above, point that out
directly. If their answer is vague ("it's a good company," "the market is wrong") without a
specific, falsifiable reason, call that out and suggest what would make it sharper. If it's
genuinely strong, say so specifically — what made it work.`;
      const result = await callClaude(prompt, anthropicKey, 250);
      setFeedback(result);
      setQa((prev) => [...prev, [currentQuestion, answer]]);
    } catch (e) {
      setError(`Couldn't reach the AI: ${e.message}`);
    } finally {
      setBusy(false);
    }
  }

  function handleNext() {
    const nextStep = step + 1;
    setStep(nextStep);
    setCurrentQuestion(null);
    setFeedback(null);
    setAnswer('');
    if (nextStep >= 5) setDone(true);
  }

  useEffect(() => {
    if (done && summary === null) {
      setBusy(true);
      const transcript = qa.map(([q, a], i) => `${STEP_NAMES[i]} — Q: ${q}\nA: ${a}`).join('\n\n');
      const prompt = `You are a PE/hedge fund interviewer wrapping up a mock stock pitch interview
on ${company.companyName} (${company.ticker}).

Full transcript:
${transcript}

Write a short overall assessment: one line verdict (e.g. "Solid pitch, needs a sharper
thesis"), then 2-3 sentences on what was strong and what was weak across the whole pitch.
Be specific and direct, referencing the actual content of their answers.`;
      callClaude(prompt, anthropicKey, 350)
        .then(setSummary)
        .catch(() => setSummary("Couldn't generate a summary this time — try again."))
        .finally(() => setBusy(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function handlePracticeAnother() {
    setCompany(null);
    setStep(0);
    setQa([]);
    setCurrentQuestion(null);
    setFeedback(null);
    setDone(false);
    setSummary(null);
    setTicker('');
    setAnswer('');
  }

  return (
    <div className="valufin-layout">
      <div className="valufin-sidebar-fixed">
        <h2>API keys</h2>
        <PasswordField
          label="FMP API key"
          value={fmpKey}
          onChange={setFmpKey}
          help="Free at financialmodelingprep.com — pulls real company financials for the practice tool below."
        />
        <PasswordField
          label="Anthropic API key"
          value={anthropicKey}
          onChange={setAnthropicKey}
          help="Required for the practice tool — powers the interviewer questions and feedback."
        />
        <hr className="valufin-hr" />
        <p className="valufin-caption">
          Your keys are only used to call FMP and Anthropic directly from your own machine.
          Nothing is stored or sent anywhere else.
        </p>
      </div>

      <div className="valufin-main">
        <div className="valufin-container">
          <Topbar />
          <Button variant="secondary" onClick={() => navigate('/pe-hf')}>←  Back to PE / HF</Button>

          <span className="valufin-eyebrow">PE / Hedge Fund · Must know</span>
          <h1>Stock pitch.</h1>

          <div className="valufin-intro-card">
            <p>
              <strong>What is a stock pitch?</strong> A stock pitch is a structured argument for
              why an investor should buy or sell a specific stock, backed by real numbers and
              research — not just a gut feeling.
            </p>
            <p>
              It's used to tell someone — a portfolio manager, an interviewer, a client — that a
              stock is mispriced by the market, and to prove that claim with evidence: a
              valuation estimate, a clear thesis, and an honest accounting of what could go
              wrong. In PE and hedge fund interviews, you're almost always asked to walk through
              one, since it tests both your technical skills and your judgment at the same time.
            </p>
            <p style={{ marginTop: 14, color: '#9ed8f0', fontSize: 13 }}>
              Following along below: a simple worked example using a fictional coffee chain,
              "Daily Grind Coffee Co.," to show how each step actually gets filled in.
            </p>
          </div>

          <p className="valufin-caption">
            👇 Scroll to the bottom of this page for a live, interactive practice version with AI
            feedback.
          </p>

          <p className="valufin-section-label">The 5-step framework</p>

          <StepCard number={1} title="Recommendation (buy/sell)">
            <p>
              State your call clearly and immediately — don't bury it. A pitch opens with the
              conclusion, then spends the rest of the time proving it.
            </p>
            <div className="valufin-vocab-box">
              <p className="valufin-vocab-title">Vocabulary to know</p>
              <div className="valufin-vocab-row"><span className="valufin-vocab-term">Long</span><span className="valufin-vocab-def">Betting the stock goes up — you buy it expecting the price to rise.</span></div>
              <div className="valufin-vocab-row"><span className="valufin-vocab-term">Short</span><span className="valufin-vocab-def">Betting the stock goes down — you borrow and sell it, aiming to buy back lower.</span></div>
              <div className="valufin-vocab-row"><span className="valufin-vocab-term">Bull case</span><span className="valufin-vocab-def">The optimistic scenario — why the stock could outperform.</span></div>
              <div className="valufin-vocab-row"><span className="valufin-vocab-term">Bear case</span><span className="valufin-vocab-def">The pessimistic scenario — why the stock could underperform.</span></div>
            </div>
            <ExampleBox>
              "I recommend going <strong>long</strong> Daily Grind Coffee Co. (ticker: GRND) — I
              believe the market is undervaluing the stock by roughly 20%."
            </ExampleBox>
          </StepCard>

          <StepCard number={2} title="Thesis (your core argument)">
            <p>
              Your thesis is the one or two sentence "why" behind your call — the core insight
              that, if true, means the stock is mispriced. Good theses are specific and
              falsifiable, not vague ("this is a good company").
            </p>
            <ExampleBox>
              "GRND is rapidly expanding into a new region where it has no stores yet, and the
              market isn't pricing in that growth because it's still tiny relative to GRND's
              existing store base."
            </ExampleBox>
          </StepCard>

          <StepCard number={3} title="Valuation (DCF + comps → price target)">
            <p>
              This is where you prove the thesis with numbers — using a DCF and comps analysis
              to arrive at a price target, then comparing that target to where the stock trades
              today.
            </p>
            <div className="valufin-tool-link-box">Use the full DCF + comps valuation tool below to build this part of your pitch with real data.</div>
            <Button variant="secondary" onClick={() => navigate('/tool')}>Open the DCF + comps valuation tool →</Button>
            <p style={{ marginTop: 10 }}>
              Worth understanding alongside the tool: <strong>EV/EBITDA</strong> and{' '}
              <strong>P/E</strong> multiples, why comps can differ from a DCF, and how to defend
              your WACC and growth assumptions if challenged.
            </p>
            <ExampleBox>
              GRND trades at $40 today. A DCF assuming 12% revenue growth for 5 years implies a
              fair value of $46. Comps (peer coffee chains at 14x EV/EBITDA) imply $50. Blended
              price target: <strong>~$48</strong>, about 20% above today's price.
            </ExampleBox>
          </StepCard>

          <StepCard number={4} title="Catalyst (what makes it happen)">
            <p>
              A catalyst is the specific event that closes the gap between today's price and
              your target — without one, your thesis could be correct but the market might never
              realize it.
            </p>
            <table className="valufin-catalyst-table">
              <tbody>
                <tr><th>Catalyst type</th><th>Example</th></tr>
                <tr><td>Earnings report</td><td>Company beats expectations and raises guidance</td></tr>
                <tr><td>Product launch</td><td>A new product starts generating real revenue</td></tr>
                <tr><td>Regulatory approval</td><td>FDA approves a drug, or a license gets granted</td></tr>
                <tr><td>M&amp;A</td><td>Company gets acquired, or acquires someone else</td></tr>
                <tr><td>Macro event</td><td>Interest rates change, a new law passes</td></tr>
              </tbody>
            </table>
            <ExampleBox>
              GRND's next two quarterly earnings reports should start showing revenue from the
              new region's stores — once investors see those numbers, the growth becomes visible
              instead of theoretical.
            </ExampleBox>
          </StepCard>

          <StepCard number={5} title="Risk (what could go wrong, and why you're not worried)">
            <p>
              Naming risks honestly, then explaining why you're still confident despite them, is
              what separates a credible pitch from a one-sided sales job. Interviewers
              specifically probe this.
            </p>
            <ExampleBox>
              "The new region could underperform if local tastes differ from GRND's home market.
              I'm not too worried because GRND ran a successful pilot of 10 stores there last
              year with strong repeat customer rates before committing to a full rollout."
            </ExampleBox>
          </StepCard>

          <p className="valufin-section-label">A full example, with a real company</p>
          <div className="valufin-intro-card">
            <p>
              The fictional example above is useful for learning each step in isolation. Here's
              the same 5-step framework, but framed exactly how it would actually come up in an
              interview — as a real question, answered the way you'd actually say it out loud,
              using a real, recognizable company: Apple (AAPL).
            </p>
            <p style={{ color: '#9ed8f0', fontSize: 13 }}>
              Numbers below reflect Apple's trailing twelve-month financials and market data as
              of mid-2026. Like any real pitch, the conclusion here is just one reasonable take —
              a different analyst could build an equally defensible case on the other side.
            </p>
          </div>

          <div className="valufin-interview-card">
            <div className="valufin-interview-q">
              <div className="valufin-interview-q-icon">Q</div>
              <div>
                <p className="valufin-interview-q-label">Interviewer asks</p>
                <p className="valufin-interview-q-text">"Walk me through a stock you'd pitch right now."</p>
              </div>
            </div>
            <div className="valufin-interview-a-header">
              <div className="valufin-interview-a-icon">A</div>
              <span className="valufin-interview-a-label">Your answer, step by step</span>
            </div>

            <div className="valufin-interview-step">
              <span className="valufin-interview-step-num">1</span><span className="valufin-interview-step-title">Recommendation</span>
              <p className="valufin-interview-step-body">"I'd go <strong>long Apple</strong>, ticker AAPL. It's trading around <strong>$293</strong> right now, and I think there's modest upside from here."</p>
            </div>

            <div className="valufin-interview-step">
              <span className="valufin-interview-step-num">2</span><span className="valufin-interview-step-title">Thesis</span>
              <p className="valufin-interview-step-body">"Everyone still thinks of Apple as an iPhone company, but the part that's actually growing fast is <strong>services</strong> — App Store, iCloud, Apple Music, that kind of thing. That's high-margin, recurring revenue, and I don't think the market's fully given Apple credit for it yet. On top of that, Apple just announced a chip partnership with Intel, which takes a real risk off the table — they've been way too dependent on overseas chip manufacturing."</p>
            </div>

            <div className="valufin-interview-step">
              <span className="valufin-interview-step-num">3</span><span className="valufin-interview-step-title">Valuation</span>
              <p className="valufin-interview-step-body">"Right now Apple trades at about <strong>35.6 times trailing earnings</strong> and roughly <strong>27 times EBITDA</strong> — that's rich, but it's actually pretty normal for Apple given the brand and how loyal its customers are. Revenue's around <strong>$451 billion</strong> trailing twelve months, with an EBITDA margin near <strong>35%</strong>, so the cash flow is huge and really stable. Street's average price target is about <strong>$314</strong>, which is roughly 7% above where it's trading — so I'm not calling this a huge mispricing, just a real, modest gap."</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => navigate('/tool')}>See how I'd build this in the valuation tool →</Button>

          <div className="valufin-interview-card" style={{ marginTop: 16 }}>
            <div className="valufin-interview-step" style={{ marginTop: 16 }}>
              <span className="valufin-interview-step-num">4</span><span className="valufin-interview-step-title">Catalyst</span>
              <p className="valufin-interview-step-body">"Two things, really. First, that Intel chip partnership — as more details come out about timelines, I think that starts shifting sentiment. Second, Apple's planning to raise prices because of memory chip costs going up. If they pull that off without losing customers, that's a real margin story over the next couple of earnings reports."</p>
            </div>
            <div className="valufin-interview-step">
              <span className="valufin-interview-step-num">5</span><span className="valufin-interview-step-title">Risk</span>
              <p className="valufin-interview-step-body">"Honestly, the biggest risk is that those price increases backfire and people just buy fewer iPhones. I'm not super worried about it, though — Apple's raised prices before and their customers are pretty locked in. But I'd want to watch the next two earnings reports closely before getting more confident."</p>
            </div>
          </div>

          <p className="valufin-caption">
            Apple financial data referenced above (trailing P/E, EV/EBITDA, revenue, margins,
            analyst price target) reflects publicly reported figures as of mid-2026 and will
            change over time — always check current numbers before using them in a real pitch.
          </p>

          <p className="valufin-section-label">Follow-up questions you should expect</p>
          {FOLLOWUPS.map((fu) => (
            <div key={fu.question}>
              <div className="valufin-followup-q">
                <div className="valufin-followup-q-icon">Q</div>
                <p className="valufin-followup-q-text">"{fu.question}"</p>
              </div>
              <div className="valufin-followup-a">
                <div className="valufin-followup-a-icon">A</div>
                <p className="valufin-followup-a-text" dangerouslySetInnerHTML={{ __html: fu.answer }} />
              </div>
              <div className="valufin-why-asked">{fu.whyAsked}</div>
              <Expander title="💬 In simple terms — what do these words mean?">
                {fu.simpleTerms.map(([term, def]) => (
                  <div className="valufin-simple-terms-row" key={term}><strong>{term}:</strong> {def}</div>
                ))}
              </Expander>
              <div style={{ height: 8 }} />
            </div>
          ))}

          <hr className="valufin-hr" />
          <p className="valufin-section-label">🎤 Practice this live</p>
          <h1>Stock pitch practice.</h1>
          <p className="valufin-caption">
            I'll ask you the same 5 questions a real interviewer would, about a real company you
            pick. Answer in your own words — I'll give feedback after each one, then a full
            summary at the end.
          </p>

          {!company ? (
            <>
              <p className="valufin-section-label">Pick a company</p>
              <input
                className="valufin-input"
                type="text"
                placeholder="e.g. AAPL, TSLA, COST"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
              />
              <div style={{ height: 10 }} />
              <Button onClick={handleStart}>{loadingCompany ? 'Loading...' : 'Start practice →'}</Button>
              {setupError && <p style={{ color: '#c77b6f', marginTop: 8 }}>{setupError}</p>}
            </>
          ) : !done ? (
            <>
              <p className="valufin-caption">
                Pitching <strong>{company.companyName} ({company.ticker})</strong> — currently
                trading at ${company.price.toFixed(2)}
              </p>
              <ProgressRow total={5} step={step} />
              <p className="valufin-caption">Step {step + 1} of 5 — {STEP_NAMES[step]}</p>

              {qa.map(([q, a], i) => (
                <div key={i}>
                  <ChatBubble role="ai" label="Interviewer">{q}</ChatBubble>
                  <ChatBubble role="user" label="You">{a}</ChatBubble>
                </div>
              ))}

              <ChatBubble role="ai" label="Interviewer">{currentQuestion || 'Thinking of a question...'}</ChatBubble>

              <textarea
                className="valufin-input"
                style={{ height: 100, resize: 'vertical' }}
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              {feedback === null ? (
                <Button onClick={handleSubmitAnswer}>{busy ? 'Reviewing your answer...' : 'Submit answer'}</Button>
              ) : (
                <>
                  <FeedbackBox>{feedback}</FeedbackBox>
                  <Button onClick={handleNext}>{step < 4 ? 'Next question →' : 'Finish and see summary →'}</Button>
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
                <SummaryCard label={`Your pitch on ${company.companyName} (${company.ticker})`}>{summary}</SummaryCard>
              )}
              <div style={{ height: 12 }} />
              <Button onClick={handlePracticeAnother}>Practice another pitch →</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
