const { chromium } = require(process.argv[2] || 'playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const routes = [...fs.readFileSync('src/App.tsx', 'utf8').matchAll(/path: '([^']+)'/g)].map(m => m[1]);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const route of routes) {
      await page.goto('http://127.0.0.1:5188' + route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1, route + ' heading');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert.equal(overflow, false, route + ' overflow at ' + width);
    }
    await page.goto('http://127.0.0.1:5188');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `design-${width}.png`, fullPage: true });
  }
  await page.locator('.faq__q button').first().click();
  assert.equal(await page.locator('.faq__q button').first().getAttribute('aria-expanded'), 'true');
  await page.getByRole('button', { name: 'Start a drawing review free', exact: true }).first().click();
  assert.equal(await page.locator('dialog[open]').count(), 1);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog[open]').count(), 0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.menu-button').click();
  assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'), 'false');
  await page.goto('http://127.0.0.1:5188/pricing');
  await page.getByRole('radio', { name: 'Team', exact: true }).check();
  await page.getByRole('radio', { name: 'India INR', exact: true }).check();
  assert.equal(await page.getByRole('radio', { name: 'India INR', exact: true }).isChecked(), true);
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto('http://127.0.0.1:5188/product');
  await page.screenshot({ path: 'design-product.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log(`${routes.length} routes passed at three widths; FAQ, dialog, mobile navigation and pricing controls passed; no page errors.`);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
