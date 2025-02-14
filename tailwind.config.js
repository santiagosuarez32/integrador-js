module.exports = {
  scripts: {
  "build": "postcss src/styles.css -o dist/styles.css"
}

  theme: {
    plugins: [require("tailwind-hamburgers")],
    extend: {
      colors: {
        'custom-blue': '#1F2C4B',
      },
      animation: {
        "gradient-border": "gradientBorderAnimation 8s ease infinite",
      },
      keyframes: {
        gradientBorderAnimation: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
    },
  },
};
