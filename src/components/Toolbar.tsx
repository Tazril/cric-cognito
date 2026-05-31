const Toolbar = () => {
  const divider = <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)', margin: '0 6px' }} />;

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: 'var(--toolbar-bg)', 
      borderRadius: '24px', 
      padding: '0 16px', 
      height: '44px',
      overflowX: 'auto',
      whiteSpace: 'nowrap'
    }}>
      <span className="material-symbols-outlined">undo</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>redo</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>print</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>spellcheck</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>format_paint</span>
      
      {divider}

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '0 4px' }}>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>100%</span>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_drop_down</span>
      </div>

      {divider}

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '0 4px' }}>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>Normal text</span>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_drop_down</span>
      </div>

      {divider}

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '0 4px' }}>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>Roboto</span>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_drop_down</span>
      </div>

      {divider}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span>
        <span style={{ fontSize: '14px', margin: '0 8px', width: '28px', textAlign: 'center', fontWeight: 500, padding: '2px 4px', border: '1px solid var(--border-color)', borderRadius: '4px' }}>11</span>
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
      </div>

      {divider}

      <span className="material-symbols-outlined">format_bold</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>format_italic</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>format_underlined</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>format_color_text</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>ink_highlighter</span>

      {divider}

      <span className="material-symbols-outlined">add_link</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>add_comment</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>image</span>

      {divider}

      <span className="material-symbols-outlined">format_align_left</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>format_line_spacing</span>

      {divider}

      <span className="material-symbols-outlined">checklist</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>format_list_bulleted</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>format_list_numbered</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>format_indent_decrease</span>
      <span className="material-symbols-outlined" style={{ marginLeft: '4px' }}>format_indent_increase</span>

      {divider}

      <span className="material-symbols-outlined">format_clear</span>
      
      <div style={{ flex: 1 }} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 8px', backgroundColor: 'var(--bg-color)', borderRadius: '4px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>Editing</span>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_drop_down</span>
      </div>
    </div>
  );
};

export default Toolbar;
