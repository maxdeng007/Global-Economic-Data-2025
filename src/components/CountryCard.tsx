import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Country {
  id: string;
  name: { zh: string; en: string };
  flag: string;
  file: string;
  region: string;
  economy: string;
  comingSoon?: boolean;
  metrics: {
    salary: string;
    salaryRaw: number;
    household: string;
    householdRaw: number;
    gdpPerCapita: string;
    gdpPerCapitaRaw: number;
    gdpGrowth: string;
    currency: string;
    population: string;
  };
}

interface CountryCardProps {
  country: Country;
  onFavorite: (id: string) => void;
  onCompare: (id: string) => void;
  isFavorite: boolean;
  isComparing: boolean;
}

export function CountryCard({ 
  country, 
  onFavorite, 
  onCompare, 
  isFavorite, 
  isComparing 
}: CountryCardProps) {
  const { t, language } = useLanguage();
  const name = language === 'zh' ? country.name.zh : country.name.en;

  return (
    <div className="country-card">
      <Link to={`/countries/${country.id}`} className="country-card-link">
        <div className="country-header">
          <span className="country-flag">{country.flag}</span>
          <div className="country-info">
            <h3 className="country-name">{name}</h3>
            <span className="country-region">
              {language === 'zh' ? country.region : country.region}
            </span>
          </div>
          {country.comingSoon && (
            <span className="coming-soon-badge">Coming Soon</span>
          )}
        </div>
        
        <div className="country-metrics">
          <div className="metric">
            <span className="metric-label">{t.salary}</span>
            <span className="metric-value">{country.metrics.salary}</span>
          </div>
          <div className="metric">
            <span className="metric-label">{t.gdpPerCapita}</span>
            <span className="metric-value">{country.metrics.gdpPerCapita}</span>
          </div>
        </div>
      </Link>
      
      {!country.comingSoon && (
        <div className="country-actions">
          <button 
            className={`action-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onFavorite(country.id); }}
            title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button 
            className={`action-btn ${isComparing ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onCompare(country.id); }}
            title={isComparing ? t.removeFromCompare : t.addToCompare}
          >
            ⚖
          </button>
        </div>
      )}
    </div>
  );
}
