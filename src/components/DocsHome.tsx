import React, { useState, useEffect } from 'react';

interface DocsHomeProps {
  onMatchSelect: (matchId: number) => void;
}

const DocsHome: React.FC<DocsHomeProps> = ({ onMatchSelect }) => {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/home');
        const json = await response.json();
        if (json && json.matches) {
          setMatches(json.matches);
        }
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', height: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#4a4a4a' }}>menu</span>
          <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/header.png" alt="Docs" style={{ width: '28px', height: '38px', objectFit: 'contain' }} />
          </div>
          <span style={{ fontSize: '22px', color: '#5f6368', paddingLeft: '4px' }}>Docs</span>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f3f4', borderRadius: '8px', padding: '0 16px', width: '100%', maxWidth: '720px', height: '48px' }}>
            <span className="material-symbols-outlined" style={{ color: '#5f6368' }}>search</span>
            <input 
              type="text" 
              placeholder="Search" 
              style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', padding: '0 16px', fontSize: '16px', width: '100%' }}
            />
          </div>
        </div>

        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          S
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#1f1f1f', marginBottom: '16px' }}>Recent documents</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 50px', padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', color: '#5f6368', borderBottom: '1px solid #e0e0e0' }}>
            <div>Title</div>
            <div>Status</div>
            <div></div>
          </div>

          {matches.map((item, index) => {
            const m = item.match.matchInfo;
            const title = `${m.team1.teamName} vs ${m.team2.teamName}`;
            const subtitle = `${m.seriesName} - ${m.matchDesc}`;
            
            return (
              <div 
                key={m.matchId || index} 
                onClick={() => onMatchSelect(m.matchId)}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 200px 50px', 
                  alignItems: 'center',
                  padding: '12px 16px', 
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f3f4'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src="/header.png" alt="Docs" style={{ width: '16px', height: '22px', objectFit: 'contain' }} />
                  <div>
                    <div style={{ fontSize: '14px', color: '#1f1f1f', fontWeight: '500' }}>{title}</div>
                    <div style={{ fontSize: '12px', color: '#5f6368', marginTop: '4px' }}>{subtitle}</div>
                  </div>
                </div>
                
                <div style={{ fontSize: '14px', color: '#5f6368' }}>
                  {m.status || m.stateTitle}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span className="material-symbols-outlined" style={{ color: '#5f6368' }}>more_vert</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocsHome;
