import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SourceNav from '../../components/SourceNav';
import NewsCard, { NewsCardProps } from '../../components/NewsCard';
import Masonry from 'react-masonry-css';
import { SOURCES } from '../../lib/sources';
import { useTranslation } from 'next-i18next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchNews } from '../../lib/fetchNews';
import Link from 'next/link';

const PAGE_SIZE = 18;

const SourcePage = ({ initialNews, sourceKey }: { initialNews: NewsCardProps[]; sourceKey: string }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [news, setNews] = useState<NewsCardProps[]>(initialNews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSourceNavAtTop, setIsSourceNavAtTop] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const sourceNavRef = useRef<HTMLDivElement>(null);

  // 监听 SourceNav 是否吸顶
  useEffect(() => {
    const nav = sourceNavRef.current;
    if (!nav) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsSourceNavAtTop(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  // 监听滚动，超过 10vh 时 Header 显示，否则 Header 只在 SourceNav 未吸顶时显示
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = window.innerHeight * 0.10;
      if (scrollY > threshold) {
        setShowHeader(true);
      } else {
        setShowHeader(!isSourceNavAtTop);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSourceNavAtTop]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight + 200 >= docHeight && visibleCount < news.length) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, news.length));
    }
  }, [visibleCount, news.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 监听 sourceKey 变化，动态加载新闻
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNews(sourceKey)
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('加载失败');
        setLoading(false);
      });
    setVisibleCount(PAGE_SIZE);
  }, [sourceKey]);

  // SourceNav handler
  const handleSourceSwitch = (key: string) => {
    if (key !== sourceKey) router.push(`/sources/${key}`);
  };

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    900: 2,
    600: 1,
  };

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <div
        style={{
          position: 'relative',
          zIndex: 120,
          transition: 'opacity 0.35s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1)',
          opacity: showHeader ? 1 : 0,
          transform: showHeader ? 'translateY(0)' : 'translateY(-32px)',
          pointerEvents: showHeader ? 'auto' : 'none',
          height: showHeader ? undefined : 0,
        }}
      >
        <Header />
      </div>
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
        textAlign: 'center',
        minHeight: '80vh',
        paddingTop: '10vh',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#444',
          marginBottom: 48,
          maxWidth: '50vw',
          lineHeight: 1.4,
          textShadow: '0 1px 4px rgba(60,60,60,0.03)'
        }}>
          <Link href="/" passHref legacyBehavior>
            <a style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>{t('pageTitle')}</a>
          </Link>
        </h1>
        <div
          ref={sourceNavRef}
          style={{
            position: isSourceNavAtTop ? 'fixed' : 'static',
            top: isSourceNavAtTop ? 0 : 'auto',
            left: 0,
            width: '100%',
            zIndex: 200,
            background: isSourceNavAtTop ? 'rgba(255,255,255,0.97)' : 'transparent',
            boxShadow: isSourceNavAtTop ? '0 2px 12px rgba(0,0,0,0.07)' : 'none',
            transition: 'all 0.35s cubic-bezier(.4,0,.2,1), background 0.35s, box-shadow 0.35s, top 0.35s',
          }}
        >
          <SourceNav
            sources={SOURCES.map(s => ({
              key: s.key,
              label: t(`source.${s.key}`),
              icon: s.icon,
              color: s.color,
              active: sourceKey === s.key,
            }))}
            onSourceChange={handleSourceSwitch}
            stickToTop={isSourceNavAtTop}
          />
        </div>
        <div
          style={{
            maxWidth: 1440,
            minHeight: '30vh',
            margin: '20px auto',
            padding: '0 16px 48px 16px',
            width: '100%',
            boxSizing: 'border-box',
          }}>
          {loading ? (
            <div style={{ textAlign: 'center', margin: '32px 0', color: '#888', fontSize: 16 }}>{t('loading', 'Loading...')}</div>
          ) : error ? (
            <div style={{ textAlign: 'center', margin: '32px 0', color: '#e74c3c', fontSize: 16 }}>{error}</div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {news.slice(0, visibleCount).map((item, idx) => (
                <NewsCard key={(item.rank || idx) + item.title} {...item} />
              ))}
            </Masonry>
          )}
          {!loading && !error && visibleCount < news.length && (
            <div style={{ textAlign: 'center', margin: '32px 0', color: '#888', fontSize: 16 }}>{t('loading', 'Loading...')}</div>
          )}
        </div>
      </section>
      <Footer />
      <style jsx global>{`
        .masonry-grid {
          display: flex;
          margin-left: -24px;
          width: auto;
        }
        .masonry-grid_column {
          padding-left: 24px;
          background-clip: padding-box;
        }
        .masonry-grid_column > .news-card {
          margin-bottom: 32px;
        }
      `}</style>
    </>
  );
};

// DYNAMIC: All sources, all locales
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths =
    locales?.flatMap(locale =>
      SOURCES.map(s => ({
        params: { permalink: s.key },
        locale,
      }))
    ) ?? [];
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const sourceKey = params?.permalink as string;
  const initialNews = await fetchNews(sourceKey);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'zh', ['common'])),
      initialNews,
      sourceKey,
    },
    revalidate: 600,
  };
};

export default SourcePage;