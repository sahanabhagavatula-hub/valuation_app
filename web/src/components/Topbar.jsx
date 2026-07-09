export default function Topbar() {
  return (
    <div className="valufin-topbar">
      <svg className="valufin-logo-mark" width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#1B1916" />
        <svg x="5" y="6" width="22" height="22" viewBox="0 0 100 100">
          <g fill="none" strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit="8" strokeWidth="10">
            <polyline points="20,28 50,72 79,20" stroke="#EDEBE4" />
            <polyline points="63,24 79,20 83,36" stroke="#7FA896" />
          </g>
        </svg>
      </svg>
      <div className="valufin-logo-text">
        Valu<span className="valufin-logo-text-accent">ED</span>
      </div>
    </div>
  );
}
