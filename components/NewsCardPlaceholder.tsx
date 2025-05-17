import React from 'react';

const minHeight = 80;
const maxHeight = 320;
const imgHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

const skeletonStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)',
  backgroundSize: '400% 100%',
  animation: 'skeleton-loading 1.4s ease infinite',
};

const NewsCardPlaceholder: React.FC = () => (
  <div
    style={{
      background: '#fff',
      borderRadius: 20,
      padding: 0,
      marginBottom: 32,
      display: 'block',
      maxWidth: '100%',
      minWidth: 0,
      width: '100%',
      border: 'none',
      overflow: 'hidden',
      position: 'relative',
      boxSizing: 'border-box',
      boxShadow: '0 4px 16px rgba(0,0,0,0.13)',
    }}
    className="news-card news-card-placeholder"
  >
    <span
      style={{
        position: 'absolute',
        top: 5,
        right: 5,
        left: 'auto',
        zIndex: 2,
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: '#f0f0f0',
        color: 'transparent',
        fontWeight: 500,
        fontSize: 16,
        boxShadow: '0 4px 16px rgba(0,0,0,0.13)',
        border: '1.5px solid #f2f3f7',
      }}
    >
      &nbsp;
    </span>
    <div style={{ width: '100%', height: imgHeight, minHeight, maxHeight, background: '#f0f0f0', ...skeletonStyle }} />
    <div style={{ padding: '24px 36px' }}>
      <div style={{ height: 28, width: '70%', borderRadius: 8, marginBottom: 16, ...skeletonStyle }} />
      <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
        <div style={{ height: 18, width: 60, borderRadius: 6, ...skeletonStyle }} />
        <div style={{ height: 18, width: 40, borderRadius: 6, ...skeletonStyle }} />
        <div style={{ height: 18, width: 40, borderRadius: 6, ...skeletonStyle }} />
      </div>
      <div style={{ height: 16, width: '90%', borderRadius: 6, marginBottom: 8, ...skeletonStyle }} />
      <div style={{ height: 16, width: '60%', borderRadius: 6, ...skeletonStyle }} />
    </div>
    <style jsx global>{`
      @keyframes skeleton-loading {
        0% { background-position: 100% 50%; }
        100% { background-position: 0 50%; }
      }
    `}</style>
  </div>
);

export default NewsCardPlaceholder;