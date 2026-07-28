// Making note bodies portable, for the feed.
//
// The site's custom elements get their shape from CSS. A feed reader loads no
// stylesheet, so anything the styling supplied is lost: a `heading` attribute
// rendered through ::before disappears, and elements that CSS put on separate
// lines run together.
//
// The two rules below are keyed on markup, not on element names, so a new
// custom element needs no change here. Only the feed uses this; the site keeps
// the custom elements.

const CUSTOM_ELEMENT = /<([a-z][a-z0-9]*-[a-z0-9-]+)((?:\s[^>]*)?)>([\s\S]*?)<\/\1>/g;
const HEADING_ATTR = /\sheading="([^"]*)"/;

// A cite straight after a link has nothing between them without CSS, so the
// source reads as part of the link text.
const SOURCE_AFTER_LINK = /<\/a>\s*<cite>([\s\S]*?)<\/cite>/g;

/**
 * Rewrite the custom elements in a note body as plain HTML.
 *
 * @param {string} html  A note body as authored.
 * @returns {string}
 */
export function toPortableHtml(html) {
  return unwrapCustomElements(html).replace(SOURCE_AFTER_LINK, "</a> ($1)");
}

/**
 * Replace each custom element with its own contents, keeping the `heading`
 * attribute as a real heading. Recurses so a nested element is unwrapped too.
 *
 * @param {string} html
 */
function unwrapCustomElements(html) {
  return html.replace(CUSTOM_ELEMENT, (_match, _tag, attrs, inner) => {
    const contents = unwrapCustomElements(inner);
    const heading = (attrs.match(HEADING_ATTR) || [])[1];
    return heading ? `<h3>${heading}</h3>${contents}` : contents;
  });
}
