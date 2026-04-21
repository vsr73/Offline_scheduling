export default function HomePage({ onNavigate }) {
  const cards = [
    {
      key: 'online',
      num: '01',
      type: 'Online',
      typeBg: '#ecfdf5',
      typeColor: '#15803d',
      typeBorder: '#bbf7d0',
      accentColor: '#16a34a',
      title: 'Online Scheduling',
      algos: ['Minimum Completion Time (MCT)', 'Minimum Execution Time (MET)'],
      icon: (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect width="44" height="44" rx="12" fill="#dcfce7" />
          <circle cx="14" cy="22" r="3.5" fill="#16a34a" />
          <circle cx="22" cy="15" r="3.5" fill="#16a34a" />
          <circle cx="30" cy="29" r="3.5" fill="#16a34a" />
          <line x1="14" y1="22" x2="22" y2="15" stroke="#16a34a" strokeWidth="1.8" />
          <line x1="22" y1="15" x2="30" y2="29" stroke="#16a34a" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      key: 'offline',
      num: '02',
      type: 'Offline',
      typeBg: '#eff6ff',
      typeColor: '#1d4ed8',
      typeBorder: '#bfdbfe',
      accentColor: '#1d4ed8',
      title: 'Offline Scheduling',
      algos: ['Min-Min', 'Max-Min'],
      icon: (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect width="44" height="44" rx="12" fill="#dbeafe" />
          <rect x="10" y="12" width="16" height="5" rx="2" fill="#3b82f6" />
          <rect x="18" y="20" width="12" height="5" rx="2" fill="#3b82f6" fillOpacity="0.7" />
          <rect x="10" y="28" width="9" height="5" rx="2" fill="#3b82f6" fillOpacity="0.45" />
          <rect x="22" y="28" width="13" height="5" rx="2" fill="#93c5fd" />
          <line x1="10" y1="36" x2="34" y2="36" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <main className="home-main">
      {/* Hero */}
      <div className="home-hero">
        <div className="home-hero-eyebrow">Algorithm Simulator</div>
        <h1 className="home-title">Scheduling Algorithm Simulator</h1>
        <p className="home-sub">
          Choose a scheduling strategy to visualise task assignments,<br />
          analyse Gantt charts, and compare algorithm performance.
        </p>
      </div>

      {/* Cards */}
      <div className="home-cards">
        {cards.map((c) => (
          <div
            key={c.key}
            className="home-card"
            style={{ '--accent': c.accentColor }}
          >
            <div className="home-card-left">
              <div className="home-card-num" style={{ color: c.accentColor, borderColor: c.accentColor + '33' }}>
                {c.num}
              </div>
              <div className="home-card-info">
                <div className="home-card-header">
                  {c.icon}
                  <div>
                    <div className="home-card-meta">
                      <span
                        className="home-type-badge"
                        style={{ background: c.typeBg, color: c.typeColor, borderColor: c.typeBorder }}
                      >
                        {c.type}
                      </span>
                    </div>
                    <h2 className="home-card-title">{c.title}</h2>
                  </div>
                </div>
                <ul className="home-algo-list">
                  {c.algos.map((a) => (
                    <li key={a} style={{ borderColor: c.typeBorder, background: c.typeBg, color: c.typeColor }}>
                      <span className="home-algo-dot" style={{ background: c.accentColor }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="home-card-right">
              <button
                className="home-sim-btn"
                style={{ background: c.accentColor }}
                onClick={() => onNavigate(c.key)}
              >
                Simulate
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
