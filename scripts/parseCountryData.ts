import fs from 'fs';
import path from 'path';

export interface CountryFullData {
  id: string;
  name: { zh: string; en: string };
  flag: string;
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
    benchmarks: {
      lowIncome: string;
      middleIncome: string;
      highIncome: string;
    };
  };
}

const countryNameMap: Record<string, { zh: string; en: string; flag: string; region: string; economy: string }> = {
  'argentina': { zh: '阿根廷', en: 'Argentina', flag: '🇦🇷', region: 'americas', economy: 'emerging' },
  'australia': { zh: '澳大利亚', en: 'Australia', flag: '🇦🇺', region: 'asia-pacific', economy: 'g20' },
  'austria': { zh: '奥地利', en: 'Austria', flag: '🇦🇹', region: 'europe', economy: 'g20' },
  'belgium': { zh: '比利时', en: 'Belgium', flag: '🇧🇪', region: 'europe', economy: 'g20' },
  'brazil': { zh: '巴西', en: 'Brazil', flag: '🇧🇷', region: 'americas', economy: 'g20' },
  'canada': { zh: '加拿大', en: 'Canada', flag: '🇨🇦', region: 'americas', economy: 'g20' },
  'china': { zh: '中国', en: 'China', flag: '🇨🇳', region: 'asia-pacific', economy: 'g20' },
  'denmark': { zh: '丹麦', en: 'Denmark', flag: '🇩🇰', region: 'europe', economy: 'advanced' },
  'finland': { zh: '芬兰', en: 'Finland', flag: '🇫🇮', region: 'europe', economy: 'advanced' },
  'france': { zh: '法国', en: 'France', flag: '🇫🇷', region: 'europe', economy: 'g20' },
  'germany': { zh: '德国', en: 'Germany', flag: '🇩🇪', region: 'europe', economy: 'g20' },
  'greece': { zh: '希腊', en: 'Greece', flag: '🇬🇷', region: 'europe', economy: 'advanced' },
  'india': { zh: '印度', en: 'India', flag: '🇮🇳', region: 'asia-pacific', economy: 'g20' },
  'indonesia': { zh: '印度尼西亚', en: 'Indonesia', flag: '🇮🇩', region: 'asia-pacific', economy: 'g20' },
  'ireland': { zh: '爱尔兰', en: 'Ireland', flag: '🇮🇪', region: 'europe', economy: 'advanced' },
  'iraq': { zh: '伊拉克', en: 'Iraq', flag: '🇮🇶', region: 'middle-east', economy: 'emerging' },
  'israel': { zh: '以色列', en: 'Israel', flag: '🇮🇱', region: 'middle-east', economy: 'advanced' },
  'italy': { zh: '意大利', en: 'Italy', flag: '🇮🇹', region: 'europe', economy: 'g20' },
  'japan': { zh: '日本', en: 'Japan', flag: '🇯🇵', region: 'asia-pacific', economy: 'g20' },
  'malaysia': { zh: '马来西亚', en: 'Malaysia', flag: '🇲🇾', region: 'asia-pacific', economy: 'emerging' },
  'mexico': { zh: '墨西哥', en: 'Mexico', flag: '🇲🇽', region: 'americas', economy: 'g20' },
  'netherlands': { zh: '荷兰', en: 'Netherlands', flag: '🇳🇱', region: 'europe', economy: 'advanced' },
  'new-zealand': { zh: '新西兰', en: 'New Zealand', flag: '🇳🇿', region: 'asia-pacific', economy: 'advanced' },
  'norway': { zh: '挪威', en: 'Norway', flag: '🇳🇴', region: 'europe', economy: 'advanced' },
  'pakistan': { zh: '巴基斯坦', en: 'Pakistan', flag: '🇵🇰', region: 'asia-pacific', economy: 'emerging' },
  'philippines': { zh: '菲律宾', en: 'Philippines', flag: '🇵🇭', region: 'asia-pacific', economy: 'emerging' },
  'poland': { zh: '波兰', en: 'Poland', flag: '🇵🇱', region: 'europe', economy: 'advanced' },
  'portugal': { zh: '葡萄牙', en: 'Portugal', flag: '🇵🇹', region: 'europe', economy: 'advanced' },
  'russia': { zh: '俄罗斯', en: 'Russia', flag: '🇷🇺', region: 'europe', economy: 'g20' },
  'saudi-arabia': { zh: '沙特阿拉伯', en: 'Saudi Arabia', flag: '🇸🇦', region: 'middle-east', economy: 'g20' },
  'singapore': { zh: '新加坡', en: 'Singapore', flag: '🇸🇬', region: 'asia-pacific', economy: 'advanced' },
  'south-africa': { zh: '南非', en: 'South Africa', flag: '🇿🇦', region: 'africa', economy: 'g20' },
  'south-korea': { zh: '韩国', en: 'South Korea', flag: '🇰🇷', region: 'asia-pacific', economy: 'g20' },
  'spain': { zh: '西班牙', en: 'Spain', flag: '🇪🇸', region: 'europe', economy: 'g20' },
  'sweden': { zh: '瑞典', en: 'Sweden', flag: '🇸🇪', region: 'europe', economy: 'advanced' },
  'switzerland': { zh: '瑞士', en: 'Switzerland', flag: '🇨🇭', region: 'europe', economy: 'advanced' },
  'thailand': { zh: '泰国', en: 'Thailand', flag: '🇹🇭', region: 'asia-pacific', economy: 'emerging' },
  'turkey': { zh: '土耳其', en: 'Turkey', flag: '🇹🇷', region: 'middle-east', economy: 'g20' },
  'uae': { zh: '阿联酋', en: 'UAE', flag: '🇦🇪', region: 'middle-east', economy: 'advanced' },
  'uk': { zh: '英国', en: 'UK', flag: '🇬🇧', region: 'europe', economy: 'g20' },
  'united-states': { zh: '美国', en: 'United States', flag: '🇺🇸', region: 'americas', economy: 'g20' },
  'vietnam': { zh: '越南', en: 'Vietnam', flag: '🇻🇳', region: 'asia-pacific', economy: 'emerging' },
  'iran': { zh: '伊朗', en: 'Iran', flag: '🇮🇷', region: 'middle-east', economy: 'emerging' },
  'egypt': { zh: '埃及', en: 'Egypt', flag: '🇪🇬', region: 'africa', economy: 'emerging' },
  'chile': { zh: '智利', en: 'Chile', flag: '🇨🇱', region: 'americas', economy: 'advanced' },
  'colombia': { zh: '哥伦比亚', en: 'Colombia', flag: '🇨🇴', region: 'americas', economy: 'emerging' },
  'bangladesh': { zh: '孟加拉国', en: 'Bangladesh', flag: '🇧🇩', region: 'asia-pacific', economy: 'emerging' },
  'nigeria': { zh: '尼日利亚', en: 'Nigeria', flag: '🇳🇬', region: 'africa', economy: 'emerging' },
  'ukraine': { zh: '乌克兰', en: 'Ukraine', flag: '🇺🇦', region: 'europe', economy: 'emerging' },
};

function extractNumber(text: string): number {
  const cleaned = text.replace(/[^0-9.,]/g, '').replace(/,/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function parseSalarySection(content: string) {
  const result = { median: '', mean: '', minimum: '', genderGap: '' };

  const medianPatterns = [
    /median.*?([$€£])\s*([\d,]+(?:\.\d+)?).*?(?:per|年|month|year)/i,
    /typical.*?([$€£])\s*([\d,]+(?:\.\d+)?)/i,
    /≈\s*([$€£])\s*([\d,]+(?:\.\d+)?)/i,
    /USD\s*([\d,]+(?:\.\d+)?).*?(?:per|month|year)/i,
  ];

  for (const pattern of medianPatterns) {
    const match = content.match(pattern);
    if (match) {
      const currency = match[1] || '$';
      const value = extractNumber(match[2]);
      if (value > 0) {
        result.median = `${currency}${value.toLocaleString()}/year`;
        break;
      }
    }
  }

  const meanMatch = content.match(/average[^\$]*\$([\d,]+(?:\.\d+)?)/i);
  if (meanMatch) result.mean = `$${extractNumber(meanMatch[1]).toLocaleString()}/year`;

  const minMatch = content.match(/minimum[^\$]*\$([\d,]+(?:\.\d+)?)/i);
  if (minMatch) result.minimum = `$${extractNumber(minMatch[1]).toLocaleString()}`;

  const gapMatch = content.match(/gender.*?gap[^\d]*([\d.,]+)\s*%/i);
  if (gapMatch) result.genderGap = `${gapMatch[1]}%`;

  return result;
}

function parseHouseholdSection(content: string) {
  const result = { median: '', perCapita: '', gini: '', povertyRate: '' };

  const householdMatch = content.match(/median.*?household[^\$]*\$([\d,]+)/i);
  if (householdMatch) result.median = `$${extractNumber(householdMatch[1]).toLocaleString()}/year`;

  const perCapitaMatch = content.match(/per[^\-]*capita[^\$]*\$([\d,]+)/i);
  if (perCapitaMatch) result.perCapita = `$${extractNumber(perCapitaMatch[1]).toLocaleString()}/year`;

  const giniMatch = content.match(/Gini[^\d]*0\.(\d+)|Gini[^\d]*(\d+\.?\d*)\s*\(0/i);
  if (giniMatch) result.gini = giniMatch[1] ? `0.${giniMatch[1]}` : giniMatch[2];

  const povertyMatch = content.match(/poverty[^\d]*(\d+\.?\d*)\s*%/i);
  if (povertyMatch) result.povertyRate = `${povertyMatch[1]}%`;

  return result;
}

function parseGDPSection(content: string) {
  const result = { nominal: '', ppp: '', growth: '', inflation: '', unemployment: '' };

  const gdpMatch = content.match(/Nominal GDP[^\$]*\$([\d,]+(?:\.\d+)?)/i);
  if (gdpMatch) result.nominal = `$${extractNumber(gdpMatch[1]).toLocaleString()}`;

  const pppMatch = content.match(/GDP.*?PPP[^\$]*\$([\d,]+(?:\.\d+)?)/i);
  if (pppMatch) result.ppp = `$${extractNumber(pppMatch[1]).toLocaleString()}`;

  const growthMatch = content.match(/GDP[^\d]*growth[^\d]*(\d+\.?\d*)\s*%/i);
  if (growthMatch) result.growth = `${growthMatch[1]}%`;

  const inflationMatch = content.match(/inflation[^\d]*(\d+\.?\d*)\s*%/i);
  if (inflationMatch) result.inflation = `${inflationMatch[1]}%`;

  const unempMatch = content.match(/unemployment[^\d]*(\d+\.?\d*)\s*%/i);
  if (unempMatch) result.unemployment = `${unempMatch[1]}%`;

  return result;
}

function extractFileId(filename: string): string {
  const name = filename
    .replace(/\.(md|txt)$/i, '')
    .toLowerCase()
    .replace(/\s+around\s+\d{4}$/, '')
    .replace(/\s+vers\s+\d{4}$/, '')
    .replace(/\s+\d{4}$/, '')
    .replace(/^united\s+/, '')
    .replace(/^united states$/, 'usa')
    .replace(/^united kingdom$/, 'uk')
    .replace(/^hong kong.*/i, 'hong-kong')
    .replace(/south korea/g, 'south-korea')
    .replace(/new zealand/g, 'new-zealand')
    .replace(/saudi arabia/g, 'saudi-arabia')
    .replace(/united arab emirates/g, 'uae')
    .replace(/\s+/g, '-');

  for (const key of Object.keys(countryNameMap)) {
    if (name.includes(key) || key.includes(name)) {
      return key;
    }
  }

  return name;
}

export function parseCountryFile(filepath: string): CountryFullData | null {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    const filename = path.basename(filepath);
    const id = extractFileId(filename);
    
    const meta = countryNameMap[id];
    if (!meta) {
      console.warn(`Unknown country: ${filename} -> ${id}`);
      return null;
    }

    const salaryData = parseSalarySection(content);
    const householdData = parseHouseholdSection(content);
    const gdpData = parseGDPSection(content);

    const salaryValue = extractNumber(salaryData.median) || extractNumber(salaryData.mean) || 50000;

    return {
      id,
      name: meta,
      flag: meta.flag,
      region: meta.region,
      economy: meta.economy,
      metrics: {
        salary: salaryData.median || `$${salaryValue.toLocaleString()}`,
        salaryRaw: salaryValue,
        household: householdData.median || `$${(salaryValue * 1.5).toLocaleString()}`,
        householdRaw: extractNumber(householdData.median) || salaryValue * 1.5,
        gdpPerCapita: gdpData.nominal || '$50,000',
        gdpPerCapitaRaw: extractNumber(gdpData.nominal) || 50000,
        gdpGrowth: gdpData.growth || '2.0%',
        currency: 'USD',
        population: '40M'
      },
      fullData: {
        salaryDetails: salaryData,
        householdIncome: householdData,
        gdp: gdpData,
        benchmarks: {
          lowIncome: '< $30,000',
          middleIncome: '$30,000 - $80,000',
          highIncome: '> $80,000'
        }
      }
    };
  } catch (error) {
    console.error(`Error parsing ${filepath}:`, error);
    return null;
  }
}

export function parseAllCountries(sourcesDir: string): CountryFullData[] {
  const files = fs.readdirSync(sourcesDir);
  const countries: CountryFullData[] = [];

  for (const file of files) {
    const filepath = path.join(sourcesDir, file);
    const country = parseCountryFile(filepath);
    if (country) {
      countries.push(country);
    }
  }

  return countries;
}
