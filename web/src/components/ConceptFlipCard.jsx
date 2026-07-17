import { useState } from 'react';

export default function ConceptFlipCard({ heading, image, children }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`valufin-flip-card valufin-concept-flip${flipped ? ' flipped' : ''}`}
      style={image ? { '--concept-image': `url("${image}")` } : undefined}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="valufin-flip-card-inner">
        <div className="valufin-flip-face valufin-concept-flip-front">
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
