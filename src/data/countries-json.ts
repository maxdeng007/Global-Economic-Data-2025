import type { Country, RegionType, EconomyType } from '../types/country';

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

// In-memory cache for country data
let countriesCache: CountryFullData[] | null = null;
let countriesIndex: Map<string, CountryFullData> | null = null;

// Load all countries from JSON files
export async function loadAllCountries(): Promise<CountryFullData[]> {
  if (countriesCache) {
    return countriesCache;
  }

  try {
    const response = await fetch('/data/index.json');
    const index = await response.json() as { id: string; name: { zh: string; en: string }; flag: string; region: string; economy: string; file: string }[];
    
    const countries: CountryFullData[] = [];
    countriesIndex = new Map();

    for (const countryInfo of index) {
      try {
        const countryResponse = await fetch(`/data/${countryInfo.id}.json`);
        const countryData = await countryResponse.json() as CountryFullData;
        
        // Merge index info with full data
        const fullData: CountryFullData = {
          id: countryInfo.id,
          name: countryInfo.name,
          flag: countryInfo.flag,
          region: countryInfo.region as RegionType,
          economy: countryInfo.economy as EconomyType,
          file: countryInfo.file,
          metrics: countryData.metrics,
          fullData: countryData.fullData
        };
        
        countries.push(fullData);
        countriesIndex!.set(countryInfo.id, fullData);
      } catch (err) {
        console.warn(`Failed to load country: ${countryInfo.id}`);
      }
    }

    countriesCache = countries;
    return countries;
  } catch (error) {
    console.error('Failed to load country data:', error);
    return [];
  }
}

// Get a single country by ID
export async function getCountryById(id: string): Promise<CountryFullData | undefined> {
  if (countriesIndex) {
    return countriesIndex.get(id);
  }
  
  const countries = await loadAllCountries();
  return countries.find(c => c.id === id);
}

// Clear cache (useful for development)
export function clearCache(): void {
  countriesCache = null;
  countriesIndex = null;
}
