import React, { useRef } from 'react';
import NewsCard, { NewsCardProps } from '../components/NewsCard';
import Head from 'next/head';
import Masonry from 'react-masonry-css';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LINKS } from '../lib/links';
import { SOURCES } from '../lib/sources';
import { useRouter } from 'next/router';
import { useCachedFetch } from '../hooks/useCachedFetch';
import Header from '../components/Header';
import SourceNav from '../components/SourceNav';
import Link from 'next/link';


const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const headerRef = useRef<HTMLDivElement>(null);
  const [stickSourceNav, setStickSourceNav] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(true);
  const [currentSource, setCurrentSource] = React.useState('douyin');
  const { data, loading, error } = useCachedFetch<NewsCardProps[]>(
    `news_${currentSource}`,
    () => fetch(`/api/${currentSource}`).then(res => res.json().then(data => data.news || [])),
    60 * 60 * 1000
  );
  const newsList: NewsCardProps[] = data || [];
  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    900: 2,
    600: 1,
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = window.innerHeight * 0.10; // 10vh
      if (scrollY > threshold) {
        setStickSourceNav(true);
        setShowHeader(false);
      } else {
        setStickSourceNav(false);
        setShowHeader(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSourceSwitch = (newSource: string) => {
    localStorage.removeItem(`news_${currentSource}`);
    setCurrentSource(newSource);
  };

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <div
        ref={headerRef}
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
        paddingTop: '10vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
        textAlign: 'center',
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
          <Link href={`/`} passHref legacyBehavior>
            <a
              style={{
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
            {t('pageTitle').split(' - ')[1]}
            </a>
          </Link>
        </h1>

        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 500,
          color: '#444',
          marginBottom: 48,
          maxWidth: '50vw',
          lineHeight: 1.4,
          textShadow: '0 1px 4px rgba(60,60,60,0.03)'
        }}>
          {t('pageDescription')}
        </h2>

        <div
          style={{
            position: stickSourceNav ? 'fixed' : 'static',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 200,
            background: stickSourceNav ? 'rgba(255,255,255,0.97)' : 'transparent',
            boxShadow: stickSourceNav ? '0 2px 12px rgba(0,0,0,0.07)' : 'none',
            transition: 'all 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1)',
            opacity: stickSourceNav ? 1 : 0,
            transform: stickSourceNav ? 'translateY(0)' : 'translateY(-32px)',
            pointerEvents: stickSourceNav ? 'auto' : 'none',
          }}
        >
          <SourceNav
            sources={SOURCES.map(s => ({
              key: s.key,
              label: t(`source.${s.key}`),
              icon: s.icon,
              color: s.color,
              active: currentSource === s.key,
            }))}
            onSourceChange={handleSourceSwitch}
            stickToTop={stickSourceNav}
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
            <div style={{ textAlign: 'center', margin: '32px 0', color: '#e74c3c', fontSize: 16 }}>{t('error', '加载失败')}</div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {newsList.map((item, idx) => (
                <NewsCard key={item.title + idx} {...item} position={item.position || idx + 1} />
              ))}
            </Masonry>
          )}
        </div>
      </section>

      <footer style={{
        width: '100%',
        minHeight: '10vh',
        background: 'rgba(255,255,255,0.92)',
        borderTop: '1px solid #f2f3f7',
        padding: '36px 0 24px 0',
        textAlign: 'center',
        fontSize: 15,
        color: '#aaa',
        fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
        letterSpacing: '0',
      }}>
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, marginBottom: 24, minHeight: 100, padding: '10px 0' }}>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" title={t('github')} style={{ color: '#222', fontSize: 22, transition: 'color 0.18s', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fa fa-github" aria-hidden="true" style={{ fontSize: 24, verticalAlign: 'middle' }} />
            <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.01em' }}>{t('github')}</span>
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" title={t('linkedin')} style={{ color: '#0077b5', fontSize: 22, transition: 'color 0.18s', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fa fa-linkedin-square" aria-hidden="true" style={{ fontSize: 24, verticalAlign: 'middle' }} />
            <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.01em' }}>{t('linkedin')}</span>
          </a>
          <a href={LINKS.ranbot} target="_blank" rel="noopener noreferrer" title={t('ranbot')} style={{ color: '#222', fontSize: 18, fontWeight: 600, textDecoration: 'none', transition: 'color 0.18s' }}>{t('ranbot')}</a>
        </nav>
        <span>
          &copy; {new Date().getFullYear()} &nbsp;
           <i
              className="fa fa-fire"
              style={{
                color: '#ff3b30',
                marginRight: 5,
                fontSize: 20,
                verticalAlign: 'middle'
              }}
              aria-hidden="true"
            /> 热点新闻
            &middot;
            Encore Shao
        </span>
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
          footer nav a:hover {
            color: #ff3b30 !important;
            text-decoration: underline;
          }
        `}</style>
      </footer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh', ['common'])),
  },
});

export default HomePage;