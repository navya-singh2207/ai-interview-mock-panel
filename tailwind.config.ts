import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        canvas: "#F7F6F2",
        night: "#0B0C0E",
        soft: "#6B6B6B",
        accent: {
          violet: "#6C63FF",
          blue: "#00A3FF",
        },
        card: "#FFFFFF",
        line: "rgba(17, 17, 17, 0.08)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 40px rgba(17, 17, 17, 0.06)",
        lift: "0 18px 50px rgba(17, 17, 17, 0.1)",
        product: "0 24px 80px rgba(11, 12, 14, 0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
