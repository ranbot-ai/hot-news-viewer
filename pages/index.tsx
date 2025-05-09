import React, { useEffect, useState } from 'react';
import NewsCard, { NewsCardProps } from '../components/NewsCard';
import axios from 'axios';
import Head from 'next/head';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'next-i18next';
import { FaGlobe } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LINKS } from '../lib/links';
import { SOURCES } from '../lib/sources';
import { useRouter } from 'next/router';

const fetchNews = async (source: string): Promise<NewsCardProps[]> => {
  if (['douyin', 'bilibili', 'netease'].includes(source)) {
    const res = await axios.get(`/api/${source}`);
    return res.data.news || [];
  }
  return [];
};

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation('common');

  const router = useRouter();
  const [news, setNews] = useState<NewsCardProps[]>([]);
  const [displayedNews, setDisplayedNews] = useState<NewsCardProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState('douyin');
  const [bannerImg, setBannerImg] = useState<string>("");

  // Clear news immediately on source switch
  const handleSourceSwitch = (newSource: string) => {
    if (newSource !== source) {
      setNews([]);
      setDisplayedNews([]);
      setHasMore(true);
      setLoading(true);
      setSource(newSource);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNews(source)
      .then(newsArr => {
        setNews(newsArr);
        setDisplayedNews(newsArr.slice(0, 12));
        setHasMore(newsArr.length > 12);
      })
      .catch((error) => {
        setError(t('fetchError'));
      })
      .finally(() => setLoading(false));
  }, [source]);

  const fetchMoreData = () => {
    if (displayedNews.length >= news.length) {
      setHasMore(false);
      return;
    }
    // Simulate async loading
    setTimeout(() => {
      setDisplayedNews(prev => [
        ...prev,
        ...news.slice(prev.length, prev.length + 12)
      ]);
      if (displayedNews.length + 12 >= news.length) setHasMore(false);
    }, 500);
  };

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      <header style={{
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        borderBottom: '1px solid #f2f3f7',
        padding: '0 0 0 0',
        marginBottom: 16,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '18px 32px 12px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span className="header-title" style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '-1px',
            color: '#222',
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
            textShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transition: 'color 0.18s',
            cursor: 'pointer',
          }}>
            <i className="fa fa-fire" style={{ color: '#ff3b30', marginRight: 12, fontSize: 32, verticalAlign: 'middle' }} aria-hidden="true" />
            {t('appTitle')}
          </span>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" title={t('github')} style={{ color: '#222', fontSize: 22, transition: 'color 0.18s', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fa fa-github" aria-hidden="true" style={{ fontSize: 24, verticalAlign: 'middle' }} />
              <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.01em' }}>{t('github')}</span>
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" title={t('linkedin')} style={{ color: '#0077b5', fontSize: 22, transition: 'color 0.18s', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fa fa-linkedin-square" aria-hidden="true" style={{ fontSize: 24, verticalAlign: 'middle' }} />
              <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.01em' }}>{t('linkedin')}</span>
            </a>
            <a href={LINKS.ranbot} target="_blank" rel="noopener noreferrer" title={t('ranbot')} style={{ color: '#222', fontSize: 18, fontWeight: 600, textDecoration: 'none', transition: 'color 0.18s' }}>{t('ranbot')}</a>
            {/* Language Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 18 }}>
              {(() => {
                const LANGS = [
                  { code: 'zh', label: t('lang.zh') },
                  { code: 'en', label: t('lang.en') },
                  { code: 'fr', label: t('lang.fr') },
                  { code: 'jp', label: t('lang.jp') },
                ];
                const handleLanguageChange = (lang: string) => {
                  router.push(router.asPath, router.asPath, { locale: lang });
                };

                return (
                  <>
                    <FaGlobe
                      style={{
                        fontSize: 20,
                        color: LANGS.some(l => l.code === i18n.language) ? '#ff3b30' : '#bbb',
                        marginRight: 2,
                        verticalAlign: 'middle',
                        transition: 'color 0.18s',
                      }}
                    />
                    {LANGS.map((lang, idx) => (
                      <React.Fragment key={lang.code}>
                        <button
                          onClick={() => handleLanguageChange(lang.code)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: i18n.language === lang.code ? '#ff3b30' : '#222',
                            fontWeight: i18n.language === lang.code ? 700 : 500,
                            fontSize: 17,
                            padding: '4px 10px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            transition: 'color 0.18s, background 0.18s',
                            outline: 'none',
                            textDecoration: i18n.language === lang.code ? 'underline' : 'none',
                          }}
                          aria-pressed={i18n.language === lang.code}
                        >
                          {lang.label}
                        </button>
                        {idx < LANGS.length - 1 && (
                          <span style={{ color: '#bbb', fontSize: 15, fontWeight: 400 }}>|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                );
              })()}
            </div>
          </nav>
        </div>
      </header>
      <main style={{ marginBottom: 32 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          {bannerImg && (
            <div
              style={{
                width: '100%',
                height: 150,
                borderRadius: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                backgroundImage: `url(${bannerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                position: 'relative',
                margin: '0 auto 24px auto',
              }}
              aria-label="热点新闻"
            />
          )}
          <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              display: 'inline-flex',
              borderRadius: 24,
              background: '#f2f3f7',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              minHeight: 64,
            }}>
              {SOURCES.map(s => (
                <button
                  key={s.key}
                  onClick={() => handleSourceSwitch(s.key)}
                  style={{
                    padding: '18px 48px',
                    fontSize: 22,
                    fontWeight: 700,
                    border: 'none',
                    background: source === s.key ? '#fff' : 'transparent',
                    color: source === s.key ? '#ff3b30' : '#222',
                    boxShadow: source === s.key ? '0 4px 16px rgba(0,0,0,0.10)' : 'none',
                    transition: 'all 0.18s',
                    cursor: 'pointer',
                    outline: 'none',
                    borderRight: s.key !== SOURCES[SOURCES.length - 1].key ? '1px solid #e0e0e0' : 'none',
                    borderRadius: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                  aria-pressed={source === s.key}
                >
                  <i className={`fa ${s.icon}`} style={{ color: s.color, fontSize: 24, marginRight: 10, verticalAlign: 'middle' }} aria-hidden="true" />
                  {t(`source.${s.key}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="news-grid">
            {loading ? (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '48px 0' }}>
                <div className="apple-spinner" />
                <div style={{ marginTop: 12, color: '#888', fontSize: 16 }}>{t('loading')}</div>
              </div>
            ) : error ? (
              <p style={{ color: 'red', textAlign: 'center', gridColumn: '1 / -1' }}>{t('error')}</p>
            ) : displayedNews.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#aaa', gridColumn: '1 / -1' }}>{t('noNews')}</p>
            ) : (
              <InfiniteScroll
                dataLength={displayedNews.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div style={{ textAlign: 'center', padding: 32 }}><div className="apple-spinner" /><div style={{ marginTop: 12, color: '#888', fontSize: 16 }}>{t('loading')}</div></div>}
                style={{ overflow: 'visible' }}
              >
                <Masonry
                  breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                  className="masonry-grid"
                  columnClassName="masonry-grid_column"
                >
                  {displayedNews.map((item) => (
                    <NewsCard key={item.rank + item.title} {...item} />
                  ))}
                </Masonry>
              </InfiniteScroll>
            )}
          </div>
        </div>
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
          .masonry-grid_column > div {
            margin-bottom: 32px;
          }
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
          header nav a:hover {
            color: #ff3b30 !important;
            text-decoration: underline;
          }
          .header-title:hover {
            color: #ff3b30 !important;
          }
        `}</style>
      </main>
      <footer style={{
        width: '100%',
        background: 'rgba(255,255,255,0.92)',
        borderTop: '1px solid #f2f3f7',
        marginTop: 48,
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