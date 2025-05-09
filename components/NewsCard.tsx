import React from 'react';
import { formatEventDate, formatNumberShort } from '../lib/common';

export interface NewsCardProps {
  title: string;
  rank: number;
  videoCount: number;
  coverImg: string;
  hotValue: number;
  eventDate: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, rank, videoCount, coverImg, hotValue, eventDate }) => {
  const formattedDate = formatEventDate(eventDate);
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: 0,
        marginBottom: 32,
        display: 'flex',
        alignItems: 'center',
        maxWidth: 700,
        minWidth: 350,
        width: '100%',
        cursor: 'pointer',
        border: 'none',
        overflow: 'hidden',
      }}
      className="news-card"
    >
      <div style={{ flex: '0 0 120px', height: 120, background: '#f2f3f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={coverImg}
          alt={title}
          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        />
      </div>
      <div style={{ flex: 1, padding: '24px 28px' }}>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: '#222', lineHeight: 1.2 }}>
          <span style={{ color: '#0071e3', fontWeight: 700, marginRight: 12 }}>{rank}</span>
          {title}
        </div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>
          <span style={{ marginRight: 18 }}>视频数: <b style={{ color: '#222' }}>{formatNumberShort(videoCount)}</b></span>
          <span>热度: <b style={{ color: '#e67e22' }}>{formatNumberShort(hotValue)}</b></span>
        </div>
        <div style={{ color: '#aaa', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa fa-calendar" aria-hidden="true" title={formattedDate} style={{ marginRight: 6 }} />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;