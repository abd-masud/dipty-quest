import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login_bg": "url('/images/login_bg.jpg')",
        "breadcrumbs_bg": "url('/images/breadcrumb.jpg')",
        "about_quotes_bg": "url('/images/about-quotes.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        fadeInGrow: "fadeInGrow 0.3s",
      },
      keyframes: {
        fadeInGrow: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
