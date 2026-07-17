import { useEffect, useRef, useState } from 'react';

const FLIP_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$%+-';

function scrambledChar() {
  return FLIP_CHARS[Math.floor(Math.random() * FLIP_CHARS.length)];
}

export function FlipText({ text, active }) {
  const [display, setDisplay] = useState(() => text.split('').map(() => ' ').join(''));
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!active || hasPlayed.current) return;
    hasPlayed.current = true;
    const chars = text.split('');
    let frame = 0;
    const maxFrame = chars.length * 0.55 + 14;
    const id = setInterval(() => {
      frame += 1;
      setDisplay(
        chars
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            const settleAt = 5 + i * 0.55;
            return frame >= settleAt ? ch : scrambledChar();
          })
          .join('')
      );
      if (frame >= maxFrame) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [active, text]);

  return <>{display}</>;
}

// Self-contained version: watches its own scroll position and triggers the
// ticker-board-style flip/scramble reveal once it enters the viewport.
export default function FlipReveal({ text, className, threshold = 0.6 }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      <FlipText text={text} active={active} />
    </span>
  );
}
