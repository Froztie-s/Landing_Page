import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// Desktop full scroll shots
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

// Contact section
await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: 'audit_contact.png' });

// Services closer
await page.evaluate(() => document.querySelector('#services')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: 'audit_services.png' });

// Why section
await page.evaluate(() => document.querySelector('#why')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: 'audit_why.png' });

// Mobile contact
const mCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
const mPage = await mCtx.newPage();
await mPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await mPage.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }));
await mPage.waitForTimeout(600);
await mPage.screenshot({ path: 'audit_mobile_contact.png' });

// Full page
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: 'audit_fullpage.png', fullPage: true });

await browser.close();
console.log('Screenshots done');
