export default function Header({ onLogoClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
          <svg width="38" height="38" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hbg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af"/>
                <stop offset="100%" stopColor="#1d4ed8"/>
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="14" fill="url(#hbg)"/>
            <line x1="22" y1="12" x2="22" y2="52" stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
            <line x1="36" y1="12" x2="36" y2="52" stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
            <line x1="50" y1="12" x2="50" y2="52" stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
            <rect x="12" y="14" width="24" height="7" rx="3" fill="white" fillOpacity="0.95"/>
            <rect x="22" y="25" width="20" height="7" rx="3" fill="white" fillOpacity="0.75"/>
            <rect x="12" y="36" width="14" height="7" rx="3" fill="white" fillOpacity="0.55"/>
            <rect x="30" y="36" width="22" height="7" rx="3" fill="#93c5fd" fillOpacity="0.95"/>
            <line x1="10" y1="50" x2="54" y2="50" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="header-title">Offline Scheduling</span>
        </div>
      </div>
    </header>
  );
}
