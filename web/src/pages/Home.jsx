import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Topbar from '../components/Topbar';
import { useScrollReveal } from '../lib/useScrollReveal';
import { CATEGORIES } from '../data/categories';
import heroSkyscrapers from '../assets/hero_skyscrapers.png';

function CategoryScene({ index, cat, navigate }) {
  const number = String(index + 1).padStart(3, '0');
  return (
    <div
      className="valufin-scene"
      style={{
        '--scene-image': `url("${cat.image}")`,
        '--scene-tint': cat.tint,
        '--scene-accent': cat.accent,
      }}
      onClick={() => navigate(cat.path)}
      role="button"
      tabIndex={0}
    >
      <div className="valufin-scene-bg scroll-bg" />
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
  const heroContentRef = useRef(null);
  useScrollReveal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroContentRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="valufin-container">
      <div className="valufin-hero">
        <div className="valufin-hero-bg" style={{ '--hero-bg-image': `url("${heroSkyscrapers}")` }} />
        <div className="valufin-hero-overlay" />
        <div className="valufin-hero-topbar">
          <div className="valufin-hero-topbar-inner">
            <Topbar />
          </div>
        </div>
        <div className="valufin-hero-content" ref={heroContentRef}>
          <p className="valufin-hero-brand">
            Valu<span className="valufin-hero-brand-accent">ED</span>
          </p>
          <h1>
            Learn finance.
            <br />
            <span className="accent">Get the offer.</span>
          </h1>
          <span className="valufin-eyebrow">Recruiting prep, explained from scratch</span>
        </div>
        <div className="valufin-hero-scroll-hint">
          <span>Pick a path — scroll</span>
          <i className="ti ti-arrow-down" />
        </div>
      </div>

      {CATEGORIES.map((cat, i) => (
        <CategoryScene key={cat.title} index={i} cat={cat} navigate={navigate} />
      ))}

      <div style={{ height: 8 }} />
      <p className="valufin-caption scroll-element">
        Each topic will eventually have its own hands-on AI tool — DCF valuation is built
        and ready now. Everything else is being built one topic at a time.
      </p>
    </div>
  );
}
