// Renders the link-preview images and the icon set from the logo files.
//
//   node tools/make-images.mjs
//
// Needs Playwright with Chromium (only this script; tools/build.mjs stays dependency-free).
// Inputs:  assets/logo-white.png       full logo (mark + ZEMITS wordmark), white on transparent
//          assets/logo-mark-white.png  the round mark alone, cut from the logo, for small icons
// Outputs: img/og/{lv,ru,en}-{index,aparati}.png  1200×630 previews
//          favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest
// Run it again whenever the logo, a page heading or the number of devices changes, then run the build.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, data) => { fs.mkdirSync(path.dirname(path.join(ROOT, f)), { recursive: true }); fs.writeFileSync(path.join(ROOT, f), data); };

const BLUE = '#1a4a8a';
const pngUri = f => 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, f)).toString('base64');
const LOGO = pngUri('assets/logo-white.png');
const MARK = pngUri('assets/logo-mark-white.png');

function i18nOf(page) {
  const src = read('src/' + page);
  const ctx = { document: { addEventListener() {}, getElementById() { return null; } } };
  vm.createContext(ctx);
  vm.runInContext(read('js/devices.js') + ';this.devices=devices;this.mergeDeviceUi=mergeDeviceUi;', ctx);
  const a = src.indexOf('const i18n = {'), b = src.indexOf('\n};', a);
  vm.runInContext(src.slice(a, b + 3).replace('const i18n', 'this.i18n') + ';mergeDeviceUi(this.i18n);', ctx);
  return ctx;
}

/* ── 1200×630 preview card ── */
const ogHtml = ({ eyebrow, title, accent, sub }) => `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Outfit:wght@400;500;600&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:Outfit,sans-serif;color:#fff;
  background:linear-gradient(135deg,#0d2040 0%,${BLUE} 48%,#0a3060 100%);position:relative}
body::before{content:'';position:absolute;inset:0;opacity:.07;background-image:radial-gradient(circle at 1px 1px,#fff 1px,transparent 0);background-size:30px 30px}
body::after{content:'';position:absolute;right:-180px;top:-180px;width:620px;height:620px;border-radius:50%;background:radial-gradient(closest-side,rgba(77,166,255,.35),transparent)}
.mark{position:absolute;right:70px;bottom:60px;width:300px;height:300px;opacity:.10;object-fit:contain}
.wrap{position:relative;z-index:1;height:100%;padding:70px 80px;display:flex;flex-direction:column}
.logo{height:58px;align-self:flex-start}
.eyebrow{margin-top:auto;font-size:22px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#8cc4ff;display:flex;align-items:center;gap:16px}
.eyebrow::before{content:'';width:44px;height:2px;background:#8cc4ff}
h1{margin-top:22px;font-family:'Playfair Display',serif;font-weight:400;font-size:70px;line-height:1.08;max-width:960px}
h1 em{display:block;font-style:italic;color:#8cc4ff}
.sub{margin-top:26px;font-size:25px;line-height:1.45;color:rgba(255,255,255,.78);max-width:900px}
.site{position:absolute;right:80px;top:84px;font-size:22px;font-weight:500;color:rgba(255,255,255,.7);letter-spacing:.02em}
</style></head><body>
<img class="mark" src="${MARK}">
<div class="site">zemits-latvija.lv</div>
<div class="wrap">
  <img class="logo" src="${LOGO}">
  <div class="eyebrow">${eyebrow}</div>
  <h1>${title}${accent ? `<em>${accent}</em>` : ''}</h1>
  ${sub ? `<div class="sub">${sub}</div>` : ''}
</div></body></html>`;

/* ── square icon: white mark on the brand blue, rounded for app icons ── */
const iconHtml = (size, rounded) => `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0}html,body{width:${size}px;height:${size}px;background:transparent}
div{width:100%;height:100%;background:${BLUE};border-radius:${rounded ? '22%' : '0'};display:flex;align-items:center;justify-content:center}
img{width:${size < 64 ? 84 : 72}%;height:${size < 64 ? 84 : 72}%;object-fit:contain}
</style></head><body><div><img src="${MARK}"></div></body></html>`;

const strip = s => String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<\/?em>/g, '');

const browser = await chromium.launch();
const page = await browser.newPage();

const home = i18nOf('index.html');
const cat = i18nOf('aparati.html');
for (const lang of ['lv', 'ru', 'en']) {
  const h = home.i18n[lang], c = cat.i18n[lang];
  const cards = {
    index: { eyebrow: 'Zemits Skin Expert', title: strip(h.hero_title), accent: strip(h.hero_subtitle), sub: '' },
    aparati: { eyebrow: strip(c.cat_eyebrow), title: 'Zemits', accent: strip(c.cat_title), sub: `${cat.devices.length}+ · ${strip(c.cat_sub)}` },
  };
  for (const [name, card] of Object.entries(cards)) {
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.setContent(ogHtml(card), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    write(`img/og/${lang}-${name}.png`, await page.screenshot({ type: 'png' }));
  }
}

const icon = async (size, rounded) => {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(iconHtml(size, rounded));
  return page.screenshot({ type: 'png', omitBackground: true });
};
write('apple-touch-icon.png', await icon(180, false));   // iOS rounds the corners itself
write('icon-192.png', await icon(192, true));
write('icon-512.png', await icon(512, true));

/* favicon.ico: 16, 32 and 48 px PNG frames in one ICO container */
const frames = [];
for (const s of [16, 32, 48]) frames.push([s, await icon(s, true)]);
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(frames.length, 4);
let offset = 6 + 16 * frames.length;
const dir = [], data = [];
for (const [s, png] of frames) {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(png.length, 8); e.writeUInt32LE(offset, 12);
  dir.push(e); data.push(png); offset += png.length;
}
write('favicon.ico', Buffer.concat([header, ...dir, ...data]));

write('site.webmanifest', JSON.stringify({
  name: 'Zemits Skin Expert', short_name: 'Zemits', start_url: './', display: 'browser',
  background_color: '#ffffff', theme_color: BLUE,
  icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n');

await browser.close();
console.log('images: img/og/*.png, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest');
