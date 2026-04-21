export default function HomePage({ onNavigate }) {
  const cards = [
    {
      key: 'online',
      type: 'Online',
      typeBg: '#ecfdf5',
      typeColor: '#15803d',
      typeBorder: '#bbf7d0',
      title: 'Online Scheduling',
      algos: ['Minimum Completion Time (MCT)', 'Minimum Execution Time (MET)'],
      description:
        'Tasks arrive one by one and must be assigned immediately without knowledge of future tasks. MCT picks the machine with the lowest completion time; MET picks the machine with the lowest raw execution time.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#dcfce7" />
          <circle cx="12" cy="20" r="3" fill="#16a34a" />
          <circle cx="20" cy="14" r="3" fill="#16a34a" />
          <circle cx="28" cy="26" r="3" fill="#16a34a" />
          <line x1="12" y1="20" x2="20" y2="14" stroke="#16a34a" strokeWidth="1.5" />
          <line x1="20" y1="14" x2="28" y2="26" stroke="#16a34a" strokeWidth="1.5" />
          <rect x="8" y="28" width="6" height="4" rx="1.5" fill="#86efac" />
          <rect x="17" y="22" width="6" height="4" rx="1.5" fill="#86efac" />
          <rect x="25" y="16" width="6" height="4" rx="1.5" fill="#86efac" />
        </svg>
      ),
    },
    {
      key: 'offline',
      type: 'Offline',
      typeBg: '#eff6ff',
      typeColor: '#1d4ed8',
      typeBorder: '#bfdbfe',
      title: 'Offline Scheduling',
      algos: ['Min-Min', 'Max-Min'],
      description:
        'All tasks are known upfront. The scheduler can survey every task and machine before making assignments. Min-Min prioritises tasks with the smallest completion time; Max-Min prioritises those with the largest.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#dbeafe" />
          <rect x="8" y="10" width="14" height="5" rx="2" fill="#3b82f6" />
          <rect x="16" y="18" width="10" height="5" rx="2" fill="#3b82f6" fillOpacity="0.75" />
          <rect x="8" y="26" width="8" height="5" rx="2" fill="#3b82f6" fillOpacity="0.5" />
          <rect x="20" y="26" width="12" height="5" rx="2" fill="#93c5fd" />
          <line x1="8" y1="33" x2="32" y2="33" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <main className="main">
      <div className="home-hero">
        <h1 className="home-title">Scheduling Algorithm Simulator</h1>
        <p className="home-sub">Select a scheduling strategy to visualise and compare</p>
      </div>

      <div className="home-cards">
        {cards.map((c) => (
          <div key={c.key} className="home-card">
            <div className="home-card-top">
              {c.icon}
              <span
                className="home-type-badge"
                style={{ background: c.typeBg, color: c.typeColor, borderColor: c.typeBorder }}
              >
                {c.type}
              </span>
            </div>
            <h2 className="home-card-title">{c.title}</h2>
            <ul className="home-algo-list">
              {c.algos.map((a) => (
                <li key={a}>
                  <span className="home-algo-dot" />
                  {a}
                </li>
              ))}
            </ul>
            <button className="btn-primary home-card-btn" onClick={() => onNavigate(c.key)}>
              Simulate
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
