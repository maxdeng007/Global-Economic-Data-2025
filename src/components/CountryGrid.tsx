import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COUNTRIES_DATA } from '../data/countries';
import { REGION_LABELS, ECONOMY_LABELS } from '../types/country';
import { CountryCard } from './CountryCard';
import { useLanguage } from '../contexts/LanguageContext';

interface Country {
  id: string;
  name: { zh: string; en: string };
  flag: string;
  file: string;
  region: string;
  economy: string;
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

export type RegionType = 'asia-pacific' | 'europe' | 'americas' | 'middle-east';
export type EconomyType = 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g7' | 'g20' | 'developed' | 'emerging' | 'developing';

export function CountryGrid() {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState<RegionType | 'all'>('all');
  const [economyFilter, setEconomyFilter] = useState<EconomyType | 'all'>('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter countries
  const filteredCountries = useMemo(() => {
    return COUNTRIES_DATA.filter(country => {
      const name = isZh ? country.name.zh : country.name.en;
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = regionFilter === 'all' || country.region === regionFilter;
      const matchesEconomy = economyFilter === 'all' || country.economy === economyFilter;
      return matchesSearch && matchesRegion && matchesEconomy;
    });
  }, [search, regionFilter, economyFilter, isZh]);

  // Favorites and recent
  const favoriteCountries = useMemo(() => 
    COUNTRIES_DATA.filter(c => favorites.includes(c.id)), 
  [favorites]);

  const handleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(c => c !== id));
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, id]);
    }
  };

  // Comparison modal content
  const comparisonContent = useMemo(() => {
    if (compareList.length < 2) return null;
    const countries = COUNTRIES_DATA.filter(c => compareList.includes(c.id));
    return countries.map(c => ({
      ...c,
      salaryUSD: Math.round(c.metrics.salaryRaw * (c.metrics.currency === 'USD' ? 1 : 
        c.metrics.currency === 'EUR' ? 1.08 : 
        c.metrics.currency === 'GBP' ? 1.27 : 
        c.metrics.currency === 'JPY' ? 0.0065 : 
        c.metrics.currency === 'CNY' ? 0.14 : 
        c.metrics.currency === 'KRW' ? 0.00072 : 1))
    }));
  }, [compareList]);

  return (
    <section className="grid-view-section">
      {/* Favorites Section */}
      {favoriteCountries.length > 0 && (
        <section className="favorites-section">
          <div className="favorites-container">
            <div className="favorites-title">
              <span>⭐</span>
              <span>{t.favoritesTitle}</span>
            </div>
            <div className="favorites-list">
              {favoriteCountries.map(country => (
                <Link key={country.id} to={`/countries/${country.id}`} className="favorites-item">
                  {country.flag} {isZh ? country.name.zh : country.name.en}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-container">
          {/* Search */}
          <div className="search-wrapper">
            <div className="search-box">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                className="search-input" 
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button 
                  className="search-clear"
                  onClick={() => setSearch('')}
                >
                  ×
                </button>
              )}
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="quick-filters">
            <button 
              className={`quick-filter-btn ${regionFilter === 'all' && economyFilter === 'all' ? 'active' : ''}`}
              onClick={() => { setRegionFilter('all'); setEconomyFilter('all'); }}
            >
              All
            </button>
            <span className="filter-divider">|</span>
            <button 
              className={`quick-filter-btn ${regionFilter === 'asia-pacific' ? 'active' : ''}`}
              onClick={() => setRegionFilter('asia-pacific')}
            >
              Asia
            </button>
            <button 
              className={`quick-filter-btn ${regionFilter === 'europe' ? 'active' : ''}`}
              onClick={() => setRegionFilter('europe')}
            >
              Europe
            </button>
            <button 
              className={`quick-filter-btn ${regionFilter === 'americas' ? 'active' : ''}`}
              onClick={() => setRegionFilter('americas')}
            >
              Americas
            </button>
            <span className="filter-divider">|</span>
            <button 
              className={`quick-filter-btn ${economyFilter === 'g7' ? 'active' : ''}`}
              onClick={() => setEconomyFilter('g7')}
            >
              G7
            </button>
            <button 
              className={`quick-filter-btn ${economyFilter === 'g20' ? 'active' : ''}`}
              onClick={() => setEconomyFilter('g20')}
            >
              G20
            </button>
            <button 
              className={`quick-filter-btn ${economyFilter === 'developed' ? 'active' : ''}`}
              onClick={() => setEconomyFilter('developed')}
            >
              Developed
            </button>
            <button 
              className={`quick-filter-btn ${economyFilter === 'emerging' ? 'active' : ''}`}
              onClick={() => setEconomyFilter('emerging')}
            >
              Emerging
            </button>
          </div>
          
          {/* Results Count */}
          <div className="filter-results">
            <span className="results-count">{filteredCountries.length}</span>
            <span className="results-label">{isZh ? '个' : ''}</span>
            <span className="results-label">{isZh ? '' : 'countries'}</span>
          </div>
        </div>
      </section>

      {/* Country Grid */}
      <section className="country-section">
        <div className="country-grid">
          {filteredCountries.map(country => (
            <CountryCard
              key={country.id}
              country={country}
              onFavorite={handleFavorite}
              onCompare={handleCompare}
              isFavorite={favorites.includes(country.id)}
              isComparing={compareList.includes(country.id)}
            />
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      {compareList.length > 0 && (
        <section className="comparison-section">
          <div className="comparison-container">
            <div className="comparison-title">
              <span>⚖️</span>
              <span>{t.compareTitle}</span>
              <span className="comparison-count">{compareList.length}/3</span>
            </div>
            <div className="comparison-list">
              {COUNTRIES_DATA.filter(c => compareList.includes(c.id)).map(c => (
                <div key={c.id} className="comparison-item">
                  {c.flag} {isZh ? c.name.zh : c.name.en}
                </div>
              ))}
            </div>
            <div className="comparison-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setCompareList([])}
              >
                {t.clearCompare}
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => setShowComparison(true)}
                disabled={compareList.length < 2}
              >
                {t.showCompare}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Modal */}
      {showComparison && comparisonContent && comparisonContent.length >= 2 && (
        <div className="modal-overlay" onClick={() => setShowComparison(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t.comparisonTitle}</h2>
              <button className="modal-close" onClick={() => setShowComparison(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>{isZh ? '指标' : 'Metric'}</th>
                    {comparisonContent.map(c => (
                      <th key={c.id}>
                        {c.flag} {isZh ? c.name.zh : c.name.en}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t.salary}</td>
                    {comparisonContent.map(c => (
                      <td key={c.id}>{c.metrics.salary} {c.metrics.currency}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.salary} (USD)</td>
                    {comparisonContent.map(c => (
                      <td key={c.id}>{formatUSD(c.salaryUSD)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.gdpPerCapita}</td>
                    {comparisonContent.map(c => (
                      <td key={c.id}>{c.metrics.gdpPerCapita}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.population}</td>
                    {comparisonContent.map(c => (
                      <td key={c.id}>{c.metrics.population}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.gdpGrowth}</td>
                    {comparisonContent.map(c => (
                      <td key={c.id}>{c.metrics.gdpGrowth}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Helper function
function formatUSD(value: number): string {
  if (value >= 1000000) {
    return '$' + (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return '$' + Math.round(value / 1000) + 'K';
  }
  return '$' + value;
}
