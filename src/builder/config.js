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
export const STYLES_FILE = path.join(SRC, "styles", "app.css");

/** @type {import("./articles.js").SiteConfig} */
export const site = JSON.parse(
  await fs.readFile(path.join(ROOT, "site.config.json"), "utf8")
);

// ───────────────────────────────────────────────────────
//  Note type taxonomy
//
//  Notes are grouped by `type` on the home page. The order below is the
//  order sections appear; the labels are what readers see.
// ───────────────────────────────────────────────────────

/** @type {readonly string[]} */
export const TYPE_ORDER = ["ongoing-work", "learning", "essay", "note"];

/** @type {Readonly<Record<string, string>>} */
export const TYPE_LABELS = {
  "ongoing-work": "ongoing work",
  learning: "learning notes",
  essay: "essays",
  note: "notes",
};

export const DEFAULT_TYPE = "essay";
