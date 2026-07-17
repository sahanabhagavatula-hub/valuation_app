import { useEffect, useRef, useState } from 'react';
import { FlipText } from './FlipText';
import TickerTape from './TickerTape';

export default function TickerBoard({ message }) {
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
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="valufin-ticker-board" ref={ref}>
      <TickerTape />
      <div className="valufin-ticker-board-message">
        <FlipText text={message} active={active} />
      </div>
    </div>
  );
}
