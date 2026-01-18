import React from 'react';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Global Economic Data 2025</h1>
        <p>Comprehensive economic insights and analysis for 29 countries worldwide. Explore salary comparisons, GDP rankings, and economic indicators.</p>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">29</span>
            <span className="hero-stat-label">Countries</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">$85K</span>
            <span className="hero-stat-label">Avg Salary</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">$125K</span>
            <span className="hero-stat-label">Avg GDP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
