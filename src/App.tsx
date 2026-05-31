import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Ruler from './components/Ruler';
import DocumentArea from './components/DocumentArea';
import DocumentTabs from './components/DocumentTabs';
import DocsHome from './components/DocsHome';

function App() {
  const [activeTab, setActiveTab] = useState('Executive Summary');
  const [matchId, setMatchId] = useState<number | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const match = params.get('match');
    return match ? parseInt(match, 10) : null;
  });
  const [panicMode, setPanicMode] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const match = params.get('match');
      setMatchId(match ? parseInt(match, 10) : null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleMatchSelect = (id: number | null) => {
    if (id) {
      window.history.pushState({}, '', '?match=' + id);
    } else {
      window.history.pushState({}, '', window.location.pathname);
    }
    setMatchId(id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanicMode(prev => {
          if (!prev) {
            setActiveTab('Executive Summary');
            const el = document.getElementById('section-executive-summary');
            if (el) el.scrollIntoView();
          }
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!matchId) {
    return <DocsHome onMatchSelect={handleMatchSelect} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--header-bg)' }}>
      <Header onHomeClick={() => handleMatchSelect(null)} />
      <div style={{ padding: '0 16px 8px 16px' }}>
        <Toolbar />
      </div>
      <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', backgroundColor: 'var(--bg-color)' }}>
        <DocumentTabs activeTab={activeTab} setActiveTab={setActiveTab} panicMode={panicMode} onBackClick={() => handleMatchSelect(null)} />
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Ruler />
          <DocumentArea activeTab={activeTab} setActiveTab={setActiveTab} matchId={matchId} panicMode={panicMode} />
        </div>
      </div>
    </div>
  );
}

export default App;
