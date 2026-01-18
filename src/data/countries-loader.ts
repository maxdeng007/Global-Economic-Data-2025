/**
 * Loads country data from JSON files for homepage use
 */

import { useState, useEffect } from 'react';
import type { Country, RegionType, EconomyType } from '../types/country';

export interface CountryMetricsData {
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

export interface CountryCardData {
  id: string;
  name: { zh: string; en: string };
  flag: string;
  file: string;
  region: RegionType;
  economy: EconomyType;
  metrics: CountryMetricsData;
}

let countriesCache: CountryCardData[] | null = null;

export async function loadAllCountryMetrics(): Promise<CountryCardData[]> {
  if (countriesCache) {
    return countriesCache;
  }

  try {
    const response = await fetch('/data/index.json');
    const index = await response.json() as { id: string }[];
    
    const countries: CountryCardData[] = [];
    
    for (const countryInfo of index) {
      try {
        const dataResponse = await fetch(`/data/${countryInfo.id}.json`);
        const data = await dataResponse.json();
        
        countries.push({
          id: data.id,
          name: data.name,
          flag: data.flag,
          file: data.file,
          region: data.region as RegionType,
          economy: data.economy as EconomyType,
          metrics: {
            salary: data.metrics?.salary || '$0',
            salaryRaw: data.metrics?.salaryRaw || 0,
            household: data.metrics?.household || '$0',
            householdRaw: data.metrics?.householdRaw || 0,
            gdpPerCapita: data.metrics?.gdpPerCapita || '$0',
            gdpPerCapitaRaw: data.metrics?.gdpPerCapitaRaw || 0,
            gdpGrowth: data.metrics?.gdpGrowth || '0%',
            currency: data.metrics?.currency || 'USD',
            population: data.metrics?.population || '0M'
          }
        });
      } catch (err) {
        console.warn(`Failed to load metrics for: ${countryInfo.id}`);
      }
    }
    
    countriesCache = countries;
    return countries;
  } catch (error) {
    console.error('Failed to load country metrics:', error);
    return [];
  }
}

// Hook for React components
export function useCountryMetrics() {
  const [countries, setCountries] = useState<CountryCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllCountryMetrics().then(data => {
      setCountries(data);
      setLoading(false);
    });
  }, []);

  return { countries, loading };
}
