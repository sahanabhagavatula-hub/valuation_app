import { Link } from 'react-router-dom';

// items: [{ label, path? }, ...] — items with a path are clickable, the rest (usually the last) are plain text.
export default function Breadcrumb({ items }) {
  return (
    <nav className="valufin-breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span className="valufin-breadcrumb-item" key={`${item.label}-${i}`}>
          {i > 0 && <span className="valufin-breadcrumb-sep">/</span>}
          {item.path ? (
            <Link to={item.path} className="valufin-breadcrumb-link">{item.label}</Link>
          ) : item.onClick ? (
            <button className="valufin-breadcrumb-link" onClick={item.onClick}>{item.label}</button>
          ) : (
            <span className="valufin-breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
