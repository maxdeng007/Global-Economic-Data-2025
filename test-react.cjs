const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Check what elements exist
    const heroTitle = await page.$eval('.hero-title', el => el.textContent).catch(() => 'Not found');
    const navbar = await page.$('.navbar') !== null;
    const featuredCards = await page.$$('.featured-card');
    const countryCards = await page.$$('.country-card');
    
    console.log('=== React Homepage Test ===');
    console.log('Navbar exists:', navbar);
    console.log('Hero title:', heroTitle);
    console.log('Featured cards:', featuredCards.length);
    console.log('Country cards:', countryCards.length);
    console.log('Errors:', errors.length === 0 ? 'None' : errors);
    console.log(errors.length === 0 ? '✅ SUCCESS' : '❌ FAILED');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
