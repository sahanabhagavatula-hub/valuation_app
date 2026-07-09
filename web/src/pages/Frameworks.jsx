import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { Button } from '../components/Widgets';
import { FRAMEWORKS } from '../data/frameworks';

export default function Frameworks() {
  const navigate = useNavigate();

  return (
    <div className="valufin-container">
      <Topbar />
      <Button variant="secondary" onClick={() => navigate('/consulting')}>←  Back to Consulting</Button>

      <span className="valufin-eyebrow">Consulting · Must know</span>
      <h1>Frameworks.</h1>

      <div className="valufin-intro-card">
        <p>
          Case interview frameworks are pre-built mental checklists for breaking down a business
          problem. You don't need to memorize all of them perfectly — you need to understand the{' '}
          <strong>logic</strong> well enough to build the right structure live, on the spot, for
          whatever specific case you're given.
        </p>
      </div>

      <p className="valufin-section-label">MECE thinking — the rule behind every framework</p>
      <div className="valufin-intro-card">
        <p style={{ marginBottom: 10 }}>
          Every framework on this page is really just a <strong>MECE</strong> breakdown of a
          question — <strong>M</strong>utually <strong>E</strong>xclusive, <strong>C</strong>ollectively{' '}
          <strong>E</strong>xhaustive. A good tree has branches that don't overlap and, together,
          cover the whole question — nothing double-counted, nothing missing.
        </p>
      </div>

      <div className="valufin-mece-row">
        <div className="valufin-mece-box">
          <p className="valufin-mece-box-title">Mutually Exclusive</p>
          <p className="valufin-mece-box-body">
            Your branches don't overlap. If "price" and "discounts" are both branches, that's a
            problem — discounts ARE a price issue, so they'd double-count the same cause.
          </p>
        </div>
        <div className="valufin-mece-box">
          <p className="valufin-mece-box-title">Collectively Exhaustive</p>
          <p className="valufin-mece-box-body">
            Your branches cover everything. If you only check "fewer customers" but profit could
            also drop from lower prices, you've left a real possibility unchecked.
          </p>
        </div>
      </div>

      <p className="valufin-section-label">The framework you'll use most — tap for the full breakdown</p>
      <div
        className="valufin-featured-framework"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/frameworks/profitability')}
      >
        <span className="valufin-featured-badge">Most prevalent — start here</span>
        <p className="valufin-featured-title">1. Profitability Framework</p>
        <p className="valufin-featured-when">When: "Profits/margins declined" or "should we improve profitability"</p>
        <div className="valufin-formula-box">Profit = Revenue − Costs</div>
        <Button onClick={() => navigate('/frameworks/profitability')}>See the full breakdown →</Button>
      </div>

      <p className="valufin-section-label">Other case frameworks — tap any one for a full breakdown</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {FRAMEWORKS.map((fw) => (
          <div key={fw.slug} className="valufin-fw-tap-card" onClick={() => navigate(`/frameworks/${fw.slug}`)}>
            <p className="valufin-fw-tap-title">{fw.title}</p>
            <p className="valufin-fw-tap-when">"{fw.when}"</p>
          </div>
        ))}
      </div>

      <p className="valufin-section-label">Industry-level lens — tap for the full breakdown</p>
      <div className="valufin-fw-tap-card" onClick={() => navigate('/frameworks/porter')}>
        <p className="valufin-fw-tap-title">Porter's 5 Forces</p>
        <p className="valufin-fw-tap-when">"How attractive is this industry to compete in?"</p>
      </div>
    </div>
  );
}
