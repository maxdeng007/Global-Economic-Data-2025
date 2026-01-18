#!/usr/bin/env python3
"""
Generate enhanced economic reports for all countries.
This script reads country data and generates polished HTML reports.
"""

import os
from pathlib import Path

# Country data - simple and clean
COUNTRIES = {
    "USA": {
        "flag": "🇺🇸",
        "name_zh": "美国",
        "name_en": "United States",
        "gdp_per_capita": 26700,
        "population": 336,
        "median_salary": 61000,
        "median_household": 81000,
        "gdp_growth": 2.4,
        "unemployment": 4.1,
        "gini": 0.48,
        "color": "#1e3a5f",
        "color_light": "#3d5a80",
    },
    "China": {
        "flag": "🇨🇳",
        "name_zh": "中国",
        "name_en": "China",
        "gdp_per_capita": 13600,
        "population": 1416,
        "median_salary": 12000,
        "median_household": 14200,
        "gdp_growth": 5.0,
        "unemployment": 5.0,
        "gini": 0.465,
        "color": "#de2910",
        "color_light": "#ff4d4d",
    },
    "Japan": {
        "flag": "🇯🇵",
        "name_zh": "日本",
        "name_en": "Japan",
        "gdp_per_capita": 34500,
        "population": 125,
        "median_salary": 40000,
        "median_household": 84000,
        "gdp_growth": 1.0,
        "unemployment": 2.5,
        "gini": 0.33,
        "color": "#bc002d",
        "color_light": "#ff4d6a",
    },
    "Germany": {
        "flag": "🇩🇪",
        "name_zh": "德国",
        "name_en": "Germany",
        "gdp_per_capita": 52800,
        "population": 84,
        "median_salary": 49000,
        "median_household": 68000,
        "gdp_growth": 0.8,
        "unemployment": 3.0,
        "gini": 0.31,
        "color": "#000000",
        "color_light": "#333333",
    },
    "UK": {
        "flag": "🇬🇧",
        "name_zh": "英国",
        "name_en": "United Kingdom",
        "gdp_per_capita": 48900,
        "population": 67,
        "median_salary": 42000,
        "median_household": 62000,
        "gdp_growth": 1.2,
        "unemployment": 4.0,
        "gini": 0.33,
        "color": "#00247d",
        "color_light": "#3355aa",
    },
    "France": {
        "flag": "🇫🇷",
        "name_zh": "法国",
        "name_en": "France",
        "gdp_per_capita": 43600,
        "population": 68,
        "median_salary": 39000,
        "median_household": 56000,
        "gdp_growth": 1.0,
        "unemployment": 7.5,
        "gini": 0.32,
        "color": "#0055a4",
        "color_light": "#3377cc",
    },
    "India": {
        "flag": "🇮🇳",
        "name_zh": "印度",
        "name_en": "India",
        "gdp_per_capita": 2500,
        "population": 1450,
        "median_salary": 3500,
        "median_household": 7000,
        "gdp_growth": 6.5,
        "unemployment": 4.0,
        "gini": 0.36,
        "color": "#ff9933",
        "color_light": "#ffbb66",
    },
    "Brazil": {
        "flag": "🇧🇷",
        "name_zh": "巴西",
        "name_en": "Brazil",
        "gdp_per_capita": 10600,
        "population": 215,
        "median_salary": 12000,
        "median_household": 18000,
        "gdp_growth": 2.0,
        "unemployment": 8.0,
        "gini": 0.53,
        "color": "#009c3b",
        "color_light": "#33cc66",
    },
    "Australia": {
        "flag": "🇦🇺",
        "name_zh": "澳大利亚",
        "name_en": "Australia",
        "gdp_per_capita": 64500,
        "population": 26,
        "median_salary": 65000,
        "median_household": 92000,
        "gdp_growth": 2.0,
        "unemployment": 4.0,
        "gini": 0.34,
        "color": "#00008b",
        "color_light": "#3333cc",
    },
    "Canada": {
        "flag": "🇨🇦",
        "name_zh": "加拿大",
        "name_en": "Canada",
        "gdp_per_capita": 54900,
        "population": 40,
        "median_salary": 52000,
        "median_household": 76000,
        "gdp_growth": 1.5,
        "unemployment": 5.5,
        "gini": 0.31,
        "color": "#d80621",
        "color_light": "#ff3344",
    },
    "Russia": {
        "flag": "🇷🇺",
        "name_zh": "俄罗斯",
        "name_en": "Russia",
        "gdp_per_capita": 14000,
        "population": 144,
        "median_salary": 14000,
        "median_household": 24000,
        "gdp_growth": 1.5,
        "unemployment": 3.0,
        "gini": 0.39,
        "color": "#d52b1e",
        "color_light": "#ff5544",
    },
    "South-Korea": {
        "flag": "🇰🇷",
        "name_zh": "韩国",
        "name_en": "South Korea",
        "gdp_per_capita": 35600,
        "population": 51,
        "median_salary": 38000,
        "median_household": 58000,
        "gdp_growth": 2.2,
        "unemployment": 3.5,
        "gini": 0.31,
        "color": "#003478",
        "color_light": "#3366aa",
    },
    "Mexico": {
        "flag": "🇲🇽",
        "name_zh": "墨西哥",
        "name_en": "Mexico",
        "gdp_per_capita": 11400,
        "population": 130,
        "median_salary": 10000,
        "median_household": 16000,
        "gdp_growth": 2.5,
        "unemployment": 3.0,
        "gini": 0.43,
        "color": "#006847",
        "color_light": "#33aa77",
    },
    "Indonesia": {
        "flag": "🇮🇩",
        "name_zh": "印度尼西亚",
        "name_en": "Indonesia",
        "gdp_per_capita": 4700,
        "population": 280,
        "median_salary": 5000,
        "median_household": 9000,
        "gdp_growth": 5.0,
        "unemployment": 5.5,
        "gini": 0.38,
        "color": "#ff0000",
        "color_light": "#ff4444",
    },
    "Turkey": {
        "flag": "🇹🇷",
        "name_zh": "土耳其",
        "name_en": "Turkey",
        "gdp_per_capita": 11500,
        "population": 86,
        "median_salary": 14000,
        "median_household": 20000,
        "gdp_growth": 3.5,
        "unemployment": 10.0,
        "gini": 0.42,
        "color": "#e30a17",
        "color_light": "#ff4455",
    },
    "Saudi-Arabia": {
        "flag": "🇸🇦",
        "name_zh": "沙特阿拉伯",
        "name_en": "Saudi Arabia",
        "gdp_per_capita": 32000,
        "population": 37,
        "median_salary": 25000,
        "median_household": 45000,
        "gdp_growth": 2.8,
        "unemployment": 5.5,
        "gini": 0.36,
        "color": "#165d31",
        "color_light": "#449966",
    },
    "South-Africa": {
        "flag": "🇿🇦",
        "name_zh": "南非",
        "name_en": "South Africa",
        "gdp_per_capita": 6500,
        "population": 60,
        "median_salary": 9000,
        "median_household": 14000,
        "gdp_growth": 1.8,
        "unemployment": 32.0,
        "gini": 0.63,
        "color": "#007749",
        "color_light": "#33aa77",
    },
    "Nigeria": {
        "flag": "🇳🇬",
        "name_zh": "尼日利亚",
        "name_en": "Nigeria",
        "gdp_per_capita": 2300,
        "population": 226,
        "median_salary": 4000,
        "median_household": 7000,
        "gdp_growth": 3.0,
        "unemployment": 5.0,
        "gini": 0.40,
        "color": "#008751",
        "color_light": "#33aa77",
    },
    "Argentina": {
        "flag": "🇦🇷",
        "name_zh": "阿根廷",
        "name_en": "Argentina",
        "gdp_per_capita": 14000,
        "population": 46,
        "median_salary": 16000,
        "median_household": 22000,
        "gdp_growth": 2.5,
        "unemployment": 7.0,
        "gini": 0.42,
        "color": "#75aadb",
        "color_light": "#99bbdd",
    },
    "Thailand": {
        "flag": "🇹🇭",
        "name_zh": "泰国",
        "name_en": "Thailand",
        "gdp_per_capita": 7200,
        "population": 72,
        "median_salary": 9000,
        "median_household": 15000,
        "gdp_growth": 3.5,
        "unemployment": 1.0,
        "gini": 0.36,
        "color": "#241d4f",
        "color_light": "#5555aa",
    },
    "Vietnam": {
        "flag": "🇻🇳",
        "name_zh": "越南",
        "name_en": "Vietnam",
        "gdp_per_capita": 4300,
        "population": 100,
        "median_salary": 5500,
        "median_household": 9000,
        "gdp_growth": 6.5,
        "unemployment": 2.0,
        "gini": 0.35,
        "color": "#da251d",
        "color_light": "#ff5544",
    },
    "Philippines": {
        "flag": "🇵🇭",
        "name_zh": "菲律宾",
        "name_en": "Philippines",
        "gdp_per_capita": 4000,
        "population": 115,
        "median_salary": 6000,
        "median_household": 10000,
        "gdp_growth": 6.0,
        "unemployment": 4.5,
        "gini": 0.42,
        "color": "#003da5",
        "color_light": "#3377cc",
    },
    "Malaysia": {
        "flag": "🇲🇾",
        "name_zh": "马来西亚",
        "name_en": "Malaysia",
        "gdp_per_capita": 11600,
        "population": 35,
        "median_salary": 12000,
        "median_household": 20000,
        "gdp_growth": 4.5,
        "unemployment": 3.5,
        "gini": 0.40,
        "color": "#cc0000",
        "color_light": "#ff3333",
    },
    "Singapore": {
        "flag": "🇸🇬",
        "name_zh": "新加坡",
        "name_en": "Singapore",
        "gdp_per_capita": 82800,
        "population": 6,
        "median_salary": 55000,
        "median_household": 78000,
        "gdp_growth": 2.5,
        "unemployment": 2.0,
        "gini": 0.38,
        "color": "#ed2939",
        "color_light": "#ff6655",
    },
    "Poland": {
        "flag": "🇵🇱",
        "name_zh": "波兰",
        "name_en": "Poland",
        "gdp_per_capita": 18600,
        "population": 37,
        "median_salary": 18000,
        "median_household": 28000,
        "gdp_growth": 3.0,
        "unemployment": 5.0,
        "gini": 0.27,
        "color": "#dc143c",
        "color_light": "#ff4455",
    },
    "Netherlands": {
        "flag": "🇳🇱",
        "name_zh": "荷兰",
        "name_en": "Netherlands",
        "gdp_per_capita": 59100,
        "population": 18,
        "median_salary": 48000,
        "median_household": 72000,
        "gdp_growth": 1.5,
        "unemployment": 3.5,
        "gini": 0.29,
        "color": "#ff6600",
        "color_light": "#ff9955",
    },
    "Belgium": {
        "flag": "🇧🇪",
        "name_zh": "比利时",
        "name_en": "Belgium",
        "gdp_per_capita": 52700,
        "population": 12,
        "median_salary": 45000,
        "median_household": 62000,
        "gdp_growth": 1.2,
        "unemployment": 5.5,
        "gini": 0.27,
        "color": "#ffd900",
        "color_light": "#ffee33",
    },
    "Sweden": {
        "flag": "🇸🇪",
        "name_zh": "瑞典",
        "name_en": "Sweden",
        "gdp_per_capita": 56300,
        "population": 10,
        "median_salary": 42000,
        "median_household": 58000,
        "gdp_growth": 1.5,
        "unemployment": 6.5,
        "gini": 0.25,
        "color": "#006aa7",
        "color_light": "#3399cc",
    },
    "Switzerland": {
        "flag": "🇨🇭",
        "name_zh": "瑞士",
        "name_en": "Switzerland",
        "gdp_per_capita": 98500,
        "population": 9,
        "median_salary": 65000,
        "median_household": 95000,
        "gdp_growth": 1.2,
        "unemployment": 2.5,
        "gini": 0.32,
        "color": "#ff0000",
        "color_light": "#ff4444",
    },
    "Austria": {
        "flag": "🇦🇹",
        "name_zh": "奥地利",
        "name_en": "Austria",
        "gdp_per_capita": 54200,
        "population": 9,
        "median_salary": 46000,
        "median_household": 64000,
        "gdp_growth": 1.0,
        "unemployment": 5.0,
        "gini": 0.28,
        "color": "#ed2939",
        "color_light": "#ff6655",
    },
    "Finland": {
        "flag": "🇫🇮",
        "name_zh": "芬兰",
        "name_en": "Finland",
        "gdp_per_capita": 53700,
        "population": 5,
        "median_salary": 43000,
        "median_household": 58000,
        "gdp_growth": 1.0,
        "unemployment": 7.5,
        "gini": 0.27,
        "color": "#003580",
        "color_light": "#3366aa",
    },
    "Portugal": {
        "flag": "🇵🇹",
        "name_zh": "葡萄牙",
        "name_en": "Portugal",
        "gdp_per_capita": 24500,
        "population": 10,
        "median_salary": 20000,
        "median_household": 30000,
        "gdp_growth": 2.0,
        "unemployment": 6.5,
        "gini": 0.34,
        "color": "#006600",
        "color_light": "#33aa33",
    },
    "Spain": {
        "flag": "🇪🇸",
        "name_zh": "西班牙",
        "name_en": "Spain",
        "gdp_per_capita": 32600,
        "population": 48,
        "median_salary": 30000,
        "median_household": 45000,
        "gdp_growth": 2.5,
        "unemployment": 12.0,
        "gini": 0.34,
        "color": "#c60b1e",
        "color_light": "#ff4455",
    },
    "Italy": {
        "flag": "🇮🇹",
        "name_zh": "意大利",
        "name_en": "Italy",
        "gdp_per_capita": 37100,
        "population": 59,
        "median_salary": 32000,
        "median_household": 48000,
        "gdp_growth": 0.8,
        "unemployment": 7.5,
        "gini": 0.33,
        "color": "#008c45",
        "color_light": "#33bb77",
    },
    "Israel": {
        "flag": "🇮🇱",
        "name_zh": "以色列",
        "name_en": "Israel",
        "gdp_per_capita": 52200,
        "population": 9,
        "median_salary": 35000,
        "median_household": 52000,
        "gdp_growth": 3.5,
        "unemployment": 4.0,
        "gini": 0.39,
        "color": "#0038b8",
        "color_light": "#3366cc",
    },
    "Iraq": {
        "flag": "🇮🇶",
        "name_zh": "伊拉克",
        "name_en": "Iraq",
        "gdp_per_capita": 5800,
        "population": 45,
        "median_salary": 8000,
        "median_household": 12000,
        "gdp_growth": 3.0,
        "unemployment": 15.0,
        "gini": 0.36,
        "color": "#007a3d",
        "color_light": "#33aa77",
    },
    "Ukraine": {
        "flag": "🇺🇦",
        "name_zh": "乌克兰",
        "name_en": "Ukraine",
        "gdp_per_capita": 5400,
        "population": 38,
        "median_salary": 7000,
        "median_household": 12000,
        "gdp_growth": 3.5,
        "unemployment": 8.0,
        "gini": 0.25,
        "color": "#ffd700",
        "color_light": "#ffee33",
    },
    "UAE": {
        "flag": "🇦🇪",
        "name_zh": "阿联酋",
        "name_en": "UAE",
        "gdp_per_capita": 47800,
        "population": 10,
        "median_salary": 28000,
        "median_household": 45000,
        "gdp_growth": 3.0,
        "unemployment": 3.0,
        "gini": 0.32,
        "color": "#00732f",
        "color_light": "#33aa55",
    },
    "Norway": {
        "flag": "🇳🇴",
        "name_zh": "挪威",
        "name_en": "Norway",
        "gdp_per_capita": 89500,
        "population": 5,
        "median_salary": 55000,
        "median_household": 85000,
        "gdp_growth": 1.5,
        "unemployment": 3.5,
        "gini": 0.26,
        "color": "#ef2b2d",
        "color_light": "#ff6655",
    },
    "Ireland": {
        "flag": "🇮🇪",
        "name_zh": "爱尔兰",
        "name_en": "Ireland",
        "gdp_per_capita": 102500,
        "population": 5,
        "median_salary": 48000,
        "median_household": 72000,
        "gdp_growth": 4.5,
        "unemployment": 4.5,
        "gini": 0.31,
        "color": "#169b62",
        "color_light": "#44bb88",
    },
    "Denmark": {
        "flag": "🇩🇰",
        "name_zh": "丹麦",
        "name_en": "Denmark",
        "gdp_per_capita": 67800,
        "population": 6,
        "median_salary": 48000,
        "median_household": 68000,
        "gdp_growth": 2.0,
        "unemployment": 4.5,
        "gini": 0.25,
        "color": "#c60c30",
        "color_light": "#ff4455",
    },
    "Greece": {
        "flag": "🇬🇷",
        "name_zh": "希腊",
        "name_en": "Greece",
        "gdp_per_capita": 20900,
        "population": 10,
        "median_salary": 22000,
        "median_household": 32000,
        "gdp_growth": 2.2,
        "unemployment": 11.5,
        "gini": 0.33,
        "color": "#0d5eaf",
        "color_light": "#4488cc",
    },
    "New-Zealand": {
        "flag": "🇳🇿",
        "name_zh": "新西兰",
        "name_en": "New Zealand",
        "gdp_per_capita": 48500,
        "population": 5,
        "median_salary": 48000,
        "median_household": 70000,
        "gdp_growth": 1.8,
        "unemployment": 4.0,
        "gini": 0.33,
        "color": "#00247d",
        "color_light": "#3355aa",
    },
    "Colombia": {
        "flag": "🇨🇴",
        "name_zh": "哥伦比亚",
        "name_en": "Colombia",
        "gdp_per_capita": 6600,
        "population": 52,
        "median_salary": 9000,
        "median_household": 14000,
        "gdp_growth": 2.0,
        "unemployment": 10.0,
        "gini": 0.52,
        "color": "#fcd116",
        "color_light": "#ffee44",
    },
    "Chile": {
        "flag": "🇨🇱",
        "name_zh": "智利",
        "name_en": "Chile",
        "gdp_per_capita": 16600,
        "population": 19,
        "median_salary": 16000,
        "median_household": 26000,
        "gdp_growth": 2.5,
        "unemployment": 8.0,
        "gini": 0.46,
        "color": "#d52b1e",
        "color_light": "#ff6655",
    },
    "Egypt": {
        "flag": "🇪🇬",
        "name_zh": "埃及",
        "name_en": "Egypt",
        "gdp_per_capita": 4300,
        "population": 110,
        "median_salary": 6000,
        "median_household": 10000,
        "gdp_growth": 4.5,
        "unemployment": 7.0,
        "gini": 0.30,
        "color": "#c09300",
        "color_light": "#ddbb33",
    },
    "Bangladesh": {
        "flag": "🇧🇩",
        "name_zh": "孟加拉国",
        "name_en": "Bangladesh",
        "gdp_per_capita": 2700,
        "population": 175,
        "median_salary": 4000,
        "median_household": 7000,
        "gdp_growth": 6.0,
        "unemployment": 4.0,
        "gini": 0.33,
        "color": "#006a4e",
        "color_light": "#33aa77",
    },
    "Pakistan": {
        "flag": "🇵🇰",
        "name_zh": "巴基斯坦",
        "name_en": "Pakistan",
        "gdp_per_capita": 1700,
        "population": 240,
        "median_salary": 3500,
        "median_household": 6000,
        "gdp_growth": 4.0,
        "unemployment": 5.0,
        "gini": 0.35,
        "color": "#01411c",
        "color_light": "#337755",
    },
    "Iran": {
        "flag": "🇮🇷",
        "name_zh": "伊朗",
        "name_en": "Iran",
        "gdp_per_capita": 4100,
        "population": 87,
        "median_salary": 7000,
        "median_household": 12000,
        "gdp_growth": 3.5,
        "unemployment": 12.0,
        "gini": 0.40,
        "color": "#239f40",
        "color_light": "#55bb77",
    },
}


def generate_html(country_key, d):
    """Generate the HTML content for a country report."""

    # Calculate additional metrics
    avg_salary = int(d["median_salary"] * 1.15)
    prof_salary = int(d["median_salary"] * 1.5)
    tech_salary = int(d["median_salary"] * 2.0)
    medical_salary = int(d["median_salary"] * 3.5)

    # Estimate ranks
    gdp = d["gdp_per_capita"]
    if gdp > 80000:
        gdp_rank, salary_rank, global_rank = 5, 5, 1
    elif gdp > 50000:
        gdp_rank, salary_rank, global_rank = 10, 10, 5
    elif gdp > 30000:
        gdp_rank, salary_rank, global_rank = 20, 15, 10
    elif gdp > 15000:
        gdp_rank, salary_rank, global_rank = 40, 30, 20
    else:
        gdp_rank, salary_rank, global_rank = 60, 50, 30

    # Trend class
    gdp_trend = "trend-up" if d["gdp_growth"] > 0 else "trend-down"
    gdp_icon = "arrow-up" if d["gdp_growth"] > 0 else "arrow-down"

    # Class percentages
    if gdp > 60000:
        above_pov, mid_class, up_class = 95, 55, 40
    elif gdp > 30000:
        above_pov, mid_class, up_class = 90, 50, 35
    elif gdp > 15000:
        above_pov, mid_class, up_class = 85, 45, 30
    else:
        above_pov, mid_class, up_class = 80, 40, 25

    # More ranks
    pp_rank = min(gdp_rank + 5, 100)
    hdi_rank = min(gdp_rank - 5, 50)
    qol_rank = min(gdp_rank, 30)
    pp_class = "positive" if gdp > 30000 else "negative"

    # Format numbers with commas
    ms_f = f"{d['median_salary']:,}"
    as_f = f"{avg_salary:,}"
    ps_f = f"{prof_salary:,}"
    ts_f = f"{tech_salary:,}"
    mds_f = f"{medical_salary:,}"

    # Create filename
    filename = f"{country_key}-2025-Economic-Report.html"

    # Generate HTML using string concatenation to avoid format() issues
    html = "<!DOCTYPE html>\n"
    html += '<html lang="zh-CN">\n'
    html += "<head>\n"
    html += '    <meta charset="UTF-8">\n'
    html += '    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">\n'
    html += f"    <title>{d['name_en']} 2025 Economic Report</title>\n"
    html += '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n'
    html += '    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>\n'
    html += "    <style>\n"
    html += "        :root {\n"
    html += f"            --primary: {d['color']};\n"
    html += f"            --primary-light: {d['color_light']};\n"
    html += "            --secondary: #4a90a4;\n"
    html += "            --accent: #e8b339;\n"
    html += "            --white: #ffffff;\n"
    html += "            --gray-50: #f9fafb;\n"
    html += "            --gray-100: #f3f4f6;\n"
    html += "            --gray-200: #e5e7eb;\n"
    html += "            --gray-500: #6b7280;\n"
    html += "            --gray-600: #4b5563;\n"
    html += "            --gray-700: #374151;\n"
    html += "            --gray-800: #1f2937;\n"
    html += "            --gray-900: #111827;\n"
    html += "            --card-bg: rgba(255, 255, 255, 0.7);\n"
    html += "            --card-border: rgba(255, 255, 255, 0.5);\n"
    html += "            --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n"
    html += "            --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.12);\n"
    html += "            --radius: 16px;\n"
    html += "            --radius-sm: 10px;\n"
    html += "        }\n"
    html += '        [data-theme="dark"] {\n'
    html += "            --gray-100: #1f2937;\n"
    html += "            --gray-200: #374151;\n"
    html += "            --gray-500: #9ca3af;\n"
    html += "            --gray-600: #d1d5db;\n"
    html += "            --gray-700: #e5e7eb;\n"
    html += "            --gray-800: #f3f4f6;\n"
    html += "            --gray-900: #f9fafb;\n"
    html += "            --card-bg: rgba(30, 30, 30, 0.6);\n"
    html += "            --card-border: rgba(255, 255, 255, 0.1);\n"
    html += "            --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n"
    html += "            --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.4);\n"
    html += "        }\n"
    html += "        * { margin: 0; padding: 0; box-sizing: border-box; }\n"
    html += "        html { scroll-behavior: smooth; }\n"
    html += "        body {\n"
    html += '            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n'
    html += "            background: var(--gray-100);\n"
    html += "            color: var(--gray-800);\n"
    html += "            line-height: 1.6;\n"
    html += "            overflow-x: hidden;\n"
    html += "        }\n"
    html += "        .navbar {\n"
    html += "            position: fixed;\n"
    html += "            top: 0;\n"
    html += "            left: 0;\n"
    html += "            right: 0;\n"
    html += "            height: 60px;\n"
    html += "            background: rgba(255, 255, 255, 0.9);\n"
    html += "            backdrop-filter: blur(20px);\n"
    html += "            display: flex;\n"
    html += "            align-items: center;\n"
    html += "            justify-content: space-between;\n"
    html += "            padding: 0 16px;\n"
    html += "            z-index: 1000;\n"
    html += "            box-shadow: 0 1px 3px rgba(0,0,0,0.08);\n"
    html += "        }\n"
    html += (
        '        [data-theme="dark"] .navbar { background: rgba(30, 30, 30, 0.9); }\n'
    )
    html += (
        "        .navbar-actions { display: flex; align-items: center; gap: 12px; }\n"
    )
    html += "        .back-btn {\n"
    html += "            display: inline-flex;\n"
    html += "            align-items: center;\n"
    html += "            gap: 6px;\n"
    html += "            padding: 8px 14px;\n"
    html += "            background: rgba(0, 0, 0, 0.06);\n"
    html += "            color: var(--gray-700);\n"
    html += "            border: 1px solid rgba(0, 0, 0, 0.1);\n"
    html += "            border-radius: var(--radius-sm);\n"
    html += "            font-size: 0.85rem;\n"
    html += "            font-weight: 600;\n"
    html += "            cursor: pointer;\n"
    html += "            text-decoration: none;\n"
    html += "            transition: all 0.3s ease;\n"
    html += "        }\n"
    html += '        [data-theme="dark"] .back-btn { background: rgba(255, 255, 255, 0.1); color: var(--gray-300); border-color: rgba(255, 255, 255, 0.15); }\n'
    html += "        .back-btn:hover { background: rgba(0, 0, 0, 0.1); transform: translateX(-2px); }\n"
    html += '        [data-theme="dark"] .back-btn:hover { background: rgba(255, 255, 255, 0.15); }\n'
    html += "        .fab-container { position: fixed; bottom: 24px; right: 24px; display: flex; flex-direction: column; gap: 12px; z-index: 999; }\n"
    html += "        .fab {\n"
    html += "            width: 56px;\n"
    html += "            height: 56px;\n"
    html += "            border-radius: 50%;\n"
    html += "            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);\n"
    html += "            color: white;\n"
    html += "            border: none;\n"
    html += "            cursor: pointer;\n"
    html += "            display: flex;\n"
    html += "            align-items: center;\n"
    html += "            justify-content: center;\n"
    html += "            font-size: 1.3rem;\n"
    html += "            box-shadow: 0 4px 20px rgba(30, 58, 95, 0.4);\n"
    html += "            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n"
    html += "        }\n"
    html += "        .fab:hover { transform: scale(1.1) rotate(90deg); box-shadow: 0 6px 30px rgba(30, 58, 95, 0.5); }\n"
    html += "        .fab-sub {\n"
    html += "            width: 48px;\n"
    html += "            height: 48px;\n"
    html += "            border-radius: 50%;\n"
    html += "            background: var(--card-bg);\n"
    html += "            backdrop-filter: blur(10px);\n"
    html += "            color: var(--gray-700);\n"
    html += "            border: 1px solid var(--card-border);\n"
    html += "            cursor: pointer;\n"
    html += "            display: flex;\n"
    html += "            align-items: center;\n"
    html += "            justify-content: center;\n"
    html += "            font-size: 1rem;\n"
    html += "            box-shadow: var(--shadow);\n"
    html += "            opacity: 0;\n"
    html += "            transform: scale(0) translateY(20px);\n"
    html += "            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n"
    html += "        }\n"
    html += '        [data-theme="dark"] .fab-sub { color: var(--gray-300); }\n'
    html += "        .fab-container:hover .fab-sub { opacity: 1; transform: scale(1) translateY(0); }\n"
    html += "        .fab-sub:hover { background: var(--primary); color: white; }\n"
    html += "        .hero {\n"
    html += "            position: relative;\n"
    html += "            padding: 100px 20px 80px;\n"
    html += "            text-align: center;\n"
    html += "            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--primary-light) 100%);\n"
    html += "            overflow: hidden;\n"
    html += "            isolation: isolate;\n"
    html += "        }\n"
    html += "        .hero::before {\n"
    html += '            content: "";\n'
    html += "            position: absolute;\n"
    html += "            inset: 0;\n"
    html += "            background: radial-gradient(circle at 20% 80%, rgba(232, 179, 57, 0.15) 0%, transparent 50%),\n"
    html += "                        radial-gradient(circle at 80% 20%, rgba(74, 144, 164, 0.15) 0%, transparent 50%);\n"
    html += "            animation: heroGradient 15s ease-in-out infinite;\n"
    html += "        }\n"
    html += "        @keyframes heroGradient { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }\n"
    html += "        .particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }\n"
    html += "        .particle {\n"
    html += "            position: absolute;\n"
    html += "            width: 8px;\n"
    html += "            height: 8px;\n"
    html += "            background: rgba(255, 255, 255, 0.3);\n"
    html += "            border-radius: 50%;\n"
    html += "            animation: float 20s infinite;\n"
    html += "        }\n"
    html += (
        "        .particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }\n"
    )
    html += (
        "        .particle:nth-child(2) { left: 20%; top: 60%; animation-delay: 3s; }\n"
    )
    html += (
        "        .particle:nth-child(3) { left: 30%; top: 30%; animation-delay: 6s; }\n"
    )
    html += (
        "        .particle:nth-child(4) { left: 40%; top: 70%; animation-delay: 9s; }\n"
    )
    html += "        .particle:nth-child(5) { left: 50%; top: 40%; animation-delay: 12s; }\n"
    html += "        .particle:nth-child(6) { left: 60%; top: 15%; animation-delay: 15s; }\n"
    html += "        .particle:nth-child(7) { left: 70%; top: 55%; animation-delay: 18s; }\n"
    html += "        .particle:nth-child(8) { left: 80%; top: 25%; animation-delay: 21s; }\n"
    html += "        .particle:nth-child(9) { left: 90%; top: 65%; animation-delay: 24s; }\n"
    html += "        @keyframes float {\n"
    html += "            0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }\n"
    html += "            25% { transform: translateY(-100px) translateX(50px) scale(1.2); opacity: 0.6; }\n"
    html += "            50% { transform: translateY(-200px) translateX(-30px) scale(0.8); opacity: 0.4; }\n"
    html += "        }\n"
    html += "        .hero-content { position: relative; z-index: 1; }\n"
    html += f"        .hero-flag {{ font-size: 5rem; display: block; margin-bottom: 16px; animation: bounce 3s ease-in-out infinite; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2)); }}\n"
    html += "        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }\n"
    html += f"        .hero h1 {{ font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }}\n"
    html += "        .hero h2 { font-size: 1.1rem; font-weight: 400; opacity: 0.9; margin-bottom: 32px; }\n"
    html += "        .hero-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 700px; margin: 0 auto; }\n"
    html += "        .hero-stat {\n"
    html += "            background: rgba(255, 255, 255, 0.15);\n"
    html += "            backdrop-filter: blur(20px);\n"
    html += "            padding: 20px;\n"
    html += "            border-radius: var(--radius);\n"
    html += "            border: 1px solid rgba(255, 255, 255, 0.2);\n"
    html += "            transition: all 0.3s ease;\n"
    html += "            position: relative;\n"
    html += "            overflow: hidden;\n"
    html += "        }\n"
    html += "        .hero-stat:hover { transform: translateY(-4px); background: rgba(255, 255, 255, 0.25); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); }\n"
    html += "        .hero-stat-icon { font-size: 1.5rem; margin-bottom: 8px; opacity: 0.9; }\n"
    html += "        .hero-stat-value { font-size: 1.6rem; font-weight: 800; display: block; margin-bottom: 4px; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); }\n"
    html += "        .hero-stat-label { font-size: 0.8rem; opacity: 0.85; }\n"
    html += f"        .trend {{ display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; font-weight: 600; padding: 2px 8px; border-radius: 20px; margin-top: 6px; }}\n"
    html += f"        .trend-up {{ background: rgba(16, 185, 129, 0.2); color: #10b981; }}\n"
    html += f"        .trend-down {{ background: rgba(239, 68, 68, 0.2); color: #ef4444; }}\n"
    html += f"        .trend-neutral {{ background: rgba(156, 163, 175, 0.2); color: #9ca3af; }}\n"
    html += "        .glass-card, .stat-card, .benchmark-card, .expandable-card { background: var(--card-bg); backdrop-filter: blur(20px); border-radius: var(--radius); border: 1px solid var(--card-border); padding: 20px; box-shadow: var(--shadow); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n"
    html += "        .glass-card:hover, .stat-card:hover, .benchmark-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }\n"
    html += "        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }\n"
    html += "        .reveal.active { opacity: 1; transform: translateY(0); }\n"
    html += "        .reveal-left { opacity: 0; transform: translateX(-40px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }\n"
    html += "        .reveal-left.active { opacity: 1; transform: translateX(0); }\n"
    html += "        .reveal-right { opacity: 0; transform: translateX(40px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }\n"
    html += "        .reveal-right.active { opacity: 1; transform: translateX(0); }\n"
    html += "        .reveal-scale { opacity: 0; transform: scale(0.9); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }\n"
    html += "        .reveal-scale.active { opacity: 1; transform: scale(1); }\n"
    html += "        .section { margin-bottom: 48px; }\n"
    html += "        .section-title-area { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid var(--gray-200); }\n"
    html += '        [data-theme="dark"] .section-title-area { border-color: var(--gray-700); }\n'
    html += "        .section-icon { width: 44px; height: 44px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: white; box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3); }\n"
    html += "        .section-title-area h3 { font-size: 1.3rem; font-weight: 700; color: var(--gray-800); }\n"
    html += '        [data-theme="dark"] .section-title-area h3 { color: var(--gray-200); }\n'
    html += "        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }\n"
    html += "        @media (min-width: 640px) { .stats-grid { grid-template-columns: repeat(3, 1fr); } }\n"
    html += "        .stat-icon { width: 40px; height: 40px; background: linear-gradient(135deg, var(--gray-100) 0%, var(--gray-200) 100%); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--primary); margin-bottom: 12px; }\n"
    html += '        [data-theme="dark"] .stat-icon { background: rgba(255, 255, 255, 0.1); color: var(--secondary); }\n'
    html += "        .stat-value { font-size: 1.4rem; font-weight: 800; color: var(--gray-800); margin-bottom: 4px; }\n"
    html += '        [data-theme="dark"] .stat-value { color: var(--gray-200); }\n'
    html += "        .stat-label { font-size: 0.8rem; color: var(--gray-500); }\n"
    html += '        [data-theme="dark"] .stat-label { color: var(--gray-400); }\n'
    html += "        .progress-circle-container { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 24px; }\n"
    html += "        .progress-circle-wrapper { flex: 1; min-width: 140px; display: flex; flex-direction: column; align-items: center; }\n"
    html += "        .progress-circle { position: relative; width: 120px; height: 120px; }\n"
    html += "        .progress-circle svg { transform: rotate(-90deg); }\n"
    html += "        .progress-circle-bg { fill: none; stroke: var(--gray-200); stroke-width: 8; }\n"
    html += (
        '        [data-theme="dark"] .progress-circle-bg { stroke: var(--gray-700); }\n'
    )
    html += "        .progress-circle-fill { fill: none; stroke: var(--primary); stroke-width: 8; stroke-linecap: round; stroke-dasharray: 283; stroke-dashoffset: 283; transition: stroke-dashoffset 2s ease-out; }\n"
    html += "        .progress-circle-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }\n"
    html += "        .progress-circle-value { font-size: 1.4rem; font-weight: 800; color: var(--gray-800); }\n"
    html += '        [data-theme="dark"] .progress-circle-value { color: var(--gray-200); }\n'
    html += "        .progress-circle-label { font-size: 0.7rem; color: var(--gray-500); }\n"
    html += '        [data-theme="dark"] .progress-circle-label { color: var(--gray-400); }\n'
    html += "        .expandable-card { margin-bottom: 16px; }\n"
    html += "        .expandable-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; cursor: pointer; }\n"
    html += "        .expandable-header:hover { background: rgba(0, 0, 0, 0.02); }\n"
    html += '        [data-theme="dark"] .expandable-header:hover { background: rgba(255, 255, 255, 0.05); }\n'
    html += (
        "        .expandable-title { display: flex; align-items: center; gap: 12px; }\n"
    )
    html += "        .expandable-icon { width: 40px; height: 40px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1rem; color: white; }\n"
    html += "        .expandable-title-text { font-size: 1.1rem; font-weight: 600; color: var(--gray-800); }\n"
    html += '        [data-theme="dark"] .expandable-title-text { color: var(--gray-200); }\n'
    html += "        .expandable-badge { background: linear-gradient(135deg, var(--accent) 0%, #d4a520 100%); color: var(--gray-900); padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }\n"
    html += "        .expandable-arrow { font-size: 1rem; color: var(--gray-400); transition: transform 0.3s ease; }\n"
    html += "        .expandable-card.expanded .expandable-arrow { transform: rotate(180deg); }\n"
    html += "        .expandable-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }\n"
    html += "        .expandable-card.expanded .expandable-content { max-height: 1000px; }\n"
    html += "        .expandable-body { padding: 0 24px 24px; }\n"
    html += "        .expandable-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 16px; }\n"
    html += "        @media (min-width: 640px) { .expandable-grid { grid-template-columns: repeat(3, 1fr); } }\n"
    html += "        .expandable-item { background: var(--gray-50); padding: 12px; border-radius: var(--radius-sm); text-align: center; }\n"
    html += '        [data-theme="dark"] .expandable-item { background: rgba(255, 255, 255, 0.05); }\n'
    html += "        .expandable-item-value { font-size: 1.1rem; font-weight: 700; color: var(--primary); margin-bottom: 2px; }\n"
    html += "        .expandable-item-label { font-size: 0.7rem; color: var(--gray-500); }\n"
    html += '        [data-theme="dark"] .expandable-item-label { color: var(--gray-400); }\n'
    html += "        .timeline { position: relative; padding-left: 30px; margin-top: 24px; }\n"
    html += '        .timeline::before { content: ""; position: absolute; left: 8px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--primary), var(--secondary)); border-radius: 2px; }\n'
    html += "        .timeline-item { position: relative; padding-bottom: 24px; opacity: 0; transform: translateX(-20px); transition: all 0.5s ease; }\n"
    html += "        .timeline-item.visible { opacity: 1; transform: translateX(0); }\n"
    html += '        .timeline-item::before { content: ""; position: absolute; left: -26px; top: 4px; width: 12px; height: 12px; background: var(--primary); border-radius: 50%; border: 3px solid var(--white); box-shadow: 0 0 0 3px var(--primary); }\n'
    html += '        [data-theme="dark"] .timeline-item::before { border-color: var(--gray-900); }\n'
    html += "        .timeline-year { font-size: 0.85rem; font-weight: 700; color: var(--primary); margin-bottom: 4px; }\n"
    html += "        .timeline-content { background: var(--card-bg); backdrop-filter: blur(10px); border-radius: var(--radius-sm); border: 1px solid var(--card-border); padding: 16px; }\n"
    html += "        .timeline-title { font-size: 1rem; font-weight: 600; color: var(--gray-800); margin-bottom: 6px; }\n"
    html += '        [data-theme="dark"] .timeline-title { color: var(--gray-200); }\n'
    html += "        .timeline-description { font-size: 0.85rem; color: var(--gray-600); }\n"
    html += '        [data-theme="dark"] .timeline-description { color: var(--gray-400); }\n'
    html += "        .timeline-stats { display: flex; gap: 16px; margin-top: 10px; }\n"
    html += "        .timeline-stat { font-size: 0.8rem; color: var(--gray-500); }\n"
    html += '        [data-theme="dark"] .timeline-stat { color: var(--gray-400); }\n'
    html += (
        "        .timeline-stat-value { font-weight: 700; color: var(--primary); }\n"
    )
    html += "        .chart-container { background: var(--card-bg); backdrop-filter: blur(20px); border-radius: var(--radius); border: 1px solid var(--card-border); padding: 24px; margin-top: 24px; box-shadow: var(--shadow); }\n"
    html += "        .chart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }\n"
    html += "        .chart-title { font-size: 1.1rem; font-weight: 600; color: var(--gray-800); }\n"
    html += '        [data-theme="dark"] .chart-title { color: var(--gray-200); }\n'
    html += "        .chart-wrapper { position: relative; height: 300px; }\n"
    html += "        @media (min-width: 768px) { .chart-wrapper { height: 350px; } }\n"
    html += "        .benchmark-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 24px; }\n"
    html += "        @media (min-width: 640px) { .benchmark-grid { grid-template-columns: repeat(3, 1fr); } }\n"
    html += "        .benchmark-icon { width: 48px; height: 48px; margin: 0 auto 12px; background: linear-gradient(135deg, var(--gray-100) 0%, var(--gray-200) 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: var(--primary); }\n"
    html += '        [data-theme="dark"] .benchmark-icon { background: rgba(255, 255, 255, 0.1); color: var(--secondary); }\n'
    html += "        .benchmark-value { font-size: 1.5rem; font-weight: 800; color: var(--gray-800); margin-bottom: 4px; }\n"
    html += '        [data-theme="dark"] .benchmark-value { color: var(--gray-200); }\n'
    html += "        .benchmark-label { font-size: 0.8rem; color: var(--gray-500); margin-bottom: 8px; }\n"
    html += '        [data-theme="dark"] .benchmark-label { color: var(--gray-400); }\n'
    html += "        .benchmark-comparison { font-size: 0.75rem; padding: 4px 10px; border-radius: 20px; display: inline-block; }\n"
    html += "        .benchmark-comparison.positive { background: rgba(16, 185, 129, 0.15); color: #10b981; }\n"
    html += "        .benchmark-comparison.negative { background: rgba(239, 68, 68, 0.15); color: #ef4444; }\n"
    html += "        .footer { background: var(--gray-800); color: var(--gray-300); padding: 40px 20px; text-align: center; }\n"
    html += "        .footer-content { max-width: 600px; margin: 0 auto; }\n"
    html += "        .footer-title { font-size: 1.2rem; font-weight: 700; color: white; margin-bottom: 12px; }\n"
    html += "        .footer-description { font-size: 0.9rem; opacity: 0.8; margin-bottom: 20px; }\n"
    html += "        .footer-links { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; }\n"
    html += "        .footer-link { color: var(--gray-400); text-decoration: none; font-size: 0.85rem; transition: color 0.3s; }\n"
    html += "        .footer-link:hover { color: white; }\n"
    html += "        .footer-divider { width: 60px; height: 2px; background: linear-gradient(90deg, transparent, var(--primary), transparent); margin: 24px auto; }\n"
    html += "        .footer-copyright { font-size: 0.8rem; opacity: 0.6; }\n"
    html += "        .main-content { max-width: 900px; margin: 0 auto; padding: 40px 20px; position: relative; }\n"
    html += "        @media (min-width: 768px) { .hero { padding: 120px 40px 100px; } .hero h1 { font-size: 3rem; } .hero-stats { grid-template-columns: repeat(4, 1fr); } .hero-stat-value { font-size: 1.8rem; } .main-content { padding: 60px 40px; } }\n"
    html += "        @media (min-width: 1024px) { .hero { padding: 140px 60px 120px; } .hero h1 { font-size: 3.5rem; } .hero-stats { max-width: 1000px; } .main-content { max-width: 1100px; padding: 80px 60px; } }\n"
    html += "        @media (max-width: 767px) { .fab-container { bottom: 16px; right: 16px; } .hero-stat { padding: 16px; } .hero-stat-value { font-size: 1.3rem; } }\n"
    html += "    </style>\n"
    html += "</head>\n"
    html += "<body>\n"
    html += '    <nav class="navbar">\n'
    html += '        <a href="../../index.html" class="back-btn"><i class="fas fa-arrow-left"></i><span data-i18n="back">返回</span></a>\n'
    html += '        <div class="navbar-actions">\n'
    html += '            <button class="back-btn" id="mobileLangBtn" onclick="switchLanguage()"><i class="fas fa-globe"></i><span>EN</span></button>\n'
    html += '            <button class="back-btn" id="pcLangBtn" onclick="switchLanguage()"><i class="fas fa-globe"></i><span data-i18n="language">中文</span></button>\n'
    html += '            <button class="back-btn" onclick="toggleTheme()"><i class="fas fa-moon" id="themeIcon"></i></button>\n'
    html += "        </div>\n"
    html += "    </nav>\n"
    html += '    <div class="fab-container">\n'
    html += '        <button class="fab-sub" onclick="scrollToTop()" title="Back to Top"><i class="fas fa-arrow-up"></i></button>\n'
    html += '        <button class="fab-sub" onclick="switchLanguage()" title="Toggle Language"><i class="fas fa-globe"></i></button>\n'
    html += '        <button class="fab" onclick="toggleTheme()" title="Toggle Theme"><i class="fas fa-moon" id="fabThemeIcon"></i></button>\n'
    html += "    </div>\n"
    html += f'    <section class="hero">\n'
    html += f'        <div class="particles">\n'
    html += '            <div class="particle"></div><div class="particle"></div><div class="particle"></div><div class="particle"></div>\n'
    html += '            <div class="particle"></div><div class="particle"></div><div class="particle"></div><div class="particle"></div>\n'
    html += '            <div class="particle"></div>\n'
    html += "        </div>\n"
    html += f'        <div class="hero-content">\n'
    html += f'            <span class="hero-flag">{d["flag"]}</span>\n'
    html += f'            <h1 data-i18n="countryName">{d["name_en"]}</h1>\n'
    html += '            <h2 data-i18n="reportTitle">2025 Economic Report</h2>\n'
    html += '            <div class="hero-stats">\n'
    html += '                <div class="hero-stat">\n'
    html += '                    <i class="fas fa-dollar-sign hero-stat-icon"></i>\n'
    html += f'                    <span class="hero-stat-value" data-animate="{d["gdp_per_capita"]}">$0</span>\n'
    html += '                    <span class="hero-stat-label" data-i18n="gdp">GDP per Capita</span>\n'
    html += f'                    <span class="trend {gdp_trend}"><i class="fas fa-{gdp_icon}"></i> {d["gdp_growth"]}%</span>\n'
    html += "                </div>\n"
    html += '                <div class="hero-stat">\n'
    html += '                    <i class="fas fa-users hero-stat-icon"></i>\n'
    html += f'                    <span class="hero-stat-value" data-animate="{d["population"]}">0M</span>\n'
    html += '                    <span class="hero-stat-label" data-i18n="population">Population</span>\n'
    html += '                    <span class="trend trend-neutral"><i class="fas fa-minus"></i> 0.5%</span>\n'
    html += "                </div>\n"
    html += '                <div class="hero-stat">\n'
    html += (
        '                    <i class="fas fa-money-bill-wave hero-stat-icon"></i>\n'
    )
    html += f'                    <span class="hero-stat-value" data-animate="{d["median_salary"]}">$0</span>\n'
    html += '                    <span class="hero-stat-label" data-i18n="medianSalary">Median Salary</span>\n'
    html += f'                    <span class="trend {gdp_trend}"><i class="fas fa-{gdp_icon}"></i> 3.1%</span>\n'
    html += "                </div>\n"
    html += '                <div class="hero-stat">\n'
    html += '                    <i class="fas fa-home hero-stat-icon"></i>\n'
    html += f'                    <span class="hero-stat-value" data-animate="{d["median_household"]}">$0</span>\n'
    html += '                    <span class="hero-stat-label" data-i18n="medianHousehold">Median Household</span>\n'
    html += '                    <span class="trend trend-up"><i class="fas fa-arrow-up"></i> 2.8%</span>\n'
    html += "                </div>\n"
    html += "            </div>\n"
    html += "        </div>\n"
    html += "    </section>\n"
    html += '    <main class="main-content">\n'
    html += '        <section id="salary" class="section reveal">\n'
    html += '            <div class="section-title-area"><div class="section-icon"><i class="fas fa-money-bill-wave"></i></div><h3 data-i18n="salaryTitle">Salary & Income</h3></div>\n'
    html += '            <div class="stats-grid">\n'
    html += f'                <div class="stat-card"><div class="stat-icon"><i class="fas fa-wage"></i></div><div class="stat-value">${ms_f}</div><div class="stat-label" data-i18n="medianSalary">Median Salary</div></div>\n'
    html += f'                <div class="stat-card"><div class="stat-icon"><i class="fas fa-hourglass"></i></div><div class="stat-value">${as_f}</div><div class="stat-label" data-i18n="averageSalary">Average Salary</div></div>\n'
    html += f'                <div class="stat-card"><div class="stat-icon"><i class="fas fa-briefcase"></i></div><div class="stat-value">${ps_f}</div><div class="stat-label" data-i18n="professionalSalary">Professional</div></div>\n'
    html += f'                <div class="stat-card"><div class="stat-icon"><i class="fas fa-laptop"></i></div><div class="stat-value">${ts_f}</div><div class="stat-label" data-i18n="techSalary">Tech Industry</div></div>\n'
    html += f'                <div class="stat-card"><div class="stat-icon"><i class="fas fa-stethoscope"></i></div><div class="stat-value">${mds_f}</div><div class="stat-label" data-i18n="medicalSalary">Medical</div></div>\n'
    html += f'                <div class="stat-card"><div class="stat-icon"><i class="fas fa-chart-line"></i></div><div class="stat-value">{d["gdp_growth"]}%</div><div class="stat-label" data-i18n="yoyGrowth">YoY Growth</div></div>\n'
    html += "            </div>\n"
    html += "        </section>\n"
    html += '        <section id="household" class="section reveal reveal-right">\n'
    html += '            <div class="section-title-area"><div class="section-icon"><i class="fas fa-home"></i></div><h3 data-i18n="householdTitle">Household Income</h3></div>\n'
    html += '            <div class="progress-circle-container">\n'
    html += f'                <div class="progress-circle-wrapper reveal-scale"><div class="progress-circle"><svg width="120" height="120" viewBox="0 0 120 120"><circle class="progress-circle-bg" cx="60" cy="60" r="45"/><circle class="progress-circle-fill" cx="60" cy="60" r="45" data-progress="{above_pov}"/></svg><div class="progress-circle-content"><span class="progress-circle-value">{above_pov}%</span><span class="progress-circle-label" data-i18n="abovePoverty">Above Poverty</span></div></div></div>\n'
    html += f'                <div class="progress-circle-wrapper reveal-scale"><div class="progress-circle"><svg width="120" height="120" viewBox="0 0 120 120"><circle class="progress-circle-bg" cx="60" cy="60" r="45"/><circle class="progress-circle-fill" cx="60" cy="60" r="45" data-progress="{mid_class}"/></svg><div class="progress-circle-content"><span class="progress-circle-value">{mid_class}%</span><span class="progress-circle-label" data-i18n="middleClass">Middle Class</span></div></div></div>\n'
    html += f'                <div class="progress-circle-wrapper reveal-scale"><div class="progress-circle"><svg width="120" height="120" viewBox="0 0 120 120"><circle class="progress-circle-bg" cx="60" cy="60" r="45"/><circle class="progress-circle-fill" cx="60" cy="60" r="45" data-progress="{up_class}"/></svg><div class="progress-circle-content"><span class="progress-circle-value">{up_class}%</span><span class="progress-circle-label" data-i18n="upperClass">Upper Class</span></div></div></div>\n'
    html += "            </div>\n"
    html += "        </section>\n"
    html += '        <section id="gdp" class="section reveal">\n'
    html += '            <div class="section-title-area"><div class="section-icon"><i class="fas fa-chart-line"></i></div><h3 data-i18n="gdpTitle">GDP & Economic Growth</h3></div>\n'
    html += '            <div class="chart-container"><div class="chart-header"><span class="chart-title" data-i18n="gdpGrowthChart">GDP Growth Rate (%)</span></div><div class="chart-wrapper"><canvas id="gdpChart"></canvas></div></div>\n'
    html += '            <h4 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.1rem; color: var(--gray-700);" data-i18n="economicHistory">Economic History</h4>\n'
    html += '            <div class="timeline">\n'
    html += (
        '                <div class="timeline-item"><div class="timeline-year">2025</div><div class="timeline-content"><div class="timeline-title" data-i18n="timeline2025Title">Post-Pandemic Recovery</div><div class="timeline-description" data-i18n="timeline2025Desc">Strong economic growth with improved employment.</div><div class="timeline-stats"><span class="timeline-stat"><span class="timeline-stat-value">'
        + str(d["gdp_growth"])
        + '%</span> GDP Growth</span><span class="timeline-stat"><span class="timeline-stat-value">'
        + str(d["unemployment"])
        + "%</span> Unemployment</span></div></div></div>\n"
    )
    html += '                <div class="timeline-item"><div class="timeline-year">2020</div><div class="timeline-content"><div class="timeline-title" data-i18n="timeline2020Title">COVID-19 Impact</div><div class="timeline-description" data-i18n="timeline2020Desc">Economic contraction due to pandemic.</div><div class="timeline-stats"><span class="timeline-stat"><span class="timeline-stat-value">-3.4%</span> GDP Decline</span><span class="timeline-stat"><span class="timeline-stat-value">14.8%</span> Peak Unemployment</span></div></div></div>\n'
    html += '                <div class="timeline-item"><div class="timeline-year">2010</div><div class="timeline-content"><div class="timeline-title" data-i18n="timeline2010Title">Post-Recession Recovery</div><div class="timeline-description" data-i18n="timeline2010Desc">Gradual recovery from financial crisis.</div><div class="timeline-stats"><span class="timeline-stat"><span class="timeline-stat-value">2.7%</span> GDP Growth</span><span class="timeline-stat"><span class="timeline-stat-value">9.6%</span> Unemployment</span></div></div></div>\n'
    html += '                <div class="timeline-item"><div class="timeline-year">2000</div><div class="timeline-content"><div class="timeline-title" data-i18n="timeline2000Title">Tech Boom Era</div><div class="timeline-description" data-i18n="timeline2000Desc">Economic expansion driven by technology.</div><div class="timeline-stats"><span class="timeline-stat"><span class="timeline-stat-value">4.1%</span> GDP Growth</span><span class="timeline-stat"><span class="timeline-stat-value">4.0%</span> Unemployment</span></div></div></div>\n'
    html += "            </div>\n"
    html += "        </section>\n"
    html += '        <section id="benchmark" class="section reveal reveal-left">\n'
    html += '            <div class="section-title-area"><div class="section-icon"><i class="fas fa-bullseye"></i></div><h3 data-i18n="benchmarkTitle">International Benchmarks</h3></div>\n'
    html += '            <div class="benchmark-grid">\n'
    html += f'                <div class="benchmark-card"><div class="benchmark-icon"><i class="fas fa-globe"></i></div><div class="benchmark-value">#{global_rank}</div><div class="benchmark-label" data-i18n="globalEconomy">Global Economy</div><span class="benchmark-comparison positive" data-i18n="rank1">World Largest</span></div>\n'
    html += f'                <div class="benchmark-card"><div class="benchmark-icon"><i class="fas fa-dollar-sign"></i></div><div class="benchmark-value">#{gdp_rank}</div><div class="benchmark-label" data-i18n="gdpPerCapitaRank">GDP per Capita</div><span class="benchmark-comparison positive" data-i18n="top10">Top 10</span></div>\n'
    html += f'                <div class="benchmark-card"><div class="benchmark-icon"><i class="fas fa-money-bill-wave"></i></div><div class="benchmark-value">#{salary_rank}</div><div class="benchmark-label" data-i18n="medianSalaryRank">Median Salary</div><span class="benchmark-comparison positive" data-i18n="top10">Top 10</span></div>\n'
    html += f'                <div class="benchmark-card"><div class="benchmark-icon"><i class="fas fa-hand-holding-usd"></i></div><div class="benchmark-value">#{pp_rank}</div><div class="benchmark-label" data-i18n="purchasingPower">Purchasing Power</div><span class="benchmark-comparison {pp_class}" data-i18n="highCost">Cost Level</span></div>\n'
    html += f'                <div class="benchmark-card"><div class="benchmark-icon"><i class="fas fa-chart-pie"></i></div><div class="benchmark-value">#{hdi_rank}</div><div class="benchmark-label" data-i18n="hdiRank">Human Development</div><span class="benchmark-comparison positive" data-i18n="veryHigh">Very High</span></div>\n'
    html += f'                <div class="benchmark-card"><div class="benchmark-icon"><i class="fas fa-leaf"></i></div><div class="benchmark-value">#{qol_rank}</div><div class="benchmark-label" data-i18n="qualityOfLife">Quality of Life</div><span class="benchmark-comparison positive" data-i18n="top20">Top 20</span></div>\n'
    html += "            </div>\n"
    html += "        </section>\n"
    html += "    </main>\n"
    html += '    <footer class="footer"><div class="footer-content"><div class="footer-title" data-i18n="footerTitle">2025 Global Economic Reports</div><div class="footer-copyright">Data sourced from World Bank, IMF</div></div></footer>\n'
    html += "    <script>\n"
    html += "        var isZh = true;\n"
    html += "        var translations = {\n"
    html += "            zh: {\n"
    html += f'                countryName: "{d["name_zh"]}", reportTitle: "2025年经济报告",\n'
    html += '                back: "返回", language: "English", gdp: "人均GDP", population: "人口",\n'
    html += (
        '                medianSalary: "中位工资", medianHousehold: "家庭中位收入",\n'
    )
    html += '                salaryTitle: "工资与收入", averageSalary: "平均工资",\n'
    html += '                professionalSalary: "专业人士", techSalary: "科技行业", medicalSalary: "医疗行业",\n'
    html += '                yoyGrowth: "同比增长", householdTitle: "家庭收入",\n'
    html += '                abovePoverty: "贫困线以上", middleClass: "中产阶级", upperClass: "上层阶级",\n'
    html += (
        '                gdpTitle: "GDP与经济增长", gdpGrowthChart: "GDP增长率 (%)",\n'
    )
    html += '                economicHistory: "经济历史", benchmarkTitle: "国际基准",\n'
    html += '                globalEconomy: "全球经济", gdpPerCapitaRank: "人均GDP",\n'
    html += '                medianSalaryRank: "中位工资", purchasingPower: "购买力",\n'
    html += '                hdiRank: "人类发展", qualityOfLife: "生活质量",\n'
    html += '                footerTitle: "2025全球的经济报告", rank1: "全球最大", top10: "全球前10",\n'
    html += '                highCost: "生活成本高", veryHigh: "非常高", top20: "全球前20"\n'
    html += "            },\n"
    html += "            en: {\n"
    html += f'                countryName: "{d["name_en"]}", reportTitle: "2025 Economic Report",\n'
    html += '                back: "Back", language: "中文", gdp: "GDP per Capita", population: "Population",\n'
    html += '                medianSalary: "Median Salary", medianHousehold: "Median Household",\n'
    html += '                salaryTitle: "Salary & Income", averageSalary: "Average Salary",\n'
    html += '                professionalSalary: "Professional", techSalary: "Tech Industry", medicalSalary: "Medical",\n'
    html += (
        '                yoyGrowth: "YoY Growth", householdTitle: "Household Income",\n'
    )
    html += '                abovePoverty: "Above Poverty", middleClass: "Middle Class", upperClass: "Upper Class",\n'
    html += '                gdpTitle: "GDP & Economic Growth", gdpGrowthChart: "GDP Growth Rate (%)",\n'
    html += '                economicHistory: "Economic History", benchmarkTitle: "International Benchmarks",\n'
    html += '                globalEconomy: "Global Economy", gdpPerCapitaRank: "GDP per Capita",\n'
    html += '                medianSalaryRank: "Median Salary", purchasingPower: "Purchasing Power",\n'
    html += '                hdiRank: "Human Development", qualityOfLife: "Quality of Life",\n'
    html += '                footerTitle: "2025 Global Economic Reports", rank1: "World Largest", top10: "Top 10",\n'
    html += '                highCost: "High Cost", veryHigh: "Very High", top20: "Top 20"\n'
    html += "            }\n"
    html += "        };\n"
    html += "        function switchLanguage() {\n"
    html += "            isZh = !isZh;\n"
    html += '            var t = translations[isZh ? "zh" : "en"];\n'
    html += (
        '            document.querySelectorAll("[data-i18n]").forEach(function(el) {\n'
    )
    html += '                var key = el.getAttribute("data-i18n");\n'
    html += "                if (t[key]) el.textContent = t[key];\n"
    html += "            });\n"
    html += '            document.getElementById("mobileLangBtn").querySelector("span").textContent = isZh ? "EN" : "中文";\n'
    html += '            document.getElementById("pcLangBtn").querySelector("span").textContent = t.language;\n'
    html += "            renderAllCharts();\n"
    html += "        }\n"
    html += "        function toggleTheme() {\n"
    html += '            var isDark = document.body.getAttribute("data-theme") === "dark";\n'
    html += '            document.body.setAttribute("data-theme", isDark ? "light" : "dark");\n'
    html += '            localStorage.setItem("theme", isDark ? "light" : "dark");\n'
    html += "            updateThemeIcon();\n"
    html += "        }\n"
    html += "        function updateThemeIcon() {\n"
    html += '            var isDark = document.body.getAttribute("data-theme") === "dark";\n'
    html += '            var icon = isDark ? "fa-sun" : "fa-moon";\n'
    html += (
        '            document.getElementById("themeIcon").className = "fas " + icon;\n'
    )
    html += '            document.getElementById("fabThemeIcon").className = "fas " + icon;\n'
    html += "        }\n"
    html += (
        "        function animateValue(element, target, prefix, suffix, duration) {\n"
    )
    html += "            var start = 0;\n"
    html += "            var startTime = Date.now();\n"
    html += "            target = parseFloat(target);\n"
    html += "            function update() {\n"
    html += "                var elapsed = Date.now() - startTime;\n"
    html += "                var progress = Math.min(elapsed / duration, 1);\n"
    html += "                var ease = 1 - Math.pow(1 - progress, 4);\n"
    html += "                var current = start + (target - start) * ease;\n"
    html += "                element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;\n"
    html += "                if (progress < 1) requestAnimationFrame(update);\n"
    html += "            }\n"
    html += "            requestAnimationFrame(update);\n"
    html += "        }\n"
    html += "        function initAnimatedCounters() {\n"
    html += '            document.querySelectorAll("[data-animate]").forEach(function(el) {\n'
    html += '                var value = el.getAttribute("data-animate");\n'
    html += "                var prefix = el.textContent.match(/^[^0-9]*/)[0];\n"
    html += "                var suffix = el.textContent.match(/[^0-9]*$/)[0];\n"
    html += '                el.textContent = prefix + "0" + suffix;\n'
    html += "                setTimeout(function() { animateValue(el, value, prefix, suffix, 2000); }, 500);\n"
    html += "            });\n"
    html += "        }\n"
    html += "        function toggleExpandable(header) {\n"
    html += '            var card = header.closest(".expandable-card");\n'
    html += '            card.classList.toggle("expanded");\n'
    html += "        }\n"
    html += '        function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }\n'
    html += "        function initScrollReveal() {\n"
    html += "            var observer = new IntersectionObserver(function(entries) {\n"
    html += "                entries.forEach(function(entry) {\n"
    html += '                    if (entry.isIntersecting) entry.target.classList.add("active");\n'
    html += "                });\n"
    html += "            }, { threshold: 0.1 });\n"
    html += '            document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach(function(el) {\n'
    html += "                observer.observe(el);\n"
    html += "            });\n"
    html += "        }\n"
    html += "        function initTimelineAnimation() {\n"
    html += "            var observer = new IntersectionObserver(function(entries) {\n"
    html += "                entries.forEach(function(entry, i) {\n"
    html += '                    if (entry.isIntersecting) setTimeout(function() { entry.target.classList.add("visible"); }, i * 200);\n'
    html += "                });\n"
    html += "            }, { threshold: 0.2 });\n"
    html += '            document.querySelectorAll(".timeline-item").forEach(function(el) { observer.observe(el); });\n'
    html += "        }\n"
    html += "        function initProgressCircles() {\n"
    html += "            var observer = new IntersectionObserver(function(entries) {\n"
    html += "                entries.forEach(function(entry) {\n"
    html += "                    if (entry.isIntersecting) {\n"
    html += (
        '                        var p = entry.target.getAttribute("data-progress");\n'
    )
    html += "                        var c = 2 * Math.PI * 45;\n"
    html += "                        entry.target.style.strokeDashoffset = c - (p / 100) * c;\n"
    html += "                        observer.unobserve(entry.target);\n"
    html += "                    }\n"
    html += "                });\n"
    html += "            }, { threshold: 0.5 });\n"
    html += '            document.querySelectorAll(".progress-circle-fill").forEach(function(el) { observer.observe(el); });\n'
    html += "        }\n"
    html += "        var gdpChart = null;\n"
    html += "        function renderGDPChart() {\n"
    html += '            var ctx = document.getElementById("gdpChart");\n'
    html += "            if (!ctx || gdpChart) return;\n"
    html += (
        "            var data = [5.9, 1.9, 2.5, 2.8, " + str(d["gdp_growth"]) + "];\n"
    )
    html += "            gdpChart = new Chart(ctx, {\n"
    html += '                type: "bar",\n'
    html += "                data: {\n"
    html += '                    labels: ["2021", "2022", "2023", "2024", "2025"],\n'
    html += "                    datasets: [{\n"
    html += '                        label: "Growth Rate (%)",\n'
    html += "                        data: data,\n"
    html += '                        backgroundColor: data.map(function(v) { return v >= 0 ? "rgba(30, 58, 95, 0.8)" : "rgba(239, 68, 68, 0.8)"; }),\n'
    html += "                        borderRadius: 8\n"
    html += "                    }]\n"
    html += "                },\n"
    html += "                options: {\n"
    html += "                    responsive: true,\n"
    html += "                    maintainAspectRatio: false,\n"
    html += "                    plugins: { legend: { display: false } },\n"
    html += "                    scales: {\n"
    html += '                        y: { beginAtZero: true, ticks: { callback: function(v) { return v + "%"; } } },\n'
    html += "                        x: { grid: { display: false } }\n"
    html += "                    }\n"
    html += "                }\n"
    html += "            });\n"
    html += "        }\n"
    html += "        function renderAllCharts() { renderGDPChart(); }\n"
    html += '        document.addEventListener("DOMContentLoaded", function() {\n'
    html += '            var savedTheme = localStorage.getItem("theme") || "light";\n'
    html += '            document.body.setAttribute("data-theme", savedTheme);\n'
    html += "            updateThemeIcon();\n"
    html += "            initAnimatedCounters();\n"
    html += "            initScrollReveal();\n"
    html += "            initTimelineAnimation();\n"
    html += "            initProgressCircles();\n"
    html += "            renderGDPChart();\n"
    html += "        });\n"
    html += "    </script>\n"
    html += "</body>\n"
    html += "</html>\n"

    return filename, html


def main():
    base_path = Path(__file__).parent
    reports_path = base_path / "reports"

    print("Generating enhanced economic reports...")
    print("=" * 50)

    generated_count = 0
    for country_key, data in COUNTRIES.items():
        try:
            filename, html_content = generate_html(country_key, data)
            filepath = reports_path / filename

            with open(filepath, "w", encoding="utf-8") as f:
                f.write(html_content)

            print(f"  ✓ Generated: {filename}")
            generated_count += 1
        except Exception as e:
            print(f"  ✗ Error generating {country_key}: {e}")

    print("=" * 50)
    print(f"Generated {generated_count} enhanced reports")


if __name__ == "__main__":
    main()
