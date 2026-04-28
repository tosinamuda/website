// Copy static assets into dist/: web component scripts, public/ files, and
// the compiled stylesheet.

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { COMPONENTS_DIR, DIST, PUBLIC_DIR, STYLE_MODULES } from "../config.js";
import { copyDir } from "../fs-helpers.js";

/**
 * @typedef {Object} AssetManifest
 * @property {string} stylesheetHref  Browser path stamped into HTML.
 * @property {string} stylesheetFile  File path relative to the repo root.
 */

/**
 * Copy components, public files, and styles into dist/.
 *
 * @returns {Promise<AssetManifest>}
 */
export async function copyAssets() {
  const [styles] = await Promise.all([copyStyles(), copyComponents(), copyPublic()]);
  return styles;
}

/**
 * Copy every .js file from src/components/ into dist/components/.
 * Templates (.html) are inlined by render.js, not copied.
 */
async function copyComponents() {
  const dest = path.join(DIST, "components");
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(COMPONENTS_DIR)) {
    if (entry.endsWith(".js")) {
      await fs.copyFile(path.join(COMPONENTS_DIR, entry), path.join(dest, entry));
    }
  }
}

/**
 * Mirror public/ into dist/. Skipped silently if public/ doesn't exist.
 */
async function copyPublic() {
  try {
    await copyDir(PUBLIC_DIR, DIST);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
}

/**
 * Concatenate hand-authored CSS modules into the single stylesheet linked by
 * every page. The hashed copy is what HTML links to; styles.css remains as a
 * stable compatibility/debug path.
 *
 * @returns {Promise<AssetManifest>}
 */
async function copyStyles() {
  const assetsDir = path.join(DIST, "assets");
  await fs.mkdir(assetsDir, { recursive: true });

  const modules = await Promise.all(STYLE_MODULES.map((file) => fs.readFile(file, "utf8")));
  const css = `${modules.map((moduleCss) => moduleCss.trim()).join("\n\n")}\n`;
  const hash = crypto.createHash("sha256").update(css).digest("hex").slice(0, 10);
  const hashedFile = `styles.${hash}.css`;

  await Promise.all([
    fs.writeFile(path.join(assetsDir, hashedFile), css),
    fs.writeFile(path.join(assetsDir, "styles.css"), css),
  ]);

  return {
    stylesheetHref: `/assets/${hashedFile}`,
    stylesheetFile: `dist/assets/${hashedFile}`,
  };
}
