import React from 'react';
import { useTranslation } from 'next-i18next';
import { FaGlobe } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { LINKS } from '../lib/links';
import Link from 'next/link';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  return (
    <header style={{
      position: 'fixed',
      top: 24,
      left: 0,
      right: 0,
      zIndex: 100,
      background: '#fff',
      borderRadius: 40,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '12px 36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'box-shadow 0.18s, background 0.18s',
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
        <i
          className="fa fa-fire"
          style={{
            color: '#ff3b30',
            marginRight: 12,
            fontSize: 32,
            verticalAlign: 'middle'
          }}
          aria-hidden="true"
        />

        <Link href={`/`} passHref legacyBehavior>
          <a
            style={{
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
          {t('appTitle')}
          </a>
        </Link>
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
              { code: 'ja', label: t('lang.ja') },
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
    </header>
  );
};

export default Header;