const SUB_MAP = {
  home: "/ notes",
  blog: "/ notes",
  note: "/ notes",
  work: "/ work",
  about: "/ about",
  contact: "/ contact",
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute("active");
    if (!active) return;

    const link = this.querySelector(`a[data-nav="${active}"]`);
    if (link) link.classList.add("is-current");

    const sub = this.querySelector(".brand .sub");
    if (sub && SUB_MAP[active]) sub.textContent = SUB_MAP[active];
  }
}

customElements.define("site-header", SiteHeader);
