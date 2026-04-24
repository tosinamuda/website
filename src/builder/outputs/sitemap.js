// Build dist/sitemap.xml — every published URL on the site.

import { site } from "../config.js";
import { writeFile } from "../fs-helpers.js";
import { escapeXml, slugify } from "../utils.js";

/** @typedef {import("../articles.js").Article} Article */

const STATIC_PAGES = ["/", "/about.html", "/work.html", "/contact.html", "/blog/"];

/**
 * Write the XML sitemap.
 *
 * @param {Article[]} publishedArticles
 */
export async function buildSitemap(publishedArticles) {
  const base = site.url.replace(/\/$/, "");
  const now = new Date().toISOString();

  const categorySlugs = new Set(
    publishedArticles.flatMap((a) => a.categories.map(slugify))
  );

  const urls = [
    ...STATIC_PAGES.map((loc) => ({ loc, lastmod: now })),
    ...[...categorySlugs].map((slug) => ({ loc: `/blog/category/${slug}.html`, lastmod: now })),
    ...publishedArticles.map((p) => ({ loc: p.url, lastmod: new Date(p.date).toISOString() })),
  ];

  const body = urls
    .map((u) => `  <url>
    <loc>${escapeXml(base + u.loc)}</loc>
    <lastmod>${escapeXml(u.lastmod)}</lastmod>
  </url>`)
    .join("\n");

  await writeFile(
    "sitemap.xml",
    `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
  );
}
