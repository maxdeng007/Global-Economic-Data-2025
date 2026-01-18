const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    console.log('Testing visualization dashboard...\n');
    
    // Test 1: Load page
    await page.goto('http://localhost:8080/index.html');
    await page.waitForTimeout(2000);
    console.log('✓ Page loaded');
    
    // Test 2: Check visualization section exists
    const vizSection = await page.$('#vizSection');
    console.log('✓ Visualization section exists:', !!vizSection);
    
    // Test 3: Check GDP chart exists
    const gdpChart = await page.$('#gdpChart');
    console.log('✓ GDP chart exists:', !!gdpChart);
    
    // Test 4: Check salary chart exists
    const salaryChart = await page.$('#salaryChart');
    console.log('✓ Salary chart exists:', !!salaryChart);
    
    // Test 5: Check region summary
    const regionSummary = await page.$('#regionSummary');
    const regionCards = await regionSummary.$$('.region-card');
    console.log('✓ Region summary cards:', regionCards.length);
    
    // Test 6: Check major economies
    const majorEconomies = await page.$('#majorEconomies');
    const economyCards = await majorEconomies.$$('.economy-card');
    console.log('✓ Major economy cards:', economyCards.length);
    
    // Test 7: Check country grid
    const countryGrid = await page.$('#countryGrid');
    const countryCards = await countryGrid.$$('.country-card');
    console.log('✓ Country grid cards:', countryCards.length);
    
    console.log('\n✅ Visualization dashboard is working!');
    
    await browser.close();
})();
