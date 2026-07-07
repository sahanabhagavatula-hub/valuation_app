export function Metric({ label, value }) {
  return (
    <div className="valufin-metric">
      <div className="valufin-metric-label">{label}</div>
      <div className="valufin-metric-value">{value}</div>
    </div>
  );
}

export function Button({ children, onClick, variant = 'primary', type = 'button' }) {
  return (
    <button
      type={type}
      className={variant === 'primary' ? 'valufin-btn' : 'valufin-btn valufin-btn-secondary'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Expander({ title, children, defaultOpen = false }) {
  return (
    <details className="valufin-expander" open={defaultOpen}>
      <summary>{title}</summary>
      <div className="valufin-expander-body">{children}</div>
    </details>
  );
}

export function TextField({ label, value, onChange, placeholder, help }) {
  return (
    <div className="valufin-field">
      {label && <label className="valufin-field-label-text">{label}</label>}
      <input
        className="valufin-input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        title={help}
      />
    </div>
  );
}

export function PasswordField({ label, value, onChange, help }) {
  return (
    <div className="valufin-field">
      {label && <label className="valufin-field-label-text">{label}</label>}
      <input
        className="valufin-input"
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        title={help}
        autoComplete="off"
        data-1p-ignore
        data-lpignore="true"
      />
      {help && <p className="valufin-bar-caption" style={{ color: '#8e8675' }}>{help}</p>}
    </div>
  );
}

export function NumberField({ label, value, onChange, step = 1 }) {
  return (
    <div className="valufin-field">
      {label && <label className="valufin-field-label-text">{label}</label>}
      <input
        className="valufin-input-number"
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      />
    </div>
  );
}

export function Slider({ label, value, onChange, min, max, step, help, format }) {
  return (
    <div className="valufin-slider-wrap">
      {label && <label className="valufin-field-label-text" title={help}>{label}</label>}
      <input
        className="valufin-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <div className="valufin-slider-value">{format ? format(value) : value}</div>
    </div>
  );
}
