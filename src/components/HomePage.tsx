import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { COUNTRIES_DATA } from '../data/countries';
import { useCountryMetrics } from '../data/countries-loader';
import { convertToUSD, formatUSD } from '../types/country';
import { SearchPanel } from './SearchPanel';
import { CustomDropdown } from './CustomDropdown';

const FEATURED_IDS = ['usa', 'china', 'japan', 'germany', 'uk', 'india'];

const translations = {
  zh: {
    navTitle: '全球经济数据',
    heroTitle: '全球经济数据 2025',
    heroSubtitle: '探索全球29个主要经济体的薪资水平、家庭收入、GDP及社会发展指标',
    statCountries: '个国家/地区',
    statIndicators: '项经济指标',
    statYear: '最新数据',
    featuredTitle: '主要经济体',
    featuredSubtitle: '全球领先经济体的核心数据',
    chartsTitle: '数据可视化',
    chartsSubtitle: '全球主要经济体关键指标对比',
    gdpRankingTitle: '人均GDP排名 (USD)',
    regionDistTitle: '区域分布',
    salaryTitle: '薪资水平对比 (USD)',
    growthTitle: 'GDP增长趋势 (%)',
    allCountriesTitle: '所有国家',
    allCountriesSubtitle: '点击查看各国详细经济数据和报告',
    searchPlaceholder: '搜索国家名称...',
    filterAll: '全部地区',
    filterAsia: '亚太地区',
    filterEurope: '欧洲',
    filterAmericas: '美洲',
    filterMiddleEast: '中东',
    sortBy: '排序方式',
    sortGDP: 'GDP',
    sortSalary: '薪资',
    sortPopulation: '人口',
    sortName: '名称',
    footerTitle: '全球经济数据平台',
    footerDesc: '汇聚全球29个主要经济体的核心经济指标，包括薪资水平、家庭收入、GDP增长、贫困率等重要数据',
    compareNav: '国家对比',
    compareBtn: '对比国家',
    compareSubtitle: '并排比较多个国家的经济指标',
    regionAsiaPacific: '亚太地区',
    regionEurope: '欧洲',
    regionAmericas: '美洲',
    regionMiddleEast: '中东'
  },
  en: {
    navTitle: 'Global Economic Data',
    heroTitle: 'Global Economic Data 2025',
    heroSubtitle: 'Explore salary levels, household income, GDP, and social development indicators across 29 major economies worldwide',
    statCountries: 'Countries/Regions',
    statIndicators: 'Economic Indicators',
    statYear: 'Latest Data',
    featuredTitle: 'Major Economies',
    featuredSubtitle: 'Core data from the world\'s leading economies',
    chartsTitle: 'Data Visualization',
    chartsSubtitle: 'Key indicators comparison across major global economies',
    gdpRankingTitle: 'GDP per Capita Ranking (USD)',
    regionDistTitle: 'Regional Distribution',
    salaryTitle: 'Salary Comparison (USD)',
    growthTitle: 'GDP Growth Trend (%)',
    allCountriesTitle: 'All Countries',
    allCountriesSubtitle: 'Click to view detailed economic data and reports',
    searchPlaceholder: 'Search country name...',
    filterAll: 'All Regions',
    filterAsia: 'Asia-Pacific',
    filterEurope: 'Europe',
    filterAmericas: 'Americas',
    filterMiddleEast: 'Middle East',
    sortBy: 'Sort by',
    sortGDP: 'GDP',
    sortSalary: 'Salary',
    sortPopulation: 'Population',
    sortName: 'Name',
    footerTitle: 'Global Economic Data Platform',
    footerDesc: 'Aggregating core economic indicators from 29 major economies worldwide, including salary levels, household income, GDP growth, and poverty rates',
    compareNav: 'Compare',
    compareBtn: 'Compare Countries',
    compareSubtitle: 'Compare economic indicators across multiple countries side by side',
    regionAsiaPacific: 'Asia-Pacific',
    regionEurope: 'Europe',
    regionAmericas: 'Americas',
    regionMiddleEast: 'Middle East'
  }
};

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState('0');
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && elementRef.current) {
            const numValue = parseInt(value.replace(/[^0-9]/g, ''));
            const prefix = value.match(/^[^0-9]*/)?.[0] || '';
            let current = 0;
            const duration = 2000;
            const startTime = Date.now();

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 4);
              current = numValue * ease;
              if (elementRef.current) {
                elementRef.current.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
              }
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, suffix]);

  return <span ref={elementRef}>0{suffix}</span>;
}

function FAB() {
  const { theme, setTheme } = useTheme();
  const { resolvedTheme } = useTheme(); // Use resolvedTheme for actual theme
  const { language, toggleLanguage } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('preferredTheme', newTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fab-container ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <button className="fab-sub" onClick={scrollToTop} title="Back to Top">
        <i className="fas fa-arrow-up"></i>
      </button>
      <button className="fab-sub" onClick={toggleLanguage} title={language === 'zh' ? 'Switch to English' : '切换到中文'}>
        <i className="fas fa-language"></i>
      </button>
      <button className="fab-sub" onClick={toggleTheme} title={resolvedTheme === 'dark' ? 'Switch to Light' : '切换到深色模式'}>
        <i className={`fas ${resolvedTheme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>
      <button
        className={`fab ${isExpanded ? 'open' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        title="Menu"
      >
        <i className={`fas ${isExpanded ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-card">
      <span className="stat-value"><AnimatedCounter value={value} /></span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

interface CardCountry {
  id: string;
  name: { zh: string; en: string };
  flag: string;
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

function FeaturedCountryCard({ country, isZh }: { country: CardCountry; isZh: boolean }) {
  const name = isZh ? country.name.zh : country.name.en;
  
  return (
    <Link to={`/countries/${country.id}`} className="featured-card">
      <span className="featured-flag">{country.flag}</span>
      <div className="featured-info">
        <h4>{name}</h4>
        <span className="featured-metric">
          <i className="fas fa-dollar-sign"></i>
          {country.metrics.gdpPerCapita}
        </span>
        <span className={`growth-badge ${parseFloat(country.metrics.gdpGrowth) >= 2 ? 'positive' : 'neutral'}`}>
          {country.metrics.gdpGrowth}
        </span>
      </div>
    </Link>
  );
}

function CountryCard({ country, isZh }: { country: CardCountry; isZh: boolean }) {
  const name = isZh ? country.name.zh : country.name.en;

  return (
    <div className="country-card">
      <Link to={`/countries/${country.id}`} className="country-card-clickable">
        <span className="country-flag">{country.flag}</span>
        <div className="country-info">
          <h3>{name}</h3>
          <p className="country-gdp">{country.metrics.gdpPerCapita}</p>
          <p className="country-salary">{country.metrics.salary}</p>
        </div>
        <span className={`growth-pill ${parseFloat(country.metrics.gdpGrowth) >= 2 ? 'positive' : 'neutral'}`}>
          {country.metrics.gdpGrowth}
        </span>
      </Link>
    </div>
  );
}

export function HomePage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const t = translations[language];
  const { countries: countryMetrics } = useCountryMetrics();

  // Use JSON data if available, otherwise fall back to static data
  const displayCountries = countryMetrics.length > 0 ? countryMetrics : COUNTRIES_DATA;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isScrolled, setIsScrolled] = useState(false);
  const [chartKey, setChartKey] = useState(0);
  const [countryCount, setCountryCount] = useState(35);

  // Update country count from loaded data
  useEffect(() => {
    if (countryMetrics.length > 0) {
      setCountryCount(countryMetrics.length);
    }
  }, [countryMetrics.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCountries = useMemo(() => {
    let result = [...displayCountries];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.zh.toLowerCase().includes(query) ||
        c.name.en.toLowerCase().includes(query)
      );
    }

    if (filterRegion !== 'all') {
      result = result.filter(c => c.region === filterRegion);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'gdp':
          return b.metrics.gdpPerCapitaRaw - a.metrics.gdpPerCapitaRaw;
        case 'salary': {
          const salaryUSD_A = convertToUSD(a.metrics.salaryRaw, a.metrics.currency);
          const salaryUSD_B = convertToUSD(b.metrics.salaryRaw, b.metrics.currency);
          return salaryUSD_B - salaryUSD_A;
        }
        case 'population':
          return b.metrics.population.localeCompare(a.metrics.population);
        default:
          return isZh ? a.name.zh.localeCompare(b.name.zh) : a.name.en.localeCompare(b.name.en);
      }
    });

    return result;
  }, [searchQuery, filterRegion, sortBy, isZh, countryMetrics]);

  const featuredCountries = useMemo(() => {
    return displayCountries.filter(c => FEATURED_IDS.includes(c.id));
  }, [displayCountries]);

  useEffect(() => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)';
    const legendColor = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)';

    const destroyChart = (canvasId: string) => {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (canvas && (canvas as any).chart) {
        (canvas as any).chart.destroy();
      }
    };

    const gdpCanvas = document.getElementById('gdpChart') as HTMLCanvasElement;
    if (gdpCanvas) {
      if ((gdpCanvas as any).chart) {
        (gdpCanvas as any).chart.destroy();
      }
      const gdpCtx = gdpCanvas.getContext('2d');
      if (gdpCtx) {
        const topCountries = [...displayCountries]
          .sort((a, b) => b.metrics.gdpPerCapitaRaw - a.metrics.gdpPerCapitaRaw)
          .slice(0, 10);
        
        (gdpCanvas as any).chart = new Chart(gdpCtx, {
          type: 'bar',
          data: {
            labels: topCountries.map(c => isZh ? c.name.zh : c.name.en),
            datasets: [{
              label: 'GDP per Capita',
              data: topCountries.map(c => c.metrics.gdpPerCapitaRaw),
              backgroundColor: 'rgba(100, 181, 246, 0.8)',
              borderRadius: 8
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                beginAtZero: true,
                grid: { color: gridColor },
                ticks: { color: textColor }
              },
              y: {
                grid: { display: false },
                ticks: { color: textColor }
              }
            }
          }
        });
      }
    }

    const regionCanvas = document.getElementById('regionChart') as HTMLCanvasElement;
    if (regionCanvas) {
      if ((regionCanvas as any).chart) {
        (regionCanvas as any).chart.destroy();
      }
      const regionCtx = regionCanvas.getContext('2d');
      if (regionCtx) {
        const regions = displayCountries.reduce((acc, c) => {
          acc[c.region] = (acc[c.region] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        (regionCanvas as any).chart = new Chart(regionCtx, {
          type: 'doughnut',
          data: {
            labels: [
              t.regionAsiaPacific,
              t.regionEurope,
              t.regionAmericas,
              t.regionMiddleEast
            ],
            datasets: [{
              data: [
                regions['asia-pacific'] || 0,
                regions['europe'] || 0,
                regions['americas'] || 0,
                regions['middle-east'] || 0
              ],
              backgroundColor: [
                'rgba(100, 181, 246, 0.8)',
                'rgba(76, 175, 80, 0.8)',
                'rgba(255, 193, 7, 0.8)',
                'rgba(156, 39, 176, 0.8)'
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: legendColor }
              }
            }
          }
        });
      }
    }

    const salaryCanvas = document.getElementById('salaryChart') as HTMLCanvasElement;
    if (salaryCanvas) {
      if ((salaryCanvas as any).chart) {
        (salaryCanvas as any).chart.destroy();
      }
      const salaryCtx = salaryCanvas.getContext('2d');
      if (salaryCtx) {
        const topSalary = [...displayCountries]
          .map(c => ({
            ...c,
            salaryUSD: convertToUSD(c.metrics.salaryRaw, c.metrics.currency)
          }))
          .sort((a, b) => b.salaryUSD - a.salaryUSD)
          .slice(0, 8);

        (salaryCanvas as any).chart = new Chart(salaryCtx, {
          type: 'bar',
          data: {
            labels: topSalary.map(c => isZh ? c.name.zh : c.name.en),
            datasets: [{
              label: 'Median Salary (USD)',
              data: topSalary.map(c => c.salaryUSD),
              backgroundColor: 'rgba(76, 175, 80, 0.8)',
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => {
                    const country = topSalary[ctx.dataIndex];
                    return [
                      `${country.flag} ${formatUSD(country.salaryUSD)} USD`,
                      `${isZh ? '原始' : 'Original'}: ${country.metrics.salary}`
                    ];
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: gridColor },
                ticks: {
                  color: textColor,
                  callback: (value) => formatUSD(value as number)
                }
              },
              x: {
                grid: { display: false },
                ticks: { color: textColor }
              }
            }
          }
        });
      }
    }

    const growthCanvas = document.getElementById('growthChart') as HTMLCanvasElement;
    if (growthCanvas) {
      if ((growthCanvas as any).chart) {
        (growthCanvas as any).chart.destroy();
      }
      const growthCtx = growthCanvas.getContext('2d');
      if (growthCtx) {
        const highGrowth = [...displayCountries]
          .sort((a, b) => parseFloat(b.metrics.gdpGrowth) - parseFloat(a.metrics.gdpGrowth))
          .slice(0, 10);

        (growthCanvas as any).chart = new Chart(growthCtx, {
          type: 'line',
          data: {
            labels: highGrowth.map(c => isZh ? c.name.zh : c.name.en),
            datasets: [{
              label: 'GDP Growth %',
              data: highGrowth.map(c => parseFloat(c.metrics.gdpGrowth)),
              borderColor: 'rgba(255, 193, 7, 0.8)',
              backgroundColor: 'rgba(255, 193, 7, 0.2)',
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: gridColor },
                ticks: { color: textColor }
              },
              x: {
                grid: { display: false },
                ticks: { color: textColor }
              }
            }
          }
        });
      }
    }
  }, [isZh, chartKey, displayCountries]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('preferredTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const event = new CustomEvent('reinitCharts');
          window.dispatchEvent(event);
        }
      });
    });

    document.documentElement && observer.observe(document.documentElement, { attributes: true });

    const handleReinitCharts = () => {
      setChartKey(prev => prev + 1);
    };

    window.addEventListener('reinitCharts', handleReinitCharts);

    return () => {
      observer.disconnect();
      window.removeEventListener('reinitCharts', handleReinitCharts);
    };
  }, []);

  return (
    <div className="homepage">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <FAB />
      
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-brand">
          <span className="brand-icon">🌍</span>
          <span className="brand-text">{t.navTitle}</span>
        </div>
        <div className="navbar-links">
          <a href="#hero">{isZh ? '首页' : 'Home'}</a>
          <a href="#featured">{isZh ? '主要经济体' : 'Featured'}</a>
          <a href="#charts">{isZh ? '数据' : 'Charts'}</a>
          <a href="#countries">{isZh ? '国家' : 'Countries'}</a>
          <Link to="/compare" className="nav-compare-link">{t.compareNav}</Link>
        </div>
      </nav>

      <section id="hero" className="hero-section">
        <div className="hero-dots">
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
          <div className="hero-dot"></div>
        </div>
        <div className="hero-content">
          <div className="hero-title-wrapper">
            <h1 className="hero-title">{t.heroTitle}</h1>
          </div>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <div className="hero-stats">
            <StatCard value={displayCountries.length.toString()} label={t.statCountries} />
            <StatCard value="50+" label={t.statIndicators} />
            <StatCard value="2025" label={t.statYear} />
          </div>
          <SearchPanel countries={displayCountries} />
          <div className="hero-actions">
            <Link to="/compare" className="hero-compare-btn">
              <i className="fas fa-balance-scale"></i>
              {t.compareBtn}
            </Link>
          </div>
        </div>
      </section>

      <section id="featured" className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <h2>{t.featuredTitle}</h2>
            <p>{t.featuredSubtitle}</p>
          </div>
          <div className="featured-grid">
            {featuredCountries.map(country => (
              <FeaturedCountryCard key={country.id} country={country} isZh={isZh} />
            ))}
          </div>
        </div>
      </section>

      <section id="charts" className="charts-section">
        <div className="section-container">
          <div className="section-header">
            <h2>{t.chartsTitle}</h2>
            <p>{t.chartsSubtitle}</p>
          </div>
          <div className="charts-grid">
            <div className="chart-card">
              <h3>{t.gdpRankingTitle}</h3>
              <div className="chart-wrapper">
                <canvas id="gdpChart"></canvas>
              </div>
            </div>
            <div className="chart-card">
              <h3>{t.regionDistTitle}</h3>
              <div className="chart-wrapper">
                <canvas id="regionChart"></canvas>
              </div>
            </div>
            <div className="chart-card">
              <h3>{t.salaryTitle}</h3>
              <div className="chart-wrapper">
                <canvas id="salaryChart"></canvas>
              </div>
            </div>
            <div className="chart-card">
              <h3>{t.growthTitle}</h3>
              <div className="chart-wrapper">
                <canvas id="growthChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="countries" className="countries-section">
        <div className="section-container">
          <div className="section-header">
            <h2>{t.allCountriesTitle}</h2>
            <p>{t.allCountriesSubtitle}</p>
          </div>
          <div className="filters-bar">
            <div className="region-filters">
              <button
                className={`filter-btn ${filterRegion === 'all' ? 'active' : ''}`}
                onClick={() => setFilterRegion('all')}
              >
                {t.filterAll}
              </button>
              <button
                className={`filter-btn ${filterRegion === 'asia-pacific' ? 'active' : ''}`}
                onClick={() => setFilterRegion('asia-pacific')}
              >
                {t.filterAsia}
              </button>
              <button
                className={`filter-btn ${filterRegion === 'europe' ? 'active' : ''}`}
                onClick={() => setFilterRegion('europe')}
              >
                {t.filterEurope}
              </button>
              <button
                className={`filter-btn ${filterRegion === 'americas' ? 'active' : ''}`}
                onClick={() => setFilterRegion('americas')}
              >
                {t.filterAmericas}
              </button>
              <button
                className={`filter-btn ${filterRegion === 'middle-east' ? 'active' : ''}`}
                onClick={() => setFilterRegion('middle-east')}
              >
                {t.filterMiddleEast}
              </button>
            </div>
            <div className="sort-dropdown">
              <CustomDropdown
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { value: 'name', label: t.sortName },
                  { value: 'gdp', label: t.sortGDP },
                  { value: 'salary', label: t.sortSalary }
                ]}
                label={`${t.sortBy}:`}
              />
            </div>
          </div>
          <div className="countries-grid">
            {filteredCountries.map(country => (
              <CountryCard key={country.id} country={country} isZh={isZh} />
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <h3>{t.footerTitle}</h3>
          <p>{t.footerDesc}</p>
        </div>
      </footer>
    </div>
  );
}
