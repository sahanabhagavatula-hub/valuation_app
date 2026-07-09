import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { Button } from '../components/Widgets';
import { Modal } from '../components/Curriculum';
import { FRAMEWORKS } from '../data/frameworks';

const COFFEE_EXAMPLE = {
  root: {
    label: 'Why did profit decline?',
    scenario: '"BrewCo, a 200-store coffee chain, saw profit fall 15% year-over-year. Your interviewer asks you to figure out why."',
    utilize: 'You state your structure out loud before asking for any data: "I\'d like to break this into revenue and costs to see which side is driving the decline." Structuring before diving in is the whole point of the framework.',
  },
  revenueDeclined: {
    label: 'Revenue declined',
    scenario: 'You ask the interviewer: "Did revenue or costs change?" They tell you revenue was actually flat — this branch turns out to be a dead end.',
    utilize: 'Asking about this branch first is what lets you confidently rule out "fewer customers" or "lower prices" before pointing at costs — you need the elimination, not just the answer.',
  },
  costsIncreased: {
    label: 'Costs increased',
    scenario: 'You\'re told costs rose 22% — this is the branch with the real signal, so you expand it next.',
    utilize: 'Say it out loud: "Since revenue is flat, the entire profit decline must be coming from the cost side — let me split costs into fixed and variable to narrow it down."',
  },
  price: {
    label: 'Price ↓',
    scenario: 'You ask if BrewCo discounted drinks or ran promotions. Told: average price per drink was unchanged.',
    utilize: 'Ruling this out confirms the decline isn\'t self-inflicted through pricing — worth stating explicitly so the interviewer sees you considered it.',
  },
  volume: {
    label: 'Volume ↓',
    scenario: 'You ask if foot traffic or units sold per store dropped. Told: transactions per store were flat too.',
    utilize: 'With both price and volume flat, you can say revenue overall was steady with confidence — which is exactly what points you toward costs.',
  },
  fixed: {
    label: 'Fixed ↑',
    scenario: 'You ask about rent, salaries, and equipment leases. Told: all unchanged from last year.',
    utilize: 'Ruling out fixed costs narrows the case down to variable costs — the last branch left.',
  },
  variable: {
    label: 'Variable ↑ (real answer)',
    scenario: 'You ask about materials, hourly labor, and shipping. Told: a global coffee bean shortage spiked BrewCo\'s per-cup ingredient cost by 30%.',
    utilize: 'This is your answer: "Profit fell because a bean shortage drove up variable costs — not lost customers or discounting." From here you\'d recommend hedging bean contracts, renegotiating with suppliers, or passing part of the cost through in menu pricing.',
  },
};

function ProfitabilityDetail() {
  const [showWhySplit, setShowWhySplit] = useState(false);
  const [showTreeInfo, setShowTreeInfo] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  return (
    <>
      <span className="valufin-eyebrow">Consulting · Must know</span>
      <h1 className="valufin-outline-heading">Profitability Framework.</h1>
      <p className="valufin-caption" style={{ textAlign: 'center' }}>When: "Profits/margins declined" or "should we improve profitability"</p>

      <div className="valufin-formula-box">Profit = Revenue − Costs</div>

      <div className="valufin-eq-connector">
        <div className="valufin-eq-stem-left" />
        <div className="valufin-eq-stem-right" />
      </div>

      <div className="valufin-eq-branches">
        <div className="valufin-eq-branch">
          <p className="valufin-eq-branch-title">Revenue = Price × Volume</p>
          <p className="valufin-eq-branch-notes">
            Did price change? (discounts, increases, mix shift to cheaper products)
            <br />
            Did volume change? (fewer customers, fewer units per customer, lost market share, shrinking market)
          </p>
        </div>
        <div className="valufin-eq-branch">
          <p className="valufin-eq-branch-title">Costs = Fixed + Variable</p>
          <p className="valufin-eq-branch-notes">
            Fixed: rent, salaries, equipment — don't scale with sales volume
            <br />
            Variable: materials, hourly labor, shipping — scale directly with volume
          </p>
        </div>
      </div>

      <button className="valufin-info-trigger" onClick={() => setShowWhySplit(true)}>
        <span className="valufin-info-trigger-icon">?</span>
        Why this split, specifically?
      </button>

      {showWhySplit && (
        <Modal title="Why this split, specifically?" onClose={() => setShowWhySplit(false)}>
          <p style={{ fontSize: 14, color: '#c7c0b0', lineHeight: 1.7, fontWeight: 300 }}>
            Profit only has two mathematical inputs — revenue and cost — so this top-level split is
            automatically MECE; there's no third lever. The second-level splits (price/volume,
            fixed/variable) are chosen because they're the natural, non-overlapping ways each side
            actually moves. You could go further (e.g. splitting volume into new vs. returning
            customers), but only once the data tells you that's where the real answer lives — going
            deep everywhere wastes interview time and makes you sound like you're reciting a
            memorized list instead of actually thinking.
          </p>
        </Modal>
      )}

      <div className="valufin-tree-section-header">
        <p className="valufin-tree-section-title">Apply the issue tree</p>
        <button className="valufin-info-trigger" onClick={() => setShowTreeInfo(true)}>
          <span className="valufin-info-trigger-icon">?</span>
          What is this?
        </button>
      </div>

      {showTreeInfo && (
        <Modal title="Apply the issue tree" onClose={() => setShowTreeInfo(false)}>
          <p style={{ fontSize: 14, color: '#c7c0b0', lineHeight: 1.7, fontWeight: 300 }}>
            Notice the tree isn't built all at once — you state the top split out loud, ask for data,
            and only expand the branch the data points you toward. The other branches stay unexplored
            because they turned out to be dead ends, not because you forgot about them.
          </p>
        </Modal>
      )}

      <p className="valufin-caption" style={{ marginTop: -6 }}>
        Worked example: <strong style={{ color: '#e0d4c2' }}>BrewCo, a coffee chain, profit down 15%.</strong> Tap
        any node below to see how it plays out in this scenario.
      </p>

      <div className="valufin-big-tree">
        <div className="valufin-big-tree-root">
          <div className="valufin-big-tree-root-node" onClick={() => setActiveNode('root')}>Why did profit decline?</div>
        </div>

        <div className="valufin-big-tree-connector">
          <div className="valufin-big-tree-stem-left" />
          <div className="valufin-big-tree-stem-right" />
        </div>

        <div className="valufin-big-tree-branches">
          <div className="valufin-big-tree-branch">
            <div className="valufin-big-tree-node-2" onClick={() => setActiveNode('revenueDeclined')}>Revenue declined</div>
            <div className="valufin-big-tree-connector">
              <div className="valufin-big-tree-stem-left" />
              <div className="valufin-big-tree-stem-right" />
            </div>
            <div className="valufin-big-tree-leaves">
              <div className="valufin-big-tree-node-3" onClick={() => setActiveNode('price')}>Price ↓</div>
              <div className="valufin-big-tree-node-3" onClick={() => setActiveNode('volume')}>Volume ↓</div>
            </div>
          </div>
          <div className="valufin-big-tree-branch">
            <div className="valufin-big-tree-node-2" onClick={() => setActiveNode('costsIncreased')}>Costs increased</div>
            <div className="valufin-big-tree-connector">
              <div className="valufin-big-tree-stem-left" />
              <div className="valufin-big-tree-stem-right" />
            </div>
            <div className="valufin-big-tree-leaves">
              <div className="valufin-big-tree-node-3" onClick={() => setActiveNode('fixed')}>Fixed ↑</div>
              <div className="valufin-big-tree-node-3 highlight" onClick={() => setActiveNode('variable')}>Variable ↑ (real answer)</div>
            </div>
          </div>
        </div>
      </div>

      {activeNode && (
        <Modal title={COFFEE_EXAMPLE[activeNode].label} onClose={() => setActiveNode(null)}>
          <p style={{ fontSize: 12, color: '#d6ab7b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: '0 0 6px' }}>
            In this scenario
          </p>
          <p style={{ fontSize: 14, color: '#c7c0b0', lineHeight: 1.7, fontWeight: 300, margin: '0 0 16px' }}>
            {COFFEE_EXAMPLE[activeNode].scenario}
          </p>
          <p style={{ fontSize: 12, color: '#d6ab7b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: '0 0 6px' }}>
            How to use it
          </p>
          <p style={{ fontSize: 14, color: '#c7c0b0', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
            {COFFEE_EXAMPLE[activeNode].utilize}
          </p>
        </Modal>
      )}
    </>
  );
}

function PorterDetail() {
  return (
    <>
      <span className="valufin-eyebrow">Consulting · Good to have</span>
      <h1>Porter's 5 Forces.</h1>
      <div className="valufin-intro-card">
        <p style={{ margin: 0 }}>
          A framework for assessing how attractive an <strong>industry</strong> is — not one
          specific company, but the whole competitive environment it operates in. Often used
          inside a Market Entry case to judge "is this industry even worth entering?"
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="valufin-porter-force">
            <p className="valufin-porter-force-title">Competitive Rivalry</p>
            <p className="valufin-porter-force-body">How intense is competition among existing players? Many similar competitors usually means lower profits for everyone.</p>
          </div>
          <div className="valufin-porter-force">
            <p className="valufin-porter-force-title">Bargaining Power of Suppliers</p>
            <p className="valufin-porter-force-body">Can suppliers raise prices on you? Few suppliers, hard to switch between them, means they have leverage over you.</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="valufin-porter-force">
            <p className="valufin-porter-force-title">Threat of New Entrants</p>
            <p className="valufin-porter-force-body">How easy is it for a new competitor to enter? Low barriers to entry usually means more competition shows up over time.</p>
          </div>
          <div className="valufin-porter-force">
            <p className="valufin-porter-force-title">Bargaining Power of Buyers</p>
            <p className="valufin-porter-force-body">Can customers demand lower prices? Few big customers who can easily switch elsewhere means they have leverage over you.</p>
          </div>
        </div>
      </div>

      <div style={{ height: 10 }} />
      <div className="valufin-porter-force">
        <p className="valufin-porter-force-title">Threat of Substitutes</p>
        <p className="valufin-porter-force-body">
          Is there a different kind of product that solves the same underlying need? (For
          example, video calls substituting for business travel.) Easy substitution caps how much
          you can realistically charge, regardless of how few direct competitors you have.
        </p>
      </div>
    </>
  );
}

function GenericFrameworkDetail({ fw }) {
  return (
    <>
      <span className="valufin-eyebrow">Consulting · Framework</span>
      <h1>{fw.title}.</h1>
      <p className="valufin-caption">When: "{fw.when}"</p>

      <p className="valufin-section-label">The buckets</p>
      <div className="valufin-intro-card">
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          {fw.buckets.map(([name, desc]) => (
            <li key={name} style={{ marginBottom: 10, fontSize: 14, color: '#c7c0b0', lineHeight: 1.6 }}>
              <strong style={{ color: '#ffffff' }}>{name}</strong> — {desc}
            </li>
          ))}
        </ul>
      </div>

      <p className="valufin-section-label">How to frame your thoughts</p>
      <div className="valufin-deep-dive">
        <p className="valufin-deep-dive-body">{fw.framing}</p>
      </div>

      <p className="valufin-section-label">Issue tree</p>
      <div className="valufin-tree-container">
        <div className="valufin-tree-level-1"><div className="valufin-tree-node">{fw.when}</div></div>
        <div className="valufin-tree-level-3">
          {fw.tree.map((node) => <div className="valufin-tree-node-sub" key={node}>{node}</div>)}
        </div>
      </div>

      <p className="valufin-section-label">Worked example</p>
      <div className="valufin-example-walkthrough">
        <p style={{ fontSize: 14, color: '#e0d4c2', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{fw.example}</p>
      </div>
    </>
  );
}

export default function FrameworkDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  let content;
  if (slug === 'profitability') {
    content = <ProfitabilityDetail />;
  } else if (slug === 'porter') {
    content = <PorterDetail />;
  } else {
    const fw = FRAMEWORKS.find((f) => f.slug === slug);
    content = fw ? <GenericFrameworkDetail fw={fw} /> : <p>Framework not found.</p>;
  }

  return (
    <div className="valufin-container">
      <Topbar />
      <Button variant="secondary" onClick={() => navigate('/frameworks')}>←  Back to Frameworks</Button>
      {content}
    </div>
  );
}
