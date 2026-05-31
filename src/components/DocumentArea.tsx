import React, { useEffect } from 'react';
import LiveView from './LiveView';
import ScorecardView from './ScorecardView';
import RoadmapView from './RoadmapView';

interface DocumentAreaProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  matchId: number;
  panicMode: boolean;
}

const DocumentArea: React.FC<DocumentAreaProps> = ({ activeTab, setActiveTab, matchId, panicMode }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'section-executive-summary') setActiveTab('Executive Summary');
          if (id === 'section-real-time-telemetry') setActiveTab('Real-time Telemetry');
          if (id === 'section-performance-matrix') setActiveTab('Performance Matrix');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '-20% 0px -60% 0px'
    });

    const ids = ['section-executive-summary', 'section-real-time-telemetry', 'section-performance-matrix'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveTab]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0 64px 0', gap: '24px' }}>
      
      {/* Page 1: Executive Summary */}
      <div 
        id="section-executive-summary"
        contentEditable={true}
        suppressContentEditableWarning={true}
        style={{ 
          width: '816px', 
          minHeight: '1056px', 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          padding: '96px', 
          outline: 'none',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <RoadmapView />
      </div>

      {/* Other pages hidden in panic mode */}
      {!panicMode && (
        <>
          {/* Page 2: Real-time Telemetry */}
          <div 
            id="section-real-time-telemetry"
            style={{ 
              width: '816px', 
              minHeight: '1056px', 
              backgroundColor: 'white', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
              padding: '96px', 
              outline: 'none',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f1f1f', marginBottom: '16px', borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}>Real-time Telemetry</h2>
            <LiveView matchId={matchId} />
          </div>

          {/* Page 3: Performance Matrix */}
          <div 
            id="section-performance-matrix"
            style={{ 
              width: '816px', 
              minHeight: '1056px', 
              backgroundColor: 'white', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
              padding: '96px', 
              outline: 'none',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f1f1f', marginBottom: '16px', borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}>Performance Matrix</h2>
            <ScorecardView matchId={matchId} />
          </div>
        </>
      )}

    </div>
  );
};

export default DocumentArea;
