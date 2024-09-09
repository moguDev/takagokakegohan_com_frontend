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
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        drop: {
          "0%": { top: "-500px", transform: "translateX(-50%)" },
          "100%": { top: "50%", transform: "translate(-50%, -50%)" },
        },
        slidein: {
          "0%": {
            transform: "translateX(100%)" /* 画面の右側からスタート */,
          },
          "100%": {
            transform: "translateX(0)" /* 元の位置に戻る */,
          },
        },
        expand: {
          "0%": {
            width: "128px",
            height: "128px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
          "100%": {
            width: "2000px",
            height: "2000px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        },
      },
      textColor: {
        white: "#F9F9F9",
        black: "#333333",
      },
      animation: {
        "fade-up-2s": "fade-up 2s ease-out",
        "fade-in-2s": "fade-in 2s ease-out",
        drop: "drop 1s ease forwards",
        slidein: "slidein 1s ease forwards",
        expand: "expand 3s ease forwards",
      },
      height: {
        hero: "580px",
      },
      backgroundColor: {
        theme: "#f7f7e9",
        primary: "#1B191A",
        secondary: "#C5A797",
        white: "#fcfcf3",
        haader: "#fcfce0",
        black: "#333333",
      },
      borderColor: {
        theme: "#1B191A",
        eggline: "#90835F",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
export default config;
