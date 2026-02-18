/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ayurvedic color palette - warm, earthy, and soothing
        vata: {
          light: "#E8D4B8",
          DEFAULT: "#C8A882",
          dark: "#8B6F47"
        },
        pitta: {
          light: "#FFE5CC",
          DEFAULT: "#FF9E64",
          dark: "#D4663A"
        },
        kapha: {
          light: "#C8E6C9",
          DEFAULT: "#66BB6A",
          dark: "#2E7D32"
        },
        primary: {
          50: "#FEF9F3",
          100: "#FDF2E8",
          200: "#FAE4CB",
          300: "#F8D7AF",
          400: "#F4BB7D",
          500: "#EE9B4D",
          600: "#E67E3C",
          700: "#C85A20",
          800: "#9F4819",
          900: "#6F2D0A",
        },
        secondary: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C3D66",
        },
        accent: {
          light: "#F4E8D0",
          DEFAULT: "#D4AF85",
          dark: "#8B7355"
        },
        bg: {
          light: "#FEFAF5",
          DEFAULT: "#FAF6F0",
          dark: "#F5F1EA"
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#2D2D2D",
          }
        }
      }
    },
  },
  plugins: [],
}
