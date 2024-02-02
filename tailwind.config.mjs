/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      primary: "#1F4EAD",
      secondary: "#25AFE1",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
