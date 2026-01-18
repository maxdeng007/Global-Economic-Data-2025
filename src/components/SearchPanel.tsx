import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import type { Country } from '../types/country';

interface SearchPanelProps {
  countries: Country[];
}

export function SearchPanel({ countries }: SearchPanelProps) {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const navigate = useNavigate();
  
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => {
      if (debounceTimer.current !== null) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  const filteredCountries = useMemo(() => {
    if (!debouncedQuery) return [];
    
    const searchLower = debouncedQuery.toLowerCase();
    
    return countries.filter(country => {
      const nameZh = country.name.zh.toLowerCase();
      const nameEn = country.name.en.toLowerCase();
      return nameZh.includes(searchLower) || nameEn.includes(searchLower);
    }).slice(0, 8);
  }, [debouncedQuery, countries]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCountries.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Enter':
          event.preventDefault();
          if (filteredCountries[selectedIndex]) {
            navigate(`/countries/${filteredCountries[selectedIndex].id}`);
            setIsOpen(false);
            setQuery('');
          }
          break;
        case 'Escape':
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCountries, navigate]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCountries.length]);

  useEffect(() => {
    if (query.trim().length > 0) {
      setIsOpen(true);
    }
  }, [query]);

  const handleSelect = (country: Country) => {
    navigate(`/countries/${country.id}`);
    setIsOpen(false);
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getGrowthClass = (growth: string) => {
    const num = parseFloat(growth);
    if (num >= 2) return 'positive';
    if (num >= 0) return 'neutral';
    return 'negative';
  };

  const formatRegion = (region: string) => {
    const regionMap: Record<string, string> = {
      'asia-pacific': 'Asia-Pacific',
      'europe': 'Europe',
      'americas': 'Americas',
      'middle-east': 'Middle East'
    };
    return regionMap[region] || region;
  };

  return (
    <div className="search-panel-container">
      <div className={`search-input-wrapper ${isOpen ? 'focused' : ''}`}>
        <i className="fas fa-search search-icon"></i>
        <input
          ref={inputRef}
          type="text"
          placeholder={isZh ? '搜索国家名称...' : 'Search country name...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          onFocus={() => {
            if (query.trim().length > 0) {
              setIsOpen(true);
            }
          }}
        />
        {query && (
          <button className="search-clear-btn" onClick={handleClear}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      {isOpen && (
        <div ref={panelRef} className="search-results-panel">
          {filteredCountries.length === 0 ? (
            <div className="search-empty">
              <i className="fas fa-search"></i>
              <p>{isZh ? '未找到国家' : 'No countries found'}</p>
              <span>{isZh ? '尝试其他关键词' : 'Try a different search term'}</span>
            </div>
          ) : (
            <div className="search-results-list">
              {filteredCountries.map((country, index) => (
                <div
                  key={country.id}
                  className={`search-result-card ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSelect(country)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className="result-flag">{country.flag}</span>
                  <div className="result-info">
                    <div className="result-name">
                      <span className="name-primary">{isZh ? country.name.zh : country.name.en}</span>
                    </div>
                    <div className="result-metrics">
                      <span className="metric-salary">{country.metrics.salary}</span>
                      <span className={`metric-growth ${getGrowthClass(country.metrics.gdpGrowth)}`}>
                        {country.metrics.gdpGrowth}
                      </span>
                    </div>
                    <div className="result-details">
                      <span><i className="fas fa-users"></i> {country.metrics.population}</span>
                      <span><i className="fas fa-globe"></i> {isZh ? country.region : formatRegion(country.region)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredCountries.length > 0 && (
            <div className="search-footer">
              <div className="search-hints">
                <span><kbd>↑</kbd><kbd>↓</kbd> {isZh ? '导航' : 'Navigate'}</span>
                <span><kbd>↵</kbd> {isZh ? '选择' : 'Select'}</span>
                <span><kbd>esc</kbd> {isZh ? '关闭' : 'Close'}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
