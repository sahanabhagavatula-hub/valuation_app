import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import TickerBoard from '../components/TickerBoard';
import SceneMotif from '../components/SceneMotifs';
import { useScrollReveal } from '../lib/useScrollReveal';
import { CATEGORIES } from '../data/categories';

function HeroBackdrop() {
  return (
    <svg className="valufin-terminal-hero-svg" viewBox="0 0 1200 420" preserveAspectRatio="none">
      <polyline
        points="0,340 60,300 120,320 180,250 240,270 300,190 360,220 420,150 480,175 540,110 600,140 660,90 720,120 780,70 840,100 900,60 960,85 1020,40 1080,65 1140,20 1200,45"
        fill="none" stroke="#3FBF6F" strokeWidth="2" opacity="0.55"
      />
      <g stroke="#3FBF6F" strokeWidth="6" opacity="0.4">
        <line x1="60" y1="280" x2="60" y2="320" />
        <line x1="180" y1="230" x2="180" y2="270" />
        <line x1="300" y1="170" x2="300" y2="210" />
        <line x1="480" y1="155" x2="480" y2="195" />
        <line x1="720" y1="100" x2="720" y2="140" />
      </g>
      <g stroke="#D9694F" strokeWidth="6" opacity="0.4">
        <line x1="120" y1="300" x2="120" y2="340" />
        <line x1="240" y1="250" x2="240" y2="290" />
        <line x1="420" y1="130" x2="420" y2="170" />
        <line x1="600" y1="120" x2="600" y2="160" />
        <line x1="840" y1="80" x2="840" y2="120" />
      </g>
    </svg>
  );
}

function CategoryScene({ index, cat, navigate }) {
  const number = String(index + 1).padStart(3, '0');
  return (
    <div
      className="valufin-scene"
      style={{
        '--scene-tint': cat.tint,
        '--scene-accent': cat.accent,
      }}
      onClick={() => navigate(cat.path)}
      role="button"
      tabIndex={0}
    >
      <div className="valufin-scene-bg scroll-bg">
        <SceneMotif type={cat.bgMotif} />
      </div>
      <div className="valufin-scene-overlay" />
      <div className="valufin-scene-scanlines" />
      <div className="valufin-scene-content scroll-element">
        <p className="valufin-scene-number">
          [ {number} / {cat.code.toUpperCase()} ]
        </p>
        <h2 className="valufin-scene-title">{cat.title}</h2>
        <p className="valufin-scene-desc">{cat.description}</p>
        <p className="valufin-scene-enter">ENTER →</p>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  useScrollReveal();

  return (
    <div className="valufin-container">
      <Topbar />

      <div className="valufin-terminal-hero">
        <HeroBackdrop />
        <div className="valufin-terminal-hero-content">
          <h1 className="valufin-terminal-hero-title valufin-terminal-hero-title--no-eyebrow">
            Learn finance.
            <br />
            <span className="accent">Get the offer.</span>
          </h1>
        </div>

        <TickerBoard message="REAL FINANCIAL MODELING · CASE INTERVIEW PREP · AI-POWERED FEEDBACK · ZERO EXPERIENCE NEEDED" />

        <div className="valufin-hero-scroll-hint-static">
          <span>Pick a path — scroll</span>
          <i className="ti ti-arrow-down" />
        </div>
      </div>

      <div id="paths">
        {CATEGORIES.map((cat, i) => (
          <CategoryScene key={cat.title} index={i} cat={cat} navigate={navigate} />
        ))}
      </div>

      <div style={{ height: 8 }} />
      <p className="valufin-caption scroll-element">
        Each topic will eventually have its own hands-on AI tool — DCF valuation is built
        and ready now. Everything else is being built one topic at a time.
      </p>
    </div>
  );
}
