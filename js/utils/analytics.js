const firedScrollEvents = new Set();

export function trackEvent(eventName, payload = {}) {
  // Punto único para conectar el proveedor de analítica sin modificar los controles de la página.
  console.info("[analytics:event]", eventName, payload);
}

export function bindAnalyticsEvents() {
  document.querySelectorAll("[data-analytics-event]").forEach((element) => {
    element.addEventListener("click", () => trackEvent(element.dataset.analyticsEvent));
  });

  window.addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const progress = window.scrollY / maxScroll;
    if (progress >= 0.5 && !firedScrollEvents.has("scroll_50_percent")) {
      firedScrollEvents.add("scroll_50_percent");
      trackEvent("scroll_50_percent");
    }
    if (progress >= 0.9 && !firedScrollEvents.has("scroll_90_percent")) {
      firedScrollEvents.add("scroll_90_percent");
      trackEvent("scroll_90_percent");
    }
  }, { passive: true });
}
