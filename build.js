// Site build orchestrator.
//
// Read top to bottom — this is the recipe. Each step delegates to a focused
// module under src/builder/. Side effects (file writes) live in
// src/builder/outputs/; everything else is a pure function over Article data.

import { loadArticles } from "./src/builder/articles.js";
import { resetDist } from "./src/builder/fs-helpers.js";
import { buildPages } from "./src/builder/outputs/pages.js";
import { buildArticles } from "./src/builder/outputs/articles.js";
import { buildCategoryPages } from "./src/builder/outputs/categories.js";
import { buildFeed } from "./src/builder/outputs/feed.js";
import { buildSitemap } from "./src/builder/outputs/sitemap.js";
import { copyAssets } from "./src/builder/outputs/assets.js";
import { verify } from "./src/builder/verify.js";

async function build() {
  console.log("» reset dist/");
  await resetDist();

  console.log("» load articles");
  const articles = await loadArticles();
  const published = articles.filter((a) => !a.draft);
  const draftCount = articles.length - published.length;
  console.log(`  ${published.length} published${draftCount ? `, ${draftCount} draft` : ""}`);

  console.log("» copy assets");
  const assets = await copyAssets();

  console.log("» build pages");
  await buildPages(published, assets);

  console.log("» build articles");
  await buildArticles(articles, published, assets);

  console.log("» build category archives");
  await buildCategoryPages(published, assets);

  console.log("» build feed + sitemap");
  await Promise.all([buildFeed(published), buildSitemap(published)]);

  console.log("» verify");
  await verify(assets);

  console.log("✓ build complete");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
