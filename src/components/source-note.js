class SourceNote extends HTMLElement {
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
    const heading = this.getAttribute("heading") || this.getAttribute("label") || "Source note";

    if (!this.hasAttribute("role")) this.setAttribute("role", "note");
    if (!this.hasAttribute("aria-label") || this.dataset.ariaLabelSource === "heading") {
      this.setAttribute("aria-label", heading);
      this.dataset.ariaLabelSource = "heading";
    }
  }
}

customElements.define("source-note", SourceNote);
