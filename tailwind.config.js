/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "3xl-plus": ["2rem", "2.5rem"],
      },
      scale: {
        65: "0.65",
      },
      padding: {
        30: "7.5rem",
        22: "5.5rem",
        18: "4.5rem",
        19: "4.75rem",
      },
      borderRadius: {
        "lg-plus": "0.625rem",
      },
      minWidth: {
        "xl-plus": "37rem",
      },
      maxWidth: {
        66: "16.5rem",
      },
      maxHeight: {
        93: "23.25rem",
        md: "28rem",
        lg: "31.25rem",
      },
      width: {
        90: "22.5rem",
        15: "3.75rem",
        47: "11.75rem",
        "2xl": "42rem",
        13: "3.25rem",
      },
      height: {
        "screen-3/4": "75vh",
        15: "3.75rem",
        47: "11.75rem",
        13: "3.25rem",
      },
      colors: {
        almond: "#DDCCAA",
        scarlet: "#E31221",
        firebrick: "#CC0E10",
        "red-orange": "#B80D0F",
        cardinal: "#DC3545",
        "steel-gray": "#222030",
        indigo: "#0D6EFD",
        gray: {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#868e96",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
        "stale-gray": "#6C757D",
        seagreen: "#198754",
        cinder: "#11101A",
        beige: "#D1E7DD",
        teal: "#0F5132",
        dimgray: "#54535A",
        bastille: "#24222F",
        blueviolet: "#9747FF",
        whitesmoke: "#EFEFEF",
        crimson: "#F3426C",
      },
      backgroundImage: {
        "gradient-radial":
          "linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)",
        "movie-interstellar": 'url("@/assets/images/movie_interstellar.png")',
        "movie-royal-tenenbaums":
          'url("@/assets/images/movie_royal_tenenbaums.png")',
        "movie-lord-of-rings":
          'url("@/assets/images/movie_lord_of_the_rings.png")',
        "action-modal-bg":
          "linear-gradient(112.94deg, rgba(239, 239, 239, 0.3) -1.81%, rgba(239, 239, 239, 0.00514528) 102.5%, rgba(1, 1, 1, 0.00260417) 102.51%, rgba(239, 239, 239, 0.05) 102.52%)",
        "gradient-none": "none",
      },
      boxShadow: {
        overlay: "inset 0 0 200px 0 rgba(0, 0, 0, 0.75)",
        "overlay-lg": "inset 0 0 200px 30px rgba(0, 0, 0, 0.75)",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      helvetica: ["Helvetica Neue", "sans-serif"],
    },
    screens: {
      laptop: "1399px",
    },
  },
  variants: {
    extend: {
      boxShadow: ["responsive"],
    },
  },
  plugins: [],
};
