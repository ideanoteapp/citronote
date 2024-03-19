/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/src/App.vue", "./src/renderer/src/components/*.vue"],
  theme: {
    extend: {
      colors: {
     　　  "primary": "var(--color-primary)",
     　　  "primary-text": "var(--color-primary-text)",
      }
    },
  },
  plugins: [],
}

