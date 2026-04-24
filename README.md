# Tosin Amuda — site

A writer-first static site built to stay readable and maintainable for a long time. Plain HTML, plain CSS, web components, no framework runtime.

## Stack

- **Build:** small Node script (`build.js`) orchestrating focused modules in `src/builder/`. No bundler.
- **Templates:** hand-authored HTML in `src/`, served by web components (`<site-header>`, `<site-footer>`, `<blog-archive>`, `<blog-post>`, `<code-block>`) that are server-stamped at build time.
- **Styles:** one hand-written `src/styles/app.css`, copied as-is to `dist/assets/styles.css`. No Tailwind, no preprocessor.
- **Typography:** Spectral (serif) and JetBrains Mono (mono), self-hosted as WOFF2 in `public/fonts/`.
- **Dark mode:** auto via `prefers-color-scheme`. Manual override available with `[data-mode="light|paper|dark"]` on `:root`.
- **Notes:** plain HTML in `content/blog/` wrapped in a `<blog-post>` element. See [`CONTENT.md`](./CONTENT.md) for the schema.

## Why this is durable

- Output is static HTML, CSS, SVG, and a few small JS files for the web components.
- No build-time framework, no client-side framework, no CDN dependencies.
- Reading works fully without JavaScript.
- Single CSS file is hand-authored and small enough to read top-to-bottom.

## Project layout

```
build.js                       # build orchestrator (~50 lines, reads like a recipe)
src/
  builder/                     # build pipeline modules
    config.js                  # paths, site config, type taxonomy
    utils.js                   # html escape, dates, slugify, reading time
    fs-helpers.js              # writeFile, copyDir, resetDist
    articles.js                # Article type + loader + parser + template vars
    render.js                  # template engine, archives, related, components
    seo.js                     # OG tags, JSON-LD
    outputs/                   # one file per build target
      pages.js                 # home, about, work, contact, /blog/ index
      articles.js              # individual blog posts
      categories.js            # /blog/category/{slug}.html
      feed.js                  # atom feed
      sitemap.js               # sitemap.xml
      assets.js                # copy components + public + styles
    verify.js                  # smoke check
  components/                  # web component HTML + JS
  layouts/article.html         # blog post page layout
  styles/app.css               # all CSS
  index.html, about.html, work.html, contact.html, blog.html, category.html
content/blog/                  # source notes, one HTML file per post
public/                        # static assets copied to dist/
site.config.json               # site metadata used by build
CONTENT.md                     # authoring guide for notes
```

## Commands

```bash
npm install        # no runtime deps; only resolves the empty devDependencies block
npm run build      # build into dist/
npm run preview    # serve dist/ at http://127.0.0.1:4173
npm run dev        # rebuild on file changes
npm run clean      # remove dist/
```

## Authoring

See [`CONTENT.md`](./CONTENT.md) for the note schema (frontmatter, types, categories, drafts).

## Comments (giscus)

The blog post template renders a giscus comments box at the bottom of every post. It uses the [`tosinamuda/website`](https://github.com/tosinamuda/website) repo's `General` discussion category, with `pathname` mapping (one discussion thread per post URL).

For comments to actually load, the [giscus app](https://github.com/apps/giscus) must be installed on the `tosinamuda/website` repo. If the comments box shows "giscus is not installed on this repo" after deploying, install the app and refresh.

If you ever change the comments repo or category, update the `data-*` attributes in `src/components/blog-post.html`.
