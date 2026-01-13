document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const htmlElement = document.documentElement;

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme) {
    if (theme === "dark") {
      htmlElement.classList.add("theme-dark");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
      htmlElement.classList.remove("theme-dark");
      themeIcon.classList.replace("fa-sun", "fa-moon");
    }
  }

  function applySystemTheme() {
    applyTheme(systemDark.matches ? "dark" : "light");
  }

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applySystemTheme();
  }

  themeToggle.addEventListener("click", function () {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem(
        "theme",
        htmlElement.classList.contains("theme-dark") ? "light" : "dark"
      );
    } else {
      localStorage.removeItem("theme");
      applySystemTheme();
      return;
    }

    applyTheme(localStorage.getItem("theme"));
  });

  systemDark.addEventListener("change", () => {
    if (!localStorage.getItem("theme")) {
      applySystemTheme();
    }
  });
});
