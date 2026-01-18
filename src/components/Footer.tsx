import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-title">
          <span>📈</span>
          <span>{t.footerTitle}</span>
        </div>
        <p className="footer-desc">{t.footerDesc}</p>
        <div className="footer-bottom">
          <p>🌍 Global Economic Data Platform 2025</p>
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
