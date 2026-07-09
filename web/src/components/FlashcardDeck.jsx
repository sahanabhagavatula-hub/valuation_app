import { useState } from 'react';

export default function FlashcardDeck({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[index];

  function go(delta) {
    setFlipped(false);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  }

  return (
    <div className="valufin-deck">
      <div
        className={`valufin-flip-card valufin-deck-card${flipped ? ' flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="valufin-flip-card-inner">
          <div className="valufin-flip-face valufin-flip-front">
            <div className="icon"><i className={`ti ti-${card.icon}`} /></div>
            <p className="term">{card.term}</p>
            <p className="tap-hint">Tap to flip</p>
          </div>
          <div className="valufin-flip-face valufin-flip-back">
            <p className="def-label">Definition</p>
            <p className="def-text" dangerouslySetInnerHTML={{ __html: card.definition }} />
            <p className="ex-label">Example</p>
            <p className="ex-text" dangerouslySetInnerHTML={{ __html: card.example }} />
          </div>
        </div>
      </div>

      <div className="valufin-deck-controls">
        <button
          className="valufin-deck-nav"
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          aria-label="Previous card"
        >
          <i className="ti ti-chevron-left" />
        </button>
        <p className="valufin-deck-counter">{index + 1} / {cards.length}</p>
        <button
          className="valufin-deck-nav"
          onClick={(e) => { e.stopPropagation(); go(1); }}
          aria-label="Next card"
        >
          <i className="ti ti-chevron-right" />
        </button>
      </div>
    </div>
  );
}
