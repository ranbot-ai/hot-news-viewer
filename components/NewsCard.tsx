import React from 'react';
import { formatEventDate, formatNumberShort } from '../lib/common';
import { useTranslation } from 'next-i18next';

export interface NewsCardProps {
  title: string;
  position: number;
  rank?: number;
  videoCount?: number;
  viewsCount?: number;
  likesCount?: number;
  commentsCount?: number;
  rcmdReason?: string;
  coverImg?: string;
  hotValue?: number;
  eventDate: string;
  owner?: {
    name: string;
    avatar: string;
  };
  link?: string;
  pubLocation?: string;
  source?: string;
}


function getImageSrc(src?: string): string {
  if (!src) return ""; // fallback image path

  if (src.includes('hdslb.com')) {
    return `/api/image-proxy?url=${encodeURIComponent(src)}`;
  }
  return src;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title, position, rank, videoCount, viewsCount, likesCount, commentsCount, coverImg, hotValue, eventDate, owner, link, pubLocation, source }) => {
  const formattedDate = formatEventDate(eventDate);
  const { t } = useTranslation('common');
  // Random image height between 40% and 100% of 220px
  const minHeight = 0.4 * 220;
  const maxHeight = 220;
  const imgHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: 0,
        marginBottom: 32,
        display: 'block',
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
        {position}
      </span>

      {coverImg && (
        <div style={{ width: '100%', height: imgHeight, minHeight: minHeight, maxHeight: maxHeight, background: '#f8f8f8', position: 'relative' }}>
          <img
            src={getImageSrc(coverImg)}
            alt={title}
            className="news-card-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              display: 'block',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1), filter 0.25s cubic-bezier(.4,0,.2,1)',
            }}
          />
        </div>
      )}

      <div style={{ padding: '24px 36px' }}>
        <div style={{
          fontSize: 22,
          fontWeight: 600,
          marginBottom: 8,
          color: '#222',
          lineHeight: 1.2,
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>
          {rank && <span
            style={{
              fontSize: 22,
              color: '#aaa',
              fontWeight: 500,
              marginRight: 10,
              minWidth: 28,
              textAlign: 'right',
              letterSpacing: '0.5px'
            }}
          >
            #{rank}
          </span>}
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
              <span title={t('videoCount')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-film" aria-hidden="true" style={{ fontSize: 15, opacity: 0.7 }} />
                <b style={{ color: '#222', fontWeight: 500 }}>{formatNumberShort(videoCount)}</b>
              </span>
            )}
            {viewsCount && (
              <span title={t('views')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-play-circle" aria-hidden="true" style={{ fontSize: 15, opacity: 0.7 }} />
                <b style={{ color: '#222', fontWeight: 500 }}>{formatNumberShort(viewsCount)}</b>
              </span>
            )}
            {likesCount && (
              <span title={t('likes')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-heart" aria-hidden="true" style={{ fontSize: 15, opacity: 0.7 }} />
                <b style={{ color: '#222', fontWeight: 500 }}>{formatNumberShort(likesCount)}</b>
              </span>
            )}
            {commentsCount && (
              <span title={t('comments')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-comment" aria-hidden="true" style={{ fontSize: 15, opacity: 0.7 }} />
                <b style={{ color: '#222', fontWeight: 500 }}>{formatNumberShort(commentsCount)}</b>
              </span>
            )}
            {hotValue && (
              <span title={t('hot')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa fa-fire" aria-hidden="true" style={{ fontSize: 15, color: '#e67e22', opacity: 0.8 }} />
                <b style={{ color: '#e67e22', fontWeight: 500 }}>{formatNumberShort(hotValue)}</b>
              </span>
            )}
          </div>
        </div>

        <div style={{ color: '#aaa', fontSize: 15, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, rowGap: 6 }}>
          {eventDate && <span title={t('date')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <i className="fa fa-calendar" aria-hidden="true" style={{ fontSize: 15, opacity: 0.7 }} />
            <span>{formattedDate}</span>
          </span>}

          {pubLocation && (
            <span title={t('location')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <i className="fa fa-map-marker" aria-hidden="true" style={{ fontSize: 15, color: '#0071e3', opacity: 0.7 }} />
              <span>{pubLocation}</span>
            </span>
          )}

          {source && (
            <span title={t('sourceLabel')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <i className="fa fa-newspaper-o" aria-hidden="true" style={{ fontSize: 15, color: '#0071e3', opacity: 0.7 }} />
              <span style={{ color: '#666' }}>{source}</span>
            </span>
          )}
        </div>

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

<style jsx global>{`
  .news-card:hover .news-card-img {
    transform: scale(1.045);
    box-shadow: 0 8px 32px rgba(0,0,0,0.13);
    filter: brightness(1.04) saturate(1.08);
  }
`}</style>