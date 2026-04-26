// SEO metadata: OpenGraph + Twitter cards + JSON-LD structured data.
//
// All functions return strings to be interpolated into the page <head>.
// No I/O.

import { site } from "./config.js";
import { escapeHtml } from "./utils.js";

/** @typedef {import("./articles.js").Article} Article */

const GA_MEASUREMENT_ID = "G-D8YJEFRG9M";

/**
 * Render the Google Analytics gtag snippet. The `async` attribute keeps the
 * loader script off the critical path; the inline config block initialises
 * dataLayer before the loader resolves.
 *
 * @returns {string}
 */
export function renderAnalytics() {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    </script>`;
}

/**
 * @typedef {Object} OgInput
 * @property {string} title
 * @property {string} description
 * @property {string} url           Path or absolute URL.
 * @property {string=} image        Optional OG image (path or absolute).
 * @property {string=} type         OG type, defaults to "website".
 */

/**
 * Render the canonical link plus the OpenGraph + Twitter card meta block.
 *
 * @param {OgInput} input
 */
export function renderOgTags({ title, description, url, image, type = "website" }) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const absoluteUrl = absolute(url);
  const imagePath = image || site.defaultOgImage || "";
  const absoluteImage = imagePath ? absolute(imagePath) : "";

  const imgTags = absoluteImage
    ? `<meta property="og:image" content="${escapeHtml(absoluteImage)}" />
    <meta name="twitter:image" content="${escapeHtml(absoluteImage)}" />`
    : "";

  const twitterAccount = site.twitterHandle
    ? `<meta name="twitter:site" content="${escapeHtml(site.twitterHandle)}" />
    <meta name="twitter:creator" content="${escapeHtml(site.twitterHandle)}" />`
    : "";

  return `<link rel="canonical" href="${escapeHtml(absoluteUrl)}" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:locale" content="${escapeHtml(site.locale)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${escapeHtml(absoluteUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    ${twitterAccount}
    ${imgTags}`;
}

/**
 * Render the article-specific OG extras: published time, author, section,
 * and tags. Used in addition to renderOgTags() on individual blog posts.
 *
 * @param {Article} article
 */
export function renderArticleOgExtras(article) {
  const published = new Date(article.date).toISOString();
  const tagTags = article.categories
    .map((c) => `<meta property="article:tag" content="${escapeHtml(c)}" />`)
    .join("\n    ");
  const section = article.categories[0]
    ? `<meta property="article:section" content="${escapeHtml(article.categories[0])}" />`
    : "";

  return `<meta property="article:published_time" content="${published}" />
    <meta property="article:modified_time" content="${published}" />
    <meta property="article:author" content="${escapeHtml(site.author)}" />
    ${section}
    ${tagTags}`;
}

/**
 * Render the JSON-LD blocks for an article: a BlogPosting plus a
 * BreadcrumbList (Home → Blog → Post Title).
 *
 * @param {Article} article
 */
export function renderJsonLd(article) {
  const base = site.url.replace(/\/$/, "");
  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    author: {
      "@type": "Person",
      name: site.author,
      url: base + "/about.html",
    },
    publisher: {
      "@type": "Person",
      name: site.author,
      url: base,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": base + article.url,
    },
    keywords: article.categories.join(", "),
  };
  if (article.ogImage) {
    blogPosting.image = article.ogImage.startsWith("http")
      ? article.ogImage
      : base + article.ogImage;
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base + "/" },
      { "@type": "ListItem", position: 2, name: "Notes", item: base + "/blog/" },
      { "@type": "ListItem", position: 3, name: article.title, item: base + article.url },
    ],
  };

  return [blogPosting, breadcrumb]
    .map((d) => `<script type="application/ld+json">${JSON.stringify(d, null, 2)}</script>`)
    .join("\n    ");
}

/**
 * Render the JSON-LD Person block for the site author. Used on the homepage
 * and any other page that represents the author directly.
 *
 * @returns {string}
 */
export function renderPersonJsonLd() {
  const base = site.url.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    url: base,
    sameAs: [
      "https://github.com/tosinamuda",
      "https://linkedin.com/in/tosinamuda",
      "https://twitter.com/tosinamuda",
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
}

/**
 * Render the JSON-LD WebSite block. Emitted on every page so search engines
 * can associate site-level metadata with any entry point.
 *
 * @returns {string}
 */
export function renderWebSiteJsonLd() {
  const base = site.url.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: base,
    description: site.description,
    inLanguage: site.locale,
  };
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
}

/**
 * Resolve a path against the configured site URL. Pass-through for absolute URLs.
 *
 * @param {string} pathOrUrl
 */
function absolute(pathOrUrl) {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return site.url.replace(/\/$/, "") + pathOrUrl;
}
