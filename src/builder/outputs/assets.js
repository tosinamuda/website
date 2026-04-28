// Copy static assets into dist/: web component scripts, public/ files, and
// the compiled stylesheet.

import fs from "node:fs/promises";
import path from "node:path";
import { COMPONENTS_DIR, DIST, PUBLIC_DIR, STYLE_MODULES } from "../config.js";
import { copyDir } from "../fs-helpers.js";

/**
 * Copy components, public files, and styles into dist/.
 */
export async function copyAssets() {
  await Promise.all([copyComponents(), copyPublic(), copyStyles()]);
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
 * every page. This keeps authoring files focused without adding a bundler.
 */
async function copyStyles() {
  const dest = path.join(DIST, "assets", "styles.css");
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const modules = await Promise.all(STYLE_MODULES.map((file) => fs.readFile(file, "utf8")));
  await fs.writeFile(dest, `${modules.map((css) => css.trim()).join("\n\n")}\n`);
}
