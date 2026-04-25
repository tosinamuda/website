// INEC Collation Process — scroll-driven civic infographic.
//
// On connect, the element wires three things on its server-stamped markup:
//
//  1. IntersectionObserver — adds `.in` to .reveal/.step/.stat/.matrix/
//     .flag-strip/.header as they enter the viewport (CSS handles the
//     transitions). Fires the stat counters once, on first intersection.
//  2. Hero scroll-scrub — translates the ballot dot along its path,
//     swaps the headline per stage, reveals risk markers, and updates
//     the progress bar / re-entry counter. Driven by getBoundingClientRect.
//  3. Swarm seeding — populates the SVG with ~120 small green dots that
//     fade in over the last 20% of scroll progress to imply scale.
//
// Reduced-motion users get the static poster (CSS handles that via
// @media query); we still install the listeners but their visual effect
// is suppressed.

const STATIONS = [110, 300, 490, 680, 870, 1080];

const STAGE_HEADLINES = [
  "A single ballot's journey, <em>today</em>.",
  "BVAS captures the <em>image</em>, but not the figure.",
  "Forms travel by hand to the <em>ward</em>.",
  "Re-summed at the <em>local government</em> level.",
  "Re-summed again at the <em>state</em> level.",
  "Declared in <em>Abuja</em> &mdash; four manual re-entries later.",
];

const RISK_MARKER_XS = [395, 585, 775, 975];

class InecCollation extends HTMLElement {
  connectedCallback() {
    this._setupReveal();
    this._setupHero();
  }

  disconnectedCallback() {
    if (this._io) this._io.disconnect();
    if (this._onScroll) {
      window.removeEventListener("scroll", this._onScroll);
      window.removeEventListener("resize", this._onScroll);
    }
  }

  _setupReveal() {
    // Stagger step rows so they cascade rather than reveal in unison.
    this.querySelectorAll(".col .step").forEach((step, i) => {
      step.style.setProperty("--rd", `${i * 60}ms`);
    });

    const targets = this.querySelectorAll(
      ".reveal, .step, .stat, .matrix, .flag-strip, .header"
    );
    this._io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          if (entry.target.dataset.stats !== undefined) this._runCounters();
          this._io.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => this._io.observe(el));
  }

  _runCounters() {
    this.querySelectorAll(".stat-num[data-target]").forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const fmt = el.dataset.format;
      const suffix = el.dataset.suffix || "";
      const dur = 1100;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = Math.round(target * eased);
        const text =
          fmt === "comma"
            ? v.toLocaleString()
            : target >= 1000
            ? String(Math.round(v / 1000))
            : String(v);
        el.textContent = text;
        if (suffix) {
          const span = document.createElement("span");
          span.className = "unit";
          span.innerHTML = suffix;
          el.appendChild(span);
        }
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  _setupHero() {
    const hero = this.querySelector("[data-hero]");
    if (!hero) return;

    const ballotDot = this.querySelector("[data-ballot-dot]");
    const headline = this.querySelector("[data-hero-headline]");
    const progressBar = this.querySelector("[data-hero-progress]");
    const stageLabel = this.querySelector("[data-hero-stage]");
    const reentryCount = this.querySelector("[data-reentry-count]");
    const swarmGroup = this.querySelector("[data-ballot-swarm]");
    const riskMarkers = this.querySelectorAll(".risk-marker");

    // Seed the swarm: 5 rows × 24 cols of small dots that fade in toward the end.
    const SVG_NS = "http://www.w3.org/2000/svg";
    const frag = document.createDocumentFragment();
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 24; c++) {
        const cx = 90 + c * 45 + (r % 2 ? 12 : 0);
        const cy = 60 + r * 22;
        const dot = document.createElementNS(SVG_NS, "circle");
        dot.setAttribute("cx", cx);
        dot.setAttribute("cy", cy);
        dot.setAttribute("r", 2.2);
        dot.setAttribute("fill", "#008751");
        frag.appendChild(dot);
      }
    }
    swarmGroup.appendChild(frag);
    const swarmDots = swarmGroup.querySelectorAll("circle");

    const update = () => {
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      // Scrub starts when the hero's top reaches 85% vh, ends ~40% past the
      // hero's height — gives a comfortable read-through window.
      const start = vh * 0.85;
      const end = -rect.height * 0.4;
      const raw = (start - rect.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));

      // Translate ballot dot along stations.
      const segIdx = Math.min(STATIONS.length - 1, Math.floor(p * STATIONS.length));
      const segP = p * STATIONS.length - segIdx;
      const x0 = STATIONS[segIdx];
      const x1 = STATIONS[Math.min(STATIONS.length - 1, segIdx + 1)];
      const x = x0 + (x1 - x0) * segP;
      ballotDot.setAttribute("transform", `translate(${x} 200)`);

      // Update headline only when the stage actually changes.
      const stageIdx = Math.min(
        STAGE_HEADLINES.length - 1,
        Math.round(p * (STAGE_HEADLINES.length - 1))
      );
      if (headline.dataset.stage !== String(stageIdx)) {
        headline.dataset.stage = stageIdx;
        headline.innerHTML = STAGE_HEADLINES[stageIdx];
      }

      // Reveal risk markers as the ballot crosses each midpoint.
      let revealed = 0;
      riskMarkers.forEach((m, i) => {
        const show = x >= RISK_MARKER_XS[i] - 20 ? 1 : 0;
        m.setAttribute("opacity", show);
        if (show) revealed++;
      });
      reentryCount.textContent = revealed;

      progressBar.style.setProperty("--p", `${(p * 100).toFixed(1)}%`);
      stageLabel.textContent = `Stage ${Math.min(6, stageIdx + 1)} / 6`;

      // Swarm reveal in the final 20%.
      const swarmP = Math.max(0, (p - 0.8) / 0.2);
      swarmDots.forEach((d, i) => {
        const t = swarmP * swarmDots.length - i;
        d.style.opacity = t > 0 ? Math.min(0.45, t * 0.05) : 0;
      });
    };

    let ticking = false;
    this._onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", this._onScroll, { passive: true });
    window.addEventListener("resize", this._onScroll);
    update();
  }
}

customElements.define("inec-collation", InecCollation);
