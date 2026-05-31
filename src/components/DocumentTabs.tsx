import React from 'react';

interface DocumentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  panicMode: boolean;
  onBackClick: () => void;
}

const DocumentTabs: React.FC<DocumentTabsProps> = ({ activeTab, setActiveTab, panicMode, onBackClick }) => {
  const tabs = panicMode ? ['Executive Summary'] : ['Executive Summary', 'Real-time Telemetry', 'Performance Matrix'];

  return (
    <div style={{ 
      width: '320px', 
      borderRight: '1px solid #e0e0e0', 
      backgroundColor: '#f8f9fa',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header section */}
      <div style={{ marginBottom: '24px' }}>
        <span 
          className="material-symbols-outlined" 
          onClick={onBackClick}
          style={{ fontSize: '24px', color: '#4a4a4a', cursor: 'pointer', marginBottom: '24px' }}
        >
          arrow_back
        </span>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f1f1f' }}>Document tabs</div>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#4a4a4a', cursor: 'pointer' }}>
            add
          </span>
        </div>
      </div>

      {/* Tabs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {tabs.map(tab => {
          const isActive = tab === activeTab;
          return (
            <div 
              key={tab}
              onClick={() => {
                const id = `section-${tab.toLowerCase().replace(/\s+/g, '-')}`;
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: '24px',
                backgroundColor: isActive ? '#d3e3fd' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                gap: '12px'
              }}
            >
              <div style={{ 
                width: '4px', 
                height: '16px', 
                backgroundColor: isActive ? '#0b57d0' : 'transparent',
                borderRadius: '4px'
              }} />
              <span className="material-symbols-outlined" style={{ 
                fontSize: '20px', 
                color: isActive ? '#0b57d0' : '#4a4a4a' 
              }}>
                article
              </span>
              <span style={{ 
                flex: 1, 
                fontSize: '14px', 
                fontWeight: isActive ? '500' : 'normal',
                color: isActive ? '#0b57d0' : '#4a4a4a'
              }}>
                {tab}
              </span>
              {isActive && (
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#4a4a4a' }}>
                  more_vert
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentTabs;
