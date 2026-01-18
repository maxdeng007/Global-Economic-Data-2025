import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { COUNTRIES_DATA } from '../data/countries';
import { convertToUSD, formatUSD } from '../types/country';
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

export function ChartsSection() {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const gdpChartRef = useRef<HTMLCanvasElement>(null);
  const salaryChartRef = useRef<HTMLCanvasElement>(null);
  const gdpChartInstance = useRef<Chart | null>(null);
  const salaryChartInstance = useRef<Chart | null>(null);

  // GDP Ranking Chart
  useEffect(() => {
    if (!gdpChartRef.current) return;

    const sorted = [...COUNTRIES_DATA].sort((a, b) => 
      b.metrics.gdpPerCapitaRaw - a.metrics.gdpPerCapitaRaw
    );
    const top15 = sorted.slice(0, 15);

    const labels = top15.map(c => isZh ? c.name.zh : c.name.en);
    const data = top15.map(c => c.metrics.gdpPerCapitaRaw);
    const flags = top15.map(c => c.flag);

    if (gdpChartInstance.current) {
      gdpChartInstance.current.destroy();
    }

    gdpChartInstance.current = new Chart(gdpChartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: isZh ? '人均GDP (USD)' : 'GDP per Capita (USD)',
          data,
          backgroundColor: '#3b82f6',
          borderRadius: 6,
          barThickness: 28,
          barPercentage: 0.7,
          categoryPercentage: 0.8
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const country = top15[ctx.dataIndex];
                return `${country.flag} ${formatUSD(ctx.raw as number)}`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { callback: (value) => formatUSD(value as number) },
            grid: { color: '#f1f5f9' }
          },
          y: { grid: { display: false } }
        }
      }
    });

    return () => {
      if (gdpChartInstance.current) {
        gdpChartInstance.current.destroy();
      }
    };
  }, [isZh]);

  // Salary Comparison Chart
  useEffect(() => {
    if (!salaryChartRef.current) return;

    const countriesWithUSD = COUNTRIES_DATA.map(c => ({
      ...c,
      salaryUSD: convertToUSD(c.metrics.salaryRaw, c.metrics.currency)
    }));

    const sorted = countriesWithUSD.sort((a, b) => b.salaryUSD - a.salaryUSD);
    const top10 = sorted.slice(0, 10);

    const labels = top10.map(c => isZh ? c.name.zh : c.name.en);
    const data = top10.map(c => c.salaryUSD);

    if (salaryChartInstance.current) {
      salaryChartInstance.current.destroy();
    }

    salaryChartInstance.current = new Chart(salaryChartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: isZh ? '年薪 (USD)' : 'Annual Salary (USD)',
          data,
          backgroundColor: '#3b82f6',
          borderRadius: 6,
          barThickness: 32,
          barPercentage: 0.7,
          categoryPercentage: 0.8
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
                const country = top10[ctx.dataIndex];
                return [
                  `${country.flag} ${formatUSD(country.salaryUSD)} USD`,
                  `${isZh ? '原始' : 'Original'}: ${country.metrics.salary} ${country.metrics.currency}`
                ];
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: (value) => formatUSD(value as number) },
            grid: { color: '#f1f5f9' }
          },
          x: { grid: { display: false } }
        }
      }
    });

    return () => {
      if (salaryChartInstance.current) {
        salaryChartInstance.current.destroy();
      }
    };
  }, [isZh]);

  // Regional Summary
  const regionStats = React.useMemo(() => {
    const stats: Record<string, { count: number; totalSalaryUSD: number }> = {};
    ['asia-pacific', 'europe', 'americas', 'middle-east'].forEach(key => {
      stats[key] = { count: 0, totalSalaryUSD: 0 };
    });

    COUNTRIES_DATA.forEach(country => {
      if (stats[country.region]) {
        stats[country.region].count++;
        stats[country.region].totalSalaryUSD += 
          convertToUSD(country.metrics.salaryRaw, country.metrics.currency);
      }
    });

    return stats;
  }, []);

  const regionLabels = {
    'asia-pacific': { zh: '亚太地区', en: 'Asia Pacific', icon: '🌏' },
    'europe': { zh: '欧洲', en: 'Europe', icon: '🌍' },
    'americas': { zh: '美洲', en: 'Americas', icon: '🌎' },
    'middle-east': { zh: '中东及其他', en: 'Middle East', icon: '🌐' }
  };

  const regionColors: Record<string, string> = {
    'asia-pacific': '#3b82f6',
    'europe': '#8b5cf6',
    'americas': '#10b981',
    'middle-east': '#f59e0b'
  };

  // Major Economies
  const majorEconomies = React.useMemo(() => {
    const ids = ['usa', 'china', 'japan', 'germany', 'uk', 'india'];
    return COUNTRIES_DATA.filter(c => ids.includes(c.id));
  }, []);

  return (
    <section className="viz-section" id="vizSection">
      <div className="viz-container">
        <div className="viz-header">
          <h2>{t.vizTitle}</h2>
          <p>{t.vizSubtitle}</p>
        </div>
        
        <div className="charts-grid">
          {/* GDP Ranking Chart */}
          <div className="chart-card">
            <div className="chart-title">
              <span>📊</span>
              <span>{t.gdpRankingTitle}</span>
            </div>
            <div className="chart-wrapper">
              <canvas id="gdpChart" ref={gdpChartRef}></canvas>
            </div>
          </div>
          
          {/* Regional Summary */}
          <div className="chart-card">
            <div className="chart-title">
              <span>🌐</span>
              <span>{t.regionSummaryTitle}</span>
            </div>
            <div className="region-cards">
              {Object.entries(regionLabels).map(([key, label]) => {
                const stats = regionStats[key];
                const avgSalary = stats.count > 0 
                  ? formatUSD(Math.round(stats.totalSalaryUSD / stats.count)) 
                  : 'N/A';
                return (
                  <div 
                    key={key} 
                    className="region-card"
                    style={{ '--region-color': regionColors[key] } as React.CSSProperties}
                  >
                    <div className="region-icon">{label.icon}</div>
                    <div className="region-info">
                      <div className="region-name">{isZh ? label.zh : label.en}</div>
                      <div className="region-stats">
                        <span>{stats.count} {isZh ? '个国家' : 'countries'}</span>
                        <span>{isZh ? '平均薪资' : 'Avg'}: {avgSalary}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Salary Comparison */}
          <div className="chart-card">
            <div className="chart-title">
              <span>💰</span>
              <span>{t.salaryComparisonTitle}</span>
            </div>
            <div className="chart-wrapper">
              <canvas id="salaryChart" ref={salaryChartRef}></canvas>
            </div>
          </div>
          
          {/* Major Economies */}
          <div className="chart-card">
            <div className="chart-title">
              <span>⚖️</span>
              <span>{t.majorEconomiesTitle}</span>
            </div>
            <div className="economy-cards">
              {majorEconomies.map(country => {
                const salaryUSD = convertToUSD(country.metrics.salaryRaw, country.metrics.currency);
                return (
                  <a 
                    key={country.id} 
                    href={`/reports/${country.file}`}
                    className="economy-card"
                  >
                    <div className="economy-flag">{country.flag}</div>
                    <div className="economy-info">
                      <div className="economy-name">
                        {isZh ? country.name.zh : country.name.en}
                      </div>
                      <div className="economy-metrics">
                        <div className="economy-metric">
                          <span className="metric-label">{t.gdpPerCapita}</span>
                          <span className="metric-value">{country.metrics.gdpPerCapita}</span>
                        </div>
                        <div className="economy-metric">
                          <span className="metric-label">{t.salary}</span>
                          <span className="metric-value">{formatUSD(salaryUSD)}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
