import { initNavbar, updateCurrentYear } from "./components/navbar.js";
import { initAccordion } from "./components/accordion.js";
import { initScrollAnimations } from "./components/scroll-animations.js";
import { initThemeToggle } from "./components/theme-toggle.js";
import { initComparisonDemo } from "./components/comparison-demo.js";
import { initMotionEffects } from "./components/motion-effects.js";
import { bindAnalyticsEvents } from "./utils/analytics.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initAccordion();
  initScrollAnimations();
  initThemeToggle();
  initComparisonDemo();
  initMotionEffects();
  updateCurrentYear();
  bindAnalyticsEvents();
});
