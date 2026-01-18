/**
 * Validates extracted data quality
 * Checks for missing data, incorrect values, and inconsistencies
 */

import * as fs from 'fs';
import * as path from 'path';

const SOURCES_DIR = path.join(__dirname, '../sources');
const DATA_DIR = path.join(__dirname, '../public/data');

interface ValidationIssue {
  country: string;
  field: string;
  issue: string;
  severity: 'error' | 'warning' | 'info';
}

function checkValue(value: any, expected: string): ValidationIssue | null {
  if (value === null || value === undefined || value === '') {
    return { country: '', field: '', issue: 'Missing value', severity: 'error' };
  }
  
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return { country: '', field: '', issue: 'Empty array', severity: 'error' };
    }
    return null;
  }
  
  if (typeof value === 'object') {
    return null; // Skip objects
  }
  
  // Check for N/A or similar
  const strVal = String(value).toLowerCase();
  if (['n/a', 'na', 'null', 'undefined', '0', '$0', '0%'].includes(strVal)) {
    return { country: '', field: '', issue: `Default/placeholder value: ${value}`, severity: 'warning' };
  }
  
  return null;
}

function validateCountry(countryId: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  
  const jsonPath = path.join(DATA_DIR, `${countryId}.json`);
  const mdPath = path.join(SOURCES_DIR, fs.readdirSync(SOURCES_DIR).find(f => 
    f.toLowerCase().includes(countryId.replace('-', ' ')) || 
    f.toLowerCase().includes(countryId)
  ) || '');
  
  if (!fs.existsSync(jsonPath)) {
    issues.push({ country: countryId, field: 'file', issue: 'JSON file missing', severity: 'error' });
    return issues;
  }
  
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const mdContent = fs.existsSync(mdPath) ? fs.readFileSync(mdPath, 'utf-8') : '';
  
  // Check metrics
  const metrics = jsonData.metrics;
  if (metrics) {
    // Check for placeholder values
    if (metrics.salary === '$0' || metrics.salaryRaw === 0) {
      issues.push({ country: countryId, field: 'salary', issue: 'Salary is placeholder ($0)', severity: 'error' });
    }
    if (metrics.household === '$0' || metrics.householdRaw === 0) {
      issues.push({ country: countryId, field: 'household', issue: 'Household income is placeholder ($0)', severity: 'error' });
    }
    if (metrics.gdpPerCapita === '$0' || metrics.gdpPerCapitaRaw === 0) {
      issues.push({ country: countryId, field: 'gdpPerCapita', issue: 'GDP per capita is placeholder ($0)', severity: 'error' });
    }
    if (metrics.population === '0M' || metrics.population === '10M') {
      issues.push({ country: countryId, field: 'population', issue: `Population may be default: ${metrics.population}`, severity: 'warning' });
    }
    if (metrics.gdpGrowth === '0%') {
      issues.push({ country: countryId, field: 'gdpGrowth', issue: 'GDP growth is 0% - may need review', severity: 'warning' });
    }
  }
  
  // Check fullData
  const fullData = jsonData.fullData;
  if (fullData) {
    // Check for common missing fields
    const employment = fullData.employment;
    if (employment) {
      if (employment.rate === 'N/A') {
        issues.push({ country: countryId, field: 'unemployment', issue: 'Unemployment rate not extracted', severity: 'warning' });
      }
      if (employment.laborForce === 'N/A') {
        issues.push({ country: countryId, field: 'laborForce', issue: 'Labor force data missing', severity: 'info' });
      }
    }
    
    const household = fullData.householdIncome;
    if (household) {
      if (household.gini === 'N/A' || household.gini === '2024' || household.gini === '2020') {
        issues.push({ country: countryId, field: 'gini', issue: `Gini coefficient issue: ${household.gini}`, severity: 'warning' });
      }
      if (household.povertyRate === 'N/A') {
        issues.push({ country: countryId, field: 'povertyRate', issue: 'Poverty rate not extracted', severity: 'info' });
      }
    }
    
    const gdp = fullData.gdp;
    if (gdp) {
      if (gdp.inflation === 'N/A') {
        issues.push({ country: countryId, field: 'inflation', issue: 'Inflation data not extracted', severity: 'info' });
      }
      if (gdp.unemployment === 'N/A') {
        issues.push({ country: countryId, field: 'unemployment', issue: 'Unemployment not in GDP section', severity: 'info' });
      }
    }
  }
  
  // Cross-validate: Check if key numbers exist in markdown
  if (mdContent) {
    const metricsStr = JSON.stringify(metrics);
    // This is a basic check - a real validator would parse the markdown
  }
  
  return issues;
}

function main() {
  console.log('🔍 Validating extracted data quality...\n');
  
  const jsonFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
  const allIssues: ValidationIssue[] = [];
  
  let errors = 0;
  let warnings = 0;
  let info = 0;
  
  for (const file of jsonFiles) {
    const countryId = file.replace('.json', '');
    const issues = validateCountry(countryId);
    allIssues.push(...issues);
    
    for (const issue of issues) {
      if (issue.severity === 'error') errors++;
      else if (issue.severity === 'warning') warnings++;
      else info++;
      
      console.log(`[${issue.severity.toUpperCase()}] ${countryId}.${issue.field}: ${issue.issue}`);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Warnings: ${warnings}`);
  console.log(`   Info: ${info}`);
  console.log(`   Total countries: ${jsonFiles.length}`);
  console.log(`   Countries with issues: ${new Set(allIssues.map(i => i.country)).size}`);
  
  if (errors > 0) {
    console.log('\n⚠️  Critical issues found! Some data may be missing or incorrect.');
    console.log('   Consider reviewing the markdown files and updating the parser.');
  }
}

main();
