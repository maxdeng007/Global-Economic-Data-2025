const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to page...');
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    console.log('Waiting for page to settle...');
    await page.waitForTimeout(8000);
    
    // Check for loading message
    const loading = await page.locator('.loading-message').textContent().catch(() => 'none');
    console.log('Loading message:', loading);
    
    // Check for country cards
    const countryCards = await page.locator('.country-card').count();
    console.log('Country cards found:', countryCards);
    
    // Check if root has content
    const rootContent = await page.locator('#root').innerHTML();
    console.log('Root content length:', rootContent.length);
    
    // Check for any error
    const errorContent = await page.locator('.error-message, .loading-message').count();
    console.log('Error/Loading elements:', errorContent);
    
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
