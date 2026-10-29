# Zemits Skin Expert site

Static site in three languages: Latvian at the root, Russian in `ru/`, English in `en/`.

## Where to edit

| What | File |
| --- | --- |
| Page markup and all page texts (LV/RU/EN, in the `i18n` object) | `src/index.html`, `src/aparati.html` |
| Devices: names, prices, features, popup texts, photos | `js/devices.js` |
| Device popup styles | `css/device-modal.css` |

`index.html`, `aparati.html`, `ru/`, `en/`, `sitemap.xml`, `robots.txt` and `llms.txt` are generated. Don't edit them by hand.

## Build

```sh
node tools/build.mjs
```

Needs Node 18 or newer and no packages. Run it after every change to `src/` or `js/devices.js`, then commit the source and the generated files together.

For each language the build:

- puts the translated texts into the HTML (`data-i18n`, `data-i18n-ph`, `data-i18n-aria`);
- writes the title, description, `canonical`, `hreflang` alternates and Open Graph tags (`page_title` / `page_desc` in `i18n`);
- turns the LV/RU/EN switcher into links between the language versions;
- pre-renders the device catalogue cards;
- adds schema.org data: organisation, FAQ, and the device list with prices and descriptions.

It also writes `sitemap.xml` with the language alternates, `robots.txt` (search and AI crawlers allowed) and `llms.txt` (a plain summary for AI assistants).

Absolute URLs use `https://zemits-latvija.lv` (`SITE` in `tools/build.mjs`).
