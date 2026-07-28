# Content authoring guide

Notes are the only content type on the site. Each note lives at `content/blog/{slug}.html` and is wrapped in a `<blog-post>` element.

## File shape

```html
<blog-post
  title="The note title"
  excerpt="This is what the major categories of agent framework are, and when to use which."
  date="2026-04-24">
  <script type="application/json" id="meta">
    {
      "categories": ["AI", "Education"],
      "featured": false
    }
  </script>

  <p>Body content. Plain HTML — paragraphs, headings, lists, code blocks.</p>
</blog-post>
```

## Frontmatter attributes

These live on the opening `<blog-post>` tag:

| Attribute    | Required | Description                                                                            |
| ------------ | -------- | -------------------------------------------------------------------------------------- |
| `title`      | yes      | Note title. Aim for ≤ 60 characters (SERP truncation warning above that).              |
| `excerpt`    | yes      | Search-result summary. ≤ 160 characters. Never shown on the note page. See **Excerpt**. |
| `date`       | yes      | ISO date `YYYY-MM-DD`. Used for sort order and rendered as `12 apr 2026` style.        |
| `og-image`   | no       | Absolute or root-relative path to the OG image. Falls back to `meta.ogImage` if unset. |
| `draft`      | no       | Boolean attribute (just `draft` on its own). Drafts get `noindex` and skip the feed.   |

## Meta JSON fields

These live in the `<script type="application/json" id="meta">` block:

| Field        | Required | Description                                                                            |
| ------------ | -------- | -------------------------------------------------------------------------------------- |
| `categories` | no       | Array of subject tags. Free-form strings. See **Categories** below.                    |
| `featured`   | no       | Boolean. Puts the note in the home page's featured section instead of essays.          |
| `ogImage`    | no       | Same as the `og-image` attribute, alternative location.                                |

## Excerpt

**The excerpt is never shown on the note page.** It is metadata, plus the
one-line summary under each title in the archive listings. It feeds five outputs:

- `<meta name="description">`
- OpenGraph and Twitter card descriptions
- JSON-LD `description`
- the Atom feed summary
- the summary line in `/` and `/blog/` listings

Write it for a search result. The reader meets it with nothing before it, sitting
under a title, deciding whether to click.

**Say what the note is, not what it concludes.** A compressed thesis reads as
advice from nowhere. Describe the piece instead.

- Yes: `This is what the major categories of agent framework are, and when to use which.`
- No: `Sort them by what you hand over: the prompt, the loop, the tools, or the perimeter.`

**Do not open on a pronoun that points backwards.** `They`, `It`, `That`, `Those`
have nothing to land on in a search result. The build warns on these. `This` and
`These` are allowed, because they point at the page the reader is holding.

- Yes: `Agent frameworks split into four kinds.`
- No: `They all overlap in what they can do.`

**Do not use vocabulary the note has not taught yet.** A term the body defines in
section three is an unexplained noun here.

- Yes: `by which part of the work you hand over`
- No: `by what you hand over: the prompt, the loop, the tools, or the perimeter`

**Close whatever the first sentence opens.** If it names a problem, the next
sentence answers it. An excerpt that sets up a list and never gives one leaves
the reader holding a promise.

**Include the term the page should rank for.** Write `agent framework`, not
`frameworks`, when that is the search term.

**Stay under 160 characters.** Truncation takes the tail, which is usually the
clause that earns the click.

## Featured

The home page has two sections: **featured**, then **essays**. A note with `"featured": true` appears in the first and is not repeated in the second. Everything else lands in essays, newest first.

## Categories

The `categories` field describes what the note is **about** — its subjects. Free-form strings. A note can have multiple categories. The first one is treated as the primary category and is shown as a tag in note rows and meta lines.

Categories drive the `/blog/category/{slug}` archive pages.

Examples in use:
- `AI`
- `Engineering`
- `DevOps`
- `Education`
- `Civic Tech`
- `Nigerian Politics`
- `Personal`

Lowercased and slugified for URLs (`Civic Tech` → `/blog/category/civic-tech`).

## How pages render

| Page                                         | Behaviour                                                                  |
| -------------------------------------------- | -------------------------------------------------------------------------- |
| `/`                                          | Intro paragraph, then the featured section and essays.                    |
| `/blog/`                                     | Flat archive of all published notes, newest first.                         |
| `/blog/{slug}`                               | Single note with header meta, body, and "more in {category}" related list. |
| `/blog/category/{slug}`                      | All notes tagged with that category, newest first.                         |

## Adding a new note

1. Create `content/blog/{your-slug}.html`.
2. Wrap content in `<blog-post>` with the required attributes (`title`, `excerpt`, `date`).
3. Add a meta JSON block. At minimum, set `categories`.
4. Write the body in plain HTML.
5. Run `npm run build`.
6. The build warns on a long title, a long excerpt, or an excerpt that opens on a backwards-pointing pronoun.

## Drafts

Add the `draft` attribute to keep a note out of the feed and indexing while you write:

```html
<blog-post title="..." excerpt="..." date="..." draft>
```

Drafts still build to `dist/blog/{slug}.html`, so you can preview them at `/blog/{slug}`. They are excluded from listings, the feed and the sitemap, and carry `<meta name="robots" content="noindex, nofollow">`. A draft's categories render as plain text rather than links, because category pages are built from published notes only.
