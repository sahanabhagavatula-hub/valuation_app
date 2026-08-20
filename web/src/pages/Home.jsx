import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TickerTape from '../components/TickerTape';
import SceneMotif from '../components/SceneMotifs';
import ScenePanelMark from '../components/ScenePanelMark';
import { useScrollReveal } from '../lib/useScrollReveal';
import { CATEGORIES } from '../data/categories';

function HeroBackdrop() {
  return (
    <svg className="valufin-terminal-hero-svg" viewBox="0 0 1200 420" preserveAspectRatio="none">
      <polyline
        points="0,340 60,300 120,320 180,250 240,270 300,190 360,220 420,150 480,175 540,110 600,140 660,90 720,120 780,70 840,100 900,60 960,85 1020,40 1080,65 1140,20 1200,45"
        fill="none" stroke="#EDEBE4" strokeWidth="1.6" opacity="0.35"
      />
      <g stroke="#3FBF6F" strokeWidth="5" opacity="0.85">
        <line x1="60" y1="280" x2="60" y2="320" />
        <line x1="180" y1="230" x2="180" y2="270" />
        <line x1="300" y1="170" x2="300" y2="210" />
        <line x1="480" y1="155" x2="480" y2="195" />
        <line x1="720" y1="100" x2="720" y2="140" />
      </g>
      <g stroke="#D9694F" strokeWidth="5" opacity="0.85">
        <line x1="120" y1="300" x2="120" y2="340" />
        <line x1="240" y1="250" x2="240" y2="290" />
        <line x1="420" y1="130" x2="420" y2="170" />
        <line x1="600" y1="120" x2="600" y2="160" />
        <line x1="840" y1="80" x2="840" y2="120" />
      </g>
    </svg>
  );
}

function CategoryScene({ cat, navigate }) {
  return (
    <div
      className="valufin-scene"
      style={{ '--scene-image': `url("${cat.image}")` }}
      onClick={() => navigate(cat.path)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(cat.path);
        }
      }}
    >
      <div className="valufin-scene-photo" />
      <div className="valufin-scene-bg scroll-bg">
        <SceneMotif type={cat.bgMotif} />
      </div>
      <div className="valufin-scene-atmosphere" />
      <div className="valufin-scene-content scroll-element">
        <div className="valufin-scene-panel">
          <h2 className="valufin-scene-title">{cat.title}</h2>
          <p className="valufin-scene-desc">{cat.description}</p>
          <p className="valufin-scene-enter">Begin →</p>
          <ScenePanelMark type={cat.cardMark} seed={cat.title} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  useScrollReveal();

  useEffect(() => {
    document.documentElement.classList.add('valufin-home-snap');
    return () => document.documentElement.classList.remove('valufin-home-snap');
  }, []);

  return (
    <div className="valufin-container">

      <div className="valufin-terminal-hero">
        <HeroBackdrop />
        <div className="valufin-terminal-hero-main">
          <div className="valufin-terminal-hero-content">
            <h1 className="valufin-terminal-hero-title valufin-terminal-hero-title--no-eyebrow">
              Learn finance.
              <br />
              Get the offer.
            </h1>
            <p className="valufin-terminal-hero-sub">
              REAL FINANCIAL MODELING · CASE INTERVIEW PREP · AI-POWERED FEEDBACK · ZERO EXPERIENCE NEEDED
            </p>
          </div>
        </div>

        <TickerTape className="valufin-hero-ticker" />
      </div>

      <div id="paths">
        {CATEGORIES.map((cat) => (
          <CategoryScene key={cat.title} cat={cat} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}
