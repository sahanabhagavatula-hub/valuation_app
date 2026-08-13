import { Link, NavLink } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';

const NAV_LABELS = {
  '/ib': 'IB',
  '/pe-hf': 'PE / HF',
  '/wam': 'WAM',
  '/consulting': 'Consulting',
  '/corp-finance': 'Corp Finance',
  '/universal': 'Universal',
};

export default function SiteHeader() {
  return (
    <header className="valufin-site-header">
      <div className="valufin-site-header-inner">
        <Link to="/" className="valufin-site-header-logo">
          <span className="valufin-logo-text">ValuED</span>
        </Link>
        <nav className="valufin-site-header-nav">
          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat.path}
              to={cat.path}
              className={({ isActive }) => `valufin-site-header-link${isActive ? ' active' : ''}`}
            >
              {NAV_LABELS[cat.path]}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
