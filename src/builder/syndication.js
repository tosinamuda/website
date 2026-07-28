// Making note bodies portable, for the feed.
//
// The site's custom elements get their shape from CSS: `source-note` and
// `further-reading` render their `heading` attribute through a ::before rule,
// and `further-reading` turns its `cite` tags into a second line. A feed reader
// loads none of that, so the heading disappears and the markup falls back to
// browser defaults.
//
// Everything here rewrites those elements into plain HTML that carries the same
// meaning without a stylesheet. Only the feed uses it; the site keeps the
// custom elements.

const CUSTOM_ELEMENT = /<([a-z][a-z0-9]*-[a-z0-9-]+)((?:\s[^>]*)?)>([\s\S]*?)<\/\1>/g;
const HEADING_ATTR = /\sheading="([^"]*)"/;

/**
 * Rewrite the custom elements in a note body as plain HTML.
 *
 * @param {string} html  A note body as authored.
 * @returns {string}
 */
export function toPortableHtml(html) {
  let out = html;
  // Innermost elements first, so a wrapper never re-wraps flattened content.
  for (let pass = 0; pass < 3; pass++) {
    const next = out.replace(CUSTOM_ELEMENT, (_m, tag, attrs, inner) => {
      const heading = (attrs.match(HEADING_ATTR) || [])[1];
      const body = tag === "further-reading" ? inlineCitations(inner) : inner;
      return heading ? `<h3>${heading}</h3>${body}` : body;
    });
    if (next === out) break;
    out = next;
  }
  return out;
}

/**
 * `<a>Title</a><cite>Source</cite>` reads as one run of text without CSS to
 * separate the two, so put the source in brackets.
 *
 * @param {string} html
 */
function inlineCitations(html) {
  return html.replace(/<cite>([\s\S]*?)<\/cite>/g, " ($1)");
}
