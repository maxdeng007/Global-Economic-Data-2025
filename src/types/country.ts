// Country data types
export interface CountryName {
  zh: string;
  en: string;
}

export interface CountryMetrics {
  salary: string;
  salaryRaw: number;
  household: string;
  householdRaw: number;
  gdpPerCapita: string;
  gdpPerCapitaRaw: number;
  gdpGrowth: string;
  currency: string;
  population: string;
}

export interface Country {
  id: string;
  name: CountryName;
  flag: string;
  file: string;
  region: RegionType;
  economy: EconomyType;
  comingSoon?: boolean;
  metrics: CountryMetrics;
}

export type RegionType = 
  | 'asia-pacific' 
  | 'europe' 
  | 'americas' 
  | 'middle-east'
  | 'africa';

export type EconomyType = 
  | 'g1' 
  | 'g2' 
  | 'g3' 
  | 'g4' 
  | 'g5' 
  | 'g7' 
  | 'g20' 
  | 'advanced'
  | 'developed' 
  | 'emerging' 
  | 'developing';

export interface RegionLabels {
  [key: string]: { zh: string; en: string };
}

export const REGION_LABELS: RegionLabels = {
  'all': { zh: '全部地区', en: 'All Regions' },
  'asia-pacific': { zh: '亚太地区', en: 'Asia Pacific' },
  'europe': { zh: '欧洲', en: 'Europe' },
  'americas': { zh: '美洲', en: 'Americas' },
  'middle-east': { zh: '中东及其他', en: 'Middle East & Others' }
};

export interface EconomyLabels {
  [key: string]: { zh: string; en: string };
}

export const ECONOMY_LABELS: EconomyLabels = {
  'all': { zh: '全部类型', en: 'All Types' },
  'g1': { zh: '超级大国', en: 'Superpower' },
  'g2': { zh: '第二大经济体', en: '2nd Largest Economy' },
  'g3': { zh: '第三大经济体', en: '3rd Largest Economy' },
  'g4': { zh: '第四大经济体', en: '4th Largest Economy' },
  'g5': { zh: '第五大经济体', en: '5th Largest Economy' },
  'g7': { zh: 'G7成员国', en: 'G7 Member' },
  'g20': { zh: 'G20成员国', en: 'G20 Member' },
  'developed': { zh: '发达国家', en: 'Developed' },
  'emerging': { zh: '新兴市场', en: 'Emerging Market' },
  'developing': { zh: '发展中国家', en: 'Developing' }
};

// Currency conversion rates to USD
export const CURRENCY_RATES_USD: { [key: string]: number } = {
  'USD': 1,
  'EUR': 1.08,
  'GBP': 1.27,
  'JPY': 0.0065,
  'CNY': 0.14,
  'INR': 0.012,
  'KRW': 0.00072,
  'AUD': 0.65,
  'CAD': 0.74,
  'CHF': 1.13,
  'SGD': 0.75,
  'THB': 0.029,
  'MXN': 0.058,
  'BRL': 0.20,
  'RUB': 0.011,
  'UAH': 0.025,
  'ILS': 0.27,
  'VND': 0.000041,
  'SEK': 0.092,
  'NOK': 0.092,
  'DKK': 0.15,  // Danish Krone
  'TRY': 0.028, // Turkish Lira
  '€': 1.08,
  '£': 1.27,
  '¥': 0.0065,
  '₹': 0.012,
  '₩': 0.00072
};

export function convertToUSD(value: number, currency: string): number {
  const rate = CURRENCY_RATES_USD[currency] || 1;
  return Math.round(value * rate);
}

export function formatUSD(value: number): string {
  if (value >= 1000000) {
    return '$' + (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return '$' + Math.round(value / 1000) + 'K';
  }
  return '$' + value;
}
