import React from 'react';

interface HeaderProps {
  onHomeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', height: '64px' }}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Docs Icon */}
        <div 
          onClick={onHomeClick}
          style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          title="Docs Home"
        >
          <img src="/header.png" alt="Docs" style={{ width: '28px', height: '38px', objectFit: 'contain' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '4px' }}>
            <input 
              type="text" 
              defaultValue="2026 Q3 Product Roadmap Plan" 
              className="doc-title-input"
              style={{ fontSize: '18px', color: '#1f1f1f' }} 
            />
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--text-muted)' }}>star</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--text-muted)' }}>folder</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--text-muted)' }}>cloud_done</span>
          </div>
          
          <div style={{ display: 'flex', gap: '14px', fontSize: '14px', color: 'var(--text-main)', marginTop: '2px', paddingLeft: '4px' }}>
            {['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Extensions', 'Help'].map(menu => (
              <div key={menu} style={{ cursor: 'pointer', padding: '4px 6px', borderRadius: '4px', marginTop: '-2px' }} className="menu-item">
                {menu}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>history</span>
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>comment</span>
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>videocam</span>
        </div>
        
        <button style={{ 
          backgroundColor: 'var(--primary-light-blue)', 
          color: '#001d35', 
          border: 'none', 
          borderRadius: '24px', 
          padding: '0 24px 0 16px', 
          height: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '14px'
        }}>
          <span className="material-symbols-outlined" style={{ color: '#001d35' }}>lock</span>
          Share
        </button>

        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          S
        </div>
      </div>
    </div>
  );
};

export default Header;
