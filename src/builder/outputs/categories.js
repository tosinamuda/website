// Build category archive pages: /blog/category/{slug}.html.
//
// One page per unique category that appears on a published article.

import fs from "node:fs/promises";
import path from "node:path";
import { SRC, site } from "../config.js";
import { renderArchive, stampAssets, stampComponents } from "../render.js";
import { renderAnalytics, renderOgTags, renderWebSiteJsonLd } from "../seo.js";
import { writeFile } from "../fs-helpers.js";
import { escapeHtml, slugify } from "../utils.js";

/** @typedef {import("../articles.js").Article} Article */

/**
 * Write a /blog/category/{slug}.html page for each unique category.
 *
 * @param {Article[]} publishedArticles
 * @param {import("./assets.js").AssetManifest} assets
 */
export async function buildCategoryPages(publishedArticles, assets) {
  const grouped = groupByCategory(publishedArticles);
  if (!grouped.size) return;

  const layout = await fs.readFile(path.join(SRC, "category.html"), "utf8");
  for (const [slug, { name, articles }] of grouped) {
    const html = await renderCategoryPage({ slug, name, articles, layout, publishedArticles, assets });
    await writeFile(`blog/category/${slug}.html`, html);
  }
}

/**
 * Bucket articles by category. The same article appears in every bucket
 * matching one of its categories.
 *
 * @param {Article[]} articles
 * @returns {Map<string, {name: string, articles: Article[]}>}
 */
function groupByCategory(articles) {
  /** @type {Map<string, {name: string, articles: Article[]}>} */
  const grouped = new Map();
  for (const article of articles) {
    for (const category of article.categories) {
      const key = slugify(category);
      if (!grouped.has(key)) grouped.set(key, { name: category, articles: [] });
      grouped.get(key).articles.push(article);
    }
  }
  return grouped;
}

/**
 * Render one category page from the category.html layout.
 *
 * @param {{slug: string, name: string, articles: Article[], layout: string, publishedArticles: Article[], assets: import("./assets.js").AssetManifest}} input
 */
async function renderCategoryPage({ slug, name, articles, layout, publishedArticles, assets }) {
  let html = layout
    .replace(/%category%/g, escapeHtml(name))
    .replace(/%slug%/g, slug)
    .replace(/%count%/g, String(articles.length));

  html = await stampComponents(html, publishedArticles);
  html = html.replace("<!--%category-archive%-->", await renderArchive("full", articles));

  html = html.replace(
    "<!--%og%-->",
    `${renderAnalytics()}
    ${renderOgTags({
      title: `${name} | Blog | ${site.name}`,
      description: `Essays tagged ${name}.`,
      url: `/blog/category/${slug}.html`,
    })}
    ${renderWebSiteJsonLd()}`
  );

  return stampAssets(html, assets);
}
