import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => (
  <section style={{
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
    padding: '0 16px',
    textAlign: 'center',
  }}>
    <h1 style={{
      fontSize: '3rem',
      fontWeight: 800,
      letterSpacing: '-1.5px',
      color: '#1a1a1a',
      marginBottom: 24,
      lineHeight: 1.1,
      textShadow: '0 2px 8px rgba(60,60,60,0.04)'
    }}>{title}</h1>
    <h2 style={{
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#444',
      marginBottom: 0,
      lineHeight: 1.4,
      textShadow: '0 1px 4px rgba(60,60,60,0.03)'
    }}>{description}</h2>
  </section>
);

export default HeroSection;