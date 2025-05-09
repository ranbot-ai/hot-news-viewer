import React, { useEffect, useState } from 'react';
import NewsCard, { NewsCardProps } from '../components/NewsCard';
import axios from 'axios';

const SOURCES = [
  { key: 'douyin', label: 'Douyin' },
  { key: 'bilibili', label: 'Bilibili' },
  // Future: add more sources here
];

const fetchNews = async (source: string): Promise<NewsCardProps[]> => {
  if (source === 'douyin' || source === 'bilibili') {
    const res = await axios.get(`/api/${source}`);
    return res.data.news || [];
  }
  return [];
};

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState('douyin');

  // Clear news immediately on source switch
  const handleSourceSwitch = (newSource: string) => {
    if (newSource !== source) {
      setNews([]);
      setLoading(true);
      setSource(newSource);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNews(source)
      .then(setNews)
      .catch(() => setError('Failed to fetch hot news.'))
      .finally(() => setLoading(false));
  }, [source]);

  return (
    <main>
      <h1>Hot News Viewer</h1>
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex',
          borderRadius: 12,
          background: '#f2f3f7',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          overflow: 'hidden',
        }}>
          {SOURCES.map(s => (
            <button
              key={s.key}
              onClick={() => handleSourceSwitch(s.key)}
              style={{
                padding: '10px 32px',
                fontSize: 16,
                fontWeight: 600,
                border: 'none',
                background: source === s.key ? '#fff' : 'transparent',
                color: source === s.key ? '#0071e3' : '#222',
                boxShadow: source === s.key ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.18s',
                cursor: 'pointer',
                outline: 'none',
                borderRight: s.key !== SOURCES[SOURCES.length - 1].key ? '1px solid #e0e0e0' : 'none',
              }}
              aria-pressed={source === s.key}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="news-grid">
        {loading && (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '48px 0' }}>
            <div className="apple-spinner" />
          </div>
        )}
        {error && <p style={{ color: 'red', textAlign: 'center', gridColumn: '1 / -1' }}>{error}</p>}
        {!loading && !error && news.length === 0 && <p style={{ textAlign: 'center', color: '#aaa', gridColumn: '1 / -1' }}>No hot news found.</p>}
        {news.map((item) => (
          <NewsCard key={item.rank + item.title} {...item} />
        ))}
      </div>
      <style jsx global>{`
        .apple-spinner {
          display: inline-block;
          width: 44px;
          height: 44px;
          border: 4px solid #e0e0e0;
          border-top: 4px solid #0071e3;
          border-radius: 50%;
          animation: apple-spin 0.8s linear infinite;
        }
        @keyframes apple-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
};

export default HomePage;