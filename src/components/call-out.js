// One labelled block for secondary material at the end of a note: a
// disclaimer, an origin note, a further-reading list. The heading attribute
// supplies the label; pass `role` to override the default when the contents
// are something more specific than a note.

class CallOut extends HTMLElement {
  static get observedAttributes() {
    return ["heading", "label"];
  }

  connectedCallback() {
    this.dataset.enhanced = "true";
    this.syncAccessibility();
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this.syncAccessibility();
  }

  syncAccessibility() {
    const heading = this.getAttribute("heading") || this.getAttribute("label") || "Note";

    if (!this.hasAttribute("role")) this.setAttribute("role", "note");
    if (!this.hasAttribute("aria-label") || this.dataset.ariaLabelSource === "heading") {
      this.setAttribute("aria-label", heading);
      this.dataset.ariaLabelSource = "heading";
    }
  }
}

customElements.define("call-out", CallOut);
