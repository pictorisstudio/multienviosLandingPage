import { qsa } from "../utils/dom.js";

const MOTION_SELECTOR = "[data-motion-bars], [data-process-list]";

export function initMotionEffects(root = document) {
  const elements = qsa(MOTION_SELECTOR, root);
  if (!elements.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-motion-active"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-motion-active");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.28 });

  elements.forEach((element) => observer.observe(element));
}
