// Build individual blog post pages.
//
// Each Article is rendered into the article layout, then stamped with the
// shared components and SEO meta. Drafts get a noindex robots tag.

import fs from "node:fs/promises";
import path from "node:path";
import { LAYOUTS_DIR } from "../config.js";
import { stampBlogPost, stampComponents } from "../render.js";
import { renderArticleOgExtras, renderJsonLd, renderOgTags } from "../seo.js";
import { escapeHtml } from "../utils.js";
import { writeFile } from "../fs-helpers.js";

/** @typedef {import("../articles.js").Article} Article */

/**
 * Write each article to dist/blog/{slug}.html.
 *
 * @param {Article[]} allArticles        Includes drafts so their pages still render at the URL.
 * @param {Article[]} publishedArticles  Used for related-posts lookups.
 */
export async function buildArticles(allArticles, publishedArticles) {
  const layout = await fs.readFile(path.join(LAYOUTS_DIR, "article.html"), "utf8");
  for (const article of allArticles) {
    const html = await renderArticlePage(article, layout, publishedArticles);
    await writeFile(`blog/${article.slug}.html`, html);
  }
}

/**
 * Render a single article into the full article layout, OG/JSON-LD included.
 *
 * @param {Article} article
 * @param {string} layout
 * @param {Article[]} publishedArticles
 * @returns {Promise<string>}
 */
async function renderArticlePage(article, layout, publishedArticles) {
  const blogPostHtml = await stampBlogPost(article, publishedArticles);

  let html = layout
    .replace(/%title%/g, escapeHtml(article.title))
    .replace(/%excerpt%/g, escapeHtml(article.excerpt))
    .replace("<!--%blog-post%-->", blogPostHtml);

  html = await stampComponents(html, publishedArticles);

  const og = renderOgTags({
    title: article.title,
    description: article.excerpt,
    url: article.url,
    image: article.ogImage,
    type: "article",
  });
  const articleExtras = renderArticleOgExtras(article);
  const jsonLd = renderJsonLd(article);
  const robots = article.draft
    ? `<meta name="robots" content="noindex, nofollow" />`
    : "";

  return html.replace(
    "<!--%og%-->",
    `${og}
    ${articleExtras}
    ${robots}
    ${jsonLd}`
  );
}
