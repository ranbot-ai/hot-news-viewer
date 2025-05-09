import React from 'react';
import { formatEventDate, formatNumberShort } from '../lib/common';

export interface NewsCardProps {
  title: string;
  rank: number;
  videoCount: number;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  rcmdReason: string;
  coverImg: string;
  hotValue: number;
  eventDate: string;
  owner?: {
    name: string;
    avatar: string;
  };
  link?: string;
  pubLocation?: string;
}

function getImageSrc(src?: string): string {
  if (!src) return ""; // fallback image path

  if (src.includes('hdslb.com')) {
    return `/api/image-proxy?url=${encodeURIComponent(src)}`;
  }
  return src;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title, rank, videoCount, viewsCount, likesCount, commentsCount, rcmdReason, coverImg, hotValue, eventDate, owner, link, pubLocation }) => {
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
        maxWidth: 960,
        minWidth: 420,
        width: '100%',
        cursor: 'pointer',
        border: 'none',
        overflow: 'hidden',
        position: 'relative',
      }}
      className="news-card"
    >
      <span
        className="news-rank-badge"
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          left: 'auto',
          zIndex: 2,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(6px)',
          color: '#222',
          fontWeight: 500,
          fontSize: 16,
          boxShadow: '0 4px 16px rgba(0,0,0,0.13)',
          border: '1.5px solid #f2f3f7',
          letterSpacing: '0',
          userSelect: 'none',
          transition: 'background 0.2s',
        }}
      >
        {rank}
      </span>
      {coverImg && <div style={{ flex: '0 0 120px', height: 120, background: '#f2f3f7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 32 }}>
        <img
          src={getImageSrc(coverImg)}
          alt={title}
          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        />
      </div>}
      <div style={{ flex: 1, padding: '24px 36px' }}>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: '#222', lineHeight: 1.2 }}>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                transition: 'color 0.18s, text-decoration 0.18s',
              }}
              className="news-title-link"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, rowGap: 6 }}>
            {videoCount && (
              <span title="视频数" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-film" aria-hidden="true" style={{ fontSize: 15, opacity: 0.7 }} />
                <b style={{ color: '#222', fontWeight: 500 }}>{formatNumberShort(videoCount)}</b>
              </span>
            )}
            {viewsCount && (
              <span title="播放量" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-play-circle" aria-hidden="true" style={{ fontSize: 15, opacity: 0.7 }} />
                <b style={{ color: '#222', fontWeight: 500 }}>{formatNumberShort(viewsCount)}</b>
              </span>
            )}
            {likesCount && (
              <span title="点赞数" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-heart" aria-hidden="true" style={{ fontSize: 15, opacity: 0.7 }} />
                <b style={{ color: '#222', fontWeight: 500 }}>{formatNumberShort(likesCount)}</b>
              </span>
            )}
            {commentsCount && (
              <span title="评论数" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-comment" aria-hidden="true" style={{ fontSize: 15, opacity: 0.7 }} />
                <b style={{ color: '#222', fontWeight: 500 }}>{formatNumberShort(commentsCount)}</b>
              </span>
            )}
            {hotValue && (
              <span title="热度" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-fire" aria-hidden="true" style={{ fontSize: 15, color: '#e67e22', opacity: 0.8 }} />
                <b style={{ color: '#e67e22', fontWeight: 500 }}>{formatNumberShort(hotValue)}</b>
              </span>
            )}
          </div>
        </div>
        <div style={{ color: '#aaa', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa fa-calendar" aria-hidden="true" title={formattedDate} style={{ marginRight: 6 }} />
          <span>{formattedDate}</span>
        </div>
        {pubLocation && (
          <div style={{ color: '#aaa', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
            <i className="fa fa-map-marker" aria-hidden="true" title="Location" style={{ marginRight: 6, color: '#0071e3', opacity: 0.7 }} />
            <span>{pubLocation}</span>
          </div>
        )}

        {owner?.name && (
          <div style={{ color: '#888', fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={getImageSrc(owner.avatar)} alt={owner.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
            <span>{owner.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;