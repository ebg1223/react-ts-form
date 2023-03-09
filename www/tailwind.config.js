module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        background: "#3A3A3A",
      },
    },
  },
  plugins: [],
};
