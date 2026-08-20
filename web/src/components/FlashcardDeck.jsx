import { useState } from 'react';

function DeckCard({ onCover, coverTitle, card, flipped, onFlip, className = '', onAnimationEnd }) {
  return (
    <div
      className={`valufin-flip-card valufin-deck-card${flipped ? ' flipped' : ''}${onCover ? ' valufin-deck-cover' : ''}${className ? ` ${className}` : ''}`}
      onClick={() => !onCover && onFlip?.()}
      onAnimationEnd={onAnimationEnd}
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
          {!onCover && card && (
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
  );
}

export default function FlashcardDeck({ cards, coverTitle }) {
  const hasCover = Boolean(coverTitle);
  const [index, setIndex] = useState(hasCover ? -1 : 0);
  const [flipped, setFlipped] = useState(false);
  const [exit, setExit] = useState(null);
  const [shuffleDir, setShuffleDir] = useState(0);
  const [enterDir, setEnterDir] = useState(0);
  const [busy, setBusy] = useState(false);

  const onCover = hasCover && index === -1;
  const card = onCover ? null : cards[index];

  function go(delta) {
    if (busy) return;
    const dir = delta > 0 ? 1 : -1;
    setBusy(true);
    setExit({
      onCover,
      card,
      flipped,
      dir,
    });
    setFlipped(false);
    setShuffleDir(dir);
    setEnterDir(dir);
    setIndex((i) => {
      const min = hasCover ? -1 : 0;
      let next = i + delta;
      if (next < min) next = cards.length - 1;
      if (next >= cards.length) next = min;
      return next;
    });
    window.setTimeout(finishExit, 460);
  }

  function finishExit() {
    setExit(null);
    setShuffleDir(0);
    setBusy(false);
  }

  return (
    <div className="valufin-deck" data-shuffle={shuffleDir === 1 ? 'next' : shuffleDir === -1 ? 'prev' : undefined}>
      <div className="valufin-deck-stage">
        <div className="valufin-deck-sheet valufin-deck-sheet-a" aria-hidden="true" />
        <div className="valufin-deck-sheet valufin-deck-sheet-b" aria-hidden="true" />

        <DeckCard
          key={`in-${index}`}
          onCover={onCover}
          coverTitle={coverTitle}
          card={card}
          flipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          className={enterDir === 1 ? 'valufin-deck-enter-next' : enterDir === -1 ? 'valufin-deck-enter-prev' : ''}
        />

        {exit && (
          <DeckCard
            onCover={exit.onCover}
            coverTitle={coverTitle}
            card={exit.card}
            flipped={exit.flipped}
            className={exit.dir === 1 ? 'valufin-deck-exit valufin-deck-exit-next' : 'valufin-deck-exit valufin-deck-exit-prev'}
            onAnimationEnd={finishExit}
          />
        )}
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
