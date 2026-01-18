#!/usr/bin/env python3
import os

COUNTRY_DATA = {
    "USA": {"flag": "🇺🇸", "color": "#1e3a5f", "secondary": "#3d5a80"},
    "Germany": {"flag": "🇩🇪", "color": "#000000", "secondary": "#dd0000"},
    "Japan": {"flag": "🇯🇵", "color": "#bc002d", "secondary": "#ffffff"},
    "UK": {"flag": "🇬🇧", "color": "#00247d", "secondary": "#cf142b"},
    "China": {"flag": "🇨🇳", "color": "#de2910", "secondary": "#ffde00"},
    "France": {"flag": "🇫🇷", "color": "#0055a4", "secondary": "#ef4135"},
    "India": {"flag": "🇮🇳", "color": "#ff9933", "secondary": "#138808"},
    "Italy": {"flag": "🇮🇹", "color": "#008c45", "secondary": "#cd212a"},
    "Brazil": {"flag": "🇧🇷", "color": "#009c3b", "secondary": "#ffdf00"},
    "Canada": {"flag": "🇨🇦", "color": "#d80621", "secondary": "#ffffff"},
    "Russia": {"flag": "🇷🇺", "color": "#d52b1e", "secondary": "#0039a6"},
    "Australia": {"flag": "🇦🇺", "color": "#00008b", "secondary": "#d80621"},
    "Spain": {"flag": "🇪🇸", "color": "#aa151b", "secondary": "#f1bf00"},
    "Mexico": {"flag": "🇲🇽", "color": "#006847", "secondary": "#ce1126"},
    "Indonesia": {"flag": "🇮🇩", "color": "#d00", "secondary": "#fff"},
    "Saudi Arabia": {"flag": "🇸🇦", "color": "#165d31", "secondary": "#fff"},
    "Turkey": {"flag": "🇹🇷", "color": "#e30a17", "secondary": "#fff"},
    "Switzerland": {"flag": "🇨🇭", "color": "#d52b1e", "secondary": "#fff"},
    "Argentina": {"flag": "🇦🇷", "color": "#75aadb", "secondary": "#fff"},
    "Sweden": {"flag": "🇸🇪", "color": "#006aa7", "secondary": "#fecc00"},
    "Poland": {"flag": "🇵🇱", "color": "#dc143c", "secondary": "#fff"},
    "Belgium": {"flag": "🇧🇪", "color": "#fdda24", "secondary": "#ef233c"},
    "Thailand": {"flag": "🇹🇭", "color": "#241d4f", "secondary": "#a51931"},
    "Iran": {"flag": "🇮🇷", "color": "#239f40", "secondary": "#fff"},
    "Austria": {"flag": "🇦🇹", "color": "#c60c30", "secondary": "#fff"},
    "Norway": {"flag": "🇳🇴", "color": "#ba0c2f", "secondary": "#fff"},
    "UAE": {"flag": "🇦🇪", "color": "#00732f", "secondary": "#fff"},
    "Nigeria": {"flag": "🇳🇬", "color": "#008751", "secondary": "#fff"},
    "Israel": {"flag": "🇮🇱", "color": "#0038b8", "secondary": "#fff"},
    "South Korea": {"flag": "🇰🇷", "color": "#003478", "secondary": "#c60c30"},
    "Singapore": {"flag": "🇸🇬", "color": "#e70c1a", "secondary": "#fff"},
    "Malaysia": {"flag": "🇲🇾", "color": "#cc0001", "secondary": "#ffcc00"},
    "Philippines": {"flag": "🇵🇭", "color": "#0038a8", "secondary": "#ce1126"},
    "Vietnam": {"flag": "🇻🇳", "color": "#da251d", "secondary": "#ffff00"},
    "Netherlands": {"flag": "🇳🇱", "color": "#ae1c28", "secondary": "#fff"},
    "Colombia": {"flag": "🇨🇴", "color": "#003893", "secondary": "#ce1126"},
    "Chile": {"flag": "🇨🇱", "color": "#d52b1e", "secondary": "#fff"},
    "Egypt": {"flag": "🇪🇬", "color": "#c09300", "secondary": "#fff"},
    "Pakistan": {"flag": "🇵🇰", "color": "#01411c", "secondary": "#fff"},
    "Bangladesh": {"flag": "🇧🇩", "color": "#006a4e", "secondary": "#f42a41"},
    "South Africa": {"flag": "🇿🇦", "color": "#007749", "secondary": "#fff"},
    "Denmark": {"flag": "🇩🇰", "color": "#c60c30", "secondary": "#fff"},
    "Finland": {"flag": "🇫🇮", "color": "#003580", "secondary": "#fff"},
    "Greece": {"flag": "🇬🇷", "color": "#0d5eaf", "secondary": "#fff"},
    "Portugal": {"flag": "🇵🇹", "color": "#006600", "secondary": "#fff"},
    "Ukraine": {"flag": "🇺🇦", "color": "#0057b8", "secondary": "#ffd700"},
    "New Zealand": {"flag": "🇳🇿", "color": "#00247d", "secondary": "#d80621"},
    "Ireland": {"flag": "🇮🇪", "color": "#169b62", "secondary": "#ff883e"},
    "Iraq": {"flag": "🇮🇶", "color": "#007a3d", "secondary": "#fff"},
    "Hong Kong": {"flag": "🇭🇰", "color": "#de2910", "secondary": "#fff"},
}


def get_country_info(filename):
    name = filename.replace(" around 2025.txt", "").replace(" around 2025.md", "")
    name = (
        name.replace("United States", "USA")
        .replace("South Korea", "South Korea")
        .replace("United Kingdom", "UK")
    )

    key = name
    if name == "United States":
        key = "USA"
    elif name == "United Kingdom":
        key = "UK"
    elif name == "China 2025":
        key = "China"

    return name, COUNTRY_DATA.get(
        key, {"flag": "🏳️", "color": "#333", "secondary": "#666"}
    )


def generate_html(name, flag, color, secondary):
    zh_name = name
    if name == "USA":
        zh_name = "美国"
    elif name == "UK":
        zh_name = "英国"
    elif name == "Japan":
        zh_name = "日本"
    elif name == "Germany":
        zh_name = "德国"
    elif name == "China":
        zh_name = "中国"

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>{name} 2025 Economic Report</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {{
            --primary: {color};
            --secondary: {secondary};
            --white: #ffffff;
            --gray-50: #f9fafb;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-300: #d1d5db;
            --gray-400: #9ca3af;
            --gray-500: #6b7280;
            --gray-600: #4b5563;
            --gray-700: #374151;
            --gray-800: #1f2937;
            --gray-900: #111827;
            --navy: #1e3a5f;
        }}
        
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: var(--gray-100);
            color: var(--gray-800);
            line-height: 1.6;
        }}
        
        .navbar {{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            z-index: 1000;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }}
        
        .navbar-actions {{
            display: flex;
            align-items: center;
            gap: 12px;
        }}
        
        .back-btn {{
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            background: rgba(0, 0, 0, 0.06);
            color: var(--gray-700);
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
        }}
        
        .back-btn:hover {{
            background: rgba(0, 0, 0, 0.1);
            transform: translateX(-2px);
        }}
        
        .back-btn i {{ font-size: 0.9rem; }}
        
        .hamburger {{
            width: 44px;
            height: 44px;
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            padding: 10px;
        }}
        
        .hamburger span {{
            width: 22px;
            height: 2px;
            background: var(--gray-700);
            border-radius: 2px;
            transition: all 0.3s ease;
        }}
        
        .pc-nav {{
            display: none;
            align-items: center;
            gap: 24px;
        }}
        
        .pc-nav-link {{
            color: var(--gray-700);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            transition: color 0.3s;
        }}
        
        .pc-nav-link:hover {{ color: var(--primary); }}
        
        .mobile-overlay {{
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }}
        
        .mobile-panel {{
            position: fixed;
            top: 0;
            right: -280px;
            width: 280px;
            height: 100vh;
            background: var(--white);
            padding: 80px 24px 24px;
            transition: right 0.3s ease;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }}
        
        .mobile-overlay.active {{ opacity: 1; visibility: visible; }}
        .mobile-panel.active {{ right: 0; }}
        
        .mobile-link {{
            display: block;
            padding: 14px 16px;
            color: var(--gray-700);
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            border-radius: 8px;
            transition: all 0.2s;
        }}
        
        .mobile-link:hover {{
            background: var(--gray-100);
            color: var(--primary);
        }}
        
        .hero {{
            padding: 100px 20px 60px;
            text-align: center;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: var(--white);
        }}
        
        .hero-flag {{
            font-size: 4rem;
            display: block;
            margin-bottom: 16px;
            animation: bounce 2s infinite;
        }}
        
        @keyframes bounce {{
            0%, 100% {{ transform: translateY(0); }}
            50% {{ transform: translateY(-10px); }}
        }}
        
        .hero h1 {{
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 8px;
        }}
        
        .hero h2 {{
            font-size: 1rem;
            font-weight: 400;
            opacity: 0.9;
            margin-bottom: 24px;
        }}
        
        .hero-stats {{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            max-width: 600px;
            margin: 0 auto;
        }}
        
        .hero-stat {{
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(10px);
            padding: 16px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.2);
        }}
        
        .hero-stat-value {{
            font-size: 1.4rem;
            font-weight: 700;
            display: block;
        }}
        
        .hero-stat-label {{
            font-size: 0.75rem;
            opacity: 0.85;
        }}
        
        .section {{
            padding: 48px 20px;
            max-width: 900px;
            margin: 0 auto;
        }}
        
        .section-title-area {{
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid var(--gray-200);
        }}
        
        .section-title-area i {{
            font-size: 1.3rem;
            color: var(--primary);
        }}
        
        .section-title-area h3 {{
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--gray-800);
        }}
        
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 32px;
        }}
        
        .stat-card {{
            background: var(--white);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }}
        
        .stat-card-label {{
            font-size: 0.8rem;
            color: var(--gray-500);
            margin-bottom: 4px;
        }}
        
        .stat-card-value {{
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--gray-800);
        }}
        
        .stat-card-note {{
            font-size: 0.75rem;
            color: var(--gray-400);
            margin-top: 4px;
        }}
        
        .chart-wrapper {{
            background: var(--white);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }}
        
        .chart-container {{
            position: relative;
            height: 280px;
        }}
        
        .benchmark-list {{
            display: flex;
            flex-direction: column;
            gap: 16px;
        }}
        
        .benchmark-item {{
            background: var(--white);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }}
        
        .benchmark-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }}
        
        .benchmark-label {{
            font-weight: 600;
            color: var(--gray-800);
        }}
        
        .benchmark-value {{
            font-weight: 700;
            color: var(--primary);
        }}
        
        .benchmark-bar {{
            height: 8px;
            background: var(--gray-200);
            border-radius: 4px;
            overflow: hidden;
        }}
        
        .benchmark-fill {{
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            border-radius: 4px;
            transition: width 1s ease;
        }}
        
        footer {{
            background: var(--gray-800);
            color: var(--gray-400);
            padding: 32px 20px;
            text-align: center;
        }}
        
        footer p {{
            font-size: 0.85rem;
        }}
        
        @media (min-width: 768px) {{
            .hero {{
                padding: 120px 40px 80px;
            }}
            
            .hero h1 {{
                font-size: 2.4rem;
            }}
            
            .hero h2 {{
                font-size: 1.2rem;
            }}
            
            .hero-stats {{
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
            }}
            
            .section {{
                padding: 64px 40px;
            }}
            
            .stats-grid {{
                grid-template-columns: repeat(4, 1fr);
            }}
            
            .hamburger {{ display: none; }}
            
            .pc-nav {{ display: flex; }}
        }}
        
        @media (min-width: 1024px) {{
            .hero-stats {{
                max-width: 900px;
            }}
            
            .chart-container {{
                height: 340px;
            }}
        }}
    </style>
</head>
<body>

    <nav class="navbar">
        <div class="navbar-actions">
            <a href="../index.html" class="back-btn">
                <i class="fas fa-arrow-left"></i>
                <span data-i18n="backBtn">Back</span>
            </a>
            <button class="hamburger" id="hamburger">
                <span></span><span></span><span></span>
            </button>
        </div>
        
        <div class="pc-nav">
            <a href="#salary" class="pc-nav-link" data-i18n="navSalary">Salary Levels</a>
            <a href="#income" class="pc-nav-link" data-i18n="navIncome">Household Income</a>
            <a href="#gdp" class="pc-nav-link" data-i18n="navGdp">GDP</a>
            <a href="#poverty" class="pc-nav-link" data-i18n="navPoverty">Poverty</a>
            <a href="#benchmark" class="pc-nav-link" data-i18n="navBenchmark">Benchmarks</a>
        </div>
    </nav>

    <div class="mobile-overlay" id="mobileOverlay"></div>
    <div class="mobile-panel" id="mobilePanel">
        <a href="#salary" class="mobile-link" data-i18n="navSalary">薪资水平</a>
        <a href="#income" class="mobile-link" data-i18n="navIncome">家庭收入</a>
        <a href="#gdp" class="mobile-link" data-i18n="navGdp">GDP</a>
        <a href="#poverty" class="mobile-link" data-i18n="navPoverty">贫困与不平等</a>
        <a href="#benchmark" class="mobile-link" data-i18n="navBenchmark">实用基准</a>
    </div>

    <section class="hero">
        <span class="hero-flag">{flag}</span>
        <h1 data-i18n="heroTitle">{name} 2025 Economic Overview</h1>
        <h2 data-i18n="heroSubtitle">Key Economic Indicators & Income Statistics</h2>
        
        <div class="hero-stats">
            <div class="hero-stat">
                <span class="hero-stat-value" data-i18n="statGdp">$28.78T</span>
                <span class="hero-stat-label" data-i18n="statGdpLabel">Nominal GDP</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-value" data-i18n="statGdpCapita">$84,545</span>
                <span class="hero-stat-label" data-i18n="statGdpCapitaLabel">GDP per Person</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-value" data-i18n="statWage">$78,065</span>
                <span class="hero-stat-label" data-i18n="statWageLabel">Median Wage</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-value" data-i18n="statGini">39.0</span>
                <span class="hero-stat-label" data-i18n="statGiniLabel">Gini Coefficient</span>
            </div>
        </div>
    </section>

    <section class="section" id="salary">
        <div class="section-title-area">
            <i class="fas fa-money-bill-wave"></i>
            <h3 data-i18n="salaryTitle">Salary Levels</h3>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="salaryMinLabel">Minimum Wage</div>
                <div class="stat-card-value" data-i18n="salaryMin">$7.25/hr</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="salaryMedianLabel">Median Salary</div>
                <div class="stat-card-value" data-i18n="salaryMedian">$78,065</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="salaryAvgLabel">Average Salary</div>
                <div class="stat-card-value" data-i18n="salaryAvg">$85,845</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="salaryTopLabel">Top 10%</div>
                <div class="stat-card-value" data-i18n="salaryTop">$145,074</div>
            </div>
        </div>
        
        <div class="chart-wrapper">
            <div class="chart-container">
                <canvas id="salaryChart"></canvas>
            </div>
        </div>
    </section>

    <section class="section" id="income">
        <div class="section-title-area">
            <i class="fas fa-home"></i>
            <h3 data-i18n="incomeTitle">Household Income</h3>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="incomePoorLabel">Poor (<$25K)</div>
                <div class="stat-card-value" data-i18n="incomePoor">9.8%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="incomeLowLabel">Low ($25-50K)</div>
                <div class="stat-card-value" data-i18n="incomeLow">16.2%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="incomeMiddleLabel">Middle ($50-100K)</div>
                <div class="stat-card-value" data-i18n="incomeMiddle">30.5%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="incomeHighLabel">High (>$100K)</div>
                <div class="stat-card-value" data-i18n="incomeHigh">43.5%</div>
            </div>
        </div>
    </section>

    <section class="section" id="gdp">
        <div class="section-title-area">
            <i class="fas fa-chart-line"></i>
            <h3 data-i18n="gdpTitle">GDP Growth</h3>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="gdp2020Label">2020</div>
                <div class="stat-card-value" data-i18n="gdp2020">-2.2%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="gdp2021Label">2021</div>
                <div class="stat-card-value" data-i18n="gdp2021">5.9%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="gdp2022Label">2022</div>
                <div class="stat-card-value" data-i18n="gdp2022">1.9%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="gdp2023Label">2023</div>
                <div class="stat-card-value" data-i18n="gdp2023">2.5%</div>
            </div>
        </div>
        
        <div class="chart-wrapper">
            <div class="chart-container">
                <canvas id="gdpChart"></canvas>
            </div>
        </div>
    </section>

    <section class="section" id="poverty">
        <div class="section-title-area">
            <i class="fas fa-hand-holding-heart"></i>
            <h3 data-i18n="povertyTitle">Poverty & Inequality</h3>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="povertyRateLabel">Poverty Rate</div>
                <div class="stat-card-value" data-i18n="povertyRate">11.5%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="giniLabel">Gini Index</div>
                <div class="stat-card-value" data-i18n="gini">39.0</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="unemploymentLabel">Unemployment</div>
                <div class="stat-card-value" data-i18n="unemployment">3.8%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="hdiLabel">Human Dev Index</div>
                <div class="stat-card-value" data-i18n="hdi">0.926</div>
            </div>
        </div>
    </section>

    <section class="section" id="benchmark">
        <div class="section-title-area">
            <i class="fas fa-balance-scale"></i>
            <h3 data-i18n="benchmarkTitle">International Benchmarks</h3>
        </div>
        
        <div class="benchmark-list">
            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchGdpLabel">GDP per Capita (vs USA)</span>
                    <span class="benchmark-value" data-i18n="benchGdp">100%</span>
                </div>
                <div class="benchmark-bar">
                    <div class="benchmark-fill" style="width: 100%"></div>
                </div>
            </div>
            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchSalaryLabel">Median Wage (vs USA)</span>
                    <span class="benchmark-value" data-i18n="benchSalary">100%</span>
                </div>
                <div class="benchmark-bar">
                    <div class="benchmark-fill" style="width: 100%"></div>
                </div>
            </div>
            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchPovertyLabel">Poverty Rate (lower is better)</span>
                    <span class="benchmark-value" data-i18n="benchPoverty">100%</span>
                </div>
                <div class="benchmark-bar">
                    <div class="benchmark-fill" style="width: 100%"></div>
                </div>
            </div>
            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchHdiLabel">Human Development Index</span>
                    <span class="benchmark-value" data-i18n="benchHdi">100%</span>
                </div>
                <div class="benchmark-bar">
                    <div class="benchmark-fill" style="width: 100%"></div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p data-i18n="footerText">Economic data sourced from World Bank, IMF, and national statistics agencies. Updated January 2025.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
    <script>
        var isZh = true;
        
        var translations = {{
            zh: {{
                backBtn: '返回',
                navSalary: '薪资水平',
                navIncome: '家庭收入',
                navGdp: 'GDP',
                navPoverty: '贫困与不平等',
                navBenchmark: '实用基准',
                heroTitle: '{zh_name} 2025 经济概览',
                heroSubtitle: '关键经济指标与收入统计',
                heroUpdated: '更新时间：2025年1月',
                statGdpLabel: '名义GDP',
                statGdpCapitaLabel: '人均GDP',
                statWageLabel: '中位数工资',
                statGiniLabel: '基尼系数',
                salaryTitle: '薪资水平',
                salaryMinLabel: '最低工资',
                salaryMedianLabel: '中位数工资',
                salaryAvgLabel: '平均工资',
                salaryTopLabel: '前10%收入',
                incomeTitle: '家庭收入分布',
                incomePoorLabel: '贫困 (<$25K)',
                incomeLowLabel: '低收入 ($25-50K)',
                incomeMiddleLabel: '中等收入 ($50-100K)',
                incomeHighLabel: '高收入 (>$100K)',
                gdpTitle: 'GDP增长趋势',
                gdp2020Label: '2020年',
                gdp2021Label: '2021年',
                gdp2022Label: '2022年',
                gdp2023Label: '2023年',
                povertyTitle: '贫困与不平等',
                povertyRateLabel: '贫困率',
                giniLabel: '基尼指数',
                unemploymentLabel: '失业率',
                hdiLabel: '人类发展指数',
                benchmarkTitle: '国际基准对比',
                benchGdpLabel: '人均GDP（vs 美国）',
                benchSalaryLabel: '中位数工资（vs 美国）',
                benchPovertyLabel: '贫困率（越低越好）',
                benchHdiLabel: '人类发展指数',
                footerText: '经济数据来源于世界银行、IMF和国家统计局。更新于2025年1月。'
            }},
            en: {{
                backBtn: 'Back',
                navSalary: 'Salary Levels',
                navIncome: 'Household Income',
                navGdp: 'GDP',
                navPoverty: 'Poverty',
                navBenchmark: 'Benchmarks',
                heroTitle: '{name} 2025 Economic Overview',
                heroSubtitle: 'Key Economic Indicators & Income Statistics',
                heroUpdated: 'Updated January 2025',
                statGdpLabel: 'Nominal GDP',
                statGdpCapitaLabel: 'GDP per Person',
                statWageLabel: 'Median Wage',
                statGiniLabel: 'Gini Coefficient',
                salaryTitle: 'Salary Levels',
                salaryMinLabel: 'Minimum Wage',
                salaryMedianLabel: 'Median Salary',
                salaryAvgLabel: 'Average Salary',
                salaryTopLabel: 'Top 10%',
                incomeTitle: 'Household Income Distribution',
                incomePoorLabel: 'Poor (<$25K)',
                incomeLowLabel: 'Low ($25-50K)',
                incomeMiddleLabel: 'Middle ($50-100K)',
                incomeHighLabel: 'High (>$100K)',
                gdpTitle: 'GDP Growth Trend',
                gdp2020Label: '2020',
                gdp2021Label: '2021',
                gdp2022Label: '2022',
                gdp2023Label: '2023',
                povertyTitle: 'Poverty & Inequality',
                povertyRateLabel: 'Poverty Rate',
                giniLabel: 'Gini Index',
                unemploymentLabel: 'Unemployment',
                hdiLabel: 'Human Development Index',
                benchmarkTitle: 'International Benchmarks',
                benchGdpLabel: 'GDP per Capita (vs USA)',
                benchSalaryLabel: 'Median Wage (vs USA)',
                benchPovertyLabel: 'Poverty Rate (lower is better)',
                benchHdiLabel: 'Human Development Index',
                footerText: 'Economic data sourced from World Bank, IMF, and national statistics agencies. Updated January 2025.'
            }}
        }};
        
        var salaryData = {{
            labels: {{ zh: ['最低工资', '中位数', '平均工资', '前10%'], en: ['Minimum', 'Median', 'Average', 'Top 10%'] }},
            values: [7.25, 78065, 85845, 145074]
        }};
        
        var gdpData = {{
            labels: {{ zh: ['2020', '2021', '2022', '2023'], en: ['2020', '2021', '2022', '2023'] }},
            values: [-2.2, 5.9, 1.9, 2.5]
        }};
        
        var chartColors = {{
            primary: '{color}',
            secondary: '{secondary}',
            grid: 'rgba(0,0,0,0.08)',
            text: 'rgba(0,0,0,0.65)'
        }};
        
        function switchLanguage() {{
            isZh = !isZh;
            localStorage.setItem('preferredLanguage', isZh ? 'zh' : 'en');
            document.documentElement.lang = isZh ? 'zh-CN' : 'en';
            
            document.querySelectorAll('[data-i18n]').forEach(function(el) {{
                var key = el.getAttribute('data-i18n');
                if (translations[isZh ? 'zh' : 'en'][key]) {{
                    el.textContent = translations[isZh ? 'zh' : 'en'][key];
                }}
            }});
            
            renderAllCharts();
        }}
        
        function renderAllCharts() {{
            renderSalaryChart();
            renderGdpChart();
        }}
        
        function renderSalaryChart() {{
            var ctx = document.getElementById('salaryChart');
            if (!ctx) return;
            
            if (ctx.salaryChart) ctx.salaryChart.destroy();
            
            var labels = isZh ? salaryData.labels.zh : salaryData.labels.en;
            
            ctx.salaryChart = new Chart(ctx, {{
                type: 'bar',
                data: {{
                    labels: labels,
                    datasets: [{{
                        label: isZh ? '美元' : 'USD',
                        data: salaryData.values,
                        backgroundColor: chartColors.primary,
                        borderRadius: 6
                    }}]
                }},
                options: {{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {{
                        legend: {{ display: false }}
                    }},
                    scales: {{
                        y: {{
                            beginAtZero: true,
                            grid: {{ color: chartColors.grid }}
                        }},
                        x: {{
                            grid: {{ display: false }}
                        }}
                    }}
                }}
            }});
        }}
        
        function renderGdpChart() {{
            var ctx = document.getElementById('gdpChart');
            if (!ctx) return;
            
            if (ctx.gdpChart) ctx.gdpChart.destroy();
            
            var labels = isZh ? gdpData.labels.zh : gdpData.labels.en;
            var colors = gdpData.values.map(function(v) {{
                return v >= 0 ? chartColors.primary : chartColors.secondary;
            }});
            
            ctx.gdpChart = new Chart(ctx, {{
                type: 'bar',
                data: {{
                    labels: labels,
                    datasets: [{{
                        label: isZh ? '增长率 (%)' : 'Growth Rate (%)',
                        data: gdpData.values,
                        backgroundColor: colors,
                        borderRadius: 6
                    }}]
                }},
                options: {{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {{
                        legend: {{ display: false }}
                    }},
                    scales: {{
                        y: {{
                            grid: {{ color: chartColors.grid }}
                        }},
                        x: {{
                            grid: {{ display: false }}
                        }}
                    }}
                }}
            }});
        }}
        
        document.addEventListener('DOMContentLoaded', function() {{
            var savedLang = localStorage.getItem('preferredLanguage');
            if (savedLang !== null) {{
                isZh = savedLang === 'zh';
            }}
            
            document.documentElement.lang = isZh ? 'zh-CN' : 'en';
            
            function updateContent() {{
                document.querySelectorAll('[data-i18n]').forEach(function(el) {{
                    var key = el.getAttribute('data-i18n');
                    if (translations[isZh ? 'zh' : 'en'][key]) {{
                        el.textContent = translations[isZh ? 'zh' : 'en'][key];
                    }}
                }});
            }}
            
            updateContent();
            
            var hamburger = document.getElementById('hamburger');
            var mobilePanel = document.getElementById('mobilePanel');
            var mobileOverlay = document.getElementById('mobileOverlay');
            
            hamburger.addEventListener('click', function() {{
                hamburger.classList.toggle('active');
                mobilePanel.classList.toggle('active');
                mobileOverlay.classList.toggle('active');
            }});
            
            mobileOverlay.addEventListener('click', function() {{
                hamburger.classList.remove('active');
                mobilePanel.classList.remove('active');
                mobileOverlay.classList.remove('active');
            }});
            
            document.querySelectorAll('.mobile-link').forEach(function(link) {{
                link.addEventListener('click', function() {{
                    hamburger.classList.remove('active');
                    mobilePanel.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                }});
            }});
            
            setTimeout(function() {{
                renderAllCharts();
            }}, 300);
        }});
    </script>
</body>
</html>"""

    return html


def main():
    reports_dir = "reports"

    if not os.path.exists(reports_dir):
        os.makedirs(reports_dir)

    for name, info in COUNTRY_DATA.items():
        flag = info["flag"]
        primary = info["color"]
        secondary = info["secondary"]

        html = generate_html(name, flag, primary, secondary)

        output_name = f"{name}-2025-Economic-Report.html"
        if name == "South Korea":
            output_name = "South-Korea-2025-Economic-Report.html"

        output_path = os.path.join(reports_dir, output_name)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html)

        print(f"Generated: {output_name}")


if __name__ == "__main__":
    main()
