/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        66: "16.5rem",
      },
      colors: {
        almond: "#DDCCAA",
        scarlet: "#E31221",
        firebrick: "#CC0E10",
      },
      backgroundImage: {
        "gradient-radial":
          "linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)",
        "movie-1": 'url("@/assets/images/landing_view_1.png")',
        "movie-2": 'url("@/assets/images/landing_view_2.png")',
        "movie-3": 'url("@/assets/images/landing_view_3.png")',
      },
      height: {
        "screen-3/4": "75vh",
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
