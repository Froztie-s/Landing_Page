import { chromium } from 'playwright';

const candidates = [
  '1511537190424-bbbab87ac5eb',
  '1580933073521-dc49ac0d4e6a',
  '1506905925346-21bda4d32df4',
  '1559827260-dc66d52bef19',
  '1500522144261-ea64433bbe27',
  '1558618666-fcd25c85cd64',
  '1504630083234-14187a9df0f5',
  '1498804103079-a6351b050096',
  '1593113598332-cd288d649433',
  '1579783901586-d88db74b4fe4',
  '1587049352851-8d4e89133924',
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 300 } });
const page = await ctx.newPage();

const html = `<html><body style="margin:0;background:#111;display:flex;flex-wrap:wrap;gap:4px;padding:4px">
${candidates.map(id => `
  <div style="position:relative;width:180px;height:130px;flex-shrink:0">
    <img src="https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=360&q=70"
         style="width:100%;height:100%;object-fit:cover;display:block"/>
    <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.7);color:#fff;font:10px monospace;padding:3px 4px;overflow:hidden;white-space:nowrap">${id.slice(0,20)}</div>
  </div>`).join('')}
</body></html>`;

await page.setContent(html);
await page.waitForTimeout(4000);
await page.screenshot({ path: 'image_preview.png', fullPage: true });
await browser.close();
console.log('done');
