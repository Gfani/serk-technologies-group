import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        serk: {
          primary: "var(--primary-color, #0D4634)",
          secondary: "var(--secondary-color, #2D735A)",
          accent: "var(--accent-color, #E3AB72)",
          surface: "var(--surface-color, #FFFFFF)",
          mist: "var(--surface-alt-color, #F4F7F5)",
          border: "var(--border-color, #DEE6E0)",
          ink: "var(--text-color, #101513)",
          slate: "var(--text-muted-color, #5B6761)",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Inter", "system-ui", "sans-serif"],
        ethiopic: ["Noto Sans Ethiopic", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "var(--border-radius, 8px)",
      },
    },
  },
  plugins: [],
};
export default config;
