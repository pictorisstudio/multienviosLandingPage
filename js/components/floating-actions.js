import { qs } from "../utils/dom.js";

export function initFloatingActions(root = document) {
  const actions = qs("[data-floating-actions]", root);
  const backToTop = qs("[data-back-to-top]", root);
  if (!actions) return;

  const updateVisibility = () => {
    actions.classList.toggle("is-visible", window.scrollY > 420);
  };

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
}
