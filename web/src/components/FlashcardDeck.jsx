import { useState } from 'react';

export default function FlashcardDeck({ cards, coverTitle }) {
  const hasCover = Boolean(coverTitle);
  const [index, setIndex] = useState(hasCover ? -1 : 0);
  const [flipped, setFlipped] = useState(false);

  const onCover = hasCover && index === -1;
  const card = onCover ? null : cards[index];

  function go(delta) {
    setFlipped(false);
    setIndex((i) => {
      const min = hasCover ? -1 : 0;
      let next = i + delta;
      if (next < min) next = cards.length - 1;
      if (next >= cards.length) next = min;
      return next;
    });
  }

  return (
    <div className="valufin-deck">
      <div
        className={`valufin-flip-card valufin-deck-card${flipped ? ' flipped' : ''}${onCover ? ' valufin-deck-cover' : ''}`}
        onClick={() => !onCover && setFlipped((f) => !f)}
      >
        <div className="valufin-flip-card-inner">
          <div className="valufin-flip-face valufin-flip-front">
            {onCover ? (
              <>
                <p className="valufin-deck-cover-title">{coverTitle}</p>
                <p className="tap-hint">Press → to begin</p>
              </>
            ) : (
              <>
                <div className="icon"><i className={`ti ti-${card.icon}`} /></div>
                <p className="term">{card.term}</p>
                <p className="tap-hint">Tap to flip</p>
              </>
            )}
          </div>
          <div className="valufin-flip-face valufin-flip-back">
            {!onCover && (
              <>
                <p className="def-label">Definition</p>
                <p className="def-text" dangerouslySetInnerHTML={{ __html: card.definition }} />
                <p className="ex-label">Example</p>
                <p className="ex-text" dangerouslySetInnerHTML={{ __html: card.example }} />
              </>
            )}
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
        <p className="valufin-deck-counter">{onCover ? 'Start' : `${index + 1} / ${cards.length}`}</p>
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
