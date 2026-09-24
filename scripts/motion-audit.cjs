const { chromium } = require(process.argv[2] || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:5190');
    await page.locator('.showcase').scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await page.waitForSelector('.showcase--playing');
    await page.waitForFunction(() => document.querySelector('[role="tab"][aria-selected="true"]').textContent.includes('Revision comparison'), { timeout: 12000 });
    await page.getByRole('button', { name: 'Pause tour' }).click();
    await page.mouse.move(0, 0);
    await page.getByRole('button', { name: 'Play tour' }).evaluate(el => el.blur());
    const selected = await page.locator('[role="tab"][aria-selected="true"]').innerText();
    await page.waitForTimeout(8300);
    assert.equal(await page.locator('[role="tab"][aria-selected="true"]').innerText(), selected);
    await page.getByRole('tab', { name: 'Drawing review' }).click();
    await page.waitForTimeout(600);
    assert.ok(await page.locator('.showcase .ws__canvas .ds-cloud').first().evaluate(el => el.getAnimations().length > 0));
    await page.screenshot({ path: 'motion-showcase.png' });
    await page.locator('.workflow-story').first().scrollIntoViewIfNeeded();
    await page.waitForSelector('.workflow-story.motion-entered');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('.showcase__play'));
    assert.equal(await page.locator('.showcase--playing').count(), 0);
    await page.getByRole('tab', { name: 'Decision history' }).click();
    assert.equal(await page.getByRole('tabpanel').count(), 1);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    assert.deepEqual(errors, []);
    console.log('Passed: autoplay, pause, manual views, animated SVG, scroll reveal, live reduced-motion changes, mobile overflow and browser errors.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
