/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Warm neutral replaces the cold default slate for less eye strain.
        slate: {
          50: "#f4f2ed",
          100: "#eae7e0",
          200: "#ddd8ce",
          300: "#c8c1b4",
          400: "#a49b8c",
          500: "#7d7567",
          600: "#5f584d",
          700: "#4a443c",
          800: "#322e29",
          900: "#211e1a",
        },
        // Muted teal — calm primary.
        brand: {
          50: "#eef5f4",
          100: "#d8e9e6",
          200: "#b5d4cf",
          300: "#89b8b1",
          400: "#5f9a92",
          500: "#477e77",
          600: "#3a6660",
          700: "#325450",
          800: "#2c4643",
          900: "#263c3a",
        },
        // Soft sage green.
        emerald: {
          50: "#f1f7f0",
          100: "#dfeedd",
          200: "#c0ddbc",
          300: "#97c491",
          400: "#6ea768",
          500: "#518a4c",
          600: "#3f6f3c",
          700: "#345a32",
          800: "#2c482b",
          900: "#263c25",
        },
        // Soft honey amber.
        amber: {
          50: "#fdf7ec",
          100: "#f9ecd2",
          200: "#f1d7a3",
          300: "#e6bc6b",
          400: "#d79f3f",
          500: "#c2852b",
          600: "#a66a22",
          700: "#855121",
          800: "#6d4220",
          900: "#5c381f",
        },
        // Soft clay red.
        red: {
          50: "#fdf2f0",
          100: "#fbe3df",
          200: "#f6c8c0",
          300: "#eda092",
          400: "#e0745f",
          500: "#cd5340",
          600: "#b13f2f",
          700: "#933328",
          800: "#7a2c24",
          900: "#672821",
        },
        // Soft plum for "cai na prova".
        fuchsia: {
          50: "#faf5fb",
          100: "#f3e8f6",
          200: "#e6d0ec",
          300: "#d1addb",
          400: "#b582c4",
          500: "#9d62ab",
          600: "#844d91",
          700: "#6c3f76",
          800: "#5a3561",
          900: "#4c2e52",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(50,46,41,0.04), 0 4px 12px rgba(50,46,41,0.05)",
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
