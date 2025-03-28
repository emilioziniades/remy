window.onload = function () {
  document
    .getElementById("dark-mode-toggle")
    .addEventListener("click", function (_e) {
      const currentTheme = document.documentElement.getAttribute("data-theme");

      if (currentTheme == "light") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else if (currentTheme == "dark") {
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "light");
        } else {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
    });
};
