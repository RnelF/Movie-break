/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "custom-w": "1000px",
        144: "576px",
        100: "400px",
        108: "490px",
        90: "375px",
      },
      height: {
        144: "576px",
      },
      screens: {
        1: "1px",
        375: "375px",
        iphoneXr: "414px",
        415: "415px",
        500: "500px",
        615: "615px",
        900: "900px",
      },
    },
  },
  plugins: [],
};
