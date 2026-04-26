const SUB_MAP = {
  home: "/ notes",
  blog: "/ notes",
  note: "/ notes",
  work: "/ work",
  about: "/ about",
  contact: "/ contact",
};

const NAV_MAP = {
  home: "home",
  blog: "home",
  note: "home",
  work: "work",
  about: "about",
  contact: "contact",
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute("active");
    if (!active) return;

    const nav = NAV_MAP[active];
    const link = nav ? this.querySelector(`a[data-nav="${nav}"]`) : null;
    if (link) link.classList.add("is-current");

    const sub = this.querySelector(".brand .sub");
    if (sub && SUB_MAP[active] && sub.textContent !== SUB_MAP[active]) {
      sub.textContent = SUB_MAP[active];
    }
  }
}

customElements.define("site-header", SiteHeader);
