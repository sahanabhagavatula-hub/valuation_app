import { useState } from 'react';

export default function ConceptFlipCard({ icon, heading, children }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`valufin-flip-card valufin-concept-flip${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="valufin-flip-card-inner">
        <div className="valufin-flip-face valufin-concept-flip-front">
          <div className="icon"><i className={`ti ti-${icon}`} /></div>
          <p className="valufin-concept-flip-heading">{heading}</p>
          <p className="tap-hint">Tap to flip</p>
        </div>
        <div className="valufin-flip-face valufin-concept-flip-back">
          <div className="valufin-concept-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
