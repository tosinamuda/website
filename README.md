# Site Spec

A static site with no dependencies and no framework: plain HTML, plain CSS, and web components, using only what browsers already standardize.

## Stack

- **Builder:** a Node script (`build.js`) over modules in `src/builder/`. No bundler.
- **Templates:** HTML in `src/`, plus the web components in `src/components/`. The build stamps `<site-header>`, `<site-footer>`, and `<blog-archive>` into the output, so pages work without JS.
- **Styles:** hand-written CSS modules in `src/styles/`. The build concatenates them to `dist/assets/styles.css`.
- **Typography:** Spectral (serif) and JetBrains Mono (mono), self-hosted as WOFF2 in `public/fonts/`.
- **Dark mode:** `color-scheme: light dark` with `light-dark()` in `10-tokens.css`, so it follows the OS. Override with `[data-mode="light|paper|dark"]` on `:root`.
- **Notes:** plain HTML in `content/blog/` wrapped in a `<blog-post>` element. [`CONTENT.md`](./CONTENT.md) has the authoring schema.

## Project layout

```
build.js                       # build orchestrator
src/
  builder/                     # build pipeline modules
    config.js                  # paths, site config, home page section labels
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
  styles/                      # ordered CSS modules concatenated at build time
    00-fonts.css               # view transitions, cascade layers, font faces
    10-tokens.css              # design tokens, colour modes
    20-base.css                # base element/layout rules
    30-components.css          # shared site components and prose
    articles/                  # article-specific visual systems
    90-print.css               # print rules
  index.html, about.html, work.html, contact.html, blog.html, category.html
content/blog/                  # source notes, one HTML file per post
public/                        # static assets copied to dist/
site.config.json               # site metadata used by build
CONTENT.md                     # authoring guide for notes
```

## Commands

```bash
npm install        # nothing to install; the site has no dependencies
npm run build      # build into dist/
npm run preview    # serve dist/ at http://127.0.0.1:4173
npm run dev        # rebuild on file changes
npm run clean      # remove dist/
```

## Comments (giscus)

The blog post template renders a giscus comments box at the bottom of every post. It uses the [`tosinamuda/website`](https://github.com/tosinamuda/website) repo's `General` discussion category, with `pathname` mapping (one discussion thread per post URL).

Install the [giscus app](https://github.com/apps/giscus) on the `tosinamuda/website` repo. Without it, the box reads "giscus is not installed on this repo".

If you ever change the comments repo or category, update the `data-*` attributes in `src/components/blog-post.html`.
