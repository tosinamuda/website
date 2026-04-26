// Build the main static pages: home, about, work, contact, /blog/ index.
//
// Each page is a hand-authored template in src/. We just stamp the shared
// components, inject the OG meta block, and write the result.

import fs from "node:fs/promises";
import path from "node:path";
import { SRC, site } from "../config.js";
import { stampComponents } from "../render.js";
import { renderAnalytics, renderOgTags } from "../seo.js";
import { writeFile } from "../fs-helpers.js";

/** @typedef {import("../articles.js").Article} Article */

/**
 * @typedef {Object} PageDefinition
 * @property {string} src         File under src/, e.g. "about.html".
 * @property {string} dest        Path under dist/, e.g. "about.html".
 * @property {string} title       Used in <title> and og:title.
 * @property {string} description Used in meta description and og:description.
 * @property {string} url         Path used for canonical and og:url.
 */

/** @returns {PageDefinition[]} */
function pageDefinitions() {
  return [
    { src: "index.html",   dest: "index.html",      title: site.name, description: site.description, url: "/" },
    { src: "about.html",   dest: "about.html",      title: `About | ${site.name}`,   description: "About Tosin Amuda. Software engineer at IBM, MSc on lesson-plan-driven personalised learning.", url: "/about.html" },
    { src: "work.html",    dest: "work.html",       title: `Work | ${site.name}`,    description: "Applied projects, research, and experiments by Tosin Amuda.", url: "/work.html" },
    { src: "contact.html", dest: "contact.html",    title: `Contact | ${site.name}`, description: "Best ways to reach Tosin Amuda.", url: "/contact.html" },
    { src: "blog.html",    dest: "blog/index.html", title: `Notes | ${site.name}`,   description: "Notes on engineering, AI, cloud, and personal reflections.", url: "/blog/" },
  ];
}

/**
 * Write each main page to dist/.
 *
 * @param {Article[]} publishedArticles  Used by stampComponents for blog-archive elements.
 */
export async function buildPages(publishedArticles) {
  for (const page of pageDefinitions()) {
    let html = await fs.readFile(path.join(SRC, page.src), "utf8");

    html = html.replace("<!--%notes-count-->", String(publishedArticles.length));
    html = await stampComponents(html, publishedArticles);
    html = html.replace(
      "<!--%og%-->",
      `${renderAnalytics()}
    ${renderOgTags({ title: page.title, description: page.description, url: page.url })}`
    );

    await writeFile(page.dest, html);
  }
}
