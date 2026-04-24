// Loading and parsing notes (blog posts) from `content/blog/*.html`.
//
// This module is the single source of truth for what an Article looks like.
// Every other module receives Article objects, never raw filesystem paths or
// HTML strings, so changing the on-disk format only touches this file.

import fs from "node:fs/promises";
import path from "node:path";
import { CONTENT_BLOG, DEFAULT_TYPE } from "./config.js";
import { escapeHtml, fullDate, readingTime, shortDate, slugify } from "./utils.js";

// ───────────────────────────────────────────────────────
//  Type definitions
// ───────────────────────────────────────────────────────

/**
 * @typedef {Object} SiteConfig
 * @property {string} name
 * @property {string} description
 * @property {string} url
 * @property {string} author
 * @property {string} locale
 * @property {string} feedTitle
 * @property {string=} twitterHandle
 */

/**
 * @typedef {Object} Heading
 * @property {2 | 3} level
 * @property {string} id
 * @property {string} inner
 */

/**
 * A single note (blog post). Other modules consume this shape and don't
 * inspect the source files directly.
 *
 * @typedef {Object} Article
 * @property {string} slug              e.g. "12-factor-engineering-best-practices"
 * @property {string} url               e.g. "/blog/12-factor-engineering-best-practices.html"
 * @property {string} title
 * @property {string} excerpt           One-sentence summary, used in listings + OG.
 * @property {string} date              ISO date "YYYY-MM-DD".
 * @property {string} type              See TYPE_ORDER in config.js.
 * @property {string[]} categories      Free-form subject tags. First is primary.
 * @property {string} body              Body HTML, with heading anchors processed.
 * @property {Heading[]} headings       Extracted h2/h3 headings.
 * @property {boolean} draft            Hidden from listings, feed, and sitemap.
 * @property {boolean} featured         Reserved for elevation (not yet rendered).
 * @property {string=} ogImage          Optional OG image override.
 */

/**
 * Variables a template can interpolate from an Article.
 *
 * @typedef {Object} TemplateVars
 * @property {string} title
 * @property {string} excerpt
 * @property {string} date              Full HTML <time> element with formatted text.
 * @property {string} shortDate         Short month-year string for compact listings.
 * @property {string} readingTime       e.g. "5 min read".
 * @property {string} categoriesHtml    First category as a span, ready to inline.
 * @property {string} categoriesLinksHtml  All categories as anchor tags.
 * @property {string} url
 */

// ───────────────────────────────────────────────────────
//  Loading
// ───────────────────────────────────────────────────────

/**
 * Read every `.html` file in content/blog/, parse each as an Article, and
 * return the list sorted newest-first.
 *
 * @returns {Promise<Article[]>}
 */
export async function loadArticles() {
  const files = (await fs.readdir(CONTENT_BLOG)).filter((f) => f.endsWith(".html"));
  const articles = await Promise.all(
    files.map((file) => loadArticle(path.join(CONTENT_BLOG, file), file))
  );
  for (const article of articles) warnOnLongMeta(article);
  articles.sort((a, b) => (a.date < b.date ? 1 : -1));
  return articles;
}

/**
 * Parse a single source file into an Article.
 *
 * @param {string} fullPath
 * @param {string} filename
 * @returns {Promise<Article>}
 */
async function loadArticle(fullPath, filename) {
  const raw = await fs.readFile(fullPath, "utf8");
  const wrapper = raw.match(/<blog-post([^>]*)>([\s\S]*?)<\/blog-post>/);
  if (!wrapper) throw new Error(`Missing <blog-post> wrapper in ${filename}`);

  const attrs = parseAttrs(wrapper[1]);
  const inner = wrapper[2];

  const meta = extractInlineJson(inner, "meta");
  const rawBody = inner.replace(meta.match, "");

  const title = required(attrs, "title", filename);
  const excerpt = required(attrs, "excerpt", filename);
  const date = required(attrs, "date", filename);
  const slug = filename.replace(/\.html$/, "");
  const { processed: body, headings } = processHeadings(rawBody.trim());

  return {
    slug,
    url: `/blog/${slug}.html`,
    title,
    excerpt,
    date,
    type: meta.json.type || DEFAULT_TYPE,
    categories: meta.json.categories ?? [],
    ogImage: attrs["og-image"] || meta.json.ogImage,
    draft: "draft" in attrs,
    featured: meta.json.featured === true,
    body,
    headings,
  };
}

/**
 * Read an `<blog-post ...>` attribute string into a key/value object.
 * Bare attributes (no `="..."`) map to an empty string — useful for flags
 * like `draft`.
 *
 * @param {string} attrString
 */
function parseAttrs(attrString) {
  /** @type {Record<string, string>} */
  const attrs = {};
  const re = /([\w-]+)(?:="([^"]*)")?/g;
  let m;
  while ((m = re.exec(attrString)) !== null) {
    attrs[m[1]] = m[2] ?? "";
  }
  return attrs;
}

/**
 * Extract a `<script type="application/json" id="X">` block from inside the
 * post body. Returns the parsed JSON and the original match text so the
 * caller can strip it from the body.
 *
 * @param {string} inner
 * @param {string} id
 */
function extractInlineJson(inner, id) {
  const re = new RegExp(
    `<script[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/script>`
  );
  const m = inner.match(re);
  if (!m) return { json: {}, match: "" };
  return { json: JSON.parse(m[1]), match: m[0] };
}

function required(attrs, key, filename) {
  if (!attrs[key]) throw new Error(`${filename}: <blog-post> is missing the ${key} attribute`);
  return attrs[key];
}

/**
 * Print a single grouped warning per file when its title or excerpt is long
 * enough to be truncated by search engines or social cards.
 *
 * @param {Article} article
 */
function warnOnLongMeta(article) {
  /** @type {string[]} */
  const issues = [];
  if (article.title.length > 60) issues.push(`title ${article.title.length} (>60)`);
  if (article.excerpt.length > 160) issues.push(`excerpt ${article.excerpt.length} (>160)`);
  if (issues.length) {
    console.warn(`  ⚠ ${article.slug}.html: ${issues.join(", ")} chars — SERP/OG truncation likely`);
  }
}

// ───────────────────────────────────────────────────────
//  Heading anchors
// ───────────────────────────────────────────────────────

/**
 * Add `id` and a self-link to every <h2>/<h3> in the body so anchors are
 * deep-linkable. Returns the processed HTML and the list of headings.
 *
 * @param {string} body
 * @returns {{processed: string, headings: Heading[]}}
 */
export function processHeadings(body) {
  /** @type {Heading[]} */
  const headings = [];
  const used = new Set();
  const processed = body.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level, inner) => {
    const base = slugify(inner);
    let id = base || `heading-${headings.length + 1}`;
    let counter = 2;
    while (used.has(id)) id = `${base}-${counter++}`;
    used.add(id);
    headings.push({ level: /** @type {2|3} */ (parseInt(level, 10)), id, inner });
    return `<h${level} id="${id}"><a href="#${id}" class="heading-link">${inner}</a></h${level}>`;
  });
  return { processed, headings };
}

// ───────────────────────────────────────────────────────
//  Template variable extraction
// ───────────────────────────────────────────────────────

/**
 * Convert an Article into the variables a template can interpolate.
 *
 * @param {Article} article
 * @returns {TemplateVars}
 */
export function articleToTemplateVars(article) {
  const primary = article.categories[0] || "";
  const categoriesHtml = primary
    ? `<span class="sep">·</span>${renderTagSpan(primary)}`
    : "";
  const categoriesLinksHtml = article.categories.length
    ? article.categories.map(renderTagLink).join(" ")
    : "";
  const dateTime = `<time datetime="${escapeHtml(article.date)}">${escapeHtml(fullDate(article.date))}</time>`;

  return {
    title: escapeHtml(article.title),
    excerpt: escapeHtml(article.excerpt),
    date: dateTime,
    shortDate: escapeHtml(shortDate(article.date)),
    readingTime: escapeHtml(readingTime(article.body)),
    categoriesHtml,
    categoriesLinksHtml,
    url: article.url,
  };
}

/**
 * Render a category as a non-link span. Used inside note rows where the
 * surrounding anchor would conflict with a nested <a>.
 *
 * @param {string} category
 */
function renderTagSpan(category) {
  return `<span class="tag">${escapeHtml(category.toLowerCase())}</span>`;
}

/**
 * Render a category as a link to its archive page. Used in note-page meta
 * rows that aren't nested inside another anchor.
 *
 * @param {string} category
 */
function renderTagLink(category) {
  return `<a href="/blog/category/${slugify(category)}.html" class="tag">${escapeHtml(category.toLowerCase())}</a>`;
}
