export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#1a56db" />
            <path d="M8 28L18 10L28 28H8Z" fill="white" fillOpacity="0.9" />
            <circle cx="18" cy="20" r="4" fill="#1a56db" />
          </svg>
          <span className="header-title">Offline Scheduling</span>
        </div>
      </div>
    </header>
  );
}
