import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { CategoryCard } from '../components/Curriculum';
import { Button } from '../components/Widgets';
import heroSkyscrapers from '../assets/hero_skyscrapers.png';

const CATEGORIES = [
  {
    icon: 'building-bank',
    title: 'Investment Banking',
    description: 'M&A process, pitch books, live deal modeling, DCF, and comps.',
    path: '/ib',
  },
  {
    icon: 'chart-candle',
    title: 'Private Equity / Hedge Funds',
    description: 'Stock pitches, LBO modeling, comps analysis, and buy-side thinking.',
    path: '/pe-hf',
  },
  {
    icon: 'briefcase',
    title: 'Wealth & Asset Management',
    description: 'Portfolio construction, client communication, and investment philosophy.',
    path: '/wam',
  },
  {
    icon: 'bulb',
    title: 'Consulting',
    description: 'Case interviews, frameworks, market sizing, and slide storytelling.',
    path: '/consulting',
  },
  {
    icon: 'building-skyscraper',
    title: 'General Business / Corporate Finance',
    description: 'Financial statements, key metrics, Excel modeling, and capital structure.',
    path: '/corp-finance',
  },
  {
    icon: 'users',
    title: 'Universal — every interview',
    description: 'Behavioral stories, "why this firm," current events, and networking.',
    path: '/universal',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="valufin-container">
      <Topbar />

      <div className="valufin-hero">
        <div className="valufin-hero-bg" style={{ '--hero-bg-image': `url(${heroSkyscrapers})` }} />
        <div className="valufin-hero-overlay" />
        <div className="valufin-hero-content">
          <span className="valufin-eyebrow">Recruiting prep, explained from scratch</span>
          <h1>
            Learn finance.
            <br />
            <span className="accent">Get the offer.</span>
          </h1>
          <p className="valufin-hero-sub">
            ValuED teaches the skills real finance and consulting recruiting actually
            tests — valuation, modeling, case interviews, and more — with hands-on AI
            tools built in as you go.
          </p>
        </div>
      </div>

      <div style={{ height: 12 }} />

      <p className="valufin-section-label">Pick a path</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CategoryCard icon={cat.icon} title={cat.title} description={cat.description} />
            <Button onClick={() => navigate(cat.path)}>Explore →</Button>
          </div>
        ))}
      </div>

      <div style={{ height: 16 }} />
      <p className="valufin-caption">
        Each topic will eventually have its own hands-on AI tool — DCF valuation is built
        and ready now. Everything else is being built one topic at a time.
      </p>
    </div>
  );
}
