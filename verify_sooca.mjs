import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const consoleErrors = [];

// Desktop page
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', err => consoleErrors.push(`PAGE ERROR: ${err.message}`));

await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 20000 });
await page.screenshot({ path: 'verify_desktop.png' });

const heroH1 = await page.$eval('h1', el => el.textContent.trim()).catch(() => 'NOT FOUND');
const navText = await page.$eval('header', el => el.textContent.trim().substring(0, 80)).catch(() => 'NOT FOUND');
const sections = {};
for (const id of ['services','about','why','contact','faq']) {
  sections[id] = !!(await page.$(`#${id}`));
}
const hasFooter = !!(await page.$('footer'));
const cards = (await page.$$('[class*="card"]')).length;
const points = (await page.$$('[class*="point"]')).length;
const imgCount = (await page.$$('img')).length;

// Services
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(500);
await page.screenshot({ path: 'verify_services.png' });

// About
await page.evaluate(() => window.scrollTo(0, 2200));
await page.waitForTimeout(500);
await page.screenshot({ path: 'verify_about.png' });

// FAQ test
await page.evaluate(() => document.querySelector('#faq')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(400);
const faqBtn = await page.$('#faq button');
if (faqBtn) { await faqBtn.click(); await page.waitForTimeout(500); }
await page.screenshot({ path: 'verify_faq.png' });

// Mobile
const mCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
const mPage = await mCtx.newPage();
await mPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await mPage.screenshot({ path: 'verify_mobile.png' });
const hamburger = await mPage.$('[class*="hamburger"]');
const hamVisible = hamburger ? await hamburger.isVisible() : false;
if (hamburger) {
  await hamburger.click();
  await mPage.waitForTimeout(500);
  await mPage.screenshot({ path: 'verify_mobile_menu.png' });
}

await browser.close();
console.log(JSON.stringify({ consoleErrors, heroH1, navText, sections, hasFooter, cards, points, imgCount, hamVisible }, null, 2));
