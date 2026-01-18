import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { loadAllCountries, getCountryById } from '../data/countries-json';
import type { CountryFullData } from '../data/countries-json';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import './CountryComparison.css';

// Simple FAB Component - just 2-state theme toggle (dark ↔ light)
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

const translations = {
  zh: {
    title: '国家经济对比',
    subtitle: '选择最多4个国家进行详细对比分析',
    selectCountries: '选择对比国家',
    compare: '开始对比',
    clear: '清空选择',
    exportPDF: '导出PDF',
    exportCSV: '导出CSV',
    salary: '中位工资',
    household: '家庭收入',
    gdpPerCapita: '人均GDP',
    gdpGrowth: 'GDP增长',
    povertyRate: '贫困率',
    costOfLiving: '生活成本',
    unemployment: '失业率',
    vs: '对比',
    higher: '更高',
    lower: '更低',
    similar: '相近',
    recommended: '推荐指数',
    ranking: '全球排名',
    home: '首页',
    metric: '指标',
    gini: '基尼系数',
    viewDetails: '查看详情',
    radarComparison: '雷达图对比',
    salaryGdpComparison: '薪资与GDP对比',
    radarSalary: '薪资',
    radarCostOfLiving: '生活成本',
    radarPovertyRate: '贫困率',
    radarGdpPerCapita: 'GDP'
  },
  en: {
    title: 'Country Economic Comparison',
    subtitle: 'Select up to 4 countries for detailed comparison',
    selectCountries: 'Select Countries to Compare',
    compare: 'Compare',
    clear: 'Clear Selection',
    exportPDF: 'Export PDF',
    exportCSV: 'Export CSV',
    salary: 'Median Salary',
    household: 'Household Income',
    gdpPerCapita: 'GDP per Capita',
    gdpGrowth: 'GDP Growth',
    povertyRate: 'Poverty Rate',
    costOfLiving: 'Cost of Living',
    unemployment: 'Unemployment',
    vs: 'vs',
    higher: 'Higher',
    lower: 'Lower',
    similar: 'Similar',
    recommended: 'Recommendation',
    ranking: 'Global Ranking',
    home: 'Home',
    metric: 'Metric',
    gini: 'Gini Coefficient',
    viewDetails: 'View Details',
    radarComparison: 'Radar Comparison',
    salaryGdpComparison: 'Salary & GDP Comparison',
    radarSalary: 'Salary',
    radarCostOfLiving: 'Cost of Living',
    radarPovertyRate: 'Poverty',
    radarGdpPerCapita: 'GDP'
  },
};

export function CountryComparison() {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isZh = language === 'zh';
  const isDark = resolvedTheme === 'dark';
  const t = translations[isZh ? 'zh' : 'en'];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<CountryFullData[]>([]);
  const [countryList, setCountryList] = useState<{id: string; name: {zh: string; en: string}; flag: string}[]>([]);
  const radarChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const radarChartInstance = useRef<Chart | null>(null);
  const barChartInstance = useRef<Chart | null>(null);

  const textColor = isDark ? 'rgba(255, 255, 255, 0.9)' : '#000000';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

  useEffect(() => {
    loadAllCountries().then(countries => {
      setCountryList(countries.map(c => ({ id: c.id, name: c.name, flag: c.flag })));
    });
  }, []);

  const handleCountrySelect = (countryId: string) => {
    if (selectedIds.includes(countryId)) {
      setSelectedIds(selectedIds.filter(id => id !== countryId));
    } else if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, countryId]);
    }
  };

  const handleCompare = async () => {
    const data = await Promise.all(
      selectedIds.map(id => getCountryById(id))
    );
    setComparisonData(data.filter((d): d is CountryFullData => d !== null));
  };

  const handleClear = () => {
    setSelectedIds([]);
    setComparisonData([]);
  };

  const handleExportCSV = () => {
    if (comparisonData.length === 0) return;

    const headers = [t.metric, ...comparisonData.map(c => c.name.en)];
    const rows = [
      [t.salary, ...comparisonData.map(c => c.fullData.salaryDetails.median)],
      [t.household, ...comparisonData.map(c => c.fullData.householdIncome.median)],
      [t.gdpPerCapita, ...comparisonData.map(c => c.metrics.gdpPerCapita)],
      [t.gdpGrowth, ...comparisonData.map(c => c.fullData.gdp.growth)],
      [t.povertyRate, ...comparisonData.map(c => c.fullData.householdIncome.povertyRate)],
      [t.costOfLiving, ...comparisonData.map(c => c.fullData.costOfLiving.overall.toString())],
      [t.gini, ...comparisonData.map(c => c.fullData.householdIncome.gini)],
    ];

    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'country-comparison.csv';
    a.click();
  };

  useEffect(() => {
    if (comparisonData.length > 0 && radarChartRef.current) {
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy();
      }

      const datasets = comparisonData.map((country, index) => {
        const colors = [
          { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgb(59, 130, 246)' },
          { bg: 'rgba(239, 68, 68, 0.2)', border: 'rgb(239, 68, 68)' },
          { bg: 'rgba(16, 185, 129, 0.2)', border: 'rgb(16, 185, 129)' },
          { bg: 'rgba(245, 158, 11, 0.2)', border: 'rgb(245, 158, 11)' },
        ];
        return {
          label: isZh ? country.name.zh : country.name.en,
          data: [
            Math.min(100, (country.metrics.salaryRaw / 100000) * 100),
            Math.min(100, (country.fullData.costOfLiving.overall)),
            100 - parseFloat(country.fullData.householdIncome.povertyRate.replace('%', '') || '0'),
            country.metrics.gdpPerCapitaRaw > 50000 ? 80 : country.metrics.gdpPerCapitaRaw > 20000 ? 60 : 40,
          ],
          backgroundColor: colors[index % colors.length].bg,
          borderColor: colors[index % colors.length].border,
          borderWidth: 2,
        };
      });

      radarChartInstance.current = new Chart(radarChartRef.current, {
        type: 'radar',
        data: {
          labels: [
            t.radarSalary,
            t.radarCostOfLiving,
            t.radarPovertyRate,
            t.radarGdpPerCapita,
          ],
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor },
            },
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              grid: { color: gridColor },
              angleLines: { color: gridColor },
              pointLabels: { color: textColor },
            },
          },
        },
      });
    }

    return () => {
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy();
      }
    };
  }, [comparisonData, isDark, isZh, t]);

  useEffect(() => {
    if (comparisonData.length > 0 && barChartRef.current) {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

        barChartInstance.current = new Chart(barChartRef.current, {
          type: 'bar',
          data: {
            labels: comparisonData.map(c => isZh ? c.name.zh : c.name.en),
          datasets: [
            {
              label: t.salary,
              data: comparisonData.map(c => c.metrics.salaryRaw),
              backgroundColor: 'rgba(59, 130, 246, 0.7)',
            },
            {
              label: t.gdpPerCapita,
              data: comparisonData.map(c => c.metrics.gdpPerCapitaRaw),
              backgroundColor: 'rgba(16, 185, 129, 0.7)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor },
            },
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor },
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor },
            },
          },
        },
      });
    }

    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [comparisonData, isDark, isZh, t]);

  return (
    <div className="comparison-page">
      {/* Floating Navbar - Breadcrumb */}
      <div className="floating-navbar">
        <Link to="/" className="breadcrumb">
          <i className="fas fa-home"></i>
          <span>{t.home}</span>
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{t.title}</span>
      </div>

      {/* Selection Section */}
      <section className="comparison-selection">
        <div className="container">
          <h2 className="comparison-title">{t.title}</h2>
          <p className="comparison-subtitle">{t.subtitle}</p>
          <h2>{t.selectCountries}</h2>
          <div className="country-selector">
            {countryList.map((country) => (
              <button
                key={country.id}
                className={`country-chip ${selectedIds.includes(country.id) ? 'selected' : ''}`}
                onClick={() => handleCountrySelect(country.id)}
                disabled={!selectedIds.includes(country.id) && selectedIds.length >= 4}
                aria-label={`${country.flag} ${isZh ? country.name.zh : country.name.en} - ${isZh ? (selectedIds.includes(country.id) ? '已选择，点击取消' : '点击选择') : (selectedIds.includes(country.id) ? 'Selected, click to deselect' : 'Click to select')}`}
                aria-pressed={selectedIds.includes(country.id)}
              >
                <span className="flag">{country.flag}</span>
                <span className="name">{isZh ? country.name.zh : country.name.en}</span>
                {selectedIds.includes(country.id) && <span className="check">✓</span>}
              </button>
            ))}
          </div>
          <div className="selection-actions">
            <span className="selected-count">
              {selectedIds.length}/4 {isZh ? '已选择' : 'selected'}
            </span>
            <button 
              className="btn-clear" 
              onClick={handleClear} 
              disabled={selectedIds.length === 0}
              aria-label={isZh ? '清除选择' : 'Clear selection'}
            >
              {t.clear}
            </button>
            <button 
              className="btn-compare" 
              onClick={handleCompare} 
              disabled={selectedIds.length < 2}
              aria-label={isZh ? '开始对比' : 'Start comparison'}
            >
              {t.compare}
            </button>
            <button 
              className="btn-export" 
              onClick={handleExportCSV} 
              disabled={comparisonData.length === 0}
              aria-label={isZh ? '导出CSV文件' : 'Export CSV file'}
            >
              {t.exportCSV}
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Results */}
      {comparisonData.length > 0 && (
        <section className="comparison-results">
          <div className="container">
            {/* Metrics Table */}
            <div className="metrics-table">
              <table>
                <thead>
                  <tr>
                    <th>{t.metric}</th>
                    {comparisonData.map(c => (
                      <th key={c.id}>
                        <span className="flag">{isZh ? c.name.zh : c.name.en}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t.salary}</td>
                    {comparisonData.map(c => (
                      <td key={c.id}>{c.fullData.salaryDetails.median}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.household}</td>
                    {comparisonData.map(c => (
                      <td key={c.id}>{c.fullData.householdIncome.median}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.gdpPerCapita}</td>
                    {comparisonData.map(c => (
                      <td key={c.id}>{c.metrics.gdpPerCapita}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.gdpGrowth}</td>
                    {comparisonData.map(c => (
                      <td key={c.id}>{c.fullData.gdp.growth}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.povertyRate}</td>
                    {comparisonData.map(c => (
                      <td key={c.id}>{c.fullData.householdIncome.povertyRate}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.costOfLiving}</td>
                    {comparisonData.map(c => (
                      <td key={c.id}>{c.fullData.costOfLiving.overall}/100</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.gini}</td>
                    {comparisonData.map(c => (
                      <td key={c.id}>{c.fullData.householdIncome.gini}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Charts */}
            <div className="charts-grid">
              <div className="chart-container">
                <h3>{t.radarComparison}</h3>
                <div className="chart-wrapper">
                  <canvas ref={radarChartRef}></canvas>
                </div>
              </div>
              <div className="chart-container">
                <h3>{t.salaryGdpComparison}</h3>
                <div className="chart-wrapper">
                  <canvas ref={barChartRef}></canvas>
                </div>
              </div>
            </div>

            {/* Country Cards */}
            <div className="comparison-cards">
              {comparisonData.map((country) => (
                <div key={country.id} className="comparison-card">
                  <div className="card-header">
                    <span className="flag-large">{country.flag}</span>
                    <h3>{isZh ? country.name.zh : country.name.en}</h3>
                    <Link to={`/countries/${country.id}`} className="view-details">
                      {t.viewDetails}
                    </Link>
                  </div>
                  <div className="card-stats">
                    <div className="stat">
                      <span className="label">{t.salary}</span>
                      <span className="value">{country.fullData.salaryDetails.median}</span>
                    </div>
                    <div className="stat">
                      <span className="label">{t.povertyRate}</span>
                      <span className="value">{country.fullData.householdIncome.povertyRate}</span>
                    </div>
                    <div className="stat">
                      <span className="label">{t.costOfLiving}</span>
                      <span className="value">{country.fullData.costOfLiving.overall}/100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAB */}
      <FAB />
    </div>
  );
}
