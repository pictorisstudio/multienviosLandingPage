import { qsa } from "../utils/dom.js";
import { trackEvent } from "../utils/analytics.js";

export function initAccordion(root = document) {
  qsa("[data-accordion]", root).forEach((accordion) => {
    const buttons = qsa(".accordion__button", accordion);

    const togglePanel = (button) => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const willOpen = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(willOpen));
      panel?.classList.toggle("is-open", willOpen);
      if (willOpen) trackEvent("open_faq", { id: button.id });
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => togglePanel(button));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : event.key === "ArrowDown" ? index + 1 : index - 1;
        buttons[(nextIndex + buttons.length) % buttons.length].focus();
      });
    });
  });
}
