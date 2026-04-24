// Filesystem helpers scoped to the build. All paths resolved against DIST.
//
// These are the only places in the builder that mutate the filesystem (along
// with the modules under outputs/). Keeping I/O isolated makes the rest of
// the build easy to reason about as pure functions.

import fs from "node:fs/promises";
import path from "node:path";
import { DIST } from "./config.js";

/**
 * Wipe and recreate the dist/ directory.
 */
export async function resetDist() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });
}

/**
 * Write `content` to `dist/<relPath>`, creating parent directories as needed.
 * @param {string} relPath  Path relative to DIST.
 * @param {string} content
 */
export async function writeFile(relPath, content) {
  const out = path.join(DIST, relPath);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, content);
}

/**
 * Recursively copy `from` into `to`. Creates `to` if missing.
 * @param {string} from
 * @param {string} to
 */
export async function copyDir(from, to) {
  await fs.mkdir(to, { recursive: true });
  for (const entry of await fs.readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dest);
    else await fs.copyFile(src, dest);
  }
}
