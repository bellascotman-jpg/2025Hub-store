import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        paper: "#F7F5F0",
        accent: "#D7FF64",
        muted: "#77766F"
      },
      boxShadow: {
        soft: "0 16px 50px rgba(20,20,20,0.08)"
      }
    }
  },
  plugins: []
};
export default config;