# Content authoring guide

Notes are the only content type on the site. Each note lives at `content/blog/{slug}.html` and is wrapped in a `<blog-post>` element.

## File shape

```html
<blog-post
  title="The note title"
  excerpt="One-sentence summary, used on listings, the blog post header, and OG tags."
  date="2026-04-24">
  <script type="application/json" id="meta">
    {
      "type": "essay",
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
| `excerpt`    | yes      | One-sentence summary. Aim for ≤ 160 characters (SERP/OG truncation above that).        |
| `date`       | yes      | ISO date `YYYY-MM-DD`. Used for sort order and rendered as `12 apr 2026` style.        |
| `og-image`   | no       | Absolute or root-relative path to the OG image. Falls back to `meta.ogImage` if unset. |
| `draft`      | no       | Boolean attribute (just `draft` on its own). Drafts get `noindex` and skip the feed.   |

## Meta JSON fields

These live in the `<script type="application/json" id="meta">` block:

| Field        | Required | Description                                                                            |
| ------------ | -------- | -------------------------------------------------------------------------------------- |
| `type`       | no       | Note type. See **Types** below. Defaults to `essay` if unset.                          |
| `categories` | no       | Array of subject tags. Free-form strings. See **Categories** below.                    |
| `featured`   | no       | Boolean. Reserved for elevating a note to the top of its type section. Not yet wired.  |
| `ogImage`    | no       | Same as the `og-image` attribute, alternative location.                                |

## Types

The `type` field describes the **form** of the note — what kind of writing it is. Used on the home page to group notes into sections.

| Type           | Use it for                                                                              |
| -------------- | --------------------------------------------------------------------------------------- |
| `essay`        | Long-form, polished thinking. The default if `type` is unset.                           |
| `ongoing-work` | Working notes from active projects. Threads in motion, WIP thinking.                    |
| `learning`     | Notes from reading, study, replication, research.                                       |
| `note`         | Short observations, lightweight pieces.                                                 |

The home page renders sections in this order: `ongoing-work → learning → essay → note`. Empty types are skipped.

## Categories

The `categories` field describes what the note is **about** — its subjects. Free-form strings. A note can have multiple categories. The first one is treated as the primary category and is shown as a tag in note rows and meta lines.

Categories drive the `/blog/category/{slug}.html` archive pages.

Examples in use:
- `AI`
- `Engineering`
- `DevOps`
- `Education`
- `Civic Tech`
- `Nigerian Politics`
- `Personal`

Lowercased and slugified for URLs (`Civic Tech` → `/blog/category/civic-tech.html`).

## Type vs category

Two orthogonal axes. A note has both:

- **type** = what form is this writing? (`essay`, `ongoing-work`, etc.)
- **category** = what is it about? (`AI`, `Education`, etc.)

So a note about ongoing AI-in-education research would be:

```json
{ "type": "ongoing-work", "categories": ["AI", "Education"] }
```

## How pages render

| Page                                         | Behaviour                                                                  |
| -------------------------------------------- | -------------------------------------------------------------------------- |
| `/`                                          | Intro paragraph + notes grouped by `type`, in the order listed above.      |
| `/blog/`                                     | Flat archive of all published notes, newest first.                         |
| `/blog/{slug}.html`                          | Single note with header meta, body, and "more in {category}" related list. |
| `/blog/category/{slug}.html`                 | All notes tagged with that category, newest first.                         |

## Adding a new note

1. Create `content/blog/{your-slug}.html`.
2. Wrap content in `<blog-post>` with the required attributes (`title`, `excerpt`, `date`).
3. Add a meta JSON block. At minimum, set `type` and `categories`.
4. Write the body in plain HTML.
5. Run `npm run build`.
6. The build script will warn about title/excerpt length if they're too long for SERP.

## Drafts

Add the `draft` attribute to keep a note out of the feed and indexing while you write:

```html
<blog-post title="..." excerpt="..." date="..." draft>
```

Drafts still build to `dist/blog/{slug}.html` so you can preview at the URL, but they're excluded from listings and get `<meta name="robots" content="noindex, nofollow">`.
