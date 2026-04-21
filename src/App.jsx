import { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import OfflinePage from './components/OfflinePage';
import OnlinePage from './components/OnlinePage';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="app">
      <Header onLogoClick={() => setPage('home')} />

      {page === 'home'    && <HomePage   onNavigate={setPage} />}
      {page === 'offline' && <OfflinePage onBack={() => setPage('home')} />}
      {page === 'online'  && <OnlinePage  onBack={() => setPage('home')} />}

      <footer className="footer">
        <p>Offline &amp; Online Scheduling Simulator — Fog &amp; Edge Computing</p>
      </footer>
    </div>
  );
}
