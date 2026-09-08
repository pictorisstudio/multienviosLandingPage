import { qsa, qs } from "../utils/dom.js";
import { trackEvent } from "../utils/analytics.js";

export function initNavbar(root = document) {
  const header = qs("[data-navbar]", root);
  const toggle = qs("[data-navbar-toggle]", root);
  const menu = qs("[data-navbar-menu]", root);
  const links = qsa(".navbar__link", root);
  if (!header || !toggle || !menu) return;
  // Debe coincidir con el breakpoint del menú en css/components/navbar.css.
  const desktopQuery = window.matchMedia("(min-width: 940px)");

  const syncMenuA11y = () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    const shouldDisable = !isOpen && !desktopQuery.matches;
    // El menú móvil oculto tampoco debe recibir foco al navegar con el teclado.
    menu.inert = shouldDisable;
    menu.setAttribute("aria-hidden", String(shouldDisable));
  };

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    syncMenuA11y();
  };

  toggle.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(willOpen));
    menu.classList.toggle("is-open", willOpen);
    syncMenuA11y();
    if (willOpen) trackEvent("open_mobile_menu");
  });

  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const updateActiveLink = () => {
    const fromTop = window.scrollY + 120;
    links.forEach((link) => {
      const section = qs(link.getAttribute("href"));
      link.classList.toggle(
        "is-active",
        Boolean(
          section &&
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        )
      );
    });
  };

  updateHeader();
  updateActiveLink();
  syncMenuA11y();
  desktopQuery.addEventListener("change", syncMenuA11y);
  window.addEventListener("scroll", () => {
    updateHeader();
    updateActiveLink();
  }, { passive: true });
}

export function updateCurrentYear(root = document) {
  qsa("[data-current-year]", root).forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}
