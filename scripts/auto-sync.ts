/**
 * Auto-sync script - generates all config files from markdown sources
 * Run this after adding new country markdown files
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCES_DIR = path.join(__dirname, '../sources');
const DATA_DIR = path.join(__dirname, '../public/data');
const CONFIG_OUTPUT = path.join(__dirname, 'country-config.ts');
const COUNTRIES_OUTPUT = path.join(__dirname, '../src/data/countries.ts');

// Country-specific overrides (metadata only)
const countryOverrides: Record<string, { zh: string; en: string; region: string; economy: string; flag: string }> = {
  'argentina': { zh: '阿根廷', en: 'Argentina', region: 'americas', economy: 'emerging', flag: '🇦🇷' },
  'australia': { zh: '澳大利亚', en: 'Australia', region: 'asia-pacific', economy: 'developed', flag: '🇦🇺' },
  'austria': { zh: '奥地利', en: 'Austria', region: 'europe', economy: 'developed', flag: '🇦🇹' },
  'belgium': { zh: '比利时', en: 'Belgium', region: 'europe', economy: 'developed', flag: '🇧🇪' },
  'brazil': { zh: '巴西', en: 'Brazil', region: 'americas', economy: 'emerging', flag: '🇧🇷' },
  'canada': { zh: '加拿大', en: 'Canada', region: 'americas', economy: 'g7', flag: '🇨🇦' },
  'chile': { zh: '智利', en: 'Chile', region: 'americas', economy: 'emerging', flag: '🇨🇱' },
  'china': { zh: '中国', en: 'China', region: 'asia-pacific', economy: 'g2', flag: '🇨🇳' },
  'colombia': { zh: '哥伦比亚', en: 'Colombia', region: 'americas', economy: 'emerging', flag: '🇨🇴' },
  'denmark': { zh: '丹麦', en: 'Denmark', region: 'europe', economy: 'developed', flag: '🇩🇰' },
  'egypt': { zh: '埃及', en: 'Egypt', region: 'africa', economy: 'emerging', flag: '🇪🇬' },
  'finland': { zh: '芬兰', en: 'Finland', region: 'europe', economy: 'developed', flag: '🇫🇮' },
  'france': { zh: '法国', en: 'France', region: 'europe', economy: 'g7', flag: '🇫🇷' },
  'germany': { zh: '德国', en: 'Germany', region: 'europe', economy: 'g4', flag: '🇩🇪' },
  'india': { zh: '印度', en: 'India', region: 'asia-pacific', economy: 'emerging', flag: '🇮🇳' },
  'iraq': { zh: '伊拉克', en: 'Iraq', region: 'middle-east', economy: 'emerging', flag: '🇮🇶' },
  'ireland': { zh: '爱尔兰', en: 'Ireland', region: 'europe', economy: 'developed', flag: '🇮🇪' },
  'israel': { zh: '以色列', en: 'Israel', region: 'middle-east', economy: 'developed', flag: '🇮🇱' },
  'italy': { zh: '意大利', en: 'Italy', region: 'europe', economy: 'g7', flag: '🇮🇹' },
  'japan': { zh: '日本', en: 'Japan', region: 'asia-pacific', economy: 'g3', flag: '🇯🇵' },
  'mexico': { zh: '墨西哥', en: 'Mexico', region: 'americas', economy: 'emerging', flag: '🇲🇽' },
  'netherlands': { zh: '荷兰', en: 'Netherlands', region: 'europe', economy: 'developed', flag: '🇳🇱' },
  'portugal': { zh: '葡萄牙', en: 'Portugal', region: 'europe', economy: 'developed', flag: '🇵🇹' },
  'russia': { zh: '俄罗斯', en: 'Russia', region: 'europe', economy: 'emerging', flag: '🇷🇺' },
  'singapore': { zh: '新加坡', en: 'Singapore', region: 'asia-pacific', economy: 'developed', flag: '🇸🇬' },
  'south-korea': { zh: '韩国', en: 'South Korea', region: 'asia-pacific', economy: 'developed', flag: '🇰🇷' },
  'spain': { zh: '西班牙', en: 'Spain', region: 'europe', economy: 'developed', flag: '🇪🇸' },
  'sweden': { zh: '瑞典', en: 'Sweden', region: 'europe', economy: 'developed', flag: '🇸🇪' },
  'switzerland': { zh: '瑞士', en: 'Switzerland', region: 'europe', economy: 'developed', flag: '🇨🇭' },
  'thailand': { zh: '泰国', en: 'Thailand', region: 'asia-pacific', economy: 'emerging', flag: '🇹🇭' },
  'turkey': { zh: '土耳其', en: 'Turkey', region: 'europe', economy: 'emerging', flag: '🇹🇷' },
  'uk': { zh: '英国', en: 'United Kingdom', region: 'europe', economy: 'g5', flag: '🇬🇧' },
  'ukraine': { zh: '乌克兰', en: 'Ukraine', region: 'europe', economy: 'emerging', flag: '🇺🇦' },
  'uae': { zh: '阿联酋', en: 'United Arab Emirates', region: 'middle-east', economy: 'developed', flag: '🇦🇪' },
  'usa': { zh: '美国', en: 'United States', region: 'americas', economy: 'g1', flag: '🇺🇸' },
  'vietnam': { zh: '越南', en: 'Vietnam', region: 'asia-pacific', economy: 'emerging', flag: '🇻🇳' },
};

// Extract country ID from filename
function extractId(filename: string): string {
  // Handle special cases
  if (filename.includes('China 2025')) return 'china';
  if (filename.includes('France vers')) return 'france';
  
  // Remove suffix
  let name = filename
    .replace(/ around \d{4}\.md$/, '')
    .replace(/ vers \d{4}\.md$/, '')
    .replace('.md', '');
  
  // Convert to ID format
  name = name.toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, '-');
  
  // Known ID mappings
  const idMap: Record<string, string> = {
    'united-states': 'usa',
    'united-kingdom': 'uk',
    'united-arab-emirates': 'uae',
    'south-korea': 'south-korea',
  };
  
  return idMap[name] || name;
}

// Generate country config file
function generateConfig(countries: any[]): string {
  let output = `export const COUNTRY_CONFIG: Record<string, {
  id: string;
  name: { zh: string; en: string };
  flag: string;
  region: string;
  economy: string;
  file: string;
  currency: string;
  population: string;
}> = {\n`;
  
  for (const c of countries) {
    output += `  '${c.filename.replace(/\.md$/, '')}': {\n`;
    output += `    id: '${c.id}',\n`;
    output += `    name: { zh: '${c.name.zh}', en: '${c.name.en}' },\n`;
    output += `    flag: '${c.flag}',\n`;
    output += `    region: '${c.region}',\n`;
    output += `    economy: '${c.economy}',\n`;
    output += `    file: '${c.file}',\n`;
    output += `    currency: '${c.currency}',\n`;
    output += `    population: '${c.population}'\n`;
    output += `  },\n`;
  }
  
  output += `};\n`;
  return output;
}

// Generate countries.ts file - reads metrics from JSON files
function generateCountries(countries: any[]): string {
  let output = `import type { Country } from '../types/country';

export const COUNTRIES_DATA: Country[] = [\n`;
  
  for (const c of countries) {
    // Read metrics from JSON file if it exists
    let metrics = {
      salary: '$0',
      salaryRaw: 0,
      household: '$0',
      householdRaw: 0,
      gdpPerCapita: '$0',
      gdpPerCapitaRaw: 0,
      gdpGrowth: '0%',
      currency: 'USD',
      population: '10M'
    };
    
    const jsonPath = path.join(DATA_DIR, `${c.id}.json`);
    if (fs.existsSync(jsonPath)) {
      try {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        if (jsonData.metrics) {
          metrics = {
            salary: jsonData.metrics.salary || '$0',
            salaryRaw: jsonData.metrics.salaryRaw || 0,
            household: jsonData.metrics.household || '$0',
            householdRaw: jsonData.metrics.householdRaw || 0,
            gdpPerCapita: jsonData.metrics.gdpPerCapita || '$0',
            gdpPerCapitaRaw: jsonData.metrics.gdpPerCapitaRaw || 0,
            gdpGrowth: jsonData.metrics.gdpGrowth || '0%',
            currency: jsonData.metrics.currency || 'USD',
            population: jsonData.metrics.population || '10M'
          };
        }
      } catch (e) {
        // Use defaults if JSON is invalid
      }
    }
    
    output += `  {\n`;
    output += `    id: '${c.id}',\n`;
    output += `    name: { zh: '${c.name.zh}', en: '${c.name.en}' },\n`;
    output += `    flag: '${c.flag}',\n`;
    output += `    file: '${c.file}',\n`;
    output += `    region: '${c.region}',\n`;
    output += `    economy: '${c.economy}',\n`;
    output += `    comingSoon: false,\n`;
    output += `    metrics: {\n`;
    output += `      salary: '${metrics.salary.replace(/'/g, "\\'")}',\n`;
    output += `      salaryRaw: ${metrics.salaryRaw},\n`;
    output += `      household: '${metrics.household.replace(/'/g, "\\'")}',\n`;
    output += `      householdRaw: ${metrics.householdRaw},\n`;
    output += `      gdpPerCapita: '${metrics.gdpPerCapita.replace(/'/g, "\\'")}',\n`;
    output += `      gdpPerCapitaRaw: ${metrics.gdpPerCapitaRaw},\n`;
    output += `      gdpGrowth: '${metrics.gdpGrowth}',\n`;
    output += `      currency: '${metrics.currency}',\n`;
    output += `      population: '${metrics.population}'\n`;
    output += `    }\n`;
    output += `  },\n`;
  }
  
  output += `];\n`;
  return output;
}

// Main function
function main() {
  console.log('🔄 Auto-syncing country data...\n');
  
  // Read all markdown files
  const files = fs.readdirSync(SOURCES_DIR).filter(f => f.endsWith('.md'));
  console.log(`📁 Found ${files.length} markdown files\n`);
  
  const countries: any[] = [];
  
  for (const filename of files) {
    const filePath = path.join(SOURCES_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract ID
    const id = extractId(filename);
    
    // Check if we have an override
    const override = countryOverrides[id];
    
    if (!override) {
      console.warn(`⚠️  No override for: ${filename} (${id})`);
    }
    
    // Generate file name
    let fileName = filename
      .replace('.md', '')
      .replace(/ /g, '-')
      .replace('China-2025', 'China')
      .replace('vers-2025', '')
      + '-Economic-Report.html';
    
    // Clean up file names
    fileName = fileName.replace(/-+/g, '-');
    
    // Detect currency (for config only)
    const currency = detectCurrency(content);
    
    // Detect population (for config only)
    const population = detectPopulation(content);
    
    countries.push({
      filename,
      id,
      name: override ? { zh: override.zh, en: override.en } : { zh: id, en: id },
      flag: override?.flag || '🏳️',
      region: override?.region || 'asia-pacific',
      economy: override?.economy || 'emerging',
      file: fileName,
      currency,
      population
    });
    
    console.log(`✅ ${override?.en || id} (${id}) - ${override?.region || '?'} - ${override?.economy || '?'}`);
  }
  
  // Sort by English name
  countries.sort((a, b) => a.name.en.localeCompare(b.name.en));
  
  // Generate config
  const configContent = generateConfig(countries);
  fs.writeFileSync(CONFIG_OUTPUT, configContent);
  console.log(`\n📝 Generated: ${CONFIG_OUTPUT}`);
  
  // Generate countries.ts with actual metrics from JSON
  const countriesContent = generateCountries(countries);
  fs.writeFileSync(COUNTRIES_OUTPUT, countriesContent);
  console.log(`📝 Generated: ${COUNTRIES_OUTPUT}`);
  
  console.log('\n✅ Auto-sync complete!');
  console.log('\nNext steps:');
  console.log('  1. Run: npm run sync  (generates JSON data files)');
  console.log('  2. Run: npm run auto-sync (updates countries.ts with metrics)');
  console.log('  3. Run: npm run build (rebuild frontend)');
  console.log('  4. Run: npm run dev   (start dev server)');
}

// Currency detection (for config only)
function detectCurrency(content: string): string {
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('$') || lowerContent.includes('usd')) return 'USD';
  if (lowerContent.includes('€') || lowerContent.includes('eur')) return 'EUR';
  if (lowerContent.includes('£') || lowerContent.includes('gbp')) return 'GBP';
  if (lowerContent.includes('¥') || lowerContent.includes('jpy')) return 'JPY';
  if (lowerContent.includes('cny') || lowerContent.includes('yuan')) return 'CNY';
  if (lowerContent.includes('inr') || lowerContent.includes('rupee')) return 'INR';
  if (lowerContent.includes('krw')) return 'KRW';
  if (lowerContent.includes('aud')) return 'AUD';
  if (lowerContent.includes('cad')) return 'CAD';
  if (lowerContent.includes('chf')) return 'CHF';
  if (lowerContent.includes('brl')) return 'BRL';
  if (lowerContent.includes('mxn')) return 'MXN';
  if (lowerContent.includes('rub')) return 'RUB';
  if (lowerContent.includes('thb')) return 'THB';
  if (lowerContent.includes('sgd')) return 'SGD';
  if (lowerContent.includes('vnd')) return 'VND';
  if (lowerContent.includes('cop')) return 'COP';
  if (lowerContent.includes('egp')) return 'EGP';
  return 'USD';
}

// Population detection (for config only)
function detectPopulation(content: string): string {
  // Try to find population in millions
  const match = content.match(/(\d+\.?\d*)\s*(billion|m)\s*(people|residents|inhabitants)/i);
  if (match) {
    const num = parseFloat(match[1]);
    if (match[2].toLowerCase().startsWith('b')) {
      return (num * 1000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    return num.toFixed(1).replace(/\.0$/, '') + 'M';
  }
  
  // Try another pattern
  const numMatch = content.match(/population[:\s]+(\d{2,3})\.?\d*\s*(million|m)/i);
  if (numMatch) return numMatch[1] + 'M';
  
  return '10M';
}

main();
