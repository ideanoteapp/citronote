/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/src/App.vue", "./src/renderer/src/components/*.vue"],
  theme: {
    extend: {
      colors: {
        "primary": "var(--color-primary)",
        "dark-red": "var(--color-red)",
        "border": "var(--color-border)",
        "header": "var(--color-header)",
        "sidebar1": "var(--color-sidebar1)",
        "sidebar2": "var(--color-sidebar2)",
        "main-pane": "var(--color-main-pane)",
        "hover": "var(--color-hover)",
        "hover2": "var(--color-hover2)",
        "white": "var(--color-white)"
      }
    },
  },
  plugins: [],
}

