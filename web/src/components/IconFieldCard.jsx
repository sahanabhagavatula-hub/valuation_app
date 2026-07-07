export default function IconFieldCard({
  icon,
  label,
  value,
  barPct = null,
  barColor = '#3d6b66',
  barCaption = '',
  barCaptionColor = '#6b9b94',
}) {
  return (
    <div className="valufin-icon-card">
      <div className="valufin-icon-card-top">
        <div className="valufin-field-icon">
          <i className={`ti ti-${icon}`} />
        </div>
        <span className="valufin-field-label">{label}</span>
      </div>
      <p className="valufin-field-value">{value}</p>
      {barPct !== null && (
        <>
          <div className="valufin-bar-track">
            <div className="valufin-bar-fill" style={{ width: `${barPct}%`, background: barColor }} />
          </div>
          <p className="valufin-bar-caption" style={{ color: barCaptionColor }}>{barCaption}</p>
        </>
      )}
    </div>
  );
}
