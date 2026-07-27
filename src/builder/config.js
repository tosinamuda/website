// Paths, site metadata, and the note-type taxonomy.
//
// Everything that's "configuration" — values you'd change to point the build
// at a different repo or rename a section — lives here. Logic lives elsewhere.

import fs from "node:fs/promises";
import path from "node:path";

export const ROOT = process.cwd();
export const SRC = path.join(ROOT, "src");
export const DIST = path.join(ROOT, "dist");
export const PUBLIC_DIR = path.join(ROOT, "public");
export const CONTENT_BLOG = path.join(ROOT, "content", "blog");
export const COMPONENTS_DIR = path.join(SRC, "components");
export const LAYOUTS_DIR = path.join(SRC, "layouts");
export const STYLES_DIR = path.join(SRC, "styles");
export const STYLE_MODULES = [
  "00-fonts.css",
  "10-tokens.css",
  "20-base.css",
  "30-components.css",
  "articles/skills.css",
  "90-print.css",
].map((file) => path.join(STYLES_DIR, file));

/** @type {import("./articles.js").SiteConfig} */
export const site = JSON.parse(
  await fs.readFile(path.join(ROOT, "site.config.json"), "utf8")
);

// ───────────────────────────────────────────────────────
//  Home page sections
//
//  Two sections, in this order. Notes with `"featured": true` in their meta
//  go in the first and are not repeated in the second.
// ───────────────────────────────────────────────────────

export const FEATURED_LABEL = "featured";
export const ESSAYS_LABEL = "essays";
