export function initComparison(root = document) {
  const button = root.querySelector("[data-run-comparison]");
  const results = root.querySelector("[data-comparison-results]");
  if (!button || !results) return;

  button.addEventListener("click", () => {
    button.disabled = true;
    // El primer nodo es el texto; el icono que lo acompaña debe permanecer intacto.
    button.firstChild.textContent = "Buscando alternativas ";
    results.classList.add("is-loading");

    // Duración de la transición visual mientras se incorpora la consulta real al cotizador.
    window.setTimeout(() => {
      results.classList.remove("is-loading");
      button.disabled = false;
      button.firstChild.textContent = "Comparar de nuevo ";
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
