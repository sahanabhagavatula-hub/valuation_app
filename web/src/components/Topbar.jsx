export default function Topbar() {
  return (
    <div className="valufin-topbar">
      <svg className="valufin-logo-mark" width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#3d6b66" />
        <path d="M8 9L16 22L24 9" stroke="#e8e3d8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="9" r="2.5" fill="#6b9b94" stroke="#16140f" strokeWidth="1" />
      </svg>
      <div className="valufin-logo-text">VALUFIN</div>
    </div>
  );
}
