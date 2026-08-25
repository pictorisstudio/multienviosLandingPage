const STORAGE_KEY = "multienvios-theme";

export function initThemeToggle(root = document) {
  const button = root.querySelector("[data-theme-toggle]");
  const themeColor = root.querySelector('meta[name="theme-color"]');
  if (!button) return;

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    button.setAttribute("aria-label", theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    themeColor?.setAttribute("content", theme === "dark" ? "#263746" : "#FFFFFF");
  };

  applyTheme(document.documentElement.dataset.theme || "light");
  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch (_) {
      // The visual preference still applies when storage is unavailable.
    }
    applyTheme(nextTheme);
  });
}
