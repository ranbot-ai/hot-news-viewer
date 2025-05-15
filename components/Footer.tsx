import React from 'react';
import { useTranslation } from 'next-i18next';
import { LINKS } from '../lib/links';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  return (
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
  );
};

export default Footer;