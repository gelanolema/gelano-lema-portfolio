/* =========================================
   THEME TOGGLE
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const themeButton = document.querySelector(
        "#theme-toggle, .theme-toggle, [data-theme-toggle]"
    );

    if (!themeButton) {
        console.log("Theme toggle button not found.");
        return;
    }

    themeButton.addEventListener("click", function () {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    });

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});
