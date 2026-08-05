import { chromium } from 'playwright';

const candidates = [
  '1461023058943-07fcbe16d735',
  '1496942299866-9e7ab403e614',
  '1544787219-7f47ccb76574',
  '1568702846914-96b305d2aaeb',
  '1504707748692-419802cf939d',
  '1511537190424-bbbab87ac5eb',
  '1500522144261-ea64433bbe27',
  '1504630083234-14187a9df0f5',
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 400 } });
const page = await ctx.newPage();

const html = `<html><body style="margin:0;background:#111;display:flex;flex-wrap:wrap;gap:6px;padding:6px">
${candidates.map((id, i) => `
  <div style="position:relative;width:220px;height:165px;flex-shrink:0">
    <img src="https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=440&q=75"
         style="width:100%;height:100%;object-fit:cover;display:block"/>
    <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.75);color:#fff;font:11px monospace;padding:4px;overflow:hidden;white-space:nowrap">#${i+1}: ${id.slice(0,24)}</div>
  </div>`).join('')}
</body></html>`;

await page.setContent(html);
await page.waitForTimeout(5000);
await page.screenshot({ path: 'image_preview2.png', fullPage: true });
await browser.close();
console.log('done');
