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
];

/**
 * Throw if any required output file is missing.
 */
export async function verify() {
  for (const f of REQUIRED) {
    await fs.access(path.join(ROOT, f));
  }
}
