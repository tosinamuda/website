class CodeBlock extends HTMLElement {
  connectedCallback() {
    if (this.dataset.enhanced === "true") return;
    this.dataset.enhanced = "true";

    const code = this.querySelector("pre code") || this.querySelector("pre");
    if (!code) return;

    const header = document.createElement("div");
    header.className = "code-block-header";

    const language = this.getAttribute("language");
    if (language) {
      const badge = document.createElement("span");
      badge.className = "code-block-language";
      badge.textContent = language;
      header.appendChild(badge);
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-block-copy";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.textContent = "Copy";
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent.trim());
        button.textContent = "Copied";
        button.dataset.state = "copied";
        setTimeout(() => {
          button.textContent = "Copy";
          delete button.dataset.state;
        }, 1600);
      } catch {
        button.textContent = "Error";
      }
    });
    header.appendChild(button);

    this.insertBefore(header, this.firstChild);
  }
}

customElements.define("code-block", CodeBlock);
