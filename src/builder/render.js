// Rendering: turn Articles into HTML fragments.
//
// Three layers, top to bottom:
//
//  1. Template engine — interpolate `{{vars}}` and read component partials.
//  2. Archive rendering — produce note lists in three variants (latest-3,
//     full chronological, by-type grouped).
//  3. Component stamping — replace <site-header>, <site-footer>, and
//     <blog-archive> custom elements with their server-rendered contents.
//
// Everything here is a pure function. No file writes, no globals.

import fs from "node:fs/promises";
import path from "node:path";
import { COMPONENTS_DIR, TYPE_LABELS, TYPE_ORDER } from "./config.js";
import { articleToTemplateVars } from "./articles.js";
import { escapeHtml, shortDate } from "./utils.js";

/** @typedef {import("./articles.js").Article} Article */
/** @typedef {import("./articles.js").TemplateVars} TemplateVars */

// ───────────────────────────────────────────────────────
//  Template engine
// ───────────────────────────────────────────────────────

/**
 * Replace `{{key}}` placeholders in a template with values from `vars`.
 * Throws on missing keys to surface typos at build time instead of leaving
 * `{{undefined}}` in output.
 *
 * @param {string} template
 * @param {Record<string, string>} vars
 */
export function interpolate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) throw new Error(`Missing interpolation value for {{${key}}}`);
    return vars[key];
  });
}

/**
 * Load a component partial from src/components/.
 * @param {string} relPath  e.g. "site-header.html" or "blog-archive/full.html"
 */
export async function readComponentTemplate(relPath) {
  return (await fs.readFile(path.join(COMPONENTS_DIR, relPath), "utf8")).trim();
}

/**
 * Wrap a string in a tag. Used to put the rendered partial back inside the
 * original custom element so client-side JS can still find it.
 *
 * @param {string} tag
 * @param {string} attrs    Already-formatted attribute string (or "").
 * @param {string} children
 */
function wrapElement(tag, attrs, children) {
  const attrStr = attrs ? " " + attrs : "";
  return `<${tag}${attrStr}>${children}</${tag}>`;
}

// ───────────────────────────────────────────────────────
//  Archive rendering
//
//  Three variants:
//   - "latest-3":  newest 3 notes (used in promo blocks if any).
//   - "full":      every note, newest first (used on /blog/ and category pages).
//   - "by-type":   grouped into sections by note type (used on /).
// ───────────────────────────────────────────────────────

/**
 * Render a note archive in the requested variant.
 *
 * @param {string} variant
 * @param {Article[]} articles
 */
export async function renderArchive(variant, articles) {
  if (variant === "by-type" || variant === "grouped") {
    return renderByTypeArchive(articles);
  }

  const template = await readComponentTemplate(`blog-archive/${variant}.html`);
  const itemTpl = extractItemTemplate(template, variant);

  const subset = variant === "latest-3" ? articles.slice(0, 3) : articles;
  const items = subset.map((p) => interpolate(itemTpl, articleToTemplateVars(p))).join("");
  return template.replace(itemMarkerRegex(), items);
}

/**
 * Group articles by `type` and render each group as a `<section class="group">`.
 * Empty types are skipped.
 *
 * @param {Article[]} articles
 */
async function renderByTypeArchive(articles) {
  const itemTpl = extractItemTemplate(
    await readComponentTemplate("blog-archive/full.html"),
    "full"
  );

  /** @type {Map<string, Article[]>} */
  const byType = new Map();
  for (const article of articles) {
    const key = article.type;
    if (!byType.has(key)) byType.set(key, []);
    byType.get(key).push(article);
  }

  const orderedTypes = [
    ...TYPE_ORDER.filter((t) => byType.has(t)),
    ...[...byType.keys()].filter((t) => !TYPE_ORDER.includes(t)),
  ];

  return orderedTypes.map((type) => {
    const items = byType.get(type) || [];
    const label = TYPE_LABELS[type] || type;
    const rows = items.map((p) => interpolate(itemTpl, articleToTemplateVars(p))).join("");
    return `<section class="group">
  <div class="group-head">
    <span>${escapeHtml(label)}</span>
    <span class="count">${items.length} ${items.length === 1 ? "note" : "notes"}</span>
  </div>
  <div>${rows}</div>
</section>`;
  }).join("\n");
}

const itemMarkerRegex = () => /<!--%item-start%-->([\s\S]*?)<!--%item-end%-->/;

function extractItemTemplate(template, variant) {
  const match = template.match(itemMarkerRegex());
  if (!match) throw new Error(`blog-archive/${variant}.html is missing item markers`);
  return match[1];
}

// ───────────────────────────────────────────────────────
//  Related posts
// ───────────────────────────────────────────────────────

/**
 * Render the "more in {category}" block shown at the bottom of a note.
 * Picks up to 3 published posts that share the article's primary category.
 * Returns an empty string if nothing matches.
 *
 * @param {Article} article
 * @param {Article[]} allArticles
 */
export function renderRelated(article, allArticles) {
  const primary = article.categories[0];
  if (!primary) return "";

  const related = allArticles
    .filter((a) => !a.draft && a.slug !== article.slug && a.categories.includes(primary))
    .slice(0, 3);
  if (!related.length) return "";

  const rows = related
    .map(
      (r) => `<a class="related-row" href="${r.url}">
    <span class="related-date">${escapeHtml(shortDate(r.date))}</span>
    <span class="related-title">${escapeHtml(r.title)}</span>
  </a>`
    )
    .join("\n  ");

  return `<div class="related">
  <p class="page-eyebrow">more in ${escapeHtml(primary.toLowerCase())}</p>
  ${rows}
</div>`;
}

// ───────────────────────────────────────────────────────
//  Component stamping
//
//  Server-renders the contents of <site-header>, <site-footer>, and
//  <blog-archive> custom elements so the page is meaningful without JS.
//  The original custom-element tags are preserved for any client-side
//  enhancement (e.g. `is-current` nav highlighting).
// ───────────────────────────────────────────────────────

/**
 * Replace <site-header>, <site-footer>, and <blog-archive> tags in `html`
 * with server-rendered contents. The custom-element wrappers stay in place.
 *
 * @param {string} html
 * @param {Article[]} articles
 */
export async function stampComponents(html, articles) {
  const headerTpl = await readComponentTemplate("site-header.html");
  const footerTpl = await readComponentTemplate("site-footer.html");

  html = html.replace(
    /<site-header([^>]*)><\/site-header>/g,
    (_m, attrs) => wrapElement("site-header", attrs.trim(), headerTpl)
  );
  html = html.replace(
    /<site-footer([^>]*)><\/site-footer>/g,
    (_m, attrs) => wrapElement("site-footer", attrs.trim(), footerTpl)
  );

  const archiveRegex = /<blog-archive([^>]*)><\/blog-archive>/g;
  const archiveMatches = [...html.matchAll(archiveRegex)];
  for (const m of archiveMatches) {
    const variant = m[1].match(/variant="([^"]+)"/)?.[1] ?? "full";
    const inner = await renderArchive(variant, articles);
    html = html.replace(m[0], wrapElement("blog-archive", m[1].trim(), inner));
  }

  // <inec-collation> is only used on a single post; load its template lazily
  // so other pages don't pay the read cost.
  if (html.includes("<inec-collation")) {
    const inecTpl = await readComponentTemplate("inec-collation.html");
    html = html.replace(
      /<inec-collation([^>]*)><\/inec-collation>/g,
      (_m, attrs) => wrapElement("inec-collation", attrs.trim(), inecTpl)
    );
  }

  return html;
}

/**
 * Render a single article into its blog-post.html template, including the
 * "more in {category}" related block.
 *
 * @param {Article} article
 * @param {Article[]} publishedArticles  Used to find related posts.
 */
export async function stampBlogPost(article, publishedArticles) {
  const template = await readComponentTemplate("blog-post.html");
  let rendered = interpolate(template, articleToTemplateVars(article));
  rendered = rendered.replace("<!--%body%-->", article.body);
  rendered = rendered.replace("<!--%related%-->", renderRelated(article, publishedArticles));

  const attrs = [
    `title="${escapeHtml(article.title)}"`,
    `excerpt="${escapeHtml(article.excerpt)}"`,
    `date="${article.date}"`,
    article.ogImage ? `og-image="${escapeHtml(article.ogImage)}"` : null,
    article.draft ? "draft" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return wrapElement("blog-post", attrs, rendered);
}
