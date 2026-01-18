import React from 'react';
import { GradientWave } from "./gradient-wave";
import { useLanguage } from '../../contexts/LanguageContext';

export function HeroSection01() {
  const { t } = useLanguage();

  return (
    <div className="gradient-wave-hero">
      <GradientWave
        colors={["#f8fafc", "#e2e8f0", '#cbd5e1', "#94a3b8", "#f1f5f9"]}
        shadowPower={4}
        darkenTop={false} 
        noiseFrequency={[0.0001, 0.0002]}
        deform={{ incline: 0.2, noiseAmp: 100, noiseFlow: 2 }}
      />
      
      <div className="gradient-wave-content">
        <h1 className="gradient-wave-title">{t.heroTitle}</h1>
        <p className="gradient-wave-subtitle">{t.heroSubtitle}</p>
        
        <div className="gradient-wave-stats">
          <div className="gradient-wave-stat">
            <div className="gradient-wave-stat-icon">
              <i className="fas fa-globe"></i>
            </div>
            <div className="gradient-wave-stat-value">29</div>
            <div className="gradient-wave-stat-label">{t.statCountries}</div>
          </div>
          <div className="gradient-wave-stat">
            <div className="gradient-wave-stat-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <div className="gradient-wave-stat-value">50+</div>
            <div className="gradient-wave-stat-label">{t.statIndicators}</div>
          </div>
          <div className="gradient-wave-stat">
            <div className="gradient-wave-stat-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="gradient-wave-stat-value">2025</div>
            <div className="gradient-wave-stat-label">{t.statYear}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
