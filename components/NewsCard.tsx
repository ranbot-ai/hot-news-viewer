import React from 'react';
import { formatEventDate, formatNumberShort } from '../lib/common';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { PROXY_IMAGE_DOMAINS } from '../config/imageProxyDomains';

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

// Generic blur placeholder (SVG base64)
const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE3MCIgdmlld0JveD0iMCAwIDMwMCAxNzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxNzAiIGZpbGw9IiNlZWUiLz48L3N2Zz4=';
const FALLBACK_IMG = '/fallback.png'; // Place a fallback.png in your public/ directory

const PROXY_ALL_IMAGES = typeof process !== 'undefined' && typeof process.env !== 'undefined' && process.env.NEXT_PUBLIC_PROXY_ALL_IMAGES === 'true';

function shouldProxy(src: string): boolean {
  try {
    const url = new URL(src.startsWith('//') ? 'https:' + src : src);
    return PROXY_IMAGE_DOMAINS.some(domain => url.hostname.endsWith(domain));
  } catch {
    return false;
  }
}

function getImageSrc(src?: string): string {
  if (!src) return '';
  if (src.startsWith('//')) src = 'https:' + src;
  if (src.startsWith('http')) {
    if (PROXY_ALL_IMAGES || shouldProxy(src)) {
      return `/api/image-proxy?url=${encodeURIComponent(src)}`;
    }
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
        maxWidth: '100%',
        minWidth: 0,
        width: '100%',
        cursor: 'pointer',
        border: 'none',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
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
          <Image
            src={getImageSrc(coverImg)}
            alt={title}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 420px"
            className="news-card-img"
            style={{
              objectFit: 'cover',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              display: 'block',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1), filter 0.25s cubic-bezier(.4,0,.2,1)',
            }}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            priority={position === 1}
            onError={e => {
              const target = e.target as HTMLImageElement;
              if (target.src !== FALLBACK_IMG) target.src = FALLBACK_IMG;
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
          gap: 10,
          wordBreak: 'break-word',
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
            <Image
              src={getImageSrc(owner.avatar)}
              alt={owner.name}
              width={28}
              height={28}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              onError={e => {
                const target = e.target as HTMLImageElement;
                if (target.src !== FALLBACK_IMG) target.src = FALLBACK_IMG;
              }}
            />
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

  @media (max-width: 900px) {
    .news-card {
      min-width: 0 !important;
      max-width: 100% !important;
    }
    .news-card > div {
      padding: 18px 16px !important;
    }
    .news-title-link {
      font-size: 18px !important;
    }
  }
  @media (max-width: 600px) {
    .news-card {
      min-width: 0 !important;
      max-width: 100vw !important;
      border-radius: 12px !important;
    }
    .news-card > div {
      padding: 12px 8px !important;
    }
    .news-title-link {
      font-size: 16px !important;
    }
    .news-rank-badge {
      width: 24px !important;
      height: 24px !important;
      font-size: 13px !important;
    }
  }
`}</style>