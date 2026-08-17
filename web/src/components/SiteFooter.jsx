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

export default function SiteFooter() {
  return (
    <footer className="valufin-site-footer">
      <div className="valufin-site-footer-inner">
        <div className="valufin-site-footer-row">
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
        <div className="valufin-site-footer-meta">
          <p>Interview prep for finance — modeling, cases, and the offer.</p>
          <p>© 2026 ValuED</p>
        </div>
      </div>
    </footer>
  );
}
