const { chromium } = require(process.argv[2] || 'playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const baseUrl = process.env.AUDIT_URL || 'http://127.0.0.1:5189';

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(15000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const routes = [...fs.readFileSync('src/App.tsx', 'utf8').matchAll(/path: '([^']+)'/g)].map(m => m[1]);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const route of routes) {
      await page.goto(baseUrl + route);
      try { await page.locator('h1').waitFor(); }
      catch (error) { console.log({ route, width, errors, body: (await page.locator('body').innerText()).slice(0, 1500) }); throw error; }
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1, route + ' heading');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      if (overflow) console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e instanceof HTMLElement && e.getBoundingClientRect().right > innerWidth + 1).slice(0, 15).map(e => ({ class: e.className, width: e.getBoundingClientRect().width }))));
      assert.equal(overflow, false, route + ' overflow at ' + width);
    }
    console.log(`Checked ${routes.length} routes at ${width}px`);
    await page.goto(baseUrl);
    await page.locator('[role="tab"]').first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `design-${width}.png`, fullPage: true, animations: 'disabled' });
    await page.screenshot({ path: `design-viewport-${width}.png`, animations: 'disabled' });
  }
  await page.locator('.faq__q button').first().click();
  const firstTab = page.getByRole('tab', { name: 'Drawing review' });
  await firstTab.focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('tab', { name: 'Revision comparison' }).getAttribute('aria-selected'), 'true');
  assert.equal(await page.getByRole('tabpanel').count(), 1);
  await page.keyboard.press('End');
  assert.equal(await page.getByRole('tab', { name: 'Decision history' }).getAttribute('aria-selected'), 'true');
  await page.keyboard.press('Home');
  assert.equal(await firstTab.getAttribute('aria-selected'), 'true');
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
  await page.goto(baseUrl + '/pricing');
  await page.getByRole('radio', { name: 'Team', exact: true }).check();
  await page.getByRole('radio', { name: 'India INR', exact: true }).check();
  assert.equal(await page.getByRole('radio', { name: 'India INR', exact: true }).isChecked(), true);
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto(baseUrl + '/product');
  await page.screenshot({ path: 'design-product.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log(`${routes.length} routes passed at three widths; FAQ, dialog, mobile navigation and pricing controls passed; no page errors.`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
