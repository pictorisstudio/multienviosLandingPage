export function initComparison(root = document) {
  const button = root.querySelector("[data-run-comparison]");
  const results = root.querySelector("[data-comparison-results]");
  const form = root.querySelector("[data-quote-form]");
  const status = root.querySelector("[data-quote-status]");
  if (!button || !results || !form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    results.setAttribute("aria-busy", "true");
    const values = new FormData(form);
    status.textContent = "Buscando opciones para la ruta seleccionada.";
    results.classList.add("is-loading");

    // Duración de la transición visual mientras se incorpora la consulta real al cotizador.
    window.setTimeout(() => {
      results.classList.remove("is-loading");
      button.disabled = false;
      results.removeAttribute("aria-busy");
      status.textContent = `Ruta seleccionada: ${values.get("origin")} a ${values.get("destination")}. Las tarifas se mostrarán cuando se conecte el cotizador.`;
    }, 850);
  });
}

export function initQuoteNavigation(root = document) {
  const target = root.querySelector("#cotizador");
  if (!target) return;

  root.querySelectorAll('a[href="#cotizador"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      // Desplaza hasta el cotizador sin añadir un fragmento a la dirección del navegador.
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}
