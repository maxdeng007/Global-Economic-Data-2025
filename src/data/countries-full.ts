import type { Country } from '../types/country';

export interface CountryFullData extends Country {
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

export const COUNTRIES_FULL_DATA: CountryFullData[] = [
  {
    id: 'argentina',
    name: { zh: '阿根廷', en: 'Argentina' },
    flag: '🇦🇷',
    file: 'Argentina-2025-Economic-Report.html',
    region: 'americas',
    economy: 'emerging',
    metrics: {
      salary: '$560',
      salaryRaw: 560,
      household: '$1,185',
      householdRaw: 1185,
      gdpPerCapita: '$14,500',
      gdpPerCapitaRaw: 14500,
      gdpGrowth: '2.5%',
      currency: 'USD',
      population: '45.8M'
    },
    fullData: {
      salaryDetails: { median: '$560/month', mean: '$507/month', minimum: '$260/month', genderGap: '6.25%' },
      householdIncome: { median: '$1,185/month', perCapita: '$370/month', gini: '0.424', povertyRate: '31.6%' },
      gdp: { nominal: '$661B', ppp: '$32,820', growth: '4.5%', inflation: '31%', unemployment: '6.6%' },
      costOfLiving: { overall: 28, rent: 18, groceries: 25, utilities: 15, transportation: 22, lifestyle: 35 },
      employment: { rate: '6.6%', laborForce: '45%', youthUnemployment: '18%', employmentGrowth: '2.1%' },
      benchmarks: { lowIncome: '< $300/month', middleIncome: '$300-800/month', highIncome: '> $1,200/month' }
    }
  },
  {
    id: 'usa',
    name: { zh: '美国', en: 'United States' },
    flag: '🇺🇸',
    file: 'USA-2025-Economic-Report.html',
    region: 'americas',
    economy: 'g1',
    metrics: {
      salary: '$76,400',
      salaryRaw: 76400,
      household: '$83,700',
      householdRaw: 83700,
      gdpPerCapita: '$89,000',
      gdpPerCapitaRaw: 89000,
      gdpGrowth: '2.9%',
      currency: 'USD',
      population: '331M'
    },
    fullData: {
      salaryDetails: { median: '$63,128/year', mean: '$65,700/year', minimum: '$15,080/year', genderGap: '19%' },
      householdIncome: { median: '$83,730/year', perCapita: '$32,200/year', gini: '0.488', povertyRate: '10.6%' },
      gdp: { nominal: '$30.62T', ppp: '$89,000', growth: '2.0%', inflation: '2.7%', unemployment: '4.0%' },
      costOfLiving: { overall: 85, rent: 78, groceries: 72, utilities: 65, transportation: 70, lifestyle: 90 },
      employment: { rate: '4.0%', laborForce: '62%', youthUnemployment: '11%', employmentGrowth: '1.2%' },
      benchmarks: { lowIncome: '< $30,000', middleIncome: '$30,000-80,000', highIncome: '> $80,000' }
    }
  },
  {
    id: 'china',
    name: { zh: '中国', en: 'China' },
    flag: '🇨🇳',
    file: 'China-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'g2',
    metrics: {
      salary: '¥110,000',
      salaryRaw: 110000,
      household: '¥46,000',
      householdRaw: 46000,
      gdpPerCapita: '$12,500',
      gdpPerCapitaRaw: 12500,
      gdpGrowth: '4.8%',
      currency: 'CNY',
      population: '1.412B'
    },
    fullData: {
      salaryDetails: { median: '¥85,700/year', mean: '¥73,000/year', minimum: '¥25,200/year', genderGap: '24%' },
      householdIncome: { median: '¥101,800/year', perCapita: '¥36,372/year', gini: '0.465', povertyRate: '0.1%' },
      gdp: { nominal: '$18T', ppp: '$28,000', growth: '4.8%', inflation: '0.5%', unemployment: '5.3%' },
      costOfLiving: { overall: 42, rent: 48, groceries: 38, utilities: 22, transportation: 32, lifestyle: 45 },
      employment: { rate: '5.3%', laborForce: '62%', youthUnemployment: '15%', employmentGrowth: '0.8%' },
      benchmarks: { lowIncome: '< ¥50,000', middleIncome: '¥50,000-150,000', highIncome: '> ¥150,000' }
    }
  },
  {
    id: 'japan',
    name: { zh: '日本', en: 'Japan' },
    flag: '🇯🇵',
    file: 'Japan-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'g3',
    metrics: {
      salary: '¥5,100,000',
      salaryRaw: 5100000,
      household: '¥5,800,000',
      householdRaw: 5800000,
      gdpPerCapita: '$34,000',
      gdpPerCapitaRaw: 34000,
      gdpGrowth: '1.0%',
      currency: 'JPY',
      population: '125M'
    },
    fullData: {
      salaryDetails: { median: '¥4,000,000/year', mean: '¥4,180,000/year', minimum: '¥2,016,000/year', genderGap: '22%' },
      householdIncome: { median: '¥7,200,000/year', perCapita: '¥3,000,000/year', gini: '0.33', povertyRate: '16%' },
      gdp: { nominal: '$4.28T', ppp: '$51,800', growth: '0.6%', inflation: '0.7%', unemployment: '2.5%' },
      costOfLiving: { overall: 75, rent: 62, groceries: 68, utilities: 55, transportation: 58, lifestyle: 80 },
      employment: { rate: '2.5%', laborForce: '62%', youthUnemployment: '5%', employmentGrowth: '0.3%' },
      benchmarks: { lowIncome: '< ¥3M', middleIncome: '¥3M-6M', highIncome: '> ¥6M' }
    }
  },
  {
    id: 'germany',
    name: { zh: '德国', en: 'Germany' },
    flag: '🇩🇪',
    file: 'Germany-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g4',
    metrics: {
      salary: '€45,800',
      salaryRaw: 45800,
      household: '€65,300',
      householdRaw: 65300,
      gdpPerCapita: '$52,700',
      gdpPerCapitaRaw: 52700,
      gdpGrowth: '0.9%',
      currency: 'EUR',
      population: '84.4M'
    },
    fullData: {
      salaryDetails: { median: '€45,800/year', mean: '€55,608/year', minimum: '€26,760/year', genderGap: '18%' },
      householdIncome: { median: '€65,300/year', perCapita: '€31,856/year', gini: '0.295', povertyRate: '15.5%' },
      gdp: { nominal: '$4.43T', ppp: '$63,000', growth: '0.9%', inflation: '2.2%', unemployment: '3.0%' },
      costOfLiving: { overall: 72, rent: 65, groceries: 62, utilities: 58, transportation: 65, lifestyle: 75 },
      employment: { rate: '3.0%', laborForce: '60%', youthUnemployment: '6%', employmentGrowth: '0.4%' },
      benchmarks: { lowIncome: '< €30,000', middleIncome: '€30,000-60,000', highIncome: '> €60,000' }
    }
  },
  {
    id: 'uk',
    name: { zh: '英国', en: 'United Kingdom' },
    flag: '🇬🇧',
    file: 'UK-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g5',
    metrics: {
      salary: '£37,000',
      salaryRaw: 37000,
      household: '£61,000',
      householdRaw: 61000,
      gdpPerCapita: '$46,000',
      gdpPerCapitaRaw: 46000,
      gdpGrowth: '1.1%',
      currency: 'GBP',
      population: '67M'
    },
    fullData: {
      salaryDetails: { median: '£39,039/year', mean: '£38,428/year', minimum: '£21,000/year', genderGap: '17%' },
      householdIncome: { median: '£36,700/year', perCapita: '£15,620/year', gini: '0.329', povertyRate: '18%' },
      gdp: { nominal: '$3.04T', ppp: '$54,000', growth: '1.5%', inflation: '2.3%', unemployment: '4.0%' },
      costOfLiving: { overall: 78, rent: 82, groceries: 68, utilities: 62, transportation: 72, lifestyle: 82 },
      employment: { rate: '4.0%', laborForce: '63%', youthUnemployment: '12%', employmentGrowth: '0.8%' },
      benchmarks: { lowIncome: '< £25,000', middleIncome: '£25,000-50,000', highIncome: '> £50,000' }
    }
  },
  {
    id: 'india',
    name: { zh: '印度', en: 'India' },
    flag: '🇮🇳',
    file: 'India-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'g20',
    metrics: {
      salary: '₹120,000',
      salaryRaw: 120000,
      household: '₹250,000',
      householdRaw: 250000,
      gdpPerCapita: '$2,400',
      gdpPerCapitaRaw: 2400,
      gdpGrowth: '6.5%',
      currency: 'INR',
      population: '1.428B'
    },
    fullData: {
      salaryDetails: { median: '₹360,000/year', mean: '₹360,000/year', minimum: '₹64,000/year', genderGap: '28%' },
      householdIncome: { median: '₹220,000/year', perCapita: '₹54,000/year', gini: '0.36', povertyRate: '5%' },
      gdp: { nominal: '$4.5T', ppp: '$13,000', growth: '6.2%', inflation: '4.0%', unemployment: '4.7%' },
      costOfLiving: { overall: 22, rent: 18, groceries: 28, utilities: 12, transportation: 18, lifestyle: 22 },
      employment: { rate: '4.7%', laborForce: '52%', youthUnemployment: '13%', employmentGrowth: '3.5%' },
      benchmarks: { lowIncome: '< ₹100,000', middleIncome: '₹100,000-300,000', highIncome: '> ₹300,000' }
    }
  },
  {
    id: 'brazil',
    name: { zh: '巴西', en: 'Brazil' },
    flag: '🇧🇷',
    file: 'Brazil-2025-Economic-Report.html',
    region: 'americas',
    economy: 'g20',
    metrics: {
      salary: '$15,000',
      salaryRaw: 15000,
      household: '$24,000',
      householdRaw: 24000,
      gdpPerCapita: '$10,000',
      gdpPerCapitaRaw: 10000,
      gdpGrowth: '2.0%',
      currency: 'BRL',
      population: '214M'
    },
    fullData: {
      salaryDetails: { median: 'R$39,100/year', mean: 'R$42,300/year', minimum: 'R$18,216/year', genderGap: '21%' },
      householdIncome: { median: 'R$30,000/year', perCapita: 'R$12,000/year', gini: '0.52', povertyRate: '27%' },
      gdp: { nominal: '$2.2T', ppp: '$24,000', growth: '2.4%', inflation: '4.3%', unemployment: '5.4%' },
      costOfLiving: { overall: 38, rent: 28, groceries: 35, utilities: 25, transportation: 32, lifestyle: 42 },
      employment: { rate: '5.4%', laborForce: '62%', youthUnemployment: '20%', employmentGrowth: '1.8%' },
      benchmarks: { lowIncome: '< R$15,000', middleIncome: 'R$15,000-35,000', highIncome: '> R$35,000' }
    }
  },
  {
    id: 'australia',
    name: { zh: '澳大利亚', en: 'Australia' },
    flag: '🇦🇺',
    file: 'Australia-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'g20',
    metrics: {
      salary: '$85,000',
      salaryRaw: 85000,
      household: '$112,000',
      householdRaw: 112000,
      gdpPerCapita: '$65,000',
      gdpPerCapitaRaw: 65000,
      gdpGrowth: '2.1%',
      currency: 'AUD',
      population: '26.6M'
    },
    fullData: {
      salaryDetails: { median: '$74,100/year', mean: '$104,500/year', minimum: '$49,300/year', genderGap: '6%' },
      householdIncome: { median: '$95,000/year', perCapita: '$36,500/year', gini: '0.325', povertyRate: '14.2%' },
      gdp: { nominal: '$1.85T', ppp: '$73,000', growth: '2.1%', inflation: '3.4%', unemployment: '4.3%' },
      costOfLiving: { overall: 78, rent: 72, groceries: 65, utilities: 58, transportation: 68, lifestyle: 82 },
      employment: { rate: '4.3%', laborForce: '65%', youthUnemployment: '11%', employmentGrowth: '1.5%' },
      benchmarks: { lowIncome: '< $50,000', middleIncome: '$50,000-100,000', highIncome: '> $100,000' }
    }
  },
  {
    id: 'canada',
    name: { zh: '加拿大', en: 'Canada' },
    flag: '🇨🇦',
    file: 'Canada-2025-Economic-Report.html',
    region: 'americas',
    economy: 'g7',
    metrics: {
      salary: '$71,000',
      salaryRaw: 71000,
      household: '$93,000',
      householdRaw: 93000,
      gdpPerCapita: '$55,000',
      gdpPerCapitaRaw: 55000,
      gdpGrowth: '1.8%',
      currency: 'CAD',
      population: '39.2M'
    },
    fullData: {
      salaryDetails: { median: '$58,000/year', mean: '$66,600/year', minimum: '$36,900/year', genderGap: '12.6%' },
      householdIncome: { median: '$74,200/year', perCapita: '$30,300/year', gini: '0.30', povertyRate: '10.9%' },
      gdp: { nominal: '$2.28T', ppp: '$65,500', growth: '1.2%', inflation: '2.2%', unemployment: '6.5%' },
      costOfLiving: { overall: 72, rent: 68, groceries: 62, utilities: 55, transportation: 62, lifestyle: 75 },
      employment: { rate: '6.5%', laborForce: '65%', youthUnemployment: '13%', employmentGrowth: '0.8%' },
      benchmarks: { lowIncome: '< $40,000', middleIncome: '$40,000-74,000', highIncome: '> $74,000' }
    }
  },
  {
    id: 'france',
    name: { zh: '法国', en: 'France' },
    flag: '🇫🇷',
    file: 'France-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g7',
    metrics: {
      salary: '€43,000',
      salaryRaw: 43000,
      household: '€65,000',
      householdRaw: 65000,
      gdpPerCapita: '$44,000',
      gdpPerCapitaRaw: 44000,
      gdpGrowth: '1.1%',
      currency: 'EUR',
      population: '68M'
    },
    fullData: {
      salaryDetails: { median: '€42,800/year', mean: '€43,224/year', minimum: '€21,000/year', genderGap: '15%' },
      householdIncome: { median: '€56,800/year', perCapita: '€25,557/year', gini: '0.30', povertyRate: '15.9%' },
      gdp: { nominal: '$3.15T', ppp: '$61,000', growth: '0.9%', inflation: '0.9%', unemployment: '7.5%' },
      costOfLiving: { overall: 70, rent: 65, groceries: 68, utilities: 55, transportation: 60, lifestyle: 72 },
      employment: { rate: '7.5%', laborForce: '57%', youthUnemployment: '18%', employmentGrowth: '0.5%' },
      benchmarks: { lowIncome: '< €25,000', middleIncome: '€25,000-55,000', highIncome: '> €55,000' }
    }
  },
  {
    id: 'italy',
    name: { zh: '意大利', en: 'Italy' },
    flag: '🇮🇹',
    file: 'Italy-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g7',
    metrics: {
      salary: '€37,000',
      salaryRaw: 37000,
      household: '€57,000',
      householdRaw: 57000,
      gdpPerCapita: '$38,000',
      gdpPerCapitaRaw: 38000,
      gdpGrowth: '0.7%',
      currency: 'EUR',
      population: '58.9M'
    },
    fullData: {
      salaryDetails: { median: '€35,000/year', mean: '€38,000/year', minimum: '€21,000/year', genderGap: '12%' },
      householdIncome: { median: '€52,000/year', perCapita: '€22,000/year', gini: '0.33', povertyRate: '20%' },
      gdp: { nominal: '$2.2T', ppp: '$49,000', growth: '0.7%', inflation: '1.8%', unemployment: '7.6%' },
      costOfLiving: { overall: 65, rent: 55, groceries: 62, utilities: 50, transportation: 55, lifestyle: 68 },
      employment: { rate: '7.6%', laborForce: '52%', youthUnemployment: '24%', employmentGrowth: '0.3%' },
      benchmarks: { lowIncome: '< €22,000', middleIncome: '€22,000-45,000', highIncome: '> €45,000' }
    }
  },
  {
    id: 'south-korea',
    name: { zh: '韩国', en: 'South Korea' },
    flag: '🇰🇷',
    file: 'South-Korea-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'g20',
    metrics: {
      salary: '₩43,000,000',
      salaryRaw: 43000000,
      household: '₩57,000,000',
      householdRaw: 57000000,
      gdpPerCapita: '$35,000',
      gdpPerCapitaRaw: 35000,
      gdpGrowth: '2.4%',
      currency: 'KRW',
      population: '51.7M'
    },
    fullData: {
      salaryDetails: { median: '₩43,000,000/year', mean: '₩48,000,000/year', minimum: '₩20,000,000/year', genderGap: '31%' },
      householdIncome: { median: '₩57,000,000/year', perCapita: '₩23,000,000/year', gini: '0.31', povertyRate: '15%' },
      gdp: { nominal: '$1.7T', ppp: '$49,000', growth: '2.4%', inflation: '2.5%', unemployment: '3.0%' },
      costOfLiving: { overall: 68, rent: 72, groceries: 58, utilities: 52, transportation: 58, lifestyle: 72 },
      employment: { rate: '3.0%', laborForce: '62%', youthUnemployment: '10%', employmentGrowth: '1.2%' },
      benchmarks: { lowIncome: '< ₩30M', middleIncome: '₩30M-60M', highIncome: '> ₩60M' }
    }
  },
  {
    id: 'mexico',
    name: { zh: '墨西哥', en: 'Mexico' },
    flag: '🇲🇽',
    file: 'Mexico-2025-Economic-Report.html',
    region: 'americas',
    economy: 'g20',
    metrics: {
      salary: '$13,000',
      salaryRaw: 13000,
      household: '$22,000',
      householdRaw: 22000,
      gdpPerCapita: '$11,000',
      gdpPerCapitaRaw: 11000,
      gdpGrowth: '2.3%',
      currency: 'MXN',
      population: '128M'
    },
    fullData: {
      salaryDetails: { median: '$13,000/year', mean: '$15,000/year', minimum: '$6,000/year', genderGap: '16%' },
      householdIncome: { median: '$22,000/year', perCapita: '$7,000/year', gini: '0.45', povertyRate: '36%' },
      gdp: { nominal: '$1.5T', ppp: '$21,000', growth: '2.3%', inflation: '3.8%', unemployment: '2.8%' },
      costOfLiving: { overall: 35, rent: 28, groceries: 32, utilities: 22, transportation: 30, lifestyle: 38 },
      employment: { rate: '2.8%', laborForce: '60%', youthUnemployment: '8%', employmentGrowth: '1.5%' },
      benchmarks: { lowIncome: '< $10,000', middleIncome: '$10,000-25,000', highIncome: '> $25,000' }
    }
  },
  {
    id: 'indonesia',
    name: { zh: '印度尼西亚', en: 'Indonesia' },
    flag: '🇮🇩',
    file: 'Indonesia-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'g20',
    metrics: {
      salary: 'Rp 180,000,000',
      salaryRaw: 180000000,
      household: 'Rp 350,000,000',
      householdRaw: 350000000,
      gdpPerCapita: '$4,800',
      gdpPerCapitaRaw: 4800,
      gdpGrowth: '5.0%',
      currency: 'IDR',
      population: '275M'
    },
    fullData: {
      salaryDetails: { median: 'Rp 180M/year', mean: 'Rp 220M/year', minimum: 'Rp 60M/year', genderGap: '23%' },
      householdIncome: { median: 'Rp 350M/year', perCapita: 'Rp 100M/year', gini: '0.38', povertyRate: '9.5%' },
      gdp: { nominal: '$1.3T', ppp: '$13,000', growth: '5.0%', inflation: '3.2%', unemployment: '6.0%' },
      costOfLiving: { overall: 32, rent: 28, groceries: 35, utilities: 20, transportation: 28, lifestyle: 35 },
      employment: { rate: '6.0%', laborForce: '65%', youthUnemployment: '14%', employmentGrowth: '2.5%' },
      benchmarks: { lowIncome: '< Rp 100M', middleIncome: 'Rp 100M-300M', highIncome: '> Rp 300M' }
    }
  },
  {
    id: 'saudi-arabia',
    name: { zh: '沙特阿拉伯', en: 'Saudi Arabia' },
    flag: '🇸🇦',
    file: 'Saudi-Arabia-2025-Economic-Report.html',
    region: 'middle-east',
    economy: 'g20',
    metrics: {
      salary: '$30,000',
      salaryRaw: 30000,
      household: '$55,000',
      householdRaw: 55000,
      gdpPerCapita: '$32,000',
      gdpPerCapitaRaw: 32000,
      gdpGrowth: '3.2%',
      currency: 'SAR',
      population: '36M'
    },
    fullData: {
      salaryDetails: { median: '$30,000/year', mean: '$35,000/year', minimum: '$12,000/year', genderGap: '25%' },
      householdIncome: { median: '$55,000/year', perCapita: '$15,000/year', gini: '0.45', povertyRate: '12%' },
      gdp: { nominal: '$1.1T', ppp: '$52,000', growth: '3.2%', inflation: '2.0%', unemployment: '5.5%' },
      costOfLiving: { overall: 62, rent: 65, groceries: 52, utilities: 35, transportation: 48, lifestyle: 68 },
      employment: { rate: '5.5%', laborForce: '62%', youthUnemployment: '12%', employmentGrowth: '2.0%' },
      benchmarks: { lowIncome: '< $20,000', middleIncome: '$20,000-50,000', highIncome: '> $50,000' }
    }
  },
  {
    id: 'turkey',
    name: { zh: '土耳其', en: 'Turkey' },
    flag: '🇹🇷',
    file: 'Turkey-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g20',
    metrics: {
      salary: '₺ 420,000',
      salaryRaw: 420000,
      household: '₺ 680,000',
      householdRaw: 680000,
      gdpPerCapita: '$11,500',
      gdpPerCapitaRaw: 11500,
      gdpGrowth: '3.5%',
      currency: 'TRY',
      population: '85M'
    },
    fullData: {
      salaryDetails: { median: '₺ 420,000/year', mean: '₺ 550,000/year', minimum: '₺ 200,000/year', genderGap: '14%' },
      householdIncome: { median: '₺ 680,000/year', perCapita: '₺ 180,000/year', gini: '0.42', povertyRate: '14%' },
      gdp: { nominal: '$1.0T', ppp: '$32,000', growth: '3.5%', inflation: '45%', unemployment: '10%' },
      costOfLiving: { overall: 35, rent: 28, groceries: 38, utilities: 22, transportation: 30, lifestyle: 38 },
      employment: { rate: '10%', laborForce: '52%', youthUnemployment: '22%', employmentGrowth: '1.8%' },
      benchmarks: { lowIncome: '< ₺ 300K', middleIncome: '₺ 300K-700K', highIncome: '> ₺ 700K' }
    }
  },
  {
    id: 'russia',
    name: { zh: '俄罗斯', en: 'Russia' },
    flag: '🇷🇺',
    file: 'Russia-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g20',
    metrics: {
      salary: '$18,000',
      salaryRaw: 18000,
      household: '$32,000',
      householdRaw: 32000,
      gdpPerCapita: '$12,000',
      gdpPerCapitaRaw: 12000,
      gdpGrowth: '1.2%',
      currency: 'RUB',
      population: '144M'
    },
    fullData: {
      salaryDetails: { median: '$18,000/year', mean: '$22,000/year', minimum: '$8,000/year', genderGap: '27%' },
      householdIncome: { median: '$32,000/year', perCapita: '$11,000/year', gini: '0.39', povertyRate: '12%' },
      gdp: { nominal: '$1.8T', ppp: '$31,000', growth: '1.2%', inflation: '7%', unemployment: '3%' },
      costOfLiving: { overall: 42, rent: 32, groceries: 38, utilities: 28, transportation: 35, lifestyle: 45 },
      employment: { rate: '3%', laborForce: '62%', youthUnemployment: '8%', employmentGrowth: '0.5%' },
      benchmarks: { lowIncome: '< $15,000', middleIncome: '$15,000-35,000', highIncome: '> $35,000' }
    }
  },
  {
    id: 'south-africa',
    name: { zh: '南非', en: 'South Africa' },
    flag: '🇿🇦',
    file: 'South-Africa-2025-Economic-Report.html',
    region: 'africa',
    economy: 'g20',
    metrics: {
      salary: '$12,000',
      salaryRaw: 12000,
      household: '$22,000',
      householdRaw: 22000,
      gdpPerCapita: '$6,800',
      gdpPerCapitaRaw: 6800,
      gdpGrowth: '1.8%',
      currency: 'ZAR',
      population: '60M'
    },
    fullData: {
      salaryDetails: { median: '$12,000/year', mean: '$15,000/year', minimum: '$4,000/year', genderGap: '30%' },
      householdIncome: { median: '$22,000/year', perCapita: '$6,000/year', gini: '0.63', povertyRate: '55%' },
      gdp: { nominal: '$400B', ppp: '$13,000', growth: '1.8%', inflation: '5.5%', unemployment: '32%' },
      costOfLiving: { overall: 28, rent: 18, groceries: 28, utilities: 22, transportation: 25, lifestyle: 32 },
      employment: { rate: '32%', laborForce: '55%', youthUnemployment: '52%', employmentGrowth: '0.5%' },
      benchmarks: { lowIncome: '< $8,000', middleIncome: '$8,000-20,000', highIncome: '> $20,000' }
    }
  },
  {
    id: 'uae',
    name: { zh: '阿联酋', en: 'UAE' },
    flag: '🇦🇪',
    file: 'UAE-2025-Economic-Report.html',
    region: 'middle-east',
    economy: 'developed',
    metrics: {
      salary: 'AED 250,000',
      salaryRaw: 250000,
      household: 'AED 420,000',
      householdRaw: 420000,
      gdpPerCapita: '$47,000',
      gdpPerCapitaRaw: 47000,
      gdpGrowth: '3.0%',
      currency: 'AED',
      population: '9.5M'
    },
    fullData: {
      salaryDetails: { median: 'AED 250,000/year', mean: 'AED 300,000/year', minimum: 'AED 72,000/year', genderGap: '20%' },
      householdIncome: { median: 'AED 420,000/year', perCapita: 'AED 120,000/year', gini: '0.32', povertyRate: '3%' },
      gdp: { nominal: '$450B', ppp: '$68,000', growth: '3.0%', inflation: '2.5%', unemployment: '4%' },
      costOfLiving: { overall: 72, rent: 78, groceries: 62, utilities: 45, transportation: 58, lifestyle: 78 },
      employment: { rate: '4%', laborForce: '70%', youthUnemployment: '10%', employmentGrowth: '2.5%' },
      benchmarks: { lowIncome: '< AED 150K', middleIncome: 'AED 150K-350K', highIncome: '> AED 350K' }
    }
  },
  {
    id: 'singapore',
    name: { zh: '新加坡', en: 'Singapore' },
    flag: '🇸🇬',
    file: 'Singapore-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'developed',
    metrics: {
      salary: '$84,000',
      salaryRaw: 84000,
      household: '$118,000',
      householdRaw: 118000,
      gdpPerCapita: '$88,000',
      gdpPerCapitaRaw: 88000,
      gdpGrowth: '2.6%',
      currency: 'SGD',
      population: '5.6M'
    },
    fullData: {
      salaryDetails: { median: '$84,000/year', mean: '$95,000/year', minimum: '$36,000/year', genderGap: '18%' },
      householdIncome: { median: '$118,000/year', perCapita: '$42,000/year', gini: '0.38', povertyRate: '5%' },
      gdp: { nominal: '$500B', ppp: '$131,000', growth: '2.6%', inflation: '1.8%', unemployment: '2.0%' },
      costOfLiving: { overall: 88, rent: 95, groceries: 72, utilities: 48, transportation: 68, lifestyle: 92 },
      employment: { rate: '2.0%', laborForce: '68%', youthUnemployment: '5%', employmentGrowth: '1.8%' },
      benchmarks: { lowIncome: '< $60,000', middleIncome: '$60,000-120,000', highIncome: '> $120,000' }
    }
  },
  {
    id: 'netherlands',
    name: { zh: '荷兰', en: 'Netherlands' },
    flag: '🇳🇱',
    file: 'Netherlands-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: '€54,000',
      salaryRaw: 54000,
      household: '€83,000',
      householdRaw: 83000,
      gdpPerCapita: '$58,000',
      gdpPerCapitaRaw: 58000,
      gdpGrowth: '1.6%',
      currency: 'EUR',
      population: '17.7M'
    },
    fullData: {
      salaryDetails: { median: '€52,000/year', mean: '€62,000/year', minimum: '€25,000/year', genderGap: '16%' },
      householdIncome: { median: '€83,000/year', perCapita: '€34,000/year', gini: '0.29', povertyRate: '11%' },
      gdp: { nominal: '$1.0T', ppp: '$70,000', growth: '1.6%', inflation: '2.4%', unemployment: '3.5%' },
      costOfLiving: { overall: 75, rent: 72, groceries: 68, utilities: 62, transportation: 68, lifestyle: 78 },
      employment: { rate: '3.5%', laborForce: '63%', youthUnemployment: '8%', employmentGrowth: '1.0%' },
      benchmarks: { lowIncome: '< €40,000', middleIncome: '€40,000-80,000', highIncome: '> €80,000' }
    }
  },
  {
    id: 'switzerland',
    name: { zh: '瑞士', en: 'Switzerland' },
    flag: '🇨🇭',
    file: 'Switzerland-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: 'CHF 95,000',
      salaryRaw: 95000,
      household: 'CHF 130,000',
      householdRaw: 130000,
      gdpPerCapita: '$93,000',
      gdpPerCapitaRaw: 93000,
      gdpGrowth: '1.5%',
      currency: 'CHF',
      population: '8.7M'
    },
    fullData: {
      salaryDetails: { median: 'CHF 95,000/year', mean: 'CHF 110,000/year', minimum: 'CHF 47,000/year', genderGap: '19%' },
      householdIncome: { median: 'CHF 130,000/year', perCapita: 'CHF 55,000/year', gini: '0.33', povertyRate: '10%' },
      gdp: { nominal: '$800B', ppp: '$78,000', growth: '1.5%', inflation: '1.5%', unemployment: '4.0%' },
      costOfLiving: { overall: 95, rent: 88, groceries: 82, utilities: 65, transportation: 72, lifestyle: 98 },
      employment: { rate: '4.0%', laborForce: '62%', youthUnemployment: '8%', employmentGrowth: '0.8%' },
      benchmarks: { lowIncome: '< CHF 60K', middleIncome: 'CHF 60K-120K', highIncome: '> CHF 120K' }
    }
  },
  {
    id: 'spain',
    name: { zh: '西班牙', en: 'Spain' },
    flag: '🇪🇸',
    file: 'Spain-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g20',
    metrics: {
      salary: '€35,000',
      salaryRaw: 35000,
      household: '€55,000',
      householdRaw: 55000,
      gdpPerCapita: '$38,000',
      gdpPerCapitaRaw: 38000,
      gdpGrowth: '2.1%',
      currency: 'EUR',
      population: '47M'
    },
    fullData: {
      salaryDetails: { median: '€32,000/year', mean: '€38,000/year', minimum: '€21,000/year', genderGap: '14%' },
      householdIncome: { median: '€48,000/year', perCapita: '€20,000/year', gini: '0.34', povertyRate: '21%' },
      gdp: { nominal: '$1.7T', ppp: '$51,000', growth: '2.1%', inflation: '2.8%', unemployment: '12.5%' },
      costOfLiving: { overall: 62, rent: 52, groceries: 58, utilities: 48, transportation: 52, lifestyle: 65 },
      employment: { rate: '12.5%', laborForce: '58%', youthUnemployment: '35%', employmentGrowth: '1.8%' },
      benchmarks: { lowIncome: '< €22,000', middleIncome: '€22,000-45,000', highIncome: '> €45,000' }
    }
  },
  {
    id: 'thailand',
    name: { zh: '泰国', en: 'Thailand' },
    flag: '🇹🇭',
    file: 'Thailand-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'emerging',
    metrics: {
      salary: '฿360,000',
      salaryRaw: 360000,
      household: '฿660,000',
      householdRaw: 660000,
      gdpPerCapita: '$7,200',
      gdpPerCapitaRaw: 7200,
      gdpGrowth: '3.5%',
      currency: 'THB',
      population: '71.7M'
    },
    fullData: {
      salaryDetails: { median: '฿360,000/year', mean: '฿420,000/year', minimum: '฿150,000/year', genderGap: '8%' },
      householdIncome: { median: '฿660,000/year', perCapita: '฿180,000/year', gini: '0.36', povertyRate: '8%' },
      gdp: { nominal: '$520B', ppp: '$18,000', growth: '3.5%', inflation: '2.0%', unemployment: '1.0%' },
      costOfLiving: { overall: 38, rent: 35, groceries: 38, utilities: 28, transportation: 35, lifestyle: 42 },
      employment: { rate: '1.0%', laborForce: '68%', youthUnemployment: '3%', employmentGrowth: '2.0%' },
      benchmarks: { lowIncome: '< ฿250K', middleIncome: '฿ 250K-600K', highIncome: '> ฿ 600K' }
    }
  },
  {
    id: 'vietnam',
    name: { zh: '越南', en: 'Vietnam' },
    flag: '🇻🇳',
    file: 'Vietnam-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'emerging',
    metrics: {
      salary: '$8,000',
      salaryRaw: 8000,
      household: '$16,000',
      householdRaw: 16000,
      gdpPerCapita: '$4,300',
      gdpPerCapitaRaw: 4300,
      gdpGrowth: '6.0%',
      currency: 'VND',
      population: '98M'
    },
    fullData: {
      salaryDetails: { median: '$8,000/year', mean: '$10,000/year', minimum: '$3,000/year', genderGap: '10%' },
      householdIncome: { median: '$16,000/year', perCapita: '$4,500/year', gini: '0.35', povertyRate: '4%' },
      gdp: { nominal: '$430B', ppp: '$13,000', growth: '6.0%', inflation: '3.5%', unemployment: '2.5%' },
      costOfLiving: { overall: 28, rent: 22, groceries: 28, utilities: 18, transportation: 25, lifestyle: 32 },
      employment: { rate: '2.5%', laborForce: '70%', youthUnemployment: '6%', employmentGrowth: '3.5%' },
      benchmarks: { lowIncome: '< $6,000', middleIncome: '$6,000-15,000', highIncome: '> $15,000' }
    }
  },
  {
    id: 'sweden',
    name: { zh: '瑞典', en: 'Sweden' },
    flag: '🇸🇪',
    file: 'Sweden-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: '€52,000',
      salaryRaw: 52000,
      household: '€74,000',
      householdRaw: 74000,
      gdpPerCapita: '$56,000',
      gdpPerCapitaRaw: 56000,
      gdpGrowth: '1.8%',
      currency: 'SEK',
      population: '10.5M'
    },
    fullData: {
      salaryDetails: { median: '€52,000/year', mean: '€58,000/year', minimum: '€27,000/year', genderGap: '12%' },
      householdIncome: { median: '€74,000/year', perCapita: '€31,000/year', gini: '0.28', povertyRate: '12%' },
      gdp: { nominal: '$580B', ppp: '$61,000', growth: '1.8%', inflation: '2.0%', unemployment: '6.5%' },
      costOfLiving: { overall: 70, rent: 65, groceries: 62, utilities: 58, transportation: 60, lifestyle: 72 },
      employment: { rate: '6.5%', laborForce: '64%', youthUnemployment: '18%', employmentGrowth: '0.5%' },
      benchmarks: { lowIncome: '< €40,000', middleIncome: '€40,000-75,000', highIncome: '> €75,000' }
    }
  },
  {
    id: 'poland',
    name: { zh: '波兰', en: 'Poland' },
    flag: '🇵🇱',
    file: 'Poland-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: '€35,000',
      salaryRaw: 35000,
      household: '€55,000',
      householdRaw: 55000,
      gdpPerCapita: '$38,000',
      gdpPerCapitaRaw: 38000,
      gdpGrowth: '2.8%',
      currency: 'EUR',
      population: '37M'
    },
    fullData: {
      salaryDetails: { median: '€35,000/year', mean: '€42,000/year', minimum: '€20,000/year', genderGap: '10%' },
      householdIncome: { median: '€55,000/year', perCapita: '€22,000/year', gini: '0.27', povertyRate: '14%' },
      gdp: { nominal: '$720B', ppp: '$45,000', growth: '2.8%', inflation: '3.5%', unemployment: '5.0%' },
      costOfLiving: { overall: 48, rent: 42, groceries: 48, utilities: 38, transportation: 42, lifestyle: 52 },
      employment: { rate: '5.0%', laborForce: '58%', youthUnemployment: '15%', employmentGrowth: '1.5%' },
      benchmarks: { lowIncome: '< €25,000', middleIncome: '€25,000-50,000', highIncome: '> €50,000' }
    }
  },
  {
    id: 'belgium',
    name: { zh: '比利时', en: 'Belgium' },
    flag: '🇧🇪',
    file: 'Belgium-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g20',
    metrics: {
      salary: '€50,000',
      salaryRaw: 50000,
      household: '€75,000',
      householdRaw: 75000,
      gdpPerCapita: '$51,000',
      gdpPerCapitaRaw: 51000,
      gdpGrowth: '1.3%',
      currency: 'EUR',
      population: '11.7M'
    },
    fullData: {
      salaryDetails: { median: '€50,000/year', mean: '€56,000/year', minimum: '€24,000/year', genderGap: '15%' },
      householdIncome: { median: '€75,000/year', perCapita: '€30,000/year', gini: '0.27', povertyRate: '14%' },
      gdp: { nominal: '$580B', ppp: '$62,000', growth: '1.3%', inflation: '2.2%', unemployment: '5.5%' },
      costOfLiving: { overall: 72, rent: 68, groceries: 65, utilities: 60, transportation: 65, lifestyle: 75 },
      employment: { rate: '5.5%', laborForce: '60%', youthUnemployment: '15%', employmentGrowth: '0.8%' },
      benchmarks: { lowIncome: '< €35,000', middleIncome: '€35,000-70,000', highIncome: '> €70,000' }
    }
  },
  {
    id: 'austria',
    name: { zh: '奥地利', en: 'Austria' },
    flag: '🇦🇹',
    file: 'Austria-2025-Economic-Report.html',
    region: 'europe',
    economy: 'g20',
    metrics: {
      salary: '€52,000',
      salaryRaw: 52000,
      household: '€81,000',
      householdRaw: 81000,
      gdpPerCapita: '$55,000',
      gdpPerCapitaRaw: 55000,
      gdpGrowth: '1.4%',
      currency: 'EUR',
      population: '9.1M'
    },
    fullData: {
      salaryDetails: { median: '€52,000/year', mean: '€58,000/year', minimum: '€25,000/year', genderGap: '16%' },
      householdIncome: { median: '€81,000/year', perCapita: '€33,000/year', gini: '0.28', povertyRate: '12%' },
      gdp: { nominal: '$480B', ppp: '$66,000', growth: '1.4%', inflation: '2.5%', unemployment: '5.0%' },
      costOfLiving: { overall: 72, rent: 68, groceries: 65, utilities: 58, transportation: 62, lifestyle: 75 },
      employment: { rate: '5.0%', laborForce: '62%', youthUnemployment: '10%', employmentGrowth: '0.8%' },
      benchmarks: { lowIncome: '< €38,000', middleIncome: '€38,000-75,000', highIncome: '> €75,000' }
    }
  },
  {
    id: 'norway',
    name: { zh: '挪威', en: 'Norway' },
    flag: '🇳🇴',
    file: 'Norway-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: 'NOK 600,000',
      salaryRaw: 600000,
      household: 'NOK 850,000',
      householdRaw: 850000,
      gdpPerCapita: '$89,000',
      gdpPerCapitaRaw: 89000,
      gdpGrowth: '1.5%',
      currency: 'NOK',
      population: '5.5M'
    },
    fullData: {
      salaryDetails: { median: 'NOK 600,000/year', mean: 'NOK 680,000/year', minimum: 'NOK 350,000/year', genderGap: '13%' },
      householdIncome: { median: 'NOK 850,000/year', perCapita: 'NOK 350,000/year', gini: '0.25', povertyRate: '10%' },
      gdp: { nominal: '$490B', ppp: '$76,000', growth: '1.5%', inflation: '2.8%', unemployment: '3.5%' },
      costOfLiving: { overall: 82, rent: 78, groceries: 72, utilities: 65, transportation: 70, lifestyle: 85 },
      employment: { rate: '3.5%', laborForce: '65%', youthUnemployment: '12%', employmentGrowth: '0.8%' },
      benchmarks: { lowIncome: '< NOK 450K', middleIncome: 'NOK 450K-800K', highIncome: '> NOK 800K' }
    }
  },
  {
    id: 'ireland',
    name: { zh: '爱尔兰', en: 'Ireland' },
    flag: '🇮🇪',
    file: 'Ireland-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: '€55,000',
      salaryRaw: 55000,
      household: '€82,000',
      householdRaw: 82000,
      gdpPerCapita: '$102,000',
      gdpPerCapitaRaw: 102000,
      gdpGrowth: '3.5%',
      currency: 'EUR',
      population: '5.2M'
    },
    fullData: {
      salaryDetails: { median: '€55,000/year', mean: '€65,000/year', minimum: '€25,000/year', genderGap: '14%' },
      householdIncome: { median: '€82,000/year', perCapita: '€34,000/year', gini: '0.32', povertyRate: '11%' },
      gdp: { nominal: '$520B', ppp: '$124,000', growth: '3.5%', inflation: '2.0%', unemployment: '4.5%' },
      costOfLiving: { overall: 78, rent: 82, groceries: 68, utilities: 58, transportation: 68, lifestyle: 82 },
      employment: { rate: '4.5%', laborForce: '62%', youthUnemployment: '14%', employmentGrowth: '2.5%' },
      benchmarks: { lowIncome: '< €40,000', middleIncome: '€40,000-80,000', highIncome: '> €80,000' }
    }
  },
  {
    id: 'denmark',
    name: { zh: '丹麦', en: 'Denmark' },
    flag: '🇩🇰',
    file: 'Denmark-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: 'DKK 420,000',
      salaryRaw: 420000,
      household: 'DKK 580,000',
      householdRaw: 580000,
      gdpPerCapita: '$68,000',
      gdpPerCapitaRaw: 68000,
      gdpGrowth: '2.0%',
      currency: 'DKK',
      population: '5.9M'
    },
    fullData: {
      salaryDetails: { median: 'DKK 420,000/year', mean: 'DKK 480,000/year', minimum: 'DKK 250,000/year', genderGap: '8%' },
      householdIncome: { median: 'DKK 580,000/year', perCapita: 'DKK 240,000/year', gini: '0.27', povertyRate: '11%' },
      gdp: { nominal: '$400B', ppp: '$73,000', growth: '2.0%', inflation: '2.0%', unemployment: '4.0%' },
      costOfLiving: { overall: 40, rent: 32, groceries: 35, utilities: 25, transportation: 30, lifestyle: 45 },
      employment: { rate: '4.5%', laborForce: '65%', youthUnemployment: '12%', employmentGrowth: '1.5%' },
      benchmarks: { lowIncome: '< DKK 350K', middleIncome: 'DKK 350K-600K', highIncome: '> DKK 600K' }
    }
  },
  {
    id: 'finland',
    name: { zh: '芬兰', en: 'Finland' },
    flag: '🇫🇮',
    file: 'Finland-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: '€52,000',
      salaryRaw: 52000,
      household: '€73,000',
      householdRaw: 73000,
      gdpPerCapita: '$54,000',
      gdpPerCapitaRaw: 54000,
      gdpGrowth: '1.5%',
      currency: 'EUR',
      population: '5.5M'
    },
    fullData: {
      salaryDetails: { median: '€52,000/year', mean: '€58,000/year', minimum: '€26,000/year', genderGap: '17%' },
      householdIncome: { median: '€73,000/year', perCapita: '€30,000/year', gini: '0.27', povertyRate: '11%' },
      gdp: { nominal: '$300B', ppp: '$61,000', growth: '1.5%', inflation: '1.5%', unemployment: '7.5%' },
      costOfLiving: { overall: 68, rent: 62, groceries: 62, utilities: 58, transportation: 60, lifestyle: 70 },
      employment: { rate: '7.5%', laborForce: '64%', youthUnemployment: '18%', employmentGrowth: '0.5%' },
      benchmarks: { lowIncome: '< €40,000', middleIncome: '€40,000-70,000', highIncome: '> €70,000' }
    }
  },
  {
    id: 'portugal',
    name: { zh: '葡萄牙', en: 'Portugal' },
    flag: '🇵🇹',
    file: 'Portugal-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: '€27,000',
      salaryRaw: 27000,
      household: '€45,000',
      householdRaw: 45000,
      gdpPerCapita: '$28,000',
      gdpPerCapitaRaw: 28000,
      gdpGrowth: '2.0%',
      currency: 'EUR',
      population: '10.4M'
    },
    fullData: {
      salaryDetails: { median: '€27,000/year', mean: '€32,000/year', minimum: '€16,000/year', genderGap: '14%' },
      householdIncome: { median: '€45,000/year', perCapita: '€18,000/year', gini: '0.32', povertyRate: '18%' },
      gdp: { nominal: '$280B', ppp: '$38,000', growth: '2.0%', inflation: '2.5%', unemployment: '6.5%' },
      costOfLiving: { overall: 52, rent: 48, groceries: 52, utilities: 45, transportation: 48, lifestyle: 55 },
      employment: { rate: '6.5%', laborForce: '56%', youthUnemployment: '18%', employmentGrowth: '1.2%' },
      benchmarks: { lowIncome: '< €20,000', middleIncome: '€20,000-40,000', highIncome: '> €40,000' }
    }
  },
  {
    id: 'greece',
    name: { zh: '希腊', en: 'Greece' },
    flag: '🇬🇷',
    file: 'Greece-2025-Economic-Report.html',
    region: 'europe',
    economy: 'developed',
    metrics: {
      salary: '€28,000',
      salaryRaw: 28000,
      household: '€45,000',
      householdRaw: 45000,
      gdpPerCapita: '$22,000',
      gdpPerCapitaRaw: 22000,
      gdpGrowth: '2.3%',
      currency: 'EUR',
      population: '10.3M'
    },
    fullData: {
      salaryDetails: { median: '€28,000/year', mean: '€33,000/year', minimum: '€16,000/year', genderGap: '12%' },
      householdIncome: { median: '€45,000/year', perCapita: '€18,000/year', gini: '0.32', povertyRate: '18%' },
      gdp: { nominal: '$220B', ppp: '$33,000', growth: '2.3%', inflation: '2.5%', unemployment: '11%' },
      costOfLiving: { overall: 55, rent: 45, groceries: 55, utilities: 45, transportation: 48, lifestyle: 58 },
      employment: { rate: '11%', laborForce: '52%', youthUnemployment: '28%', employmentGrowth: '1.2%' },
      benchmarks: { lowIncome: '< €20,000', middleIncome: '€20,000-40,000', highIncome: '> €40,000' }
    }
  },
  {
    id: 'israel',
    name: { zh: '以色列', en: 'Israel' },
    flag: '🇮🇱',
    file: 'Israel-2025-Economic-Report.html',
    region: 'middle-east',
    economy: 'developed',
    metrics: {
      salary: '₪180,000',
      salaryRaw: 180000,
      household: '₪270,000',
      householdRaw: 270000,
      gdpPerCapita: '$54,000',
      gdpPerCapitaRaw: 54000,
      gdpGrowth: '3.5%',
      currency: 'ILS',
      population: '9.3M'
    },
    fullData: {
      salaryDetails: { median: '₪ 180,000/year', mean: '₪ 210,000/year', minimum: '₪ 58,000/year', genderGap: '22%' },
      householdIncome: { median: '₪ 270,000/year', perCapita: '₪ 90,000/year', gini: '0.38', povertyRate: '18%' },
      gdp: { nominal: '$520B', ppp: '$54,000', growth: '3.5%', inflation: '3.0%', unemployment: '4.0%' },
      costOfLiving: { overall: 75, rent: 78, groceries: 68, utilities: 55, transportation: 65, lifestyle: 80 },
      employment: { rate: '4.0%', laborForce: '62%', youthUnemployment: '10%', employmentGrowth: '2.0%' },
      benchmarks: { lowIncome: '< ₪ 120K', middleIncome: '₪ 120K-250K', highIncome: '> ₪ 250K' }
    }
  },
  {
    id: 'malaysia',
    name: { zh: '马来西亚', en: 'Malaysia' },
    flag: '🇲🇾',
    file: 'Malaysia-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'emerging',
    metrics: {
      salary: '$18,000',
      salaryRaw: 18000,
      household: '$32,000',
      householdRaw: 32000,
      gdpPerCapita: '$11,500',
      gdpPerCapitaRaw: 11500,
      gdpGrowth: '4.5%',
      currency: 'MYR',
      population: '33M'
    },
    fullData: {
      salaryDetails: { median: '$18,000/year', mean: '$22,000/year', minimum: '$7,000/year', genderGap: '15%' },
      householdIncome: { median: '$32,000/year', perCapita: '$10,000/year', gini: '0.40', povertyRate: '5%' },
      gdp: { nominal: '$400B', ppp: '$30,000', growth: '4.5%', inflation: '2.5%', unemployment: '3.5%' },
      costOfLiving: { overall: 42, rent: 38, groceries: 42, utilities: 28, transportation: 38, lifestyle: 48 },
      employment: { rate: '3.5%', laborForce: '68%', youthUnemployment: '8%', employmentGrowth: '2.5%' },
      benchmarks: { lowIncome: '< $12,000', middleIncome: '$12,000-30,000', highIncome: '> $30,000' }
    }
  },
  {
    id: 'philippines',
    name: { zh: '菲律宾', en: 'Philippines' },
    flag: '🇵🇭',
    file: 'Philippines-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'emerging',
    metrics: {
      salary: '$7,500',
      salaryRaw: 7500,
      household: '$14,000',
      householdRaw: 14000,
      gdpPerCapita: '$3,500',
      gdpPerCapitaRaw: 3500,
      gdpGrowth: '6.0%',
      currency: 'PHP',
      population: '113M'
    },
    fullData: {
      salaryDetails: { median: '$7,500/year', mean: '$9,000/year', minimum: '$3,000/year', genderGap: '18%' },
      householdIncome: { median: '$14,000/year', perCapita: '$3,500/year', gini: '0.42', povertyRate: '18%' },
      gdp: { nominal: '$400B', ppp: '$10,000', growth: '6.0%', inflation: '3.5%', unemployment: '4.5%' },
      costOfLiving: { overall: 28, rent: 22, groceries: 28, utilities: 18, transportation: 25, lifestyle: 32 },
      employment: { rate: '4.5%', laborForce: '65%', youthUnemployment: '12%', employmentGrowth: '3.5%' },
      benchmarks: { lowIncome: '< $6,000', middleIncome: '$6,000-15,000', highIncome: '> $15,000' }
    }
  },
  {
    id: 'chile',
    name: { zh: '智利', en: 'Chile' },
    flag: '🇨🇱',
    file: 'Chile-2025-Economic-Report.html',
    region: 'americas',
    economy: 'developed',
    metrics: {
      salary: '$18,000',
      salaryRaw: 18000,
      household: '$32,000',
      householdRaw: 32000,
      gdpPerCapita: '$16,000',
      gdpPerCapitaRaw: 16000,
      gdpGrowth: '2.4%',
      currency: 'CLP',
      population: '19.6M'
    },
    fullData: {
      salaryDetails: { median: '$18,000/year', mean: '$22,000/year', minimum: '$6,000/year', genderGap: '16%' },
      householdIncome: { median: '$32,000/year', perCapita: '$10,000/year', gini: '0.46', povertyRate: '8%' },
      gdp: { nominal: '$310B', ppp: '$26,000', growth: '2.4%', inflation: '3.5%', unemployment: '8.0%' },
      costOfLiving: { overall: 52, rent: 48, groceries: 52, utilities: 42, transportation: 48, lifestyle: 55 },
      employment: { rate: '8.0%', laborForce: '60%', youthUnemployment: '18%', employmentGrowth: '1.2%' },
      benchmarks: { lowIncome: '< $12,000', middleIncome: '$12,000-30,000', highIncome: '> $30,000' }
    }
  },
  {
    id: 'colombia',
    name: { zh: '哥伦比亚', en: 'Colombia' },
    flag: '🇨🇴',
    file: 'Colombia-2025-Economic-Report.html',
    region: 'americas',
    economy: 'emerging',
    metrics: {
      salary: '$10,000',
      salaryRaw: 10000,
      household: '$18,000',
      householdRaw: 18000,
      gdpPerCapita: '$6,800',
      gdpPerCapitaRaw: 6800,
      gdpGrowth: '2.2%',
      currency: 'COP',
      population: '52M'
    },
    fullData: {
      salaryDetails: { median: '$10,000/year', mean: '$12,000/year', minimum: '$4,000/year', genderGap: '18%' },
      householdIncome: { median: '$18,000/year', perCapita: '$5,000/year', gini: '0.51', povertyRate: '28%' },
      gdp: { nominal: '$350B', ppp: '$16,000', growth: '2.2%', inflation: '5.0%', unemployment: '10%' },
      costOfLiving: { overall: 35, rent: 28, groceries: 35, utilities: 25, transportation: 32, lifestyle: 40 },
      employment: { rate: '10%', laborForce: '65%', youthUnemployment: '20%', employmentGrowth: '1.2%' },
      benchmarks: { lowIncome: '< $8,000', middleIncome: '$8,000-18,000', highIncome: '> $18,000' }
    }
  },
  {
    id: 'iraq',
    name: { zh: '伊拉克', en: 'Iraq' },
    flag: '🇮🇶',
    file: 'Iraq-2025-Economic-Report.html',
    region: 'middle-east',
    economy: 'emerging',
    metrics: {
      salary: '$8,000',
      salaryRaw: 8000,
      household: '$18,000',
      householdRaw: 18000,
      gdpPerCapita: '$5,800',
      gdpPerCapitaRaw: 5800,
      gdpGrowth: '3.2%',
      currency: 'USD',
      population: '44.5M'
    },
    fullData: {
      salaryDetails: { median: '$8,000/year', mean: '$10,000/year', minimum: '$3,000/year', genderGap: '25%' },
      householdIncome: { median: '$18,000/year', perCapita: '$4,000/year', gini: '0.45', povertyRate: '20%' },
      gdp: { nominal: '$250B', ppp: '$11,000', growth: '3.2%', inflation: '4%', unemployment: '15%' },
      costOfLiving: { overall: 28, rent: 22, groceries: 28, utilities: 18, transportation: 25, lifestyle: 32 },
      employment: { rate: '15%', laborForce: '45%', youthUnemployment: '30%', employmentGrowth: '1.5%' },
      benchmarks: { lowIncome: '< $6,000', middleIncome: '$6,000-15,000', highIncome: '> $15,000' }
    }
  },
  {
    id: 'ukraine',
    name: { zh: '乌克兰', en: 'Ukraine' },
    flag: '🇺🇦',
    file: 'Ukraine-2025-Economic-Report.html',
    region: 'europe',
    economy: 'emerging',
    metrics: {
      salary: '$10,000',
      salaryRaw: 10000,
      household: '$20,000',
      householdRaw: 20000,
      gdpPerCapita: '$5,100',
      gdpPerCapitaRaw: 5100,
      gdpGrowth: '3.5%',
      currency: 'UAH',
      population: '41M'
    },
    fullData: {
      salaryDetails: { median: '$10,000/year', mean: '$12,000/year', minimum: '$3,000/year', genderGap: '22%' },
      householdIncome: { median: '$20,000/year', perCapita: '$6,000/year', gini: '0.26', povertyRate: '5%' },
      gdp: { nominal: '$210B', ppp: '$14,000', growth: '3.5%', inflation: '5%', unemployment: '9%' },
      costOfLiving: { overall: 32, rent: 25, groceries: 32, utilities: 22, transportation: 28, lifestyle: 38 },
      employment: { rate: '9%', laborForce: '58%', youthUnemployment: '18%', employmentGrowth: '1.8%' },
      benchmarks: { lowIncome: '< $7,000', middleIncome: '$7,000-18,000', highIncome: '> $18,000' }
    }
  },
  {
    id: 'egypt',
    name: { zh: '埃及', en: 'Egypt' },
    flag: '🇪🇬',
    file: 'Egypt-2025-Economic-Report.html',
    region: 'middle-east',
    economy: 'emerging',
    metrics: {
      salary: '$7,200',
      salaryRaw: 7200,
      household: '$14,000',
      householdRaw: 14000,
      gdpPerCapita: '$4,500',
      gdpPerCapitaRaw: 4500,
      gdpGrowth: '4.5%',
      currency: 'EGP',
      population: '109M'
    },
    fullData: {
      salaryDetails: { median: '$7,200/year', mean: '$9,000/year', minimum: '$2,400/year', genderGap: '18%' },
      householdIncome: { median: '$14,000/year', perCapita: '$3,500/year', gini: '0.32', povertyRate: '28%' },
      gdp: { nominal: '$470B', ppp: '$13,000', growth: '4.5%', inflation: '30%', unemployment: '7%' },
      costOfLiving: { overall: 22, rent: 18, groceries: 25, utilities: 15, transportation: 20, lifestyle: 28 },
      employment: { rate: '7%', laborForce: '48%', youthUnemployment: '18%', employmentGrowth: '2.5%' },
      benchmarks: { lowIncome: '< $5,000', middleIncome: '$5,000-12,000', highIncome: '> $12,000' }
    }
  },
  {
    id: 'nigeria',
    name: { zh: '尼日利亚', en: 'Nigeria' },
    flag: '🇳🇬',
    file: 'Nigeria-2025-Economic-Report.html',
    region: 'africa',
    economy: 'emerging',
    metrics: {
      salary: '$4,000',
      salaryRaw: 4000,
      household: '$8,000',
      householdRaw: 8000,
      gdpPerCapita: '$2,200',
      gdpPerCapitaRaw: 2200,
      gdpGrowth: '3.0%',
      currency: 'NGN',
      population: '216M'
    },
    fullData: {
      salaryDetails: { median: '$4,000/year', mean: '$5,500/year', minimum: '$1,200/year', genderGap: '28%' },
      householdIncome: { median: '$8,000/year', perCapita: '$2,000/year', gini: '0.43', povertyRate: '40%' },
      gdp: { nominal: '$450B', ppp: '$5,500', growth: '3.0%', inflation: '25%', unemployment: '8%' },
      costOfLiving: { overall: 22, rent: 15, groceries: 22, utilities: 12, transportation: 18, lifestyle: 28 },
      employment: { rate: '8%', laborForce: '55%', youthUnemployment: '15%', employmentGrowth: '1.8%' },
      benchmarks: { lowIncome: '< $3,000', middleIncome: '$3,000-8,000', highIncome: '> $8,000' }
    }
  },
  {
    id: 'iran',
    name: { zh: '伊朗', en: 'Iran' },
    flag: '🇮🇷',
    file: 'Iran-2025-Economic-Report.html',
    region: 'middle-east',
    economy: 'emerging',
    metrics: {
      salary: '$8,000',
      salaryRaw: 8000,
      household: '$15,000',
      householdRaw: 15000,
      gdpPerCapita: '$4,000',
      gdpPerCapitaRaw: 4000,
      gdpGrowth: '3.0%',
      currency: 'IRR',
      population: '87M'
    },
    fullData: {
      salaryDetails: { median: '$8,000/year', mean: '$10,000/year', minimum: '$2,500/year', genderGap: '30%' },
      householdIncome: { median: '$15,000/year', perCapita: '$4,000/year', gini: '0.40', povertyRate: '25%' },
      gdp: { nominal: '$350B', ppp: '$11,000', growth: '3.0%', inflation: '35%', unemployment: '12%' },
      costOfLiving: { overall: 25, rent: 20, groceries: 28, utilities: 15, transportation: 22, lifestyle: 30 },
      employment: { rate: '12%', laborForce: '50%', youthUnemployment: '28%', employmentGrowth: '1.2%' },
      benchmarks: { lowIncome: '< $6,000', middleIncome: '$6,000-15,000', highIncome: '> $15,000' }
    }
  },
  {
    id: 'pakistan',
    name: { zh: '巴基斯坦', en: 'Pakistan' },
    flag: '🇵🇰',
    file: 'Pakistan-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'emerging',
    metrics: {
      salary: '$4,500',
      salaryRaw: 4500,
      household: '$9,000',
      householdRaw: 9000,
      gdpPerCapita: '$1,400',
      gdpPerCapitaRaw: 1400,
      gdpGrowth: '4.0%',
      currency: 'PKR',
      population: '240M'
    },
    fullData: {
      salaryDetails: { median: '$4,500/year', mean: '$5,500/year', minimum: '$1,200/year', genderGap: '32%' },
      householdIncome: { median: '$9,000/year', perCapita: '$2,000/year', gini: '0.35', povertyRate: '30%' },
      gdp: { nominal: '$340B', ppp: '$5,500', growth: '4.0%', inflation: '20%', unemployment: '5%' },
      costOfLiving: { overall: 18, rent: 12, groceries: 20, utilities: 10, transportation: 15, lifestyle: 22 },
      employment: { rate: '5%', laborForce: '58%', youthUnemployment: '10%', employmentGrowth: '2.5%' },
      benchmarks: { lowIncome: '< $3,500', middleIncome: '$3,500-8,000', highIncome: '> $8,000' }
    }
  },
  {
    id: 'bangladesh',
    name: { zh: '孟加拉国', en: 'Bangladesh' },
    flag: '🇧🇩',
    file: 'Bangladesh-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'emerging',
    metrics: {
      salary: '$4,500',
      salaryRaw: 4500,
      household: '$8,500',
      householdRaw: 8500,
      gdpPerCapita: '$2,800',
      gdpPerCapitaRaw: 2800,
      gdpGrowth: '6.2%',
      currency: 'BDT',
      population: '173M'
    },
    fullData: {
      salaryDetails: { median: '$4,500/year', mean: '$5,500/year', minimum: '$1,500/year', genderGap: '30%' },
      householdIncome: { median: '$8,500/year', perCapita: '$2,000/year', gini: '0.32', povertyRate: '18%' },
      gdp: { nominal: '$460B', ppp: '$7,500', growth: '6.2%', inflation: '8%', unemployment: '4%' },
      costOfLiving: { overall: 22, rent: 18, groceries: 25, utilities: 12, transportation: 18, lifestyle: 28 },
      employment: { rate: '4%', laborForce: '60%', youthUnemployment: '10%', employmentGrowth: '3.5%' },
      benchmarks: { lowIncome: '< $3,500', middleIncome: '$3,500-8,000', highIncome: '> $8,000' }
    }
  },
  {
    id: 'new-zealand',
    name: { zh: '新西兰', en: 'New Zealand' },
    flag: '🇳🇿',
    file: 'New-Zealand-2025-Economic-Report.html',
    region: 'asia-pacific',
    economy: 'developed',
    metrics: {
      salary: '$65,000',
      salaryRaw: 65000,
      household: '$95,000',
      householdRaw: 95000,
      gdpPerCapita: '$52,000',
      gdpPerCapitaRaw: 52000,
      gdpGrowth: '2.0%',
      currency: 'NZD',
      population: '5.2M'
    },
    fullData: {
      salaryDetails: { median: '$65,000/year', mean: '$75,000/year', minimum: '$38,000/year', genderGap: '12%' },
      householdIncome: { median: '$95,000/year', perCapita: '$38,000/year', gini: '0.33', povertyRate: '13%' },
      gdp: { nominal: '$250B', ppp: '$55,000', growth: '2.0%', inflation: '3.0%', unemployment: '4.0%' },
      costOfLiving: { overall: 72, rent: 68, groceries: 62, utilities: 55, transportation: 62, lifestyle: 75 },
      employment: { rate: '4.0%', laborForce: '68%', youthUnemployment: '12%', employmentGrowth: '1.2%' },
      benchmarks: { lowIncome: '< $50,000', middleIncome: '$50,000-90,000', highIncome: '> $90,000' }
    }
  }
];

export function getCountryById(id: string): CountryFullData | undefined {
  return COUNTRIES_FULL_DATA.find(c => c.id === id);
}
