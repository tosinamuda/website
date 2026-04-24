// Pure utilities: text escaping, date formatting, slugifying, reading-time
// estimates. No I/O, no side effects.

/**
 * Escape a string for safe inclusion in HTML attributes or text nodes.
 * @param {unknown} s
 * @returns {string}
 */
export const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Escape a string for XML (feed and sitemap output).
 * @param {unknown} s
 * @returns {string}
 */
export const escapeXml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/**
 * Format an ISO date as "12 apr 2026" (lowercase, day month year).
 * @param {string} iso
 */
export const fullDate = (iso) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(iso))
    .toLowerCase();

/**
 * Format an ISO date as "apr 2026" (lowercase, month year).
 * @param {string} iso
 */
export const shortDate = (iso) =>
  new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(iso))
    .toLowerCase();

/**
 * Slugify a string for use in URLs and HTML id attributes.
 * @param {string} input
 */
export function slugify(input) {
  return String(input)
    .replace(/<[^>]*>/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Estimate reading time at 200 words/minute, returned as "N min read".
 * @param {string} html
 */
export function readingTime(html) {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}
