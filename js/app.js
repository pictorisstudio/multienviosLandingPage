import { initNavbar, updateCurrentYear } from "./components/navbar.js";
import { initAccordion } from "./components/accordion.js";
import { initScrollAnimations } from "./components/scroll-animations.js";
import { initThemeToggle } from "./components/theme-toggle.js";
import { initComparison, initQuoteNavigation } from "./components/comparison.js";
import { initMotionEffects } from "./components/motion-effects.js";
import { bindAnalyticsEvents } from "./utils/analytics.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initAccordion();
  initScrollAnimations();
  initThemeToggle();
  initComparison();
  initQuoteNavigation();
  initMotionEffects();
  updateCurrentYear();
  bindAnalyticsEvents();
});
