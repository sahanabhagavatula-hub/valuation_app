function barsFromSeed(seed, count = 36) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Array.from({ length: count }, (_, i) => {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const n = ((h >>> 0) % 1000) / 1000;
    const wave = 0.5 + 0.5 * Math.sin(i * 0.33 + (seed.length % 7));
    return 0.16 + n * 0.55 + wave * 0.28;
  });
}

export default function Sparkline({ seed = 'valued', className = '' }) {
  const bars = barsFromSeed(String(seed));
  return (
    <div className={`valufin-sparkline ${className}`} aria-hidden="true">
      {bars.map((t, i) => (
        <span key={i} style={{ height: `${Math.min(1, t) * 100}%` }} />
      ))}
    </div>
  );
}
