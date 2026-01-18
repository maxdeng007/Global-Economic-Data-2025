import type { Country } from '../types/country';

export const COUNTRIES_DATA: Country[] = [
  {
    id: 'australia',
    name: { zh: '澳大利亚', en: 'Australia' },
    flag: '🇦🇺',
    file: 'Australia-around-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '$75,000',
      salaryRaw: 75000,
      household: '$95,000',
      householdRaw: 95000,
      gdpPerCapita: '$65,000',
      gdpPerCapitaRaw: 65000,
      gdpGrowth: '2%',
      currency: '$',
      population: '27M'
    }
  },
  {
    id: 'austria',
    name: { zh: '奥地利', en: 'Austria' },
    flag: '🇦🇹',
    file: 'Austria-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '€55,678',
      salaryRaw: 55678,
      household: '€48,000',
      householdRaw: 48000,
      gdpPerCapita: '$62,000',
      gdpPerCapitaRaw: 62000,
      gdpGrowth: '0.8%',
      currency: '€',
      population: '9M'
    }
  },
  {
    id: 'belgium',
    name: { zh: '比利时', en: 'Belgium' },
    flag: '🇧🇪',
    file: 'Belgium-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '€44,736',
      salaryRaw: 44736,
      household: '€49,000',
      householdRaw: 49000,
      gdpPerCapita: '$60,700',
      gdpPerCapitaRaw: 60700,
      gdpGrowth: '1.1%',
      currency: '€',
      population: '12M'
    }
  },
  {
    id: 'brazil',
    name: { zh: '巴西', en: 'Brazil' },
    flag: '🇧🇷',
    file: 'Brazil-around-2025-Economic-Report.html',
    region: 'americas',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$12,000',
      salaryRaw: 12000,
      household: '$15,000',
      householdRaw: 15000,
      gdpPerCapita: '$10,000',
      gdpPerCapitaRaw: 10000,
      gdpGrowth: '2%',
      currency: '$',
      population: '220M'
    }
  },
  {
    id: 'canada',
    name: { zh: '加拿大', en: 'Canada' },
    flag: '🇨🇦',
    file: 'Canada-around-2025-Economic-Report.html',
    region: 'americas',
    economy: 'g7',
    comingSoon: false,
    metrics: {
      salary: '$60,000',
      salaryRaw: 60000,
      household: '$74,200',
      householdRaw: 74200,
      gdpPerCapita: '$57,000',
      gdpPerCapitaRaw: 57000,
      gdpGrowth: '1.2%',
      currency: '$',
      population: '40M'
    }
  },
  {
    id: 'chile',
    name: { zh: '智利', en: 'Chile' },
    flag: '🇨🇱',
    file: 'Chile-around-2025-Economic-Report.html',
    region: 'americas',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$18,000',
      salaryRaw: 18000,
      household: '$25,000',
      householdRaw: 25000,
      gdpPerCapita: '$16,000',
      gdpPerCapitaRaw: 16000,
      gdpGrowth: '2.4%',
      currency: '$',
      population: '20M'
    }
  },
  {
    id: 'china',
    name: { zh: '中国', en: 'China' },
    flag: '🇨🇳',
    file: 'China-around-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'g2',
    comingSoon: false,
    metrics: {
      salary: '$12,000',
      salaryRaw: 12000,
      household: '$15,000',
      householdRaw: 15000,
      gdpPerCapita: '$12,500',
      gdpPerCapitaRaw: 12500,
      gdpGrowth: '5%',
      currency: '$',
      population: '1400M'
    }
  },
  {
    id: 'colombia',
    name: { zh: '哥伦比亚', en: 'Colombia' },
    flag: '🇨🇴',
    file: 'Colombia-around-2025-Economic-Report.html',
    region: 'americas',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$9,000',
      salaryRaw: 9000,
      household: '$12,000',
      householdRaw: 12000,
      gdpPerCapita: '$6,500',
      gdpPerCapitaRaw: 6500,
      gdpGrowth: '2.5%',
      currency: '$',
      population: '52M'
    }
  },
  {
    id: 'denmark',
    name: { zh: '丹麦', en: 'Denmark' },
    flag: '🇩🇰',
    file: 'Denmark-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '45,000 DKK',
      salaryRaw: 45000,
      household: '400,000 DKK',
      householdRaw: 400000,
      gdpPerCapita: '$68,000',
      gdpPerCapitaRaw: 68000,
      gdpGrowth: '2%',
      currency: 'DKK',
      population: '6M'
    }
  },
  {
    id: 'egypt',
    name: { zh: '埃及', en: 'Egypt' },
    flag: '🇪🇬',
    file: 'Egypt-around-2025-Economic-Report.html',
    region: 'africa',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$5,000',
      salaryRaw: 5000,
      household: '$7,000',
      householdRaw: 7000,
      gdpPerCapita: '$4,000',
      gdpPerCapitaRaw: 4000,
      gdpGrowth: '4.5%',
      currency: '$',
      population: '115M'
    }
  },
  {
    id: 'finland',
    name: { zh: '芬兰', en: 'Finland' },
    flag: '🇫🇮',
    file: 'Finland-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '€43,332',
      salaryRaw: 43332,
      household: '€45,000',
      householdRaw: 45000,
      gdpPerCapita: '$56,000',
      gdpPerCapitaRaw: 56000,
      gdpGrowth: '1.3%',
      currency: '€',
      population: '6M'
    }
  },
  {
    id: 'france',
    name: { zh: '法国', en: 'France' },
    flag: '🇫🇷',
    file: 'France-Economic-Report.html',
    region: 'europe',
    economy: 'g7',
    comingSoon: false,
    metrics: {
      salary: '€35,000',
      salaryRaw: 35000,
      household: '€42,500',
      householdRaw: 42500,
      gdpPerCapita: '$45,000',
      gdpPerCapitaRaw: 45000,
      gdpGrowth: '1%',
      currency: '€',
      population: '69M'
    }
  },
  {
    id: 'germany',
    name: { zh: '德国', en: 'Germany' },
    flag: '🇩🇪',
    file: 'Germany-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g4',
    comingSoon: false,
    metrics: {
      salary: '€45,800',
      salaryRaw: 45800,
      household: '€65,300',
      householdRaw: 65300,
      gdpPerCapita: '$59,600',
      gdpPerCapitaRaw: 59600,
      gdpGrowth: '0.9%',
      currency: '€',
      population: '84M'
    }
  },
  {
    id: 'india',
    name: { zh: '印度', en: 'India' },
    flag: '🇮🇳',
    file: 'India-around-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '₹384,000',
      salaryRaw: 384000,
      household: '₹250,000',
      householdRaw: 250000,
      gdpPerCapita: '$2,500',
      gdpPerCapitaRaw: 2500,
      gdpGrowth: '6.5%',
      currency: '₹',
      population: '1450M'
    }
  },
  {
    id: 'iraq',
    name: { zh: '伊拉克', en: 'Iraq' },
    flag: '🇮🇶',
    file: 'Iraq-around-2025-Economic-Report.html',
    region: 'middle-east',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$6,200',
      salaryRaw: 6200,
      household: '$7,000',
      householdRaw: 7000,
      gdpPerCapita: '$5,500',
      gdpPerCapitaRaw: 5500,
      gdpGrowth: '2.5%',
      currency: '$',
      population: '46M'
    }
  },
  {
    id: 'ireland',
    name: { zh: '爱尔兰', en: 'Ireland' },
    flag: '🇮🇪',
    file: 'Ireland-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '$55,000',
      salaryRaw: 55000,
      household: '$70,000',
      householdRaw: 70000,
      gdpPerCapita: '$100,000',
      gdpPerCapitaRaw: 100000,
      gdpGrowth: '4%',
      currency: '$',
      population: '5M'
    }
  },
  {
    id: 'israel',
    name: { zh: '以色列', en: 'Israel' },
    flag: '🇮🇱',
    file: 'Israel-around-2025-Economic-Report.html',
    region: 'middle-east',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '$36,000',
      salaryRaw: 36000,
      household: '$48,000',
      householdRaw: 48000,
      gdpPerCapita: '$60,000',
      gdpPerCapitaRaw: 60000,
      gdpGrowth: '3.5%',
      currency: '$',
      population: '10M'
    }
  },
  {
    id: 'italy',
    name: { zh: '意大利', en: 'Italy' },
    flag: '🇮🇹',
    file: 'Italy-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g7',
    comingSoon: false,
    metrics: {
      salary: '€37,500',
      salaryRaw: 37500,
      household: '€35,000',
      householdRaw: 35000,
      gdpPerCapita: '$43,000',
      gdpPerCapitaRaw: 43000,
      gdpGrowth: '0.5%',
      currency: '€',
      population: '59M'
    }
  },
  {
    id: 'japan',
    name: { zh: '日本', en: 'Japan' },
    flag: '🇯🇵',
    file: 'Japan-around-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'g3',
    comingSoon: false,
    metrics: {
      salary: '¥4,200,000',
      salaryRaw: 4200000,
      household: '¥7-8.5 million',
      householdRaw: 8500000,
      gdpPerCapita: '$34,800',
      gdpPerCapitaRaw: 34800,
      gdpGrowth: '1%',
      currency: '¥',
      population: '125M'
    }
  },
  {
    id: 'mexico',
    name: { zh: '墨西哥', en: 'Mexico' },
    flag: '🇲🇽',
    file: 'Mexico-around-2025-Economic-Report.html',
    region: 'americas',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$10,000',
      salaryRaw: 10000,
      household: '$13,000',
      householdRaw: 13000,
      gdpPerCapita: '$11,000',
      gdpPerCapitaRaw: 11000,
      gdpGrowth: '2%',
      currency: '$',
      population: '130M'
    }
  },
  {
    id: 'netherlands',
    name: { zh: '荷兰', en: 'Netherlands' },
    flag: '🇳🇱',
    file: 'Netherlands-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '€48,000',
      salaryRaw: 48000,
      household: '€37,000',
      householdRaw: 37000,
      gdpPerCapita: '$73,000',
      gdpPerCapitaRaw: 73000,
      gdpGrowth: '1.7%',
      currency: '€',
      population: '18M'
    }
  },
  {
    id: 'portugal',
    name: { zh: '葡萄牙', en: 'Portugal' },
    flag: '🇵🇹',
    file: 'Portugal-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '€22,000',
      salaryRaw: 22000,
      household: '€30,000',
      householdRaw: 30000,
      gdpPerCapita: '$28,000',
      gdpPerCapitaRaw: 28000,
      gdpGrowth: '2%',
      currency: '€',
      population: '10M'
    }
  },
  {
    id: 'russia',
    name: { zh: '俄罗斯', en: 'Russia' },
    flag: '🇷🇺',
    file: 'Russia-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$6,600',
      salaryRaw: 6600,
      household: '$9,000',
      householdRaw: 9000,
      gdpPerCapita: '$14,000',
      gdpPerCapitaRaw: 14000,
      gdpGrowth: '1.5%',
      currency: '$',
      population: '144M'
    }
  },
  {
    id: 'singapore',
    name: { zh: '新加坡', en: 'Singapore' },
    flag: '🇸🇬',
    file: 'Singapore-around-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '$60,000',
      salaryRaw: 60000,
      household: '$75,000',
      householdRaw: 75000,
      gdpPerCapita: '$88,000',
      gdpPerCapitaRaw: 88000,
      gdpGrowth: '3%',
      currency: '$',
      population: '6M'
    }
  },
  {
    id: 'south-korea',
    name: { zh: '韩国', en: 'South Korea' },
    flag: '🇰🇷',
    file: 'South-Korea-around-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '₩42,000,000',
      salaryRaw: 42000000,
      household: '₩41,300,000',
      householdRaw: 41300000,
      gdpPerCapita: '$36,000',
      gdpPerCapitaRaw: 36000,
      gdpGrowth: '0.9%',
      currency: '₩',
      population: '52M'
    }
  },
  {
    id: 'spain',
    name: { zh: '西班牙', en: 'Spain' },
    flag: '🇪🇸',
    file: 'Spain-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '$35,000',
      salaryRaw: 35000,
      household: '$42,000',
      householdRaw: 42000,
      gdpPerCapita: '$35,000',
      gdpPerCapitaRaw: 35000,
      gdpGrowth: '2%',
      currency: '$',
      population: '48M'
    }
  },
  {
    id: 'sweden',
    name: { zh: '瑞典', en: 'Sweden' },
    flag: '🇸🇪',
    file: 'Sweden-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '$50,000',
      salaryRaw: 50000,
      household: '$60,000',
      householdRaw: 60000,
      gdpPerCapita: '$55,000',
      gdpPerCapitaRaw: 55000,
      gdpGrowth: '1.5%',
      currency: '$',
      population: '11M'
    }
  },
  {
    id: 'switzerland',
    name: { zh: '瑞士', en: 'Switzerland' },
    flag: '🇨🇭',
    file: 'Switzerland-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: 'CHF 90,000',
      salaryRaw: 90000,
      household: 'CHF 126,000',
      householdRaw: 126000,
      gdpPerCapita: '$98,000',
      gdpPerCapitaRaw: 98000,
      gdpGrowth: '1.5%',
      currency: 'CHF',
      population: '9M'
    }
  },
  {
    id: 'thailand',
    name: { zh: '泰国', en: 'Thailand' },
    flag: '🇹🇭',
    file: 'Thailand-around-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$5,500',
      salaryRaw: 5500,
      household: '$9,000',
      householdRaw: 9000,
      gdpPerCapita: '$7,500',
      gdpPerCapitaRaw: 7500,
      gdpGrowth: '3%',
      currency: '$',
      population: '72M'
    }
  },
  {
    id: 'turkey',
    name: { zh: '土耳其', en: 'Turkey' },
    flag: '🇹🇷',
    file: 'Turkey-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '34,900 TRY',
      salaryRaw: 34900,
      household: '150,000 TRY',
      householdRaw: 150000,
      gdpPerCapita: '$14,000',
      gdpPerCapitaRaw: 14000,
      gdpGrowth: '3.5%',
      currency: 'TRY',
      population: '86M'
    }
  },
  {
    id: 'ukraine',
    name: { zh: '乌克兰', en: 'Ukraine' },
    flag: '🇺🇦',
    file: 'Ukraine-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$7,800',
      salaryRaw: 7800,
      household: '$6,630',
      householdRaw: 6630,
      gdpPerCapita: '$5,500',
      gdpPerCapitaRaw: 5500,
      gdpGrowth: '3.5%',
      currency: '$',
      population: '38M'
    }
  },
  {
    id: 'uae',
    name: { zh: '阿联酋', en: 'United Arab Emirates' },
    flag: '🇦🇪',
    file: 'United-Arab-Emirates-around-2025-Economic-Report.html',
    region: 'middle-east',
    economy: 'developed',
    comingSoon: false,
    metrics: {
      salary: '$42,000',
      salaryRaw: 42000,
      household: '$55,000',
      householdRaw: 55000,
      gdpPerCapita: '$55,000',
      gdpPerCapitaRaw: 55000,
      gdpGrowth: '4%',
      currency: '$',
      population: '10M'
    }
  },
  {
    id: 'uk',
    name: { zh: '英国', en: 'United Kingdom' },
    flag: '🇬🇧',
    file: 'UK-around-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g5',
    comingSoon: false,
    metrics: {
      salary: '£39,039',
      salaryRaw: 39039,
      household: '£36,700',
      householdRaw: 36700,
      gdpPerCapita: '$55,000',
      gdpPerCapitaRaw: 55000,
      gdpGrowth: '1.5%',
      currency: '£',
      population: '70M'
    }
  },
  {
    id: 'usa',
    name: { zh: '美国', en: 'United States' },
    flag: '🇺🇸',
    file: 'United-States-around-2025-Economic-Report.html',
    region: 'americas',
    economy: 'g1',
    comingSoon: false,
    metrics: {
      salary: '$63,000',
      salaryRaw: 63000,
      household: '$83,730',
      householdRaw: 83730,
      gdpPerCapita: '$90,000',
      gdpPerCapitaRaw: 90000,
      gdpGrowth: '2%',
      currency: '$',
      population: '341M'
    }
  },
  {
    id: 'vietnam',
    name: { zh: '越南', en: 'Vietnam' },
    flag: '🇻🇳',
    file: 'Vietnam-around-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'emerging',
    comingSoon: false,
    metrics: {
      salary: '$3,000',
      salaryRaw: 3000,
      household: '$9,700',
      householdRaw: 9700,
      gdpPerCapita: '$4,500',
      gdpPerCapitaRaw: 4500,
      gdpGrowth: '6.5%',
      currency: '$',
      population: '103M'
    }
  },
];
