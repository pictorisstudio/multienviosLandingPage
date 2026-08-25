export function initComparisonDemo(root = document) {
  const button = root.querySelector("[data-run-comparison]");
  const results = root.querySelector("[data-comparison-results]");
  if (!button || !results) return;

  button.addEventListener("click", () => {
    button.disabled = true;
    button.firstChild.textContent = "Buscando alternativas ";
    results.classList.add("is-loading");

    window.setTimeout(() => {
      results.classList.remove("is-loading");
      button.disabled = false;
      button.firstChild.textContent = "Comparar de nuevo ";
    }, 850);
  });
}
