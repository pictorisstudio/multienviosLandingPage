export function initThemeToggle(root = document) {
  const button = root.querySelector("[data-theme-toggle]");
  const themeColor = root.querySelector('meta[name="theme-color"]');
  if (!button) return;

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    button.setAttribute(
      "aria-label",
      theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
    );
    themeColor?.setAttribute("content", theme === "dark" ? "#263746" : "#FFFFFF");
  };

  // Cada visita empieza en claro por decisión de diseño; el cambio solo dura en esta página.
  applyTheme("light");
  button.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}
