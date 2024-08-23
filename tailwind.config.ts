import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        drop: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(calc(50vh - 1.5rem))" }, // 1.5remは水玉の半径（w-12/h-12に基づく）
        },
      },
      animation: {
        drop: "drop 1s ease-in-out forwards",
      },
      fontFamily: {
        Zen_Kaku_Gothic_New: ["var(--font-ZenKakuGothicNew)"],
      },
    },
  },
  plugins: [],
};
export default config;
