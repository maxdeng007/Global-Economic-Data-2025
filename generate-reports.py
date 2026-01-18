#!/usr/bin/env python3
import os
import re

# Currency data with USD conversion rates (approximate 2025)
CURRENCIES = {
    "USA": {"symbol": "$", "code": "USD", "name": "US Dollar", "to_usd": 1.0},
    "UK": {"symbol": "£", "code": "GBP", "name": "British Pound", "to_usd": 1.27},
    "Germany": {"symbol": "€", "code": "EUR", "name": "Euro", "to_usd": 1.09},
    "Japan": {"symbol": "¥", "code": "JPY", "name": "Japanese Yen", "to_usd": 0.0067},
    "China": {"symbol": "¥", "code": "CNY", "name": "Chinese Yuan", "to_usd": 0.14},
    "France": {"symbol": "€", "code": "EUR", "name": "Euro", "to_usd": 1.09},
    "India": {"symbol": "₹", "code": "INR", "name": "Indian Rupee", "to_usd": 0.012},
    "Russia": {"symbol": "₽", "code": "RUB", "name": "Russian Ruble", "to_usd": 0.011},
    "Brazil": {"symbol": "R$", "code": "BRL", "name": "Brazilian Real", "to_usd": 0.20},
    "South Korea": {
        "symbol": "₩",
        "code": "KRW",
        "name": "South Korean Won",
        "to_usd": 0.00072,
    },
    "Mexico": {"symbol": "$", "code": "MXN", "name": "Mexican Peso", "to_usd": 0.058},
    "Australia": {
        "symbol": "A$",
        "code": "AUD",
        "name": "Australian Dollar",
        "to_usd": 0.65,
    },
    "Canada": {
        "symbol": "C$",
        "code": "CAD",
        "name": "Canadian Dollar",
        "to_usd": 0.74,
    },
    "Switzerland": {
        "symbol": "CHF",
        "code": "CHF",
        "name": "Swiss Franc",
        "to_usd": 1.13,
    },
    "Singapore": {
        "symbol": "S$",
        "code": "SGD",
        "name": "Singapore Dollar",
        "to_usd": 0.75,
    },
    "Thailand": {"symbol": "฿", "code": "THB", "name": "Thai Baht", "to_usd": 0.029},
    "Vietnam": {
        "symbol": "₫",
        "code": "VND",
        "name": "Vietnamese Dong",
        "to_usd": 0.000041,
    },
    "Indonesia": {
        "symbol": "Rp",
        "code": "IDR",
        "name": "Indonesian Rupiah",
        "to_usd": 0.000063,
    },
    "Philippines": {
        "symbol": "₱",
        "code": "PHP",
        "name": "Philippine Peso",
        "to_usd": 0.018,
    },
    "Malaysia": {
        "symbol": "RM",
        "code": "MYR",
        "name": "Malaysian Ringgit",
        "to_usd": 0.21,
    },
    "Argentina": {
        "symbol": "ARS$",
        "code": "ARS",
        "name": "Argentine Peso",
        "to_usd": 0.0011,
    },
    "Ukraine": {
        "symbol": "₴",
        "code": "UAH",
        "name": "Ukrainian Hryvnia",
        "to_usd": 0.026,
    },
    "Israel": {"symbol": "₪", "code": "ILS", "name": "Israeli Shekel", "to_usd": 0.27},
    "Iraq": {"symbol": "IQD", "code": "IQD", "name": "Iraqi Dinar", "to_usd": 0.00076},
    "Netherlands": {"symbol": "€", "code": "EUR", "name": "Euro", "to_usd": 1.09},
    "Belgium": {"symbol": "€", "code": "EUR", "name": "Euro", "to_usd": 1.09},
    "Austria": {"symbol": "€", "code": "EUR", "name": "Euro", "to_usd": 1.09},
    "Portugal": {"symbol": "€", "code": "EUR", "name": "Euro", "to_usd": 1.09},
    "Spain": {"symbol": "€", "code": "EUR", "name": "Euro", "to_usd": 1.09},
    "Italy": {"symbol": "€", "code": "EUR", "name": "Euro", "to_usd": 1.09},
    "Finland": {"symbol": "€", "code": "EUR", "name": "Euro", "to_usd": 1.09},
    "Sweden": {"symbol": "kr", "code": "SEK", "name": "Swedish Krona", "to_usd": 0.092},
    "default": {"symbol": "$", "code": "USD", "name": "US Dollar", "to_usd": 1.0},
}

# Country colors for theming (flag-based colors)
COLORS = {
    # Americas
    "USA": {"primary": "#1e3a5f", "secondary": "#3d5a80", "accent": "#bf0a30"},
    "Canada": {"primary": "#d80621", "secondary": "#ffffff", "accent": "#ff0000"},
    "Mexico": {"primary": "#006847", "secondary": "#ce1126", "accent": "#f1bf00"},
    "Brazil": {"primary": "#009c3b", "secondary": "#ffdf00", "accent": "#002776"},
    "Argentina": {"primary": "#75aadb", "secondary": "#ffffff", "accent": "#3d8b40"},
    # Europe
    "UK": {"primary": "#00247d", "secondary": "#cf142b", "accent": "#ffffff"},
    "Germany": {"primary": "#000000", "secondary": "#dd0000", "accent": "#ffcc00"},
    "France": {"primary": "#0055a4", "secondary": "#ef4135", "accent": "#ffffff"},
    "Italy": {"primary": "#008c45", "secondary": "#ce2b37", "accent": "#ffffff"},
    "Spain": {"primary": "#aa151b", "secondary": "#f1bf00", "accent": "#ffffff"},
    "Netherlands": {"primary": "#ae1c28", "secondary": "#ffffff", "accent": "#21468b"},
    "Belgium": {"primary": "#ffce00", "secondary": "#ef3340", "accent": "#000000"},
    "Austria": {"primary": "#ed2939", "secondary": "#ffffff", "accent": "#000000"},
    "Switzerland": {"primary": "#ff0000", "secondary": "#ffffff", "accent": "#ffce00"},
    "Portugal": {"primary": "#006600", "secondary": "#ff0000", "accent": "#ffff00"},
    "Sweden": {"primary": "#006aa7", "secondary": "#fecc00", "accent": "#ffffff"},
    "Finland": {"primary": "#003580", "secondary": "#ffffff", "accent": "#d52b1e"},
    "Russia": {"primary": "#da291c", "secondary": "#0039a6", "accent": "#ffffff"},
    "Ukraine": {"primary": "#0057b7", "secondary": "#ffd700", "accent": "#ffffff"},
    # Asia
    "Japan": {"primary": "#bc002d", "secondary": "#ffffff", "accent": "#002884"},
    "China": {"primary": "#de2910", "secondary": "#ffde00", "accent": "#ffffff"},
    "India": {"primary": "#ff9933", "secondary": "#138808", "accent": "#000080"},
    "South Korea": {"primary": "#003478", "secondary": "#c60c30", "accent": "#ffffff"},
    "Singapore": {"primary": "#ee2536", "secondary": "#ffffff", "accent": "#000000"},
    "Thailand": {"primary": "#a51931", "secondary": "#ffffff", "accent": "#241d4f"},
    "Vietnam": {"primary": "#da251d", "secondary": "#ffff00", "accent": "#000000"},
    "Indonesia": {"primary": "#ff0000", "secondary": "#ffffff", "accent": "#000000"},
    "Philippines": {"primary": "#0038a8", "secondary": "#ce1126", "accent": "#ffffff"},
    "Malaysia": {"primary": "#cc0001", "secondary": "#ffff00", "accent": "#000080"},
    "Iraq": {"primary": "#ce1126", "secondary": "#007a3d", "accent": "#ffffff"},
    "Israel": {"primary": "#0038b8", "secondary": "#ffffff", "accent": "#000000"},
    # Oceania
    "Australia": {"primary": "#00008b", "secondary": "#d80621", "accent": "#ffffff"},
    # Default
    "default": {"primary": "#1e3a5f", "secondary": "#3d5a80", "accent": "#6b7280"},
}

# Country flag emojis
FLAG_EMOJIS = {
    "USA": "🇺🇸",
    "Canada": "🇨🇦",
    "Mexico": "🇲🇽",
    "Brazil": "🇧🇷",
    "Argentina": "🇦🇷",
    "UK": "🇬🇧",
    "Germany": "🇩🇪",
    "France": "🇫🇷",
    "Italy": "🇮🇹",
    "Spain": "🇪🇸",
    "Netherlands": "🇳🇱",
    "Belgium": "🇧🇪",
    "Austria": "🇦🇹",
    "Switzerland": "🇨🇭",
    "Portugal": "🇵🇹",
    "Sweden": "🇸🇪",
    "Finland": "🇫🇮",
    "Russia": "🇷🇺",
    "Ukraine": "🇺🇦",
    "Japan": "🇯🇵",
    "China": "🇨🇳",
    "India": "🇮🇳",
    "South Korea": "🇰🇷",
    "Singapore": "🇸🇬",
    "Thailand": "🇹🇭",
    "Vietnam": "🇻🇳",
    "Indonesia": "🇮🇩",
    "Philippines": "🇵🇭",
    "Malaysia": "🇲🇾",
    "Iraq": "🇮🇶",
    "Israel": "🇮🇱",
    "Australia": "🇦🇺",
}

# Regional groupings with benchmark averages
REGIONS = {
    "Americas": {
        "countries": ["USA", "Canada", "Mexico", "Brazil", "Argentina"],
        "avg_gini": 45.0,
        "avg_poverty": 10.5,
        "avg_unemployment": 6.0,
    },
    "Europe": {
        "countries": [
            "UK",
            "Germany",
            "France",
            "Italy",
            "Spain",
            "Netherlands",
            "Belgium",
            "Austria",
            "Switzerland",
            "Portugal",
            "Sweden",
            "Finland",
            "Russia",
            "Ukraine",
        ],
        "avg_gini": 31.0,
        "avg_poverty": 8.0,
        "avg_unemployment": 5.5,
    },
    "Asia": {
        "countries": [
            "Japan",
            "China",
            "India",
            "South Korea",
            "Singapore",
            "Thailand",
            "Vietnam",
            "Indonesia",
            "Philippines",
            "Malaysia",
            "Iraq",
            "Israel",
        ],
        "avg_gini": 38.0,
        "avg_poverty": 7.5,
        "avg_unemployment": 4.5,
    },
    "Oceania": {
        "countries": ["Australia"],
        "avg_gini": 33.0,
        "avg_poverty": 6.0,
        "avg_unemployment": 4.0,
    },
}

# Global averages for benchmark comparisons
GLOBAL_AVERAGES = {
    "gdp_trillion": 105,
    "gdp_per_capita": 13200,
    "median_salary_usd": 18000,
    "gini": 43.0,
    "poverty_rate": 9.0,
    "unemployment": 5.0,
}


def get_country_info(country_code):
    """Get country info including region and colors"""
    colors = COLORS.get(country_code, COLORS["default"])
    flag = FLAG_EMOJIS.get(country_code, "🌍")

    # Find region
    region = "Global"
    for reg_name, reg_data in REGIONS.items():
        if country_code in reg_data["countries"]:
            region = reg_name
            break

    return {
        "colors": colors,
        "flag": flag,
        "region": region,
    }


def get_region_averages(country_code):
    """Get regional benchmark averages for a country"""
    for reg_name, reg_data in REGIONS.items():
        if country_code in reg_data["countries"]:
            return reg_data
    return {
        "avg_gini": GLOBAL_AVERAGES["gini"],
        "avg_poverty": GLOBAL_AVERAGES["poverty_rate"],
        "avg_unemployment": GLOBAL_AVERAGES["unemployment"],
    }


def parse_country_name(filename):
    name = filename.replace(" around 2025.txt", "").replace(" around 2025.md", "")
    name = name.replace(" vers 2025.md", "").replace(" 2025 around.md", "")
    if name == "United States":
        return "USA"
    elif name == "United Kingdom":
        return "UK"
    elif name == "South Korea":
        return "South Korea"
    elif name == "China 2025":
        return "China"
    return name


def extract_number(value_str):
    """Extract numeric value from string like '$39,039' or '39,039'"""
    if not value_str:
        return None
    cleaned = re.sub(r"[$£€¥₹₩\s]", "", value_str)
    cleaned = cleaned.replace(",", "")
    try:
        return float(cleaned)
    except ValueError:
        return None


def convert_to_usd(value, currency):
    """Convert local currency value to USD"""
    if not value or not currency:
        return None
    rate = currency.get("to_usd", 1.0)
    num = extract_number(value)
    if num:
        return num * rate
    return None


def parse_source_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    country = parse_country_name(os.path.basename(filepath))
    currency = CURRENCIES.get(country, CURRENCIES["default"])

    # GDP - look for trillion/billion values
    gdp_nominal = None
    gdp_nominal_usd = None
    g = re.search(
        r"-\s*\*\*[^*]*\*\*.*?(£|\$|€|¥)\s*([\d,\.]+)\s*(trillion|billion)",
        content,
        re.IGNORECASE,
    )
    if g:
        gdp_nominal = f"{g.group(1)}{g.group(2)} {g.group(3)}"
        # Convert to USD
        multiplier = 1e12 if g.group(3).lower() == "trillion" else 1e9
        num_val = float(g.group(2).replace(",", ""))
        gdp_nominal_usd = num_val * multiplier * currency.get("to_usd", 1.0)

    if not gdp_nominal:
        g = re.search(
            r"(£|\$|€|¥)?\s*([\d,\.]+)\s*(trillion|billion)",
            content,
            re.IGNORECASE,
        )
        if g:
            prefix = g.group(1) or ""
            gdp_nominal = f"{prefix}{g.group(2)} {g.group(3)}"

    # GDP per capita
    gdp_per_capita = None
    gdp_per_capita_usd = None
    g = re.search(
        r"-\s*\*\*GDP per\s*.*?\*\*.*?:\s*\*\*([$£€¥]?\s*[\d,\.]+\s*(?:k|per person))",
        content,
        re.IGNORECASE,
    )
    if g:
        gdp_per_capita = g.group(1).strip()
        gdp_per_capita_usd = convert_to_usd(gdp_per_capita, currency)
    else:
        g = re.search(
            r"([$£€¥]?\s*[\d,\.]+)\s*per\s*person",
            content,
            re.IGNORECASE,
        )
        if g:
            gdp_per_capita = f"{g.group(1).strip()} per person"
            gdp_per_capita_usd = convert_to_usd(gdp_per_capita, currency)

    # Median annual salary
    median_salary_annual = None
    median_salary_weekly = None
    median_salary_hourly = None
    median_salary_usd = None

    g = re.search(
        r"-\s*\*\*.*median.*(?:annual|annual earnings).*?\*\*.*:\s*\*\*([$£€¥₹₩]?\s*[\d,\.]+)",
        content,
        re.IGNORECASE,
    )
    if g:
        median_salary_annual = g.group(1).strip()
        median_salary_usd = convert_to_usd(median_salary_annual, currency)
    else:
        g = re.search(
            r"-\s*\*\*.*median.*weekly.*?\*\*.*:\s*\*\*([$£€¥₹₩]?\s*[\d,\.]+)",
            content,
            re.IGNORECASE,
        )
        if g:
            median_salary_weekly = f"{g.group(1).strip()}/week"
            median_salary_usd = convert_to_usd(median_salary_weekly, currency)
            if median_salary_usd:
                median_salary_annual = median_salary_usd * 52

    # Hourly wage
    g = re.search(
        r"-\s*\*\*.*median.*hourly.*?\*\*.*:\s*\*\*([$£€¥₹₩]?\s*[\d,\.]+)",
        content,
        re.IGNORECASE,
    )
    if g:
        median_salary_hourly = f"{g.group(1).strip()}/hour"

    # Average salary
    avg_salary_annual = None
    avg_salary_weekly = None
    avg_salary_usd = None
    g = re.search(
        r"-\s*\*\*.*(?:average|mean).*(?:weekly|annual|salary|earnings).*?\*\*.*:\s*\*\*([$£€¥₹₩]?\s*[\d,\.]+)",
        content,
        re.IGNORECASE,
    )
    if g:
        avg_salary_str = g.group(1).strip()
        if "weekly" in g.group(0).lower():
            avg_salary_weekly = f"{avg_salary_str}/week"
            avg_salary_usd = convert_to_usd(avg_salary_weekly, currency)
            if avg_salary_usd:
                avg_salary_annual = avg_salary_usd * 52
        else:
            avg_salary_annual = avg_salary_str
            avg_salary_usd = convert_to_usd(avg_salary_annual, currency)

    # Public vs Private sector
    public_salary = None
    private_salary = None
    g = re.search(
        r"-\s*\*\*Public sector.*?\*\*.*:\s*\*\*([$£€¥₹₩]?\s*[\d,\.]+)",
        content,
        re.IGNORECASE,
    )
    if g:
        public_salary = g.group(1).strip()
    g = re.search(
        r"-\s*\*\*Private sector.*?\*\*.*:\s*\*\*([$£€¥₹₩]?\s*[\d,\.]+)",
        content,
        re.IGNORECASE,
    )
    if g:
        private_salary = g.group(1).strip()

    # Gini coefficient
    gini = None
    gini_value = None
    g = re.search(
        r"-\s*\*\*.*Gini.*?\*\*.*:\s*\*\*([\d,\.]+\s*%)",
        content,
        re.IGNORECASE,
    )
    if g:
        gini = g.group(1).strip()
        # Handle both decimal formats (30.0% and 30,0%)
        gini_clean = gini.replace("%", "").replace(",", ".")
        try:
            gini_value = float(gini_clean)
        except ValueError:
            pass

    # Poverty rate
    poverty_rate = None
    poverty_value = None
    g = re.search(
        r"[-–][\s–]*\*\*([\d,\.]+)\s*%\*\*",
        content,
        re.IGNORECASE,
    )
    if g:
        poverty_rate = f"{g.group(1)}%"
        poverty_value = float(g.group(1))
    else:
        g = re.search(
            r"(?:poverty|low income).*?([\d,\.]+)\s*%",
            content,
            re.IGNORECASE,
        )
        if g:
            poverty_rate = f"{g.group(1)}%"
            poverty_value = float(g.group(1))

    # Unemployment
    unemployment = None
    unemployment_value = None
    g = re.search(
        r"-\s*\*\*.*Unemployment.*?\*\*.*:\s*\*\*([\d,\.]+\s*%)",
        content,
        re.IGNORECASE,
    )
    if g:
        unemployment = g.group(1).strip()
        unemployment_value = float(unemployment.replace("%", ""))

    # Population
    population = None
    g = re.search(
        r"-\s*\*\*.*(?:population|residents).*?\*\*.*:\s*\*\*([\d,\.]+\s*(?:million|billion|people)?)",
        content,
        re.IGNORECASE,
    )
    if g:
        population = g.group(1).strip()

    # GDP growth rate
    gdp_growth = None
    g = re.search(
        r"-\s*\*\*.*GDP.*?growth.*?\*\*.*:\s*\*\*([\d,\.]+\s*%)",
        content,
        re.IGNORECASE,
    )
    if g:
        gdp_growth = g.group(1).strip()

    # PPP GDP - matches patterns like "$6.17 trillion PPP" or "$6,174.7 billion"
    gdp_ppp = None
    gdp_ppp_usd = None
    g = re.search(
        r"\$\s*([\d,\.]+)\s*(trillion|billion).*?PPP",
        content,
        re.IGNORECASE,
    )
    if g:
        ppp_val = float(g.group(1).replace(",", ""))
        multiplier = 1e12 if g.group(2).lower() == "trillion" else 1e9
        gdp_ppp_usd = ppp_val * multiplier
        gdp_ppp = f"${g.group(1)} {g.group(2)} PPP"
    # Alternative pattern
    if not gdp_ppp:
        g = re.search(
            r"-\s*\*\*PPP.*?GDP.*?\*\*.*?:\s*\*\*([$£€¥]?\s*[\d,\.]+\s*(?:trillion|billion))",
            content,
            re.IGNORECASE,
        )
        if g:
            gdp_ppp = g.group(1).strip()

    # Inflation rate
    inflation = None
    g = re.search(
        r"-\s*\*\*.*inflation.*?\*\*.*:\s*\*\*([\d,\.]+\s*%)",
        content,
        re.IGNORECASE,
    )
    if g:
        inflation = g.group(1).strip()

    # Gender pay gap
    gender_gap = None
    g = re.search(
        r"-\s*\*\*.*gender.*?gap.*?\*\*.*:\s*\*\*([\d,\.]+\s*%)",
        content,
        re.IGNORECASE,
    )
    if g:
        gender_gap = g.group(1).strip()
    # Alternative pattern for USA-style data: "80-81%" or "80–81%"
    if not gender_gap:
        g = re.search(
            r"women.*?median.*?(\d+\.?\d*)[-–](\d+)%.*?of men",
            content,
            re.IGNORECASE,
        )
        if g:
            gender_gap = f"{g.group(1)}–{g.group(2)}%"

    # Household disposable income
    household_income = None
    g = re.search(
        r"-\s*\*\*.*household.*?disposable.*?income.*?\*\*.*:\s*\*\*([$£€¥₹₩]?\s*[\d,\.]+)",
        content,
        re.IGNORECASE,
    )
    if g:
        household_income = g.group(1).strip() + "/year"

    # PPP per capita - matches patterns like "$73,400 PPP per person"
    gdp_ppp_per_capita = None
    g = re.search(
        r"\$([\d,\.]+)\s*PPP\s*per\s*person",
        content,
        re.IGNORECASE,
    )
    if g:
        gdp_ppp_per_capita = f"${g.group(1)} PPP/person"
    # Alternative pattern
    if not gdp_ppp_per_capita:
        g = re.search(
            r"-\s*\*\*PPP.*?per\s*capita.*?\*\*.*:\s*\*\*([$£€¥]?\s*[\d,\.]+\s*(?:k|PPP)?)",
            content,
            re.IGNORECASE,
        )
        if g:
            gdp_ppp_per_capita = g.group(1).strip()

    # Monthly salary breakdown
    monthly_salary = None
    g = re.search(
        r"-\s*\*\*.*monthly.*?salary.*?\*\*.*:\s*\*\*([$£€¥₹₩]?\s*[\d,\.]+)",
        content,
        re.IGNORECASE,
    )
    if g:
        monthly_salary = g.group(1).strip() + "/month"

    # References
    refs = []
    for m in re.finditer(r"\[(\d+)\]\s*(.+?)\s*<(.+?)>", content):
        refs.append(
            {"num": m.group(1), "title": m.group(2).strip(), "url": m.group(3).strip()}
        )

    return {
        "country": country,
        "currency": currency,
        "gdp_nominal": gdp_nominal,
        "gdp_nominal_usd": gdp_nominal_usd,
        "gdp_per_capita": gdp_per_capita,
        "gdp_per_capita_usd": gdp_per_capita_usd,
        "gdp_ppp": gdp_ppp,
        "gdp_ppp_usd": gdp_ppp_usd,
        "gdp_ppp_per_capita": gdp_ppp_per_capita,
        "median_salary_annual": median_salary_annual,
        "median_salary_weekly": median_salary_weekly,
        "median_salary_hourly": median_salary_hourly,
        "median_salary_usd": median_salary_usd,
        "avg_salary_annual": avg_salary_annual,
        "avg_salary_weekly": avg_salary_weekly,
        "avg_salary_usd": avg_salary_usd,
        "monthly_salary": monthly_salary,
        "public_salary": public_salary,
        "private_salary": private_salary,
        "gini": gini,
        "gini_value": gini_value,
        "poverty_rate": poverty_rate,
        "poverty_value": poverty_value,
        "unemployment": unemployment,
        "unemployment_value": unemployment_value,
        "population": population,
        "gdp_growth": gdp_growth,
        "inflation": inflation,
        "gender_gap": gender_gap,
        "household_income": household_income,
        "references": refs,
    }


def calculate_percentage(value, max_value, invert=False):
    """Calculate percentage for benchmark bar, with optional inversion (for Gini where lower is better)"""
    if value is None or max_value is None or max_value == 0:
        return 0
    pct = (value / max_value) * 100
    if invert:
        # For Gini, lower is better, so we show how much below average
        pct = 100 - ((value / max_value) * 100)
    return min(max(pct, 5), 100)  # Clamp between 5% and 100%


def format_currency_usd(value_usd):
    """Format USD value for display"""
    if value_usd is None:
        return None
    if value_usd >= 1e12:
        return f"${value_usd / 1e12:.2f}T"
    elif value_usd >= 1e9:
        return f"${value_usd / 1e9:.2f}B"
    elif value_usd >= 1e6:
        return f"${value_usd / 1e6:.2f}M"
    elif value_usd >= 1e3:
        return f"${value_usd / 1e3:.1f}k"
    else:
        return f"${value_usd:.0f}"


def main():
    sources_dir = "sources"
    reports_dir = "reports"

    if not os.path.exists(reports_dir):
        os.makedirs(reports_dir)

    print("Parsing source files and generating enhanced reports...\n")

    count = 0
    for filename in sorted(os.listdir(sources_dir)):
        if not filename.endswith((".txt", ".md")):
            continue

        filepath = os.path.join(sources_dir, filename)
        data = parse_source_file(filepath)

        c = data["country"]
        cur = data["currency"]

        # Get country-specific theming
        country_info = get_country_info(c)
        colors = country_info["colors"]
        flag_emoji = country_info["flag"]
        region = country_info["region"]

        # Get regional benchmarks
        region_avgs = get_region_averages(c)

        # Chinese name mapping
        zh_names = {
            "USA": "美国",
            "UK": "英国",
            "Japan": "日本",
            "Germany": "德国",
            "China": "中国",
            "France": "法国",
            "India": "印度",
            "Russia": "俄罗斯",
            "Brazil": "巴西",
            "South Korea": "韩国",
            "Mexico": "墨西哥",
            "Australia": "澳大利亚",
            "Canada": "加拿大",
            "Switzerland": "瑞士",
            "Singapore": "新加坡",
            "Thailand": "泰国",
            "Vietnam": "越南",
            "Indonesia": "印尼",
            "Philippines": "菲律宾",
            "Malaysia": "马来西亚",
            "Argentina": "阿根廷",
            "Ukraine": "乌克兰",
            "Israel": "以色列",
            "Iraq": "伊拉克",
            "Netherlands": "荷兰",
            "Belgium": "比利时",
            "Austria": "奥地利",
            "Portugal": "葡萄牙",
            "Spain": "西班牙",
            "Italy": "意大利",
            "Finland": "芬兰",
            "Sweden": "瑞典",
        }
        zh_name = zh_names.get(c, c)

        # Prepare data for charts and benchmarks
        gdp_label = data.get("gdp_nominal") or "N/A"
        gdp_usd_display = (
            format_currency_usd(data.get("gdp_nominal_usd"))
            if data.get("gdp_nominal_usd")
            else "N/A"
        )
        gdp_pc_label = data.get("gdp_per_capita") or "N/A"
        gdp_pc_usd_display = (
            format_currency_usd(data.get("gdp_per_capita_usd"))
            if data.get("gdp_per_capita_usd")
            else "N/A"
        )

        median_salary = (
            data.get("median_salary_annual")
            or data.get("median_salary_weekly")
            or "N/A"
        )
        median_salary_usd = data.get("median_salary_usd")
        median_salary_usd_display = (
            format_currency_usd(median_salary_usd) if median_salary_usd else "N/A"
        )

        avg_salary = (
            data.get("avg_salary_annual") or data.get("avg_salary_weekly") or "N/A"
        )
        avg_salary_usd = data.get("avg_salary_usd")
        avg_salary_usd_display = (
            format_currency_usd(avg_salary_usd) if avg_salary_usd else "N/A"
        )

        gini_label = data.get("gini") or "N/A"
        gini_value = data.get("gini_value", 0)

        poverty_label = data.get("poverty_rate") or "N/A"
        poverty_value = data.get("poverty_value", 0)

        unemp_label = data.get("unemployment") or "N/A"
        unemp_value = data.get("unemployment_value", 0)

        pop_label = data.get("population") or "N/A"

        hourly_label = data.get("median_salary_hourly") or "N/A"
        public_label = data.get("public_salary") or "N/A"
        private_label = data.get("private_salary") or "N/A"
        growth_label = data.get("gdp_growth") or "N/A"

        # New enhanced data fields
        ppp_label = data.get("gdp_ppp") or "N/A"
        ppp_usd_display = (
            format_currency_usd(data.get("gdp_ppp_usd"))
            if data.get("gdp_ppp_usd")
            else "N/A"
        )
        ppp_per_capita_label = data.get("gdp_ppp_per_capita") or "N/A"
        inflation_label = data.get("inflation") or "N/A"
        gender_gap_label = data.get("gender_gap") or "N/A"
        household_income_label = data.get("household_income") or "N/A"
        monthly_salary_label = data.get("monthly_salary") or "N/A"

        cur_code = cur.get("code", "USD")
        cur_name = cur.get("name", "US Dollar")

        # Calculate benchmark percentages (using regional averages)
        gdp_pct = calculate_percentage(
            data.get("gdp_nominal_usd"), GLOBAL_AVERAGES["gdp_trillion"] * 1e12
        )
        gdp_pc_pct = calculate_percentage(
            data.get("gdp_per_capita_usd"), GLOBAL_AVERAGES["gdp_per_capita"]
        )
        salary_pct = calculate_percentage(
            median_salary_usd, GLOBAL_AVERAGES["median_salary_usd"]
        )
        # Use regional averages for social indicators
        gini_pct = calculate_percentage(
            gini_value, region_avgs["avg_gini"], invert=True
        )
        poverty_pct = calculate_percentage(
            poverty_value, region_avgs["avg_poverty"], invert=True
        )
        unemp_pct = calculate_percentage(
            unemp_value, region_avgs["avg_unemployment"], invert=True
        )

        # References HTML
        refs_html = ""
        if data["references"]:
            refs_html = """
    <section class="section" id="sources">
        <div class="section-title-area">
            <i class="fas fa-bookmark"></i>
            <h3 data-i18n="sourcesTitle">Data Sources</h3>
        </div>
        <div class="sources-list">
"""
            for ref in data["references"]:
                refs_html += f'''
            <div class="source-item">
                <span class="source-num">[{ref["num"]}]</span>
                <a href="{ref["url"]}" target="_blank" rel="noopener">{ref["title"]}</a>
            </div>
'''
            refs_html += """        </div>
    </section>
"""

        # Chart data in JSON format for bilingual support
        chart_labels = """{
            zh: ["名义GDP", "人均GDP", "中位数工资", "基尼系数", "贫困率"],
            en: ["Nominal GDP", "GDP per Capita", "Median Wage", "Gini Index", "Poverty Rate"]
        }"""

        chart_values = f"""[
            {data.get("gdp_nominal_usd", 0) or 0},
            {data.get("gdp_per_capita_usd", 0) or 0},
            {median_salary_usd or 0},
            {gini_value or 0},
            {poverty_value or 0}
        ]"""

        global_values = f"""[
            {GLOBAL_AVERAGES["gdp_trillion"] * 1e12},
            {GLOBAL_AVERAGES["gdp_per_capita"]},
            {GLOBAL_AVERAGES["median_salary_usd"]},
            {GLOBAL_AVERAGES["gini"]},
            {GLOBAL_AVERAGES["poverty_rate"]}
        ]"""

        html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>{c} 2025 Economic Report</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {{
            --primary: {colors["primary"]};
            --secondary: {colors["secondary"]};
            --accent: {colors.get("accent", colors["primary"])};
            --white: #ffffff;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-300: #d1d5db;
            --gray-500: #6b7280;
            --gray-800: #1f2937;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
        }}

        * {{ margin: 0; padding: 0; box-sizing: border-box; }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--gray-100);
            color: var(--gray-800);
            line-height: 1.6;
        }}

        /* Navbar */
        .navbar {{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            z-index: 1000;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }}

        .navbar-actions {{ display: flex; align-items: center; gap: 12px; }}

        .back-btn {{
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            background: rgba(0, 0, 0, 0.06);
            color: var(--gray-800);
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
        }}

        .back-btn:hover {{ background: rgba(0, 0, 0, 0.1); transform: translateX(-2px); }}

        .lang-btn {{
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            background: var(--gray-800);
            color: var(--white);
            border: none;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
        }}

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
        }}

        .hamburger span {{
            width: 22px;
            height: 2px;
            background: var(--gray-800);
            border-radius: 2px;
        }}

        .pc-nav {{ display: none; align-items: center; gap: 24px; }}

        .pc-nav-link {{
            color: var(--gray-800);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
        }}

        .pc-lang-btn {{
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            background: var(--primary);
            color: var(--white);
            border: none;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
        }}

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
            color: var(--gray-800);
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            border-radius: 8px;
        }}

        .mobile-link:hover {{ background: var(--gray-100); }}

        /* Hero Section */
        .hero {{
            padding: 100px 20px 60px;
            text-align: center;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: var(--white);
        }}

        .hero-flag {{ font-size: 4rem; display: block; margin-bottom: 16px; }}

        .hero h1 {{ font-size: 1.8rem; font-weight: 700; margin-bottom: 8px; }}

        .hero h2 {{ font-size: 1rem; opacity: 0.9; margin-bottom: 24px; }}

        .hero-region {{
            display: inline-block;
            padding: 4px 12px;
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
            font-size: 0.75rem;
            margin-bottom: 16px;
            backdrop-filter: blur(4px);
        }}

        .hero-stats {{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            max-width: 700px;
            margin: 0 auto;
        }}

        .hero-stat {{
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(10px);
            padding: 16px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.2);
        }}

        .hero-stat-value {{ font-size: 1.4rem; font-weight: 700; display: block; }}

        .hero-stat-label {{ font-size: 0.75rem; opacity: 0.85; }}

        .hero-stat-usd {{ font-size: 0.7rem; opacity: 0.8; margin-top: 4px; }}

        /* Sections */
        .section {{
            padding: 48px 20px;
            max-width: 1000px;
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

        .section-title-area i {{ font-size: 1.3rem; color: var(--primary); }}

        .section-title-area h3 {{ font-size: 1.2rem; font-weight: 600; }}

        /* Stats Grid */
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

        .stat-card-label {{ font-size: 0.8rem; color: var(--gray-500); margin-bottom: 4px; }}

        .stat-card-value {{ font-size: 1.5rem; font-weight: 700; }}

        .stat-card-note {{ font-size: 0.75rem; color: var(--gray-500); margin-top: 4px; }}

        .stat-card-usd {{ font-size: 0.7rem; color: var(--success); margin-top: 4px; }}

        /* Charts */
        .chart-wrapper {{
            background: var(--white);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }}

        .chart-title {{
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: var(--gray-800);
        }}

        .chart-container {{ position: relative; height: 300px; }}

        .chart-row {{
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
        }}

        @media (min-width: 768px) {{
            .chart-row {{ grid-template-columns: repeat(2, 1fr); }}
        }}

        /* Benchmark Bars */
        .benchmark-list {{ display: flex; flex-direction: column; gap: 16px; }}

        .benchmark-item {{
            background: var(--white);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }}

        .benchmark-header {{
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 12px;
        }}

        .benchmark-label {{ font-weight: 600; font-size: 0.95rem; }}

        .benchmark-values {{ display: flex; gap: 12px; align-items: baseline; }}

        .benchmark-value {{ font-weight: 700; color: var(--primary); }}

        .benchmark-avg {{ font-size: 0.8rem; color: var(--gray-500); }}

        .benchmark-bar-container {{
            position: relative;
            height: 24px;
            background: var(--gray-200);
            border-radius: 12px;
            overflow: hidden;
        }}

        .benchmark-bar {{
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            border-radius: 12px;
            transition: width 0.5s ease;
        }}

        .benchmark-marker {{
            position: absolute;
            top: 0;
            bottom: 0;
            width: 3px;
            background: var(--gray-800);
            opacity: 0.5;
        }}

        .benchmark-legend {{
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            font-size: 0.75rem;
            color: var(--gray-500);
        }}

        /* Comparison Table */
        .comparison-table {{
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }}

        .comparison-table th, .comparison-table td {{
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--gray-200);
        }}

        .comparison-table th {{ background: var(--gray-100); font-weight: 600; }}

        .comparison-table tr:hover {{ background: var(--gray-50); }}

        .comparison-badge {{
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
        }}

        .badge-good {{ background: #d1fae5; color: #065f46; }}
        .badge-warning {{ background: #fef3c7; color: #92400e; }}
        .badge-danger {{ background: #fee2e2; color: #991b1b; }}

        /* Sources */
        .sources-list {{ display: flex; flex-direction: column; gap: 12px; }}

        .source-item {{
            background: var(--white);
            border-radius: 8px;
            padding: 14px 16px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }}

        .source-num {{ font-weight: 600; color: var(--primary); margin-right: 8px; }}

        .source-item a {{ color: var(--gray-800); text-decoration: none; }}

        /* Footer */
        footer {{
            background: var(--gray-800);
            color: var(--gray-500);
            padding: 32px 20px;
            text-align: center;
        }}

        @media (min-width: 768px) {{
            .hero {{ padding: 120px 40px 80px; }}
            .hero h1 {{ font-size: 2.4rem; }}
            .hero-stats {{ grid-template-columns: repeat(4, 1fr); }}
            .section {{ padding: 64px 40px; }}
            .stats-grid {{ grid-template-columns: repeat(4, 1fr); }}
            .hamburger {{ display: none; }}
            .pc-nav {{ display: flex; }}
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
            <a href="#benchmarks" class="pc-nav-link" data-i18n="navBenchmarks">Benchmarks</a>
            <button class="pc-lang-btn" id="pcLangBtn">
                <i class="fas fa-globe"></i>
                <span data-i18n="langBtn">中文</span>
            </button>
        </div>
    </nav>

    <div class="mobile-overlay" id="mobileOverlay"></div>
    <div class="mobile-panel" id="mobilePanel">
        <a href="#salary" class="mobile-link" data-i18n="navSalary">薪资水平</a>
        <a href="#income" class="mobile-link" data-i18n="navIncome">家庭收入</a>
        <a href="#gdp" class="mobile-link" data-i18n="navGdp">GDP</a>
        <a href="#benchmarks" class="mobile-link" data-i18n="navBenchmarks">全球对比</a>
    </div>

    <!-- Hero Section -->
    <section class="hero">
        <span class="hero-flag">{flag_emoji}</span>
        <h1 data-i18n="heroTitle">{zh_name} 2025 经济概览</h1>
        <h2 data-i18n="heroSubtitle">关键经济指标与收入统计</h2>
        <div class="hero-region">{region}</div>

        <div class="hero-stats">
            <div class="hero-stat">
                <span class="hero-stat-value" data-i18n="statGdp">{gdp_label}</span>
                <span class="hero-stat-label" data-i18n="statGdpLabel">Nominal GDP</span>
                <span class="hero-stat-usd">{gdp_usd_display}</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-value" data-i18n="statGdpCapita">{gdp_pc_label}</span>
                <span class="hero-stat-label" data-i18n="statGdpCapitaLabel">GDP per Person</span>
                <span class="hero-stat-usd">{gdp_pc_usd_display}</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-value" data-i18n="statWage">{median_salary}</span>
                <span class="hero-stat-label" data-i18n="statWageLabel">Median Wage</span>
                <span class="hero-stat-usd">{median_salary_usd_display}</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-value" data-i18n="statGini">{gini_label}</span>
                <span class="hero-stat-label" data-i18n="statGiniLabel">Gini Index</span>
            </div>
        </div>
    </section>

    <!-- Salary Section -->
    <section class="section" id="salary">
        <div class="section-title-area">
            <i class="fas fa-money-bill-wave"></i>
            <h3 data-i18n="salaryTitle">薪资水平</h3>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="salaryMinLabel">中位数工资 (年薪)</div>
                <div class="stat-card-value">{median_salary}</div>
                <div class="stat-card-usd">{median_salary_usd_display}</div>
                <div class="stat-card-note">全职, 税前</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label" data-i18n="salaryMedianLabel">平均工资</div>
                <div class="stat-card-value">{avg_salary}</div>
                <div class="stat-card-usd">{avg_salary_usd_display}</div>
                <div class="stat-card-note">所有员工</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">月薪中位数</div>
                <div class="stat-card-value">{monthly_salary_label}</div>
                <div class="stat-card-note">税前</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">时薪中位数</div>
                <div class="stat-card-value">{hourly_label}</div>
                <div class="stat-card-note">全职, 不含加班</div>
            </div>
        </div>

        <!-- Sector Comparison -->
        <div class="chart-wrapper">
            <h4 class="chart-title" data-i18n="sectorComparison">行业对比</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-label">公共部门</div>
                    <div class="stat-card-value">{public_label}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-label">私营部门</div>
                    <div class="stat-card-value">{private_label}</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Household Income Section -->
    <section class="section" id="income">
        <div class="section-title-area">
            <i class="fas fa-home"></i>
            <h3 data-i18n="incomeTitle">家庭收入与不平等</h3>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-label">基尼系数</div>
                <div class="stat-card-value">{gini_label}</div>
                <div class="stat-card-note">越低越平等</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">贫困率</div>
                <div class="stat-card-value">{poverty_label}</div>
                <div class="stat-card-note">相对贫困线</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">失业率</div>
                <div class="stat-card-value">{unemp_label}</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">人口</div>
                <div class="stat-card-value">{pop_label}</div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="chart-row">
            <div class="chart-wrapper">
                <h4 class="chart-title" data-i18n="chartGiniTitle">基尼系数对比</h4>
                <div class="chart-container">
                    <canvas id="giniChart"></canvas>
                </div>
            </div>
            <div class="chart-wrapper">
                <h4 class="chart-title" data-i18n="chartPovertyTitle">贫困率对比</h4>
                <div class="chart-container">
                    <canvas id="povertyChart"></canvas>
                </div>
            </div>
        </div>
    </section>

    <!-- GDP Section -->
    <section class="section" id="gdp">
        <div class="section-title-area">
            <i class="fas fa-chart-line"></i>
            <h3 data-i18n="gdpTitle">GDP与经济增长</h3>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-label">名义GDP</div>
                <div class="stat-card-value">{gdp_label}</div>
                <div class="stat-card-usd">{gdp_usd_display}</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">人均GDP</div>
                <div class="stat-card-value">{gdp_pc_label}</div>
                <div class="stat-card-usd">{gdp_pc_usd_display}</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">GDP增长率</div>
                <div class="stat-card-value">{growth_label}</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">PPP GDP</div>
                <div class="stat-card-value">{ppp_usd_display}</div>
                <div class="stat-card-note">{ppp_label}</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">通胀率</div>
                <div class="stat-card-value">{inflation_label}</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">数据年份</div>
                <div class="stat-card-value">2025</div>
            </div>
        </div>

        <!-- Enhanced GDP Section -->
        <div class="chart-row">
            <div class="chart-wrapper">
                <h4 class="chart-title" data-i18n="chartGdpTitle">GDP规模对比 (十亿美元)</h4>
                <div class="chart-container">
                    <canvas id="gdpChart"></canvas>
                </div>
            </div>
            <div class="chart-wrapper">
                <h4 class="chart-title" data-i18n="pppTitle">购买力平价 (PPP)</h4>
                <div class="stats-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="stat-card">
                        <div class="stat-card-label">PPP GDP</div>
                        <div class="stat-card-value">{ppp_usd_display}</div>
                        <div class="stat-card-note">{ppp_label}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-label">人均PPP</div>
                        <div class="stat-card-value">{ppp_per_capita_label}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-label">家庭可支配收入</div>
                        <div class="stat-card-value">{household_income_label}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-label">性别薪酬差距</div>
                        <div class="stat-card-value">{gender_gap_label}</div>
                        <div class="stat-card-note">女性vs男性</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Global Benchmarks Section -->
    <section class="section" id="benchmarks">
        <div class="section-title-area">
            <i class="fas fa-globe"></i>
            <h3 data-i18n="benchmarksTitle">全球对比</h3>
        </div>

        <div class="benchmark-list">
            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchGdp">名义GDP</span>
                    <div class="benchmark-values">
                        <span class="benchmark-value">{gdp_usd_display}</span>
                        <span class="benchmark-avg">vs 全球平均</span>
                    </div>
                </div>
                <div class="benchmark-bar-container">
                    <div class="benchmark-bar" style="width: {gdp_pct}%;"></div>
                </div>
                <div class="benchmark-legend">
                    <span>0</span>
                    <span>全球平均: $105T</span>
                </div>
            </div>

            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchGdpCapita">人均GDP</span>
                    <div class="benchmark-values">
                        <span class="benchmark-value">{gdp_pc_usd_display}</span>
                        <span class="benchmark-avg">vs 全球平均 $13.2k</span>
                    </div>
                </div>
                <div class="benchmark-bar-container">
                    <div class="benchmark-bar" style="width: {gdp_pc_pct}%;"></div>
                </div>
                <div class="benchmark-legend">
                    <span>0</span>
                    <span>全球平均: $13,200</span>
                </div>
            </div>

            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchSalary">中位数工资</span>
                    <div class="benchmark-values">
                        <span class="benchmark-value">{median_salary_usd_display}</span>
                        <span class="benchmark-avg">vs 全球平均 $18k</span>
                    </div>
                </div>
                <div class="benchmark-bar-container">
                    <div class="benchmark-bar" style="width: {salary_pct}%;"></div>
                </div>
                <div class="benchmark-legend">
                    <span>0</span>
                    <span>全球平均: $18,000</span>
                </div>
            </div>

            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchGini">基尼系数 (越低越好)</span>
                    <div class="benchmark-values">
                        <span class="benchmark-value">{gini_label}</span>
                        <span class="benchmark-avg">vs {region}平均 {region_avgs["avg_gini"]:.1f}%</span>
                    </div>
                </div>
                <div class="benchmark-bar-container">
                    <div class="benchmark-bar" style="width: {gini_pct}%;"></div>
                </div>
                <div class="benchmark-legend">
                    <span>低=平等</span>
                    <span>{region}平均: {region_avgs["avg_gini"]:.1f}%</span>
                </div>
            </div>

            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchPoverty">贫困率 (越低越好)</span>
                    <div class="benchmark-values">
                        <span class="benchmark-value">{poverty_label}</span>
                        <span class="benchmark-avg">vs {region}平均 {region_avgs["avg_poverty"]:.1f}%</span>
                    </div>
                </div>
                <div class="benchmark-bar-container">
                    <div class="benchmark-bar" style="width: {poverty_pct}%;"></div>
                </div>
                <div class="benchmark-legend">
                    <span>低=贫困少</span>
                    <span>{region}平均: {region_avgs["avg_poverty"]:.1f}%</span>
                </div>
            </div>

            <div class="benchmark-item">
                <div class="benchmark-header">
                    <span class="benchmark-label" data-i18n="benchUnemployment">失业率 (越低越好)</span>
                    <div class="benchmark-values">
                        <span class="benchmark-value">{unemp_label}</span>
                        <span class="benchmark-avg">vs {region}平均 {region_avgs["avg_unemployment"]:.1f}%</span>
                    </div>
                </div>
                <div class="benchmark-bar-container">
                    <div class="benchmark-bar" style="width: {unemp_pct}%;"></div>
                </div>
                <div class="benchmark-legend">
                    <span>低=就业好</span>
                    <span>{region}平均: {region_avgs["avg_unemployment"]:.1f}%</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Data Sources -->
    {refs_html}

    <footer>
        <p data-i18n="footerText">经济数据来源于世界银行、IMF和国家统计局。</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
    <script>
        var isZh = true;

        var translations = {{
            zh: {{
                backBtn: "返回",
                navSalary: "薪资水平",
                navIncome: "家庭收入",
                navGdp: "GDP",
                navBenchmarks: "全球对比",
                sourcesTitle: "数据来源",
                heroTitle: "{zh_name} 2025 经济概览",
                heroSubtitle: "关键经济指标与收入统计",
                statGdpLabel: "名义GDP",
                statGdpCapitaLabel: "人均GDP",
                statWageLabel: "中位数工资",
                statGiniLabel: "基尼系数",
                salaryTitle: "薪资水平",
                salaryMinLabel: "中位数工资 (年薪)",
                salaryMedianLabel: "平均工资",
                incomeTitle: "家庭收入分布",
                gdpTitle: "GDP与经济增长",
                benchmarksTitle: "全球对比",
                sectorComparison: "行业对比",
                footerText: "经济数据来源于世界银行、IMF和国家统计局。",
                benchGdp: "名义GDP",
                benchGdpCapita: "人均GDP",
                benchSalary: "中位数工资",
                benchGini: "基尼系数",
                benchPoverty: "贫困率",
                benchUnemployment: "失业率",
                chartGiniTitle: "基尼系数对比",
                chartPovertyTitle: "贫困率对比",
                chartGdpTitle: "GDP规模对比 (十亿美元)",
                pppTitle: "购买力平价 (PPP)",
                inflationLabel: "通胀率",
                genderGapLabel: "性别薪酬差距",
                householdIncomeLabel: "家庭可支配收入",
                langBtn: "EN"
            }},
            en: {{
                backBtn: "Back",
                navSalary: "Salary Levels",
                navIncome: "Household Income",
                navGdp: "GDP",
                navBenchmarks: "Benchmarks",
                sourcesTitle: "Data Sources",
                heroTitle: "{c} 2025 Economic Overview",
                heroSubtitle: "Key Economic Indicators & Income Statistics",
                statGdpLabel: "Nominal GDP",
                statGdpCapitaLabel: "GDP per Person",
                statWageLabel: "Median Wage",
                statGiniLabel: "Gini Index",
                salaryTitle: "Salary Levels",
                salaryMinLabel: "Median Salary (Annual)",
                salaryMedianLabel: "Average Salary",
                incomeTitle: "Household Income Distribution",
                gdpTitle: "GDP & Economic Growth",
                benchmarksTitle: "Global Benchmarks",
                sectorComparison: "Sector Comparison",
                footerText: "Economic data sourced from World Bank, IMF, and national statistics agencies.",
                benchGdp: "Nominal GDP",
                benchGdpCapita: "GDP per Capita",
                benchSalary: "Median Salary",
                benchGini: "Gini Index",
                benchPoverty: "Poverty Rate",
                benchUnemployment: "Unemployment Rate",
                chartGiniTitle: "Gini Index Comparison",
                chartPovertyTitle: "Poverty Rate Comparison",
                chartGdpTitle: "GDP Comparison (Billions USD)",
                pppTitle: "Purchasing Power Parity (PPP)",
                inflationLabel: "Inflation Rate",
                genderGapLabel: "Gender Pay Gap",
                householdIncomeLabel: "Household Disposable Income",
                langBtn: "中文"
            }}
        }};

        var chartLabels = {chart_labels};
        var countryValues = {chart_values};
        var globalValues = {global_values};

        var chartColors = {{
            primary: '{colors["primary"]}',
            secondary: '{colors["secondary"]}',
            global: '#6b7280'
        }};

        function switchLanguage() {{
            isZh = !isZh;
            localStorage.setItem("preferredLanguage", isZh ? "zh" : "en");
            document.documentElement.lang = isZh ? "zh-CN" : "en";
            updateContent();
            renderCharts();
        }}

        function updateContent() {{
            document.querySelectorAll("[data-i18n]").forEach(function(el) {{
                var key = el.getAttribute("data-i18n");
                if (translations[isZh ? "zh" : "en"][key]) {{
                    el.textContent = translations[isZh ? "zh" : "en"][key];
                }}
            }});
        }}

        function renderCharts() {{
            var lang = isZh ? 'zh' : 'en';
            var labels = chartLabels[lang];

            // GDP Chart
            var gdpCtx = document.getElementById('gdpChart');
            if (gdpCtx && window.gdpChartInstance) {{
                window.gdpChartInstance.destroy();
            }}
            if (gdpCtx) {{
                window.gdpChartInstance = new Chart(gdpCtx, {{
                    type: 'bar',
                    data: {{
                        labels: ['{c}', 'Global Avg'],
                        datasets: [{{
                            label: 'GDP (Billions USD)',
                            data: [countryValues[0] / 1e9, globalValues[0] / 1e9],
                            backgroundColor: [chartColors.primary, chartColors.global],
                            borderRadius: 8
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
                                grid: {{ color: '#f3f4f6' }}
                            }},
                            x: {{
                                grid: {{ display: false }}
                            }}
                        }}
                    }}
                }});
            }}

            // Gini Chart
            var giniCtx = document.getElementById('giniChart');
            if (giniCtx && window.giniChartInstance) {{
                window.giniChartInstance.destroy();
            }}
            if (giniCtx) {{
                window.giniChartInstance = new Chart(giniCtx, {{
                    type: 'doughnut',
                    data: {{
                        labels: ['{c}', 'Global Avg'],
                        datasets: [{{
                            data: [countryValues[3], globalValues[3]],
                            backgroundColor: [chartColors.primary, chartColors.global],
                            borderWidth: 0
                        }}]
                    }},
                    options: {{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {{
                            legend: {{ position: 'bottom' }}
                        }}
                    }}
                }});
            }}

            // Poverty Chart
            var povertyCtx = document.getElementById('povertyChart');
            if (povertyCtx && window.povertyChartInstance) {{
                window.povertyChartInstance.destroy();
            }}
            if (povertyCtx) {{
                window.povertyChartInstance = new Chart(povertyCtx, {{
                    type: 'doughnut',
                    data: {{
                        labels: ['{c}', 'Global Avg'],
                        datasets: [{{
                            data: [countryValues[4], globalValues[4]],
                            backgroundColor: [chartColors.secondary, chartColors.global],
                            borderWidth: 0
                        }}]
                    }},
                    options: {{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {{
                            legend: {{ position: 'bottom' }}
                        }}
                    }}
                }});
            }}
        }}

        document.addEventListener("DOMContentLoaded", function() {{
            var savedLang = localStorage.getItem("preferredLanguage");
            if (savedLang !== null) {{
                isZh = savedLang === "zh";
            }}
            document.documentElement.lang = isZh ? "zh-CN" : "en";
            updateContent();
            renderCharts();

            var hamburger = document.getElementById("hamburger");
            var mobilePanel = document.getElementById("mobilePanel");
            var mobileOverlay = document.getElementById("mobileOverlay");

            hamburger.addEventListener("click", function() {{
                hamburger.classList.toggle("active");
                mobilePanel.classList.toggle("active");
                mobileOverlay.classList.toggle("active");
            }});

            mobileOverlay.addEventListener("click", function() {{
                hamburger.classList.remove("active");
                mobilePanel.classList.remove("active");
                mobileOverlay.classList.remove("active");
            }});

            var pcLangBtn = document.getElementById("pcLangBtn");
            if (pcLangBtn) {{
                pcLangBtn.addEventListener("click", function() {{
                    switchLanguage();
                }});
            }}
        }});
    </script>
</body>
</html>'''

        output_name = re.sub(
            r" around 2025\.(txt|md)", "-2025-Economic-Report.html", filename
        )
        output_name = re.sub(
            r" vers 2025\.md", "-2025-Economic-Report.html", output_name
        )
        output_name = re.sub(
            r" 2025 around\.md", "-2025-Economic-Report.html", output_name
        )
        output_name = output_name.replace("China 2025", "China")

        output_path = os.path.join(reports_dir, output_name)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html)

        print(
            f"✓ {c}: GDP={gdp_label}, Salary={median_salary}, Gini={gini_label}, Refs={len(data['references'])}"
        )
        count += 1

    print(f"\n✓ Generated {count} enhanced reports!")


if __name__ == "__main__":
    main()
