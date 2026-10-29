// Builds the static language versions of the site.
//
//   node tools/build.mjs
//
// Sources: src/index.html and src/aparati.html (Latvian markup + the i18n dictionaries
// in their inline scripts) and js/devices.js (device data). Output:
//   index.html, aparati.html          Latvian (site root)
//   ru/index.html, ru/aparati.html    Russian
//   en/index.html, en/aparati.html    English
//   sitemap.xml, robots.txt, llms.txt
// Edit the sources, never the generated files, then run the build and commit everything.
// No dependencies: plain Node 18+.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://zemits-latvija.lv';
const LANGS = ['lv', 'ru', 'en'];                  // lv lives at the root, the others in folders
const LOCALE = { lv: 'lv_LV', ru: 'ru_RU', en: 'en_US' };
const PAGES = ['index.html', 'aparati.html'];
const PHONE = '+37126767517';
const INSTAGRAM = 'https://www.instagram.com/zemits.latvija_official';
const LOGO = 'https://ik.imagekit.io/xwsgpirygo/Zemits/Zemits_Logo_s_b.svg';

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => { fs.mkdirSync(path.dirname(path.join(ROOT, f)), { recursive: true }); fs.writeFileSync(path.join(ROOT, f), s); };
const dirOf = lang => (lang === 'lv' ? '' : lang + '/');
const pageUrl = (lang, page) => SITE + '/' + dirOf(lang) + (page === 'index.html' ? '' : page);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = s => String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/* ── data: js/devices.js + the page's i18n object, evaluated in a sandbox ── */
function loadContext(src) {
  const ctx = { document: { addEventListener() {}, getElementById() { return null; } } };
  vm.createContext(ctx);
  vm.runInContext(read('js/devices.js') + '\n;this.devices=devices;this.deviceInfo=deviceInfo;this.deviceImg=deviceImg;'
    + 'this.deviceCardHtml=deviceCardHtml;this.mergeDeviceUi=mergeDeviceUi;this.fmtPrice=fmtPrice;', ctx);
  const start = src.indexOf('const i18n = {');
  const end = src.indexOf('\n};', start);
  if (start < 0 || end < 0) throw new Error('i18n object not found');
  vm.runInContext(src.slice(start, end + 3).replace('const i18n', 'this.i18n') + '\nmergeDeviceUi(this.i18n);', ctx);
  return ctx;
}

/* ── replace the content of every element carrying data-i18n="key" ── */
function applyI18n(html, t, file) {
  const open = /<([a-zA-Z][\w-]*)\b[^<>]*?\sdata-i18n="([^"]+)"[^<>]*>/g;
  let out = '', last = 0, m, missing = new Set();
  while ((m = open.exec(html))) {
    const [tag, name, key] = [m[0], m[1].toLowerCase(), m[2]];
    const bodyStart = m.index + tag.length;
    // find the matching close tag, counting nested elements with the same name
    const re = new RegExp(`<(/?)${name}\\b[^<>]*>`, 'gi');
    re.lastIndex = bodyStart;
    let depth = 1, c, closeAt = -1, closeLen = 0;
    while ((c = re.exec(html))) {
      depth += c[1] ? -1 : 1;
      if (!depth) { closeAt = c.index; closeLen = c[0].length; break; }
    }
    if (closeAt < 0) throw new Error(`${file}: no closing </${name}> for data-i18n="${key}"`);
    if (t[key] === undefined) { missing.add(key); continue; }
    out += html.slice(last, bodyStart) + t[key];
    last = closeAt;
    open.lastIndex = closeAt + closeLen;
  }
  out += html.slice(last);
  return { html: out, missing };
}

function applyAttrs(html, t) {
  return html
    .replace(/(<[^<>]*\sdata-i18n-ph="([^"]+)"[^<>]*>)/g, (tag, _, key) =>
      t[key] === undefined ? tag : tag.replace(/\splaceholder="[^"]*"/, ` placeholder="${esc(t[key])}"`))
    .replace(/(<[^<>]*\sdata-i18n-aria="([^"]+)"[^<>]*>)/g, (tag, _, key) =>
      t[key] === undefined ? tag : tag.replace(/\saria-label="[^"]*"/, ` aria-label="${esc(plain(t[key]))}"`));
}

/* ── <head>: language, title, description, canonical, hreflang, Open Graph ── */
function headTags(html, lang, page, t) {
  const alternates = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${pageUrl(l, page)}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${pageUrl('lv', page)}">`).join('\n');
  const title = esc(plain(t.page_title));
  const desc = esc(plain(t.page_desc));
  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${pageUrl(lang, page)}">\n${alternates}`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${pageUrl(lang, page)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">\n<meta property="og:description" content="${desc}">\n<meta property="og:locale" content="${LOCALE[lang]}">`);
}

/* ── language switcher: real links to the same page in the other languages ── */
function langLinks(html, lang, page) {
  const file = page === 'index.html' ? '' : page;
  const rel = to => {
    const up = lang === 'lv' ? '' : '../';
    const href = (to === lang ? '' : up + dirOf(to)) + file;
    return href || './';
  };
  return html.replace(/<a class="lang-btn" data-lang="(\w+)" hreflang="\w+">/g, (_, l) =>
    `<a class="lang-btn${l === lang ? ' active' : ''}" data-lang="${l}" hreflang="${l}" href="${rel(l)}"${l === lang ? ' aria-current="page"' : ''}>`);
}

/* ── shared assets live at the root; pages in /ru/ and /en/ reach them with ../ ── */
function assetPaths(html, lang) {
  if (lang === 'lv') return html;
  return html
    .replace(/(href|src)="(css|js)\//g, '$1="../$2/');
}

/* ── structured data for search engines and AI assistants ── */
function jsonLd(ctx, lang, page, t) {
  const org = {
    '@type': 'Organization', '@id': SITE + '/#org', name: 'Zemits Skin Expert', alternateName: 'Zemits Latvija',
    url: SITE + '/', logo: LOGO, telephone: PHONE, sameAs: [INSTAGRAM], areaServed: 'LV',
  };
  const site = { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'Zemits Skin Expert', inLanguage: LANGS, publisher: { '@id': SITE + '/#org' } };
  const webPage = { '@type': 'WebPage', url: pageUrl(lang, page), name: plain(t.page_title), description: plain(t.page_desc), inLanguage: lang, isPartOf: { '@id': SITE + '/#site' } };
  const graph = [org, site, webPage];
  if (page === 'index.html') {
    const qa = [];
    for (let i = 1; t['faq_q' + i]; i++) qa.push({ '@type': 'Question', name: plain(t['faq_q' + i]), acceptedAnswer: { '@type': 'Answer', text: plain(t['faq_a' + i]) } });
    if (qa.length) graph.push({ '@type': 'FAQPage', url: pageUrl(lang, page) + '#faq', inLanguage: lang, mainEntity: qa });
  }
  if (page === 'aparati.html') {
    graph.push({
      '@type': 'ItemList', name: plain(t.page_title), numberOfItems: ctx.devices.length,
      itemListElement: ctx.devices.map((d, i) => {
        const info = (ctx.deviceInfo[d.name] || {})[lang] || {};
        const product = {
          '@type': 'Product', name: d.name, brand: { '@type': 'Brand', name: 'Zemits' }, category: d.type[lang],
          description: plain(info.desc || d.type[lang]), image: (ctx.deviceImg[d.name] || '').split('?')[0] || undefined,
        };
        if (d.price !== null) product.offers = { '@type': 'Offer', price: d.price, priceCurrency: 'EUR', url: pageUrl(lang, page), seller: { '@id': SITE + '/#org' } };
        return { '@type': 'ListItem', position: i + 1, item: product };
      }),
    });
  }
  return `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 1)}\n</script>\n`;
}

/* ── catalogue: cards are in the HTML from the start, not only after the script runs ── */
function prerenderCatalogue(html, ctx, lang, t) {
  const cards = ctx.devices.map((d, i) => ctx.deviceCardHtml(d, i, t, lang)).join('');
  return html
    .replace('<div class="cat-grid" id="catGrid"></div>', `<div class="cat-grid" id="catGrid">${cards}\n  </div>`)
    .replace('<span id="deviceCount">—</span>', `<span id="deviceCount">${ctx.devices.length}</span>`);
}

/* ── build ── */
const built = [];
for (const page of PAGES) {
  const src = read('src/' + page);
  const ctx = loadContext(src);
  for (const lang of LANGS) {
    const t = ctx.i18n[lang];
    if (!t.page_title || !t.page_desc) throw new Error(`src/${page}: page_title / page_desc missing for ${lang}`);
    let { html, missing } = applyI18n(src, t, page);
    if (missing.size) console.warn(`src/${page} [${lang}]: no translation for ${[...missing].join(', ')} (Latvian text kept)`);
    html = applyAttrs(html, t);
    html = headTags(html, lang, page, t);
    html = langLinks(html, lang, page);
    if (page === 'aparati.html') html = prerenderCatalogue(html, ctx, lang, t);
    html = html.replace('</head>', jsonLd(ctx, lang, page, t) + '</head>');
    html = assetPaths(html, lang);
    html = html.replace(/<meta name="robots" content="noindex"><!-- source file[^\n]*\n/, '');
    html = html.replace('<!DOCTYPE html>', `<!DOCTYPE html>\n<!-- Generated by tools/build.mjs from src/${page}. Do not edit: change the source and run "node tools/build.mjs". -->`);
    write(dirOf(lang) + page, html);
    built.push(dirOf(lang) + page);
  }
}

/* ── sitemap.xml with language alternates ── */
const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.flatMap(page => LANGS.map(lang => `  <url>
    <loc>${pageUrl(lang, page)}</loc>
    <lastmod>${today}</lastmod>
${LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(l, page)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('lv', page)}"/>
  </url>`));
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`);

/* ── robots.txt: everyone welcome, AI crawlers named explicitly ── */
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot'];
write('robots.txt', `# Zemits Skin Expert — generated by tools/build.mjs
User-agent: *
Allow: /
Disallow: /src/
Disallow: /tools/

${aiBots.map(b => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE}/sitemap.xml
`);

/* ── llms.txt: a plain summary for AI assistants (https://llmstxt.org) ── */
{
  const ctx = loadContext(read('src/aparati.html'));
  const en = ctx.i18n.en;
  const lines = ctx.devices.map(d => `- ${d.name} — ${d.type.en}${d.price !== null ? `, ${d.from ? 'from ' : ''}${d.price} EUR` : ', price on request'}`);
  write('llms.txt', `# Zemits Skin Expert

> Official Zemits representative in Latvia and the Baltic states: professional aesthetic cosmetology devices for face and body, training (masterclasses and seminars), a 24-month warranty and technical service in Latvia.

The site is available in Latvian (main), Russian and English.

## Pages

- [Home (LV)](${pageUrl('lv', 'index.html')}): about Zemits Skin Expert, featured devices, training, results, reviews, FAQ, contacts
- [Home (RU)](${pageUrl('ru', 'index.html')})
- [Home (EN)](${pageUrl('en', 'index.html')})
- [Device catalogue (LV)](${pageUrl('lv', 'aparati.html')}): all devices with prices and descriptions
- [Device catalogue (RU)](${pageUrl('ru', 'aparati.html')})
- [Device catalogue (EN)](${pageUrl('en', 'aparati.html')})

## Devices

${lines.join('\n')}

Prices are indicative, in EUR including VAT. ${plain(en.cat_pricenote || '')}

## Contact

- Phone / WhatsApp: ${PHONE}
- Instagram: ${INSTAGRAM}
`);
}

console.log('built:', built.join(', '), '+ sitemap.xml, robots.txt, llms.txt');
