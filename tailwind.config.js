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
      },
      height: {
        144: "576px",
      },
    },
  },
  plugins: [],
};
