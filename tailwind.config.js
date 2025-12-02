/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',           // Tránh xung đột với các lớp CSS khác
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "iip-primary": "#0051CB",
        "iip-primary-dark": "#0149BE",
        "iip-secondary": "#810CC4",
        "iip-yellow": "#FFE24F",
        "iip-white": "#FFFFFF",
        "iip-black": "#000000",
        "iip-gray": "#6F6E6E",
        "iip-gray-light": "rgba(0, 0, 0, 0.7)",
        "iip-text-dark": "#292524",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
      },
      spacing: {
        xs: "10px",
        sm: "15px",
        md: "20px",
        lg: "24px",
        xl: "40px",
      },
      borderRadius: {
        sm: "10px",
        md: "20px",
        lg: "25px",
        full: "60px",
      },
      boxShadow: {
        "iip-sm": "0px 2px 10px rgba(0, 0, 0, 0.2)",
        "iip-md": "0px 4px 10px rgba(0, 0, 0, 0.15)",
        "iip-lg": "0px 0px 10px rgba(0, 0, 0, 0.15)",
        "iip-header": "0px 0px 10px rgba(255, 255, 255, 0.2)",
      },
      screens: {
        mobile: "768px",
        tablet: "1024px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
}
