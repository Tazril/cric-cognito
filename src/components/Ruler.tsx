import React from 'react';

const Ruler = () => {
  return (
    <div style={{ 
      height: '14px', 
      backgroundColor: 'var(--bg-color)', 
      borderBottom: '1px solid var(--border-color)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Simple dummy ruler representation */}
      <div style={{ width: '816px', height: '100%', position: 'relative', borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0' }}>
         <div style={{ position: 'absolute', top: 0, left: '-6px', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid var(--primary-blue)' }} />
         <div style={{ position: 'absolute', top: 0, right: '-6px', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid var(--primary-blue)' }} />
      </div>
    </div>
  );
};

export default Ruler;
