import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { COUNTRIES_DATA } from '../data/countries';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

// Country-specific color themes
const countryThemes: Record<string, { primary: string; primaryLight: string; secondary: string; accent: string }> = {
  'usa': { primary: '#1e3a5f', primaryLight: '#4a6fa5', secondary: '#3d5a80', accent: '#60a5fa' },
  'china': { primary: '#de2910', primaryLight: '#ff4d4d', secondary: '#4a90a4', accent: '#e8b339' },
  'japan': { primary: '#bc002d', primaryLight: '#ff6b6b', secondary: '#d32f2f', accent: '#ff6b6b' },
  'germany': { primary: '#1a1a1a', primaryLight: '#4a4a4a', secondary: '#333333', accent: '#6b7280' },
  'uk': { primary: '#012169', primaryLight: '#1a3a8a', secondary: '#00247d', accent: '#3d8bfd' },
  'france': { primary: '#0055a4', primaryLight: '#1c82d3', secondary: '#1c439b', accent: '#6ba3d8' },
  'india': { primary: '#f93b1b', primaryLight: '#ff7a4d', secondary: '#ff6b35', accent: '#ffb347' },
  'brazil': { primary: '#009c3b', primaryLight: '#00c750', secondary: '#002776', accent: '#ffdf00' },
  'russia': { primary: '#d52b1e', primaryLight: '#e63946', secondary: '#0039a6', accent: '#89cff0' },
  'australia': { primary: '#00008b', primaryLight: '#1e90ff', secondary: '#006847', accent: '#40e0d0' },
  'canada': { primary: '#ff0000', primaryLight: '#ff4444', secondary: '#ffffff', accent: '#c0c0c0' },
  'uae': { primary: '#00732f', primaryLight: '#00a850', secondary: '#009639', accent: '#4dc99a' },
  'greece': { primary: '#0d5eaf', primaryLight: '#3a8fd0', secondary: '#1c82d3', accent: '#6baee8' },
  'denmark': { primary: '#c60c30', primaryLight: '#ff4d6a', secondary: '#e31d2b', accent: '#f4a3a8' },
  'chile': { primary: '#d52b1e', primaryLight: '#e63946', secondary: '#0039a6', accent: '#89cff0' },
  'ireland': { primary: '#169b62', primaryLight: '#00c97a', secondary: '#ff883e', accent: '#4dc99a' },
  'default': { primary: '#2563eb', primaryLight: '#60a5fa', secondary: '#3b82f6', accent: '#60a5fa' }
};

function getCountryTheme(countryId: string) {
  return countryThemes[countryId.toLowerCase()] || countryThemes['default'];
}

// Translations
const translations: Record<string, Record<string, string>> = {
  zh: {
    reportTitle: "2025年经济报告",
    home: "首页",
    gdp: "人均GDP",
    population: "人口",
    medianSalary: "中位工资",
    medianHousehold: "家庭中位收入",
    salaryTitle: "工资与收入",
    averageSalary: "平均工资",
    professionalSalary: "专业人士",
    techSalary: "科技行业",
    medicalSalary: "医疗行业",
    yoyGrowth: "同比增长",
    householdTitle: "家庭收入",
    abovePoverty: "贫困线以上",
    middleClass: "中产阶级",
    upperClass: "上层阶级",
    gdpTitle: "GDP与经济增长",
    gdpGrowthChart: "GDP增长率 (%)",
    economicHistory: "经济历史",
    benchmarkTitle: "国际基准",
    globalEconomy: "全球经济",
    gdpPerCapitaRank: "人均GDP",
    medianSalaryRank: "中位工资",
    purchasingPower: "购买力",
    hdiRank: "人类发展",
    qualityOfLife: "生活质量",
    footerTitle: "2025全球的经济报告",
    rank1: "全球最大",
    top10: "全球前10",
    highCost: "生活成本高",
    veryHigh: "非常高",
    top20: "全球前20",
    timeline2025Title: "后疫情复苏",
    timeline2025Desc: "经济增长强劲，就业改善。",
    timeline2020Title: "疫情影响",
    timeline2020Desc: "疫情导致的经济收缩。",
    timeline2010Title: "后衰退复苏",
    timeline2010Desc: "从金融危机中逐步复苏。",
    timeline2000Title: "科技繁荣时代",
    timeline2000Desc: "科技驱动的经济扩张。"
  },
  en: {
    reportTitle: "2025 Economic Report",
    home: "Home",
    gdp: "GDP per Capita",
    population: "Population",
    medianSalary: "Median Salary",
    medianHousehold: "Median Household",
    salaryTitle: "Salary & Income",
    averageSalary: "Average Salary",
    professionalSalary: "Professional",
    techSalary: "Tech Industry",
    medicalSalary: "Medical",
    yoyGrowth: "YoY Growth",
    householdTitle: "Household Income",
    abovePoverty: "Above Poverty",
    middleClass: "Middle Class",
    upperClass: "Upper Class",
    gdpTitle: "GDP & Economic Growth",
    gdpGrowthChart: "GDP Growth Rate (%)",
    economicHistory: "Economic History",
    benchmarkTitle: "International Benchmarks",
    globalEconomy: "Global Economy",
    gdpPerCapitaRank: "GDP per Capita",
    medianSalaryRank: "Median Salary",
    purchasingPower: "Purchasing Power",
    hdiRank: "Human Development",
    qualityOfLife: "Quality of Life",
    footerTitle: "2025 Global Economic Reports",
    rank1: "World Largest",
    top10: "Top 10",
    highCost: "High Cost",
    veryHigh: "Very High",
    top20: "Top 20",
    timeline2025Title: "Post-Pandemic Recovery",
    timeline2025Desc: "Strong economic growth with improved employment.",
    timeline2020Title: "COVID-19 Impact",
    timeline2020Desc: "Economic contraction due to pandemic.",
    timeline2010Title: "Post-Recession Recovery",
    timeline2010Desc: "Gradual recovery from financial crisis.",
    timeline2000Title: "Tech Boom Era",
    timeline2000Desc: "Economic expansion driven by technology."
  }
};

// Particles Component
function Particles() {
  return (
    <div className="particles">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="particle" style={{ 
          left: `${10 + i * 10}%`, 
          top: `${20 + (i % 3) * 25}%`,
          animationDelay: `${i * 3}s`
        }} />
      ))}
    </div>
  );
}

// FAB Component with hover expansion
function FloatingActionButton() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('preferredTheme', newTheme);
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  };

  const getThemeIcon = () => {
    return resolvedTheme === 'dark' ? 'fa-sun' : 'fa-moon';
  };

  return (
    <div 
      ref={containerRef}
      className={`fab-container ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <button className="fab-sub" onClick={scrollToTop} title="Back to Top">
        <i className="fas fa-arrow-up"></i>
      </button>
      <button className="fab-sub" onClick={toggleTheme} title="Toggle Theme">
        <i className={`fas ${getThemeIcon()}`}></i>
      </button>
      <button className="fab-sub" onClick={handleLanguageToggle} title="Toggle Language">
        {language === 'zh' ? 'En' : '中'}
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

// Animated Counter Component
function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: string; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(prefix + '0' + suffix);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && elementRef.current) {
          const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
          const prefixMatch = value.match(/^[^0-9]*/);
          const suffixMatch = value.match(/[^0-9]*$/);
          const p = prefixMatch ? prefixMatch[0] : '';
          const s = suffixMatch ? suffixMatch[0] : '';
          
          let current = 0;
          const duration = 2000;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            current = numValue * ease;
            if (elementRef.current) {
              elementRef.current.textContent = p + Math.floor(current).toLocaleString() + s;
            }
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          animate();
          observer.unobserve(elementRef.current);
        }
      });
    }, { threshold: 0.5 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return <span ref={elementRef}>{displayValue}</span>;
}

export function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const theme = getCountryTheme(id || '');

  const country = COUNTRIES_DATA.find(c => c.id === id);

  const gdpChartRef = useRef<HTMLCanvasElement>(null);
  const gdpChartInstance = useRef<Chart | null>(null);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Timeline animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 200);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Progress circles animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute('data-progress');
          if (progress) {
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (parseInt(progress) / 100) * circumference;
            (entry.target as HTMLElement).style.strokeDashoffset = offset.toString();
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress-circle-fill').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // GDP Chart
  useEffect(() => {
    if (!gdpChartRef.current || !country) return;

    if (gdpChartInstance.current) {
      gdpChartInstance.current.destroy();
    }

    const ctx = gdpChartRef.current.getContext('2d');
    if (ctx) {
      const data = [5.9, 1.9, 2.5, 2.8, 5.0];
      gdpChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2021', '2022', '2023', '2024', '2025'],
          datasets: [{
            label: 'Growth Rate (%)',
            data: data,
            backgroundColor: data.map((v: number) => v >= 0 ? 'rgba(30, 58, 95, 0.8)' : 'rgba(239, 68, 68, 0.8)'),
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { callback: (value: number | string) => value + '%' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    return () => {
      if (gdpChartInstance.current) {
        gdpChartInstance.current.destroy();
      }
    };
  }, [country, isZh]);

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('preferredTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  if (!country) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--gray-100)'
      }}>
        <h1 style={{ color: 'var(--gray-800)', marginBottom: '20px' }}>
          {isZh ? '未找到国家' : 'Country Not Found'}
        </h1>
        <Link to="/" className="back-btn" style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          background: theme.primary,
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.85rem'
        }}>
          ← {isZh ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    );
  }

  // Coming Soon page
  if (country.comingSoon) {
    return (
      <div className="country-detail-page coming-soon-page"
        style={{
          '--theme-primary': theme.primary,
          '--theme-primary-light': theme.primaryLight,
          '--theme-secondary': theme.secondary,
          '--theme-accent': theme.accent
        } as React.CSSProperties}>
        
        {/* Floating Navbar */}
        <nav className="floating-navbar">
          <div className="breadcrumb">
            <Link to="/">{isZh ? '首页' : 'Home'}</Link>
            <span className="breadcrumb-separator">›</span>
            <span>{isZh ? country.name.zh : country.name.en}</span>
          </div>
        </nav>

        {/* Hero Section - Coming Soon */}
        <section className="hero coming-soon-hero" style={{ 
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.primaryLight} 100%)`
        }}>
          <div className="hero-content">
            <span className="hero-flag">{country.flag}</span>
            <h1>{isZh ? country.name.zh : country.name.en}</h1>
            <h2>{isZh ? '即将推出' : 'Coming Soon'}</h2>
            <div className="coming-soon-hero-badge">
              <i className="fas fa-clock"></i>
              {isZh ? '即将发布完整报告' : 'Full report coming soon'}
            </div>
          </div>
        </section>

        {/* Coming Soon Message */}
        <main className="main-content">
          <div className="coming-soon-content">
            <div className="coming-soon-card">
              <div className="coming-soon-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>{isZh ? '经济报告制作中' : 'Economic Report In Progress'}</h3>
              <p>
                {isZh 
                  ? '我们正在准备详细的2025年经济报告，包括薪资水平、GDP增长、家庭收入等关键指标的分析。'
                  : 'We are preparing a detailed 2025 economic report, including analysis of salary levels, GDP growth, household income, and other key indicators.'
                }
              </p>
              <div className="coming-soon-features">
                <div className="feature-item">
                  <i className="fas fa-dollar-sign"></i>
                  <span>{isZh ? '薪资分析' : 'Salary Analysis'}</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-chart-line"></i>
                  <span>{isZh ? 'GDP指标' : 'GDP Indicators'}</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-home"></i>
                  <span>{isZh ? '家庭收入' : 'Household Income'}</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-globe"></i>
                  <span>{isZh ? '国际对比' : 'International Comparison'}</span>
                </div>
              </div>
              <Link to="/" className="back-btn-large">
                <i className="fas fa-arrow-left"></i>
                {isZh ? '返回首页' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-title">{isZh ? '2025全球各国经济报告' : '2025 Global Economic Reports'}</div>
            <div className="footer-copyright">© 2025 Global Economic Reports</div>
          </div>
        </footer>
      </div>
    );
  }

  const t = translations[language];
  const name = isZh ? country.name.zh : country.name.en;

  return (
    <div className="country-detail-page"
      style={{
        '--theme-primary': theme.primary,
        '--theme-primary-light': theme.primaryLight,
        '--theme-secondary': theme.secondary,
        '--theme-accent': theme.accent
      } as React.CSSProperties}>
      
      {/* Floating Navbar */}
      <nav className="floating-navbar">
        <div className="breadcrumb">
          <Link to="/">{t.home}</Link>
          <span className="breadcrumb-separator">›</span>
          <span>{name}</span>
        </div>
      </nav>

      {/* FAB with hover expansion */}
      <FloatingActionButton />

      {/* Hero Section */}
      <section className="hero" style={{ 
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.primaryLight} 100%)`
      }}>
        <Particles />
        <div className="hero-content">
          <span className="hero-flag">{country.flag}</span>
          <h1>{name}</h1>
          <h2>{t.reportTitle}</h2>
          <div className="hero-stats">
            <div className="hero-stat">
              <i className="fas fa-dollar-sign hero-stat-icon"></i>
              <span className="hero-stat-value">
                <AnimatedCounter value={country.metrics.gdpPerCapita} />
              </span>
              <span className="hero-stat-label">{t.gdp}</span>
              <span className="trend trend-up">
                <i className="fas fa-arrow-up"></i> {country.metrics.gdpGrowth}
              </span>
            </div>
            <div className="hero-stat">
              <i className="fas fa-users hero-stat-icon"></i>
              <span className="hero-stat-value">{country.metrics.population}</span>
              <span className="hero-stat-label">{t.population}</span>
              <span className="trend trend-neutral">
                <i className="fas fa-minus"></i> 0.5%
              </span>
            </div>
            <div className="hero-stat">
              <i className="fas fa-money-bill-wave hero-stat-icon"></i>
              <span className="hero-stat-value">{country.metrics.salary}</span>
              <span className="hero-stat-label">{t.medianSalary}</span>
              <span className="trend trend-up">
                <i className="fas fa-arrow-up"></i> 3.1%
              </span>
            </div>
            <div className="hero-stat">
              <i className="fas fa-home hero-stat-icon"></i>
              <span className="hero-stat-value">{country.metrics.household}</span>
              <span className="hero-stat-label">{t.medianHousehold}</span>
              <span className="trend trend-up">
                <i className="fas fa-arrow-up"></i> 2.8%
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="main-content">
        {/* Salary Section */}
        <section id="salary" className="section reveal">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-money-bill-wave"></i></div>
            <h3>{t.salaryTitle}</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-wage"></i></div>
              <div className="stat-value">{country.metrics.salary}</div>
              <div className="stat-label">{t.medianSalary}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-hourglass"></i></div>
              <div className="stat-value">$13,799</div>
              <div className="stat-label">{t.averageSalary}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-briefcase"></i></div>
              <div className="stat-value">$18,000</div>
              <div className="stat-label">{t.professionalSalary}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-laptop"></i></div>
              <div className="stat-value">$24,000</div>
              <div className="stat-label">{t.techSalary}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-stethoscope"></i></div>
              <div className="stat-value">$42,000</div>
              <div className="stat-label">{t.medicalSalary}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-chart-line"></i></div>
              <div className="stat-value">5.0%</div>
              <div className="stat-label">{t.yoyGrowth}</div>
            </div>
          </div>
        </section>

        {/* Household Income Section */}
        <section id="household" className="section reveal reveal-right">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-home"></i></div>
            <h3>{t.householdTitle}</h3>
          </div>
          <div className="progress-circle-container">
            <div className="progress-circle-wrapper reveal-scale">
              <div className="progress-circle">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle className="progress-circle-bg" cx="60" cy="60" r="45"/>
                  <circle className="progress-circle-fill" cx="60" cy="60" r="45" data-progress="80"/>
                </svg>
                <div className="progress-circle-content">
                  <span className="progress-circle-value">80%</span>
                  <span className="progress-circle-label">{t.abovePoverty}</span>
                </div>
              </div>
            </div>
            <div className="progress-circle-wrapper reveal-scale">
              <div className="progress-circle">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle className="progress-circle-bg" cx="60" cy="60" r="45"/>
                  <circle className="progress-circle-fill" cx="60" cy="60" r="45" data-progress="40"/>
                </svg>
                <div className="progress-circle-content">
                  <span className="progress-circle-value">40%</span>
                  <span className="progress-circle-label">{t.middleClass}</span>
                </div>
              </div>
            </div>
            <div className="progress-circle-wrapper reveal-scale">
              <div className="progress-circle">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle className="progress-circle-bg" cx="60" cy="60" r="45"/>
                  <circle className="progress-circle-fill" cx="60" cy="60" r="45" data-progress="25"/>
                </svg>
                <div className="progress-circle-content">
                  <span className="progress-circle-value">25%</span>
                  <span className="progress-circle-label">{t.upperClass}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GDP Section */}
        <section id="gdp" className="section reveal">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-chart-line"></i></div>
            <h3>{t.gdpTitle}</h3>
          </div>
          <div className="chart-container">
            <div className="chart-header">
              <span className="chart-title">{t.gdpGrowthChart}</span>
            </div>
            <div className="chart-wrapper">
              <canvas ref={gdpChartRef}></canvas>
            </div>
          </div>
          <h4 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '1.1rem', color: 'var(--gray-700)' }}>
            {t.economicHistory}
          </h4>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <div className="timeline-title">{t.timeline2025Title}</div>
                <div className="timeline-description">{t.timeline2025Desc}</div>
                <div className="timeline-stats">
                  <span className="timeline-stat">
                    <span className="timeline-stat-value">5.0%</span> GDP Growth
                  </span>
                  <span className="timeline-stat">
                    <span className="timeline-stat-value">5.0%</span> Unemployment
                  </span>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <div className="timeline-title">{t.timeline2020Title}</div>
                <div className="timeline-description">{t.timeline2020Desc}</div>
                <div className="timeline-stats">
                  <span className="timeline-stat">
                    <span className="timeline-stat-value">-3.4%</span> GDP Decline
                  </span>
                  <span className="timeline-stat">
                    <span className="timeline-stat-value">14.8%</span> Peak Unemployment
                  </span>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2010</div>
              <div className="timeline-content">
                <div className="timeline-title">{t.timeline2010Title}</div>
                <div className="timeline-description">{t.timeline2010Desc}</div>
                <div className="timeline-stats">
                  <span className="timeline-stat">
                    <span className="timeline-stat-value">2.7%</span> GDP Growth
                  </span>
                  <span className="timeline-stat">
                    <span className="timeline-stat-value">9.6%</span> Unemployment
                  </span>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2000</div>
              <div className="timeline-content">
                <div className="timeline-title">{t.timeline2000Title}</div>
                <div className="timeline-description">{t.timeline2000Desc}</div>
                <div className="timeline-stats">
                  <span className="timeline-stat">
                    <span className="timeline-stat-value">4.1%</span> GDP Growth
                  </span>
                  <span className="timeline-stat">
                    <span className="timeline-stat-value">4.0%</span> Unemployment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benchmark Section */}
        <section id="benchmark" className="section reveal reveal-left">
          <div className="section-title-area">
            <div className="section-icon"><i className="fas fa-bullseye"></i></div>
            <h3>{t.benchmarkTitle}</h3>
          </div>
          <div className="benchmark-grid">
            <div className="benchmark-card">
              <div className="benchmark-icon"><i className="fas fa-globe"></i></div>
              <div className="benchmark-value">#30</div>
              <div className="benchmark-label">{t.globalEconomy}</div>
              <span className="benchmark-comparison positive">{t.rank1}</span>
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
            <div className="benchmark-card">
              <div className="benchmark-icon"><i className="fas fa-chart-pie"></i></div>
              <div className="benchmark-value">#50</div>
              <div className="benchmark-label">{t.hdiRank}</div>
              <span className="benchmark-comparison positive">{t.veryHigh}</span>
            </div>
            <div className="benchmark-card">
              <div className="benchmark-icon"><i className="fas fa-leaf"></i></div>
              <div className="benchmark-value">#30</div>
              <div className="benchmark-label">{t.qualityOfLife}</div>
              <span className="benchmark-comparison positive">{t.top20}</span>
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
