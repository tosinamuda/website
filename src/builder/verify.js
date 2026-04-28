// Smoke check: every file the build is supposed to produce must exist in
// dist/. Catches regressions where an output module silently stops writing.

import fs from "node:fs/promises";
import path from "node:path";
import { ROOT } from "./config.js";

const REQUIRED = [
  "dist/index.html",
  "dist/about.html",
  "dist/work.html",
  "dist/contact.html",
  "dist/blog/index.html",
  "dist/assets/styles.css",
  "dist/feed.xml",
  "dist/sitemap.xml",
  "dist/fonts/spectral-400.woff2",
  "dist/fonts/jetbrains-mono.woff2",
  "dist/components/site-header.js",
  "dist/components/site-footer.js",
  "dist/components/blog-archive.js",
  "dist/components/blog-post.js",
  "dist/components/inec-collation.js",
  "dist/blog/inec-presidential-election-collation-architecture.html",
];

/**
 * Throw if any required output file is missing.
 *
 * @param {import("./outputs/assets.js").AssetManifest} assets
 */
export async function verify(assets) {
  for (const f of REQUIRED) {
    await fs.access(path.join(ROOT, f));
  }
  await fs.access(path.join(ROOT, assets.stylesheetFile));

  await verifyRuntimeContracts(assets);
}

/**
 * @param {import("./outputs/assets.js").AssetManifest} assets
 */
async function verifyRuntimeContracts(assets) {
  const pages = [
    ["dist/index.html", 'data-nav="home" class="is-current"'],
    ["dist/blog/index.html", 'data-nav="home" class="is-current"'],
    ["dist/about.html", 'data-nav="about" class="is-current"'],
    ["dist/work.html", 'data-nav="work" class="is-current"'],
    ["dist/contact.html", 'data-nav="contact" class="is-current"'],
  ];

  for (const [file, activeNavMarkup] of pages) {
    const html = await fs.readFile(path.join(ROOT, file), "utf8");
    if (!html.includes(activeNavMarkup)) {
      throw new Error(`${file} is missing server-rendered active navigation`);
    }
    if (!html.includes('rel="preload" href="/fonts/spectral-400.woff2" as="font"')) {
      throw new Error(`${file} is missing the critical Spectral font preload`);
    }
    if (!html.includes('src="/components/site-header.js" defer crossorigin="anonymous"')) {
      throw new Error(`${file} is missing crossorigin on the site-header module`);
    }
    if (!html.includes(`href="${assets.stylesheetHref}"`)) {
      throw new Error(`${file} is missing the cache-busted stylesheet href`);
    }
    if (html.includes('href="/assets/styles.css"')) {
      throw new Error(`${file} still links the unversioned stylesheet`);
    }
    if (html.includes("static.cloudflareinsights.com/beacon.min.js")) {
      throw new Error(`${file} hardcodes Cloudflare Web Analytics instead of leaving it to hosting`);
    }
  }
}
