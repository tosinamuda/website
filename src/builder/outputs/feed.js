// Build dist/feed.xml — Atom feed of the most recent published articles.

import { site } from "../config.js";
import { writeFile } from "../fs-helpers.js";
import { escapeXml } from "../utils.js";

/** @typedef {import("../articles.js").Article} Article */

const MAX_ENTRIES = 20;

/**
 * Write the Atom feed to dist/feed.xml.
 *
 * @param {Article[]} publishedArticles
 */
export async function buildFeed(publishedArticles) {
  const base = site.url.replace(/\/$/, "");
  const updated = new Date().toISOString();
  const entries = publishedArticles.slice(0, MAX_ENTRIES).map((p) => entryXml(p, base)).join("\n");

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(site.feedTitle)}</title>
  <subtitle>${escapeXml(site.description)}</subtitle>
  <link rel="self" type="application/atom+xml" href="${escapeXml(base + "/feed.xml")}" />
  <link rel="alternate" type="text/html" href="${escapeXml(base + "/blog/")}" />
  <id>${escapeXml(base + "/")}</id>
  <updated>${updated}</updated>
  <author><name>${escapeXml(site.author)}</name></author>
${entries}
</feed>
`;

  await writeFile("feed.xml", feed);
}

/**
 * Render one <entry> for the feed.
 *
 * @param {Article} article
 * @param {string} base
 */
function entryXml(article, base) {
  const url = base + article.url;
  const isoDate = new Date(article.date).toISOString();
  const content = escapeXml(`<p>${article.excerpt}</p>` + article.body);

  return `  <entry>
    <title>${escapeXml(article.title)}</title>
    <link rel="alternate" type="text/html" href="${escapeXml(url)}" />
    <id>${escapeXml(url)}</id>
    <updated>${escapeXml(isoDate)}</updated>
    <published>${escapeXml(isoDate)}</published>
    <summary>${escapeXml(article.excerpt)}</summary>
    <content type="html">${content}</content>
    <author><name>${escapeXml(site.author)}</name></author>
  </entry>`;
}
