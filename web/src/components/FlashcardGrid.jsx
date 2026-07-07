import { useState } from 'react';

export default function FlashcardGrid({ cards }) {
  const [flipped, setFlipped] = useState({});

  const toggle = (i) => setFlipped((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="valufin-card-grid">
      {cards.map((c, i) => (
        <div
          key={c.term}
          className={`valufin-flip-card${flipped[i] ? ' flipped' : ''}`}
          onClick={() => toggle(i)}
        >
          <div className="valufin-flip-card-inner">
            <div className="valufin-flip-face valufin-flip-front">
              <div className="icon">
                <i className={`ti ti-${c.icon}`} />
              </div>
              <p className="term">{c.term}</p>
              <p className="tap-hint">Tap to flip</p>
            </div>
            <div className="valufin-flip-face valufin-flip-back">
              <p className="def-label">Definition</p>
              <p className="def-text" dangerouslySetInnerHTML={{ __html: c.definition }} />
              <p className="ex-label">Example</p>
              <p className="ex-text" dangerouslySetInnerHTML={{ __html: c.example }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
