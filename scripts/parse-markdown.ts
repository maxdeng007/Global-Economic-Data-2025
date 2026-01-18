/**
 * Parses markdown files and extracts economic data
 */

import * as fs from 'fs';
import * as path from 'path';

interface CountryData {
  id: string;
  name: { zh: string; en: string };
  flag: string;
  region: string;
  economy: string;
  file: string;
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
  fullData: {
    salaryDetails: {
      median: string;
      mean: string;
      minimum: string;
      genderGap: string;
    };
    householdIncome: {
      median: string;
      perCapita: string;
      gini: string;
      povertyRate: string;
    };
    gdp: {
      nominal: string;
      ppp: string;
      growth: string;
      inflation: string;
      unemployment: string;
      gdpHistory?: Array<{year: number; rate: number; source: string}>;
    };
    costOfLiving: {
      overall: number;
      rent: number;
      groceries: number;
      utilities: number;
      transportation: number;
      lifestyle: number;
    };
    employment: {
      rate: string;
      laborForce: string;
      youthUnemployment: string;
      employmentGrowth: string;
    };
    benchmarks: {
      lowIncome: string;
      middleIncome: string;
      highIncome: string;
    };
  };
}

// Poverty rate data by country (World Bank, OECD, Eurostat 2023-2024)
const POVERTY_RATES: Record<string, { rate: string; source: string; year: number }> = {
  // Asian/Pacific
  china: { rate: "<0.1%", source: "World Bank 2024", year: 2024 },
  india: { rate: "5.3%", source: "World Bank 2023", year: 2023 },
  japan: { rate: "15.7%", source: "OECD 2023", year: 2023 },
  south-korea: { rate: "16.5%", source: "OECD 2023", year: 2023 },
  singapore: { rate: "~0%", source: "World Bank 2023", year: 2023 },
  thailand: { rate: "4.89%", source: "NESDC 2024", year: 2024 },
  vietnam: { rate: "2.3%", source: "GSO 2024", year: 2024 },
  iraq: { rate: "17.5%", source: "World Bank 2024", year: 2024 },
  israel: { rate: "20.7%", source: "National Insurance Institute 2023", year: 2023 },
  turkey: { rate: "13.6%", source: "TurkStat 2024", year: 2024 },
  australia: { rate: "13.4%", source: "ACOSS/UNSW 2024", year: 2024 },
  // Americas
  usa: { rate: "10.6%", source: "Census Bureau 2023", year: 2023 },
  canada: { rate: "10.9%", source: "Statistics Canada 2024", year: 2024 },
  mexico: { rate: "29.6%", source: "INEGI 2024", year: 2024 },
  brazil: { rate: "23.1%", source: "IBGE 2024", year: 2024 },
  colombia: { rate: "31.8%", source: "DANE 2024", year: 2024 },
  chile: { rate: "5.7%", source: "World Bank 2022", year: 2022 },
  // European
  uk: { rate: "21%", source: "DWP 2023/24", year: 2024 },
  france: { rate: "15.9%", source: "Eurostat 2024", year: 2024 },
  germany: { rate: "15.5%", source: "Eurostat 2024", year: 2024 },
  italy: { rate: "18.9%", source: "ISTAT 2023", year: 2023 },
  spain: { rate: "20.2%", source: "INE Spain 2023", year: 2023 },
  netherlands: { rate: "12.1%", source: "Eurostat 2024", year: 2024 },
  belgium: { rate: "11.4%", source: "Statbel 2024", year: 2024 },
  austria: { rate: "14.3%", source: "Eurostat 2024", year: 2024 },
  sweden: { rate: "16.1%", source: "Eurostat 2023", year: 2023 },
  denmark: { rate: "11.6%", source: "Eurostat 2024", year: 2024 },
  finland: { rate: "14.2%", source: "Statistics Finland 2024", year: 2024 },
  portugal: { rate: "15.4%", source: "Statistics Portugal 2024", year: 2024 },
  ireland: { rate: "12.7%", source: "Eurostat 2024", year: 2024 },
  switzerland: { rate: "16.4%", source: "Eurostat 2023", year: 2023 },
  russia: { rate: "7.2%", source: "Rosstat 2024", year: 2024 },
  ukraine: { rate: "37%", source: "World Bank 2024", year: 2024 },
  // Middle East/Africa
  uae: { rate: "~0%", source: "World Bank 2018", year: 2018 },
  egypt: { rate: "29.7%", source: "CAPMAS 2020", year: 2020 },
};

// GDP growth history by country (2020-2024, World Bank + IMF)
const GDP_HISTORY: Record<string, Array<{year: number; rate: number; source: string}>> = {
  usa: [
    {year: 2020, rate: -2.8, source: "World Bank"},
    {year: 2021, rate: 5.9, source: "World Bank"},
    {year: 2022, rate: 1.9, source: "World Bank"},
    {year: 2023, rate: 2.5, source: "World Bank"},
    {year: 2024, rate: 2.8, source: "IMF"}
  ],
  china: [
    {year: 2020, rate: 2.2, source: "World Bank"},
    {year: 2021, rate: 8.4, source: "World Bank"},
    {year: 2022, rate: 3.0, source: "World Bank"},
    {year: 2023, rate: 5.2, source: "World Bank"},
    {year: 2024, rate: 4.8, source: "IMF"}
  ],
  japan: [
    {year: 2020, rate: -4.3, source: "World Bank"},
    {year: 2021, rate: 2.2, source: "World Bank"},
    {year: 2022, rate: 0.9, source: "World Bank"},
    {year: 2023, rate: 1.9, source: "World Bank"},
    {year: 2024, rate: 1.0, source: "IMF"}
  ],
  germany: [
    {year: 2020, rate: -3.8, source: "World Bank"},
    {year: 2021, rate: 3.2, source: "World Bank"},
    {year: 2022, rate: 1.9, source: "World Bank"},
    {year: 2023, rate: -0.3, source: "World Bank"},
    {year: 2024, rate: 0.2, source: "IMF"}
  ],
  india: [
    {year: 2020, rate: -5.8, source: "World Bank"},
    {year: 2021, rate: 9.7, source: "World Bank"},
    {year: 2022, rate: 7.2, source: "World Bank"},
    {year: 2023, rate: 7.6, source: "World Bank"},
    {year: 2024, rate: 6.5, source: "IMF"}
  ],
  uk: [
    {year: 2020, rate: -7.6, source: "World Bank"},
    {year: 2021, rate: 8.7, source: "World Bank"},
    {year: 2022, rate: 4.3, source: "World Bank"},
    {year: 2023, rate: 0.1, source: "World Bank"},
    {year: 2024, rate: 0.9, source: "IMF"}
  ],
  france: [
    {year: 2020, rate: -7.5, source: "World Bank"},
    {year: 2021, rate: 6.4, source: "World Bank"},
    {year: 2022, rate: 2.5, source: "World Bank"},
    {year: 2023, rate: 0.7, source: "World Bank"},
    {year: 2024, rate: 0.9, source: "IMF"}
  ],
  italy: [
    {year: 2020, rate: -9.0, source: "World Bank"},
    {year: 2021, rate: 6.2, source: "World Bank"},
    {year: 2022, rate: 3.7, source: "World Bank"},
    {year: 2023, rate: 0.9, source: "World Bank"},
    {year: 2024, rate: 0.6, source: "IMF"}
  ],
  brazil: [
    {year: 2020, rate: -3.9, source: "World Bank"},
    {year: 2021, rate: 5.0, source: "World Bank"},
    {year: 2022, rate: 3.1, source: "World Bank"},
    {year: 2023, rate: 2.9, source: "World Bank"},
    {year: 2024, rate: 2.1, source: "IMF"}
  ],
  canada: [
    {year: 2020, rate: -5.1, source: "World Bank"},
    {year: 2021, rate: 5.3, source: "World Bank"},
    {year: 2022, rate: 3.8, source: "World Bank"},
    {year: 2023, rate: 1.2, source: "World Bank"},
    {year: 2024, rate: 1.3, source: "IMF"}
  ],
  russia: [
    {year: 2020, rate: -2.7, source: "World Bank"},
    {year: 2021, rate: 5.9, source: "World Bank"},
    {year: 2022, rate: -1.2, source: "World Bank"},
    {year: 2023, rate: 3.6, source: "World Bank"},
    {year: 2024, rate: 3.6, source: "IMF"}
  ],
  south-korea: [
    {year: 2020, rate: -0.7, source: "World Bank"},
    {year: 2021, rate: 4.3, source: "World Bank"},
    {year: 2022, rate: 3.2, source: "World Bank"},
    {year: 2023, rate: 1.4, source: "World Bank"},
    {year: 2024, rate: 2.3, source: "IMF"}
  ],
  australia: [
    {year: 2020, rate: -0.5, source: "World Bank"},
    {year: 2021, rate: 5.2, source: "World Bank"},
    {year: 2022, rate: 3.8, source: "World Bank"},
    {year: 2023, rate: 2.1, source: "World Bank"},
    {year: 2024, rate: 1.4, source: "IMF"}
  ],
  spain: [
    {year: 2020, rate: -11.2, source: "World Bank"},
    {year: 2021, rate: 6.4, source: "World Bank"},
    {year: 2022, rate: 5.8, source: "World Bank"},
    {year: 2023, rate: 2.7, source: "World Bank"},
    {year: 2024, rate: 2.8, source: "IMF"}
  ],
  mexico: [
    {year: 2020, rate: -8.0, source: "World Bank"},
    {year: 2021, rate: 4.7, source: "World Bank"},
    {year: 2022, rate: 3.7, source: "World Bank"},
    {year: 2023, rate: 3.2, source: "World Bank"},
    {year: 2024, rate: 2.4, source: "IMF"}
  ],
  indonesia: [
    {year: 2020, rate: -2.1, source: "World Bank"},
    {year: 2021, rate: 3.7, source: "World Bank"},
    {year: 2022, rate: 5.3, source: "World Bank"},
    {year: 2023, rate: 5.0, source: "World Bank"},
    {year: 2024, rate: 5.0, source: "IMF"}
  ],
  netherlands: [
    {year: 2020, rate: -3.9, source: "World Bank"},
    {year: 2021, rate: 5.9, source: "World Bank"},
    {year: 2022, rate: 4.3, source: "World Bank"},
    {year: 2023, rate: 0.1, source: "World Bank"},
    {year: 2024, rate: 0.8, source: "IMF"}
  ],
  saudi-arabia: [
    {year: 2020, rate: -4.1, source: "World Bank"},
    {year: 2021, rate: 3.9, source: "World Bank"},
    {year: 2022, rate: 7.5, source: "World Bank"},
    {year: 2023, rate: -0.8, source: "World Bank"},
    {year: 2024, rate: 1.5, source: "IMF"}
  ],
  turkey: [
    {year: 2020, rate: 1.9, source: "World Bank"},
    {year: 2021, rate: 11.4, source: "World Bank"},
    {year: 2022, rate: 5.5, source: "World Bank"},
    {year: 2023, rate: 4.5, source: "World Bank"},
    {year: 2024, rate: 3.0, source: "IMF"}
  ],
  switzerland: [
    {year: 2020, rate: -2.1, source: "World Bank"},
    {year: 2021, rate: 5.4, source: "World Bank"},
    {year: 2022, rate: 2.7, source: "World Bank"},
    {year: 2023, rate: 0.7, source: "World Bank"},
    {year: 2024, rate: 0.9, source: "IMF"}
  ],
  poland: [
    {year: 2020, rate: -2.0, source: "World Bank"},
    {year: 2021, rate: 6.9, source: "World Bank"},
    {year: 2022, rate: 5.6, source: "World Bank"},
    {year: 2023, rate: 0.2, source: "World Bank"},
    {year: 2024, rate: 2.8, source: "IMF"}
  ],
  sweden: [
    {year: 2020, rate: -2.2, source: "World Bank"},
    {year: 2021, rate: 6.2, source: "World Bank"},
    {year: 2022, rate: 2.8, source: "World Bank"},
    {year: 2023, rate: -0.2, source: "World Bank"},
    {year: 2024, rate: 1.1, source: "IMF"}
  ],
  belgium: [
    {year: 2020, rate: -5.3, source: "World Bank"},
    {year: 2021, rate: 6.9, source: "World Bank"},
    {year: 2022, rate: 3.0, source: "World Bank"},
    {year: 2023, rate: 1.6, source: "World Bank"},
    {year: 2024, rate: 1.2, source: "IMF"}
  ],
  norway: [
    {year: 2020, rate: -0.7, source: "World Bank"},
    {year: 2021, rate: 4.2, source: "World Bank"},
    {year: 2022, rate: 3.9, source: "World Bank"},
    {year: 2023, rate: 0.9, source: "World Bank"},
    {year: 2024, rate: 1.1, source: "IMF"}
  ],
  austria: [
    {year: 2020, rate: -6.3, source: "World Bank"},
    {year: 2021, rate: 4.2, source: "World Bank"},
    {year: 2022, rate: 4.8, source: "World Bank"},
    {year: 2023, rate: -0.7, source: "World Bank"},
    {year: 2024, rate: 0.9, source: "IMF"}
  ],
  ireland: [
    {year: 2020, rate: 5.9, source: "World Bank"},
    {year: 2021, rate: 15.1, source: "World Bank"},
    {year: 2022, rate: 9.4, source: "World Bank"},
    {year: 2023, rate: -3.2, source: "World Bank"},
    {year: 2024, rate: 1.9, source: "IMF"}
  ],
  israel: [
    {year: 2020, rate: -1.4, source: "World Bank"},
    {year: 2021, rate: 9.3, source: "World Bank"},
    {year: 2022, rate: 6.8, source: "World Bank"},
    {year: 2023, rate: 2.2, source: "World Bank"},
    {year: 2024, rate: 1.5, source: "IMF"}
  ],
  denmark: [
    {year: 2020, rate: -2.4, source: "World Bank"},
    {year: 2021, rate: 6.8, source: "World Bank"},
    {year: 2022, rate: 2.7, source: "World Bank"},
    {year: 2023, rate: 1.9, source: "World Bank"},
    {year: 2024, rate: 2.1, source: "IMF"}
  ],
  singapore: [
    {year: 2020, rate: -4.1, source: "World Bank"},
    {year: 2021, rate: 7.6, source: "World Bank"},
    {year: 2022, rate: 3.6, source: "World Bank"},
    {year: 2023, rate: 1.1, source: "World Bank"},
    {year: 2024, rate: 2.3, source: "IMF"}
  ],
  malaysia: [
    {year: 2020, rate: -5.5, source: "World Bank"},
    {year: 2021, rate: 3.3, source: "World Bank"},
    {year: 2022, rate: 8.7, source: "World Bank"},
    {year: 2023, rate: 3.6, source: "World Bank"},
    {year: 2024, rate: 4.7, source: "IMF"}
  ],
  thailand: [
    {year: 2020, rate: -6.2, source: "World Bank"},
    {year: 2021, rate: 1.6, source: "World Bank"},
    {year: 2022, rate: 2.9, source: "World Bank"},
    {year: 2023, rate: 1.9, source: "World Bank"},
    {year: 2024, rate: 2.7, source: "IMF"}
  ],
  vietnam: [
    {year: 2020, rate: 2.9, source: "World Bank"},
    {year: 2021, rate: 2.6, source: "World Bank"},
    {year: 2022, rate: 8.0, source: "World Bank"},
    {year: 2023, rate: 5.0, source: "World Bank"},
    {year: 2024, rate: 6.5, source: "IMF"}
  ],
  philippines: [
    {year: 2020, rate: -9.5, source: "World Bank"},
    {year: 2021, rate: 5.7, source: "World Bank"},
    {year: 2022, rate: 7.6, source: "World Bank"},
    {year: 2023, rate: 5.3, source: "World Bank"},
    {year: 2024, rate: 5.8, source: "IMF"}
  ],
  nigeria: [
    {year: 2020, rate: -1.8, source: "World Bank"},
    {year: 2021, rate: 3.6, source: "World Bank"},
    {year: 2022, rate: 3.3, source: "World Bank"},
    {year: 2023, rate: 2.9, source: "World Bank"},
    {year: 2024, rate: 2.9, source: "IMF"}
  ],
  south-africa: [
    {year: 2020, rate: -5.7, source: "World Bank"},
    {year: 2021, rate: 4.7, source: "World Bank"},
    {year: 2022, rate: 1.9, source: "World Bank"},
    {year: 2023, rate: 0.7, source: "World Bank"},
    {year: 2024, rate: 0.9, source: "IMF"}
  ],
  egypt: [
    {year: 2020, rate: 3.6, source: "World Bank"},
    {year: 2021, rate: 3.3, source: "World Bank"},
    {year: 2022, rate: 6.6, source: "World Bank"},
    {year: 2023, rate: 3.8, source: "World Bank"},
    {year: 2024, rate: 4.2, source: "IMF"}
  ],
  ukraine: [
    {year: 2020, rate: -3.7, source: "World Bank"},
    {year: 2021, rate: 3.4, source: "World Bank"},
    {year: 2022, rate: -28.8, source: "World Bank"},
    {year: 2023, rate: 5.3, source: "World Bank"},
    {year: 2024, rate: 3.0, source: "IMF"}
  ],
  portugal: [
    {year: 2020, rate: -8.4, source: "World Bank"},
    {year: 2021, rate: 5.5, source: "World Bank"},
    {year: 2022, rate: 6.8, source: "World Bank"},
    {year: 2023, rate: 2.5, source: "World Bank"},
    {year: 2024, rate: 1.9, source: "IMF"}
  ],
  czechia: [
    {year: 2020, rate: -5.5, source: "World Bank"},
    {year: 2021, rate: 6.0, source: "World Bank"},
    {year: 2022, rate: 2.4, source: "World Bank"},
    {year: 2023, rate: -0.1, source: "World Bank"},
    {year: 2024, rate: 1.0, source: "IMF"}
  ],
  romania: [
    {year: 2020, rate: -3.7, source: "World Bank"},
    {year: 2021, rate: 5.7, source: "World Bank"},
    {year: 2022, rate: 4.1, source: "World Bank"},
    {year: 2023, rate: 2.4, source: "World Bank"},
    {year: 2024, rate: 2.8, source: "IMF"}
  ],
};

// Extract a value after a label pattern
function extractValue(text: string, patterns: (string | RegExp)[]): string | null {
  for (const pattern of patterns) {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i');
    const match = text.match(regex);
    if (match) {
      return match[1]?.trim() || match[0].replace(pattern, '').trim();
    }
  }
  return null;
}

// Extract currency amount
function extractCurrency(text: string, patterns: (string | RegExp)[]): string | null {
  for (const pattern of patterns) {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i');
    const match = text.match(regex);
    if (match) {
      let value = match[1]?.trim() || match[0].replace(pattern, '').trim();
      
      // Expand "¥X million" to full number format
      const millionMatch = value.match(/([$¥€£])\s*([0-9,.]+)\s*(million|m|billion|bn)/i);
      if (millionMatch) {
        const num = parseFloat(millionMatch[2].replace(/,/g, ''));
        const suffix = millionMatch[3].toLowerCase();
        const multiplier = 1000000;
        const expanded = num * multiplier;
        value = millionMatch[1] + formatNumber(expanded);
      }
      return value;
    }
  }
  return null;
}

// Extract percentage value
function extractPercentage(text: string, patterns: (string | RegExp)[]): string | null {
  for (const pattern of patterns) {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i');
    const match = text.match(regex);
    if (match) {
      const value = match[1] || match[0];
      if (!value.includes('%')) {
        return value + '%';
      }
      return value.trim();
    }
  }
  return null;
}

// Format number with commas
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Clean and parse numeric value for sorting
function parseNumericValue(value: string): number {
  const cleaned = value
    .replace(/[$,¥€£]/g, '')
    .replace(/per\s*year|per\s*month|per\s*hour|\/year|\/month|\/hour|annual|monthly|hourly/gi, '')
    .trim();
  
  // Handle "X million" or "X billion" suffixes
  const millionMatch = cleaned.match(/([\d,.]+)\s*(million|m|billion|bn)/i);
  if (millionMatch) {
    const num = parseFloat(millionMatch[1].replace(/,/g, ''));
    if (millionMatch[2].toLowerCase().startsWith('b')) {
      return num * 1000000000;
    }
    return num * 1000000;
  }
  
  // Handle ranges - take the average
  const rangeMatch = cleaned.match(/(\d+[\d,.]*)\s*[-–]\s*(\d+[\d,.]*)/);
  if (rangeMatch) {
    const first = parseFloat(rangeMatch[1].replace(/,/g, ''));
    const second = parseFloat(rangeMatch[2].replace(/,/g, ''));
    return (first + second) / 2;
  }
  
  // Handle ">" or "<" symbols
  const approxMatch = cleaned.match(/[><]?\s*(\d+[\d,.]*)/);
  if (approxMatch) {
    return parseFloat(approxMatch[1].replace(/,/g, ''));
  }
  
  const num = parseFloat(cleaned.replace(/,/g, ''));
  return isNaN(num) ? 0 : num;
}

// Calculate cost of living indices based on GDP per capita
function calculateCostOfLiving(gdpPerCapita: number): {
  overall: number;
  rent: number;
  groceries: number;
  utilities: number;
  transportation: number;
  lifestyle: number;
} {
  // GDP per capita ranges from ~$1,000 (poor) to ~$90,000 (rich)
  // Normalize to 0-100 scale
  const normalized = Math.min(100, Math.max(10, (gdpPerCapita / 90000) * 85));
  
  return {
    overall: Math.round(normalized),
    rent: Math.round(normalized * 0.9),
    groceries: Math.round(normalized * 0.85),
    utilities: Math.round(normalized * 0.7),
    transportation: Math.round(normalized * 0.8),
    lifestyle: Math.round(normalized * 1.0)
  };
}

export function parseMarkdown(content: string, countryName: string): Partial<CountryData> {
  const result: Partial<CountryData> = {};
  
  // Extract salary data - improved patterns for various formats
  const medianSalary = extractCurrency(content, [
    // "**Median full-time salary:** $75,000" (Quick Summary with :** pattern)
    /salary:\*\*\s*([$¥€£₹₩][\d,.]+)/i,
    // "**Median full-time salary:** 45,000 DKK/month" (Quick Summary with number then currency code)
    /salary:\*\*\s*([\d,.]+\s*(DKK|CHF|TRY)\b)/i,
    // "**Median full-time salary:** CHF 90,000 per year" (Quick Summary with currency code then number)
    /salary:\*\*\s*((?:CHF|TRY|DKK)\s*[\d,.]+)/i,
    // "Median full-time salary: €35,000 per year" (from standardized summary)
    /Median[\s-]*full[\s-]*time[\s-]*salary[:\s]+([$¥€£₹₩\\d,.]+)/i,
    // "**Median full-time salary:** €35,000" (handle markdown bold)
    /\*\*[Mm]edian[\s-]*full[\s-]*time[\s-]*salary:\*\*[\s:]*([$¥€£₹₩][\\d,.]+)/i,
    // "Median full-time salary: 34,900 TRY" (handle currency codes)
    /Median[\s-]*full[\s-]*time[\s-]*salary[:\s]+([\\d,.]+)\s*(TRY|INR|CHF|DKK|EUR|USD|GBP|AED)/i,
    // "Median monthly salary: 88,900 THB"
    /median[\s-]*monthly[\s-]*salary[:\s]+([$¥€£\\d,.]+)/i,
    // "Estimated median gross monthly wage 2025: €2,100" (Spain)
    /Estimated[\s-]*median[\s-]*gross[\s-]*monthly[\s-]*wage.*?(€[\d,.]+)/i,
    // "Median gross monthly wage (all employees, 2025):" followed by value
    /Median[\s-]*gross[\s-]*monthly[\s-]*wage.*?([$¥€£][\d,.]+)/i,
    // "Median gross monthly salary: 13,500 AED"
    /median[\s-]*gross[\s-]*monthly[\s-]*salary[:\s]+([$¥€£\\d,.]+)/i,
    // "Typical gross monthly salary: ~27,000 UAH"
    /typical[\s-]*gross[\s-]*monthly[\s-]*salary[:\s~≈]*([$¥€£\\d,.]+)/i,
    // "Median salary: 43,500 RUB"
    /median[\s-]*salary[:\s]+([$¥€£\\d,.]+)/i,
    // "Median monthly salary – January 2023: 43,500 RUB"
    /median[\s-]*monthly[\s-]*salary.*?[:\s]+([$¥€£\\d,.]+)/i,
    // "Average / median-type salary 2025: ₹32,000/month"
    /average[\s/]*median[\s-]*type[\s-]*salary.*?([$¥€£\\d,.]+)/i,
    // "Median full-time salary 2025: CHF 7,500"
    /median[\s-]*full[\s-]*time[\s-]*salary.*?([$¥€£\\d,.]+)/i,
    // "Average monthly salary: 97,300 THB"
    /average[\s-]*monthly[\s-]*salary[:\s]+([$¥€£\\d,.]+)/i,
    // "Average/median-type monthly income: X"
    /average[/]median[\s-]*type[\s-]*monthly[\s-]*income[:\s]+([$¥€£\\d,.]+)/i,
    // "**Median gross annual income**: **€38,043**" (Austria style)
    /\*\*Median[\s-]*gross[\s-]*annual[\s-]*income\*\*[:\s]+[*]*([$¥€£][\d,.]+)/i,
    // "Median gross annual income: €38,043" (without leading bold)
    /Median[\s-]*gross[\s-]*annual[\s-]*income[:\s]+([$¥€£][\d,.]+)/i,
    // "Median gross annual wage" in table
    /Median[\s-]*gross[\s-]*annual[\s-]*wage.*?([$¥€£][\d,.]+)/i,
    // "Median gross wage (individual)" in table | **€3,728 / month**
    /Median[\s-]*gross[\s-]*wage.*?\|\s*[*]*([$¥€£][\d,.]+)/i,
    // "**Median wage:** ≈ **€3,728 / month" (markdown with ≈)
    /\*\*Median[\s-]*wage:\*\*.*?([$¥€£][\d,.]+)/i,
    // "Median full‑time wage ≈ €3,600/month" (with ≈ symbol)
    /Median[\s-]*full[\s-]*time[\s-]*wage.*?([$¥€£][\d,.]+)/i,
    // "Median full‑time gross annual wage: €55,678"
    /Median[\s-]*full[\s-]*time[\s-]*gross[\s-]*annual[\s-]*wage[:\s]+([$¥€£][\d,.]+)/i,
    // "Typical (median‑type) full‑time salary: ~€35,000–€40,000" (Italy style)
    /Typical.*median.*type.*full.*time.*salary.*?(€[\d,]+)/i,
    // "Typical full‑time salary ... ~€35,000–€40,000 per year"
    /typical.*full.*time.*salary.*?~(€[\d,]+)/i,
    // Standard patterns (least specific, last resort - avoid matching small numbers)
    `typical.*full-time.*worker.*median.*?([$¥€£][\\d,.]+)`,
    `median.*salary.*?([$¥€£][\\d,]{4,})`  // Require at least 4 digits to avoid €45
  ]);
  
  const meanSalary = extractCurrency(content, [
    // "Average gross monthly salary: 13,900 AED"
    /average[\s-]*gross[\s-]*monthly[\s-]*salary[:\s]+([$¥€£\\d,.]+)/i,
    // "Average monthly salary, 2025: X"
    /average[\s-]*monthly[\s-]*salary.*?([$¥€£\\d,.]+)/i,
    // "Average annual gross salary: CHF 95,000"
    /average[\s-]*annual[\s-]*gross[\s-]*salary[:\s]+([$¥€£\\d,.]+)/i,
    // Standard patterns
    `average.*earnings.*?([$¥€£][\\d,.]+)`,
    `mean.*salary.*?([$¥€£][\\d,.]+)`,
    `average.*annual.*?([$¥€£][\\d,.]+)`
  ]);
  
  const minimumSalary = extractCurrency(content, [
    `minimum.*wage.*?([$¥€£][\\d,.]+)`,
    `minimum.*salary.*?([$¥€£][\\d,.]+)`
  ]);
  
  const genderGap = extractPercentage(content, [
    `women.*median.*?([\\d.]+)%`,
    `gender.*gap.*?([\\d.]+)%`,
    `([\\d.]+)%.*women.*men`
  ]);
  
  // Extract household income - comprehensive patterns
  const medianHousehold = extractCurrency(content, [
    // "**Median household income:** ¥7-8.5 million" (Quick Summary with range - MUST be before simple pattern)
    /income:\*\*\s*([¥][\d,.]+.*?million)/i,
    // "**Median household income:** $83,730" (Quick Summary with :** pattern)
    /income:\*\*\s*([$¥€£₹₩][\d,.]+)/i,
    // "**Median household income:** 400,000 DKK/year" (Quick Summary with currency code)
    /income:\*\*\s*([\d,.]+\s*(DKK|CHF|TRY)\b)/i,
    // "**Median household income:** CHF 126,000 per year" (Quick Summary with currency code then number)
    /income:\*\*\s*((?:CHF|TRY|DKK)\s*[\d,.]+)/i,
    // Match "Median household disposable income: X–Y thousand/month"
    /median[\s-]*household[\s-]*disposable[\s-]*income[:\s]+([$¥€£][\\d,.]+\s*[-–\\s]*[$¥€£\\d,.]+)/i,
    // Match "Median household income: X–Y k THB/month"
    /median[\s-]*household[\s-]*income[:\s]+([$¥€£][\\d,.]+\s*[-–]*[\\d,.]*\s*(?:k|thousand|million)?)/i,
    // Match "Median household disposable income: X–Y"
    /median[\s-]*household[\s-]*disposable[\s-]*income[:\s]+([$¥€£][\\d,.]+\s*[-–]\s*[$¥€£\\d,.]+)/i,
    // Match "Mean annual household disposable income: X"
    /mean[\s-]*annual[\s-]*household[\s-]*disposable[\s-]*income[:\s]+([$¥€£][\\d,.]+)/i,
    // Match "Average monthly household income: X"
    /average[\s-]*monthly[\s-]*household[\s-]*income[:\s]+([$¥€£][\\d,.]+)/i,
    // Match "Median-type household disposable income: X"
    /median[\s-]*type[\s-]*household[\s-]*disposable[\s-]*income[:\s]+([$¥€£][\\d,.]+)/i,
    // Match "household disposable income: roughly X–Y"
    /household[\s-]*disposable[\s-]*income[:\s]+roughly[\s]+([$¥€£][\\d,.]+\s*[-–]\s*[$¥€£\\d,.]+)/i,
    // Match "household... ¥X million" (from Japanese format)
    /household[^\n]*?([$¥€£]\s*[\d,.]+\s*(?:million|m|米))/i,
    // Match "Median household: X–Y thousand/month"
    /median[\s-]*household[:\s]+([$¥€£][\\d,.]+\s*[-–]*[\\d,.]*\s*(?:k|thousand|million)?)/i,
    // "Median household income: €42,500 per year" (from standardized summary)
    /Median[\s-]*household[\s-]*income[:\s]+([$¥€£\\d,.]+)/i,
    // "Median household income: €42,500 per year" - catch-all with ~ prefix
    /Median[\s-]*household[\s-]*income[:\s]+~?\s*([$¥€£\\d,.]+)/i,
    // "Median household income: ~150,000 TRY/year" - handle space after number
    /Median[\s-]*household[\s-]*income[:\s]+~?\s*([\\d,.]+)\s*[A-Z]{2,4}/i,
    // "Median household income: 150,000 TRY" (handle currency codes)
    /Median[\s-]*household[\s-]*income[:\s]+([\\d,.]+)\s*(TRY|INR|CHF|DKK|EUR|USD|GBP|AED)/i,
    // Standard patterns
    `median.*household.*?([$¥€£][\\d,.]+)`,
    `median household income.*?([$¥€£][\\d,.]+)`
  ]);
  
  const perCapita = extractCurrency(content, [
    `per.*capita.*?([$¥€£][\\d,.]+)`,
    `per.*person.*?([$¥€£][\\d,.]+)`
  ]);
  
  // Extract Gini coefficient - avoid matching years
  const giniPatterns = [
    // Match "Gini coefficient, YEAR: VALUE" or "Gini index, YEAR: VALUE"
    /gini[\s-]*(?:coefficient|index).*?(\d{4}).*?[:\s]+[*]*(\d+\.?\d*)/i,
    // Match "Gini of VALUE" or "Gini: VALUE" after year context
    /gini[\s-]*(?:of|coefficient|index)?[:\s]+[*]*(\d+\.?\d*)/i,
    // Match percentage format "Gini: X%"
    /gini.*?[:\s]+(\d+\.?\d*)\s*%/i,
    // Match "Gini ≈ 0.xxx" or "Gini ~ 0.xxx"
    /gini\s*[≈~]\s*(\d+\.\d+)/i
  ];
  
  let gini = null;
  for (const pattern of giniPatterns) {
    const match = content.match(pattern);
    if (match) {
      const value = match[match.length - 1];  // Get the last capture group
      const num = parseFloat(value);
      if (!isNaN(num) && num > 0 && num < 1) {
        gini = num.toFixed(3);  // Already in decimal form (0.488)
      } else if (!isNaN(num) && num > 0 && num <= 100) {
        gini = (num / 100).toFixed(3);  // Percentage format, convert to decimal
      }
      if (gini) break;
    }
  }
  
  const povertyRate = extractPercentage(content, [
    `poverty.*rate.*?([\\d.]+)%`,
    `official.*poverty.*?([\\d.]+)%`
  ]);
  
  // Extract GDP data
  const nominalGDP = extractCurrency(content, [
    `nominal.*gdp.*?([$¥€£][\\d.,]+[TBMK]?)`,
    `gdp.*?([$¥€£][\\d.,]+[TBMK]?)`
  ]);
  
  // Extract GDP growth rate
  const gdpGrowthPatterns = [
    // "GDP growth: 1.0%" or "**GDP growth:** 1.0%" (from standardized summary)
    /GDP[\s-]*growth[:\s*]+([\d.]+)\s*%/i,
    // "Real GDP growth: 0.5%" or "real GDP growth 2025: ≈ 0.5%"
    /real[\s-]*gdp[\s-]*growth.*?([\d.]+)\s*%/i,
    // Fallback: gdp growth followed by percentage
    `gdp.*growth.*?([\\d.]+)%`
  ];
  
  let gdpGrowth = null;
  for (const pattern of gdpGrowthPatterns) {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i');
    const match = content.match(regex);
    if (match) {
      const value = match[1];
      const num = parseFloat(value);
      if (!isNaN(num) && num > 0 && num <= 20) {
        gdpGrowth = num + '%';
        break;
      }
    }
  }
  
  const inflation = extractPercentage(content, [
    `inflation.*?([\\d.]+)%`,
    `cpi.*?([\\d.]+)%`
  ]);
  
  // Extract unemployment rate
  const unemploymentPatterns = [
    // "Employment rate: 61.1% of working-age population"
    /employment[\s-]*rate[:\s]+([\\d.]+)[\s%]*of/i,
    // "Unemployment rate: 8.1%"
    /unemployment[\s-]*rate[:\s]+([\\d.]+)\s*%/i,
    // "Unemployment: 8.1% of population"
    /unemployment[:\s]+([\\d.]+)\s*%/i,
    // Standard patterns
    `unemployment.*?([\\d.]+)%`,
    `unemployment.*rate.*?([\\d.]+)%`
  ];
  
  let unemployment = null;
  for (const pattern of unemploymentPatterns) {
    const match = content.match(pattern);
    if (match) {
      const value = match[1];
      const num = parseFloat(value);
      if (!isNaN(num) && num > 0 && num <= 100) {
        unemployment = num + '%';
        break;
      }
    }
  }
  
  // Calculate GDP per capita from nominal GDP and population
  // Look for patterns like "GDP per capita", "GDP per person", "$90,000 per person"
  const gdpPerCapitaPatterns = [
    // "**GDP per capita:** $90,000" (Quick Summary with :** pattern)
    /capita:\*\*\s*([$¥€£][\d,.]+)/i,
    // "GDP per capita: $45,000" (from standardized summary)
    /GDP[\s-]*per[\s-]*capita[:\s]+([$¥€£\\d,.]+)/i,
    /GDP\s*(?:per|per\s*capita).*?([$¥€£][\d,.]+)\s*(?:per\s*person|\/person|\/year)/i,
    /([$¥€£][\d,]+,\d{3})\s*(?:per\s*person|\/person|\/year)/i,
    /([$¥€£][\d,]+)\s*(?:per\s*person|\/person)/i,
    /GDP\s*per\s*capita.*?([$¥€£][\d,.]+)/i
  ];
  
  let gdpPerCapita = '$0';
  for (const pattern of gdpPerCapitaPatterns) {
    const match = content.match(pattern);
    if (match) {
      gdpPerCapita = match[1];
      break;
    }
  }
  const gdpPerCapitaRaw = parseNumericValue(gdpPerCapita);
  
  // Estimate PPP (rough approximation)
  const ppp = `$${Math.round(gdpPerCapitaRaw * 0.85)}`;
  
  // Extract benchmarks from practical benchmarks section
  const lowIncomeMatch = content.match(/< ?[\$¥€£][\d,]+|< ?[\d,]+/i);
  const middleIncomeMatch = content.match(/[\$¥€£][\d,]+.*?[-–].*?[\$¥€£][\d,]+/i);
  const highIncomeMatch = content.match(/> ?[\$¥€£][\d,]+|> ?[\d,]+/i);
  
  // Extract employment data
  const laborForceMatch = content.match(/labor.*force.*?([\d.]+)%/i);
  const youthUnemploymentMatch = content.match(/youth.*unemployment.*?([\d.]+)%/i);
  const employmentGrowthMatch = content.match(/employment.*growth.*?([\d.]+)%/i);
  
  // Extract population (number of residents)
  // Look for large numbers in millions or exact population figures
  // IMPORTANT: Only match lines that explicitly mention "population"
  const populationPatterns = [
    // "**Population:** 68.6 million" (Quick Summary with :** pattern)
    /\*\*[Pp]opulation:\*\*\s*([\d,.]+)\s*(million|m|billion|bn)/i,
    // "Population: 125 million" (Quick Summary without bold marks)
    /[Pp]opulation:\s*([\d,.]+)\s*(million|m|billion|bn)/i,
    // "Population: 68.6 million" (without markdown bold)
    /[Pp]opulation[:\s]+([\d,.]+)\s*(million|m)/i,
  ];

  let population = '10M';
  let maxPop = 0;

  for (const pattern of populationPatterns) {
    const match = content.match(pattern);
    if (match) {
      let num = parseFloat(match[1].replace(/,/g, ''));
      const suffix = match[2]?.toLowerCase();

      // Apply multiplier based on suffix
      if (suffix === 'billion' || suffix === 'bn') {
        num = num * 1000000000;
      } else if (suffix === 'million' || suffix === 'm') {
        num = num * 1000000;
      } else if (suffix === 'thousand' || suffix === 'k') {
        num = num * 1000;
      }

      // Only update if we found a larger, realistic population (avoid matching years like "2025")
      if (num >= 1000000 && num > maxPop) {
        maxPop = num;
        population = (num / 1000000).toFixed(0) + 'M';
      } else if (num >= 1000 && num > maxPop) {
        maxPop = num;
        population = (num / 1000).toFixed(0) + 'K';
      }
    }
  }
  
  // Parse numeric values for metrics
  const salaryRaw = medianSalary ? parseNumericValue(medianSalary) : 0;
  const householdRaw = medianHousehold ? parseNumericValue(medianHousehold) : 0;

  // Extract currency symbol from salary string
  function extractCurrencySymbol(value: string | null): string {
    if (!value) return '$';
    const symbolMatch = value.match(/^([$¥€£₹₩])/);
    if (symbolMatch) return symbolMatch[1];
    // Check for currency codes
    if (value.includes('CHF')) return 'CHF';
    if (value.includes('DKK')) return 'DKK';
    if (value.includes('TRY')) return 'TRY';
    if (value.includes('EUR') || value.includes('€')) return '€';
    if (value.includes('GBP') || value.includes('£')) return '£';
    if (value.includes('USD') || value.includes('$')) return '$';
    return '$';
  }

  const currency = extractCurrencySymbol(medianSalary);

  // Calculate cost of living indices
  const costOfLiving = calculateCostOfLiving(gdpPerCapitaRaw);

  // Build the result
  result.metrics = {
    salary: medianSalary || '$0',
    salaryRaw,
    household: medianHousehold || '$0',
    householdRaw,
    gdpPerCapita,
    gdpPerCapitaRaw,
    gdpGrowth: gdpGrowth || '0%',
    currency,
    population
  };
  
  result.fullData = {
    salaryDetails: {
      median: medianSalary || 'N/A',
      mean: meanSalary || medianSalary || 'N/A',
      minimum: minimumSalary || 'N/A',
      genderGap: genderGap || 'N/A'
    },
    householdIncome: {
      median: medianHousehold || 'N/A',
      perCapita: perCapita || 'N/A',
      gini: gini || 'N/A',
      povertyRate: povertyRate || 'N/A'
    },
    gdp: {
      nominal: nominalGDP || 'N/A',
      ppp,
      growth: gdpGrowth || 'N/A',
      inflation: inflation || 'N/A',
      unemployment: unemployment || 'N/A'
    },
    costOfLiving,
    employment: {
      rate: unemployment || 'N/A',
      laborForce: laborForceMatch?.[1] ? `${laborForceMatch[1]}%` : 'N/A',
      youthUnemployment: youthUnemploymentMatch?.[1] ? `${youthUnemploymentMatch[1]}%` : 'N/A',
      employmentGrowth: employmentGrowthMatch?.[1] ? `${employmentGrowthMatch[1]}%` : 'N/A'
    },
    benchmarks: {
      lowIncome: lowIncomeMatch?.[0] || 'N/A',
      middleIncome: middleIncomeMatch?.[0] || 'N/A',
      highIncome: highIncomeMatch?.[0] || 'N/A'
    }
  };
  
  return result;
}

export function processAllFiles(sourcesDir: string, outputDir: string, config: Record<string, any>): void {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const files = fs.readdirSync(sourcesDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const filePath = path.join(sourcesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Get country config
    const countryConfig = config[file.replace('.md', '')];
    
    if (!countryConfig) {
      console.warn(`⚠️  No config found for: ${file}`);
      continue;
    }
    
    // Parse markdown
    const parsedData = parseMarkdown(content, countryConfig.name.en);
    
    // Merge with config
    const countryData: CountryData = {
      ...countryConfig,
      metrics: {
        ...countryConfig.metrics,
        ...parsedData.metrics
      },
      fullData: parsedData.fullData!
    };
    
    // Write JSON file
    const outputPath = path.join(outputDir, `${countryData.id}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(countryData, null, 2));
    console.log(`✅ Generated: ${outputPath}`);
  }
  
  // Generate index file
  const indexPath = path.join(outputDir, 'index.json');
  const countries = Object.values(config).map((c: any) => ({
    id: c.id,
    name: c.name,
    flag: c.flag,
    region: c.region,
    economy: c.economy,
    file: c.file
  }));
  fs.writeFileSync(indexPath, JSON.stringify(countries, null, 2));
  console.log(`✅ Generated: ${indexPath}`);
}
