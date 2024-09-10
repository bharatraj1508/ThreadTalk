/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      colors: {
        "thread-font": "#0D7C66",
        "thread-hover": "#E7FBE6",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
