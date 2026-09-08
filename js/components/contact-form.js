import { siteConfig } from "../config.js";
import { qsa, qs } from "../utils/dom.js";
import { validateField, setFieldError } from "../utils/validation.js";
import { trackEvent } from "../utils/analytics.js";

async function sendContactRequest(formData) {
  // Módulo reservado: app.js todavía no lo utiliza. Conectar aquí la API cuando se incorpore el formulario.
  await new Promise((resolve) => window.setTimeout(resolve, siteConfig.formSimulationDelay));
  return { ok: true, reference: crypto.randomUUID?.() ?? Date.now().toString() };
}

export function initContactForm(root = document) {
  const form = qs("[data-contact-form]", root);
  if (!form) return;

  const status = qs("[data-form-status]", form);
  const submitButton = qs("[data-submit-button]", form);
  const fields = qsa("input, select, textarea", form).filter((field) => field.name !== "website");

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form__status";

    const honeypot = qs('[name="website"]', form);
    if (honeypot?.value) return;

    const isValid = fields.map(validateField).every(Boolean);
    if (!isValid) {
      trackEvent("contact_form_error", { reason: "validation" });
      fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    trackEvent("submit_contact_form");

    try {
      const response = await sendContactRequest(new FormData(form));
      if (!response.ok) throw new Error("Simulated request failed");
      form.reset();
      fields.forEach((field) => setFieldError(field, ""));
      status.textContent = "Mensaje enviado correctamente. Te contactaremos pronto.";
      status.classList.add("form__status--success");
      trackEvent("contact_form_success", { reference: response.reference });
    } catch (error) {
      status.textContent = "No fue posible simular el envío. Inténtalo de nuevo.";
      status.classList.add("form__status--error");
      trackEvent("contact_form_error", { reason: error.message });
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar mensaje";
    }
  });
}
