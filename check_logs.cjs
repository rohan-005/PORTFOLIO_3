const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', console.error);
  page.on('requestfailed', request =>
    console.log(`REQUEST FAILED: ${request.url()} ${request.failure().errorText}`)
  );

  console.log('Navigating to localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  console.log('Waiting 5s for 3D load...');
  await new Promise(r => setTimeout(r, 5000));
  
  await browser.close();
})();
