import React from 'react';

interface SourceBtn {
  key: string;
  label: string;
  icon: string;
  color: string;
  active: boolean;
}

interface SourceNavProps {
  sources: SourceBtn[];
  onSourceChange: (key: string) => void;
  stickToTop?: boolean;
}

const SourceNav: React.FC<SourceNavProps> = ({ sources, onSourceChange, stickToTop = false }) => (
  <nav
    style={{
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      borderRadius: 32,
      padding: '12px',
      display: 'flex',
      justifyContent: 'center',
      gap: 18,
      transition: 'box-shadow 0.18s, background 0.18s, top 0.18s',
    }}
    aria-label="News Sources"
  >
    {sources.map((src) => (
      <button
        key={src.key}
        onClick={() => onSourceChange(src.key)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: src.active ? `linear-gradient(90deg, ${src.color} 0%, #6366f1 100%)` : '#fff',
          color: src.active ? '#fff' : src.color,
          border: src.active ? 'none' : `1.5px solid ${src.color}`,
          fontWeight: 700,
          fontSize: 18,
          padding: '12px 28px',
          borderRadius: 24,
          boxShadow: src.active ? '0 4px 16px rgba(99,102,241,0.10)' : 'none',
          cursor: 'pointer',
          transition: 'all 0.18s',
          outline: 'none',
        }}
        aria-pressed={src.active}
      >
        <i className={`fa ${src.icon}`} style={{ color: src.active ? '#fff' : src.color, fontSize: 22, verticalAlign: 'middle' }} aria-hidden="true" />
        {src.label}
      </button>
    ))}
  </nav>
);

export default SourceNav;