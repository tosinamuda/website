class FurtherReading extends HTMLElement {
  static get observedAttributes() {
    return ["heading"];
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
    const heading = this.getAttribute("heading") || "Further reading";

    if (!this.hasAttribute("role")) this.setAttribute("role", "doc-bibliography");
    if (!this.hasAttribute("aria-label") || this.dataset.ariaLabelSource === "heading") {
      this.setAttribute("aria-label", heading);
      this.dataset.ariaLabelSource = "heading";
    }
  }
}

customElements.define("further-reading", FurtherReading);
