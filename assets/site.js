const pageLabels = {
  home: "index.html",
  technology: "technology.html",
  journey: "journey.html",
  "proof-of-concept": "proof-of-concept.html",
  faq: "faq.html",
  contact: "contact.html"
};

const navItems = [
  ["home", "Home"],
  ["technology", "Technology"],
  ["journey", "Journey"],
  ["proof-of-concept", "Proof of Concept"],
  ["faq", "FAQ"],
  ["contact", "Contact"]
];

function buildHeader(activeKey) {
  const desktopLinks = navItems.map(([key, label]) => {
    const activeClass = key === activeKey ? "nav-link active" : "nav-link";
    return `<a class="${activeClass} transition duration-200" href="${pageLabels[key]}">${label}</a>`;
  }).join("");

  const mobileLinks = navItems.map(([key, label]) => {
    const activeClass = key === activeKey
      ? "rounded-2xl border border-[rgba(214,175,96,0.28)] bg-[rgba(214,175,96,0.08)] px-4 py-3 font-semibold text-[#f7f0d8]"
      : "rounded-2xl px-4 py-3 text-[#d9c8a1] transition hover:bg-[rgba(214,175,96,0.06)] hover:text-[#fff3cf]";
    return `<a class="${activeClass}" href="${pageLabels[key]}">${label}</a>`;
  }).join("");

  return `
    <header class="sticky top-0 z-50 px-4 pt-4">
      <div class="glass-nav mx-auto max-w-7xl rounded-[2rem] px-5 py-4 md:px-6">
        <div class="flex items-center justify-between gap-4">
          <a href="index" class="flex items-center gap-3">
            <img src="assets/images/MWS-5.png" alt="Microwave Stove logo" class="h-11 w-11 rounded-full object-cover ring-1 ring-[rgba(214,175,96,0.26)]">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.34em] text-[#d6af60]">Microwave</p>
              <p class="text-sm text-[#f7f0d8]">Stove</p>
            </div>
          </a>
          <div class="hidden rounded-full border border-[rgba(214,175,96,0.18)] bg-[rgba(214,175,96,0.06)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d6af60] xl:inline-flex">Early-stage innovation project</div>
          <nav class="hidden items-center gap-7 text-sm font-medium lg:flex">
            ${desktopLinks}
          </nav>
          <div class="flex items-center gap-3">
            <a href="contact.html" class="glow-button hidden rounded-full border border-[rgba(214,175,96,0.35)] bg-[linear-gradient(135deg,#d6af60,#8f6a2f)] px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:brightness-110 lg:inline-flex">Start a Conversation</a>
            <button id="mobile-menu-button" type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(214,175,96,0.25)] text-[#f7f0d8] transition hover:bg-[rgba(214,175,96,0.08)] lg:hidden" aria-label="Open navigation" aria-expanded="false">
              <span class="text-xl leading-none">+</span>
            </button>
          </div>
        </div>
        <div id="mobile-menu" class="hidden pt-4 lg:hidden">
          <div class="grid gap-2 rounded-3xl border border-[rgba(214,175,96,0.14)] bg-[rgba(9,9,9,0.94)] p-3 shadow-2xl">
            ${mobileLinks}
          </div>
        </div>
      </div>
    </header>
  `;
}

function buildFooter() {
  return `
    <footer class="site-footer mt-20 px-4 py-12 text-white">
      <div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.34em] text-[#d6af60]">Microwave Stove</p>
          <p class="mt-4 max-w-2xl text-sm leading-7 text-[#e6d7b4]">Microwave Stove is an early-stage innovation project. The information on this website is for general understanding and collaboration discussions only.</p>
        </div>
        <div class="grid gap-3 text-sm text-[#d9c8a1] md:justify-self-end">
          <a href="technology" class="transition hover:text-[#fff3cf]">Technology</a>
          <a href="journey" class="transition hover:text-[#fff3cf]">Journey</a>
          <a href="proof-of-concept" class="transition hover:text-[#fff3cf]">Proof of Concept</a>
          <a href="faq" class="transition hover:text-[#fff3cf]">FAQ</a>
          <a href="contact" class="transition hover:text-[#fff3cf]">Contact</a>
        </div>
      </div>
      <div class="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[rgba(214,175,96,0.12)] pt-6 text-xs uppercase tracking-[0.22em] text-[#8a7858] md:flex-row md:items-center md:justify-between">
        <p>Early-stage innovation project.</p>
        <p>&copy; <span id="site-year"></span> Microwave Stove</p>
      </div>
    </footer>
  `;
}

function initReveal() {
  const nodes = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || !nodes.length) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16
  });

  nodes.forEach((node) => observer.observe(node));
}

document.addEventListener("DOMContentLoaded", () => {
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  const activePage = headerMount?.dataset.page || "home";

  if (headerMount) {
    headerMount.innerHTML = buildHeader(activePage);
  }

  if (footerMount) {
    footerMount.innerHTML = buildFooter();
  }

  const button = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");

  if (button && menu) {
    button.addEventListener("click", () => {
      menu.classList.toggle("hidden");
      button.setAttribute("aria-expanded", String(!menu.classList.contains("hidden")));
    });
  }

  const yearNode = document.getElementById("site-year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  initReveal();
});
