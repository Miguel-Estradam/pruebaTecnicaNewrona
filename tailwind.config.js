/** @type {import('tailwindcss').Config} */

/** Colors pallette
 * Delft blue = #3A405A
 * Powder blue = #AEC5EB
 * Champagne pink = #F9DEC9
 * Melon = #E9AFA3
 * Umber = #685044
 * Pearl = #E7DFC6
 * UCLA Blue = #2274A5
 */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      satoshi: ["Satoshi", "sans-serif"],
    },
    extend: {
      backgroundColor: {
        principal: "#E9F1F7",
        secondary: "#2274A5",
        third: "#131B23",
        buttons: "#685044",
        "buttons-secondary": "#E7DFC6",
      },
    },
  },
  plugins: [],
};
