export default function StepPill({ number, label }) {
  return (
    <div className="valufin-step-pill">
      <span className="valufin-step-num">{number}</span>
      <span className="valufin-step-label">{label}</span>
    </div>
  );
}
