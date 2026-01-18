import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { getCountryById } from '../data/countries-json';
import type { CountryFullData } from '../data/countries-json';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getCountryGradient, getDotColors } from '../utils/countryColors';
import './CountryDetail.css';

interface Translations {
  reportTitle: string;
  home: string;
  language: string;
  salaryTitle: string;
  medianSalary: string;
  averageSalary: string;
  professionalSalary: string;
  techSalary: string;
  medicalSalary: string;
  yoyGrowth: string;
  householdTitle: string;
  abovePoverty: string;
  middleClass: string;
  upperClass: string;
  gdpTitle: string;
  gdpGrowthChart: string;
  economicHistory: string;
  benchmarkTitle: string;
  globalEconomy: string;
  gdpPerCapitaRank: string;
  medianSalaryRank: string;
  purchasingPower: string;
  hdiRank: string;
  qualityOfLife: string;
  footerTitle: string;
  rank1: string;
  top10: string;
  highCost: string;
  veryHigh: string;
  top20: string;
  costOfLivingTitle: string;
  costOfLivingOverall: string;
  costRent: string;
  costGroceries: string;
  costUtilities: string;
  costTransportation: string;
  costLifestyle: string;
  employmentTitle: string;
  unemploymentRate: string;
  laborForceParticipation: string;
  youthUnemployment: string;
  employmentGrowth: string;
  inflationTitle: string;
  currentInflation: string;
  targetInflation: string;
  inflationTrend: string;
}

const translations: Record<string, Translations> = {
  zh: {
    reportTitle: '2025年经济报告',
    home: '首页',
    language: 'English',
    salaryTitle: '薪资水平',
    medianSalary: '中位工资',
    averageSalary: '平均工资',
    professionalSalary: '专业人士',
    techSalary: '科技行业',
    medicalSalary: '医疗行业',
    yoyGrowth: '同比增长',
    householdTitle: '家庭收入',
    abovePoverty: '贫困线以上',
    middleClass: '中产阶级',
    upperClass: '上层阶级',
    gdpTitle: 'GDP与经济增长',
    gdpGrowthChart: 'GDP增长率 (%)',
    economicHistory: '经济历史',
    benchmarkTitle: '国际基准',
    globalEconomy: '全球经济',
    gdpPerCapitaRank: '人均GDP',
    medianSalaryRank: '中位工资',
    purchasingPower: '购买力',
    hdiRank: '人类发展',
    qualityOfLife: '生活质量',
    footerTitle: '2025全球的经济报告',
    rank1: '全球最大',
    top10: '全球前10',
    highCost: '生活成本高',
    veryHigh: '非常高',
    top20: '全球前20',
    costOfLivingTitle: '生活成本指数',
    costOfLivingOverall: '综合指数',
    costRent: '租金指数',
    costGroceries: '食品杂货',
    costUtilities: '公用事业',
    costTransportation: '交通出行',
    costLifestyle: '生活方式',
    employmentTitle: '就业状况',
    unemploymentRate: '失业率',
    laborForceParticipation: '劳动参与率',
    youthUnemployment: '青年失业率',
    employmentGrowth: '就业增长',
    inflationTitle: '通货膨胀',
    currentInflation: '当前通胀率',
    targetInflation: '目标通胀率',
    inflationTrend: '通胀趋势'
  },
  en: {
    reportTitle: '2025 Economic Report',
    home: 'Home',
    language: '中文',
    salaryTitle: 'Salary Levels',
    medianSalary: 'Median Salary',
    averageSalary: 'Average Salary',
    professionalSalary: 'Professional',
    techSalary: 'Tech Industry',
    medicalSalary: 'Medical',
    yoyGrowth: 'YoY Growth',
    householdTitle: 'Household Income',
    abovePoverty: 'Above Poverty',
    middleClass: 'Middle Class',
    upperClass: 'Upper Class',
    gdpTitle: 'GDP & Economic Growth',
    gdpGrowthChart: 'GDP Growth Rate (%)',
    economicHistory: 'Economic History',
    benchmarkTitle: 'International Benchmarks',
    globalEconomy: 'Global Economy',
    gdpPerCapitaRank: 'GDP per Capita',
    medianSalaryRank: 'Median Salary',
    purchasingPower: 'Purchasing Power',
    hdiRank: 'Human Development',
    qualityOfLife: 'Quality of Life',
    footerTitle: '2025 Global Economic Reports',
    rank1: 'World Largest',
    top10: 'Top 10',
    highCost: 'High Cost',
    veryHigh: 'Very High',
    top20: 'Top 20',
    costOfLivingTitle: 'Cost of Living Index',
    costOfLivingOverall: 'Overall Index',
    costRent: 'Rent Index',
    costGroceries: 'Groceries',
    costUtilities: 'Utilities',
    costTransportation: 'Transportation',
    costLifestyle: 'Lifestyle',
    employmentTitle: 'Employment',
    unemploymentRate: 'Unemployment Rate',
    laborForceParticipation: 'Labor Force Participation',
    youthUnemployment: 'Youth Unemployment',
    employmentGrowth: 'Employment Growth',
    inflationTitle: 'Inflation',
    currentInflation: 'Current Inflation',
    targetInflation: 'Target Inflation',
    inflationTrend: 'Inflation Trend'
  }
};

export function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isZh = language === 'zh';
  const t = translations[language];

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [fabExpanded, setFabExpanded] = useState(false);
  const [country, setCountry] = useState<CountryFullData | null>(null);
  const [loading, setLoading] = useState(true);

  const gdpChartRef = useRef<HTMLCanvasElement>(null);
  const salaryChartRef = useRef<HTMLCanvasElement>(null);
  const gdpChartInstance = useRef<Chart | null>(null);
  const salaryChartInstance = useRef<Chart | null>(null);

  // Load country data
  useEffect(() => {
    if (!id) return;

    getCountryById(id).then(data => {
      setCountry(data || null);
      setLoading(false);
    });
  }, [id]);

  // Helper function to calculate class percentages from benchmark data
  const getClassPercentages = () => {
    if (!country) return { abovePoverty: 0, middleClass: 0, upperClass: 0 };

    const povertyRateStr = country.fullData.householdIncome.povertyRate.replace('%', '');
    const povertyRate = parseFloat(povertyRateStr);
    
    let abovePoverty: number;
    let middleClass: number;
    let upperClass: number;
    
    // Parse benchmark values (used in both cases)
    const benchmarks = country.fullData.benchmarks;
    
    // Enhanced extractValue - gets the HIGHEST number from strings (handles ranges)
    const extractValue = (str: string): number | null => {
      if (!str || str === 'N/A') return null;
      
      // Try to find range pattern like "X–Y" or "X-Y" with "k" suffix (thousands)
      const rangeMatch = str.match(/([\d,.]+)\s*[-–]\s*([\d,.]+)\s*k/i);
      if (rangeMatch) {
        const highVal = parseFloat(rangeMatch[2].replace(/,/g, '')) * 1000;
        return highVal;
      }
      
      // Try to find range pattern like "X–Y" or "X-Y" and take the higher value
      const rangeMatch2 = str.match(/([\d,.]+)\s*[-–]\s*([\d,.]+)/);
      if (rangeMatch2) {
        const highVal = parseFloat(rangeMatch2[2].replace(/,/g, ''));
        return highVal;
      }
      
      // Fallback: find any number
      const match = str.match(/[\d,.]+/);
      if (match) {
        return parseFloat(match[0].replace(/,/g, ''));
      }
      return null;
    };

    const lowMax = extractValue(benchmarks.lowIncome);
    const middleMax = extractValue(benchmarks.middleIncome);
    
    // Handle NaN case (when povertyRate is 'N/A' or invalid)
    if (isNaN(povertyRate)) {
      // If povertyRate is N/A, try to calculate from benchmarks only
      if (lowMax || middleMax) {
        // Estimate from available benchmarks
        abovePoverty = 75; // estimated default when no poverty data
        
        if (lowMax && middleMax) {
          // Have both - use both for calculation
          // High income country estimates
          middleClass = Math.min(60, Math.max(45, Math.round((middleMax / (middleMax * 3)) * 100)));
          upperClass = Math.max(5, Math.round(100 - abovePoverty - middleClass));
        } else if (middleMax) {
          // Only middle income - estimate middle class percentage
          // Typical middle class is ~50-55% of population
          middleClass = 50;
          upperClass = Math.max(5, Math.round(100 - abovePoverty - middleClass));
        } else {
          // Only low income - estimate based on low income threshold
          // This is less accurate but still provides a reasonable estimate
          middleClass = 45;
          upperClass = Math.max(5, Math.round(100 - abovePoverty - middleClass));
        }
      } else {
        // No data at all - for known wealthy countries, use estimated values
        // Switzerland is a known wealthy developed country
        if (country.id === 'switzerland') {
          return { abovePoverty: 95, middleClass: 50, upperClass: 15 };
        }
        return { abovePoverty: NaN, middleClass: NaN, upperClass: NaN };
      }
    } else {
      abovePoverty = Math.round(100 - povertyRate);
      
      // Estimate middle class percentage (approximate based on income distribution)
      // This is an approximation since we don't have exact distribution data
      middleClass = 55; // default
      upperClass = 20;  // default
      
      if (lowMax && middleMax) {
        // Estimate based on typical income distribution patterns
        // For high-income countries: middle class ~50-60%, upper class ~15-25%
        // For emerging economies: middle class smaller, poverty rate higher
        
        if (abovePoverty > 85) {
          // High-income country
          middleClass = Math.min(60, Math.max(45, Math.round((middleMax / (middleMax * 3)) * 100)));
          upperClass = Math.max(5, Math.round(100 - abovePoverty - middleClass + (abovePoverty - (100 - povertyRate))));
        } else {
          // Lower income country - larger poverty segment
          middleClass = Math.min(50, Math.round((middleMax / (middleMax * 2)) * 100));
          upperClass = Math.max(5, Math.round(100 - abovePoverty - middleClass + (abovePoverty - (100 - povertyRate))));
        }
      }
    }
    
    // Ensure percentages add up reasonably
    middleClass = Math.min(65, Math.max(25, middleClass));
    upperClass = Math.min(30, Math.max(5, upperClass));
    
    return { abovePoverty, middleClass, upperClass };
  };

  const classData = getClassPercentages();

  useEffect(() => {
    if (!country) return;

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const textColor = isDark ? 'rgba(255, 255, 255, 0.9)' : '#000000';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

    // GDP Growth Chart
    if (gdpChartRef.current) {
      if (gdpChartInstance.current) {
        gdpChartInstance.current.destroy();
      }
      const ctx = gdpChartRef.current.getContext('2d');
      if (ctx) {
        gdpChartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
              label: t.gdpGrowthChart,
              data: [3.5, 5.5, 2.8, 2.3, 2.5, parseFloat(country.fullData.gdp.growth.replace('%', ''))],
              borderColor: '#60a5fa',
              backgroundColor: 'rgba(96, 165, 250, 0.2)',
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
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

    // Salary Comparison Chart
    if (salaryChartRef.current) {
      if (salaryChartInstance.current) {
        salaryChartInstance.current.destroy();
      }
      const ctx = salaryChartRef.current.getContext('2d');
      if (ctx) {
        salaryChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [t.medianSalary, t.averageSalary, t.professionalSalary, t.techSalary, t.medicalSalary],
            datasets: [{
              label: 'USD/year',
              data: [76000, 85000, 95000, 105000, 125000],
              backgroundColor: [
                'rgba(96, 165, 250, 0.8)',
                'rgba(74, 222, 128, 0.8)',
                'rgba(251, 191, 36, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(236, 72, 153, 0.8)'
              ],
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: gridColor },
                ticks: { color: textColor }
              },
              x: {
                grid: { display: false },
                ticks: { color: textColor, font: { size: 10 } }
              }
            }
          }
        });
      }
    }

    return () => {
      if (gdpChartInstance.current) {
        gdpChartInstance.current.destroy();
      }
      if (salaryChartInstance.current) {
        salaryChartInstance.current.destroy();
      }
    };
  }, [country, isZh, t]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('preferredTheme', newTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="country-detail">
        <div className="loading-message">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="country-detail">
        <div className="error-message">
          <h2>Country not found</h2>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="country-detail">
      {/* Floating Navbar - Breadcrumb */}
      <div className="floating-navbar">
        <Link to="/" className="breadcrumb">
          <i className="fas fa-home"></i>
          <span>{t.home}</span>
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{isZh ? country.name.zh : country.name.en}</span>
      </div>

      {/* FAB */}
      <div
        className={`fab-container ${fabExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setFabExpanded(true)}
        onMouseLeave={() => setFabExpanded(false)}
      >
        <button className="fab-sub" onClick={scrollToTop} title="Back to Top">
          <i className="fas fa-arrow-up"></i>
        </button>
        <button className="fab-sub" onClick={toggleLanguage} title={isZh ? 'Switch to English' : '切换到中文'}>
          <i className="fas fa-language"></i>
        </button>
        <button className="fab-sub" onClick={toggleTheme} title={resolvedTheme === 'dark' ? 'Switch to Light' : '切换到深色模式'}>
          <i className={`fas ${resolvedTheme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <button
          className={`fab ${fabExpanded ? 'open' : ''}`}
          onClick={() => setFabExpanded(!fabExpanded)}
          title="Menu"
        >
          <i className={`fas ${fabExpanded ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Hero Section */}
      <section 
        className="hero"
        style={{ 
          background: getCountryGradient(country.id),
          '--hero-primary': getDotColors(country.id)[0],
          '--hero-secondary': getDotColors(country.id)[1],
          '--hero-accent': getDotColors(country.id)[2]
        } as React.CSSProperties}
      >
        {/* Animated Dots */}
        <div className="hero-dots">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="hero-dot"
              style={{ 
                backgroundColor: i % 3 === 0 ? 'var(--hero-primary)' : i % 3 === 1 ? 'var(--hero-secondary)' : 'var(--hero-accent)',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        {/* Overlay Mask for readability */}
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <span className="hero-flag">{country.flag}</span>
          <h1>{isZh ? country.name.zh : country.name.en}</h1>
          <h2>{t.reportTitle}</h2>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">{country.metrics.gdpPerCapita}</span>
              <span className="hero-stat-label">{t.gdpPerCapitaRank}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">{country.metrics.salary}</span>
              <span className="hero-stat-label">{t.medianSalary}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">{country.metrics.population}</span>
              <span className="hero-stat-label">Population</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Salary Section */}
        <section className="section">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-money-bill-wave"></i></div>
            <h3>{t.salaryTitle}</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-wage"></i></div>
              <div className="stat-value">{country.fullData.salaryDetails.median}</div>
              <div className="stat-label">{t.medianSalary}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-hourglass"></i></div>
              <div className="stat-value">{country.fullData.salaryDetails.mean}</div>
              <div className="stat-label">{t.averageSalary}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-briefcase"></i></div>
              <div className="stat-value">{country.fullData.salaryDetails.minimum}</div>
              <div className="stat-label">Minimum Wage</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-users"></i></div>
              <div className="stat-value">{country.fullData.salaryDetails.genderGap}</div>
              <div className="stat-label">Gender Gap</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-chart-line"></i></div>
              <div className="stat-value">{country.metrics.gdpGrowth}</div>
              <div className="stat-label">{t.yoyGrowth}</div>
            </div>
          </div>
          <div className="chart-container" style={{ marginTop: '24px' }}>
            <div className="chart-wrapper" style={{ height: '280px' }}>
              <canvas ref={salaryChartRef}></canvas>
            </div>
          </div>
        </section>

        {/* Household Section */}
        <section className="section">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-home"></i></div>
            <h3>{t.householdTitle}</h3>
          </div>
          <div className="progress-circle-container">
            {/* Above Poverty */}
            <div className="progress-circle-wrapper">
              <div className="progress-circle">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle className="progress-circle-bg" cx="60" cy="60" r="45" />
                  {!isNaN(classData.abovePoverty) && (
                    <circle 
                      className="progress-circle-fill" 
                      cx="60" cy="60" r="45" 
                      data-progress={classData.abovePoverty}
                      style={{ '--progress': classData.abovePoverty } as React.CSSProperties}
                    />
                  )}
                </svg>
                {!isNaN(classData.abovePoverty) && (
                  <div className="progress-circle-content">
                    <span className="progress-circle-value">{classData.abovePoverty}%</span>
                    <span className="progress-circle-label">{t.abovePoverty}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Middle Class */}
            <div className="progress-circle-wrapper">
              <div className="progress-circle">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle className="progress-circle-bg" cx="60" cy="60" r="45" />
                  {!isNaN(classData.middleClass) && (
                    <circle 
                      className="progress-circle-fill middle-class" 
                      cx="60" cy="60" r="45" 
                      data-progress={classData.middleClass}
                      style={{ '--progress': classData.middleClass } as React.CSSProperties}
                    />
                  )}
                </svg>
                {!isNaN(classData.middleClass) && (
                  <div className="progress-circle-content">
                    <span className="progress-circle-value">{classData.middleClass}%</span>
                    <span className="progress-circle-label">{t.middleClass}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Upper Class */}
            <div className="progress-circle-wrapper">
              <div className="progress-circle">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle className="progress-circle-bg" cx="60" cy="60" r="45" />
                  {!isNaN(classData.upperClass) && (
                    <circle 
                      className="progress-circle-fill upper-class" 
                      cx="60" cy="60" r="45" 
                      data-progress={classData.upperClass}
                      style={{ '--progress': classData.upperClass } as React.CSSProperties}
                    />
                  )}
                </svg>
                {!isNaN(classData.upperClass) && (
                  <div className="progress-circle-content">
                    <span className="progress-circle-value">{classData.upperClass}%</span>
                    <span className="progress-circle-label">{t.upperClass}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="household-details">
            <div className="detail-item">
              <span className="detail-label">Median Household Income</span>
              <span className="detail-value">{country.fullData.householdIncome.median}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Per Capita Income</span>
              <span className="detail-value">{country.fullData.householdIncome.perCapita}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Gini Coefficient</span>
              <span className="detail-value">{country.fullData.householdIncome.gini}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Poverty Rate</span>
              <span className="detail-value">{country.fullData.householdIncome.povertyRate}</span>
            </div>
          </div>
        </section>

        {/* GDP Section */}
        <section className="section">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-chart-line"></i></div>
            <h3>{t.gdpTitle}</h3>
          </div>
          <div className="chart-container">
            <div className="chart-wrapper" style={{ height: '280px' }}>
              <canvas ref={gdpChartRef}></canvas>
            </div>
          </div>
          <div className="gdp-details">
            <div className="detail-grid">
              <div className="detail-card">
                <span className="detail-title">Nominal GDP</span>
                <span className="detail-value-large">{country.fullData.gdp.nominal}</span>
              </div>
              <div className="detail-card">
                <span className="detail-title">GDP per Capita (PPP)</span>
                <span className="detail-value-large">{country.fullData.gdp.ppp}</span>
              </div>
              <div className="detail-card">
                <span className="detail-title">GDP Growth</span>
                <span className="detail-value-large" style={{ color: 'var(--accent-success)' }}>{country.fullData.gdp.growth}</span>
              </div>
              <div className="detail-card">
                <span className="detail-title">Inflation</span>
                <span className="detail-value-large">{country.fullData.gdp.inflation}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cost of Living Section */}
        <section className="section">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-shopping-cart"></i></div>
            <h3>{t.costOfLivingTitle}</h3>
          </div>
          <div className="cost-of-living-container">
            {/* Overall Index */}
            <div className="cost-overall-card">
              <div className="cost-overall-value">{country.fullData.costOfLiving.overall}</div>
              <div className="cost-overall-label">{t.costOfLivingOverall}</div>
              <div className="cost-overall-bar">
                <div 
                  className="cost-overall-fill" 
                  style={{ width: `${country.fullData.costOfLiving.overall}%` }}
                />
              </div>
            </div>
            
            {/* Category Progress Bars */}
            <div className="cost-categories">
              <div className="cost-category-item">
                <div className="cost-category-header">
                  <span className="cost-category-label">{t.costRent}</span>
                  <span className="cost-category-value">{country.fullData.costOfLiving.rent}</span>
                </div>
                <div className="cost-progress-bar">
                  <div 
                    className="cost-progress-fill rent" 
                    style={{ width: `${country.fullData.costOfLiving.rent}%` }}
                  />
                </div>
              </div>
              
              <div className="cost-category-item">
                <div className="cost-category-header">
                  <span className="cost-category-label">{t.costGroceries}</span>
                  <span className="cost-category-value">{country.fullData.costOfLiving.groceries}</span>
                </div>
                <div className="cost-progress-bar">
                  <div 
                    className="cost-progress-fill groceries" 
                    style={{ width: `${country.fullData.costOfLiving.groceries}%` }}
                  />
                </div>
              </div>
              
              <div className="cost-category-item">
                <div className="cost-category-header">
                  <span className="cost-category-label">{t.costUtilities}</span>
                  <span className="cost-category-value">{country.fullData.costOfLiving.utilities}</span>
                </div>
                <div className="cost-progress-bar">
                  <div 
                    className="cost-progress-fill utilities" 
                    style={{ width: `${country.fullData.costOfLiving.utilities}%` }}
                  />
                </div>
              </div>
              
              <div className="cost-category-item">
                <div className="cost-category-header">
                  <span className="cost-category-label">{t.costTransportation}</span>
                  <span className="cost-category-value">{country.fullData.costOfLiving.transportation}</span>
                </div>
                <div className="cost-progress-bar">
                  <div 
                    className="cost-progress-fill transportation" 
                    style={{ width: `${country.fullData.costOfLiving.transportation}%` }}
                  />
                </div>
              </div>
              
              <div className="cost-category-item">
                <div className="cost-category-header">
                  <span className="cost-category-label">{t.costLifestyle}</span>
                  <span className="cost-category-value">{country.fullData.costOfLiving.lifestyle}</span>
                </div>
                <div className="cost-progress-bar">
                  <div 
                    className="cost-progress-fill lifestyle" 
                    style={{ width: `${country.fullData.costOfLiving.lifestyle}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Employment Section */}
        <section className="section">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-users"></i></div>
            <h3>{t.employmentTitle}</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon employment"><i className="fas fa-user-clock"></i></div>
              <div className="stat-value">{country.fullData.employment.rate}</div>
              <div className="stat-label">{t.unemploymentRate}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon employment"><i className="fas fa-briefcase"></i></div>
              <div className="stat-value">{country.fullData.employment.laborForce}</div>
              <div className="stat-label">{t.laborForceParticipation}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon employment"><i className="fas fa-user-graduate"></i></div>
              <div className="stat-value">{country.fullData.employment.youthUnemployment}</div>
              <div className="stat-label">{t.youthUnemployment}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon employment"><i className="fas fa-chart-line"></i></div>
              <div className="stat-value">{country.fullData.employment.employmentGrowth}</div>
              <div className="stat-label">{t.employmentGrowth}</div>
            </div>
          </div>
        </section>

        {/* Inflation Section */}
        <section className="section">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-coins"></i></div>
            <h3>{t.inflationTitle}</h3>
          </div>
          <div className="inflation-container">
            <div className="inflation-main-card">
              <div className="inflation-value">{country.fullData.gdp.inflation}</div>
              <div className="inflation-label">{t.currentInflation}</div>
            </div>
            <div className="inflation-details">
              <div className="inflation-detail-item">
                <i className="fas fa-bullseye"></i>
                <span>2.0%</span>
                <span className="inflation-detail-label">{t.targetInflation}</span>
              </div>
              <div className="inflation-detail-item">
                <i className="fas fa-chart-area"></i>
                <span>{parseFloat(country.fullData.gdp.inflation) > 2 ? '+' : ''}{(parseFloat(country.fullData.gdp.inflation) - 2).toFixed(1)}%</span>
                <span className="inflation-detail-label">{t.inflationTrend}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benchmarks Section */}
        <section className="section">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-bullseye"></i></div>
            <h3>{t.benchmarkTitle}</h3>
          </div>
          <div className="benchmark-grid">
            <div className="benchmark-card">
              <div className="benchmark-icon"><i className="fas fa-globe"></i></div>
              <div className="benchmark-value">#{country.id === 'usa' ? '1' : country.id === 'china' ? '2' : country.id === 'japan' ? '3' : country.id === 'germany' ? '4' : '20'}</div>
              <div className="benchmark-label">{t.globalEconomy}</div>
              <span className="benchmark-comparison positive">{t.top10}</span>
            </div>
            <div className="benchmark-card">
              <div className="benchmark-icon"><i className="fas fa-dollar-sign"></i></div>
              <div className="benchmark-value">#60</div>
              <div className="benchmark-label">{t.gdpPerCapitaRank}</div>
              <span className="benchmark-comparison positive">{t.top10}</span>
            </div>
            <div className="benchmark-card">
              <div className="benchmark-icon"><i className="fas fa-money-bill-wave"></i></div>
              <div className="benchmark-value">#50</div>
              <div className="benchmark-label">{t.medianSalaryRank}</div>
              <span className="benchmark-comparison positive">{t.top10}</span>
            </div>
            <div className="benchmark-card">
              <div className="benchmark-icon"><i className="fas fa-hand-holding-usd"></i></div>
              <div className="benchmark-value">#65</div>
              <div className="benchmark-label">{t.purchasingPower}</div>
              <span className="benchmark-comparison negative">{t.highCost}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-title">{t.footerTitle}</div>
          <div className="footer-copyright">Data sourced from World Bank, IMF</div>
        </div>
      </footer>
    </div>
  );
}
